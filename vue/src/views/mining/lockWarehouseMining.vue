<template>
   <div class="wrapper">
      <div class="banner-box">
         <img :src="imgSrc" class="imgBanner">
         <div class="banner-text">
            <h2>{{$t('LockingAsEarning')}}</h2>
            <h3>{{$t('LockingLockingTip')}}</h3>
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
         <div class="below-content" id="recode">
            <div class="below-up below-common">
               <!--未登录 锁仓挖矿-->
               <Row class="export" :gutter="16">
                  <!--我要锁仓挖矿-->
                  <Col span="11" id="lock">
                     <h3 class="title">{{$t('LockingLockGain')}}</h3>
                     <div class="below-box no-login no-login-left">
                        <Row :gutter="20" class="row" type="flex" justify="space-between">
                           <Col span="6" align="right"></Col>
                           <Col span="18" align="left">
                              {{$t('LockingAvailableBalance')}} {{balance}} FF
                           </Col>
                        </Row>
                        <Row :gutter="20" class="row">
                           <Col span="6" align="right" class="label">{{$t('LockingLockVolume')}}</Col>
                           <Col span="18" align="left" class="input-box">
                              <Input v-model="value1" class="input" size="large" :placeholder="placeholder"/>
                              <div class="input-right">
                                 <span>FF</span><a class="maximum" @click="max">{{$t('LockingMax')}}</a>
                              </div>
                           </Col>
                        </Row>
                        <Row :gutter="20" class="row">
                           <Col span="6" align="right" class="label">{{$t('LockingLockCycle')}}</Col>
                           <Col span="18" align="left">
                              <Select v-model="model2" size="large">
                                 <Option v-for="item in cycleList" :value="item.value" :key="item.value">{{
                                    item.label }}
                                 </Option>
                              </Select>
                           </Col>
                        </Row>
                        <Row :gutter="20" class="row" type="flex" justify="space-between">
                           <Col span="6" align="right"></Col>
                           <Col span="18" align="left">
                              <Button type="primary" class="lock-btn" v-if="!login">
                                 <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                                 {{$t('LockingOr')}}
                                 <router-link to='/register'>{{$t('MiningSignUp')}}</router-link>
                                 {{$t('LockingLocking')}}
                              </Button>
                              <Button type="primary" class="lock-btn" v-if="login" @click="locked" :disabled="disabled">
                                 <a>{{$t('LockingLock')}}</a>
                              </Button>
                           </Col>
                        </Row>
                     </div>
                  </Col>
                  <Col span="13">
                     <h3 class="title">{{$t('LockingMyLock')}}</h3>
                     <!--我的锁仓 未登录-->
                     <div class="below-box no-login" v-if="!login">
                        <div class="center">
                           <p>
                              <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                              {{$t('LockingOr')}}
                              <router-link to='/register'>{{$t('MiningSignUp')}}</router-link>
                              {{$t('LockingViewMyLock')}}
                           </p>
                        </div>
                     </div>
                     <!--end-->
                     <!--我的锁仓 登录-->
                     <div class="below-box login" v-if="login">
                        <div class="lockedWarehouse border-right border-bottom">
                           <h3><span>{{completedLocked_FF}}</span> FF</h3>
                           <p>{{$t('LockingCompletedLock')}}</p>
                        </div>
                        <div class="lockedWarehouse border-bottom">
                           <h3><span>{{submittedLocked_FF}}</span> FF</h3>
                           <p>{{$t('LockingPendingLock')}}</p>
                        </div>
                        <div class="lockedWarehouse border-right relative">
                           <p><a>{{$t('LockingYesterdayEarnings')}}
                              <div class="yesterday">
                                 <h5>{{$t('LockingYesterdayEarnings')}}</h5>
                                 <table class="table" cellpadding="0" cellspacing="0">
                                    <tr>
                                       <th>{{$t('LockingLockcycle')}}</th>
                                       <th>{{$t('LockingLockFactor')}}</th>
                                    </tr>
                                    <tr v-for="item in rewardYesterday">
                                       <td>{{item.currency}}</td>
                                       <td>{{item.value}}</td>
                                    </tr>
                                 </table>
                              </div>
                           </a></p>
                        </div>
                        <div class="lockedWarehouse border-up-left relative">
                           <p><a>{{$t('LockingCumulativeEarnings')}}
                              <div class="yesterday">
                                 <h5>{{$t('LockingCumulativeEarnings')}}</h5>
                                 <table class="table" cellpadding="0" cellspacing="0">
                                    <tr>
                                       <th>{{$t('LockingLockcycle')}}</th>
                                       <th>{{$t('LockingLockFactor')}}</th>
                                    </tr>
                                    <tr v-for="item in rewardCumulative">
                                       <td>{{item.currency}}</td>
                                       <td>{{item.value}}</td>
                                    </tr>
                                 </table>
                              </div>
                           </a></p>
                        </div>
                     </div>
                     <!--end-->
                  </Col>
               </Row>
            </div>
            <!--活动规则-->
            <div class="below-middle below-common">
               <div class="below-box activityRules">
                  <Row class="export long" :gutter="40">
                     <Col span="12">
                        <h3 class="rule-title">{{$t('LockingInstructions')}}</h3>

                        <ul class="activityRulesList">
                           <li v-for="(item, index) in activityRulesItem1" class="activityRulesItem">
                              {{$t(item.message)}}
                           </li>
                        </ul>
                        <h3 class="rule-title">{{$t('MechanismDescription')}}</h3>

                        <ul class="activityRulesList">
                           <li v-for="(item, index) in activityRulesItem2" class="activityRulesItem">
                              {{$t(item.message)}}
                           </li>
                        </ul>
                     </Col>
                     <Col span="12" align="right">
                        <table class="table" cellpadding="0" cellspacing="0">
                           <tr>
                              <th>{{$t('LockingLockcycle')}}</th>
                              <th>{{$t('LockingLockingFactor')}}</th>
                           </tr>
                           <tr>
                              <td>10 {{$t('LockingDay')}}</td>
                              <td>3%</td>
                           </tr>
                           <tr>
                              <td>30 {{$t('LockingDay')}}</td>
                              <td>10%</td>
                           </tr>
                           <tr>
                              <td>180 {{$t('LockingDay')}}</td>
                              <td>50%</td>
                           </tr>
                           <tr>
                              <td>365 {{$t('LockingDay')}}</td>
                              <td>100%</td>
                           </tr>
                        </table>
                        <table class="table" cellpadding="0" cellspacing="0">
                           <tr>
                              <th colspan="3">{{$t('LockingNumberLocks')}}</th>
                           </tr>
                           <tr>
                              <th>{{$t('LockingLockType')}}</th>
                              <th>{{$t('LockingCalculated')}}</th>
                              <th>{{$t('LockingRemarks')}}</th>
                           </tr>
                           <tr>
                              <td>{{$t('LockingOwn')}}</td>
                              <td>10%</td>
                              <td></td>
                           </tr>
                           <tr>
                              <td>{{$t('LockingInvitee')}}</td>
                              <td>50%</td>
                              <td>{{$t('LockingOneLayer')}}</td>
                           </tr>
                        </table>
                     </Col>
                  </Row>

               </div>
            </div>
            <!--锁仓记录 未登录-->
            <div class="below-down below-common" v-if="!login">
               <h3 class="title">{{$t('LockingLockRecord')}}</h3>
               <table class="table" cellpadding="0" cellspacing="0">
                  <tr>
                     <th>{{$t('LockingLockFactor')}}</th>
                     <th>{{$t('LockingAmount')}}</th>
                     <th>{{$t('LockingLockcycle')}}</th>
                     <th>{{$t('LockingStatus')}}</th>
                     <th>{{$t('LockingOperatingTime')}}</th>
                     <th>{{$t('LockingUnlockTime')}}</th>
                  </tr>
                  <tr>
                     <td colspan="6">
                        <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                        {{$t('LockingView')}}
                     </td>
                  </tr>
               </table>
            </div>
            <div class="below-down below-common" v-if="!login">
               <h3 class="title">{{$t('MiningRecords')}}</h3>
               <Select style="width:222px" size="large" class="timeList">
                  <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
               <table class="table" cellpadding="0" cellspacing="0">
                  <tr>
                     <th>{{$t('LockingRewardCurrency')}}</th>
                     <th>{{$t('LockingAmount')}}</th>
                     <th>{{$t('LockingRewardTime')}}</th>
                  </tr>
                  <tr>
                     <td colspan="6">
                        <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                        {{$t('LockingView')}}
                     </td>
                  </tr>
               </table>
            </div>
            <!--end-->
            <!--锁仓记录 登录-->
            <div class="below-down below-common" v-if="login">
               <h3 class="title">{{$t('LockingLockRecord')}}</h3>
               <Table :columns="columns1" :data="data1" class="miningRecord"
                      :row-class-name="rowClassName"></Table>
               <div class="below-box below-up-content">
                  <page :totalPage="totalPage1" @changePageFn="changePage1" class="page"></page>
               </div>
            </div>
            <div class="below-down below-common" v-if="login">
               <h3 class="title">{{$t('LockingMiningAwardRecord')}}</h3>
               <Select v-model="model1" style="width:222px" size="large" class="timeList" @on-change="changeTime">
                  <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
               <Table :columns="columns2" :data="data2" class="miningRecord"
                      :row-class-name="rowClassName"></Table>
               <div class="below-box below-up-content">
                  <page :totalPage="totalPage2" @changePageFn="changePage2" class="page"></page>
               </div>
            </div>
            <!--end-->
         </div>
      </div>
   </div>
