import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/users", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if(err){
        console.log("Error on running server" + err);
    }
    else{
        console.log("Server is running on port: " + PORT);
    }
});