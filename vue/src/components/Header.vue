<template>
   <div class="headerbox">
      <header>
         <div class="header_l">
            <!-- <router-link class="logo" to='/home'><img src="../assets/images/header/logo_new.svg"></router-link> -->
            <!-- <a href="../exchange/dist/index.html#/home" class="logo"><img src="../assets/images/header/logo_new.svg"></a> -->
            <ul class="nav assets-header ">
               <li>
                  <router-link to='/Bhome'>{{$t('HomeHomePage')}}</router-link>
               </li>
               <li>
                  <router-link to='/exchange'>{{$t('HomeTokenExchange')}}</router-link>
               </li>
               <!-- <li><a href="../../../vote/supervision_list.html">{{$t('HomeSupervision')}}</a></li> -->
               <li><a href="https://usdd.55.com/" target="_blank">USDD</a></li>
               <li><a :href="annouceUrl" target="_blank">{{$t('HomeAnnouncements')}}</a></li>

               <!-- <li><a :href="helpUrl" target="_blank">{{$t('HomeHelp')}}</a></li> -->

               <!-- <li class="mining  arrow-down">
                   <a class="" href="javascript:;">{{$t('HeaderMining')}}</a>
                    <div class="mining_content">
                        <ul>
                            <li><router-link to="/buyMining">{{$t('HeaderBuying')}}</router-link></li>
                            <li><router-link to="/superMiner">{{$t('HeaderSuperMiner')}}</router-link></li>
                        </ul>
                    </div>
               </li> -->
               <!-- 交易挖矿，不要删除 -->

               <!-- <li><a href="../../../pdf/55whitepaper_zh.pdf">{{$t('HomeWhitepaper')}}</a></li> -->
            </ul>
         </div>
         <div class="header_r">
            <!-- 登录前 -->
            <dl class="title-nav assets-header" v-if="!isLogin">
               <!-- APP下载 -->
               <!-- <dt class="arrow-down download_app">
                       <a href="javascript:;">
                           <img  class="assets-img" src="../assets/images/header/phoneApp.svg" alt="">
                           <a href="javascript:;">App</a>
                           <div class="download">
                               <p>iOS&Android</p>
                               <img src="../assets/images/header/QR.png" alt="">
                               <p>{{$t('HomeScanDownload')}}</p>
                           </div>
                       </a>
               </dt> -->
               <!-- <dt class="arrow-down support">
                 <div class="support_help">
                     <span>{{$t('HomeAnnouncements')}}</span>/<span>{{$t('HomeHelp')}}</span>
                     <div class="support_content">
                         <p><a :href="annouceUrl" target="_blank">{{$t('HomeAnnouncements')}}</a></p>
                         <p><a :href="helpUrl" target="_blank">{{$t('HomeHelp')}}</a></p>
                     </div>
                 </div>
             </dt> -->
               <dt>
                  <router-link to='/login'>{{$t('HomeSignin')}}</router-link>
               </dt>
               <dt>
                  <router-link class="loginRouter" to='/register'>{{$t('HomeSignup')}}</router-link>
               </dt>

            </dl>
            <!-- 登录后 -->
            <dl class="title-nav assets-header loginAfter" v-else>
               <!-- <dt class="arrow-down download_app">
                   <a href="javascript:;">
                        <img class="assets-img" src="../assets/images/header/phoneApp.svg" alt="">
                       <a href="javascript:;">App</a>
                       <div class="download">
                           <p>ios&Android</p>
                           <img src="../assets/images/header/QR.png" alt="">
                           <p>{{$t('HomeScanDownload')}}</p>
                       </div>
                   </a>


               </dt> -->
               <!-- <dt class="arrow-down support">
                  <div class="support_help">
                      <span>{{$t('HomeAnnouncements')}}</span>/<span>{{$t('HomeHelp')}}</span>
                      <div class="support_content">
                          <p><a :href="annouceUrl" target="_blank">{{$t('HomeAnnouncements')}}</a></p>
                          <p><a :href="helpUrl" target="_blank">{{$t('HomeHelp')}}</a></p>
                      </div>
                  </div>
              </dt> -->
               <dt id="nav7" class="order">
                  <router-link to='/order'>{{$t('homeOrder')}}</router-link>
               </dt>
               <dt id="nav8" class="balances">
                  <em name='tbdhBalancesF'>{{$t('tbdhBalancesF')}}</em>
                  <div class="assets-header-box assets-header-box-balance">
                     <ul class="assets-list">
                        <li>
                           <router-link to='/balances'>{{$t('homeBalances')}}</router-link>
                        </li>
                        <li>
                           <router-link to='/transaction_history'>{{$t('tbdhTransactionHistory')}}</router-link>
                        </li>
                     </ul>
                  </div>
               </dt>

               <dt class="user">
                  <img src="../assets/images/header/user.svg" class="assets-img">&nbsp;
                  <div class="assets-header-box assets-header-box-user">
                     <ul class="assets-list">
                        <li>
                           <a href="javascript:;">
                              <!-- <img src="../assets/images/header/safety.svg" class="assets-item-img"> -->
                              <!-- <a href="../../../securityCenter/securityCenter.html" name="tbdhAccountSecurity">{{$t('tbdhAccountSecurity')}}</a> -->
                              <router-link to='./safeCenter'>{{$t('tbdhAccountSecurity')}}</router-link>
                           </a>
                        </li>
                        <li @click="verfiy" class="idVertication">
                           <a href="javascript:;">
                              <!-- <img src="../assets/images/header/certification.svg" class="assets-item-img"> -->
                              <a href="javascript:;" name="tbdhIDVerification">{{$t('tbdhIDVerification')}}</a>
                           </a>
                        </li>
                        <li>
                           <a href="javascript:;">
                              <!-- <img name="invitePeopleimg" src="../assets/images/header/invite.svg" class="assets-item-img"> -->
                              <a href="../../../invitation/invitationCode.html" name="invitePeople">{{$t('invitePeople')}}</a>
                           </a>
                        </li>
                        <li class="loginOut">
                           <a href="javascript:;">
                              <!-- <img src="../assets/images/header/shutdown.svg" class="assets-item-img"> -->
                              <a @click="quitFun" href="javascript:;" name='tbdhLogout'> {{$t('tbdhLogout')}} </a>
                           </a>
                        </li>
                     </ul>
                  </div>
               </dt>
            </dl>
            <!-- 选择语言 -->
            <!-- <dl>
                <dt class="language">
                    <label name="languagesAfter">{{countryLanguage}}</label>
                    <div class="language-box">
                        <ul class="language-style" @click="languageChange">
                            <li data-value="en" class="rightChinese_sec change_lang_item reload">English</li>
                            <li data-value="zh-CN" class="rightChinese_sec change_lang_item reload">简体中文</li>
                        </ul>
                    </div>
                </dt>
            </dl> -->
            <dl>
               <dt class="language">
                  <a @click="openSetting">{{$t('headerSetting')}}</a>
               </dt>
               <dt class="language">
                  <label name="languagesAfter">
                     <img ref="nationFlag" :src="imgSrc" alt="">
                  </label>
                  <div class="language-box new_language_box">
                     <ul class="language-style" @click="languageChange">
                        <li data-value="en" class="rightChinese_sec change_lang_item reload">
                           <!-- <img src="../assets/images/header/English.svg" alt=""> -->
                           English
                        </li>
                        <li data-value="ko" class="rightChinese_sec change_lang_item reload">
                           <!-- <img src="../assets/images/header/China.svg" alt=""> -->
                           한국어
                        </li>
                        <li data-value="vi" class="rightChinese_sec change_lang_item reload">
                           <!-- <img src="../assets/images/header/China.svg" alt=""> -->
                           Tiếng Việt
                        </li>
                        <li data-value="zh-CN" class="rightChinese_sec change_lang_item reload">
                           <!-- <img src="../assets/images/header/China.svg" alt=""> -->
                           简体中文
                        </li>

                     </ul>
                  </div>
               </dt>
            </dl>
            <Modal v-model="modal1" width="442">
               <p slot="header" style="text-align:center">
                  <span>{{$t('headerSetting')}}</span>
               </p>
               <div style="padding-left:105px;">{{$t('currency')}}:</div>
               <div style="text-align:center;margin-top:8px;">
                  <Select v-model="legalTenderSelect" style="width:200px">
                     <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}
                     </Option>
                  </Select>
               </div>
               <div slot="footer">
                  <Button type="primary" size="default" @click="submitSetting">{{$t('confrim')}}</Button>
               </div>
            </Modal>
         </div>
      </header>
   </div>
