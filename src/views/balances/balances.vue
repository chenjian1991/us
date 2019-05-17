<template>
   <div class="wrapper" id="balances">
      <div class="content">
         <div class="top">
            <div class="top-common">
               <p class="title">{{$t('zcEstimatedValue')}}</p>
               <div class="value">
                  <Col span="18">
                     <em>{{total_BTC}}</em>
                     BTC&nbsp;&nbsp;≈ {{legalCurrency}} {{currentCurrency.name}}
                  </Col>
               </div>
            </div>
            <!--USD balances-->
            <div class="top-common">
               <Row>
                  <Col span="2">
                     <img src="../../assets/images/balances/balance.png" style="width: 26px;margin-top: 5px">
                  </Col>
                  <Col span="22">
                     <div class="top-right-up">
                        <span class="title">{{$t('balanceAvailable')}}</span>
                        <span v-if="levelStatus==='verified'">
                           <div class="kyc-status verified">{{$t('balanceVerified')}}
                              <Icon type="md-checkmark" class="verified-icon"/>
                           </div>
                        </span>
                        <span v-else-if="levelStatus==='rejected'">
                           <router-link to="amlkycResult" class="kyc-status rejected">{{$t('balanceRejected')}}
                              <Icon type="md-close"/>
                           </router-link>
                        </span>
                        <span v-else-if="levelStatus==='unverified'">
                           <router-link to="amlKyc" class="kyc-status unverified">{{$t('balanceUnverified')}}
                              <Icon type="ios-arrow-forward"/>
                           </router-link>
                        </span>
                        <span v-else>
                           <router-link to="amlkycResult" class="kyc-status unverified">{{$t('balanceSubmit')}}
                              <Icon type="ios-arrow-forward"/>
                           </router-link>
                        </span>
                        <a target="_blank" href="https://www.gcodigital.com/">
                           <img style="width:156px;height:16px;float:right;" src="../../assets/images/balances/gco-logo@2x.png" alt="">
                        </a>
                        
                     </div>
                     <div class="space-between">
                        <div><em>{{USD}}</em>&nbsp;&nbsp;<span>USD</span></div>
                        <div>
                           <a class="balancesBtn deposit-hover deposit-color" @click="checkState('deposit_usd')">{{$t('zcDeposit')}}</a>
                           <a class="balancesBtn withdrawal-hover withdrawal-color"
                              @click="checkState('withdrawal_usd')">{{$t('zcWithdrawal')}}</a>
                           <a class="balancesBtn bank-color" @click="checkState('bankSetting')">
                              <!--<img src="../../assets/images/balances/bank.png" style="width: 15px;margin-right: 8px">-->
                              <Icon type="ios-card-outline" class="icon"/>
                              {{$t('balanceBank')}}</a>
                        </div>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         <div class="middle">
            <Row class="filter-box">
               <Col span="12">
                  <!--隐藏小额资产-->
                  <div class="hide-btn" :class="hideSmallBalance===true?'hide-balances':'no-hide'"
                       @click="hideZeroBalances">
                     <div class="hide-ball" :class="animateStatus"></div>
                  </div>
                  <span>{{$t('BalancesHide')}}</span>
                  <div class="tooltip-center">
                     <!--问号上提示-->
                     <Tooltip :content="$t('BalancesHideValue')" placement="top">
                        <Icon type="ios-help-circle" class="help-icon"/>
                     </Tooltip>
                  </div>
               </Col>
               <Col span="12"></Col>
            </Row>
            <!--币种搜索-->
            <Input suffix="ios-search" class="search" v-model="currencyInput" @on-change="search"/>
            <div class="close-box" v-show="showCloseIcon">
               <Icon type="md-close-circle" class="close" @click="clear"/>
            </div>
            <Spin fix v-if="showSpin" class="spin">
               <Icon type="ios-loading" size=26 class="demo-spin-icon-load"></Icon>
            </Spin>
            <Tabs value="name2" :animated="animate">
               <TabPane :label="$t('zcBSiteAccount')" name="name2">
                  <Table :columns="columns1" :data="dataB"></Table>
               </TabPane>
               <TabPane :label="$t('headercoustomerchain')" name="name5">
                  <Table :columns="columns1" :data="dataC"></Table>
               </TabPane>
            </Tabs>
         </div>
      </div>
      <!--实名认证1-->
      <us-modal v-model="showNoVerification1" className="alertModal" width="750px" title="balanceNotice"
                okText="noticeL1" cancelText="nextTime" @ok="ok1" @cancel="cancel1" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoticeCon1')}}</h4>
         </div>
      </us-modal>
      <!--实名认证2-->
      <us-modal v-model="showNoVerification2" className="alertModal" width="750px" title="balanceNotice"
                okText="noticeL2" cancelText="nextTime" @ok="ok2" @cancel="cancel" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoticeCon')}}</h4>
         </div>
      </us-modal>
      <!--设置银行卡-->
      <us-modal v-model="showNoBank" className="alertModal" width="750px" title="balanceNotice" okText="balanceToBank"
                cancelText="nextTime" @ok="checkState('bankSetting')" @cancel="cancel" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoBank')}}</h4>
         </div>
      </us-modal>
   </div>
