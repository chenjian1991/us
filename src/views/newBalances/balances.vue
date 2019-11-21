<template>
   <main id="balances" class="balances">
      <account-info name="balances"></account-info>
      <div class="container pt-5 pb-5">
         <div class="card">
            <div class="card-body">
               <h6 class="content-title mb-3">ACCOUNT BALANCES</h6>
               <!--<ul class="nav nav-pills px-0 mb-2" id="pills-tab" role="tablist">-->
               <!--<li class="nav-item">-->
               <!--<a class="nav-link active" id="exchange-tab" data-toggle="pill" href="#exchange-href"-->
               <!--role="tab"-->
               <!--aria-controls="pills-one" aria-selected="false">Crypto Account</a>-->
               <!--</li>-->
               <!--<li class="nav-item">-->
               <!--<a class="nav-link" id="otc-tab" data-toggle="pill" href="#otc-href" role="tab"-->
               <!--aria-controls="pills-two" aria-selected="true">Fiat Account</a>-->
               <!--</li>-->
               <!--</ul>-->
               <div class="tab-content middle" id="pills-tabContent">
                  <div class="tab-pane fade active show" id="exchange-href" role="tabpanel"
                       aria-labelledby="exchange-tab">
                     <div class="row align-items-center mt-1">
                        <div class="col-md-2 title">{{$t('zcEstimatedValue')}}</div>
                        <div class="col-md-10">
                           <span style="font-size: 24px" class="main-color">{{total_BTC}}</span><span
                           class="f16"> BTC ≈ </span>
                           <span style="font-size: 24px">{{legalCurrency}} {{currentCurrency.name}}</span>
                        </div>
                     </div>
                     <div class="row justify-content-between align-items-center mb-4">
                        <div class="col-md-2 order-md-2 text-md-right mb-3 mb-md-0">
                           <router-link to="/transaction_history" class="main-color f16">Transaction History
                           </router-link>
                        </div>
                        <div class="col-md-10 order-md-1">
                           <ul class="nav nav-classic nav-borderless px-0" id="pills-tab1" role="tablist">
                              <li class="nav-item">
                                 <a class="nav-link active" id="all-tab" data-toggle="pill" href="#all-href" role="tab"
                                    aria-controls="pills-one" aria-selected="false">{{$t('zcExchangeAccount')}}</a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div class="row justify-content-between align-items-center filter-box">
                        <div class="col-md-6 order-md-1">
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
                        </div>
                        <div class="col-md-6 order-md-2 text-md-right mb-md-0">
                           <!--币种搜索-->
                           <div class="search-box text-md-right">
                              <Input suffix="ios-search" class="search" v-model="currencyInput" @on-change="search"/>
                              <div class="close-box" v-show="showCloseIcon">
                                 <Icon type="md-close-circle" class="close" @click="clear"/>
                              </div>
                           </div>
                        </div>
                     </div>
                     <!--table 数据-->
                     <div class="tab-content" id="pills-tabContent1">
                        <div class="tab-pane fade active show" id="all-href" role="tabpanel"
                             aria-labelledby="all-tab">
                           <Table :columns="columns1" :data="dataALL"></Table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--实名认证1-->
      <us-modal v-model="showNoVerification1" className="alertModal" width="750px" title="balanceNotice"
                okText="noticeL1" cancelText="nextTime" @ok="ok1" @cancel="cancel1" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoticeCon1')}}</h4>
         </div>
      </us-modal>
      <!--设置银行卡-->
      <us-modal v-model="showNoBank" className="alertModal" width="750px" title="balanceNotice" okText="balanceToBank"
                cancelText="nextTime" @ok="$router.push('/bankSetting')" @cancel="cancel" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoBank')}}</h4>
         </div>
      </us-modal>
   </main>
</template>

