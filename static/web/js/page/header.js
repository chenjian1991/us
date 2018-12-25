
     //登录前后判断
     judge()
     function judge(){
        var judgeLogin = Cookies.get('loginToken');
        if (judgeLogin) {
            $('.loginAfter').show()
            $('.loginbefore').hide()
        } else {
            $('.loginAfter').hide()
            $('.loginbefore').show()
        }
     }

     var getNavLanguage = function(){
         if(navigator.appName == "Netscape"){
             var navLanguage = navigator.language || navigator.browserLanguage;
             return navLanguage;
         }
         return false;
     }
     var countryHeader = localStorage.getItem('countryLanguage')
     var countryHeader = countryHeader?countryHeader:getNavLanguage();
     importHeaderFooter()
function importHeaderFooter(nav) {
    var header = sessionStorage.getItem('header')
    var footer = sessionStorage.getItem('footer')
    if (header != null && footer != null) {
        $('.common-header').html(header,function () {
            navigation(nav)
            labelName()
            changeHeaderurl(countryHeader)
        })
        $('.common-footer').html(footer,function () {
            sanCode()//回掉函数
            var LanguageFooter = localStorage.getItem('countryLanguage')
            var LanguageFooter = LanguageFooter?LanguageFooter:getNavLanguage();
            changefooterurl(LanguageFooter)
        })
    } else {
        $('.common-header').load('../header.html', function () {
            judge()
            layerInternational()
            labelName()
            changeHeaderurl(countryHeader);
            navigation(nav)
        })
        $('.common-footer').load("../footer.html", function () {
            layerInternational()
            sanCode()
            var LanguageFooter = localStorage.getItem('countryLanguage')
            var LanguageFooter = LanguageFooter?LanguageFooter:getNavLanguage();
            changefooterurl(LanguageFooter)
        })

    }
    judge()
    layerInternational()//记住语言
    changeHeaderurl(countryHeader)
    var LanguageFooter = localStorage.getItem('countryLanguage')
    var LanguageFooter = LanguageFooter?LanguageFooter:getNavLanguage();
    changefooterurl(LanguageFooter)
    changeSupervisonUrl(LanguageFooter)



}

     function sanCode() {
         $('.scanCodeHover').mouseenter(function () {
             $('.scanCodepic').css('display', 'block')
         })
         $('.scanCodeHover').mouseleave(function () {
             $('.scanCodepic').css('display', 'none')
         })
     }

     function changefooterurl(language){
             if(language=='en'||language=="vi"||language=="ko"){
                 $('a[name="AboutUS"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004829074-About-Us')
                 $('a[name="ourteam"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004876973-Join-us')
                 $('a[name="footerannounce"]').attr('href','https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements')
                 $('a[name="terms"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004716273-Terms-of-User')
                 $('a[name="Privacy"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004683314-Privacy-Policy')
                 $('a[name="Legal"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004724533-Legal-Statement')
                 $('a[name="Fees"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004875413-55-Exchange-Rate-Table')
                 $('a[name="Help"]').attr('href','https://55support.zendesk.com/hc/en-us')
             }else if(language=='zh-CN'){
                 $('a[name="AboutUS"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004829074-About-Us')
                 $('a[name="ourteam"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004876973-Join-us')
                 $('a[name="footerannounce"]').attr('href','https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements')
                 $('a[name="terms"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004716273-Terms-of-User')
                 $('a[name="Privacy"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004683314-Privacy-Policy')
                 $('a[name="Legal"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004724533-Legal-Statement')
                 $('a[name="Fees"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004875413-55-Exchange-Rate-Table')
                 $('a[name="Help"]').attr('href','https://55support.zendesk.com/hc/zh-cn')
             }
     }



     function changeHeaderurl(language) {
             if(language=='en'){
                 $('a[name="tbdhAnnouncement"]').attr('href','https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements')
                 $('a[name="tbdhHelp"]').attr('href','https://55support.zendesk.com/hc/en-us')
                 $('a[name="tbdhSponsor"]').attr('href','../pdf/55whitepaper_zh.pdf');
                 $('.nationFlag').attr('src','../static/web/images_new/English.svg')

             }else if(language=='zh'||language=='zh-CN'){
                 $('a[name="tbdhAnnouncement"]').attr('href','https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements')
                 $('a[name="tbdhHelp"]').attr('href','https://55support.zendesk.com/hc/zh-cn')
                 $('a[name="tbdhSponsor"]').attr('href','../pdf/55whitepaper_zh.pdf')
                 $('.nationFlag').attr('src','../static/web/images_new/China.svg')

             }else if(language=='ko'){
                $('.nationFlag').attr('src','../static/web/images_new/ko.svg');
                $('a[name="tbdhAnnouncement"]').attr('href','https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements')
                $('a[name="tbdhHelp"]').attr('href','https://55support.zendesk.com/hc/en-us')
             }else if(language =='vi'){
                $('.nationFlag').attr('src','../static/web/images_new/Vietnam.svg');
                $('a[name="tbdhAnnouncement"]').attr('href','https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements')
                $('a[name="tbdhHelp"]').attr('href','https://55support.zendesk.com/hc/en-us')
             }
     }
     function changeSupervisonUrl(language) {//信批申请地址
         if(language=='en'||language=="vi"||language=="ko"){
             $('a[name="gotoTable"]').attr('href','http://47.89.11.121/limesurvey/index.php/423785?lang=en')
         }else if(language=='zh'||language=='zh-CN'){
             $('a[name="gotoTable"]').attr('href','http://47.89.11.121/limesurvey/index.php/423785?lang=zh-Hans')
         }
     }




