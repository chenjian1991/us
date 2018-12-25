$(function () {
    var height = $(window).height();
    if (top > $("#realtime").offset().top) {
        $("#realtime").addClass("a-flyLeftIn");
        $("#realtime-img").addClass("a-flyRightIn");
    }
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var top = height + scrollTop;
        if (top > $("#realtime").offset().top) {
            $("#realtime").addClass("a-flyLeftIn");
            $("#realtime-img").addClass("a-flyRightIn");
        }
        if (top > $("#sico").offset().top) {
            $("#sico").addClass("a-flyRightIn");
            $("#sico-img").addClass("a-flyLeftIn");
        }
        if (top > $("#token").offset().top) {
            $(".token .content-bottom").addClass("a-flyBottomIn");
        }
        if (top > $("#breaking-img").offset().top) {
            $("#breaking-img").addClass("a-flyLeftIn");
            $("#features_one").addClass("a-flyRightIn");
        }
        if (top > $("#coins-img").offset().top) {
            $("#coins-img").addClass("a-flyRightIn");
            $("#features_two").addClass("a-flyLeftIn");
        }
        if (top > $("#preico-img").offset().top) {
            $("#preico-img").addClass("a-flyLeftIn");
            $("#features_three").addClass("a-flyRightIn");
        }
        if (top > $("#holding").offset().top) {
            $("#holding").addClass("a-flyLeftIn");
            $("#holding-img").addClass("a-flyRightIn");
        }
        if (top > $("#MacBookPro").offset().top) {
            $("#MacBookPro").addClass("a-flyLeftIn");
            $("#download_right").addClass("a-flyRightIn");
        }
        if (top > $("#ipad").offset().top) {
            $("#ipad").addClass("a-flyRightIn");
        }
        if (top > $("#iphone").offset().top) {
            $("#iphone").addClass("a-flyBottomIn");
        }
    });
});
// $(".swiper-wrapper").height(window.innerWidth / (1920 / 760));

var market = new Market();

changeLanguage(localStorage.getItem("countryLanguage"));
$('.wrapper').delegate('.reload', 'click', function () {
    var value = $(this).attr('data-value');
    changeLanguage(value);
});

function changeLanguage(language) {

    market.getAnnouncement(language, function (data) {
        $.each(data, function (i, v) {
            $("#news" + (i + 1)).text(v["title"]).attr("data-targetId", v["targetId"])
        })
    });
    market.getBanner(language, function (data) {
        var flag = false;
        // $(".swiper-wrapper").height("");//页面调整时高度随之变化
        $(".swiper-wrapper").remove();

        var temp = "";
        var banner = "<div class=\"swiper-wrapper\">";
        $.each(data, function (i, v) {
            if(v["targetUrl"]){
                var imgUrl = "<div class=\"swiper-slide\" id=\"slider" + (i + 1) + "\"><a href =\"" + v["targetUrl"] + "\"><img src=\"" + v["imageUrl"] + "\"></a></div>";
                temp = temp + imgUrl;
            }else{
                var imgUrl = "<div class=\"swiper-slide\" id=\"slider" + (i + 1) + "\"><img src=\"" + v["imageUrl"] + "\"></div>";
                temp = temp + imgUrl;
            }
        });
        temp = banner + temp + "</div>";
        $(temp).prependTo("#banner");

        if (data.length > 1) {
            flag = true;
        }
        var swiper = new Swiper('.swiper-container', {
            loop: flag,
            speed: 1000,
            autoplay: flag,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    });
}

function set(key, value) {
    localStorage.setItem(key, value);
}

function get(key) {
    var value = localStorage.getItem(key);
    if (!value) {
        alert_box()
    }
}

function alert_box(alert) {
    alert = alert || ".alert";
    $(".mask").removeClass("dis-n");
    $(alert).removeClass("dis-n");
    $(document.body).css("overflow-y", "hidden");
}

function hide_alert() {
    $(".mask").addClass("dis-n");
    $(".alert").addClass("dis-n");
    $(document.body).css("overflow-y", "auto");
    set("prompt_alert", true)
}

$("#close_icon").click(function () {
    hide_alert();
});

get("prompt_alert");

function detailsNews(that) {
    if (localStorage.getItem("countryLanguage") == "en"||localStorage.getItem("countryLanguage") == "vi"||localStorage.getItem("countryLanguage") == "ko") {
        var moreUrl = "https://55support.zendesk.com/hc/" + "en-us" + "/articles/" + $(that).attr("data-targetId");
    } else {
        var moreUrl = "https://55support.zendesk.com/hc/" + localStorage.getItem("countryLanguage").toLowerCase() + "/articles/" + $(that).attr("data-targetId");
    }
    window.open(moreUrl);
}


function initFooter() {
    sessionStorage.setItem("footer", $('.common-footer').html());
    sessionStorage.setItem('header', $('.common-header').html());
}

initFooter()
layerInternational()

function sanCode() {
    $('.scanCodeHover').mouseenter(function () {
        $('.scanCode').css('display', 'block')
    })
    $('.scanCodeHover').mouseleave(function () {
        $('.scanCode').css('display', 'none')
    })
}

sanCode()

