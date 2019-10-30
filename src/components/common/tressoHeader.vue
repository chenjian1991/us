<template>
   <div id="tressoHeader">
      <!-- ========== HEADER ========== -->
      <header
         id="header"
         class="u-header u-header--bg-transparent u-header--show-hide-md bgc1"
         data-header-fix-moment="500"
         data-header-fix-effect="slide">
         <div class="u-header__section">
            <div id="logoAndNav" class="container">
               <!-- Nav -->
               <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
                  <!-- Logo -->
                  <router-link to='/home' class="mr-lg-11">
                     <img src="../../assets/images/tressoHeader/logo.png" alt="logo" class="logo-img">
                  </router-link>
                  <!-- End Logo -->
                  <!-- Responsive Toggle Button -->
                  <button type="button" class="navbar-toggler btn u-hamburger" aria-label="Toggle navigation"
                          aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
                       <span id="hamburgerTrigger" class="u-hamburger__box">
                         <span class="u-hamburger__inner"></span>
                       </span>
                  </button>
                  <!-- End Responsive Toggle Button -->
                  <div id="navBar" class="collapse navbar-collapse u-header__navbar-collapse ml-lg-4">
                     <!--left-->
                     <ul class="navbar-nav">
                        <li class="nav-item u-header__nav-item header-box">
                           <router-link to='/about' class="nav-link u-header__nav-link">ABOUT</router-link>
                        </li>
                        <li
                           class="nav-item u-header__nav-item header-box">
                           <a class="nav-link u-header__nav-link" href="#GBBO">GBBO™</a>
                        </li>
                        <li
                           class="nav-item u-header__nav-item header-box header-box">
                           <router-link to="faqs" class="nav-link u-header__nav-link">
                              FAQ
                           </router-link>
                        </li>
                     </ul>
                     <!--login-->
                     <ul class="navbar-nav u-header__navbar-nav" v-if="isLogin">
                        <li
                           class="nav-item u-header__nav-item header-box">
                           <router-link class="nav-link u-header__nav-link mr-lg-5" to='/login' style="font-size: 14px">
                              Log In
                           </router-link>
                        </li>
                        <li
                           class="nav-item u-header__nav-item">
                           <router-link class="btn btn-sm btn-primary transition-3d-hover d-inline-block register-btn"
                                        to='/register'>GET STARTED
                           </router-link>
                        </li>
                     </ul>
                     <!--account-->
                     <ul class="navbar-nav u-header__navbar-nav" v-else>
                        <li class="nav-item hs-has-sub-menu u-header__nav-item header-box" data-event="hover"
                            data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="right">
                           <router-link id="pagesMegaMenu" class="nav-link u-header__nav-link u-header__nav-link-toggle"
                                        to='' aria-labelledby="pagesSubMenu" aria-haspopup="true" aria-expanded="false">
                              My Account
                           </router-link>
                           <ul id="pagesSubMenu" class="hs-sub-menu u-header__sub-menu" aria-labelledby="pagesMegaMenu">
                              <!--<li class="hs-has-sub-menu">-->
                                 <!--<router-link to='' class="nav-link u-header__sub-menu-nav-link">-->
                                    <!--Dashboard-->
                                 <!--</router-link>-->
                              <!--</li>-->
                              <li class="hs-has-sub-menu">
                                 <router-link to='/balances' class="nav-link u-header__sub-menu-nav-link">
                                    Balances
                                 </router-link>
                              </li>
                              <li class="hs-has-sub-menu">
                                 <router-link to='/order' class="nav-link u-header__sub-menu-nav-link">
                                    Order
                                 </router-link>
                              </li>
                              <li class="hs-has-sub-menu">
                                 <router-link to='/safeCenter' class="nav-link u-header__sub-menu-nav-link">
                                    account & Security
                                 </router-link>
                              </li>
                              <li class="hs-has-sub-menu">
                                 <a href="javascript:;" class="nav-link u-header__sub-menu-nav-link" @click="verfiy">
                                    ID verification
                                 </a>
                              </li>
                              <li class="hs-has-sub-menu">
                                 <a href="javascript:;" class="nav-link u-header__sub-menu-nav-link" @click="quitFun">
                                    Log out
                                 </a>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  </div>
               </nav>
               <!-- End Nav -->
            </div>
         </div>
      </header>
      <!-- ========== END HEADER ========== -->
      <Modal
         v-model="modal1"
         width="442"
      >
         <p
            slot="header"
            style="text-align:center"
         >
            <span>{{$t('headerSetting')}}</span>
         </p>
         <div style="padding-left:105px;">{{$t('currency')}}:</div>
         <div style="text-align:center;margin-top:8px;">
            <Select
               v-model="legalTenderSelect"
               style="width:200px"
               on-change="changeCurrency"
            >
               <Option
                  v-for="item in currencyList"
                  :value="item.value"
                  :key="item.value"
               >{{ item.label }}
               </Option>
            </Select>
         </div>
         <div slot="footer">
            <Button
               type="primary"
               size="default"
               v-if="!currencyBtnloading"
               @click="submitSetting"
            >{{$t('confrim')}}
            </Button>
            <Button
               type="primary"
               size="default"
               v-else
               loading
               @click="submitSetting"
            ></Button>
         </div>
      </Modal>
   </div>
