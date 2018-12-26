<template>
   <div class="wrapper" id="balances">
      <div class="content">
         <div class="top">
            <Row>
               <Col span="1"><img src="../../assets/images/balances/totalAssets.png"></Col>
               <Col span="23">
                  <p class="title">{{$t('zcEstimatedValue')}}</p>
                  <div class="value">
                     <Col span="18">
                        <em>{{total_USDT}}</em>
                        USDD /
                        <em>{{total_BTC}}</em>
                        BTC
                        <span class="about">&nbsp;&nbsp;≈ {{legalCurrency}} {{this.currentCurrency.name}}</span>
                     </Col>
                     <!--<Col span="6" align="right">-->
                     <!--<Button class="transferBtn" @click="convert">{{$t('BalancesConvert')}}</Button>-->
                     <!--</Col>-->
                  </div>
               </Col>
            </Row>
         </div>
         <div class="middle">
            <Row class="filter-box">
               <Col span="12">
                  <div class="hide-btn" :class="hideSmallBalance===true?'hide-balances':'no-hide'"
                       @click="hideZeroBalances">
                     <div class="hide-ball" :class="animateStatus"></div>
                  </div>
                  <span>{{$t('BalancesHide')}}</span>
                  <div class="tooltip-center">
                     <Tooltip :content="$t('BalancesHideValue')" placement="top">
                        <Icon type="ios-help-circle" class="help-icon"/>
                     </Tooltip>
                  </div>
               </Col>
               <Col span="12"></Col>
            </Row>
            <Tabs value="name1" :animated="animate">
               <TabPane :label="B_site" name="name1">
                  <Table :columns="columns1" :data="dataB"></Table>
               </TabPane>
               <TabPane :label="C_site" name="name5">
                  <Table :columns="columns1" :data="dataC"></Table>
               </TabPane>
               <!-- <TabPane :label="exchangeAccount" name="name1">
                  <Table :columns="columns1" :data="dataALL"></Table>
               </TabPane>
               <TabPane :label="B_site" name="name2">
                  <Table :columns="columns1" :data="dataB"></Table>
               </TabPane>
               <TabPane :label="F_site" name="name3">
                  <Table :columns="columns1" :data="dataF"></Table>
               </TabPane>
               <TabPane :label="S_site" name="name4">
                  <Table :columns="columns1" :data="dataS"></Table>
               </TabPane> -->
            </Tabs>
         </div>
         <!-- <div class="below">
            <p class="below-title">{{$t('BalancesInterestReturn')}}</p>
            <div class="below-content">
               <Row class="title">
                  <Col span="12">
                     <div>
                        {{$t('BalancesInterestTotal')}}<span style="color: #EA4853">{{userUSDD}}</span>
                        USDD
                     </div>
                  </Col>
                  <Col span="12" align="right">
                     <Select v-model="timeListModel" style="width:222px" size="large" class="timeList"
                             :label-in-value="true" @on-change="changeTime">
                        <Option v-for="item in timeList" :value="item.value" :key="item.value"
                                :label="$t(item.label)"></Option>
                     </Select>
                  </Col>
               </Row>
               <Table :columns="columns5" :data="data5"></Table>
               <Page :total="totalPage" :page-size="1" show-elevator class="page" @on-change="onChangePage"/>
            </div>
         </div> -->
      </div>
      <alertModal className="alert-first" title="BalancesUSDTtoUSDD" v-model="showFirst" :showHeader="showHeaderFirst"
                  width="700">
         <div class="alert-content">
            <Row class="content-title">
               <Col span="24" align="center" class="content-left">
                  {{$t('BalancesTotalExchanges')}} <em>{{dailyUSDDRemain}}</em> USDD
               </Col>
               <!--<Col span="12" align="center" class="content-right">{{$t('')}}-->
               <!--（新加坡时间10:00 更新）-->
               <!--</Col>-->
            </Row>
            <Row class="content-top">
               <Col align="center" class="content-center">
                  {{$t('BalancesMarketPrice')}}
               </Col>
               <Col class="content-left">
                  1 USDD = 1 USD
               </Col>
               <Row type="flex" justify="space-between">
                  <Col class="content-left">
                     1 USDT = {{USDPrice}} USD
                  </Col>
                  <Col align="right" class="content-right">
                     {{$t('BalancesUSDTPriceFrom')}}
                  </Col>
               </Row>
            </Row>
            <div class="content-middle">{{$t('BalancesSubsidiseTip1')}}<em>{{rateRemain}}</em>{{$t('BalancesSubsidiseTip3')}}<em>{{rateRemain}}</em>{{$t('BalancesSubsidiseTip4')}}
               <em>{{remain}}</em>{{$t('BalancesSubsidiseTip2')}}
            </div>
            <Row class="content-below">
               <h5>{{$t('BalancesYourRemaining')}}<em>{{remainUSDD}}</em> USDD</h5>
               <Col class="input-box-title">{{$t('BalancesUseUSDTQuantity')}}</Col>
               <div class="input-box">
                  <input type="text" v-model.trim="inputValue" :maxlength="13" @input="changeValue"
                         :placeholder="$t('BalancesAtLeast')"
                         onpaste="return false" ondragenter="return false" class="input-common"/>
                  <span class="available">{{$t('BalancesAvailable')}} {{accountUSDTAvailable}} USDT</span>
               </div>
               <Row class="below-row" type="flex" justify="space-between">
                  <Col class="content-left">
                     {{$t('BalancesEstimatedGetUSDD')}} : {{gainUSDD}}
                  </Col>
                  <Col class="content-right">
                     {{$t('BalancesRoughlySubsidizes')}} <em>{{subsidy}}</em> USD
                  </Col>
               </Row>
               <h5 class="desc">{{$t('BalancesExtraGain')}} : {{$t('BalancesRandomlyEachTime')}}</h5>
            </Row>
            <Button class="sureBtn" @click="toExchange"
                    v-bind:class="classStatus"
                    v-bind:disabled="exchangeStatus">
               {{$t(activeStatus)}}
            </Button>
         </div>
      </alertModal>
      <alertModal className="alert-second" v-model="showSecond" :showHeader="showSecondHeader"
                  :closable="closableSecond">
         <div class="alert-content">
            <div class="alert-title">
               <Icon type="md-checkmark-circle-outline" class="icon"/>
               {{$t('BalancesConvertSuccess')}}
            </div>
            <div class="desc">{{$t('BalancesCheckBalances')}}</div>
            <div class="desc">{{$t('BalancesAdditional')}} : {{increaseFF}} FF</div>
            <Button class="sureBtn able" @click="closeSecond">{{$t('BalancesGotIt')}}</Button>
         </div>
      </alertModal>
      <alertModal className="alert-third" v-model="showThird" :showHeader="showThirdHeader" :closable="closableThird">
         <Icon type="ios-close" class="close-icon" @click="closeThird"/>
         <div class="alert-content">
            <div class="desc">
               <Icon type="md-alert" class="icon"/>
               {{$t('BalancesVerifyAccount')}}
            </div>
            <a :href="identityHref">
               <Button class="sureBtn able">
                  {{$t('BalancesStartVerification ')}}
               </Button>
            </a>
         </div>
      </alertModal>
   </div>
