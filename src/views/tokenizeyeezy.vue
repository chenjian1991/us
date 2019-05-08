<template>
  <div class="redeemyyeezy">
    <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
        <div id="captcha"></div>
    <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll"
         data-options='{direction: "normal"}' style="background-image: url(assets/img14.jpg);">
      <!-- Apply your Parallax background image here -->
      <div class="divimage dzsparallaxer--target" style="height: 120%; background-image: url(img14.jpg);"></div>

      <!-- Content -->
      <div class="container position-relative u-space-5-top u-space-3-bottom z-index-2">
        <div class="w-lg-80 text-center mx-auto">
          <h1 class="display-5 font-size-40--md-down text-white font-weight-bold">Tokenize Your Yeezy Sneaker </h1>
          <p class="lead text-white">for Yeezy Tokens</p>
        </div>
      </div>
      <!-- End Content -->
    </div>
    <!-- End Hero Section -->



<div class="container u-space-3">
        
      

      <div class="row">

        <div class="col-lg-8 order-lg-1">
          <div class="js-validate" novalidate="novalidate">


 

  
            <!-- Title -->
            <div class="mb-4">
              <h2 class="h5">Before submit a tokenization request, please read the following notes with care. </h2>
            </div>
            <!-- End Title -->


<!-- Title -->
            <p>1. Your sneaker should be among one of the following Yeezy models.  </p>
            <p>2. Your sneaker should be in brand new and unworn condition. Note that 55 will request third-party to conduct authenticity check. In case the sneaker does not pass legit check, it will be returned to you at your cost. </p>
            <p>3. Shipping cost and tokenization fee will be deducted from the tokens for the sneaker.</p>
            <div class="mb-4">
              <h2 class="h5">Step 1: Pick an item you would like to tokenize.</h2>
            </div>
            <!-- End Title -->
<div class="col-md-9"><div class="bg-white rounded p-3"><div class="custom-control custom-radio d-flex align-items-center small text-muted">
  <input type="radio" v-model="select" value=2015 id="deliveryRadio1" name="deliveryRadio" checked="checked" class="custom-control-input"><label for="deliveryRadio1" class="custom-control-label ml-1"><span class="d-block h6 text-dark font-weight-normal mb-1"><strong class="text-dark">adidas Yeezy Boost 350 Pirate Black（2015）- size 7-13<br></strong></span><span class="d-block">Style Code: AQ2659</span><img src="assets/shoes/sneaker.jpg" style="width: 120px;"></label></div></div><hr class="my-0"><div class="bg-white rounded p-3"><div class="custom-control custom-radio d-flex align-items-center small text-muted">
  <input type="radio" v-model="select" value=2016 id="deliveryRadio2" name="deliveryRadio" class="custom-control-input"><label for="deliveryRadio2" class="custom-control-label ml-1"><span class="d-block h6 text-dark font-weight-normal mb-1"><strong class="text-dark">adidas Yeezy Boost 350 Pirate Black (2016) - size 7-13<br></strong></span><span class="d-block">Style Code: AQ2659</span><img src="assets/shoes/sneaker.jpg" style="width: 120px;"></label></div></div><hr class="my-0"></div>
<br>


            <!-- Title -->
            <!-- End Title -->

                       


