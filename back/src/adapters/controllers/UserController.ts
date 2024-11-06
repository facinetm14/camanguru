import { UserService } from "../../application/services/userService";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { ControllerInputType } from "../../core/types/controllerInputType";

export class UserController {
  constructor(private userService: UserService) {}

  async findAll({ resp }: ControllerInputType): Promise<void> {
    resp.statusCode = ResponseStatusCode.GET_OK;
    resp.setHeader("Content-Type", "application/json");

    const users = await this.userService.findAll();

    resp.end(JSON.stringify(users));
  }
}
