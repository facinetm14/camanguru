import { User } from "../entities/User";
import { UserModel } from "../models/UserModel";

export interface UserRepository {
  create(createUser: User): Promise<User>;
  findAll(): Promise<UserModel[]>;
}
