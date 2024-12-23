import { UserUniqKeys } from "../enums/user.enums";
import {
  buildUserEntityFromModel,
  buildUserListFromRawModel,
  buildUserModelFromCreateUserDto,
} from "../utils/mappers/user-entity.mapper";

import { User } from "../entity/User";
import { UserRepository } from "../ports/userRepository";
import { CreateUserDto } from "../dtos/createUserDto";
import { UserService } from "../../domain/usecases/userService";

export class UserConCreteService implements UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const userRawList = await this.userRepository.findAll();
    if (!userRawList) {
      return [];
    }
    return buildUserListFromRawModel(userRawList);
  }

  async create(
    createUserDto: CreateUserDto,
    validationToken: string
  ): Promise<User> {
    const newUser = await buildUserModelFromCreateUserDto(
      createUserDto,
      validationToken
    );
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
    if (!user) {
      return null;
    }
    return buildUserEntityFromModel(user);
  }

  async activateAccount(idUser: string): Promise<void> {
    return this.userRepository.updateStatusAndRemoveValidationToken(idUser);
  }
}
