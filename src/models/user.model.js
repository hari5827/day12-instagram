const mongoose = require("mongoose")
const userschema =  new mongoose.Schema({
    username: {
        type: String,
        unique: [true, " username already exists"] ,
        required: [true,"username required"],
    },
    email:{
        type:String,
          unique: [true, " email already exists"] ,
         required: [true,"email required"],
    },
    password:{
        type:String,
         required: [true,"password required"],
         select: false,
    },
    
    bio:String,
    profileimage:{
           type: String,
           default:"https://ik.imagekit.io/sa0u72cfj/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp",

    }
})




const userModel = mongoose.model("users",userschema)

module.exports=userModel