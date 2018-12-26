<template>
   <div class="nav_box hidden-xs" v-bind:style="styleObject">
      <!-- 第一行导航 -->
      <div class="nav_top">
         <div class="header_content">
            <ul class="left nav_top_ul">
               <li>
                  <!--<Icon type="md-pin" class="no-hover"/>-->
                  <i class="fa fa-map-marker no-hover" aria-hidden="true"></i>
                  <!-- <span class="no-hover internationalLine" >&nbsp;{{$t('headergloabl')}}&nbsp;</span> -->
                  <span class="addspance">&nbsp;&nbsp;US&nbsp;</span>
               </li>
               <!-- <li>
                  <a href="https://otc.55.com" target="_blank">OTC</a>
               </li> -->
               <!-- <li>
                  <a href="https://usdd.55.com" target="_blank">USDD</a>
               </li> -->
               <li>
                  <a href="http://sico.55.com/sicotest/index.php/397213?lang=en">SICO-TOKEN LISTING</a>
               </li>
               <!-- <li>
                  <a href="">TokenGate</a>
               </li>
               <li>
                  <a href="">FF</a>
               </li>
               <li>
                  <a href="">白皮书</a>
               </li> -->
            </ul>
            <ul class="right">
               <li>MSB No.31000137604928</li>
               <li class="appdownload">
                  <span class="child-hover cursorPoint"><i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;{{$t('hederdownload')}}
                  </span>
                  <img src="../../assets/images/home/Bhome/qrcode.png" alt="">
                 
               </li>
               <li>
                  <span class="nav-icon">
                     <a href="https://twitter.com/55GlobalMarkets" class="links"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                     <a :href="telegramURL" class="links"><Icon type="ios-paper-plane"/></a>
                     <a href="https://www.facebook.com/55GlobalMarkets/" class="links"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                  </span>
               </li>
               <li class="currency">
                  <span  @click="openSetting" class="currencySetting">{{$t('headerSetting')}}</span>
               </li>
               <li class="language languagenav">
                  <span>{{countryLanguage}}&nbsp;<Icon type="md-arrow-dropdown" size="16" class="triangle"/></span>
                  <ul class="dropList" @click="changeLangage">
                     <li data-value="en">English</li>
                     <!-- <li data-value="ko">한국어</li> -->
                     <!-- <li data-value="vi">Tiếng Việt</li> -->
                     <li data-value="zh-CN">简体中文</li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
      <!-- 第二行导航 -->
      <div class="nav_middle">
         <div class="header_content">
            <ul class="left">
               <li class="logo">
                  <router-link to='/home'><img src="../../assets/images/logo/logo.png" width="42px" height="30px" alt=""></router-link>
                  <div class="logoline"></div>
                  <h1>{{$t('headerhope')}}</h1>
               </li>
            </ul>
            <ul class="right" v-if="!isLogin">
               <li>
                  <router-link to='/login' class="login">{{$t('HomeSignin')}}</router-link>
               </li>
               <li>
                  <router-link class="register login"  to='/register'>{{$t('HomeSignup')}}</router-link>
               </li>
            </ul>
            <ul class="right" v-else>
               <li class="banalance">
                  <router-link to='/order'>{{$t('homeOrder')}}</router-link>
               </li>
               <!-- 资产 -->
               <li class="currency banalance">{{$t('homeBalances')}}
                  <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
                  <ul class="dropList currencyList">
                     <!-- 资产 -->
                     <li>
                        <router-link to='/balances'>{{$t('homeBalances')}}</router-link>
                     </li>
                     <li>
                        <router-link to='/transaction_history'>{{$t('tbdhTransactionHistory')}}</router-link>
                     </li>
                  </ul>
               </li>
               <li class="language banalance">
                  <Icon type="md-person" size="16"/>
                  <ul class="dropList">
                     <!-- 安全中心 -->
                     <li>
                        <router-link to='/safeCenter'>{{$t('tbdhAccountSecurity')}}</router-link>
                     </li>
                     <li @click="verfiy">{{$t('tbdhIDVerification')}}</li>
                     <!-- <li><a href="../../../../invitation/invitationCode.html"name="invitePeople">{{$t('invitePeople')}}</a></li> -->
                     <li @click="quitFun"><a href="javascript:;">{{$t('tbdhLogout')}}</a></li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
      <!-- 第三行导航 -->
      <div class="nav_bottom">
         <div class="header_content">
            <ul class="left">
               <li>
                  <router-link to='/home'>{{$t('HomeHomePage')}}</router-link>
               </li>
               <li class="bsite">
                  <router-link to='/Bhome'>{{$t('headerblockchain')}}</router-link>
               </li>
               <!-- <li class="ssite">
                  <router-link to='/Shome'>{{$t('headerstockchain')}}</router-link>
               </li> -->
               <!-- <li class="fsite">
                  <router-link to='/Fhome'>{{$t('headerfrancechain')}}</router-link>
               </li> -->
               <li class="csite"><router-link to='/Chome'>{{$t('headercoustomerchain')}}</router-link></li>
               <!-- <li class="lsite">
                  <a>{{$t('headerlocalbusiness')}}</a>
               </li>
               <li class="psite"><a>{{$t('headerpersonalchain')}}</a></li> -->
               <li class="tradecenter">
                  <router-link :to="{path:'/exchange',query: {site: 'B',symbol:'ETHBTC'}}">{{$t('headerexchangecenter')}}<Icon type="md-arrow-dropdown" size="16" class="triangle"/></router-link>
                  <ul class="tradeList">
                     <li>
                        <router-link :to="{path:'/exchange',query: {site: 'B',symbol:'ETHBTC'}}"><i class="icon btcIcon"> </i><span>{{$t('headerblockexchange')}}</span>
                        </router-link>
                     </li>
                     <!-- <li>
                        <router-link :to="{path:'/exchange',query: {site: 'S',symbol:'AAPLTUSDT'}}"><i class="icon klineIcon"></i> <span>{{$t('headerstockexchange')}}</span>
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="{path:'/exchange',query: {site: 'F',symbol:'EURDUSDT'}}"><i class="icon exchangeIcon"></i>
                           <span>{{$t('headerfranceexchange')}}</span></router-link>
                     </li>-->
                     <li>
                        <router-link :to="{path:'/exchange',query: {site: 'C',symbol:'LVSUPBTC'}}"><i class="icon logoIcon"></i> <span>{{$t('headercustomerexchange')}}</span>
                        </router-link>
                     </li> 
                  </ul>
               </li>
            </ul>
            <div class="right">
               <Icon type="md-volume-up" size="16"/> &nbsp;&nbsp;
               <div class="adbox">
                  <ul class="adList" ref="con1" :class="{anim:animate==true}">
                     <li v-for="item in adArr"><a :href="item.targetUrl" target="_blank"><span class="point">{{item.title}}</span> <span
                        class="date">[{{item.createTime}}]</span></a></li>
                  </ul>
                  <!-- <ul class="adList">
                     <li target='_blank' href='www.baidu.com'>百度</li>
                  </ul> -->
               </div>
            </div>
         </div>
      </div>
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
            <Button type="primary" size="default"  @click="submitSetting">{{$t('confrim')}}</Button>
         </div>
      </Modal>
   </div>
