import { CreateUserDto } from "../../application/dtos/createUserDto";
import { AuthService } from "../../application/services/authService";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { ControllerInputType } from "../../core/types/controllerInputType";
import { isValidEmail } from "../../core/utils/inputValidation/email";

export class AuthController {
  constructor(private authService: AuthService) {}

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
          resp.end(JSON.stringify(newUser));
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
      const verifiedUser = this.authService.verify(token);
      if (!verifiedUser) {
        resp.statusCode = ResponseStatusCode.BAD_REQUEST;
      } else {
        resp.statusCode = ResponseStatusCode.CREATED_OK;
      }
    } catch (error) {
      console.log("Error: unable to verify user");
      resp.statusCode = ResponseStatusCode.BAD_REQUEST;
    }
    resp.end();
  }
}
