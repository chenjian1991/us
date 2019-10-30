<template>
   <div class="wrapper" id="bankSetting">
      <div class="container">
         <div class="content">
            <p class="title">{{$t('bankAccounts')}}</p>
            <div class="main">
               <div v-for="(bank,i) in bankList" class="row-block">
                  <Row type="flex" align-item="center">
                     <Col span="8" class="verticalCentering">
                        <h4 class="main-color bank">{{bank.bankName}}</h4>
                     </Col>
                     <Col span="8">
                        <p class="time">{{bank.bankAccountName}}</p>
                        <p class="time">{{bank.bankAccountNumber|dealBankNumber}}</p></Col>
                     <Col span="8" class="verticalCentering">
                        <a class="balancesBtn detail-hover detail-color" @click="details(i)">{{$t('bankDetail')}}</a>
                        <a class="balancesBtn delete-hover delete-color" @click="del(i)">{{$t('bankDel')}}</a>
                        <a class="balancesBtn set-hover set-color" :disabled="disabledSet" @click="set(i)" v-if="i!==0">{{$t('bankSetDefault')}}</a>
                     </Col>
                  </Row>
                  <!--右上角默认-->
                  <div class="default" v-if="i===0">
                     <span class="text">{{$t('bankDefault')}}</span>
                  </div>
               </div>
               <div class="row-block">
                  <div class="main-color add-more">
                     <span @click="add" class="verticalCentering"><img src="../../assets/images/balances/add.png"
                                                                       class="add-icon">{{$t('withdrawAcc1')}}</span>
                  </div>
               </div>
               <div>
                  <div>
                     <a target="_blank" href="https://www.gcodigital.com/">
                        <img src="../../assets/images/balances/gco-logo1x.png">
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <bank-modal v-model="showModal" className="alertModal" width="750px" okText="bankSubmit" cancelText="nextTime"
                  :showBtn="showBtn" :loading="loading" @ok="ok" @cancel="cancel">
         <div class="alert-content">
            <div class="information">
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankname')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="bankName" :maxlength="255" class="input" :disabled="disabled"
                            :class="{borderColor:errorInput==='bankName',bgColor:disabled}" @input="change('bankName')">
                  </Col>
               </Row>
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankAccname')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="bankAccountName" class="input" :disabled="true"
                            :class="{bgColor:disabled}">
                  </Col>
               </Row>
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankAcc')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="bankAccountNumber" :maxlength="50" class="input"
                            :class="{borderColor:errorInput==='bankAccountNumber',bgColor:disabled}"
                            :disabled="disabled" @input="change('bankAccountNumber')">
                  </Col>
               </Row>
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankAccmail')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="contactEmail" :maxlength="255" class="input" :disabled="disabled"
                            :class="{borderColor:errorInput==='contactEmail',bgColor:disabled}"
                            @input="change('contactEmail')">
                  </Col>
               </Row>
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankAccname2')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="contactName" :maxlength="255" class="input" :disabled="disabled"
                            :class="{borderColor:errorInput==='contactName',bgColor:disabled}"
                            @input="change('contactName')">
                  </Col>
               </Row>
               <!--美国用户 RoutingNumber 必填，不需要填 swiftCode-->
               <Row class="accountInfo" type="flex" align="middle" v-if="isUS">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankRout')}}
                     <!--问号上提示-->
                     <Tooltip :content="$t('bankRoutingNumber')" placement="top">
                        <Icon type="ios-help-circle" class="help-icon"/>
                     </Tooltip>
                  </Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="routingNumber" :maxlength="9" class="input" :disabled="disabled"
                            :class="{borderColor:errorInput==='routingNumber',bgColor:disabled}"
                            @input="change('routingNumber')">
                  </Col>
               </Row>
               <!--美国以外的用户 swiftCode必填， 不需要填RoutingNumber-->
               <Row class="accountInfo" type="flex" align="middle" v-else>
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankSwift')}}
                     <!--问号上提示-->
                     <Tooltip :content="$t('bankSwiftCode')" placement="top">
                        <Icon type="ios-help-circle" class="help-icon"/>
                     </Tooltip>
                  </Col>
                  <Col :span="rightSpan" class="col-right">
                     <input type="text" v-model.trim="swiftCode" :maxlength="15" class="input" :disabled="disabled"
                            :class="{borderColor:errorInput==='swiftCode',bgColor:disabled}"
                            @input="change('swiftCode')">
                  </Col>
               </Row>
               <Row class="accountInfo" type="flex" align="middle">
                  <Col :span="leftSpan" class="col-left" align="right">{{$t('bankPayType')}}</Col>
                  <Col :span="rightSpan" class="col-right">
                     <Select v-model.trim="paymentType" size="large" class="select" :disabled="disabled">
                        <Option v-for="(item) in paymentTypeList" :value="item" :key="item">{{item}}</Option>
                     </Select>
                  </Col>
               </Row>
            </div>
         </div>
      </bank-modal>
   </div>
