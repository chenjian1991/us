<template>
    <div class="myKoreaMining">
        <mining-common link="miningKorea" :linkText="$t('backmininghome')" @quoteValue="getQuoteValue"></mining-common>
        <section class="myearnings_section">
            <div class="myearnings">
                <div class="title">{{$t('myminingincome')}} </div>
                <ul class="charts">
                    <li class="charts_li">
                        <div class="charts_title">
                            <span>{{$t('totalminingincome')}}:</span>
                            <span>{{totalMoney}} FF≈{{totalUSDT || '--'}}USDT</span>
                        </div>
                        <div class="charts_div">
                            <Tooltip trigger="hover" :content="progressTotalObj.personPercent"  placement="top" popper-class="person">
                                <div class="person" :style="{'width':progressTotalObj.personWidth}"></div>
                            </Tooltip>
                            <Tooltip trigger="hover" :content="progressTotalObj.teamPercent" placement="top" popper-class="team">
                                <div class="team" :style="{'width':progressTotalObj.teamWidth}"></div>
                            </Tooltip>
                            <Tooltip trigger="hover" :content="progressTotalObj.invitePercent" placement="top" popper-class="invite">
                                 <div class="invite" :style="{'width':progressTotalObj.inviteWidth}"></div>
                            </Tooltip>
                        </div>
                    </li>
                     <li class="charts_li">
                        <div class="charts_title">
                            <span>{{$t('todayminingincome')}}:</span>
                            <span>{{todayMoney}} FF≈{{todayUSDT || '--'}}USDT</span>
                        </div>
                        <div class="charts_div">
                            <Tooltip trigger="hover" :content="progressTodayObj.personPercent" placement="top" popper-class="person">
                                <div class="person" :style="{'width':progressTodayObj.personWidth}"></div>
                            </Tooltip>
                            <Tooltip trigger="hover" :content="progressTodayObj.teamPercent" placement="top" popper-class="team">
                                <div class="team" :style="{'width':progressTodayObj.teamWidth}"></div>
                            </Tooltip>
                            <!-- <Tooltip trigger="hover" :content="'30%'" placement="top" popper-class="invite">
                                 <div class="invite" style="width:30px"></div>
                            </Tooltip> -->
                        </div>
                    </li>
                     <li class="todayData">
                        <div class="today_title">
                            <div>{{$t('todayminingreturn')}}:</div>
                            <!-- 今日挖坑收益 -->
                            <div >{{todayAddition}}%</div>
                        </div>
                        <div class="img"></div>
                    </li>
                </ul>
                <div class="explain">
                        <div>• {{$t('miningrule1')}}</div>
                        <ul>
                            <li>
                                •&nbsp;<div></div>
                                {{$t('individualmining')}}
                            </li>
                            <li>
                                <div class="team"></div>
                                {{$t('teammining')}}
                            </li>
                            <li>
                                <div class="invite"></div>
                                {{$t('lotterymining')}}
                            </li>
                        </ul>
                </div>
                <ul class="share_box">
                    <li>{{$t('shareto')}} </li>
                    <li><a class="facebook" href="javascript:window.open('http://www.facebook.com/sharer.php?u=https://www.55.com/#/home&t='+encodeURIComponent(document.title),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)"> </a></li>
                    <li><a class="twitter" href="javascript:window.open('http://twitter.com/home?status=https://www.55.com/#/home'+encodeURIComponent(document.title),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)"> </a></li>
                    <!-- <li><a class="ins" href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)"> </a></li> -->
                    <!-- <li><a class="naver" href="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title),'_blank','toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350');void(0)"> </a></li> -->
                </ul>
            </div>
        </section>
        <!-- 个人挖矿 -->
        <section class="table_section">
            <div class="table_header">
                <div class="title">{{$t('individualmining')}}</div>
                <div>
                    <router-link class="mining_btn" :to="{path:'/exchange',query: {site: 'B',symbol:'BTCUSDT'}}">{{$t('purchaseasmining')}}</router-link>
                </div>
            </div>
             <Table :columns="personColumn" :data="personData" stripe :border="false"></Table>
             <div class="table_footer">
                 <div class="footer_text">
                    <div>
                        • {{$t('miningrule3')}}
                    </div>
                 </div>      
                 <div class="footer_page">
                      <Page :total="personPageTotal" on-change="personPageChange"/>
                 </div>
             </div>
        </section>
        <!-- 组队挖矿 -->
        <section class="table_section">
             <div class="question_box">
                <Poptip trigger="hover">
                    <i class="fa fa-question-circle question"></i> 
                    <div class="question_dialog" slot="content">
                        <div>
                            <span>{{$t('invitednumber')}}(x)</span>
                            <span>{{$t('extrabonus')}}</span>
                        </div>
                        <div>
                            <span>x≤5</span>
                            <span>5%</span>
                        </div>
                        <div>
                            <span>5&ltx≤30</span>
                            <span>8%</span>
                        </div>
                        <div>
                            <span>x&gt;30</span>
                            <span>10%</span>
                        </div>
                    </div>
                </Poptip>
             </div>
            <div class="table_header">
                <div class="title">{{$t('teammining')}}</div>
                <div class="header_btns">
                    <router-link to='/groupDetail' class="mining_btn mining_active">{{$t('moreteamdetail')}}</router-link>
                    <!-- <router-link to='/groupDetail' class="mining_btn">邀请组队</router-link> -->
                     <router-link to='/invite' class="mining_btn">{{$t('inviteteam')}}</router-link>
                </div>
            </div>
             <Table :columns="teamColumn" :data="teamData" stripe :border="false"></Table>
             <div class="table_footer">
                 <div class="footer_text">
                    <div>
                        • {{$t('miningrule22')}}
                    </div>
                    <div>
                        • {{$t('miningrule3')}}
                    </div>
                 </div>
                 <div class="footer_page">
                      <Page :total="teamPageTotal" on-change="teamPageChange"/>
                 </div>
             </div>
        </section>
        <!-- 邀请活动 -->
        <section class="table_section">
            <div class="table_header">
                <div class="title">{{$t('lotterymining')}}</div>
                <div>
                     <router-link to='/invite' class="mining_btn">{{$t('inviteteam')}}</router-link>
                    <!-- <router-link to='/groupDetail' class="mining_btn">邀请组队</router-link> -->
                    <!-- <a :href="inviteLink" class="mining_btn">{{$t('inviteteam')}}</a> -->
                </div>
            </div>
             <Table :columns="inviteColumns" :data="inviteData" stripe :border="false"></Table>
             <div class="table_footer">
                 <div class="footer_text">
                    <div>
                         <!-- • 邀请奖励请加入官方群联系客服领取  -->
                    </div>
                 </div>
                 <div class="footer_page">
                      <Page :total="invitePageTotal" on-change="invitePageChange"/>
                 </div>
             </div>
        </section>
    </div>
