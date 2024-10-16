import { dbConnect, dbDisConnect } from "./dataSource";
import { createUserTable } from "./migrations/create-user-table";

export const buildSchema = async () => {
  await dbConnect();
  await Promise.all([createUserTable()]);
  await dbDisConnect();
};