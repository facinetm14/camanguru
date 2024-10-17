import { IncomingMessage, ServerResponse } from "http";

export type InputToController = {
  req?: IncomingMessage;
  resp: ServerResponse;
  params?: {};
};
