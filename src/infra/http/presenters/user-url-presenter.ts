import { UserUrl } from "@/domain/url/enterprise/entities/user-url";

export class UserUrlPresenter {
  static toHttp(userUrl: UserUrl) {
    return {
      id: userUrl.id.toString(),
      title: userUrl.title,
      slug: userUrl.slug.value,
      user_id: userUrl.user_id.toString(),
    };
  }
}
