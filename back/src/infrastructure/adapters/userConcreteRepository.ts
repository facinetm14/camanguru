import { pgClient } from "../../database/dataSource";
import { User } from "../../domain/entity/User";
import { UserUniqKeys, UserStatus } from "../../domain/enums/user.enums";
import { UserRepository } from "../../domain/ports/userRepository";
import { UserModel } from "../model/UserModel";

export class UserConcreteRepository implements UserRepository {
  async create(user: User): Promise<any> {
    const {
      id,
      username,
      first_name,
      last_name,
      email,
      adress,
      passwd,
      created_at,
      updated_at,
      salt,
      status,
      validation_token,
    } = user;

    const insertQuery = {
      text: `
        INSERT INTO users(id, username, email, adress, passwd, created_at, updated_at, salt, status, validation_token, first_name, last_name)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
      values: [
        id,
        username,
        email,
        adress,
        passwd,
        created_at,
        updated_at,
        salt,
        status,
        validation_token,
        first_name,
        last_name,
      ],
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

  async findUserByUniqKey(
    key: UserUniqKeys,
    value: string
  ): Promise<UserModel> {
    const queryUser = {
      text: `SELECT * FROM users WHERE ${key}=$1 LIMIT 1`,
      values: [value],
    };

    const connexion = await pgClient.connect();
    const result = await pgClient.query(queryUser);
    connexion.release();
    const user = result["rows"][0];

    return user;
  }

  async updateStatusAndRemoveValidationToken(idUser: string): Promise<void> {
    const updateQuery = {
      text: `UPDATE users SET status=$1, validation_token=null WHERE id=$2`,
      values: [UserStatus.VERIFIED, idUser],
    };

    const connexion = await pgClient.connect();
    try {
      await pgClient.query(updateQuery);
    } catch (error) {
      console.log("Error: unable to update user", idUser);
    }
    connexion.release();
  }
}
