// 创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
 	username:{type:String,required:true},
 	password:{type:String,required:true}},
 	{timestamps: {createdAt: 'created',updatedAt: 'updated'}
 	
});
// 将Schema转为module对象
let userinfo = mongoose.model('userinfo',userSchema);
// 抛出模块
module.exports = userinfo;
