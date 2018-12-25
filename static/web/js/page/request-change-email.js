$(function () {
    ////////////////////////////////////////////////////////////【风雪白熊】【常量定义】////////////////////////////////////////////////////////////
    var wait = 60;
    var sendState = true;
    var noVerify = true;
    ////////////////////////////////////////////////////////////【风雪白熊】【发送邮件】////////////////////////////////////////////////////////////
    $(".js-send-email").click(function () {
        // 判断邮箱格式
        var phoneEle = this;
        var email = $(".js-email").val();
        if (!validate_email(email)) {
            layer.msg("email error");
            return;
        }
        // 判断按钮状态
        if (!sendState)return;
        sendState = false;
        // 发送邮件
        var body = {
            "email": email,
            "codeType": "EMAIL",
            "operateType": "BIND_EMAIL"
        };
        ajaxPostBody("/user/send", {}, body, function () {
            countdown(phoneEle);
        }, function (errorData) {
            wait = 0;
            sendState = true;
        });
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【提交表单】////////////////////////////////////////////////////////////
    $(".js-button-submit").click(function () {
        if ($("#changeEmail").validate()) {
            var email = $(".js-email").val();
            var code = $(".js-code").val();
            var google = $(".js-google").val();
            var userToken = Cookies.get('loginToken');
            var bindToken = localStorage.getItem("bindToken");
            // 调用绑定接口
            var bindHead = {
                "token": userToken,
                "bindToken": bindToken
            };
            var bindBody = {
                "bindType": "EMAIL",
                "email": email,
                "googleCode": google
            };
            if (noVerify) {
                // 校验码校验
                var verifyBody = {
                    "email": email,
                    "emailCode": code,
                    "codeType": "EMAIL",
                    "operateType": "BIND_EMAIL"
                };
                ajaxPostBody("/user/code_verify", {}, verifyBody, function (successData) {
                    localStorage.setItem("bindToken", successData.token);
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
        }
    });

    ////////////////////////////////////////////////////////////【风雪白熊】【倒计时】////////////////////////////////////////////////////////////
    function countdown(object) {
        if (wait == 0) {
            $(object).attr("disabled", false);
            $(object).html("Send");
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
});
