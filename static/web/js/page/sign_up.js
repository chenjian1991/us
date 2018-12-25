        var phoneNumber = $('#mobile-number').val().trim().replace(/\s/g,'').length;
        if(phoneNumber==0){
           $('#btnSendCode').addClass('gray')
           $('#btnSendCode').attr('disabled',true)
        }else{
            $('#btnSendCode').removeClass('gray')
           $('#btnSendCode').attr('disabled',false)
        }
        $('#mobile-number').on('input propertychange',function(){
            var phoneNumber = $('#mobile-number').val().trim().replace(/\s/g,'').length;
            var btnText = $('#btnSendCode').text()
        if(phoneNumber==0){
           $('#btnSendCode').addClass('gray')
           $('#btnSendCode').attr('disabled',true)
        }else{
            $('#btnSendCode').removeClass('gray')
           $('#btnSendCode').attr('disabled',false)
        }
        if(btnText.indexOf('s')!=-1){// 如果正在倒计时中，即使输入手机号也不能再次开始倒计时
            $('#btnSendCode').addClass('gray')
            $('#btnSendCode').attr('disabled',true)
        }
        })
        $('#sign_phone').attr('disabled',true).addClass('gray')
        $('input').on('input propertychange', function() {
            var phoneNumber = $('#mobile-number').val();
            var smscode = $('#smscode').val();
            var password = $('#password').val();
            var confirmPassword = $('#confirmPassword').val();
            if(phoneNumber!=''&&smscode!=''&&password!=''&&confirmPassword!=''){
                $('#sign_phone').attr('disabled',false).removeClass('gray')
            }else{
                $('#sign_phone').attr('disabled',true).addClass('gray')
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
                        sendMessage()
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
        document.getElementById('btnSendCode').addEventListener('click', function (event) {
            event.preventDefault()
            captchaIns && captchaIns.popUp()
        })






        var InterValObj; //timer变量，控制时间
        var count = 60; //间隔函数，1秒执行 
        var curCount;//当前剩余秒数 
        function sendMessage(){
         　curCount = count;
           $("#btnSendCode").attr("disabled", "true");
           $("#btnSendCode").text(curCount + "s"); 
            $('#btnSendCode').addClass('gray')
             InterValObj = window.setInterval(SetRemainTime, 1000);
            var phoneNumber = $('#mobile-number').val().trim().replace(/\s/g,'');
            var code = $("#mobile-number").intlTelInput("getSelectedCountryData")
            var countrycodenum = code.dialCode;
            var ValidateStr = $('input[name="NECaptchaValidate"]').val();
            var len = countrycodenum.length;
            var countryCode = "+"+countrycodenum;
            if(phoneNumber.indexOf(countryCode)==-1){//说明没有区号
                var phoneNumber = phoneNumber;//不用截取字符串
               }else{
                var phoneNumber = phoneNumber.substring(len+1);//有区号，需要把区号截取掉
               }
            var data = {
            "phone":phoneNumber,
            'itc' :countrycodenum,
             "codeType":"PHONE",
             "operateType":"REGISTER",
            "captchaValidateStr":ValidateStr
            }
            $.ajax({
                url:api.sendSms,
                type:'post',
                data:JSON.stringify(data),
                dataType:'json',
                contentType:"application/json;charset=UTF-8",
                success:function(data,xhr,textStatus){
                    if(textStatus.status==200){
                        var code = data.code;
                        if(code==10022){
                            layer.msg('<div class="i18n" name="phoneNumberWrong"></div>');
                             window.clearInterval(InterValObj);//停止计时器
                            initEn()
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            // $("#btnSendCode").attr('name','reaginSend');
                            layerInternational()
                            return false
                        }else if(code==10001){
                            layer.msg('<div class="i18n" name="aleryRegister">该手机已被使用，如已注册请直接登录</div>');
                             window.clearInterval(InterValObj);//停止计时器
                            initEn()
                           $("#btnSendCode").removeAttr("disabled");//启用按钮
                           $('#btnSendCode').removeClass('gray')
                           // $("#btnSendCode").attr('name','reaginSend');
                            layerInternational()
                            return false
                        }else if(code==10023){
                            layer.msg('<div class="i18n" name="ParametersError">请求参数异常</div>');
                            initEn()
                             window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            // $("#btnSendCode").attr('name','reaginSend');
                            layerInternational()
                            return false
                        }else if(code==10021){
                            layer.msg('<div class="i18n" name="morethanTen">当日验证码获取超过10次</div>');
                            initEn()
                             window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            // $("#btnSendCode").attr('name','reaginSend');
                            layerInternational()
                            return false
                        }else if(code==10000){
                            layer.msg('<div class="i18n" name="serverError">服务器错误</div>');
                            initEn()
                            window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            // $("#btnSendCode").attr('name','reaginSend');
                            layerInternational()
                            return false
                        }else if(code==10038){
                                layer.msg('<div class="i18n" name="verificationinvalid">验证码发送无效，请重新发送</div>');
                                initEn()
                                layerInternational()
                                window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            return false
                        }else if(code==10041){
                            layer.msg('<div class="i18n" name="userLocked">用户已被锁定</div>');
                            layerInternational()
                            initEn()
                            window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            return false
                        }else if(code==10042){
                            layer.msg('<div class="i18n" name="verificationinvalidWrong">人机验证未通过</div>');
                            initEn()
                            layerInternational()
                            window.clearInterval(InterValObj);//停止计时器
                            $("#btnSendCode").removeAttr("disabled");//启用按钮
                            $('#btnSendCode').removeClass('gray')
                            return false
                        }
                        
                    
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest.status)
                    if(XMLHttpRequest.status==500){
                         // a++;
                         // setTimeout(sendMessage, 3000);
                         // if(a==3){
                         //     layer.msg('<div class="i18n" name="verificationinvalid">验证码发送无效，请重新发送</div>');
                         //    layerInternational()
                         // }
                          
                    }
                   
                }
            })
        } 


        //timer处理函数 
        function SetRemainTime() {
            if (curCount == 0) {        
                window.clearInterval(InterValObj);//停止计时器 
                $("#btnSendCode").removeAttr("disabled");//启用按钮 
                $('#btnSendCode').removeClass('gray')
               // $("#btnSendCode").html("<span class='i18n' name='reaginSend'></span>");
                $("#btnSendCode").attr('name','reaginSend');
                layerInternational()

            }
              else {
                curCount--; 
                $("#btnSendCode").text(curCount + "s");
              } 
            } 


                
    
$('#language-change').click(function(){
    $('#registerPhone').valid()
})
  



    $('#sign_phone').click(function(){//注册按钮点击事件
        var phoneNumber = $('#mobile-number').val().trim().replace(/\s/g,'');
        var password = $('input[name="password"]').val().trim().replace(/\s/g,'');
        var inviteCode = $('input[name="ReferralId"]').val().trim().replace(/\s/g,'');
        var code = $("#mobile-number").intlTelInput("getSelectedCountryData")
        var countrycodenum = code.dialCode;
        var len = countrycodenum.length;
        var countryCode = "+"+countrycodenum;
        if(phoneNumber.indexOf(countryCode)==-1){//说明没有区号
            var phoneNumber = phoneNumber;//不用截取字符串
        }else{
            var phoneNumber = phoneNumber.substring(len+1);//有区号，需要把区号截取掉
        }
        $('#registerPhone').valid()
        if($('#registerPhone').valid()){
              if(!$('#male').attr('checked')){
                 layer.msg('<div class="i18n" name="siginTerms">The terms must be accepted</div>');
                layerInternational()
                return false;
                 }
            var data1 = {
                "phone":phoneNumber,
                "itc":countrycodenum,
                "password":password,
                "codeType":"PHONE",
                "inviteCode":inviteCode,

            }
            var data2 = {
                "phone":phoneNumber,
                "phoneCode":$('.smsCode').val(),
                "codeType":"PHONE",
                "operateType":"REGISTER"

            }
            $.ajax({
                url:api.verityCode,//验证码验证
                type:"post",
                data:JSON.stringify(data2),
                dataType:'json',
                async:false,
                timeout:30000,
                contentType:"application/json;charset=UTF-8",
                success:function(data,xhr,textStatus){
                    console.log(textStatus.status)
                    if(textStatus.status==200){
                    var time = data.expiredTime;
                    var token = data.token;
                    var code = data.code;
                    if(code==10003){
                        layer.msg('<div class="i18n" name="messageError">短信验证码不正确，请重新输入</div>');
                        layerInternational()
                        return false;
                    }else if(code == 10023)
                    {
                         layer.msg('<div class="i18n" name="ParametersError">请求参数异常</div>');
                        layerInternational()
                        return false;
                    }else if(code==10035){
                        layer.msg('<div class="i18n" name="messageError"></div>')
                        layerInternational()
                        return false
                    }
                   $.ajax({
                    url:api.signUp,
                    type:'post',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        "token": token
                    },
                    data:JSON.stringify(data1),
                    dataType:'json',
                    timeout:30000,
                    success:function(data,xhr,textStatus){
                       //弹窗的国际化实现
                        //layer.msg('<div class="i18n" name="aleryRegister"></div>')
                        //必须写在layer.msg之后，因为只有渲染完成之后才可以获取到class='i18n'
                        //公共的layer国际化方法
                        if(textStatus.status==200){
                            if(data!=undefined){//失败
                                var code = data.code;
                                if(code == 10000){
                                    layer.msg('<div class="i18n" name="systemBusy">系统繁忙，请联系55客服</div>');
                                    layerInternational()
                                    return false;
                                }else if(code==10023){
                                    layer.msg('<div class="i18n" name="ParametersError">请求参数异常</div>');
                                    layerInternational()
                                    return false;
                                }else if(code==10010){
                                    layer.msg('<div class="i18n" name="layerPass">密码必须为8-20位的数字和字母组成</div>');
                                    layerInternational()
                                    return false;
                                }else if(code==10013){
                                    layer.msg('<div class="i18n" name="Unauthorized">授权不通过，请重新验证成</div>');
                                    layerInternational()
                                    Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
                                    localStorage.removeItem("curPage");
                                    window.location.href='../exchange/b11/index.html#/login'
                                    return false;
                                }else if(code==403){
                                    layer.msg('<div class="i18n" name="illegalRequest"></div>')
                                    layerInternational()
                                    return false
                                }else if(code==10012){
                                    layer.msg('<div class="i18n" name="inviteCodeError">邀请码格式不正确</div>');
                                    layerInternational()
                                    return false;
                                }
                            }else{//成功后台不给任何状态
                                layer.msg('<div class="i18n" name="regSuccess">success</div>',{
                                    time:1500,
                                    end:function(){
                                        window.location.href = "../exchange/b11/index.html#/login"
                                    }
                                })
                                layerInternational()
                                 
                            }
                            
                           
                        }
                        

                    },
                   complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                           if(status=='timeout'){//超时,status还有success,error等值的情况
                               var lan = localStorage.getItem('countryLanguage')
                               if(lan=='zh-CN'){
                                   layer.msg('<div name="timeout">请求超时</div>')
                               }else {
                                   layer.msg('<div name="timeout">Request Timeout</div>')
                               }
                               layerInternational()
                           }
                       },
                        
                    })
                    }else{
                        layer.msg('<div class="i18n" name="registorFail">注册失败，验证码错误</div>');
                        layerInternational()
                    }

                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                    if(status=='timeout'){//超时,status还有success,error等值的情况
                        var lan = localStorage.getItem('countryLanguage')
                        if(lan=='zh-CN'){
                            layer.msg('<div name="timeout">请求超时</div>')
                        }else {
                            layer.msg('<div name="timeout">Request Timeout</div>')
                        }
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest.status)
                    if(XMLHttpRequest.status==500){
                         layer.msg('<div class="i18n" name="messageValid">验证码验证无效</div>');
                         layerInternational()
                    }
                    
                }
            })//验证码ajax
          
        }
    })



function getinviteCode(){
    var thisURL = document.URL;
    if(thisURL.indexOf('?')!='-1'){
        var getval = thisURL.split('?')[1];
        if(getval.indexOf('&')!='-1'){
            var secondVal = getval.split('&')[0];
        }else{
            var secondVal=thisURL.split('?')[1];
        }
        showCode= secondVal.split("=")[1];
        $('input[name="ReferralId"]').val(showCode)
        $('input[name="ReferralId"]').attr('disabled',true)
        return showCode;
    }

}
getinviteCode()
