jQuery.fn.lmCarousel = function(obj){
    console.log(this);
    var defaults = {
        imgs : [],
        width : 300,
        height : 300,
        type : "horizontal",
        seamless : false,
        idx : 0,
    };
    var opt = Object.assign({},defaults,obj);
    var len = opt.imgs.length;
    var $ul;
    var init = () => {
        // 1.创建ul、li、img,将img追加到li，将li追加到ul，将ul追加到this(jq实例对象)
        // 图片宽度
        $ul = $("<ul/>");
        for(var i=0;i<len;i++){
            $li = $("<li/>");
            $('<img src="'+opt.imgs[i]+'"/>').width(opt.width).height(opt.height).appendTo($li);
            $li.appendTo($ul);
        }
        $ul.appendTo(this);
        this.addClass('lmCarousel').width(opt.width).height(opt.height);
        // 2.判断type类型，实现不同的css样式
        if(opt.type == "horizontal"){
            $ul.addClass('horizontal');
            $ul.width(opt.width*len);
        }else if(opt.type == "fade"){
            $ul.addClass('fade');
            $ul.width(opt.width).height(opt.height);
            $ul.children().eq(opt.idx).css("opacity",1).siblings().css("opacity",0)
        }
        move();
    }
    var move = () => {
        setInterval(function(){
            opt.idx ++;
            showPic();
        },2000)
    }
    var showPic = ()=>{
        // 无缝滚动：判断
        if(opt.idx > len-1){
            opt.idx = 0;
        }else if(opt.idx < 0){
            opt.idx = len-1;
        }
        if(opt.type == "vertical"){
            $ul.animate({top:-opt.idx*opt.height},1000);
        }else if(opt.type == "horizontal"){
            $ul.animate({left:-opt.idx*opt.width},1000);
        }else if(opt.type == "fade"){
            $ul.children().eq(opt.idx).animate({opacity:1},1000).siblings().animate({opacity:0},1000);
        }
    }


    //点击索引的小图标，opt.idx,showPic()
    init();
    // 移入box，停止动画，移除开启动画
    // 判断seamless，判断索引
}
