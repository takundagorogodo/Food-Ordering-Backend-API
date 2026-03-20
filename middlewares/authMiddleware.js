import jwt from "jsonwebtoken";

export const protect  = async (req,res,next)=>{
    try {
        const auhtHeader = req.headers["authorization"]
        
        if(!auhtHeader){
            return res.status(401).json({
                message:"No token provide first login Please"
            });
        }

        if(!auhtHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Invalid token format .Use Bearer scheme"
            });
        }

        const token = auhtHeader.split(" ")[1];

        if(!token){
           return res.status(401).json({
            message:'No token provided. Please login first'
           });
        }

        const decoded  = jwt.verify(token,process.env.SECRET_KEY);

        req.user = decoded;

        next();


    } catch (error) {
         
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({
                message:"Invalid token Please login again"
            })
        }
        if(error.name ==="TokenExpiredError"){
            return res.status(401).json({
                message:"Token expired please login again"
            });
        }

        console.log(error);
        res.status(500).json({
           message:"Error in auth API"
        });
    }
}

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message:"not authorized .Please login first"
            });
        }

        if(!roles.includes(req.user.usertype)){

            return res.status(403).json({
                message:"Access denied. You dont hava permission to access this resource"
            });
        }

        next();
    };

};