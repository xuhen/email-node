var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

var smtpTransport = nodemailer.createTransport({
	service: "163",
	host: "smtp.163.com",
	secureConnection: true,
	port: 465,
	auth: {
		user: "发起邮箱@163.com",
		pass: "授权码"
	}
});

app.get('/',function(req,res){
	res.sendfile('index.html');
});

app.get('/send',function(req,res){
	var mailOptions={
		from: "发起邮箱@163.com",
		to : req.query.to,
		subject : req.query.subject,
		text : req.query.text
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}else{
			console.log(response);
			res.end('sent');
		}
	});
});

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});