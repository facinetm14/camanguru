import { CreateSessionDto } from "../../dtos/createSessionDto";
import { CreateUserDto } from "../../dtos/createUserDto";
import { User } from "../../entity/User";
import { UserModel } from "../../../infrastructure/model/UserModel";
import { UserStatus } from "../../enums/user.enums";
import { hashPassword, isPasswordStrong } from "../password";
import { uuid } from "../uuid";
import { isValidEmail } from "../validation/email";
import { isString } from "../validation/string";
import { LoginUserDto } from "../../dtos/loginUserDto";

export function buildUserListFromRawModel(userRawList: UserModel[]): User[] {
  return userRawList.map((userRaw) => buildUserEntityFromModel(userRaw));
}

export function buildUserEntityFromModel(userModel: UserModel): User {
  return {
    id: userModel.id,
    username: userModel.username,
    updatedAt: userModel.updated_at,
    createdAt: userModel.created_at,
    firstName: userModel.first_name,
    lastName: userModel.last_name,
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
    first_name: createUserDto.firstName,
    last_name: createUserDto.lastName,
    passwd: hash,
    salt,
    status: UserStatus.UNVERIFIED,
    validation_token: validationToken,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export const parseRequestBodyAndBuildCreateUserDto = (
  body: any
): CreateUserDto | null => {
  if (!isString(body.username) || !body.username) {
    return null;
  }

  if (!isString(body.email) || !isValidEmail(body.email)) {
    return null;
  }

  if (!isString(body.adress) || !body.adress) {
    return null;
  }

  if (!isString(body.firstName) || !body.firstName) {
    return null;
  }

  if (!isString(body.lastName) || !body.lastName) {
    return null;
  }

  if (!isString(body.passwd) || !isPasswordStrong(body.passwd)) {
    return null;
  }

  return {
    username: body.username,
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    passwd: body.passwd,
    adress: body.adress,
  };
};

export const parseRequestBodyAndBuildLoginUserDto = (
  body: any
): LoginUserDto | null => {
  if (!isString(body.username) || !isString(body.passwd)) {
    return null;
  }

  return {
    username: body.username,
    passwd: body.passwd,
  };
};
