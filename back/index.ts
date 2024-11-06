import { createServer, IncomingMessage, ServerResponse } from "http";
import { App } from "./src/app";
import { initDb } from "./src/infrastructure/database/initDb";
import { DIContainer } from "./src/core/di/container";
import { BaseRouter } from "./src/adapters/routes/baseRouter";
import { UserConcreteRepository } from "./src/infrastructure/database/repositories/userConcreteRepository";
import { ModuleRegister } from "./src/core/enum/ModuleRegister";
import { UserConCreteService } from "./src/application/services/userConcreteService";
import { UserController } from "./src/adapters/controllers/UserController";
import { UserRouter } from "./src/adapters/routes/userRouter";
import { error } from "console";

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

(async () => {
  await initDb();
  const server = createServer((req: IncomingMessage, resp: ServerResponse) => {
    DIContainer.registerClass(ModuleRegister.BASE_ROUTE, new BaseRouter());
    DIContainer.registerClass(
      ModuleRegister.USER_REPOSITORY,
      new UserConcreteRepository()
    );
    DIContainer.registerClass(
      ModuleRegister.USER_SERVICE,
      new UserConCreteService(
        DIContainer.resolve(ModuleRegister.USER_REPOSITORY)
      )
    );
    DIContainer.registerClass(
      ModuleRegister.USER_CONTROLLER,
      new UserController(DIContainer.resolve(ModuleRegister.USER_SERVICE))
    );

    DIContainer.registerClass(
      ModuleRegister.USER_ROUTE,
      new UserRouter(DIContainer.resolve(ModuleRegister.USER_CONTROLLER))
    );

    const app = new App(req, resp);
    app.run();
  });

  server.listen(+port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();
