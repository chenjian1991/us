$(function () {
    var language = $.getUrlParam("language");
    var supervisionId = $.getUrlParam("supervisionId");
    var supervisionVue = new Vue({
        el: ".supervision-body-div",
        data: {
            language: language,
            supervisionId: supervisionId,
            base: {},
            transaction: {},
            total: Number(0),
            milestone: {},
            github: {},
            community: {},
            sponsors: {},
            reportAndProduct: {},
            investorTeam: {},
            progress: {},
            activity: {},
            news: {},
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
    ajaxGetBody("/supervision/front/query.base", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.base = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【交易】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.transaction", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.transaction = successData;
        var amount = Number(successData.amount);
        var price = Number(successData.price);
        supervisionVue.total = amount.mul(price);
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【里程】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.milestone", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.milestone = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【代码仓库】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.github", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.github = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【社区热度】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.community", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.community = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【保荐人列表】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/sponsors", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.sponsors = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【报告和应用】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.reportAndProduct", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.reportAndProduct = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【投资人团队】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.investorTeam", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.investorTeam = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【项目进度】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.progress", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.progress = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【项目活动】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.activity", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.activity = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【项目新闻】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.news", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.news = successData;
    });
    ////////////////////////////////////////////////////////////【风雪白熊】【项目团队】////////////////////////////////////////////////////////////
    ajaxGetBody("/supervision/front/query.team", {"language": language, "supervisionId": supervisionId}, function (successData) {
        supervisionVue.team = successData;
    });
});