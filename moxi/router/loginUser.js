const express = require('express');
const Router = express.Router();
// 引入数据模型
const User = require('../mongo/userSchema.js');

//注册添加用户信息================
Router.post('/adduser',(req,res)=>{
	let {username,password} = req.body;
	User.insertMany({username,password})
	.then((data)=>{
		res.send({err: 0,msg: '添加成功', data:data});
	})
	.catch((err)=>{
		console.log(err);
		res.send({err: -1,msg: '添加失败',data: null});
	})
})

// 登陆=====================
Router.post('/login',(req,res)=>{
	let {user,password}=req.body;
	User.find({username:user,password:password})
	.then((data)=>{
		if(data.length>0){
			res.send({err: 0,msg: '用户信息',data: data});
		}else{
			res.send({err: -1,msg: '用户不存在',data: data});
		}
	})
	.catch((err)=>{
		res.send({err: -2,msg: '查询失败',data: null});
	})
})


// 查询登陆用户信息=================
Router.post('/currentUser',(req,res)=>{
	// console.log(req.body);
	// res.send('aaa');	
	var currentUser = req.body.currentUser;
	User.find({username: currentUser})
	.then((data)=>{
		res.send({err: 0,msg: '当前登陆用户',data: data});
	})
	.catch((err)=>{
		res.send({err: 0,msg: '网络错误，查询失败',data: data});

	})
})

// 查询用户名是否已存在============
Router.post('/username',(req,res)=>{
	var email = req.body.email;
	User.find({username : email})
	.then((data)=>{
		if(data.length>0){
			res.send('用户名已存在');
		}else{
			res.send('用户不存在');
		}
	})
	.catch((err)=>{
		res.send({err: -2,msg: '网络错误，查询失败',data: null});
	})
})
module.exports=Router;