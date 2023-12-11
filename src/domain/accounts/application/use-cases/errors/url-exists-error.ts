import { UseCaseError } from '@/core/errors/use-case-error'

export class UserURLAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`A URL "${identifier}" já existe.`)
  }
}