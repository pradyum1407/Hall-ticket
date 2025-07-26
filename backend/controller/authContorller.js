import {z } from "zod"
import User from "../modal/User.js"
import jwt from "jsonwebtoken"


//zod schema for the validation 
const signupSchema = z.object({
    name: z.string().min(1,"Full name is required" ),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters" )
})

const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

//controller for the singup endpoint 
export async function signup(req, res) {

    try {
        const result = signupSchema.safeParse(req.body)

        if (!result.success) {
            console.log("error while doing the scchema");
            return res.status(400).json({ error: result.error.errors , msg: "incorrect inputs" })
        }

        //destructing the result body
        const { name, email, password } = result.data;

        ///checking the already existed User
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(401).json({ msg: "User is  already existed" })
        }


        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
        })

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(200).json({ success: true, user: newUser })

    } catch (error) {
        console.log("error while hanndling the singup route", error);
        res.status(500).json({ msg: "internal server error" })

    }
}


export async function login(req, res) {

    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ msg: "Incorrect  Inputs" })
        }

        const { email, password } = result.data;

        if (!email || !password) {
            return res.status(400).json({ msg: "all filed are required" })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ msg: "invalid User or  password" })
        }

        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log("there is an error in the login route", error);
        res.status(500).json({ msg: 'internal server error' })
    }
}

export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logout succesfull" })
} 


