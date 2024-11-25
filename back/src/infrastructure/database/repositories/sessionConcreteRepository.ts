import { SessionModel } from "../../../domain/models/SessionModel";
import { SessionRepository } from "../../../domain/repositories/sessionRepository";
import { pgClient } from "../dataSource";

export class SessionConcreteRepository implements SessionRepository {
  async register(session: SessionModel): Promise<any> {
    const { id, user_id, created_at, updated_at } = session;

    const insertQuery = {
      text: `
              INSERT INTO users_sessions(id, user_id, created_at, updated_at)
              VALUES($1, $2, $3, $4);
            `,
      values: [id, user_id, created_at, updated_at],
    };

    const connexion = await pgClient.connect();
    const result = await pgClient.query(insertQuery);
    connexion.release();
    return result["rows"];
  }

  async findById(id: string): Promise<SessionModel> {
    const queryUser = {
      text: `SELECT * FROM users WHERE id = $1 LIMIT 1`,
      values: [id],
    };

    const connexion = await pgClient.connect();
    const result = await pgClient.query(queryUser);
    connexion.release();
    const session = result["rows"][0];

    return session;
  }
}



