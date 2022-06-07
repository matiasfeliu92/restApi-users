"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'matias92',
    host: 'postgresql-matias92.alwaysdata.net',
    password: 'matute1592',
    database: 'matias92_restapitypescriptpostgre1',
    port: 5432,
});
