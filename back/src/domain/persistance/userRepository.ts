import { UserUniqKeys } from "../enums/user.enums";
import { User } from "../entity/User";

export interface UserRepository {
  create(user: User): Promise<any>;
  findAll(): Promise<User[]>;
  findUserByUniqKey(key: UserUniqKeys, value: string): Promise<User>;
  updateStatusAndRemoveValidationToken(idUser: string): Promise<void>;
}
