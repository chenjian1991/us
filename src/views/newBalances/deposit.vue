<template>
   <main id="deposit" class="deposit">
      <account-info name="deposit"></account-info>
      <div class="container pt-4 pb-4">
         <div class="bgc-fff content-common p-5">
            <div class="row justify-content-between align-items-center">
               <div class="currency-left col-md-3">
                  <img :src="imgSrc" class="img">
                  <div class="balance-value">{{currency}} - {{currencyName}}</div>
               </div>
               <div class="balance col-md-3" v-for="(item,i) in balance">
                  <p class="balance-title">{{$t(item.text)}}</p>
                  <h3 class="balance-value" :class="i===0?'color-green':''">{{item.value}}</h3>
               </div>
            </div>
         </div>
         <div class="title mb-2 mt-3"><span>Deposit {{currency}}</span></div>

         <div class="content-middle content-common">
            <div class="row justify-content-between">
               <!--币币-->
               <div class="col-md-6 mt-3">
                  <!--正常币种-->
                  <div class="bgc-fff p-4" v-if="showNormal">
                     <div class="below-col">
                        <div class="address">{{address}}</div>
                        <div>
                           <div class="below-btn row justify-content-between align-items-center">
                              <div class="col-md-6">
                                 <Button type="primary" v-clipboard:copy="address" v-clipboard:success="onCopy"
                                         class="normal-btn">
                                    {{$t('czCopyAddress')}}
                                 </Button>
                              </div>
                              <div class="col-md-6">
                                 <Button @click="showQRCode" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!--带备注的币种第一步-->
                  <div class="bgc-fff p-4" v-if="showEOSStep1">
                     <div class="below-col-eos step-common">
                        <div class="step-one">
                           <div>
                              <div class="notice">
                                 <Icon type="md-information-circle" class="icon"/>
                                 <span>{{$t('depositNotice')}}{{$t('depositContent1')}}{{$t(depositType)}}{{$t('depositContent2')}}{{currency}}{{$t('depositContent3')}}</span>
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
                  </div>
                  <!--带备注的币种第二步-->
                  <div class="bgc-fff p-4" v-if="showEOSStep2">
                     <div class="below-col-eos-two step-common">
                        <div class="step-two">
                           <h4>{{currency}} {{$t('czDeposit')}}{{$t(depositType)}}</h4>
                           <div class="notice">
                              <Icon type="md-information-circle" class="icon"/>
                              <span>{{$t('depositNotice')}}{{$t('depositContent1')}}{{$t(depositType)}}{{$t('depositContent2')}}{{currency}}{{$t('depositContent3')}}</span>
                           </div>
                           <div class="EOS-box">{{EOSLabel}}</div>
                           <div class="below-btn">
                              <Button type="primary" v-clipboard:copy="EOSLabel" v-clipboard:success="onCopy"
                                      class="normal-btn copy-btn">
                                 {{$t('depositCopy')}}{{$t(depositType)}}
                              </Button>
                              <Button @click="showQRCode('EOSLabel')" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                           </div>
                           <h4 class="eos-deposit-address">{{currency}} {{$t('depositAddress')}}</h4>
                           <div class="EOS-box">{{address}}</div>
                           <div class="below-btn">
                              <Button type="primary" v-clipboard:copy="address" v-clipboard:success="onCopy"
                                      class="normal-btn copy-btn">
                                 {{$t('czCopyAddress')}}
                              </Button>
                              <Button @click="showQRCode" class="normal-btn">{{$t('czShowQRCode')}}</Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!--otc-->
               <div class="col-md-6 mt-3 bgc-fff p-4">
                  <p class="tip">{{$t('czTips')}}</p>
                  <ul>
                     <li>{{$t('sendOnly')}} {{currency}} {{$t('czTipsContent')}}</li>
                     <li>{{$t('aftemaking')}}</li>
                  </ul>
                  <!--<div class="title mb-3 space-between" v-if="isOTC">-->
                     <!--<div>{{$t('depositOTCBuyCurrency')}} {{currency}} {{$t('depositOTCBuyWith')}}</div>-->
                     <!--<span class="f12 color-gary">{{$t('depositOTCSupport')}} PayPal / {{$t('depositOTCBank')}} / {{$t('depositOTCWechat')}} / {{$t('depositOTCAlipay')}}{{$t('depositOTCBuy')}}</span>-->
                  <!--</div>-->
                  <!--<div class="title mb-3" v-else>-->
                     <!--<div>{{$t('depositOTCBuyCurrency')}} {{currencyOtcList}} {{$t('depositOTCBuyWith')}}</div>-->
                  <!--</div>-->
               </div>
            </div>
         </div>
      </div>
      <alertModal className="alert-first" v-model="showFirst" :showHeader="showHeaderFirst" :closable="closableFirst"
                  width="355">
         <div class="alert-content">
            <Icon type="ios-close-circle" class="icon" @click="showFirst=false"/>
            <div class="title">{{currency}} {{$t(depositName)}}</div>
            <div class="normal-font">Scan QR code to get the address</div>
            <div id="qrcode" class="qrcode"></div>
            <div class="f12 color-gary">Please don't deposit any other digital assets except {{currency}} to the above address</div>
         </div>
      </alertModal>
   </main>
