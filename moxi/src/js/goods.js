jQuery(function($){
    // $(".menus").on("click","a",function(){
    //     // 当前点击标签为a，修改a的href属性值+传入当前点击文本
    //     $(this).attr("href","#");
    // })
     $(".menus").on("click","a",function(){
        // 当前点击标签为a，修改a的href属性值+传入当前点击文本
        $(this).attr("href","goods.html?"+$(this).html());
    })
    var currentCon = decodeURI(location.search).substr(1);  
    console.log(currentCon);
    var search_l = document.querySelector(".search-l");
    search_l.value = currentCon;
    search_l.style.color="#ccc";
    // 发起请求获取数据
     $.ajax({ 
        type: "get", 
        data : {"goodsname": currentCon},
        url:"/src/api/goods.php",
        success:function(res){
            var resObj = JSON.parse(res);
            console.log(res);
            console.log(typeof(res));
            // 静态生成
            // var goodsUl = document.querySelectorAll(".goodslist>ul");
            // var goodsLi = goodsUl.children;
            // var goodsImg = document.querySelectorAll(".goodslist>ul>li>img");
            // var goodsSpan = document.querySelectorAll(".goodslist>ul>li>span");
            // var goodsP = document.querySelectorAll(".goodslist>ul>li>p");
            // console.log("ul",goodsUl,"li",goodsLi,"img",goodsImg,"span",goodsSpan,"P",goodsP)
            // for(var key in res){
            //     goodsImg[key].src = res[key].url;
            //     goodsSpan[key].innerHTML = res[key].price + "元";
            //     goodsP[key].innerHTML = res[key].title;
            //     console.log(res[key].url)
           // ================================
            // 获取数据渲染页面goodslist
            var goodslist = document.querySelector(".goodslist");
            console.log(goodslist);
            var goodsUL = document.createElement("ul");
            goodsUL.classList.add("goodsUL");
            var liCon="";
             for(var key in resObj){
                 liCon += `<li id="${resObj[key].id}"class="goodsLI"><img class="goodsIMG" src="${resObj[key].url}"/><span class="goodsSPAN">${resObj[key].price}</span><p class="goodsP">${resObj[key].title}</p></li>`
            }
            console.log(liCon);
            goodsUL.innerHTML = liCon;
            goodslist.appendChild(goodsUL);
            // 排序升序
            var salesTop = document.querySelector(".salesTop");
            salesTop.onclick = function(){
                var goodslist = document.querySelector(".goodslist");
                goodslist.innerHTML = "";
                $.ajax({ 
                    type: "get", 
                    data : {"goodsname": currentCon},
                    url:"/src/api/goodsStorUp.php",
                    success:function(res){
                        console.log(res);
                        var resObj = JSON.parse(res);
                        var goodslist = document.querySelector(".goodslist");
                        console.log(goodslist);
                        var goodsUL = document.createElement("ul");
                        goodsUL.classList.add("goodsUL");
                        var liCon="";
                         for(var key in resObj){
                            liCon += `<li id="${resObj[key].id}"class="goodsLI"><img class="goodsIMG" src="${resObj[key].url}"/><span class="goodsSPAN">${resObj[key].price}</span><p class="goodsP">${resObj[key].title}</p></li>`
                        }
                        console.log(liCon);
                        goodsUL.innerHTML = liCon;
                        goodslist.appendChild(goodsUL);
                    }
                })   
                console.log(currentCon);  
            }

            // 降序
            var salesBottom = document.querySelector(".salesBottom");
            salesBottom.onclick = function(){
                var goodslist = document.querySelector(".goodslist");
                goodslist.innerHTML = "";
                $.ajax({ 
                    type: "get", 
                    data : {"goodsname": currentCon},
                    url:"/src/api/goodsStorDown.php",
                    success:function(res){
                        console.log(res);
                        var resObj = JSON.parse(res);
                        var goodslist = document.querySelector(".goodslist");
                        console.log(goodslist);
                        var goodsUL = document.createElement("ul");
                        goodsUL.classList.add("goodsUL");
                        var liCon="";
                         for(var key in resObj){
                            liCon += `<li id="${resObj[key].id}"class="goodsLI"><img class="goodsIMG" src="${resObj[key].url}"/><span class="goodsSPAN">${resObj[key].price}</span><p class="goodsP">${resObj[key].title}</p></li>`
                        }
                        console.log(liCon);
                        goodsUL.innerHTML = liCon;
                        goodslist.appendChild(goodsUL);
                    }
                })   
                console.log(currentCon);  
            }
            // 点击传送当前id
            var $goodslist = $(".goodslist");
            $goodslist.on("click","li",function(){
                location.href = "../html/DetailPages.html?" + $(this).attr("id");
            })
            console.log(11111111,goodslist,2222222222222,$(".goodslist"))
        }
    })


})