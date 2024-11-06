import { IncomingMessage, ServerResponse } from "http";
import { RequestError } from "../../core/enum/RequestError";
import { AllowedRoutes, API_BASE } from "../../core/enum/AllowedRoutes";
import { InputError } from "../../core/errors/inputError";
import { ResponseStatusCode } from "../../core/enum/ResponseStatusCode";
import { Router } from "../../core/types/router";
import { factoryModule } from "../../core/utils/factory";
import { ModuleRegister } from "../../core/enum/ModuleRegister";

export class Gateway {
  private registry: Map<AllowedRoutes, Router> = new Map();

  constructor() {
    this.registry.set(
      AllowedRoutes.USERS,
      factoryModule(ModuleRegister.USER_ROUTE)
    );
    this.registry.set(
      AllowedRoutes.BASE,
      factoryModule(ModuleRegister.BASE_ROUTE)
    );
  }
  async dispatch(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    if (!req.url?.match(/^\/api\/v1\//)) {
      resp.statusCode = ResponseStatusCode.NOT_FOUND;
      return;
    }

    const baseRoute = req.url?.slice(API_BASE.length) ?? "";
    console.log({ baseRoute });
    try {
      this.sanitizeUrl(baseRoute);
      return this.resolveRoute(
        req,
        resp,
        this.registry.get(baseRoute as AllowedRoutes)!
      );
    } catch (error) {
      if (error instanceof InputError && error.name == RequestError.NOT_FOUND) {
        if (error.name == RequestError.NOT_FOUND) {
          resp.statusCode = ResponseStatusCode.NOT_FOUND;
        }
      }
      resp.end();
      console.log(error);
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
    return handler.handleRoute(req, resp);
  }
}