</template>

<script>
   import bigDecimal from 'js-big-decimal' //除法失效
   import QRCode from 'qrcodejs2'//二维码
   import alertModal from '@/components/alertModal'
   import AccountInfo from '@/components/common/AccountInfo'

   import {Exchange} from '@/interface/exchange.js'
   import {Market} from '@/interface/market.js'

   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      scientificToNumber, dealNumber
   } from '@/lib/utils.js'

   export default {
      name: "deposit",
      components: {
         alertModal: alertModal,
         'account-info': AccountInfo,
      },
      data() {
         return {
            currency: '--',
            currencyName: '--',
            imgSrc: ' ',
            balance: [
               {text: 'czTotalBalance', value: '--'},
               {text: 'czInOrder', value: '--'},
               {
                  text: 'czAvailableBalance', value: '--'
               }],
            total: '--',
            frozen: '--',
            available: '--',
            address: '--',
            unit: '--',
            price: '--',
            minLimit: '--',
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
            depositName: 'czDepositAddress',
            depositType: '',
            isMemo: false,
            memoAliasName: '',
            coinTypeList: [],
            defaultCoinType: '',
         }
      },
      methods: {
         init() {
            (async () => {
               await new Promise(resolve => {
                  this.getCurrencyImgList()
                  resolve()
               })
               await new Promise(resolve => {
                  this.exchange.balance(function (res) {//币种获取资产
                     if (res.length !== 0) {
                        res.map((v) => {
                           if (v["currency"] === this.currency) {
                              let precision = this.currencyPrecision[v.currency]
                              this.balance[0].value = dealNumber(bigDecimal.add(v.available, v.frozen), precision)
                              this.balance[1].value = dealNumber(v['frozen'], precision)
                              this.balance[2].value = dealNumber(v['available'], precision)
                           }
                        })
                        if (this.available === '--') {
                           this.depositData['available'] = this.depositData['frozen'] = this.depositData['total'] = '0.00000000'
                        }
                     } else {
                        this.depositData['available'] = this.depositData['frozen'] = this.depositData['total'] = '0.00000000'
                     }
                     resolve()
                  }.bind(this))
               })
            })()

         },
         getDepositAddress() {
            this.exchange.deposit(this.currency, function (data) {//获取充值地址
               if (this.isMemo) {
                  this.address = data.value.slice(0, data.value.indexOf(':'))
                  this.EOSLabel = data.value.slice(data.value.indexOf(':') + 1)
               } else {
                  this.address = data.value
               }
            }.bind(this));
         },
         showQRCode(params) {
            if (params === 'EOSLabel') {
               if (this.EOSLabel) {
                  this.showFirst = true
                  this.depositName = 'depositLabel'
                  this.$nextTick(function () {
                     this.qrcode(params)
                  })
               }
            } else {
               if (this.address) {
                  this.showFirst = true
                  this.depositName = 'czDepositAddress'
                  this.$nextTick(function () {
                     this.qrcode()
                  })
               }
            }
         },
         qrcode(params) {
            document.getElementById("qrcode").innerHTML = "";//避免二维码重复
            new QRCode('qrcode', {
               width: 145,
               height: 145,
               text: this[params] ? this[params] : this.address
            })
         },
         onCopy() {
            this.$Message.success(this.$t('copySuccess'));
         },
         getCurrencyImgList() {//币种logo
            this.market.getCurrencyInfo(this.currency, function (res) {
               this.imgSrc = res[0]['projectInfo'].image
            }.bind(this))
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
            this.market = new Market();
            getCurrencyList().then(res => {//币种全称
               res.map(v => {
                  this.currencyPrecision[v.currency] = v.currencyPrecision
                  if (v["currency"] === this.currency) {
                     this.currencyName = v['currencyName']
                     if (v['coinInfos'][0].memo) {
                        this.isMemo = true
                        this.memoAliasName = v['coinInfos'][0].memoAliasName
                     }
                     if (this.currency === 'USDT') {
                        v['coinInfos'].map(value => {
                           this.coinTypeList.push({type: value['blockChainType'], value: value['coinType']})
                        })
                        this.defaultCoinType = v['coinInfos'][0]['coinType']
                     }
                  }
               })
               if (this.isMemo) {
                  this.showEOSStep1 = true
                  this.depositType = `depositContent${this.memoAliasName}`
               } else {
                  this.showNormal = true
               }
               this.init()
               this.getDepositAddress()
            })

         } else {
            //没传币种
            // this.$router.push('/home')
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
   #deposit {
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

   .bgc-fff {
      background-color: #fff;
   }

   .normal-font {
      font-size: 14px;
      color: @color;
   }

   .color-gary {
      color: @color-gary;
   }

   .color-green {
      color: @color-green !important;
   }

   .f18 {
      font-size: 18px;
   }

   .f12 {
      font-size: 12px;
   }

   .space-between {
      display: flex;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      justify-content: space-between;
   }

   #deposit {
      background-color: #F7F9FA
   }

   .deposit {
      min-height: 100%;
      .title {
         color: @color;
         font-size: 16px;
      }
      .content-common {

         .below-content {
            display: block;
            font-size: 12px;
            color: @color-gary;
            margin-top: 28px;
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
      .currency-left {
         border-right: solid 1px #F5F5F5;
         .img {
            width: 20px;
            margin-bottom: 6px;
         }
      }
      .currency-right {
         .balance {
            display: inline-block;
            .balance-title {
               font-size: 12px;
               margin-bottom: 10px;
            }
         }
      }
      .balance-value {
         font-size: 20px;
         color: @color;
      }
      .content-middle {
         .below-col {
            .address {
               display: flex;
               justify-content: center;
               align-items: center;
               width: 100%;
               height: 70px;
               border: solid 1px #F5F5F5;
               text-align: center;
               color: @color;
               font-size: 16px;
               word-break: break-all;
               .min {
                  font-size: 12px;
                  color: @color-gary;
               }
               .otc-img-box {
                  display: flex;
                  display: -ms-flexbox;
                  display: -webkit-flex;
                  display: -moz-flex;
                  display: -ms-flex;
                  justify-content: space-between;
                  /*width: 363px;*/
                  .otc-img {
                     height: 26px;
                  }
               }
            }
         }
         .below-btn {
            margin-top: 30px;
            .normal-btn {
               width: 100%;
               border-radius: 2px;
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
            /*width: 537px;*/
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
                  /*width: 537px;*/
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

   .alert-first {
      .alert-content {
         position: relative;
         margin: 0 auto;
         text-align: center;
         padding-bottom: 20px;
         .icon {
            position: absolute;
            top: -20px;
            right: -5px;
            font-size: 26px;
            color: #c1c5ca;
            cursor: pointer;
         }
         .title {
            font-size: 15px;
            color: @color;
            margin-top: 15px;
            margin-bottom: 20px;
         }
         .qrcode {
            width: 145px;
            margin: 40px auto 27px;
         }
      }
   }
</style>