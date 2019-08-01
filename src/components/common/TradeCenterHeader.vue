<template>
<div>
   <div class="tradeHeaderbox">
      <ul class="left">
         <li class="logo">
            <router-link to='/home'><img src="../../assets/images/logo/logo.png" width="40px" height="28px" alt>
            </router-link>
         </li>
         <li class="tradecenter">
            <router-link :to="{path:'/exchange',query: {site: 'B',symbol:'BTCUSDT'}}">{{$t('headerexchangecenter')}}
               <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
            </router-link>
            <ul class="tradeList">
               <li>
                  <router-link :to="{path:'/exchange',query: {site: 'B'}}"><i class="icon btcIcon"> </i><span>{{$t('headerblockexchange')}}</span>
                  </router-link>
               </li>
               <!-- <li>
                  <router-link :to="{path:'/exchange',query: {site: 'S'}}"><i class="icon klineIcon"></i> <span>{{$t('headerstockexchange')}}</span>
                  </router-link>
               </li> -->
               <!-- <li>
                  <router-link :to="{path:'/exchange',query: {site: 'F'}}"><i class="icon exchangeIcon"></i> <span>{{$t('headerfranceexchange')}}</span>
                  </router-link>
               </li> -->
               <li>
                  <router-link :to="{path:'/exchange',query: {site: 'C'}}"><i class="icon logoIcon"></i> <span>{{$t('headercoustomerchain')}}</span>
                  </router-link>
               </li>
               <!-- <li><router-link :to="{path:'/Bhome',query: {site: 'B'}}"><i class="icon personIcon"></i> <span>个人交易</span></router-link></li>
               <li><router-link :to="{path:'/Bhome',query: {site: 'B'}}"><i class="icon shopIcon"></i> <span>本地商业交易</span></router-link></li> -->
            </ul>
         </li>
         <!-- <li>
            <a href="http://otc.55.com">OTC</a>
         </li> -->
      </ul>
      <div class="rightBox">
         <!-- 登录前 -->
         <ul class="right" v-if="!isLogin">
            <li>
               <a href class="login">
                  <router-link to="/login">{{$t('HomeSignin')}}</router-link>
               </a>
            </li>
            <li>
               <router-link class="login register" to="/register">{{$t('HomeSignup')}}</router-link>
            </li>
         </ul>
         <ul class="right" v-else>
            <li class="balance">
               <router-link to="/order" class="order">{{$t('homeOrder')}}</router-link>
            </li>
            <!-- 资产 -->
            <li class="currency balance">
               <!--{{$t('homeBalances')}}-->
               <router-link to='/balances'>{{$t('homeBalances')}}</router-link>
               <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
               <ul class="dropList currencyList">
                  <!-- 资产 -->
                  <li>
                     <router-link to='/balances'>{{$t('zcDeposit')}} & {{$t('zcWithdrawal')}}</router-link>
                  </li>
                  <li>
                     <router-link to="/transaction_history">{{$t('tbdhTransactionHistory')}}</router-link>
                  </li>
               </ul>
            </li>
            <li class="language balance">
               <Icon type="md-person" size="16"/>
               <ul class="dropList personNav">
                  <!-- 安全中心 -->
                  <li>
                     <router-link to="/safeCenter">{{$t('tbdhAccountSecurity')}}</router-link>
                  </li>
                  <!-- <li class="fee">
                    <div class="fee_title">
                        <span>手续费减免：</span>
                        <span v-if="FFDiscount" class="openText">已开启</span>
                        <span v-else class="closeText">未开启</span>
                    </div>
                    <router-link class="gotoSet" to='/safeCenter' v-if="FFDiscount">当前折扣：{{discountPercent}}</router-link>
                    <router-link class="gotoSet" v-else  to='/safeCenter'>开启减免</router-link>
                  </li> -->
                  <li @click="verfiy">
                     {{$t('tbdhIDVerification')}}
                  </li>
                  <li @click="L2verify">
                    {{$t('kyc2')}}
                  </li>
                  <!-- <li>
                     <router-link to='/invite'>{{$t('invitePeople')}}</router-link>
                  </li> -->
                  <li @click="quitFun">{{$t('tbdhLogout')}}</li>
               </ul>
            </li>
         </ul>
         <ul class="languageBox">
            <li class="currency aaa" @click="openSetting">{{$t('headerSetting')}}</li>
            <li class="language">{{countryLanguage}}
               <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
               <ul class="dropList chooselanguage" @click="changeLangage">
                  <li data-value="en">English</li>
                  <li data-value="zh-CN">简体中文</li>
                  <li data-value="ko">한국어</li>
                  <li data-value="vi">Tiếng Việt</li>
                  <li data-value="ru-ru">Русский</li>
                  <li data-value="de-de">Deutsch</li>
                  <li data-value="fr-fr">Français</li>
                  <li data-value="es-es">Español</li>
                  <li data-value="tr-tr">Türkiye</li>
                  <li data-value="pt-br">Português-BR</li>
                  <li data-value="pt-pt">Português-PT</li>
                  <li data-value="th-th">ไทย</li>
                  <li data-value="id-id">Bahasa Indonesia</li>
               </ul>
            </li>
         </ul>

      </div>
      <Modal v-model="modal1" width="442">
         <p slot="header" style="text-align:center">
            <span>{{$t('headerSetting')}}</span>
         </p>
         <div style="padding-left:105px;">{{$t('currency')}}:</div>
         <div style="text-align:center;margin-top:8px;">
            <Select v-model="legalTenderSelect" style="width:200px" on-change="changeCurrency">
               <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}
               </Option>
            </Select>
         </div>
         <div slot="footer">
            <Button type="primary" size="default" v-if="!currencyBtnloading" @click="submitSetting">{{$t('confrim')}}
            </Button>
            <Button type="primary" size="default" v-else loading @click="submitSetting"></Button>
         </div>
      </Modal>
      <Modal
        class-name="lv_modal"
        v-model="modal2"
        @on-ok="completeID"
        >
        <p slot="header">
           <span>Notice</span>
        </p>
        <p class="content">
            Please complete ID Verification before continuing.
        </p>
        <p slot="footer">
           <Button>complete ID Verification</Button>
           <em @click="cancelModal">Next time</em>
        </p>
    </Modal>
   </div>
   <!-- IP拦截提示 -->
    <!-- <IP/> -->
