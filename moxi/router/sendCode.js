const express = require('express');
const Router = express.Router();
// 导入数据模块
const email = require('./sendEmail.js');
// 1验证码注册===========================
// 声明对象用于存放验证码，手机号
let check ={};
Router.post("/getCode",(req,res)=>{
	let mail = req.body.mail;
	console.log(mail);
	// 判断传入的参数格式
	if(!mail){
		 res.send("数据错误");
	}
	// 存入随机数
	let code = parseInt(Math.random(0.1)*1000)
	check[mail]=code;
	// console.log(check);
	// 接收email导出的数据发送邮箱，（错误优先）回调函数回调用于判断验证码是否发送完成后续执行代码（发送成功或失败）
	email.sendMail(mail,code,(state)=>{
		// res.send('发送成功');
		if(state){
			// 发送失败
			 res.send('nosend');
		}else{
			// 发送成功
			 res.send('ok');
		}
	});
})


// 2验证码注册=====================
Router.post('/reg',(req,res)=>{
	let {mail,code}=req.body;
	// console.log({mail,code});
	// console.log(check);
	// 以上1===（邮箱，验证码）为键值对。判断是否等同于
	if(check[mail]==code){
		res.send('注册成功');
	}else{
		res.send('验证码错误');
	}
})



module.exports=Router;


