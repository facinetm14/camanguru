import { IncomingMessage, ServerResponse } from "http";
import { Gateway } from "./infrastructure/delivery/routes/gateway";

export class App {
  constructor(public req: IncomingMessage, public resp: ServerResponse) {
    this.gateway = new Gateway();
  }
  gateway: Gateway;

  async run(): Promise<void> {
    this.gateway.dispatch(this.req, this.resp);
  }
}