</div>
</template>

<script>
   import {getLegalTenderValue} from '_api/header.js'
   import {getHeaderTokenApi,postHeaderTokenBodyApi} from '_api/axios.js';
   import {relatNameVerify,amlqueryState,logout} from '../../../api/urls.js'
   import {Exchange} from '@/interface/exchange.js'
   import Cookies from 'js-cookie'
   import IP from './IPTIPS.vue'
   import { clearLocalStorage } from '@/config'
   export default {
      data() {
         return {
            isLogin: true,
            modal1: false,
            modal2:false,
            countryLanguage: '',
            currencyBtnloading: false,
            legalTenderSelect: localStorage.getItem('countryLanguage')=='zh'||localStorage.getItem('countryLanguage')=='zh-CN'?'CNY':'USD',
            currentCurrency: {name: 'USD', rate: 1},
            
            currencyList: [
               {value: 'USD', label: '$ USD', shortName: '$'},
               {value: 'CNY', label: '¥ CNY', shortName: '¥'},
               {value: 'HKD', label: 'HK$ HKD', shortName: 'HK$'},
               {value: 'MOP', label: 'MOP$ MOP', shortName: 'MOP$'},//澳门元
               {value: 'KRW', label: '₩ KRW', shortName: '₩'},//韩元
               {value: 'TWD', label: 'NT$ TWD', shortName: 'NT$'},//新台币
               {value: 'PHP', label: '₱ PHP', shortName: '₱'},//菲律宾比索
               {value: 'SGD', label: 'S$ SGD', shortName: 'S$'},//新加坡
               {value: 'CHF', label: 'CHF', shortName: 'CHF'},//瑞士法郎
               {value: 'THB', label: '฿ THB', shortName: '฿ '},//泰国铢
               {value: 'NZD', label: 'NZ$ NZD', shortName: 'NZ$'},//新西兰元
               {value: 'RUB', label: 'RUB', shortName: 'RUB'},//卢布
               {value: 'INR', label: 'INR', shortName: 'INR'},//印度卢比
               {value: 'IDR', label: 'Rp IDR', shortName: 'Rp'},//印尼盾
               {value: 'GBP', label: '￡ GBP', shortName: '￡'},//英镑
               {value: 'CAD', label: 'C$ CAD', shortName: 'C$'},//加拿大
               {value: 'ZAR', label: 'ZAR', shortName: '$'},//南非兰特
               {value: 'SAR', label: 'SAR', shortName: 'SAR'},//沙特里亚尔
               {value: 'BRL', label: 'R$ BRL', shortName: 'R$'},//巴西里亚尔
               {value: 'TRY', label: 'TRY', shortName: 'TRY'},//土耳其里拉
               {value: 'EUR', label: '€ EUR', shortName: '€'},//欧元
               {value: 'JPY', label: 'J￥ JPY', shortName: 'J￥'},//日元,
               ],
            FFDiscount: null,//是否开启FF折扣
            discountPercent: '',//FF 折扣系数
            amlStatus:'',
         }
      },
       components: {
         IP
      },
      methods: {
         openSetting() {
            this.modal1 = true;
         },
         changeLangage(e) {
            let language = e.target.getAttribute('data-value');
            if (language == 'en' || language == 'vi' || language == 'ko' || language == 'zh-CN') {
               this.language = language
            } else {
               this.language = 'en'
            }
            this.$i18n.locale = language;
            window.localStorage.setItem('countryLanguage', language)
            if (language == 'en') {
               this.countryLanguage = 'English';
            } else if (language == 'zh-CN') {
               this.countryLanguage = '简体中文';
            } else if (language == 'ko') {
               this.countryLanguage = '한국어';
            } else if (language == 'vi') {
               this.countryLanguage = "Tiếng Việt";
            } else if (language == 'ru-ru') {
               this.countryLanguage = "Русский";
            } else if (language == 'de-de') {
               this.countryLanguage = "Deutsch";
            } else if (language == 'fr-fr') {
               this.countryLanguage = "Français";
            } else if (language == 'es-es') {
               this.countryLanguage = "Español";
            } else if (language == 'tr-tr') {
               this.countryLanguage = "Türkiye";
            } else if (language == 'pt-br') {
               this.countryLanguage = "Português-BR";
            } else if (language == 'pt-pt') {
               this.countryLanguage = "Português-PT";
            } else if (language == 'th-th') {
               this.countryLanguage = "ไทย";
            }else if(language == 'id-id'){
               this.countryLanguage = "Bahasa Indonesia";
            }
            this.$store.commit('changeCurentLange', language);
         },
         submitSetting() {
            this.getLegalTenderData()
         },
         changeCurrency() {
            this.currencyBtnloading = false
         },
            getLegalTenderData() {
            this.currencyBtnloading = true
               let param = {}
               param.fromCurrency = 'USD'
               let lang = localStorage.getItem('countryLanguage');
               if(lang == 'zh-CN'||lang == 'zh'){
                  param.toCurrency = this.legalTenderSelect?this.legalTenderSelect:'CNY';
               }else{
                  param.toCurrency = this.legalTenderSelect?this.legalTenderSelect:'USD';
               }
               getLegalTenderValue(param).then(result => {
                  this.currencyList.forEach((v, i) => {
                  if (v.value == result.toCurrency) {
                  this.short = v.shortName;
               }
               })
               let info = {name: result.toCurrency, rate: result.rate, shortcut: this.short}
               localStorage.setItem('currentCurrency', JSON.stringify(info))
               //目标页面监听store中的数据变动
               this.$store.commit('changeCurrencyState', result.toCurrency);
               this.modal1 = false
               setInterval(() => {
                  this.currencyBtnloading = false
               }, 500)
               // window.location.reload()
               })
            },
            verfiy() {
                let loginToken = Cookies.get('loginToken');
                getHeaderTokenApi(relatNameVerify, {}, loginToken).then((res) => {
                let status = res.data.checkStatus;
                let code = res.data.code;
                if(code=='10013'){
                  this.$Notice.error({
                    title: this.$t(196682),
                  });
                  this.$router.push('/login')
                  return
               }
               if (status == 'NOT_SET') {
                  this.$router.push('/kyc')
               } else {
                  this.$router.push('/identityResult')
               }

            })
         },
         L2verify(){
             this.L2queryState(Cookies.get('loginToken'))
         },
        L2queryState(token){
                getHeaderTokenApi(amlqueryState,'',token).then((res)=>{
                    if(res.data.result){
                       this.amlStatus = res.data.result;
                        if(this.amlStatus=='NOHAVE'){
                              this.$router.push('amlKyc')
                        }else{
                              this.$router.push('amlkycResult')
                           }
                    }else if(res.data.code){
                        if(res.data.code =='10013'){
                            this.$router.push('login')
                        }
                        this.$Notice.error({
                                title: this.$t(res.data.code),
                                desc:this.$t(res.data.code)
                         });
                    }
                })
         },
         completeID(){

         },
         cancelModal(){
            this.modal2 = false;
         },
         quitFun() {
               postHeaderTokenBodyApi(logout,Cookies.get('loginToken'),{}).then((res)=>{
                    console.log(res)
                })
            clearLocalStorage()
            this.$store.commit('changeLoingStatus', false);
            this.$router.push('/home');
         },
         getAccountInfoData() {
            //查询是否开启手续费折扣
            this.exchange.getAccountInfo(data => {
               if (data.commissionTemplateId == "FF_DEDUCTIBLE") {
                  this.FFDiscount = true
               } else {
                  this.FFDiscount = false
               }
               if (data.commissionTemplateContext.COMMISSION_FF_DEDUCTIBLE_RATE) {
                  this.discountPercent = Number(data.commissionTemplateContext.COMMISSION_FF_DEDUCTIBLE_RATE) * 100 + "%"
               } else {
                  this.discountPercent = ''
               }
            })
         }
      },
      computed: {
         languageChange() {
            return this.$store.state.app.countryLanguage;//  返回全局state的状态值
         },
         loginStatus() {
            return this.$store.state.app.isLogin;
         },
         headerColor() {
            return this.$store.state.app.backgroundHeader
         }
      },
      watch: {
         languageChange(val, oldVal) {//监听全局语言的状态
         },
         loginStatus(val, oldVal) {
            if (val) {
               this.isLogin = true;
            } else {
               this.isLogin = false;
            }
         },
         headerColor() {
            this.styleObject = {
               background: this.$store.state.app.backgroundHeader
            }
         }
      },
      mounted() {
         // this.$i18n.locale = window.localStorage.getItem('countryLanguage') || 'en-US';
         //设置Header颜色

         this.styleObject = {background: this.$store.state.app.backgroundHeader}
         let language = window.localStorage.getItem('countryLanguage') || 'en';
         let currency = localStorage.getItem('currentCurrency')
         if (language === 'zh-CN') {
            this.countryLanguage = '简体中文';
         } else if (language === 'en') {
            this.countryLanguage = 'English';
         } else if (language == 'ko') {
            this.countryLanguage = '한국어';
         } else if (language == 'vi') {
            this.countryLanguage = 'Tiếng Việt';
         } else if (language == 'ru-ru') {
            this.countryLanguage = "Русский";
         } else if (language == 'de-de') {
            this.countryLanguage = "Deutsch";
         } else if (language == 'fr-fr') {
            this.countryLanguage = "Français";
         } else if (language == 'es-es') {
            this.countryLanguage = "Español";
         } else if (language == 'tr-tr') {
            this.countryLanguage = "Türkiye";
         } else if (language == 'pt-br') {
            this.countryLanguage = "Português-BR";
         } else if (language == 'pt-pt') {
            this.countryLanguage = "Português-PT";
         } else if (language == 'th-th') {
            this.countryLanguage = "ไทย";
         }else if(language == 'id-id'){
               this.countryLanguage = "Bahasa Indonesia";
         }
         // this.getLegalTenderData()
         //默认法币估值为 USD
         if (!currency) {
            localStorage.setItem('currentCurrency', JSON.stringify(this.currentCurrency))
         } else {
            let data = JSON.parse(currency)
            this.legalTenderSelect = data.name
         }
         //判断是否登录有效
         let isLogin = this.$store.state.app.isLogin;
         if (isLogin) {
            this.isLogin = true
            let loginToken = Cookies.get('loginToken');
            var ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            // //登录以后查询资产 挂单 成交记录
            if (loginToken) {
               this.exchange.ssoProvider.getSsoToken = function (fn) {
                  fn(loginToken);
               }.bind(this);
               //FF收费折扣
               // this.getAccountInfoData();
            }
         } else {
            this.isLogin = false
         }

      },
      destroyed() {
         this.exchange = null
      }
   };
