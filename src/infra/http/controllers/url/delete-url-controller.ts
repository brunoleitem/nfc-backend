import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";
import { DeleteUserUrlUseCase } from "@/domain/url/application/use-cases/delete-user-url-";

@Controller("/url/:id")
export class DeleteUserUrlController {
  constructor(private deleteUrl: DeleteUserUrlUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param("id") userUrlId: string,
    @CurrentUser() token: TokenPayload
  ) {
    const user_id = token.sub;

    const result = await this.deleteUrl.execute({
      urlId: userUrlId,
      userId: user_id,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
  }
}
