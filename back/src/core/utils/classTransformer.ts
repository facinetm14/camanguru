import { CreateUserDto } from "../../application/dtos/createUserDto";
import { User } from "../../domain/entities/User";
import { UserModel } from "../../domain/models/UserModel";
import { hashPassword } from "./passwdHash";
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
  };
}

export const buildUserModelFromCreateUserDto = async (
  createUserDto: CreateUserDto
): Promise<UserModel> => {
  /**TODO Should hash passwd !!!!!!!!!!!!!!! */
  //const passwd = await hashPassword(createUserDto.passwd);
  const passwd = "blabla123";
  return {
    id: uuid("user"),
    username: createUserDto.username,
    email: createUserDto.email,
    adress: createUserDto.adress,
    passwd,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
