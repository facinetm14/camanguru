import { IncomingMessage, ServerResponse } from "http";
import { IRouter } from "./IRouter";
import { ResponseStatusCode } from "../../enums/ResponseStatusCode";

export class BaseRouter implements IRouter {
  handleRoute(req: IncomingMessage, resp: ServerResponse): Promise<void> {
    if (req.method === "GET") {
      resp.statusCode = ResponseStatusCode.GET_OK;
      resp.setHeader("Content-Type", "text/plain");
      resp.end("OK");
    }
    resp.end();
    return Promise.resolve();
  }
}
