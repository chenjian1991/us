<template>
   <div class="wrapper" id="orderTabs">
      <div class="content">
         <Tabs value="name1" :animated="animate">
            <TabPane :label="$t('orderOpen')" name="name1">
               <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane :label="$t('orderComplete')" name="name2" id="orderTabName2">
               <order-filter :showHide="true" :symbolList="quoteAssetList"
                             @search="searchComplete($event)" @reset="resetComplete"></order-filter>
               <Table :columns="columns2" :data="data2"></Table>
               <!--搜索自定义分页-->
               <div class="page">
                  <div class="page-box" @click="prevPageComplete" :disabled="prevComplete"
                       :class="prevComplete?'disabled-style':'green-color-style'">{{$t('orderPagePrev')}}
                  </div>
                  <div class="page-box" @click="nextPageComplete" :disabled="nextComplete"
                       :class="nextComplete?'disabled-style':'green-color-style'">{{$t('orderPageNext')}}
                  </div>
               </div>
            </TabPane>
            <TabPane :label="$t('orderDetail')" name="name3" id="orderTabName3">
               <order-filter :showHide="false" :symbolList="quoteAssetList"
                             @search="searchDetail($event)" @reset="resetDetail"></order-filter>
               <Table :columns="columns3" :data="data3"></Table>
               <!--搜索自定义分页-->
               <div class="page">
                  <div class="page-box" @click="prevPageDetail" :disabled="prevDetail"
                       :class="prevDetail?'disabled-style':'green-color-style'">{{$t('orderPagePrev')}}
                  </div>
                  <div class="page-box" @click="nextPageDetail" :disabled="nextDetail"
                       :class="nextDetail?'disabled-style':'green-color-style'">{{$t('orderPageNext')}}
                  </div>
               </div>
            </TabPane>
         </Tabs>
      </div>

      <!--交易密码6个框-->
      <div class="mask" v-if="showPassWordPage" @click="clickMask">
         <div class="alert alert-trade-password dis-n">
            <div class="alert-title">
               <div>{{$t("bbjyPassword")}}</div>
               <Icon type="ios-close-circle" class="closePs" @click="closePassWordPage"/>
            </div>
            <div class="alert-content">
               <div class="text">{{$t("bbjyInputPassword")}}</div>
               <div class="square">
                  <PasswordInput ref="childPassword" @getPassWord="getPswData"></PasswordInput>
               </div>
               <div class="expired space-between">
                  <span>{{$t("bbjyExpiredTime")}}</span>
                  <router-link to="/originTradePassword">{{$t("bbjyForgetPassword")}}</router-link>
               </div>
               <div class="space-between">
                  <button class="cancel" @click="closePassWordPage">{{$t("bbjyTipCancel")}}</button>
                  <button class="confirm" @click="submitPassWord">{{$t("bbjyTipSubmit")}}</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import {Exchange} from '@/interface/exchange.js'
   import moment, {isMoment} from 'moment'
   import bigDecimal from 'js-big-decimal' //除法失效
   import PasswordInput from '@/components/PasswordInput.vue'
   import orderFilter from '@/components/orderFilter.vue'
   import Cookies from 'js-cookie'
   import {
      getSymbolList,
   } from '_api/exchange.js'
   import {
      getCompletedList_v2,
   } from '_api/balances.js'
   import {
      scientificToNumber,
      addSymbolSplitLine,
      getDecimalsNum,
      storage,
      getTokenByKey as getValue,

   } from '@/lib/utils.js'

   export default {
      name: "order",
      components: {
         PasswordInput: PasswordInput,
         'order-filter': orderFilter,
      },
      data() {
         return {
            tabName: 'name1',
            animate: false,
            showPassWordPage: false,
            prevComplete: true,//前一页是否禁用
            nextComplete: false,//下一页是否禁用
            completeList: [],
            startTimeComplete: '',
            endTimeComplete: '',
            initTimeComplete: '',
            completeParams: {},//分页参数
            isCompletePrev: false,//是否点击上一页

            prevDetail: true,//前一页是否禁用
            nextDetail: false,//下一页是否禁用
            detailList: [],
            startTimeDetail:'',
            endTimeDetail: '',
            initTimeDetail: '',
            detailParams: {},
            isDetailPrev: false,

            quoteAssetList: [],

            symbolList: {},//交易接口的symbolList 接口
            orderId: '',

            columns1: [
               {
                  key: 'createdAt',
                  width: 150,
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm:ss'))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderDate'))
                  }
               },
               {
                  key: 'symbol',
                  width: 105,
                  render: (h, params) => {
                     return h('div', {}, addSymbolSplitLine(params.row.symbol))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPair'))
                  }
               },
               {
                  key: 'orderType',
                  width: 100,
                  render: (h, params) => {
                     return h('div', {}, this.$t(params.row.orderType))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderType'))
                  }
               },
               {
                  key: 'orderSide',
                  render: (h, params) => {
                     let orderSide = params.row.orderSide
                     let color
                     orderSide === 'SELL' ? color = '#66B76D' : color = '#EA4853'
                     return h('div', {
                        style: {
                           color: color
                        }
                     }, this.$t(params.row.orderSide))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderSide'))
                  }
               },
               {
                  key: 'limitPrice',
                  width: 120,
                  render: (h, params) => {
                     let priceLong = this.symbolList[params.row.symbol]['priceTickSize'] || 8
                     let limitPrice = bigDecimal.round(scientificToNumber(params.row.limitPrice), getDecimalsNum(priceLong))
                     return h('div', {}, limitPrice)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPrice'))
                  }
               },
               {
                  key: 'quantity',
                  width: 180,
                  render: (h, params) => {
                     let quantityLong = this.symbolList[params.row.symbol]['quantityStepSize'] || 8
                     let quantity = (bigDecimal.round(scientificToNumber(params.row.filledCumulativeQuantity), getDecimalsNum(quantityLong)) + '/' + bigDecimal.round(scientificToNumber(params.row.quantity), getDecimalsNum(quantityLong)))
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderAmount'))
                  }
               },
               {
                  key: 'filled',
                  width: 150,
                  render: (h, params) => {
                     let filled = (100 * (params.row.filledCumulativeQuantity / params.row.quantity)).toFixed(2) + '%'
                     return h('div', {}, filled)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderFilled') + " %")
                  }
               },
               {
                  key: 'total',
                  width: 150,
                  render: (h, params) => {
                     let total = params.row.limitPrice * params.row.quantity
                     return h('div', {}, bigDecimal.round(scientificToNumber(total), 8))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderTotal'))
                  }
               },
               {
                  key: 'operate',
                  align: 'right',
                  render: (h, params) => {
                     if (params.row.orderStatus === 'PENDING_SUBMIT' && params.row.cancelledUpdateAt) {
                        return h('div', {}, this.$t('bbjyCancelling'))
                     } else {
                        return h('Button', {
                           style: {
                              backgroundColor: '#66B76D',
                              color: '#fff',
                              border: 'none',
                              paddingLeft: '20px',
                              paddingRight: '20px',
                           },
                           on: {
                              click: () => {
                                 this.orderId = params.row.orderId
                                 this.getCancelOrder()
                              }
                           }
                        }, this.$t('bbjyCancel'))
                     }
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOperation'))
                  }
               }
            ],
            data1: [],
            columns2: [
               {
                  key: 'createdAt',
                  width: 140,
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm:ss'))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderDate'))
                  }
               },
               {
                  key: 'symbol',
                  width: 105,
                  render: (h, params) => {
                     return h('div', {}, addSymbolSplitLine(params.row.symbol))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPair'))
                  }
               },
               {
                  key: 'orderType',
                  width: 70,
                  render: (h, params) => {
                     return h('div', {}, this.$t(params.row.orderType))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderType'))
                  }
               },
               {
                  key: 'orderSide',
                  width: 70,
                  render: (h, params) => {
                     let orderSide = params.row.orderSide
                     let color
                     orderSide === 'SELL' ? color = '#66B76D' : color = '#EA4853'
                     return h('div', {
                        style: {
                           color: color
                        }
                     }, this.$t(params.row.orderSide))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderSide'))
                  }
               },
               {
                  key: 'avg',
                  width: 120,
                  render: (h, params) => {
                     let priceLong = this.symbolList[params.row.symbol]['priceTickSize'] || 8
                     let avg = bigDecimal.round(scientificToNumber(params.row.filledAveragePrice), getDecimalsNum(priceLong))
                     return h('div', {}, avg)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyHistoryAvg'))
                  }
               },
               {
                  key: 'limitPrice',
                  width: 120,
                  render: (h, params) => {
                     let priceLong = this.symbolList[params.row.symbol]['priceTickSize'] || 8
                     let limitPrice = bigDecimal.round(scientificToNumber(params.row.limitPrice), getDecimalsNum(priceLong))
                     return h('div', {}, limitPrice)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPrice'))
                  }
               },
               {
                  key: 'quantity',
                  width: 150,
                  render: (h, params) => {
                     let quantityLong = this.symbolList[params.row.symbol]['quantityStepSize'] || 8
                     let quantity = (bigDecimal.round(scientificToNumber(params.row.filledCumulativeQuantity), getDecimalsNum(quantityLong)) + '/' + bigDecimal.round(scientificToNumber(params.row.quantity), getDecimalsNum(quantityLong)))
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderAmount'))
                  }
               },
               {
                  key: 'filled',
                  width: 110,
                  render: (h, params) => {
                     let filled = (100 * (params.row.filledCumulativeQuantity / params.row.quantity)).toFixed(2) + '%'
                     return h('div', {}, filled)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderFilled') + " %")
                  }
               },
               {
                  key: 'total',
                  width: 150,
                  render: (h, params) => {
                     let total = params.row.limitPrice * params.row.quantity
                     return h('div', {}, bigDecimal.round(scientificToNumber(total), 8))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderTotal'))
                  }
               },
               {
                  key: 'orderStatus',
                  width: 125,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, this.$t(params.row.orderStatus))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyHistoryStatus'))
                  }
               }
            ],
            data2: [],
            columns3: [
               {
                  key: 'updatedAt',
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['updatedAt']).format('YYYY-MM-DD HH:mm:ss'))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderDate'))
                  }
               },
               {
                  key: 'symbol',
                  render: (h, params) => {
                     return h('div', {}, addSymbolSplitLine(params.row.symbol))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPair'))
                  }
               },
               {
                  key: 'orderSide',
                  render: (h, params) => {
                     let orderSide = params.row.orderSide
                     let color
                     orderSide === 'SELL' ? color = '#66B76D' : color = '#EA4853'
                     return h('div', {
                        style: {
                           color: color
                        }
                     }, this.$t(params.row.orderSide))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderSide'))
                  }
               },
               {
                  title: 'Price',
                  key: 'limitPrice',
                  render: (h, params) => {
                     let priceLong = this.symbolList[params.row.symbol]['priceTickSize'] || 8
                     let limitPrice = bigDecimal.round(scientificToNumber(params.row.limitPrice), getDecimalsNum(priceLong))
                     return h('div', {}, limitPrice)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPrice'))
                  }
               },
               {
                  title: 'Filled',
                  key: 'filled',
                  render: (h, params) => {
                     let quantityLong = this.symbolList[params.row.symbol]['quantityStepSize'] || 8
                     let quantity = bigDecimal.round(scientificToNumber(params.row.lastFilledQuantity), getDecimalsNum(quantityLong))
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderFilled'))
                  }
               },
               {
                  key: 'lastCommission',
                  render: (h, params) => {
                     let commission = ''
                     if (params.row['lastCommissionCurrency']) {
                        commission = bigDecimal.round(scientificToNumber(params.row.lastCommission), 8) + ' ' + params.row['lastCommissionCurrency']
                     } else {
                        let orderSide = params.row.orderSide
                        let symbol = addSymbolSplitLine(params.row.symbol)
                        let text
                        orderSide === 'BUY' ? text = symbol.slice(0, symbol.indexOf('/')) : text = symbol.slice(symbol.indexOf('/') + 1)
                        commission = bigDecimal.round(scientificToNumber(params.row.lastCommission), 8) + ' ' + text
                     }
                     return h('div', {}, commission)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('orderCommission'))
                  }
               },
               {
                  title: 'Total',
                  key: 'total',
                  align: 'right',
                  render: (h, params) => {
                     let symbol = addSymbolSplitLine(params.row.symbol)
                     let total = params.row.limitPrice * params.row.lastFilledQuantity
                     let totalText = bigDecimal.round(scientificToNumber(total), 8) + ' ' + symbol.slice(symbol.indexOf('/') + 1)
                     return h('div', {}, totalText)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderTotal'))
                  }
               }],
            data3: [],
         }
      },
      methods: {
         init() {
            (async () => {
               await new Promise(resolve => {
                  getSymbolList().then(res => {
                     res.map((v) => {
                        this.symbolList[v.symbol] = v
                        //国际站不展示USD
                        if (v.quoteAsset !== 'USDD'&&v.quoteAsset !== 'USDT') {
                           this.quoteAssetList.push(v.quoteAsset)
                        }
                     })
                     this.quoteAssetList.unshift('ALL')
                     //对象转数组去重
                     this.quoteAssetList = Array.from(new Set(this.quoteAssetList))
                     resolve()
                  }).catch(error => {
                  })
               });
               await new Promise(resolve => {
                  this.getListOpenOrder()
                  this.resetComplete()
                  this.resetDetail()
                  resolve();
               });
            })()
         },
         //委托
         getListOpenOrder() {
            this.exchange.listOpenOrder(function (data) {
               this.data1 = data
            }.bind(this))
         },
         //成交
         listCompleted_v2Order(params, value) {
            this.exchange.listCompleted_v2Order(params, function (res) {
               console.log(res)
               if (this.isCompletePrev) {//点击的上一页
                  res = res.reverse()
                  //与第一页第一条数据相比较
                  if (res[0].createdAt >= this.initTimeComplete) {
                     this.prevComplete = true
                  }
               }
               this.completeList = res//存数据 点击上一页使用
               if (res.length > 10) {
                  this.nextComplete = false//下一步可用
               } else {
                  this.nextComplete = true//下一步禁用
               }
               if (value) {
                  this.initTimeComplete = res[0] && res[0].createdAt
               }
               this.data2 = res.slice(0, 10)
            }.bind(this))
         },
         //明细
         getFilledList_v2Order(params, value) {
            this.exchange.getFilledList_v2Order(params, function (res) {
               if (this.isDetailPrev) {//点击的上一页
                  res = res.reverse()
                  //与第一页第一条数据相比较
                  if (res[0].updatedAt >= this.initTimeDetail) {
                     this.prevDetail = true
                  }
               }
               this.detailList = res//存数据 点击上一页使用
               if (res.length > 10) {
                  this.nextDetail = false//下一步可用
               } else {
                  this.nextDetail = true//下一步禁用
               }
               if (value) {
                  this.initTimeDetail = res[0] && res[0].updatedAt
               }
               this.data3 = res.slice(0, 10)
            }.bind(this))
         },
         resetComplete() {
            this.isCompletePrev = false
            let params = {forward: false}
            this.listCompleted_v2Order(params, 'reset')
         },
         searchComplete(params) {
            this.isCompletePrev = false
            this.completeParams = params
            params['forward'] = false
            this.prevComplete = true
            this.listCompleted_v2Order(params, 'search')
         },
         //分页 成交
         prevPageComplete() {
            if (!this.prevComplete) {
               this.isCompletePrev = true
               this.startTimeComplete = this.completeList[0].createdAt
               this.nextComplete = false
               let params = JSON.parse(JSON.stringify(this.completeParams))
               params['forward'] = true
               params['startDateTime'] = this.startTimeComplete
               this.listCompleted_v2Order(params)
            }
         },
         nextPageComplete() {
            if (!this.nextComplete) {
               this.isCompletePrev = false
               this.endTimeComplete = this.completeList[10].createdAt
               this.prevComplete = false
               let params = JSON.parse(JSON.stringify(this.completeParams))
               params['forward'] = false
               params['endDateTime'] = this.endTimeComplete
               this.listCompleted_v2Order(params)
            }
         },

         //重置
         resetDetail() {
            this.isDetailPrev = false
            let params = {forward: false}
            this.getFilledList_v2Order(params, 'reset')
         },
         //搜索
         searchDetail(params) {
            this.isDetailPrev = false
            this.detailParams = params
            params['forward'] = false
            this.prevDetail = true
            this.getFilledList_v2Order(params, 'search')
         },
         //分页 明细
         prevPageDetail() {
            if (!this.prevDetail) {
               this.isDetailPrev = true
               this.startTimeDetail = this.detailList[0].updatedAt
               this.nextDetail = false
               let params = JSON.parse(JSON.stringify(this.detailParams))
               params['forward'] = true
               params['startDateTime'] = this.startTimeDetail
               this.getFilledList_v2Order(params)
            }
         },
         nextPageDetail() {
            if (!this.nextDetail) {
               this.isDetailPrev = false
               this.endTimeDetail = this.detailList[10].updatedAt
               this.prevDetail = false
               let params = JSON.parse(JSON.stringify(this.detailParams))
               params['forward'] = false
               params['endDateTime'] = this.endTimeDetail
               this.getFilledList_v2Order(params)
            }
         },
         //撤单
         getCancelOrder() {
            //需要输入密码
            if (this.$store.state.exchange.inputTradePassWordStatus === true) {
               if (getValue("ORDER_SESSION")) {
                  this.cancelOrder()
               } else {
                  this.showPassWordPage = true
               }
            } else {
               this.cancelOrder()
            }
         },
         submitPassWord() {//提交交易密码页面
            if (this.exchangePassWord == null || this.exchangePassWord.length < 6) {
               this.$Message.warning(this.$t('bbjyInputPassword'));
            } else {
               this.cancelOrder(this.exchangePassWord)
            }
         },
         cancelOrder(password = '') {
            this.exchange.cancelOrder(this.orderId, password, function () {
               this.getListOpenOrder()
            }.bind(this))
         },
         clickMask() {//交易框获取焦点
            this.$refs.childPassword.getFocus();
         },
         closePassWordPage() {//关闭交易密码页面
            this.showPassWordPage = false;
            this.exchangePassWord = null
            document.body.style.overflow = '';
         },
         //交易密码
         getPswData(callbackData) {
            if (callbackData && callbackData.length === 6) {
               //跳转到再次输入密码页面
               this.exchangePassWord = callbackData
            }
         },
      },
      created(){
         let loginToken = Cookies.get('loginToken')
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         if (loginToken) {
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               fn(loginToken);
            };
         } else {
            this.$router.push('/login')
         }
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         this.$store.dispatch("getTradePassWordStatus")
         this.init()
      },
      deactivated() {
         this.$destroy()
      }
   }
