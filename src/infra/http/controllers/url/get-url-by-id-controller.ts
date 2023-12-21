import { BadRequestException, Controller, Get, Param } from "@nestjs/common";

import { UserUrlPresenter } from "../../presenters/user-url-presenter";
import { GetUrlUseCase } from "@/domain/url/application/use-cases/get-url";
import { Public } from "@/infra/auth/public";

@Public()
@Controller("/url/:id")
export class GetUrlController {
  constructor(private getUrl: GetUrlUseCase) {}

  @Get()
  async handle(@Param("id") url_id: string) {
    const result = await this.getUrl.execute({
      url_id,
    });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }

    return {
      url: UserUrlPresenter.toHttp(result.value.url),
    };
  }
}
