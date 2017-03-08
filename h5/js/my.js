$(function() {
	if(window.location.href.split('#').length>1){
		window.location.href = window.location.href.split('#')[0];	
	}
	$('body').show();
	$('#fullpage').fullpage({
		sectionsColor: ['#e12428', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5'],
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7','page8','page9','page10','page11'],
		afterLoad: function(anchorLink, index){
			if(index == 1) {
				$('.section1 *').show();
				$('.one_tit').addClass('bounce');
				$('.one_font1').addClass('bounceInRight');
				$('.one_font2').addClass('bounceInRight');
				$('.one_font3').addClass('bounceInRight');
				$('.one_logo').addClass('fadeIn');
				$('.one_main_logo').addClass('fadeIn');
				$('.one_hand').addClass('bounceInUp');
				$('.up_arrow').addClass('fadeInUp');
			}else if(index == 2) {
				$('.section2 *').show();
				$('.two_tit').addClass('bounceInRight');
				$('.two_down').addClass('bounceInRight');
				$('.two_font').addClass('fadeInDown');
				$('.two_dot').addClass('fadeIn');
				$('.two_code1').addClass('slideInLeft');
				$('.two_code2').addClass('slideInLeft');
				$('.two_code3').addClass('slideInLeft');
				$('.two_logo').addClass('fadeInDown');
			}
			else if(index == 3) {
				$('.section3 *').show();
				$('.three_tit').addClass('bounce');
				$('.three_start').addClass('bounce');
				$('.section3_box').addClass('fadeIn');
				$('.threefont').addClass('fadeIn');
				$('.dian').addClass('fadeIn');
				$('.three_logo').addClass('fadeInDown');
				$('.three_map').addClass('bounceIn');
			}else if(index == 4) {
				$('.section4 *').show();
				$('.four_tit').addClass('fadeIn');
				$('.four_deng').addClass('flash');
				$('.four_font').addClass('fadeInDown');
				$('.four_zuan').addClass('fadeInDown');
				$('.four_logo').addClass('fadeInLeft');
			}else if(index == 5) {
				$('.section5 *').show();
				$('.five_tit').addClass('pulse');
				$('.five_logo').addClass('fadeInLeft');
				$('.five_num').addClass('bounce');
				$('.five_con').addClass('bounceInRight');
			}else if(index == 6) {
				$('.section6 *').show();
				$('.six_tit').addClass('pulse');
				$('.six_logo').addClass('fadeInLeft');
				$('.six_pc_font').addClass('tada');
				$('.six_flow1 .line').addClass('fadeInRight');
				$('.six_flow2 .line').addClass('fadeInRight');
				$('.six_flow3 .line').addClass('fadeInRight');
				$('.six_flow4 .line').addClass('fadeInLeft');
				$('.six_flow5 .line').addClass('fadeInRight');
				$('.six_flow1 .ver_line').addClass('fadeInUp');
				$('.six_flow2 .ver_line').addClass('fadeInUp');
				$('.six_flow3 .ver_line').addClass('fadeInUp');
				$('.six_flow4 .ver_line').addClass('fadeInDown');
				$('.six_flow5 .ver_line').addClass('fadeInDown');
				$('.six_flow .six_dot').addClass('fadeIn');
				$('.six_flow .six_con').addClass('fadeIn');
			}else if(index == 7) {
				$('.section7 *').show();
				$('.seven_tit').addClass('swing');
				$('.seven_btn').addClass('fadeIn');
				$('.seven_man').addClass('bounceIn');
				$('.seven_wemon').addClass('bounceIn');
				$('.seven_man').addClass('fadeIn');
				$('.seven_wemon').addClass('fadeIn');
				$('.seven_man_num').addClass('fadeIn');
				$('.seven_wemon_num').addClass('fadeIn');
				$('.seven_echart').addClass('bounceInLeft');
				$('.seven_logo').addClass('fadeInLeft');
			}else if(index == 8) {
				$('.section8 *').show();
				$('.eight_btn1').addClass('pulse');
				$('.eight_font1').addClass('fadeIn');
				$('.eight_echart1').addClass('bounceInLeft');
				$('.eight_btn2').addClass('bounceIn');
				$('.eight_echart2').addClass('bounceInLeft');
				$('.eight_num').addClass('fadeIn');
				$('.eight_logo').addClass('fadeInLeft');
			}else if(index == 9) {
				$('.section9 *').show();
				$('.nine_btn1').addClass('pulse');
				$('.nine_echart1').addClass('bounceInLeft');
				$('.nine_btn2').addClass('bounceIn');
				$('.nine_echart2').addClass('bounceInLeft');
				$('.nine_num').addClass('fadeIn');
				$('.nine_logo').addClass('fadeInLeft');
			}else if(index == 10) {
				$('.section10 *').show();
				$('.ten_tit').addClass('swing');
				$('.ten_btn').addClass('bounceInLeft');
				$('.ten_table').addClass('bounceIn');
				$('.ten_logo').addClass('fadeInLeft');
			}else if(index == 11) {
				$('.section11 .show_box').show();
				$('.eleven_tit').addClass('swing');
				$('.eleven_tit_font').addClass('bounceIn');
				$('.form_input').addClass('fadeInDown');
				$('.submit_btn').addClass('pulse');
				$('.eleven_logo').addClass('fadeInLeft');
				$('.submit_btn').click(function(){
					$('.shade_box').show();
				})
				$('.shade_box').click(function(){
					$(this).hide()
				})
			}
		},
		onLeave:function(index,nextIndex,direction){
			if(nextIndex == 1) {
				$('.section1 *').hide();
			}else if(nextIndex == 2) {
				$('.section2 *').hide();
			}else if(nextIndex == 3) {
				$('.section3 *').hide();
			}else if(nextIndex == 4) {
				$('.section4 *').hide();
			}else if(nextIndex == 5) {
				$('.section5 *').hide();
			}else if(nextIndex == 6) {
				$('.section6 *').hide();
			}else if(nextIndex == 7) {
				$('.section7 *').hide();
			}else if(nextIndex == 8) {
				$('.section8 *').hide();
			}else if(nextIndex == 9) {
				$('.section9 *').hide();
			}else if(nextIndex == 10) {
				$('.section10 *').hide();
			}else if(nextIndex == 11) {
				$('.section11 .show_box').hide();
			}
		}
	});
	$('.icon_yy').click(function(){
		if($(this).hasClass('play')){
			$(this).removeClass('play infinite');
			$('.audioDV')[0].pause();
		}else{
			$(this).addClass('play infinite');
			$('.audioDV')[0].play();
		}
		
	})
});