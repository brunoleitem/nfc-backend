import { Entity } from "@/core/entities/entity";
import { UID } from "@/core/entities/UID";
import { Slug } from "./value-objects/slug";

export interface UserUrlProps {
  title: string;
  slug: Slug;
  user_id: UID;
}

export class UserUrl extends Entity<UserUrlProps> {
  get title() {
    return this.props.title;
  }

  get user_id() {
    return this.props.user_id;
  }

  get slug() {
    return this.props.slug;
  }

  static create(props: UserUrlProps, id?: UID) {
    const userUrl = new UserUrl(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id
    );
    return userUrl;
  }
}
