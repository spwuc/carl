$(function() {
	$(".watchHide").css({"height":$(window).height()});
    $(".watchTab ul li").click(function(){
        $(".wrap>div").eq($(this).index()).show().siblings().hide();
        $(this).find("p").addClass("cur").parent().siblings().find("p").removeClass("cur");
    });
//   电视 2
    $(".watchShow span").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).find("img").attr({'src':'images/03/watchicon1.png'}).parent().siblings().find("img").attr({'src':'images/03/watchicon2.png'})
        if($(".watchShow>span").eq(0).hasClass("cur")){
            $(".watchicon1Show").show();
        }else{
            $(".watchicon1Show").hide();
        }
        if($(".watchShow>span").eq(1).hasClass("cur")){
            $(".watchicon1Shows").show();
        }else{
            $(".watchicon1Shows").hide();
        }
    })
//    社保
    $(".socialTab ul li").click(function(){
        $(".wraps>div").eq($(this).index()).show().siblings().hide();
        $(this).find("p").addClass("cur").parent().siblings().find("p").removeClass("cur");
    });



    //删除

        function prevent_default(e) {
            e.preventDefault();
        }

        function disable_scroll() {
            $(document).on('touchmove', prevent_default);
        }

        function enable_scroll() {
            $(document).unbind('touchmove', prevent_default);
        }

        var x;
        $('.touch_r')
            .on('touchstart', function (e) {
                $('.touch_r.open').css('left', '0px').removeClass('open');
                $(e.currentTarget).addClass('open');
                x = e.originalEvent.targetTouches[0].pageX;
            })
            .on('touchmove', function (e) {
                var change = e.originalEvent.targetTouches[0].pageX - x;
                var currentLeft = parseInt(e.currentTarget.style.left);
                if (change < 0 || (currentLeft < 0 && change > 0 && change + currentLeft < 0)) {
                    change = Math.min(Math.max(-68, change), 100);
                    e.currentTarget.style.left = change + 'px';
                    if (change < -10) disable_scroll();
                }
            })
            .on('touchend', function (e) {
                var left = parseInt(e.currentTarget.style.left);
                var new_left;
                if (left < -35) {
                    new_left = '-68px';
                } else if (left > 0) {
                    new_left = '0px';
                } else {
                    new_left = '0px';
                }
                $(e.currentTarget).animate({left: new_left}, 200);
                enable_scroll();
            });

        $('li .delete-btn').on('touchend', function (e) {
            e.preventDefault();
            $(this).parents('li').slideUp('fast', function () {
                $(this).remove();
            })
        })


})
	
	