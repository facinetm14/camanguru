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

    const createdUser = await this.userRepository.create(newUser);
    if (!createUserDto) {
      throw new Error ('Error user creation');
    }
    return buildUserEntityFromModel(createdUser);
  }
}
