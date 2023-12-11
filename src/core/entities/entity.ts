import { UID } from "./UID";

export abstract class Entity<T> {
  private _id: UID;
  protected props: T

  get id() {
    return this._id
  }

  protected constructor(props: T, id?: UID) {
    this.props = props
    this._id = id ?? new UID()
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }

}