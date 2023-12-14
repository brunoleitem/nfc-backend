import { UserUrl } from "../../enterprise/entities/user-url";

export abstract class UserUrlRepository {
  abstract findById(id: string): Promise<UserUrl | null>;
  abstract findBySlug(slug: string): Promise<UserUrl | null>;
  abstract create(url: UserUrl): Promise<void>;
}
