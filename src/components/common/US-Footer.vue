<template>
  <div style="background:#15232C;">
    <!-- Contacts Section -->
    <div class="container">
      <div class="row u-space-2">
        <div class="col-lg-6 u-ver-divider u-ver-divider--none-lg mb-7 mb-lg-0">
          <!-- Contacts Info -->
          <div class="media pr-lg-9">
            <div class="d-flex pr-4">
              <span class="u-icon u-icon-primary--air u-icon--lg rounded-circle mb-4 ">
                <span class="fa fa-envelope u-icon__inner text-white"></span>
              </span>
            </div>

            <div class="media-body">
              <h3 class="h5 text-white">Got a question?</h3>
              <p
                class="mb-1 text-white"
              >We want to answer all of your queries. Get in touch and we'll get back to you as soon as we can.</p>
              <a class="font-size-14 text-white" href="mailto:service@55.com">
                  E-mail us
                  <span class="fa fa-angle-right align-middle ml-2"></span>
              </a>
            </div>
          </div>
          <!-- End Contacts Info -->
        </div>

        <div class="col-lg-6">
          <!-- Contacts Info -->
          <div class="media pl-lg-9">
            <div class="d-flex pr-4">
              <span class="u-icon u-icon-primary--air u-icon--lg rounded-circle mb-4">
                <span class="fas fa-users u-icon__inner text-white"></span>
              </span>
            </div>

            <div class="media-body">
              <h3 class="h5 text-white">Join 55 Social</h3>
              <p class="mb-1 text-white">Join the community on 55 Social today! Find a trading buddy and get the latest market information.</p>
              <a class="font-size-14 text-white" :href="englishCommunityURL" target="_blank">
                Join us
                <span class="fa fa-angle-right align-middle ml-2"></span>
              </a>
            </div>
          </div>
          <!-- End Contacts Info -->
        </div>
      </div>

      <hr class="my-0">
    </div>
    <!-- End Contacts Section -->
    <!-- ========== FOOTER ========== -->
    <footer>
      <!-- Lists -->
      <div class="container u-space-2">
        <div class="row justify-content-md-between">
          <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
            <h3 class="h6 text-white">
              <strong>Company</strong>
            </h3>

            <!-- List -->
            <ul class="list-unstyled mb-0">
              <li>
                <router-link class="u-list__link text-white" to="/about55">About</router-link>
              </li>
              <li>
                <a class="u-list__link text-white" href="https://www.linkedin.com/company/55-global/jobs/" target="_blank">Careers</a>
              </li>
              <li><router-link to="/terms"  class="u-list__link text-white">{{$t('UserAgreement')}}</router-link></li>
              <li><router-link to="/privacy" class="u-list__link text-white">Privacy Policy</router-link></li>
              <li><router-link to="/fee" class="u-list__link text-white">Trading Fee</router-link></li>
              <li><router-link to="/tradingRules" class="u-list__link text-white">Trading Rules</router-link></li>
               <!-- <li>
                <a class="u-list__link text-white" href="#">Taxes</a>
              </li> -->
              
            </ul>
            <!-- End List -->
          </div>

          <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
            <h3 class="h6 text-white">
              <strong>Products</strong>
            </h3>

            <!-- List -->
            <ul class="list-unstyled mb-0 ">
              <!-- <li>
                <a class="u-list__link text-white" href="about-agency.html">55 Tokenize</a>
              </li> -->
              <li >
                <router-link  class="u-list__link text-white" to="/exchange">Markets</router-link>
              </li>
              <li>
                <a class="u-list__link text-white" :href="baseSocialURL" target="_blank">Social Trading</a>
              </li>
              <!-- <li>
                <a class="u-list__link text-white" href="#">55 Retail</a>
              </li> -->
              <li>
                <router-link  class="u-list__link text-white" to="/capital">55 Capital</router-link>
              </li>
              <!-- <li>
                <a class="u-list__link text-white" href="#atoRow">ATO - For Listing</a>
              </li> -->
            </ul>
            <!-- End List -->
          </div>


          <!-- <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
            <h3 class="h6 text-white">
              <strong>Social Media</strong>
            </h3>

            <ul class="list-unstyled mb-0 text-white">
              <li><a target="_blank" class="u-list__link text-white" href="https://t.me/English_55GlobalMarkets">Telegram</a></li>
              <li><a target="_blank" class="u-list__link text-white" href="https://www.facebook.com/55AssetNetwork/">Facebook</a></li>
              <li><a target="_blank" class="u-list__link text-white" href="https://twitter.com/55AssetNetwork">Twitter</a></li>
            </ul>
          </div> -->

          <div class="col-md-6 col-lg-4">
            <img src="../../assets/images/foot_code.png" style="width:100%;height:auto" alt="">
          </div>
        </div>
      </div>
      <!-- End Lists -->

      <hr>

      <!-- Copyright -->
      <div class="container text-center u-space-1">
        <!-- Logo -->
        <a class="d-inline-block mb-2" href="../home/index.html" aria-label="Front">
          <img src="assets/svg/logos/logo-white-footer.svg" alt="Logo" style="width: 50px;">
        </a>
        <!-- End Logo -->
        <p class="small text-white"><a style="color:#fff;" target="_blank" href="https://www.55.com/MSB.pdf msb_registration.">MSB No.31000146897405</a> </p>
        <p class="small text-white">2500 Plaza 5, Unit 2553, Jersey City, NJ 07311</p>
        <p class="small text-white">&copy; 2017-2019 55.trade All rights reserved.</p>
        <div class="col-lg-6 text-lg-right" style="max-width:100%">
          <!-- Social Networks -->
          <ul class="list-inline mb-0" style="text-align:center">
            <li class="list-inline-item mb-2 mb-sm-0">
              <a class="btn btn-sm btn-icon btn-soft-indigo rounded-circle" href="https://www.facebook.com/55AssetNetwork/" target="_blank">
                <span class="fab fa-facebook-f btn-icon__inner" style="color:#fff"></span>
              </a>
            </li>
            <li class="list-inline-item mb-2 mb-sm-0">
              <a class="btn btn-sm btn-icon btn-soft-indigo rounded-circle" href="https://twitter.com/55AssetNetwork" target="_blank">
                <span class="fab fa-twitter btn-icon__inner" style="color:#fff"></span>
              </a>
            </li>
            <li class="list-inline-item mb-2 mb-sm-0">
              <a class="btn btn-sm btn-icon btn-soft-indigo rounded-circle" href="https://www.linkedin.com/company/55-global/" target="_blank">
                <span class="fab fa-linkedin btn-icon__inner" style="color:#fff"></span>
              </a>
            </li>
            <li class="list-inline-item mb-2 mb-sm-0">
              <a class="btn btn-sm btn-icon btn-soft-indigo rounded-circle" href="javascript:;" target="_blank">
                <span class="fab fa-youtube btn-icon__inner" style="color:#fff"></span>
              </a>
            </li>
          </ul>
          <!-- End Social Networks -->
        </div>      
      </div>
      <!-- End Copyright -->
    </footer>
    <!-- ========== END FOOTER ========== -->
  </div>
</template>

<script>
  import {getCommouityBaseURL} from '../../config/index'
  import {postHeaderTokenBodyApi} from '_api/axios'
  import Cookies from 'js-cookie'
export default {
  data() {
    return {
      englishCommunityURL: '',
      baseSocialURL:'',
      loginToken:'',
      chatToken:'',
    }
  },
  methods: {
    initURL() {
      this.loginToken = Cookies.get('loginToken')
      if(this.loginToken){
        postHeaderTokenBodyApi('api/sso/social/get-token',this.loginToken,null).then(data => {
            this.chatToken = data.token +'/'
            //社区链接
            this.englishCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+'/'+encodeURIComponent('/groups/profile/967250642861035532/feed')
            this.baseSocialURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken
        })
      }else{
        this.chatToken = 'null'
        this.englishCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' + this.chatToken+'/'+ encodeURIComponent('/groups/profile/967250642861035532/feed')
        this.baseSocialURL = getCommouityBaseURL()
      }
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
            setTimeout(()=>{
                this.initURL()
            },1000)
            
         },
      },
  mounted(){
    this.initURL()
  }
};
</script>

<style lang="less" scoped>
.us-footer {
  height: 100%;
  width: 100%;
}
</style>