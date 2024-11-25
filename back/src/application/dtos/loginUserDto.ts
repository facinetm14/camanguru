import { CreateUserDto } from "./createUserDto";

export type LoginUserDto = Pick<CreateUserDto, "username" | "passwd">;
