<template>
   <!-- Breadcrumb Section -->
   <div class="bg-primary">
      <div class="container space-top-1 pb-3">
         <div class="row">
            <div class="col-lg-5 order-lg-2 text-lg-right mb-4 mb-lg-0">
               <div
                  class="d-flex d-lg-inline-block justify-content-between justify-content-lg-end align-items-center align-items-lg-start">
                  <!-- Breadcrumb -->
                  <ol class="breadcrumb breadcrumb-white breadcrumb-no-gutter mb-0">
                     <li class="breadcrumb-item">
                        <router-link to="/home" class="breadcrumb-link">{{$t('headerhome')}}</router-link>
                     <li class="breadcrumb-item">
                        <router-link to="/Dashboard" class="breadcrumb-link">{{$t('账户')}}</router-link>
                     </li>
                     <!-- <li class="breadcrumb-item active" aria-current="page">{{name}} </li> -->
                  </ol>
                  <!-- End Breadcrumb -->

                  <!-- Breadcrumb Nav Toggle Button -->
                  <div class="d-lg-none">
                     <button type="button" class="navbar-toggler btn u-hamburger u-hamburger--white"
                             aria-label="Toggle navigation"
                             aria-expanded="false"
                             aria-controls="breadcrumbNavBar"
                             data-toggle="collapse"
                             data-target="#breadcrumbNavBar">
                  <span id="breadcrumbHamburgerTrigger" class="u-hamburger__box">
                    <span class="u-hamburger__inner"></span>
                  </span>
                     </button>
                  </div>
                  <!-- End Breadcrumb Nav Toggle Button -->
               </div>
            </div>

            <div class="col-lg-7 order-lg-1">
               <!-- User Info -->
               <div class="media d-block d-sm-flex align-items-sm-center">
                  <div class="u-lg-avatar position-relative mb-3 mb-sm-0 mr-3">
                     <img class="img-fluid rounded-circle" src="../../assets/images/accountInfo/zhanghu.png">
                  </div>
                  <div class="media-body">
                     <h1 class="h3 text-white font-weight-medium mb-1">Hi,{{accoundId}} <span
                        class="badge badge-warning" style="cursor: pointer" @click="goKycPage">{{isKyc?$t('已实名'):$t('未实名')}}</span>
                     </h1>
                     <span class="d-block text-white">User ID: {{uid}}</span>

                  </div>
               </div>
               <!-- End User Info -->
            </div>
         </div>
      </div>

      <div class="container space-bottom-1 space-bottom-lg-0">
         <div class="d-lg-flex justify-content-lg-between align-items-lg-center">
            <!-- Navbar -->
            <div
               class="u-header u-header-left-aligned-nav u-header--bg-transparent-lg u-header--white-nav-links z-index-4">
               <div class="u-header__section bg-transparent">
                  <nav class="js-breadcrumb-menu navbar navbar-expand-lg u-header__navbar u-header__navbar--no-space">
                     <div id="breadcrumbNavBar" class="collapse navbar-collapse u-header__navbar-collapse">
                        <ul class="navbar-nav u-header__navbar-nav">
                           <!-- General -->
                           <!-- <li class="nav-item hs-has-sub-menu u-header__nav-item"
                               data-event="hover"
                               data-animation-in="slideInUp"
                               data-animation-out="fadeOut">
                              <router-link to='/Dashboard' class="nav-link u-header__nav-link hoverwhite">
                                 {{$t('总览')}}
                              </router-link>
                           </li> -->
                           <!-- General -->
                           <!-- Account Settings -->
                           <li class="nav-item hs-has-sub-menu u-header__nav-item"
                               data-event="hover"
                               data-animation-in="slideInUp"
                               data-animation-out="fadeOut">
                              <router-link to='/balances' id="accountSettingsDropdown"
                                           class="nav-link u-header__nav-link u-header__nav-link-toggle hoverwhite"
                                           aria-haspopup="true" aria-expanded="false"
                                           aria-labelledby="accountSettingsDropdownMenu">{{$t('homeBalances')}}
                              </router-link>

                              <ul id="accountSettingsDropdownMenu"
                                  class="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer"
                                  style="min-width: 230px;" aria-labelledby="accountSettingsDropdown">
                                 <li>
                                    <router-link to='/balances' class="nav-link u-header__sub-menu-nav-link">
                                       {{$t('zcDeposit')}} & {{$t('zcWithdrawal')}}
                                    </router-link>
                                 </li>
                                 <li>
                                    <router-link to='/transaction_history' class="nav-link u-header__sub-menu-nav-link">
                                       {{$t('tbdhTransactionHistory')}}
                                    </router-link>
                                 </li>
                                 <!-- <li>
                                     <router-link to='/interest' class="nav-link u-header__sub-menu-nav-link">{{$t('usdDividend')}}</router-link>
                                 </li> -->
                              </ul>
                           </li>
                           <!-- Account Settings -->

                           <!-- Billing -->
                           <li class="nav-item hs-has-sub-menu u-header__nav-item"
                               data-event="hover"
                               data-animation-in="slideInUp"
                               data-animation-out="fadeOut">
                              <router-link to='/order' class="nav-link u-header__nav-link hoverwhite">
                                 {{$t('homeOrder')}}
                              </router-link>
                           </li>
                           <!-- Billing -->

                           <!-- Accessibility -->
                           <!-- <li class="nav-item hs-has-sub-menu u-header__nav-item"
                               data-event="hover"
                               data-animation-in="slideInUp"
                               data-animation-out="fadeOut">
                             <a id="accessibilityDropdown" class="nav-link u-header__nav-link hoverwhite" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="accessibilityDropdownMenu">
                               设置
                             </a>
                           </li> -->
                           <!-- Accessibility -->

                           <!-- Others -->
                           <li class="nav-item u-header__nav-item">
                              <router-link to="/SafeCenter" class="nav-link u-header__nav-link hoverwhite">
                                 {{$t('tbdhAccountSecurity')}}
                              </router-link>
                           </li>
                           <!-- Others -->
                        </ul>
                     </div>
                  </nav>
               </div>
            </div>
            <!-- End Navbar -->

            <div class="ml-lg-auto">
               <!-- Button -->
               <!-- <router-link to="/inviteFriend" class="btn btn-sm btn-soft-white text-nowrap transition-3d-hover">
                  {{$t('邀请好友得高额返佣')}}
               </router-link> -->
               <!-- End Button -->
               <!-- Button -->
               <!-- <a class="btn btn-sm btn-soft-white text-nowrap transition-3d-hover" href="#requestPaymentModal"
                  data-modal-target="#requestPaymentModal">
                 邀请好友，得高额返佣
               </a> -->
               <!-- End Button -->
            </div>
         </div>
      </div>
   </div>
   <!-- End Breadcrumb Section -->
