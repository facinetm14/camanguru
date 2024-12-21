import { User } from "../entity/user";

export interface IUserRepository {
  generateId(): Promise<string>
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User>
}
