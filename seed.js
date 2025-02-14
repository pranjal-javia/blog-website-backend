const express = require('express');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const {Pool} = require('pg');

dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if(err){
        console.log("Error on running server" + err);
    }
    else{
        console.log("Server is running on port: " + PORT);
    }
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
});

pool.on('connect', () => {
    console.log("Database connect");
});

const query = (q, params = []) => {
    return pool.query(q, params)
}

const createrecord = async () => {
    try{
        for(let i=0 ; i<998 ; i++){
            const username = faker.person.firstName().slice(0, 30);;
            const email = faker.internet.email().slice(0, 20);;
            const post = faker.person.jobTitle().slice(0, 30);;
            
            const query_statement = `INSERT INTO "Users" (username, email, post) VALUES ($1, $2, $3) RETURNING *`;

            const result = await query(query_statement, [username, email, post]);
        }
        console.log("Inserted 1000 records");
    }
    catch(err){
        console.log(err);
    }
}

createrecord();