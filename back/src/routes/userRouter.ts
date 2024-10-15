import { IncomingMessage, ServerResponse } from "http";
import { Router } from "./router";
import { UserController } from "../controllers/UserController";
import { RequestError } from "../core/enum/RequestError";
import { InputError } from "../core/errors/inputError";

export class UserRouter extends Router {
  private routes: [{ pattern: string; method: string; handler: Function }];

  constructor(private userController: UserController) {
    super();
    this.routes = [
      { pattern: "/user", method: "GET", handler: this.userController.findAll },
    ];
  }

  async handleRoute(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    try {
      console.log("BEFORE MATCHING ROUTE");
      console.log(req, resp);
      //   this.matchRoute(req, resp);
      this.what();
    } catch (error) {
      if (error instanceof InputError) {
        if (error.name === RequestError.NOT_FOUND) resp.statusCode = 404;
        if (RequestError.METHOD_NOT_ALLOWED) resp.statusCode = 405;
      }
      resp.end();
    }
  }

  async matchRoute(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    let matchedRoute = false;
    let matchedMethod = false;

    console.log("MATChROUTE", this.routes);
    for (const route of this.routes) {
      console.log(route.pattern, " and ", req.url);
      const params = this.matchRoutePatterns(req.url ?? "", route.pattern);
      if (params) {
        matchedRoute = true;
        console.log(req.method);
      }
      if (params && route.method === req.method) {
        matchedMethod = true;
        console.log("TOP");
        return route.handler(req, resp, params);
      }
      console.log("AFTER TOP");
    }

    if (!matchedRoute) {
      throw new InputError({ name: RequestError.NOT_FOUND });
    }

    if (!matchedMethod) {
      throw new InputError({ name: RequestError.METHOD_NOT_ALLOWED });
    }
  }

  what() {
    console.log("sdsksddksds");
  }
}
