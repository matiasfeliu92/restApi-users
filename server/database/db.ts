import {Pool} from 'pg'

export const pool = new Pool ({
    user: 'matias92',
    host: 'postgresql-matias92.alwaysdata.net',
    password: 'matute1592',
    database: 'matias92_restapitypescriptpostgre1',
    port: 5432,
})