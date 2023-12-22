import { EditUserUrlUseCase } from "@/domain/url/application/use-cases/edit-user-url";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";
import { NotFoundError } from "@/core/errors/not-found-error";

const editUrlBodySchema = z.object({
  title: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUrlBodySchema);

type EditUrlBodySchema = z.infer<typeof editUrlBodySchema>;

@Controller("/url/:id")
export class EditUrlController {
  constructor(private editUrl: EditUserUrlUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUrlBodySchema,
    @CurrentUser() user: TokenPayload,
    @Param("id") urlId: string
  ) {
    const { title } = body;
    const userId = user.sub;

    const result = await this.editUrl.execute({
      url_id: urlId,
      user_id: userId,
      title,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
  }
}
