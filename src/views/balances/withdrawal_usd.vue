<template>
   <div class="wrapper" id="withdrawal_usd">
      <div class="container">
         <div class="content">
            <p class="title">
               {{$t('balanceWithdraw')}}
            </p>
            <div class="main">
               <Row :gutter="30" style='display:flex'>
                  <Col span="4" class="col" align="right">{{$t('withdrawAmount')}}</Col>
                  <Col span="20">
                     <!--数量-->
                     <input type="text" v-model.trim="amount" :maxlength="20" @input="changeValue()" class="input"
                            onpaste="return false" ondragenter="return false"
                            :placeholder="$t('withdrawAmount1')+' $'+minAmount">
                     <span style="margin-left: 20px">USD</span>
                     <div class="available">({{$t('tsAvailable')}}: <span class="red-color">${{available}}</span>)</div>
                  </Col>
               </Row>
               <Row :gutter="30" class="row-margin" style='display:flex'>
                  <Col span="4" class="col" align="right">{{$t('withdrawAcc')}}</Col>
                  <Col span="20">
                     <!--账户-->
                     <Select v-model="bank" style="width:400px" size="large" v-if="bankList.length!==0">
                        <Option v-for="(bank,i) in bankList" :value="i" :key="bank.id">
                           {{bank.bankName}}({{bank.bankAccountNumber|hideNumber}})
                        </Option>
                        <router-link to="bankSetting">
                           <Option value="">{{$t('withdrawAcc1')}}</Option>
                        </router-link>
                     </Select>
                     <Select style="width:400px" size="large" v-else>
                        <router-link to="bankSetting">
                           <Option value="">
                              {{$t('withdrawAcc1')}}
                           </Option>
                        </router-link>
                     </Select>
                  </Col>
               </Row>
               <section class="below">
                  <p>{{$t('withdrawCon')}}</p>
                  <p>{{$t('withdrawConfee',{fee:'$5'})}}</p>
                  <Button class="instruction button-common" @click="getInstruction">{{$t('withdrawConfirm')}}</Button>
                  <div class="line"></div>
                  <Button class="history button-common" @click="next">{{$t('withdrawHis')}}
                     <Icon type="ios-arrow-round-forward" class="arrow-icon"/>
                  </Button>
                  <div class="logo-box">
                     <a target="_blank" href="https://www.gcodigital.com/">
                        <img src="../../assets/images/balances/gco-logo1x.png">
                     </a>
                     <img src="../../assets/images/balances/pt-logo@2x.png" class="logo">
                  </div>
                  <div class="partnerPrime">
                     <p>Tresso partners with Global Currency Organization and Prime Trust to provide Fiat trading
                        services. Prime Trust is a chartered, regulated, insured trust company.</p>
                  </div>
               </section>
            </div>
         </div>
      </div>
      <us-modal v-model="showModal" className="depositModal" width="750px" title="withdrawCon2"
                okText="withdrawConfirm2" cancelText="withdrawCancel" @ok="withdraw" @cancel="cancel" :showBtn="true">
         <div class="alert-content">
            <p class="desc">{{$t('withdrawCon3')}}</p>
            <div class="information">
               <Row>
                  <Col span="7" class="col-left">{{$t('withdrawDate')}}</Col>
                  <Col span="17" class="col-right">{{createdAt|getTime}}</Col>
               </Row>
               <Row>
                  <Col span="7" class="col-left">{{$t('withdrawAmount')}}</Col>
                  <Col span="17" class="col-right">${{amount}}</Col>
               </Row>
               <Row>
                  <Col span="7" class="col-left">{{$t('withdrawFee')}}</Col>
                  <Col span="17" class="col-right">${{fee}}</Col>
               </Row>
               <Row>
                  <Col span="7" class="col-left">{{$t('withdrawBank')}}</Col>
                  <Col span="17" class="col-right">{{bankName}}</Col>
               </Row>
               <Row>
                  <Col span="7" class="col-left">{{$t('withdrawAccNum')}}</Col>
                  <Col span="17" class="col-right">{{bankAccountNumber|hideNumber}}</Col>
               </Row>
            </div>
            <div class="desc">
               <p>{{$t('withdrawCon4')}}<br/>{{$t('withdrawCon5')}}</p>
               <!-- <p>{{$t('withdrawCon6')}}<span class="green-color">{{$t('withdrawCon7')}}</span></p> -->
            </div>

         </div>
      </us-modal>
      <!--设置银行卡-->
      <us-modal v-model="showNoBank" className="alertModal" width="750px" title="balanceNotice" okText="balanceToBank"
                cancelText="nextTime" @ok="checkState('/bankSetting')" @cancel="close" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('balanceNoBank')}}</h4>
         </div>
      </us-modal>
   </div>

