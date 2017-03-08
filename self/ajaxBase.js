/**
 * @author gaoxiaopeng@ddtkj.com
 * @since 2016-5-30
 * @description Ajax公用 包含 post ,get error 加载前后函数
 */

var STROAGE_HOME_MENU="home_menu";//首页banner 下图片导航缓存名称
var STROAGE_CLASS_LIST="class_list";//列表页面左侧分类导航 缓存名称
var STORAGE_BANNER="banner";//首页banner 缓存名称
/**
 * @description ajax post公用函数 缓存数据不适用与表单提交类信息
 * @example
 * ajaxPost("/mai_controller/goods_detail.do",data,callbackFun)
 * @param {String} url 后台接口url
 * @param {Object} data 接口参数
 * @param {Function}  callbackFun  ajax 执行成功后的回调函数
 * @param {String} storage_name  缓存名称（可选）
 * @param {Int} storage_invalid_time 缓存失效时间（可选）
 */
function ajaxPost(url,data,callbackFun,storage_name,storage_invalid_time) {
 	if(storage_name){//传入缓存名称，且读取到缓存
        if(localStorage.getItem(storage_name)){
            var storage=localStorage.getItem(storage_name);//获取该名称的缓存
            var json_storage=JSON.parse(storage);//转换json 对象
            var storage_time=parseInt(json_storage.storage_time);//获取缓存的上次保存时间
            var invalid_time=storage_invalid_time||STORAGE_INVALID_TIME;//如果用户未传入缓存失效事件，则使用系统默认缓存失效事件
            if(new Date().getTime() > (storage_time+invalid_time))//当前时间大于上次获取时间 10分钟  需要更新本地缓存
            {
                    ajaxPostUpdateStorage(url,data,storage_name) ;//重新更新本地缓存
            }
            callbackFun(json_storage);//直接执行回调输出 缓存中的数据（保证页面快速加载）
            return;
        }
 		
 	}	
	//执行ajax
    $.ajax({
        type: "post",
        dataType: "json",
        url: API_DOMAIN+url +"?t="+ Math.random(),
        data: data,
        success: function(result) {
            if (result&& 1==result.res_code) {
		        callbackFun(result);//执行回调函数并返回json 结果
                if(storage_name){//如果传入缓存名字且没有读取到缓存
                    result.storage_time=new Date().getTime();//设置缓存时间
                    localStorage.setItem(storage_name,JSON.stringify(result));//设置缓存
                }
		    }else{
		    	if(result.res_msg.indexOf("登录超时")>-1){
		    		 dialog(result.res_msg,"/h5/page/login/login.htm");
		    	}else{
		    		dialog(result.res_msg)
		    	}
		    	
		    }
        },
        error: function(r) {
          //错误处理
        } 
    });
}
/**
 * @description ajax post公用函数
 * @example
 * ajaxPost("/mai_controller/goods_detail.do",data,callbackFun)
 * @param {String} url 后台接口url
 * @param {Object} data 接口参数
 * @param {Function}  callbackFun  ajax 执行成功后的回调函数
 */
function ajaxPostUpdateStorage(url,data,storage_name) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: API_DOMAIN+url +"?t="+ Math.random(),
        data: data,
        success: function(result) {
        	 if(result.res_code){//只保存正确的数据
        	 	 result.storage_time=new Date().getTime();//设置缓存时间
                 localStorage.setItem(storage_name,JSON.stringify(result));//设置缓存
        	 }
              
        }
    });
}


/**
 * @description ajax post公用函数(同步)
 * @example
 * ajaxPost("/mai_controller/goods_detail.do",data,callbackFun)
 * @param {String} url 后台接口url
 * @param {Object} data 接口参数
 * @param {Function}  callbackFun  ajax 执行成功后的回调函数
 */
function ajaxPostAsync(url,data,callbackFun) {
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: API_DOMAIN+url +"?t="+ Math.random(),
        data: data,
        success: function(result) {
            // if (result&& 1==result.res_code) {
            callbackFun(result);//执行回调函数并返回json 结果
            // }
        },
        error: function(r) {
            //错误处理
        }
    });
}


/**
 * @description ajax post公用函数不校验 res_code;用户可以探出 ajax 失败的提示信息
 * @example
 * ajaxPost("/mai_controller/goods_detail.do",data,callbackFun)
 * @param {String} url 后台接口url
 * @param {Object} data 接口参数
 * @param {Function}  callbackFun  ajax 执行成功后的回调函数
 */
function ajaxPostNoCheck(url,data,callbackFun) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: API_DOMAIN+url +"?t="+ Math.random(),
        data: data,
        success: function(result) {
            if (result) {
		        callbackFun(result);//执行回调函数并返回json 结果
		    } 
        },
        error: function(r) {
          //错误处理
        } 
    });
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取防止用户提交时token的值
 * @example
 * ajaxGetToken(tokenName,callbackFun)
 * @param {string}  session中存放token的key值，用于判断是哪个token
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGetToken(tokenName,callbackFun) {
    var url = "/member_controller/setToken.do";
    var data = {
        tokenName: tokenName
    };
   ajaxPost(url,data,callbackFun);
}
/**
 * @author pangyanhui@ddtkj.com
 * @since 2016-9-1
 * @description 获取分类
 * @example
 * ajaxClassList(pid, layer, priceArea, callbackFun)
 * @param {Int}  pid  父ID
 * @param {Int}  layer  层次ID
 * @param {Int}  priceArea  价格区间 （10元专区 100元专区） 
 * @param {Function}  callbackFun  回调函数
 */
function ajaxIndexMenu(callbackFun) {
	 var url = "/other_controller/getHomeMenu.do";
	 ajaxPost(url,{},callbackFun,STROAGE_HOME_MENU);
}




/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取分类
 * @example
 * ajaxClassList(pid, layer, priceArea, callbackFun)
 * @param {Int}  pid  父ID
 * @param {Int}  layer  层次ID
 * @param {Int}  priceArea  价格区间 （10元专区 100元专区） 
 * @param {Function}  callbackFun  回调函数
 */
function ajaxClassList(pid,layer,priceArea,callbackFun) {
    var url = "/main_controller/class_list.do";
    var data = {
        pid: pid,
        layer: layer,
        priceArea: priceArea
    };
   ajaxPost(url,data,callbackFun,STROAGE_CLASS_LIST);
}

/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取商品列表
 * @example
 * ajaxGoodsList("publictime", category_id, brand_id, page, priceArea, callbackFun)
 * @param {String} operation=[favorate|publictime|addtime|totalpriceup|totalpricedown] 
 * 可选值包括  favorate:人气，publictime:即将揭晓，addtime:添加时间，totalpriceup:价格升，totalpricedown:价格降
 * @param {Int}  category_id  分类Id
 * @param {Int}  page  页码
 * @param {Int}  priceArea  价格区间  
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGoodsList(operation, category_id, brand_id, page, priceArea, callbackFun) {
    var url = "/main_controller/goods_list.do";
    var data = {
        operation: operation,
        category_id: category_id,
        brand_id: brand_id,
        page: page,
        priceArea: priceArea
    };
   ajaxPost(url,data,callbackFun);
}

