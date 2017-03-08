/**
 * Created by wushuaipeng on 2017/2/4.
 */
$(function () {
    $('#header').load('header.html');
    var data = listData.list,html='';
    for(var i=0;i<data.length;i++){
        html += '<li onclick="window.location.href=\'news.html#'+data[i].ID+'\'"><span>'+data[i].title+'</span><i>'+data[i].AT+'</i></li>'
    }
    $('.content').html(html)
})