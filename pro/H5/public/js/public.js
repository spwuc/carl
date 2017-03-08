/**
 * Created with JetBrains WebStorm.
 * User: spwuc
 * Date: 15/5/21
 * Time: 09:56
 * To change this template use File | Settings | File Templates.
 */
$.fn.addHeader = function(data,fun,tag){
    var tit = $('title').html(),right_h = '',src='../public/img/right_sj_hea.png';
    if(data){
        right_h = data;
    }
    if(tag){
        src = 'public/img/right_sj_hea.png';
    }
    var header_h = "<div class='top_hea' style='height: 45px;line-height: 45px;background-color: #fff;text-align: center;position: fixed;width: 100%;top: 0;left: 0;border-bottom: 1px #cecece solid;color: #458cec;font-size: 17px'>" +
        "<a class='left_a'><img class='left_h' src='"+src+"' width='11' style='position: absolute;left: 14px;bottom: 14px' /></a>" +
        "<span>"+tit+"</span>" +
        right_h+
        "</div>";
    $('body').prepend(header_h);
    if((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
        // 判断系统版本号是否大于 7
        if(navigator.userAgent.match(/OS [7-9]_\d[_\d]* like Mac OS X/i)){
            $(".top_hea").css('paddingTop','20px');
            $('.top_hea').next().css('marginTop',(parseInt($('.top_hea').next().css('marginTop'))+65)+'px');
        }else{
            $('.top_hea').next().css('marginTop',(parseInt($('.top_hea').next().css('marginTop'))+45)+'px');
        }
    }else{
        $('.top_hea').next().css('marginTop',(parseInt($('.top_hea').next().css('marginTop'))+45)+'px');
    }

    if(data){
        $('.right_h').on('click',function(){
            fun();
        })
        $('.right_h').css({'position':'absolute','right':'14px','bottom':'14px','lineHeight':'14px','fontSize':'14px'})
    }
    $('.left_h').on('click',function(){
       //alert("history.go(-1)");
        $('.left_a').attr('href',history.go(-1));
        iss.goBack();
    })
}
$.cookie = function(name, value) {//重写cookie，因为安卓部分手机不支持JQ的cookie。此处使用了H5得缓存
    var cookieValue='';
    if (typeof value == 'undefined'){
        cookieValue = window.localStorage.getItem(name)
        return cookieValue;
    }else{
        if(value){
            window.localStorage.setItem(name,value);
            setTimeout(function(){
                window.localStorage.removeItem(name);
            },120000)
        }else{
            window.localStorage.removeItem(name);
        }

    }
};
//iss 方法里所有需要上送参数的[param],则fail[失败回调]为必需参数，【当fail[失败回调]是简单得弹出错误信息的情况下，fail可使用公共fail[即为failCallBack]】
var iss={
    orderView:function(succ,fail,param){//调用支付插件
        cordova.exec(succ,fail,'OrderViewPlugin','start',[param]);
    },
    request:function(succ,fail,param){//请求接口调用的插件
        cordova.exec(succ,fail,'DataPlugin','requestdata',[param]);
    },
    changeNextPage:function(succ,fail,param){//跳转页面
        cordova.exec(succ,fail,'SkipPlugin','skip',[param]);
    },
    goBack:function(succ,fail){//返回上一个页面
        succ=succ||null;
        fail=fail||null;
        cordova.exec(succ,fail,'BackPlugin','back',['']);
    },
    getUserInfo:function(succ,fail){//获取用户信息
        cordova.exec(succ,fail,'UserCenterPlugin','getUserInfo',['']);
    },
    isLogin:function(succ,fail){//判断用户是否登录
        cordova.exec(succ,fail,'UserCenterPlugin','isLogin',['']);
    },
    Share:function(succ,fail,param){//分享功能
        cordova.exec(succ,fail,'SharePugin','share',[param]);
    },
    details:function(succ,fail){//获取轮播图详情
        cordova.exec(succ,fail,'SharePugin','share',['']);
    }
};
function failCallBack(msg){
    alert(msg);
}