/**
 * cookie操作
 */
var getCookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */



var getNavLanguage = function(){
    if(localStorage.getItem('countryLanguage')){
        return false;
    }
    var type = navigator.appName;
    if (type == "Netscape"){
        var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
    }else{
        var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
    };
    var lang = lang.substr(0, 2);//获取浏览器配置语言前两位
    if (lang == "zh"){
        localStorage.setItem('countryLanguage','zh-CN');
    }else{
        localStorage.setItem('countryLanguage','en');
    }

}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "en";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'zh-TW', 'en','ko-kr','ja-jp','es-es','ru-ru','fr-fr','vi'];

/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
   
        /*
        首先获取用户浏览器设备之前选择过的语言类型
         */
        if (getCookie("userLanguage")) {
            i18nLanguage = getCookie("userLanguage");
        } else {
            // 获取浏览器语言
            var navLanguage = getNavLanguage();
            if (navLanguage) {
                // 判断是否在网站支持语言数组里
                var charSize = $.inArray(navLanguage, webLanguage);
                if (charSize > -1) {
                    i18nLanguage = navLanguage;
                    // 存到缓存中
                    getCookie("userLanguage",navLanguage);
                };
            } else{
                console.log("not navigator");
                return false;
            }
        }
        /* 需要引入 i18n 文件*/
        if ($.i18n == undefined) {
            console.log("请引入i18n js 文件")
            return false;
        };
}
        /*
        这里需要进行i18n的翻译
         */
         function loadPropery(type){
            jQuery.i18n.properties({
            name : 'index', //资源文件名称
            path : '../i18n', //资源文件路径
            mode : 'map', //用Map的方式使用资源文件中的值
            language : type,
            cache:true,//将资源缓存到本地
            callback : function() {//加载成功后设置显示内容
                var insertEle = $(".i18n");
                //console.log(".i18n 写入中...");
                insertEle.each(function() {
                    // 根据i18n元素的 name 获取内容写入
                    $(this).html($.i18n.prop($(this).attr('name')));
                });
               // console.log("写入完毕");

                //console.log(".i18n-input 写入中...");
                var insertInputEle = $(".i18n-input");
                insertInputEle.each(function() {
                    var selectAttr = $(this).attr('selectattr');
                    if (!selectAttr) {
                        selectAttr = "value";
                    };
                    $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
                });
                //console.log("写入完毕");
            }
        });
        }

//var en = en;
var countyrLanguage = localStorage.getItem('countryLanguage')
//var countyrLanguage = countyrLanguage?countyrLanguage:en;
protocal(countyrLanguage)
function protocal(language){
    if(language=='en'||language=="vi"||language=="ko"){
        $('.user-protocol').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004716273')
        $('a[name="AboutUS"]').attr('href','https://55support.zendesk.com/hc/en-us/articles/360004829074-About-Us')
    }else if(language=='zh-CN'){
        $('.user-protocol').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004716273')
        $('a[name="AboutUS"]').attr('href','https://55support.zendesk.com/hc/zh-cn/articles/360004829074-About-Us')
    }
}
getNavLanguage()
/*页面加载完毕，页面执行加载执行*/
$(function(){
    /*执行I18n翻译*/
        execI18n();
        //刷新页面的时候仍然记住当前选中的语言：针对普通的多语言切换
        layerInternational()
        //初始页面
        //var en = en;
        var countyrLanguage = localStorage.getItem('countryLanguage')
        //var countyrLanguage = countyrLanguage?countyrLanguage:en;
         loadPropery(countyrLanguage)
         rememberLanguage(countyrLanguage)
         function rememberLanguage(countyrLanguage){//刷新页面仍然记住当前选中的与语言：针对的是表单验证的语言
            if(countyrLanguage=='en'){
                $.getScript("../static/web/js/lib/messages_en.js");
             }else if(countyrLanguage=='zh-CN'){
                $.getScript("../static/web/js/lib/messages_zh.js");
             }else if(countyrLanguage=='zh-TW'){
                $.getScript("../static/web/js/lib/messages_zh_TW.js");
             }else if(countyrLanguage=='ko-kr'){
                $.getScript("../static/web/js/lib/messages_Korean.js");
             }else if(countyrLanguage=='ja-jp'){
                $.getScript("../static/web/js/lib/messages_japanes.js");
             }else if(countyrLanguage=='es-es'){
                $.getScript("../static/web/js/lib/messages_spanish.js");
             }else if(countyrLanguage=='ru-ru'){
                $.getScript("../static/web/js/lib/messages_Russian.js");
             }else if(countyrLanguage=='fr-fr'){
                $.getScript("../static/web/js/lib/messages_french.js");
             }
         }


    $('.common-header').on("click",".headerBox .language .change_lang_item",function(){
        layerInternational()
        var imgDom =$(this).closest('.language').find('.show_img')
        console.log($(this).closest('.language').find('.show_img'))
        var language = $(this).attr('data-value');
        if(language=='en'){
            imgDom.attr('src','../static/web/images_new/English.svg')
        }else if(language=='zh-CN'){
            imgDom.attr('src','../static/web/images_new/China.svg')
        }else if(language=='ko'){
            imgDom.attr('src','../static/web/images_new/ko.svg')
        }else if(language =='vi'){
            imgDom.attr('src','../static/web/images_new/Vietnam.svg')
        }
        localStorage.setItem('countryLanguage',language)
        changefooterurl(language)
        changeHeaderurl(language)
        loadPropery(language)//根据不同语言进行切换
        $(this).closest('.language-box').hide()
         var countyrLanguage = localStorage.getItem('countryLanguage')
         //var countyrLanguage = countyrLanguage?countyrLanguage:en;
         if(countyrLanguage=='en'){
            $.getScript("../static/web/js/lib/messages_en.js",function(){
                 $('#language-change').click()
                $('#languagetwo-change').click()
            });
         }else if(countyrLanguage=='zh-CN'){
            $.getScript("../static/web/js/lib/messages_zh.js",function(){
                 $('#language-change').click()
                $('#languagetwo-change').click()
            });
         }else if(countyrLanguage=='zh-TW'){
            $.getScript("../static/web/js/lib/messages_zh_TW.js");
         }else if(countyrLanguage=='ko-kr'){
            $.getScript("../static/web/js/lib/messages_Korean.js");
         }else if(countyrLanguage=='ja-jp'){
            $.getScript("../static/web/js/lib/messages_japanes.js");
         }else if(countyrLanguage=='es-es'){
            $.getScript("../static/web/js/lib/messages_spanish.js");
         }else if(countyrLanguage=='ru-ru'){
            $.getScript("../static/web/js/lib/messages_Russian.js");
         }else if(countyrLanguage=='fr-fr'){
            $.getScript("../static/web/js/lib/messages_french.js");
         }

        $(this).closest('.language').find('label').text($(this).text())
        getCookie("userLanguage",language,{
            expires: 30,
            path:'/'
        });
       


    })

        $('.common-header').on('mouseenter','.headerBox .language',function(){
            $(this).find('.language-box').show()
         })
        $('.common-header').on('mouseleave','.headerBox .language',function(){
            $(this).find('.language-box').hide()
         })

        
});

function layerInternational(){
    var countyrLanguage = localStorage.getItem('countryLanguage')
    loadPropery(countyrLanguage)
}
