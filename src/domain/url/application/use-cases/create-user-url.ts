import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";
import { UserUrlRepository } from "../repositories/user-url-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { URLAlreadyExistsError } from "./errors/url-exists-error";
import { UID } from "@/core/entities/UID";

interface CreateUserUrlUseCaseRequest {
  title: string;
  user_id: string;
}

type CreateUserUrlUseCaseResponse = Either<
  URLAlreadyExistsError,
  { userUrl: UserUrl }
>;

@Injectable()
export class CreateUserUrlUseCase {
  constructor(private userUrlRepository: UserUrlRepository) {}

  async execute({
    title,
    user_id,
  }: CreateUserUrlUseCaseRequest): Promise<CreateUserUrlUseCaseResponse> {
    //procura se o slug ja existe
    const urlSlug = Slug.createFromText(title);

    const existsUrlSlug = await this.userUrlRepository.findBySlug(
      urlSlug.value
    );

    if (existsUrlSlug) {
      return left(new URLAlreadyExistsError(title));
    }

    const url = UserUrl.create({
      title,
      slug: urlSlug,
      user_id: new UID(user_id),
    });

    await this.userUrlRepository.create(url);

    return right({
      userUrl: url,
    });
  }
}
