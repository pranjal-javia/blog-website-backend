import query from "../config/dbConnection.js";

const getAllUser = async () => {
    try{
        const query_statement = `SELECT * FROM "Users"`;
        const users = await query(query_statement);
        return users;
        // const name = "Reyes";
        // const query_statement = `SELECT * FROM "Users" WHERE username=$1`; 
        // const users = await query(query_statement, [name]);
        // return users;
    }
    catch(err){
        console.log(err);
        throw { status: 500, message: "Internal server error" };
    }
}

export default {getAllUser};