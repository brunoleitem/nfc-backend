import { Controller, Get } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";
import { UserUrlPresenter } from "../../presenters/user-url-presenter";
import { GetUserUrlsUseCase } from "@/domain/url/application/use-cases/get-user-urls-by-user";
@Controller("/url/all")
export class GetUserUrlController {
  constructor(private getUserUrl: GetUserUrlsUseCase) {}

  @Get()
  async handle(@CurrentUser() token: TokenPayload) {
    const user_id = token.sub;

    const { value } = await this.getUserUrl.execute({
      user_id,
    });

    return {
      urls: value?.userUrl.map(UserUrlPresenter.toHttp),
    };
  }
}
