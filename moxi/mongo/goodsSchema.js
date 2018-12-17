// 创建数据模型
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let goosdSchema = new Schema({
 	offprice:{type:Number,required:true},
 	goodsname:{type:String,required:true},
 	url:{type:String,required:true},
 	title:{type:String,required:true},
 	price:{type:String,required:true} 
});
// 将Schema转为module对象
let Goodstotal = mongoose.model('Goodstotal',goosdSchema);
// 抛出模块
module.exports = Goodstotal;

