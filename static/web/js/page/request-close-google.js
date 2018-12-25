$(function () {
    ////////////////////////////////////////////////////////////【风雪白熊】【关闭谷歌验证码】////////////////////////////////////////////////////////////
    $(".js-btn-close-google").click(function () {
        if($('#closeGoogle').valid()){
            var userToken = Cookies.get('loginToken');
            var header = {
                "token": userToken
            };
            var password = $(".js-login-password").val();
            var code = $(".js-google-code").val();
            var body = {
                "password": password,
                "googleCode": code
            };

            ajaxPostBody("/security/unbindingSecretKey", header, body, function (successData) {
                layer.msg('<div class="i18n" name="gbggSucceed">success</div>',{
                    time:1500,
                    end:function(){
                        window.location.href = '../exchange/b11/index.html#/safeCenter';
                    }
                })
                layerInternational()
            });
        }

    });
    $('#language-change').click(function(){
        $('#closeGoogle').valid()
    })
});
