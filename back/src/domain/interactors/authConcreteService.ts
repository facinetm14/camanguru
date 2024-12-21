import { UserUniqKeys } from "../enums/user.enums";
import { verifyPassword } from "../utils/password";
import { uuid } from "../utils/uuid";
import { User } from "../entity/User";
import { CreateUserDto } from "../dtos/createUserDto";
import { LoginUserDto } from "../dtos/loginUserDto";
import { AuthService } from "../../domain/usecases/authService";
import { EmailService } from "../../domain/usecases/emailService";
import { UserService } from "../../domain/usecases/userService";


interface IEventDispatcher {
  dispatch(event: IEvent): Promise<any>
  dispatchAsync(event: IEvent): void
}

interface IEvent<T> {
  getName(): string;
  getPayload(): T;
}

class UserCreatedEvent implements IEvent<{ id: string, email: string}> {
  public static const USER_CREATED = 'user.created';
  getName(): string {
    return UserCreatedEvent.USER_CREATED;
  }
  getPayload(): T {
    return {
      id: 1,
      email: 'toto@example.com'
    }
  }
}

export abstract class DomainError extends Error {
  constructor(errors: Record<string, any>) {
    super(errors.message)
  }
}

export class UserRegistrationError extends DomainError {

}

// nestjs
class EventDispatcher implements IEventDispatcher {
  constructor(private eventEmitter: EventEmitter2) {}

  dispatch(event: IEvent): Promise<any> {
    this.eventEmitter.emit(
      event.getName(),
      event.getPayload()
    );
  }
  dispatchAsync(event: IEvent): void {}
}

class SendEmailWhenUserCreEventHandler {
  @OnEvent(UserCreatedEvent.USER_CREATED)
  handleOrderCreatedEvent(payload: UserCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
  }
}

export class AuthConcreteService implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly eventDispatcher: IEventDispatcher,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const validationToken = uuid();
    try {
      const newUser = await this.userService.create(
        createUserDto,
        validationToken
      );

      if (newUser) {
        this.eventDispatcher.dispatchAsync(new UserCreatedEvent(...));
      }

      return newUser;
    } catch (error) {
      console.log(error);
      throw new UserRegistrationError({
        message: "Error: user registration process failled",
        details: {
          
        }
      });
    }
  }

  async verify(token: string): Promise<void> {
    const userByToken = await this.userService.findUserByUniqKey(
      UserUniqKeys.VALIDATION_TOKEN,
      token
    );
    if (userByToken) {
      return this.userService.activateAccount(userByToken.id);
    }

    throw new InvalidCredentialsError("Error: Invalid token");
  }

  async signin(loginUserDto: LoginUserDto): Promise<string | null> {
    const user = await this.userService.findUserByUniqKey(
      UserUniqKeys.USER_NAME,
      loginUserDto.username
    );

    if (!user) {
      return null;
    }

    const checkPassword = await verifyPassword(
      loginUserDto.passwd,
      user.passwd,
      user.salt
    );

    if (!checkPassword) {
      return null;
    }

    return user.id;
  }

}
