import { UserUrl } from "../../enterprise/entities/user-url";

export abstract class UserUrlRepository {
  abstract findById(id: string): Promise<UserUrl | null>;
  abstract findManyByUsers(user_id: string): Promise<UserUrl[]>;
  abstract findBySlug(slug: string): Promise<UserUrl | null>;
  abstract create(url: UserUrl): Promise<void>;
  abstract delete(urlId: string): Promise<void>;
}
