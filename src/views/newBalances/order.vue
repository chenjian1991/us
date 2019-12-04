<template>
   <main id="orderTabs" class="orderTabs">
      <account-info name="order"></account-info>
      <div class="container pt-4 pb-4">
         <div class="content bgc-fff">
            <ul class="nav nav-classic nav-borderless px-0 mb-2" id="pills-tab" role="tablist">
               <li class="nav-item">
                  <a class="nav-link active" id="open-tab" data-toggle="pill" href="#open-href"
                     role="tab"
                     aria-controls="pills-one" aria-selected="false">{{$t('orderOpen')}}</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" id="complete-tab" data-toggle="pill" href="#complete-href" role="tab"
                     aria-controls="pills-two" aria-selected="true">{{$t('orderComplete')}}</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" id="detail-tab" data-toggle="pill" href="#detail-href" role="tab"
                     aria-controls="pills-two" aria-selected="true">{{$t('orderDetail')}}</a>
               </li>
            </ul>
            <div class="tab-content middle pl-3 pr-3 pb-3" id="pills-tabContent">
               <div class="tab-pane fade active show" id="open-href" role="tabpanel" aria-labelledby="open-tab">
                  <Table :columns="columns1" :data="data1"></Table>
               </div>
               <div class="tab-pane fade" id="complete-href" role="tabpanel" aria-labelledby="complete-tab">
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
               </div>
               <div class="tab-pane fade" id="detail-href" role="tabpanel" aria-labelledby="detail-tab">
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
               </div>
            </div>
         </div>
      </div>

      <!--交易密码6个框-->
      <div class="mask" v-if="showPassWordPage" @click="clickMask">
         <div class="alert alert-trade-password">
            <div class="alert-title">
               <div>{{$t("bbjyPassword")}}</div>
               <Icon type="md-close" class="closePs" @click="closePassWordPage"/>
            </div>
            <div class="alert-content">
               <div class="content-box">
                  <div class="text">{{$t("bbjyInputPassword")}}</div>
                  <div class="square">
                     <PasswordInput ref="childPassWord" @getPassWord="getPswData"></PasswordInput>
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
   </main>
</template>

