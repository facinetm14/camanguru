export abstract class DomainError extends Error {
  constructor(errors: Record<string, any>) {
    super(errors.message)
  }
}