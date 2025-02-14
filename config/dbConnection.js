import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
});

pool.on('connect', () => {
    console.log("Database connected");
});

const db = drizzle({ client: pool });

// const query = (q, params = []) => {
//     return pool.query(q, params)
// }

export default db;