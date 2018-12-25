//console.log('test uglify js')
$(document).ready(function () {
    $('.identity-submit').click(function () {
        if ($('#noAuthentication').valid()) {
            var sex = $('.gender .label-radio input:checked').parent().find('label').attr('data-val');
            var proof = $('.proof .label-radio input:checked').parent().find('label').attr('data-val');
            var identityId = $('input[name="LicenseId"]').val();
            var passportId = $('input[name="passportId"]').val();
            var firstName = $('.phone-li-item input[name="firstName"]').val();
            var lastName = $('.phone-li-item input[name="lastName"]').val();
            var selectval = $('#flagstrap button span').text();
            var selectedOpt = $('#flagstrap select option:selected');
            if(selectedOpt.length==1){
                var selectedOpt = $('#flagstrap select option:selected').attr('value');
                console.log(selectedOpt)
            }else if(selectedOpt.length==2){//safria兼容
                var selectedOpt = selectedOpt[1];
                var selectedOpt = selectedOpt.value;
            }
            console.log(selectedOpt)
            //var newFirstName  = HtmlUtil.htmlEncodeByRegExp(firstName)
            //var newLastName = HtmlUtil.htmlEncodeByRegExp(lastName)
            // 证件照链接地址
            var iDCardFrontUrl = $('input[name="iDCardFrontUrl"]').val();
            var iDCardBackUrl = $('input[name="iDCardBackUrl"]').val();
            var iDSelfieUrl = $('input[name="iDSelfieUrl"]').val();
            var passportCoverUrl = $('input[name="passportCoverUrl"]').val();
            var passportPersonalPageUrl = $('input[name="passportPersonalPageUrl"]').val();
            var passportSelfieUrl = $('input[name="passportSelfieUrl"]').val();
            if (selectval == "Please select a country" || selectval == "请选择所在国家") {
                layer.msg($.i18n.prop('sfrzCountrySelect'));
                return
            }
            var param = {
                firstName: firstName,
                lastName: lastName,
                gender: sex,
                countryCode: selectedOpt,
                proofType: proof
            }
            if (proof == 'VALID_IDENTITY_CARD') {
                var proofId = identityId;
                if (iDCardFrontUrl == '') {
                    layer.msg($.i18n.prop('sfrzIDCardFrontUpload'));
                    return;
                }
                if (iDCardBackUrl == '') {
                    layer.msg($.i18n.prop('sfrzIDCardBackUpload'));
                    return;
                }
                if (iDSelfieUrl == '') {
                    layer.msg($.i18n.prop('sfrzSelfieIDUpload'));
                    return;
                }
                param.proofId = identityId;
                param.iDCardFrontPhoto = iDCardFrontUrl;
                param.iDCardBackPhoto = iDCardBackUrl;
                param.iDSelfiePhoto = iDSelfieUrl;
            } else if (proof == 'PASSPORT') {
                var proofId = passportId;
                if (passportCoverUrl == '') {
                    layer.msg($.i18n.prop('sfrzPassportCoverUpload'));
                    return;
                }
                if (passportPersonalPageUrl == '') {
                    layer.msg($.i18n.prop('sfrzPersonalPageUpload'));
                    return;
                }
                if (passportSelfieUrl == '') {
                    layer.msg($.i18n.prop('sfrzSelfiePhotoIDUpload'));
                    return;
                }
                param.proofId = passportId;
                param.passportCoverPhoto = passportCoverUrl;
                param.passportPersonalPagePhoto = passportPersonalPageUrl;
                param.passportSelfiePhoto = passportSelfieUrl;
            }





            $.ajax({
                type: "POST",
                url: api.authentication,
                data: JSON.stringify(param),
                dataType:'json',
                headers:{
                    token:Cookies.get('loginToken')
                },
                contentType: 'application/json',
                success: function(data){
                    if(data.result==''){
                        $('.identity-submit').attr('disabled',true)
                        layer.msg('<div class="i18n" name="realnameSuccess">success</div>',{
                            time:1500,
                            end:function(){
                                window.location.href = './underReview.html'
                            }
                        })
                        layerInternational()
                    }else {
                        var code = data.code;
                        if(code==10023){
                            layer.msg('<div class="i18n" name="paramError"></div>')
                            layerInternational()
                        }else if(code==10037){
                            layer.msg('<div class="i18n" name="picFailer"></div>')
                            layerInternational()
                        }else if(code==403){
                            layer.msg('<div class="i18n" name="illegalRequest"></div>')
                            layerInternational()
                        }
                    }
                },
                error:function(){

                }
            });

           



        }
    })

    var fileuploadUrl = '/api/sso/user/identify.upload';
    // var fileuploadUrl = 'http://localhost:9003/user/identify.upload';

    // 文件上传
    $('input[type="file"]').fileupload({
        url: fileuploadUrl,
        dataType: 'json',
        autoUpload: true,
        add: function (e, data) {
            $('.progress').css(
                'width','0%'
            );
            $('.progress .bar').css(
                'width', '0%'
            );

            if (validateImage(data)) {
                data.submit();
            }
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(this).closest('.identity-card-item').find('.progress').css({
                'width':'100%'
            })
            $(this).closest('.identity-card-item').find('.progress .bar').css({
                'width':parseInt(progress) + '%'
            })
            // $('.bar').html(parseInt(progress) + "%");

        },
        fail:function (e, data) {
            layer.msg('<div class="i18n" name="uploadError"></div>')
        },
        done: function (e, data) {
            $('.progress').css(
                'width','0%'
            );
            $('.progress .bar').css(
                'width', '0%'
            );
            var responseData = data.result;
            if(responseData.code=='10013'){
                layer.msg('<div class="i18n" name="AuthorizationRefuse">登录已失效</div>',{
                    time:1500,
                    end:function(){
                        Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
                        localStorage.removeItem("curPage");
                        window.location.href='../exchange/b11/index.html#/loginl'
                    }
                })
                layerInternational()

            }else {
                showUploadImg($(this), responseData.filePath)
                $(this).next().next().val(responseData.filePath);
            }
        }
    }).bind('fileuploadsubmit', function (e, data) {
        formData(data);
    });


    /**
     * 监听证件类别切换事件
     */
    $('input[name="proof"]').click(function () {
        var proofType = $(this).val();
        if (proofType == 'PASSPORT') {
            $('.identityId').addClass('dis-n');
            $('.passportId').removeClass('dis-n');
            $('#idCardContent').css('display', 'none');
            $('#passportContent').css('display', 'flex');
        } else if (proofType == 'VALID_IDENTITY_CARD') {
            $('.passportId').addClass('dis-n');
            $('.identityId').removeClass('dis-n');
            $('#passportContent').css('display', 'none');
            $('#idCardContent').css('display', 'flex');
        }
    });

    $('input[type="file"]').mouseover(function () {
        $(this).next().removeClass('dis-n');
    });
    $('input[type="file"]').mouseout(function () {
        $(this).next().addClass('dis-n');
    });

})

/**
 * 组装formData
 */
function formData(data) {
    var token = Cookies.get('loginToken');
    data.headers = { token: token };
}

/**
 * 验证图片格式和大小
 */
function validateImage(data) {
    var acceptFileTypes = /^image\/(jpe?g|png)$/i;
    //文件类型判断
    if (data.originalFiles[0]['type'] == null || data.originalFiles[0]['type'] == '') {
        layer.msg('请上传jpg,jpeg,png格式的图片！')
        return false;
    } else {
        if (acceptFileTypes.test(data.originalFiles[0]['type'])) {
            if (data.originalFiles[0].size > 5242880) {
                layer.msg('图片最大上传限制为5M')
                return false;
            }
            return true;
        } else {
            layer.msg('请上传jpg,jpeg,png格式的图片！')
            return false;
        }
    }
}

/**
 * 请求后台，返回图片地址
 */
function showUploadImg($obj, imgKey) {
    sendGetRequest('/api/sso/user/identify.photo?filePath=' + imgKey, function (data) {
        $obj.prev().attr('src', data.filePath);
    });
}
