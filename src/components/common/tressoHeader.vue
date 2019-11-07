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
                           <a class="nav-link u-header__nav-link" @click="gbboHref()">GBBO™</a>
                        </li>
                        <li
                           class="nav-item u-header__nav-item header-box header-box">
                           <a href="https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ" target="_blank"
                              class="nav-link u-header__nav-link">
                              FAQ
                           </a>
                        </li>
                     </ul>
                     <!--login-->
                     <ul class="navbar-nav u-header__navbar-nav" v-if="!isLogin">
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
                                    Account & Security
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
   </div>
</template>

<script>
   import {postHeaderTokenBodyApi} from "_api/axios.js";
   import {logout,} from "../../../api/urls.js";
   import {getUserInfo} from "_api/balances.js";
   import {clearLocalStorage} from "../../config/index";

   export default {
      name: 'tressoHeader',
      data() {
         return {
            isLogin: false,
         };
      },
      methods: {
         gbboHref() {
            if (location.href.includes('/home')) {
               location.href = '#GBBO'
            } else {
               this.$router.push('/home')
            }
         },
         //实名信息
         getUserInfo() {
            return new Promise(resolve => {
               getUserInfo({
                  userId: localStorage.getItem('loginUserId')
               }, $cookies.get('loginToken')).then(res => {//实名认证
                  if (res.data) {
                     resolve(res.data['identifyState'])
                  }
               })
            })
         },
         verfiy() {
            this.getUserInfo().then(res => {
               switch (res) {
                  case 'INIT':
                     this.$router.push("/kyc");
                     break
                  case 'SUBMIT':
                     this.$router.push('/identityResult')
                     break
                  case 'SUCCESS':
                     this.$router.push('/identityResult')
                     break
                  case 'FAIL':
                     this.$router.push('/identityResult')
                     break
               }
            })
         },
         quitFun() {
            postHeaderTokenBodyApi(logout, $cookies.get("loginToken"), {}).then(
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
         },
      },
      mounted() {
         //判断是否登录有效
         let isLogin = this.$store.state.app.isLogin;
         if (isLogin) {
            this.isLogin = true;
         } else {
            this.isLogin = false;
         }
         document.onclick = function () {
            if (document.getElementsByClassName('hs-mega-menu-opened')[0]) {//交易
               setTimeout(() => {
                  document.getElementsByClassName('hs-mega-menu-opened')[0].childNodes[1].style.display = 'none'
               }, 300)
            } else if (document.getElementsByClassName('hs-sub-menu-opened')[0]) {
               setTimeout(() => {
                  document.getElementsByClassName('hs-sub-menu-opened')[0].childNodes[1].style.display = 'none'
               }, 300)
            }
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
      .hs-has-sub-menu {
         a {
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