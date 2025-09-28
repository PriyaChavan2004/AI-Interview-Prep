import { User } from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import imagekit from "../config/imagekit.js";
import multer from "multer";

export const upload = multer()
export const register = async(req ,res)=>{
    try {
        const {fullName, email, password}= req.body;

        if(!fullName || !email || !password){
            return res.status(401).json({
                message:"Please provide all the values",
                success:false
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(401).json({
                message:"User already registered",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        

        await User.create({
            fullName, 
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            message:"User registed successfully",
            success:true
        })
    } catch (error) {
        console.log(`This error is coming from Register backend, error->${error}`)
    }
}


export const Login = async(req, res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Please provide all the vlaues",
                success:false
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"Invalid credentials",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Invalid credentials",
                success:false
            })
        }

        const token = await jwt.sign({userId : user._id},process.env.SECRET_KEY)
        return res.cookie('token',token, {httpOnly:true}).json({
            message:`${user.fullName} logged in successfully`,
            success:true,
            user
        })
    } catch (error) {
        console.log(`This error is coming from Login backend, erro_>${error}`)
    }
}


export const getUser = async(req, res)=>{
    try {
        const userId = req.id
        const user = await User.findById(userId)
        return res.status(201).json({
            user
        })
    } catch (error) {
        console.log(error)
    }
}
export const logOUt = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,        // agar HTTPS hai (Render/Vercel to hamesha hota hai)
    sameSite: "none",    // cross-site requests ke liye zaroori
  });

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};


export const updateProfile = async(req,res)=>{
    try {
        const userId = req.id;
        const {fullName} = req.body||{};
         
        const profilePicture = req.file;

        const user = await User.findByIdAndUpdate(userId, {fullName}, {new:true, runValidators:true})

        if(profilePicture){
            const result = await imagekit.upload({
                file:profilePicture.buffer,
                fileName:profilePicture.originalname
            })
            user.profilPhoto  = result.url
        }

        await user.save()
        return res.status(201).json({
            message:"Profile updated successfully",
            user
        })
    } catch (error) {
        console.log(`This error is coming from profile backend, error_>${error}`)
    }
}