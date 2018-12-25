$(function () {
    initGoogle();
    ////////////////////////////////////////////////////////////【风雪白熊】【验证谷歌验证码】////////////////////////////////////////////////////////////
    $(".js-btn-binding-google").click(function () {
        var key = $(".js-google-key").val();
        var password = $(".js-login-password").val();
        var code = $(".js-google-code").val();
        if(key==''){
            layer.msg('<div class="i18n" name="requiredinut"></div>');
            layerInternational()
            return false
        }
        if(password==''){
            layer.msg('<div class="i18n" name="longpassRequired"></div>');
            layerInternational()
            return false
        }
        if(code==''){
            layer.msg('<div class="i18n" name="googleCodeRequired"></div>');
            layerInternational()
            return false
        }
        var userToken = Cookies.get('loginToken');
        var header = {
            "token": userToken
        };

        var body = {
            "secretKey": key,
            "password": password,
            "googleCode": code
        };
        ajaxPostBody("/security/bindingSecretKey", header, body, function (successData) {
            layer.msg('<div class="i18n" name="bindgoogleSuccess">success</div>',{
                time:1500,
                end:function(){
                    window.location.href = '../exchange/b11/index.html#/safeCenter';
                }
            })
            layerInternational()
        });
    });
});

////////////////////////////////////////////////////////////【风雪白熊】【初始化谷歌验证码】////////////////////////////////////////////////////////////
function initGoogle() {
    var userToken = Cookies.get('loginToken');
    var header = {
        "token": userToken
    };
    ajaxPostBody("/security/bindGoogle", header, {}, function (successData) {
        $(".js-secret-key").html(successData.secretKey);
        //生成二维码
        var qrcode = new QRCode('js-qrcode', {
            width: 150,
            height: 150
        });
        qrcode.makeCode(successData.qrCode);
    });
}
