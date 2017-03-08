/*(function($){

 $.fn.snow = function(options){
 var Snow=$('<div id="flake">').css({'position': 'absolute','top':'-50px','font-size':"200px","color":"#fff"}).html('&#10052;')
 var i=getRandomNumber(1000, 6000);
 setInterval(
 function(){
 Snow.clone().appendTo('body').css({'left':getRandomNumber(0, 1300),'font-size':Math.floor(Math.random()*options.maxSize)}).animate({top: '640px'},i).fadeTo("fast", Math.floor(Math.random()))

 }

 ,options.newOn)

 function getRandomNumber (min, max) {
 return (min + Math.floor(Math.random() * (max - min + 1)))
 }

 };
 })(jQuery);*/
(function ($) {

    $.fn.snow = function (options) {
        var $flake = $('<div id="flake" style="transform:rotate(45deg)" />').css({'position': 'absolute', 'top': '-50px'}).html('|'),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {minSize: 10, maxSize: 20, newOn: 500, flakeColor: "#aaa"},
            options = $.extend(defaults, options);


        var interval = setInterval(function () {
            var startPositionLeft = Math.random() * documentWidth - 10,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - options.maxSize,
                endPositionLeft = startPositionLeft - 500 + Math.random() * 200,
                durationFall = documentHeight * 1 + Math.random() * 1000;
            $flake
                .clone()
                .appendTo('body')
                .css({left: startPositionLeft, opacity: startOpacity, 'font-size': sizeFlake, color: options.flakeColor})
                .animate({top: endPositionTop, left: endPositionLeft, opacity: 0.5}, durationFall, 'linear', function () {
                    $(this).remove()
                });
            var startPositionLeft = Math.random() * documentWidth - 10,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - options.maxSize,
                endPositionLeft = startPositionLeft - 500 + Math.random() * 200,
                durationFall = documentHeight * 1 + Math.random() * 10;
            $flake
                .clone()
                .appendTo('body')
                .css({left: startPositionLeft, opacity: startOpacity, 'font-size': sizeFlake, color: options.flakeColor})
                .animate({top: endPositionTop, left: endPositionLeft, opacity: 0.5}, durationFall, 'linear', function () {
                    $(this).remove()
                });
        }, 1);

    };

})(jQuery);