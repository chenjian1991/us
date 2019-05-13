<template>
    <div id="registerSuccess">
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="u-gradient-half-warning-v3">
      <div class="container u-space-2">

<div class="col-md-12 col-lg-12 col-xl-12">
<div class="text-center mb-4">
        </div></div>
        <div class="row justify-content-md-between">
          <div class="col-md-5">
            <div class="mb-5">
              <h3 class="text-white font-weight-normal">恭喜您注册成功</h3>
            </div>
                <button type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">获取最新Supreme市场信息</span><strong data-v-d1e1e420="" class="font-size-14">加入Supreme社群</strong></span></span></button>
                <br>
                <button  @click='download'  class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><strong data-v-d1e1e420="" class="font-size-14">立即下载APP进行充值</strong></button>
          </div>
        </div>
      </div>
    </div>
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
import Cookies from 'js-cookie'
export default {
        data(){
            return{
                loginflag:false,
                // modal1:true,
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
            download(){
                window.open('https://us.55gm.co/#/download')
            },
            

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
        }
}
</script>
<style lang='less'>
 .registerSuccess{
 .ivu-modal-header{
         .ivu-modal-header-inner{
             text-align:center;
         }
     }
 }
</style>
<style lang="less" scoped>
 #registerSuccess{
     width: 100%;
     height: 100%;
     .container{
          min-height:100vh
     }
     .u-gradient-half-warning-v3{
         background: url('../../assets/images/supreme/supreme.jpg') repeat;

     }
     
 }

</style>



