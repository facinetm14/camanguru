import { IncomingMessage, ServerResponse } from "http";
export interface IRouter {
  handleRoute(req: IncomingMessage, resp: ServerResponse): Promise<void>;
}
