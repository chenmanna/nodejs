jQuery(function($){
    // 获取图片数据渲染Cgoods
    $.ajax({
        type: "get",
        url:"/src/api/indexImg.php",
        success:function(res){
        console.log(res);
            res = JSON.parse(res);
            var banners = []; 
            var imgBig = [];
            var imgSmall = [];                
                for(var key in res){
                    if(res[key].uname=="banner"){
                        banners.push(res[key].url);   
                    }else if(res[key].uname=="babyBig"){
                        imgBig.push(res[key].url);
                    }else if(res[key].uname=="baby"){
                        imgSmall.push(res[key].url);
                    }
                }
                // $("#Cgoods .goodsImgs .Cgoods_l>ul").addClass("horizontal")
            // $(".Cgoods_l").lmCarousel({imgs:banners,width: 299,height:449});
            $(".banner1").lmCarousel({imgs:banners,width: 299,height:449});
            $(".banner2").lmCarousel({imgs:banners,width: 299,height:449});
            $(".banner3").lmCarousel({imgs:banners,width: 299,height:449});
            $(".banner4").lmCarousel({imgs:banners,width: 299,height:449});
            $(".banner5").lmCarousel({imgs:banners,width: 299,height:449});            
            for(var i=0;i<imgBig.length;i++){
                var img = `<img src="${imgBig[i]}"/>`
                 if(i==0){
                    $(".bigImg1").append(img);
                 }else if(i==1){
                    $(".bigImg2").append(img);
                 }
            }
            console.log(imgBig,imgSmall,99999999999,"li:",);
            var lis = $(".goodsImgs .lis");
            for(var i=0;i<imgSmall.length;i++){
                var img = `<img src="${imgSmall[i]}"/>`;
                lis.eq(i).append(img);
            }
        }
    })
    // banner
    $(".banners").lmCarousel({imgs:["images/Banner2 (1).png","images/Banner2 (2).jpg","images/Banner2 (3).jpg","images/Banner2 (4).jpg","images/Banner2 (5).png"],width: 809,height:401});
    // 点击三级导航跳转
    var goodsCon = document.querySelectorAll(".navText>div");
    var goodsTitle = document.querySelectorAll(".navText>div>a");
    console.log(232,goodsCon,"aaaaaa",goodsTitle);
    console.log($(".menus"));
    $(".menus").on("click","a",function(){
        // 当前点击标签为a，修改a的href属性值+传入当前点击文本
        $(this).attr("href","html/goods.html?"+$(this).html());
    })
}) 