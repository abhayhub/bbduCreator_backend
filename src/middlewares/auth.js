import jwt  from "jsonwebtoken";

const verifyToken = async(req,res,next) => {
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode;
        console.log(decode);
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
};

export default verifyToken;