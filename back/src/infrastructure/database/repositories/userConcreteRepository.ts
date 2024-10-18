import { UserRepository } from "../../../domain/repositories/userRepository";
import { pgClient } from "../dataSource";
import { UserModel } from "../../../domain/models/UserModel";

export class UserConcreteRepository implements UserRepository {
  async create(user: UserModel): Promise<any> {
    const { id, username, email, address, passwd, created_at, updated_at } =
      user;

    // const insertQuery = {
    //   text: `
    //     INSERT INTO users(id, username, email, address, passwd, created_at, updated_at)
    //     VALUES($1, $2, $3, $4, $5, $6, $7);`,
    //   values: [id, username, email, address, passwd, created_at, updated_at],
    // };

    // const connexion = await pgClient.connect();
    // const result = await pgClient.query(insertQuery);
    // await connexion.release();

    // return result["rows"];
    console.log(user);
  }

  async findAll(): Promise<UserModel[]> {
    const queryUsers = `SELECT * FROM users;`;

    const connexion = await pgClient.connect();
    const result = await pgClient.query(queryUsers);
    await connexion.release();

    const users = result["rows"];

    return users;
  }
}
