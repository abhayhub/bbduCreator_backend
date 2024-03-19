import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function(next){
    if(this.isModified('Password')){
        this.Password = await bcrypt.hash(this.Password,8);
    }
    next();
})

const User = mongoose.model("User",UserSchema);
export default User;