<script>
   import {Exchange} from '@/interface/exchange.js'
   import {Market} from '@/interface/market.js'
   import bigDecimal from 'js-big-decimal' //除法失效
   import alertModal from '@/components/alertModal'
   import usModal from '@/components/usModal'
   import AccountInfo from '@/components/common/AccountInfo'

   import {
      getCurrencyList,
      getSymbolList_realtime,
   } from '_api/exchange.js'
   import {
      getRealtimeList, getUserInfo, getAssertIsExist
   } from '_api/balances.js'

   import {
      dealNumber
   } from '@/lib/utils.js'

   export default {
      name: "balances",
      components: {
         alertModal: alertModal,
         'us-modal': usModal,
         'account-info': AccountInfo,
      },
      data() {
         return {
            exchange: null,
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
            classStatus: 'unable',//按钮样式
            activeStatus: 'BalancesConfirm',//按钮状态
            showNoVerification1: false,
            showNoBank: false,
            accountStatus: null,//账户状态
            identityStatus: null,//实名状态
            bankStatus: null,//银行卡状态
            usd: 0,
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

            //行情
            quoteList: [],
            loginToken: $cookies.get('loginToken'),
            userId: localStorage.getItem('loginUserId'),


            columns1: [
               {
                  key: 'imgSrc',
                  width: 32,
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
                  width: 75,
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
                  width: 130,
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
                  width: 130,
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
                  width: 130,
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
                  key: 'USDT',
                  width: 130,
                  align: 'right',
                  render: (h, params) => {
                     if (!params.row.USDT) {
                        return h('div', {}, '--')
                     } else {
                        return h('div', {}, params.row.USDT)
                     }
                  },
                  renderHeader: (h) => {
                     const params = 'USDT'
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
                     }, this.$t('zcUSDTEstimation')),
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
                  key: 'USDT',
                  title: ' ',
                  width: 113,
                  align: 'left',
                  render: (h, params) => {
                     if (!params.row.USDT) {
                        return h('div', {}, '--')
                     } else {
                        let name = this.currentCurrency.name
                        let rate = this.currentCurrency.rate//法币估值
                        let text = '≈ ' + this.transferNumber(bigDecimal.multiply(params.row.USDT, rate), 2) + ' ' + name
                        return h('div', {
                           style: {
                              color: '#12869A'
                           }
                        }, text)
                     }
                  },
               },
               {
                  key: 'operate',
                  width: 340,
                  align: 'right',
                  render: (h, params) => {
                     let siteType = params.row.siteType
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
                     const isUSD = params.row.currency === 'USD' ? true : false
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
                                       let path = isUSD ? '/deposit_usd' : '/deposit'
                                       this.deposit(params.row.currency, path)
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
                                       let path = isUSD ? '/withdrawal_usd' : '/withdrawal'
                                       this.withdraw(params.row.currency, path, isUSD)
                                    }
                                 }
                              }
                           }, this.$t('zcWithdrawal')),
                           isUSD ? h('a', {// 设置银行卡
                                 'class': {
                                    'balancesBtn': true,
                                    'bank-hover': true,
                                 },
                                 style: {
                                    color: '#0E7DFF',
                                    cursor: 'pointer'
                                 },
                                 on: {
                                    click: () => {
                                       if (withdraw) {
                                          this.getBankSetting(params.row.currency, '/bankSetting')
                                       }
                                    }
                                 }
                              }, this.$t('balanceBank')) :
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
                                          borderColor: '#0E7DFF',
                                          cursor: 'pointer'
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
                                                   siteType.map(value => {
                                                      this.$router.push({
                                                         path: '/exchange',
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
            dataALL: [],
         }
      },
      methods: {
         init() {
            let currencyList = new Promise(resolve => {
               getCurrencyList().then(result => {//币种
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
               this.getRealtimeList()
               resolve()
            })
            let balanceList = new Promise(resolve => {
               this.exchange.balance(function (result) {//获取资产
                  this.balancesList = result
                  resolve()
               }.bind(this))
            })
            Promise.all([currencyList, quoteList, balanceList]).then(() => {
               if (Object.keys(this.balancesList).length) {
                  this.getCurrencyList()
                  this.getValuation()
                  this.getCurrencyImgList()
                  this.getQuoteList()
               } else {
                  //没有资产 不请求行情
                  this.getCurrencyList()
                  this.getCurrencyImgList()
               }
            }).catch(() => {
               setTimeout(function () {
                  this.showSpin = false  //加载完成
               }.bind(this), 1000)
            })
         },
         getRealtimeList() {
            if (!this.quoteList.length) {
               return new Promise((resolve) => {
                  getRealtimeList().then(result => {//行情
                     this.quoteList = result
                     result.map(v => {
                        this.realTimeList[v.symbol] = v.last
                     })
                     resolve(this.quoteList)
                  })
               });
            }
            return this.quoteList
         },
         getCurrencyList() {//处理币种列表
            this.currencyList.map(v => {
               this.allAccount['ALL'].push({currency: v.currency, siteType: v.siteType, status: v.status})//全部通证
               v.siteType.map(value => {//数据放入这个站中
                  this.allAccount[value].push({currency: v.currency, siteType: [value], status: v.status})
               })
               this.exchangeList.push({currency: v.currency, list: []})
               this.currencyPrecision[v.currency] = v.currencyPrecision//小数位数
            })
            this.siteTypeList.map(val => {//各站附初始值币种
               let data = `data${val}`
               this[data] = this.allAccount[val]
            })
         },
         getValuation() {//计算估值
            let BTC_USDD = this.realTimeList['BTCUSD']
            this.total_USDT = 0
            this.total_BTC = 0
            if (this.balancesList.length !== 0) {
               this.balancesList.map((v) => {
                  let precision = this.currencyPrecision[v.currency] || 8
                  if (v['available'] < 0.00000001) {
                     v['available'] = 0
                  }
                  if (v['frozen'] < 0.00000001) {
                     v['frozen'] = 0
                  }
                  v['total'] = dealNumber(v['available'] + v['frozen'], precision) //计算总值
                  v['available'] = dealNumber(v['available'], precision)
                  v['frozen'] = dealNumber(v['frozen'], precision)
                  this.mapCurrencyList(v, ['available', 'frozen', 'total'], [v['available'], v['frozen'], v['total']])
               })
               this.balancesList.map(v => {
                  if (this.realTimeList[`${v.currency}USD`]) {//和USDD有交易对
                     v['USDT'] = this.transferNumber(bigDecimal.multiply(v.total, this.realTimeList[`${v.currency}USD`]), 2)
                  } else if (v.currency === 'USD') {//usdd本身
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
            this.showSpin = false
            this.balancesSort('USDT')
            this.sortColor('USDT')
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
                        value['list'].push(`${v.baseAsset}/${v.quoteAsset}`)//exchangeList加入交易对
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
                     let noBalance = this.allAccount[val].filter(v => {
                        if (!v[type]) {
                           return v
                        }
                     })//没有资产的数据
                     //没有资产估值 默认总资产总大到小排序
                     if (type === 'USDT') {
                        const dataUSDT = noBalance.filter(v => {
                           if (v['total']) {
                              return v
                           }
                        }).sort((b, a) => {
                           return a['total'] - b['total']
                        })
                        const dataNoUSDT = noBalance.filter(v => {
                           if (!v['total']) {
                              return v
                           }
                        })
                        noBalance = dataUSDT.concat(dataNoUSDT)
                     }
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
                        let noBalance = this.allAccount[val].filter(v => {
                           if (!v[type]) {
                              return v
                           }
                        })//没有资产的数据
                        //没有资产估值 默认总资产总大到小排序
                        if (type === 'USDT') {
                           const dataUSDT = noBalance.filter(v => {
                              if (v['total']) {
                                 return v
                              }
                           }).sort((b, a) => {
                              return a['total'] - b['total']
                           })
                           const dataNoUSDT = noBalance.filter(v => {
                              if (!v['total']) {
                                 return v
                              }
                           })
                           noBalance = dataUSDT.concat(dataNoUSDT)
                        }

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
         async deposit(currency, path) {
            try {
               let identity = this.getUserInfo()
               let account = this.getAccountStatus()
               await identity
               await account
               this.$router.push({
                  path: path,
                  query: {
                     'currency': currency
                  }
               })
            } catch (e) {

            }

         },
         async withdraw(currency, path, isUSD) {
            try {
               let identity = this.getUserInfo()
               await identity
               if (isUSD) {
                  let bank = this.getBank()
                  await bank
               }
               let account = this.getAccountStatus()
               await account
               this.$router.push({
                  path: path,
                  query: {
                     'currency': currency
                  }
               })
            } catch (e) {

            }
         },
         async getBankSetting() {
            try {
               let identity = this.getUserInfo()
               let bank = this.getBank()
               await identity
               await bank
               this.$router.push('/bankSetting')
            } catch (e) {

            }
         },
         //实名信息
         getUserInfo() {
            return new Promise((resolve, reject) => {
               //处理状态跳转
               const status = () => {
                  if (this.identityStatus === 'SUCCESS') {
                     resolve(this.identityStatus)
                  } else {
                     switch (this.identityStatus) {
                        case 'INIT':
                           this.showNoVerification1 = true
                           break
                        case 'SUBMIT':
                           this.$router.push('/identityResult')
                           break
                        case 'FAIL':
                           this.$router.push('/identityResult')
                           break
                     }
                     reject()
                  }
               }
               if (this.identityStatus) {
                  status()
               } else {
                  getUserInfo({
                     userId: this.userId
                  }, this.loginToken).then(res => {//实名认证
                     if (res.data) {
                        this.identityStatus = res.data['identifyState']
                        status()
                     }
                  })
               }
            })
         },
         //银行卡设置状态
         getBank() {
            return new Promise((resolve, reject) => {
               const status = () => {
                  if (this.bankStatus.length === 0) {
                     this.showNoBank = true
                     reject()
                  } else {
                     resolve()
                  }
               }
               if (this.bankStatus) {
                  status()
               } else {
                  this.exchange.withdrawAddress('USD', (res) => {//提现的时候判断没有设置银行卡 跳转银行卡页面
                     this.bankStatus = res
                     status()
                  })
               }

            })
         },
         //获取账户状态
         getAccountStatus() {
            return new Promise((resolve, reject) => {
               /*
                   状态有OPENED, //正常
                   RESTRICTED, //限制 不能使用 提交订单，撤单，出入金
                   SUSPENDED, //暂停，不能使用任何操作
               */
               const getStatus = () => {
                  if (this.accountStatus === 'OPENED') {
                     resolve()
                  } else {
                     this.$Notice.error({
                        title: 'Trade function is not activated yet',
                     });
                     reject()
                  }
               }
               if (this.accountStatus) {
                  getStatus()
               } else {
                  this.exchange.getAccountInfo((res) => {
                     this.accountStatus = res.accountStatus
                     getStatus()
                  })
               }

            })
         },
         cancel1() {
            this.showNoVerification1 = false
         },
         cancel() {
            this.showNoBank = false
         },
         ok1() {
            this.showNoVerification1 = false
            setTimeout(() => {
               this.$router.push('/kyc')
            }, 500)
         },
         transferNumber(number, num = 8) {//保x留小数位与科学计数法转换
            if (number === '--') {
               return '--'
            } else if (number === undefined) {//逐条推送会导致有些交易对还没结果 所以需要处理underfind的情况
               return 0
            } else {
               return dealNumber(number, num)
            }
         },
      },
      beforeMount() {
         let loginToken = this.loginToken
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         this.exchange.ssoProvider.getSsoToken = function (fn) {
            fn(loginToken);
         };
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
            this.legalCurrency = this.transferNumber(bigDecimal.multiply(this.total_USDT === '--' ? 0 : this.total_USDT, this.currentCurrency.rate), 2)
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
   @import './balances.less';

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
      .ivu-table-wrapper {
         overflow: visible;
      }
      /*table 样式 end*/

      .ivu-tabs-no-animation > .ivu-tabs-content {
         padding: 0 15px 32px;
      }
      /* table 使溢出显示 */
      .ivu-table-cell {
         overflow: visible;
         position: relative;
      }

      .ivu-table-overflowX::-webkit-scrollbar {
         display: none;
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
         &:focus {
            border-color: #12869A !important;
            box-shadow: none;
         }
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
      .bank-hover {
         &:hover {
            background-color: #0E7DFF;
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
   @color: #344857;
   @buy-color: #12869A;

   .main-color {
      color: @buy-color;
   }

   .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
      color: #fff;
      background-color: @buy-color;
   }

   .nav-pills .nav-link {
      color: @buy-color;
   }

   .nav-classic .nav-link.active {
      color: @buy-color !important;
      border-bottom-width: 2px;
      border-bottom-color: @buy-color !important;
   }

   .nav-classic .nav-link {
      &:hover {
         color: @buy-color;
      }
   }

   .nav-link {
      font-size: 16px;
   }

   .card {
      border: none;
   }

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

   .f16 {
      font-size: 14px;
   }

   .bg-color {
      background-color: #fff;
   }

   .balances {
      background-color: #F7F9FA;
      min-height: 100%;
      .title {
         font-size: 16px;
         color: @color;
      }
      .middle {
         .bg-color;
         .filter-box {
            line-height: 50px;
            z-index: 5;
            border-top: solid 1px #F5F5F5;
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
            width: 200px;
            height: 34px;
            z-index: 5;
         }
         .search-box {
            position: relative;
            .close-box {
               position: absolute;
               top: 14px;
               right: 5px;
               background-color: #fff;
               z-index: 10;
               cursor: pointer;
            }
         }
         .transactionHistory {
            position: absolute;
            top: 15px;
            right: 20px;
            z-index: 5;
            color: @buy-color;
            letter-spacing: 0.5px;
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