<template>
   <main id="withdraw" class="withdraw">
      <account-info name="withdrawal"></account-info>
      <div class="container pt-4 pb-4">
         <p class="title">{{currency}} - {{currencyName}}</p>
         <div class="bgc-fff">
            <div class="row">
               <div class="col-md-4 middle-col p-4">
                  <div class="line">
                     <h3 class="total">{{total}}</h3>
                     <p>{{$t('czTotalBalance')}} ({{currency}})</p>
                  </div>
               </div>
               <div class="col-md-4 middle-col p-4">
                  <div class="line">
                     <h3>{{frozen}}</h3>
                     <p>{{$t('czInOrder')}} ({{currency}})</p>
                  </div>
               </div>
               <div class="col-md-4 middle-col p-4">
                  <div>
                     <h3>{{available}}</h3>
                     <p>{{$t('czAvailableBalance')}} ({{currency}})</p>
                  </div>
               </div>
            </div>
         </div>
         <p class="title mt-3">{{currency}} {{$t('tsWithdrawalAddress')}}</p>
         <div class="content-middle bgc-fff">
            <div class="row">
               <div class="col-md-6">
                  <div class="below-col p-4">
                     <div class="input-box">
                        <input type="text" v-model.trim="value1" :disabled="disabled"
                               @input="changeAddress('value1')" class="input-common input-address">
                        <div class="right-box">
                           <div class="arrow" @click="showBelow">
                              <Icon type="md-arrow-dropdown" class="icon"/>
                           </div>
                        </div>
                        <dl v-show="showOption" class="address-list">
                           <!--label不能删 对应deleteLabel-->
                           <dt v-for="item in addressList" :value="item.value" :key="item.label" :label="item.label"
                               v-model="item.value" @click="chooseAddress" class="address-item address-item">
                              <!--地址-->
                              <Icon type="ios-pin" class="icon"/>&nbsp;{{item.label}}
                              <Icon type="md-close-circle" class="icon delete" @click="showDelete"/>
                           </dt>
                           <!--使用新地址-->
                           <dt @click="chooseNewAddress" class="address-item">
                              <Icon type="md-add-circle" class="icon"/>&nbsp;Enter withdrawal address
                           </dt>
                        </dl>
                        <div class="new-address" v-show="showNewAddress">
                           <input type="text" v-model.trim="value3" class="input-common input-address"
                                  style="width: 130px" :placeholder="$t('tsLabel')"> —
                           <input type="text" v-model.trim="value4" class="input-common input-address"
                                  style="width: 400px" :placeholder="$t('tsAddress')">
                        </div>
                     </div>
                     <!--EOS 提现备注-->
                     <div v-if="isMemo">
                        <div class="input-box-label EOSLabel">
                           <div>{{currency}} {{$t('tsWithdrawal')}}{{$t(depositType)}}</div>
                           <!--单选框-->
                           <div class="radio-box" @click="changeAgree">
                              <span class="label-radio" :class="radioStatus"></span>
                              <span class="text">{{$t('withdrawEOSNo')}}{{$t(depositType)}}</span>
                           </div>
                        </div>
                        <div class="input-box">
                           <input type="text" v-model.trim="EOSLabelValue" :maxlength="60" :class="noLabelStatus"
                                  :disabled="disabledNoLabel" @input="changeAddress('EOSLabelValue')"
                                  class="input-common input-address">
                        </div>
                     </div>
                     <!--提现数量-->
                     <div class="input-box-label">{{$t('tsAmount')}}</div>
                     <div class="input-box">
                        <input type="text" v-model.trim="value2" :maxlength="20" @input="changeValue"
                               onpaste="return false" ondragenter="return false" class="input-common input-address">
                        <div class="right-box">{{$t('tsAvailable')}} : <em
                           @click="inputALL">{{available}}</em>&nbsp;<span>{{currency}}</span>
                        </div>
                     </div>
                     <!--手续费-->
                     <Row type="flex" justify="space-between" class="below-row">
                        <Col span="12">{{$t('tsTransactionFee')}}: {{fee}}</Col>
                        <Col span="12" align="right"><span>{{$t('tsReceiveAmount')}}</span>: {{receiveAmount}}</Col>
                     </Row>
                     <Button @click="submit" class="submitBtn" :disabled="disabledSubmit">{{$t('tsSubmit')}}</Button>
                     <a @click="toWithdraw" class="below-content">How do I Withdraw from Tresso?</a>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="below-col p-4">
                     <p class="tip">{{$t('czTips')}}</p>
                     <ul>
                        <li>Minimum withdrawal amount is 0.005 BTC.</li>
                        <li>We will not credit your account if you attempt to withdraw directly to a crowdfund or ICO.
                        </li>
                        <li>Do not process a withdrawal from a computer or browser that is not secure.</li>
                        <li>You can view the status of your withdrawals on your Transaction History page.</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--删除地址-->
      <alertModal className="alert-first" v-model="showFirst" :showHeader="showHeaderFirst" :closable="closableFirst"
                  width="390">
         <div class="alert-content">
            <h4>{{$t('txDeleteAddress')}}</h4>
            <Row>
               <Col span="12">
                  <Button @click="showFirst=false" class="delete-btn">{{$t('tsBtnNo')}}</Button>
               </Col>
               <Col span="12">
                  <Button @click="deleteWithdrawAddress" class="delete-btn">{{$t('tsBtnYes')}}</Button>
               </Col>
            </Row>
         </div>
      </alertModal>
      <!--验证码-->
      <alertModal className="alert-second" v-model="showSecond" :showHeader="showHeaderSecond"
                  :closable="closableSecond"
                  title="tsyzPanelTitle" width="590">
         <div class="alert-content">
            <h5>{{$t('tsyzPanelContent')}}</h5>
            <div class="content-box" v-if="showEmail">
               <p>{{$t('withdrawEmail')}}: <span>{{email}}</span></p>
               <div class="input-box">
                  <input type="text" v-model.trim="value5" :maxlength="6" @input="checkCode('value5')"
                         class="input-common input-code">
                  <Button class="right-box" :class="disabledEMAIL?'disabledColor':''" @click="sendCode('EMAIL')"
                          :disabled="disabledEMAIL">{{countEMAIL?countEMAIL:$t(textEMAIL)}}
                  </Button>
               </div>
            </div>
            <div class="content-box" v-if="showPhone">
               <p>{{$t('tsyzMobilePhone')}}: <span>{{phone}}</span></p>
               <div class="input-box">
                  <input type="text" v-model.trim="value6" :maxlength="6" @input="checkCode('value6')"
                         class="input-common input-code">
                  <Button class="right-box" :class="disabledPHONE?'disabledColor':''" @click="sendCode('PHONE')"
                          :disabled="disabledPHONE">{{countPHONE?countPHONE:$t(textPHONE)}}
                  </Button>
               </div>
            </div>
            <div class="content-box" v-if="showGoogle">
               <p>{{$t('txGoogleCode')}}<span>{{google}}</span></p>
               <div class="input-box">
                  <input type="text" v-model.trim="value7" :maxlength="6" @input="checkCode('value7')"
                         class="input-common input-code">
               </div>
            </div>
            <Button @click="sureWithdraw" class="confirm-btn">{{$t('tsBtnYes')}}</Button>
         </div>
      </alertModal>
      <!--提现成功-->
      <alertModal className="alert-third" v-model="showThird" :showHeader="showHeaderThird" :closable="closableThird"
                  width="560">
         <div class="alert-content">
            <h3>
               <Icon type="md-information-circle" class="circle-icon"/>
               {{$t('tscgInfo')}}
            </h3>
            <ul>
               <li>{{$t('tscgInfoContent1')}}</li>
               <li>{{$t('tscgInfoContent2')}}</li>
            </ul>
            <Button @click="success" class="confirm-btn">{{$t('tscgOK')}}</Button>
         </div>
      </alertModal>
      <alertModal className="alert-fourth" v-model="showFourth" :showHeader="showHeaderFourth"
                  :closable="closableFourth" width="590">
         <div class="alert-content">
            <h3>
               {{$t('withdrawkycalert')}}
            </h3>
            <Button @click="cancel" class="kyc-btn kyc-btn-cancel">{{$t('tsBtnNo')}}</Button>
            <Button @click="toKyc" class="kyc-btn kyc-btn-ok">{{$t('gotokyc')}}</Button>
         </div>
      </alertModal>
   </main>