</template>

<script>
   import {Exchange} from '@/interface/exchange.js'
   import {Market} from '@/interface/market.js'
   import bigDecimal from 'js-big-decimal' //除法失效
   import Cookies from 'js-cookie'
   import moment from 'moment'
   import alertModal from '@/components/alertModal'
   import usModal from '@/components/usModal'

   import {
      getSymbolList,
      getCurrencyList,
      getSymbolList_realtime,
   } from '_api/exchange.js'
   import {
      getRealtimeList, queryState, getIdentify
   } from '_api/balances.js'

   import {
      scientificToNumber,
      addSymbolSplitLine,
      getDecimalsNum,
      storage,
      subNumberPoint,
   } from '@/lib/utils.js'
   import {getApi} from '_api/axios'

   export default {
      name: "balances",
      components: {
         alertModal: alertModal,
         'us-modal': usModal
      },
      data() {
         return {
            animate: false,//tab 动画禁用
            showSpin: true,//加载中
            currencyList: [],//币种数据
            allAccount: {},//总数据
            filterAllAccount: {},//过滤总数据
            filterHideAccount: {},//过滤
            symbolList: {},//交易接口的symbolList 接口
            balancesList: [],//资产
            currencyImg: '',//图标
            siteTypeList: [],//所有站 ！！！
            exchangeList: [],//交易对
            realTimeList: {},//行情
            currencyPrecision: {},//小数位数
            total_USDT: '--', //总USDT
            total_BTC: '--', // 总BTC
            legalCurrency: '--',//法币估值
            currentCurrency: {},//法币
            totalPage: 1,
            sortName: '',
            directive: '',
            kycStatus: '',
            checkStatus: '',
            showNoVerification1: false,
            //us
            levelStatus: '',
            USD: 0,
            //alert
            showNoVerification2: false,
            showNoBank: false,
            //排序
            animateStatus: '',
            availableSort: false,
            frozenSort: false,
            totalSort: false,
            USDTSort: false,
            currencySort: false,
            hideSmallBalance: false,
            changeSearch: false,
            showCloseIcon: false,
            currencyInput: '',
            sortList: ['currency', 'available', 'frozen', 'total', 'USDT'],
            columns1: [
               {
                  key: 'imgSrc',
                  width: 50,
                  align: 'left',
                  renderHeader: (h) => {
                     return h('div', {}, '')
                  },
                  render: (h, params) => {
                     return h('img', {
                        attrs: {
                           src: params.row.imgSrc
                        }
                     },)
                  }
               },
               {
                  key: 'currency',
                  width: 100,
                  renderHeader: (h) => {
                     const params = 'currency'
                     return h('div', {
                        style: {
                           cursor: 'pointer'
                        },
                        on: {
                           click: () => {
                              this.balancesSort(params)
                              this.sortColor(params)
                           }
                        }
                     }, [h('div', {
                        style: {
                           display: 'inline-block'
                        }
                     }, this.$t('zcType')),
                        h('span', {
                              style: {
                                 fontSize: '14px'
                              }
                           }, [h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropup'
                              },
                              style: {
                                 position: 'absolute',
                                 color: this.sortName === params && this.directive === false ? '#12869A' : '#949DA6'
                              }
                           }
                           ), h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropdown'
                              },
                              style: {
                                 marginTop: '8px',
                                 color: this.sortName === params && this.directive === true ? '#12869A' : '#949DA6'
                              }
                           }
                           )],
                        )])
                  }
               },
               {
                  key: 'available',
                  width: 180,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.available || '--')
                  },
                  renderHeader: (h) => {
                     const params = 'available'
                     return h('div',
                        {
                           style: {
                              cursor: 'pointer'
                           },
                           on: {
                              click: () => {
                                 this.balancesSort(params)
                                 this.sortColor(params)
                              }
                           }
                        },
                        [h('div',
                           {
                              style: {
                                 display: 'inline-block'
                              }
                           }, this.$t('zcBalance')),
                           h('span',
                              {
                                 style: {
                                    fontSize: '14px',
                                    position: 'relative'
                                 },
                              },
                              [h('Icon',
                                 {
                                    attrs: {
                                       type: 'md-arrow-dropup'
                                    },
                                    style: {
                                       position: 'absolute',
                                       color: this.sortName === params && this.directive === true ? '#12869A' : '#949DA6'
                                    }
                                 }
                              ), h('Icon',
                                 {
                                    attrs: {
                                       type: 'md-arrow-dropdown'
                                    },
                                    style: {
                                       marginTop: '8px',
                                       color: this.sortName === params && this.directive === false ? '#12869A' : '#949DA6'
                                    }
                                 }
                              )],
                           )
                        ]
                     )
                  }
               },
               {
                  key: 'frozen',
                  width: 180,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.frozen || '--')
                  },
                  renderHeader: (h) => {
                     const params = 'frozen'
                     return h('div', {
                        style: {
                           cursor: 'pointer'
                        },
                        on: {
                           click: () => {
                              this.balancesSort(params)
                              this.sortColor(params)
                           }
                        }
                     }, [h('div', {
                        style: {
                           display: 'inline-block'
                        }
                     }, this.$t('zcInOrders')),
                        h('span', {
                           style: {
                              fontSize: '14px'
                           }
                        }, [h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropup'
                              },
                              style: {
                                 position: 'absolute',
                                 color: this.sortName === params && this.directive === true ? '#12869A' : '#949DA6'
                              }
                           }
                        ), h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropdown'
                              },
                              style: {
                                 marginTop: '8px',
                                 color: this.sortName === params && this.directive === false ? '#12869A' : '#949DA6'
                              }
                           }
                        )],)])
                  }
               },
               {
                  key: 'total',
                  width: 180,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.total || '--')
                  },
                  renderHeader: (h) => {
                     const params = 'total'
                     return h('div', {
                        style: {
                           cursor: 'pointer'
                        },
                        on: {
                           click: () => {
                              this.balancesSort(params)
                              this.sortColor(params)
                           }
                        }
                     }, [h('div', {
                        style: {
                           display: 'inline-block'
                        }
                     }, this.$t('zcTotal')),
                        h('span', {
                           style: {
                              fontSize: '14px'
                           }
                        }, [h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropup'
                              },
                              style: {
                                 position: 'absolute',
                                 color: this.sortName === params && this.directive === true ? '#12869A' : '#949DA6'
                              }
                           }
                        ), h('Icon',
                           {
                              attrs: {
                                 type: 'md-arrow-dropdown'
                              },
                              style: {
                                 marginTop: '8px',
                                 color: this.sortName === params && this.directive === false ? '#12869A' : '#949DA6'
                              }
                           }
                        )],)])
                  }
               },
               {
                  key: 'operate',
                  // width: 350,
                  align: 'right',
                  render: (h, params) => {
                     let url = ''
                     let siteType = params.row.siteType
                     siteType.map(v => {//充值提现的URL 注意5站域名
                        if (v === 'B') {
                           url = '../..'
                        } else {
                           url = `https://${v.toLowerCase()}.55.com`
                        }
                     })

                     let deposit = false
                     let withdraw = false
                     //充值提现状态
                     switch (params.row.status) {
                        case "DEPOSIT_NOT_WITHDRAW":
                           deposit = true;
                           withdraw = false;
                           break;
                        case "NOT_DEPOSIT_WITHDRAW":
                           deposit = false;
                           withdraw = true;
                           break;
                        case "NOT_DEPOSIT_NOT_WITHDRAW":
                           deposit = false;
                           withdraw = false;
                           break;
                        default:
                           deposit = true;
                           withdraw = true;
                           break;
                     }

                     return h('div', {
                           style: {
                              position: 'relative',
                              float: 'right'
                           },
                        },
                        [
                           h('a', {// 充值
                              'class': {
                                 'balancesBtn': true,
                                 'deposit-hover': true
                              },//类名绑定方式 class需是全局的
                              style: {
                                 marginRight: '8px',
                                 color: deposit ? '#12869A' : '#949DA6',
                                 borderColor: deposit ? '#12869A' : '#949DA6',
                                 cursor: deposit ? 'pointer' : 'not-allowed'
                              },
                              props: {
                                 disabled: deposit,
                              },
                              on: {
                                 click: () => {
                                    if (deposit) {
                                       if (!this.checkStatus) {
                                          getIdentify(Cookies.get('loginToken')).then(res => {//实名认证
                                             this.checkStatus = res.data.checkStatus
                                             this.dealCheckStatus(params.row.currency, 'deposit')
                                          })
                                       } else {
                                          this.dealCheckStatus(params.row.currency, 'deposit')
                                       }
                                    }
                                 }
                              }
                           }, this.$t('zcDeposit')),
                           h('a', {// 提现
                              'class': {
                                 'balancesBtn': true,
                                 'withdrawal-hover': true
                              },
                              style: {
                                 marginRight: '8px',
                                 color: withdraw ? '#66B76D' : '#949DA6',
                                 borderColor: withdraw ? '#66B76D' : '#949DA6',
                                 cursor: withdraw ? 'pointer' : 'not-allowed'
                              },
                              props: {
                                 disabled: withdraw,
                              },
                              on: {
                                 click: () => {
                                    if (withdraw) {
                                       if (!this.checkStatus) {
                                          getIdentify(Cookies.get('loginToken')).then(res => {//实名认证
                                             this.checkStatus = res.data.checkStatus
                                             this.dealCheckStatus(params.row.currency, 'withdrawal')
                                          })
                                       } else {
                                          this.dealCheckStatus(params.row.currency, 'withdrawal')
                                       }
                                    }
                                 }
                              }
                           }, this.$t('zcWithdrawal')),
                           h('a',// 交易
                              {
                                 style: {
                                    display: 'inline-block',
                                 },
                                 on: {
                                    mouseenter: (e) => {
                                       e.target.lastElementChild.style.display = 'block' //目标元素的最后一个子元素
                                    },
                                    mouseleave: (e) => {
                                       e.target.lastElementChild.style.display = 'none'
                                    },
                                 }
                              },
                              [
                                 h('div', {
                                    'class': {'balancesBtn': true},
                                    style: {
                                       color: '#0E7DFF',
                                       borderColor: '#0E7DFF'
                                    },
                                 }, this.$t('zcTrade')),
                                 h('dl', {
                                       'class': {'tradeBox': true},
                                       style: {
                                          display: 'none'
                                       },
                                    },
                                    params.row['list'] && params.row['list'].length !== 0 ? params.row.list.map(function (v) {//有交易对
                                       return h('dt', {
                                          'class': {'tradeBtn': true},
                                          on: {
                                             click: () => {
                                                //跳转交易页 注意5站域名情况
                                                siteType.map(value => {
                                                   this.$router.push({
                                                      path: 'exchange',
                                                      query: {
                                                         'symbol': v.replace(/\//, ''),
                                                         'site': value
                                                      }
                                                   })
                                                })
                                             }
                                          }
                                       }, v)
                                    }.bind(this)) : ''//没有交易对
                                 )
                              ],
                           )
                        ])
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('zcOperation'))
                  }
               }
            ],
            dataB: [],
            dataC: [],
         }
      },
      methods: {
         init() {
            this.queryState()
            let currencyList = new Promise(resolve => {
               getCurrencyList().then(result => {//币种
                  //过滤S站 注意 过滤不改变原数据
                  this.currencyList = result.filter(v => {
                     v.siteType = v.siteType.filter(value => {//siteTypeList 所有站
                        if (value !== 'S') {
                           return value
                        }
                     })
                     if (v.siteType.length !== 0) {
                        return v
                     }
                  })
                  this.siteTypeList.push('ALL')//站
                  this.allAccount = {'ALL': []}//账户
                  this.currencyList.map(v => {
                     v.siteType.map(value => {//siteTypeList 所有站
                        if (!this.siteTypeList.includes(value)) {//判断siteTypeList是否含有该站
                           this.siteTypeList.push(value)
                           this.allAccount[value] = []
                        }
                     })
                     this.currencyImg += `${v['currency']},`;//获取币种图标的参数
                  })
                  resolve()
               })
            })
            let quoteList = new Promise(resolve => {
               getRealtimeList().then(result => {//行情
                  result.map(v => {
                     this.realTimeList[v.symbol] = v.last
                  })
                  resolve()
               })
            })
            let balanceList = new Promise(resolve => {
               this.exchange.balance(function (result) {//获取资产
                  this.balancesList = result
                  resolve()
               }.bind(this))
            })
            Promise.all([currencyList, quoteList, balanceList]).then(() => {
               this.getCurrencyList()
               this.getValuation()
               this.getCurrencyImgList()
               this.getQuoteList()
            }).catch(() => {
               setTimeout(function () {
                  this.showSpin = false  //加载完成
               }.bind(this), 1000)
            })
         },
         getCurrencyList() {//处理币种列表
            this.currencyList.map(v => {
               this.exchangeList.push({currency: v.currency, list: []})
               v.siteType.map(value => {//数据放入这个站中
                  this.allAccount[value].push({currency: v.currency, siteType: [value], status: v.status})
               })
               this.allAccount['ALL'].push({currency: v.currency, siteType: v.siteType, status: v.status})//全部通证
               this.currencyPrecision[v.currency] = v.currencyPrecision//小数位数
            })
            //美国站6种币
            const bSite = ['BTC', 'LTC', 'ETH', 'ZEC', 'DASH', 'XLM']
            this.allAccount['B'] = this.allAccount['B'].filter(v => {
               let flag = false
               bSite.map(value => {
                  if (v.currency === value) {
                     flag = true
                  }
               })
               if (flag) {
                  return flag
               }
            })
            // end
            this.siteTypeList.map(val => {//各站附初始值币种
               let data = `data${val}`
               this[data] = this.allAccount[val]
            })
         },
         getBalance() {//单独写在方法里 如果加活动 方便调取资产接口
            this.exchange.balance(function (result) {//获取资产
               if (result.length !== 0) {
                  result.map((v) => {
                     let precision = this.currencyPrecision[v.currency]
                     if (v['available'] < 0.00000001) {
                        v['available'] = 0
                     }
                     if (v['frozen'] < 0.00000001) {
                        v['frozen'] = 0
                     }
                     v['total'] = this.transferNumber(subNumberPoint(v['available'] + v['frozen'], precision), precision) //计算总值
                     v['available'] = this.transferNumber(subNumberPoint(v['available'], precision), precision)
                     v['frozen'] = this.transferNumber(subNumberPoint(v['frozen'], precision), precision)
                     this.mapCurrencyList(v, ['available', 'frozen', 'total'], [v['available'], v['frozen'], v['total']])
                  })
               }
               this.balancesList = result
               this.getValuation()
            }.bind(this))
         },
         getValuation() {//计算估值
            let BTC_USDD = this.realTimeList['BTCUSDD']
            let ETH_USDD = this.realTimeList['ETHUSDD']
            this.total_USDT = 0
            this.total_BTC = 0
            if (this.balancesList.length !== 0) {
               this.balancesList.map((v) => {
                  let precision = this.currencyPrecision[v.currency]
                  if (v['available'] < 0.00000001) {
                     v['available'] = 0
                  }
                  if (v['frozen'] < 0.00000001) {
                     v['frozen'] = 0
                  }
                  if (v.currency === 'USD') {
                     this.USD = this.transferNumber(subNumberPoint(v['available'], 2), 2)
                  }
                  v['total'] = this.transferNumber(subNumberPoint(v['available'] + v['frozen'], precision), precision) //计算总值
                  v['available'] = this.transferNumber(subNumberPoint(v['available'], precision), precision)
                  v['frozen'] = this.transferNumber(subNumberPoint(v['frozen'], precision), precision)
                  this.mapCurrencyList(v, ['available', 'frozen', 'total'], [v['available'], v['frozen'], v['total']])
               })
               this.balancesList.map(v => {
                  if (this.realTimeList[`${v.currency}USDD`]) {//和USDD有交易对
                     v['USDT'] = this.transferNumber(bigDecimal.multiply(v.total, this.realTimeList[`${v.currency}USDD`]), 2)
                  } else if (this.realTimeList[`${v.currency}USDT`]) {//和USDT有交易对
                     v['USDT'] = this.transferNumber(bigDecimal.multiply(v.total, this.realTimeList[`${v.currency}USDT`]), 2)
                  } else if (this.realTimeList[`${v.currency}ETH`]) {//和ETH有交易对
                     let last = this.realTimeList[`${v.currency}ETH`]
                     let symbolETH = bigDecimal.multiply(v.total, last)
                     v['USDT'] = this.transferNumber(bigDecimal.multiply(symbolETH, ETH_USDD || 0), 2)
                  } else if (v.currency === 'USDD') {//usdd本身
                     v['USDT'] = this.transferNumber(v.total, 2)
                  } else if (v.currency === 'USDT') {//usdt本身
                     v['USDT'] = this.transferNumber(v.total, 2)
                  }
                  this.total_USDT += Number(this.transferNumber(v['USDT'], 2))//usdd总值
                  if (v['USDT']) {//过滤有资产没有币种的情况
                     this.mapCurrencyList(v, ['USDT'], v['USDT'])//交易对
                  }
               })
               this.total_USDT = this.transferNumber(this.total_USDT, 2)
               this.total_BTC = this.transferNumber(this.total_USDT / BTC_USDD, this.currencyPrecision['BTC'])//btc总值
               this.legalCurrency = this.transferNumber(bigDecimal.multiply(this.total_USDT, this.currentCurrency.rate), 2)//法币估值
            }
            // this.siteTypeList.map(val => {//各站附初始值币种
            //    let data = `data${val}`
            //    this[data] = this.allAccount[val]
            // })
            this.showSpin = false
            this.balancesSort('total')
            this.sortColor('total')
            this.filterData()
         },
         getCurrencyImgList() {//币种logo
            this.market.getCurrencyInfo(this.currencyImg, function (res) {
               res.map(v => {
                  let value = v['projectInfo'].image
                  this.mapCurrencyList(v, ['imgSrc'], [value])
               })
               this.filterData()
            }.bind(this))
         },
         getQuoteList() {//获取行情交易对
            getSymbolList_realtime().then(res => {
               res.map((v) => {
                  this.exchangeList.map(value => {
                     if (v['baseAsset'] === value['currency']) {
                        if (v.quoteAsset === 'USDT' || v.quoteAsset === 'USDD') {//过滤 USDT和USDD的右侧币
                           return
                        } else {
                           value['list'].push(`${v.baseAsset}/${v.quoteAsset}`)//exchangeList加入交易对
                        }
                     }
                  })
               })
               this.exchangeList.map(v => {
                  this.mapCurrencyList(v, ['list'], v['list'])//交易对
               })
               this.filterData()
            })
         },
         mapCurrencyList(v, key, value) {//遍历币种
            this.siteTypeList.map(val => {
               this.allAccount[val].map(data => {
                  if (v['currency'] === data['currency']) {
                     if (key.length === 1) {
                        data[key[0]] = value
                     } else {
                        key.map((v1, i) => {
                           data[v1] = value[i]
                        })
                     }
                  }
               })
            })
         },
         filterData() {//更新数据！！！
            this.siteTypeList.map(val => {
               let data = `data${val}`
               this[data] = this[data].filter(v => {
                  return v
               })
            })
         },
         filter(type) {
            this.filterSort(type)
            this.filterHide()
            if (this.changeSearch || this.currencyInput) {//搜索或者有搜索内容
               this.filterSearch()
            } else {
               this.filterHideAccount = Object.assign({}, this.filterAllAccount)
            }

            this.siteTypeList.map(val => {
               let data = `data${val}`
               this[data] = this.filterHideAccount[val]
            })
         },
         filterSort(type) {
            if (type) {
               if (this[`${type}Sort`]) {//如果排序过 则逆序显示
                  this.siteTypeList.map(val => {
                     const noBalance = this.allAccount[val].filter(v => {
                        if (!v[type]) {
                           return v
                        }
                     })//没有资产的数据
                     this.allAccount[val] = this.allAccount[val].filter(v => {
                        if (v[type]) {
                           return v
                        }
                     }).reverse().concat(noBalance)//数组逆序
                  })
               } else {
                  if (type === 'currency') {
                     this.siteTypeList.map(val => {
                        this.allAccount[val] = this.allAccount[val].sort((a, b) => {
                           return a.currency.localeCompare(b.currency)//字符串比较大小方法
                        })
                     })
                  } else {
                     this.siteTypeList.map(val => {
                        const noBalance = this.allAccount[val].filter(v => {
                           if (!v[type]) {
                              return v
                           }
                        })//没有资产的数据
                        this.allAccount[val] = this.allAccount[val].filter(v => {
                           if (v[type]) {
                              return v
                           }
                        }).sort((b, a) => {
                           return a[type] - b[type]
                        }).concat(noBalance)
                     })
                  }
               }
               this.filterAllAccount = Object.assign({}, this.allAccount)
            } else {
               if (Object.keys(this.filterAllAccount).length === 0) {
                  this.filterAllAccount = Object.assign({}, this.allAccount)// filterAllAccount赋值
               }
            }
         },
         filterHide() {
            if (this.hideSmallBalance) {
               this.siteTypeList.map(val => {
                  this.filterAllAccount[val] = this.filterAllAccount[val].filter(v => {
                     if (v.USDT > 3) {
                        return v
                     }
                  })
               })
            } else {
               this.filterAllAccount = Object.assign({}, this.allAccount)
            }
         },
         filterSearch() {
            this.changeSearch = false
            let name = this.currencyInput.toUpperCase()
            this.siteTypeList.map(val => {
               this.filterHideAccount[val] = this.filterAllAccount[val].filter(v => {
                  if (v.currency.includes(name)) {
                     return v
                  }
               })
            })
         },
         resetStatus() {
            this.sortList.map(v => {//使排序重置状态
               this[`${v}Sort`] = false
            })
         },
         hideZeroBalances() {
            this.hideSmallBalance = !this.hideSmallBalance
            if (this.hideSmallBalance) {//隐藏小额资产
               this.animateStatus = 'to-right'
            } else {//取消隐藏
               this.animateStatus = 'to-left'
            }
            this.filter()
         },
         balancesSort(type) {//排序
            this.filter(type)
            this.resetStatus()
            this[`${type}Sort`] = true//再次点击时会reverse()
         },
         search() {
            this.changeSearch = true//触发
            if (this.currencyInput) {
               this.showCloseIcon = true
            } else {
               this.showCloseIcon = false
            }
            this.filter()
         },
         sortColor(value) {
            if (this.sortName === value) {
               this.directive = !this.directive
            } else {
               this.directive = false
            }
            this.sortName = value
         },
         clear() {
            this.currencyInput = ''
            this.changeSearch = true//触发
            this.showCloseIcon = false
            this.filter()
         },
         transferNumber(number, num = 8) {//保x留小数位与科学计数法转换
            if (number === '--') {
               return '--'
            } else if (number === undefined) {//逐条推送会导致有些交易对还没结果 所以需要处理underfind的情况
               return 0
            } else {
               return bigDecimal.round(scientificToNumber(number), num)
            }
         },
         dealCheckStatus(currency, path) {
            if (this.checkStatus === "PASSED") {
               this.$router.push({
                  path: path,
                  query: {
                     'currency': currency
                  }
               })
            } else if (this.checkStatus === "NOT_SET") {
               this.showNoVerification1 = true
            } else {
               this.$router.push('identityResult')
            }
         },
         queryState() {//实名认证2
            queryState(Cookies.get('loginToken')).then(res => {//是否实名
               // 没有提交:NOHAVE 提交(提交数据):SUBMIT 等待(提交第三方):PENDING 失败:FAIL 成功:SUCCESS
               switch (res.data.result) {
                  case 'NOHAVE':
                     this.levelStatus = 'unverified'
                     break
                  case 'SUBMIT':
                     this.levelStatus = 'submitted'
                     break
                  case 'PENDING':
                     this.levelStatus = 'pending'
                     break
                  case 'FAIL':
                     this.levelStatus = 'rejected'
                     break
                  case 'SUCCESS':
                     this.levelStatus = 'verified'
                     break
                  default:
                     this.levelStatus = 'unverified'
                     break
               }
            })
         },
         checkState(page) {
            //充值前判断 实名认证
            if (this.levelStatus === 'verified') {
               try {
                  if (page === 'withdrawal_usd') {
                     this.exchange.withdrawAddress('USD', function (res) {//提现的时候判断没有设置银行卡 跳转银行卡页面
                        if (res.length === 0) {
                           this.showNoBank = true
                           throw new Error()
                        } else {
                           this.$router.push(page)
                        }
                     }.bind(this))
                  } else {
                     this.$router.push(page)
                  }
               } catch (e) {
               }
            } else if (this.levelStatus === 'unverified') {
               this.showNoVerification2 = true
            } else {
               this.$router.push('amlkycResult')
            }
         },
         cancel1() {
            this.showNoVerification1 = false
         },
         cancel() {
            this.showNoVerification2 = false
            this.showNoBank = false
         },
         ok1() {
            this.$router.push('identiy')
         },
         ok2() {//跳转实名认证2
            this.$router.push('amlKyc')
         },
      },
      beforeMount() {
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
               path: '/login',
            })
         }
         this.market = new Market();
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         this.currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))
         this.init()
      },
      watch: {
         currencyState: function (newV, oldV) {
            //法币估值做相应的刷新
            this.currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))
            this.filterData()
            this.legalCurrency = this.transferNumber(bigDecimal.multiply(this.total_USDT, this.currentCurrency.rate), 2)
         },
      },
      computed: {
         //监听vuex中数据的变化
         currencyState() {// 法币估值
            return this.$store.state.app.currentCurrencyState;
         },
         countryLanguage() {
            return this.$store.state.app.countryLanguage;
         }
      }
   }
