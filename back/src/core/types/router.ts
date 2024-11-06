import { IRouter } from "../../adapters/routes/IRouter";
import { RouterStrategy } from "../../adapters/routes/routerStrategy";
import { ControllerInputType } from "./controllerInputType";

export type Router = (IRouter & RouterStrategy) | IRouter;

export type routeType = {
  pattern: string;
  method: string;
  middleWare?: (input: ControllerInputType) => Promise<void>[];
  handler: (input: ControllerInputType) => Promise<void>;
};
