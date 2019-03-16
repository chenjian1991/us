<template>
<div>
    <div class="tradeHeaderbox">
    <ul class="left">
      <li class="logo">
        <router-link to='/home'><img src="../../assets/images/logo/logo.png" width="40px" height="28px" alt></router-link>
      </li>
      <li class="tradecenter">
            <router-link :to="{path:'/exchange',query: {site: 'B',symbol:'ETHBTC'}}">{{$t('headerexchangecenter')}} <Icon type="md-arrow-dropdown" size="16" class="triangle"/></router-link>
           <ul class="tradeList">
                <li><router-link :to="{path:'/exchange',query: {site: 'B'}}"><i class="icon btcIcon"> </i><span>{{$t('BExchange')}}</span></router-link></li>
                <!-- <li><router-link :to="{path:'/exchange',query: {site: 'S'}}"><i class="icon klineIcon"></i> <span>{{$t('SExchange')}}</span></router-link></li>
                <li><router-link :to="{path:'/exchange',query: {site: 'F'}}"><i class="icon exchangeIcon"></i> <span>{{$t('FExchange')}}</span></router-link></li> -->
                <li><router-link :to="{path:'/exchange',query: {site: 'C'}}"><i class="icon logoIcon"></i> <span>{{$t('headercoustomerchain')}}</span></router-link></li>
                <!-- <li><router-link :to="{path:'/Bhome',query: {site: 'B'}}"><i class="icon personIcon"></i> <span>个人交易</span></router-link></li>
                <li><router-link :to="{path:'/Bhome',query: {site: 'B'}}"><i class="icon shopIcon"></i> <span>本地商业交易</span></router-link></li> -->
            </ul>
        </li>
        <li>
            <!-- <a href="http://otc.55.com">OTC</a> -->
        </li>
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
            <a href class="login register">
            <router-link class="loginRouter" to="/register">{{$t('HomeSignup')}}</router-link>
            </a>
        </li>
        </ul>
        <ul class="right" v-else>
        <li class="banalance">
            <router-link to="/order" class="order">{{$t('homeOrder')}}</router-link>
        </li>
        <!-- 资产 -->
        <li class="currency banalance">
            {{$t('homeBalances')}}
            <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
            <ul class="dropList">
            <!-- 资产 -->
            <li>
                <router-link to="/balances">{{$t('homeBalances')}}</router-link>
            </li>
            <li>
                <router-link to="/transaction_history">{{$t('tbdhTransactionHistory')}}</router-link>
            </li>
            </ul>
        </li>
        <li class="language banalance">
            <Icon type="md-person" size="16"/>
            <ul class="dropList">
            <!-- 安全中心 -->
            <li>
                <router-link to="/safeCenter">{{$t('tbdhAccountSecurity')}}</router-link>
            </li>
            <li @click="verfiy">
                {{$t('tbdhIDVerification')}}
            </li>
            <!-- <li>
                <a href="../../../invitation/invitationCode.html" name="invitePeople">{{$t('invitePeople')}}</a>
            </li> -->
            <li @click="quitFun">{{$t('tbdhLogout')}}</li>
            </ul>
        </li>
        </ul>
        <ul class="languageBox">
            <li class="currency aaa" @click="openSetting">{{$t('headerSetting')}}</li>
            <!-- <li class="language">{{countryLanguage}} <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
                <ul class="dropList" @click="changeLangage">
                    <li data-value="en">English</li>
                    <li data-value="ko">한국어</li>
                    <li data-value="vi">Tiếng Việt</li>
                    <li data-value="zh-CN">简体中文</li>
                </ul>
            </li> -->
        </ul>

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
            <Button type="primary" size="default" @click="submitSetting">{{$t('confrim')}}</Button>
        </div>
    </Modal>
  </div>
    <IP/>
</div>

</template>

<script>
import {getLegalTenderValue} from '_api/header.js'
import {getHeaderTokenApi} from '_api/axios.js';
import {relatNameVerify} from '../../../api/urls.js'
import IP from './IPTIPS.vue'
import Cookies from 'js-cookie'