</template>

<script>
   import Cookies from 'js-cookie'
   import moment from 'moment';
   import md5 from 'js-md5';//哈希
   import bankModal from '@/components/bankModal'
   import {Exchange} from '@/interface/exchange.js'
   import {
      onlyInputNumAndPoint, parseUrl
   } from '@/lib/utils.js'
   import {
      identifyQuery, queryUserInfo,
   } from '_api/balances.js'

   export default {
      name: "bankSetting",
      components: {
         'bank-modal': bankModal
      },
      filters: {
         dealBankNumber(value) {
            return `********${value.slice(-4)}`
         }
      },
      data() {
         return {
            currency: 'USD',
            withdrawAddress: [],//地址 删除时使用
            bankList: [],//银行卡信息
            bankLength: 0,
            detailsInfo: [],//详情
            disabledSet: false,//禁止设置 中间留时间
            //alert
            showModal: false,
            loading: false,//加载中
            showBtn: false,
            disabled: false,
            errorInput: '',
            leftSpan: 7,
            rightSpan: 17,

            isUS: true,//美国国籍
            bankAccountName: localStorage.getItem('bankAccountName') || '',
            bankAccountNumber: '',
            contactEmail: '',
            contactName: '',
            bankName: '',
            routingNumber: '',
            swiftCode: '',
            paymentType: 'wire',
            paymentTypeList: ['wire'],
            information: [
               'bankName',
               'bankAccountName',
               'bankAccountNumber',
               'contactEmail',
               'contactName',
               'routingNumber',
               'swiftCode',
               'paymentType',
            ],
            default: '',
         }
      },
      methods: {
         init() {
            this.getWithdrawAddress()
            this.queryUserInfo()
         },
         getWithdrawAddress() {//银行卡
            this.exchange.withdrawAddress(this.currency, function (res) {
               if (res.length !== 0) {
                  this.bankLength = res.length
                  this.sort(res)
               } else {
                  this.bankList = []
               }
            }.bind(this))
         },
         queryUserInfo() {
            queryUserInfo(Cookies.get('loginToken')).then(res => {
               if (res.data.country !== 'US') {
                  this.isUS = false
                  this.paymentType = 'wire_international'
                  this.paymentTypeList = ['wire_international']
                  this.information.splice(5, 1)
               } else {
                  this.information.splice(6, 1)
               }
            })
         },
         sort(res) {
            this.bankList = []
            this.detailsInfo = []
            this.withdrawAddress = []
            res.map(v => {
               v['obj'] = parseUrl(v.address)
            })
            res.sort(function (a, b) {
               return b.obj.default - a.obj.default//从大到小
            })
            res.map(v => {
               const obj = v.obj
               this.detailsInfo.push(obj)
               this.withdrawAddress.push(v)
               this.bankList.push({
                  bankAccountNumber: obj['bankAccountNumber'],
                  bankName: obj['bankName'],
                  bankAccountName: obj['bankAccountName'],
                  modifiedTime: obj['modifiedTime']
               })
            })
         },
         setDefault(res) {
            res['obj'] = parseUrl(res.address)
            const obj = res.obj
            this.detailsInfo.unshift(obj)
            this.withdrawAddress.unshift(res)
            this.bankList.unshift({
               bankAccountNumber: obj['bankAccountNumber'],
               bankName: obj['bankName'],
               bankAccountName: obj['bankAccountName'],
               modifiedTime: obj['modifiedTime']
            })
         },
         deleteNoDefault(i) {
            this.detailsInfo.splice(i, 1);
            this.withdrawAddress.splice(i, 1)
            this.bankList.splice(i, 1)
         },
         add() {//添加银行卡
            this.showModal = true
            this.showBtn = true
            this.disabled = false
            this.getIdentify()
         },
         details(i) {//详情
            this.showModal = true
            this.showBtn = false//不显示button
            this.disabled = true//输入框禁止改动
            this.information.map(v => {
               this[v] = this.detailsInfo[i][v]
            })
         },
         del(i) {//删除
            const deleteInfo = this.withdrawAddress[i]
            this.exchange.deleteWithdrawAddress(this.currency, deleteInfo['friendlyName'], deleteInfo['address'], function () {
               this.getWithdrawAddress()
            }.bind(this));
         },
         set(i) {//设置默认
            this.disabledSet = true
            setTimeout(() => {
               this.disabledSet = false
            }, 1000)
            const deleteInfo = this.withdrawAddress[i]
            this.exchange.deleteWithdrawAddress(this.currency, deleteInfo['friendlyName'], deleteInfo['address'], function () {
               //删除成功
            });
            const setInfo = JSON.parse(JSON.stringify(this.withdrawAddress[i]))
            const friendlyName = setInfo['friendlyName']
            let address = setInfo['address']
            address += `&default=${new Date().getTime()}`
            this.exchange.createWithdrawAddress(this.currency, friendlyName, address, function (result) {//添加提现地址
               this.deleteNoDefault(i)
               this.setDefault(result)
            }.bind(this))
         },
         ok() {//添加银行卡
            try {
               let address = ''
               this.information.map((v) => {
                  if (this[v]) {
                     address += `${v}=${this[v]}&`
                  } else {
                     this.errorInput = v
                     throw ''
                  }
               })

               let patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;//邮箱
               let patternName = /^[a-zA-Z\s]+$/;
               // let patternSwift = /^(?![0-9]+$)(?![a-zA-Z]+$)/;
               let patternSwift = /^[A-Z0-9]{0,15}$/;
               let patternNumber = /^\d+$/;
               let patternRoute = /^\d{9}$/;
               if (!patternName.test(this.bankName)) {
                  this.errorInput = 'bankName'
                  throw 'connamePop'
               }
               if (!patternNumber.test(this.bankAccountNumber)) {
                  this.errorInput = 'bankAccountNumber'
                  throw 'accountnumPop'
               }
               if (!patternEmail.test(this.contactEmail)) {
                  this.errorInput = 'contactEmail'
                  throw 'conmailPop'
               }
               if (!patternName.test(this.contactName)) {
                  this.errorInput = 'contactName'
                  throw 'connamePop'
               }
               //判断国籍

               if (this.isUS === true) {
                  if (!patternRoute.test(this.routingNumber)) {
                     this.errorInput = 'routingNumber'
                     throw 'routnumPop'
                  }
               } else {
                  if (!patternSwift.test(this.swiftCode)) {
                     this.errorInput = 'swiftCode'
                     throw 'swiftPop'
                  }
               }
               if (this.bankLength === 0) {//未设置过 直接默认
                  address += `default=${new Date().getTime()}&`
               } else {
                  address += `default=0&`
               }
               address += `modifiedTime=${new Date().getTime()}`
               let friendlyName = md5(address)
               this.loading = true
               this.exchange.createWithdrawAddress(this.currency, friendlyName, address, function (result) {//添加提现地址
                  if (result.data) {
                     //报错
                     this.$Message.warning(result.data.message);
                     this.loading = false
                  }else{

                     this.loading = false
                     this.showModal = false
                     this.getWithdrawAddress()
                     this.cancel()
                  }
               }.bind(this))
            } catch (e) {
               if (e) {
                  this.warning(e)
               }
               this.loading = false
            }
         },
         change(model) {
            if (model === 'bankAccountNumber' || model === 'routingNumber') {
               window.event.target.value = onlyInputNumAndPoint(window.event.target['value'])
               this[model] = window.event.target.value
            }
            if (this.errorInput === model) {
               this.errorInput = ''
            }
         },
         cancel() {//取消清空输入框
            this.showModal = false
            this.errorInput = ''
            this.bankAccountName = ''
            this.bankAccountNumber = ''
            this.contactEmail = ''
            this.contactName = ''
            this.bankName = ''
            this.routingNumber = ''
            this.swiftCode = ''
         },
         getIdentify() { //实名认证
            identifyQuery(Cookies.get('loginToken')).then(res => {
               localStorage.setItem('bankAccountName', `${res.data.firstName} ${res.data.lastName}`)
               this.bankAccountName = localStorage.getItem('bankAccountName')
            })
         },
         warning(code, params) {
            params = params || ''
            this.$Message.warning(this.$t(code) + ' ' + params);
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
      },
      mounted() {
         this.init()
      },
   }
</script>

<style lang="less" scoped>
   @font-color: #344857;
   @color: #12869A;
   @light-color: #D1D1D1;
   @red-color: #EA4853;
   @trade-color: #0a8dff;
   @withdraw-color: #66B76D;
   @delete-color: #949DA6;
   .f16 {
      font-size: 16px;
   }

   .main-color {
      color: @color;
   }

   .borderColor {
      border-color: @red-color !important;
   }

   .bgColor {
      background-color: #f3f3f3 !important;
   }

   .verticalCentering {
      display: flex;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      align-items: center;
   }

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
            .title {
               color: @font-color;
               font-size: 16px;
               margin-bottom: 12px;
            }
            .main {
               font-size: 14px;
               .row-block {
                  position: relative;
                  padding: 50px;
                  background-color: #fff;
                  margin-bottom: 20px;
               }
               .bank {
                  font-size: 16px;
                  font-weight: bold;
               }
               .add-more {
                  font-size: 16px;
                  font-weight: bold;
                  line-height: 24px;
                  .add-icon {
                     width: 24px;
                     margin-right: 20px;
                  }
                  span {
                     cursor: pointer;
                  }
               }
               .number {
                  font-size: 14px;
               }
               .time {
                  line-height: 24px;
                  letter-spacing: 1px;
               }
               .balancesBtn {
                  display: inline-block;
                  height: 34px;
                  line-height: 32px;
                  padding: 0 17px;
                  margin-left: 10px;
                  border: solid 1px #0a8dff;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
               }
               .detail-color {
                  border-color: @color !important;
                  color: @color !important;
               }
               .delete-color {
                  border-color: @delete-color !important;
                  color: @delete-color !important;
               }
               .delete-hover {
                  &:hover {
                     background-color: @delete-color;
                     color: #fff !important;
                  }
               }
               .set-color {
                  border-color: @withdraw-color !important;
                  color: @withdraw-color !important;
               }
               .detail-hover {
                  &:hover {
                     background-color: #12869A;
                     color: #fff !important;
                  }
               }
               .set-hover {
                  &:hover {
                     background-color: #66B76D;
                     color: #fff !important;
                  }
               }
               .default {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 68px;
                  height: 68px;
                  border-width: 34px;
                  border-style: solid;
                  border-color: @color @color transparent transparent;
                  .text {
                     position: absolute;
                     top: -15px;
                     left: -25px;
                     display: inline-block;
                     width: 68px;
                     font-size: 12px;
                     text-align: center;
                     color: #fff;
                     white-space: nowrap;
                     -ms-transform: rotate(45deg); /* IE 9 */
                     -moz-transform: rotate(45deg); /* Firefox */
                     -webkit-transform: rotate(45deg); /* Safari and Chrome */
                     -o-transform: rotate(45deg); /* Opera */
                     transform: rotate(45deg);
                  }
               }
            }
         }
      }
   }

   .alertModal {
      .alert-content {
         padding: 25px 0 18px;
         .information {
            .col-left, .col-right {
               font-size: 14px;
               color: #344857;
            }
            .col-left {
               padding-right: 27px;
            }
            .col-right {
            }
            .accountInfo {
               margin-bottom: 30px;
            }
            .input {
               width: 100%;
               height: 40px;
               line-height: 40px;
               padding: 6px 13px;
               border-radius: 4px;
               background-color: transparent;
               border: solid 1px @light-color;
               &:focus {
                  border-color: @color;
               }
            }
            .help-icon {
               font-size: 18px;
               color: #949DA6;
               cursor: pointer;
            }
            .select {
               &:focus {
                  border-color: @color;
               }
            }
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