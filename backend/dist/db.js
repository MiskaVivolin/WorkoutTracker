"use strict";
var Pool = require("pg").Pool;
var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mytrainingdb",
    password: "hemuli28",
    port: 5432,
});
pool.connect()
    .then(function () { return console.log("Connected to PostgreSQL"); })
    .catch(function (err) { return console.error("Connection error", err); });
module.exports = pool;