</template>

<script>
    import miningCommon from '@/components/miningCommon.vue'
    import momentZone from 'moment-timezone'
    import Cookies from 'js-cookie';
    import {Exchange} from '@/interface/exchange.js'
    import {BigNumber} from 'bignumber.js';
    import { subNumberPoint } from '@/lib/utils.js'
    import {
      listTop,
      queryInviteUrl
    } from '_api/miningKo.js'
    export default {
        data() {
            return {
                FF_price:'',
                totalMoney:'0',
                todayMoney:'0',
                totalUSDT:'0.00',
                todayUSDT:'0.00',
                personPage:1,
                personPageTotal:1,
                teamPage:1,
                teamPageTotal:1,
                invitePage:1,
                invitePageTotal:1,
                limit:5,
                todayAddition:'--',
                personColumn: [
                    {
                        title: 'clearingDate',
                        key: 'clearingDate',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('date'))
                        },
                        render:(h,params) => {
                            return h('div',{},momentZone(params.row.clearingDate).tz('Asia/Seoul').format('MM-DD'))
                        }
                    },
                    {
                        title: 'todayMiningAmount',
                        key: 'todayMiningAmount',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('amountmined'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.todayMiningAmount),2))
                        }
                    },
                    {
                        title: 'accumulateMiningAmount',
                        key: 'accumulateMiningAmount',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('culmulativeamountmined'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.accumulateMiningAmount),2))
                        }
                    }
                ],
                teamColumn: [
                    {
                        title: 'Name',
                        key: 'name',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('date'))
                        },
                        render:(h,params) => {
                            return h('div',{},momentZone(params.row.clearingDate).tz('Asia/Seoul').format('MM-DD'))
                        }
                    },
                        {
                            title: 'teamMiningCount',
                            key: 'teamMiningCount',
                            align:'center',
                            width:210,
                            renderHeader: (h) => {//当日组队挖矿人数
                                return h('div', {},this.$t('teamtotalmining'))
                            }
                        },
                    {
                        title: 'teamAmount',
                        key: 'teamAmount',
                        align:'center',
                        renderHeader: (h) => {
                            //当日组队挖矿总额
                            return h('div', {},this.$t('teamminingtotalamount'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.teamAmount),2))
                        }
                    },
                    {
                        title: 'addition',
                        key: 'addition',
                        align:'center',
                        renderHeader: (h) => {
                            //加成
                            return h('div', {},this.$t('teamaddson'))
                        },
                        render:(h,params) => {
                            return h('div',{},Number(params.row.addition)*100+'%')
                        }
                    },
                    // {
                    //     title: 'teamMemberCount',
                    //     key: 'teamMemberCount',
                    //     align:'center',
                    //     renderHeader: (h) => {
                    //         return h('div', {},this.$t('teamtotal'))
                    //     }
                    // },
                    {
                        title: 'teamIncoming',
                        key: 'teamIncoming',
                        align:'center',
                        renderHeader: (h) => {
                            //当日组队挖矿
                            return h('div', {},this.$t('todayteammining'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.teamIncoming),2))
                        }
                    },
                    {
                        title: 'accumulateIncoming',
                        key: 'accumulateIncoming',
                        align:'center',
                        renderHeader: (h) => {
                            //累计挖矿
                            return h('div', {},this.$t('culmulativeamountmined'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.accumulateIncoming),2))
                        }
                    }
                ],
                inviteColumns: [
                    {
                        title: 'clearingDate',
                        key: 'clearingDate',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('date'))
                        },
                        render:(h,params) => {
                            return h('div',{},momentZone(params.row.clearingDate).tz('Asia/Seoul').format('MM-DD'))
                        }
                    },
                    {
                        title: 'bonusAmount',
                        key: 'bonusAmount',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('totalbonuspool'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.bonusAmount),2))
                        }
                    },
                    {
                        title: 'validInviteMemberCount',
                        key: 'validInviteMemberCount',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('qulifiedminerinvited'))
                        }
                    },
                    {
                        title: 'reward',
                        key: 'reward',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('winner'))
                        },
                        render:(h,params) => {
                            return h('div',{},subNumberPoint(Number(params.row.reward),2))
                        }
                    }
                ],
                personData: [],
                teamData: [],
                inviteData: [],
                progressTotalObj:{
                    personPercent:'--',
                    personWidth:'',
                    teamPercent:'--',
                    teamWidth:'',
                    invitePercent:'--',
                    inviteWidth:''
                },
                progressTodayObj:{
                    personPercent:'--',
                    personWidth:'',
                    teamPercent:'--',
                    teamWidth:''
                },
                userCode:'',
                inviteLink:''

            }
        },
        methods: {
            personPageChange(currentPage){
                this.personPage = currentPage
                this.initPersonListData();
            },
            teamPageChange(currentPage){
                this.teamPage = currentPage
                this.initTeamListData()
            },
            invitePageChange(currentPage){
                this.invitePage = currentPage
                this.initInviteListData()
            },
            //FFUSDT
            getQuoteValue(obj){
                this.FF_price = obj.last
            },
            //查询收益
            initIncomingData() {
                 this.exchange.getIncoming(data => {
                  //买入挖矿收益率
                    this.todayAddition = (Number(data.todayAddition)+1.2).toFixed(0)*100
                    //总收益进度条
                    let allEarn = Number(data.accumulatePersonal) +  Number(data.accumulateTeam) +  Number(data.accumulateBonus)
                    let todayEarn = Number(data.todayPersonal) +  Number(data.todayTeam)
                    this.totalMoney = subNumberPoint(Number(allEarn),2);
                    this.todayMoney = subNumberPoint(Number(todayEarn),2)

                    let personData = new BigNumber(data.accumulatePersonal).dividedBy(new BigNumber(allEarn)).toFixed(2)
                    let teamData = new BigNumber(data.accumulateTeam).dividedBy(new BigNumber(allEarn)).toFixed(2)
                    let inviteData = new BigNumber(data.accumulateBonus).dividedBy(new BigNumber(allEarn)).toFixed(2)

                    this.progressTotalObj.personPercent = personData*100+'%'
                    this.progressTotalObj.personWidth = (320*personData).toFixed(0)+'px'
                    this.progressTotalObj.teamPercent = teamData*100+'%'
                    this.progressTotalObj.teamWidth = (320*teamData).toFixed(0)+'px'
                    this.progressTotalObj.invitePercent = inviteData*100+'%'
                    this.progressTotalObj.inviteWidth= (320*inviteData).toFixed(0)+'px'

                    //今日收益进度条
                    let todaypersonData = new BigNumber(data.todayPersonal).dividedBy(new BigNumber(todayEarn)).toFixed(2)
                    let todayteamData = new BigNumber(data.todayTeam).dividedBy(new BigNumber(todayEarn)).toFixed(2)

                    this.progressTodayObj.personPercent = todaypersonData*100+'%'
                    this.progressTodayObj.personWidth = (320*todaypersonData).toFixed(0)+'px'
                    this.progressTodayObj.teamPercent = todayteamData*100+'%'
                    this.progressTodayObj.teamWidth = (320*todayteamData).toFixed(0)+'px'
                 })
            },
            //查询个人挖矿记录列表
            initPersonListData(){
                this.exchange.getListPersonal({page:this.personPage,limit:this.limit},data =>{
                    this.personData = data.data
                    this.personPageTotal = data.pages
                })
            },
            //查询团队挖矿记录列表
            initTeamListData(){
                this.exchange.getListTeam({page:this.teamPage,limit:this.limit},data =>{
                    this.teamData = data.data
                    this.teamPageTotal = data.pages
                })
            },
            //查询邀请挖矿记录列表
            initInviteListData(){
                this.exchange.getListBonus({page:this.invitePage,limit:this.limit},data =>{
                    this.inviteData = data.data
                    this.invitePageTotal = data.pages
                })
            },
        },
        watch:{
            FF_price(){
                this.totalUSDT = new BigNumber(this.totalMoney=="--"?0:this.totalMoney).multipliedBy(new BigNumber(this.FF_price)).toFixed(2)
                this.todayUSDT = new BigNumber(this.todayMoney=="--"?0:this.todayMoney).multipliedBy(new BigNumber(this.FF_price)).toFixed(2)
            }
        },
        components: {'mining-common': miningCommon},
        destroyed() {
            this.exchange = null
        },
        mounted(){
            let loginToken = Cookies.get('loginToken');
            var ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            // //登录以后查询资产 挂单 成交记录
            if(loginToken){
                this.exchange.ssoProvider.getSsoToken = function (fn) {
                    fn(loginToken);
                }.bind(this);
                this.initIncomingData()
                this.initPersonListData()
                this.initTeamListData()
                this.initInviteListData()
            }else{
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang='less'>
.myKoreaMining{
    .ivu-page-item-active{
        background: #12869A;
        border-color:none;
        color: #fff;
    }
    .ivu-table-wrapper{
        border: none;
    }
    .ivu-page-item-active{
        border-color: #12869A;
        a{
        color: #fff;
        }
    }
    .ivu-table td, .ivu-table th{
        border:none;
    }
    .ivu-table:before{
        height: 0px;
    }
    .ivu-table:after{
        width: 0px;
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n+1) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n+1) td{
        background-color: #F6FAFA;
    }
    .ivu-table th{
        background-color: #fff;
        border-top:1px solid #F5F5F5;

    }
    .question_box{
        .ivu-poptip-popper{
            .ivu-poptip-content{
                background-color: #12869A;
            }
            .ivu-poptip-arrow:after{
                border-top-color:#12869A !important;
            }
            .ivu-poptip-inner{
                 background-color: #12869A;
            }
        }
    }
}
</style>

<style scoped lang="less">
.myKoreaMining{
    .myearnings_section{
        width: 100%;
        height: 484px;
        background-color: #F6FAFA;
        .myearnings{
            width: 1200px;
            margin:0 auto;
            .title{
                font-size:30px;
                padding:70px 0;
                // font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(52,72,87,1);
                text-align: center;
            }
            .charts{
                display: flex;
                justify-content: space-between;
                li{
                    width: 380px;
                    height: 110px;
                    margin-right:30px;
                    
                    padding:30px;
                    background-color: #fff;
                    &:last-child{
                        margin-right: 0;
                    }
                }
                .todayData{
                    display: flex;
                    justify-content: space-between;
                    .today_title{
                        display:flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 16px;
                        color: #000;
                        div{
                            &:last-child{
                                color: #2199AE;
                                font-size:20px;
                            }
                        }
                    }
                    .img{
                        width: 51px;
                        height: 43px;
                        background: url('../../assets/images/miningKo/todaymining.png');
                        background-size: 51px 43px;
                    }
                }
                .charts_li{
                    .charts_title{
                        display: flex;
                        justify-content: space-between;
                        span{
                            font-size: 14px;
                            &:nth-child(1){
                                color:#000;
                            }
                            &:nth-child(2){
                                color:#2199AE;
                            }
                        }
                    }
                    .charts_div{
                        width: 320px;
                        height: 16px;
                        display: flex;
                        margin-top: 18px;
                        background-color:#d9e3e7;
                        div{
                            height: 100%;
                            &:nth-child(1){
                                background: #2199AE
                            }
                            &:nth-child(2){
                                background: #21AE77
                            }
                            &:nth-child(3){
                                background: #427188
                            }
                        }
                    }
                }
            }
            // 挖矿比例说明
            .explain{
               font-size:12px;
               color: #949DA6;
               margin-top:49px;

                ul{
                    margin-top:8px;
                    display:flex;
                    li{
                        display: flex;
                        align-items: center;
                        padding-right:30px;
                        div{
                            width: 10px;
                            height: 10px;
                            margin-right: 5px;
                            background-color: #2199AE;
                        }
                        .team{
                            background-color: #21AE77;
                        }
                        .invite{
                            background-color: #427188;
                        }
                    }
                }
            }
            //分享的链接
            .share_box{
                color:#949DA6;
                font-size:12px;
                margin-top:30px;
                display:flex;
                li{
                    display:flex;
                    align-items:center;
                    &:nth-child(1){
                        padding-right:9px;
                    }
                    a{
                        display:block;
                        width:22px;
                        height:22px;
                        margin-right:10px;
                    }
                }
                .facebook{
                    background: url('../../assets/images/miningKo/facebook.png');
                    background-size: 22px 22px;
                    &:hover{
                        background: url('../../assets/images/miningKo/facebook_active.png');
                        background-size: 22px 22px;
                    }
                }
                .twitter{
                    background: url('../../assets/images/miningKo/twitter.png');
                    background-size: 22px 22px;
                    &:hover{
                        background: url('../../assets/images/miningKo/twitter_active.png');
                        background-size: 22px 22px;
                    }
                }
                .ins{
                    background: url('../../assets/images/miningKo/ins.png');
                    background-size: 22px 22px;
                    &:hover{
                        background: url('../../assets/images/miningKo/ins_active.png');
                        background-size: 22px 22px;
                    }
                }
                .naver{
                    background: url('../../assets/images/miningKo/naver.png');
                    background-size: 22px 22px;
                    &:hover{
                        background: url('../../assets/images/miningKo/naver_active.png');
                        background-size: 22px 22px;
                    }
                }
            }
        }
    }
    .table_section{
        width: 1200px;
        min-height: 200px;
        margin: 70px auto 0;
        position: relative;
        &:last-child{
            margin-bottom:91px;
        }
        .question_box{
            position: absolute;
            top:60px;
            right:455px;
            z-index: 2000;
            .question{
                font-size:16px;
                color:#12869A;
            }
            .question_dialog{
                width:200px;
                background-color:#12869A;
                div{
                    display:flex;
                    justify-content: space-around;
                    color: #E7EAED;
                    font-size:12px;
                }
                
            }
        }
        .mining_btn{
            display: flex;
            height: 36px;
            padding:11px 22px;
            justify-content: center;
            align-items: center;
            background: #12869A;
            color: #fff;
            font-size:14px;
            &:hover{
                background-color:#108093;
                color:#fff;
            }
        }
        .mining_active{
            .mining_btn;
            background:#fff;
            border:1px solid #12869A;
            color:#12869A;
            margin-right:20px;

        }
        .table_header{
            display: flex;
            justify-content: space-between;
            padding-bottom:12px;
            .title{
                font-size:16px;
                color:#344857;
            }
            .header_btns{
                display:flex;
                a{
                    display:flex;
                }
            }
        }
        .table_footer{
            display: flex;
            justify-content: space-between;
            padding-top:30px;
            font-size:12px;
            color: #949DA6;
        }

    }
}
</style>