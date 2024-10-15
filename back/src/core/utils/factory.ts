import { UserController } from "../../controllers/UserController";
import { UserRouter } from "../../routes/userRouter";

export function factoryUserRoute(): UserRouter {
    return new UserRouter(new UserController());
}