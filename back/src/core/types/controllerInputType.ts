import { IncomingMessage, ServerResponse } from "http";

export type ControllerInputType = {
  req?: IncomingMessage;
  resp: ServerResponse;
  params?: Map<string, string>;
};
