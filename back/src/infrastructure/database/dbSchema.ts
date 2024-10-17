import { dbConnect } from "./dataSource";
import { createUserTable } from "./migrations/create-user-table";

export const buildSchema = async () => {
  const connexion =  await dbConnect();
  await Promise.all([createUserTable()]);
  await connexion.release();
};