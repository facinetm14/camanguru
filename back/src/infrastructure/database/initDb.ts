import { buildSchema } from "./dbSchema";

export const initDb = async () => {
  console.log("** Initializing Database **");
  await buildSchema();
};
