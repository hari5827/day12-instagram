const express =  require("express")
const postR = express.Router()
const postcontroller = require("../controllers/post.controller")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware");
const upload = multer({ storage:multer.memoryStorage() })
postR.get("/",authMiddleware,postcontroller.createPostControl)
postR.post("/",upload.single("image"),authMiddleware,postcontroller.createPostControl)
postR.get("/details/:postId",authMiddleware,  postcontroller.getpostdetail)
postR.post("/like/:postId" , authMiddleware , postcontroller.likePostController)
postR.post("/unlike/:postId" , authMiddleware , postcontroller.unLikePostController)
postR.get("/Feed",authMiddleware , postcontroller.getFeedController)





module.exports = postR