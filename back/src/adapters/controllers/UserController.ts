import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "../../application/services/userService";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { InputToController } from "../../core/types/inputToController";
import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../../application/dtos/createUserDto";
import { isValidEmail } from "../../core/utils/inputValidation/email";

export class UserController {
  constructor(private userService: UserService) {}

  async findAll({ resp }: InputToController): Promise<void> {
    resp.statusCode = ResponseStatusCode.GET_OK;
    resp.setHeader("Content-Type", "application/json");

    const users = await this.userService.findAll();

    resp.end(JSON.stringify(users));
  }

  async create({ req, resp }: InputToController): Promise<void> {
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
          const newUser = await this.userService.create(createUserDto);
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
}
