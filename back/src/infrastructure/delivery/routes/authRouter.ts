import { IncomingMessage, ServerResponse } from "http";
import { BaseRouter } from "./baseRouter";
import { IRouter } from "./IRouter";
import { RouterStrategy } from "./routerStrategy";
import { routeType } from "./router";
import { AuthController } from "../controllers/AuthController";
import { ResponseStatusCode } from "../../enums/ResponseStatusCode";

export class AuthRouter extends RouterStrategy implements IRouter {
  private routes: routeType[];

  constructor(private authController: AuthController) {
    super();
    this.routes = [
      {
        pattern: "/auth/register",
        method: "POST",
        handler: this.authController.register,
      },
      {
        pattern: "/auth/verify/:token",
        method: "POST",
        handler: this.authController.verify,
      },
      {
        pattern: "/auth/login",
        method: "POST",
        handler: this.authController.login,
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
        route.handler.call(this.authController, { req, resp, params });
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
