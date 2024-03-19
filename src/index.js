import express  from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import  jwt from "jsonwebtoken";
import UserRoute from './routes/user.js'
import AuthRoute from './routes/auth.js';


import 'dotenv/config';

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", UserRoute);
app.use("/api/user", AuthRoute);

app.listen(3000, async() => {
    console.log("server started");
    connectDb();
})