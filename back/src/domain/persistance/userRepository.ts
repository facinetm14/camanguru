import { UserUniqKeys } from "../enums/user.enums";
import { UserModel } from "../../infrastructure/model/UserModel";

export interface UserRepository {
  create(user: UserModel): Promise<any>;
  findAll(): Promise<UserModel[]>;
  findUserByUniqKey(key: UserUniqKeys, value: string): Promise<UserModel>;
  updateStatusAndRemoveValidationToken(idUser: string): Promise<void>;
}
