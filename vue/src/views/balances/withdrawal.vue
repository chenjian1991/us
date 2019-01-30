<template>
   <div class="wrapper" id="withdraw">
      <div class="container">
         <deposit-withdraw :balancesData="withdrawData"></deposit-withdraw>
         <div class="content-middle content-common">
            <p class="title">{{currency}} {{$t('tsWithdrawalAddress')}}</p>
            <Row type="flex" justify="space-between" class="row-middle">
               <Col span="12">
                  <div class="below-col">
                     <div class="input-box">
                        <input type="text" v-model.trim="value1" :disabled="disabled"
                               @input="changeAddress('value1')"
                               class="input-common input-address">
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
                              <Icon type="md-add-circle" class="icon"/>&nbsp;{{$t('tsUseNewAddress')}}
                           </dt>
                        </dl>
                        <div class="new-address" v-show="showNewAddress">
                           <input type="text" v-model.trim="value3" class="input-common input-address"
                                  style="width: 130px"> —
                           <input type="text" v-model.trim="value4" class="input-common input-address"
                                  style="width: 400px">
                        </div>
                     </div>
                     <!--EOS 提现备注-->
                     <div v-if="EOS">
                        <div class="input-box-label EOSLabel">
                           <div>{{currency}} {{$t('withdrawEOSLabel')}}</div>
                           <!--单选框-->
                           <div class="radio-box" @click="changeAgree">
                              <span class="label-radio" :class="radioStatus"></span>
                              <span class="text">{{$t('withdrawEOSNoLabel')}}</span>
                           </div>
                        </div>
                        <div class="input-box">
                           <input type="text" v-model.trim="EOSLabelValue" :maxlength="12" :class="noLabelStatus"
                                  :disabled="disabledNoLabel" @input="changeAddress('EOSLabelValue')"
                                  class="input-common input-address">
                        </div>
                     </div>
                     <!--提现数量-->
                     <div class="input-box-label">{{$t('tsAmount')}}</div>
                     <div class="input-box">
                        <input type="text" v-model.trim="value2" :maxlength="20" @input="changeValue('value2')"
                               onpaste="return false" ondragenter="return false" class="input-common input-address">
                        <div class="right-box">{{$t('tsAvailable')}} : <em
                           @click="inputALL">{{available}}</em>&nbsp;<span>{{currency}}</span>
                        </div>
                     </div>
                     <Row type="flex" justify="space-between" class="below-row">
                        <Col span="12">{{$t('tsTransactionFee')}}: {{fee}}</Col>
                        <Col span="12" align="right"><span>{{$t('tsReceiveAmount')}}</span>: {{receiveAmount}}</Col>
                     </Row>
                     <Button @click="submit" class="submitBtn" :disabled="disabledSubmit">{{$t('tsSubmit')}}</Button>
                     <a @click="toWithdraw" class="below-content">{{$t('tsHowWithdrawal')}}</a>
                  </div>
               </Col>
               <Col span="10">
                  <div class="below-col">
                     <p class="tip">{{$t('czTips')}}</p>
                     <ul>
                        <li>{{$t('tsMinimum')}}: {{minAmount}} {{currency}}</li>
                        <li>{{$t('tsTipsContent2')}}</li>
                        <li>{{$t('tsTipsContent3')}}</li>
                        <li>{{$t('tsTipsContent4')}}</li>
                     </ul>
                  </div>
               </Col>
            </Row>
         </div>
      </div>
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
                  <Button class="right-box" @click="sendCode('EMAIL')" :disabled="disabledEMAIL">{{$t(textEMAIL)}}
                  </Button>
               </div>
            </div>
            <div class="content-box" v-if="showPhone">
               <p>{{$t('tsyzMobilePhone')}}: <span>{{phone}}</span></p>
               <div class="input-box">
                  <input type="text" v-model.trim="value6" :maxlength="6" @input="checkCode('value6')"
                         class="input-common input-code">
                  <Button class="right-box" @click="sendCode('PHONE')" :disabled="disabledPHONE">{{$t(textPHONE)}}
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
   </div>