/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据商品Id获取商品列表  用于购物车校验 商品购买次数
 * @example
 * ajaxGoodsListByIds(goods_ids,callbackFun)
 * @param {String}  goods_ids  商品ID
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGoodsListByIds(goods_ids,callbackFun) {
    var url = "/main_controller/goods_List_byids.do";
    var data = {
        goods_ids: goods_ids
    };
   ajaxPostAsync(url,data,callbackFun);
}

/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据关键字获取商品列表
 * @example
 * ajaxGoodsListByKeyWords(keywords,operation,page,callbackFun)
 * @param {String}  keywords  关键字
 * @param {String} operation=[favorate|publictime|addtime|totalpriceup|totalpricedown] 
 * 可选值包括  favorate:人气，publictime:即将揭晓，addtime:添加时间，totalpriceup:价格升，totalpricedown:价格降
 * @param {Int} page 页码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGoodsListByKeyWords(keywords,operation,page,callbackFun) {
    var url = "/main_controller/goods_list_keywords.do";
    var data = {
        keywords: keywords,
        operation:operation,
        page:page
    };
   ajaxPost(url,data,callbackFun);
}


/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据商品ID获取商品详情
 * @example
 * ajaxGoodsDetail(goods_id,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGoodsDetail(goods_id,callbackFun) {
    var url = "/main_controller/goods_detail.do";
    var data = {
        goods_id: goods_id
    };
   ajaxPost(url,data,callbackFun,"GoodsDetail"+goods_id,STORAGE_MAIN_INVALID_TIME);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 商品购买记录
 * @example
 * ajaxGoodsBuyRecords(goods_id,period,page,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Int}  page  页码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGoodsBuyRecords(goods_id,period,page,callbackFun){
    var url = "/main_controller/goods_buy_records.do";
    var data = {
        goods_id: goods_id,
        period:period,
        page:page
    };
   ajaxPost(url,data,callbackFun);
} 

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取商品预计揭晓时间
 * @example
 * ajaxExpectPublishTime(goods_id,period,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxExpectPublishTime(goods_id,period,callbackFun) {
    var url = "/main_controller/expect_publish_time.do";
    var data = {
        goods_id: goods_id,
        period:period
    };
   ajaxPost(url,data,callbackFun);
} 

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据商品Id和期数ID获取揭晓详情
 * @example
 * ajaxPublishDetail(goods_id,period,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Function}  callbackFun  回调函数
 */
 function ajaxPublishDetail(goods_id, period,waitArrayNO, callbackFun) {
     $.ajax({
         type: "post",

         dataType: "json",
         url: "/main_controller/publish_detail.do?t=" + Math.random(),
         data: {
             goods_id: goods_id,
             period: period
         },
         success: function(result) {
             //调用绑定页面数据方法

                 callbackFun(result, goods_id, period,waitArrayNO);
         
         },
         error: function(r) {
            
         } //错误处理
     });
 }

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取往期揭晓列表
 * @example
 * ajaxPublishHistory(goods_id,period,page,size,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Int}  page  页码
 * @param {Int}  size  每页记录数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPublishHistory(goods_id,period,page,size,z_index,callbackFun) {
    var url = "/main_controller/publish_history.do";
    var data = {
        goods_id: goods_id,
        period:period,
        page:page,
        size:size,
        z_index:z_index
    };
   ajaxPost(url,data,callbackFun,"PublishHistory_"+goods_id+'_'+period+'_'+page,STORAGE_MAIN_INVALID_TIME);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取商品揭晓结果计算详情
 * @example
 * ajaxPublishDetailCalculate(goods_id,period,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPublishDetailCalculate(goods_id,period,callbackFun) {
    var url = "/main_controller/publish_detail_calculate.do";
    var data = {
        goods_id: goods_id,
        period:period
    };
   ajaxPost(url,data,callbackFun);
}
 /**
 * @author pangyanhui@ddtkj.com
 * @since 2016-6-7
 * @description 获取个人中奖记录
 * @example 
 * ajaxPersonRecordListWin(user_id,0, page, callbackFun)
 * @param {Int}  user_id  用户ID
 * @param {Int}  isMobileCard  是否为卡类商品（0）
 * @param {Int}	 page  页码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPersonRecordListWin(user_id, isMobileCard, page, callbackFun) {
	var url = "/main_controller/person_records_win.do?t=" + Math.random();
    var data = {
        user_id: user_id,
        isMobileCard: isMobileCard,
        page: page
    };
   ajaxPost(url,data,callbackFun,'PersonRecordListWin_'+user_id+'_'+isMobileCard+'_'+page,STORAGE_MEMBER_INVALID_TIME);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取个人云购记录
 * @example
 * ajaxPersonRecordsBuy(user_id,page,callbackFun)
 * @param {Int}  user_id  用户ID
 * @param {Int}  page  分页
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPersonRecordsBuy(user_id,page,callbackFun) {
    var url = "/main_controller/person_records_buy.do";
    var data = {
        user_id: user_id,
        page:page
    };
   ajaxPost(url,data,callbackFun,'PersonRecordsBuy_'+user_id+'_'+page,STORAGE_MEMBER_INVALID_TIME);
}


 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 晒单列表
 * @example
 * ajaxExposeList(user_id,goods_id,page,pageSize,callbackFun)
 * @param {Int}  user_id  用户ID
 * @param {Int}  goods_id  商品ID
 * @param {Int}  page 分页
 * @param {Int}  pageSize 每页条数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxExposeList(user_id,goods_id,page,pageSize,callbackFun) {
    var url = "/main_controller/expose_list.do";
    var data = {
        user_id: user_id,
        goods_id: goods_id,
        page: page,
        pageSize: pageSize
    };
   ajaxPost(url,data,callbackFun,"ExposeList_"+user_id+'_'+goods_id+'_'+page,STORAGE_MAIN_INVALID_TIME);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据晒单Id获取晒单详情
 * @example
 * ajaxExposeDetail(show_id,user_id,page,callbackFun)
 * @param {Int}  show_id  晒单ID
 * @param {Int}  user_id  用户ID
 * @param {Int}  page 页码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxExposeDetail(show_id,page,callbackFun) {
    var url = "/main_controller/expose_detail.do";
    var data = {
        show_id: show_id,
        page: page
    };
   ajaxPost(url,data,callbackFun,"ExposeDetail_"+show_id+'_'+page,STORAGE_MAIN_INVALID_TIME);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取热门搜索
 * @example
 * ajaxHotSearch(size,callbackFun)
 * @param {Int}  size  热门搜索的个数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxHotSearch(size,callbackFun) {
    var url = "/main_controller/hot_search.do";
    var data = {
        size: size
    };
   ajaxPost(url,data,callbackFun);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 首页banner
 * @example
 * ajaxBannerImg(type,callbackFun)
 * @param {Int}  type=1;  
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBannerImg(type,callbackFun) {
    var url = "/main_controller/banner_img.do";
    var data = {
        type: type
    };
   ajaxPost(url,data,callbackFun,STORAGE_BANNER);
}


 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 判断用户是否登录
 * @example
 * ajaxIsLogin(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxIsLogin(callbackFun) {
    var url = "/member_controller/islogin.do";
    var data = {};
   ajaxPost(url,data,callbackFun);
}


 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 根据中奖用户id、商品Id、期数  查询 中奖用户的云购码(用于获取上一期中奖用户的云购码)
 * @example
 * ajaxQueryCodes(uid,goods_id,period,callbackFun)
 * @param {Int}  goods_id  商品ID
 * @param {Int}  period  期数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxQueryCodes(goods_id,period,callbackFun){
    var url = "/member_controller/querycodes.do";
    var data = {
        goods_id: goods_id,
        period: period
    };
   ajaxPost(url,data,callbackFun);
  
}

/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 检查购物车中的预购商品，上期未结束的预购商品，不可预购
 * @example
 * ajaxCheckPresellGoods(cart,callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxCheckPresellGoods(cart,callbackFun) {
    var url = "/member_controller/checkPresellGoods.do";
    var data = {
        cart: cart
    };
   ajaxPost(url,data,callbackFun);
}

 /**
 * @author pangyanhui@ddtkj.com
 * @since 2016-6-16
 * @description 首页最新揭晓 已揭晓
 * @example
 * ajaxNewPublishList(1,10,1,callbackFun)
 * @param {Int} page 页码  1
 * @param {Int} pageSize 每页条数  10
 * @param {Int} published 已揭晓数据(1)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxNewPublishList(page,pageSize,published,callbackFun){
    var url = "/main_controller/publish_list_index.do";
    var data = {
          page: page,
		  pageSize: pageSize,
		  published:published

    };
   ajaxPost(url,data,callbackFun);
}
/**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-15
 * @description 最新揭晓  (待揭晓+已揭晓)集合
 * @example
 * ajaxPublishListIndex(1,10,z_index,callbackFun)
 * @param {Int} page 页码  1
 * @param {Int} pageSize 每页条数  4
 * @param {Int} z_index 已揭晓数据的偏移量
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPublishListIndex(page,pageSize,z_index,callbackFun) {
    var url = "/main_controller/publish_list.do";
    var data = {
        page: page,
	    pageSize: pageSize,
	    z_index:z_index

    };
    ajaxPost(url,data,callbackFun);
}

 /**
 * @author shangliqun@ddtkj.com
 * @since 2016-6-1
 * @description 获取活动列表
 * @example
 * ajaxSelectMobileDiscovery(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxSelectMobileDiscovery(callbackFun) {
    var url = "/main_controller/selectMobileDiscovery.do";
    var data = {
    	page:1,
    	size:100
    };
   ajaxPost(url,data,callbackFun,"SelectMobileDiscovery",STORAGE_INVALID_TIME);
}


/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description 获取用户余额
 * @example
 * ajaxBalance(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBalance(callbackFun) {
    var url = "/member_controller/balance.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description 获取帐户充值明细
 * @example
 * ajaxRechargeList(page, time, payCode, callbackFun)
 * @param {Int}  page  分页页数
 * @param {Int}  time   时间参数(1今天 2本周 3本月 4昨天 0全部)
 * @param {Int}  payCode   
 * @param {Function}  callbackFun  回调函数
 */
function ajaxRechargeList(page, time, payCode, callbackFun) {
	var url = "/member_controller/recharge_list.do";
    var data = {
            page: page,
            time: time,
            payCode: payCode
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description 获取积分来源/消费记录
 * @example
 * ajaxIntergralQuery(time, page, tradeType, callbackFun)
 * @param {Int}  time=[1|2|3|4|0]   时间参数
 * 时间参数(1今天 , 2本周 , 3本月 , 4昨天,  0全部)
 * @param {Int}  page  分页页数
 * @param {Int}  tradeType=[1|2]  积分类型
 * 积分类型:(1:积分来源 , 2:积分消费)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxIntergralQuery(time, page, tradeType, callbackFun){
	var url = "/member_controller/intergral_query.do";
    var data = {
            page: page,
            time: time,
            tradeType: tradeType
    };
    ajaxPost(url,data,callbackFun,"IntergralQuery_"+page+'_'+time+'_'+tradeType,STORAGE_MEMBER_INVALID_TIME);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description 兑换积分
 * @example
 * ajaxIntergralExchange(inputYgb, callbackFun)
 * @param {Int}  inputYgb  要兑换的云购币数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxIntergralExchange(inputYgb, callbackFun) {
	var url = "/member_controller/intergral_exchange.do";
    var data = {
            inputYgb: inputYgb
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description 可用红包列表接口
 * @example
 * ajaxMemberRed(state, page, pageSize, callbackFun)
 * @param {Int}  state 红包状态(已使用，未使用，已过期)
 * @param {Int}  page  分页页数
 * @param {Int}  pageSize  每页显示的条数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberRed(state, page, pageSize, callbackFun) {
	var url =  "/member_controller/member_red.do";
    var data = {
            state: state,
            page: page,
            pageSize: pageSize
    };
    ajaxPostAsync(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  结算时会员可使用红包的列表
 * @example
 * ajaxMemberPayRed(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberPayRed(callbackFun) {
	var url =  "/member_controller/member_pay_red.do";
    var data = {
    	 state: "1"
    };
    ajaxPostAsync(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  获取佣金明细(来源，消费)
 * @example
 * ajaxBrokerageRecord(page, time, btype, startTime, endTime, tradeType,callbackFun)
 * @param {Int}    page  分页页数
 * @param {Int}    time  时间参数（1今天 2本周 3本月 4昨天 0全部）
 * @param {int}    btype 判断佣金产生还是消费(1产生  2消费)
 * @param {string} startTime  开始日期
 * @param {string} endTime  截至日期
 * @param {string} tradeType 推广收易
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBrokerageRecord(page, time, btype, startTime, endTime, tradeType,callbackFun) {
	var url =  "/member_controller/brokerage_record.do";
    var data = {
    	    page: page,
            time: time,
            btype: btype,
            startTime: startTime,
            endTime: endTime,
            tradeType:tradeType
    };
    ajaxPost(url,data,callbackFun,'BrokerageRecord_'+page+'_'+time+'_'+btype,STORAGE_MEMBER_INVALID_TIME);
}



/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  根据时间统计 佣金 （累计、已提现金、已转云购）
 * @example
 * ajaxBrokerageCount(time, startTime, endTime, callbackFun)
 * @param {Int}    time  时间参数（1今天 2本周 3本月 4昨天 0全部）
 * @param {string} startTime  开始日期
 * @param {string} endTime  截至日期
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBrokerageCount(time, startTime, endTime, callbackFun) {
	var url =  "/member_controller/member_brokerage_count.do";
    var data = {
    	    time: time,
            startTime: startTime,
            endTime: endTime
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  获取会员银行卡列表
 * @example
 * ajaxBankList(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBankList(callbackFun){
	var url =  "/member_controller/bank_list.do";
    var data = {};
    // ajaxPost(url,data,callbackFun,'BankList',STORAGE_MAIN_INVALID_TIME);
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  设置银行卡默认
 * @example
 * ajaxBankDefault(bank_id, callbackFun)
 * @param {Int}    bank_id  银行卡ID
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBankDefault(bank_id, callbackFun) {
	var url =  "/member_controller/bank_default.do";
    var data = {
    	   bank_id: bank_id
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  删除银行卡
 * @example
 * ajaxBankDelete(bank_id, callbackFun)
 * @param {Int}    bank_id  银行卡ID
 * @param {Function}  callbackFun  回调函数
 */
/*function ajaxBankDelete(bank_id, callbackFun) {
	var url =  "/member_controller/bank_delete.do";
    var data = {
    	   bank_id: bank_id
    };
    ajaxPost(url,data,callbackFun);
}*/
function ajaxBankDelete(bank_id,callbackFun) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: API_DOMAIN+"/member_controller/bank_delete.do?t="+ Math.random(),
        data: {
        	bank_id: bank_id
        },
        success: function(result) {
             // if (result&& 1==result.res_code) {
		       callbackFun(result,bank_id);
		   // } 
        },
        error: function(r) {
          //错误处理
        }  
    });
}


/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  添加银行卡
 * @example
 * ajaxBankAdd(realName, bankName, cardNo, bankSubName, province, city, area, verifyCode, callbackFun)
 * @param {String}    realName  持卡人
 * @param {String}    bankName  开户行
 * @param {int}       cardNo    银行卡号
 * @param {String}    bankSubName    支行信息
 * @param {String}    area      所属区域
 * @param {String}    verifyCode      验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBankAdd(realName, bankName, cardNo, bankSubName, province, city, area, verifyCode, isDefault,callbackFun) {
	var url =  "/member_controller/bank_add.do";
    var data = {
    	    realName: realName,
            bankName: bankName,
            cardNo: cardNo,
            bankSubName: bankSubName,
            province: province,
            city: city,
            area: area,
            code: verifyCode,
            isDefault:isDefault
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  获取用户可用佣金
 * @example
 * ajaxGetBrokerageUsable(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGetBrokerageUsable(callbackFun) {
	var url =  "/member_controller/get_brokerage_usable.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"GetBrokerageUsable",STORAGE_MAIN_INVALID_TIME);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  佣金转账
 * @example
 * ajaxBrokerageTransfer(money, callbackFun)
 * @param {int}    money      转账金额
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBrokerageTransfer(money, callbackFun) {
	var url =  "/member_controller/brokerage_transfer.do";
    var data = {
    	money: money
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  获取银行卡名称列表
 * @example
 * ajaxBankNameList(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBankNameList(callbackFun) {
	var url =  "/member_controller/bank_name_list.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"BankNameList",STORAGE_INVALID_TIME);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  佣金提现
 * @example
 * ajaxBrokerageWithdraw(brokerageWithdrawToken,money, bankId, wValideCode, callbackFun)
 * @param {int}    brokerageWithdrawToken    
 * @param {int}    money      提现金额
 * @param {int}    bankId     银行卡ID
 * @param {string} wValideCode   短信验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBrokerageWithdraw(brokerageWithdrawToken,money, bankId, wValideCode, callbackFun) {
	var url =  "/member_controller/brokerageWithdraw.do";
    var data = {
    	    brokerageWithdrawToken:brokerageWithdrawToken,
            money: money,
            bankId: bankId,
            wValideCode: wValideCode
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  云购卡充值
 * @example
 * ajaxActivateCard(cardNo, password, validCode, memberRechargeCardToken, callbackFun)
 * @param {string}    cardNo      云购卡号
 * @param {string}    password    密码
 * @param {string}    validCode   图形验证码
 * @param {string}    memberRechargeCardToken   防止重复提交
 * @param {Function}  callbackFun  回调函数
 */
function ajaxActivateCard(cardNo, password, validCode, memberRechargeCardToken, callbackFun) {
	var url =  "/member_controller/activateCard.do";
    var data = {
    	    cardNo: cardNo,
            pwd: password,
            validCode: validCode,
            rechargeToken: memberRechargeCardToken
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  获取用户 默认提现次数及剩余提现次数
 * @example
 * ajaxBrokerageWithdrawTimes(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxBrokerageWithdrawTimes(callbackFun) {
	var url =  "/member_controller/brokerage_withdraw_times.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}




/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  招募合伙人详情
 * @example
 * ajaxPartnerData(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPartnerData(callbackFun) {
	var url =  "/member_controller/partnerData.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"PartnerData",STORAGE_INVALID_TIME);
}

//登录[1]、注册[3]、忘记密码[3]、意见反馈[1]、最新公告[1]、获取协议[1]（常见问题，隐私协议，消费者保证说明，用户协议）
/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 登录
 * @example
 * ajaxLogin(loginName, password, sourceFlag, callbackFun)
 * @param {String} loginName 用户名或手机
 * @param {String}  password  密码
 * @param {Int}  sourceFlag  存在则说明是从pc扫描二维码登录的，否则是正常微信登录
 * @param {Function}  callbackFun  回调函数
 */
function ajaxLogin(loginName, password, sourceFlag,callbackFun) {
    var url = "/member_controller/login.do";
    var data = {
        loginName: loginName,
        password: password,
        sourceFlag: sourceFlag
    };
    ajaxPostNoCheck(url,data,callbackFun);
};


/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 用户注册接口   (注册第一步骤，保存用户信息 至session)
 * @example
 * ajaxRegisteredNewOne(mobile, pwd, validCode, registerCode,callbackFun)
 * @param {String} mobile 手机号
 * @param {String} pwd 密码
 * @param {String} validCode 图形验证码
 * @param {String} registerCode 邀请码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxRegisteredNewOne(mobile, pwd, validCode, registerCode,callbackFun) {
    var url = "/member_controller/registeredNewOne.do";
    var data = {
        mobile: mobile,
        password: pwd,
        registerCode:registerCode,
        validCode: validCode
    };
    ajaxPost(url,data,callbackFun);
};
/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 注册第二步骤 传递 短信验证码 校验注册
 * @example
 * ajaxRegisteredNewTwo(code,registerCode, callbackFun)
 * @param {String} code 短信验证码
 * @param registerCode 邀请码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxRegisteredNewTwo(code,registerCode, callbackFun) {
    var url = "/member_controller/registeredNewTwo.do";
    var data = {
    	registerCode:registerCode,
                code: code,
        redFlyingFlag:redFlyingFlag
    };
    ajaxPost(url,data,callbackFun);
};
/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 注册时验证手机验证码
 * @example
 * ajaxMemberPhoneSubmit(mobile, code, callbackFun) 
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberPhoneSubmit(mobile, code, callbackFun) {
    var url = "/member_controller/member_phone_submit.do";
    var data = {
        mobile: mobile,
        code: code
    };
    ajaxPost(url,data,callbackFun);
};


/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 忘记密码时获取手机验证码
 * @example
 * ajaxForgetPhonePassword(validCode, mobile, callbackFun)
 * @param {String} validCode 图片验证码
 * @param {String} mobile 手机号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxForgetPhonePassword(validCode, mobile, callbackFun) {
    var url = "/member_controller/forget_phone_password.do";
    var data = {
        validCode: validCode,
        mobile: mobile
    };
    ajaxPost(url,data,callbackFun);
};
/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 忘记密码时验证手机验证码
 * @example
 * ajaxForgetPhoneSubmit(mobile, code, callbackFun)
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxForgetPhoneSubmit(code,mobile,callbackFun) {
    var url = "/member_controller/forget_phone_submit.do";
    var data = {
        mobile: mobile,
        code: code
    };
    ajaxPost(url,data,callbackFun);
};
/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 忘记密码时保存新密码
 * @example
 * ajaxChangePassword(mobile, password, callbackFun)
 * @param {String} mobile 手机号
 * @param {String} password 新密码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxChangePassword(mobile, password, callbackFun) {
    var url = "/member_controller/change_password.do";
    var data = {
        mobile: mobile,
        password: password
       };
    ajaxPost(url,data,callbackFun);
};


/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 提交意见反馈信息
 * @example
 * ajaxFeedbackAdd(content, opinionToken, callbackFun)
 * @param {String} content 意见反馈信息
 * @param {String} opinionToken 用于判断表单重复提交
 * @param {Function}  callbackFun  回调函数
 */
function ajaxFeedbackAdd(content, opinionToken, callbackFun) {
    var url = "/member_controller/feedback_add.do";
    var data = {
        content: content,
        opinionToken: opinionToken
    }
    ajaxPost(url,data,callbackFun);
};

/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 最新公告
 * @example
 * ajaxNoticeList(size,page,callbackFun)
 * @param {int} size 条数
 * @param {int} page 页数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxNoticeList(size,page,callbackFun) {
    var url = "/main_controller/noticeList.do";
    var data = {
    	pageSize: size,
    	page: page
    };
    ajaxPost(url,data,callbackFun);
};

/**
 * @author yanxiafei@ddtkj.com
 * @since 2016-6-1
 * @description 获取协议
 * @example
 * ajaxSelectArticleContent("CJWT",callbackFun)
 * @param {String} mark=[CJWT|YSXY|XFZBZSM|YHXY] 
 * 可选值包括  CJWT:常见问题，YSXY:隐私协议，XFZBZSM:消费者保证说明，YHXY:用户协议
 * @param {Function}  callbackFun  回调函数
 */
function ajaxSelectArticleContent(mark,callbackFun){
    var url = "/main_controller/selectArticleContent.do";
    var data = {
    	mark: mark
    };
     ajaxPost(url,data,callbackFun,"SelectArticleContent_"+mark,STORAGE_INVALID_TIME);
};


/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description 获取(已揭晓/待揭晓/正在揭晓/退购)云购记录
 * @example
 * ajaxMemberRecords(page, time, status, callbackFun)
 * @param {Int}  page  分页页数
 * @param {Int}  time  时间参数1今天2本周3本月4昨天0全部
 * @param {Int}	 status 商品状态1进行中2待揭晓3揭晓4退购
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberRecords(page, time, status, callbackFun) {
	var url = "/member_controller/member_records.do";
    var data = {
            page: page,
            time: time,
            status: status
    };
    if(status==3||status==4){
	  	ajaxPost(url,data,callbackFun,"MemberRecords_"+page+'_'+time+'_'+status,STORAGE_MEMBER_INVALID_TIME);	
    }else{
    	ajaxPost(url,data,callbackFun);
    }


}
/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description 获取多期参与详情
 * @example
 * ajaxPresellDetail(goods_id, order_No, callbackFun)
 * @param 
 * @param {Int}  goods_id  商品ＩＤ
 * @param {Int}  order_No  订单编号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPresellDetail(goods_id, order_No, callbackFun) {
	var url = "/member_controller/presell_detail.do";
    var data = {
            goods_id: goods_id,
            order_No: order_No
    };
    ajaxPost(url,data,callbackFun,"PresellDetail_"+goods_id+'_'+order_No,STORAGE_MEMBER_INVALID_TIME);
}

/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description ajax post获取多期参与列表
 * @example
 * ajaxPresellList(page, time, callbackFun)
 * @param {Int}  page  分页页数
 * @param {Int}  time  时间参数1今天2本周3本月4昨天0全部
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPresellList(page, time, callbackFun) {
	var url = "/member_controller/presell_list.do";
    var data = {
            page: page,
            time: time
    };
    ajaxPost(url,data,callbackFun,"PresellList_"+page+'_'+time,STORAGE_MEMBER_INVALID_TIME);
}

/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description ajax post获取中奖记录
 * @example
 * ajaxMemberRecordsWin(page, time, isMobileCard, callbackFun)
 * @param {Int} page 分页页数
 * @param {Int} time 时间参数1今天2本周3本月4昨天0全部
 * @param {Int} isMobileCard 是否卡片类（1是0不是）
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberRecordsWin(page, time, isMobileCard, callbackFun) {
	var url = "/member_controller/member_records_win.do";
    var data = {
            page: page,
            time: time,
            isMobileCard: isMobileCard
    };
    ajaxPost(url,data,callbackFun);
}

/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description ajax get获取晒单列表
 * @example
 * ajaxMemberExposeList(page, pageSize, callbackFun)
 * @param {Int} page 分页页数
 * @param {Int} pageSize 每页数量
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberExposeList(page, pageSize, callbackFun) {
	var url = "/member_controller/member_expose_list.do";
    var data = {
            page: page,
            pageSize: pageSize
    };
    ajaxPost(url,data,callbackFun,"MemberExposeList_"+page,STORAGE_MAIN_INVALID_TIME);
}


/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description ajax post获取邀请好友列表
 * @example
 * ajaxInviteResults(page, callbackFun) 
 * @param {Int} page 页数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxInviteResults(page, callbackFun) {
	var url = "/member_controller/invite_results.do";
    var data = {
             page: page
    };
    ajaxPost(url,data,callbackFun,"InviteResults_"+page,STORAGE_MAIN_INVALID_TIME);
}

/**
 * @author wangtingting@ddtkj.com
 * @since 2016-6-1
 * @description ajax post获取邀请好友
 * @example
 * ajaxInviteFriend(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */

function ajaxInviteFriend(callbackFun) {
	var url = "/member_controller/invite_friend.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}



/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 更具地址Id获取地址详情
 * @example
 * ajaxAddressDetail(address_id, tag, status, callbackFun)
 * @param {Int}  address_id 地址id
 * @param {Function}  callbackFun  回调函数
 */
function ajaxAddressDetail(address_id,callbackFun){
    var url = "/member_controller/address_detail.do";
    var data = {
        address_id: address_id
    };
   ajaxPost(url,data,callbackFun,"AddressDetail_"+address_id,STORAGE_MEMBER_INVALID_TIME);
}





/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 获取收货地址列表
 * @example
 * ajaxAddressList(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxAddressList(callbackFun){
	var url = "/member_controller/address_list.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}

/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 中奖商品确认收货地址
 * @example
 * ajaxConfirmAddress(address_id,gid,period,petroleum_transform_i,callbackFun)
 * @param {Int}  address_id  收货地址
 * @param {Int}  gid 商品Id
 * @param {Int}  period  期数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxConfirmAddress(address_id,gid,period,petroleum_transform_i,callbackFun){
	var url = "/member_controller/confirmAddress.do";
    var data = {
	    id: address_id,
        gid:gid,
        period:period,
        confirmType:petroleum_transform_i
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 绑定手机时获取手机验证码
 * @example
 * ajaxChangeOldmobileCode(mobile, callbackFun)
 * @param {String}  mobile 手机号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxChangeOldmobileCode(mobile, callbackFun){
	var url = "/member_controller/change_oldmobile_code.do";
    var data = {
	   mobile: mobile
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 绑定手机时获取手机验证码
 * @example
 * ajaxChangeOldmobileSumbit(mobile, callbackFun)
 * @param {String}  mobile 手机号
 * @param {Int}  code 验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxChangeOldmobileSumbit(mobile, code, callbackFun){
	var url = "/member_controller/change_oldmobile_sumbit.do";
    var data = {
	   mobile: mobile,
         code: code
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 绑定手机时获取新手机验证码
 * @example
 * ajaxMemberPhoneVerify(updatemobile, mobile, callbackFun)
 * @param {Int}  updatemobile 手机号
 * @param {String}  mobile 新手机号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxMemberPhoneVerify(updatemobile, mobile, callbackFun){
	var url = "/member_controller/member_phone_verify.do";
    var data = {
	   updatemobile: updatemobile,
             mobile: mobile
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 绑定手机时验证新手机验证码
 * @example
 * ajaxChangeNewmobileSumbit(mobile, code, callbackFun)
 * @param {String}  mobile 新手机号
 * @param {String}  code 验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxChangeNewmobileSumbit(mobile, code, callbackFun){
	var url = "/member_controller/change_newmobile_sumbit.do";
    var data = {
	    mobile: mobile,
          code: code
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 收入手机获取验证码
 * @example
 * ajaxAddressSendcode(mobile, checkCode)
 * @param {String}  mobile 新手机号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxAddressSendcode(mobile,callbackFun){
	var url = "/member_controller/address_sendcode.do";
    var data = {
	    mobile: mobile
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 收货地址添加
 * @example
 * ajaxAddAddress(params, callbackFun)
 * @param   params 收货地址
 * @param {Function}  callbackFun  回调函数
 */
function ajaxAddAddress(params, callbackFun){
	var url = "/member_controller/add_address.do";
    var data = params;
    ajaxPost(url,data,callbackFun);
}
  
  
  /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 收货地址删除
 * @example
 * ajaxDeleteAddress(addressId, deleteback)
 * @param {String}  addressId 收货地址
 * @param {Function}  deleteback  回调函数
 */
function ajaxDeleteAddress(addressId, callbackFun){
	var url = "/member_controller/delete_address.do";
    var data = {
	    id: addressId
    };
    ajaxPost(url,data,callbackFun);
}


  /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 获取会员个人信息
 * @example
 * ajaxPersonalCenter(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPersonalCenter(callbackFun){
	var url = "/member_controller/personal_center.do";
    var data = {};
//  ajaxPost(url,data,callbackFun,"PersonalCenter",STORAGE_MEMBER_INVALID_TIME);
    ajaxPost(url,data,callbackFun);
}



  /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 设置默认地址
 * @example
 * ajaxUpdateAddressDefault(address_id, callbackFun)
 * @param {String}  addressId 收货地址
 * @param {Function}  callbackFun  回调函数
 */
function ajaxUpdateAddressDefault(address_id, callbackFun){
	var url = "/member_controller/update_address_default.do";
    var data = {
	    address_id: address_id
    };
    ajaxPost(url,data,callbackFun);
}


 /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 提交评论信息
 * @example
 * ajaxShowReplyAdd(show_id, reviewContent, exposeDetailToken, callbackFun)
 * @param {Int}  show_id 晒单ID
 * @param {String}  reviewContent 评论内容
 * @param {String}  exposeDetailToken 防止表单重复提交
 * @param {Function}  callbackFun  回调函数
 */
function ajaxShowReplyAdd(show_id, reviewContent, exposeDetailToken, callbackFun){
	var url = "/member_controller/showReply_add.do";
    var data = {
	    show_id: show_id,
		reviewContent: reviewContent,
		exposeDetailToken: exposeDetailToken
    };
    ajaxPost(url,data,callbackFun);
}


 /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 修改用户昵称
 * @example
 * ajaxPersonalNickname(nickname, callbackFun)
 * @param {String}  nickname 昵称
 * @param {Function}  callbackFun  回调函数
 */
function ajaxPersonalNickname(nickname, callbackFun){
	var url = "/member_controller/personal_nickname.do";
    var data = {
	    nickname: nickname
    };
    ajaxPost(url,data,callbackFun);
}


 /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 邀请好友发送短信邀请码
 * @example
 * ajaxInviteFriendSms(mobile, callbackFun)
 * @param {String}  mobile 手机号
 * @param {Function}  callbackFun  回调函数
 */
function ajaxInviteFriendSms(mobile, callbackFun){
	var url = "/member_controller/invite_friend_sms.do";
    var data = {
	    mobile: mobile
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 退出登录
 * @example
 * ajaxLoginOut(callbackFun)
 */
function ajaxLoginOut(callbackFun){
	var url = "/member_controller/loginout.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}


 /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 修改登录密码
 * @example
 * ajaxUpdateLoginpwd(oldpwd, newpwd, callbackFun)
 * @param {String}  oldpwd 原密码
 * @param {String}  newpwd 新密码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxUpdateLoginpwd(oldpwd, newpwd, callbackFun){
	var url = "/member_controller/update_loginpwd.do";
    var data = {
	     oldpwd: oldpwd,
         newpwd: newpwd
    };
    ajaxPost(url,data,callbackFun);
}


 /**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 校验用户可购买数量
 * @example
 * ajaxCanBuyMaxTimesByids(goods_ids, callbackFun)
 * @param {Int}  goods_ids 商品Id 字符串
 * @param {Function}  callbackFun  回调函数
 */
function ajaxCanBuyMaxTimesByids(goods_ids, callbackFun){
	var url = "/member_controller/can_buy_max_times_byids.do";
    var data = {
	   ids: goods_ids
    };
    ajaxPostAsync(url,data,callbackFun);
}




/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 添加银行卡时获取验证码
 * @example
 * ajaxGetBankCode(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGetBankCode(callbackFun){
	var url = "/member_controller/get_bank_code.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}



/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 佣金提现时获取验证码
 * @example
 * ajaxWithDrawValideCode(money,callbackFun)
 * @param {Int}  money 可提现金额
 * @param {Function}  callbackFun  回调函数
 */
function ajaxWithDrawValideCode(money,callbackFun){
	var url = "/member_controller/withDrawValideCode.do";
    var data = {
	   money: money
    };
    ajaxPost(url,data,callbackFun);
}



/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 提交晒单
 * @example
 * ajaxExposeSave(gid, period, title, content, imgs, memberWantShowToken, callbackFun)
 * @param {Int}  gid 商品gid
 * @param {Int}  period 商品当前期数
 * @param {String}  title 晒单标题
 * @param {String}  content 晒单内容
 * @param   imgs 晒单图片
 * @param   memberWantShowToken 防止表单重复提交
 * @param {Function}  callbackFun  回调函数
 */
function ajaxExposeSave(gid, period, title, content, imgs, memberWantShowToken, callbackFun){
	var url = "/member_controller/expose_save.do";
    var data = {
	        gid: gid,
            period: period,
            title: title,
            contents: content,
            memberWantShowToken:memberWantShowToken,
            content: imgs
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 云购确认收货
 * @example
 * ajaxYgbGoodsReceipt(id, gid, period, callbackFun)
 * @param {Int}  gid 商品id
 * @param {Int}  period 期数
 * @param {Function}  callbackFun  回调函数
 */
function ajaxYgbGoodsReceipt(gid, period, callbackFun){
	var url = "/member_controller/ygb_goods_receipt.do";
    var data = {
            gid: gid,
            period: period
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 退购
 * @example
 * ajaxOrderRefund(id, callbackFun)
 * @param {Int}  id 订单id
 * @param {Function}  callbackFun  回调函数
 */
function ajaxOrderRefund(id, callbackFun){
	var url = "/member_controller/order_refund.do";
    var data = {
	         id: id
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 直购确认收货
 * @example
 * ajaxByGoodsReceipt(id, callbackFun)
 * @param {Int}  id 订单id
 * @param {Function}  callbackFun  回调函数
 */
function ajaxByGoodsReceipt(id, callbackFun){
	var url = "/member_controller/by_goods_receipt.do";
    var data = {
	         id: id
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 校验非法字符
 * @example
 * ajaxDfGoodsReceipt(keyword, callbackFun)
 * @param   keyword 
 * @param {Function}  callbackFun  回调函数
 */
function ajaxDfGoodsReceipt(keyword, callbackFun){
	var url = "/member_controller/df_goods_receipt.do";
    var data = {
	         keyword: keyword
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 微信用户解除微信绑定
 * @example
 * ajaxWxUnbind(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxWxUnbind(callbackFun){
	var url = "/member_controller/wx_unbind.do";
    var data = { };
    ajaxPost(url,data,callbackFun);
}



/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 解除第三方绑定
 * @example
 * ajaxThirdUnbind(bindPlatform,callbackFun)
 * @param   unbindPlatform 
 * @param {Function}  callbackFun  回调函数
 */
function ajaxThirdUnbind(bindPlatform,callbackFun){
	var url = "/member_controller/third_unbind.do";
    var data = { 
       unbindPlatform:bindPlatform
    };
    ajaxPost(url,data,callbackFun);
}




/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 用户签到
 * @example
 * ajaxSign(signToken, callbackFun)
 * @param  signToken  
 * @param {Function}  callbackFun  回调函数
 */
function ajaxSign(signToken, callbackFun){
	var url = "/member_controller/sign.do";
    var data = { 
        signToken: signToken
    };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 用户签到
 * @example
 * ajaxCheckSign(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxCheckSign(callbackFun){
	var url = "/member_controller/checksign.do";
    var data = { };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 第三方服务
 * @example
 * ajaxThirdServerList(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxThirdServerList(callbackFun){
	var url = "/main_controller/thridPartyList.do";
    var data = { };
    ajaxPost(url,data,callbackFun);
}


/**
 * @author lishuqin@ddtkj.com
 * @since 2016-6-1
 * @description 清空session
 * @example
 * ajaxClearSessionByName(sessionName,callbackFun)
 * @param {String} sessionName
 * @param {Function}  callbackFun  回调函数
 */
function ajaxClearSessionByName(sessionName,callbackFun){
	var url = "/member_controller/clearSessionByName.do";
    var data = { 
    sessionName:sessionName
    };
    ajaxPost(url,data,callbackFun);
}







/**
 * @author machao@ddtkj.com
 * @since 2016-6-15
 * @description 购物车支付
 * @example
 * ajaxPay(params, callbackFun)
 * @param {array} params{
 * addressId  地址ID
 * cart  购物车商品列表json串
 * isUseMoney 是否使用余额   0 不使用  1 使用
 * isUseRedPackage  是否使用红包  0 不使用 1 使用
 * rid   使用的红包ID  如果上一项为1 必须有参数
 * isUsePetCard  是否是使用购物卡  0 不使用  1 使用
 * }
 */
function ajaxPay(params, callbackFun) {
    var   url="/member_controller/pay.do";
    var   data = params;
    ajaxPostNoCheck(url,data,callbackFun);
};
/**
 * @author pangyanhui@ddtkj.com
 * @since 2016-6-16
 * @description 推荐商品
 */
function ajaxRecommendGoods(callbackFun,storage_name,storage_invalid_time){
	var   url="/main_controller/selectRecommendGoods.do";
    var data = { };
    ajaxPost(url,data,callbackFun,storage_name,storage_invalid_time);
}



 


/*
 * @author lishuqin@ddtkj.com
 * @since 2016-8-31
 * @description  中奖分享窗口的文字提示
 * @example
 * ajaxPublishShareGiveMoney(number,gid,period,goods_price,callbackFun)
 * @param {number} condition  总需人次
 * @param {goods_price}  callbackFun  回调函数
 */
function ajaxPublishShareGiveMoney(number,gid,period,goods_price,callbackFun) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: API_DOMAIN+"/member_controller/publishShareGiveMoney.do?t="+ Math.random(),
        data: {
        	rnumber:number,
        	money:goods_price
        },
        success: function(result) {
             // if (result&& 1==result.res_code) {
		       callbackFun(gid,period,result);
		   // } 
        },
        error: function(r) {
          //错误处理
        }  
    });
}
/*
 * @author lishuqin@ddtkj.com
 * @since 2016-9-1
 * @description  上传分享截图(结果查询)
 * @example
 * ajaxPublishShareDetail(gid,period,callbackFun)
 * @param  gid gid
 * @param  period 期数
 */
function ajaxPublishShareDetail(gid,period,callbackFun) {
        var url =  "/member_controller/getPublishShareDetail.do";
        var data =  {
            gid: gid,
            period:period
        };
        ajaxPost(url,data,callbackFun,"PublishShareDetail_"+gid+'_'+period,STORAGE_MEMBER_INVALID_TIME);
}
/*
 * @author lishuqin@ddtkj.com
 * @since 2016-9-1
 * @description  上传分享截图
 * @example
 * ajaxUploadShareImage(gid,period,imgs,callbackFun)
 * @param  gid gid
 * @param  period 期数
 */
function ajaxUploadShareImage(gid,period,imgs,callbackFun) {
        var url =  "/member_controller/uploadShareImage.do";
        var data =  {
            gid: gid,
            period:period,
            content:imgs
        };
        ajaxPost(url,data,callbackFun);
}

/**
 * @author machao@ddtkj.com
 * @since 2016-9-1
 * @description 中奖商品确认收货地址(方式)
 * @example
 * ajaxConfirmAddressType(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxConfirmAddressType(callbackFun){
    var url = "/member_controller/confirmAddressType.do";
    var data = {};
    ajaxPost(url,data,callbackFun);
}
/**
 * @author machao@ddtkj.com
 * @since 2016-9-1
 * @description 获取银行卡列表
 * @example
 * ajaxGetMyBankList(callbackFun)
 * @param {Function}  callbackFun  回调函数
 */
function ajaxGetMyBankList(callbackFun){
    var url = "/member_controller/bank_list.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"GetMyBankList",STORAGE_MEMBER_INVALID_TIME);
}

/**
 * @author wangxinhui@ddtkj.com
 * @since 2016-6-1
 * @description  添加银行卡
 * @example
 * ajaxBankAdd(realName, bankName, cardNo, bankSubName, province, city, area, verifyCode, callbackFun)
 * @param {String}    bankId  持卡人
 * @param {String}    realName  持卡人
 * @param {String}    bankName  开户行
 * @param {int}       cardNo    银行卡号
 * @param {String}    bankSubName    支行信息
 * @param {String}    area      所属区域
 * @param {String}    verifyCode      验证码
 * @param {Function}  callbackFun  回调函数
 */
function ajaxUpdateBank(id,realName, bankName, cardNo, bankSubName, province, city, area, verifyCode, isDefault,callbackFun) {
	var url =  "/member_controller/bank_update.do";
    var data = {
    	    id:id,
    	    realName: realName,
            bankName: bankName,
            cardNo: cardNo,
            bankSubName: bankSubName,
            province: province,
            city: city,
            area: area,
            code: verifyCode,
            isDefault:isDefault
    };
    ajaxPost(url,data,callbackFun);
}
/**
 * @author wushuaipeng@ddtkj.com
 * @since 2016-9-2
 * @description  全部商品目录
 */
function ajaxGoodsMenus(callbackFun) {
	var url =  "/main_controller/selectGoodsMenus.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"GoodsMenus",STORAGE_INVALID_TIME);
}


/*
 * @author lishuqin@ddtkj.com
 * @since 2016-9-1
 * @description  线下支付充值记录
 * @example
 * ajaxSelectRechargeOfflineList(page,pageSize,callbackFun,mid)
 * @param  page 
 * @param  pageSize 
 * @param  mid 
 */
function ajaxSelectRechargeOfflineList(page,pageSize,callbackFun,mid) {
        var url =  "/member_controller/selectRechargeOfflineList.do";
        var data =  {
           page:page,
           pageSize:pageSize,
           mid:mid
        };
        ajaxPost(url,data,callbackFun);
}
/**
 * @author wushuaipeng@ddtkj.com
 * @since 2016-9-5
 * @description  获取会员名称和是否实名认证
 */
function ajaxGetUserMsg(callbackFun) {
	var url =  "/member_controller/memberPaylevelResult.do";
    var data = {};
    ajaxPost(url,data,callbackFun,"GetUserMsg",STORAGE_MAIN_INVALID_TIME);
}

/* @author wangxinhui@ddtkj.com
 * @description 获取会员特权购买记录
 * @example
 * ajaxMemberGradeRecord(page, size,callbackFun)
 * @param page   int  页数
 * @param size     int  每页的个数
 */
function ajaxMemberGradeRecord(page, size,callbackFun) {
	var url = "/member_controller/memberShareBillList.do?t=" + Math.random();
	var data = {
            page: page,
            size: size
        };
    ajaxPost(url,data,callbackFun);
}

/*
 * @description 动态获取微信支付类型
 * @example
 * ajaxWxPayChannel(callbackFun) 
 * 返回值：Json格式
 */
function ajaxWxPayChannel(callbackFun) {
    var url = "/member/wxPayChannel.do";
    var data = '';
    ajaxPostAsync(url,data,callbackFun);
}

/*
 * @description 实名认证
 * @example
 * ajaxidCardAuth(realname,idcard,callbackFun)
 * @param realname 名字
 * @param realname 身份证号
 */
function ajaxidCardAuth(realname,idcard,callbackFun) {
	var url = "/member_controller/idCardAuth.do";
	var data = {
        	realname:realname,
        	idcard:idcard
        };
    ajaxPost(url,data,callbackFun);
}



/*
 * @description 获取充值状态
 * @example
 * ajaxWXPay(tradeType,money,callbackFun) 
 * @param tradeNo 名字
 * @param money 身份证号
 */
function ajaxWXPay(tradeType,money,callbackFun) {
	var data={
		tradeType:tradeType,
		money:money
	};
	var url= "/member/wxPay.do";
    ajaxPost(url,data,callbackFun);
}



/*
 * @description 获取充值状态
 * @example
 * ajaxSelectRechargePay(tradeNo,money,callbackFun)
 *@param tradeNo 名字
 *@param money 身份证号  
 */
function ajaxSelectRechargePay(tradeNo,money,callbackFun) {
	var data={
		tradeNo:tradeNo,
		money:money
	};
	var url= "/member_controller/selectRechargePay.do";
     ajaxPostNoCheck(url,data,callbackFun);
}


/*
 * @description 奖励信息
 * @example
 * ajaxAwardInformation(mid,callbackFun)
 * 返回值：Json格式    收货地址列表
 */
function ajaxAwardInformation(mid,callbackFun) {
    var data={
    	uid:mid
    };
    var url= "/member_controller/rewardInfo.do";
    ajaxPostNoCheck(url,data,callbackFun);
}


/*
 * @description 获取会员个人信息
 * @example
* ajaxGetMemberInfo(callbackFun)
* 返回值：Json格式    收货地址列表
*/
function ajaxGetMemberInfo(callbackFun) {
    var data={};
    var url= "/member_controller/personal_center.do";
    ajaxPost(url,data,callbackFun);
}


/*
 * @description (新)综合接口
 * @example
 * 参数：type：1.首页菜单，2.首页广告图，3.全部栏目，4.首页轮播图
 * ajaxGeneralImageLinkList(callbackFun)
* 返回值：Json格式    收货地址列表
*/
function ajaxGeneralImageLinkList(type,callbackFun,fid) {
    var data={
        type:type,
        fid:fid
    };
    var url= "/other_controller/getGeneralImageLinkList.do";
    ajaxPost(url,data,callbackFun,'GeneralLeftLinkList_'+type+'_'+fid,STORAGE_INVALID_TIME);
}
/*
 * @description (新)需求描述接口
 * @example
 * 参数：data:上传参数
* 返回值：Json格式
*/
function ajaxUpdateNeedsList(data,callbackFun) {
    var url= "/other_controller/insertCmsDemand.do";
    ajaxPostNoCheck(url,data,callbackFun);
}