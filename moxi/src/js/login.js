jQuery(function($){
    var nichen = document.querySelector(".nichen");
    var text= nichen.nextElementSibling;
        console.log(555555);
    nichen.onblur = function(){
        console.log(666)
        var _nichen = nichen.value;
        // 验证账号格式+用户名是否存在
       if(/^[0-9a-zA-Z_\u2E80-\u9FFF]{3,6}$/.test(_nichen)){
            text.classList.remove("fontActive");
            text.style.display = "none";
            $.ajax({
                type: "get",
                data: {"username":_nichen},
                url:"../api/signin.php",
                success:function(res){
                    console.log(res);
                    if(res=="no "){
                        alert("该用户名已注册")
                    }
                }
            })
        }else{ 
            text.style.display = "block";
            text.classList.add("fontActive");
        }
    }   
    var mima = document.querySelector(".mima");
    var mimaText = mima.nextElementSibling;
    mima.onblur = function(){
        var _mima = mima.value;
        if(/^[\w]{6,16}$/.test(_mima)){
            mimaText.classList.remove("fontActive");
            mimaText.style.display = "none";
        }else{
            mimaText.style.display = "block";
            mimaText.classList.add("fontActive");
        }
    }
    var yanzhen = document.querySelector(".yanzhen");
    var yanzhenText = yanzhen.nextElementSibling;
    yanzhen.onblur = function(){
        var _mima = mima.value;
        var _yanzhen = yanzhen.value;
        if(_yanzhen != _mima){
            yanzhenText.innerHTML = "两次输入密码不一致"
            return false;
        }else{
            yanzhenText.style.display = "none";
        }
    }
    var signinBtn = document.querySelector(".S_btn");
    // 随机验证码
    var number = document.querySelector(".number");
    var numText = document.querySelector(".numText");
    number.onclick = function(){
        numText.innerHTML = randomCode(4);
    }
    var yanzhenma = document.querySelector(".yanzhenma");
    yanzhenma.onblur = function(){
        if(yanzhenma.value != numText.innerHTML){
            alert("验证码输入有误");
        }
    }
   // 注册验证：用户信息是否存在+写入
    signinBtn.onclick = function(){
        var _mima = mima.value;
        var _yanzhen = yanzhen.value;
        var _nichen = nichen.value;
        if((_yanzhen == _mima) && (yanzhenma.value == numText.innerHTML)){
            $.ajax({
                type: "get",
                data: {"username":_nichen,"password":_mima},
                url:"../api/signin.php",
                success:function(res){
                    if(res=="no "){
                        alert("该用户名已注册")
                    }else if(res=="success "){
                        location.href = "../index.html";
                    }else if(res=="用户名或密码有误 " || res=="fail"){
                        alert("用户名或密码有误");
                    }
                }
            })
        }else{
            yanzhenText.innerHTML = "输入密码不一致";
        }
    }
    // 登陆注册
    var user = document.querySelector(".user");
    var password = document.querySelector(".password");
    var login = document.querySelector(".login");
    login.onclick = function(){
        var _user = user.value;
        var _password = password.value;
        $.ajax({
            type: "get",
            data: {"username":_user,"password":_password},
            url:"../api/login1.php",
            success:function(res){
                if(res== "success"){
                    location.href = "../index.html"
                }else if(res == "fail"){
                    alert("用户名或密码有误");
                }
            }
        })
    }

    var goodsCon = document.querySelectorAll(".navText>div");
    var goodsTitle = document.querySelectorAll(".navText>div>a");
    console.log(232,goodsCon,"aaaaaa",goodsTitle);
    console.log($(".menus"));
    $(".menus").on("click","a",function(){
        // 当前点击标签为a，修改a的href属性值+传入当前点击文本
        $(this).attr("href","goods.html?"+$(this).html());
    })
})