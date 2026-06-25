
 const postmodel = require("../models/post.model")
 const ImageKit = require("imagekit")
 const jwt = require("jsonwebtoken");
const { post } = require("../app");



 const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY  ,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_endpoint
 })
 async function createPostControl(req, res) {
    try {
        
        

        if (!req.file) 
            return res.status(400).send("No file uploaded");

       
        const file = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname,
            folder: "/posts"
        });

        const post = await postmodel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: req.user.id 
        });

        
        res.status(201).json({ message: "Post created", post });

    } catch (error) {
        res.status(500).send(error.message);
    }
 }


 async function getpostcontroller(req,res) {

    const userId = req.user.id
  
   
   const posts = await postmodel.find({
    user:userId
   })
  res.status(200)
  .json({
    message : " post fetched successfulyy",posts
  })
 }

 async function getpostdetail(req,res) {
   
 const userId = req.user.id
 const postId = req.params.postId

 const post = await postmodel.findById(postId)
 if(post){
    return res.status(404).json({
        message : " post not found "
    })
 }


 const isvaliduser = post.user === userId
 if(!isvaliduser){
    return res.status(403).json({
        message : " forbidden content"
    })
 }

 return res.status(402).json({
    message : " post fetched successfully",post
 })
 }

 module.exports={
    createPostControl,
    getpostcontroller,
    getpostdetail
 }




