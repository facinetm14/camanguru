import { IPasswordHasher } from "../../domain/password/password.hasher";

export class CryptoPasswordHasher implements IPasswordHasher {
  hash(plainPassword: string): Promise<string> {

  }
  isValid(plainPassword: string, hashedPassword: string): Promise<boolean> {
    
  }
}