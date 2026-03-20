import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginController = async(req,res)=>{
    try {
        const { email , password } = req.body;

        if(!email|| !password){
            return res.status(400).json({
                message:"invalid credentials"
            });
        }

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(401).json({
                message:"user does not exists"
            });
        }

        const isPasswordValid = await bcrypt.compare(password,userExist.password);
        
        if(!isPasswordValid){
            return res.status(404).json({
                message:"invalid password"
            });
        }

          const token = jwt.sign(
            {
                id:userExist._id.toString(),
                email:userExist.email,
                usertype:userExist.usertype
            },
            process.env.SECRET_KEY,
            {expiresIn:'7d'}
        );

         //constdecoded = 
          res.status(200).json({
            message:"Login successfull",
            token,
          });

    } catch (error) {
        res.status(500).json({
            message:"Error while login"
        });
    }
}

export const registerController = async(req,res)=>{
    try {
        const {username ,email,password,gender,address,phone ,answer} = req.body;
        
        if(!username || !email || !password || !gender ||!address ||!phone ||!answer) {
           return res.status(404).json({
            message:"provide all fields"
           })   
        }

       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.status(401).json({
            message:"Email already registered please Login"
        });
       }

       const hashedPassword = await bcrypt.hash(password,Number(process.env.HASH_KEY));

       const user = await User.create({
            username,
            email,
            password:hashedPassword,
            gender,
            address,
            phone,
            answer
        });

       res.status(201).json({
          message:"successfully registered",
        
          user:{
            username:user.username,
            email:user.email,
            gender:user.gender,
            address:user.address,
            phone:user.phone,
            
          }
       });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}
