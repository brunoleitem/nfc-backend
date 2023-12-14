import { Controller, Get } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt.strategy";
import { GetUserUrlsByUserUseCase } from "@/domain/url/application/use-cases/get-user-urls-by-user";
@Controller("/url")
export class GetUserUrlController {
  constructor(private getUserUrl: GetUserUrlsByUserUseCase) {}

  @Get()
  async handle(@CurrentUser() token: TokenPayload) {
    const user_id = token.sub;

    const result = await this.getUserUrl.execute({
      user_id,
    });
  }
}
