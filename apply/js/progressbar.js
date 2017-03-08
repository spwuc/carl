; (function ($) {
            $.fn.progressbar = function (options) {
                var setings = {
                    percent: 0,
                    color: 'green',
                }
                $.extend(setings, options)
                var img = '<img src="img/progressbar.gif" width="120" height="12" style="background-image:url(img/progressbg_' + setings.color + '.gif); background-position:' + ((120 * setings.percent) - 120) + 'px 50%;" />'
                this.html(img)
                this.setpercent = function (p) {
                    this.find('img').css('background-position', (120 * p) - 120)
                }

                return this;
            }
        }(jQuery))