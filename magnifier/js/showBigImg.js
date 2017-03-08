//; (function ($) {
//    $.fn.showBigImg = function (options) {
//        var setings = {
//            stay: '',
//            magnifier: '',
//            bigImg: ''
//        }
//        $.extend(setings, options)
//        var self = this;
//        var img = new Image();
//        img.src = $(this).attr("jqimg");
//        img.onload = function () {
//            $(setings.bigImg).css({ 'background-image': 'url()' })
//            var img = document.createElement('img');
//            img.src = $(self).attr("jqimg");
//            img.style.position = 'absolute';
//            img.style.top = 0;
//            img.style.left = 0;
//            $(setings.bigImg)[0].appendChild(img)
//        }

//        $(setings.stay).mousemove(function (e) {
//            var Ys = e.clientY - $(setings.stay).offset().top,
//            Xs = e.clientX - $(setings.stay).offset().left;
//            $(setings.bigImg).css({ 'display': 'block' })
//            $(setings.bigImg).find('img').css({ top: -Ys, left: -Xs })
//            $(setings.magnifier).css({ 'display': 'block', top: Ys - 87, left: Xs - 87 })
//            if (Xs - 87 > 175) {
//                $(setings.magnifier).css({ left: 175 })
//            } else if (Xs - 87 <= 0) {
//                $(setings.magnifier).css({ left: 0 })
//            }
//            if (Ys - 87 > 175) {
//                $(setings.magnifier).css({ top: 175 })
//            } else if (Ys - 87 <= 0) {
//                $(setings.magnifier).css({ top: 0 })
//            }
//        }).mouseleave(function () {
//            $(setings.magnifier).css({ 'display': 'none' })
//            $(setings.bigImg).css({ 'display': 'none' })
//        })
//    }
//}(jQuery))