</template>

<script>
   import {Exchange} from '@/interface/exchange.js'
   import {Market} from '@/interface/market.js'
   import bigDecimal from 'js-big-decimal' //除法失效
   import Cookies from 'js-cookie'
   import moment from 'moment'
   import alertModal from '@/components/alertModal'
   import {
      getSymbolList,
      getCurrencyList,
      getSymbolList_realtime,
      getIdentify,
   } from '_api/exchange.js'
   import {
      getRealtimeList
   } from '_api/balances.js'

   import {
      scientificToNumber,
      addSymbolSplitLine,
      getDecimalsNum,
      storage,
      getTokenByKey as getValue,

   } from '@/lib/utils.js'
   import {getApi} from '_api/axios'

   export default {
      name: "balances",
      components: {
         alertModal: alertModal,
      },
      data() {
         return {
            animate: false,//tab 动画禁用
            allAccount: {},//总数据
            symbolList: {},//交易接口的symbolList 接口
            balancesList: [],//资产
            currencyImg: '',//图标
            siteTypeList: [],//所有站 ！！！
            exchangeList: [],//交易对
            realTimeList: {},//行情
            currencyPrecision: {},
            total_USDT: '--', //总USDT
            total_BTC: '--', // 总BTC
            legalCurrency: '--',//法币估值
            currentCurrency: {},//法币估值
            totalPage: 1,
            sortName: '',
            directive: '',
            accountUSDTAvailable: 0,//账户usdt资产
            dailyUSDDRemain: 0,//全站日剩余usdd
            USDPrice: '',//usd价格
            remain: 0,//剩余多少可兑换
            gainUSDD: '--',//获得多少usdd
            subsidy: '--',
            rateRemain: '',
            classStatus: 'unable',//按钮样式
            activeStatus: 'BalancesConfirm',//按钮状态
            timeList: [//select时间选择
               {
                  value: 'MiningSevenDays',
                  label: 'MiningSevenDays'
               },
               {
                  value: 'MiningThirtyDays',
                  label: 'MiningThirtyDays'
               },
               {
                  value: 'MiningSixMonths',
                  label: 'MiningSixMonths'
               },
               {
                  value: 'MiningOneYear',
                  label: 'MiningOneYear'
               }
            ],
            timeListModel: 'MiningSevenDays',
            endTimeDate: new Date().getTime(),
            startTimeDate: this.exportDate(7),
            showFirst: false,
            showSecond: false,
            showThird: false,
            exchangeStatus: true,//能否兑换usdd
            userUSDD: 0,//用户的usdd
            increaseFF: 0,
            remainUSDD: 0,
            inputValue: '',
            identityHref: '',//实名认证跳转链接
            showHeaderFirst: true,
            showSecondHeader: false,//alertModal头部是否显示
            showThirdHeader: false,
            closableSecond: false,
            closableThird: false,
            animateStatus: '',
            availableSort: false,
            frozenSort: false,
            totalSort: false,
            USDTSort: false,
            currencySort: false,
            hideSmallBalance: false,

            exchangeAccount: (h) => {//tab的显示label
               return h('div', {}, this.$t('zcExchangeAccount'))
            },
            B_site: (h) => {
               return h('div', {}, this.$t('zcBSiteAccount'))
            },
            F_site: (h) => {
               return h('div', {}, this.$t('zcFSiteAccount'))
            },
            S_site: (h) => {
               return h('div', {}, this.$t('zcSSiteAccount'))
            },
            C_site: (h) => {
               return h('div', {}, this.$t('headercoustomerchain'))
            },
            columns1: [
               {
                  key: 'imgSrc',
                  width: 35,
                  align: 'left',
                  render: (h, params) => {
                     return h('img', {
                        attrs: {
                           src: params.row.imgSrc
                        }
                     },)
                  },
                  renderHeader: (h) => {
                     return h('div', {}, '')
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
                              this.resetSort()
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
                        )])
                  }
               },
               {
                  key: 'available',
                  width: 145,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.available ? params.row.available : '--')
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
                  width: 145,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.frozen ? params.row.frozen : '--')
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
                  width: 145,
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, params.row.total ? params.row.total : '--')
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
                  width: 190,
                  align: 'left',
                  render: (h, params) => {
                     if (!params.row.USDT) {
                        return h('div', {}, '--')
                     } else {
                        let name = this.currentCurrency.name
                        let rate = this.currentCurrency.rate
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
                  width: 300,
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
                                       this.$router.push({
                                          path: 'deposit',
                                          query: {
                                             'currency': params.row.currency
                                          }
                                       })
                                       // if (siteType.length > 1) {//币种属于多个站
                                       //    let flag = false
                                       //    siteType.map(value => {
                                       //       if (value === 'B') {//是否属于本站
                                       //          flag = true
                                       //       }
                                       //    })
                                       //    if (flag) {// 跳到本站
                                       //       this.$router.push({
                                       //          path: 'deposit',
                                       //          query: {
                                       //             'currency': params.row.currency
                                       //          }
                                       //       })
                                       //    } else {//跳到其他站 注意 如果是5站 域名为 https://www.55.com
                                       //       window.open(`https://${value.toLowerCase()}.55.com/#/deposit?currency=${params.row.currency}`)
                                       //    }
                                       // } else {//单站币种 跳转规则同理
                                       //    siteType.map(value => {
                                       //       if (value === 'B') {
                                       //          this.$router.push({
                                       //             path: 'deposit',
                                       //             query: {
                                       //                'currency': params.row.currency
                                       //             }
                                       //          })
                                       //       } else {
                                       //          window.open(`https://${value.toLowerCase()}.55.com/#/deposit?currency=${params.row.currency}`)
                                       //       }
                                       //    })
                                       // }
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
                                       this.$router.push({
                                          path: 'withdrawal',
                                          query: {
                                             'currency': params.row.currency
                                          }
                                       })
                                       // siteType.map(value => {
                                       //    if (value === 'B') {
                                       //       this.$router.push({
                                       //          path: 'withdrawal',
                                       //          query: {
                                       //             'currency': params.row.currency
                                       //          }
                                       //       })
                                       //    } else {
                                       //       window.open(`https://${value.toLowerCase()}.55.com/#/withdrawal?currency=${params.row.currency}`)
                                       //    }
                                       // })
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
                                                   // if (value === 'B') {
                                                   //    this.$router.push({
                                                   //       path: 'exchange',
                                                   //       query: {
                                                   //          'symbol': v.replace(/\//, ''),
                                                   //          'site':'B'
                                                   //       }
                                                   //    })
                                                   // } else {
                                                   //    window.open(`https://${value.toLowerCase()}.55.com/#/exchange?symbol=${v.replace(/\//, '')}`)
                                                   // }
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
            dataB: [],
            dataF: [],
            dataS: [],
            dataC: [],
            columns5: [
               {
                  key: 'createdAt',
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createdAt']).format('YYYY-MM-DD HH:mm:ss'))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('BalancesDate'))
                  }
               },
               {
                  key: 'currency',
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('BalancesCoin'))
                  }
               },
               {
                  key: 'amount',
                  align: 'right',
                  render: (h, params) => {
                     return h('div', {}, this.transferNumber(params.row.amount, 8))
                  },
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('BalancesAmount'))
                  }
               },],
            data5: [],
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
            this.market = new Market();

            (async () => {
               this.exchange.usddInterestQuery(res => {//查询派息
                  this.userUSDD = res.amount || 0
               })
               this.getActivityList()//派息列表

               await new Promise(resolve => {
                  getCurrencyList().then(res => {//所有币种
                     this.allAccount['ALL'] = []
                     res.map(v => {
                        this.exchangeList.push({currency: v.currency, list: []})
                        v.siteType.map(value => {//各个站添加数据
                           if (this.allAccount[value]) {
                              this.allAccount[value].push({currency: v.currency, siteType: [value], status: v.status})
                           } else {
                              this.siteTypeList.push(value)
                              this.allAccount[value] = []
                              this.allAccount[value].push({currency: v.currency, siteType: [value], status: v.status})
                           }
                        })
                        this.allAccount['ALL'].push({currency: v.currency, siteType: v.siteType, status: v.status})
                        this.currencyImg += `${v['currency']},`;//获取币种图标的参数
                        this.currencyPrecision[v.currency] = v.currencyPrecision
                     })

                     const deleteCurrency = ['BTC', 'LTC', 'ETH', 'ZEC', 'DASH', 'XLM']
                     this.allAccount['B'] = this.allAccount['B'].filter(v => {
                        let flag = true
                        deleteCurrency.map(value => {
                           if (v.currency === value) {
                              flag = false
                           }
                        })
                        if (flag) {
                           return flag
                        }
                     })
                     if (this.allAccount['C']) {
                        this.allAccount['C'] = this.allAccount['C'].filter(v => {
                           let flag = true
                           deleteCurrency.map(value => {
                              if (v.currency === value) {
                                 flag = false
                              }
                           })
                           if (flag) {
                              return flag
                           }
                        })
                     }

                     this.siteTypeList.push('ALL')//全站
                     this.siteTypeList.map(val => {//各站附初始值币种
                        let data = `data${val}`
                        this[data] = this.allAccount[val]
                     })
                     resolve();
                  })
               });
               await new Promise(resolve => {
                  this.getCurrencyImgList()
                  this.getQuoteList()
                  this.getRealTime()
                  resolve()
               });
            })()
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
         getRealTime() {
            (async () => {
               await new Promise(resolve => {
                  this.exchange.balance(function (res) {//获取资产
                     this.balancesList = res
                     if (res.length !== 0) {
                        res.map((v) => {
                           let precision = this.currencyPrecision[v.currency]
                           v['total'] = this.transferNumber(v['available'] + v['frozen'], precision) //计算总值
                           v['available'] = this.transferNumber(v['available'], precision)
                           v['frozen'] = this.transferNumber(v['frozen'], precision)
                           this.mapCurrencyList(v, ['available', 'frozen', 'total'], [v['available'], v['frozen'], v['total']])
                        })
                     }
                     this.filterData()
                     resolve()
                  }.bind(this))
               })
               await new Promise(resolve => {
                  let BTC_USDD = 0
                  let ETH_USDD = 0
                  getRealtimeList().then(res => {//资产估值
                     res.map(v => {
                        this.realTimeList[v.symbol] = v.last
                        if (v.symbol === 'BTCUSDD') {
                           BTC_USDD = v.last
                        }
                        if (v.symbol === 'ETHUSDD') {
                           ETH_USDD = v.last
                        }
                     })
                     this.total_USDT = 0
                     this.total_BTC = 0
                     this.balancesList.map(v => {
                        if (this.realTimeList[`${v.currency}USDD`]) {
                           v['USDT'] = this.transferNumber(bigDecimal.multiply(v.total, this.realTimeList[`${v.currency}USDD`]), 2)
                        } else if (this.realTimeList[`${v.currency}USDT`]) {
                           v['USDT'] = this.transferNumber(bigDecimal.multiply(v.total, this.realTimeList[`${v.currency}USDT`]), 2)
                        } else if (this.realTimeList[`${v.currency}ETH`]) {
                           let last = this.realTimeList[`${v.currency}ETH`]
                           let symbolETH = bigDecimal.multiply(v.total, last)
                           if (ETH_USDD) {
                              v['USDT'] = this.transferNumber(bigDecimal.multiply(symbolETH, ETH_USDD), 2)
                           } else {
                              v['USDT'] = this.transferNumber(bigDecimal.multiply(symbolETH, 0), 2)
                           }
                        } else if (v.currency === 'USDD') {//usdd
                           v['USDT'] = this.transferNumber(v.total, 2)
                        } else if (v.currency === 'USDT') {//usdt
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
                     this.filterData()
                     resolve()
                  })
               })
            })()
         },
         hideZeroBalances() {//隐藏小额资产
            this.hideSmallBalance = !this.hideSmallBalance
            if (this.hideSmallBalance) {
               this.animateStatus = 'to-right'
               this.siteTypeList.map(val => {
                  let data = `data${val}`
                  this[data] = this[data].filter(v => {
                     if (v.USDT > 10) {
                        return v
                     }
                  })
               })
            } else {//取消隐藏小额资产
               this.animateStatus = 'to-left'
               let flag = false
               let sortList = ['available', 'frozen', 'total', 'USDT']
               const allData = this.allAccount
               sortList.map(type => {
                  if (this[`${type}Sort`]) {//有排序 则按照排序规则展开
                     flag = true
                     this.siteTypeList.map(val => {
                        let data = `data${val}`
                        this[data] = allData[val].sort((b, a) => {
                           if (a[type] && b[type]) {
                              return a[type] - b[type]
                           } else if (a[type] && !b[type]) {
                              return a[type] - 0
                           } else if (!a[type] && b[type]) {
                              return -1
                           } else {
                              return -2
                           }
                        })
                     })
                  }
               })
               if (!flag) {
                  this.siteTypeList.map(val => {
                     let data = `data${val}`
                     this[data] = allData[val].filter(v => {
                        return v
                     })
                  })
               }
            }
         },
         balancesSort(type) {//排序
            if (this[`${type}Sort`]) {
               this.siteTypeList.map(val => {
                  let data = `data${val}`
                  this[data] = this[data].reverse()//数组逆序
               })
            } else {
               this.siteTypeList.map(val => {
                  let data = `data${val}`
                  this[data] = this[data].sort((b, a) => {
                     if (a[type] && b[type]) {
                        return a[type] - b[type]
                     } else if (a[type] && !b[type]) {
                        return a[type] - 0
                     } else if (!a[type] && b[type]) {
                        return -1
                     } else {
                        return -2
                     }
                  })
               })
            }
            //使排序重置状态
            this.availableSort = false
            this.frozenSort = false
            this.totalSort = false
            this.USDTSort = false
            this.currencySort = false
            this[`${type}Sort`] = true//再次点击时会reverse()
         },
         resetSort() {//币种排序
            if (this.currencySort) {//表示一直在切换币种
               this.siteTypeList.map(val => {
                  let data = `data${val}`
                  this[data] = this[data].reverse()//数组逆序
               })
            } else {//单次切换
               const allData = this.allAccount
               if (this.hideSmallBalance) {//隐藏小额资产
                  if (this.availableSort || this.frozenSort || this.totalSort || this.USDTSort) {//如果资产的排序过 则按照原来排序
                     this.siteTypeList.map(val => {
                        let data = `data${val}`
                        this[data] = allData[val].filter(v => {
                           if (v.USDT > 10) {
                              return v
                           }
                        })
                     })
                  } else {
                     this.siteTypeList.map(val => {
                        let data = `data${val}`
                        this[data] = allData[val].filter(v => {
                           if (v.USDT > 10) {
                              return v
                           }
                        }).reverse()
                     })
                  }
               } else {
                  if (this.availableSort || this.frozenSort || this.totalSort || this.USDTSort) {//如果的资产排序过 则按照原来排序
                     this.siteTypeList.map(val => {
                        let data = `data${val}`
                        this[data] = allData[val].sort((a, b) => {
                           return a.currency.localeCompare(b.currency)//字符串比较大小方法
                        })
                     })
                  } else {
                     this.siteTypeList.map(val => {
                        let data = `data${val}`
                        this[data] = allData[val].sort((b, a) => {
                           return a.currency.localeCompare(b.currency)
                        })
                     })
                  }
               }
            }
            this.availableSort = false
            this.frozenSort = false
            this.totalSort = false
            this.USDTSort = false
            this.currencySort = true
         },
         sortColor(value) {
            if (this.sortName === value) {
               this.directive = !this.directive
            } else {
               this.directive = true
            }
            this.sortName = value
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
         exportDate(day) {//转换endTime
            return new Date().getTime() - day * 24 * 3600 * 1000
         },
         changeTime() {//改变时间
            switch (this.timeListModel) {
               case 'MiningSevenDays':
                  this.startTimeDate = this.exportDate(7)
                  break
               case 'MiningThirtyDays':
                  this.startTimeDate = this.exportDate(30)
                  break
               case 'MiningSixMonths':
                  this.startTimeDate = this.exportDate(180)
                  break
               case 'MiningOneYear':
                  this.startTimeDate = this.exportDate(365)
                  break
            }
            this.getActivityList()
         },
         getActivityList(currentPage = 1) {//派息列表
            this.exchange.activityList('INCOMING', 'REWARD_INTEREST_USDD', 'COMPLETED', this.startTimeDate, this.endTimeDate, currentPage, 10, (res) => {
               this.data5 = res.data
               this.totalPage = res.pages
            })
         },
         onChangePage(currentPage) {//分页
            this.getActivityList(currentPage)
         },
         convert() { //一键派息
            this.inputValue = ''
            let status = {
               'CHECKING': 'underReview',
               'NOT_SET': 'noAuthentication',
               'FAILURE': 'noPass'
            }
            getIdentify(Cookies.get('loginToken')).then(res => {//是否实名
               let checkStatus = status[res.data['checkStatus']]
               if (checkStatus) {
                  this.showThird = true
                  this.identityHref = `../../../../identityAuthentication/${checkStatus}.html`;
               } else {//实名
                  (async () => {
                     this.showFirst = true
                     await new Promise(resolve => {
                        this.exchange.usdt2usddQuery(res => {
                           this.dailyUSDDRemain = res['dailyUSDDRemain']
                           this.accountUSDTAvailable = res['accountUSDTAvailable']
                           console.log(Number(bigDecimal.subtract(res['accountMaxInstallment'], res['accountUsedUSDDAmount'])))
                           if (Number(bigDecimal.subtract(res['accountMaxInstallment'], res['accountUsedUSDDAmount'])) > 0) {
                              this.remainUSDD = bigDecimal.subtract(res['accountMaxInstallment'], res['accountUsedUSDDAmount'])
                           } else {
                              this.remainUSDD = 0
                           }

                           this.rate = res['rate']
                           this.rateRemain = bigDecimal.subtract(res['rate'], 1)
                           //按钮名称和状态
                           if (res.dailyUSDDRemain === 0) {//活动结束
                              this.activeStatus = 'BalancesEventOver'
                           } else if (res.dailyUSDDRemain !== 0 && res.opened === false) {
                              this.activeStatus = 'BalancesActivityNotOn'
                           }
                           resolve()
                        })
                     });

                     await new Promise(resolve => {
                        getApi('https://api.coinmarketcap.com/v2/ticker/825/?convert=USD').then(res => {
                           let num = new bigDecimal(res.data.quotes['USD'].price.toString());
                           this.USDPrice = num.round(2, bigDecimal.RoundingModes.DOWN).value;
                           if (Number(bigDecimal.subtract(1, num.round(2, bigDecimal.RoundingModes.DOWN).value)) >= 0) {
                              this.remain = this.transferNumber(bigDecimal.add(bigDecimal.subtract(1, this.USDPrice), this.rateRemain), 2)
                           } else {
                              this.remain = this.rateRemain
                           }
                           resolve()
                        })
                     });
                  })()
               }
            })
         },
         toExchange() { //兑换
            this.exchangeStatus = true
            this.exchange.usdt2usddExchange(this.inputValue, res => {
               this.exchangeStatus = false
               this.showFirst = false
               this.showSecond = true
               this.increaseFF = res['increaseFF']
            })
            setTimeout(function () {
               this.exchangeStatus = false
            }.bind(this), 1000)
         },
         changeValue(obj) {
            obj.target.value = obj.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
            obj.target.value = obj.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            obj.target.value = obj.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            obj.target.value = obj.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数
            if (obj.target.value.indexOf(".") < 0 && obj.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
               obj.target.value = parseFloat(obj.target.value);
            }
            this.inputValue = obj.target.value
            let val = Number(obj.target.value)
            if (this.activeStatus === 'BalancesEventOver' || this.activeStatus === 'BalancesActivityNotOn') {
               return false
            } else {
               if (val >= 50 && val <= Number(this.remainUSDD) && val <= Number(this.accountUSDTAvailable) && val <= Number(this.dailyUSDDRemain)) {
                  this.classStatus = 'able'
                  this.exchangeStatus = false
               } else {//able状态之后的disabled状态
                  this.classStatus = 'unable'
                  this.exchangeStatus = true
               }
               this.gainUSDD = this.transferNumber(bigDecimal.multiply(obj.target.value, this.rate), 6)
               this.subsidy = this.transferNumber(bigDecimal.multiply(this.remain, obj.target.value), 2)
            }
         },
         closeSecond() {
            this.showSecond = false
            this.getRealTime()
         },
         closeThird() {
            this.showThird = false
         }
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         this.init()
         this.currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))
      },
      watch: {
         currencyState: function (newV, oldV) {
            //法币估值做相应的刷新
            this.currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))
            this.filterData()
            this.legalCurrency = this.transferNumber(bigDecimal.multiply(this.total_USDT, this.currentCurrency.rate), 2)
         },
         // countryLanguage: function (newV, oldV) {
         //    this.timeListModel = ''
         // },
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

   @color: #344857;
   @buy-color: #12869A;

   .wrapper {
      position: relative;
      padding: 40px 0 20px;
      background-color: #F7F9FA;
      .content {
         width: 1200px;
         margin: 0 auto;
         background-color: #F7F9FA;
      }
      .top {
         width: 100%;
         height: 150px;
         padding: 45px 50px 0;
         .bg-color;
         .title {
            font-size: 14px;
            color: @color;
            margin-top: 8px;
         }
         .value {
            margin-top: 22px;
            font-size: 14px;
            color: @color;
            em {
               font-size: 20px;
               color: #EA4853;
            }
            .about {
               font-size: 20px;
               color: @color;
            }
         }
         .transferBtn {
            background-color: #5A6CB1;
            border: none;
            color: #fff;
            padding: 10px 15px;
         }
      }
      .middle {
         position: relative;
         margin-top: 20px;
         .bg-color;
         .filter-box {
            position: absolute;
            top: 50px;
            display: flex;
            justify-content: space-between;
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

   .alert-first {
      border-radius: 4px;
      .alert-title {
         height: 51px;
         line-height: 51px;
         text-align: center;
         font-size: 14px;
         color: #fff;
         background-color: #5A6CB1;
         .icon {
            float: right;
            font-size: 30px;
            padding-top: 12px;
            padding-right: 10px;
            cursor: pointer;
         }
      }
      .alert-content {
         padding: 20px 37px 10px;
         background-color: #fff;
         font-size: 14px;
         .content-title {
            margin-bottom: 15px;
            .content-left {
               color: #666;
               em {
                  color: #333;
               }
            }
            .content-right {
               color: #999;
            }
         }
         .content-top {
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.18);
            border-radius: 4px;
            padding: 10px 30px 20px;
            .content-center {
               margin-bottom: 20px;
            }
            .content-left {
               margin-bottom: 6px;
            }
            .content-right {
               color: #9AA3C4;
            }
         }
         .content-middle {
            font-size: 13px;
            color: #666666;
            margin: 20px 0 15px;
            em {
               font-size: 15px;
               color: #333;
            }
         }
         .content-below {
            border-radius: 4px;
            background-color: #eee;
            padding: 20px 30px;
            h5 {
               font-size: 14px;
               color: #666;
               em {
                  color: #333;
               }
            }
            .below-row {
               margin-top: 20px;
               margin-bottom: 10px;
               .content-left {
                  color: #333;
               }
               .content-right {
                  color: #999;
                  em {
                     color: #333;
                  }
               }
               .desc {
                  margin-top: 20px;
                  margin-bottom: 30px;
                  color: #4E5C6E;
               }
            }
            .input-box-title {
               color: #4E5C6E;
               margin: 20px 0 10px;
            }
            .input-box {
               position: relative;
               width: 100%;
               .available {
                  position: absolute;
                  top: 0;
                  right: 11px;
                  display: flex;
                  align-items: center;
                  height: 42px;
                  font-size: 14px;
                  color: #333;
               }
            }
         }
         .sureBtn {
            display: block;
            padding: 10px 50px;
            margin: 15px auto 0;
            font-size: 14px;
            color: #fff;
            border: none;
         }
         .unable {
            background-color: #bbb;
         }
         .able {
            background-color: #5A6CB1;
         }
         .desc {
            text-align: center;
            font-size: 12px;
         }
      }
   }

   .alert-second {
      border-radius: 4px;
      background-color: #fff;
      .alert-content {
         padding: 10px 0;
         .alert-title {
            font-size: 16px;
            color: #009E42;
            text-align: center;
            .icon {
               font-size: 24px;
               color: #009E42;
            }
         }
         .desc {
            font-size: 14px;
            color: #4E5C6E;
            margin: 20px 0 22px;
            text-align: center;
         }
         .sureBtn {
            display: block;
            padding: 10px 50px;
            margin: 0 auto;
            font-size: 14px;
            color: #fff;
            border: none;
         }
         .able {
            background-color: #5A6CB1;
         }
      }
   }

   .alert-third {
      border-radius: 4px;
      background-color: #fff;
      .close-icon {
         float: right;
         font-size: 30px;
         padding-top: 8px;
         padding-right: 10px;
         cursor: pointer;
      }
      .alert-content {
         padding: 20px 0 25px;
         .desc {
            font-size: 16px;
            color: #4E5C6E;
            margin: 20px 0 42px;
            text-align: center;
            .icon {
               font-size: 25px;
               color: #FFAA00;
            }
         }
         .sureBtn {
            display: block;
            padding: 10px 50px;
            margin: 0 auto;
            font-size: 14px;
            border: none;
            color: #fff;
         }
         .able {
            background-color: #5A6CB1;
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
         color: #EDEEF0;
         cursor: pointer;
      }
   }

</style>