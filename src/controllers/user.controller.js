const followmodel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followusercontroller(req,res){
     const followers= req.user.username
     const following= req.params.username
     if(followers==following){
     return res.status(400).json({
        message : "u cant follow urself u lowlife idiot "
     })

     }
      const isalreadyfollowing = await followmodel.findOne({
        followers : followers,
        following : following
      })

      if(isalreadyfollowing){
        return res.status(400).json({
            message : " u r already following  bitch",
            followers : isalreadyfollowing
        })
      } 
      const isfollowingexists = await userModel.findOne({
        username : following
      })
      if(!isfollowingexists){
        return res.status(404).json({
          message : "user doesnt exists"
        })
      }
     const followerrecord = await followmodel.create({
        followers : followers,
        following : following
     })
       res.status(201).json({
      message: `u r following ${following}`,
      follow: followerrecord
      })

       }

async function unfollowusercontroller(req,res){
     const followers= req.user.username
     const following= req.params.username

     const isuserfollowing = await followmodel.findOne({
      followers : followers,
        following : following})


        if (!isuserfollowing){
          return res.status(200)({
            message : "u r not following ${following}"
          })
        }

        await followmodel.findByIdAndDelete(isuserfollowing._id)

        res.status(200).json({
          message : "u have unfollowed ${following}"
        })
     }

    

     module.exports={followusercontroller,unfollowusercontroller}