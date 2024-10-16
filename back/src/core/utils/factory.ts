import { BaseRouter } from "../../adapters/routes/baseRouter";
import { UserController } from "../../adapters/controllers/UserController";
import { UserRouter } from "../../adapters/routes/userRouter";

export function factoryUserRoute(): UserRouter {
  return new UserRouter(new UserController());
}

export function factoryBaseRoute(): BaseRouter {
  return new BaseRouter();
}
