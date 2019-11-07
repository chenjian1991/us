<template>
  <main
    id="content"
    role="main"
  >
    <AccountInfo name="AccountInfo" />
    <!-- Content Section -->
    <div>
      <div class="container space-top-2">
        <!-- Title -->
        <div class="row justify-content-between align-items-center mb-3">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h2 class="h5 mb-0">{{$t('账户总估值')}}:</h2>
            <h4 class="h5 mb-0"><span style="color:red">{{allAccountBTC == 0?'--':allAccountBTC}}</span> BTC ≈ {{allAccountCurrency == 0 ? '--':allAccountCurrency}} {{exchangeAccount && exchangeAccount.name}} </h4>
          </div>

          <div class="col-sm-6 text-sm-right">
            <div class="">
              <router-link
                to='/balances'
                class="js-animation-link btn btn-sm btn-outline-primary btn-sm-wide despositBtn transition-3d-hover"
              >
                <div class="text-primary">{{$t('deposit')}}</div>
                <div class="font-size-10 text-muted">{{$t('充值到币币账户')}}</div>
              </router-link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <router-link
                to='/balances'
                class="js-animation-link btn btn-sm btn-outline-primary btn-sm-wide despositBtn transition-3d-hover"
              >
               <div class="text-primary">{{$t('zcWithdrawal')}}</div>
                <div class="font-size-10 text-muted">{{$t('设置提现地址更安全')}}</div>
              </router-link>
              &nbsp;
            
              &nbsp;
            </div>
          </div>
        </div>
        <!-- End Title -->
      </div>
    </div>
    <!-- Content Section -->
    <div>
      <div class="container">
        <!-- Card -->
        <div class="card-deck d-block d-lg-flex card-lg-gutters-3 space-1">
          <!-- Stats -->
          <div class="card mb-7 mb-lg-0">





            
            <div class="card-body pt-4 pb-5 px-5 mb-3 mb-md-0">
              <!-- Title & Settings -->
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="h6 mb-0">Cypto Account</h4>
              </div>
              <!-- End Title & Settings -->
              <hr class="mt-3 mb-4">

              <!-- Deposit Info -->
              <div class="row mb-5">
                <div class="col-sm-12 mb-4 mb-sm-0">
                  <div>{{$t('账户总估值')}}</div>
                  <span class="font-size-3 font-weight-medium text-lh-sm">{{exchangeAccount && exchangeAccount.total_BTC}} BTC </span>
                  <div class="mb-1">
                    <span class="text-secondary font-size-1"> ≈ {{exchangeAccount && exchangeAccount.legalCurrency}} {{exchangeAccount && exchangeAccount.name}}</span>
                  </div>
                </div>

                <div class="col-sm-6 align-self-end">
                  <!-- Pie Circle -->
                  <div
                    class="js-pie text-center"
                    data-circles-text-class="content-centered-y"
                    data-circles-value="54"
                    data-circles-max-value="100"
                    data-circles-bg-color="rgba(0, 201, 167, 0.1)"
                    data-circles-fg-color="#00c9a7"
                    data-circles-radius="50"
                    data-circles-stroke-width="4"
                    data-circles-additional-text="%"
                    data-circles-duration="2000"
                    data-circles-scroll-animate="true"
                    data-circles-color="#00c9a7"
                    data-circles-font-size="24"
                  ></div>
                  <!-- End Pie Circle -->
                </div>
              </div>
              <div class="row pl-3 pr-3 justify-content-between">
                  <router-link to="/balances">
                    <button
                      type="button"
                      class="btn pl-8 pr-8 btn-sm btn-primary transition-3d-hover"
                    >{{$t('详情')}}</button>
                  </router-link>
              </div>
              
              <!-- End Deposit Info -->
            </div>
          </div>
          <!-- End Stats -->
          <!-- OTC 账户 -->
          <div class="card mb-7 mb-lg-0">
            <div class="card-body pt-4 pb-5 px-5 mb-3 mb-md-0">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="h6 mb-0">Fiat Account</h4>
              </div>
              <hr class="mt-3 mb-4">

              <div class="row mb-5">
                <div class="col-sm-12 mb-4 mb-sm-0">
                  <div>Total Value</div>
                  <span class="font-size-3 font-weight-medium text-lh-sm">{{totalUSD}} USD</span>
                </div>

                <div class="col-sm-6 align-self-end">
                  <div
                    class="js-pie text-center"
                    data-circles-text-class="content-centered-y"
                    data-circles-value="54"
                    data-circles-max-value="100"
                    data-circles-bg-color="rgba(0, 201, 167, 0.1)"
                    data-circles-fg-color="#00c9a7"
                    data-circles-radius="50"
                    data-circles-stroke-width="4"
                    data-circles-additional-text="%"
                    data-circles-duration="2000"
                    data-circles-scroll-animate="true"
                    data-circles-color="#00c9a7"
                    data-circles-font-size="24"
                  ></div>
                </div>
              </div>
              <div class="row pl-3 pr-3 justify-content-between">
                   <router-link to="/balances">
                    <button
                      type="button"
                      class="btn pl-8 pr-8 btn-sm btn-primary transition-3d-hover"
                    >{{$t('详情')}}</button>
                  </router-link>
                  
              </div>
             
            </div>
          </div>
          <!-- OTC 账户 -->
        </div>
        <!-- End Card -->
        <div class="mb-4">
          <!-- Title -->
          <div class="mb-3">
            <h2 class="h5 mb-0">{{$t('推荐安全设置')}}</h2>
          </div>
          <!-- End Title -->

          <div class="card-deck d-block d-md-flex">
            <div class="card mb-4 mb-md-0">
              <!-- Card -->
              <div class="card-body p-5">
                <h4 class="h6">{{$t('zhmmSecurity')}}</h4>
                <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplain')}}</p>
                 <br/>
                <router-link
                  to="/SafeCenter"
                  class="btn btn-xs btn-primary transition-3d-hover mr-1"
                >{{$t('aqzxset')}}</router-link>
                <!-- <a class="btn btn-xs btn-soft-secondary transition-3d-hover" href="#">设置</a> -->
              </div>
              <!-- End Card -->
            </div>

            <div class="card">
              <!-- Card -->
              <div class="card-body p-5">
                <h4 class="h6">{{$t('tbdhIDVerification')}}</h4>
                <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplaintwo')}}</p>
                 <br/>
                <div
                  @click="goKycPage"
                  class="btn btn-xs btn-primary transition-3d-hover mr-1"
                >{{$t('aqzxset')}}</div>
                <!-- End Card -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Content Section -->
    <Modal
        v-model="modal1"
        :title="$t('尊敬的用户')"
        :mask-closable="false">
        <p>{{$t('kycModalText1')}}</p>
        <p>{{$t('kycModalText2')}}</p>
         <div slot="footer">
            <Button type="primary" size="default"  @click="ok">{{$t('去实名')}}</Button>
            <Button size="default"  @click="cancel">{{$t('稍后再说')}}</Button>
        </div>
    </Modal>
  </main>
  <!-- ========== END MAIN ========== -->
