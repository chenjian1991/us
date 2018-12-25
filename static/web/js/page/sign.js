$(function () {
$('#language-change').click(function(){
    $('#loginForm').valid()
})
    var accout = $('#accountName').val();
    var password = $('#loginPassword').val();
      $('#signIn').attr('disabled',true).addClass('gray')
    $('input').on('input propertychange', function() {
        var accout = $('#accountName').val();
        var password = $('#loginPassword').val();
        if(accout!=''&&password!=''){
            $('#signIn').attr('disabled',false).removeClass('gray')
        }else{
            $('#signIn').attr('disabled',true).addClass('gray')
        }
    });

    //网易盾验证
    $('.wrapper').delegate('.reload', 'click', function () {
        initEn()
    });
    initEn()
    var  captchaIns;
    function  initEn() {
        if (captchaIns) {
            captchaIns.destroy()
        }
        var lan = localStorage.getItem('countryLanguage')
        initNECaptcha({
            element: '#captcha',
            captchaId: 'a3cd39c172284133a3470b7ec05a2bb0',
            mode: 'popup',
            width: '320px',
            lang:lan,
            onReady: function (instance) {
                // 验证码一切准备就绪，此时可正常使用验证码的相关功能
            },
            onVerify: function (err, data) {
                if(err){
                    //
                }
                if(data){
                    signClick()
                }
            }
        }, function (instance) {
            // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
            captchaIns = instance;
        }, function onerror(err) {
            //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
            // 初始化失败后触发该函数，err对象描述当前错误信息
        })

    }
    //放到封装initen的方法外面，不然每点击一次都会绑定一次；
    document.getElementById('signIn').addEventListener('click', function () {
        if($('#loginForm').valid()){
            captchaIns && captchaIns.popUp()
        }
    })
function signClick() {
    var deviceWidth=window.screen.width||document.body.clientWidth||document.documentElement.clientWidth;
    $('#loginForm').valid()
    var accountName = $('.accountName').val().trim().replace(/\s/g,'');
    var  loginPassword= $('input[name="loginPassword"]').val().trim().replace(/\s/g,'');
    var ValidateStr = $('input[name="NECaptchaValidate"]').val();
    var data = {
        "phone":accountName,
        "password":loginPassword,
        "codeType":"PHONE",
        "captchaValidateStr":ValidateStr
    }
    if($('#loginForm').valid()){
        if(deviceWidth>768){
            sendPostRequestByJsonObj(api.login,data,function(data,xhr,textStatus){
                if(textStatus.status==200){
                    var code = data.code;
                    console.log(code)
                    if(code == 10010){
                        layer.msg('<div name="layerPass" class="i18n">密码必须为8-20位的数字和字母组成</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10005){
                        layer.msg('<div class="i18n" name="namePassWrong">登录账号或密码不正确，请重新输入</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10007){
                        layer.msg('<div name="passwordError" class="i18n">登录密码不正确，请重新输入</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10014){
                        layer.msg('<div name="namePassWrong" class="i18n">用户不存在，请先注册</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10015){
                        layer.msg('<div class="i18n" name="moreTenTimes">账号密码错误次数超过10次，用户被锁定。</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10012){
                        layer.msg('<div class="i18n" name="inviteCode">邀请码格式不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10022){
                        layer.msg('<div class="i18n" name="phoneNumberError">手机号码不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10029){
                        layer.msg('<div class="i18n" name="phoneNumberiswrong">手机格式不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10000){
                        layer.msg('<div class="i18n" name="systemBusy">系统繁忙，请联系55客服</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10013){
                        layer.msg('<div class="i18n" name="Unauthorized">授权不通过，请重新验证</div>')
                        layerInternational()
                        initEn()
                        Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
                        localStorage.removeItem("curPage");
                        window.location.href='../exchange/b11/index.html#/login'
                        return false
                    }else if(code ==10020){
                        layer.msg('<div class="i18n" name="operatetypewrong">操作类型不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10023){
                        layer.msg('<div class="i18n" name="ParametersError">请求参数异常</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10024){
                        layer.msg('<div class="i18n" name="passwordwrong">密码错误</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10024){
                        layer.msg('<div class="i18n" name="paramwrong">参数错误,类型不对</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code==403){
                        layer.msg('<div class="i18n" name="illegalRequest"></div>')
                        layerInternational()
                        initEn()
                    }else if(code==10041){
                        layer.msg('<div class="i18n" name="userLocked">用户已被锁定</div>');
                        layerInternational()
                        initEn()
                    }else if(code==10042){
                        layer.msg('<div class="i18n" name="verificationinvalidWrong">人机验证未通过</div>');
                        layerInternational()
                        initEn()
                    }else{
                        var loginToken = data.token;
                        var expiredTime = data.expiredTime;
                        Cookies.set('loginToken', loginToken,{expires:30,domain:document.domain.split('.').slice(-2).join('.')});
                        window.location.href = "../exchange/b11/index.html#/home"
                    }
                }

            })

        }else{
            sendPostRequestByJsonObj(api.login,data,function(data,xhr,textStatus){
                if(textStatus.status==200){
                    var code = data.code;
                    if(code == 10010){
                        layer.msg('<div name="layerPass" class="i18n">密码必须为8-20位的数字和字母组成</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10005){
                        layer.msg('<div class="i18n" name="namePassWrong">登录账号或密码不正确，请重新输入</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10007){
                        layer.msg('<div name="passwordError" class="i18n">登录密码不正确，请重新输入</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code == 10014){
                        layer.msg('<div name="namePassWrong" class="i18n">用户不存在，请先注册</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10015){
                        layer.msg('<div class="i18n" name="moreTenTimes">账号密码错误次数超过10次，用户被锁定。</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10012){
                        layer.msg('<div class="i18n" name="inviteCode">邀请码格式不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10022){
                        layer.msg('<div class="i18n" name="phoneNumberError">手机号码不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10029){
                        layer.msg('<div class="i18n" name="phoneNumberiswrong">手机格式不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10000){
                        layer.msg('<div class="i18n" name="systemBusy">系统繁忙，请联系55客服</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10013){
                        layer.msg('<div class="i18n" name="Unauthorized">授权不通过，请重新验证</div>')
                        layerInternational()
                        initEn()
                        Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
                        localStorage.removeItem("curPage");
                        window.location.href='../exchange/b11/index.html#/login'
                        return false
                    }else if(code ==10020){
                        layer.msg('<div class="i18n" name="operatetypewrong">操作类型不正确</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10023){
                        layer.msg('<div class="i18n" name="ParametersError">请求参数异常</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10024){
                        layer.msg('<div class="i18n" name="passwordwrong">密码错误</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code ==10024){
                        layer.msg('<div class="i18n" name="paramwrong">参数错误,类型不对</div>')
                        layerInternational()
                        initEn()
                        return false
                    }else if(code==403){
                        layer.msg('<div class="i18n" name="illegalRequest"></div>')
                        layerInternational()
                        initEn()
                    }else if(code==10041){
                        layer.msg('<div class="i18n" name="userLocked">用户已被锁定</div>');
                        layerInternational()
                        initEn()
                    }else if(code==10042){
                        layer.msg('<div class="i18n" name="verificationinvalidWrong">人机验证未通过</div>');
                        layerInternational()
                        initEn()
                    }else{
                        var loginToken = data.token;
                        var expiredTime = data.expiredTime;
                        Cookies.set('loginToken', loginToken,{expires:30,domain:document.domain.split('.').slice(-2).join('.')});
                        window.location.href = "../exchange/IndexPhone.html"
                    }
                }

            })

        }


    }else{
        /* layer.msg('<div name="formError" class="i18n">表单验证不通过</div>')
         layerInternational()*/
    }
}

    var deviceWidth=window.screen.width;
if(deviceWidth<=414){
    window.addEventListener("resize", function() {
        if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
                        window.setTimeout(function() {
                                document.activeElement.scrollIntoViewIfNeeded();
                             },300);
                    }
             })
    }










});
