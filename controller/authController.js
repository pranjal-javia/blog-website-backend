import bcrypt from "bcrypt";
import userService from "../service/userService.js";
import jwt from "jsonwebtoken";
import process from "node:process";

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const result = await userService.getUserByEmail(email);

    if(result.length === 0){
        res.status(401).send("Unauthorized");
    }
    else{
        // console.log(result[0].password);
        const isMatch = await bcrypt.compare(password, result[0].password);
        if(!isMatch){
            res.status(401).send("Unauthorized");
        } 
        else{
            const token = await jwt.sign({id: result[0].id}, process.env.JWT_SECREAT, {expiresIn: "2d"});
            // console.log(jwt);
            
            // res.setHeader("Authorization", `Bearer ${token}`);
            res.status(200).send({message: "Login successfully", token: token});
        }
    }
}

export default { login };