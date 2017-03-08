//@ sourceURL=header.js
/**
 * Created by wushuaipeng on 2017/2/4.
 */
if(typeof  scrollGoTo!= 'function'){
    function scrollGoTo(i) {
        var href = window.location.pathname;
        if(href.indexOf('index.html')<0){
            window.location.href = 'index.html#'+i;
        }
    }
}
