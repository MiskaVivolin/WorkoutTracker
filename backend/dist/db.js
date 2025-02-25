"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "mytrainingdb",
    password: "hemuli28",
    port: 5432,
});
if (process.env.NODE_ENV !== "test") {
    exports.pool.connect()
        .then(() => {
        console.log("Connected to PostgreSQL");
    })
        .catch((err) => console.error("Connection error", err));
}