</template>

<script>
   import page from '@/components/page'
   import {Exchange} from '@/interface/exchange.js'
   import moment from 'moment'
   import Cookies from 'js-cookie'
   import {
      getPlatform
   } from '_api/mining.js'
   import {
      getBalanceList,
      getQueryRewardLockedAssetBrief,
      getCreateLocked,
      getListLocked
   } from '_api/exchange.js'
   import {
      storage
   } from '@/lib/utils.js'

   export default {
      name: "lockWarehouseMining",
      components: {
         page
      },
      data() {
         return {
            login: true,
            disabled: false,
            totalPage1: 0,
            totalPage2: 0,
            exchange: null,
            imgSrc: require('../../assets/images/mining/lockMining_bg.png'),
            balance: '--',
            completedLocked_FF: 0,
            submittedLocked_FF: 0,
            rewardYesterday: '',
            rewardCumulative: '',
            value1: '',
            startTimeDate: new Date().getTime(),
            endTimeDate: new Date().getTime() - 7 * 24 * 3600 * 1000,
            model1: this.$t('MiningSevenDays'),
            model2: 10 + this.$t('LockingDay'),

            layerItems: [//浮层图片
               {
                  layerImg: require('../../assets/images/mining/transaction.png'),
                  layerData: '',
                  currency: 'FF',
                  layerText: 'LockingTotalVolume'
               },
               {
                  layerImg: require('../../assets/images/mining/currency.png'),
                  layerData: '',
                  currency: 'USDT',
                  layerText: 'LockingYesterdayEstimate'
               },
               {
                  layerImg: require('../../assets/images/mining/mining.png'),
                  layerData: '',
                  currency: 'USDT',
                  layerText: 'LockingUserCumulativeGain'
               }
            ],
            timeList: [],
            data1: [],
            data2: [],

            activityRulesItem1: [
               {message: 'LockingInstructionsTip1'},
               {message: 'LockingInstructionsTip2'},
            ],
            activityRulesItem2: [
               {message: 'MechanismDescriptionTip1'},
               {message: 'MechanismDescriptionTip2'},
               {message: 'MechanismDescriptionTip3'},
               {message: 'MechanismDescriptionTip4'},
               {message: 'MechanismDescriptionTip5'},
            ]
         }
      },
      methods: {
         init() {
            getPlatform().then((res) => {
               this.layerItems[0]['layerData'] = res['lastMining'].toFixed(8)
               this.layerItems[1]['layerData'] = res['platformAvailableAmount'].toFixed(8)
               this.layerItems[2]['layerData'] = res['transactionConvert'].toFixed(2)
            })
            if (this.login) {
               this.getBalance()

               //昨日收益 和 我的锁仓收益
               this.exchange.queryRewardLockedAssetBrief((res) => {
                  this.completedLocked_FF = res.completedLocked_FF
                  this.submittedLocked_FF = res.submittedLocked_FF
                  let array1 = res.rewardYesterday
                  let array2 = res.rewardCumulative

                  //处理成数组v-for展示
                  let rewardYesterdayArray = []
                  let rewardCumulativeArray = []
                  Object.keys(array1).forEach(function (key) {
                     rewardYesterdayArray.push({'currency': key, 'value': array1[key]})
                  });
                  this.rewardYesterday = rewardYesterdayArray;
                  Object.keys(array2).forEach(function (key) {
                     rewardCumulativeArray.push({'currency': key, 'value': array2[key]})
                  });
                  this.rewardCumulative = rewardCumulativeArray
               })
               this.changePage1()
               this.changePage2()
            }
         },
         locked() {//锁仓
            let _this = this
            let reg = /^[1-9]\d*(\.\d)?$/

            if (this.model2 === '10天' || this.model2 === '10days') {
               this.lockedLongDurationDay = 10

            } else if (this.model2 === '30天' || this.model2 === '30days') {
               this.lockedLongDurationDay = 30

            } else if (this.model2 === '180天' || this.model2 === '180days') {
               this.lockedLongDurationDay = 180

            } else if (this.model2 === '365天' || this.model2 === '365days') {
               this.lockedLongDurationDay = 365

            }

            //输入框不输入 数量小 大于总资产情况
            if (!this.value1.trim()) {
               this.$Message.warning('请输入锁仓量');
               this.changeDisabled(_this)

            } else if (this.value1 < 1000) {
               this.$Message.warning(this.$t('LockingAmountLess'));
               this.changeDisabled(_this)

            } else if (this.value1 > this.balance) {
               this.$Message.warning(this.$t('LockingAvailableBalance') + ' ' + this.balance);
               this.changeDisabled(_this)

            } else if (!reg.test(this.value1)) {
               this.$Message.warning('请输入正确的锁仓量');
               this.changeDisabled(_this)

            } else {
               this.exchange.createLocked('FF', this.value1, 'IMMEDIATE_REWARD', this.lockedLongDurationDay, (res) => {
                  if (res) {
                     //资产
                     this.getBalance()
                     this.changePage1(1)
                     // this.changeDisabled(_this)
                     //提示锁仓成功
                     this.$Message.warning(this.$t('提示锁仓成功'));
                  }
               })
            }

         },
         //资产
         getBalance() {
            this.exchange.balance((res) => {
               res.forEach(v => {
                  if (v['currency'] == 'FF') {
                     this.balance = v['available']
                  }
               })
            })
         },
         max() {
            if (this.login) {
               this.value1 = this.balance
            }
         },
         changePage1(currentPage1 = 1) {//分页
            //锁仓记录
            this.exchange.listLocked('IMMEDIATE_REWARD', currentPage1, 10, (res) => {
               this.data1 = res.data
               this.totalPage1 = res.pages
            })
         },
         changePage2(currentPage2 = 1) {//分页
            //活动挖矿奖励记录
            this.exchange.activityList('INCOMING', 'REWARD_LOCKED_ASSET', 'COMPLETED', this.startTimeDate, this.endTimeDate, currentPage2, 10, (res) => {
               this.data2 = res.data
               this.totalPage2 = res.pages
            })
         },
         changeTime() {
            if (this.model1 === '最近7天' || this.model1 === 'Last 7 days') {
               this.endTimeDate = new Date().getTime() - 7 * 24 * 3600 * 1000

            } else if (this.model1 === '最近30天' || this.model1 === 'Last 30 days') {
               this.endTimeDate = new Date().getTime() - 30 * 24 * 3600 * 1000

            } else if (this.model1 === '最近180天' || this.model1 === 'Last 180 days') {
               this.endTimeDate = new Date().getTime() - 180 * 24 * 3600 * 1000

            } else if (this.model1 === '最近365天' || this.model1 === 'Last 365 days') {
               this.endTimeDate = new Date().getTime() - 365 * 24 * 3600 * 1000

            }
            this.changePage2()
         },
         //点击锁仓不正确时 按钮状态
         changeDisabled(_this) {
            this.disabled = true
            setTimeout(function () {
               _this.disabled = false
            }, 2000)
         },
         rowClassName() {//table行样式
            return 'td-buyMining';
         },
      },
      mounted() {
         let loginToken = Cookies.get('loginToken')
         var ssoProvider = {};
         this.exchange = new Exchange(ssoProvider);
         this.exchange.ssoProvider.getSsoToken = function (fn) {
            if (loginToken) {
               fn(loginToken);
            }
         };
         this.login = loginToken ? true : false//是否登录
         this.init()
      },
      computed: {
         changeLanguage() {
            this.placeholder = this.$t('LockingMinimumAmount'),

               //只需要在这里给tableTitle重新赋值一下就行。
               this.columns1 = [//记录table
                  {
                     title: this.$t('LockingLockFactor'),
                     key: 'currency',
                     className: 'th-buyMining'
                  },
                  {
                     title: this.$t('LockingAmount'),
                     key: 'amount',
                     align: 'center',
                     className: 'th-buyMining',
                  },
                  {
                     title: this.$t('LockingLockcycle'),
                     key: 'lockedLongDurationDay',
                     align: 'right',
                     className: 'th-buyMining',
                  },
                  {
                     title: this.$t('LockingStatus'),
                     key: 'status',
                     align: 'right',
                     className: 'th-buyMining',
                     render: (h, params) => {
                        let status = params.row['status']
                        if (status === 'SUBMITTED') {
                           status = 'LockingSubmitted'
                        } else if (status === 'LOCKED') {
                           status = 'LockingLocked'
                        } else if (status === 'UNLOCKED') {
                           status = 'LockingUnlocked'
                        }
                        return h('div', {}, this.$t(status))
                     }
                  },
                  {
                     title: this.$t('LockingOperatingTime'),
                     key: 'logCreatedAt',
                     align: 'right',
                     className: 'th-buyMining',
                     render: (h, params) => {
                        return h('div', {}, moment(params.row['logCreatedAt']).format('YYYY-MM-DD HH:mm'))
                     }
                  },
                  {
                     title: this.$t('LockingUnlockTime'),
                     key: 'logUpdatedAt',
                     align: 'right',
                     className: 'th-buyMining',
                     render: (h, params) => {
                        let status = params.row['status']
                        let logCreatedAt = params.row['logCreatedAt']
                        let lockedLongDurationDay = params.row['lockedLongDurationDay']

                        let logUpdatedAt = undefined
                        if (status === 'SUBMITTED') {
                           logUpdatedAt = logCreatedAt + (lockedLongDurationDay + 1) * 24 * 3600 * 1000
                        } else if (status === 'LOCKED') {
                           logUpdatedAt = logCreatedAt + lockedLongDurationDay * 24 * 3600 * 1000
                        } else if (status === 'UNLOCKED') {
                           logUpdatedAt = params.row['logUpdatedAt']
                        }
                        return h('div', {}, moment(logUpdatedAt).format('YYYY-MM-DD HH:mm'))

                     }
                  },
               ],
               this.columns2 = [//记录table
                  {
                     title: this.$t('LockingRewardCurrency'),
                     key: 'currency',
                     className: 'th-buyMining'

                  },
                  {
                     title: this.$t('LockingAmount'),
                     key: 'amount',
                     align: 'center',
                     className: 'th-buyMining'
                  },
                  {
                     title: this.$t('LockingRewardTime'),
                     key: 'createdAt',
                     align: 'right',
                     className: 'th-buyMining',
                     render: (h, params) => {
                        return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm'))
                     }
                  },
               ],
               //时间选择

               this.cycleList = [
                  {
                     value: 10 + this.$t('LockingDay'),
                     label: 10 + this.$t('LockingDay')
                  },
                  {
                     value: 30 + this.$t('LockingDay'),
                     label: 30 + this.$t('LockingDay')
                  },
                  {
                     value: 180 + this.$t('LockingDay'),
                     label: 180 + this.$t('LockingDay')
                  },
                  {
                     value: 365 + this.$t('LockingDay'),
                     label: 365 + this.$t('LockingDay')
                  }
               ]
            //选中的值转换多语言的字段 输入框
            if (this.model2 === '10天' || this.model2 === '10days') {
               this.model2 = 10 + this.$t('LockingDay')
            } else if (this.model2 === '30天' || this.model2 === '30days') {
               this.model2 = 30 + this.$t('LockingDay')

            } else if (this.model2 === '180天' || this.model2 === '180days') {
               this.model2 = 180 + this.$t('LockingDay')

            } else if (this.model2 === '365天' || this.model2 === '365days') {
               this.model2 = 365 + this.$t('LockingDay')
            }
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
         'cycleList': function (oldV, newV) {
            storage.set('cycleList', this.timeList)
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
            storage.set('cycleList', this.cycleList)
            storage.set('model1', this.model1)

         },
      },
   }
</script>
<style lang="less">
   @import "./common.less";

   #lock .ivu-input, .ivu-input-large {
      height: 44px;
      line-height: 44px;
      border-radius: 2px;
   }

   #lock, #recode .ivu-select-large.ivu-select-single .ivu-select-selection {
      height: 44px;
   }

   #lock, #recode .ivu-select-selected-value {
      height: 44px;
      line-height: 44px;
   }

   #lock, #recode .ivu-select-selection {
      border-radius: 2px;
   }

   #recode .ivu-select-placeholder {
      height: 44px;
      line-height: 44px;
   }

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
                  font-size: 32px;
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
                  height: 330px;
                  line-height: 100px;
                  font-size: 18px;
                  color: #333;
                  .login-btn {
                     width: 100px;
                     height: 44px;
                     border-radius: 3px;
                     font-size: 18px;
                     color: #fff;
                     margin-right: 30px;
                  }
                  .center {
                     width: 100%;
                     height: 100%;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                  }
                  .input-box {
                     position: relative;
                     .input-right {
                        position: absolute;
                        right: 20px;
                        top: 12px;
                        font-size: 14px;
                        height: 44px;
                        line-height: 44px;
                        .maximum {
                           margin-left: 7px;
                        }
                     }
                  }
               }
               .no-login-left {
                  padding: 10px 70px 0 20px;
                  .row {
                     height: 65px;
                     line-height: 65px;
                     .lock-btn {
                        width: 100%;
                        height: 44px;
                        font-size: 15px;
                        color: #B2DEFF;
                        margin-top: 30px;
                        a {
                           color: #fff;
                        }
                     }
                     .label {
                        font-size: 16px;
                     }
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
                     font-size: 24px;
                     color: #666;
                     strong {
                        color: #333;
                        margin: 0 30px;
                     }
                     .mining-btn {
                        display: block;
                        width: 319px;
                        height: 44px;
                        /*border-radius:3px;*/
                        font-size: 15px;
                        margin: 84px auto 0;
                     }
                  }
                  .long-pool {
                     border-top: solid 1px #D9D9D9;
                  }
                  .long {
                     padding: 47px 85px 23px;
                  }
               }
               .login {
                  padding: 30px;
                  height: 330px;
                  .lockedWarehouse {
                     display: inline-block;
                     width: 290px;
                     height: 140px;
                     text-align: left;
                     padding: 35px 0 0 20px;
                     h3 {
                        font-size: 28px;
                     }
                     p {
                        font-size: 18px;
                        a {
                           text-decoration: underline;
                        }
                     }
                  }
                  .relative {
                     position: relative;
                     a:hover {
                        .yesterday {
                           display: block;
                        }
                     }
                     .yesterday {
                        position: absolute;
                        width: 241px;
                        /*height: 263px;*/
                        display: none;
                        padding: 10px 15px 12px;
                        background-color: #fff;
                        text-align: center;
                        border-radius: 4px;
                        box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
                        z-index: 5;
                        h5 {
                           font-size: 14px;
                           margin-bottom: 10px;
                           color: #333;
                        }
                        .table {
                           display: inline-block;
                           border-collapse: collapse; //边框线
                           th {
                              background-color: #F0F0F0;
                              color: #666;
                              font-weight: normal;
                           }
                           th, td {
                              width: 106px;
                              height: 42px;
                              font-size: 14px;
                              text-align: center;
                              border: solid 1px #D9D9D9;
                           }
                           td {
                              background-color: #fff;
                              color: #333;
                           }
                        }
                     }
                  }
                  .border-right {
                     border-right: solid 1px #F2F3F8;

                  }
                  .border-bottom {
                     border-bottom: solid 1px #F2F3F8;
                  }

               }
            }
            .below-down {
               position: relative;
               .below-box {
                  border-top-color: transparent; //page里ul有margin 所有边框线不能没 只能颜色变透明

               }
               .table {
                  width: 100%;
                  border-collapse: collapse; //边框线
                  border: solid 1px #D9D9D9;
                  th {
                     height: 44px;
                     background-color: #F2F3F8;
                     font-size: 16px;
                     font-weight: normal;
                  }
                  td {
                     height: 90px;
                     line-height: 90px;
                     text-align: center;
                     font-size: 16px;
                  }
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
            .below-middle {
               background-color: #F2F3F8;
               .below-box {
                  border: none !important;
               }
               .rule-title {
                  font-size: 16px;
                  color: #333;
                  margin-bottom: 20px;
               }
               .activityRules {
                  padding: 20px 27px;
                  .activityRulesList {
                     font-size: 14px;
                  }
                  .table {
                     display: inline-block;
                     border-collapse: collapse; //边框线
                     &:first-child {
                        margin-right: 20px;
                     }
                     th {
                        background-color: #F0F0F0;
                     }
                     th, td {
                        width: 106px;
                        height: 42px;
                        font-size: 14px;
                        text-align: center;
                        border: solid 1px #D9D9D9;
                     }
                     td {
                        background-color: #fff;
                     }
                  }
               }
            }
         }
      }
   }


</style>