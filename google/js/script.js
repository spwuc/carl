

function AJAX(parameter) {
    //�������������
    var xmlHttp;
    if (window.XMLHttpRequest) {//˵����IE7.0+���ִ������
        xmlHttp = new XMLHttpRequest()
    }
    else {//˵����IE5.0��IE6.0
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    //open
    xmlHttp.open(parameter.type, parameter.url,parameter.async)
    //send
    xmlHttp.send(null);
    //���Ӹ���
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            parameter.success2(xmlHttp.responseText)
        }
    }

}