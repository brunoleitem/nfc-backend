import { Entity } from "@/core/entities/entity";
import { UID } from "@/core/entities/UID";

export interface UserUrlContentProps {
  title: string;
  content: string;
  url_id: UID;
}

export class UserUrlContent extends Entity<UserUrlContentProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }
  get content() {
    return this.props.content;
  }
  set content(content: string) {
    this.props.content = content;
  }
  get url_id() {
    return this.props.url_id;
  }
  set url_id(id: UID) {
    this.props.url_id = id;
  }

  static create(props: UserUrlContentProps, id?: UID) {
    const userUrlContent = new UserUrlContent(
      {
        ...props,
      },
      id
    );
    return userUrlContent;
  }
}
