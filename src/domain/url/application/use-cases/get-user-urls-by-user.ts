import { Injectable } from "@nestjs/common";
import { UserUrlRepository } from "../repositories/user-url-repository";
import { Either, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";

interface GetUserUrlsByUserUseCaseRequest {
  user_id: string;
}

type GetUserUrlsByUserUseCaseResponse = Either<
  null,
  {
    userUrl: UserUrl[];
  }
>;

@Injectable()
export class GetUserUrlsByUserUseCase {
  constructor(private userUrlRepository: UserUrlRepository) {}

  async execute({
    user_id,
  }: GetUserUrlsByUserUseCaseRequest): Promise<GetUserUrlsByUserUseCaseResponse> {
    const data = await this.userUrlRepository.findManyByUsers(user_id);

    return right({ userUrl: data });
  }
}
