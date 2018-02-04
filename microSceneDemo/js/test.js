$.microScene = function(setting,cb){
	if(typeof setting == 'function'){
		cb = setting;
		setting = {};
	}
	var defaultSet = {
		pageFather:'.showBox',
		page:'.page',
		upPage:'upPage',
		nextPage:'nextPage',
		nowPage:'cur'
	}
	$.extend(defaultSet, setting);
				function preventTouch() {
					event.preventDefault();
				}
				document.addEventListener('touchstart', preventTouch);
				document.addEventListener('touchmove', preventTouch);
				document.addEventListener('touchend', preventTouch);
				var startx, starty;
				//获得角度
				function getAngle(angx, angy) {
					return Math.atan2(angy, angx) * 180 / Math.PI;
				};

				//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
				function getDirection(startx, starty, endx, endy) {
					var angx = endx - startx;
					var angy = endy - starty;
					var result = 0;

					//如果滑动距离太短
					if(Math.abs(angx) < 2 && Math.abs(angy) < 2) {
						return result;
					}

					var angle = getAngle(angx, angy);
					if(angle >= -135 && angle <= -45) {
						result = 1;
					} else if(angle > 45 && angle < 135) {
						result = 2;
					} else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
						result = 3;
					} else if(angle >= -45 && angle <= 45) {
						result = 4;
					}

					return result;
				}
				//手指接触屏幕
				document.addEventListener("touchstart", function(e) {
					startx = e.touches[0].pageX;
					starty = e.touches[0].pageY;
				}, false);
				//手指离开屏幕
				document.addEventListener("touchend", function(e) {
					var endx, endy;
					endx = e.changedTouches[0].pageX;
					endy = e.changedTouches[0].pageY;
					var direction = getDirection(startx, starty, endx, endy);
					switch(direction) {
						case 1:
							toDown();
							break;
						case 2:
							toUp();
							break;
						default:
					}
				}, false);

				var winHei = $(window).height();
				$(defaultSet.page).height(winHei);
				$(defaultSet.pageFather).height(winHei);
				$('.'+defaultSet.upPage).css({
					'top': -winHei
				});
				$('.'+defaultSet.nextPage).css({
					'top': winHei
				})
				var index = 0;
				var len = $(defaultSet.page).length;

				function upDate(index) {

					for(var i = 0; i < index; i++) {
						$(defaultSet.page).eq(i).removeClass(defaultSet.nextPage).addClass(defaultSet.upPage)
					}
					for(var n = index + 1; n < len; n++) {
						$(defaultSet.page).eq(n).removeClass(defaultSet.upPage).addClass(defaultSet.nextPage)
					}
					$('.'+defaultSet.upPage).css({
						'top': -winHei
					});
					$('.'+defaultSet.nextPage).css({
						'top': winHei
					})
					cb(index);

				}

				function toDown() {
					if(index < len - 1) {
						index++;
						console.log()
						$(defaultSet.page).eq(index).addClass(defaultSet.nowPage).removeClass(defaultSet.upPage).removeClass(defaultSet.nextPage).siblings().removeClass(defaultSet.nowPage);
						$(defaultSet.page).eq(index).animate({
							top: '0'
						}, function() {
							upDate(index)
						});

					}

				}

				function toUp() {
					if(index > 0) {
						index--;
						$(defaultSet.page).eq(index).addClass(defaultSet.nowPage).removeClass(defaultSet.upPage).removeClass(defaultSet.nextPage).siblings().removeClass(defaultSet.nowPage);
						$(defaultSet.page).eq(index).animate({
							top: '0'
						}, function() {
							upDate(index)
						});
					}

				}	
}