import { randomUUID } from 'node:crypto'

export class UID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: UID) {
    return id.toValue() === this.value
  }
}