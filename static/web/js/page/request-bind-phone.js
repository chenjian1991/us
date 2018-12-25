$(function () {
    ////////////////////////////////////////////////////////////【风雪白熊】【常量定义】////////////////////////////////////////////////////////////
    var wait = 60;
    var sendState = true;
    var noVerify = true;
    ////////////////////////////////////////////////////////////【风雪白熊】【发送短信】////////////////////////////////////////////////////////////
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
            "operateType": "BIND_PHONE",
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

    ////////////////////////////////////////////////////////////【风雪白熊】【绑定手机-提交表单】////////////////////////////////////////////////////////////
    $(".js-bind-phone").click(function () {
        var zonePhone = $(".js-phone-input").val();
        var phone = zonePhone.split(" ")[1];
        var smscode = $(".js-sms-input").val();
        var googleCode = $(".js-googlecode-input").val();
        var userToken = Cookies.get('loginToken');
        var bindToken = localStorage.getItem("bindToken");
        // 调用绑定接口
        var bindHead = {
            "token": userToken,
            "bindToken": bindToken
        };
        var bindBody = {
            "bindType": "PHONE",
            "phone": phone
        };
        if (noVerify) {
            // 校验码校验
            var verifyHead = {
                "token": userToken
            };
            var verifyBody = {
                "operateType": "BIND_PHONE",
                "codeType": "PHONE",
                "phone": phone,
                "phoneCode": smscode,
                "googleCode": googleCode
            };
            ajaxPostBody("/user/sso.codeVerify", verifyHead, verifyBody, function (successData) {
                localStorage.setItem("bindToken",successData.token);
                noVerify = false;
                ajaxPostBody("/security/bindingAccount", bindHead, bindBody, function (successData) {
                    window.location.href = '../exchange/b11/index.html#/safeCenter';
                    console.log("绑定成功");
                });
            });
        } else {
            ajaxPostBody("/security/bindingAccount", bindHead, bindBody, function (successData) {
                window.location.href = '../exchange/b11/index.html#/safeCenter';
                console.log("绑定成功");
            });
        }
    });
});
