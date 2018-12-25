$(function () {
    ////////////////////////////////////////////////////////////【风雪白熊】【常量定义】////////////////////////////////////////////////////////////
    var wait = 60;
    var sendState = true;
    ////////////////////////////////////////////////////////////【风雪白熊】【解绑手机发送短信】////////////////////////////////////////////////////////////
    $(".js-sms-btn").click(function () {
        var userToken = Cookies.get('loginToken');
        var header = {
            "token": userToken
        };
        var phoneEle = this;
        var zonePhone = $(".js-phone-input").val();
        var phone = zonePhone.split(" ")[1];
        if (!validate_phone(phone)) {
            layer.msg("phone error");
            return false;
        }
        // 判断按钮状态
        if (!sendState)return;
        sendState = false;
        // 发送短信
        var body = {
            "operateType": "UNBINDED_PHONE",
            "codeType": "PHONE",
            "phone": phone
        };
        ajaxPostBody("/user/sso.send", header, body, function () {
            countdown(phoneEle);
        }, function (errorData) {
            wait = 0;
            sendState = true;
        });
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【倒计时】////////////////////////////////////////////////////////////
    function countdown(object) {
        if (wait == 0) {
            $(object).attr("disabled", false);
            $(object).html("Send SMS");
            wait = 60;
            sendState = true;
        } else {
            $(object).attr("disabled", true);
            $(object).html("Resend(" + wait + ")");
            wait--;
            setTimeout(function () {
                    countdown(object)
                },
                1000);
        }
    }

    ////////////////////////////////////////////////////////////【风雪白熊】【下一步,解绑手机校验】////////////////////////////////////////////////////////////
    $(".js-btn-first").click(function () {
        // 解绑手机校验
        var userToken = Cookies.get('loginToken');
        var header = {
            "token": userToken
        };

        var zonePhone = $(".js-phone-input").val();
        var phone = zonePhone.split(" ")[1];
        var smscode = $(".js-sms-input").val();
        var googleCode = $(".js-googlecode-input").val();
        var body = {
            "operateType": "UNBINDED_PHONE",
            "codeType": "PHONE",
            "phone": phone,
            "phoneCode": smscode,
            "googleCode": googleCode
        };
        ajaxPostBody("/user/sso.codeVerify", header, body, function (successData) {
            $(".js-div-first").hide();
            $(".js-div-second").show();
            localStorage.setItem("unBindToken", successData.token);
        }, function (errorData) {
        });
    });

    ////////////////////////////////////////////////////////////【风雪白熊】【调用与注册相同接口,绑定新手机】////////////////////////////////////////////////////////////
    $(".js-new-sms-btn").click(function () {
        var phoneEle = this;
        var body = {
            "phone": $(".js-new-phone-input").val(),
            "codeType": "PHONE",
            "operateType": "REGISTER"
        };
        ajaxPostBody("/user/send", {}, body, function () {
            countdown(phoneEle);
        }, function (errorData) {
            wait = 0;
            sendState = true;
        });
    });

    ////////////////////////////////////////////////////////////【风雪白熊】【业务代码】////////////////////////////////////////////////////////////
    $(".js-btn-over").click(function () {
        var phone = $(".js-new-phone-input").val();
        var smscode = $(".js-new-sms-input").val();
        // 调用绑定校验接口
        var bindBody = {
            "phone": phone,
            "phoneCode": smscode,
            "codeType": "PHONE",
            "operateType": "REGISTER"
        };
        ajaxPostBody("/user/code_verify", {}, bindBody, function (successData) {
            localStorage.setItem("bindToken", successData.token);
            var userToken = Cookies.get('loginToken');
            var unBindToken = localStorage.getItem("unBindToken");
            var bindToken = successData.token;

            var zonePhone = $(".js-phone-input").val();
            var oldPhone = zonePhone.split(" ")[1];
            var phone = $(".js-new-phone-input").val();
            // 调用绑定接口
            var header = {
                "token": userToken,
                "unbindToken": unBindToken,
                "bindToken": bindToken
            };
            var body = {
                "bindType": "PHONE",
                "oldPhone": oldPhone,
                "phone": phone
            };
            ajaxPostBody("/security/updateAccount", header, body, function (successData) {
                window.location.href = '../exchange/b11/index.html#/safeCenter';
                console.log("绑定成功");
            }, function (errorData) {
                wait = 0;
                sendState = true;
            });
        }, function (errorData) {
        });
    });
});
