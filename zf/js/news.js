/**
 * Created by wushuaipeng on 2017/2/4.
 */
$(function () {
    $('#header').load('header.html');
    var hash = window.location.hash.substring(1);
    $('.news_content>h1').html(newsData['list0'+hash].title)
    $('.news_content>p').html(newsData['list0'+hash].AT)
    $('.news_content .content').html(newsData['list0'+hash].content)
})