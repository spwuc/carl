var sign = require('./sign.js');
var http = require('https');
var options = {
    host: 'api.weixin.qq.com',
    path: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4fa3e82c8a2f0303&secret=819b904c96bd8a92245766fe045a5be7',
    method: 'GET',
    headers: {
    }
};
var body='';
var body_1='';
var req = http.request(options, function(res){
    res.on('data', function(data){
    	body +=data;
    }).on('end', function(){
        var access_token = JSON.parse(body).access_token;
        var param = {
        			host: 'api.weixin.qq.com',
					    path: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=wx_card',
					    method: 'GET',
					    headers: {
					    }
        	}
        	var req1 = http.request(param, function(res1){
					    res1.on('data', function(data){
					    	body_1 +=data;
					    }).on('end', function(){
					    		return sign(JSON.parse(body_1).ticket,'http://xhtml5.duapp.com/1.html');
					    });
					});
					req1.end();
    });
});
req.end(); 

/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
