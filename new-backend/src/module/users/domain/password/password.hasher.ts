export interface IPasswordHasher {
  hash(plainPassword: string): Promise<string>
  isValid(plainPassword: string, hashedPassword: string): Promise<boolean>
}