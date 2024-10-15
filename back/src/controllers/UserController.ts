import { IncomingMessage, ServerResponse } from "http";

export class UserController {
  constructor() {}

  async findAll(req: IncomingMessage, resp: ServerResponse, params?: {}): Promise<void> {
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "application/json");
    const users = Promise.resolve([
      {
        name: "Tom",
        email: "tom@wc",
      },
      {
        name: "Tom",
        email: "tom@wc",
      },
    ]);
    resp.end(JSON.stringify(users));
  }
}
