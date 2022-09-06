var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var userRoute = require('./routines/userroute');
var port = 3000;
var mongose = require('mongoose');
var config = require('./config');
const cors = require('cors');
//set public resources folder
app.use(express.static(__dirname +'/public'));

//add middleware
var corsOption ={
    origin:'http://localhost:4200',
    optionsSuccessStatus:200
}
app.use(cors(corsOption))

app.use(bodyParser.json());
app.use('/users',userRoute);

// connect to mongodb

mongose .connect(config.dbUrl);
mongose .connection.on('connected',()=>{
    console.log('connected to db');
});
mongose.connection.on('error',err =>{
    console.log("Error at mongoDb:"+ err);
})
//set your first route
app.get('/',(req,res)=>{
    //res.send("hello Node");
    res.sendFile(path.join(__dirname,'public/index.html'));
});
var server = http.createServer(app);
server.listen(port,()=>{
    console.log('server is starting ='+ port);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Request methods u wish to allow
    
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //Request header you widht to allow
    
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    //Pass to next Layer of middleware
   
 next();
});