</template>

<script>
   import Loading from "@/components/Loading";
   import {subNumberPoint, scientificToNumber} from "@/lib/utils";
   import {getLegalTenderValue} from "_api/header.js";
   import {getHeaderTokenApi, postHeaderTokenBodyApi} from "_api/axios.js";
   import {AnnoucementList} from "_api/home";
   import moment from "moment";
   import Cookies from "js-cookie";
   import {Exchange} from "@/interface/exchange.js";

   import {
      relatNameVerify,
      socialToken,
      logout,
      identifyQueryUrl,
      amlqueryState
   } from "../../../api/urls.js";
   import {proportion} from "_api/balances.js";
   import {
      CHAT_URL,
      getCommouityBaseURL,
      getMainSite,
      clearLocalStorage
   } from "../../config/index";
   import {debuglog} from 'util';

   export default {
      name: 'tressoHeader',
      data() {
         return {
            isLogin: false,
            currencyBtnloading: false, //法币汇率loading
            countryLanguage: "", //选择语言菜单展示
            language: window.localStorage.getItem("countryLanguage") || "zh-CN", //传参数
            legalTenderSelect:
               localStorage.getItem("countryLanguage") == "zh" ||
               localStorage.getItem("countryLanguage") == "zh-CN"
                  ? "CNY"
                  : "USD",
            modal1: false,
            currentCurrency: {},
            mainSiteURL: "",
            currencyList: [
               {value: "USD", label: "$ USD", shortName: "$"},
               {value: "CNY", label: "¥ CNY", shortName: "¥"},
               {value: "HKD", label: "HK$ HKD", shortName: "HK$"},
               {value: "MOP", label: "MOP$ MOP", shortName: "MOP$"}, //澳门元
               {value: "KRW", label: "₩ KRW", shortName: "₩"}, //韩元
               {value: "TWD", label: "NT$ TWD", shortName: "NT$"}, //新台币
               {value: "PHP", label: "₱ PHP", shortName: "₱"}, //菲律宾比索
               {value: "SGD", label: "S$ SGD", shortName: "S$"}, //新加坡
               {value: "CHF", label: "CHF", shortName: "CHF"}, //瑞士法郎
               {value: "THB", label: "฿ THB", shortName: "฿ "}, //泰国铢
               {value: "NZD", label: "NZ$ NZD", shortName: "NZ$"}, //新西兰元
               {value: "RUB", label: "RUB", shortName: "RUB"}, //卢布
               {value: "INR", label: "INR", shortName: "INR"}, //印度卢比
               {value: "IDR", label: "Rp IDR", shortName: "Rp"}, //印尼盾
               {value: "GBP", label: "￡ GBP", shortName: "￡"}, //英镑
               {value: "CAD", label: "C$ CAD", shortName: "C$"}, //加拿大
               {value: "ZAR", label: "ZAR", shortName: "$"}, //南非兰特
               {value: "SAR", label: "SAR", shortName: "SAR"}, //沙特里亚尔
               {value: "BRL", label: "R$ BRL", shortName: "R$"}, //巴西里亚尔
               {value: "TRY", label: "TRY", shortName: "TRY"}, //土耳其里拉
               {value: "EUR", label: "€ EUR", shortName: "€"}, //欧元
               {value: "JPY", label: "J￥ JPY", shortName: "J￥"} //日元,
            ],
            adArr: [], //banner图列表数组
            telegramURL: "",
            helpCenterURL: "",
            annoucementURL: "",
            FAQURL: "",
            submitURL: "",
            learnMoreURL: '',
            OTCURL: "", //otcURL
            short: "$",
            // englishCommunityURL: '',
            loginToken: '',
            chatToken: '',
            baseSocialURL: '',

         };
      },
      components: {
         Loading
      },

      methods: {
         initURL() {
            this.loginToken = Cookies.get('loginToken')
            if (this.loginToken) {
               postHeaderTokenBodyApi(socialToken, this.loginToken, null).then(data => {
                  this.chatToken = data.token + '/'
                  this.baseSocialURL = getCommouityBaseURL() + '/api/v1/memberinterface/' + this.chatToken;
                  window.open(this.baseSocialURL)
               })
            } else {
               this.baseSocialURL = getCommouityBaseURL();
               window.open(this.baseSocialURL)
            }
         },
         changeLangage(e) {
            let language = e.target.getAttribute("data-value");
            if (
               language == "en" ||
               language == "vi" ||
               language == "ko" ||
               language == "zh-CN" ||
               language == "id-id"
            ) {
               this.language = language;
            } else {
               this.language = "en";
            }
            this.$i18n.locale = language;
            window.localStorage.setItem("countryLanguage", language);
            if (language == "en") {
               this.countryLanguage = "English";
               this.telegramURL = "https://t.me/English_55GlobalMarkets";
            } else if (language == "vi") {
               this.countryLanguage = "Tiếng Việt";
               this.telegramURL = "https://t.me/Vietnam_55GlobalMarkets";
            } else if (language == "ko") {
               this.countryLanguage = "한국어";
               this.telegramURL = "https://t.me/Korea_55GlobalMarkets";
            } else if (language == "zh-CN") {
               this.countryLanguage = "简体中文";
               this.telegramURL = "https://t.me/Mandarin_55GlobalMarkets";
               this.helpCenterURL = 'https://55support.zendesk.com/hc/zh-cn'
               this.annoucementURL = 'https://55support.zendesk.com/hc/zh-cn/categories/360000443513'
               this.FAQURL = 'https://55support.zendesk.com/hc/zh-cn/categories/360000444094'
               this.submitURL = 'https://55support.zendesk.com/hc/zh-cn/requests/new'
               this.learnMoreURL = 'https://55support.zendesk.com/hc/zh-cn/sections/360001019733'
            } else if (language == "ru-ru") {
               this.countryLanguage = "Русский";
            } else if (language == "de-de") {
               this.countryLanguage = "Deutsch";
            } else if (language == "fr-fr") {
               this.countryLanguage = "Français";
            } else if (language == "es-es") {
               this.countryLanguage = "Español";
            } else if (language == "tr-tr") {
               this.countryLanguage = "Türkiye";
            } else if (language == "pt-br") {
               this.countryLanguage = "Português-BR";
            } else if (language == "pt-pt") {
               this.countryLanguage = "Português-PT";
            } else if (language == "th-th") {
               this.countryLanguage = "ไทย";
            } else if (language == "id-id") {
               this.countryLanguage = "Bahasa Indonesia";
            }
            this.$store.commit("changeCurentLange", language);
         },
         changeCurrency() {
            this.currencyBtnloading = false;
         },
         getLegalTenderData() {
            this.currencyBtnloading = true;
            let param = {};
            param.fromCurrency = "USD";
            let lang = localStorage.getItem("countryLanguage");
            if (lang == "zh-CN" || lang == "zh") {
               param.toCurrency = this.legalTenderSelect
                  ? this.legalTenderSelect
                  : "CNY";
            } else {
               param.toCurrency = this.legalTenderSelect
                  ? this.legalTenderSelect
                  : "USD";
            }
            getLegalTenderValue(param).then(result => {
               this.currencyList.forEach((v, i) => {
                  if (v.value == result.toCurrency) {
                     this.short = v.shortName;
                  }
               });
               let info = {
                  name: result.toCurrency,
                  rate: result.rate,
                  shortcut: this.short
               };
               localStorage.setItem("currentCurrency", JSON.stringify(info));
               //目标页面监听store中的数据变动
               this.$store.commit("changeCurrencyState", result.toCurrency);
               this.modal1 = false;
               setInterval(() => {
                  this.currencyBtnloading = false;
               }, 500);
               // window.location.reload()
            });
         },
         openSetting() {
            this.modal1 = true;
         },
         submitSetting() {
            this.getLegalTenderData();
         },
         initAnnoucementList() {
            this.adArr = [];
            AnnoucementList({language: this.language, fromSite: "ALL"}).then(
               data => {
                  data.map((v, i) => {
                     if (v.clientType == "PC") {
                        this.adArr.push({
                           title: v.title,
                           targetUrl: v.targetUrl,
                           createTime: moment(v.createTime).format("MM-DD")
                        });
                     }
                  });
               }
            );
         },
         L2verify() {
            this.L2queryState(Cookies.get('loginToken'))
         },
         L2queryState(token) {
            getHeaderTokenApi(amlqueryState, '', token).then((res) => {
               if (res.data.result) {
                  this.amlStatus = res.data.result;
                  if (this.amlStatus == 'NOHAVE') {
                     this.$router.push('amlKyc')
                  } else {
                     this.$router.push('amlkycResult')
                  }
               } else if (res.data.code) {
                  if (res.data.code == '10013') {
                     this.$router.push('login')
                  }
                  this.$Notice.error({
                     title: this.$t(res.data.code),
                     desc: this.$t(res.data.code)
                  });
               }
            })
         },
         verfiy() {
            let loginToken = Cookies.get("loginToken");
            getHeaderTokenApi(identifyQueryUrl, {}, loginToken)
               .then(res => {
                  if (res.data == "" || res.data == null || res == '{}') {
                     this.$router.push("/kyc");
                     return;
                  }
                  if (res.data.code) {
                     this.$Notice.error({
                        title: this.$t(res.data.code),
                        desc: this.$t(res.data.code)
                     });
                     this.$router.push("/login");
                  }
                  let status = res.data.dataStatus;
                  if (status == 1) {
                     this.$router.push("/kyc");
                  } else {
                     this.$router.push("/identityResult");
                  }
               })
               .catch(error => {
                  // console.log(error)
               });
         },
         // gotoSocial() {
         //   let loginFlag = Cookies.get("loginToken");
         //   if (loginFlag) {
         //     //登陆了
         //     postHeaderTokenBodyApi(socialToken, loginFlag, {}).then(res => {
         //       let responseToken = res.token;
         //       let socialURL = CHAT_URL.baseURL + responseToken;
         //       let url = socialURL;
         //       window.open(url, "_blank");
         //     });
         //   } else {
         //     var url = getCommouityBaseURL();
         //     window.open(url, "_blank");
         //   }
         // },
         quitFun() {
            postHeaderTokenBodyApi(logout, Cookies.get("loginToken"), {}).then(
               res => {
                  // console.log(res)
               }
            );
            //更新自选的币种
            this.$store.dispatch("updateMarkSymbol");
            this.$store.commit("changeLoingStatus", false);
            this.$router.push("/home");
            clearLocalStorage();
         },
         inviteFriend() {
            //返佣比例
            proportion({ssoToken: Cookies.get("loginToken")}).then(res => {
               if (res.secondLevelProportion === null) {
                  //普通用户
                  this.$router.push("/inviteFriend");
               } else {
                  this.$router.push("/invitePartner");
               }
            });
         }
      },
      computed: {
         languageChange() {
            return this.$store.state.app.countryLanguage; //  返回全局state的状态值
         },
         loginStatus() {
            return this.$store.state.app.isLogin;
         },
      },
      watch: {
         languageChange(val, oldVal) {
            //监听全局语言的状态
            if (
               val == "en" ||
               val == "vi" ||
               val == "ko" ||
               val == "zh-CN" ||
               val == "id-id"
            ) {
               this.language = val;
            } else {
               this.language = "en";
            }
         },
         loginStatus(val, oldVal) {
            if (val) {
               this.isLogin = true;
            } else {
               this.isLogin = false;
            }

         },

      },
      mounted() {


         let language = window.localStorage.getItem("countryLanguage") || "en";
         let currency = localStorage.getItem("currentCurrency");
         //默认英语连接
         this.helpCenterURL = 'https://55support.zendesk.com/hc/en-us'
         this.annoucementURL = 'https://55support.zendesk.com/hc/en-us/categories/360000443513'
         this.FAQURL = 'https://55support.zendesk.com/hc/en-us/categories/360000444094'
         this.submitURL = 'https://55support.zendesk.com/hc/en-us/requests/new'
         this.learnMoreURL = 'https://55support.zendesk.com/hc/en-us/sections/360001019733'

         if (language == "en") {
            this.countryLanguage = "English";
            this.telegramURL = "https://t.me/English_55GlobalMarkets";
         } else if (language == "vi") {
            this.countryLanguage = "Tiếng Việt";
            this.telegramURL = "https://t.me/Vietnam_55GlobalMarkets";
         } else if (language == "ko") {
            this.countryLanguage = "한국어";
            this.telegramURL = "https://t.me/Korea_55GlobalMarkets";
         } else if (language == "zh-CN") {
            this.countryLanguage = "简体中文";
            this.telegramURL = "https://t.me/Mandarin_55GlobalMarkets";
            this.helpCenterURL = 'https://55support.zendesk.com/hc/zh-cn'
            this.annoucementURL = 'https://55support.zendesk.com/hc/zh-cn/categories/360000443513'
            this.FAQURL = 'https://55support.zendesk.com/hc/zh-cn/categories/360000444094'
            this.submitURL = 'https://55support.zendesk.com/hc/zh-cn/requests/new'
         } else if (language == "ru-ru") {
            this.countryLanguage = "Русский";
         } else if (language == "de-de") {
            this.countryLanguage = "Deutsch";
         } else if (language == "fr-fr") {
            this.countryLanguage = "Français";
         } else if (language == "es-es") {
            this.countryLanguage = "Español";
         } else if (language == "tr-tr") {
            this.countryLanguage = "Türkiye";
         } else if (language == "pt-br") {
            this.countryLanguage = "Português-BR";
         } else if (language == "pt-pt") {
            this.countryLanguage = "Português-PT";
         } else if (language == "th-th") {
            this.countryLanguage = "ไทย";
         } else if (language == "id-id") {
            this.countryLanguage = "Bahasa Indonesia";
         }

         this.getLegalTenderData();
         //默认法币估值为 USD
         // if (!currency) {
         //    localStorage.setItem('currentCurrency', JSON.stringify(this.currentCurrency))
         // } else {
         //    let data = JSON.parse(currency)
         //    this.legalTenderSelect = data.name
         // }
         //判断是否登录有效
         let isLogin = this.$store.state.app.isLogin;
         if (isLogin) {
            this.isLogin = true;
         } else {
            this.isLogin = false;
         }

         $(".js-mega-menu").HSMegaMenu({
            event: "hover",
            pageContainer: $(".container"),
            breakpoint: 767.98,
            hideTimeOut: 0
         });
      }
   };
