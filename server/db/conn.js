const mongoose=require('mongoose')
const express=require('express')
const app=express()
const db = process.env.DATABASE
const port=process.env.PORT
mongoose.connect(db,{
    
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
module.exports= port
