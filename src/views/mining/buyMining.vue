<template>
   <div class="wrapper">
      <div class="banner-box">
         <img :src="imgSrc" class="imgBanner">
         <div class="banner-text">
            <h2>{{$t('MiningBuying')}}</h2>
            <h3>{{$t('MiningBackToBuyer')}}</h3>
         </div>
      </div>

      <div class="floatingLayer">
         <ul class="layerList">
            <li v-for="(item, index) in layerItems" class="layerItem">
               <img :src=item.layerImg class="layerImg">
               <h2 class="layerData">{{item.layerData}}&nbsp;{{item.currency}}</h2>
               <p class="layerText">{{$t(item.layerText)}}</p>
            </li>
         </ul>
      </div>
      <div class="below">
         <div class="below-content">
            <div class="below-up below-common">
               <h3 class="title">{{$t('MiningMyMining')}}</h3>
               <!--我的挖矿 未登录-->
               <div class="below-box no-login" v-if="!login">
                  <Row>
                     <Col span="12">{{$t('MiningTip')}}</Col>
                     <Col span="12" align="right">
                        <router-link to='/login'>
                           <Button type="primary" class="login-btn">{{$t('MiningLogIn')}}</Button>
                        </router-link>
                        {{$t('MiningNoAccount')}}
                        <router-link to='/register'>{{$t('MiningSignUp')}}</router-link>
                     </Col>
                  </Row>
               </div>
               <div class="below-box below-up-content" v-if="login" v-model="miningDate"><!--绑定挖矿数据-->
                  <div class="pool">
                     <div class="pool-title">{{$t('MiningShortPool')}}</div>
                     <Row class="export">
                        <Col span="12">{{$t('MiningMyOutputYesterday')}}
                           <strong>{{miningDate.mineYesterday_FF}}</strong>FF
                        </Col>
                        <Col span="12" align="right">{{$t('MiningCumulativeOutput')}} <strong>{{miningDate.mineCumulative_FF}}</strong>FF
                        </Col>
                     </Row>
                  </div>
                  <div class="pool long-pool">
                     <div class="pool-title">{{$t('MiningLongPool')}}</div>
                     <Row class="export long">
                        <Col span="12">{{$t('MiningYesterdayValuation')}} <strong>{{miningDate.mineValuationYesterday_USDT}}</strong>USDT
                        </Col>
                        <Col span="12" align="right">{{$t('MiningCumulativeValuation')}} <strong>{{miningDate.mineValuationCumulative_USDT}}</strong>USDT
                        </Col>
                        <!--转入交易页路由方式-->
                        <Button type="primary" class="mining-btn">
                           <router-link v-bind="{to:'/exchange?symbol='+'FFUSDT'}">
                              {{$t('MiningGoMining')}}
                           </router-link>
                        </Button>
                     </Row>
                  </div>
               </div>
            </div>
            <div class="below-middle below-common" v-if="login" id="recode">
               <h3 class="title">{{$t('MiningRecords')}}</h3>
               <Select v-model="model1" style="width:222px" size="large" class="timeList" @on-change="changeTime">
                  <Option v-for="item in timeList" :value="item.value" :key="item.value">{{$t(item.label)}}</Option>
               </Select>
               <!--买入挖矿记录-->
               <Table :columns="columns1" :data="data1" class="miningRecord"
                      :row-class-name="rowClassName"></Table>
               <div class="below-box below-up-content">
                  <page :totalPage="totalPage" @changePageFn="changePage" class="page"></page>
               </div>
            </div>
            <div class="below-down below-common">
               <h3 class="title">{{$t('MiningRuleDescription')}}</h3>
               <div class="below-box activityRules">
                  <p>{{$t('MiningRule')}}</p>
                  <ul class="activityRulesList">
                     <li v-for="(item, index) in operationalRulesItem" class="activityRulesItem">{{$t(item.message)}}
                     </li>
                  </ul>
                  <p>{{$t('MiningReturn')}}</p>
                  <ul class="activityRulesList">
                     <li v-for="(item, index) in returnMethodItem" class="activityRulesItem">{{$t(item.message)}}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import page from '@/components/page'
   import {Exchange} from '@/interface/exchange.js'
   import {
      getAccountInfo,
      getActivityList,
   } from '_api/exchange.js'
   import {
      getPlatform
   } from '_api/mining.js'
   import moment from 'moment'
   import Cookies from 'js-cookie'
   import {
      storage
   } from '@/lib/utils.js'

   export default {
      name: "buyMining",
      components: {
         page
      },
      data() {
         return {
            login: true,
            totalPage: 1,
            model1: this.$t('MiningSevenDays'),
            exchange: null,
            miningDate: '',
            imgSrc: require('../../assets/images/mining/mining_bg.png'),
            endTimeDate: new Date().getTime(),
            startTimeDate: new Date().getTime() - 7 * 24 * 3600 * 1000,
            layerItems: [//浮层图片
               {
                  layerImg: require('../../assets/images/mining/transaction.png'),
                  layerData: '',
                  currency: 'FF',
                  layerText: 'MiningOutputYesterday'
               },
               {
                  layerImg: require('../../assets/images/mining/currency.png'),
                  layerData: '',
                  currency: 'FF',
                  layerText: 'MiningFFTradeVolume'
               },
               {
                  layerImg: require('../../assets/images/mining/mining.png'),
                  layerData: '',
                  currency: 'USDT',
                  layerText: 'MiningTotalYesterday'
               }
            ],
            data1: [],
            operationalRulesItem: [
               {message: 'MiningDescription1'},
               {message: 'MiningDescription2'},
               {message: 'MiningDescription3'},
            ],
            returnMethodItem: [
               {message: 'MiningMethod1'},
               {message: 'MiningMethod2'},
               {message: 'MiningMethod3'},
               {message: 'MiningMethod4'},

            ]
         }
      },
      methods: {
         init(currentPage = 1) {
            //创建实例
            let loginToken = Cookies.get('loginToken')
            var ssoProvider = {};
            this.exchange = new Exchange(ssoProvider);
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               if (loginToken) {
                  fn(loginToken);
               }
            };
            this.login = loginToken ? true : false//是否登录
            //平台
            getPlatform().then((res) => {
               this.layerItems[0]['layerData'] = res['lastMining'].toFixed(8)
               this.layerItems[1]['layerData'] = res['platformAvailableAmount'].toFixed(8)
               this.layerItems[2]['layerData'] = res['transactionConvert'].toFixed(2)
            })

            //我的挖矿 返还池
            this.exchange.queryRewardFilledBuyBrief((res) => {
               this.miningDate = res
            })

            if (this.model1 === '最近7天' || this.model1 === 'Last 7 days') {
               this.startTimeDate = new Date().getTime() - 7 * 24 * 3600 * 1000
            } else if (this.model1 === '最近30天' || this.model1 === 'Last 30 days') {
               this.startTimeDate = new Date().getTime() - 30 * 24 * 3600 * 1000

            } else if (this.model1 === '最近180天' || this.model1 === 'Last 180 days') {
               this.startTimeDate = new Date().getTime() - 180 * 24 * 3600 * 1000

            } else if (this.model1 === '最近365天' || this.model1 === 'Last 365 days') {
               this.startTimeDate = new Date().getTime() - 365 * 24 * 3600 * 1000
            }

            //买入挖矿记录
            this.exchange.activityList('INCOMING', 'REWARD_FILLED_BUY', 'COMPLETED', this.startTimeDate,this.endTimeDate, currentPage, 10, (res) => {
               this.data1 = res.data
               this.totalPage = res.pages
            })
         },

         changePage(currentPage) {//分页
            this.init(currentPage)
         },
         changeTime() {
            this.init()
         },
         rowClassName() {//table行样式
            return 'td-buyMining';
         },

      },
      mounted() {
         this.init()
      },
      computed: {
         changeLanguage() {
            //只需要在这里给tableTitle重新赋值一下就行。
            this.columns1 = [//记录table
               {
                  title: this.$t('MiningType'),
                  key: 'currency',
                  className: 'th-buyMining'
               },
               {
                  title: this.$t('MiningAmount'),
                  key: 'amount',
                  align: 'center',
                  className: 'th-buyMining'
               },
               {
                  title: this.$t('MiningDate'),
                  key: 'updatedAt',
                  align: 'right',
                  className: 'th-buyMining',
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['updatedAt']).format('YYYY-MM-DD HH:mm'))
                  }
               }
            ]
            //时间选择
            this.timeList = [
               {
                  value: this.$t('MiningSevenDays'),
                  label: this.$t('MiningSevenDays')
               },
               {
                  value: this.$t('MiningThirtyDays'),
                  label: this.$t('MiningThirtyDays')
               },
               {
                  value: this.$t('MiningSixMonths'),
                  label: this.$t('MiningSixMonths')
               },
               {
                  value: this.$t('MiningOneYear'),
                  label: this.$t('MiningOneYear')
               }
            ]
            //选中的值转换多语言的字段
            if (this.model1 === '最近7天' || this.model1 === 'Last 7 days') {
               this.model1 = this.$t('MiningSevenDays')
            } else if (this.model1 === '最近30天' || this.model1 === 'Last 30 days') {
               this.model1 = this.$t('MiningThirtyDays')

            } else if (this.model1 === '最近180天' || this.model1 === 'Last 180 days') {
               this.model1 = this.$t('MiningSixMonths')

            } else if (this.model1 === '最近365天' || this.model1 === 'Last 365 days') {
               this.model1 = this.$t('MiningOneYear')
            }

         }
      },
      watch: {
         'columns1': function (oldV, newV) {
            storage.set('columns1', this.columns1)
            this.locale = this.$store.state.app.countryLanguage == 'zh-CN' ? 'zh' : 'en'
         },
         'timeList': function (oldV, newV) {
            storage.set('timeList', this.timeList)
            this.locale = this.$store.state.app.countryLanguage == 'zh-CN' ? 'zh' : 'en'
         },
         'model1': function (oldV, newV) {
            storage.set('model1', this.model1)
            this.locale = this.$store.state.app.countryLanguage == 'zh-CN' ? 'zh' : 'en'
         },
         changeLanguage: function (newV, oldV) {
            if (newV === 'zh-CN') {
               this.locale = 'zh'
            } else {
               this.locale = 'en'
            }
            storage.set('columns1', this.columns1)
            storage.set('timeList', this.timeList)
            storage.set('model1', this.model1)
         },
      },
   }
