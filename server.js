require('dotenv').config()
const app = require("./src/app")
const connecttodb = require("./src/config/database")
connecttodb()

app.listen(3000,()=>{
    console.log("server running on port 3000")
})