</template>

<script>
   import {getLegalTenderValue} from '_api/header.js'
   import {getHeaderTokenApi} from '_api/axios.js';
   import {AnnoucementList} from '_api/home'
   import moment from 'moment';
   import Cookies from 'js-cookie'
   import {relatNameVerify} from '../../../api/urls.js'

   export default {
      data() {
         return {
            styleObject: {//header 背景色
            },
            isLogin: true,
            countryLanguage: '',//选择语言菜单展示
            language: window.localStorage.getItem('countryLanguage') || 'zh-CN', //传参数
            legalTenderSelect: 'USD',
            animate: false,
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
            ],
            adArr: [],//banner图列表数组
            telegramURL:'',
         }
      },
      methods: {
         changeLangage(e) {
            let language = e.target.getAttribute('data-value');
            this.language = language
            this.$i18n.locale = language;
            window.localStorage.setItem('countryLanguage', language)
            if(language=='en'){
                this.countryLanguage = 'English';
                this.telegramURL='https://t.me/www55com_English';
            }else if(language=='vi'){
               this.countryLanguage = "Tiếng Việt";
               this.telegramURL='https://t.me/Vietnam_55globalmarkets';
            }else if(language=='ko'){
               this.countryLanguage = '한국어';
               this.telegramURL='https://t.me/korea_55globalmarket';
            }else if(language=='zh-CN'||lang=="zh"){
               this.countryLanguage = '简体中文';
               this.telegramURL='https://t.me/www55com_Mandarin';
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
         initAnnoucementList() {
            this.adArr = []
            AnnoucementList({language: this.language, fromSite: 'US'}).then(data => {
               data.map((v, i) => {
                  this.adArr.push({
                     title: v.title,
                     targetUrl: v.targetUrl,
                     createTime: moment(v.createTime).format('MM-DD')
                  })
               })
            })
         },
         scroll() {
            let con1 = this.$refs.con1;
            con1.style.marginTop = '-13px';
            this.animate = !this.animate;
            setTimeout(() => {
               this.adArr.push(this.adArr[0]);
               this.adArr.shift();
               con1.style.marginTop = '0px';
               this.animate = !this.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            }, 500)
         },
         verfiy() {
            let loginToken = Cookies.get('loginToken');
            getHeaderTokenApi(relatNameVerify, {}, loginToken).then((res) => {
               let status = res.data.checkStatus;
               let code = res.data.code;
               if(code=='10013'){
                  this.$Message.error(this.$t(10013));
               }
               if (status == 'CHECKING') {
                  window.location.href = '../../../../identityAuthentication/underReview.html';
               } else if (status == "PASSED") {
                  window.location.href = '../../../../identityAuthentication/passed.html';
               } else if (status == 'NOT_SET') {
                  window.location.href = '../../../../identityAuthentication/noAuthentication.html';
               } else if (status == 'FAILURE') {
                  window.location.href = '../../../../identityAuthentication/noPass.html';
               }
            }).catch((error)=>{
               console.log(error)
            })
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
               // window.location.reload();
            }, 500)
            this.$store.commit('changeLoingStatus', false);
            this.$router.push('/home');
         },
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
            this.language = val
            this.initAnnoucementList()
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
         if(language=='en'){
               this.countryLanguage = 'English';
               this.telegramURL='https://t.me/www55com_English';
         }else if(language=='vi'){
            this.countryLanguage = "Tiếng Việt";
            this.telegramURL='https://t.me/Vietnam_55globalmarkets';
         }else if(language=='ko'){
            this.countryLanguage = '한국어';
            this.telegramURL='https://t.me/korea_55globalmarket';
         }else if(language=='zh-CN'||lang=="zh"){
            this.countryLanguage = '简体中文';
            this.telegramURL='https://t.me/www55com_Mandarin';
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
         //公告滚动
         this.initAnnoucementList();
         this.timer = setInterval(this.scroll, 3000)
      },
      destroyed() {
         clearInterval(this.timer)
         
      }

   }
