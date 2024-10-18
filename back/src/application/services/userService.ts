import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/createUserDto";

export interface UserService {
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>,
}
