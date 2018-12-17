const express = require('express');
const Router = express.Router();
// 引入数据模型
const Goods = require('../mongo/goodsSchema.js');
// Goods.inserMany({offprice:111,goodsname:'jjj',url:'jlkd',title:'hahah',price:333333});


/**
 * @api {post} /goodsAdmin/addGoods/ 添加商品
 * @apiName addGoods
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} offprice  商品折扣价
 * @apiParam {String} goodsname 商品名称
 * @apiParam {String} url 图片地址
 * @apiParam {String} title 商品描述
 * @apiParam {String} price 商品价格 
 *
 * @apiSuccess {Number} err 错误码 0：ok  -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
 // 添加商品==========================
Router.post('/addGoods',(req,res)=>{
// 1.接受数据
 let {offprice,goodsname,url,title,price}=req.body
 Goods.insertMany({offprice,goodsname,url,title,price})
 .then((data)=>{
 	res.send({err:0,msg:'添加成功',data:null})
 })
 .catch((err)=>{

 	console.log(err)
    res.send({err:-1,msg:'添加失败',data:null})
 })

})


/**
 * @api {post} /goodsAdmin/getGoods/ 商品页数据渲染
 * @apiName getGoods
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} pagesize 每页的条数
 * @apiParam {String} page 页数
 *
 * @apiSuccess {Number} err 错误码 0：ok  -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 查询商品===============================
Router.post('/getGoods',(req,res)=>{
	//返回总条数
  // Goods.find()查询所有
  // Goods.find({tyle:‘音乐’})//分类查询
  // Goods.find().limit(5).skip(5)//分页查询
  // 1页2条
  // 2   0
  // 2   2
  // 2   4
  // let pagesize=2//每页的条数
  // let page=1//页数o
  let  {pagesize,page}=req.body
  let obj={}
  Goods.find()
  .then((data)=>{
  	// 获取总条数
  	obj.total=data.length
  	  return Goods.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
  })
  .then((data)=>{
  	//处理的是第几页的几条数据
  	obj.goodslist=data
  	res.send({err:0,msg:'查询成功',data:obj})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误',data:null})
  })

})


/**
 * @api {post} /goodsAdmin/delGood/ 删除商品
 * @apiName delGood
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} id  商品id
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 删除商品===========================
Router.post('/delGood',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id=req.body.id;
  // Goods.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  //Goods.remove({_id:{$in:array}})//批量删除
  Goods.remove({_id:id})
  .then((data)=>{
  	res.send({err:0,msg:'删除成功',data:null})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'删除no成功',data:null})
  })

})


/**
 * @api {post} /goodsAdmin/updateGoods/ updateGoods
 * @apiName updateGoods
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} offprice  商品价格
 * @apiParam {String} goodsname 商品名称
 * @apiParam {String} url 图片地址
 * @apiParam {String} title 商品描述
 * @apiParam {String} price 商品价格 
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 修改商品=============================
Router.post('/updateGoods',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id=req.body.id;
  let {offprice,goodsname,url,title,price}=req.body
  Goods.update({_id:id},{offprice,goodsname,url,title,price})
  .then((data)=>{
  	res.send({err:0,msg:'修改成功',data:null})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'修改no成功',data:null})
  })

})


/**
 * @api {post} /goodsAdmin/findGoods/ 模糊查询
 * @apiName findGoods
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} searchVal 搜索商品值
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// m模糊查询 关键字查询==========================
Router.post('/findGoods',(req,res)=>{
  	let searchVal=req.body.searchVal;
  	console.log(searchVal);
  	Goods.find(
    {
        $or : [ //多条件查询，数组
            {goodsname : {$regex : searchVal}},
            {price : {$regex : searchVal}}
        ]
    })
    // Goods.find({price:searchVal})
  	.then((data)=>{
  		res.send({err:0,msg:'查询成功',data:data})
  	})
  	.catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询失败',data:null})
  })

})



/**
 * @api {post} /goodsAdmin/getDetails/ 商品信息（修改页面初始渲染）
 * @apiName getDetails
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} currentId  修改页当前商品id（渲染）
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 查询商品详情================================
Router.post('/getDetails',(req,res)=>{
	let currentId = req.body.currentId;
	console.log(currentId);
	Goods.find({_id:currentId})
	.then((data)=>{
		res.send({err:0,msg:'当前商品详情',data:data})
	})
	.catch((err)=>{
		console.log(err);
		res.send({err:-1,msg:'商品信息错误',data:null})
	})
})



/**
 * @api {post} /goodsAdmin/goodsUpdate/ 修改商品
 * @apiName goodsUpdate
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} offprice  商品折扣价
 * @apiParam {String} goodsname 商品名称
 * @apiParam {String} url 图片地址
 * @apiParam {String} title 商品描述
 * @apiParam {String} price 商品价格 
 * @apiParam {Number} currentId 修改页当前商品id（修改提交）
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
//修改商品数据===========================
Router.post('/goodsUpdate',(req,res)=>{
	console.log(req.body);
	// res.send('aaa');
	let {offprice,goodsname,url,title,price,currentId}=req.body
	Goods.updateMany({_id: currentId},{$set:{offprice:offprice,goodsname:goodsname,url:url,title:title,price:price}},function(err,doc){
		if(err){
			console.log(err);
		}else{
			console.log('修改');
		}
	})
	// 成功返回
	.then((data)=>{
		res.send({err:0,msg:'修改数据成功',data:null});
	})
	// 失败返回
	.catch((err)=>{
		res.send({err:-1,msg:'修改失败',data:null});
	})

}) 



/**
 * @api {post} /goodsAdmin/sortup/ 价格降序
 * @apiName sortup
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} null  折扣价升序
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 价格排序上==========================
Router.post('/sortup',(req,res)=>{
  // res.send('112');
  Goods.find({},null,{sort: {'offprice' : -1}},(err,data)=>{
    if(err){
      console.log({err: -1,msg:'排序失败',data: null});
    }else{
      res.send({err: 0,msg:'排序成功',data: data})
    }

  })
})


/**
 * @api {post} /goodsAdmin/sortdown/ 价格降序
 * @apiName sortdown
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} null 折扣价降序  
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 价格排序下===========================
Router.post('/sortdown',(req,res)=>{
  // res.send('112');
  Goods.find({},null,{sort: {'offprice' : 1}},(err,data)=>{
    if(err){
      console.log({err: -1,msg:'排序失败',data: null});
    }else{
      res.send({err: 0,msg:'排序成功',data: data})
    }

  })
})


/**
 * @api {post} /goodsAdmin/someDel/ 批量删除
 * @apiName someDel
 * @apiGroup goodsAdmin
 *
 * @apiParam {String} IDs 删除的数组id  
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
// 批量删除==========================
Router.post('/someDel',(req,res)=>{
  // res.send('1111');
  var IDs = JSON.parse(req.body.IDs);
  console.log(IDs);
  Goods.deleteMany({_id:{$in: IDs}})
    .then((data)=>{
    res.send({err:0,msg:'删除成功',data:null});
  })
  // 失败返回
  .catch((err)=>{
    res.send({err:-1,msg:'删除失败',data:null});
  })

})

module.exports=Router;