import { CreateUserDto } from "./createUserDto";

export type UserLoginDto = Pick<CreateUserDto, "username" | "passwd">;
