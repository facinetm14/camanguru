import { UserUniqKeys } from "../../core/enum/User";
import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../dtos/createUserDto";
import { AuthService } from "./authService";
import { EmailService } from "./emailService";
import { UserService } from "./userService";

export class AuthConcreteService implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userService.create(createUserDto);
      if (newUser) {
        //await this.emailService.sendConfirmationEmail(createUserDto);
      }
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("Error: user registration process failled");
    }
  }

  async verify(token: string): Promise<string> {
    const userByToken = await this.userService.findUserByUniqKey(
      UserUniqKeys.VALIDATION_TOKEN,
      token
    );
    if (userByToken) {
      const activatedUser = this.userService.activateAccount(userByToken.id);
      return 'OK';
    }

    throw new Error("Error: Invalid token");
  }
}
