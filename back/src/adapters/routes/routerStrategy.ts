import { IncomingMessage, ServerResponse } from "http";

export abstract class RouterStrategy {
  abstract matchRoute(
    req: IncomingMessage,
    resp: ServerResponse
  ): Promise<void>;

  protected matchRoutePatterns(pathname: string, pattern: string): {} | null {
    const paramsName: string[] = [];

    const regexPattern = pattern
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

    const params: { [key: string]: string } = {};

    paramsName.forEach((param, index) => {
      params[param] = match[index + 1];
    });

    return params;
  }
}
