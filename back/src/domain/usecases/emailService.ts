import { CreateUserDto } from "../dtos/createUserDto";

export interface IEmail {
  getSubject(): string;
  to(): string;
  ...
}

export interface IMailer {
  send(email: IEmail): Promise<void>;
}
