import { CreateUserDto } from "../../application/dtos/createUserDto";
import { UserLoginDto } from "../../application/dtos/userLoginDto";
import { AuthService } from "../../application/services/authService";
import { SessionService } from "../../application/services/sessionService";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { ControllerInputType } from "../../core/types/controllerInputType";
import { isValidEmail } from "../../core/utils/inputValidation/email";
import { uuid } from "../../core/utils/uuid";

export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  async register({ req, resp }: ControllerInputType): Promise<void> {
    let body = "";
    let createUserDto: CreateUserDto;

    req?.on("data", (chunk) => {
      body += chunk.toString();
    });

    req?.on("end", () => {
      (async () => {
        try {
          createUserDto = JSON.parse(body);
          if (!isValidEmail(createUserDto.email)) {
            resp.statusCode = ResponseStatusCode.BAD_REQUEST;
            resp.end("Invalid user email");
            return;
          }
          const newUser = await this.authService.register(createUserDto);
          if (!newUser) {
            resp.statusCode = ResponseStatusCode.SERVER_INTERNAL_ERROR;
            resp.end();
          }
        } catch (error) {
          resp.statusCode = ResponseStatusCode.BAD_REQUEST;
          resp.end();
          console.log(error);
        }
      })();
    });
  }

  async verify({ resp, params }: ControllerInputType) {
    if (!params?.has("token")) {
      resp.statusCode = ResponseStatusCode.BAD_REQUEST;
      resp.end();
      return;
    }
    const token = params.get("token")!;

    try {
      await this.authService.verify(token);
      resp.statusCode = ResponseStatusCode.CREATED_OK;
    } catch (error) {
      console.log(`${error},  ${token}`);
      resp.statusCode = ResponseStatusCode.BAD_REQUEST;
    }
    resp.end();
  }

  async login({ req, resp }: ControllerInputType): Promise<void> {
    let body = "";
    let loginUserDto: UserLoginDto;

    req?.on("data", (chunk) => {
      body += chunk.toString();
    });

    req?.on("end", () => {
      (async () => {
        loginUserDto = JSON.parse(body);
        const userId = await this.authService.signin(loginUserDto);
        if (!userId) {
          resp.statusCode = ResponseStatusCode.INVALID_CREDENTIALS;
          resp.end();
          return;
        }

        const authToken = uuid("session");

        this.sessionService.register({ id: authToken, userId });

        resp.setHeader(
          "Set-Cookie",
          `token=${authToken}; HttpOnly; Secure; SameSite=Strict`
        );

        resp.end(JSON.stringify({ userId }));
      })();
    });
  }
}
