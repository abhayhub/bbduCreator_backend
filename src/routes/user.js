import express  from "express";
import User from "../models/User.js";
import  jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post("/register", [
    check("Email","Email is required").isString(),
    check("FirstName","FirstName is required").isString(),
    check("LastName","LastName is required").isString(),
    check("Password","Password with 6 or more characters is required").isLength({min:6}),],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()});
        }

        try {
            let user = await User.findOne({
                Email: req.body.Email,
            });
            if(user){
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            user = new User(req.body);
            await user.save();

            return res.status(201).json({message: "User registered successfully"});
        } catch (error) {
            return res.status(500).json({message:"failed to register"})
        }
});

export default router;
