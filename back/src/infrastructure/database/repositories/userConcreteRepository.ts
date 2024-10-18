import { UserRepository } from "../../../domain/repositories/userRepository";
import { pgClient } from "../dataSource";
import { UserModel } from "../../../domain/models/UserModel";

export class UserConcreteRepository implements UserRepository {
  async create(user: UserModel): Promise<any> {
    const { id, username, email, adress, passwd, created_at, updated_at } =
      user;

    const insertQuery = {
      text: `
        INSERT INTO users(id, username, email, adress, passwd, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5, $6, $7);`,
      values: [id, username, email, adress, passwd, created_at, updated_at],
    };

    const connexion = await pgClient.connect();
    const result = await pgClient.query(insertQuery);
    connexion.release();
    return result["rows"];
  }

  async findAll(): Promise<UserModel[]> {
    const queryUsers = `SELECT * FROM users;`;

    const connexion = await pgClient.connect();
    const result = await pgClient.query(queryUsers);
    connexion.release();

    const users = result["rows"];

    return users;
  }
}
