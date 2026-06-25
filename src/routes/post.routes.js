const express =  require("express")
const postR = express.Router()
const postcontroller = require("../controllers/post.controller")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware");
const upload = multer({ storage:multer.memoryStorage() })
postR.get("/",authMiddleware,postcontroller.createPostControl)
postR.post("/",upload.single("image"),authMiddleware,postcontroller.createPostControl)
postR.get("/details/:postId",authMiddleware,postcontroller.getpostdetail)

module.exports = postR