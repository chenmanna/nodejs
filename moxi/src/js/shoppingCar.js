jQuery(function($){
     $(".menus").on("click","a",function(){
        // 当前点击标签为a，修改a的href属性值+传入当前点击文本
        $(this).attr("href","../html/goods.html?"+$(this).html());
    })
    $.ajax({
        type: "get",
        url: "/src/api/shoppingCar.php",
        success: function(res){
            var goodsNumber = document.querySelector(".goodsNumber");
            getRes(res);
            var deletegoods = document.querySelector(".deletegoods");
            goodsNumber.onclick = function(e){
                console.log(55,e.target);
                // 点击删除当前商品数据
                if(e.target.className=="deletegoods"){
                    console.log(55);
                    var currentId = e.target.parentElement.parentElement.getAttribute("guid");
                    console.log(currentId);
                    $.ajax({
                        type: "get",
                        data: {"currentId" : currentId},
                        url: "/src/api/deletegoods.php",
                        success: function(res){
                            // 页面渲染
                            getRes(res);
                            if(res == "[]"){
                                goodsNumber.innerHTML = '';
                                var totalPrice = document.querySelector(".totalPrice");
                                totalPrice.innerHTML = '';
                            }
                        }
                    })

                }
                // 点击增加减少数量
                if(e.target.className == "numJian"){
                    var qty = e.target.nextElementSibling;
                    console.log(e.target,11111111,qty);
                    if(qty.value<=0){
                        return;
                    }else{
                        qty.value = (qty.value*1)-1;
                        getprice(e,qty);
                    }   
                           
                }else if(e.target.className == "numJia"){
                    var qty = e.target.previousElementSibling;
                    qty.value = (qty.value*1)+1;
                    getprice(e,qty);   
                }
            }

            // 获取res渲染页面
            function getRes(res){
                res = JSON.parse(res);
                // var goodsNumber = document.querySelector(".goodsNumber");
                //页面渲染
                for(var i=0;i<res.length;i++){
                    var lis="";
                    for(var key in res){
                        lis += `<ul class="ulList" guid="${res[key].uid}"><li class="goodsImgTitle"><div class="F_left"><img src="${res[key].url}" alt="" /></div><p class="F_left">${res[key].title}</p></li><li class="goodsprice1">${res[key].price}</li><li><div class="goodsbuyNum"><input type="button" value = "-" class="numJian"/><input type="text" value= "${res[key].qty}" class="goodsQty"/><input type="button" value = "+" class="numJia"/></div></li><li class="oneTotal">${res[key].qty*res[key].price}</li><li><p>移入收藏夹</p><p class="deletegoods">删除</p></li></ul>`           
                    }
                    goodsNumber.innerHTML = lis; 
                }
                // 单价保留两位小数？？
                var oneTotal = document.querySelector(".oneTotal");
                console.log(oneTotal);
                oneTotal.innerHTML = (oneTotal.innerHTML*1).toFixed(2);
                // 计算总价
                var totalPrice = document.querySelector(".totalPrice");
                var oneTotal = document.querySelectorAll(".oneTotal");
                var momey = 0;
                for(var i=0;i<oneTotal.length;i++){
                   momey += oneTotal[i].innerHTML*1;
                }
                totalPrice.innerHTML = momey;
            }    
            
             // getprice();
            // 计算价格
            function getprice(e,qty){
                var currentLi = e.target.parentElement.parentElement;
                var currentprice = currentLi.previousElementSibling;
                var currentOneTotal = currentLi.nextElementSibling;
                currentOneTotal.innerHTML = (currentprice.innerHTML * qty.value).toFixed(2);
                var totalPrice = document.querySelector(".totalPrice");
                var oneTotal = document.querySelectorAll(".oneTotal");
                var momey = 0;
                for(var i=0;i<oneTotal.length;i++){
                   momey += oneTotal[i].innerHTML*1;
                }
                totalPrice.innerHTML = momey;

            }
        }

        
    }) 
})