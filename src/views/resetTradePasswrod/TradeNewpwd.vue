<template>
    <div id="newtradepwd" class="root">
             <!-- Title Section -->
    <div class="bg-light">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('aqzxchangetradepassword')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('aqzxchangetradepassword')}}</li>
              </ol>
            </nav>
            <!-- End Breadcrumb -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Title Section -->

             <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Login Form -->
    <div class="container space-2">
      <form class="js-validate w-md-75 w-lg-50 mx-md-auto">
        <!-- Title -->
        <div class="mb-7">
          <!-- <h2 class="h3  font-weight-normal mb-3">{{$t('aqzxchangetradepassword')}}</h2> -->
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{{$t('aqzxtradepasswordtips')}}</strong>
          </div>
        </div>
        <!-- End Title -->

        <!-- Title -->
        <div class="row align-items-center mb-4">
          <div class="col-md-8 mb-3 mb-md-0">
            <h2 class="h5 mb-0">{{$t('zhmmSetNewPassword')}}</h2>
          </div>
        </div>
        <!-- End Title -->
      <!-- Form Group -->
                  <div class="form-group">
                    <div class="js-form-message js-focus-state">
                      <label class="" for="signupPassword">
                        <span class="d-flex justify-content-between align-items-center">
                             {{$t('jymmTradingPassword')}}
                        </span>
                    </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="signupPasswordLabel">
                            <span class="fas fa-lock"></span>
                          </span>
                        </div>
                        <input v-number-only  :minlength='6' :maxlength='6' v-model='newtradepwd' type="password" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('aqzxtradeplacehoder')" aria-label="Password" aria-describedby="signupPasswordLabel" 
                              :data-msg="this.$t('phoneNumberRequier')"
                               data-error-class="u-has-error"
                               data-success-class="u-has-success">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="js-form-message js-focus-state">
                      <label class="" for="signupPassword">
                        <span class="d-flex justify-content-between align-items-center">
                             {{$t('aqzxconfirmword')}}
                        </span>
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="signupConfirmPasswordLabel">
                            <span class="fas fa-lock"></span>
                          </span>
                        </div>
                        <input v-number-only :minlength='6' :maxlength='6' v-model='confirmTradepwd' type="password" class="form-control" name="confirmPassword" id="signupConfirmPassword" :placeholder="this.$t('aqzxtradeplacehoder')" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" 
                               :data-msg="this.$t('phoneNumberRequier')"
                               data-error-class="u-has-error"
                               data-success-class="u-has-success">
                      </div>
                      <div class="errorTips mt-1" v-if="pwdEqualtoOrigin">{{$t('passwordNotMach')}}</div>

                    </div>
                  </div>
                  <!-- Form Group -->
        <!-- Button -->
        <div class="row align-items-center mb-5">
          <div class="col-12 text-left">
            <button type="button" value="button" @click="handleSubmit" class="btn btn-primary-55 transition-3d-hover">{{$t('zhmmResetSubmit')}}</button>
          </div>
        </div>
        <!-- End Button -->
      </form>
    </div>
    <!-- End Login Form -->
  </main>
  <!-- ========== END MAIN ========== -->
    </div>
</template>

<script>
import {setTradingPassword} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import {getBrowserMessage} from "@/lib/utils.js"


    export default {
        name:'tradepassword',
        components:{
        },
        data() {
            return {
                newtradepwd:'',
                confirmTradepwd:'',
                text:'',
                loaded:true,
                pwdEqualtoOrigin:false,
                deviceObj:{},
                userId:''
            }
        },
        methods:{
            handleSubmit (name) {
                if(this.newtradepwd==''||this.confirmTradepwd==''){
                    this.$Notice.error({
                            title:this.$t('输入框不能为空'),
                            desc: this.$t('输入框不能为空')
                        });
                    return false;
                }
                if(this.newtradepwd.length<6||this.confirmTradepwd.length<6){
                  return false;
                }
                let pattern = /[^\d]/;
              if(pattern.test(this.confirmTradepwd)){
                    this.$Notice.error({
                        title:this.$t(10011),
                        desc: this.$t(10011)
                    });
                    return
              }
              if(this.pwdEqualtoOrigin){//如果有红色的提示语则阻止其提交
                return false;
              }
                //  this.loaded=false;
                this.setTradingPasswordMthod();
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            setTradingPasswordMthod(){
                    let  params = {
                        "userId":this.userId,
                        "password":this.setSha(this.confirmTradepwd),
                        "deviceType": "WEB",
                        "deviceCode": this.deviceCode
                    }
                    let token = localStorage.getItem('validatePasswordToken');
                postHeaderTokenBodyApi(setTradingPassword,token,params).then((res) =>{
                  if(res.result){
                       this.$Notice.success({
                            title:this.$t(11001),
                            desc:this.$t(11001)
                        });
                      localStorage.removeItem('ORDER_SESSION')
                      localStorage.setItem('tradingPasswordFlag',true);
                       setTimeout(() => {
                         this.$router.push('/SafeCenter')
                       }, 1000);
                  }
                }).catch((error)=>{
                    this.loaded = true;
                })
            },
              interFunc(){
                 var _this = this;
			    document.onkeydown = function(e) {
                //1.规避页面上方的搜索框等是否获取了焦点，是则不触发本次快捷键
				var inputs = document.getElementsByClassName('isfocus_enter'); //找到这一组元素
				//是否获取了焦点的判断
				let hasFocus = false;
				if(inputs && inputs.length >0){
					for(let i=0;i<inputs.length;i++){
						//如果hasFocus为true表示input元素获得焦点，否则没有获得焦点
						hasFocus = document.hasFocus() && document.activeElement === inputs[i];
						if(hasFocus == true){
							break;
						}
					}
				}
			     //console.log("判断不该获取焦点的元素是否获取了焦点（isfocus_enter）:%s",hasFocus);
						var key = window.event.keyCode;
						// console.log("按键：%s",key);
						if (key == 13) {
							_this.handleSubmit('formValidate') //此方法是当按下enter键后要做的动作。
						}
						
			    }
            }
                

           
        },
        computed:{
            inputValidate(){
               return this.confirmTradepwd;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){

            },
            confirmTradepwd(val,oldVal){
              if(val===this.newtradepwd){
                this.pwdEqualtoOrigin = false;
              }else{
                this.pwdEqualtoOrigin = true;
              }
            }
        },
        mounted(){
            this.deviceObj = getBrowserMessage();
            this.userId = this.$route.query.userId?this.$route.query.userId:localStorage.getItem('loginUserId');
            this.deviceCode = this.$route.query.deviceCode?this.$route.query.deviceCode:localStorage.getItem('deviceCode')
        },
        created(){
            this.interFunc()
        }
        
    }
</script>
<style lang='less'>
#newtradepwd{
    .btn-primary-55{
    color: #fff;
    background-color: #12869a;
    border-color: #12869a;
    &:hover{
         color: #fff;
       text-decoration: none;
    }
} 
    
}
</style>



