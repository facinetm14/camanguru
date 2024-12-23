import { UserStatus } from "../../domain/enums/user.enums";

export type UserModel = {
  id: string;
  email: string;
  adress: string;
  username: string;
  first_name: string;
  last_name: string;
  passwd: string;
  created_at: Date;
  updated_at: Date;
  salt: string;
  validation_token: string;
  status: UserStatus;
};
