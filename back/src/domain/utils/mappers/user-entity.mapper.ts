import { CreateSessionDto } from "../../dtos/createSessionDto";
import { CreateUserDto } from "../../dtos/createUserDto";
import { User } from "../../entity/User";
import { SessionModel } from "../../../infrastructure/model/SessionModel";
import { UserModel } from "../../../infrastructure/model/UserModel";
import { UserStatus } from "../../enums/user.enums";
import { hashPassword } from "../password";
import { uuid } from "../uuid";

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
