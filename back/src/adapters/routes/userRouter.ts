import { IncomingMessage, ServerResponse } from "http";
import { RouterStrategy } from "./routerStrategy";
import { UserController } from "../../adapters/controllers/UserController";
import { RequestError } from "../../core/enum/RequestError";
import { InputError } from "../../core/errors/inputError";
import { IRouter } from "./IRouter";

export class UserRouter extends RouterStrategy implements IRouter {
  private routes: [{ pattern: string; method: string; handler: Function }];

  constructor(private userController: UserController) {
    super();
    this.routes = [
      {
        pattern: "/users",
        method: "GET",
        handler: this.userController.findAll,
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
      const params = this.matchRoutePatterns(req.url ?? "", route.pattern);

      if (params) {
        matchedRoute = true;
      }

      if (params && route.method === req.method) {
        matchedMethod = true;
        return route.handler(req, resp, params);
      }
    }

    if (!matchedRoute) {
      throw new InputError({ name: RequestError.NOT_FOUND });
    }

    if (!matchedMethod) {
      throw new InputError({ name: RequestError.METHOD_NOT_ALLOWED });
    }
  }
}
