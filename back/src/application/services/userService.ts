import { UserUniqKeys } from "../../core/enum/User";
import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/createUserDto";

export interface UserService {
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
  findUserByUniqKey(key: UserUniqKeys, value: string): Promise<User | null>;
  activateAccount(idUser: string): Promise<void>;
}
