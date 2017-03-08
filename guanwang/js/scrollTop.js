
$(function(){
	//返回顶部效果（判断是否在顶部以隐藏显示按钮）
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('#scrollTop_wrap').fadeIn();
		} else {
			$('#scrollTop_wrap').fadeOut(0);
		}
	});

	// 点击返回顶部滚动
	$('#scrollTop').click(function () {
		
		$(this).parent().animate({"bottom":1000,"opacity":0},400,function(){
			$('#scrollTop_wrap').css("opacity",1).fadeOut(0).css("bottom",200);
		});
		$('body,html').animate({
			scrollTop: 0
		}, 400);
	});
		
	
	
})

