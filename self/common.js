/**
 * @author gaoxiaopeng@ddtkj.com
 * @since 2016-5-30
 * @description 用户函数
 */
/**
 * @description 返回上一页公用函数
 */
function goBack() {
    window.history.go(-1);
}
/**
 * @description 判读值是否为空 是空字符返回true 否则返回false
 * @example
 * var isnull = checkIsNull("");  
 * @param {String} exp 需要校验的值
 */
function checkIsNull(exp) {
    if (!exp && typeof(exp) != "undefined" && exp != null) {
        return true;
    } else {
        return false;
    }
}
/**
 * @description 判断是否为数字 是数字返回true 不是数字返回false
 * @example
 * var isnull = checkNum(5);  
 * @param {String} value 需要校验的值
 */
function checkNum(value) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(value);
}



/**
 * @description 添加到购物车公用函数  实例化购物车对象
 * @example
 * actionAddCartDetail(10, 1, 10);
 * @param {Int} gid 商品编号
 * @param {Int} periodCurrent 期数
 * @param {Int} priceArea价格区间  
 */
function actionAddCartDetail(gid, periodCurrent, priceArea) {
    item = new CartItem();
    item.price = priceArea; // 商品单价
    item.freight = 0; //运费
    item.type = 2;
    item.times = 1;
    item.buyPeriod = 1; //购买期数
    item.gid = gid;
    item.period = periodCurrent; // 云购期数
    //实例化购物车对象
    var cart = new CartHelper();
    cart.add(item);
}

/**
 @description 懒加载
 @param {String} tag 懒加载标识用于处理类似分页后 懒加载 只处理 当前页图片
 * */
function lazyload(tag) {
    //设置图片延迟加载  距离屏幕100像素开始加载图片
    $("img.lazy" + tag).lazyload({
        effect: "fadeIn",
        placeholder: "images/change/lazyload.jpg",
        threshold: 100,
        skip_invisible: false
    });
}

/**
 * @description 清除localStorage
 */
function clearLocalStorage(){
	localStorage.clear();
	sessionStorage.clear();
}   

/**
 * @description 获取url 参数
 * @example
 * var gid=GetQueryString("http://wx.ygqq.com/goodsDetail.html?gid=25")
 * @param {String} url 地址url  
 */
function GetQueryString(url)
{
     var reg = new RegExp("(^|&)"+ url +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
/**
 * @description 获取 url 中文参数
 * @example
 * var gid=GetQueryString("http://wx.ygqq.com/goodsDetail.html?gid=25")
 * @param {String} url 地址url  
 */
function GetQueryStringChinese(url)
{
	return decodeURI(escape(GetQueryString(url)));
}
/**
 * @description 获取url 参数
 * @example
 * var gid=GetQueryString("http://wx.ygqq.com/goodsDetail.html?gid=25")
 * @param {String} url 地址url  
 */
function GetQueryStringEncrypt(url)
{
     var reg = new RegExp("(^|&)"+ url +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2])/config.randomKey; return null;
}
/*
 * 描述： 真实姓名判断
 * */
function regularCheckRealName(realName){
	 var realNameRegular =/^[\u4E00-\u9FA5]{2,5}$|(?:·[\u4E00-\u9FA5]{2,5})$/;   
	 return realNameRegular.test(realName);
}
/*
 * 描述： 身份证号校验
 * */
function regularCheckCardNo(num){
	
	 var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
	    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
	    var varArray = new Array();
	    var intValue;
	    var lngProduct = 0;
	    var intCheckDigit;
	    var intStrLen = num.length;
	    var idNumber = num;
	    if (intStrLen != 18) {
	        return false;
	    }
	    // check and set value
	    for (var i = 0; i < intStrLen; i++) {
	        varArray[i] = idNumber.charAt(i);
	        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
	            return false;
	        } else if (i < 17) {
	            varArray[i] = varArray[i] * factorArr[i];
	        }
	    }
	    if (intStrLen == 18) {
	        //check date
	        var date8 = idNumber.substring(6, 14);
	        if (isDate8(date8) == false) {
	            return false;
	        }
	        // calculate the sum of the products
	        for (i = 0; i < 17; i++) {
	            lngProduct = lngProduct + varArray[i];
	        }
	        // calculate the check digit
	        intCheckDigit = parityBit[lngProduct % 11];
	        // check last digit
	        if (varArray[17] != intCheckDigit) {
	            return false;
	        }
	    }
	    else {        //length is 15
	        //check date
	        var date6 = idNumber.substring(6, 12);
	        if (isDate6(date6) == false) {
	            return false;
	        }
	    }
	    return true;
}
function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500) return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false
    if (day < 1 || day > iaMonthDays[month - 1]) return false
    return true
}

