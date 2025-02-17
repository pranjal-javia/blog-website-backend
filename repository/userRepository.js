import db from "../database/dbConnection.js";
import { user } from '../drizzle/schema.js';

const getAllUsers = async () => {
    try{
        const users = await db.select().from(user);
        return users;
    }
    catch(err){
        console.log(err);
        throw { status: 500, message: "Internal server error" };
    }
}

export default {getAllUsers};