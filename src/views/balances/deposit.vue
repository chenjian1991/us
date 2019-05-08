<template>
   <div class="wrapper" id="deposit">
      <div class="container">
         <deposit-withdraw :balancesData="depositData"></deposit-withdraw>
         <div class="content-middle content-common">
            <p class="title" v-if="showNormal">{{$t('czDepositAddress')}}</p>
            <Row type="flex" justify="space-between" class="row-middle">
               <Col span="12" v-if="showNormal">
                  <div class="below-col">
                     <div class="address">{{address}}</div>
                     <div class="below-btn">
                        <div>
                           <Button @click="showQRCode" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                           <Button type="primary" v-clipboard:copy="address" v-clipboard:success="onCopy"
                                   class="normal-btn">
                              {{$t('czCopyAddress')}}
                           </Button>
                        </div>
                        <!--<a @click="toDeposit">{{$t('czHowDeposit')}}</a>-->
                     </div>
                  </div>
               </Col>
               <Col span="12" v-if="showEOSStep1">
                  <div class="below-col-eos step-common">
                     <div class="step-one">
                        <div>
                           <div class="notice">
                              <Icon type="md-information-circle" class="icon"/>
                              <span>{{$t('depositNotice')}}{{$t('depositNoticeContent')}}</span>
                           </div>
                           <!--单选框-->
                           <div class="radio-box" @click="changeAgree">
                              <span class="label-radio" :class="radioStatus"></span>
                              <span class="text">{{$t('depositAgree')}}</span>
                           </div>
                        </div>
                        <div class="btn-box">
                           <Button @click="next" class="next" :disabled="disabledNext" :class="nextStatus">
                              {{$t('depositNext')}}
                           </Button>
                        </div>

                     </div>
                  </div>
               </Col>
               <Col span="12" v-if="showEOSStep2">
                  <div class="below-col-eos-two step-common">
                     <div class="step-two">
                        <h4>{{currency}} {{$t('depositLabel')}}</h4>
                        <div class="notice">
                           <Icon type="md-information-circle" class="icon"/>
                           <span>{{$t('depositNotice')}}{{$t('depositNoticeContent')}}</span>
                        </div>
                        <div class="EOS-box">{{EOSLabel}}</div>
                        <div class="below-btn">
                           <Button @click="showQRCode('EOSLabel')" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                           <Button type="primary" v-clipboard:copy="EOSLabel" v-clipboard:success="onCopy"
                                   class="normal-btn copy-btn">
                              {{$t('depositCopy')}}
                           </Button>
                        </div>
                        <h4 class="eos-deposit-address">{{currency}} {{$t('depositAddress')}}</h4>
                        <div class="EOS-box">{{address}}</div>
                        <div class="below-btn">
                           <Button @click="showQRCode" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                           <Button type="primary" v-clipboard:copy="address" v-clipboard:success="onCopy"
                                   class="normal-btn copy-btn">
                              {{$t('czCopyAddress')}}
                           </Button>
                        </div>
                     </div>
                  </div>
               </Col>
               <Col span="12">
                  <div class="below-col">
                     <p class="tip">{{$t('czTips')}}</p>
                     <ul>
                        <li>{{$t('sendOnly')}}{{currency}}{{$t('czTipsContent')}}</li>
                        <li>{{$t('aftemaking')}}</li>
                     </ul>
                  </div>
               </Col>
               <a @click="toDeposit" class="below-content">{{$t('czHowDeposit')}}</a>

            </Row>
         </div>
      </div>
      <alertModal className="alert-first" v-model="showFirst" :showHeader="showHeaderFirst" :closable="closableFirst"
                  width="390">
         <div class="alert-content">
            <Icon type="ios-close-circle" class="icon" @click="showFirst=false"/>
            <!--<div class="title">{{currency}} {{$t('czDepositAddress')}}</div>-->
            <div class="title">{{currency}} {{$t(depositName)}}</div>

            <div id="qrcode"></div>
         </div>
      </alertModal>
   </div>
</template>

