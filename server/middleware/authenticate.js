const jwt=require('jsonwebtoken')
const User=require('../model/userSchema')

const Authenticate=async(req,res,next)=>{
    try{
        console.log('authcalled')
        console.log(req.headers.token)
        const token=req.headers.token
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
        const rootUser=await User.findOne({_id:verifyToken._id,'tokens.token':token})
        if (!rootUser) {
            throw new Error('User not found')
        }
        req.token=token
        req.rootUser=rootUser
        req.userID=rootUser._id
        
        next()
    }catch(err){
        res.status(401).send({error:"Unauthorized:No token provided"})
        console.log(err)
    }
}
module.exports=Authenticate