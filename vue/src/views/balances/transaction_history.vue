<template>
   <div class="wrapper" id="historyTabs">
      <div class="header">
         <router-link to="/balances">{{$t('czBalances')}}</router-link>
         <a> > {{$t('czlsTransactionHistory')}}</a>
      </div>
      <div class="content">
         <Tabs value="name1" :animated="animate">
            <TabPane :label="deposit" name="name1">
               <Table :columns="columns1" :data="data1"></Table>
               <Page :total="totalPage1" :page-size="1" show-elevator class="page" @on-change="onChangePage1"/>
            </TabPane>
            <TabPane :label="withdraw" name="name2">
               <Table :columns="columns1" :data="data2"></Table>
               <Page :total="totalPage2" :page-size="1" show-elevator class="page" @on-change="onChangePage2"/>
            </TabPane>
         </Tabs>
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
      getCurrencyList,
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
            name: "transaction_history",
            animate: false,
            SSE_order: null,//订单推送
            symbolList: {},//交易接口的symbolList 接口
            totalPage1: 1,
            totalPage2: 1,
            currencyPrecision: {},
            txIdExplorer: {},

            deposit: (h) => {
               return h('div', {}, this.$t('czlsRecentDeposits'))
            },
            withdraw: (h) => {
               return h('div', {}, this.$t('czlsRecentWithdrawals'))
            },
            columns1: [
               {
                  key: 'createdAt',
                  width: 150,
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm:ss'))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsDate'))
                  }
               },
               {
                  key: 'currency',
                  render: (h, params) => {
                     return h('div', {}, params.row.currency)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsType'))
                  }
               },
               {
                  key: 'amount',
                  width: 180,
                  render: (h, params) => {
                     let quantityLong = this.currencyPrecision[params.row.currency] && this.currencyPrecision[params.row.currency]['currencyPrecision'] || 8
                     let quantity = bigDecimal.round(scientificToNumber(params.row.amount), quantityLong)
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsAmount'))
                  }
               },
               {
                  key: 'targetAddress',
                  width: 550,
                  render: (h, params) => {
                     let show = params.row[`show${params.index}`]
                     let targetAddress = params.row['targetAddress']
                     let label = null
                     let address = null
                     let txIdExplorer = this.txIdExplorer[params.row.currency]
                     if (params.row.currency === 'EOS') {
                        if (targetAddress) {
                           label = targetAddress.slice(targetAddress.indexOf(':') + 1)
                           address = targetAddress.slice(0, targetAddress.indexOf(':'))
                        }
                     } else {
                        address = targetAddress
                     }
                     return h('ul', {
                        style: {
                           lineHeight: '28px',
                           padding: '5px 0',
                        }
                     }, [
                        //地址
                        h('li', [
                           h('span', {
                              style: {
                                 color: '#AAB0CC'
                              }
                           }, `${this.$t('transactionHistoryAddress')}: `),
                           h('span', {}, address || '--')
                        ]),
                        //TXID
                        show === true ? h('li', {}, [
                           h('span', {
                              style: {
                                 color: '#AAB0CC'
                              }
                           }, 'TXID: '),
                           h('a', {
                              attrs: {
                                 href: params.row['txId'] ? txIdExplorer.replace('{{tx_id}}', params.row['txId']) : 'javascript:void (0)',
                                 target: '_blank'
                              },
                              style: {
                                 color: '#344857',
                                 cursor: params.row['txId'] ? 'pointer' : 'default'
                              }
                           }, params.row['txId'] || '--')
                        ]) : '',
                        //MEMO 只有eos存在
                        show === true ?
                           params.row.currency === 'EOS' ? h('li', {}, [
                              h('span', {
                                 style: {
                                    color: '#AAB0CC'
                                 }
                              }, 'MEMO: '),
                              h('span', {}, label || '--')
                           ]) : '' : ''
                     ])
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('transactionHistoryInfo'))
                  }
               },
               {
                  key: 'status',
                  align: 'right',
                  width: 140,
                  render: (h, params) => {
                     return h('div', {}, this.$t(params.row.status))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsStatus'))
                  }
               },
               {
                  title: ' ',
                  align: 'right',
                  width: 60,
                  render: (h, params) => {
                     let show = params.row[`show${params.index}`]
                     return h('Icon', {
                        attrs: {
                           type: show === true ? 'md-arrow-dropup' : 'md-arrow-dropdown'
                        },
                        style: {
                           fontSize: '30px',
                           cursor: 'pointer'
                        },
                        on: {
                           click: () => {
                              this.toggleShow(params.index, params.row.type)
                           }
                        }
                     },)
                  },
               },
            ],
            data1: [],
            data2: [],
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
            } else {
               this.$router.push({
                  path: `login`,
               })
            }
            (async () => {
               await new Promise(resolve => {
                  getCurrencyList().then(res => {//币种全称
                     res.map(v => {
                        this.txIdExplorer[v.currency] = v['coinInfos'][0]['txIdExplorer']
                        this.currencyPrecision[v.currency] = v.currencyPrecision
                     })
                     resolve()
                  })
               });
               await new Promise(resolve => {
                  this.getListDeposit()
                  this.getListWithdraw()
                  resolve();
               });
            })()
         },
         getListDeposit(currentPage = 1) {
            this.exchange.activityList('INCOMING', null, null, null, null, currentPage, 10, function (res) {
               this.mapData(res, 1)
            }.bind(this))
         },
         getListWithdraw(currentPage = 1) {
            this.exchange.activityList('OUTGOING', null, null, null, null, currentPage, 10, function (res) {
               this.mapData(res, 2)
            }.bind(this))
         },
         mapData(res, index) {//循环数据
            this[`totalPage${index}`] = res.pages
            if (res.data.length !== 0) {
               res.data.map((v, i) => {
                  v[`show${i}`] = false
               })
               this[`data${index}`] = res.data
            }
         },
         onChangePage1(currentPage) {
            this.getListDeposit(currentPage)
         },
         onChangePage2(currentPage) {
            this.getListWithdraw(currentPage)
         },
         toggleShow(index, type) {
            type === 'INCOMING' ? type = 'data1' : type = 'data2'
            this[type][index][`show${index}`] = !this[type][index][`show${index}`]
            this.$set(this[type])
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
   #historyTabs {
      .ivu-table td {
         height: 48px;
         line-height: 48px; //使td文字居中
         padding: 0;
         vertical-align: text-top; //！！！文字上方对齐
      }
   }

   #historyTabs table, th, td {
      border: none;
   }
</style>
<style lang="less" scoped>
   .wrapper {
      padding: 25px 0 10px;
      background-color: #F7F9FA;
      .content {
         width: 1200px;
         margin: 0 auto;
         background-color: #fff;
         min-height: 685px;
      }
      .header {
         width: 1200px;
         margin: 0 auto 10px;

         a {
            font-size: 14px;
            color: #AAB0CC;
         }
      }
   }

   .page {
      margin-top: 20px;
      text-align: right;
   }
</style>