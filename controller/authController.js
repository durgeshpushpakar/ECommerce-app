import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController= async (req, res)=>{
    try {
        const {name, email, password, phone, address}=req.body;
        // validations
        if(!name){
            return res.status(400).send({error:'Name is required'});
        }
        if(!email){
            return res.status(400).send({error:'email is required'});
        }
        if(!password){
            return res.status(400).send({error:'password is required'});
        }
        if(!phone){
            return res.status(400).send({error:'phone no is required'});
        }
        if(!address){
            return res.status(400).send({error:'address is required'});
        }

        //existing user
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login'
            })
        }
        // register User
        const hashedPassword = await hashPassword(password);
        const user= await new userModel({name, email, password:hashedPassword, phone, address}).save();

        return res.status(201).send({
            success:true,
            message:"User registered successfully",
            user
        })

    } catch (error) {
        console.log(`error in register controller: ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
};

// login controller
export const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password);
        console.log(`value of match variable: ${match}`);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
          })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        });

        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })

    } catch (error) {
        console.log(`error in login controller: ${error}`);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
};

// test controller
export const testController = async (req, res, next) => {
    res.send(`Hello from test controller, I am a protected route!`);
}