import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { UserUrl } from "../../enterprise/entities/user-url";
import { NotFoundError } from "@/core/errors/not-found-error";
import { UrlRepository } from "../repositories/url-repository";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

interface EditUserUrlRequest {
  url_id: string;
  user_id: string;
  title: string;
}

type EditUserUrlResponse = Either<
  NotFoundError | NotAllowedError,
  {
    url: UserUrl;
  }
>;

@Injectable()
export class EditUserUrlUseCase {
  constructor(private repository: UrlRepository) {}

  async execute({
    url_id,
    user_id,
    title,
  }: EditUserUrlRequest): Promise<EditUserUrlResponse> {
    const data = await this.repository.findById(url_id);
    if (!data) {
      return left(new NotFoundError());
    }
    if (user_id !== data.user_id.toString()) {
      return left(new NotAllowedError());
    }

    data.title = title;

    await this.repository.save(data);

    return right({ url: data });
  }
}
