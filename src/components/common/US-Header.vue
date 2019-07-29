<template>
  <div>
    <!-- ========== HEADER ========== -->
    <header
      id="header"
      class="u-header u-header--bg-transparent u-header--show-hide-md board_Background"
      data-header-fix-moment="500"
      data-header-fix-effect="slide"
    >
      <div class="u-header__section">
        <div
          id="logoAndNav"
          class="container"
        >
          <!-- Nav -->
          <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
            <!-- Logo -->
            <router-link to='/home'><img
                src="../../assets/images/index/55trade.png"
                alt="logo"
                width="120px" height="30px" 
              >
            </router-link>

            <!-- End Logo -->

            <!-- Responsive Toggle Button -->
            <button
              type="button"
              class="navbar-toggler btn u-hamburger"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="navBar"
              data-toggle="collapse"
              data-target="#navBar"
            >
              <span
                id="hamburgerTrigger"
                class="u-hamburger__box"
              >
                <span class="u-hamburger__inner"></span>
              </span>
            </button>
            <!-- End Responsive Toggle Button -->

            <!-- Navigation -->
            <div
              id="navBar"
              class="collapse navbar-collapse u-header__navbar-collapse"
            >
              <ul class="navbar-nav u-header__navbar-nav">
          <!-- Features -->
          <li class="nav-item hs-has-sub-menu u-header__nav-item"
              data-event="hover"
              data-animation-in="slideInUp"
              data-animation-out="fadeOut">
            <a id="dropdownMegaMenuWithDropdown" class="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="dropdownSubMenuWithDropdown">Features</a>

            <!-- Dropdown - Submenu -->
            <ul id="dropdownSubMenuWithDropdown" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" aria-labelledby="dropdownMegaMenuWithDropdown" style="min-width: 230px;">
              <li><router-link to="/crypto" class="nav-link u-header__sub-menu-nav-link">Crypto Trading</router-link></li>
              <li><a target="_blank"  class="nav-link u-header__sub-menu-nav-link" href="http://55.trade/doc/#introduction">API Trading</a></li>
              <li><a class="nav-link u-header__sub-menu-nav-link" target="_blank" :href="englishCommunityURL"> Social Trading </a></li>
            </ul>
            <!-- End Dropdown - Submenu -->
          </li>
          <!-- End Features -->                
          <!-- Benefits -->
          <li class="nav-item hs-has-sub-menu u-header__nav-item"
              data-event="hover"
              data-animation-in="slideInUp"
              data-animation-out="fadeOut">
            <a id="dropdownMegaMenuWithDropdown" class="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="dropdownSubMenuWithDropdown">Benefits</a>

            <!-- Dropdown - Submenu -->
            <ul id="dropdownSubMenuWithDropdown" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" aria-labelledby="dropdownMegaMenuWithDropdown" style="min-width: 230px;">
              <li><router-link  to='/whyus' class="nav-link u-header__sub-menu-nav-link">Why Us?</router-link></li>
              <li><router-link to="/smartexecution" class="nav-link u-header__sub-menu-nav-link">Smart Execution</router-link></li>
              <li><router-link to='/faqs' class="nav-link u-header__sub-menu-nav-link">FAQs</router-link></li>
            </ul>
            <!-- End Dropdown - Submenu -->
          </li>
          <!-- End Benefits -->                
          <!-- About Us -->
          <li class="nav-item hs-has-sub-menu u-header__nav-item"
              data-event="hover"
              data-animation-in="slideInUp"
              data-animation-out="fadeOut">
            <a id="dropdownMegaMenuWithDropdown" class="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="dropdownSubMenuWithDropdown">About Us</a>

            <!-- Dropdown - Submenu -->
            <ul id="dropdownSubMenuWithDropdown" class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" aria-labelledby="dropdownMegaMenuWithDropdown" style="min-width: 230px;">
              <li><router-link to='/ourcompany' class="nav-link u-header__sub-menu-nav-link">Our Company</router-link></li>
              <!-- <li><a class="nav-link u-header__sub-menu-nav-link" href="#">Another action</a></li> -->
              <li><router-link to="/team" class="nav-link u-header__sub-menu-nav-link">The Team</router-link></li>
              <li><a class="nav-link u-header__sub-menu-nav-link" href="https://www.linkedin.com/company/55-global" target="_blank">Careers</a></li>
              <li><router-link to='/contactus' class="nav-link u-header__sub-menu-nav-link">Contact Us</router-link></li>
            </ul>
            <!-- End Dropdown - Submenu -->
          </li>
          <!-- End About Us -->                
                <!-- 订单 -->
                <li
                  class="nav-item hs-has-mega-menu u-header__nav-item"
                  data-event="hover"
                  data-animation-in="slideInUp"
                  data-animation-out="fadeOut"
                  data-max-width="900px"
                  data-position="right"
                  v-show="isLogin"
                >
                  <router-link
                    to='/order'
                    class="nav-link u-header__nav-link "
                  >{{$t('homeOrder')}}</router-link>
                </li>
                <!-- 订单-->
                <!-- 资产 -->
                <li
                  class="nav-item hs-has-sub-menu u-header__nav-item"
                  data-event="hover"
                  data-animation-in="slideInUp"
                  data-animation-out="fadeOut"
                >
                  <router-link
                    to='/balances'
                    id="pagesMegaMenu"
                    class="nav-link u-header__nav-link u-header__nav-link-toggle"
                    aria-labelledby="pagesSubMenu"
                    aria-haspopup="true"
                    aria-expanded="false"
                    v-show="isLogin"
                  >{{$t('homeBalances')}}</router-link>

                  <!-- Pages - Submenu -->
                  <ul
                    id="pagesSubMenu"
                    class="hs-sub-menu u-header__sub-menu"
                    aria-labelledby="pagesMegaMenu"
                    style="min-width: 230px;"
                  >
                    <!-- Account -->
                    <li class="hs-has-sub-menu">
                      <router-link
                        to='/balances'
                        class="nav-link u-header__sub-menu-nav-link"
                      >{{$t('zcDeposit')}} & {{$t('zcWithdrawal')}}</router-link>
                    </li>
                    <!-- End Account -->

                    <!-- Company -->
                    <li class="hs-has-sub-menu">
                      <router-link
                        to='/transaction_history'
                        class="nav-link u-header__sub-menu-nav-link"
                      >{{$t('tbdhTransactionHistory')}}</router-link>
                    </li>
                    <!-- Company -->
                  </ul>
                  <!-- End Pages - Submenu -->
                </li>
                <!-- End 资产 -->

                <!-- 账户start -->
                <li
                  class="nav-item hs-has-sub-menu u-header__nav-item"
                  data-event="hover"
                  data-animation-in="slideInUp"
                  data-animation-out="fadeOut"
                >

                  <router-link
                    to='/safeCenter'
                    id="accountMegaMenu"
                    class="nav-link u-header__nav-link u-header__nav-link-toggle"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-labelledby="accountSubMenu"
                      v-show="isLogin"
                  >Account</router-link>

                  <!-- Pages - Submenu -->
                  <ul
                    id="accountSubMenu"
                    class="hs-sub-menu u-header__sub-menu"
                    aria-labelledby="accountMegaMenu"
                    style="min-width: 230px;"
                  >
                    <!-- Account -->
                    <li class="hs-has-sub-menu">
                      <router-link
                        to='/safeCenter'
                        class="nav-link u-header__sub-menu-nav-link"
                      >{{$t('tbdhAccountSecurity')}}</router-link>
                    </li>
                    <!-- End Account -->
                    <!-- Company -->
                    <li class="hs-has-sub-menu">
                      <a
                        id="navLinkPagesCompany"
                        class="nav-link u-header__sub-menu-nav-link"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesCompany"
                        @click="verfiy"
                      >{{$t('tbdhIDVerification')}}</a>
                    </li>
                     <li class="hs-has-sub-menu">
                      <a
                        id="navLinkPagesCompany"
                        class="nav-link u-header__sub-menu-nav-link"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesCompany"
                        @click="L2verify"
                      >{{$t('kyc2')}}</a>
                    </li>
                    <!-- Company -->
                    <!-- Company -->
                    <!-- <li @click="inviteFriend"><a
                        href="javascript:;"
                        class="nav-link u-header__sub-menu-nav-link"
                      >{{$t('invitePeople')}}</a></li> -->
                    <!-- Company -->
                    <li @click="quitFun"><a
                        href="javascript:;"
                        class="nav-link u-header__sub-menu-nav-link"
                      >{{$t('tbdhLogout')}}</a></li>
                  </ul>
                  <!-- End Pages - Submenu -->
                </li>
                <!-- End 账户 -->
                <!-- Button -->
                <li
                  class="nav-item hs-has-mega-menu u-header__nav-item"
                  data-event="hover"
                  data-animation-in="slideInUp"
                  data-animation-out="fadeOut"
                  data-max-width="900px"
                  data-position="right"
                  v-if="!isLogin"
                >
                  <router-link
                    to='/login'
                    class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                  >{{$t('HomeSignin')}}</router-link>
                  &nbsp;&nbsp;
                  <router-link
                    class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                    to='/register'
                  >{{$t('HomeSignup')}}</router-link>
                </li>
                <!-- End Button -->
              </ul>
            </div>
            <!-- End Navigation -->
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
    import { subNumberPoint, scientificToNumber } from "@/lib/utils";
    import { getLegalTenderValue } from "_api/header.js";
    import { getHeaderTokenApi, postHeaderTokenBodyApi } from "_api/axios.js";
    import { AnnoucementList } from "_api/home";
    import moment from "moment";
    import Cookies from "js-cookie";
    import { Exchange } from "@/interface/exchange.js";

    import {
    relatNameVerify,
    socialToken,
    logout,
    identifyQueryUrl,
    amlqueryState
    } from "../../../api/urls.js";
    import { proportion } from "_api/balances.js";
    import {
    CHAT_URL,
    getCommouityBaseURL,
    getMainSite,
    clearLocalStorage
    } from "../../config/index";
