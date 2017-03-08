; (function ($) {
    $.fn.slider = function (options) {
        var setings = {
            Direction: 'left',
            time:1000
        }
        var liwidth = $(this).find('li').width();
        var liheight = $(this).find('li').height();
        var ulwidth = $(this).find('ul').width();
        var ulheight = $(this).find('ul').height();
        var lilen = $(this).find('li').length;
        $.extend(setings, options)
        var ulNode = this.find("ul"), currentIndex = 0;
        this.find("ul").width(ulwidth)
        var firstliClione = ulNode.find("li").first().clone();
        firstliClione.appendTo(ulNode);
        var self = this;
        var itv = setInterval(function () {
            currentIndex++;
            if (setings.Direction == 'left') {
                self.find("ul").width(liwidth * (lilen+1))
                ulNode.animate({ 'left': -1 * currentIndex * liwidth }, setings.time, function () {
                    if (currentIndex == lilen) {
                        currentIndex = 0;
                        ulNode.css('left', 0);
                    }
                });
            } else {
                self.find("ul").height(liheight * (lilen+1))
                ulNode.animate({ 'top': -1 * currentIndex * liheight }, setings.time, function () {
                    if (currentIndex == lilen) {
                        currentIndex = 0;
                        ulNode.css('top', 0);
                    }
                });
            }
        }, setings.time*2)
    }
}(jQuery));