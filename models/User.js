const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
       
    },
    income:{
        type:Number,
        default:20000
     
    },
    expenditure:{
        type:Number,
        default:0
       
    },
    //Type of Account 
    //0 means saving account
    //1 means chekcing account
    TAccount:{
        type:Number,
        default:0,
    },
    Balance:{
        type:Number,
        default:0
       
    }


})

module.exports= User = mongoose.model("User",userSchema)