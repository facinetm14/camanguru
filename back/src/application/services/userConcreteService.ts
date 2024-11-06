import { UserUniqKeys } from "../../core/enum/User";
import {
  buildUserEntityFromModel,
  buildUserListFromRawModel,
  buildUserModelFromCreateUserDto,
} from "../../core/utils/classTransformer";

import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { CreateUserDto } from "../dtos/createUserDto";
import { UserService } from "./userService";

export class UserConCreteService implements UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const userRawList = await this.userRepository.findAll();
    if (!userRawList) {
      return [];
    }
    return buildUserListFromRawModel(userRawList);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await buildUserModelFromCreateUserDto(createUserDto);
    try {
      const createdUser = await this.userRepository.create(newUser);
      return buildUserEntityFromModel(createdUser);
    } catch (error) {
      console.log(error);
      throw new Error("Error: failled to create a user");
    }
  }

  async findUserByUniqKey(
    key: UserUniqKeys,
    value: string
  ): Promise<User | null> {
    const user = await this.userRepository.findUserByUniqKey(key, value);
    console.log(user);
    if (!user) {
      return null;
    }
    return buildUserEntityFromModel(user);
  }

  async activateAccount(idUser: string): Promise<void> {
    return this.userRepository.updateStatusAndRemoveValidationToken(idUser);
  }
}
