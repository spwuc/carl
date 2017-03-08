var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
var oScript = document.createElement('script');
script.type = 'text/javascript';
oScript.type = 'text/javascript';
script.src = 'http://xhtml5.duapp.com/cordova_plugins.js';
var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//android手机
    oScript.src = 'http://xhtml5.duapp.com/cordova.js';
    head.appendChild(oScript);
    head.appendChild(script);
} else if (u.indexOf('iPhone') > -1) {//苹果手机
    oScript.src = 'http://xhtml5.duapp.com/cordova_ios.js';
    head.appendChild(oScript);
}
;
(function () {
    //实例属性
    this.sx = {};
    this.sx.getUserInfo = function (succ, fail) {
        fail = fail || null;
        cordova.exec(succ, fail, 'UserCenterPlugin', 'getUserInfo', ['']);
    }
    window.SX = this.sx;
})();
