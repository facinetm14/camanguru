import { CreateSessionDto } from "../../application/dtos/createSessionDto";
import { CreateUserDto } from "../../application/dtos/createUserDto";
import { User } from "../../domain/entities/User";
import { SessionModel } from "../../domain/models/SessionModel";
import { UserModel } from "../../domain/models/UserModel";
import { UserStatus } from "../enum/User";
import { hashPassword } from "./password";
import { uuid } from "./uuid";

export function buildUserListFromRawModel(userRawList: UserModel[]): User[] {
  return userRawList.map((userRaw) => buildUserEntityFromModel(userRaw));
}

export function buildUserEntityFromModel(userModel: UserModel): User {
  return {
    id: userModel.id,
    username: userModel.username,
    updatedAt: userModel.updated_at,
    createdAt: userModel.created_at,
    email: userModel.email,
    adress: userModel.adress,
    passwd: userModel.passwd,
    salt: userModel.salt,
    status: userModel.status,
  };
}

export const buildUserModelFromCreateUserDto = async (
  createUserDto: CreateUserDto,
  validationToken: string
): Promise<UserModel> => {
  const { hash, salt } = await hashPassword(createUserDto.passwd);
  return {
    id: uuid("user"),
    username: createUserDto.username,
    email: createUserDto.email,
    adress: createUserDto.adress,
    passwd: hash,
    salt,
    status: UserStatus.UNVERIFIED,
    validation_token: validationToken,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const buildSessionModelFromCreateSessionDto = (
  createSessionDto: CreateSessionDto
): SessionModel => {
  return {
    id: createSessionDto.id,
    user_id: createSessionDto.userId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
