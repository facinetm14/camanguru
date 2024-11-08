import { IncomingMessage, ServerResponse } from "http";
import { API_BASE } from "../../core/enum/AllowedRoutes";

export abstract class RouterStrategy {
  abstract matchRoute(
    req: IncomingMessage,
    resp: ServerResponse
  ): Promise<void>;

  protected matchRoutePatterns(
    pathname: string,
    pattern: string
  ): Map<string, string> | null {
    const paramsName: string[] = [];

    const regexPattern =
      API_BASE +
      pattern
        .replace(/\/:([^\/]+)/g, (_, paramName: string) => {
          paramsName.push(paramName);
          return "/([^/]+)";
        })
        .replace(/\//g, "\\/");

    const regex = new RegExp(`^${regexPattern}$`);

    const match = pathname.match(regex);
    if (!match) {
      return null;
    }

    const params = new Map<string, string>();

    paramsName.forEach((param, index) => {
      params.set(param, match[index + 1]);
    });

    return params;
  }
}
