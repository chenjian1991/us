<template>
   <div id='groupDetail' class="wrapper">
      <mining-common link="myMining" :linkText="$t('viewmymining')" @quoteValue="getQuoteValue"></mining-common>
      <section>
          <div class="my-mining">
              <div class="title">{{$t('mymining')}}</div>
              <div>
                  <ul class="ming-ul">
                      <li>
                          <span>{{$t('totalminerinvited')}}</span>
                          <span>{{count}}<em></em></span>
                      </li>
                        <li>
                          <span>{{$t('todayqualifiedminer')}}</span>
                          <span>{{effectMingPeople}}<em></em></span>
                      </li>
                        <li>
                          <span>{{$t('teamaddson1')}}</span>
                          <span>{{additionPercent}}<em>%</em></span>
                      </li>

                      <li>
                          <div>
                              <span>{{$t('invitationlink')}}</span>
                              <input class="invite_link" type="text" :value="inviteLink">
                          </div>
                          <span  v-clipboard:copy="inviteLink"
                             v-clipboard:success="onCopy"  v-clipboard:error="onError" class="copy">{{$t('copy')}}</span>
                      </li>
                  </ul>
              </div>
              
          </div>
      </section>
      <section>
          <div class="invite-activity">
              <div class="invite-content">
                    <div class="title">{{$t('invite')}}</div>
                    <div>
                        <Table :columns="columns1" :data="data1"></Table>
                    </div>
                    <div class="page-container">
                        <Page @on-change='changePage' :total="pages" />
                    </div>
              </div>
          </div>

      </section>
      <div>
           <Modal class="group-modal"
            v-model="modal1"
            :title="this.$t('notice')"
            :ok-text="this.$t('confrim')"
            :cancel-text="this.$t('cancel')"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>{{$t('invitefriendstomining')}}</p>
            </Modal>
      </div>
        
   </div>
   
</template>

