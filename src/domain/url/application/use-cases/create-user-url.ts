import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { URLAlreadyExistsError } from "./errors/url-exists-error";
import { UID } from "@/core/entities/UID";
import { UrlRepository } from "../repositories/url-repository";
import { CreateUserUrlContentUseCase } from "./create-user-url-content";
import { UserUrlContent } from "../../enterprise/entities/user-url-content";

interface CreateUserUrlUseCaseRequest {
  title: string;
  content: {
    title: string;
    content: string;
  }[];
  user_id: string;
}

type CreateUserUrlUseCaseResponse = Either<
  URLAlreadyExistsError,
  { userUrl: UserUrl }
>;

@Injectable()
export class CreateUserUrlUseCase {
  constructor(private repository: UrlRepository) {}

  async execute({
    title,
    content,
    user_id,
  }: CreateUserUrlUseCaseRequest): Promise<CreateUserUrlUseCaseResponse> {
    const urlSlug = Slug.createFromText(title);

    const existsUrlSlug = await this.repository.findBySlug(urlSlug.value);

    if (existsUrlSlug) {
      return left(new URLAlreadyExistsError(title));
    }
    const url = UserUrl.create({
      title,
      slug: urlSlug,
      user_id: new UID(user_id),
    });

    const urlContent = content.map((cont) => {
      return UserUrlContent.create({
        content: cont.content,
        title: cont.title,
        url_id: url.id,
      });
    });

    url.content = urlContent;

    await this.repository.create(url);

    return right({
      userUrl: url,
    });
  }
}