</script>
<style lang="less">
   #balances {
      @select-color: #949DA6;
      @border-border-color: #F5F5F5;
      /*table 样式 start*/
      .ivu-tabs {
         overflow: visible;
      }
      .ivu-tabs-content {
         margin-top: 50px; //隐藏按钮的高度
      }
      .ivu-table-header {
         border-top: 1px solid #F5F5F5;
      }
      /*table 样式 end*/

      .ivu-tabs-no-animation > .ivu-tabs-content {
         padding: 0 15px 10px;
      }
      /* table 使溢出显示 */
      .ivu-table-cell {
         overflow: visible;
         position: relative;
      }

      /* select 样式 start */
      .ivu-select, .ivu-select-item {
         color: @select-color;
      }
      .ivu-select-selection {
         background-color: transparent;
         border-color: @border-border-color;
         text-align: left;
      }
      .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
         color: @select-color;

      }
      .ivu-select-dropdown {
         background-color: #fff;
         border: solid 1px @border-border-color;
         text-align: left;

      }
      .ivu-select-item-selected {
         color: #344857;
      }
      .ivu-select-item-selected:hover {
         color: #F8FAFE;
      }
      .ivu-select-item-focus {
         background-color: #F8FAFE;
      }
      .ivu-select-item:hover {
         color: #344857;
      }

      /* input   */
      .ivu-input {
         height: 38px;
         border: 1px solid #D8D8D8;
         color: #333333;
      }

      .ivu-input-with-suffix {
         height: 34px;
         border: 1px solid #F5F5F5;
      }

      .ivu-icon-ios-search {
         color: #949da6;
      }
      /*tooltip*/
      .ivu-tooltip-inner {
         max-width: none;
      }
   }

   /*!*  全局提示框样式  *!*/
   #balances table, th, td {
      border: none;
   }

   /*  绑定的样式  start */
   #balances {
      .balancesBtn {
         display: inline-block;
         height: 28px;
         font-size: 12px;
         line-height: 26px;
         padding: 0 15px;
         margin-left: 8px;
         border: solid 1px #0a8dff;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
      }
      .deposit-hover {
         &:hover {
            background-color: #12869A;
            color: #fff !important;
         }
      }
      .withdrawal-hover {
         &:hover {
            background-color: #66B76D;
            color: #fff !important;
         }
      }
      .tradeBox {
         position: absolute;
         top: 27px;
         right: 0;
         z-index: 100;
         background-color: #fff;
         border-top: solid 1px #5a6cb1;
         color: #5a6cb1;
      }

      .tradeBtn {
         height: 28px;
         line-height: 26px;
         padding: 0 20px;
         color: #0E7DFF;
         border: solid 1px #0E7DFF;
         border-top: none;
         cursor: pointer;
         -webkit-user-select: none;
         -moz-user-select: none;
         -ms-user-select: none;
         user-select: none;
         &:hover {
            background-color: #0E7DFF;
            color: #fff;
         }
      }
      .demo-spin-icon-load {
         animation: ani-demo-spin 1s linear infinite;
      }
      @keyframes ani-demo-spin {
         from {
            transform: rotate(0deg);
         }
         50% {
            transform: rotate(180deg);
         }
         to {
            transform: rotate(360deg);
         }
      }
   }

   /*  绑定的样式  end */

