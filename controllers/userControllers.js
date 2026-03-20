import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const getUserController = async (req,res)=>{
    try {
        const userId = req.user.id; 
        
        const user = await User.findById(userId).select("-password");
        

        if(!user){
            return res.status(404).json({
                message:"User not Found"
            });
        }

        user.password = undefined;
        
        res.status(200).json({
            message:"user Data",
            user
        });
    } catch (error) {

        console.error("Get user",error);
        res.status(500).json({
            message:error.message
        });
    }
}


export const updateUserController = async(req,res)=>{
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated - protect middleware failed"
            });
        }
        
        const userId = req.user.id;
        console.log("D. User ID extracted:", userId);

         
        const updateUser = await User.findByIdAndUpdate(
             userId,
            { ...req.body },
            {
               new:true,
               runValidators:true
             }
           ).select("-password");
           
         if(!updateUser){
            return res.status(404).json({
                message:"user not found"
            });
        }
        
        res.status(200).json({
           message:"User updated succesfully",
           user:{ updateUser }
        });

    } catch (error) {
        console.error("cant update user",error);
        res.status(500).json({
            message:error.message
        });
    }
}

export const resetPasswordController = async (req, res) => {
  try {

    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(400).json({
        message: "Please provide all fields"
      });
    }

    const user = await User.findOne({
        email: email.toLowerCase(),
        answer: answer.toLowerCase()
    });

    if (!user) {
       return res.status(401).json({
        message:"Invalid email or security answer"
        });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.HASH_KEY) || 10
    );

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      message: "Error in password reset"
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    const userId = req.user.id;

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Please provide old and new password"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid old password"
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.HASH_KEY) || 10
    );

     await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({
      message: "Error in password update"
    });
  }
};
 
export const deleteUserController = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    const user = await User.findByIdAndDelete(req.user.id,{isDeleted:true});

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      success:true,  
      message: "Account deleted successfully"
    });

  } catch (error) {

    console.error("Delete user error:", error);

    res.status(500).json({
        success:false,
      message: "Failed to delete user"
    });

  }
};

