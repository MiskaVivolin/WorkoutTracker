const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mytrainingdb",
    password: "hemuli28",
    port: 5432,
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err: Error) => console.error("Connection error", err));

module.exports = pool;