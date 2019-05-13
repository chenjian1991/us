<template>
    <div id="inviteAto">
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="u-gradient-half-warning-v3">
      <div class="container u-space-2">

<div class="col-md-12 col-lg-12 col-xl-12">


<div class="text-center mb-4">


  <h2 class="h3 text-white font-weight-normal">邀请好友助力获得Supreme潮牌通证，攒够潮牌通证换取正品Supreme产品 <img class="img-fluid" src="../../assets/images/supreme/supremelogo.png" alt="Image Description" width="12%"></h2>



  <p class="lead u-text-light">
    
被邀用户完成注册、实名认证、充值不低于10 USDT等值的数字货币的充值，即为助力成功；发起助力邀请的用户会获得30个Supreme空投；参与助力的用户，将会获得3 USDT空投
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
              <span class="d-block h6 text-white mb-2">市场价格：$1403 - 同款StockX价格</span>
              <span class="d-block h6 text-white mb-2">兑换所需潮牌通证：59800 Supreme 通证/件</span>
              <span class="d-block h6 text-white mb-2">Supreme通证 ATO 价格：$0.01</span>
              <span class="d-block h6 text-white mb-2">Supreme通证 ATO 总量：598,000</span>
              <span class="d-block h6 text-white mb-2">Supreme ATO 开始时间：2019年5月21日，下午1点(UTC+8)</span>
            </div>

            <button  @click='popup' v-if="loginflag"  class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">您可获得30 Supreme通证，好友获得3 USDT</span><strong data-v-d1e1e420="" class="font-size-14">现在就邀请好友助力</strong></span></span></button>
            <button @click='gotoLogin' v-else target="_blank" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">您可获得30 Supreme通证，好友获得3 USDT</span><strong data-v-d1e1e420="" class="font-size-14">现在就邀请好友助力</strong></span></span></button>
            <br>
            <button type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">获取最新Supreme市场信息</span><strong data-v-d1e1e420="" class="font-size-14">加入Supreme社群</strong></span></span></button>


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
          <h2 class="h5">助力规则</h2>
          <h2 class="h6">活动时间：2019年5月14日12:00开始，至2019年5月21日 14:00结束</h2>
          <h2 class="h6">助力名额：2000个用户，先到先得，名额满员活动结束</h2>
          <ul class="text-secondary pl-3">
            <li>用户登录后，发起邀请后，助力用户完成注册、实名认证、充值不低于10USDT等值的数字货币的充值，即为助力成功；</li>
            <li>发起助力邀请的用户，在助力成功后，会获得30个Supreme空投；参与助力的用户，在完成助力步骤后，将会获得3USDT空投；（Supreme会在ATO以后正式开始交易）</li>
            <li>每位用户可重复邀请好友助力，但只有第一次助力成功即可获取奖励，不会叠加奖励；后续邀请仅有好友一方获得奖励；</li>
            <li>完成助力获得的奖励（Supreme和USDT）会在三个工作日以内空投至用户账户；</li>
            <li>禁止作弊，如发现用户作弊，将取消活动奖励；</li>
            <li>本活动解释权归55资产网络所有，客服联系方式service@55.com；</li>
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
        title='您的邀请链接是'
       >
        <p>好友喊你来助力55 ATO，注册充值即获得100 Supreme，快来参加吧</p>
        <p >http://localhost:8080/#/beinvited</p>
        <div slot="footer">
            <Button type="primary" size="large"   @click="del">关闭</Button>
            <Button type="primary" size="large" v-clipboard:copy="inviteLink" v-clipboard:success="onCopy">复制</Button>
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
import Cookies from 'js-cookie'
export default {
        data(){
            return{
                loginflag:false,
                modal1:false,
                inviteLink:'http://localhost:8080/#/beinvited'
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
                this.modal1=true;
            },
            gotoLogin(){
                // window.open('http://47.75.120.27:8030/mobile/#/login?from=inviteATO')
                window.location.href='http://47.75.120.27:8030/mobile/#/login?from=inviteATO'
            }
            

        },
        mounted(){
                 $.HSCore.components.HSHeader.init($('#header'));
                // initialization of unfold component
                $.HSCore.components.HSUnfold.init($('[data-unfold-target]'), {
                    afterOpen: function () {
                    $(this).find('input[type="search"]').focus();
                    }
                });

                // initialization of malihu scrollbar
                $.HSCore.components.HSMalihuScrollBar.init($('.js-scrollbar'));

                // initialization of forms
                $.HSCore.helpers.HSFocusState.init();

                // initialization of form validation
                $.HSCore.components.HSValidation.init('.js-validate', {
                    rules: {
                    confirmPassword: {
                        equalTo: '#password'
                    }
                    }
                });

                // initialization of show animations
                $.HSCore.components.HSShowAnimation.init('.js-animation-link');

                // initialization of slick carousel
                $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

                // initialization of autonomous popups
                $.HSCore.components.HSModalWindow.init('[data-modal-target]', '.js-shopping-cart-window', {
                    autonomous: true
                });

                // initialization of go to
                $.HSCore.components.HSGoTo.init('.js-go-to');
                $.HSCore.components.HSModalWindow.init('.js-modal-window', {// 弹窗
                    autonomous: true
                });
                this.judgeLogin()
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



