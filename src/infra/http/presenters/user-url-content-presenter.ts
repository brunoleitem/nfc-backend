import { UserUrlContent } from "@/domain/url/enterprise/entities/user-url-content";

export class UserUrlContentPresenter {
  static toHttp(urlContent: UserUrlContent) {
    return {
      id: urlContent.id.toString(),
      title: urlContent.title,
      content: urlContent.content,
    };
  }
}
