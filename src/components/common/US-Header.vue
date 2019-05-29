<template>
 <!-- ========== HEADER ========== -->
  <header id="header" class="u-header u-header--abs-top u-header--bg-transparent u-header--white-nav-links-md u-header--show-hide"
          data-header-fix-moment="500"
          data-header-fix-effect="slide">
    <div class="u-header__section ">
         <!-- <Alert banner closable type="warning">Notice: notification contents...</Alert> -->
         <div class="m-auto py-2" id="transfer_container">
            <!-- Form -->
                <form class="js-validate js-form-message">
                    <div class="js-focus-state input-group input-group-lg u-form u-form--lg u-form--white-brd">
                    <div class="row align-items-md-center m-auto">
                        <div class="col-lg-4 mb-4 mb-lg-0">
                            <form class="js-focus-state input-group u-form">
                                <div class="input-group-prepend u-form__prepend">
                                <span class="input-group-text input-group-text">
                                    I want to withdraw 
                                </span>
                                </div>
                                <input type="search" class="form-control" placeholder="" aria-label="" v-model="header_count">
                            </form>
                        </div>

                        <div class="col-sm-6 col-lg-2 mb-4 mb-lg-0">
                            <select class="custom-select" v-model="header_coin">
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                            </select>
                        </div>
                        <span class="u-header__navbar-brand-on-scroll">to</span>
                        <span class="u-header__navbar-brand-default text-white">to</span>
                        <div class="col-sm-6 col-lg-3 mb-4 mb-lg-0">
                            <select class="custom-select" v-model="header_account">
                            <option selected value="Bank">Bank Account</option>
                            <option value="more to come">more to come</option>
                            </select>
                        </div>
                            <!-- End Language -->
                        <div class="input-group-append u-form__append">
                            <div class="btn btn-warning u-btn-wide" @click="gotoTransfer">Withdraw Now</div>
                        </div>
                        </div>
                    
                    </div>
                </form>
            <!-- End Form -->
         </div>
      <div id="logoAndNav" class="container">
        <!-- Nav -->
        <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar">
          <!-- Logo -->
          <router-link class="navbar-brand u-header__navbar-brand" to="/home" aria-label="Front">
            <img class="u-header__navbar-brand-default" src="../../assets/images/logo2@x2.png" alt="Logo" style="width:154px;height:45px">
            <img class="u-header__navbar-brand-on-scroll" src="../../assets/images/logo1@x2.png" alt="Logo" style="width:154px;height:45px">
          </router-link>
          <!-- End Logo -->

          <!-- Responsive Toggle Button -->
          <button type="button" class="navbar-toggler btn u-hamburger u-hamburger--white"
                  aria-label="Toggle navigation"
                  aria-expanded="false"
                  aria-controls="navBar"
                  data-toggle="collapse"
                  data-target="#navBar">
            <span id="hamburgerTrigger" class="u-hamburger__box">
              <span class="u-hamburger__inner"></span>
            </span>
          </button>
          <!-- End Responsive Toggle Button -->

          <!-- Navigation -->
          <div id="navBar" class="collapse navbar-collapse py-0">
            <div class="js-scrollbar u-header--abs-top__inner ml-lg-auto">
              <ul class="navbar-nav u-header__navbar-nav">
                <!-- 币币交易 -->
                <li class="nav-item hs-has-sub-menu u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                    <a id="pagesMegaMenu" class="nav-link u-header__nav-link" href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-labelledby="pagesSubMenu">
                    Cryptocurrency Assets
                    <span class="fa fa-angle-down u-header__nav-link-icon"></span>
                    </a>

                    <!-- Pages - Submenu -->
                    <ul id="pagesSubMenu" class="list-inline hs-sub-menu u-header__sub-menu py-3 mb-0" style="min-width: 220px;"
                        aria-labelledby="pagesMegaMenu">
                    <!-- BTC -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkPagesAbout" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesAbout">
                        BTC
                        <span class="fa fa-angle-right u-header__sub-menu-nav-link-icon"></span>
                        </a>

                        <!-- Submenu (level 2) -->
                        <ul id="navSubmenuPagesAbout" class="hs-sub-menu list-unstyled u-header__sub-menu u-header__sub-menu-menu-gutter--y u-header__sub-menu-offset" style="min-width: 220px;"
                            aria-labelledby="navLinkPagesAbout">
                        <li class="dropdown-item px-0">
                            <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'BTCUSD'}}">BTC/USD Trading</router-link>
                        </li>
                        <li class="dropdown-item px-0">
                            <a class="nav-link u-list__link px-4" :href="btcCommunityURL" target="_blank">BTC Community</a>
                        </li>
                        </ul>
                        <!-- End Submenu (level 2) -->
                    </li>
                    <!-- BTC -->

                    <!-- ETH -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkPagesServices" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesServices">
                        ETH
                        <span class="fa fa-angle-right u-header__sub-menu-nav-link-icon"></span>
                        </a>

                        <!-- Submenu (level 2) -->
                        <ul id="navSubmenuPagesServices" class="hs-sub-menu list-unstyled u-header__sub-menu u-header__sub-menu-menu-gutter--y u-header__sub-menu-offset" style="min-width: 220px;"
                            aria-labelledby="navLinkPagesServices">
                        <li class="dropdown-item px-0">
                            <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'ETHBTC'}}">ETH/BTC Trading</router-link>
                        </li>
                        <li class="dropdown-item px-0">
                            <a class="nav-link u-list__link px-4" :href="ethCommunityURL" target="_blank">ETH Community</a>
                        </li>
                        </ul>
                        <!-- End Submenu (level 2) -->
                    </li>
                    <!-- ETH -->

                    <!-- DASH -->
                    <!-- <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkPagesCareers" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesCareers">
                        DASH
                        <span class="fa fa-angle-right u-header__sub-menu-nav-link-icon"></span>
                        </a>

                        <ul id="navSubmenuPagesCareers" class="hs-sub-menu list-unstyled u-header__sub-menu u-header__sub-menu-menu-gutter--y u-header__sub-menu-offset" style="min-width: 220px;"
                            aria-labelledby="navLinkPagesCareers">
                        <li class="dropdown-item px-0">
                            <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'DASHBTC'}}">DASH/BTC Trading</router-link>
                        </li>
                        <li class="dropdown-item px-0">
                            <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'DASHETH'}}">DASH/ETH Trading</router-link>
                        </li>
                        </ul>
                    </li> -->
                    <!-- DASH end  -->

                    <!-- LTC -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkPagesLogin" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesLogin">
                        LTC
                        <span class="fa fa-angle-right u-header__sub-menu-nav-link-icon"></span>
                        </a>

                        <!-- Submenu (level 2) -->
                        <ul id="navSubmenuPagesLogin" class="hs-sub-menu list-unstyled u-header__sub-menu u-header__sub-menu-menu-gutter--y u-header__sub-menu-offset" style="min-width: 220px;"
                            aria-labelledby="navLinkPagesLogin">
                            <li class="dropdown-item px-0">
                                <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'LTCBTC'}}">LTC/BTC Trading</router-link>
                            </li>
                            <li class="dropdown-item px-0">
                                <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'LTCETH'}}">LTC/ETH Trading</router-link>
                            </li>
                            <!-- <li class="dropdown-item px-0">
                                <a class="nav-link u-list__link px-4" href="../pages/signup-simple.html">LTC Community</a>
                            </li> -->
                        </ul>
                        <!-- End Submenu (level 2) -->
                    </li>
                    <!-- LTC -->
                    <!-- ZEC -->
                    <!-- <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkPagesLogin" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesLogin">
                        ZEC
                        <span class="fa fa-angle-right u-header__sub-menu-nav-link-icon"></span>
                        </a>

                        <ul id="navSubmenuPagesLogin" class="hs-sub-menu list-unstyled u-header__sub-menu u-header__sub-menu-menu-gutter--y u-header__sub-menu-offset" style="min-width: 220px;"
                            aria-labelledby="navLinkPagesLogin">
                            <li class="dropdown-item px-0">
                                <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'ZECBTC'}}">ZEC/BTC Trading</router-link>
                            </li>
                            <li class="dropdown-item px-0">
                                <router-link class="nav-link u-list__link px-4" :to="{path:'/exchange',query: {symbol:'ZECETH'}}">ZEC/ETH Trading</router-link>
                            </li>
                        </ul>
                    </li> -->
                    <!-- ZEC -->

                    <!-- Contacts -->
                    <!-- <li class="dropdown-item hs-has-sub-menu">
                        <a id="navLinkContactsServices" target="_blank" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="https://global.55.com/#/home"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuContactsServices">
                            Token Swap on 55 Global
                        </a>
                    </li> -->
                    <!-- Contacts -->

                    </ul>
                    <!-- End Pages - Submenu -->
                </li>
                <!-- End 币币交易 -->

                <!-- 椰子 -->
                <li class="nav-item hs-has-mega-menu u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut"
                    data-max-width="440px"
                    data-position="right">
                    <a id="shopMegaMenu" class="nav-link u-header__nav-link" href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Collectible Assets
                    <span class="fa fa-angle-down u-header__nav-link-icon"></span>
                    </a>

                    <!-- Shop - Mega Menu -->
                    <div class="hs-mega-menu u-header__sub-menu u-header__mega-menu-position-right-fix" aria-labelledby="shopMegaMenu">
                    <!-- Mega Menu Banner -->
                    <div class="d-none d-md-block u-header__banner-v2 pr-4">
                        <div class="d-flex align-items-end">
                        <img class="img-fluid mr-4" src="assets/svg/bg/supreme.png" alt="Image Description" style="width: 200px;">
                        <div class="py-4">
                            <div class="mb-4">
                            <strong class="d-block u-header__banner-v2-title mb-2 text-primary-55">Supreme Token</strong>
                            <span class="d-block u-header__banner-v2-text">Asset backed token supported by Supreme products</span>
                            </div>
                            <button data-v-de088f66="" type="button" class="btn btn-xs btn-secondary u-btn-secondary u-btn-wide transition-3d-hover text-left mb-2"><span><span data-v-de088f66="" class="d-flex mr-3"><span data-v-de088f66=""></span></span><span data-v-de088f66="" class="media-body"><span data-v-de088f66="" class="d-block">coming soon</span><strong data-v-de088f66="" class="font-size-14">Buy Supreme Token</strong></span></span></button>
                            <!-- <a class="btn btn-sm btn-primary  transition-3d-hover text-white" @click="gotoYEEZY" >Buy YEEZY Token <span class="fa fa-angle-right ml-2"></span></a> -->
                        </div>
                        </div>
                    </div>
                    <!-- End Mega Menu Banner -->
                    </div>
                    <!-- End Shop - Mega Menu -->
                </li>
                <!-- End 椰子 -->

                <!-- Starter - Link -->
                <li class="nav-item">
                    <a class="nav-link u-header__nav-link" :href="socialURL" target="_blank">
                    Social Trading
                    </a>
                </li>
                <!-- End Starter - Link -->
                <!-- Starter - Link -->
                <li class="nav-item">
                    <a class="nav-link u-header__nav-link" href="#55card">
                    55 Debit Card
                    </a>
                </li>
                <!-- End Starter - Link -->
                <!-- Starter FF- Link -->
                <!-- <li class="nav-item">
                    <a class="nav-link u-header__nav-link" href="../../starter/index.html">
                    FF
                    </a>
                </li> -->
                <!-- End Starter  FF- Link -->
                <!-- Starter Order - Link -->
                <li class="nav-item" v-if="isLogin">
                    <router-link to='/order' class="nav-link u-header__nav-link">{{$t('homeOrder')}}</router-link>
                </li>
                <!-- End Starter - Link -->
                <!-- 我的资产 -->
                <li v-if="isLogin" class="nav-item hs-has-sub-menu u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                    <a id="pagesMegaMenu" class="nav-link u-header__nav-link" href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-labelledby="pagesSubMenu">
                    Balances
                    <span class="fa fa-angle-down u-header__nav-link-icon"></span>
                    </a>

                    <!-- Pages - Submenu -->
                    <ul id="pagesSubMenu" class="list-inline hs-sub-menu u-header__sub-menu py-3 mb-0" style="min-width: 220px;"
                        aria-labelledby="pagesMegaMenu">
                    <!-- BTC -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <router-link id="navLinkPagesAbout" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" 
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesAbout"
                        to='/balances'>
                        <!-- Deposit & Withdrawal -->
                        {{$t('zcDeposit')}} & {{$t('zcWithdrawal')}}
                        </router-link>
                    </li>
                    <!-- BTC -->

                    <!-- ETH -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <router-link id="navLinkPagesServices" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" 
                        aria-haspopup="true"
                        aria-expanded="false"
                        to='/transaction_history'
                        aria-controls="navSubmenuPagesServices">
                        {{$t('tbdhTransactionHistory')}}
                        </router-link>
                    </li>
                    <!-- ETH -->
                    </ul>
                    <!-- End Pages - Submenu -->
                </li>
                <!-- End 我的资产  -->

                <!-- 个人中心 -->
                <li v-if="isLogin" class="nav-item hs-has-sub-menu u-header__nav-item"
                    data-event="hover"
                    data-animation-in="slideInUp"
                    data-animation-out="fadeOut">
                    <a id="pagesMegaMenu" class="nav-link u-header__nav-link" href="javascript:;"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-labelledby="pagesSubMenu">
                     <Icon type="md-person" size="16"/>
                    <span class="fa fa-angle-down u-header__nav-link-icon"></span>
                    </a>

                    <!-- Pages - Submenu -->
                    <ul id="pagesSubMenu" class="list-inline hs-sub-menu u-header__sub-menu py-3 mb-0" style="min-width: 220px;"
                        aria-labelledby="pagesMegaMenu">
                    <!-- Account -->
                    <li class="dropdown-item hs-has-sub-menu">
                        <router-link id="navLinkPagesAbout" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" 
                        to='/safeCenter'
                        >
                        {{$t('tbdhAccountSecurity')}}
                        </router-link>
                    </li>
                    <!-- Account -->

                    <!-- ID Verification -->
                    <li class="dropdown-item hs-has-sub-menu" @click="verfiy">
                        <a id="navLinkPagesServices" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" 
                        aria-haspopup="true"
                        aria-expanded="false"
                        href="javascript:;"
                        aria-controls="navSubmenuPagesServices">
                        {{$t('tbdhIDVerification')}}
                        </a>
                    </li>
                    <!-- ID Verification -->
                    <!-- Invite Friends -->
                    <li class="dropdown-item hs-has-sub-menu"  @click="L2verify">
                        <a id="navLinkPagesServices" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" 
                        aria-haspopup="true"
                        aria-expanded="false"
                        href="javascript:;"
                        aria-controls="navSubmenuPagesServices">
                        {{$t('kyc2')}}
                        </a>
                    </li>
                    <!-- Invite Friends -->
                    <!-- Log Out -->
                    <li class="dropdown-item hs-has-sub-menu" @click="quitFun">
                        <a id="navLinkPagesServices" class="nav-link u-header__sub-menu-nav-link u-list__link py-2" href="javascript:;"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="navSubmenuPagesServices"
                        
                        >
                        Log Out
                        </a>
                    </li>
                    <!-- Log Out -->
                    </ul>
                    <!-- End Pages - Submenu -->
                </li>
                <!-- End 我的资产  -->
                <!-- Starter - Link -->
                <li v-if="!isLogin" class="nav-item">
                    <router-link class="nav-link u-header__nav-link" to="/login">
                    Log In
                    </router-link>
                </li>
                <!-- End Starter - Link -->

                <!-- Button -->
                <li v-if="!isLogin" class="nav-item d-none d-md-inline-block pl-3 pr-0">
                  <router-link class="btn btn-sm btn-primary u-btn-primary transition-3d-hover"  to="/register">
                    Sign Up
                  </router-link>
                </li>
                <!-- End Button -->
              </ul>
            </div>
          </div>
          <!-- End Navigation -->
        </nav>
        <!-- End Nav -->
      </div>
    </div>
  </header>
  <!-- ========== END HEADER ========== -->
