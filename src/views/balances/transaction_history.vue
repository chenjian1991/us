<template>
   <div class="wrapper" id="historyTabs">
      <div class="header">
         <router-link to="/balances">{{$t('czBalances')}}</router-link>
         <a> > {{$t('czlsTransactionHistory')}}</a>
      </div>
      <div class="content">
         <Tabs v-model="tabName" :animated="false">
            <TabPane :label="$t('transactionHisCD')" name="name1">
               <Table :columns="columns1" :data="data1"></Table>
               <Page :total="totalPage1" :page-size="1" show-elevator class="page" @on-change="onChangePage1(current)"/>
            </TabPane>
            <TabPane :label="$t('transactionHisCW')" name="name2">
               <Table :columns="columns1" :data="data2"></Table>
               <Page :total="totalPage2" :page-size="1" show-elevator class="page" @on-change="onChangePage2"/>
            </TabPane>
            <TabPane :label="$t('transactionHisFD')" name="name3">
               <Table :columns="columns2" :data="data3"></Table>
               <Page :total="totalPage3" :page-size="1" show-elevator class="page" @on-change="onChangePage3"/>
            </TabPane>
            <TabPane :label="$t('transactionHisFW')" name="name4">
               <Table :columns="columns3" :data="data4"></Table>
               <Page :total="totalPage4" :page-size="1" show-elevator class="page" @on-change="onChangePage4"/>
            </TabPane>
            <TabPane :label="$t('transHis')" name="name5">
               <Table height='680' :columns="columns5" :data="data5"></Table>
            </TabPane>
         </Tabs>
      </div>
      <us-modal v-model="showModal" className="depositModal" width="750px" title="depositInstruction"
                okText="depositSubmit2" cancelText="depositCancel" :showBtn="false">
         <div class="alert-content">
            <p class="desc">{{$t('depositTitle')}}</p>
            <ul class="list">
               <li class="item">
                  {{$t('depositCon5')}} <span class="green-color">{{bankAccountName}}</span> {{$t('depositCon6')}}
               </li>
               <li class="item">
                  {{$t('depositCon8')}} <span style="font-weight: bold">{{$t('depositCon9')}}</span>
                  {{$t('depositCon10')}} <span class="green-color"
                                               style="font-weight: bold">{{reference}}</span>
                  {{$t('depositCon11')}}
               </li>
            </ul>
            <div class="information">
               <Row v-for="item in information" :key="item.key">
                  <Col span="7" class="col-left">{{$t(item['key'])}}</Col>
                  <Col span="17" class="col-right">{{item['value']}}</Col>
               </Row>
            </div>
            <p class="desc red-color">
               {{$t('depositCon12')}}
            </p>
         </div>
      </us-modal>
   </div>
