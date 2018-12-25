$(function () {
    var language = $.getUrlParam("language");
    var img = "";
    var name = $.getUrlParam("name");
    var rname = $.getUrlParam("rname");
    var qrCode = $.getUrlParam("qrCode");
    var total = $.getUrlParam("total");
    var ava = $.getUrlParam("ava");
    var orde = $.getUrlParam("orde");
    var estimatedS = $.getUrlParam("estimatedS");

    //国际化支持
    var page = {};
    if (language == 'zh-CN') {
        page.total = '总额'
        page.Available = '可用余额'
        page.InOrder = '下单冻结'
        page.Estimated = '估值(BTC)'
        page.Deposits = '充值'
        page.Withdrawal = '提现'
        $("title").html("资产详情");
    } else {
        page.title = 'Balances';
        page.total = 'Total'
        page.Available = 'Available'
        page.InOrder = 'In Order'
        page.Estimated = 'Estimated(BTC)'
        page.Deposits = 'Deposits'
        page.Withdrawal = 'Withdrawal'
        $("title").html("Balances");
        
    }

    var assetsVue = new Vue({
        el: ".assets-body-div",
        data: {
            language: language,
            img: img,
            name: name,
            rname: rname,
            qrCode: qrCode,
            total: total,
            ava: ava,
            orde: orde,
            estimatedS: estimatedS,
            page: page
        }
    });

    ajaxGetBody("/supervision/front/currency.list", {currency: name}, function (data) {
        if (data) {
            assetsVue.img = data[0].projectInfo.image;
        }
    }, function () {
    });

    $.get("/api/spot/util/currency.list", function (data) {
        var status;
        for(var i =0; i<data.length; i++){
            if(data[i].currency === name){
                status = data[i].status
            }
        }
        if (data) {
           switch (status) {
                case "NOT__DEPOSIT_WITHDRAW":
                   //不可充值
                    $('#depositsBtn').hide()
                   break;
                case "DEPOSIT_NOT_WITHDRAW":
                    $('#withdrawalBtn').hide()
                    break;
                case "NOT_DEPOSIT_NOT_WITHDRAW":
                     $('#depositsBtn').hide()
                     $('#withdrawalBtn').hide()
                    break;
               default:
                   break;
           }
        }
    }, function () {
    });

    $(".btn-withdrawal").click(function () {
        var agent = navigator.userAgent;
        var isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;
        var isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            window.location.href = "https://www.55.com/";
        } else if (isiOS) {
            window.webkit.messageHandlers.actionWithdrawals.postMessage('');
        }
    });
});