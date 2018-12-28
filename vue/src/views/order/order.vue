<template>
   <div class="wrapper" id="orderTabs">
      <div class="content">
         <Tabs value="name1" :animated="animate">
            <TabPane :label="open" name="name1">
               <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane :label="history" name="name2">
               <Table :columns="columns2" :data="data2"></Table>
               <Page :total="totalPage1" :page-size="1" show-elevator class="page" @on-change="onChangePage1"/>

            </TabPane>
            <TabPane :label="transaction" name="name3">
               <Table :columns="columns3" :data="data3"></Table>
               <Page :total="totalPage2" :page-size="1" show-elevator class="page" @on-change="onChangePage2"/>

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
                  <a href="../../securityCenter/setTradingPassword.html">{{$t("bbjyForgetPassword")}}</a>
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
   import Cookies from 'js-cookie'
   import {
      getSymbolList,
   } from '_api/exchange.js'
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
      },
      data() {
         return {
            animate: false,
            SSE_order: null,//订单推送
            symbolList: {},//交易接口的symbolList 接口
            totalPage1: 1,
            totalPage2: 1,
            showPassWordPage: false,
            orderId: '',
            open: (h) => {
               return h('div', {}, this.$t('orderOpen'))
            },
            history: (h) => {
               return h('div', {}, this.$t('orderComplete'))
            },
            transaction: (h) => {
               return h('div', {}, this.$t('orderDetail'))
            },
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
                  width: 120,
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
                  width: 150,
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
                  width: 180,
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
                                 this.getCancelOrder(params.row.orderId)
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
                  width: 120,
                  render: (h, params) => {
                     return h('div', {}, addSymbolSplitLine(params.row.symbol))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPair'))
                  }
               },
               {
                  key: 'orderType',
                  width: 60,
                  render: (h, params) => {
                     return h('div', {}, this.$t(params.row.orderType))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderType'))
                  }
               },
               {
                  key: 'orderSide',
                  width: 60,
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
                  width: 150,
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
                  width: 150,
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
                  width: 70,
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
                  width: 100,
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
                  key: 'createdAt',
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm:ss'))
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
                     // let orderSide = params.row.orderSide
                     // let symbol = addSymbolSplitLine(params.row.symbol)
                     // let text
                     // orderSide === 'BUY' ? text = symbol.slice(0, symbol.indexOf('/')) : text = symbol.slice(symbol.indexOf('/') + 1)
                     // let commission = bigDecimal.round(scientificToNumber(params.row.lastCommission), 8) + ' ' + text
                     // return h('div', {}, commission)
                     let commission = bigDecimal.round(scientificToNumber(params.row.lastCommission), 8) + ' ' + params.row['lastCommissionCurrency']
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
                     let total = params.row.limitPrice * params.row.quantity
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
            let loginToken = Cookies.get('loginToken')
            let ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            if (loginToken) {
               this.exchange.ssoProvider.getSsoToken = function (fn) {
                  fn(loginToken);
               };
               this.getSSEOrderList()
            } else {
               this.$router.push({
                  path: `login`,
               })
            }
            (async () => {
               await new Promise(resolve => {
                  getSymbolList().then(res => {
                     console.log(res)
                     res.map((v) => {
                        this.symbolList[v.symbol] = v
                     })
                     resolve()
                  }).catch(error => {
                  })
               });
               await new Promise(resolve => {
                  this.getListOpenOrder()
                  this.getListCompletedOrder()
                  this.getListFilledOrderDetail()
                  resolve();
               });
            })()
         },
         getListOpenOrder() {
            this.exchange.listOpenOrder(function (data) {
               console.log(data)
               this.data1 = data
            }.bind(this))
         },
         getListCompletedOrder(page = 1) {
            this.exchange.listCompletedOrder(page, function (res) {
               console.log(res)
               this.totalPage1 = res.pages
               if (res.data.length !== 0) {
                  this.data2 = res.data
               }
            }.bind(this))
         },
         getListFilledOrderDetail(page = 1) {
            this.exchange.listFilledOrderDetail(page, function (res) {
               console.log(res)
               this.totalPage2 = res.pages
               if (res.data.length !== 0) {
                  this.data3 = res.data
               }
            }.bind(this))
         },
         getCancelOrder(orderId) {
            if (getValue("ORDER_SESSION")) {
               this.exchange.cancelOrder(orderId, function (res) {
                  console.log(res)
                  this.getListOpenOrder()
               }.bind(this))
            } else {
               this.showPassWordPage = true
            }
         },
         onChangePage1(currentPage) {
            this.getListCompletedOrder(currentPage)
         },
         onChangePage2(currentPage) {
            this.getListFilledOrderDetail(currentPage)
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
         submitPassWord() {//提交交易密码页面
            if (this.exchangePassWord == null || this.exchangePassWord.length < 6) {
               this.$Message.warning(this.$t('bbjyInputPassword'));
               return false
            }
            let loginToken = Cookies.get('loginToken')
            this.exchange.issuedTradePassword(loginToken, this.exchangePassWord, function (data) {
               if (!data["code"]) {
                  //隐藏密码输入框
                  this.closePassWordPage()
                  this.exchange.ssoProvider["getExtension"] = data["token"];
                  this.exchange.cancelOrder(this.orderID, function (data) {
                     console.log(this.orderID)
                     this.getListOpenOrder()
                  }.bind(this));
               } else {
                  //错误提示
                  this.$Message.warning(this.$t(data['code']));
               }
            }.bind(this))
         },
         //获取推送的订单
         getSSEOrderList() {
            //刚进页面初始数据
            this.exchange.listFilledOrder(function (token, accountId) {
               let baseURL = window.location.protocol + '//' + window.location.host //域名
               //判断orderId
               this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
               this.SSE_order.onopen = function (e) {
                  console.log("订单推送连接已经建立：", this.readyState);
               };

               this.SSE_order.addEventListener('_RESULT', function (e) {
                  let result = JSON.parse(e.data)
                  if (result) {
                     this.data3 = result
                     this.getListOpenOrder()
                     this.getListCompletedOrder()
                  }
               }.bind(this))

               this.SSE_order.addEventListener('_ERROR', function (e) {
                  console.log(e)
               }.bind(this))

               this.SSE_order.onerror = function (e) {
                  this.getSSEOrderList()
               }.bind(this);
            }.bind(this))
         },
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         this.init()
      },
      deactivated() {
         this.$destroy()
      }
   }