</script>
<style lang="less">
   @import '../balances/balances.less';

   @color-light-gary: #E7EAED;
   @color-green: #12869A;
   #orderTabs, table, th, td {
      border: none;
   }

   #orderTabs {
      .ivu-tabs {
         overflow: visible;
      }
      .ivu-tabs-content {
         /*margin-top: 50px; //隐藏按钮的高度*/
      }
      .ivu-table-overflowX {
         overflow-x: hidden;
      }
      .ivu-select-dropdown{
         font-size: 12px;
      }

   }

</style>
<style lang="less" scoped>
   @color-light-gary: #E7EAED;
   @color-green: #12869A;
   .light-gray {
      color: @color-light-gary;
   }

   .green-color-style {
      color: @color-green;
      border-color: @color-green;
      cursor: pointer;
      &:hover {
         background-color: @color-green;
         color: #fff;
      }
   }

   .disabled-style {
      color: #949DA6;
      border-color: #949DA6;
      cursor: not-allowed;
   }

   #orderTabName2, #orderTabName3 {
      margin-top: 50px;
   }

   .wrapper {
      padding: 30px 0 30px;
      background-color: #F7F9FA;
      .content {
         position: relative;
         width: 1200px;
         margin: 0 auto;
         background-color: #fff;
         min-height: 635px;
      }
   }

   .page {
      margin-top: 20px;
      text-align: right;
      .page-box {
         display: inline-block;
         height: 32px;
         line-height: 30px;
         padding: 0 10px;
         border: 1px solid;
         border-radius: 4px;
         margin-left: 10px;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         font-size: 12px;
      }
   }

   @buy-color: #66B76D;
   @sell-color: #EA4853;

   .buy-bg-color {
      background-color: #66B76D !important;
   }

   .mask {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 15;
      overflow: hidden;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: flex;
      justify-content: center;
      align-items: center;
      .alert-trade-password {
         width: 540px;
         height: 332px;
         background-color: #272c3f;
         .alert-title {
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            border-bottom: solid 1px #384061;
            position: relative;
            p {
               color: #8d9ace;
            }
            .closePs {
               position: absolute;
               top: 20px;
               right: 15px;
               font-size: 20px;
               color: #424e7d;
               cursor: pointer;
               &:hover {
                  color: #bbb;
               }
            }
         }
         .alert-content {
            padding: 30px 117px 35px;
            .text {
               font-size: 18px;
               color: #fff;
            }
            .square {
               position: relative;
               margin-top: 20px;
               height: 44px;

               border-radius: 3px;
               .active {
                  position: absolute;
                  top: 5px;
                  left: 0;
                  z-index: 2;
                  width: 304/6px;
                  height: 32px;
                  text-align: center;
               }
            }
            .expired {
               margin-top: 13px;
               margin-bottom: 45px;
               span {
                  color: #42528d;
               }
               a {
                  color: #7182c5;
               }
            }
            .space-between {
               display: -ms-flexbox;
               display: -webkit-flex;
               display: -moz-flex;
               display: -ms-flex;
               display: flex;
               justify-content: space-between;
               button {
                  border: 0;
                  outline: none;
               }
            }
            /*input password 输入框变黄处理*/
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus {
               -webkit-box-shadow: 0 0 0 1000px #353948 inset !important;
            }
            .cancel, .confirm {
               display: inline-block;
               height: 40px;
               background-color: #5a6cb1;
               color: #fff;
               font-size: 16px;
               padding: 0 45px;
               border: 0;
            }
            .cancel {
               background-color: #d6483e;
            }
            .confirm {
               background-color: #27a781;
            }
         }
      }
   }


</style>