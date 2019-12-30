<template>
  <div id="forgotpassword" class="root">
    <Modal
      class-name="vertical-center-modal"
      v-model="robotModalflag"
      :title="this.$t('yanzheng')"
      :mask-closable="false"
      :scrollable="true"
    >
      <div id="robotForgotpwd"></div>
      <p slot="footer"></p>
    </Modal>
    <div class="wrapper">
      <div class="register_wraper">
        <div class="inner_input_login">
          <div class="login_title">
            <h2>{{$t('zhmmResetPassword')}}</h2>
            <p>{{$t('zhmmResetExplain')}}</p>
          </div>
          <Form
            onsubmit="return false;"
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
          >
            <FormItem class="form_item" prop="phoneNumber">
              <img src="../../assets/images/register/accountnew.svg" />
              <Input v-model="formValidate.phoneNumber" :placeholder="$t('zhmmInputAccount')"></Input>
            </FormItem>
            <Button
              v-if="loaded"
              class="loginbtn"
              @click="handleSubmit('formValidate')"
              type="primary"
            >{{$t('zhmmResetSubmit')}}</Button>
            <Button
              v-else
              disabled
              loading
              class="loginbtn"
              @click="handleSubmit('formValidate')"
              type="primary"
            ></Button>
            <input type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0" />
            <div id="captcha"></div>
          </Form>
        </div>
      </div>
    </div>
    <ModalTips :modal="showModal" :text="text"></ModalTips>
  </div>
</template>

<script>
import {
  userVerify,
  verifyEmail,
  ipQuery,
  userStatus
} from "../../../api/urls.js";
import {
  postBaseApi,
  postHeaderTokenBodyApi,
  getApiLoin,
  getApi
} from "../../../api/axios.js";
import ModalTips from "@/components/Modal";
import {
  queryUserStatus,
  geeTest,
  onloadCallback
} from "../../../api/usersystem.js";

export default {
  name: "login",
  components: {
    ModalTips
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("phoneNumberRequier")));
      } else {
        let pattern = /[*]/;
        if (pattern.test(value)) {
          callback(new Error(this.$t("numberMust")));
        } else {
        }
        callback();
      }
    };
    return {
      empty: true,
      formValidate: {
        phoneNumber: ""
      },
      showModal: false,
      loaded: true,
      text: "",
      captchaIns: "",
      robotModalflag: false,
      googleID: "",
      ipCountry: "",
      ruleValidate: {
        phoneNumber: [{ validator: validatePhone, trigger: "blur" }]
      }
    };
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var _that = this;
          this.robotModalflag = true;
          onloadCallback(
            "robotForgotpwd",
            function(res) {
              if (res) {
                let params = {
                  personType: "GOOGLE",
                  personCode: res,
                  loginName: _that.formValidate.phoneNumber,
                  deviceType: "WEB"
                };
                _that.getUserStatus(params);
                setTimeout(() => {
                  _that.robotModalflag = false;
                }, 2000);
              }
            },
            function(err) {
              _that.robotModalflag = false;
              _that.loaded = true;
            },
            function(netError) {
              _that.robotModalflag = false;
              _that.loaded = true;
            }
          );
        }
      });
    },
    // checkGeetest() {
    //   geeTest("dc3be6125f84f6786ab2198c26f780ca", "0", data => {
    //     let params = {
    //       personType: "GEETEST",
    //       personCode: data,
    //       loginName: this.formValidate.phoneNumber,
    //       deviceType: "WEB"
    //     };
    //     this.getUserStatus(params);
    //   });
    // },
    getUserStatus(params) {
      queryUserStatus(params)
        .then(res => {
          this.userStatusObj = res;
          if (res.outerToken) {
            localStorage.setItem("outerToken", res.outerToken);
            this.$router.push({
              path: "safeVatification",
              query: {
                phone: res.phone,
                email: res.email,
                bindGoogle: res.bindGoogle,
                userId: res.userId,
                originFrom: this.$route.query.originFrom
              }
            });
          }
        })
        .catch(error => {});
    }
  },
  computed: {
    inputValidate() {
      return this.formValidate.phoneNumber;
    },
    languageChange() {
      return this.$store.state.app.countryLanguage; //  返回全局state的状态值
    }
  },
  watch: {
    languageChange(val, oldVal) {
      this.$refs.formValidate.resetFields();
    }
  },
  mounted() {},
  created() {
    var _this = this;
    document.onkeydown = function(e) {
      //1.规避页面上方的搜索框等是否获取了焦点，是则不触发本次快捷键
      var inputs = document.getElementsByClassName("isfocus_enter"); //找到这一组元素
      //是否获取了焦点的判断
      let hasFocus = false;
      if (inputs && inputs.length > 0) {
        for (let i = 0; i < inputs.length; i++) {
          //如果hasFocus为true表示input元素获得焦点，否则没有获得焦点
          hasFocus =
            document.hasFocus() && document.activeElement === inputs[i];
          if (hasFocus == true) {
            break;
          }
        }
      }
      var key = window.event.keyCode;
      if (key == 13) {
        _this.handleSubmit("formValidate"); //此方法是当按下enter键后要做的动作。
      }
    };
  }
};
</script>
<style lang='less'>
.main_container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  display: -ms-flexbox;
}
.headerbox {
  flex: 0 0 auto;
}
//  #app{
//      height: 100%;
//  }
.footerBox {
  flex: 0 0 auto;
}
#forgotpassword {
  .inner_input_login {
    .ivu-input {
      width: 580px;
      height: 48px;
      padding-left: 53px;
      border-radius: 0px;
      border: solid 1px #293b47;
      background: #13222b;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
    }
    .ivu-form-item-content {
      position: relative;
      img {
        z-index: 99;
        position: absolute;
        top: 14px;
        left: 14px;
      }
    }
  }
}
</style>
<style scoped lang="less">
@import "./forgot.less";
</style>
<style lang='less'>
@import "./forgotMedia.less";
</style>