</template>

<script>
   import moment from 'moment';
   import usModal from '@/components/usModal'
   import {Exchange} from '@/interface/exchange.js'
   import {
      onlyInputNumAndPoint, parseUrl, dealNumber
   } from '@/lib/utils.js'
   import {
      getCurrencyList,
   } from '_api/exchange.js'

   export default {
      name: "withdrawal_usd",
      components: {
         'us-modal': usModal
      },
      filters: {
         getTime(value) {
            if (value) {
               return moment(Number(value)).format('YYYY-MM-DD HH:mm:ss');
            }
         },
         hideNumber(value) {
            if (value) {
               return `****${value.slice(-4)}`
            }
         },
      },
      data() {
         return {
            //输入框
            currency: 'USD',
            available: 0,
            amount: '',
            bank: 0,
            account: [],
            bankList: [],
            withdrawAddress: [],
            minAmount: '',
            maxAmount: '',
            currencyPrecision: 2,
            //alert
            showNoBank: false,
            //modal
            showModal: false,
            bankName: '',
            fee: '',
            bankAccountNumber: '',
            createdAt: '',
            errorCode: {
               emptyAmount: 'tsAmountRequired',
               minAmount: 'tsLessThan',
               maxAmount: 'txMaxAmount',
               available: 'tsMoreThan',
            }
         }
      },
      methods: {
         init() {
            (async () => {
               this.getWithdrawAddress()
               await new Promise(resolve => {
                  getCurrencyList().then(res => {//币种信息
                     res.map(v => {
                        if (v["currency"] === this.currency) {
                           this.fee = v['withdrawMinFee']
                           this.minAmount = v["withdrawMinAmount"];
                           this.maxAmount = v["withdrawMaxAmount"];
                        }
                     })
                     resolve()
                  })
               })
               await new Promise(resolve => {
                  this.exchange.balance(function (res) {//币种获取资产
                     if (res.length !== 0) {
                        res.map((v) => {
                           if (v["currency"] === this.currency) {
                              if (v['available'] < 0.00000001) {
                                 v['available'] = 0
                              }
                              this.available = dealNumber(v.available, this.currencyPrecision)
                           }
                        })
                        if (this.available === '--') {
                           this.available = dealNumber(v.available, this.currencyPrecision)
                        }
                     } else {
                        this.available = dealNumber(v.available, this.currencyPrecision)
                     }
                     resolve()
                  }.bind(this))
               })
            })()
         },
         getWithdrawAddress() {//银行卡
            this.exchange.withdrawAddress('USD', function (res) {
               if (res.length !== 0) {
                  this.sort(res)
               }
            }.bind(this))
         },
         sort(res) {
            this.bankList = []
            this.withdrawAddress = []
            res.map(v => {
               v['obj'] = parseUrl(v.address)
            })
            res.sort(function (a, b) {
               return Number(b.obj.default) - Number(a.obj.default)
            })
            res.map(v => {
               const obj = v.obj
               this.withdrawAddress.push(v)
               this.bankList.push({
                  bankAccountNumber: obj['bankAccountNumber'],
                  bankName: obj['bankName'],
                  bankAccountName: obj['bankAccountName'],
                  modifiedTime: obj['modifiedTime']
               })
            })
         },
         getInstruction() {
            try {
               this.emptyEnter(this.amount, this.errorCode.emptyAmount, this.errorCode.minAmount, this.errorCode.maxAmount, this.errorCode.available)
               if (this.bankList.length === 0) {
                  this.showNoBank = true
                  throw null
               }
               this.showModal = true
               let bankInfo = this.bankList[this.bank]
               this.createdAt = new Date().getTime()
               this.bankName = bankInfo.bankName
               this.bankAccountNumber = bankInfo.bankAccountNumber
            } catch (e) {
               if (!e) {
                  return
               } else if (typeof e === 'string') {
                  this.warning(e)
               } else {
                  this.warning(e.code, e.params)
               }
            }
         },
         withdraw() {
            this.exchange.withdrawUSD(this.currency, this.withdrawAddress[this.bank]['address'], this.amount, this.fee, function (res) {
               this.next()
            }.bind(this), function () {

            })
         },
         checkState(page) {
            //充值前判断 实名认证
            this.$router.push(page)
         },
         close() {
            this.showNoBank = false
         },
         changeValue() {
            window.event.target.value = onlyInputNumAndPoint(window.event.target['value'], this.currencyPrecision)
            this.amount = window.event.target.value
         },
         emptyEnter(value, empty, min, max, ava) {
            if (value.length === 0) {
               throw empty
            }
            value = Number(value)
            if (value < this.minAmount) {
               let message = {
                  code: min,
                  params: this.minAmount
               }
               throw message
            }
            if (value > this.maxAmount) {
               let message = {
                  code: max,
                  params: this.maxAmount
               }
               throw message
            }
            if (value > this.available) {
               throw ava
            }
         },
         warning(code, params) {
            params = params || ''
            this.$Message.warning(this.$t(code) + ' ' + params);
         },
         next() {
            this.$router.push({
               name: 'transaction_history',
               params: {id: 'name4'}
            })
         },
         cancel() {
            this.showModal = false
         },
      },
      beforeMount() {
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         this.exchange.ssoProvider.getSsoToken = function (fn) {
            fn($cookies.get('loginToken'));
         };
      },
      mounted() {
         this.init()
      }
   }