</template>

<script>
   import bigDecimal from 'js-big-decimal' //除法失效
   import alertModal from '@/components/alertModal'
   import AccountInfo from '@/components/common/AccountInfo'
   import {Exchange} from '@/interface/exchange.js'
   import {
      getCurrencyList,
   } from '_api/exchange.js'
   import {
      getVerifyAddress,
      getUserInfo,
      send,
      codeVerify,
      getIdentify,
   } from '_api/balances.js'
   import {
      scientificToNumber, onlyInputNumAndPoint, dealNumber
   } from '@/lib/utils.js'

   export default {
      name: "withdrawal",
      components: {
         alertModal: alertModal,
         'account-info': AccountInfo,
      },
      data() {
         return {
            currency: '--',
            currencyName: '--',
            available: '--',
            frozen: '--',
            total: '--',
            currencyPrecision: {},
            deleteLabel: '',
            deleteAddress: '',
            showFirst: false,
            showSecond: false,
            showThird: false,
            showFourth: false,
            bordered: false,
            showHeaderFirst: false,
            showHeaderSecond: true,
            showHeaderThird: false,
            showHeaderFourth: false,
            closableFirst: false,
            closableSecond: true,
            closableThird: false,
            closableFourth: false,
            fee: '0.00000000',
            receiveAmount: '0.00000000',
            minAmount: '--',
            maxAmount: '--',
            addressList: [],//使用新地址
            value1: '',//临时地址
            value2: '',//提现数量
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            isMemo: '',//当前币种为EOS
            EOSLabelValue: '',//eos提现备注
            depositType: '',
            agree: false,//无备注  单选按钮初始化未选状态
            addressVerify: '',//验证地址
            disabledNoLabel: false,
            noLabelStatus: '',
            radioStatus: '',
            email: '',
            phone: '',
            google: '',
            showEmail: false,
            showPhone: false,
            showGoogle: false,
            disabled: false,
            showOption: false,
            showNewAddress: false,
            addAddress: false,
            coinType: '',
            loginToken: '',
            disabledSubmit: false,
            disabledEMAIL: false,
            disabledPHONE: false,
            textEMAIL: 'tsyzSend',
            textPHONE: 'tsyzSend',
            userInfo: {},
            deposit: false,
            kyc: false,
            checkStatus: '',
            errorCode: {
               emptyEmail: 'tsyzEMAILRequired',
               emptyPhone: 'tsyzSMSRequired',
               emptyGoogle: 'tsyzGoogleRequired',
               email: 'tsyzCorrectCode',
               phone: 'tsyzIncorrectSMS',
               google: 'tsyzCorrectGoogleCode',
               emptyAddress: 'tsEnterAddress',
               emptyNewAddress: 'tsEnterAddress',
               emptyLabel: 'txyzLabelEmpty',
               emptyAmount: 'tsAmountRequired',
               minAmount: 'tsLessThan',
               maxAmount: 'txMaxAmount',
               available: 'tsMoreThan',
               amountCorrect: 'tsCorrectVolume',
               emptyEOSLabel: 'withdrawEOSEmpty',
            },
            coinTypeList: [],
            defaultCoinType: '',
            coinTypeNum: 8,
            coin: '',
            countEMAIL: 0,
            countPHONE: 0,
            userId: localStorage.getItem('loginUserId'),
            coinInfos: {},//币种类型切换 手续费
         }
      },
      methods: {
         init() {
            getCurrencyList().then(res => {//币种全称
               res.map(v => {
                  if (v["currency"] === this.currency) {
                     this.currencyPrecision[v.currency] = v.currencyPrecision
                     this.currencyName = v['currencyName']
                     this.coinType = v['coinInfos'][0]['coinType']
                     this.fee = v['coinInfos'][0]['withdrawMinFee']
                     this.minAmount = v["withdrawMinAmount"];
                     this.maxAmount = v["withdrawMaxAmount"];
                     if (v['coinInfos'].length !== 1) {
                        v['coinInfos'].map(coinInfo => {
                           this.coinInfos[coinInfo.coinType] = coinInfo.withdrawMinFee
                        })
                     }
                     if (v['coinInfos'][0].memo) {
                        this.isMemo = true
                        this.memoAliasName = v['coinInfos'][0].memoAliasName
                     }
                  }
               })
               if (this.isMemo) {
                  this.depositType = `depositContent${this.memoAliasName}`
               }
               this.getBalances()
            })
            this.getWithdrawAddress()
         },
         transferNumber(number, num = 8) {
            if (number === '--') {
               return '--'
            } else if (number === undefined) {
               return 0
            } else {
               return bigDecimal.round(scientificToNumber(number), num)
            }
         },
         inputALL() {
            this.value2 = this.available
            this.receive(this.available)
         },
         receive(value) {
            let val = value
            if (val >= this.minAmount && val <= Number(this.available)) {
               let receive = this.transferNumber(bigDecimal.subtract(val, this.fee), 8)
               if (Number(receive) <= 0) {
                  this.receiveAmount = '0.00000000'
               } else {
                  this.receiveAmount = receive
               }
            } else {//able状态之后的disabled状态
               this.receiveAmount = '0.00000000'
            }
         },
         getBalances() {
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
                        this.available = this.available = dealNumber(v.available, precision)
                        this.frozen = dealNumber(v.frozen, precision)
                        this.total = dealNumber(bigDecimal.add(v.available, v.frozen), precision)
                     }
                  })
                  if (this.available === '--') {
                     this.available = this['frozen'] = this['total'] = '0.00000000'

                  }
               } else {
                  this.available = this['frozen'] = this['total'] = '0.00000000'
               }
            }.bind(this))
         },
         getWithdrawAddress() {//提现地址
            this.addressList.length = 0//使用新地址
            this.exchange.withdrawAddress(this.currency, function (res) {
               if (res.length !== 0) {
                  res.map(v => {
                     this.addressList.push({value: v.address, label: v.friendlyName})
                  })
               }
            }.bind(this))
         },
         toWithdraw() {//如何提现
            let language = localStorage.getItem("countryLanguage")
            language = language === "zh-CN" ? "zh-CN" : "en-us"
            let url = `https://55support.zendesk.com/hc/${language.toLowerCase()}/articles/360004916574`;
            window.open(url);
         },
         showBelow() {//切换显示地址
            this.showOption = !this.showOption
         },
         chooseAddress(e) {//选择地址
            const value = e.target.getAttribute('value')//获取dt属性
            this.showOption = false
            this.showNewAddress = false
            this.value1 = value
            this.disabled = false
            this.addAddress = false
         },
         chooseNewAddress() {//选择新地址
            this.value3 = this.value4 = ''
            this.showOption = false
            this.showNewAddress = true
            this.value1 = this.$t('txPlaceholder')
            this.disabled = true
            this.addAddress = true
         },
         showDelete(e) {//显示删除地址框
            this.showFirst = true
            this.deleteAddress = e.target.parentNode.getAttribute('value')//获取dt属性
            this.deleteLabel = e.target.parentNode.getAttribute('label')//获取dt属性

         },
         deleteWithdrawAddress() {//删除地址
            this.exchange.deleteWithdrawAddress(this.currency, this.deleteLabel, this.deleteAddress, () => {
               this.getWithdrawAddress()
            }, () => {
            });
            this.showFirst = false
         },
         cancel() {
            this.showFourth = false
         },
         toKyc() {
            if (this.checkStatus === 'NOT_SET') {
               this.$router.push({
                  path: '/kyc',
               })
            } else {
               this.$router.push({
                  path: '/identityResult',
               })
            }
         },
         submit() {//第一步提交
            let address = ''
            let temporary = this.value1
            let amount = this.value2
            let newLabel = this.value3
            let newAddress = this.value4
            let exist = false
            let EOSWithdrawLabel = this.EOSLabelValue
            try {
               if (this.addAddress) {//添加新地址
                  this.verifyAddress(newLabel, this.errorCode.emptyLabel)
                  this.verifyAddress(newAddress, this.errorCode.emptyNewAddress)
               } else {
                  this.verifyAddress(temporary, this.errorCode.emptyAddress)
                  if (this.isMemo && !this.agree) {
                     this.verifyAddress(EOSWithdrawLabel, this.errorCode.emptyEOSLabel)
                  }
               }
               //验证提现数量
               this.emptyEnter(amount, this.errorCode.emptyAmount, this.errorCode.amountCorrect, this.errorCode.minAmount, this.errorCode.maxAmount, this.errorCode.available)
               if (this.addAddress) {//是否添加新地址
                  this.addressList.map(v => {
                     if (newLabel === v.label) {
                        exist = true//存在相同的label
                        this.warning('txyzLabelExists');
                     }
                  })
                  if (exist) {
                     return
                  } else {
                     address = newAddress
                  }
               } else {
                  address = this.value1
               }
               if (this.isMemo) {
                  this.addressVerify = `${address}:${EOSWithdrawLabel}`
               } else {
                  this.addressVerify = address
               }
               (async () => {
                  await new Promise(resolve => {
                     getVerifyAddress({'coinType': this.coinType, 'address': this.addressVerify}).then(res => {//验证地址
                        if (res.verify) {//地址通过
                           resolve()
                        } else {//地址错误
                           this.error('tsCorrectAddress');
                        }
                     })
                  })
                  await new Promise(resolve => {
                     getUserInfo({
                        userId: localStorage.getItem('loginUserId')
                     }, $cookies.get('loginToken')).then(res => {//实名认证
                        if (res.data) {
                           switch (res.data['identifyState']) {
                              case 'INIT':
                                 this.checkStatus = "NOT_SET"
                                 break
                              case 'SUBMIT':
                                 this.checkStatus = "RESULT"
                                 break
                              case 'SUCCESS':
                                 this.checkStatus = "PASSED"
                                 this.kyc = true//实名通过 可以提现
                                 break
                              case 'FAIL':
                                 this.checkStatus = "NOT_SET"
                                 break

                           }
                        }

                        resolve()
                     })
                  })
                  await new Promise(resolve => {
                     if (this.kyc === false) {
                        this.exchange.activityList('INCOMING', 'OTC_INCOMING,WALLET_INCOMING', 'COMPLETED', null, null, 1, 10, function (res) {
                           if (res.data.length > 0) {//有充值记录
                              this.deposit = true
                           }
                           resolve()
                        }.bind(this))
                     } else {
                        resolve()
                     }
                  })
                  await new Promise(resolve => {
                     if (this.deposit === false && this.kyc === false) {//去实名
                        this.showFourth = true
                        resolve()
                     } else {
                        if (this.addAddress) {
                           this.exchange.createWithdrawAddress(this.currency, newLabel, address, function () {//添加提现地址
                              this.getWithdrawAddress()
                              this.getUserInfo()
                              resolve()
                           }.bind(this))
                        } else {
                           this.getWithdrawAddress()
                           this.getUserInfo()
                           resolve()
                        }
                     }
                  })
               })()
            } catch (e) {
               if (typeof e === 'string') {
                  this.warning(e)
               } else {
                  this.warning(e.code, e.params)
               }
            }
         },
         getUserInfo() {//获取用户信息
            this.value5 = this.value6 = this.value7 = ''
            if (!this.email && !this.phone) {
               getUserInfo({userId: this.userId}, this.loginToken).then(res => {
                  res = res.data
                  this.showSecond = true
                  this.userInfo = {
                     email: res.email ? true : false,
                     phone: res.phone ? true : false,
                     google: res['bindGoogle']
                  }
                  if (res.email) {
                     this.showEmail = true
                     this.email = res.email
                  }
                  if (res.phone) {
                     this.showPhone = true
                     this.phone = res.phone
                  }
                  this.showGoogle = res['bindGoogle']
               })
            } else {
               this.showSecond = true
            }
         },
         sendCode(codeType) {//发送验证码
            this[`disabled${codeType}`] = true
            send(this.loginToken, {
                  userId: this.userId,
                  businessType: 'withdraw',
                  sendCodeType: codeType.toLowerCase(),
                  extend: {
                     "language": localStorage.getItem('countryLanguage'),
                     "withdrawAmount": `${this.value2} ${this.currency}`,
                     "withdrawAddress": this.addressVerify
                  }
               }
            ).then(res => {
               if (res["code"]) {
                  this.error(res["code"])
                  setTimeout(function () {
                     this[`disabled${codeType}`] = false
                  }, 1000)
               } else {
                  this.getCountDown(codeType, res['result'])
               }
            })
         },
         getCountDown(codeType, second) {//倒计时
            let disabledType = `disabled${codeType}`
            let type = `count${codeType}`
            codeType = setInterval(function () {
               this[type] = second
               if (second === 0) {
                  this[disabledType] = false
                  clearInterval(codeType);
               } else {
                  second--;
               }
            }.bind(this), 1000);
         },
         emptyEnter(value, empty, corrent, min, max, ava) {
            let regAmount = new RegExp("^\\d+(\\.)?\\d{0," + this.currencyPrecision[this.currency] + "}$");//提现数量
            // let regAmount = /^\d+(\.)?\d{0,8}$/;//提现数量
            if (value.length === 0) {
               throw empty
            }
            if (!regAmount.test(value)) {
               throw corrent
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
         verifyAddress(value, code) {
            if (!value || value.length === 0) {
               throw code
            }
         },
         verifyCode(params, value, empty, code) {//try throw 验证码异常
            let regCode = /^\d{6}$/;//提现数量
            if (this.userInfo[params]) {
               if (value.length === 0) {
                  throw empty
               }
               if (!regCode.test(value)) {
                  throw code
               }
            }
         },
         sureWithdraw() {//提现
            try {
               this.verifyCode('email', this.value5, this.errorCode.emptyEmail, this.errorCode.email)
               this.verifyCode('phone', this.value6, this.errorCode.emptyPhone, this.errorCode.phone)
               this.verifyCode('google', this.value7, this.errorCode.emptyGoogle, this.errorCode.google)
               codeVerify(this.loginToken, {//校验验证码
                  userId: this.userId,
                  businessType: 'withdraw',
                  "emailCode": this.value5,
                  "phoneCode": this.value6,
                  "googleCode": this.value7,
               }).then(res => {
                  if (res["code"]) {
                     this.error(res["code"]);
                  } else {
                     this.exchange.ssoProvider["getWithdrawExtension"] = res['result'];
                     this.exchange.withdraw(this.currency, this.addressVerify, this.value2, this.fee, this.coin, function (res) {
                        this.showSecond = false
                        this.showThird = true
                     }.bind(this))
                  }
               })
            } catch (error) {
               this.warning(error)//抛出异常
            }
         },
         success() {
            this.showThird = false
            this.showNewAddress = this.disabled = this.agree = this.disabledNoLabel = false//添加新地址隐藏 取消临时地址禁用
            this.noLabelStatus = this.radioStatus = ''//eos取消输入框和单选按钮样式
            this.value1 = this.value2 = this.value3 = this.value4 = this.EOSLabelValue = ''
            this.receiveAmount = '0.00000000'
            this.getBalances()
            this.$router.push({
               name: 'transaction_history',
               params: {id: 'withdraw-href'}
            })
         },
         changeAddress(type) {
            window.event.target.value = window.event.target.value.replace(/[^A-Za-z0-9]/g, "");  //清除“数字”和“.”以外的字符
            this[type] = window.event.target['value']
         },
         changeValue() {
            window.event.target.value = onlyInputNumAndPoint(window.event.target.value, this.coinTypeNum === 6 ? 6 : this.currencyPrecision[this.currency])
            this['value2'] = window.event.target['value']
            let val = Number(window.event.target['value'])
            this.receive(val)
         },
         changeAgree() {//eos 无备注按钮
            this.disabledNoLabel = !this.disabledNoLabel
            this.EOSLabelValue = ''//清空输入框
            this.agree = !this.agree
            if (this.agree) {
               this.radioStatus = 'label-radio-checked'
               this.noLabelStatus = 'unableLabel'
            } else {
               this.radioStatus = ''
               this.noLabelStatus = ''
            }
         },
         checkCode(type) {//验证码输入框校验
            window.event.target['value'] = window.event.target['value'].replace(/[^\d]/g, '');
            this[type] = window.event.target['value']
         },
         error(code, params) {
            params = params || ''
            this.$Message.error(this.$t(code) + params);
         },
         warning(code, params) {
            params = params || ''
            this.$Message.warning(this.$t(code) + params);
         },
         interFunc() {
            var _this = this;
            document.onkeydown = function (e) {
               //1.规避页面上方的搜索框等是否获取了焦点，是则不触发本次快捷键
               var inputs = document.getElementsByClassName('isfocus_enter'); //找到这一组元素
               //是否获取了焦点的判断
               let hasFocus = false;
               if (inputs && inputs.length > 0) {
                  for (let i = 0; i < inputs.length; i++) {
                     //如果hasFocus为true表示input元素获得焦点，否则没有获得焦点
                     hasFocus = document.hasFocus() && document.activeElement === inputs[i];
                     if (hasFocus == true) {
                        break;
                     }
                  }
               }
               var key = window.event.keyCode;
               if (key == 13) {
                  //	_this.handleSubmit('formValidate') //此方法是当按下enter键后要做的动作。
                  _this.submit()
               }
            }
         }
      },
      beforeMount() {
         let loginToken = $cookies.get('loginToken')
         this.loginToken = loginToken
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         this.exchange.ssoProvider.getSsoToken = function (fn) {
            fn(loginToken);
         };
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         if (this.$route.query['currency']) {
            this.currency = this.$route.query['currency']
            this.init()
         } else {
            //没传币种
            this.$router.push('/home')
         }
      },
      computed: {
         changeLanguage() {
            return this.$store.state.app.countryLanguage;//  返回全局state的状态值
         },
      },
      watch: {
         changeLanguage() {
            if (this.showNewAddress) {
               this.value1 = this.$t('txPlaceholder')
            }
         },
      },
      created() {
         this.interFunc()
      }
   }