export default {
    components: {
         IP
    },
    data() {
        return {
            isLogin: true,
            modal1:false,
            countryLanguage:'',
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
         openSetting() {
            this.modal1 = true;
         },
            changeLangage(e) {
                let language = e.target.getAttribute('data-value');
                this.language  = language
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
                }
                this.$store.commit('changeCurentLange', language);
            },
            submitSetting() {
                this.getLegalTenderData()
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
            // changeCurrency(e){
            //     this.legalTenderSelect = e.target.getAttribute('data-value');
            //     let param = {} 
            //     param.fromCurrency = 'USD'
            //     param.toCurrency = this.legalTenderSelect
            //     getLegalTenderValue(param).then(result => {
            //     let info = {name: result.toCurrency, rate: result.rate}
            //     localStorage.setItem('currentCurrency', JSON.stringify(info))
            //     //目标页面监听store中的数据变动
            //     this.$store.commit('changeCurrencyState', result.toCurrency);
            //     this.modal1 = false
            //     // window.location.reload()
            //     })               
            // },
            // initAnnoucementList(){
            //     AnnoucementList({language:this.language,fromSite:'ALL'}).then(data =>{
            //         data.map((v,i) => {
            //             this.adArr.push({title:v.title,targetUrl:v.targetUrl,createTime:moment(v.createTime).format('MM-DD')})
            //         })
            //     })
            // },
            // scroll(){
            //     let con1 = this.$refs.con1;
            //     con1.style.marginTop='-12px';
            //     this.animate=!this.animate;
            //     setTimeout(() =>{
            //         this.adArr.push(this.adArr[0]);
            //         this.adArr.shift();
            //         con1.style.marginTop='0px';
            //         this.animate=!this.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            //     },500)
            // },
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
        },
    computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            loginStatus(){
                return this.$store.state.app.isLogin;
            },
            headerColor(){
                return this.$store.state.app.backgroundHeader
            }
        },
        watch:{
            languageChange(val,oldVal){//监听全局语言的状态
                // this.initAnnoucementList()
            },
            loginStatus(val,oldVal){
                if(val){
                    this.isLogin = true;
                }else{
                    this.isLogin = false;
                }
            },
            headerColor(){
                this.styleObject = {
                    background : this.$store.state.app.backgroundHeader
                }
            }
        },
        mounted(){
            // this.$i18n.locale = window.localStorage.getItem('countryLanguage') || 'en-US';
            //设置Header颜色
            this.styleObject = {background : this.$store.state.app.backgroundHeader}
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
            // //公告滚动
            // this.initAnnoucementList();
            // this.timer = setInterval(this.scroll,2000)
        },
};
</script>

