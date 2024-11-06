import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/createUserDto";

export interface AuthService {
  register(createUserDto: CreateUserDto): Promise<User>;
  verify(token: string): Promise<string>;
}
