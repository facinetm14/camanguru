import { User } from "../../domain/entities/User";
import { UserModel } from "../../domain/models/UserModel";
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
    return this.buildUserListFromRaw(userRawList);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    throw new Error("To be implemented");
  }

  private buildUserListFromRaw(userRawList: UserModel[]): User[] {
    return userRawList.map((userRaw) => this.buildUserEntity(userRaw));
  }

  private buildUserEntity(userModel: UserModel): User {
    return {
      id: userModel.id,
      username: userModel.username,
      updatedAt: userModel.updated_at,
      createdAt: userModel.created_at,
      email: userModel.email,
      address: userModel.address,
    };
  }
}
