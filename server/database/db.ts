import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
})