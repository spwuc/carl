/**
 * @author gaoxiaopeng@ddtkj.com
 * @since 2016-5-30
 * @description 公用配置文件
 */

var WX = false; //微信环境变量，用于判断当前环境是否为微信环境
/*判断是否是微信*/
var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == "micromessenger") {
	WX = true;
}

var G_DETAIL = "_250x250.png"; // "_200x200.png"; //所有商品列表图片大小
var G_DETAIL_SWIPER = "_500x500.png"; // "_400x400.png"; //商品详情图片大小
var BANNER_SWIPER = "_640x640.png"; // "_640x640.png"; //首页banner轮播图图片大小
var G_DETAIL_MEMBER = "_200x200.png"; // "_120x120.png"; //会员中心图片大小
var PUBLISH_TIME = 180000; //揭晓动画时间
var DOMAIN = "http://img02.ygqq.com"; //banner nav 广告 头像 、晒单
if(window.location.host=="ygqq-h5.dadetongkeji.net.cn"){
	DOMAIN="http://ygqq-ht.dadetongkeji.net.cn"
    G_DETAIL = ""; // "_200x200.png"; //所有商品列表图片大小
	G_DETAIL_SWIPER = ""; // "_400x400.png"; //商品详情图片大小
	BANNER_SWIPER = ""; // "_640x640.png"; //首页banner轮播图图片大小
	G_DETAIL_MEMBER = ""; // "_120x120.png"; //会员中心图片大小
}
var GOODS_BASE = DOMAIN + "/upload/goodsfile/"; //商品图片基本路径
//ajax 缓存常量
var API_DOMAIN="";//接口公用域名前缀
var STORAGE_INVALID_TIME = 300000;//默认缓存失效时间 5分钟（很长）
var STORAGE_MAIN_INVALID_TIME=10000;//非及时列表缓存失效时间（相对长）
var STORAGE_MEMBER_INVALID_TIME=3000;//非及时列表缓存失效时间（较短）
var config = {
		// * 1：imgVerify    图片验证码开关
		// * 2：virtual_bid      普通商品购买时：后台设置虚拟卡bid
		// * 3：memberLevelPaySwitch  会员等级购买开关
		// * 4：qzCardflag  圈子商品购买时：购物卡使用开关
		//*  5：icons//头像
		//*  6：level;//等级
		imgVerify: function() {
			return sessionStorage.getItem("imgVerify")
		},
		virtualBid: function() {
			return sessionStorage.getItem("virtual_bid")
		},
		memberLevelPaySwitch: function() {
			return sessionStorage.getItem("memberLevelPaySwitch")
		},
		qzCardflag: function() {
			return sessionStorage.getItem("qzCardflag")
		},
		mid: function() {
			return sessionStorage.getItem("mid")
		},
		nickname: function() {
			return sessionStorage.getItem("nickname")
		},
		mobile: function() {
			return sessionStorage.getItem("mobile")
		},
		level: function() {
			return sessionStorage.getItem("level")
		},
		icons: function() {
			return sessionStorage.getItem("icons")
		},
		loginName: function() {
			return localStorage.getItem("loginName")
		}, // 当前登录人登录APP的 ID
		passWord: function() {
			return localStorage.getItem("passWord")
		},

		localStorage: {
			"login": { //登录
				"loginName": "loginName",
				"passWord": "passWord",
			},
			"indexBanner": "indexBanner", //首页banner,
			"detailImgs": "detailImgs", //商品详情页面轮播图片
			"goodsLen": 0

		},
		removeLocalAttr: function(attr) {
			// 默认移除本地所有缓存数据
			if(attr == 'all') {
				localStorage.clear(); //清除应用所有的键值对存储数据
			} else if(attr == 'login') {
				localStorage.removeItem("loginName")
				localStorage.removeItem("passWord")
			} else if(attr == 'detailImgs') {
				/**
				 * 移除商品详情轮播图片
				 */
				localStorage.removeItem("detailImgs");

			} else {
				localStorage.removeItem(attr);
			}
		},
		randomKey:sessionStorage.getItem("randomKey")
	}
/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-9-5
 * @description  云购H5的常用判断标识地址(imgVerify图片验证码开关    virtual_bid普通商品购买时：后台设置虚拟卡bid  memberLevelPaySwitch会员等级购买开关   qzCardflag圈子商品购买时：购物卡使用开关)
 * @example
 */
$(function() {
	var url = "/other_controller/getFlag.do";
	if(window.ajaxPost) {
		ajaxPost(url, {}, function(result) {
			sessionStorage.imgVerify = result.imgVerify;
			sessionStorage.virtual_bid = result.virtual_bid;
			sessionStorage.memberLevelPaySwitch = parseInt(result.memberLevelPaySwitch);
			sessionStorage.qzCardflag = result.qzCardflag;
		},'usersFlag',STORAGE_INVALID_TIME);
	} 
	if(!sessionStorage.getItem("randomKey")){
		sessionStorage.setItem("randomKey",Math.ceil(Math.random()*100));
	}
	
	//var url = "/member_controller/islogin.do";
	$.post("/member_controller/islogin.do",{},function(result){
			var $J_nav_a=$("#J_nav").find("a");
			if(result.flag == 0) { //未登录
				if(WX){
					$J_nav_a.eq(4).attr("href","/main/openid.do?platform=wx");
				}else{
					$J_nav_a.eq(4).attr("href","/h5/page/login/login.htm");
				}
			}else{
				$J_nav_a.eq(4).attr("href","/h5/page/member/vip_home.htm");
			}
	});
	
	
})

