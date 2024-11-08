import { pgClient } from "../dataSource";
const query = `
        CREATE TABLE IF NOT EXISTS users_sessions (
            id VARCHAR(255) UNIQUE NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `;

export const createSessionTable = async () => {
  return pgClient.query(query);
};
