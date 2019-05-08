<template>
   <div class="wrapper" id="createApi">
      <div class="container">
         <div class="content">
            <img src="../../assets/images/api/api.png" class="img">
            <h3>{{$t('CreateAPIStarted')}}</h3>
            <p>{{$t('CreateAPIMost1')}} <span class="high-color">{{$t('CreateAPIMost2')}}</span>{{$t('CreateAPINotDisclose')}}
            </p>
            <Button class="btn" size="large" @click="createAPI">{{$t('SendEmailCreateNewKey')}}</Button>
         </div>
      </div>
      <!--未验证邮箱或者手机号和谷歌都没绑定-->
      <no-header-modal className="alert-email" v-model="showEmail" :closable="closable" width="550">
         <div class="alert-content">
            <img src="../../assets/images/api/warning.png" class="img">
            <p class="alert-title" v-if="!isEmail">{{$t('CreateAPIForSecurity1')}}</p>
            <p class="alert-title" v-if="isEmail">{{$t('CreateAPIForSecurity2')}}</p>

            <router-link to="/safeCenter">
               <Button class="sure">{{$t('CreateAPISet')}}</Button>
            </router-link>
         </div>
      </no-header-modal>
      <!--验证邮箱或者手机号和谷歌有绑定-->
      <api-modal className="alert-code" v-model="showCode" :title="$t('CreateAPIAuthentication')" :closable="closable"
                 width="500">
         <div class="alert-content">
            <div v-if="isAll">
               <Tabs v-model="tabName" size="small">
                  <TabPane :label="$t('CreateAPIGoogleAuthentication')" name="googleTab">
                     <input type="text" v-model="google" :maxlength="6" @input="changeValue('google')"
                            ondragenter="return false" class="input-common google-input"
                            :placeholder="$t('CreateAPIGoogleCode')">
                  </TabPane>
                  <TabPane :label="$t('CreateAPISMSAuthentication')" name="phoneTab">
                     <input v-model="tel" disabled="disabled" class="input-common disabled">
                     <div class="phone-box">
                        <input type="text" v-model="phone" class="input-common input-phone" :maxlength="6"
                               :placeholder="$t('CreateAPISMSCode')" @input="changeValue('phone')">
                        <Button @click="send" class="sure" v-show="showSend" :disabled="disabled">
                           {{$t('CreateAPISendSMS')}}
                        </Button>
                        <Button class="sure disabled-color" v-show="!showSend">{{second}}</Button>
                     </div>
                  </TabPane>
               </Tabs>
            </div>
            <div v-else-if="isGoogle">
               <p class="alert-title">{{$t('CreateAPIGoogleCode')}}</p>
               <input type="text" v-model="google" :maxlength="6" @input="changeValue('google')"
                      ondragenter="return false" class="input-common" :placeholder="$t('CreateAPIGoogleCode')">
            </div>
            <div v-else-if="isPhone">
               <p class="alert-title">{{$t('CreateAPISMSCode')}}</p>
               <input v-model="tel" disabled="disabled" class="input-common disabled">
               <div class="phone-box">
                  <input type="text" v-model="phone" class="input-common input-phone"
                         @input="changeValue('phone')" :placeholder="$t('CreateAPISMSCode')">
                  <Button @click="send" class="sure" v-show="showSend" :disabled="disabled">{{$t('CreateAPISendSMS')}}
                  </Button>
                  <Button class="sure disabled-color" v-show="!showSend">{{second}}</Button>
               </div>
            </div>
            <Button @click="create" class="sure">{{$t('CreateAPISubmit')}}</Button>
         </div>
      </api-modal>
   </div>
</template>

