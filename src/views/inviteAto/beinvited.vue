<template>
    <div id="inviteAto">
  <main id="content" role="main">
     <div class="container u-space-1">
      <div class="row">
        <div class="col-sm-12 col-md-12 mb-5 mb-md-0">
          <h2 class="h5">{{userName}}邀请您助力55 ATO，注册充值后即可获得3USDT</h2>
          <br>
          <button  @click='register'  class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><strong data-v-d1e1e420="" class="font-size-14">立即助力</strong></button>
          <br>
          <button @click="joinTelegram" type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">获取最新Supreme市场信息</span><strong data-v-d1e1e420="" class="font-size-14">加入Supreme社群</strong></span></span></button>
        </div>
      </div>
    </div>
    <!-- Hero Section -->
    <div class="u-gradient-half-warning-v3">
      <div class="container u-space-2">
        <div class="col-md-12 col-lg-12 col-xl-12">
        <div class="text-center mb-4">
          <h2 class="h3 text-white font-weight-normal">邀请好友助力获得Supreme潮牌通证，攒够潮牌通证换取正品Supreme产品 <img class="img-fluid" src="../../assets/images/supreme/supremelogo.png" alt="Image Description" width="12%"></h2>
          <p class="lead u-text-light">
            被邀用户完成注册、实名认证、充值不低于10 USDT等值的数字货币的充值，即为助力成功；发起助力邀请的用户会获得3个SUP空投；参与助力的用户，将会获得3USDT空投
          </p>
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
              <h3 class="text-white font-weight-normal">可兑换商品：Supreme 施华洛世奇联名套头衫</h3>
              <span class="d-block h6 text-white mb-2">原始零售价格：$598</span>
              <span class="d-block h6 text-white mb-2">市场参考价格：$1500</span>
              <span class="d-block h6 text-white mb-2">兑换所需潮牌通证：5980 SUP/件</span>
              <span class="d-block h6 text-white mb-2">SUP通证 ATO 价格：$0.1</span>
              <span class="d-block h6 text-white mb-2">SUP通证 ATO 总量：59,800</span>
              <span class="d-block h6 text-white mb-2">SUP ATO 开始时间：2019年5月21日，下午1点(UTC+8)</span>
            </div>
          </div>
          <!-- End Content -->
        </div>
      </div>
    </div>
    <!-- End Hero Section -->
  </main>

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
// import { Promise, reject } from 'q';
// import { resolve } from 'dns';

export default {
        data(){
            return{
                loginToken:'',
                userCode:'',
                userName:'',
                invitedCode:'',
            }
        },
        methods:{
            register(){
                window.location.href='https://m.55gm.co/#/phoneRegister?from=bevited&invite_code='+this.invitedCode;

            },
            joinTelegram(){
                 window.open('https://social.55gm.co/groups/profile/973135123669061637/feed')
            },
             getInviteCode() {
               var p = new Promise((resolve,reject)=>{
                        getHeaderTokenApi(`/api/sso/invite/query.myInviteCode`,{},this.loginToken).then(data => {
                            this.userCode = data.data.userCode;
                            resolve(data)
                    })
               })
               return p;
                
            },
            getUserPhone(){
                  getApi(getUserName+this.userCode,{}).then((res)=>{
                    this.userName =res.userName;
                  })
            },
              getUrlParams(name){
                    let after = window.location.hash.split("?")[1];
                    if(after)
                    {
                        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                        var r = after.match(reg);
                        if(r != null) {
                            return  decodeURIComponent(r[2]);
                        }
                        else  {
                            return '';
                        }

                    }

            },
            

        },
        mounted(){
                this.invitedCode = this.getUrlParams('inviteCode');
                console.log(this.invitedCode)
                this.loginToken = Cookies.get('loginToken');
                if(this.loginToken){
                  this.getInviteCode().then(this.getUserPhone).then(res=>{
                    // console.log(res)
                  })
                }
                 $.HSCore.components.HSHeader.init($('#header'));
                $.HSCore.helpers.HSFocusState.init();
                $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');
                $.HSCore.components.HSGoTo.init('.js-go-to');
             
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



