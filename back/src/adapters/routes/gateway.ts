import { IncomingMessage, ServerResponse } from "http";
import { RequestError } from "../../core/enum/RequestError";
import { AllowedRoutes } from "../../core/enum/AllowedRoutes";
import { factoryBaseRoute, factoryUserRoute } from "../../core/utils/factory";
import { InputError } from "../../core/errors/inputError";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { Router } from "../../core/types/Router";

export class Gateway {
  private registry: Map<AllowedRoutes, Router> = new Map();

  constructor() {
    this.registry.set(AllowedRoutes.USERS, factoryUserRoute());
    this.registry.set(AllowedRoutes.BASE, factoryBaseRoute());
  }
  async dispatch(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    const baseUrl = req.url?.split("/")[1] ?? "";
    try {
      this.sanitizeUrl(baseUrl);
      this.resolveRoute(
        req,
        resp,
        this.registry.get(baseUrl as AllowedRoutes)!
      );
    } catch (error) {
      if (error instanceof InputError && error.name == RequestError.NOT_FOUND) {
        resp.statusCode = ResponseStatusCode.NOT_FOUND;
      }

      resp.end();
    }
  }

  private sanitizeUrl(route: string): void {
    if (!Object.values(AllowedRoutes).includes(route as AllowedRoutes)) {
      throw new InputError({
        name: RequestError.NOT_FOUND,
      });
    }
  }

  private async resolveRoute(
    req: IncomingMessage,
    resp: ServerResponse,
    handler: Router
  ): Promise<void> {
    try {
      handler.handleRoute(req, resp);
    } catch (error) {
      if (error instanceof InputError) {
        if (error.name === RequestError.NOT_FOUND) {
          resp.statusCode = ResponseStatusCode.NOT_FOUND;
        }

        if (error.name === RequestError.METHOD_NOT_ALLOWED) {
          resp.statusCode = ResponseStatusCode.METHOD_NOT_ALLOWED;
        }
      }
      resp.end();
    }
  }
}
