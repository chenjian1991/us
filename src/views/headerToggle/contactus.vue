<template>
  <div id="cripto" class="cripto">
    <!-- <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    :title="this.$t('yanzheng')"
                    :mask-closable="false"
                   
                   >
                    <div id="robot"></div>
                    <p slot="footer"></p>
    </Modal>-->
    <!-- ========== MAIN ========== -->
    <main id="content" role="main">
      <input type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0" />
      <div id="captcha"></div>
      <!-- Hero Section -->
      <div style="background:#092a30;" class="bg-img-hero">
        <div id="bg-img" class="container space-2 space-lg-3">
          <div class="w-lg-65 text-center mx-lg-auto">
            <h1 class="text-white font-weight-medium mb-0">Got a question?</h1>
          </div>
        </div>
      </div>
      <!-- End Hero Section -->

      <hr class="my-0" />

      <!-- Contact Form Section -->
      <div class="container space-2 space-md-3">
        <!-- Title -->
        <div class="w-md-80 w-lg-50 text-center mx-md-auto mb-9">
          <h2 class="text-primary font-weight-normal">
            Tell us about
            <span class="font-weight-semi-bold">yourself</span>
          </h2>
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

                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    name="name"
                    aria-label="Jack Wayley"
                    required
                    data-msg="Please enter your name."
                    data-error-class="u-has-error"
                    data-success-class="u-has-success"
                  />
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

                  <input
                    v-model="emailAddress"
                    type="email"
                    class="form-control"
                    name="email"
                    aria-label="jackwayley@gmail.com"
                    required
                    data-msg="Please enter a valid email address."
                    data-error-class="u-has-error"
                    data-success-class="u-has-success"
                  />
                </div>
              </div>
              <!-- End Input -->

              <div class="w-100"></div>

              <!-- Input -->
              <div class="col-sm-6 mb-6">
                <div class="js-form-message">
                  <label class="form-label">Phone</label>

                  <input
                    v-model="phone"
                    type="text"
                    class="form-control"
                    name="subject"
                    aria-label="Phone"
                    required
                    data-msg="Please enter your phone number."
                    data-error-class="u-has-error"
                    data-success-class="u-has-success"
                  />
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
                  <select @change="changeSelect" class="form-control">
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
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
                <textarea
                  v-model="textarea"
                  class="form-control"
                  rows="4"
                  name="text"
                  aria-label="Hi there, I would like to ..."
                  required
                  data-msg="Please enter a reason."
                  data-error-class="u-has-error"
                  data-success-class="u-has-success"
                ></textarea>
              </div>
            </div>
            <!-- End Input -->

            <div class="text-center">
              <button
                type="button"
                @click="submit"
                class="btn btn-55-primary btn-primary btn-wide transition-3d-hover mb-4"
              >Submit</button>
              <!-- <p class="small">We'll get back to you in 1-2 business days.</p> -->
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
import { postHeaderTokenBodyApi } from "../../../api/axios.js";
import { redeemInfoUrl } from "../../../api/urls.js";
export default {
  name: "login",
  components: {},
  data() {
    return {
      empty: true,
      googleID: "",
      robotModalflag: false,
      name: "",
      emailAddress: "",
      phone: "",
      textarea: "",
      selectValue: "Sales",
      captchaIns: ""
    };
  },
  methods: {
    submit() {
      if (
        this.name == "" ||
        this.emailAddress == "" ||
        this.phone == "" ||
        this.textarea == ""
      ) {
        this.$Notice.error({
          title: this.$t("输入框不能为空"),
          desc: this.$t("输入框不能为空")
        });
        return false;
      } else {
        this.captchaIns && this.captchaIns.popUp();
      }
    },
    changeSelect(event) {
      this.selectValue = event.target.value;
    },
    initRobot() {
      let _that = this;
      let captchaIns;
      if (captchaIns) {
        captchaIns.destroy();
      }
      initNECaptcha(
        {
          element: "#captcha",
          captchaId: "a3cd39c172284133a3470b7ec05a2bb0",
          mode: "popup",
          width: "320px",
          lang: "en",
          onReady: function(instance) {
            // 验证码一切准备就绪，此时可正常使用验证码的相关功能
          },
          onClose: function() {
            // 弹出关闭结束后将会触发该函数
            // console.log('close')
            // _that.loaded = true;
          },
          onVerify: function(err, data) {
            if (err) {
              //
            }
            if (data) {
              //网易人机验证通过
              let value = document.getElementsByName("NECaptchaValidate")[0]
                .value;
              _that.verify(value);
            }
          }
        },
        function(instance) {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          _that.captchaIns = instance;
        },
        function onerror(err) {
          _that.captchaIns = "";
          //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        }
      ); //初始化函数结尾

      return captchaIns;
    },
    verify(validate) {
      postHeaderTokenBodyApi(redeemInfoUrl, validate, {
        business: "contactus",
        name: this.name,
        emailAddress: this.emailAddress,
        phone: this.phone,
        textarea: this.textarea,
        selectValue: this.selectValue
      }).then(data => {
        if (data.result) {
          this.$Notice.success({
            title: this.$t(11001),
            desc: this.$t(11001)
          });
        }
      });
    }
  },
  computed: {},
  watch: {
    languageChange(val, oldVal) {}
  },
  mounted() {
    this.initRobot();

    $.HSCore.components.HSValidation.init(".js-validate", {
      rules: {
        confirmPassword: {
          equalTo: "#signupPassword"
        }
      }
    });
  }
};
</script>
<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
  .ivu-modal-footer {
    border-top: none;
  }
}
#cripto {
  p {
    // margin: auto !important;
    padding: auto !important;
    color: #77838f;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 16px;
  }
  h1 {
    font-size: 2.5rem;
  }
  #bg-img {
    background: url("../../assets/images/headertoggle/common_hero.jpeg")
      no-repeat;
    height: 120%;
    background-size: cover;
  }
  .btn-55-primary {
    background: #12869a !important;
  }
  .text-primary {
    color: #12869a !important;
  }
}
</style>


