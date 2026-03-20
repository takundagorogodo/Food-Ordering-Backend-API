import User from "../models/userModel.js";

export const admin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.body.id);

        if(user.usertype !=="admin"){
          return res.status(404).json({
            success:false,
             message:"Only Admin Access"
          });
        }else{
            next();
        }

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success:false,
            message:"Un athourized ACCESS",
            error:error.message
        });
    }
} 