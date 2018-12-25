$(function () {
    var language = $.getUrlParam("language");
    var name = $.getUrlParam("name");
    var qrCode = $.getUrlParam("qrCode");
    //国际化支持
    var page = {};
    if (language == 'zh-CN') {
        page.tip = '温馨提示';
        page.TipsContent1 = '1.只发送'+name+'到这个充值地址。发送任何其他货币到这个地址可能导致您的充值损失。</br>';
        page.TipsContent2 = '2.充值后，您可以在充值历史页面上查看进展情况。</br>';
        page.DepositAddress = name+' 充值地址';
        page.copyAddress = ' 复制地址';
        page.showQR = ' 查看二维码'
        $("title").html("充值");
    } else {
        page.tip = 'Tips';
        page.TipsContent1 = '1.Send only '+name+'to this deposit address.Sending any other currency to this address may result in the loss of your deposit.</br>' 
        page.TipsContent2 = '2. After making a deposit, you can track its progress on the history page.</br>'
        page.DepositAddress = name +' Deposit Address'
        page.copyAddress = ' Copy Address'
        page.showQR = ' Show QR Code'
        $("title").html("Deposits");
    }

    var depositsVue = new Vue({
        el: ".deposits-body-div",
        data: {
            language: language,
            name: name,
            qrCode: qrCode,
            page: page
        },
        methods: {
            // 格式化日期
            formatDate: function (input) {
                var d = new Date(input);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                return year + '-' + month + '-' + day;
            }
        }
    });

    //生成二维码
    var qrcode = new QRCode('js-qrcode', {
        width: 200,
        height: 200
    });
    qrcode.makeCode(qrCode);
    
    var clipboard = new ClipboardJS('.btn-copy');
    clipboard.on("success", function () {
        if(language === 'en'){
            layer.msg("copy success");
        }else{
            layer.msg("复制成功");
        }
    });
});