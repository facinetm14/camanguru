import { pgClient } from "../dataSource";
const query = `
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            passwd VARCHAR(255) NOT NULL,
            email VARCHAR(60) UNIQUE NOT NULL,
            adress VARCHAR(60) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;

export const createUserTable = async () => {
  return pgClient.query(query);
};
