import { IRouter } from "../../adapters/routes/IRouter";
import { RouterStrategy } from "../../adapters/routes/routerStrategy";

export type Router = IRouter & RouterStrategy | IRouter;