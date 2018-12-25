$(function () {
    var language = $.getUrlParam("language");
    /*
    这里需要进行i18n的翻译
    */
    jQuery.i18n.properties({
        name: 'index', //资源文件名称
        path: './i18n', //资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值
        language: language,
        cache: true, //将资源缓存到本地
        callback: function () { //加载成功后设置显示内容
            var insertEle = $(".i18n");
            console.log(insertEle)
            //console.log(".i18n 写入中...");
            insertEle.each(function () {
                // 根据i18n元素的 name 获取内容写入
                $(this).html($.i18n.prop($(this).attr('name')));
            });
            // console.log("写入完毕");

            //console.log(".i18n-input 写入中...");
            var insertInputEle = $(".i18n-input");
            insertInputEle.each(function () {
                var selectAttr = $(this).attr('selectattr');
                if (!selectAttr) {
                    selectAttr = "value";
                };
                $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
            });
            //console.log("写入完毕");
        }
    });
})