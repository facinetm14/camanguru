import { UserUniqKeys } from "../../../domain/enums/user.enums";
import { UserService } from "../../../domain/usecases/userService";
import { ResponseStatusCode } from "../../enums/ResponseStatusCode";
import { ControllerInputType } from "../types/controllerInputType";


export class UserController {
  constructor(private userService: UserService) {}

  async findAll({ resp }: ControllerInputType): Promise<void> {
    resp.statusCode = ResponseStatusCode.GET_OK;
    resp.setHeader("Content-Type", "application/json");

    const users = await this.userService.findAll();

    resp.end(JSON.stringify(users));
  }

  async findById({ req, params, resp }: ControllerInputType): Promise<void> {
    
    if (!params?.has("userId")) {
      resp.statusCode = ResponseStatusCode.BAD_REQUEST;
      resp.end();
      return;
    }

    const userId = params.get("userId") as string;

    try {
      const user = await this.userService.findUserByUniqKey(
        UserUniqKeys.ID,
        userId
      );

      if (!user) {
        resp.statusCode = ResponseStatusCode.NOT_FOUND;
        resp.end("user not found");
        return;
      }

      const { passwd, salt, status, ...userWithNoPasswd } = user;

      resp.end(JSON.stringify(userWithNoPasswd));
    } catch (error) {
      console.log(error);
      resp.statusCode = ResponseStatusCode.SERVER_INTERNAL_ERROR;
      resp.end();
    }
  }
}
