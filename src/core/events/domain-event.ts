import { UID } from "../entities/UID"

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UID
}