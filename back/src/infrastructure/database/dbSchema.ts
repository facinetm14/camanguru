import { dbConnect } from "./dataSource";
import { createSessionTable } from "./migrations/create-sessions-table";
import { createUserTable } from "./migrations/create-user-table";

export const buildSchema = async () => {
  const connexion = await dbConnect();
  await Promise.all([await createUserTable(), await createSessionTable()]);
  await connexion.release();
};