</template>

<script>
   import Vue from 'vue'
   import Cookies from 'js-cookie'
   import China from '../assets/images/header/China.svg';
   import us from '../assets/images/header/English.svg'
   import ko from "../assets/images/header/ko.svg"
   import vi from "../assets/images/header/Vietnam.svg"
   import {relatNameVerify} from '../../api/urls.js'
   import {getLegalTenderValue} from '_api/header.js'
   import {getHeaderTokenApi} from '../../api/axios.js';

   export default {
      data() {
         return {
            isLogin: false,
            countryLanguage: '简体中文',
            imgSrc: '',
            annouceUrl: '',
            helpUrl: '',
            modal1: false,
            legalTenderSelect: '',
            currentCurrency: {name: 'USD', rate: 1},
            currencyList: [
               {value: 'USD', label: '$ USD'},
               {value: 'CNY', label: '¥ CNY'},
               {value: 'HKD', label: 'HK$ HKD'},
               {value: 'MOP', label: 'MOP$ MOP'},//澳门元
               {value: 'KRW', label: '₩ KRW'},//韩元
               {value: 'TWD', label: 'NT$ TWD'},//新台币
               {value: 'PHP', label: '₱ PHP'},//菲律宾比索
               {value: 'SGD', label: 'S$ SGD'},//新加坡
               {value: 'CHF', label: 'CHF'},//瑞士法郎
               {value: 'THB', label: '฿ THB'},//泰国铢
               {value: 'NZD', label: 'NZ$ NZD'},//新西兰元
               {value: 'RUB', label: 'RUB'},//卢布
               {value: 'INR', label: 'INR'},//印度卢比
               {value: 'IDR', label: 'Rp IDR'},//印尼盾
               {value: 'GBP', label: '￡ GBP'},//英镑
               {value: 'CAD', label: 'C$ CAD'},//加拿大
               {value: 'ZAR', label: 'ZAR'},//南非兰特
               {value: 'SAR', label: 'SAR'},//沙特里亚尔
               {value: 'BRL', label: 'R$ BRL'},//巴西里亚尔
               {value: 'TRY', label: 'TRY'},//土耳其里拉
               {value: 'EUR', label: '€ EUR'},//欧元
               {value: 'JPY', label: 'J￥ JPY'},//日元,
            ]
         }
      },
      methods: {
         languageChange(e) {
            let language = e.target.getAttribute('data-value');
            this.$i18n.locale = language;
            window.localStorage.setItem('countryLanguage', language)
            if (language == 'en') {
               this.countryLanguage = 'English';
               this.imgSrc = us;
               this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
               this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
            } else if (language == 'zh-CN') {
               this.countryLanguage = '简体中文';
               this.imgSrc = China;
               this.annouceUrl = 'https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements';
               this.helpUrl = 'https://55support.zendesk.com/hc/zh-cn';
            } else if (language == 'ko') {
               this.countryLanguage = '한국어';
               this.imgSrc = ko;
               this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
               this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
            } else if (language == 'vi') {
               this.countryLanguage = "Tiếng Việt";
               this.imgSrc = vi;
               this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
               this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
            }
            this.$store.commit('changeCurentLange', language);
         },
         getLegalTenderData() {
            let param = {}
            param.fromCurrency = 'USD'
            param.toCurrency = this.legalTenderSelect
            getLegalTenderValue(param).then(result => {
               let info = {name: result.toCurrency, rate: result.rate}
               localStorage.setItem('currentCurrency', JSON.stringify(info))
               //目标页面监听store中的数据变动
               this.$store.commit('changeCurrencyState', result.toCurrency);
               this.modal1 = false
               // window.location.reload()
            })
         },
         openSetting() {
            this.modal1 = true;
         },
         submitSetting() {
            this.getLegalTenderData()
         },
         quitFun() {
            setTimeout(function () {
               Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')})
               localStorage.removeItem("ACCOUNT_TOKEN");
               localStorage.removeItem("ORDER_TOKEN");
               localStorage.removeItem("ASSET_TOKEN");
               localStorage.removeItem("UTIL_TOKEN");
               localStorage.removeItem("accountId");
               localStorage.removeItem("ACCOUNT_SESSION");
               localStorage.removeItem("ORDER_SESSION");
               localStorage.removeItem("ASSET_SESSION");
               localStorage.removeItem("orderTicket");
               localStorage.removeItem("googleFlag");
               localStorage.removeItem("phoneNumber");
               localStorage.removeItem("userNumer");
               localStorage.removeItem("ex55pin");
               localStorage.removeItem("emailFlag");
               localStorage.removeItem("ifEmail");
               localStorage.removeItem("ifsetgoogle");
               localStorage.removeItem("isSetTradePasswrod");
               localStorage.removeItem("securitPhone");
               localStorage.removeItem("curPage");
               localStorage.removeItem("Emailtoken");
               localStorage.removeItem("phoneToken");
               window.location.reload();
            }, 500)
            this.$store.commit('changeLoingStatus', false);
            this.$router.push('/home');
         },
         verfiy() {
            let loginToken = Cookies.get('loginToken');
            getHeaderTokenApi(relatNameVerify, {}, loginToken).then((res) => {
               let status = res.data.checkStatus;
               if (status == 'CHECKING') {
                  window.location.href = '../../../identityAuthentication/underReview.html';
               } else if (status == "PASSED") {
                  window.location.href = '../../../identityAuthentication/passed.html';
               } else if (status == 'NOT_SET') {
                  window.location.href = '../../../identityAuthentication/noAuthentication.html';
               } else if (status == 'FAILURE') {
                  window.location.href = '../../../identityAuthentication/noPass.html';
               }
            })
         }
      },
      computed: {
         loginStatus() {
            return this.$store.state.app.isLogin;
         }
      },
      watch: {
         loginStatus(val, oldVal) {
            let isLogin = this.$store.state.app.isLogin;
            if (isLogin) {
               this.isLogin = true;
            } else {
               this.isLogin = false;
            }
         }
      },
      mounted() {
         // this.$i18n.locale = window.localStorage.getItem('countryLanguage') || 'en-US';
         let lang = window.localStorage.getItem('countryLanguage') || 'zh-CN';
         let currency = localStorage.getItem('currentCurrency')
         if (lang === 'zh-CN') {
            this.imgSrc = China;
            this.annouceUrl = 'https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements';
            this.helpUrl = 'https://55support.zendesk.com/hc/zh-cn';
         } else if (lang === 'en') {
            this.imgSrc = us;
            this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
            this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
         } else if (lang == 'ko') {
            this.countryLanguage = '한국어';
            this.imgSrc = ko;
            this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
            this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
         } else if (lang == 'vi') {
            this.countryLanguage = 'Tiếng Việt';
            this.imgSrc = vi;
            this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
            this.helpUrl = 'https://55support.zendesk.com/hc/en-us';
         }
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
         } else {
            this.isLogin = false
         }
      },
      created() {


      }
   }
