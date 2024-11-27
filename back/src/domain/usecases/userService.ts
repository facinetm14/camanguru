import { UserUniqKeys } from "../enums/user.enums";
import { User } from "../entity/User";
import { CreateUserDto } from "../dtos/createUserDto";

export interface UserService {
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto, validationToken: string): Promise<User>;
  findUserByUniqKey(key: UserUniqKeys, value: string): Promise<User | null>;
  activateAccount(idUser: string): Promise<void>;
}
