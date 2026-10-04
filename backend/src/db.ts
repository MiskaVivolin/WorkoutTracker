import { Pool } from "pg";

const port = Number.parseInt(process.env.POSTGRES_PORT ?? "5432", 10);

export const pool = new Pool(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            user: process.env.POSTGRES_USER ?? "postgres",
            host: process.env.POSTGRES_HOST ?? "localhost",
            database: process.env.POSTGRES_DB ?? "myworkoutdb",
            password: process.env.POSTGRES_PASSWORD,
            port,
        },
);

if (process.env.NODE_ENV !== "test") {
    pool.query("SELECT 1")
    .then(() => { 
        console.log("Connected to PostgreSQL")       
    })
    .catch((err: Error) => console.error("Connection error", err));
}
