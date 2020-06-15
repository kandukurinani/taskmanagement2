var express=require('express');
var bodyParser=require('body-parser')
var userRouter = require('./Taskmanagement/router');
const fileUpload = require('express-fileupload');
const app = express(); 
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
//var app=express();
app.use(bodyParser.json());
app.use('/Taskmanagement', userRouter);


app.listen(2222,()=>{
    console.log("server running");
})