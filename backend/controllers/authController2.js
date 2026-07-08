import User2 from "../models/BuyerUserModel.js";
import bcrypt from "bcryptjs";
import bcript from 'bcryptjs';
import jwt from "jsonwebtoken";

export const SignupUser2= async(req, res)=>{
   try {
    const {name, email, password} = req.body;

    const UserExist = await User2.findOne({email})
    if(UserExist){
        return res.status(400).json({message:"User Already Exist..."})
    }
    const HashPassword = await bcrypt.hash(password, 10)

    await User2.create({
        name,
        email,
        password:HashPassword,
    })
    res.json({
        message:"User Register Successfully"
    })
   } catch (error) {
    res.status(500).json({message:"Server Error", error})
   }
}

export const UserLogin2 = async(req, res)=>{
  try {
    const {email, password} = req.body

    const user =await User2.findOne({email})
     if(!user){
        return res.status(400).json({message:"User Does Not Exist..."})
     }

     const checkPassword = bcrypt.compare(password, user.password)
     if(!checkPassword){
        return res.status(400).json({message:"Password Incorrect"})
     }

     const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
     )

     res.json({
        message:"User Login Successfully...",
        token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
     })
  } catch (error) {
    res.status(500).json({message:"Server Error..."})
  }
}