"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'envio',
    password: '1234',
    port: 5432, // Puerto por defecto de PostgreSQL
});
exports.default = pool;
