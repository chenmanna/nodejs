// 创建模块
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// 链接数据库
const db = require('./mongo/mongoose.js');

// 解析post请求
app.use(bodyParser.urlencoded({ extended: false })); 

// 静态资源目录
 app.use('/admin',express.static(path.join(__dirname,'./admin')));
 app.use(express.static(path.join(__dirname,'./img')));

 // 路由
 const adminRouter = require('./router/goodsAdmin.js');
 const fileImgRouter = require('./router/fileImg.js');
 const emailRouter = require('./router/sendCode.js');
 const loginUserRouter = require('./router/loginUser.js');

// 数据增删改查
 app.use('/goodsAdmin',adminRouter);
 // 文件(图片)上传
 app.use('/fileImg',fileImgRouter); 
 // 邮箱验证 
 app.use('/sendCode',emailRouter);
 // 注册用户信息
 app.use('/loginUser',loginUserRouter);


 app.listen(2998,()=>{ 
 	console.log('server start in port'+2998); 
 })

 