<br>

            <!-- Title -->
            <div class="mb-4" style="margin-top:22px">
              <h2 class="h5">Step 2: Input your personal information</h2>
            </div>
            <!-- End Title -->

            <!-- Billing Form -->
            <div class="row mb-9" style="height:190px">
              <div class="col-md-6">
                <!-- Input -->
                <div class="js-form-message mb-6">
                  <label class="h6 small d-block text-uppercase">
                    First name
                    <span class="text-danger">*</span>
                  </label>

                  <div class="js-focus-state input-group u-form">
                    <input v-model="firstName" class="form-control u-form__input" type="text" required="" placeholder="e.g. Jack" aria-label="Jack" data-msg="Please enter your frist name." data-error-class="u-has-error" data-success-class="u-has-success">
                  </div>
                  <p v-if="judge && !firstName" style="color:red">Please fill in.</p>
                </div>
                <!-- End Input -->
              </div>

              <div class="col-md-6">
                <!-- Input -->
                <div class="js-form-message mb-6">
                  <label class="h6 small d-block text-uppercase">
                    Last name
                    <span class="text-danger">*</span>
                  </label>

                  <div class="js-focus-state input-group u-form">
                    <input v-model="lastName" class="form-control u-form__input" type="text" required="" placeholder="e.g. Wayley" aria-label="Wayley" data-msg="Please enter your last name." data-error-class="u-has-error" data-success-class="u-has-success">
                  </div>
                  <p v-if="judge && !lastName" style="color:red">Please fill in.</p>

                </div>
                <!-- End Input -->
              </div>

              <div class="w-100"></div>

              <div class="col-md-6">
                <!-- Input -->
                <div class="js-form-message mb-6">
                  <label class="h6 small d-block text-uppercase">
                    Email address
                    <span class="text-danger">*</span>
                  </label>

                  <div class="js-focus-state input-group u-form">
                    <input v-model="email" class="form-control u-form__input" type="email" required="" placeholder="e.g. jackwayley@gmail.com" aria-label="jackwayley@gmail.com" data-msg="Please enter a valid email address." data-error-class="u-has-error" data-success-class="u-has-success">
                  </div>
                  <p v-if="judge && !email" style="color:red">Please fill in.</p>

                </div>
                <!-- End Input -->
              </div>

              <div class="col-md-6">
                <!-- Input -->
                <div class="js-form-message mb-6">
                  <label class="h6 small d-block text-uppercase">
                    Phone
                  </label>

                  <div class="js-focus-state input-group u-form">
                    <input v-model="phone" class="form-control u-form__input" type="text" placeholder="e.g. +1 (062) 109-9222" aria-label="+1 (062) 109-9222" data-msg="Please enter your last name." data-error-class="u-has-error" data-success-class="u-has-success">
                  </div>
                  <p v-if="judge && !phone" style="color:red">Please fill in.</p>

                </div>
                <!-- End Input -->
              </div>

              <div class="w-100"></div>



            </div>
            <!-- End Billing Form -->


          <div class="text-left">
            <button @click='handleBtn()' class="btn btn-primary u-btn-primary u-btn-wide transition-3d-hover mb-4">Submit Tokenization Request</button>
            <p class="small">Our customer service will get back to you in 1-2 working days.</p>
          </div>

            



          </div>
        </div>
      </div>
    </div>








    <hr class="my-0">

 


  </main>
  <!-- ========== END MAIN ========== -->
  <div v-if="isSubmit" class="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open" style="animation-duration: 300ms; animation-delay: 150ms;">
    <div id="animationModal" class="u-modal-window p-7" style="width: 500px;display: block;height: 160px;background-color: #eee;">
              <button class="btn btn-xs u-btn--icon u-btn-text-secondary u-modal-window__close" type="button" onclick="Custombox.modal.close();">
                <span class="fas fa-times"></span>
              </button>

              <div style="text-align:center" class="mb-7">
                <p style="margin-top: 42px;font-size: 18px;">{{modalInfo}}</p>
              </div>

              <button type="button" style="margin-left: 230px;margin-top: 18px;" class="btn btn-primary" role="button" @click="isSubmit = false">OK</button>
            </div>
            </div>
</div>
</template>
<script>
import {postApplyCardInfo} from '../../api/post'
export default {
  data(){
      return {
        select:'2015',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        isSubmit:false,
        modalInfo:'',
        judge:false
      }
  },
  methods:{
      handleBtn(){
        this.judge = true
        if( this.select && this.firstName && this.lastName && this.email && this.phone ){
          this.captchaIns && this.captchaIns.popUp()
        }
      },
      initRobot(){
              let _that = this;
              let captchaIns;
              if (captchaIns) {
                  captchaIns.destroy()
              }
              let lan = this.$store.state.app.countryLanguage;
              if(lan==='zh-CN'){
                      lan = 'zh-CN'
              }else{
                  lan = 'en'
              }
              initNECaptcha({
                  element: '#captcha',
                  captchaId: 'a3cd39c172284133a3470b7ec05a2bb0',
                  mode: 'popup',
                  width: '320px',
                  lang:lan,
                  onReady: function (instance) {
                      // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                      //console.log('instance',instance)
                  },
                    onClose: function () {
                      // 弹出关闭结束后将会触发该函数
                      // console.log('close')
                      // _that.loaded = true;
                  },
                  onVerify: function (err, data) {
                      if(err){
                          //console.log('err',err)
                      }
                      if(data){
                          //console.log('validate',data.validate)
                          _that.verify(data.validate)
                          _that.initRobot()
                      }
                  }
              }, function (instance) {
                  // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
                  _that.captchaIns = instance;
              }, function onerror(err) {
                  _that.captchaIns = ''
                  //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
              })//初始化函数结尾
              
              return captchaIns;
          },
          verify(validate){
              //debugger
              postApplyCardInfo(validate,{
                  business:"TOKENISEYEEZY",
                  select:this.select,
                  firstName:this.firstName,
                  lastName:this.lastName,
                  email:this.email,
                  phone:this.phone
              }).then(data => {
                    this.isSubmit = true
                    this.modalInfo = 'Your message is well received!'
                }).catch(err => {
                    this.isSubmit = true
                    this.modalInfo = 'We can not send through your message for some reason, please re-check and send again.'
                })
          },
  },
  mounted(){
          this.initRobot();
      }
};
</script>
