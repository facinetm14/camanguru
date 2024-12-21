import { EntityState } from "../../../../shared/domain/entity/entity.state";

export const DEFAULT_USER_PROVIDER = 'email';

export class User {
  private _id: string;
  private _firstname: string;
  private _lastname: string;
  private _email: string;
  private _hashedPassword: string | null;
  private _provider: string;
  private _state: EntityState;

  private constructor() {}

  public static create(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    hashedPassword: string | null,
    provider: string,
  ): User {
    let user = new User();
    user._id = id;
    user._firstname = firstname;
    user._lastname = lastname;
    user._email = email;
    user._hashedPassword = hashedPassword;
    user._provider = provider;

    user._state.markAsValid();

    return user;
  }

  public static unKnown(context: Record<string, any>) {
    let user = new User();
    user._state.markAsInValid(context);
    return user;
  }

  isValid(): boolean {
    return this._state.isValid();
  }

  getId(): string {
    return this._id;
  }

  wasRegistreredByOauthProvider(): boolean {
    return this._provider !== DEFAULT_USER_PROVIDER;
  }
}