<style scoped lang="less">
.tradeHeaderbox {
  height: 60px;
  width: 100%;
  padding: 0 20px;
  background: #15232c;
  display: flex;
  justify-content: space-between;
  a{
        color: rgba(255,255,255,0.5);
        &:hover{
            color: #fff;
        }
  }
  .left {
    display: flex;
    align-items: center;
    li{
        margin-right: 39px;
        height: 60px;
        line-height: 60px;
    }
    .tradecenter{
        width: 90px;
        text-align: center;
        .triangle{
            -webkit-transition:-webkit-transform .2s ease-in;
            -webkit-backface-visibility:hidden;
            -moz-transition:-moz-transform .2s ease-in;
            -o-transition:-o-transform .2s ease-in;
            transition:transform .2s ease-in;
        }
        &:hover{
            background: #121F28;
            .triangle{
                -moz-transform:rotate(180deg);
                -moz-transform-origin:50% 45%;
                -webkit-transform:rotate(180deg);
                -webkit-transform-origin:50% 45%;
                -o-transform:rotate(180deg);
                -o-transform-origin:50% 45%;
                transform:rotate(180deg);
                transform-origin:50% 45%;
            }
            .tradeList{
                max-height: 500px;
                overflow: auto;
            }
        }
        position: relative;
    }
    .tradeList{
        position: absolute;
        background: #121F28;
        max-height: 0px;
        overflow: hidden;
        transition: max-height .3s ease-in-out;
        top:60px;
        left:0px;
        z-index: 1000;
        li{
            width:170px;
            height:35px;
            line-height: 35px;
            padding-left:17px;
            padding-right: 0px;
            margin: 0;
            span{
                padding-left:17px;
            }
            a{
                display: flex;
                align-items: center;
                font-size:12px;
                color:rgba(255,255,255,0.5);
            }
            &:hover{
                background:#0D1820;
                a{
                        color:rgba(255,255,255,1);
                }
                .icon{
                    opacity: 1;
                }
            }
            .icon{
                display: inline-block;
                width: 13px;
                height: 11px;
            }
            .btcIcon{
                background: url('../../assets/images/common/header/btc_active.png') center center;
                background-size:13px 13px;
                opacity:0.5;
            }
            .klineIcon{
                background: url('../../assets/images/common/header/kline_active.png') center center;
                background-size:13px 11px;
                opacity:0.5;
            }
            .exchangeIcon{
                background: url('../../assets/images/common/header/exchange_active.png') center center;
                background-size:13px 11px;
                opacity:0.5;
            }
            .logoIcon{
                background: url('../../assets/images/common/header/logo_active.png') center center;
                background-size:13px 11px;
                opacity:0.5;
            }
            .personIcon{
                background: url('../../assets/images/common/header/person_active.png') center center;
                background-size:13px 11px;
                opacity:0.5;
            }
            .shopIcon{
                background: url('../../assets/images/common/header/shop_active.png') center center;
                background-size:13px 11px;
                opacity:0.5;
            }
        }
    } 
  }
//   货币选择 语言
  .rightBox{
      display: flex;
      align-items: center;
      .languageBox{
            display: flex;
            align-items: center;
            .currency{
                border-left: 1px solid #27343C;
                padding: 0 29px;
                margin-left:29px;
            }
            .currency,.language{
                color:rgba(255,255,255,0.5);
                position: relative;
                cursor: pointer;
                min-width: 80px;
                &:hover{
                    color: #fff;
                    ul{
                        // display: block;
                        max-height: 800px;
                        li{
                            a{
                                color: #fff;
                            }
                        }
                    }
                    .triangle{
                        -moz-transform:rotate(180deg);
                        -moz-transform-origin:50% 45%;
                        -webkit-transform:rotate(180deg);
                        -webkit-transform-origin:50% 45%;
                        -o-transform:rotate(180deg);
                        -o-transform-origin:50% 45%;
                        transform:rotate(180deg);
                        transform-origin:50% 45%;
                    }
                }
                .triangle{
                    -webkit-transition:-webkit-transform .2s ease-in;
                    -webkit-backface-visibility:hidden;
                    -moz-transition:-moz-transform .2s ease-in;
                    -o-transition:-o-transform .2s ease-in;
                    transition:transform .2s ease-in;
                }
            } 
             .dropList{
                 &::-webkit-scrollbar {display:none};
                position: absolute;
                top:32px;
                right:0;
                z-index: 1100;
                max-height: 0px;
                overflow: hidden;
                transition: max-height .3s ease-in-out;
                background: #121F28;
                li{
                    cursor: pointer;
                    width:130px;
                    height: 35px;
                    line-height: 35px;
                    text-align: center !important;
                    border-right: none;
                    padding:0;
                    color:rgba(255,255,255,0.5);
                    a{
                        display: block;
                        width:100%;
                        height: 100%;
                    }
                    &:hover{
                        background: #0D1820;
                        color:#fff;
                    }
                }
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
      width: 60px;
      height: 29px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 500;
      &:hover {
        color: #fff;
     
      }
    }
    .register {
      border: 1px solid rgba(255, 255, 255, 0.5);
      &:hover {
        border: none;
        background: #12869A;
        a{
            color: #fff;
        }
      }
    }
    .banalance {
      height: 100%;
      margin-left: 30px;
      line-height: 60px;
      a{
        color: rgba(255,255,255,0.5)
      }
      &:hover{
          .order{
              color: #fff;
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
        max-height:300px;
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
      &::-webkit-scrollbar {display:none};
      position: absolute;
      top: 60px;
      right: 0;
      max-height: 0px;
      overflow: hidden;
      transition: max-height .3s ease-in-out;
    //   display: none;
      z-index: 1000;
      background: #121f28;
      li {
        cursor: pointer;
        width: 130px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-right: none;
        padding: 0;
        color: rgba(255, 255, 255, 0.5);
        a{
            color: rgba(255, 255, 255, 0.5);
            display: block;
            width:100%;
            height: 100%;
        }
        &:hover {
          background: #0d1820;
          a{
              color: #fff;
          }
          color: #fff;
        }
      }
    }
  }
}
</style>