<template>
    <div id="inviteAto">
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="u-gradient-half-warning-v3">
      <div class="container u-space-2">

<div class="col-md-12 col-lg-12 col-xl-12">


<div class="text-center mb-4">


  <h2 class="h3 text-white font-weight-normal">{{$t('supregisterplus')}} <img class="img-fluid" src="../../assets/images/supreme/supremelogo.png" alt="Image Description" width="12%"></h2>
  <!-- <p class="lead u-text-light">
    
  {{$t('supregisterplus')}}
  </p> -->

</div></div>

<br>

        <div class="row justify-content-md-between">
          <!-- Item Image -->
          <div class="col-md-6 mb-7 mb-md-0">
            <div class="js-slick-carousel u-slick"
                 data-infinite="true"
                 data-arrows-classes="u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                 data-arrow-left-classes="fa fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left"
                 data-arrow-right-classes="fa fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right"
                 data-pagi-classes="text-center u-slick__pagination u-slick__pagination--white mt-7 mb-0">
              <div class="js-slide px-7 my-4">
                <img class="img-fluid" src="../../assets/images/supreme/img6.png" alt="Image Description">
              </div>
              <div class="js-slide px-7 my-4">
                <img class="img-fluid" src="../../assets/images/supreme/img7.png" alt="Image Description">
              </div>
            </div>
          </div>
          <!-- End Item Image -->

          <!-- Content -->
          <div class="col-md-5">
            <div class="mb-5">
              <h3 class="text-white font-weight-normal">{{$t('supproductplus')}}</h3>
              <span class="d-block h6 text-white mb-2">{{$t('suppriceplus')}}</span>
              <span class="d-block h6 text-white mb-2">{{$t('supmarketplus')}}</span>
              <span class="d-block h6 text-white mb-2">{{$t('suptokneplus')}}</span>
              <span class="d-block h6 text-white mb-2">{{$t('supatopriceplus')}}</span>
              <span class="d-block h6 text-white mb-2">{{$t('supatoquentityplus')}}</span>
              <span class="d-block h6 text-white mb-2">{{$t('suptimeplus')}}</span>
            </div>
            <button  @click='popup' v-if="loginflag"  class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">{{$t('supcommonplus')}}</span><strong data-v-d1e1e420="" class="font-size-14">{{$t('supfriendplus')}}</strong></span></span></button>
            <button @click='gotoLogin' v-else target="_blank" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">{{$t('supcommonplus')}}</span><strong data-v-d1e1e420="" class="font-size-14">{{$t('supfriendplus')}}</strong></span></span></button>
            <!-- <button  target="_blank" class="btn btn-xs u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><strong data-v-d1e1e420="" class="font-size-14">{{$t('BalancesEventOver')}}</strong></span></span></button> -->
            <br>
            <button @click="joinTelegram" type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">{{$t('supmessageplus')}}</span><strong data-v-d1e1e420="" class="font-size-14">{{$t('supsocialplus')}}</strong></span></span></button>


          </div>
          <!-- End Content -->
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- Product Details Section -->
    <div class="container u-space-1">
      <div class="row">
        <div class="col-sm-12 col-md-12 mb-5 mb-md-0">
          <h2 class="h5">{{$t('suprulesplus')}}</h2>
          <h2 class="h6">{{$t('supactivetimeplus')}}</h2>
          <h2 class="h6">{{$t('supmaxpersonplus')}}</h2>
          <ul class="text-secondary pl-3">
            <li>{{$t('supaddtionplus')}}</li>
            <li>{{$t('supsuccessplus')}}</li>
            <li>{{$t('suprewardplus')}}</li>
            <li>{{$t('supaccountplus')}}</li>
            <li>{{$t('supforbidenplus')}}</li>
            <li>{{$t('supemailplus')}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Prouct Details Section -->


  </main>
  <!-- ========== END MAIN CONTENT ========== -->
     <Modal
        class='inviteAto'
        v-model="modal1"
        :title='this.$t("supinviteurlplus")'
       >
        <p v-html="inviteLink"></p>
        <div slot="footer">
            <Button type="primary" size="large"   @click="del">{{$t('supcloseplus')}}</Button>
            <Button type="primary" size="large" v-clipboard:copy="inviteLink" v-clipboard:success="onCopy">{{$t('supcopyplus')}}</Button>
        </div>
    </Modal>
  <!-- Go to Top -->
  <a class="js-go-to u-go-to" href="#"
    data-position='{"bottom": 15, "right": 15 }'
    data-type="fixed"
    data-offset-top="400"
    data-compensation="#header"
    data-show-effect="slideInUp"
    data-hide-effect="slideOutDown">
    <span class="fa fa-arrow-up u-go-to__inner"></span>
  </a>
  <!-- End Go to Top -->
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import { getHeaderTokenApi,getApi } from '_api/axios'
import {getUserName} from '../../../api/urls.js'
import { debuglog } from 'util';
export default {
        data(){
            return{
                loginflag:false,
                modal1:false,
                inviteLink:'',
                userCode:'',
            }
        },
        methods:{
            judgeLogin(){
                let flag = Cookies.get('loginToken');
                if(flag){
                    this.loginflag = true;
                }else{
                    this.loginflag = false;
                }

            },
            del(){
                this.modal1= false;
            },
            onCopy(){
                this.$Message.success(this.$t('copySuccess'));
                this.modal1= false;
            },
            popup(){
                this.getInviteCode();
            },
            gotoLogin(){
                window.location.href='https://m.55link.de.com/#/login?from=inviteATO'
            },
            joinTelegram(){
                  if(Cookies.get('loginToken')){//登陆了
                         window.open('https://social.55link.de.com/groups/profile/973135123669061637/feed')
                  }else{
                       window.location.href='https://m.55link.de.com/#/login?from=inviteATO'
                  }
            },
             getInviteCode() {
               var p = new Promise((resolve,reject)=>{
                        getHeaderTokenApi(`/api/sso/invite/query.myInviteCode`,{},Cookies.get('loginToken')).then(data => {
                            this.userCode = data.data.userCode;
                            this.inviteLink =this.$t('supfriend2plus')+'https://us.55link.de.com/#/beinvitedplus?inviteCode='+this.userCode;
                            if(data.data.code){
                                if(data.data.code='10013'){
                                    this.$Message.success(this.$t('10013'));
                                    window.location.href='https://m.55link.de.com/#/login?from=inviteATO';
                                }else{
                                    this.$Message.success(this.$t(data.data.code));
                                }
                                  
                            }else{
                               this.modal1=true;
                            }
                            resolve(data)
                    })
               })
               return p;
            },
        },
        mounted(){
                 $.HSCore.components.HSHeader.init($('#header'));
                  $.HSCore.helpers.HSFocusState.init();
                  $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');
                  $.HSCore.components.HSGoTo.init('.js-go-to');
                  this.judgeLogin();
        }
}
</script>
<style lang='less'>
 .inviteAto{
 .ivu-modal-header{
         .ivu-modal-header-inner{
             text-align:center;
         }
     }
     .ivu-modal-footer{
       div{
         button{
           background: #12869a;
         }
       }
     }

 }
</style>
<style lang="less" scoped>
 #inviteAto{
     width: 100%;
     height: 100%;
     .u-gradient-half-warning-v3{
         background: url('../../assets/images/supreme/supreme.jpg') repeat;
         
     }
     
 }

</style>



