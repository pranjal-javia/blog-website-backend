// import * as dotenv from 'dotenv/config';
import dotenv from 'dotenv';
import process from 'node:process';
import {defineConfig} from "drizzle-kit";
dotenv.config();

export default defineConfig({
    out: './drizzle',
    schema: './drizzle/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL
    } 
});