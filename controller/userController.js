import userService from '../repository/userRepository.js';

const getAllUser = async (req, res) => {
    try{
        const users = await userService.getAllUser();
        if(users.rowCount > 0){
            res.status(200).send(users.rows);
        }
        else{
            res.status(404).send("No student found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

export default {getAllUser};