</template>

<script>
   import bigDecimal from 'js-big-decimal' //除法失效
   import Cookies from 'js-cookie'
   import alertModal from '@/components/alertModal'
   import depositWithdraw from '@/components/depositWithdraw'
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
      getRealtimeList,
   } from '_api/balances.js'
   import {
      scientificToNumber, subNumberPoint, onlyInputNumAndPoint
   } from '@/lib/utils.js'

   export default {
      name: "withdrawal",
      components: {
         alertModal: alertModal,
         'deposit-withdraw': depositWithdraw,
      },
      data() {
         return {
            withdrawData: {},
            currency: '--',
            currencyName: '--',
            available: '--',
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
            EOS: '',//当前币种为EOS
            EOSLabelValue: '',//eos提现备注
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
            kyc: false,
            checkStatus: '',
            price: '',
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
            }
         }
      },
      methods: {
         init() {
            let loginToken = Cookies.get('loginToken')
            this.loginToken = loginToken
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
            getCurrencyList().then(res => {//币种全称
               res.map(v => {
                  this.currencyPrecision[v.currency] = v.currencyPrecision
                  if (v["currency"] === this.currency) {
                     this.coinType = v['coinInfos'][0]['coinType']
                     this.currencyName = v['currencyName']
                     this.fee = v['withdrawMinFee']
                     this.minAmount = v["withdrawMinAmount"];
                     this.maxAmount = v["withdrawMaxAmount"];
                     this.withdrawData['currencyName'] = v['currencyName']
                  }
               })
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
            let receive = this.transferNumber(bigDecimal.subtract(this.available, this.fee), 8)
            if (Number(receive) <= 0) {
               this.receiveAmount = '0.00000000'
            } else {
               this.receiveAmount = receive
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
                        this.withdrawData['available'] = this.available = this.transferNumber(subNumberPoint(v.available, precision), precision)
                        this.withdrawData['frozen'] = this.transferNumber(subNumberPoint(v.frozen, precision), precision)
                        this.withdrawData['total'] = this.transferNumber(subNumberPoint(bigDecimal.add(v.available, v.frozen), precision), precision)
                     }
                  })
                  if (this.available === '--') {
                     this.available = this.withdrawData['available'] = this.withdrawData['frozen'] = this.withdrawData['total'] = '0.00000000'
                  }
               } else {
                  this.available = this.withdrawData['available'] = this.withdrawData['frozen'] = this.withdrawData['total'] = '0.00000000'
               }
               this.withdrawData = JSON.parse(JSON.stringify(this.withdrawData))// 这句话很重要 重新赋值 更新数据！！！
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
            if (this.checkStatus === 'NOT_SET') {/*  */
               window.location.href = "../../identityAuthentication/noAuthentication.html";
            } else if (this.checkStatus === 'PASSED') {
               window.location.href = "../../identityAuthentication/passed.html";
            } else if (this.checkStatus === 'CHECKING') {
               window.location.href = "../../identityAuthentication/underReview.html";
            } else if (this.checkStatus === 'FAILURE') {
               window.location.href = '../../identityAuthentication/noPass.html';
            }
            // if (this.checkStatus === 'NOT_SET') {
            //    window.open()
            //    this.$router.push({
            //       path: '/identiy',
            //    })
            // } else {
            //    this.$router.push({
            //       path: '/identityResult',
            //    })
            // }
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
                  if (this.EOS && !this.agree) {
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
               if (this.EOS) {
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
                     if (this.currency === 'BTC') {
                        getRealtimeList({symbol: 'BTCUSDT'}).then(res => {//资产估值
                           this.price = res['BTCUSDT'].data.last
                           resolve()

                        })
                     } else {
                        getRealtimeList({symbol: [`${this.currency}BTC`, 'BTCUSDT']}).then(res => {//资产估值
                           this.price = Number(bigDecimal.multiply(res[`${this.currency}BTC`].data.last, res['BTCUSDT'].data.last))
                           resolve()

                        })
                     }
                  })
                  await new Promise(resolve => {
                     if (amount * this.price >= 500) {
                        getIdentify(this.loginToken).then(res => {//kyc
                           this.checkStatus = res.data.checkStatus
                           if (res.data.checkStatus === 'PASSED') {
                              this.kyc = true//实名通过 可以提现
                           }
                           resolve()
                        })
                     } else {
                        resolve()
                     }
                  })
                  await new Promise(resolve => {
                     if (amount * this.price >= 500 && this.kyc === false) {//去实名
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
               getUserInfo(this.loginToken).then(res => {
                  this.showSecond = true
                  this.userInfo = {
                     email: res.email ? true : false,
                     phone: res.phone ? true : false,
                     google: res['isBindingGoogle']
                  }
                  if (res.email) {
                     this.showEmail = true
                     this.email = res.email
                  }
                  if (res.phone) {
                     this.showPhone = true
                     this.phone = res.phone
                  }
                  this.showGoogle = res['isBindingGoogle']
               })
            } else {
               this.showSecond = true
            }
         },
         sendCode(codeType) {//发送验证码
            this[`disabled${codeType}`] = true
            send(this.loginToken, {
                  "operateType": "WITHDRAW",
                  "codeType": codeType,
                  "language": localStorage.getItem('countryLanguage'),
                  "withdrawAmount": `${this.value2} ${this.currency}`,
                  "withdrawAddress": this.addressVerify
               }
            ).then(res => {
               if (res["code"]) {
                  this.error(res["code"])
                  setTimeout(function () {
                     this[`disabled${codeType}`] = false
                  }, 1000)
               } else {
                  this.getCountDown(codeType, res['expiredSeconds'])
               }
            })
         },
         getCountDown(codeType, second) {//倒计时
            let disabledType = `disabled${codeType}`
            let type = `text${codeType}`
            let text = this[type]//按钮文字
            codeType = setInterval(function () {
               this[type] = second
               if (second === 0) {
                  this[disabledType] = false
                  this[type] = text
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
            if (value.length === 0) {
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
                  "emailCode": this.value5,
                  "phoneCode": this.value6,
                  "googleCode": this.value7,
               }).then(res => {
                  if (res["code"]) {
                     this.error(res["code"]);
                  } else {
                     this.exchange.ssoProvider["getWithdrawExtension"] = res['token'];
                     this.exchange.withdraw(this.currency, this.addressVerify, this.value2, this.fee, function (res) {
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
         },
         changeAddress(type) {
            window.event.target.value = window.event.target.value.replace(/[^A-Za-z0-9]/g, "");  //清除“数字”和“.”以外的字符
            this[type] = window.event.target['value']
         },
         changeValue(type) {
            // window.event.target.value = (window.event.target.value.match(/^\d*(\.?\d{0,8})/g)[0])||null
            // this[type] = window.event.target['value']
            // window.event.target.value = window.event.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
            // window.event.target.value = window.event.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            // window.event.target.value = window.event.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            // window.event.target.value = window.event.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数
            // if (window.event.target.value.indexOf(".") < 0 && window.event.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            //    window.event.target.value = parseFloat(window.event.target.value);
            // }
            window.event.target.value = onlyInputNumAndPoint(window.event.target.value, this.currencyPrecision[this.currency])
            this[type] = window.event.target['value']
            let val = Number(window.event.target['value'])
            if (val >= this.minAmount && val <= this.available) {
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
         }
      },
      mounted() {
         this.$store.commit('changeHeaderColor', '#15232C');
         if (this.$route.query['currency']) {
            this.currency = this.$route.query['currency']
            this.withdrawData['currency'] = this.$route.query['currency']
            if (this.currency === 'EOS') {
               this.EOS = true
            }
            this.init()
         } else {
            //没传币种
         }
      }
   }
</script>
<style lang="less">
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

   .border {
      border: solid 1px @color-light-gary;
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
            color: #AAB0CC;
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
         }
         .content-middle {
            .row-middle {
               background-color: #fff;
               padding: 30px;
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
