const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const auth =  express.Router()



auth.post('/login', authcontroller.logincontroller)

auth.post('/register',authcontroller.registercontroller)

auth.get("/get-me",authMiddleware, authcontroller.getMeController);

module.exports=auth