// seeding using faker with drizzle orm query
import express from 'express';
import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import process from 'node:process';
import { user, blog, comment, reaction } from './drizzle/schema.js';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

//node server
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

// database configuration
const { Pool } = pkg;

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

// creating records
const seed_data = async () => {
    for(let i=0 ; i<5 ; i++){
        try{
            const user_uuid = uuidv4();
            const user_data = {
                id : user_uuid,
                username : faker.internet.username(),
                email : faker.internet.email(),
                password : faker.internet.password(),
                first_name : faker.person.firstName(),
                last_name : faker.person.lastName(),
                middle_name : faker.person.middleName(),
                address : faker.location.streetAddress(),
                city : faker.location.city(),
                pincode : faker.location.zipCode(),
                state : faker.location.state(),
                country : faker.location.country(),
                phone_number : faker.phone.number(),
                profile_url: faker.image.personPortrait(),
                dob : faker.date.birthdate(),
            }
            await db.insert(user).values(user_data);
            
            const blog_uuid = uuidv4();
            const blog_data = {
                id: blog_uuid,
                user_id: user_uuid,
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(), 
            }
            await db.insert(blog).values(blog_data);

            const comment_data = {
                id: uuidv4(),
                user_id: user_uuid,
                blog_id: blog_uuid,
                comment_text: faker.lorem.paragraph(),
            }
            await db.insert(comment).values(comment_data);
            
            const reaction_data = {
                id: uuidv4(),
                blog_id: blog_uuid,
                user_id: user_uuid,
                liked: faker.datatype.boolean(),
            }
            await db.insert(reaction).values(reaction_data);

            console.log("Data added")
        }
        catch(err){
            console.log(err);
        }        
    }
}

seed_data();