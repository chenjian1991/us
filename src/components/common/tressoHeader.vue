<template>
  <div id="tressoHeader">
    <!-- ========== HEADER ========== -->
    <header
        id="header"
        class="u-header u-header--bg-transparent u-header--show-hide-md bgc-151D24"
        data-header-fix-moment="500"
        data-header-fix-effect="slide">
      <div class="u-header__section">
        <div id="logoAndNav" :class="{'gbbo-header':isgbbo}" class="container">
          <!-- Nav -->
          <nav class="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
            <!-- Logo -->
            <router-link to='/home' class="mr-lg-10">
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
              <ul class="navbar-nav u-header__navbar-nav navbar-left">
                <li
                    class="nav-item u-header__nav-item header-box">
                  <a class="nav-link u-header__nav-link" @click="gbboHref()">GBBO™</a>
                </li>
                <li class="nav-item u-header__nav-item header-box">
                  <router-link to='/about' class="nav-link u-header__nav-link">ABOUT</router-link>
                </li>
                <!--<li-->
                <!--class="nav-item u-header__nav-item header-box ">-->
                <!--<a href="https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ" target="_blank"-->
                <!--class="nav-link u-header__nav-link">-->
                <!--FAQs-->
                <!--</a>-->
                <!--</li>-->
                <li class="nav-item hs-has-sub-menu u-header__nav-item header-box" data-event="hover"
                    data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="right">
                  <router-link id="pagesMegaMenu" class="nav-link u-header__nav-link u-header__nav-link-toggle header-a"
                               to='' aria-labelledby="pagesSubMenu" aria-haspopup="true" aria-expanded="false">
                    FAQs
                  </router-link>
                  <ul id="pagesSubMenu" class="hs-sub-menu u-header__sub-menu navbar-list" aria-labelledby="pagesMegaMenu" @click="hideList" ref="pagesSubMenu">
                    <li class="hs-has-sub-menu">
                      <a href="https://tresso.zendesk.com/hc/en-us/sections/360005901614-FAQ"
                         class="nav-link u-header__sub-menu-nav-link">
                        FAQs
                      </a>
                    </li>
                    <li class="hs-has-sub-menu">
                      <router-link to='/usd_fees' class="nav-link u-header__sub-menu-nav-link">
                        Fee Structure
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
              <!--login-->
              <ul class="navbar-nav u-header__navbar-nav" v-show="!isLogin">
                <li
                    class="nav-item u-header__nav-item header-box">
                  <router-link class="nav-link u-header__nav-link mr-lg-5" to='/login' style="font-size: 14px">
                    Log In
                  </router-link>
                </li>
                <li
                    class="nav-item u-header__nav-item">
                  <router-link class="btn btn-sm transition-3d-hover d-inline-block register-btn"
                               to='/register'>Join the Beta
                  </router-link>
                </li>
              </ul>
              <!--account-->
              <ul class="navbar-nav u-header__navbar-nav" v-show="isLogin">
                <li class="nav-item hs-has-sub-menu u-header__nav-item header-box" data-event="hover"
                    data-animation-in="slideInUp" data-animation-out="fadeOut" data-position="right">
                  <router-link id="pagesMegaMenu" class="nav-link u-header__nav-link u-header__nav-link-toggle header-a"
                               to='' aria-labelledby="pagesSubMenu" aria-haspopup="true" aria-expanded="false">
                    My Account
                  </router-link>
                  <ul id="pagesSubMenu" class="hs-sub-menu u-header__sub-menu" aria-labelledby="pagesMegaMenu" @click="hideList" ref="pagesSubMenu">
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
  import {postHeaderTokenBodyApi, getHeaderTokenApi} from "_api/axios.js";
  import {logout} from "../../../api/urls.js";
  import {getUserInfo} from "_api/balances.js";
  import {getLegalTenderValue} from "_api/header.js";

  import {clearLocalStorage} from "../../config/index";

  export default {
    name: 'tressoHeader',
    data() {
      return {
        isLogin: false,
        isgbbo: false,
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
              }
            }
        );
        //更新自选的币种
        // this.$store.dispatch("updateMarkSymbol");
        this.$store.commit("changeLoingStatus", false);
      },
      hideList(){
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
      /*&:visited {*/
      /*color: #01B2D6;*/
      /*}*/
    }
  }
</style>
<style scoped lang="less">
  @import '../../assets/css/common.less';

  #tressoHeader {
    width: 100%;
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

  .header-a {
    color: #fff !important;
  }

  .navbar-left {
    margin-left: 0;
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

  @media (min-width: 976px) {
    .gbbo-header {
      max-width: 1440px;
    }
  }

</style>