</script>
<style lang="less">
   @import "./common.less";
</style>
<style lang="less" scoped>
   .wrapper {
      position: relative;
      width: 100%;
      background-color: #F2F3F8;
      font-family: PingFangSC-Regular;
      .banner-box {
         .imgBanner {
            display: block;
            width: 100%;
            min-width: 1200px;
            height: 366px;
         }
         .banner-text {
            position: absolute;
            top: 94px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            text-align: center;
            h2 {
               font-size: 38px;
            }
            h3 {
               font-size: 32px;
               margin-top: 15px;
            }
         }
      }
      .floatingLayer {
         position: absolute;
         top: 272px;
         width: 1200px;
         left: 50%;
         transform: translateX(-50%);
         .layerList {
            display: flex;
            justify-content: space-between;
            .layerItem {
               width: 380px;
               height: 227px;
               background-color: #fff;
               text-align: center;
               border-radius: 6px;
               border: 1px solid #E4E4E4;
               box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.05);
               .layerImg {
                  margin-top: 36px;
               }
               .layerData {
                  font-size: 20px;
                  color: #333;
                  margin-top: 22px;
               }
               .layerText {
                  font-size: 15px;
                  color: #666;
               }
            }
         }
      }

      .below {
         width: 100%;
         padding: 1px auto 47px;
         margin-top: 160px;
         background-color: #FFF;
         .below-content {
            width: 1200px;
            margin: 0 auto 21px;
            padding-bottom: 26px;
            .below-common {
               clear: both; //Row 浮动 要清除
               .title {
                  height: 55px;
                  line-height: 55px;
                  font-size: 20px;
                  color: #333;
                  border-bottom: solid 1px #D9D9D9;
                  margin-bottom: 29px;
                  &:before {
                     content: '';
                     border-left: solid 1px #0092FF;
                     margin-right: 13px;
                  }
               }
               .below-box {
                  border: 1px solid #D9D9D9;
                  padding: 0 35px 0 15px;
                  margin-bottom: 30px;

               }
            }
            .below-up {
               .no-login {
                  height: 100px;
                  line-height: 100px;
                  font-size: 16px;
                  color: #333;
                  .login-btn {
                     padding: 8px 33px;
                     border-radius: 3px;
                     font-size: 16px;
                     color: #fff;
                     margin-right: 30px;
                  }
                  a {
                     color: #0092FF;
                  }
               }
               .below-up-content {
                  padding: 0;
                  .pool {
                     .pool-title {
                        width: 1198px;
                        height: 44px;
                        line-height: 44px;
                        padding-left: 10px;
                        background: #F2F3F8;
                        font-size: 16px;
                        color: #666;
                        border-bottom: solid 1px #D9D9D9;
                     }
                  }
                  .export {
                     padding: 47px 85px;
                     font-size: 16px;
                     color: #666;
                     strong {
                        color: #333;
                        margin: 0 30px;
                     }
                     .mining-btn {
                        display: block;
                        width: 319px;
                        height: 44px;
                        font-size: 15px;
                        margin: 77px auto 0;
                        a {
                           display: block;
                           width: 100%;
                           height: 100%;
                           color: #fff;
                           line-height: 31px;
                        }
                     }
                  }
                  .long-pool {
                     border-top: solid 1px #D9D9D9;
                  }
                  .long {
                     padding: 47px 85px 23px;
                  }
               }
            }
            .below-middle {
               position: relative;
               .below-box {
                  border-top-color: transparent; //page里ul有margin 所有边框线不能没 只能颜色变透明
               }
               .timeList {
                  position: absolute;
                  right: 0;
                  top: 5px;
               }
               .page {
                  margin: 32px 42px 24px 0;
               }
            }
            .below-down {
               .activityRules {
                  padding-top: 13px;
                  .activityRulesList {
                     margin-bottom: 16px;
                     .activityRulesItem {
                        font-size: 14px;
                        line-height: 36px;
                        color: #666;
                     }
                  }
                  p {
                     font-size: 16px;
                     margin-bottom: 2px;
                  }
               }
            }
         }
      }
   }

</style>