<script>
   import bigDecimal from 'js-big-decimal' //除法失效
   import Cookies from 'js-cookie'
   import QRCode from 'qrcodejs2'//二维码
   import alertModal from '@/components/alertModal'
   import depositWithdraw from '@/components/depositWithdraw'
   import {Exchange} from '@/interface/exchange.js'
   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      scientificToNumber, subNumberPoint
   } from '@/lib/utils.js'

   export default {
      name: "deposit",
      components: {
         alertModal: alertModal,
         'deposit-withdraw': depositWithdraw,
      },
      data() {
         return {
            currency: '--',
            currencyName: '--',
            total: '--',
            frozen: '--',
            available: '--',
            address: '--',
            showFirst: false,
            bordered: false,
            showHeaderFirst: false,
            closableFirst: false,
            showNormal: false,
            showEOSStep1: false,
            showEOSStep2: false,
            agree: false,
            disabledNext: true,
            nextStatus: '',
            EOSLabel: '--',
            EOSAddress: '--',
            radioStatus: '',
            currencyPrecision: {},
            depositData: {},
            depositName:'czDepositAddress',
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
                        this.currencyPrecision[v.currency] = v.currencyPrecision
                        if (v["currency"] === this.currency) {
                           this.depositData['currencyName'] = v['currencyName']
                           this.currencyName = v['currencyName']
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
                              let precision = this.currencyPrecision[v.currency]
                              if (v['available'] < 0.00000001) {
                                 v['available'] = 0
                              }
                              if (v['frozen'] < 0.00000001) {
                                 v['frozen'] = 0
                              }
                              this.depositData['available'] = this.transferNumber(subNumberPoint(v.available, precision), precision)
                              this.depositData['frozen'] = this.transferNumber(subNumberPoint(v.frozen, precision), precision)
                              this.depositData['total'] = this.transferNumber(subNumberPoint(bigDecimal.add(v.available, v.frozen), precision), precision)

                              this.available = this.transferNumber(subNumberPoint(v.available, precision), precision)
                              this.frozen = this.transferNumber(subNumberPoint(v.frozen, precision), precision)
                              this.total = this.transferNumber(subNumberPoint(bigDecimal.add(v.available, v.frozen), precision), precision)
                           }
                        })
                        if (this.available === '--') {
                           this.depositData['available'] = this.depositData['frozen'] = this.depositData['total'] = '0.00000000'
                        }
                     } else {
                        this.depositData['available'] = this.depositData['frozen'] = this.depositData['total'] = '0.00000000'
                     }
                     this.depositData = JSON.parse(JSON.stringify(this.depositData))// 这句话很重要 重新赋值 更新数据！！！
                     resolve()
                  }.bind(this))
               })
            })()
            this.exchange.deposit(this.currency, function (data) {//获取充值地址
               if (this.currency === 'EOS') {
                  this.address = data.value.slice(0, data.value.indexOf(':'))
                  this.EOSLabel = data.value.slice(data.value.indexOf(':') + 1)

               } else {
                  this.address = data.value
               }
            }.bind(this), function (data) {
               this.$Message.error(this.$t('500'));
            }.bind(this));
         },
         showQRCode(params) {
            if (params === 'EOSLabel') {
               if (this.EOSLabel) {
                  this.showFirst = true
                  this.depositName='depositLabel'
                  this.$nextTick(function () {
                     this.qrcode(params)
                  })
               }
            } else {
               if (this.address) {
                  this.showFirst = true
                  this.depositName='czDepositAddress'
                  this.$nextTick(function () {
                     this.qrcode()
                  })
               }
            }
         },
         qrcode(params) {
            document.getElementById("qrcode").innerHTML = "";//避免二维码重复
            new QRCode('qrcode', {
               width: 200,
               height: 200,
               text: this[params] ? this[params] : this.address
            })
         },
         onCopy() {
            this.$Message.success(this.$t('copySuccess'));
         },
         toDeposit() {
            let language = localStorage.getItem("countryLanguage")
            language = language === "zh-CN" ? "zh-CN" : "en-us"
            let url = `https://55support.zendesk.com/hc/${language.toLowerCase()}/articles/360004688594`;
            window.open(url);
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
         changeAgree() {//eos 无备注按钮
            this.disabledNext = !this.disabledNext
            this.agree = !this.agree
            if (this.agree) {
               this.nextStatus = 'label-radio-checked'
               this.radioStatus = 'label-radio-checked'
            } else {
               this.radioStatus = ''
            }
         },
         next() {
            if (this.agree) {
               this.showEOSStep1 = false
               this.showEOSStep2 = true
            }
         }
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         if (this.$route.query['currency']) {
            this.currency = this.$route.query['currency']
            this.currency === 'EOS' ? this.showEOSStep1 = true : this.showNormal = true
            this.depositData['currency'] = this.$route.query['currency']
            this.init()
         } else {
            //没传币种
         }
      }
   }
</script>
<style lang="less">
   #deposit {
      .ivu-card {
         height: 664px;
      }
      .ivu-btn {
         position: relative;
      }
      .ivu-btn[disabled] {
         background-color: #9FAFBF;
         color: #fff;
      }
   }

   /*充值提现单选按钮样式*/
   #deposit, #withdraw {
      @color-green: #12869A;
      .ivu-btn {
         font-size: 14px;
         padding: 7px 25px;
         border-radius: 0;
         background-color: #108093;
         color: #fff;
         &:hover {
            background-color: @color-green;
            color: #fff;
         }
      }
      .copy-btn, .ivu-btn-primary {
         background-color: #fff;
         color: #12869A;
         border: 1px solid #12869A;
         &:hover {
            background-color: #fff;
            color: #12869A;
         }
      }
      .ivu-card {
         position: relative;
         background: #0A1640;
      }
      .ivu-card-head {
         border-bottom: 1px solid #1F2551 !important;
      }
      .radio-box {
         position: relative;
         display: flex;
         align-items: center;
         cursor: pointer;
         .label-radio {
            position: absolute;
            top: 4px;
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1px solid #E7EAED;
            border-radius: 2px;
            margin-right: 5px;
            margin-top: -1px;
         }
         .label-radio-checked { //选中单选框
            background-color: #108093;
         }
         .label-radio-checked:after {
            position: absolute;
            content: '';
            left: 4px;
            top: 1px;
            height: 9px;
            width: 5px;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            border-radius: 2px;
            transition: all .2s ease-in-out;
            transform: rotate(45deg);
         }
         .text {
            font-size: 14px;
            color: #949DA6;
            margin-left: 18px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
         }
      }

   }
