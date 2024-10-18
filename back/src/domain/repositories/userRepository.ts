import { User } from "../entities/User";
import { UserModel } from "../models/UserModel";

export interface UserRepository {
  create(user: UserModel): Promise<any>;
  findAll(): Promise<UserModel[]>;
}
