import jwt from 'jsonwebtoken';
import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    try{
        console.log(req.headers);
        if(req.headers.authorization){
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECREAT);
            req.body.id = decoded.id;
            next();
        }
        else{
            res.status(400).send("Authentication failed");
        }
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

export default authMiddleware;