/*
 * @description：无限分页功能，当页面滚动到dataMore 时 触发 调用数据功能
 * @example：需要页面添加  dataMore(滑动加载更多数据)
 * @param：{Function}  callbackFun  回调函数 （ajax 请求数据的函数）
 * */
var isload = true;
var isIndexPage;
function scrollPage(callBackFun,tag) {
	if(!tag){//如果没传tag,将tag设置为isIndexPage;isIndexPage只有在index.html中使用，其他页面则为undefined；全部商品、购物车、我的云购页面将isIndexPage设置为false，首页设置为true，这几个页面都是在index.html中，isIndexPage就是为了区分这几个页面；其他页面不传tag可以正常加载。传了tag值的isIndexPage必须为true才能进行加载
		tag = isIndexPage;
	}else{
		page=index_page;
	}
    $(window).scroll(function() {
        if (isload&&tag==isIndexPage) { //ajax在后台获取数据时，设值其false，防止页面多次加载
            if (($(window).scrollTop() + 100) >= ($(document).height() - window.innerHeight)) {
                //更多出现在滚动区域
                if(window.index_page){index_page++};
                page++;
                isload = false;
                window.setTimeout(function() {
                    callBackFun();
                }, 50);
            }
        }
    });
}


/**              
 * @description 获取 时分秒 毫秒 组合字符串
 * @param {int} unixTime    待时间戳(秒)
 * @param {Boolean} isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
 * @param {int} timeZone   时区
 */
/*var formatDate = function(date, format) {
    if (!format) format = "yyyy-MM-dd HH:mm:ss";
    date = new Date(parseInt(date));
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "S": ("" + (date.getMilliseconds() + 1000)).substr(1),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g, function(a) {
        return dict[a];
    });
};*/

/**
 * @description 时间戳转 日期 
 * @example
 * var dataStr = formatDate(1464589760,"yyyy-MM-dd HH:mm:ss");
 * @param {Int} date 时间戳
 * @param {String} format 日期格式  yyyy-MM-dd HH:mm:ss
 */
function formatDate(date, format) {
    if (!format) format = "yyyy-MM-dd HH:mm:ss";
    date = new Date(parseInt(date));
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "S": ("" + (date.getMilliseconds() + 1000)).substr(1),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g, function(a) {
        return dict[a];
    });
};
/*
 * @description：页面弹窗
 * @param：显示信息
 * */
function dialog(msg, hrefOrFun) {
	msg = msg || '';
	$('.dialogBox').remove();
	var $html = '<div class="dialogBox"><span class="dialogCont">'+msg+'</span></div>';
	$('body').append($html);
	/*$('.dialogBox').height(screen.height);*/
	setTimeout(function(){
		$('.dialogBox').remove();
		if(typeof hrefOrFun == 'function'){
			hrefOrFun();
		}else if (typeof(hrefOrFun) != "undefined" && hrefOrFun != "") {
            window.location.href = hrefOrFun;
        }
	},2000)
}/*
 * @description：页面confirm弹窗
 * @param：msg:显示信息
 * @param: callback 回调，返回result  通过判读result来确定用户点击的是确认还是取消
 * */
function customConfirm(msg,callback){
	$('.confirmBox').remove();
	var $html = '<div class="confirmBox">'+
					'<div class="confirmCon">'+
						'<span class="confirmCont">'+msg+'</span>'+
						'<div class="confirmBtnBox">'+
							'<span class="confirmBtn">取消</span>'+
							'<span class="confirmBtn">确认</span>'+
						'</div>'+
					'</div>'+
				'</div>';
	$('body').append($html);
	$('.confirmBtnBox .confirmBtn').unbind('click');
	$('.confirmBtnBox .confirmBtn').bind('click',function(){
		var btnIndex = $('.confirmBtnBox .confirmBtn').index($(this));
		callback(btnIndex);
	})
}
function clearConfirm(){
	$('.confirmBox').remove();
}
/**
 * @description：会员账户金额格式化(显示千分位、没有小数)
 * */
function moneyIntFormat (money) {
	if (money == 0) {
		return money;
	} else {
		if(money<0){
			money = money*(-1);
			n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), 
			//	r = money.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			return "-"+t.split("").reverse().join("");
		}else{
			n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), 
			//	r = money.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			return t.split("").reverse().join("");	
		}
	}
};
/*
 *@description 图像加载出错时的处理
 *
 */
function errorImg(img) {
	img.src = "/h5/images/change/lazyload.jpg";
} 



