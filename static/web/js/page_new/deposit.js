$(function () {
    $(".alert-address").click(function () {
        alert_box();
    });

    $("#close_icon").click(function () {
        hide_alert();
    });
});

if (!loginToken) {
    window.location.href = "../exchange/b11/index.html#/login";
}

var url_search = window.location.search.slice(8);
var base_asset = url_search;
$(".baseAsset").text(base_asset);

var ssoProvider = {};
ssoProvider.getSsoToken = function (fn) {
    fn(Cookies.get('loginToken'));
};
var exchange = new Exchange(ssoProvider);

var market = new Market();
var priceFlag = false;

exchange.getCurrencyList(function (data) {
    $.each(data, function (key, value) {
        if (base_asset == value["currency"]) {
            $(".full-name").text(value["currencyName"]);    //获取全称
            var pricePrecision = value["currencyPrecision"];
            exchange.balance(function (data) {
                if (data.length != 0) {
                    $.each(data, function (i, v) {
                        if (base_asset == v["currency"]) {
                            var symbolTotal = new BigDecimal(transferNumber(v["available"], pricePrecision)).add(new BigDecimal(transferNumber(v["frozen"], pricePrecision))).toString();//总资产
                            $(".available").text(transferNumber(v["available"], pricePrecision));
                            $(".frozen").text(transferNumber(v["frozen"], pricePrecision));
                            $(".total").text(symbolTotal);
                            priceFlag = true;
                            return false;
                        }
                    });
                    if (!priceFlag) {
                        $(".available,.frozen,.total").text(Number(0).toFixed(pricePrecision));
                    }
                } else {
                    $(".available").text(Number(0).toFixed(pricePrecision));
                    $(".frozen").text(Number(0).toFixed(pricePrecision));
                    $(".total").text(Number(0).toFixed(pricePrecision));
                }
            });
            return false;
        }
    });
});


exchange.deposit(base_asset, function (data) {
    var address = data.value;
    $("#address").text(address);
    // setValue("address", data);

    //生成二维码
    var qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200
    });
    qrcode.makeCode(address);
});


function supervision() {
    market.queryName(base_asset, function (data) {
        if (data["id"]) {
            window.location.href = "../vote/supervision.html?id=" + data["id"] + "&language=" + localStorage.getItem("countryLanguage");
        }
    });
}

function toDeposit() {
    if (localStorage.getItem("countryLanguage") == "en"||localStorage.getItem("countryLanguage") == "vi"||localStorage.getItem("countryLanguage") == "ko") {
        var url = "https://55support.zendesk.com/hc/" + "en-us" + "/articles/360004688594";
    } else {
        var url = "https://55support.zendesk.com/hc/" + localStorage.getItem("countryLanguage").toLowerCase() + "/articles/360004688594";
    }
    window.open(url);
}

//复制到剪切板
var clipboard = new Clipboard('.copy-address');
clipboard.on('success', function () {
    $("#copy_success").fadeIn(500).fadeOut(2000);
});


$(document).ready(function () {
    importHeaderFooter()
    layerInternational()
})

function copy() {
    var address = document.getElementById("address");
    var success = document.getElementById("copy_success");
    address.select();
    //复制文本框内容到剪切板
    document.execCommand("copy");
}
