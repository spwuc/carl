function ActionTimer(intDiff,ClassTime) {

    var interval = 0;
    if (intDiff >= 3600000) {
        interval = 1000;
        intDiff -= interval;
    } else {
        interval = 90;
    };
    var html="";
    var time_array=[];
    var objTimer = setInterval(function() {
        var hour = 0,
            min = 0, //
            sec = 0, //时间默认值		
            msec = 0;
        if (intDiff > 0) {
            //day = parseInt(intDiff /86400000);
            var total = intDiff; //% 86400000;
            hour = parseInt(total / 3600000);
            total = intDiff % 3600000;
            min = parseInt(total / 60000);
            total = intDiff % 60000;
            sec = parseInt(total / 1000);
            total = intDiff % 1000;
            msec = parseInt(total / 10); //毫秒
        }
        if (hour <= 9) hour = '0' + hour;
        if (min <= 9) min = '0' + min;
        if (sec <= 9) sec = '0' + sec;
        if (msec <= 99) {
            msec = '0' + msec; //毫秒	
        }
        if (msec <= 9) {
            msec = '00' + msec; //毫秒
        }
        hour = hour.toString();
        min = min.toString();
        sec = sec.toString();
        msec = msec.toString();
        msec=msec[1].toString()+msec[2].toString();
        if (intDiff >= 3600000) { //倒计时时间未完成 继续倒计时动画 秒级倒计时
            time_array=[hour.charAt(0),hour.charAt(1),min.charAt(0),min.charAt(1),sec.charAt(0),sec.charAt(1),intDiff];
        } else if (intDiff < 3600000 && intDiff >= 0) { //毫秒级倒计时
            time_array=[min.charAt(0),min.charAt(1),sec.charAt(0),sec.charAt(1),msec.charAt(0),msec.charAt(1),intDiff];
        } 
        intDiff = intDiff - interval;
       postMessage([time_array,ClassTime]);

    }, interval);
}


onmessage=function(event){
	intDiff=event.data[0];
    ClassTime=event.data[1];
	ActionTimer(intDiff,ClassTime);
}
