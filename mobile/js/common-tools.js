////////////////////////////////////////////////////////////【风雪白熊】【常量定义】////////////////////////////////////////////////////////////
var pathHead = "/api/content";
////////////////////////////////////////////////////////////【风雪白熊】【网络请求】////////////////////////////////////////////////////////////
function ajaxPostBody(url, header, body, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        url: pathHead + url,
        headers: header,
        data: JSON.stringify(body),
        success: function (msg) {
            if (hasCode(msg)) {
                if (hasCode(msg)) {
                    layer.msg(errorDesc(msg.code));
                } else {
                    layer.msg(errorDesc(10000));
                }
                if (errorCallback != undefined) {
                    errorCallback(msg);
                }
            } else {
                successCallback(msg);
            }
        },
        error: function (msg) {
            if (hasCode(msg)) {
                layer.msg(errorDesc(msg.code));
            } else {
                layer.msg(errorDesc(10000));
            }
            if (errorCallback != undefined) {
                errorCallback(msg);
            }
        }
    });
}
function ajaxGetBody(url, data, successCallback, errorCallback) {
    $.get(pathHead + url, data, function (result) {
        successCallback(result);
    });
}
////////////////////////////////////////////////////////////【风雪白熊】【是否含有 code 码】////////////////////////////////////////////////////////////
function hasCode(data) {
    if (typeof json == 'string') {
        data = JSON.parse(data);
    }
    return data.hasOwnProperty("code");
}
////////////////////////////////////////////////////////////【风雪白熊】【校验邮箱】////////////////////////////////////////////////////////////
function validate_email(email) {
    var emailRegular = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return emailRegular.test(email);
}
////////////////////////////////////////////////////////////【风雪白熊】【校验手机】////////////////////////////////////////////////////////////
function validate_phone(phone) {
    var phoneRegular = /[1][3,4,5,7,8][0-9]{9}/;
    return phoneRegular.test(phone);
}
////////////////////////////////////////////////////////////【风雪白熊】【参数获取】////////////////////////////////////////////////////////////
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
})(jQuery);
////////////////////////////////////////////////////////////【风雪白熊】【计算拓展】////////////////////////////////////////////////////////////
//加法
Number.prototype.add = function (arg) {
    var r1, r2, m;
    try {
        r1 = this.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (this.mul(m) + arg.mul(m)) / m;
}
//减法
Number.prototype.sub = function (arg) {
    return this.add(-arg);
}
//乘法
Number.prototype.mul = function (arg) {
    var m = 0, s1 = this.toString(), s2 = arg.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//除法
Number.prototype.div = function (arg) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = this.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(this.toString().replace(".", ""))
        r2 = Number(arg.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}