import { CreateUserDto } from "../../../domain/dtos/createUserDto";
import { UserLoginDto } from "../../../domain/dtos/userLoginDto";
import { AuthService } from "../../../domain/usecases/authService";
import { SessionService } from "../../../domain/usecases/sessionService";
import { uuid } from "../../../domain/utils/uuid";
import { isValidEmail } from "../../../domain/utils/validation/email";
import { ResponseStatusCode } from "../../enums/ResponseStatusCode";
import { ControllerInputType } from "../types/controllerInputType";

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
            return;
          }
          resp.statusCode = ResponseStatusCode.CREATED_OK;
          resp.end();
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
    const token = params.get("token") as string;

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
          resp.end("invalid credentials");
          return;
        }

        const authToken = uuid("session");

        await this.sessionService.register({ id: authToken, userId });

        // resp.setHeader(
        //   "Set-Cookie",
        //   `token=${authToken}; HttpOnly; SameSite=Strict;`
        // );

        resp.statusCode = ResponseStatusCode.GET_OK;
        resp.end(JSON.stringify({ userId }));
      })();
    });
  }
}