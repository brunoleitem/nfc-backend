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
import { DeleteUserUrlContentUseCase } from "@/domain/url/application/use-cases/delete-user-url-content";

@Controller("/url/content/:id")
export class DeleteUserUrlContentController {
  constructor(private deleteUrl: DeleteUserUrlContentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param("id") userUrlContentId: string,
    @CurrentUser() token: TokenPayload
  ) {
    const user_id = token.sub;

    const result = await this.deleteUrl.execute({
      userId: user_id,
      urlContentId: userUrlContentId,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
  }
}
