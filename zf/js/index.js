/**
 * Created by wushuaipeng on 2017/2/3.
 */

$(function(){
    var hash = window.location.hash.substring(1);
    if(hash){
        scrollGoTo(hash);
        window.location.hash = '';
	}
	$('#header').load('header.html');
	/*产品介绍左侧步骤线点击*/
	(function(){
		var oDiv = $('#chanping01');
		var oPrev = oDiv.find(".prev");
		var oNext = oDiv.find(".next");
		var aDot = oDiv.find(".now_linebtn_one");
		var aSpan = oDiv.find(".now_line span");
		var aContents = oDiv.find(".content_one");
		var nowIndex = 0;
		
		
		oNext.click(function(){
			nowIndex++;
			if(nowIndex>=aDot.length){
				nowIndex = 0;
			}
			doFade("fadeInRight");
		});
		oPrev.click(function(){
			nowIndex--;
			if(nowIndex<0){
				nowIndex = aDot.length-1;
			}
			doFade("fadeInLeft");
		});
		aSpan.click(function(){
			var index = aDot.index($(this).parent());
			var action = (nowIndex>index)?"fadeInLeft":"fadeInRight";
			nowIndex = index;
			doFade(action);
		});
		
		function doFade(action){
			aDot.removeClass("now").eq(nowIndex).addClass("now");
			aContents.fadeOut(0).eq(nowIndex).fadeIn(200);
			aContents.eq(nowIndex).find("h1, p, img").attr("class","").addClass("animated "+action);
		}
	})();
	//联系我们的输入框focus效果
	$(".lianxi input, .lianxi textarea").focus(function(){
		$(this).closest(".input_box").addClass("focus_input_box");
	}).blur(function(){
		$(this).closest(".input_box").removeClass("focus_input_box");
	});
    $('.fixed_contactus').click(function () {
        $('body,html').animate({
            scrollTop: $('body').height()
        }, 400);
    })
});
function scrollGoTo(page) {
    $('body,html').animate({
        scrollTop: page*800
    }, 400);
}

