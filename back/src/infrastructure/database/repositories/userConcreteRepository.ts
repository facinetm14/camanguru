import { Query } from "pg";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { pgClient } from "../dataSource";
import { UserModel } from "../../../domain/models/UserModel";

export class UserConcreteRepository implements UserRepository {
  create(createUser: User): Promise<User> {
    throw new Error("To be implementend");
  }

  async findAll(): Promise<UserModel[]> {
    const connexion = await pgClient.connect();

    const queryUsers = `SELECT * FROM users;`;
    const result = await pgClient.query(queryUsers);
    await connexion.release();

    const users = result["rows"];

    return users;
  }
}
