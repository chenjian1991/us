<template>
   <div id="cripto" class="cripto">
        <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    :title="this.$t('yanzheng')"
                    :mask-closable="false"
                   
                   >
                    <div id="robot"></div>
                    <p slot="footer"></p>
                </Modal>
  <!-- ========== MAIN ========== -->
  <main id="content" role="main">
       <!-- Hero Section -->
    <div style="background:#092a30;"  class="bg-img-hero">
      <div id="bg-img" class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">Got a question?</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->


    <hr class="my-0">

    <!-- Contact Form Section -->
    <div class="container space-2 space-md-3">
      <!-- Title -->
      <div class="w-md-80 w-lg-50 text-center mx-md-auto mb-9">
        <h2 class="text-primary font-weight-normal">Tell us about <span class="font-weight-semi-bold">yourself</span></h2>
        <p>Whether you have questions or you would just like to say hello, contact us.</p>
      </div>
      <!-- End Title -->

      <div class="w-lg-80 mx-auto">
        <!-- Contacts Form -->
        <form class="js-validate">
          <div class="row">
            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="form-label">
                  Your name
                  <span class="text-danger">*</span>
                </label>

                <input type="text" class="form-control" name="name" placeholder="Jack Wayley" aria-label="Jack Wayley" required
                       data-msg="Please enter your name."
                       data-error-class="u-has-error"
                       data-success-class="u-has-success">
              </div>
            </div>
            <!-- End Input -->

            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="form-label">
                  Your email address
                  <span class="text-danger">*</span>
                </label>

                <input type="email" class="form-control" name="email" placeholder="jackwayley@gmail.com" aria-label="jackwayley@gmail.com" required
                       data-msg="Please enter a valid email address."
                       data-error-class="u-has-error"
                       data-success-class="u-has-success">
              </div>
            </div>
            <!-- End Input -->

            <div class="w-100"></div>

            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="form-label">
                    Your Phone Number

                </label>

                <input type="text" class="form-control" name="subject" placeholder="Web design" aria-label="Web design" required
                       data-msg="Please enter a subject."
                       data-error-class="u-has-error"
                       data-success-class="u-has-success">
              </div>
            </div>
            <!-- End Input -->

            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="form-label">
                  Which Department are you trying to reach?
                  <span class="text-danger">*</span>
                </label>
                <select class="form-control">
                    <option>Sales</option>
                    <option>Support</option>
                  </select>
              </div>
            </div>
            <!-- End Input -->
          </div>

          <!-- Input -->
          <div class="js-form-message mb-6">
            <label class="form-label">
              How can we help you?
              <span class="text-danger">*</span>
            </label>

            <div class="input-group">
              <textarea class="form-control" rows="4" name="text" placeholder="Hi there, I would like to ..." aria-label="Hi there, I would like to ..." required
                        data-msg="Please enter a reason."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success"></textarea>
            </div>
          </div>
          <!-- End Input -->

          <div class="text-center">
            <button type="button" @click="submit" class="btn btn-55-primary btn-primary btn-wide transition-3d-hover mb-4">Submit</button>
            <p class="small">We'll get back to you in 1-2 business days.</p>
          </div>
        </form>
        <!-- End Contacts Form -->
      </div>
    </div>
    <!-- End Contact Form Section -->
  </main>
  <!-- ========== END MAIN ========== -->
   </div>
</template>

<script>


    export default {
        name:'login',
        components:{
        },
        data() {
            return {
                empty:true,
                googleID:'',
                robotModalflag:false,
            }



        },
      
        methods:{
            submit(){   
                this.robotModalflag = true;
            },
                onloadCallback(){
                let _that = this;
                let widgetId=grecaptcha.render('robot', {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        if(data.length!==0){
                            // _that.verifiyedMethod(data,'google')
                            // setTimeout(()=>{
                            //     _that.robotModalflag= false;
                            // },2000)
                        }
                    },
                    "expired-callback":function(){//验证失效回调函数
                        console.log('expired-callback')
                    },
                    "error-callback":function(){//因为网络等问题无法验证，通过回调函数提醒用户重试
                        console.log('error-callback')
                    },

                    });
                    // console.log('ccc',widgetId)
                    _that.googleID = widgetId;
                    return widgetId;

            },


        },
        computed:{
            
            
        },
        watch:{
            languageChange(val,oldVal){
            },
        },
        mounted(){
            this.onloadCallback()
             $.HSCore.components.HSValidation.init('.js-validate', {
                    rules: {
                    confirmPassword: {
                        equalTo: '#signupPassword'
                    }
                    }
      });

        },
    
        
        
    }
</script>
<style lang="less">
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-footer{
            border-top: none;
        }
    }
#cripto{
    p{
        // margin: auto !important;
        padding: auto !important;
        color: #77838f;
        line-height: 1.7;
        margin-bottom: 1rem;
        font-size: 16px;
    }
    h1{
        font-size: 2.5rem;
    }
    #bg-img{
        background: url('../../assets/images/headertoggle/common_hero.jpeg') no-repeat;
        height: 120%;
        background-size: cover;
    }
    .btn-55-primary {
    background:#12869A !important;
    }
    .text-primary{
      color:#12869A !important;
  }
}

    
</style>


