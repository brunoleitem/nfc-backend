import { Entity } from "@/core/entities/entity"
import { UID } from "@/core/entities/UID"

export interface UserProps {
  email: string
  name: string
  password: string
  url: string
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get url() {
    return this.props.url
  }

  get password() {
    return this.props.password
  }

  static create(props: UserProps, id?: UID) {
    const user = new User(props, id)
    return user
  }

}