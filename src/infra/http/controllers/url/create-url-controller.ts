import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { z } from "zod";
import { Public } from "@/infra/auth/public";
import { RegisterUserUseCase } from "@/domain/accounts/application/use-cases/register-user";
import { UserAlreadyExistsError } from "@/domain/accounts/application/use-cases/errors/user-exists-error";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";
import { CreateUserUrlUseCase } from "@/domain/url/application/use-cases/create-user-url";

const UserUrlContentSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const createUserUrlBodySchema = z.object({
  title: z.string(),
  content: z.array(UserUrlContentSchema),
});

type CreateUserUrlBodySchema = z.infer<typeof createUserUrlBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createUserUrlBodySchema);

@Controller("/url")
export class CreateUserUrlController {
  constructor(private createUrl: CreateUserUrlUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateUserUrlBodySchema,
    @CurrentUser() token: TokenPayload
  ) {
    const { title, content } = body;
    const user_id = token.sub;

    const result = await this.createUrl.execute({
      title,
      content,
      user_id,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
