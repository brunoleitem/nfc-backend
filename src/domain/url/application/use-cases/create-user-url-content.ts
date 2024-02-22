import { Injectable } from "@nestjs/common";
import { Either, right } from "@/core/either";
import { UID } from "@/core/entities/UID";
import { UserUrlContent } from "../../enterprise/entities/user-url-content";
import { UserUrlContentRepository } from "../repositories/url-content-repository";

interface CreateUserUrlContentRequest {
  content: {
    title: string;
    content: string;
  }[];
  url_id: string;
}

type CreateUserUrlContentUseCaseResponse = Either<
  null,
  { userUrlContent: UserUrlContent[] | null }
>;

@Injectable()
export class CreateUserUrlContentUseCase {
  constructor(private repository: UserUrlContentRepository) {}

  async execute({
    content,
    url_id,
  }: CreateUserUrlContentRequest): Promise<CreateUserUrlContentUseCaseResponse> {
    content.map(async (cont) => {
      const urlContent = UserUrlContent.create({
        title: cont.title,
        content: cont.content,
        url_id: new UID(url_id),
      });
      await this.repository.create(urlContent);
    });

    const retorno = await this.repository.findByUrl(url_id);

    return right({
      userUrlContent: retorno,
    });
  }
}
