
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const bcrypt= require("bcryptjs")




 async function logincontroller(req,res){
  const{username,email,password,bio,profileimage}=req.body 
  const user = await userModel.findOne({

    $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]

  }).select("+password")
    
  if(!user){
    return res.status(404).json({
      message :"user not found"
    })}
  
    const ispasswordvalid = await bcrypt.compare(password,user.password)
     if(!ispasswordvalid){
      return res.status(401).json({
        message : "password invalid"
      })
     }
     const token = jwt.sign({
    id : user._id,username : user.username
     },process.env.jwt_secret,{expiresIn:"1d"}
     )
res.cookie("token",token)     
res.status(200).json({
    message:"succesfully login",
    user: {
        email:user.email,
        username: user.username,
        bio:user.bio,
        profileimage:user.profileimage,
    }
  })
     
}


async function registercontroller(req,res){
    const{username,email,password,bio,profileimage}=req.body 
   const userexists =  await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
   })
 if (userexists){
         return res.status(409).json({
        message : "user already exists with this email" + (userexists.email==email?"email already exists ":"username already exists")
        })
  
    }
 const hash = await bcrypt.hash(password,10)
 const user = await userModel.create({
    username,
    email,
    bio,
    profileimage,
    password : hash
 })

const token = jwt.sign({
id : user._id,
username : user.username
},process.env.jwt_secret,{expiresIn:"1d"}
  )

  res.cookie("token",token)
  res.status(201).json({
    message:"user registered successfully",
    user: {
        email:user.email,
        username: user.username,
        bio:user.bio,
        profileimage:user.profileimage,
    }
  })
}
 async function getMeController(req,res){
  const userId = req.user.id;

  const user = await userModel.findById(userId)

  res.status(200).json({
    message : "User fetched successfully",
    user : {
      email : user.email,
      username : user.username,
      bio : user.bio,
      profile_image : user.profileimage
    }
  })
}
module.exports = {
     logincontroller,
     registercontroller,
     getMeController
}