</script>
<style lang="less">
   #tressoHeader {
      .nav-item, .u-header__nav-item {
         a {
            color: #fff;
            &:hover {
               color: #01B2D6;
            }
            &:active {
               color: #01B2D6;
            }
         }
      }
      .u-header__sub-menu-nav-link {
         font-size: 14px;
         color: #77838F;
         height: 29px;
         line-height: 29px;
         padding-left: 20px;
         &:hover {
            color: #01B2D6;
         }
      }
      .u-header__sub-menu {
         width: 180px;
         border-top: none !important;
         border-radius: 4px;
      }
      .u-header__navbar-nav {
         background-color: transparent;
      }
      .hs-has-sub-menu{
         a{
            color: #77838F;
         }
      }
      .router-link-exact-active, .router-link-active {
         &:visited {
            color: #01B2D6;
         }
      }
   }
</style>
<style scoped lang="less">
   @import '../../assets/css/common.less';

   /*@import "../../assets/css/header-Front.css";*/

   .appdownload {
      position: relative;
      &:hover {
         img {
            width: 104px;
            height: 104px;
            display: block;
         }
      }
      img {
         border: 12px solid #121f28;
         border-radius: 2px;
         position: absolute;
         top: 29px;
         left: -16px;
         z-index: 1000;
         display: none;
      }
   }

   .loginBtn:hover {
      color: #fff !important;
   }

   a:hover {
      color: #12869A;
   }

   .header-box {
      padding-left: 14px;
      padding-right: 14px;
      font-size: 14px;

   }

   @blue: #01B2D6;
   .register-btn {
      color: @blue !important;
      border: solid 1px @blue;
      background-color: transparent;
   }

   .logo-img {
      width: 110px;
   }

   .nav-link {
      font-weight: 500;
   }
</style>