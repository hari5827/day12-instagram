const express= require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"}

))

/** routes require */
const authR = require("./routes/auth.routes")
const postR=require("./routes/post.routes")
const userRouter = require("./routes/user.routes")


/** using routes*/
app.use("/api/auth",authR)
app.use("/api/post",postR)
app.use("/api/users",userRouter)


/**export function */
module.exports=app