</template>

<script>
import AccountInfo from "../../components/common/AccountInfo.vue";
import { AnnoucementList } from "_api/home";
  import {
      getCurrencyList,
   } from '_api/exchange.js'
import { getSymbolList } from "_api/exchange.js";
import PasswordInput from "@/components/PasswordInput.vue";
import moment from "moment";
import { Exchange } from "@/interface/exchange.js";
import bigDecimal from "js-big-decimal"; //除法失效
import { BigNumber } from "bignumber.js";
import {
  getObjFirstKey,
  getDecimalsNum,
  onlyInputNumAndPoint,
  getTokenByKey as getValue,
  addSymbolSplitLine,
  storage,
  isDivideAll,
  getLastUTCMinutes,
  getIndexInObject,
  scientificToNumber,
  isSameUTCDay,
  subNumberPoint,
  getObjFirstValue
} from "@/lib/utils.js";
import {
  getBalancesValuation,
  getOtcValuation
} from "./getValue.js";
import {postBaseApi, postHeaderTokenBodyApi, getHeaderTokenApi} from '_api/axios.js';
import {userInfo, identify,setOpenTradePassword,TradingPasswordVerify,queryTradePasswordOpen,identifyQueryUrl,socialToken} from '_api/urls.js';
export default {
 metaInfo(){
            return{
                title: this.pageTitle, // set a title
                meta: [{                 // set meta
                    name: 'keywords',
                    content:this.pageKeyword
                },{
                    name:'description',
                    content:this.pageDescription
                }],
            }
        },
  data() {
    return {
      pageTitle:this.$t(this.$route.meta.title),
      pageKeyword : this.$t(this.$route.meta.keywords),
      pageDescription : this.$t(this.$route.meta.description),
      language: window.localStorage.getItem("countryLanguage") || "en",
      isLogin: this.$store.state.app.isLogin || false,
      exchange: null,
      loginToken: $cookies.get("loginToken"), //登陆token
      exchangeAccount: null,
      allAccountBTC: 0,
      allAccountCurrency: 0,
      modal1:false,
      totalUSD:"",
      identifyState:'',
    };
  },
  components: {
    AccountInfo,
  },
  methods: {
    ok(){
       if (this.identifyState === 'INIT') {/*  */
            this.$router.push('/kyc')
        }else{
            this.$router.push('/identityResult')
        }
    },
    cancel(){
      this.modal1 = false
    },
    getAccountData() {
      getBalancesValuation().then(data => {
        this.exchangeAccount = data;
        if(data.total_BTC !== '--'){
            this.allAccountBTC = Number(this.allAccountBTC) + Number(data.total_BTC);
            this.allAccountCurrency =Number(this.allAccountCurrency) + Number(data.legalCurrency);
        }
      });
    },
      initUSDD() {
            let balanceList = new Promise(resolve => {
               this.exchange.balance(function (result) {//获取资产
                  result.forEach(item => {
                      if(item.currency==='USDD'){
                          this.totalUSD = item.available;
                      }
                  });
                  resolve()
               }.bind(this))
            })
         },
     goKycPage(){
        if (this.identifyState === 'INIT') {
            this.$router.push('/kyc')
        }else{
            this.$router.push('/identityResult')
        }
    },
    getUserInfo(token){
          let params = {
                "userId":localStorage.getItem('loginUserId'),
          }
          getHeaderTokenApi(userInfo,params,token).then((res) =>{
              this.identifyState = res.data.identifyState;
              if(this.identifyState==='SUCCESS'){
                    this.modal1 = false;
              }else{
                    this.modal1 = true;
              }
              
          }).catch((res) =>{

          })
      },
 
  },
  computed: {
    languageChange() {
      return this.$store.state.app.countryLanguage; //  返回全局state的状态值
    },
    loginStatus() {
      return this.$store.state.app.isLogin;
    }
  },
  watch: {
    languageChange(val, oldVal) {
      this.pageKeyword = this.$t(this.$route.meta.keywords)
      this.pageDescription = this.$t(this.$route.meta.description)
      this.pageTitle = this.$t(this.$route.meta.title)
    },
    loginStatus(val, oldVal) {
      if (val) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
  },
  created() {
   
  },
  mounted() {
    var ssoProvider = {};
    this.exchange = new Exchange(ssoProvider);
    this.exchange.ssoProvider.getSsoToken = function(fn) {
      if (this.loginToken) {
          fn(this.loginToken);
      }
    }.bind(this);
    this.getAccountData();
    this.initUSDD()
    this.getUserInfo($cookies.get("loginToken"));
    let loginToken = $cookies.get("loginToken");
  }
};
</script>

<style lang="less" scoped>
.vipClassname {
  margin:0 0px; 
  border:solid 1px #E7EAF3; 
  border-radius:4px;
}
.ivu-btn-primary{
    background: #12869A;
    border-color: #12869A;
}


.blues {
  color:#12869A;
}
.fonts {
  font-size: 20px;
}
.despositBtn:hover{
  .text-primary{
    color: #fff !important;
  }
  .text-muted:hover{
    color: #A9DBE4;
  }
}
.withdrawlBtn:hover{
  background: #108093 !important;
  
}

</style>