</script>
<style lang="less">
   /*充值提现单选按钮样式*/
   #withdraw {
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

   #withdraw {
      .ivu-btn {
         margin-right: 20px;
         background-color: #12869A;
         color: #fff;
      }
      .ivu-input {
         height: 42px;
         background-color: transparent;
         border: solid 1px #5B73D4;
         color: #9DA5C8;
      }
      .ivu-select-selection {
         height: 42px;
         line-height: 42px;
         background-color: transparent;
         border: 1px solid #5B73D4;
         color: #9DA5C8;
         .ivu-select-placeholder, .ivu-select-selected-value {
            height: 40px;
            line-height: 40px;
         }
      }
      .ivu-select-dropdown {
         background-color: #0A1640;
         border: solid 1px #5B73D4;
         .ivu-select-item {
            &:hover {
               background-color: #5464A2;
            }
         }
         .ivu-select-item-focus {
            background-color: #18183e;
            color: #fff;
         }
      }
   }
</style>
<style lang="less" scoped>
   @color: #344857;
   @color-green: #12869A;
   @color-gary: #949DA6;
   @color-light-gary: #E7EAED;

   #withdraw {
      background-color: #F7F9FA
   }

   .bgc-fff {
      background-color: #fff;
   }

   .border {
      border: solid 1px @color-light-gary;
   }

   .disabledColor {
      background-color: @color-light-gary !important;
   }

   .input-common {
      width: 100%;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      padding: 6px 13px;
      background-color: transparent;
   }

   .input-code, .input-address {
      .border;
      color: @color;
      &:focus {
         outline: 0;
      }
   }

   .unableLabel {
      background: #e7ecf2;
      border: none;
   }

   .input-box {
      position: relative;
      .right-box {
         position: absolute;
         height: 42px;
         line-height: 42px;
         top: 0;
         right: 0;
         font-size: 14px;
      }
   }

   .withdraw {
      min-height: 100%;
      .title {
         color: @color;
         font-size: 16px;
         margin-bottom: 12px;
      }
      .middle-col {
         height: 150px;
         text-align: center;
         div {
            h3 {
               display: block;
               font-size: 32px;
               color: @color;
               margin-bottom: 25px;
            }
            p {
               font-size: 14px;
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
      .content-middle {
         .below-col {
            .input-box-label {
               color: @color;
               font-size: 14px;
               margin-bottom: 13px;
            }
            .EOSLabel {
               display: flex;
               justify-content: space-between;
               div {
                  display: flex;
                  align-items: center;
                  margin-bottom: 0;
               }
            }
            .radio-box {
               .label-radio {
                  .border;
               }
               .text {
                  color: @color;
               }
            }
            .input-box {
               margin-bottom: 15px;
               .right-box {
                  color: #B2B9BF;
                  span {
                     color: @color;
                     margin-right: 10px;
                  }
                  .arrow {
                     width: 42px;
                     height: 42px;
                     background-color: @color-light-gary;
                     text-align: center;
                     cursor: pointer;
                     .icon {
                        font-size: 26px;
                        color: #ACB5BF;
                     }
                  }
               }
               em {
                  cursor: pointer;
                  color: @color-green;
               }
               .address-list {
                  position: absolute;
                  width: 100%;
                  background-color: #fff;
                  border: 1px solid @color-light-gary;
                  border-top: none;
                  border-radius: 0 0 4px 4px;
                  z-index: 20;
                  .address-item {
                     position: relative;
                     height: 42px;
                     line-height: 42px;
                     font-size: 12px;
                     font-weight: normal;
                     color: @color-gary;
                     padding: 0 10px;
                     cursor: pointer;
                     align-items: center;
                     -webkit-user-select: none;
                     -moz-user-select: none;
                     -ms-user-select: none;
                     user-select: none;
                     .icon {
                        font-size: 22px;
                        color: @color-light-gary;
                     }
                     &:not(:last-child) {
                        border-bottom: 1px solid @color-light-gary;
                     }
                     &:hover {
                        background-color: @color-light-gary;
                        .icon {
                           font-size: 22px;
                           color: @color-gary;
                        }
                     }
                     .delete {
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        &:hover {
                           color: #fff;
                        }
                     }
                  }
               }
            }
            .below-row {
               margin-top: 30px;
               color: @color-green;
               span {
                  color: @color-gary;
               }
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
            .new-address {
               display: flex;
               justify-content: space-between;
               margin-top: 10px;
               line-height: 42px;
               -webkit-user-select: none;
               -moz-user-select: none;
               -ms-user-select: none;
               user-select: none;
            }
            .submitBtn {
               width: 100%;
               margin-top: 5px;
               font-size: 14px !important;
               margin-bottom: 28px;
            }
            .below-content {
               display: block;
               font-size: 12px;
               color: @color-gary;
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
         h4 {
            margin-top: 20px;
            margin-bottom: 40px;
         }
         div {
            .delete-btn {
               padding: 8px 50px;
               font-size: 14px;
               background-color: @color-green;
               color: #fff;
            }
         }
      }
   }

   .alert-second {
      .alert-content {
         position: relative;
         margin: 0 auto;
         text-align: center;
         padding: 25px 24px 8px;
         h4 {
            font-size: 20px;
            color: #5a6cb1;
            margin-bottom: 10px;
         }
         h5 {
            font-size: 12px;
            margin-bottom: 30px;
         }
         .content-box {
            p {
               font-size: 14px;
               text-align: left;
               color: @color;
               margin-bottom: 5px;
               span {
                  color: @color-gary;
               }
            }
            .input-box {
               margin-bottom: 15px;
               .right-box {
                  width: 140px;
                  padding: 0;
                  background-color: #12869a;
                  color: #fff;
                  cursor: pointer;
                  &:hover {
                     background-color: #108093;
                  }
               }
            }
         }
         .confirm-btn {
            width: 100%;
            padding: 8px 0;
            font-size: 14px;
            background-color: #12869a;
            color: #fff;
            margin-top: 35px;
            &:hover {
               background-color: #108093;
            }
         }
      }
   }

   .alert-third {
      .alert-content {
         position: relative;
         margin: 0 auto;
         text-align: center;
         padding: 25px 24px 8px;
         .circle-icon {
            font-size: 28px;
            color: #c1c5ca;
            margin-top: -5px;
         }
         h3 {
            font-size: 20px;
            color: @color;
            margin-bottom: 20px;
         }
         ul {
            display: inline-block; //使li左对齐并且居中
            li {
               list-style: disc;
               font-size: 13px;
               color: @color-gary;
               line-height: 20px;
               text-align: left;
            }
         }
         .confirm-btn {
            width: 100%;
            padding: 8px 0;
            font-size: 14px;
            background-color: @color-green;
            color: #fff;
            margin-top: 35px;
            border-radius: 0;
         }
      }
   }

   .alert-fourth {
      .alert-content {
         position: relative;
         margin: 0 auto;
         text-align: center;
         padding: 66px 24px 50px;
         h3 {
            font-size: 14px;
            color: #455665;
            margin-bottom: 34px;
         }
         .kyc-btn {
            width: 132px;
            padding: 8px 0;
            font-size: 14px;
            color: #fff;
            margin-top: 35px;
            border-radius: 2px;
         }
         .kyc-btn-cancel {
            background-color: #fff;
            border: solid 1px #198599;
            color: #198599;
            margin-right: 70px;

            &:hover {
               background-color: #198599;
               color: #fff;
            }
         }
         .kyc-btn-ok {
            color: #fff;
            background-color: #198599;
            &:hover {
               background-color: #108093;
            }
         }
      }
   }
</style>
