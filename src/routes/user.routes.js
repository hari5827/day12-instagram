const express = require("express")
const usercontroller = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const userRouter = express.Router()

userRouter.post("/follow/:username",authMiddleware,usercontroller.followusercontroller)

userRouter.post("/unfollow/:username",authMiddleware,usercontroller.unfollowusercontroller)
module.exports=userRouter;
