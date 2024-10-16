import { User } from "../models/User";

export interface UserRepository {
  create(createUser: User): Promise<User>;
  findAll(): Promise<User[]>;
}
