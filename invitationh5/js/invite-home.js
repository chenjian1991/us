$(function () {
    ////////////////////////////////////////////////////////////【风雪白熊】【获取基础参数】////////////////////////////////////////////////////////////
    var sso_token = "";
    var agent = navigator.userAgent;
    var isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;
    var isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        sso_token = $.cookie("SSOToken");
    } else if (isiOS) {
        sso_token = $.cookie("SSOToken");
    }
    var language = $.getUrlParam("language");
    localStorage.setItem('countryLanguage', language);
    ////////////////////////////////////////////////////////////【风雪白熊】【填充数据】////////////////////////////////////////////////////////////
    ajaxGetBody("/invite/query.myInviteCode", {token: sso_token}, function (data) {
        if (data) {
            var protocol = window.location.protocol;
            var host = window.location.host;
            // var port = window.location.port;
            var targetUrl = protocol + "//" + host;
            var inviteLink = targetUrl + "/invitation/signUpInvitation.html?invite_code=" + data.userCode;
            $("#inputCode").val(data.userCode)
            $("#inputLink").val(inviteLink)

            //copy 
            $("#linkBtn").attr('data-clipboard-text',inviteLink)
            $("#codeBtn").attr('data-clipboard-text',data.userCode)
        }
    }, function () {
    });
    ajaxGetBody("/invite/query.usersCount", {token: sso_token}, function (data) {
        if (data) {
            $(".js-my-invite-count").html(data.count);
            $("#ffNum").html(data.count*30)
        }
    }, function () {
    });
    var clipboard = new ClipboardJS('#linkBtn');
    clipboard.on("success", function () {
        if(language === 'en'){
            layer.msg("copy success");
        }else{
            layer.msg("复制成功");
        }
    });
    var clipboard2 = new ClipboardJS('#codeBtn');
    clipboard2.on("success", function () {
        if(language === 'en'){
            layer.msg("copy success");
        }else{
            layer.msg("复制成功");
        }
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【国际化处理】////////////////////////////////////////////////////////////
    var page = {};
    if (language == 'zh-CN') {
        page.title = '邀请好友'
        page.myInvite = '我的邀请';
        page.ranking = "全部排行榜";
        page.rererralFriends = "已邀请朋友";
        page.commissionValue = "预期邀请奖励";
        page.code = "我的推荐ID";
        page.copy = "复制";
        page.friends = "马上邀请好友";
        page.posters = "你的专属海报";
        page.invitationCode = "专属邀请码"
        page.invitationLink = "专属邀请链接"
        page.bannerText1 = "注册55交易所,邀请好友"
        page.bannerText2 = "每邀请一个用户成功注册，即可获得30FF"
    } else {
        page.title = 'Invitation Program'
        page.myInvite = 'My Invite';
        page.ranking = "All ranking";
        page.rererralFriends = "Rererral Friends";
        page.commissionValue = "Invitation reward";
        page.code = "CODE";
        page.copy = "copy";
        page.friends = "Invite friends";
        page.posters = "Invitation posters";
        page.invitationCode = "Exclusive invitation code"
        page.invitationLink = "Exclusive registration link"
        page.bannerText1 = "To register 55 Exchange and invite friends"
        page.bannerText2 = "Each invite a user has successfully registered,you can get 30FF"
    }
    // var vue = new Vue({
    //     el: ".vue-body",
    //     data: {
    //         page: page
    //     }
    // });

});