/*
 *@description 统一控制数据为空时显示的页面数据
 *
 */
var layoutModule = avalon.define({
	$id:"layoutController",
	data:1,
	url:"like"
})

/*
 *@description 设置登录本地缓存标识 mid
 *
 */
function login_backOldPage()
{
	sessionStorage.backUrl=window.location.href;
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") { //微信环境
		window.location.href="/member/member_center.do";
	}else{
		window.location.href="/h5/page/login/login.htm";
	}

}

/*
 *@description 加入购物车的动效以及参数
 *
 */


function actionAddCart(cid,gid, periodCurrent, priceArea) { //点击加入购物车
	if(cid == 99999) { //新手专区
		return;
	}
	item = new CartItem();
	item.price = priceArea; // 商品单价
	item.freight = 0; //运费
	item.type = 2;
	item.times = 1;
	item.buyPeriod = 1; //购买期数
	item.gid = gid;
	item.period = periodCurrent; // 云购期数
	//实例化购物车对象
	var cart = new CartHelper();
	cart.add(item);
	if($('.yg-icon-shopping-cart').length>0){
		$("#gwc_num").html(cart.read().Count); //购物车商品数量
		var img = $(".img_" + gid).last();
		var flyElm = img.clone().css('opacity', 0.75); //复制一个商品的img对象
		$('body').append(flyElm);
		flyElm.css({
			'z-index': 9000,
			'display': 'block',
			'position': 'absolute',
			'top': img.offset().top + 'px',
			'left': img.offset().left + 'px',
			'width': img.width() + 'px',
			'height': img.height() + 'px'
		});
		var t = $('.yg-icon-shopping-cart').offset().top;
		var l = $('.yg-icon-shopping-cart').offset().left;
		var yd = $(window).width() * 0.02;
		flyElm.animate({ //复制出的对象移动到购物车（动画效果）
			top: t,
			left: l + yd,
			width: 10,
			height: 6
		}, 'slow', function() {
			flyElm.remove(); //移除复制的对象元素
		});
	}
}
/*
 * @description：转义ICOClassName
 * @param：cid:商品cid
 * @param：maxbuy:商品最大购买次数
 * @param：priceArea:商品价格
 * @param:callback ICOClassName eg:'ico_xinshou'
 * */
function GetICOClassName(cid,maxbuy,priceArea,jisuArr,callBackFun){
	cid = cid ||'';
	maxbuy = maxbuy ||'';
	priceArea = priceArea ||'';
	jisuArr = jisuArr ||[];
	callBackFun = callBackFun || null;
	if(typeof jisuArr == 'function'){
		callBackFun = jisuArr;
		jisuArr = [];
	}
	var ico = '';
	if(cid == 99999) { //新手专区
		ico = "ico_xinshou";
	} else if(jisuArr.indexOf(cid.toString()) > -1) { //极速专区
		ico = "ico_jisu";
	} else if(maxbuy > 0) { //限购
		ico = "ico_xiangou";
	} else if(priceArea == 10) { //10元专区
		ico = "ico_shiyuan"
	}else if(priceArea == 100) { //100元专区
		ico = "ico_baiyuan";
	}
	callBackFun(ico);
}
/**
 * @description 正则提取 字符串中 数字
 * @param {String} str
 * @return {Array} 数字数组集合
 * */
function regMatchNum(str){
	if(str.match(/\d+(\.\d+)?/g)){
		return str.match(/\d+(\.\d+)?/g).join();
	}else{
		return str.match(/\d+(\.\d+)?/g);
	}

}
/**
 * @description 正则提取 字符串中符号
 * @param {String} str
 * @return {Array} 字符数组集合
 * */
function regMatchSymbol(str){
	 return str.match(/[^\d\.]/g)
}

/**
 * @description 获取app端设置的cookie（判断是否app端调用）
 * @param {String} str
 * */
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
var APP = false;//判断是不是app 端访问

APP=getCookie("platform");//判断是不是app端访问
if(APP){
	$("header").hide();
	$('.p_top_search').css('top',0);
	$('.p_all_goods ').css('top','0.8rem');
	$("#J_nav").hide();
	sessionStorage.platform='app'
}


function newNullDataHtml(msg) {
	var html = '<div class="text_center ptb80">' +
				'<p class="nodata_font">'+msg+'</p>' +
				'<a href="/h5/page/main/all_goods.htm">' +
				'<button class="yg_btn nodata_btn">立即夺宝</button>' +
				'</a></div>';
	return html;
}


/**
 * @description 动态展示
 * @param {String} str
 * */
