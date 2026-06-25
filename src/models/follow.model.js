const mongoose = require("mongoose")

const followschema= new mongoose.Schema({
    followers:  {
        type:String,
    },  
    following: {
       type:String,
    },
    status: {
    type: String,
    default: "pending",
    enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status can only be pending, accepted or rejected"
    }
}
    
} ,{timestamps:true})

followschema.index({followers:1,following : 1},{unique:true})

module.exports=mongoose.model ("follows" ,followschema)