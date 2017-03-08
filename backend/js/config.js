$(function(){
    $('.right_page').width($(document).width()-100);
    $('.iframeStyle').height($(document).height()-20);
    $('.right_page>div>.iframeStyle').eq(0).show();
    $('.left_page>ul>li p').click(function(){
        if($(this).next().css('display')=='none'){
            $('.left_page>ul>li p').next().slideUp();
            $('.left_page>ul>li p').addClass('radius3');
            $(this).next().slideDown();
            $(this).removeClass('radius3');
        }else{
            $(this).next().slideUp();
            $(this).addClass('radius3');
        }
    })
    $('.none li').click(function(){
        var _this = this,
            tag = false;
        $('.right_page ul li').each(function(){
            if($(this).text()==$(_this).text()){
                tag = true;
                $(this).trigger('click')
            }
        })
        if(!tag){
            $('.right_page ul').append('<li index="'+(Number($('.right_page ul li').last().attr('index'))+1)+'">'+$(this).text()+'</li>')
            $('.right_page div').append('<iframe scrolling="yes" src ="'+$(this).attr("href")+'"class="iframeStyle"></iframe>');
            $('.iframeStyle').last().height($('.iframeStyle').first().height());
            $('.right_page ul li').last().trigger('click')
        }
    })
    $(".right_page ul").delegate("li", "click", function(){
        var _index = $(this).attr('index');
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.right_page div iframe').hide();
        $('.right_page div iframe').eq(_index).show();
    });
})