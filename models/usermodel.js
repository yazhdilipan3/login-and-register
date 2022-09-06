const { Int32 } = require('mongodb');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email :{
        type:String,
        required : true,
        unique : true
    },
    phone :{
        type:String,
        required :true
    },
    name :{
        type:String,
        required : true 
    },
    password :{
        type:String,
        required : true
    }

});

var User = mongoose.model('User',userSchema);

//save user in database
User.adduser  = function(user,callback){
    user.save((err,result)=>{
    if(err){
        console.log("failed to add");
        return callback("failed",null);
    }else{
        callback(null,'user added');
    }
});
}

//login 

User.login = (email,password,name,callback)=>{
    User.findOne({email:email},(err,user)=>{
        if(err){
            console.log(err);
            callback('server error');
        }else if (user ==undefined){
            callback('user not found');
        }
        else if (name  == user.name){
            callback(null,"login");
        }
        else{
            if(password == user.password){
                callback(null,'login successfuly');
            }else{
                callback('login info');
            }
        }
    })
}

module.exports= User;