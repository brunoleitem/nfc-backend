import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { NotFoundError } from "@/core/errors/not-found-error";
import { Injectable } from "@nestjs/common";
import { UserUrlContentRepository } from "../repositories/url-content-repository";
import { UrlRepository } from "../repositories/url-repository";

interface DeleteUserUrlContentUseCaseRequest {
  userId: string;
  urlContentId: string;
}

type DeleteUserUrlContentUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class DeleteUserUrlContentUseCase {
  constructor(
    private repository: UserUrlContentRepository,
    private urlRepository: UrlRepository
  ) {}

  async execute({
    urlContentId,
    userId,
  }: DeleteUserUrlContentUseCaseRequest): Promise<DeleteUserUrlContentUseCaseResponse> {
    const urlContent = await this.repository.findById(urlContentId);
    if (!urlContent) {
      return left(new NotFoundError());
    }

    const url = await this.urlRepository.findById(urlContent.url_id.toString());
    if (userId !== url?.user_id.toString()) {
      return left(new NotAllowedError());
    }

    await this.repository.delete(urlContentId);

    return right(null);
  }
}