<script>
   import {Exchange} from '@/interface/exchange.js'
   import moment from 'moment'
   import bigDecimal from 'js-big-decimal' //除法失效
   import PasswordInput from '@/components/PasswordInput.vue'
   import orderFilter from '@/components/orderFilter.vue'
   import AccountInfo from '@/components/common/AccountInfo'
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
      metaInfo() {
         return {
            title: this.pageTitle, // set a title
            meta: [{                 // set meta
               name: 'keywords',
               content: this.pageKeyword
            }, {
               name: 'description',
               content: this.pageDescription
            }],
         }
      },
      components: {
         PasswordInput: PasswordInput,
         'order-filter': orderFilter,
         'account-info': AccountInfo,
      },
      data() {
         return {
            pageTitle: this.$t(this.$route.meta.title),
            pageKeyword: this.$t(this.$route.meta.keywords),
            pageDescription: this.$t(this.$route.meta.description),
            tabName: 'name1',
            animate: false,
            showPassWordPage: false,
            prevComplete: true,//前一页是否禁用
            nextComplete: false,//下一页是否禁用
            completeList: [],
            initTimeComplete: '',
            completeParams: {},//分页参数

            prevDetail: true,//前一页是否禁用
            nextDetail: false,//下一页是否禁用
            detailList: [],
            initTimeDetail: '',
            detailParams: {},

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
                  width: 80,
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
                  width: 160,
                  render: (h, params) => {
                     let quantityLong = this.symbolList[params.row.symbol]['quantityStepSize'] || 8
                     let quantity = (bigDecimal.round(scientificToNumber(params.row.filledCumulativeQuantity), getDecimalsNum(quantityLong)) + '/' + bigDecimal.round(scientificToNumber(params.row.quantity), getDecimalsNum(quantityLong)))
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {},'Size')
                  }
               },
               {
                  key: 'filled',
                  width: 80,
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
                  minWidth: 150,
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
                     return h('div', {}, 'Size')
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
                  width: 130,
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
                  minWidth: 100,
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
                  width: 150,
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['updatedAt']).format('YYYY-MM-DD HH:mm:ss'))
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
                  key: 'orderSide',
                  minWidth: 70,
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
                  key: 'lastFilledPrice',
                  width: 150,
                  render: (h, params) => {
                     let priceLong = this.symbolList[params.row.symbol]['priceTickSize'] || 8
                     let lastFilledPrice = bigDecimal.round(scientificToNumber(params.row.lastFilledPrice), getDecimalsNum(priceLong))
                     return h('div', {}, lastFilledPrice)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('bbjyOrderPrice'))
                  }
               },
               {
                  title: 'Filled',
                  key: 'filled',
                  width: 150,
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
                  width: 180,
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
                  width: 180,
                  align: 'right',
                  render: (h, params) => {
                     let symbol = addSymbolSplitLine(params.row.symbol)
                     let total = params.row.lastFilledPrice * params.row.lastFilledQuantity
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
                        //美国站不展示USDD USDT
                        if (v.quoteAsset !== 'USDD'||v.quoteAsset !== 'USDT') {
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
         resetComplete() {
            this.prevComplete = true
            let params = {forward: false}
            this.exchange.listCompleted_v2Order(params, function (res) {
               this.dealCompleteData(res)
               this.initTimeComplete = res[0] && res[0].createdAt
            }.bind(this))
         },
         searchComplete(params) {
            this.prevComplete = true
            this.completeParams = params
            params['forward'] = false
            this.exchange.listCompleted_v2Order(params, function (res) {
               this.dealCompleteData(res)
               this.initTimeComplete = res[0] && res[0].createdAt
            }.bind(this))
         },
         //分页 成交
         prevPageComplete() {
            if (!this.prevComplete) {
               let params = JSON.parse(JSON.stringify(this.completeParams))
               params['forward'] = true
               params['startDateTime'] = this.completeList[0].createdAt
               this.exchange.listCompleted_v2Order(params, function (res) {
                  res = res.reverse()
                  if (res[0].createdAt >= this.initTimeComplete) {                  //与第一页第一条数据相比较
                     this.prevComplete = true
                  }
                  this.dealCompleteData(res)
               }.bind(this))
            }
         },
         nextPageComplete() {
            if (!this.nextComplete) {
               this.prevComplete = false
               let params = JSON.parse(JSON.stringify(this.completeParams))
               params['forward'] = false
               params['endDateTime'] = this.completeList[10].createdAt//下一页的结束时间是当前页最后一天数据的时间
               this.exchange.listCompleted_v2Order(params, function (res) {
                  this.dealCompleteData(res)
               }.bind(this))
            }
         },
         dealCompleteData(res) {
            this.completeList = res//存数据 点击上一页使用
            if (res.length > 10) {
               this.nextComplete = false//下一步可用
            } else {
               this.nextComplete = true//下一步禁用
            }
            this.data2 = res.slice(0, 10)
         },
         dealDetailData(res) {
            this.detailList = res//存数据 点击上一页使用
            if (res.length > 10) {
               this.nextDetail = false//下一步可用
            } else {
               this.nextDetail = true//下一步禁用
            }
            this.data3 = res.slice(0, 10)
         },
         //重置
         resetDetail() {
            this.prevDetail = true
            let params = {forward: false}
            this.exchange.getFilledList_v2Order(params, function (res) {
               this.dealDetailData(res)
               this.initTimeDetail = res[0] && res[0].updatedAt
            }.bind(this))
         },
         //搜索
         searchDetail(params) {
            this.prevDetail = true
            this.detailParams = params
            params['forward'] = false
            this.exchange.getFilledList_v2Order(params, function (res) {
               this.dealDetailData(res)
               this.initTimeDetail = res[0] && res[0].updatedAt
            }.bind(this))
         },
         //分页 明细
         prevPageDetail() {
            if (!this.prevDetail) {
               let params = JSON.parse(JSON.stringify(this.detailParams))
               params['forward'] = true
               params['startDateTime'] = this.detailList[0].updatedAt
               this.exchange.getFilledList_v2Order(params, function (res) {
                  res = res.reverse()
                  if (res[0].updatedAt >= this.initTimeDetail) {                  //与第一页第一条数据相比较
                     this.prevDetail = true
                  }
                  this.dealDetailData(res)
               }.bind(this))
            }
         },
         nextPageDetail() {
            if (!this.nextDetail) {
               this.prevDetail = false
               let params = JSON.parse(JSON.stringify(this.detailParams))
               params['forward'] = false
               params['endDateTime'] = this.detailList[10].updatedAt
               this.exchange.getFilledList_v2Order(params, function (res) {
                  this.dealDetailData(res)
               }.bind(this))
            }
         },
         //撤单
         getCancelOrder() {
            //是否设置密码
            if (this.$store.state.exchange.inputTradePassWordStatus) {
               if (getValue("ORDER_SESSION")) {
                  this.cancelOrder()
                  //   交易密码开关
               } else if (this.$store.state.exchange.openTradePasswordStatus) {
                  this.showPassWordPage = true
               } else {
                  this.cancelOrder()
               }
            } else {
               this.$Notice.warning({
                  title: this.$t("bbjyNoPasswordError")
               });
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
            this.exchange.cancelOrder(this.orderId, password, () => {
               this.getListOpenOrder()
               this.showPassWordPage = false
            }, () => {
               this.showPassWordPage = false
            })
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
      created() {
         let loginToken = $cookies.get('loginToken')
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
      watch: {
         languageChange(val, oldVal) {//监听全局语言的状态
            this.pageTitle = this.$t(this.$route.meta.title)
            this.pageKeyword = this.$t(this.$route.meta.keywords)
            this.pageDescription = this.$t(this.$route.meta.description)
         },
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
   @import './balances.less';

   @color-light-gary: #E7EAED;
   @color-green: #12869A;
   #orderTabs, table, th, td {
      border: none;
   }

   #orderTabs {
      .ivu-tabs {
         overflow: visible;
      }

      /* table 使溢出显示 */
      .ivu-table-cell {
         overflow: visible;
         position: relative;
      }

      .ivu-table-overflowX::-webkit-scrollbar {
         display: none;
      }
   }

</style>
<style lang="less" scoped>
   @color-light-gary: #E7EAED;
   @color-green: #12869A;

   #orderTabs {
      background-color: #F7F9FA
   }

   .bgc-fff {
      background-color: #fff;
   }

   .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
      color: #fff;
      background-color: @color-green;
   }

   .nav-pills .nav-link {
      color: @color-green;
   }

   .nav-classic .nav-link.active {
      color: @color-green !important;
      border-bottom-width: 2px;
      border-bottom-color: @color-green !important;
   }

   .nav-classic .nav-link {
      &:hover {
         color: @color-green !important;
      }
   }

   .nav-link {
      font-size: 16px;
   }

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

   .orderTabs {
      min-height: 100%;
      .content {
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
      display: flex;
      justify-content: center;
      align-items: center;

      .alert-trade-password {
         width: 500px;
         background-color: #1B2A34;
         .alert-title {
            height: 55px;
            line-height: 50px;
            text-align: center;
            color: #C2D8E8;
            border-bottom: solid 1px #2D4859;
            position: relative;
            font-size: 16px;
            p {
               color: #8d9ace;
            }

            .closePs {
               position: absolute;
               top: 13px;
               right: 15px;
               font-size: 22px;
               color: #2D4859;
               cursor: pointer;

               &:hover {
                  color: #bbb;
               }
            }
         }

         .alert-content {
            //padding: 30px 100px 35px;
            display: flex;
            justify-content: center;
            //align-items: center;
            .content-box {
               display: inline-block;
               text-align: left;
               padding: 30px 0;
            }
            .text {
               font-size: 14px;
               color: #C2D8E8;
            }

            .square {
               position: relative;
               margin-top: 15px;
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
               margin-bottom: 30px;

               span {
                  color: #3F647D;
               }

               a {
                  color: #688A9D;
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

            .cancel,
            .confirm {
               display: inline-block;
               min-width: 120px;
               max-width: 160px;
               //width: 145px;
               height: 40px;
               padding: 0 10px;
               background-color: #5a6cb1;
               color: #fff;
               font-size: 16px;
               border: 0;
               border-radius: 2px;
               text-align: center;
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