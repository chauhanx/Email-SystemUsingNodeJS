var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

var transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    auth:{
        user:"",
        pass:""
    }
});

app.get('/',function(req,res){
    // Enter your complete directory
    res.sendFile('__dirname/index.html');
});
app.get('/send',function(req,res){
    var mailOption = {
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOption);
    transporter.sendMail(mailOption,function(err,response){
        if(err){
            console.log("Error!!!");
            res.end("Error!!");
        }
        else{
            console.log("Message Sent:" + response.message);
            res.end("Sent!!");
        }
    });
});
app.listen(8080,function(){
    console.log("Server is running on port 8080");
});