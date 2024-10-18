import { buildSchema } from "./dbSchema";

export const initDb = async () => {
  console.log("**Init db**");
  await buildSchema();
};
