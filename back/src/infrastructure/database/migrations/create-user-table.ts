import { pgClient } from "../dataSource";
const query = `
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) NOT NUL,
            username VARCHAR(50) NOT NULL,
            passwd VARCHAR(255) NOT NULL,
            email VARCHAR(60) NOT NULL,
            address VARCHAR(60) NOT NULLL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;

export const createUserTable = async () => {
  return pgClient.query(query);
};