</style>
<style lang="less" scoped>
   .input-common {
      width: 100%;
      height: 42px;
      line-height: 42px;
      border-radius: 4px;
      font-size: 14px;
      padding: 6px 7px;
      background-color: #fff;
      border: 1px solid #dcdee2;
      color: #515a6e;
      &:focus {
         border-color: #57a3f3;
         outline: 0;
         box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
      }
   }

   .bg-color {
      background-color: #fff;
   }

   .space-between {
      display: flex;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      justify-content: space-between;
   }

   .align-center {
      display: flex;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      align-items: center;
   }

   @color: #344857;
   @red-color: #EA4853;
   @buy-color: #12869A;
   @gray-color: #D2D2D2;
   @trade-color: #0a8dff;
   @withdraw-color: #66B76D;

   .deposit-color {
      border-color: @buy-color !important;
      color: @buy-color !important;
   }

   .withdrawal-color {
      border-color: @withdraw-color !important;
      color: @withdraw-color !important;
   }

   .bank-color {
      border-color: @trade-color !important;
      color: @trade-color;
      &:hover {
         background-color: @trade-color;
         color: #fff !important;
      }
   }

   .wrapper {
      position: relative;
      padding: 40px 0 30px;
      background-color: #F7F9FA;
      .content {
         width: 1200px;
         margin: 0 auto;
         background-color: #F7F9FA;
      }
      .top {
         width: 100%;
         height: 150px;
         .space-between;
         .top-common {
            width: 590px;
            height: inherit;
            padding: 45px 20px 0 30px;
            .bg-color;
         }
         .top-right-up {
            margin-bottom: 30px;
         }
         .kyc-status {
            display: inline-block;
            height: 26px;
            line-height: 24px;
            font-size: 12px;
            border-radius: 13px;
            padding-left: 17px;
            padding-right: 13px;
            border: solid 1px transparent;
            margin-left: 18px;
            cursor: pointer;
            .verified-icon {
               font-weight: bold;
               margin-left: 8px;
               margin-top: -2px;
            }
         }
         .verified {
            color: @buy-color;
            background-color: rgba(18, 134, 154, 0.1);
            .verified-icon {
               color: #53D960;
            }
         }
         .rejected {
            color: #ED5C66;
            background-color: rgba(237, 92, 102, 0.1);
            .verified-icon {
               color: #ED5C66;
            }
         }
         .unverified {
            color: @gray-color;
            background-color: rgba(210, 210, 210, 0.2);
            .verified-icon {
               color: @gray-color;
            }
         }
         .title {
            font-size: 14px;
            color: @color;
            margin-top: 8px;
         }
         .value {
            margin-top: 22px;
            font-size: 14px;
            color: @color;
         }
         em {
            font-size: 20px;
            color: #EA4853;
         }
         .transferBtn {
            background-color: #5A6CB1;
            border: none;
            color: #fff;
            padding: 10px 15px;
         }
         .icon {
            font-size: 19px;
            margin-top: -2px;
            margin-right: 8px
         }
      }
      .middle {
         position: relative;
         margin-top: 20px;
         .bg-color;
         .filter-box {
            position: absolute;
            top: 50px;
            .space-between;
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            z-index: 5;
            .hide-btn {
               position: absolute;
               top: 50%;
               transform: translateY(-50%);
               width: 32px;
               height: 18px;
               border-radius: 9px;
               padding: 1px;
               cursor: pointer;
               .hide-ball {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background-color: #fff;
               }
               .to-right {
                  -webkit-animation: leftToRightBall 0.5s forwards;
                  -o-animation: leftToRightBall 0.5s forwards;
                  animation: leftToRightBall 0.5s forwards;
               }
               .to-left {
                  -webkit-animation: rightToLeftBall 0.5s forwards;
                  -o-animation: rightToLeftBall 0.5s forwards;
                  animation: rightToLeftBall 0.5s forwards;
               }
               @keyframes leftToRightBall {
                  from {
                     transform: translateX(5%);
                  }
                  to {
                     transform: translateX(90%);
                  }
               }
               @keyframes rightToLeftBall {
                  from {
                     transform: translateX(90%);
                  }
                  to {
                     transform: translateX(5%);
                  }
               }
            }
            span {
               font-size: 12px;
               color: #949DA6;
               margin-left: 45px;
            }
         }
         .search {
            position: absolute;
            top: 8px;
            right: 20px;
            width: 200px;
            height: 34px;
            z-index: 5;
         }
         .close-box {
            position: absolute;
            top: 14px;
            right: 25px;
            background-color: #fff;
            z-index: 10;
         }

      }
      .below {
         margin-top: 20px;
         .below-title {
            color: @color;
            font-size: 16px;
         }
         .below-content {
            .bg-color;
            padding: 15px 20px;
            margin-top: 10px;
            .title {
               font-size: 14px;
               color: @color;
               border-bottom: solid 1px #F5F5F5;
               padding-bottom: 10px;
            }
         }
         .page {
            margin-top: 20px;
            text-align: right;
         }
      }
   }

   .hide-balances {
      background-color: @buy-color;
   }

   .no-hide {
      background-color: #EDEEF0;
   }

   .tooltip-center {
      position: relative;
      top: -2px;
      display: inline-block;
      margin-left: 5px;
      height: 20px;
      line-height: 20px;
      .help-icon {
         font-size: 18px;
         color: #949DA6;
         cursor: pointer;
      }
   }

   /*加载定位*/
   .spin {
      top: 60px;
      height: 154px;
   }

   .alertModal {
      .alert-content {
         padding: 25px 0 18px;
         .notice {
            font-size: 14px;
            margin-top: 8px;
            margin-bottom: 30px;
         }
      }
   }

</style>