<script>
   import miningCommon from '@/components/miningCommon.vue'
   import {weakupGroupMethod} from '../../../api/exchange.js';
   import bigDecimal from 'js-big-decimal' //除法失效
    import {Exchange} from '@/interface/exchange.js'
    import Cookies from 'js-cookie';
   import moment from 'moment'
   import { Modal } from 'iview'

   import {
      queryInviteUrl
   } from '_api/miningKo.js'

   export default {
      name: "miningKorea",
      components: {'mining-common': miningCommon},
      data() {
         return {
            rate: '',
            count:0,
            pages:1,
            userCode:'',
            inviteLink:'',
            modal1:false,
            effectMingPeople:0,
            additionPercent:0,
            weakupToken:'',
              columns1: [
                    {
                        title: 'Name',
                        key: 'profilePhone',
                        renderHeader:(h,params)=>{
                            return h('div',this.$t('inviteeaccount'))
                        },
                        render:(h,params)=>{
                            return h('div',params.row.profilePhone==''||params.row.profilePhone==null?params.row.profileEmail:params.row.profilePhone)
                        }

                    },
                    {
                        title: 'GegisterDate',
                        key: 'registerDate',
                        renderHeader:(h,params)=>{
                            return h('div',this.$t('registrationdate'))
                        },
                         render:(h,params)=>{
                            return h('div',moment(params.row.registerDate).format('YYYY-MM-DD'))
                        }
                    },
                    // {
                    //     title: 'LastMiningDate',
                    //     key: 'lastMiningDate',
                    //     renderHeader:(h,params)=>{
                    //         return h('div',this.$t('lastminingtime'))
                    //     },
                    //     render:(h,params)=>{
                    //         return h('div',params.row.lastMiningDate==null||params.row.lastMiningDate==''?'--':moment(params.row.lastMiningDate).format('YYYY-MM-DD HH:mm'))
                    //     }
                       
                    // },
                       {
                        title: 'effective',
                        key: 'effective',
                        renderHeader:(h,params)=>{
                            return h('div',this.$t('qualifedtoday'))
                        },
                        render:(h,params)=>{
                            return h('div',params.row.effective==true?this.$t('yes'):this.$t('no'))
                        }
                       
                    },
                      {
                        title: 'Operate',
                        key: 'operate',
                        renderHeader:(h,params)=>{
                            return h('div',this.$t('action'))
                        },
                        render:(h,params)=>{
                            if(params.row.effective){
                                return h('div', [
                                h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#949da6',
                                    },
                                    // on: {
                                    //     click: () => {
                                    //         this.queryMiningFun(params.row.ex55Pin)
                                    //     }
                                    // }
                                },this.$t('invitenow')),
                            ]);
                            }else{
                                  return h('div', [
                                h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color:'#12869A',
                                        cursor:'pointer',
                                    },
                                    on: {
                                        click: () => {
                                            this.queryMiningFun(params.row.ex55Pin)
                                        }
                                    }
                                },this.$t('invitenow')),
                            ]);
                            }
                         
                        }
                    },
                ],
                data1: []
            }
          
         
         },
      methods: {
          ok(){
              weakupGroupMethod(this.weakupToken).then((res)=>{
                  let status = res.sendStatus;
                  if(status=='Sent'){
                    this.$Message.success(this.$t('noticesuccess'));
                  }else if(status=='Failed'){
                      this.$Message.error(this.$t('noticefail'));
                  }else if(status=='Notified'){
                        this.$Message.warning(this.$t('noticealreadysend'));
                  }
              })
          },
          cancel(){

          },
         getQuoteValue(value) {
            // console.log(value)
         },
        todayTeamListData(){//今日挖矿人数
                this.exchange.getListTeam({page:1,limit:1},data =>{
                    if(data.data[0]){
                         let date = data.data[0].clearingDate;
                        let time =  moment(date).format('YYYY-MM-DD');
                        let today = moment(new Date()).format('YYYY-MM-DD');
                        if(time==today){
                            this.effectMingPeople = data.data[0].teamMiningCount;
                            this.additionPercent = data.data[0].addition*100;
                        }else{
                            this.effectMingPeople= 0;
                            this.additionPercent = 0;
                        }
                    }
                    
                   
                })
            },
          queryMiningFun(ex55pin){
              let obj = {
                  ex55Pin:ex55pin
              }
            this.exchange.queryMingMethod(obj,data=>{
                let weakupFlag  = data.mined;
                this.weakupToken = data.token;
                if(!weakupFlag){
                    this.modal1 = true;
                }
            })
        },
         groupDeatailFun(page){
             let obj ={
                 page:page,
                 limit:10,
             }
             this.exchange.getGroupDetail(obj,data=>{
                 this.count = data.count;
                 this.pages = data.pages;
                 let arr = [];
                 data.data.forEach(element => {
                     arr.push(element); 
                 });
                 this.data1 = arr;
             })
         },
         changePage(page){
                this.groupDeatailFun(page)
         },
        onCopy: function (e) {
            this.$Message.success(this.$t('11001'));
        },
        onError(){
             this.$Message.error('error');
        },
        queryInviteUrlFun(){
            queryInviteUrl(Cookies.get('loginToken')).then((res)=>{
                this.userCode = res.data.userCode;
                this.inviteLink = 'https://www.55.com/register?invite_code='+ this.userCode;
                // let protocol = window.location.protocol;//协议
                // let host = window.location.host;//主机名+端口号
                // let targetUrl = protocol + "//" + host;
                // let ua = navigator.userAgent.toLowerCase();
                // let isWeixin = ua.indexOf('micromessenger') != -1;
                // if(isWeixin){// 如果是微信打开
                //     this.inviteLink = 'https://www.55gm.co/#/register?invite_code='+ this.userCode;
                // }else{
                //     this.inviteLink = targetUrl + "/#/register?invite_code=" + this.userCode;
                // }
                
            })
        },
          weixin(){
                let ua = navigator.userAgent.toLowerCase();
                let isWeixin = ua.indexOf('micromessenger') != -1;
                if (isWeixin) {
                    $('.weixin-tips').show()
                    $('.tips-content').show()
                }else{
                    $('.weixin-tips').hide()
                    $('.tips-content').hide()
                }
        },
       
      },
      mounted() {
            let loginToken = Cookies.get('loginToken');
             var ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            // //登录以后查询资产 挂单 成交记录
            if(loginToken){
                this.exchange.ssoProvider.getSsoToken = function (fn) {
                    fn(loginToken);
                }.bind(this);
                this.groupDeatailFun(1)
            }else{
                this.$router.push('/login')
            }
            this.queryInviteUrlFun();
            this.todayTeamListData()
            var myDate = new Date();
            console.log(moment().format('d'))
      },
      destroyed(){
          this.exchange = null
      }
   }
</script>

<style lang="less" scoped>
@import "../miningKorea/groupDetail.less";
</style>
<style lang='less'>
  .group-modal{
        .ivu-modal-body{
            p{
                font-size:16px !important;
                text-align:center;
            }
        }
        .ivu-btn-primary{
            background:#12869A;
            &:hover{
                background-color:#108093;
            }
        }
    }
    #groupDetail{
      
            .ivu-page-item-active{
            background: #12869A !important;
            border:1px solid #12869A;
            a{
                color:#fff !important;

            }
        }
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
        text-align:center;

    }
    .ivu-table td{
        text-align:center;
    }

    }

</style>