labelName()
function labelName() {
    var countyrLanguage = localStorage.getItem('countryLanguage')
    if (countyrLanguage == 'en') {
        $('.languageChange').text('English')
    } else if (countyrLanguage == 'zh-CN') {
        $('.languageChange').text('简体中文')
    }
}

$('.wrapper').delegate('.idVertication', 'click', function () {//实名认证
    sendGetRequest(api.identify, function (data) {
        var response = data;
        var status = response.checkStatus;
        if (status == 'CHECKING') {
            window.location.href = '../identityAuthentication/underReview.html';
        } else if (status == "PASSED") {
            window.location.href = '../identityAuthentication/passed.html';
        } else if (status == 'NOT_SET') {
            window.location.href = '../identityAuthentication/noAuthentication.html';
        }else  if(status=='FAILURE'){
            window.location.href = '../identityAuthentication/noPass.html';
        }

        if(data.code!=undefined){
            var code = data.code;
            if(code==10013){
                Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
                localStorage.removeItem("curPage");
                window.location.href='../exchange/b11/index.html#/login'
            }
        }
    })
})


     function navigation(one,two){
         var _a =one;
         var _b = two;
         $('.header dl dt').removeClass('active');
         $('#'+one).addClass('active');
         // console.log($('#'+one).hasClass('active'))
         if(_b != ''){
             $('#'+two).addClass('active');
         }

     }

     //退出登录
     $('body').delegate('.loginOut', 'click', function () {
         Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')});
         localStorage.removeItem("ACCOUNT_TOKEN");
         localStorage.removeItem("ORDER_TOKEN");
         localStorage.removeItem("ASSET_TOKEN");
         localStorage.removeItem("UTIL_TOKEN");
         localStorage.removeItem("accountId");
         localStorage.removeItem("ACCOUNT_SESSION");
         localStorage.removeItem("ORDER_SESSION");
         localStorage.removeItem("ASSET_SESSION");
         localStorage.removeItem("orderTicket");
         localStorage.removeItem("googleFlag");
         localStorage.removeItem("phoneNumber");
         localStorage.removeItem("userNumer");
         localStorage.removeItem("ex55pin");
         localStorage.removeItem("emailFlag");
         localStorage.removeItem("ifEmail");
         localStorage.removeItem("ifsetgoogle");
         localStorage.removeItem("isSetTradePasswrod");
         localStorage.removeItem("securitPhone");
         localStorage.removeItem("curPage");
         localStorage.removeItem("Emailtoken");
         localStorage.removeItem("phoneToken");
         window.location.reload();
         window.location.href = '../../../exchange/b11/index.html#/home';
     })
