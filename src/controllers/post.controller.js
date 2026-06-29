
 const postmodel = require("../models/post.model")
 const ImageKit = require("imagekit")
 const jwt = require("jsonwebtoken");
const { post } = require("../app");
const likeModel = require("../models/like.model");




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

 // Like Post Controller
async function likePostController(req , res){
    const username = req.user.username;
    const postId = req.params.postId;

    // Find the post
    const post = await postmodel.findById(postId)

    if(!post){
      return res.status(404).json({
        message : "Post Not Found!"
      })
    }

    // Check if the user has alredy liked the post
    const isUserLiked = await likeModel.findOne({
      postId : postId,
      user : req.user.id
    })

    if(isUserLiked){
      return res.status(400).json({
        message : "You have already liked this post"
      })
    }

    // Create the like
    const like = await likeModel.create({
      post : postId,
      user : req.user.id
    })

    return res.status(200).json({
      message : "Post Liked Successfully",
      like
    })
}

async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.id

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })

    return res.status(200).json({
        message: "post unliked successfully."
    })
}

async function getFeedController(req, res) {
        const userId = req.user.id;

    const posts = await Promise.all((await postmodel.find({}).populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
              user: userId,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}

 module.exports={
    createPostControl,
    getpostcontroller,
    getpostdetail,
    likePostController,
    unLikePostController,
    getFeedController
 }




