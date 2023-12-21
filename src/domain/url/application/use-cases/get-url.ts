import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";
import { NotFoundError } from "@/core/errors/not-found-error";
import { UrlRepository } from "../repositories/url-repository";

interface GetUrlUseCaseRequest {
  url_id: string;
}

type GetUrlUseCaseResponse = Either<
  NotFoundError,
  {
    url: UserUrl;
  }
>;

@Injectable()
export class GetUrlUseCase {
  constructor(private repository: UrlRepository) {}

  async execute({
    url_id,
  }: GetUrlUseCaseRequest): Promise<GetUrlUseCaseResponse> {
    const data = await this.repository.findById(url_id);

    if (!data) {
      return left(new NotFoundError());
    }

    return right({ url: data });
  }
}