</template>
<script>
   import {Exchange} from '@/interface/exchange.js'
   import moment, {isMoment} from 'moment'
   import bigDecimal from 'js-big-decimal' //除法失效
   import PasswordInput from '@/components/PasswordInput.vue'
   import Cookies from 'js-cookie'
   import usModal from '@/components/usModal'
   import { getCreateAccount,getAccountInfo } from '_api/exchange.js'
   import {postHeaderKeyIdBodyApi} from '../../../api/axios.js';
   import {commonRemite} from '../../../api/urls.js';



   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      scientificToNumber,
      parseUrl,
   } from '@/lib/utils.js'
   import {
      getIdentify,
   } from '_api/balances.js'

   export default {
      name: "order",
      components: {
         PasswordInput: PasswordInput,
         'us-modal': usModal
      },
      data() {
         return {
            name: "transaction_history",
            tabName: '',
            SSE_order: null,//订单推送
            symbolList: {},//交易接口的symbolList 接口
            totalPage1: 1,
            totalPage2: 1,
            totalPage3: 1,
            totalPage4: 1,
            currencyPrecision: {},
            txIdExplorer: {},
            //alert
            showModal: false,
            bankAccountName: localStorage.getItem('bankAccountName') || '',
            reference: '',
            message: {},
            information: [
               {
                  key: 'ptAccName',
                  label: 'beneficiaryName',
                  value: ''
               }, {
                  key: 'ptAccAddress',
                  label: 'beneficiaryAddress',
                  value: ''
               }, {
                  key: 'ptAccBankname',
                  label: 'bankName',
                  value: ''
               }, {
                  key: 'ptAccBankAddress',
                  label: 'bankAddress',
                  value: ''
               }, {
                  key: 'ptAccBankPhone',
                  label: 'bankPhone',
                  value: ''
               }, {
                  key: 'ptAccBankRouting',
                  label: 'routingNumber',
                  value: ''
               }, {
                  key: 'ptAccNumber',
                  label: 'accountNumber',
                  value: ''
               }, {
                  key: 'ptAccSwift',
                  label: 'SWIFTCode',
                  value: ''
               }, {
                  key: 'ptAccREF',
                  label: 'reference_number',
                  value: ''
               }],

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
                     let quantityLong = this.currencyPrecision[params.row.currency]
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
            columns5:[
                     {
                        // title: 'Time',
                        key: 'createsDate',
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transfertime'))
                        },
                        render:(h,params)=>{
                           return h('div',{},params.row.createsDate +' '+ params.row.createTime)
                        },
                    },
                    {
                        // title: 'Order ID',
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transferorderid'))
                        },
                        key: 'id',
                        width: 250,
                    },
                    {
                        // title: "Account Holder's Name",
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transferhodername'))
                        },
                        key: 'accountHolderName',
                         align: 'center',
                    },
                     {
                        // title: 'Account Number/IBAN',
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transferIBAN'))
                        },
                        key: 'accountNumber',
                         align: 'center',

                    },
                    {
                        // title: 'Send',
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transferSend'))
                        },
                        render:(h,params)=>{
                           return h('div',{},params.row.payAmount +' '+ params.row.tokenCode)
                        },
                        key: 'payAmount',
                        align: 'center',

                    },
                    {
                        // title: 'Receive',
                         renderHeader: (h) => {
                           return h('div', {}, this.$t('transferReceive'))
                        },
                        render:(h,params)=>{
                           return h('div',{},params.row.currencyNum +' '+ params.row.currencySimple)
                        },
                        key: 'currencyNum',
                         align: 'center',

                    },
                     {
                        // title: 'Status',
                        key: 'status',
                        renderHeader: (h) => {
                           return h('div', {}, this.$t('transferStatus'))
                        },
                        align: 'center',
                         render: (h, params) => {
                           return h('div', {}, this.$t(params.row.status))
                        },
                    }
            ],
            data5: [],
            data1: [],
            data2: [],
            data3: [],
            data4: [],
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
               this.$router.push('/login')
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
         getIdentify() { //实名认证
            if (this.bankAccountName) {
               this.information[0]['value'] = this.bankAccountName
               this.information = JSON.parse(JSON.stringify(this.information))
            } else {
               getIdentify(Cookies.get('loginToken')).then(res => {
                  localStorage.setItem('bankAccountName', res.data.firstName + res.data.lastName)
                  this.information[0].value = this.bankAccountName = localStorage.getItem('bankAccountName')
                  this.information = JSON.parse(JSON.stringify(this.information))
               })
            }
         },
         async  getHistoryTransfer(){
               await getCreateAccount({'ssoToken': Cookies.get('loginToken')}, {}).then(result =>{
                            this.accountToken = result.value
                    } )//accountToken
                await getAccountInfo({token: this.accountToken}).then(result => {
                        this.accountID = result.accountId
                    })//accountId
               let params = {
                  channelUserId:this.accountID,
                  createTime:'',
         }
           postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getRemittanceTradesList',"params":JSON.stringify(params)}).then((res)=>{
                            this.data5 = res.data.entity.remTradesList;
                        })
      }


      },
      beforeMount() {
         if (Object.keys(this.$route.params).length !== 0) {
            this.tabName = this.$route.params.id
         }
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         this.init()
         this.getHistoryTransfer()
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

   @color: #12869A;
   @red-color: #EA4853;
   .depositModal {
      .alert-content {
         padding: 25px 0 18px;
         .list {
            .item {
               color: #949DA6;
               margin-bottom: 15px;
            }
         }
         .information {
            .col-left, .col-right {
               font-size: 14px;
               color: #344857;
               line-height: 30px;
            }
            .col-right {
               font-weight: bold;
            }
         }
         .desc {
            font-size: 12px;
            color: #949DA6;
            margin-top: 15px;
            margin-bottom: 20px;
         }
         .green-color {
            color: @color !important;
         }
         .red-color {
            color: @red-color;
         }
      }
   }
</style>