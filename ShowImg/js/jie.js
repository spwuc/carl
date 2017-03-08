$(function () {
    var x;
    $('#wrap>div').each(function () {
        $(this).mouseenter(function () {
            $('#wrap>div').eq(3).css({ left: '466px', top: 0, width: '310px' })
            $('#wrap>div').eq(7).css({ left: '466px', top: '172px', width: '310px' })
            x = $(this).find('img').width();
            $('#wrap>div').find('p').css({ display: 'block' })
            $('#wrap>div').find('div').css({ display: 'none' });
            $('#wrap>div').css({ 'z-index': 3 })
            $(this).fadeTo(50, 1).siblings().fadeTo(50, 0.5);
            $(this).css({ 'z-index': 5 })
            $(this).find('p').css({ display: 'none' });
            $(this).addClass('cur').siblings().removeClass();
            $(this).css({ width: 2 * x })
            $(this).find('div').css({ display: 'block' })
        })
    })
    $('#wrap>div').eq(3).mouseenter(function () {
        $(this).css({ left: '153px' })
    }).mouseleave(function(){
            $(this).css({ left: '466px' })
        })
    $('#wrap>div').eq(7).mouseenter(function () {
        $(this).css({ left: '153px' })
    }).mouseleave(function(){
            $(this).css({ left: '466px' })
        })
    $('#wrap').mouseleave(function(){
        $('#wrap>div').each(function(){
            $(this).removeClass().fadeTo(50, 1).find('p').css({ display: 'block' });
            $(this).find('div').css({ display: 'none' })
            $(this).css({ width:$(this).find('img').width() })
        })

    })

})