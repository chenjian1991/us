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
            <div>
                <div class="container space-2">
                <div class="row justify-content-left">
                    <div class="col-sm-2 col-lg-2 mb-4">
                    <h4 class="h6 font-weight-semi-bold">About Us</h4>

                    <!-- List Group -->
                    <ul class="list-group list-group-flush list-group-borderless mb-0">
                        <li><router-link class="list-group-item list-group-item-action" to="/ourcompany">Our Company</router-link></li>
                        <li><router-link to="/team"  class="list-group-item list-group-item-action">The Team</router-link></li>
                        <li>
                            <a class="list-group-item list-group-item-action" href="https://www.linkedin.com/company/55-global/jobs/" target="_blank">{{$t('fronthomefootCareers')}}</a>
                        </li>
                        <li><router-link to="/contactus" class="list-group-item list-group-item-action">Contact Us</router-link></li>
                    
                        <!-- <li><router-link to="/tradingRules" class="list-group-item list-group-item-action">Trading Rules</router-link></li> -->
                    </ul>
                    <!-- End List Group -->
                    </div>
                    <div class="col-sm-2 col-lg-2 mb-4 ">
                        <h4 class="h6 font-weight-semi-bold">Legal</h4>
                        <!-- List Group -->
                        <ul class="list-group list-group-flush list-group-borderless mb-0">
                            <li >
                                <router-link  class="list-group-item list-group-item-action" to="/terms">User Agreement</router-link>
                            </li>
                            <li>
                                <router-link  class="list-group-item list-group-item-action" to="/privacy">Privacy Policy</router-link>
                            </li>
                            <li><router-link to="/fee" class="list-group-item list-group-item-action">Trading Fees</router-link></li>
                           <li><router-link to="/tradingRules" class="list-group-item list-group-item-action">Trading Rules</router-link></li>
                        
                            
                            
                          
                        </ul>
                        <!-- End List Group -->
                    </div>
                     <div class="col-sm-2 col-lg-2 mb-4">
                        <h4 class="h6 font-weight-semi-bold">Benefits</h4>
                        <!-- List Group -->
                        <ul class="list-group list-group-flush list-group-borderless mb-0">
                            <li >
                                <router-link  class="list-group-item list-group-item-action" to="/whyus">Why Us</router-link>
                            </li>
                            <li>
                                <router-link  class="list-group-item list-group-item-action" to="/smartexecution">Smart Execution</router-link>
                            </li>
                            <li>
                                <router-link  class="list-group-item list-group-item-action" to="/faqs">FAQs</router-link>
                            </li>
                          
                        </ul>
                        <!-- End List Group -->
                    </div>
                     <div class="col-sm-2 col-lg-2 mb-4">
                        <h4 class="h6 font-weight-semi-bold">Features</h4>
                        <!-- List Group -->
                        <ul class="list-group list-group-flush list-group-borderless mb-0">
                            <li >
                                <router-link  class="list-group-item list-group-item-action" to="/crypto">Crypto Trading</router-link>
                            </li>
                            <li>
                                <a href="http://55.trade/doc/#introduction" target="_blank"  class="list-group-item list-group-item-action" >API Trading</a>
                            </li>
                            <li>
                                <a class="list-group-item list-group-item-action" :href="baseSocialURL" target="_blank">Social Trading</a>
                            </li>
                          
                        </ul>
                        <!-- End List Group -->
                    </div>
                    <div class="col-sm-2 col-lg-2 mb-4">
                      <div>
                        <div>
                             <img  src="../../assets/images/foot_code.png" alt="Logo" style="width:300px;height:auto;">
                        </div>
                        </div>
                    </div>
                        
                        
                </div>
                </div>
            </div>
            <!-- End Lists -->

            <!-- Copyright -->
           <div style="padding-bottom:30px;" class="container text-center space-1">
                <a class="d-inline-block mb-2" href="../home" aria-label="Front">
                <!-- <img src="assets/svg/logos/logo-white-footer.svg" alt="Logo" style="width: 50px;"> -->
                <img src="../../assets/images/kyc/logo-white-footer.svg" alt="Logo" style="width: 50px;">
                
                </a>
                <!-- target="_blank" href="https://www.55.com/MSB.pdf" -->
                <p class="small text-white"><a style="color:#fff;" >MSB No. 31000151244818</a></p>
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
            <!-- <li class="list-inline-item mb-2 mb-sm-0">
              <a class="btn btn-sm btn-icon btn-soft-indigo rounded-circle" href="javascript:;" target="_blank">
                <span class="fab fa-youtube btn-icon__inner" style="color:#fff"></span>
              </a>
            </li> -->
          </ul>
          <!-- End Social Networks -->
        </div> 
            </div>
            </footer>
<!-- ========== END FOOTER ========== -->
            
    </div>
</template>


<script>
  import {getCommouityBaseURL} from '../../config/index'
  import {postHeaderTokenBodyApi} from '_api/axios'
  import Cookies from 'js-cookie'
  import {
    socialToken,
    } from "../../../api/urls.js";
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
        postHeaderTokenBodyApi(socialToken,this.loginToken,null).then(data => {
            this.chatToken = data.token +'/'
            //社区链接
            this.englishCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+'/'+encodeURIComponent('/groups/profile/967250642861035532/feed')
            this.baseSocialURL = getCommouityBaseURL()+'/api/v1/memberinterface/'+this.chatToken
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
            },500)
            
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