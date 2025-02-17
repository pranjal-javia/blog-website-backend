import userService from "../service/userService.js";

const getAllUser = async (req, res) => {
    try{
        const users = await userService.getAllUsers();
        if(users.length > 0){
            res.status(200).send(users);
        }
        else{
            res.status(404).send("No user found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

export default {getAllUser};