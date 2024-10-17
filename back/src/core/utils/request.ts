import { IncomingMessage } from "http";

export const getRequestTextBody = (req: IncomingMessage) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
};
