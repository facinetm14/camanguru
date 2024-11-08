import { UserUniqKeys } from "../../core/enum/User";
import { UserModel } from "../models/UserModel";

export interface UserRepository {
  create(user: UserModel): Promise<any>;
  findAll(): Promise<UserModel[]>;
  findUserByUniqKey(key: UserUniqKeys, value: string): Promise<UserModel>;
  updateStatusAndRemoveValidationToken(idUser: string): Promise<void>;
}
