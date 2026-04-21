import { Pool } from "pg";

export const pool = new Pool({
   //connectionString: process.env.PG_CONNECTION_STRING,
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});