import { UserUrlContent } from "../../enterprise/entities/user-url-content";

export abstract class UserUrlContentRepository {
  abstract create(urlContent: UserUrlContent): Promise<void>;
  abstract findById(id: string): Promise<UserUrlContent | null>;
  abstract findByUrl(urlid: string): Promise<UserUrlContent[] | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(url: UserUrlContent): Promise<void>;
}
