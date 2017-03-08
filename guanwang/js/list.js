var GLOBAL = GLOBAL || {};
$(function(){
	
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	$(".title_list .pen").click(function(){
		$(".title_list").animate({"width":"100px",backgroundPositionX:"-1000px"},0,function(){
			$(".title_list").animate({"width":"1100px",backgroundPositionX:"0px"},1300,"easeOutStrong");
		});
	})
	
	//刚进入页面，调用数据加载方法，加载第一页数据
	loadArticleList();
	
	//点击下一页，加载对应页面数据
	$("#listMore").click(function(){
		
		if(GLOBAL.pageStart < GLOBAL.pageCount){
			loadArticleList();
		}
		
	})
	
	//由于.content_one是后来添加到页面的dom，直接绑定click事件是不起作用的，这里我们采用事件委托的方式，把事件委托到$("#articleList")上
	$("#articleList").delegate(".content_one", "click", function(){
		window.open("article.html?"+"type=" + getUrlParams("type")+ "&articleId=" + $(this).attr("articleId"), "_blank");
	});
	
	
})

//加载列表数据方法
function loadArticleList(){
	//先ajax请求数据，然后就行下面的操作，此处数据先写好在了listData.js里，可以直接使用，格式和服务器返回的json一致。
	if(!GLOBAL.pageStart){
		$("#articleList").html("");
		GLOBAL.pageStart = 0;
	}
	
	var itemHtml = '';
	var result = listData["listData0" +GLOBAL.pageStart]; //此数据在listData.js里
	var list = result.data.list;
	if(!list || !list.length){
		$("#articleList").html("暂时没有内容，敬请期待！");
	} else {
		var updateTime;
		for(var i=0; i < list.length; i++){
			updateTime = list[i].updateAt || list[i].creatAt;
			itemHtml = $("#itemHtml").html().replace("$articleCover$", list[i].coverImg)
					.replace("$articleId$", list[i].sysId)
					.replace("$articleTitle$", list[i].title)
					.replace("$updateTime$", updateTime ? updateTime.substr(0, 10) : "")
					.replace("$describe$", list[i].describe);
			$("#articleList").append(itemHtml);
		} 
	}
	
	//用于加载下一页时使用
	GLOBAL.pageStart = result.data.pageStart + 1;
	GLOBAL.pageCount = Math.ceil(result.data.count/result.data.pageSize);
	if(GLOBAL.pageStart >= GLOBAL.pageCount){
		$("#listMore").css("opacity","0").prev("img").attr("src","images/list_gomore_bg_nomore.jpg");
	}
}


//获取页面url传过来的参数
function getUrlParams(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 
	 if(r!=null)
		 return  r[2];
	 else 
		 return "";
}
