import { Injectable } from "@nestjs/common";
import { UrlRepository } from "../repositories/url-repository";
import { Either, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";

interface GetUserUrlsUseCaseRequest {
  user_id: string;
}

type GetUserUrlsUseCaseResponse = Either<
  null,
  {
    userUrl: UserUrl[];
  }
>;

@Injectable()
export class GetUserUrlsUseCase {
  constructor(private repository: UrlRepository) {}

  async execute({
    user_id,
  }: GetUserUrlsUseCaseRequest): Promise<GetUserUrlsUseCaseResponse> {
    const data = await this.repository.findManyByUsers(user_id);

    return right({ userUrl: data });
  }
}
