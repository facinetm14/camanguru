import { StatusCode } from "../../../../../shared/domain/enum/status-code";
import { IUserService } from "../../../../users/application/service/user.service";
import { DEFAULT_USER_PROVIDER } from "../../../../users/domain/entity/user";
import { IRegistrationRequest } from "./request/registration.request";

export class RegistrationResponse {
  private constructor(private message: string, private statusCode: number, private data: Record<string, any>) {}

  static create(
    message: string, statusCode: number, data: Record<string, any>
  ) {
    return new RegistrationResponse(message, statusCode, data);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }

  getData(): Record<string, any> {
    return this.data;
  }
}

export interface IRegistrationUsecase {
  execute(request: IRegistrationRequest): Promise<RegistrationResponse>;
}

export class RegistrationUsecase {
  private static USER_SUCCESSFULLY_CREATED = 'user.successfully.created';

  constructor(
    private readonly userService: IUserService
  ) {}

  async execute(request: IRegistrationRequest): Promise<RegistrationResponse> {
    const userId = await this.userService.create({
      firstname: request.getFirstname(),
      lastname: request.getLastname(),
      email: request.getEmail(),
      plainPassword: request.getPassword(),
      provider: DEFAULT_USER_PROVIDER
    });

    return RegistrationResponse.create(
      RegistrationUsecase.USER_SUCCESSFULLY_CREATED,
      StatusCode.CREATED,
      {
        userId
      }
    )
  }
}