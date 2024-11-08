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
import { EmailConcreteService } from "./src/application/services/emailConcreteService";
import { AuthConcreteService } from "./src/application/services/authConcreteService";
import { AuthController } from "./src/adapters/controllers/AuthController";
import { AuthRouter } from "./src/adapters/routes/authRouter";

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

initDb();

const server = createServer((req: IncomingMessage, resp: ServerResponse) => {
  DIContainer.registerClass(ModuleRegister.BASE_ROUTE, new BaseRouter());
  DIContainer.registerClass(
    ModuleRegister.USER_REPOSITORY,
    new UserConcreteRepository()
  );

  DIContainer.registerClass(
    ModuleRegister.EMAIL_SERVICE,
    new EmailConcreteService()
  );

  DIContainer.registerClass(
    ModuleRegister.USER_SERVICE,
    new UserConCreteService(DIContainer.resolve(ModuleRegister.USER_REPOSITORY))
  );
  DIContainer.registerClass(
    ModuleRegister.USER_CONTROLLER,
    new UserController(DIContainer.resolve(ModuleRegister.USER_SERVICE))
  );

  DIContainer.registerClass(
    ModuleRegister.USER_ROUTE,
    new UserRouter(DIContainer.resolve(ModuleRegister.USER_CONTROLLER))
  );

  DIContainer.registerClass(
    ModuleRegister.AUTH_SERVICE,
    new AuthConcreteService(
      DIContainer.resolve(ModuleRegister.USER_SERVICE),
      DIContainer.resolve(ModuleRegister.EMAIL_SERVICE)
    )
  );

  DIContainer.registerClass(
    ModuleRegister.AUTH_CONTROLLER,
    new AuthController(DIContainer.resolve(ModuleRegister.AUTH_SERVICE))
  );

  DIContainer.registerClass(
    ModuleRegister.AUTH_ROUTE,
    new AuthRouter(DIContainer.resolve(ModuleRegister.AUTH_CONTROLLER))
  );

  const app = new App(req, resp);
  app.run();
});

server.listen(+port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
