var express = require('express');

var router = express .Router();

var User = require('../models/usermodel');

router.post('/register',(req,res)=>{
    let user = new User ({
        email:req.body.email,
        phone   : req.body.phone,
        name :req.body.name,
        password :req.body.password
    });
   console.log("user");
    User.adduser(user,(err,result)=>{
        if(err){
            return res.json({success:false,message :err});
        }
        else{
            return res.json({success:true,message :result});
        }
    });
})

router.post('/login',(req,res)=>{
    User.login(req.body.email,req.body.password,req.body.name,(err,result)=>{
        if(err){
            return res.json({success:false,message :err});
        }
        else{
            return res.json({success:true,message :result});
        }
    })
})
console.log("log success");
module.exports = router;