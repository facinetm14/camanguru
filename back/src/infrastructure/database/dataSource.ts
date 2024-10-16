import pg from "pg";

const { Client } = pg;

export const pgClient = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME,
});

export const dbConnect = async () => {
  return pgClient.connect();
}

export const dbDisConnect = async () => {
  return pgClient.end();
}