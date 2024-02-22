import { Entity } from "@/core/entities/entity";
import { UID } from "@/core/entities/UID";
import { Slug } from "./value-objects/slug";
import { UserUrlContent } from "./user-url-content";
import { Optional } from "@/core/types/optional";

export interface UserUrlProps {
  title: string;
  slug: Slug;
  user_id: UID;
  content: UserUrlContent[];
}

export class UserUrl extends Entity<UserUrlProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
  }

  get content() {
    return this.props.content;
  }

  set content(content: UserUrlContent[]) {
    this.props.content = content;
  }

  get user_id() {
    return this.props.user_id;
  }

  get slug() {
    return this.props.slug;
  }

  static create(props: Optional<UserUrlProps, "content">, id?: UID) {
    const userUrl = new UserUrl(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        content: props.content ?? [],
      },
      id
    );
    return userUrl;
  }
}
