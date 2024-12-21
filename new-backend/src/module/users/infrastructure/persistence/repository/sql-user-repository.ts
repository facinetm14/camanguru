import { IUserRepository } from '../../../domain/repository/user.repository';
import { uuid } from '../../../../../../../back/src/domain/utils/uuid';
import { pgClient } from '../../../../../../../back/src/database/dataSource';
import { User } from '../../../domain/entity/user';

export class SqlUserRepository extends IUserRepository {
  generateId(): Promise<string> {
    return Promise.resolve(uuid());
  }

  async save(user: User): Promise<void> {
    try {
      const {
        id,
        firstname,
        lastname,
        email,
        password,
        provider
      } = user;

      const insertQuery = {
        text: `
          INSERT INTO users(id, firstname, lastname, email, password, provider)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
        values: [
          id,
        firstname,
        lastname,
        email,
        password,
        provider
        ],
      };

      const connexion = await pgClient.connect();
      connexion.release();
    } catch(error) {
      // gerer l'erreur
    }
  }

  async findByEmail(email: string): Promise<User> {
    // 'requete sql pour récupérer les infos'
    const user = {
      id: "toot",
      firstname: "Jean",
      lastname: "Doe",
      email: "jean.doe@example.fr",
      hashedPassword: "password",
      provider: "email"
    };

    return Promise.resolve(User.create(user.id, user.firstname, user.lastname, user.email, user.hashedPassword, user.provider));
  }
}