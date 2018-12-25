$(function () {
    var language = $.getUrlParam("language");
    var sponsorId = $.getUrlParam("sponsorId");
    var sponsorVue = new Vue({
        el: ".sponsor-body-div",
        data: {
            language: language,
            sponsorId: sponsorId,
            base: {},
            sponsoredList: {},
            listedList: {},
            team: {}
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
    ////////////////////////////////////////////////////////////【风雪白熊】【基础】////////////////////////////////////////////////////////////
    ajaxGetBody("/sponsor/front/base.query", {"language": language, "sponsorId": sponsorId}, function (successData) {
        sponsorVue.base = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【已保荐项目列表】////////////////////////////////////////////////////////////
    ajaxGetBody("/sponsor/front/sponsored.list", {"language": language, "sponsorId": sponsorId}, function (successData) {
        sponsorVue.sponsoredList = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【已上市项目列表】////////////////////////////////////////////////////////////
    ajaxGetBody("/sponsor/front/listed.list", {"language": language, "sponsorId": sponsorId}, function (successData) {
        sponsorVue.listedList = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【投资人团队】////////////////////////////////////////////////////////////
    ajaxGetBody("/sponsor/front/team.list", {"language": language, "sponsorId": sponsorId}, function (successData) {
        sponsorVue.team = successData;
    });
});