function NullOrMore(type) {
		var html = '';
		switch (type) {
			case "account": //充值记录
				html = '<div class="text_center ptb80">' +
					   '<img src="../../images/common/no_data.png" width="50%" />' +
					   '<p class="nodata_font">光是心动怎行，充值行动走起来！</p>' +
					   '</div>';
				break;
			case "expose": //晒单
				html = newNullDataHtml('您还没有晒单记录~');
				break;
			case "default_no_href": //公共无记录不带图片
				html = newNullDataHtml('暂无记录~');
				break;
			case "default_yes_img": //公共无记录带图片
				html += '<div class="text_center ptb80"> ' +
					'<img src="/h5/images/common/record_no.png" width="50%" /> ' +
					'<p class="nodata_font">暂无记录~</p> ' +
					'</div>';
			break;
			case "null_brokerage": //无佣金记录
				html += '<div class="text_center ptb80">' +
					    '<img src="../../images/common/wu_brokerage.png" width="50%" />' +
					    '<p class="nodata_font">赶快邀请好友赚取佣金吧！~</p>' +
					    '<a href="vip_invite_friends.htm">' +
					    '<button class="yg_btn nodata_btn">我要赚取</button>' +
					    '</a></div> ';
				break;
			case "null_m_record": //多期参与
				html = '<div class="text_center ptb80">' +
					   '<p class="nodata_font">多期参与，多个机会！</p>' +
					   '<a href="/h5/page/main/all_goods.htm">' +
					   '<button class="yg_btn nodata_btn">立即夺宝</button>' +
					   '</a></div>';
				break;
			case "null_m_record_all": //夺宝记录
				html = newNullDataHtml('为自己梦想填双脚印吧！');
				break;
			case "member_records_win": //中奖记录
				html = newNullDataHtml('幸运女神暂未光顾，继续加油哦！');
				break;
			case "show_indent": //我的晒单
				html = newNullDataHtml('亲，您还没有晒单记录哦！');
				break;
			case "no_site": //无地址
				html += '<div class="text_center ptb80">' +
					    '<img src="/h5/images/nodata/record_no.png" width="50%" />' +
					    '<p class="nodata_font">亲，您还没有收货地址哦</p>' +
					    '<button class="yg_btn nodata_btn" ms-on-tap="addAddress">添加地址</button>' +
					    '</div> ';
				break;
			case "null_m_bank": //无银行卡
				html += '<div class="text_center ptb80">' +
					'<img src="/h5/images/nodata/record_no.png" width="50%" />' +
					'<p class="nodata_font">亲，您还没有银行卡哦</p> ' +
					'<a class="yg_btn nodata_btn" href="user_add_card.htm">新增银行卡</a> ' +
					'</div> ';
				break;
			case "null_invite": //无邀请好友
				html += '<div class="text_center ptb80"> ' +
					'<img src="/h5/images/common/wu_brokerage.png" width="50%" /> ' +
					'<p class="nodata_font">亲，您好没有邀请好友呢~</p> ' +
					'<a href="/h5/page/member/vip_invite_friends.htm"> ' +
					'<button class="yg_btn nodata_btn">立即邀请</button> ' +
					'</a> </div>';
				break;
			case "quanzi": //无圈子
				html += '<div class="text_center ptb80">' +
					'<img src="/h5/images/nodata/record_no.png" width="50%" /> ' +
					'<p class="nodata_font">暂无记录~</p> ' +
					'<a href="/h5/model/circle/circle_list.htm?cid=0&bid=0&priceArea=0" class="yg_btn nodata_btn">立即参与</a> ' +
					'</div> ';
				break;
			case "publicNoDataImg": //公共无记录带图片
				html += '<div class="text_center ptb80">' +
					    '<img src="/h5/images/nodata/record_no.png" width="50%" />' +
					    '<p class="nodata_font">暂无记录~</p>' +
					    '<a href="/h5/page/main/all_goods.htm">' +
					    '<button class="yg_btn nodata_btn">立即夺宝</button>' +
					    '</a></div>';
				break;
			case "member_redpacket": //公共无记录带图片
				html += '<div class="text_center ptb80">' +
				    '<img src="/h5/images/nodata/no_redpacket.png" width="50%" />' +
				    '<p class="nodata_font">亲，您还没有红包呢</p>' +
				    '<a href="/h5/page/main/all_goods.htm">' +
				    '<button class="yg_btn nodata_btn">立即夺宝</button>' +
				    '</a></div>';
			break;
			default:
				html += '<div class="text_center ptb80">';
				html += '<img src="../../images/nodata/no_redpacket.png" width="50%" />';
				html += '<p class="nodata_font">正在加载</p>';
				html += '</div>';
				break;
		}
		return html;
}