import { debuglog } from 'util';

export default {
  data() {
    return {
      isLogin: true,
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
        { value: "USD", label: "$ USD", shortName: "$" },
        { value: "CNY", label: "¥ CNY", shortName: "¥" },
        { value: "HKD", label: "HK$ HKD", shortName: "HK$" },
        { value: "MOP", label: "MOP$ MOP", shortName: "MOP$" }, //澳门元
        { value: "KRW", label: "₩ KRW", shortName: "₩" }, //韩元
        { value: "TWD", label: "NT$ TWD", shortName: "NT$" }, //新台币
        { value: "PHP", label: "₱ PHP", shortName: "₱" }, //菲律宾比索
        { value: "SGD", label: "S$ SGD", shortName: "S$" }, //新加坡
        { value: "CHF", label: "CHF", shortName: "CHF" }, //瑞士法郎
        { value: "THB", label: "฿ THB", shortName: "฿ " }, //泰国铢
        { value: "NZD", label: "NZ$ NZD", shortName: "NZ$" }, //新西兰元
        { value: "RUB", label: "RUB", shortName: "RUB" }, //卢布
        { value: "INR", label: "INR", shortName: "INR" }, //印度卢比
        { value: "IDR", label: "Rp IDR", shortName: "Rp" }, //印尼盾
        { value: "GBP", label: "￡ GBP", shortName: "￡" }, //英镑
        { value: "CAD", label: "C$ CAD", shortName: "C$" }, //加拿大
        { value: "ZAR", label: "ZAR", shortName: "$" }, //南非兰特
        { value: "SAR", label: "SAR", shortName: "SAR" }, //沙特里亚尔
        { value: "BRL", label: "R$ BRL", shortName: "R$" }, //巴西里亚尔
        { value: "TRY", label: "TRY", shortName: "TRY" }, //土耳其里拉
        { value: "EUR", label: "€ EUR", shortName: "€" }, //欧元
        { value: "JPY", label: "J￥ JPY", shortName: "J￥" } //日元,
      ],
      adArr: [], //banner图列表数组
      telegramURL: "",
      helpCenterURL: "",
      annoucementURL: "",
      FAQURL: "",
      submitURL: "",
      learnMoreURL:'',
      OTCURL: "", //otcURL
      short: "$",
      englishCommunityURL: '',
      loginToken:'',
      chatToken:'',

    };
  },
  components: {
    Loading
  },
  methods: {
    initURL() {
      this.loginToken = Cookies.get('loginToken')
      if(this.loginToken){
        postHeaderTokenBodyApi('api/sso/social/get-token',this.loginToken,null).then(data => {
            this.chatToken = data.token +'/'
            //社区链接
            this.englishCommunityURL = getCommouityBaseURL()+'/api/v1/memberinterface/'+this.chatToken+'/'+encodeURIComponent('/groups/profile/967250642861035532/feed')
            this.baseSocialURL = getCommouityBaseURL()+'/api/v1/memberinterface/'+this.chatToken
        })
      }else{
        this.chatToken = 'null'
        this.englishCommunityURL = getCommouityBaseURL()+'/api/v1/memberinterface/' + this.chatToken+'/'+ encodeURIComponent('/groups/profile/967250642861035532/feed')
        this.baseSocialURL = getCommouityBaseURL()
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
        this.learnMoreURL= 'https://55support.zendesk.com/hc/zh-cn/sections/360001019733'
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
      AnnoucementList({ language: this.language, fromSite: "ALL" }).then(
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
    verfiy() {
      let loginToken = Cookies.get("loginToken");
      getHeaderTokenApi(identifyQueryUrl, {}, loginToken)
        .then(res => {
          if (res.data == "" || res.data == null||res=='{}') {
            this.$router.push("/identiy");
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
            this.$router.push("/identiy");
          } else {
            this.$router.push("/identityResult");
          }
        })
        .catch(error => {
          // console.log(error)
        });
    },
    gotoSocial() {
      let loginFlag = Cookies.get("loginToken");
      if (loginFlag) {
        //登陆了
        postHeaderTokenBodyApi(socialToken, loginFlag, {}).then(res => {
          let responseToken = res.token;
          let socialURL = CHAT_URL.baseURL + responseToken;
          let url = socialURL;
          window.open(url, "_blank");
        });
      } else {
        var url = getCommouityBaseURL();
        window.open(url, "_blank");
      }
    },
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
      proportion({ ssoToken: Cookies.get("loginToken") }).then(res => {
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
    this.initURL()

    $(".js-mega-menu").HSMegaMenu({
      event: "hover",
      pageContainer: $(".container"),
      breakpoint: 767.98,
      hideTimeOut: 0
    });

    //$.HSCore.components.HSSVGIngector.init(".js-svg-injector");
    // initialization of header
    // $.HSCore.components.HSHeader.init($("#header"));
    // initialization of unfold component
    // $.HSCore.components.HSUnfold.init($("[data-unfold-target]"), {
    //   afterOpen: function() {
    //     $(this)
    //       .find('input[type="search"]')
    //       .focus();
    //   }
    // });
    // $.HSCore.components.HSFocusState.init();

    let language = window.localStorage.getItem("countryLanguage") || "en";
    let currency = localStorage.getItem("currentCurrency");
    //默认英语连接
    this.helpCenterURL = 'https://55support.zendesk.com/hc/en-us'
    this.annoucementURL = 'https://55support.zendesk.com/hc/en-us/categories/360000443513'
    this.FAQURL = 'https://55support.zendesk.com/hc/en-us/categories/360000444094'
    this.submitURL = 'https://55support.zendesk.com/hc/en-us/requests/new'
    this.learnMoreURL= 'https://55support.zendesk.com/hc/en-us/sections/360001019733'

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
      // let loginToken = Cookies.get("loginToken");
      // var ssoProvider = {};
      //创建实例
      // this.exchange = new Exchange(ssoProvider);
      // //登录以后查询资产 挂单 成交记录
      // if (loginToken) {
      // this.exchange.ssoProvider.getSsoToken = function(fn) {
      //   fn(loginToken);
      // }.bind(this);
      //   this.getAccountInfoData();
      // }
    } else {
      this.isLogin = false;
    }
    //判断otc URL
    // this.OTCURL = getOTCURL();
    this.mainSiteURL = getMainSite();
    //公告滚动
    // this.initAnnoucementList();
    // this.timer = setInterval(this.scroll, 3000);
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/header-Front.css";
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
a:hover{
  color: #12869A;
}
</style>