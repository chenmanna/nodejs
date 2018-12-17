/* 
* @Author: Marte
* @Date:   2018-08-30 11:00:44
* @Last Modified by:   Marte
* @Last Modified time: 2018-10-08 14:18:34
*/
// 封装一个最大到最小的随机数 
function randomNum(min,max){
    var num = parseInt(Math.random()*(max-min+1)+min);
    return num;
}
 
// 封装随机颜色  调用生成的随机数函数
function randanColor(){
    var r = random(0,255);
    var g = random(0,255);
    var b = random(0,255);
    return "rgb("+r+","+g+","+b+")";
}
/* 随机颜色
* return {string}#12cc12  [rgb颜色]rgb(12,123,233) 
function randomColor(num){
    if(num === 16){
        var str = '0123456789abcdef';//str[0]
        var color = '#';
        for(var i=0;i<6;i++){ 
            // 获取随机索引值                  //**16
            var idx = parseInt(Math.random()*str.length);

            // 根据随机索引值得到随机16进制字符
            color += str[idx];   //**找到str的索引，循环<6添加进color
        }
        return color;
    }else{
        var r = parseInt(Math.random()*256);
        var g = parseInt(Math.random()*256);
        var b = parseInt(Math.random()*256);

        return 'rgb('+r+','+g+','+b+')';
        
    }
}
*/   

 // 封装获取元素节点,调用 Element.getElementNodes(参数);
var Element = {
    getElementNodes : function(nodeArr){
        var arr = [];
        for(var i=0;i<nodeArr.length;i++){
            // 等于1 ==》元素节点
            if(nodeArr[i].nodeType==1){
                arr.push(nodeArr[i]);
            }
        }
        return arr;
    },
    getChildElements : function(node){
        var child = node.childNodes;
        Element.getElementNodes(child);
    },
    getPreviousElement : function(node){
        var previous = node.previousSibling;
        // 节点类型等于1则为元素，不等于执行下面的代码，找到下一个
        if(previous.nodeType !=1){
            previous = previous.previousSibling;
        }
        return previous
    }
    
 }


// Cookie的操作
var Cookie = {
    /**
     * 设置cookie
     * @param {String} name   [cookie名]
     * @param {String} value  [cookie值]
     * @param {[Object]} params [参数，是一个对象]
        * expires   {Date}      有效期
        * path      {String}    保存路径
        * domain    {String}    域名
        * secure    {Booolean}  安全性
     */
     // 传入的参数 params为一个对象  传入的格式为Cookie.set('password','123',{expires:date})  params.expires取到的值为date
    set:function(name,value,param){
        // cookie必填值
        var str = name + '=' + value;
        // 判断是否有参数
        if(param){
            // 如果有有效期
            if(param.expires){
                str += '; expires=' + param.expires.toUTCString();
            }
            // 如有路径
            if(param.path){
                str += '; path=' + param.path;
            }
            // 域名
            if(param.domain){
                str += '; domain' + param.domain;
            }
            // 安全性
            if(param.secure){
                str += '; secure';
            }
        }
        document.cookie = str;
    },
    /**
     * [获取name对应的cookie值]
     * @param  {String} name [cookie名]
     * @return {String}      [返回name对应的cookie的值]
     */
     get:function(name){
        // 获取所有的cookie
        var allCookie = document.cookie;
        // 创建一个字符串用来存放对应cookie值
        var res = '';
        // String ->Array
        allCookie = allCookie.split('; ');
        allCookie.forEach(function(item){
            // 根据=号拆分name,value
            var arr = item.split('=');
            // 判断如果arr（allCookie拆分后）.有name的值则取到对应value;
            if(arr[0]==name){
                res = arr[1];
            }
        });
        return res;
     },
     // 删除cookie
     remove:function(name){
        // 利用过期日期达到删除效果
        var now = new Date();
        now.setDate(now.getDate()-1)
        // document.cookie = name + '=' + null + '; expires=' + now.toUTCString();
        this.set(name,'x',{expires:now})
     }
// Cookie.set('username','laoxie')
// Cookie.set('password','123',{expires:date,});
// Cookie.remove('password');
// Cookie.get('left');//47px;   
}



// 获取css样式
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele)[attr];
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return ele.style[attr];
    }
}



// 事件监听
function bind(ele,type,fn,isCapture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,isCapture);
    }else if(ele.attachEvent){
        ele.attachEvent('on' + type,fn)
    }else{
        ele['on' + type] = fn;
    }
}


//动画
function animate(ele,obj,time,fn){
    var count = 0;
    for(var attr in obj){
        count ++;
        playAnimate(attr);
    }
    function playAnimate(attr){
        var target = obj[attr];
        target = attr == 'opacity'? target*100 : target;
        var timer = attr + 'Timer';
        clearInterval(ele[timer]);
        ele[timer] = setInterval(function(){
            var current = getComputedStyle(ele)[attr];
            // 提取当前值的单位
            var reg = /[a-z]+$/;
            var unit = current.match(reg);
            unit = unit? unit[0] : '';
            // 提取当前值
            current = parseFloat(current);
            current = attr == 'opacity'?current *100 : current;
            
            var speed = (target - current)/10;
            speed = speed>0? Math.ceil(speed) : Math.floor(speed);
            current += speed;
            if(current == target){
                clearInterval(ele[timer]);
                count --;
                if(count == 0 && fn && typeof fn == 'function'){
                    fn();
                }
            }
            current = attr == 'opacity'? current/100 : current;
            ele.style[attr] = current + unit;

        },time)
    }
}


// 封装动画
function animate(ele,obj,time,fn){
    // 定义变量
    var count = 0 ; 
    // 遍历传入的对象
    for(var attr in obj){
        count ++;
        // 调用函数
        playAnimate(attr);
    }
    function playAnimate(attr){
        // target = 对象的值；
        // var attr = "width";
        var target = obj[attr];  //100px
        // 如果传入的键为opacity，(值)target = target*100，反之等于传入的值本身
        target = attr == "opacity"? target*100 : target;

        var timer = attr + "Timer";
        // 清除元素ele定时器
        clearInterval(ele[timer]);
        // 开启ele定时器
        ele[timer] = setInterval(function(){
            // 获取元素的css（top/left）值
            var current = getComputedStyle(ele)[attr];
            //将当前值的单位提取出来
            var reg = /[a-z]+$/;
            var unit = current.match(reg);
            unit = unit? unit[0] : '';
            //提取当前值
            current = parseFloat(current);
            // 如果键为opacity,元素的值*100，反之取元素本身。
            current  = attr == "opacity"? current *100 :current;
        
            var speed = (target - current)/10;
            speed = speed>0? Math.ceil(speed):Math.floor(speed);
            current += speed;
            if(current == target){
                clearInterval(ele[timer]);
                count --;
                if(count == 0 && fn && typeof fn == "function"){
                    fn();
                }
                
            }
            current = attr == "opacity"? current/100 : current;
            ele.style[attr] = current + unit;
        }, time)
    }
    // attr、target
}