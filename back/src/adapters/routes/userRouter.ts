import { IncomingMessage, ServerResponse } from "http";
import { RouterStrategy } from "./routerStrategy";
import { UserController } from "../../adapters/controllers/UserController";
import { RequestError } from "../../core/enum/RequestError";
import { InputError } from "../../core/errors/inputError";
import { IRouter } from "./IRouter";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { InputToController } from "../../core/types/inputToController";

export class UserRouter extends RouterStrategy implements IRouter {
  private routes: {
    pattern: string;
    method: string;
    middleWare?: (input: InputToController) => Promise<void>[];
    handler: (input: InputToController) => Promise<void>;
  }[];

  constructor(private userController: UserController) {
    super();
    this.routes = [
      {
        pattern: "/users",
        method: "GET",
        handler: this.userController.findAll,
      },
      {
        pattern: "/users",
        method: "POST",
        handler: this.userController.create,
      },
    ];
  }

  async handleRoute(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    return this.matchRoute(req, resp);
  }

  async matchRoute(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    let matchedRoute = false;
    let matchedMethod = false;

    for (const route of this.routes) {
      console.log({ route, url: req.url });
      const params = this.matchRoutePatterns(req.url ?? "", route.pattern);

      if (params) {
        matchedRoute = true;
      }

      if (params && route.method === req.method) {
        matchedMethod = true;
        route.handler.call(this.userController, { req, resp, params });
      }
    }

    if (!matchedRoute) {
      resp.statusCode = ResponseStatusCode.NOT_FOUND;
      resp.end();
    }

    if (!matchedMethod) {
      resp.statusCode = ResponseStatusCode.METHOD_NOT_ALLOWED;
      resp.end();
    }
  }
}