</script>
<style scoped lang="less">
   @textColor: #8D9ACE;
   .headerbox {
      width: 100%;
      //min-width: 1200px;
      height: 60px;
      background: #1A2B7C;
      header {
         padding: 0 30px;
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         .header_l {
            display: flex;
            height: 100%;
            align-items: center;
            .logo {
               display: block;
               margin-right: 12px;
               img {
                  width: 150px;
                  height: 32px;
               }
            }
            .nav {
               height: 100%;
               display: flex;
               align-items: center;
               li {
                  padding: 0 15px;
                  .router-link-active {
                     color: #fff;
                  }
                  a {
                     color: #8D9ACE;
                     font-size: 13px;
                     font-weight: bold;

                  }
                  a:hover {
                     color: #fff;
                     font-size: 13px;
                  }
                  &.mining {
                     position: relative;
                     height: 100%;
                     display: flex;
                     align-items: center;
                     &:hover .mining_content {
                        display: block;
                     }
                     .mining_content {
                        position: absolute;
                        width: 125px;
                        height: auto;
                        background: #111c54;
                        left: -11px;
                        top: 60px;
                        display: none;
                        z-index: 100;

                        ul {
                           li {
                              width: 100%;
                              height: 34px;
                              line-height: 34px;
                              width: 100%;
                              text-align: center;
                              cursor: pointer;
                              padding: 0px;
                              font-size: 13px;

                              &:hover {
                                 background: rgba(138, 168, 255, 0.1);
                                 a {
                                    color: rgba(138, 168, 255, 1)
                                 }
                              }
                              a {
                                 color: #fff;

                              }
                           }
                        }

                     }
                  }

               }
            }
         }
         .header_r {
            height: 100%;
            display: flex;
            dl {
               display: flex;
               height: 100%;
               .nopadding {
                  padding: 0;
               }
               dt {
                  padding: 0 15px;
                  height: 100%;
                  line-height: 60px;
                  color: @textColor;
                  .router-link-active {
                     color: #fff;
                  }
                  .loginRouter {
                     display: inline-block;
                     width: 76px;
                     border-radius: 4px;
                     line-height: 32px;
                     text-align: center;
                     color: #fff;
                     background: #8AA8FF;
                     &:hover {
                        background: rgba(9, 18, 65, 1);
                        border: 1px solid #8AA8FF;
                        color: #8AA8FF;
                        //background:rgba(138,168,255,1);
                     }
                  }
                  label,
                  em {
                     font-size: 13px;
                     color: @textColor;
                     font-weight: bold;
                     cursor: pointer;
                  }
                  label {
                     display: flex;
                  }
                  a {
                     color: @textColor;
                     font-weight: bold;
                     font-size: 12px;
                  }
                  a:hover {
                     color: #fff;
                  }
                  a:active {
                     color: #fff;
                  }
                  ul {
                     li {
                        color: #fff;
                        font-weight: bolder;
                        display: flex;
                        cursor: pointer;
                        padding-left: 20px;
                        img {
                           padding-right: 5px;
                        }
                        a, span {
                           width: 100%;
                           color: #fff;
                           font-weight: bold;
                           a {
                              width: 100%;
                              display: inherit;
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }

   //复用原来样式代码
   .title-nav {
      position: relative;
   }

   .title-nav i {
      color: #5A6CB1;
      cursor: pointer;
   }

   .title-nav .center-line {
      padding: 0;
   }

   .language {
      position: relative;
   }

   .language .language-box { //语言翻译
      width: 127px;
      background: rgba(17, 28, 84, 1);
      position: absolute;
      right: 0px;
      display: none;
      z-index: 999;
   }

   .language .language-box ul {
      background: rgba(17, 28, 84, 1);
   }

   .language .language-box ul li {
      height: 40px;
      line-height: 40px;
      right: -30px;
      text-align: center;
      font-size: 13px;
      font-weight: lighter;
      color: #fff;
      padding-left: 5px;
      cursor: pointer;
      &:hover {
         background: rgba(138, 168, 255, 0.1);
         color: rgba(138, 168, 255, 1);
      }
   }

   // .language:after {
   //     content: '';
   //     position: absolute;
   //     height: 8px;
   //     width: 8px;
   //     border: 1px solid;
   //     border-color: #8D9ACE #8D9ACE transparent transparent;
   //     top: 26px;
   //     right: 0;
   //     transform: rotate(45deg);
   //     transition:  1s ease ;
   // }

   .language:hover .language-box { //语言翻译hover
      display: block;
   }

   // .language:hover:after {
   //     border: 1px solid;
   //     border-color: transparent #8D9ACE #8D9ACE transparent;
   // }

   .assets-header dt {
      position: relative;
      a{
         font-size: 13px;
      }
   }

   .assets-header dt .assets-img {
      float: left;
      margin: 22px 9px 0 0;
   }

   .assets-header dt .assets-header-box {
      position: absolute;
      display: none;
      z-index: 30;
      top: 60px;
      right: 0px;
   }

   .assets-header dt .assets-header-box ul {
      width: 180px;
      background: rgba(17, 28, 84, 1);
   }

   .assets-header dt .assets-header-box ul li {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      font-weight: lighter;
      color: #fff;

   }

   .assets-header dt .assets-header-box ul li .assets-item-img {
      float: left;
      margin: 8px 6px 0 12px;
      width: 25px;
      height: 24px;
   }

   .assets-header .arrow-down:after { //右侧箭头样式
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border: 1px solid;
      border-color: #8D9ACE #8D9ACE transparent transparent;
      top: 27px;
      right: 0;
      transform: rotate(45deg);
      transition: 1s ease;
   }

   .assets-header .arrow-down:hover .assets-header-box {
      display: block;
   }

   .assets-header .arrow-down:hover:after {
      border: 1px solid;
      border-color: transparent #8D9ACE #8D9ACE transparent;
   }

   .assets-header .user .assets-img {
      margin-right: 0;
   }

   /*修改*/

   .language .language-box ul {
      text-align: center;
   }

   .assets-header dt .assets-header-box-user { //账户安全hover
      right: 0px;
      position: absolute;
      z-index: 999;
   }

   .assets-header dt .assets-header-box-user:hover { //账户安全hover
      display: block;
   }

   .assets-header dt .assets-header-box-user .assets-list li:hover { //账户安全hover
      background: rgba(138, 168, 255, 0.1);
   }

   .assets-header dt .assets-header-box-user .assets-list li:hover a { //账户安全hover
      color: rgba(138, 168, 255, 1)
   }

   .assets-header dt.balances:hover .assets-header-box {
      display: block;
   }

   .assets-header dt.user:hover .assets-header-box-user {
      display: block;
   }

   a[name='invitePeopleimg'] {
      width: 20px;
   }

   .download_app {
      margin-right: 10px;
      cursor: pointer;
      div {
         span {
            color: #8D9ACE;
            font-size: 13px;
            font-weight: bold;
            vertical-align: super;
            margin-left: 9px;
         }
      }
   }

   .download {
      width: 108px;
      height: 124px;
      background: rgba(17, 28, 84, 1);
      position: absolute;
      line-height: 20px;
      left: 0px;
      z-index: 33;
      top: 60px;
      text-align: center;
      display: none;
      p {
         font-size: 12px;
         color: #fff;
         font-weight: 400;
      }
      img {
         width: 75px;
         height: 75px;
         margin-left: 2px;
      }
   }

   .download_app:hover .download {
      display: block;
      z-index: 999;
   }

   .download_app:hover div span {
      color: #fff;
   }

   .balances:hover em {
      color: #fff !important;
   }

   .balances .assets-list li {
      cursor: pointer;
   }

   .balances .assets-list li:hover { //资产hover
      background: rgba(138, 168, 255, 0.1);
   }

   .balances .assets-list li:hover a { //资产hover
      color: rgba(138, 168, 255, 1)
   }

   .support:hover span {
      color: #fff;
   }

   .support {
      margin-right: 10px;
      cursor: pointer;
      font-size: 13px;
   }

   .support:hover .support_content {
      display: block;
      z-index: 999;

   }

   .support_content {
      width: 127px;
      background: rgba(17, 28, 84, 1);
      line-height: 25px;
      text-align: center;
      color: #333333;
      position: absolute;
      z-index: 999;
      top: 60px;
      right: 0px;
      display: none;
      p {
         cursor: pointer;
         padding: 0 10px;
         height: 40px;
         line-height: 40px;
         a {
            color: #fff !important;
         }
      }
      p:hover {
         background: rgba(138, 168, 255, 0.1);
      }
      p:hover a {
         color: rgba(138, 168, 255, 1) !important;
      }
   }

   .language .new_language_box ul {
      li {
         font-size: 13px;
         &:hover {
            background-color: rgba(138, 168, 255, 0.2) !important;
            color: #fff;
         }
      }
      li:nth-child(1) {
         background: url(../assets/images/header/English.svg) no-repeat 12px 8px;
         padding-left: 45px;
         background-size: 24px 24px;
      }
      li:nth-child(2) {
         background: url(../assets/images/header/ko.svg) no-repeat 12px 8px;
         padding-left: 45px;
         background-size: 24px 24px;
      }
      li:nth-child(3) {
         background: url(../assets/images/header/Vietnam.svg) no-repeat 12px 8px;
         padding-left: 45px;
         background-size: 24px 24px;
      }
      li:nth-child(4) {
         background: url(../assets/images/header/China.svg) no-repeat 12px 8px;
         padding-left: 45px;
      }

   }

   .support_help {
      span {
         color: #8D9ACE;
         font-weight: bold;
      }
   }

   label[name='languagesAfter'] {
      height: 60px;
      img {
         width: 24px;
         height: 60px;
      }
   }
</style>