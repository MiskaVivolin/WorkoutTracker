import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mytrainingdb",
    password: "hemuli28",
    port: 5432,
});

if (process.env.NODE_ENV !== "test") {
    pool.connect()
    .then(() => { 
        console.log("Connected to PostgreSQL")       
    })
    .catch((err: Error) => console.error("Connection error", err));
}