</template>

<script>
   import {postHeaderTokenBodyApi, getHeaderTokenApi} from '_api/axios.js';
   import {
      userInfo,
      socialToken
   } from '_api/urls.js';
   import {getCommouityBaseURL} from '../../config/index'
   export default {
      data() {
         return {
            accoundId: '',
            uid: '',
            isKyc: false,
            loginToken: $cookies.get('loginToken'),
            socialLink: '',
            socialLinkText: '',
            identifyState: ''
         }
      },
      props: ['name'],
      methods: {
         goKycPage() {
            if (this.identifyState === 'INIT') {
               this.$router.push('/kyc')
            } else {
               this.$router.push('/identityResult')
            }
         },
         getSocialLink() {
            let uniqueName = new Promise((resolve) => {
               let params = {
                  "userId": localStorage.getItem('loginUserId'),
               }
               getHeaderTokenApi(userInfo, params, $cookies.get('loginToken')).then((res) => {
                  this.accoundId = res.data.phone || res.data.email;
                  this.uid = res.data.userId;
                  this.identifyState = res.data.identifyState;
                  if (this.identifyState === 'SUCCESS') {
                     this.isKyc = true;
                  } else {
                     this.isKyc = false
                  }
                  let name = res.data.uniqueName
                  this.socialLinkText = getCommouityBaseURL() + '/' + name
                  resolve(name)
               })
            })
            let socialTokenPromise = new Promise((resolve, reject) => {
               postHeaderTokenBodyApi(socialToken, this.loginToken, {}).then(data => {
                  let token = data.token
                  resolve(token)
               })
            })
            Promise.all([uniqueName, socialTokenPromise]).then(data => {
               this.socialLink = getCommouityBaseURL() + '/api/v1/memberinterface/' + data[1] + '/' + encodeURIComponent('/' + data[0])
            })
         },
      },
      mounted() {
         this.getSocialLink()

         $('.js-mega-menu').HSMegaMenu({
            event: 'hover',
            pageContainer: $('.container'),
            breakpoint: 767.98,
            hideTimeOut: 0
         });

         $('.js-breadcrumb-menu').HSMegaMenu({
            event: 'hover',
            pageContainer: $('.container'),
            breakpoint: 991.98,
            hideTimeOut: 0
         });


      }

   }
</script>

<style lang="less" scoped>
   .bg-primary {
      font-size: 14px;
      font-weight: 400;
      .breadcrumb-item {
         a:hover {
            color: #fff !important;
         }
      }
      .hoverwhite:hover {
         color: #fff !important;
      }

   }

   .button-hover {
      &:hover {
         color: #12869a;
      }
   }

   .socialLink {
      padding-left: 50px;
   }

   .socialLinkText {
      color: #A9DBE4;
      &:hover {
         color: #fff;
      }
   }
</style>