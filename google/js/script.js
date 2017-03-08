

function AJAX(parameter) {
    //兼容所有浏览器
    var xmlHttp;
    if (window.XMLHttpRequest) {//说明是IE7.0+及现代浏览器
        xmlHttp = new XMLHttpRequest()
    }
    else {//说明是IE5.0跟IE6.0
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    //open
    xmlHttp.open(parameter.type, parameter.url,parameter.async)
    //send
    xmlHttp.send(null);
    //监视更改
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            parameter.success2(xmlHttp.responseText)
        }
    }

}