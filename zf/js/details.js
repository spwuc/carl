/**
 * Created by wushuaipeng on 2017/2/4.
 */
$(function () {
    $('#header').load('header.html');
    var hash = window.location.hash.substr(1);
    $('.details_content .msg i').html(detailData['data0'+hash].title)
    $('.details_content .content').html(detailData['data0'+hash].content)
})