</script>

<style scoped lang="less">
   .color-fff {
      color: #fff;
   }

   .color-fff6 {
      color: rgba(255, 255, 255, 0.6);
   }

   .nav_box {
      &:hover {
         background: #15232C;
         .nav_top {
            background: #15232C;
         }
         .nav_middle {
            background: #15232C;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
         }
         .nav_bottom {
            background: #15232C;

        }
    }
    background: transparent;
    width:100%;
    color:rgba(255,255,255,0.7);
    transition: all .3s ease-in;
    position:absolute;
    top:0;
    left:0;
    z-index: 1000;
    a{
        color: rgba(255,255,255,0.5);
    }
    .header_content{
        width: 1200px;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
        .router-link-active{
            color: #fff;
        }
        .left{
            display: flex;
            align-items: center;
         }
         .right {
            display: flex;
            align-items: center;
         }
      }
      .cursorPoint{
         cursor: pointer;
      }
      //第三行导航
      .nav_bottom {
         transition: all .5s ease-in-out;
         background: transparent;
         font-size: 13px;
         .left {
            li {
               height: 48px;
               display: flex;
               align-items: center;
               padding: 0px 16px;
               &:first-child {
                  padding-left: 0;
               }
            }
            .bsite:hover {
               a {
                  color:rgba(0,120,255,1);
               }
            }
            .ssite:hover {
               a {
                  color:rgba(46,176,188,1);
               }
            }
            .fsite:hover {
               a {
                  color: rgba(203,170,92,1);
               }
            }
            .csite{
               // a{
               //    color: rgba(255,255,255,0.2);
               // }
               &:hover{a {
                  color: #7689A2
               }}
            }
            .lsite{
               a{
                  color: rgba(255,255,255,0.2);
               }
               &:hover{
                  a {
                     color: rgba(255,255,255,0.2);
                  }
               }
            }
            .psite{
               a{
                  color: rgba(255,255,255,0.2);
               }
               &:hover{
                  a {
                     color: rgba(255,255,255,0.2);
                  }
               }
            }
            .tradecenter {
               position: relative;
               text-align: center;
               width: 109px;
               display: flex;
               justify-content: center;
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
                     max-height: 400px;
                     overflow: hidden;
                  }
               }
               position: relative;
            }
            .tradeList {
               max-height: 0;
               overflow: hidden;
               transition: all .3s linear;
               position: absolute;
               background: #121F28;
               top: 48px;
               right: -21px;
               li {
                  width: 130px;
                  height: 35px;
                  padding-left: 17px;
                  padding-right: 0px;
                  span {
                     padding-left: 17px;
                  }
                  a {
                     width: 100%;
                     height: 100%;
                     display: flex;
                     align-items: center;
                     font-size: 12px;
                     color: rgba(255, 255, 255, 0.5);
                  }
                  &:hover {
                     background: #0D1820;
                     a {
                        color: rgba(255, 255, 255, 1);
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
         .right {
            font-size: 13px;
            .anim {
               transition: all 0.5s;
            }
            .adbox {
               height: 13px;
               overflow: hidden;
            }
            .adList {
               li {
                  height: 13px;
                  line-height: 13px;
                  a {
                     display: block;
                     height: 13px;
                     line-height: 13px;
                     display: flex;
                     &:hover {
                        color: #fff;
                     }
                  }
                  .point {
                     display: block;
                     width: 200px;
                     height: 13px;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     white-space: nowrap;
                     line-height: 13px;
                  }
                  .date {
                     display: block;
                     padding-left: 5px;
                     height: 13px;
                     line-height: 13px;
                  }
               }
            }
         }
      }
      //第二行导航
      .nav_middle {
         transition: all .5s ease-in-out;
         background: transparent;
         box-sizing: border-box;
         height: 64px;
         border-top: 1px solid rgba(255, 255, 255, 0);
         border-bottom: 1px solid rgba(255, 255, 255, 0.06);
         .left {
            .logo {
               display: flex;
               height: 64px;
               align-items: center;
               img {
                  display: block;
               }
               .logoline {
                  width: 1px;
                  height: 24px;
                  background: #fff;
                  margin: 0 14px 0 12px;
               }
               h1 {
                  font-size: 14px;
                  font-weight: bold;
               }
            }
         }
         .right {
            .login {
               display: flex;
               justify-content: center;
               align-items: center;
               width: 60px;
               height: 29px;
               font-size: 14px;
               color: rgba(255, 255, 255, 0.7);
               font-weight: 500;
               &:hover {
                  color: #fff;
               }
            }
            .register {
               border: 1px solid rgba(255, 255, 255, 0.7);
               &:hover {
                  color: #fff;
                  background: #12869A;
                  border: none;
                  // border: 1px solid rgba(255, 255, 255, 1);
               }
            }
            .banalance {
               height: 100%;
               margin-left: 30px;
               line-height: 64px;
               &:hover{
                  a{
                     color: #fff;
                  }
               }
            }

            .currency, .language {
               position: relative;
               &:hover {
                  ul {
                     max-height: 400px;
                  }
                  color: #fff;
                  i{
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
               &::-webkit-scrollbar {display:none}
               position: absolute;
               top: 50px;
               right: 0;
               max-height: 0;
               overflow: hidden;
               background: #121F28;
               transition: all .3s ease-in;
               li {
                  cursor: pointer;
                  width: 130px;
                  height: 35px;
                  line-height: 35px;
                  text-align: center;
                  border-right: none;
                  padding: 0;
                  a{
                     display: block;
                     width:100%;
                     height: 100%;
                  }
                  &:hover {
                     background: #0D1820;
                     a{
                        color: rgba(255, 255, 255, 1);
                     }
                  }
               }
            }


         }
      }
      //第一行导航
      .nav_top {
         background: rgba(255, 255, 255, 0.03);
         transition: all .5s ease-in-out;
         .nav-top-common {
            display: inline-block;
            height: 12px;
            line-height: 12px;
            font-size: 12px;
            padding: 0 20px;
            color: rgba(255, 255, 255, 0.6);
            border-right: 1px solid rgba(255, 255, 255, 0.08);
            &:hover {
               .color-fff
            }
         }
         .left {
            height: 32px;
            li {
               display: flex;
               align-items: center;
               span, i {
                  color: rgba(255, 255, 255, 0.6);
                  &:hover {
                     .color-fff;
                  }
               }
               a {
                  .nav-top-common;
               }
               .internationalLine{
                  border-right: 1px solid rgba(255, 255, 255, 0.08);
                  padding-right: 20px;
               }
               &:first-child, &:last-child {
                  a {
                     border-right: none;
                  }
               }
               .no-hover {
                  .color-fff6;
                  &:hover {
                     .color-fff6;
                  }
               }
            }
            .addspance {
               margin-right: 12px;
               cursor: pointer;
            }
         }
         .right {
            height: 32px;
            li {
               height: 32px;
               line-height: 32px;
               span {
                  .nav-top-common;
               }
               .child-hover {
                  &:hover {
                     a, i {
                        .color-fff;
                     }
                  }
               }
               .nav-icon {
                  a {
                     color: rgba(255, 255, 255, 0.3);
                     &:nth-child(2) {
                        padding: 0 24px;
                     }
                     &:hover {
                        .color-fff;
                     }
                  }
               }
            }
            .appdownload{
               position: relative;
               &:hover{
                  img{
                     width: 104px;
                     height: 104px;
                     display: block;
                  }
               }
               img{
                  border: 12px solid #121F28;
                  border-radius: 2px;
                  position: absolute;
                  top:29px;
                  left:-16px;
                  z-index: 1000;
                  display: none;
               }
            }
            .currencySetting{
               cursor: pointer;
            }
            .language {
               position: relative;
               min-width: 80px;
               span{
                  padding-right: 0;
                  border-right: none;
               }
               .dropList {
                  position: absolute;
                  top: 33px;
                  right: 0;
                  max-height: 0;
                  overflow: hidden;
                  z-index: 1100;
                  background: #121F28;
                  transition: all .3s linear;
                  li {
                     cursor: pointer;
                     width: 130px;
                     height: 35px;
                     line-height: 35px;
                     text-align: center !important;
                     &:hover {
                        background: #0D1820;
                        color:#fff;
                     }
                  }
               }
               // 语言hover
               &:hover {
                   .dropList{
                     max-height:400px;
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
                  -webkit-transition: -webkit-transform .3s ease-in;
                  -webkit-backface-visibility: hidden;
                  -moz-transition: -moz-transform .3s ease-in;
                  -o-transition: -o-transform .3s ease-in;
                  transition: transform .3s ease-in;
               }

            }
         }
      }
   }
</style>