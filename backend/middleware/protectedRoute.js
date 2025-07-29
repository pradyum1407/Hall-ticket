import User from "../modal/User.js";
import jwt from "jsonwebtoken";

export async function protectedRoute(req, res, next) {
const token = req.cookies.jwt;


if(!token){
    return res.status(400).json({msg:"Unabel to authorize  the USer"})
}

try {

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)

    const user = await User.findById(decoded.userId).select("-password")

    if(!user){
        return res.status(401).json({msg:"user  not  found"})
    }

    req.user=user
    next();

} catch (error) {
    console.log(error)
    return res.status(500).json({msg:"error  in the protected route"})
}
}