</script>
<style lang="less">
   #orderTabs, #historyTabs, #balances {
      /*  选项卡样式  start */
      @page-border-color: #EDEEF0;
      .ivu-table-cell {
         color: #344857;
      }
      .ivu-tabs-ink-bar {
         width: 180px !important;
         background-color: #12869A;
      }
      .ivu-tabs-tab {
         width: 180px;
         line-height: 50px;
         text-align: center;
         font-size: 14px;
         padding: 0;
         color: #949DA6;
         &:hover {
            color: #344857;
         }
      }
      .ivu-tabs-bar {
         border-bottom-color: #F5F5F5;
         margin-bottom: 0;
      }
      .ivu-tabs-tab-active {
         color: #344857 !important;
      }
      /*  选项卡样式  end */

      /*  table 样式 start*/
      .ivu-table-wrapper {
         border: none;
      }
      .ivu-table {
         background-color: transparent;
         overflow: visible;
         &:before {
            background-color: transparent;
         }
         &:after {
            background-color: transparent;
         }
      }
      .ivu-table {
         th, td {
            /*background-color: #091341;*/
            border-bottom-color: #F5F5F5 !important;
         }
      }
      .ivu-table th {
         background-color: #fff;
      }
      .ivu-table-header .ivu-table-cell {
         font-size: 12px;
         color: #949DA6;
         padding: 0 5px;
      }
      .ivu-table-body .ivu-table-cell {
         font-size: 12px;
         color: #344857;
         padding: 0 5px;
      }
      .ivu-tabs-no-animation > .ivu-tabs-content {
         padding: 0 20px 10px;
      }
      /*table 样式 end*/

      /* page 样式 start  */
      .ivu-page-item, .ivu-page-next, .ivu-page-prev {
         background-color: transparent;
         border-color: @page-border-color;
         a {
            color: #949DA6;
         }
      }
      .ivu-page-item-active {
         background-color: #12869A;
         a {
            color: #fff;
         }
      }
      .ivu-page-options-elevator input {
         background-color: transparent;
         border-color: @page-border-color;
         color: #949DA6;
      }
      /* page 样式 end  */
   }

   #orderTabs, table, th, td {
      border: none;
   }
</style>
<style lang="less" scoped>
   .wrapper {
      padding: 15px 0 10px;
      background-color: #F7F9FA;
      .content {
         width: 1200px;
         margin: 0 auto;
         background-color: #fff;
         min-height: 635px;
      }
   }

   .page {
      margin-top: 20px;
      text-align: right;
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