</script>
<style lang="less">
   .lv_modal{
      .ivu-modal{
         height: 220px;
         .ivu-modal-content{
            height: 100%;
         }
         .content{
            margin-top: 18px;
         }
      }
      .ivu-modal-footer{
         text-align: left;
         margin-top: 30px;
          .ivu-btn{
               background: #12869A;
               color:#FFFFFF;
            }
            em{
               color: #12869A;
               margin-left:30px;
               cursor: pointer;
            }
      }
     
   }
</style>

<style scoped lang="less">
   .tradeHeaderbox {
      ul{
         margin-bottom: 0 !important;
      }
      height: 50px;
      width: 100%;
      min-width: 1200px;
      padding: 0 20px;
      background: #15232c;
      display: flex;
      justify-content: space-between;
      a {
         color: #879AA5;
         font-size: 14px;
         &:hover {
            color: #fff;
         }
      }
      .left {
         display: flex;
         align-items: center;
         li {
            margin-right: 39px;
            height: 50px;
            line-height: 50px;
         }
         .tradecenter {
            width: 90px;
            text-align: center;
            .triangle {
               -webkit-transition: -webkit-transform .2s ease-in;
               -webkit-backface-visibility: hidden;
               -moz-transition: -moz-transform .2s ease-in;
               -o-transition: -o-transform .2s ease-in;
               transition: transform .2s ease-in;
            }
            &:hover {
               background: #121F28;
               a{
                  color: #fff;
               }
               .triangle {
                  -moz-transform: rotate(180deg);
                  -moz-transform-origin: 50% 45%;
                  -webkit-transform: rotate(180deg);
                  -webkit-transform-origin: 50% 45%;
                  -o-transform: rotate(180deg);
                  -o-transform-origin: 50% 45%;
                  transform: rotate(180deg);
                  transform-origin: 50% 45%;
               }
               .tradeList {
                  max-height: 500px;
                  &::-webkit-scrollbar {
                     display: none
                  }
                  li{
                     a{
                        color: #879AA5;
                     }
                  }
                  // overflow: auto;
               }
            }
            position: relative;
         }
         .tradeList {
            position: absolute;
            background: #121F28;
            max-height: 0px;
            overflow: hidden;
            transition: max-height .3s ease-in-out;
            top: 50px;
            left: 0px;
            z-index: 1000;
            li {
               width: 170px;
               height: 35px;
               line-height: 35px;
               padding-left: 17px;
               padding-right: 0px;
               margin: 0;
               span {
                  padding-left: 17px;
               }
               a {
                  display: flex;
                  align-items: center;
                  font-size: 12px;
               }
               &:hover {
                  background: #0D1820;
                  a {
                     color: rgba(255, 255, 255, 1) !important;
                  }
                  .icon {
                     opacity: 1;
                  }
               }
               .icon {
                  display: inline-block;
                  width: 13px;
                  height: 11px;
               }
               .btcIcon {
                  background: url('../../assets/images/common/header/btc_active.png') center center;
                  background-size: 13px 13px;
                  opacity: 0.5;
               }
               .klineIcon {
                  background: url('../../assets/images/common/header/kline_active.png') center center;
                  background-size: 13px 11px;
                  opacity: 0.5;
               }
               .exchangeIcon {
                  background: url('../../assets/images/common/header/exchange_active.png') center center;
                  background-size: 13px 11px;
                  opacity: 0.5;
               }
               .logoIcon {
                  background: url('../../assets/images/common/header/logo_active.png') center center;
                  background-size: 13px 11px;
                  opacity: 0.5;
               }
               .personIcon {
                  background: url('../../assets/images/common/header/person_active.png') center center;
                  background-size: 13px 11px;
                  opacity: 0.5;
               }
               .shopIcon {
                  background: url('../../assets/images/common/header/shop_active.png') center center;
                  background-size: 13px 11px;
                  opacity: 0.5;
               }
            }
         }
      }
      //   货币选择 语言
      .rightBox {
         display: flex;
         align-items: center;
         .languageBox {
            display: flex;
            align-items: center;
            .currency {
               border-left: 1px solid #27343C;
               padding: 0 29px;
               margin-left: 29px;
            }
            .currency, .language {
               color:#879AA5;
               position: relative;
               cursor: pointer;
               min-width: 80px;
               font-size:14px;
               &:hover {
                  color: #fff;
                  ul {
                     // display: block;
                     max-height: 800px;
                     li {
                        a {
                           color: #fff;
                        }
                     }
                  }
                  .triangle {
                     -moz-transform: rotate(180deg);
                     -moz-transform-origin: 50% 45%;
                     -webkit-transform: rotate(180deg);
                     -webkit-transform-origin: 50% 45%;
                     -o-transform: rotate(180deg);
                     -o-transform-origin: 50% 45%;
                     transform: rotate(180deg);
                     transform-origin: 50% 45%;
                  }
               }
               .triangle {
                  -webkit-transition: -webkit-transform .2s ease-in;
                  -webkit-backface-visibility: hidden;
                  -moz-transition: -moz-transform .2s ease-in;
                  -o-transition: -o-transform .2s ease-in;
                  transition: transform .2s ease-in;
               }
            }
            .dropList {
               &::-webkit-scrollbar {
                  display: none
               }
               position: absolute;
               top: 35px;
               right: 0;
               z-index: 1100;
               max-height: 0px;
               overflow: hidden;
               transition: max-height .3s ease-in-out;
               background: #121F28;
               li {
                  cursor: pointer;
                  width: 130px;
                  height: 35px;
                  line-height: 35px;
                  text-align: center !important;
                  border-right: none;
                  padding: 0;
                  color:#879AA5;
                  font-size:12px;
                  a {
                     display: block;
                     width: 100%;
                     height: 100%;
                  }
                  &:hover {
                     background: #0D1820;
                     color: #fff;
                  }
               }
            }
            .chooselanguage {
               width: 260px;
               display: flex;
               flex-wrap: wrap;
            }
         }
      }
      .right {
         display: flex;
         align-items: center;
         .login {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
            min-width: 60px;
            height: 29px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: 500;
            &:hover {
               color: #fff;

            }
         }
         .register {
            // border: 1px solid rgba(255, 255, 255, 0.5);
            background: #12869a;
            color: #fff;
            border-radius: 2px;
            &:hover {
               border: none;
               background: #04798b;
               a {
                  color: #fff;
               }
            }
         }
         .balance {
            height: 100%;
            margin-left: 30px;
            line-height: 50px;
            a {
               color: rgba(255, 255, 255, 0.5)
            }
            &:hover {
               .order {
                  color: #fff;
               }
            }
            .currencyList {
               li {
                  min-width: 180px;
               }
            }
         }
         .currency,
         .language {
            color: rgba(255, 255, 255, 0.5);
            position: relative;
            &:hover {
               color: #fff;
               ul {
                  //   display: block;
                  overflow: auto;
                  max-height: 300px;
               }
               .triangle {
                  -moz-transform: rotate(180deg);
                  -moz-transform-origin: 50% 45%;
                  -webkit-transform: rotate(180deg);
                  -webkit-transform-origin: 50% 45%;
                  -o-transform: rotate(180deg);
                  -o-transform-origin: 50% 45%;
                  transform: rotate(180deg);
                  transform-origin: 50% 45%;
               }
            }
            .triangle {
               -webkit-transition: -webkit-transform 0.2s ease-in;
               -webkit-backface-visibility: hidden;
               -moz-transition: -moz-transform 0.2s ease-in;
               -o-transition: -o-transform 0.2s ease-in;
               transition: transform 0.2s ease-in;
            }
         }
         .dropList {
            &::-webkit-scrollbar {
               display: none
            }
            position: absolute;
            top: 50px;
            right: 0;
            max-height: 0px;
            overflow: hidden;
            transition: max-height .3s ease-in-out;
            //   display: none;
            z-index: 1000;
            background: #121f28;
            li {
               cursor: pointer;
               min-width: 130px;
               height: 35px;
               line-height: 35px;
               text-align: center;
               border-right: none;
               padding: 0;
               color: rgba(255, 255, 255, 0.5);
               a {
                  color: rgba(255, 255, 255, 0.5);
                  display: block;
                  width: 100%;
                  height: 100%;
               }
               &:hover {
                  background: #0d1820;
                  a {
                     color: #fff;
                  }
                  color: #fff;
               }
            }
         }
         .personNav {
            .fee {
               height: 89px;
               width: 100%;
               border-top: 1px solid #202E36;
               border-bottom: 1px solid #202E36;
               .fee_title {
                  padding-right: 20px;
                  display: flex;
                  justify-content: space-between;
                  .openText {
                     color: #E4A316;
                  }
                  .closeText {
                     color: #1B8A98;
                  }
               }
               .gotoSet {
                  width: 150px;
                  height: 36px;
                  border: 1px solid rgba(98, 119, 132, 1);
                  text-align: center;
                  line-height: 36px;
                  color: #96B1C3;
                  &:hover {
                     border: 1px solid #6892AE;
                     color: #6892AE;
                  }
               }
            }
            li {
               // 手续费减免
               // width: 190px;
               // padding-left:20px;
               // text-align: left;
               // a{
               //     text-align: left;
               // }
               width: 130px;
               // padding-left:20px;
               text-align: center;
               a {
                  text-align: center;
               }
            }

         }
      }
   }
</style>