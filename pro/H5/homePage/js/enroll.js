$(function () {
    $(document).addHeader('<img class="right_h" src="homePage/img/zy_x.png" width="22">', function () {
        var param = {
            title: "标题",
            content: "内容",
            imageUrl: "图片地址",
            url: "分享链接"

        };
        iss.share(function (data) {

        }, failCallBack, param);
    },true);
    var param = {};
    param.sid = '1003';
    iss.details(function (Data) {
        Data = JSON.parse(Data);
        param.id = Data.id;
        param.type = Data.type;
        iss.request(function (Data) {
            Data = JSON.parse(Data);
            if (Data.errcode == 0) {
                var param = Data.data;
                $('#pic').attr('src', param.imgPath);
                $('#text').html(param.imgTxt);
                var li = '';
                for (var i = 0; i < param.items.length; i++) {
                    if (param.items[i].label.trim() == '图片') {
                        li += '<li class="list_pic" key = "' + param.items[i].key + '"><span>' + param.items[i].label + '</span><div class="enr_imgs"></div><img src="img/aff_ims.png"/></li>';
                    } else {
                        li += '<li key = "' + param.items[i].key + '"><span>' + param.items[i].label + '</span><input type="text" /></li>';
                    }
                }
                $('.enr_sec ul').html(li);

                $('.enr_ton button').click(function () {
                    var tag = true;
                    $('.enr_sec ul li input').each(function () {
                        if ($(this).val() == '') {
                            alert('请填写' + $(this).prev().text() + '!');
                            tag = false;
                            return;
                        }
                    })
                    if (tag) {
                        if ($('.enr_sec ul li .enr_imgs').html() == '') {
                            alert('请选择图片!');
                        } else {
                            var param_1 = {};
                            param_1.sid = '1005';
                            param_1.activityId = param.activityId;
                            iss.isLogin(function () {
                                iss.getUserInfo(function (Data_1) {
                                    Data_1 = JSON.parse(Data_1);
                                    param_1.userId = Data_1.userId;
                                    param_1.item = [];
                                    for (var i = 0; i < $('.enr_sec ul li').length; i++) {
                                        var key = $('.enr_sec ul li').eq(i).attr('key');
                                        if ($('.enr_sec ul li').eq(i).hasClass('list_pic')) {
                                            param_1.item[i] = {};
                                            param_1.item[i].key = $('.enr_sec ul li').eq(i).find('.enr_imgs img').attr('src');
                                        } else {
                                            param_1.item[i] = {};
                                            param_1.item[i].key = $('.enr_sec ul li').eq(i).find('input').val();
                                        }

                                    }
                                    iss.request(function (Data_2) {
                                        Data_2 = JSON.parse(Data_2);
                                        if (Data_2.errcode == 0) {
                                            alert('报名成功！');
                                        }
                                    }, failCallBack, param_1);
                                }, failCallBack)
                            }, failCallBack)
                        }
                    }
                })


            } else {
                alert(Data.errmsg);
            }
        }, failCallBack, param);
    }, failCallBack);
})