import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    gender:{
        type:String,
        default:"",
        enum:["male","female"],
       required:[true,"gender is requred"]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"phone is required"]
    },
    usertype:{
        type:String,
        required:[true,"user type is required"],
        default:"client",
        enum:["client","admin","vendor","driver"]
    },
    profile:{
        type:String,
        default:'data:image/png;base64,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'
    },
    answer:{
        type:String,
        required:[true,'Answer is required']
    }
},{
    timestamps:true
})

export default mongoose.model('User',userSchema);