<script>
   import apiModal from '@/components/apiModal'
   import noHeaderModal from '@/components/noHeaderModal'
   import {
      onlyInputNumAndPoint
   } from '@/lib/utils.js'
   import Cookies from 'js-cookie'
   import {
      getUserInfo,
      send,
      phoneVerify,
      googleVerify,
   } from '_api/balances.js'

   export default {
      name: "createAPI",
      components: {
         'api-modal': apiModal,
         'no-header-modal': noHeaderModal,
      },
      data() {
         return {
            //show
            showEmail: false,
            showCode: false,
            showSend: true,
            tabName: 'googleTab',
            //modal
            closable: true,
            //flag
            isEmail: false,
            isGoogle: false,
            isPhone: false,
            isAll: false,
            disabled: false,
            //input
            google: '',
            phone: '',
            tel: '',
            second: '',
            createType: '',//创建类型
            errorCode: {
               emptyPhone: 'tsyzSMSRequired',
               emptyGoogle: 'tsyzGoogleRequired',
               phone: 'tsyzIncorrectSMS',
               google: 'tsyzCorrectGoogleCode',
            }
         }
      },
      methods: {
         createAPI() {
            this.getUserInfo()
         },
         getUserInfo() {//获取用户信息
            getUserInfo(this.loginToken).then(res => {
               if (res.email) {
                  this.isEmail = true
               }
               if (res.isBindingGoogle) {
                  this.isGoogle = true
               }
               if (res.phone) {
                  this.tel = res.phone
                  this.isPhone = true
               }
               if (!res.email || (!res.phone && !res.isBindingGoogle)) {
                  this.showEmail = true
               } else {
                  this.showCode = true
                  if (res.phone && res.isBindingGoogle) {
                     this.isAll = true
                  }
               }
            })
         },
         send() {//发送验证码
            // this.disabled = true
            send(this.loginToken, {
                  "codeType": "PHONE",
                  "operateType": "API_APPLY",
               }
            ).then(res => {
               if (res["code"]) {
                  this.error(res["code"])
                  setTimeout(function () {
                     this.disabled = false
                  }, 1000)
               } else {
                  this.getCountDown(res['expiredSeconds'])
                  this.showSend = false
                  this.second = res['expiredSeconds']
                  this.disabled = false
               }
            })
         },
         create() {//创建api 接口
            try {
               if (this.isAll) {
                  if (this.tabName === 'phoneTab') {
                     this.verifyCode('phone', this.phone, this.errorCode.emptyPhone, this.errorCode.phone)
                     this.phoneVerify()
                  } else if (this.tabName === 'googleTab') {
                     this.verifyCode('google', this.google, this.errorCode.emptyGoogle, this.errorCode.google)
                     this.googleVerify()
                  }
               } else if (this.isPhone) {
                  this.verifyCode('phone', this.phone, this.errorCode.emptyPhone, this.errorCode.phone)
                  this.phoneVerify()
               } else if (this.isGoogle) {
                  this.verifyCode('google', this.google, this.errorCode.emptyGoogle, this.errorCode.google)
                  this.googleVerify()
               }
            } catch (error) {
               this.$Message.warning(this.$t(error));
            }
         },
         googleVerify() {
            googleVerify(this.loginToken, {//校验验证码
               "operateType": "API_APPLY",
               "googleCode": this.google,
               "language": localStorage.getItem('countryLanguage'),
            }).then(res => {
               if (res["code"]) {
                  this.error(res["code"]);
               } else {
                  this.$router.push('sendEmail')
               }
            })
         },
         phoneVerify() {
            phoneVerify(this.loginToken, {//校验验证码
               "codeType": "PHONE",
               "operateType": "API_APPLY",
               "phoneCode": this.phone,
               "language": localStorage.getItem('countryLanguage'),
            }).then(res => {
               if (res["code"]) {
                  this.error(res["code"]);
               } else {
                  this.$router.push('sendEmail')
               }
            })
         },
         changeValue(text) {
            this.createType = text
            window.event.target.value = onlyInputNumAndPoint(window.event.target.value, 6)
            this[text] = window.event.target.value
         },
         getCountDown(second) {//倒计时
            let countDown = setInterval(function () {
               this.second = second
               if (second === 0) {
                  this.showSend = true
                  clearInterval(countDown);
               } else {
                  second--;
               }
            }.bind(this), 1000);
         },
         verifyCode(params, value, empty, code) {//try throw 验证码异常
            let regCode = /^\d{6}$/;//提现数量
            if (value.length === 0) {
               throw empty
            }
            if (!regCode.test(value)) {
               throw code
            }
         },
      },
      mounted() {
         this.loginToken = Cookies.get('loginToken')
      }
   }
</script>
<style lang="less">
   .ts {
      transform: translate3d(150px, 0, 0,);
   }
</style>
<style lang="less" scoped>
   @color: #12869A;

   .wrapper {
      padding: 20px 0 40px;
      background-color: #F7F9FA;
      .container {
         width: 1200px;
         min-height: 500px;
         background-color: #fff;
         margin: 0 auto;
         text-align: center;
         padding: 105px 0;
         .content {
            .img {
               width: 102px;
            }
            h3 {
               font-size: 16px;
               color: #344857;
               margin-top: 50px;
               margin-bottom: 14px;
            }
            p {
               color: #949DA6;
               font-size: 14px;
               .high-color {
                  color: @color;
               }
            }
            .btn {
               background-color: @color;
               color: #fff;
               margin-top: 47px;
               height: 40px;
               padding: 0 26px;
            }
         }
      }
   }

   .alert-content {
      padding: 20px 64px 40px;
      text-align: center;
      .img {
         width: 46px;
         margin-bottom: 40px;
      }
      .alert-title {
         font-size: 14px;
         color: #344857;
         margin-bottom: 20px;
      }
      .input-common {
         width: 100%;
         height: 42px;
         line-height: 42px;
         font-size: 14px;
         padding-left: 11px;
         background-color: transparent;
         border: 1px solid #E7EAED;
      }
      .phone-box {
         margin-top: 20px;
         display: flex;
         justify-content: space-between;
         .input-common {
            width: 180px;
         }
         .sure {
            width: 108px;
            margin-top: 0;

         }
      }
      .google-input {
         margin-top: 40px;
      }
      .sure {
         width: 100%;
         height: 40px;
         margin-top: 30px;
         background-color: @color;
         font-size: 14px;
         color: #fff;
      }
      .disabled {
         background-color: #E7EAED;
      }
      .disabled-color {
         background-color: #E7EAED;
         cursor: default;
         &:hover {
            border: none;
         }
      }
   }

   .alert-email {
      .alert-content {
         padding: 20px 10px 40px;
         .sure {
            width: auto;
            padding: 0 38px;
         }
      }
   }
</style>