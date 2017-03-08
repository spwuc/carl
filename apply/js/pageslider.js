; (function ($) {
    $.fn.Slider = function (options) {
        var defauls = {
            other: '#index0',
            self: '#index1',
            translate: window.innerWidth,
        }
        $.extend(defauls, options)
        $(this).click(function () {
            $(defauls.other).css("-webkit-transform", ' translate3d(' + defauls.translate + 'px, 0px, 0px)')
            $(defauls.self).css('z-index', '2').siblings().css('z-index', 1)
            $(defauls.self).css("-webkit-transform", ' translate3d(0px, 0px, 0px)')
            setTimeout(function () {
                if (defauls.self != '#index3') {
                    $('#index3').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index2') {
                    $('#index2').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }                
                if (defauls.self != '#index7') {
                    $('#index7').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index6') {
                    $('#index6').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index4') {
                    $('#index4').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index5') {
                    $('#index5').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self == '#index5' && defauls.other == '#index6') {
                    $('#index6').css("-webkit-transform", ' translate3d(' + window.innerWidth * -1 + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index0') {
                    $('#index0').css("-webkit-transform", ' translate3d(' + window.innerWidth + 'px, 0px, 0px)')
                }
                if (defauls.self != '#index1') {
                    $('#index1').css("-webkit-transform", ' translate3d(' + -window.innerWidth + 'px, 0px, 0px)')
                    if (defauls.self == '#index6') {
                        $('#index3').css("-webkit-transform", ' translate3d(' + window.innerWidth * -1 + 'px, 0px, 0px)')
                    }
                }
                if (defauls.self == '#index2' && defauls.other == '#index6') {
                    $('#index6').css("-webkit-transform", ' translate3d(' + window.innerWidth * -1 + 'px, 0px, 0px)')
                }
            }, 500)
            curindex = defauls.self;
        })
    }

}(jQuery))