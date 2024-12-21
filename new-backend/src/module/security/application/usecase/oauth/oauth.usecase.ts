import { StatusCode } from "../../../../../shared/domain/enum/status-code";
import { IUserService } from "../../../../users/application/service/user.service";
import { IOAuth } from "../../../domain/oauth/oauth";

export class OAuthRequest {
  code: string;
  provider: string;
}

export class OAuthResponse {
  private constructor(message: string, statusCode: number, data: Record<string, any>) {}

  static create(
    message: string, statusCode: number, data: Record<string, any>
  ) {
    return new OAuthResponse(message, statusCode, data);
  }
}

export class OAuthUsecase {
  private static USER_SUCCESSFULLY_CREATED = 'user.successfully.created';

  constructor(
    private readonly userService: IUserService,
    private readonly oauth: IOAuth,
  ) {}

  async execute(request: OAuthRequest): Promise<OAuthResponse> {
    // 1. get code
    const accessToken = await this.oauth.getAccessToken(request.code);

    // 2 . get user data
    const { firstname, lastname, email } = await this.oauth.getUserProfileData(accessToken);

    const userId = await this.userService.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      plainPassword: null,
      provider: request.provider
    });

    return OAuthResponse.create(
      OAuthUsecase.USER_SUCCESSFULLY_CREATED,
      StatusCode.CREATED,
      {
        userId
      }
    )
  }
}