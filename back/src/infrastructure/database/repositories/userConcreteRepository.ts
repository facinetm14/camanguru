import { User } from "../../../domain/models/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { pgClient } from "../dataSource";

export class UserConcreteRepository implements UserRepository {
  create(createUser: User): Promise<User> {
    throw new Error("To be implementend");
  }

  findAll(): Promise<User[]> {
    throw new Error("To be implementd");
  }
}