</template>

<script>
   import { clearLocalStorage } from '@/config'
   import {getLegalTenderValue} from '_api/header.js'
   import {getHeaderTokenApi} from '_api/axios.js';
   import {relatNameVerify,amlqueryState,logout} from '../../../api/urls.js'
   import Cookies from 'js-cookie'
   import {getCommouityBaseURL} from '../../config/index'
   import {postHeaderTokenBodyApi} from '_api/axios'

    export default {
        data() {
            return {
                isLogin: this.$store.state.app.isLogin,
                model4:'BTC',
                coinList:[
                     {value: 'BTC',label: 'BTC'},
                     {value: 'BCH',label: 'BCH'},
                     {value: 'ETH',label: 'ETH'},
                     {value: 'LTC',label: 'LTC'},
                ],
                accountName:'',
                //头部汇款
                header_count:'',
                header_coin:'BTC',
                header_account:'Bank',
                btcCommunityURL:'',
                socialURL:'',
                ethCommunityURL:'',
                loginToken:'',
                chatToken:'',
            }
        },
        methods: {
            gotoTransfer(){
                this.$router.push({
                    path:'/interFinanceOne',
                    query:{
                        count:this.header_count,
                        coin:this.header_coin,
                        account:this.header_account
                    }
                })
                // this.$router.push({
                //         path:'/StockToken',
                //         query:{
                //             symbol:0,
                //             baseAsset:1
                //         }
                //     })
            },
            quitFun(){
                postHeaderTokenBodyApi(logout,Cookies.get('loginToken'),{}).then((res)=>{
                    console.log(res)
                })
                clearLocalStorage()
                this.$store.commit('changeLoingStatus', false);
                this.$router.push('/home');
            },
            initURL(){
                this.loginToken = Cookies.get('loginToken')
                if(this.loginToken){
                    postHeaderTokenBodyApi('api/sso/social/get-token',this.loginToken,null).then(data => {
                        this.chatToken = data.token +'/'
                        // this.iframeURL = `${CHAT_URL.baseURL}${this.chatToken}/`+encodeURIComponent(`${CHAT_URL.englishURL}`)
                        //社区链接
                        this.ethCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967252480964431879/feed')
                        this.btcCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967252342116192258/feed')
                        this.socialURL =  getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken
                    })
                }else{
                    this.chatToken = 'null/'
                    //社区链接
                    this.ethCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967252480964431879/feed')
                    this.btcCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967252342116192258/feed')
                    this.socialURL =  getCommouityBaseURL()
                }
            },
            gotoYEEZY(){
                this.$router.push({ name: 'exchange', query: { site: 'C' }})
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
                    this.$router.push('/identiy')
                } else {
                    this.$router.push('/identityResult')
                }
            
                }).catch((error) => {
                console.log(error)
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
        },
        computed: {
         loginStatus() {
            return this.$store.state.app.isLogin;
         },
      },
      watch: {
         loginStatus(val, oldVal) {
            if (val) {
               this.isLogin = true;
            } else {
               this.isLogin = false;

            }
            setTimeout(()=>{
                this.initURL()
            },1000)
            
         },
      },
        mounted(){
             // initialization of HSMegaMenu component
                $('.js-mega-menu').HSMegaMenu({
                    event: 'hover',
                    pageContainer: $('.container'),
                    breakpoint: 768,
                    hideTimeOut: 0
                });
            // initialization of header
                $.HSCore.components.HSHeader.init($('#header'));

           this.initURL()



        }
    }
</script>

<style lang="less" scoped>
@media screen and (min-width:320px) and(max-width:970px){
    #transfer_container{
        display: none;
    }
}
</style>