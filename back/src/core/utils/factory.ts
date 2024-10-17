import { DIContainer } from "../di/container";
import { ModuleRegister } from "../enum/ModuleRegister";

export function factoryModule(module: ModuleRegister) {
  return DIContainer.resolve(module);
}
