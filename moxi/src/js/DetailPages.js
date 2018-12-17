jQuery(function($){
    $(".menus").on("click","a",function(){
        // 当前点击标签为a，修改a的href属性值+传入当前点击文本
        $(this).attr("href","../html/goods.html?"+$(this).html());
    })
    var currentId = decodeURI(location.search).substr(1);
    console.log(currentId,location.search);
    // 发送请求获取当前点击的数据
    $.ajax({
        type: "get",
        data: {"currentId" : currentId},
        url: "/src/api/DetailPages.php",
        success: function(res){
            console.log(res);
            var a=1;
            var res = JSON.parse(res);
            var detailtitle = document.querySelector(".detailtitle");
            var detailText = document.querySelector(".detailText");
            var detailTitle = document.querySelector(".detailTitle");
            var imgBig = document.querySelector(".imgBig>div>img");
            var imgSmall = document.querySelector(".imgSmall>div>img");
            var price = document.querySelector(".price>.price1");
            var offprice1 = document.querySelector(".offprice1");
            console.log(price);
            for(var key in res){
                detailTitle.innerHTML = res[key].title;
                imgBig.src = res[key].url;
                imgSmall.src = res[key].url;
                price.innerHTML = res[key].price;
                detailText.innerHTML = res[key].goodsname;
                detailtitle.innerHTML = res[key].title;
                offprice1.innerHTML = res[key].offprice
            }
            
                // 点击加入购物车数量+1
            var car = document.querySelector(".goodsSelectBottom>.car");
            var carNum = document.querySelector(".carNum");
            car.onclick = function(){
            // console.log(res);        
                for(var key in res){
                    var currentId = res[key].id;
                    var currentTitle = res[key].title;
                    var currentImg = res[key].url;
                    var currentPrice = res[key].price;
                    var currentGoods = res[key].goodsname;
                }
                console.log(currentId,currentPrice,currentImg,currentTitle);
                $.ajax({
                    type: "get",
                    data: {"currentId" : currentId,"currentTitle" : currentTitle,"currentImg" : currentImg,"currentPrice" : currentPrice,"currentGoods" : currentGoods},
                    url: "/src/api/buyCar.php", 
                    success: function(res){
                        var res = JSON.parse(res);
                        console.log(res);
                        for(var key in res){
                            carNum.innerHTML = res[key].qty;
                        }
                    }
                
                })
            }
            // 点击立即购买跳转页面
            var buy = document.querySelector(".goodsSelectBottom>.buy");
            buy.onclick = function(){
                location.href = "../html/shoppingCar.html";
            }


        }

    })

    // 点击高亮当前span
    $(".selectSpan").on("click","span",function(){
        $(this).addClass("goodsActive").siblings("span").removeClass("goodsActive");
        $(this).removeClass("bordercolor").siblings("span").addClass("bordercolor");
        $(".spanL").removeClass("bordercolor");
    })
   


}) 