import User from '../models/User.js'
import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {check, validationResult} from "express-validator";
const router = express.Router();

router.post("/login", [
    check("Email","Email is required").isString(),
    check("Password", "Password with 6 or more characters is required").isLength({min:6})] ,
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message : errors.array()});
        }
        const {Email, Password} = req.body;
        try {
            const user = await User.findOne({Email : Email});
            if(!user){
                return res.status(400).json({message: "Invalid email"});
            }
            //check whether pswd match with existin one
            const ismatch = await bcrypt.compare(Password, user.Password);
            if(!ismatch){
                return res.status(400).json({message: "Invalid Credentials"});
            }
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
            res.cookie("auth_token", token, {httpOnly : true});
            res.status(200).json({userId : user.id});
        } catch (error) {
            res.status(500).json({message : "Something went wrong"});
        }
});

//End point for logout
router.post("/logout", async(req,res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(201).json({message : "User LogOut"})
})

export default router;