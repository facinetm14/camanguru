import { ControllerInputType } from "../types/controllerInputType";
import { IRouter } from "./IRouter";
import { RouterStrategy } from "./routerStrategy";

export type Router = (IRouter & RouterStrategy) | IRouter;

export type routeType = {
  pattern: string;
  method: string;
  middleWare?: (input: ControllerInputType) => Promise<void>[];
  handler: (input: ControllerInputType) => Promise<void>;
};
