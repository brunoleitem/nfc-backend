import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { NotFoundError } from "@/core/errors/not-found-error";
import { Injectable } from "@nestjs/common";
import { UrlRepository } from "../repositories/url-repository";

interface DeleteUserUrlUseCaseRequest {
  userId: string;
  urlId: string;
}

type DeleteUserUrlUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteUserUrlUseCase {
  constructor(private repository: UrlRepository) {}

  async execute({
    urlId,
    userId,
  }: DeleteUserUrlUseCaseRequest): Promise<DeleteUserUrlUseCaseResponse> {
    const url = await this.repository.findById(urlId);

    if (!url) {
      return left(new NotFoundError());
    }

    if (userId !== url.user_id.toString()) {
      return left(new NotAllowedError());
    }

    await this.repository.delete(urlId);

    return right(null);
  }
}