</script>
<style lang="less">
   #withdrawal_usd {
      .ivu-select-selection {
         height: 38px;
         line-height: 38px;
         background-color: #F4F5F5;
         border-color: #dcdee2;
         box-shadow: none;
      }
      .ivu-select-selection-focused, .ivu-select-selection:hover {
         border-color: #dcdee2;
      }
      .ivu-select-placeholder {
         height: 38px;
         line-height: 38px;
      }
      .ivu-select-item-selected, .ivu-select-item-focus {
         color: #12869A;
      }
      .ivu-select-item-selected {
         &:hover {
            color: #12869A;

         }
      }
   }
</style>
<style lang="less" scoped>
   @font-color: #344857;
   @color: #12869A;
   @light-color: #D1D1D1;
   @red-color: #EA4853;
   .wrapper {
      position: relative;
      padding: 15px 0 10px;
      background-color: #F7F9FA;
      .container {
         width: 1200px;
         margin: 0 auto;
         padding: 25px 0 40px;
         .content {
            font-size: 14px;
            .col {
               height: 42px;
               line-height: 42px;
            }
            .input {
               width: 350px;
               height: 42px;
               line-height: 42px;
               padding: 6px 13px;
               border-radius: 4px;
               background-color: transparent;
               border: solid 1px @light-color;
            }
            .title {
               color: @font-color;
               font-size: 16px;
               margin-bottom: 12px;
            }
            .main {
               background-color: #fff;
               padding: 56px 60px 0;
               font-size: 14px;
               .row-margin {
                  margin-top: 23px;
               }
               .below {
                  margin-left: 185px;
                  margin-top: 20px;
                  padding-bottom: 60px;
                  p {
                     color: #949DA6;
                  }
                  .button-common {
                     height: 40px;
                     border-radius: 0;
                     font-size: 14px;
                     padding: 0 40px;
                     border: none;
                     &:active {
                        border-color: @color;
                     }
                  }
                  h4 {
                     font-size: 14px;
                     margin-top: 4px;
                     color: @red-color;
                  }
                  .line {
                     height: 0;
                     border-bottom: dashed 1px #BBBBBB;
                     margin: 20px 0 40px;
                  }
                  .instruction {
                     margin-top: 50px;
                     margin-bottom: 22px;
                     background-color: @color;
                     color: #fff;

                  }
                  .history {
                     border: solid 1px @color;
                     color: @color;
                     padding: 0 18px 0 20px;
                     .arrow-icon {
                        font-size: 20px;
                        font-weight: bold;
                        margin-left: 13px;
                        margin-top: -2px;
                     }
                  }
                  .logo-box {
                     margin-top: 25px;
                     margin-bottom: 20px;
                     .logo {
                        height: 36px;
                        &:first-child {
                           margin-right: 12px;
                        }
                     }
                  }
                  .partnerPrime {
                     p {
                        font-size: 12px;
                        color: #C1C1C1;
                     }
                  }
               }
            }
            .long-input {
               width: 400px;
               color: #666666;
               background-color: #F4F5F5;
               border-color: #E7EAED;
            }
         }
      }
   }

   .wrapper {
      .available {
         margin-top: 6px;
      }
   }

   .placeholder {
      color: #B2B9BF;
   }

   ::-webkit-input-placeholder { /* WebKit browsers */
      .placeholder;
   }

   ::-moz-placeholder { /* Mozilla Firefox 19+ */
      .placeholder;
   }

   :-ms-input-placeholder { /* Internet Explorer 10+ */
      .placeholder;
   }

   .depositModal {
      .alert-content {
         padding: 25px 0 18px;
         .information {
            margin-bottom: 20px;
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
            margin-bottom: 20px;
         }
      }
   }

   .green-color {
      color: @color !important;
   }

   .red-color {
      color: @red-color;
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