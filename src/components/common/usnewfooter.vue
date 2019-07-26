<template>
    <div style='background: rgb(21, 35, 44);' id="fontFooter">
        <!-- ========== FOOTER ========== -->
            <footer  class="container">
                 <div class="row space-2">
                    <div class="col-md-6 mb-7 mb-md-0 u-ver-divider u-ver-divider--none-lg">
                    <!-- Contacts -->
                    <div class="media">
                        <span class="btn btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-envelope btn-icon__inner text-white"></span>
                        </span>
                        <div class="media-body">
                        <h4 class="h6 text-secondary font-weight-normal mb-0 text-white">{{$t('fronthomefootMail')}}</h4>
                        <span class="d-block font-size-1 text-white">{{$t('fronthomefootMailcon')}}</span>
                        </br>
                         <a class="font-size-14 text-white" href="mailto:service@55.com">
                            {{$t('fronthomefootMailaction')}}
                            <span class="fa fa-angle-right align-middle ml-2"></span>
                        </a>
                         <a class="font-size-14 text-white ml-5" target="_blank" :href="this.$t('helpURL')">
                            {{$t('fronthomefootHelp')}}
                            <span class="fa fa-angle-right align-middle ml-2"></span>
                        </a>
                        </div>
                    </div>
                    <!-- End Contacts -->
                </div>
                <div class="col-md-6 mb-7 mb-md-0">
                    <!-- Contacts -->
                    <div class="media">
                        <span class="btn btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-users btn-icon__inner text-white"></span>
                        </span>
                        <div class="media-body">
                        <h4 class="h6 text-secondary font-weight-normal mb-0 text-white">{{$t('fronthomefootSocial')}}</h4>
                        <span class="d-block font-size-1 text-white">{{$t('fronthomefootSocialsub')}}</span>
                         </br>
                       <a class="font-size-14 text-white mt-6" :href="englishCommunityURL" target="_blank">
                            {{$t('fronthomefootSocialact')}}
                            <span class="fa fa-angle-right align-middle ml-2"></span>
                        </a>
                        </div>
                    </div>
                    <!-- End Contacts -->
                </div>
            </div>


            <!-- Lists -->
            <div class="border-bottom">
                <div class="container space-2">
                <div class="row justify-content-md-between">
                    <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
                    <h4 class="h6 font-weight-semi-bold">{{$t('fronthomefootCompany')}}</h4>

                    <!-- List Group -->
                    <ul class="list-group list-group-flush list-group-borderless mb-0">
                        <li><router-link class="list-group-item list-group-item-action" to="/about55">{{$t('fronthomefootAbout')}}</router-link></li>
                        <li>
                            <a class="list-group-item list-group-item-action" href="https://www.linkedin.com/company/55-global/jobs/" target="_blank">{{$t('fronthomefootCareers')}}</a>
                        </li>
                        <li><router-link to="/terms"  class="list-group-item list-group-item-action">{{$t('UserAgreement')}}</router-link></li>
                        <li><router-link to="/privacy" class="list-group-item list-group-item-action">{{$t('fronthomefootPrivacy')}}</router-link></li>
                        <li><router-link to="/fee" class="list-group-item list-group-item-action">{{$t('fronthomefootFee')}}</router-link></li>
                        <!-- <li><router-link to="/tradingRules" class="list-group-item list-group-item-action">Trading Rules</router-link></li> -->
                    </ul>
                    <!-- End List Group -->
                    </div>
                    <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
                    <h4 class="h6 font-weight-semi-bold">{{$t('fronthomefootProducts')}}</h4>

                    <!-- List Group -->
                    <ul class="list-group list-group-flush list-group-borderless mb-0">
                         <li >
                            <router-link  class="list-group-item list-group-item-action" to="/exchange">{{$t('fronthomefootMarkets')}}</router-link>
                        </li>
                        <li>
                            <a class="list-group-item list-group-item-action" :href="englishCommunityURL" target="_blank">{{$t('fronthomefootSocialtrading')}}</a>
                        </li>
                        <!-- <li>
                            <router-link  class="list-group-item list-group-item-action" to="/capital">55 Capital</router-link>
                        </li> -->
                        <li>
                            <router-link to='/fatoRule' class="list-group-item list-group-item-action" >{{$t('fronthomefootATO')}}</router-link>
                        </li>
                         <li>
                            <a target="_blank" href="https://github.com/55official/55com-official-api-docs/blob/master/quote_open_api.md" class="list-group-item list-group-item-action" >{{$t('fronthomefootAPI')}}</a>
                        </li>
                    </ul>
                    <!-- End List Group -->
                    </div>

                    <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0">
                    <!-- List Group -->
                     
                    <!-- End List Group -->
                    </div>
                        <div class="col-md-6 col-lg-4">
                            <!-- Button -->
                         
                              
                        <div>
                             <img src="../../assets/images/foot_code.png" alt="Logo" style="width: 300px;">
                        </div>
                        </div>
                        
                </div>
                </div>
            </div>
            <!-- End Lists -->

            <!-- Copyright -->
           <div style="padding-bottom:30px;" class="container text-center u-space-1">
                <!-- Logo -->
                <a class="d-inline-block mb-2" href="../home/index.html" aria-label="Front">
                <!-- <img src="../../assets/images/footer/logo-white-footer.svg" alt="Logo" style="width: 50px;"> -->
                </a>
                <!-- End Logo -->
                <p class="small text-white"><a style="color:#fff;" target="_blank" href="https://www.55.com/MSB.pdf">MSB No.31000146897405</a> </p>
                <p class="small text-white">2500 Plaza 5, Unit 2553, Jersey City, NJ 07311</p>
                <p class="small text-white">&copy; 2017-2019 55. All rights reserved.</p>
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
            this.englishCommunityURL = getCommouityBaseURL()+'/api/v1/memberinterface/'+this.chatToken+'/'+encodeURIComponent('/groups/profile/967250642861035532/feed')
            this.baseSocialURL = getCommouityBaseURL()+'/api/v1/memberinterface/'+this.chatToken
        })
      }else{
        this.chatToken = 'null'
        this.englishCommunityURL = getCommouityBaseURL()+'/api/v1/memberinterface/' + this.chatToken+'/'+ encodeURIComponent('/groups/profile/967250642861035532/feed')
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
#fontFooter{
    .list-group-item-action{
        background: rgb(21, 35, 44);
        color:#fff;
    }   
    .border-bottom{
        border:1px solid rgba(0,0,0,.1) !important;
    }
    .font-weight-semi-bold{
        color:#fff;
    }
}

.us-footer {
  height: 100%;
  width: 100%;
}
</style>