</style>
<style lang="less" scoped>
   @color: #344857;
   @color-green: #12869A;
   @color-gary: #949DA6;
   @color-light-gary: #E7EAED;
   button {
      background-color: #5A6CB1;
   }

   .wrapper {
      position: relative;
      padding: 15px 0 10px;
      background-color: #F7F9FA;
      p {
         font-size: 14px;
         color: #9DA5C8;
      }
      .header {
         width: 1200px;
         margin: 0 auto 10px;
         a {
            font-size: 14px;
            color: @color;
         }
      }
      .container {
         width: 1200px;
         margin: 0 auto;
         padding: 25px 0 40px;
         .content-common {
            .title {
               color: @color;
               font-size: 16px;
               margin-bottom: 12px;
            }
            .below-content {
               display: block;
               font-size: 12px;
               color: @color-gary;
               margin-top: 28px;
            }
         }
         .content-top {
            .row-top {
               margin-top: 4px;
               margin-bottom: 33px;
               background-color: #fff;
               .middle-col {
                  height: 150px;
                  padding: 35px 0 40px;
                  text-align: center;
                  div {
                     h3 {
                        display: block;
                        font-size: 32px;
                        color: @color;
                        margin-bottom: 25px;
                     }
                     p {
                        color: @color-gary;
                     }
                  }
                  .line {
                     border-right: solid 1px #E7EAED;
                     .total {
                        color: @color-green;
                     }
                  }
               }
            }
         }
         .content-middle {
            .row-middle {
               background-color: #fff;
               padding: 30px;
               .below-col {
                  .address {
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     width: 537px;
                     height: 100px;
                     border: solid 1px #F5F5F5;
                     text-align: center;
                     color: @color;
                     font-size: 16px;
                  }
                  .tip {
                     font-size: 12px;
                     color: @color;
                     margin-bottom: 5px;
                  }
                  ul {
                     margin-left: 18px;
                     li {
                        font-size: 12px;
                        list-style: disc;
                        line-height: 24px;
                        color: @color-gary;
                     }
                  }
               }
               .below-btn {
                  width: 537px;
                  text-align: left;
                  margin-top: 20px;
                  .normal-btn {
                     margin-right: 30px;
                  }
                  a {
                     display: inline-block;
                     height: 38px;
                     line-height: 38px;
                     font-size: 12px;
                     color: @color-gary;
                     cursor: pointer;
                  }
               }
               .step-common {
                  .notice {
                     display: flex;
                     font-size: 12px;
                     color: #EC4E4E;
                     margin-bottom: 20px;
                     .icon {
                        height: inherit;
                        color: #EC4E4E;
                        margin-right: 2px;
                        margin-top: 1px;
                        font-size: 16px;
                     }
                  }
               }
               .below-col-eos {
                  width: 537px;
                  padding: 40px 30px;
                  border: solid 1px rgba(90, 114, 209, 0.3);
                  .step-one {
                     display: flex;
                     justify-content: space-between;
                     .radio {
                        color: #fff;
                        font-size: 14px;
                     }
                  }
                  .btn-box {
                     display: flex;
                     align-items: center;
                     justify-content: flex-end;
                     margin-left: 20px;
                     .next {
                        display: block;
                     }
                  }

                  .unable {
                  }
                  .able {
                     background-color: #5A6CB1;
                  }
               }
               .below-col-eos-two {
                  .step-two {
                     h4 {
                        font-size: 14px;
                        color: @color;
                        margin-bottom: 10px;
                     }
                     .EOS-box {
                        width: 537px;
                        height: 42px;
                        line-height: 40px;
                        border: 1px solid @color-light-gary;
                        background-color: transparent;
                        margin: 18px 0 20px;
                        color: @color;
                        font-size: 16px;
                        padding-left: 13px;
                     }
                     .eos-deposit-address {
                        margin-top: 30px;

                     }
                  }
               }
            }
         }
      }
   }

   .alert-first {
      .alert-content {
         position: relative;
         width: 200px;
         margin: 0 auto;
         text-align: center;
         padding-bottom: 20px;
         .icon {
            position: absolute;
            top: -20px;
            right: -80px;
            font-size: 26px;
            color: #c1c5ca;
            cursor: pointer;
         }
         .title {
            font-size: 20px;
            color: @color;
            margin-top: 15px;
            margin-bottom: 20px;
         }
      }
   }
</style>