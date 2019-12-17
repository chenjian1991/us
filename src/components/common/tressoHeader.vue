<template>
  <div id="tressoHeader" class="tressoHeader">
    <!-- ========== HEADER ========== -->
    <header id="header"
            class="u-header u-header-left-aligned-nav u-header--bg-transparent u-header--show-hide-md bgc-151D24"
            data-header-fix-moment="500" data-header-fix-effect="slide">
      <div class="u-header__section">
        <div id="logoAndNav" :class="{'gbbo-header':isgbbo}" class="container">
          <!-- Nav -->
          <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
            <!-- Logo -->
            <router-link to='/home' class="mr-lg-11 logo-box">
              <img src="../../assets/images/tressoHeader/logo.png" alt="logo" class="logo-img">
            </router-link>
            <!-- End Logo -->
            <!-- Responsive Toggle Button -->
            <!--<button type="button" class="navbar-toggler btn u-hamburger" aria-label="Toggle navigation"-->
            <!--aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">-->
            <!--<span id="hamburgerTrigger" class="u-hamburger__box">-->
            <!--<span class="u-hamburger__inner"></span>-->
            <!--</span>-->
            <!--</button>-->
            <!-- End Responsive Toggle Button -->
            <div id="navBar" class="collapse navbar-collapse u-header__navbar-collapse ml-lg-4">
              <ul class="navbar-nav u-header__navbar-nav">
                <li class="nav-item u-header__nav-item header-box">
                  <router-link to="/gbbo" class="nav-link u-header__nav-link">GBBO</router-link>
                </li>
                <li class="nav-item u-header__nav-item header-box">
                  <router-link to='/API' class="nav-link u-header__nav-link">API</router-link>
                </li>
                <!--ABOUT-->
                <li class="nav-item hs-has-sub-menu u-header__nav-item header-box" data-event="hover"
                    data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="right">
                  <router-link id="pagesMegaMenu" class="nav-link u-header__nav-link u-header__nav-link-toggle header-a"
                               to='' aria-labelledby="pagesSubMenu" aria-haspopup="true" aria-expanded="false">
                    ABOUT
                  </router-link>
                  <ul id="pagesSubMenu" class="hs-sub-menu u-header__sub-menu"
                      aria-labelledby="pagesMegaMenu" @click="hideList" ref="pagesSubMenu">
                    <li class="hs-has-sub-menu">
                      <router-link to='/about' class="nav-link u-header__sub-menu-nav-link">Who we are</router-link>
                    </li>
                    <li class="hs-has-sub-menu">
                      <a href="javascript:;" class="nav-link u-header__sub-menu-nav-link" @click="goTeam">Team</a>
                    </li>
                    <li class="hs-has-sub-menu">
                      <a href="javascript:;" class="nav-link u-header__sub-menu-nav-link" @click="goFAQs">FAQs</a>

                      <!--<a href="https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ"-->
                      <!--class="nav-link u-header__sub-menu-nav-link" target="_blank">-->
                      <!--FAQs-->
                      <!--</a>-->
                    </li>
                  </ul>
                </li>
                <li class="nav-item u-header__nav-last-item header-box" v-show="!isLogin">
                  <router-link class="nav-link u-header__nav-link" to='/login' style="font-size: 14px">
                    Log In
                  </router-link>
                </li>
                <li class="nav-item u-header__nav-item header-box mr-3" v-show="!isLogin">
                  <router-link class="btn btn-sm transition-3d-hover d-inline-block register-btn" to='/optionalRegistration'>
                    Join the Beta
                  </router-link>
                </li>
                <li class="nav-item u-header__nav-last-item hs-has-sub-menu header-box mr-1" data-event="hover"
                    data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="right" v-show="isLogin">
                  <router-link id="pagesMegaMenu1"
                               class="nav-link u-header__nav-link u-header__nav-link-toggle header-a"
                               to='' aria-labelledby="pagesSubMenu" aria-haspopup="true" aria-expanded="false">
                    {{email}}
                  </router-link>
                  <ul id="pagesSubMenu1" class="hs-sub-menu u-header__sub-menu" aria-labelledby="pagesMegaMenu"
                      @click="hideList" ref="pagesSubMenu">
                    <!-- <li class="hs-has-sub-menu">
                       <router-link to='Dashboard' class="nav-link u-header__sub-menu-nav-link">
                          Dashboard
                       </router-link>
                    </li> -->
                    <li class="hs-has-sub-menu">
                      <router-link to='/balances' class="nav-link u-header__sub-menu-nav-link">
                        Balances
                      </router-link>
                    </li>
                    <li class="hs-has-sub-menu">
                      <router-link to='/order' class="nav-link u-header__sub-menu-nav-link">
                        Orders
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
                <!--menu-->
                <li class="nav-item u-header__nav-item header-box">
                  <a href="javascript:;" class="nav-toggle" @click="showMenu=!showMenu"><span></span></a>
                </li>
              </ul>
            </div>
            <!--移动端 menu-->
            <ul class="mobile-menu">
              <li class="d-ib header-box c-fff" v-show="isLogin">
                {{email|cutOff}}
              </li>
              <li class="d-ib">
                <a href="javascript:;" class="nav-toggle" @click="showMenu=!showMenu"><span></span></a>
              </li>
            </ul>
          </nav>
          <!-- End Nav -->
        </div>
      </div>
    </header>
    <!--右侧 menu-->
    <Drawer :closable="true" v-model="showMenu" :mask="false">
      <div class="drawer">
        <div class="t-c">
          <router-link to='/home' class="mr-lg-11 logo-box">
            <img src="../../assets/images/tressoHeader/logo.png" alt="logo" width="110">
          </router-link>
        </div>
        <ul class="drawer-list" @click="showMenu=false">
          <li class="drawer-item">
            <router-link to="/gbbo" class="nav-link u-header__nav-link">GBBO</router-link>
          </li>
          <li class="drawer-item">
            <router-link to='/API' class="nav-link u-header__nav-link">API</router-link>
          </li>
          <li class="drawer-item">
            <router-link to='/about' class="nav-link u-header__nav-link">Who we are</router-link>
          </li>
          <li class="drawer-item">
            <a href="javascript:;" class="nav-link u-header__nav-link" @click="goTeam">Team</a>
          </li>
          <li class="drawer-item">
            <router-link to='/usd_fees' class="nav-link u-header__nav-link">Fee Structure</router-link>
          </li>
          <li class="drawer-item">
            <a href="https://apidoc.tresso.com" target="_blank" class="nav-link u-header__nav-link">API Documents</a>
          </li>
          <li class="drawer-item">
            <a href="https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ" target="_blank"
               class="nav-link u-header__nav-link">FAQs</a>
          </li>
          <li class="drawer-item">
            <router-link to='/legal/terms' class="nav-link u-header__nav-link">Terms & Conditions</router-link>
          </li>
        </ul>
        <!--移动端有这两项 -->
        <ul class="drawer-list mobile" @click="showMenu=false" v-show="isLogin">
          <li class="drawer-item">
            <router-link to='/balances' class="nav-link u-header__nav-link email">{{email}}</router-link>
          </li>
          <li class="drawer-item">
            <a href="javascript:;" class="nav-link u-header__nav-link nav-btn" @click="quitFun">Log out</a>
          </li>
        </ul>
        <ul class="drawer-list mobile" @click="showMenu=false" v-show="!isLogin">
          <li class="drawer-item">
            <router-link to='/login' class="nav-link u-header__nav-link">Log In</router-link>
          </li>
          <li class="drawer-item">
            <router-link to='/optionalRegistration' class="nav-link u-header__nav-link nav-btn">Join the Beta</router-link>
          </li>
        </ul>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import {postHeaderTokenBodyApi, getHeaderTokenApi} from "_api/axios.js";
  import {logout} from "../../../api/urls.js";
  import {getUserInfo} from "_api/balances.js";
  import {getLegalTenderValue} from "_api/header.js";

  import {clearLocalStorage} from "../../config/index";

  export default {
    name: 'tressoHeader',
    filters: {
      cutOff: function (value) {
        if (value) {
          return value.slice(0, value.lastIndexOf('@'))
        } else {
          return value
        }
      }
    },
    data() {
      return {
        isLogin: false,
        isgbbo: false,
        email: localStorage.getItem('email'),
        showMenu: false,
      };
    },
    methods: {
      getLegalTenderData() {
        let param = {
          fromCurrency: 'USD',
          toCurrency: 'USD'
        };
        getLegalTenderValue(param).then(result => {
          let info = {
            name: result.toCurrency,
            rate: result.rate,
          };
          localStorage.setItem("currentCurrency", JSON.stringify(info));
          // //目标页面监听store中的数据变动
          this.$store.commit("changeCurrencyState", result.toCurrency);
        });
      },
      goTeam() {
        if (location.href.includes('/about')) {
          location.href = '#team'
        } else {
          this.$router.push('/about')
        }
      },
      goFAQs() {
        window.open('https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ')
      },
      //实名信息
      getUserInfo() {
        return new Promise(resolve => {
          getUserInfo({
            userId: localStorage.getItem('loginUserId')
          }, $cookies.get('loginToken')).then(res => {//实名认证
            if (res.data) {
              this.email = res.data.email
              localStorage.setItem('email', res.data.email)
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
        let params = {
          userId: localStorage.getItem("loginUserId")
        };
        getHeaderTokenApi(logout, params, $cookies.get("loginToken")).then(
            res => {
              if (res.data.result) {
                clearLocalStorage();
                setTimeout(() => {
                  this.$router.push("/home");
                }, 500);
                this.$Notice.success({
                  title: this.$t(11001),
                  desc: this.$t(11001)
                });
                localstorage.removeItem('email')
              }
            }
        );
        //更新自选的币种
        // this.$store.dispatch("updateMarkSymbol");
        this.$store.commit("changeLoingStatus", false);
      },
      hideList() {
        this.$refs.pagesSubMenu.style.display = 'none'
      }
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
          this.getUserInfo().then()
        } else {
          this.isLogin = false;
        }
      },
      $route(to, from) {
        if (to.path === '/gbbo') {
          this.isgbbo = true;
        } else {
          this.isgbbo = false;
        }
      },
    },
    created() {
      this.getLegalTenderData()
    },
    mounted() {
      if (this.$route.path === '/gbbo') {
        this.isgbbo = true;
      } else {
        this.isgbbo = false;
      }
      //判断是否登录有效
      let isLogin = this.$store.state.app.isLogin;
      if (isLogin) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      if (this.isLogin && localStorage.getItem('email') === null) {
        this.getUserInfo().then()
      }
      // //下拉框消失
      // let openList = document.getElementsByClassName("navbar-list")[0]
      // openList.addEventListener('click', function () {
      //   setTimeout(() => {
      //     this.style.display = 'none'
      //   }, 300)
      // })

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
    /*导航*/
    .nav-item, .u-header__nav-item {
      a {
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
  }

  /*弹出菜单*/
  .ivu-drawer-wrap {
    z-index: 1002 !important;
  }

  .ivu-drawer {
    width: 300px !important;
  }

  .ivu-drawer-content {
    background-color: #1A232B !important;
    .ivu-drawer-body {
      padding: 0;
    }
    .ivu-drawer-close .ivu-icon-ios-close {
      font-size: 38px;
      color: #fff !important;
    }
  }
</style>
<style scoped lang="less">
  @import '../../assets/css/common.less';

  @media (min-width: 976px) {
    .gbbo-header {
      max-width: 1440px;
    }
  }

  @media (max-width: 768px) {
    .u-header--bg-transparent .u-header__navbar-nav {
      .bgc-151D24;
    }

    .navbar-expand-md .u-header__nav-last-item {
      display: block;
    }

    .mobile {
      display: block;
    }

    .mobile-menu {
      display: flex;
      align-items: center;
    }
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }

    .mobile {
      display: none;
    }
  }

  .tressoHeader {
    width: 100%;
    .logo-box {
      height: 78px;
      .d-f;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
      a {
        color: #fff;
      }
    }

    .register-btn {
      color: #01B2D6 !important;
      border: solid 1px #01B2D6;
      background-color: transparent;
    }

    .logo-img {
      display: block;
      width: 148px;
    }

    .nav-link {
      font-weight: 500;
    }

    /*右上角过渡*/
    .nav-toggle {
      display: inline-block;
      width: 30px;
      height: 35px;
      position: relative;
      z-index: 12;
    }

    .nav-toggle:before, .nav-toggle:after, .nav-toggle span {
      position: absolute;
      content: "";
      background: #fff;
      height: 2px;
      width: 30px;
      top: 19px;
      -webkit-transition: .4s ease;
      transition: .4s ease;
      -webkit-transform-origin: 50% 50%;
      -ms-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    .nav-toggle:before {
      top: 10px;
    }
    .nav-toggle:after {
      top: 28px;
    }
    .mobile-menu {
      .nav-toggle:before, .nav-toggle:after, .nav-toggle span {
        .bgc-01B2D6;
      }
    }

  }

  /*菜单 自定义内容*/
  .drawer {
    padding-top: 80px;
    img {
      display: block;
      margin: 0 auto;
    }
    .drawer-list {
      padding-top: 75px;
      .drawer-item {
        padding-left: 40px;
        font-size: 14px;
        font-weight: 500;
        .nav-link {
          color: #B9C9D6;
        }
        .email {
          .c-01B2D6;
        }
      }
    }
    /*移动端 注册和退出按钮样式*/
    .nav-btn {
      display: inline-block;
      margin-left: 13px;
      margin-top: 10px;
      color: #01B2D6 !important;
      border: solid 1px #01B2D6;
      background-color: transparent;
      border-radius: 4px;
    }
  }

</style>