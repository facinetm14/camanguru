import { DIContainer } from "../../infrastructure/di-container/container";
import { ModuleRegister } from "../../infrastructure/enums/ModuleRegister";

export function factoryModule(module: ModuleRegister) {
  return DIContainer.resolve(module);
}
