const mongoose = require("mongoose")
const mongose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption : {
        type : String ,
        default : ""

    },
    imgUrl:{
        type:String,
        require:[true,"img url require"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id required for creating post"]
    }
})

const postmodel = mongoose.model("post",postSchema)

module.exports=postmodel
