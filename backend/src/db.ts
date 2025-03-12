import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "myworkoutdb",
    password: "miska123",
    port: 5432,
});

if (process.env.NODE_ENV !== "test") {
    pool.connect()
    .then(() => { 
        console.log("Connected to PostgreSQL")       
    })
    .catch((err: Error) => console.error("Connection error", err));
}