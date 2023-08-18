const express=require('express')
const fileUpload = require("express-fileupload");

//headers and middleware setup


const app=express()

const cors = require('cors');           //use to allow other domain accessing this api
app.use(cors());

app.use(express.urlencoded({extended:false}))   //needed to use req.body
app.use(express.json())     //for handling input json data FOR API

app.use(fileUpload({        //define file size limits
    limits:{
        fileSize:1024*1024  //in bytes (1mb)
    },
    abortOnLimit:true,
    limitHandler:()=>console.log("limit crossed") 

}))       //use the middleware



module.exports=app;