; (function ($) {
    $.fn.slider = function (options) {
        var setings = {
            Direction: 'left',
        }
        var liwidth = $(this).find('li').width();
        var liheight = $(this).find('li').height();
        var ulwidth = $(this).find('ul').width();
        var ulheight = $(this).find('ul').height();
        var lilen = $(this).find('li').length;
        $.extend(setings, options)
        var ulNode = this.find("ul"), currentIndex = 0;
        this.find("ul").width(ulwidth)
        var self = this;
        var itv = setInterval(function () {
            currentIndex++;
            if (setings.Direction == 'left') {
                self.find("ul").width(liwidth * lilen)
                if (currentIndex == lilen) {
                    currentIndex = 0;
                    ulNode.css('-webkit-transform', 'translate3d( 0px,px, 0px, 0px)');
                }
                ulNode.css('-webkit-transform', 'translate3d(' + -1 * currentIndex * liwidth + 'px, 0px, 0px)')
            } else {
                self.find("ul").width(liwidth)
                self.find("ul").height(liheight * lilen)
                if (currentIndex == lilen) {
                    currentIndex = 0;
                    ulNode.css('-webkit-transform', 'translate3d( 0px,0px, 0px)');
                }
                ulNode.css('-webkit-transform', 'translate3d( 0px,' + -1 * currentIndex * liheight + 'px, 0px)')
            }
        }, 2000)
    }
}(jQuery));