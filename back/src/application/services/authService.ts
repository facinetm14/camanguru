import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/createUserDto";
import { LoginUserDto } from "../dtos/loginUserDto";

export interface AuthService {
  register(createUserDto: CreateUserDto): Promise<User>;
  verify(token: string): Promise<void>;
  signin(loginUserDto: LoginUserDto): Promise<string | null>;
}
