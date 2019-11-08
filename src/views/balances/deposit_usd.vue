<template>
   <div class="wrapper" id="deposit_usd">
      <div class="container">
         <div class="content">
            <p class="title">{{$t('balanceDeposit')}}</p>
            <div class="main">
               <Row :gutter="30" style='display:flex'>
                  <Col span="4" class="col" align="right">{{$t('depositAmount')}}</Col>
                  <Col span="20">
                     <!--数量-->
                     <input type="text" v-model.trim="amount" :maxlength="20" @input="changeValue()" class="input"
                            onpaste="return false" ondragenter="return false"
                            :placeholder="$t('depositAmount2')+' $100'">
                     <span style="margin-left: 20px">USD</span>
                  </Col>
               </Row>
               <Row :gutter="30" class="row-margin" style='display:flex'>
                  <Col span="4" class="col" align="right">{{$t('fromAccount')}}</Col>
                  <Col span="20">
                     <!--名字-->
                     <input type="text" v-model.trim="bankAccountName" class="input long-input" :disabled="true">
                  </Col>
               </Row>
               <section class="below">
                  <p>To add a bank account, click the Bank Accounts option on your Balances page and fill out the form
                     to link a new bank account. Note that in order to make a wire deposit into your Tresso account the
                     wire transfer must originate from a bank account that is owned by you.</p>
                  <Button class="instruction button-common" :loading="loading" @click="getInstruction">
                     {{$t('depositSubmit')}}
                  </Button>
                  <h4>Funds will be returned to the originating bank if the wire transfer originated from a third
                     party.</h4>
                  <div class="line"></div>
                  <Button class="history button-common" @click="next">{{$t('depositHis')}}
                     <Icon type="ios-arrow-round-forward" class="arrow-icon"/>
                  </Button>
                  <div class="logo-box">
                     <a target="_blank" href="https://www.gcodigital.com/">
                        <img src="../../assets/images/balances/gco-logo@2x.png">
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
      <us-modal v-model="showModal" className="depositModal" width="750px" title="depositInstruction"
                okText="depositSubmit2" cancelText="depositCancel" @ok="next" @cancel="cancel" :showBtn="true">
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
   import usModal from '@/components/usModal'
   import {Exchange} from '@/interface/exchange.js'
   import {
      onlyInputNumAndPoint, parseUrl
   } from '@/lib/utils.js'
   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      identifyQuery,
   } from '_api/balances.js'

   export default {
      name: "deposit_usd",
      components: {
         'us-modal': usModal
      },
      data() {
         return {
            loginToken: $cookies.get('loginToken'),
            //输入框
            currency: 'USD',
            amount: '',
            bankAccountName: '',
            minAmount: 100,
            maxAmount: '',
            currencyPrecision: '',
            loading: false,//按钮加载中
            //modal
            showModal: false,
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
            errorCode: {
               emptyAmount: 'depositAmountRequired',
               minAmount: 'depositLessThan',
            }
         }
      },
      methods: {
         init() {
            this.getIdentify()
         },
         getInstruction() {
            try {
               this.emptyEnter(this.amount, this.errorCode.emptyAmount, this.errorCode.minAmount)
               this.loading = true
               this.exchange.depositUSD('USD', this.amount, function (data) {//获取充值地址
                  this.showModal = true
                  this.loading = false
                  this.message = parseUrl(data.value)
                  this.information.map(v => {
                     v.value = this.message[v.label]
                  })
                  this.reference = this.message['reference_number']
               }.bind(this), function (data) {
                  this.$Message.error(data.data.message);
                  this.loading = false
               }.bind(this));
            } catch (e) {
               console.log(e)
               if (typeof e === 'string') {
                  this.warning(e)
               } else {
                  this.warning(e.code, e.params)
               }
            }
         },
         emptyEnter(value, empty, min) {
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
         },
         warning(code, params) {
            params = params || ''
            this.$Message.warning(this.$t(code) + ' ' + params);
         },
         changeValue() {
            window.event.target.value = onlyInputNumAndPoint(window.event.target['value'], 2)
            this.amount = window.event.target.value
         },
         next() {
            this.$router.push({
               name: 'transaction_history',
               params: {id: 'name3'}
            })
         },
         cancel() {
            this.showModal = false
         },
         getIdentify() { //实名认证
            identifyQuery({
               userId: localStorage.getItem('loginUserId'),
               nameList: 'THIRD_PT'
            }, this.loginToken).then(res => {
               if (res.data.length) {
                  const formJson = res.data[0].data
                  this.information[0].value = this.bankAccountName = `${formJson.firstName} ${formJson.lastName}`
                  this.information = JSON.parse(JSON.stringify(this.information))
               }
            })
         },
      },
      beforeMount() {
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         this.exchange.ssoProvider.getSsoToken = function (fn) {
            fn(this.loginToken);
         };
      },
      mounted() {
         this.init()
      }
   }
</script>

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
                  margin-top: 40px;
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
                     margin: 35px 0 40px;
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