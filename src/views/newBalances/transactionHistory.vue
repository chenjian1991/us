<template>
   <main id="historyTabs" class="historyTabs">
      <account-info name="transaction_history"></account-info>
      <div class="container pt-4 pb-4">
         <div class="header">
            <router-link to="/balances">{{$t('czBalances')}}</router-link>
            <a> > {{$t('czlsTransactionHistory')}}</a>
         </div>
         <div class="content bgc-fff">
            <ul class="nav nav-classic nav-borderless px-0 mb-2" id="pills-tab" role="tablist">
               <li class="nav-item">
                  <a class="nav-link active" id="deposit-tab" data-toggle="pill" href="#deposit-href"
                     role="tab"
                     aria-controls="pills-one" aria-selected="false">{{$t('transactionHisCD')}}</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" id="withdraw-tab" data-toggle="pill" href="#withdraw-href" role="tab"
                     aria-controls="pills-two" aria-selected="true">{{$t('transactionHisCW')}}</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" id="transfer-tab" data-toggle="pill" href="#transfer-href" role="tab"
                     aria-controls="pills-two" aria-selected="true">{{$t('transactionHisFD')}}</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" id="other-tab" data-toggle="pill" href="#other-href" role="tab"
                     aria-controls="pills-two" aria-selected="true">{{$t('transactionHisFW')}}</a>
               </li>
            </ul>
            <div class="tab-content middle pl-3 pr-3 pb-3" id="pills-tabContent">
               <div class="tab-pane fade active show" id="deposit-href" role="tabpanel" aria-labelledby="deposit-tab">
                  <Table :columns="columns1" :data="data1"></Table>
                  <Page :total="totalPage1" :page-size="1" show-elevator class="page" @on-change="onChangePage1"/>
               </div>
               <div class="tab-pane fade" id="withdraw-href" role="tabpanel" aria-labelledby="withdraw-tab">
                  <Table :columns="columns1" :data="data2"></Table>
                  <Page :total="totalPage2" :page-size="1" show-elevator class="page" @on-change="onChangePage2"/>
               </div>
               <div class="tab-pane fade" id="transfer-href" role="tabpanel" aria-labelledby="transfer-tab">
                  <Table :columns="columns2" :data="data3"></Table>
                  <Page :total="totalPage3" :page-size="1" show-elevator class="page" @on-change="onChangePage3"/>
               </div>
               <div class="tab-pane fade" id="other-href" role="tabpanel" aria-labelledby="other-tab">
                  <Table :columns="columns3" :data="data4"></Table>
                  <Page :total="totalPage4" :page-size="1" show-elevator class="page" @on-change="onChangePage4"/>
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
   import AccountInfo from '@/components/common/AccountInfo'

   import {getCreateAccount, getAccountInfo} from '_api/exchange.js'

   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      scientificToNumber,
      storage,
   } from '@/lib/utils.js'

   export default {
      name: "transaction_history",
      components: {
         'account-info': AccountInfo,
      },
      data() {
         return {
            tabName: '',
            accountToken: '',
            SSE_order: null,//订单推送
            symbolList: {},//交易接口的symbolList 接口
            totalPage1: 1,
            totalPage2: 1,
            totalPage3: 1,
            totalPage4: 1,

            pageInfo: {
               total: 0, //初始化信息总条数
               pageNo: 1,
               pageSize: 10,
            },

            currencyPrecision: {},
            txIdExplorer: {},
            accountID: '',
            statusMessage: '',
            transfer: (h) => {
               return h('div', {}, this.$t('transHis'))
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
                  width: 80,
                  render: (h, params) => {
                     return h('div', {}, params.row.currency)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsType'))
                  }
               },
               {
                  key: 'amount',
                  width: 150,
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
                  minWidth: 500,
                  render: (h, params) => {
                     let show = params.row[`show${params.index}`]
                     let targetAddress = params.row['targetAddress']
                     let label = null
                     let address = null
                     let txIdExplorer=''
                     this.txIdExplorer[params.row.currency].map(v=>{
                        if(params.row.currency==='USDT'){
                           if(v.coin===params.row.coin){
                              txIdExplorer = v.txIdExplorer
                           }
                        }else{
                           txIdExplorer = v.txIdExplorer
                        }
                     })
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
                  minWidth: 140,
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
                  width: 40,
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
            columns2: [
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
                  key: 'id',
                  render: (h, params) => {
                     return h('div', {}, params.row.id)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('transID'))
                  }
               },
               {
                  key: 'amount',
                  width: 180,
                  render: (h, params) => {
                     let quantityLong = this.currencyPrecision[params.row.currency]
                     let quantity = bigDecimal.round(scientificToNumber(params.row.amount), quantityLong)
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsAmount'))
                  }
               },
               {
                  key: 'status',
                  align: 'right',
                  width: 140,
                  render: (h, params) => {
                     if (params.row.status === 'SUBMITTED') {
                        return h('div', [h('span', this.$t(params.row.status)), h('a', {
                           style: {
                              color: '#12869A',
                              marginLeft: '5px',
                              fontSize: '12PX'
                           },
                           on: {
                              click: () => {
                                 this.showModal = true
                                 this.message = parseUrl(params.row.fromAddress)
                                 console.log(this.message)
                                 this.getIdentify()
                                 this.information.map(v => {
                                    v.value = this.message[v.label]
                                 })
                                 this.reference = this.message['reference_number']
                              }
                           }
                        }, this.$t('transView'))])
                     } else {
                        return h('div', this.$t(params.row.status))
                     }
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsStatus'))
                  }
               },
            ],
            columns3: [
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
                  key: 'id',
                  render: (h, params) => {
                     return h('div', {}, params.row.id)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('transID'))
                  }
               },
               {
                  key: 'amount',
                  width: 180,
                  render: (h, params) => {
                     let quantityLong = this.currencyPrecision[params.row.currency]
                     let quantity = bigDecimal.round(scientificToNumber(params.row.amount), quantityLong)
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('czlsAmount'))
                  }
               },
               {
                  key: 'fee',
                  width: 180,
                  render: (h, params) => {
                     let quantityLong = this.currencyPrecision[params.row.currency]
                     let quantity = bigDecimal.round(scientificToNumber(params.row.fee), quantityLong)
                     return h('div', {}, quantity)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('tsTransactionFee'))
                  }
               },
               {
                  key: 'Bank Account',
                  width: 180,
                  render: (h, params) => {
                     let bankAccountNumber = `${params.row.targetAddress.bankName}(****${(params.row.targetAddress.bankAccountNumber).slice(-4)})`
                     return h('div', {}, bankAccountNumber)

                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('transAcc'))
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
            ],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
            currencyList:[],
         }
      },
      methods: {
         init() {
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
            (async () => {
               await new Promise(resolve => {
                  getCurrencyList().then(res => {//币种全称
                     this.currencyList=res
                     res.map(v => {
                        // this.txIdExplorer[v.currency] = v['coinInfos'][0]['txIdExplorer']
                        this.txIdExplorer[v.currency] = v['coinInfos']

                        this.currencyPrecision[v.currency] = v.currencyPrecision
                     })
                     resolve()
                  })
               });
               await new Promise(resolve => {
                  this.getListDeposit()
                  this.getListWithdraw()
                  this.getListDepositUSD()
                  this.getListWithdrawUSD()
                  resolve();
               });
            })()
         },
         getListDeposit(currentPage = 1) {
            let params = {
               type: 'INCOMING',
               page: currentPage,
               actionType: null,
               limit: 10
            }
            this.exchange.activityList(params, 'currencyNotIn', function (res) {
               this.mapData(res, 1)
            }.bind(this))
         },
         getListWithdraw(currentPage = 1) {
            let params = {
               type: 'OUTGOING',
               page: currentPage,
               actionType: null,
               limit: 10
            }
            this.exchange.activityList(params, 'currencyNotIn', function (res) {
               this.mapData(res, 2)
            }.bind(this))
         },
         getListDepositUSD(currentPage = 1) {
            let params = {
               type: 'INCOMING',
               page: currentPage,
               actionType: 'USD_INCOMING',
               limit: 10
            }
            this.exchange.activityList(params, 'currencyIn', function (res) {
               this.mapData(res, 3)
            }.bind(this))
         },
         getListWithdrawUSD(currentPage = 1) {
            let params = {
               type: 'OUTGOING',
               page: currentPage,
               actionType: 'USD_WITHDRAW',
               limit: 10
            }
            this.exchange.activityList(params, 'currencyIn', function (res) {
               this.mapData(res, 4)
            }.bind(this))
         },
         mapData(res, index) {//循环数据
            this[`totalPage${index}`] = res.pages
            if (res.data.length !== 0) {
               res.data.map((v, i) => {
                  v[`show${i}`] = false
                  if (index === 4) {
                     if (v['targetAddress']) {
                        v['targetAddress'] = parseUrl(v['targetAddress'])
                     }
                  }
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
         onChangePage3(currentPage) {
            this.getListDepositUSD(currentPage)
         },
         onChangePage4(currentPage) {
            this.getListWithdrawUSD(currentPage)
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
      },
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
      .ivu-table-overflowX::-webkit-scrollbar {
         display: none;
      }
   }

   #historyTabs table, th, td {
      border: none;
   }

   #historyTabs .ivu-select-selection,
   #historyTabs .ivu-select-selection-foucsed,
   #historyTabs .ivu-select-selection:hover,
   #historyTabs .ivu-select-visible .ivu-select-selection {
      border-color: #12869A !important;
   }

   #historyTabs .ivu-select-item-selected, #historyTabs .ivu-select-item-selected:hover {
      color: #12869A !important;
   }
</style>
<style lang="less" scoped>
   @import './balances.less';

   @color-light-gary: #E7EAED;
   @color-green: #12869A;

   #historyTabs {
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

   .historyTabs {
      min-height: 100%;
      .content {
         min-height: 635px;

      }
      .header {
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
