import { User } from "../../domain/entity/user";
import { IPasswordHasher } from "../../domain/password/password.hasher";
import { IUserRepository } from "../../domain/repository/user.repository";
import { UserAlreadyExistsError } from "./error/user-already-exists.error";

export interface UserPayload {
  firstname: string;
  lastname: string;
  email: string;
  plainPassword: string | null;
  provider: string;
}

export interface IUserService {
  create(userPayload: UserPayload): Promise<string>;
}

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly eventDispatcher: IEventDispatcher
  ) {  }

  async create(userPayload: UserPayload): Promise<string> {
    // verifie si l'utilisateur existe
    const existingUser = await this.userRepository.findByEmail(userPayload.email);
    if (existingUser.isValid()) {
      if (existingUser.wasRegistreredByOauthProvider()) {
        return existingUser.getId()
      }

      throw new UserAlreadyExistsError({
        message: 'user.already_exists',
        details: {
          email: userPayload.email
        }
      });
    }

    // hash le mot de passe et creer un objet user
    const user = User.create(
      await this.userRepository.generateId(),
      userPayload.firstname,
      userPayload.lastname,
      userPayload.email,
      await this.passwordHasher.hash(userPayload.plainPassword as string),
      userPayload.provider
    )

    // persistence
    await this.userRepository.save(user);

    // je déclence un event pour envoyer (email, sms; etc..)
    this.eventDispatcher.dispatch(new UserCreatedEvent());

    // renvoie l'id

    return user.getId();
  }
}
