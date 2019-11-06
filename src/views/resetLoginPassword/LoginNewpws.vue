<template>
    <div id="loginPassword" class="root">
                   <!-- Title Section -->
    <div class="bg-light">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('aqzxchangepassword')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('aqzxchangepassword')}}</li>
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
          <h2 class="h3  font-weight-normal mb-3">{{$t('aqzxchangepassword')}}</h2>
          <!-- <p>为了您的账户安全，修改登录密码后24小时内不允许提币。</p> -->
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{{$t('aqzxtips')}}</strong>
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
                             {{$t('aqzxNewPassword')}}
                        </span>
                    </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="signupPasswordLabel">
                            <span class="fas fa-lock"></span>
                          </span>
                        </div>
                        <input :minlength='8' :maxlength='20' v-model='newpwd' type="password" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('aqzxNewPasswordPlaceholder')" aria-label="Password" aria-describedby="signupPasswordLabel" required
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
                             {{$t('aqzxconfirmPasswordplaceholder')}}
                        </span>
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="signupConfirmPasswordLabel">
                            <span class="fas fa-key"></span>
                          </span>
                        </div>
                        <input v-model='confirmpwd' type="password" class="form-control" name="confirmPassword" id="signupConfirmPassword" :placeholder="this.$t('aqzxconfirmPasswordplaceholder')" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required
                              :data-msg="this.$t('phoneNumberRequier')"
                               data-error-class="u-has-error"
                               data-success-class="u-has-success">
                      </div>
                      <div class="errorTips mt-1" v-if="pwdEqualtoOrigin">两次输入密码不一致</div>
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
import {resetLoginPassword} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import {getBrowserMessage} from "@/lib/utils.js"
import {clearLocalStorage} from '../../config/index.js';
import {splitDomain} from "@/lib/utils.js"
import Cookies from 'js-cookie'
    export default {
        name:'login',
        components:{
        },
        data() {
            return {
              newpwd:'',
              confirmpwd:'',
              showModal:false,
              text:'',
              loaded:true,
              pwdEqualtoOrigin:false,
              deviceObj:{}
            }



        },
      
        methods:{
            handleSubmit () {
              if(this.confirmpwd==''||this.newpwd==''){
                 this.$Notice.error({
                        title:this.$t('输入框不能为空'),
                        desc: this.$t('输入框不能为空')
                    });
                  return false;
              }
               let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
              if(!pattern.test(this.confirmpwd)){
                    this.$Notice.error({
                        title:this.$t('passwordReg'),
                        desc: this.$t('passwordReg')
                    });
                    return
              }
              if(this.pwdEqualtoOrigin){//如果有红色的提示语则阻止其提交
                return false;
              }
                this.verifyNewPassword();
                
            },
              setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            verifyNewPassword(){
                  let  params = {
                    'userId':this.$route.query.userId?this.$route.query.userId:localStorage.getItem('loginUserId'),
                    "password":this.setSha(this.newpwd),
                    "deviceType": "WEB",
                    "deviceCode": this.deviceObj.browserVersion,
                }
                postHeaderTokenBodyApi(resetLoginPassword,localStorage.getItem('validatePasswordToken'),params).then((res) =>{
                  if(res.result){
                     Cookies.remove('loginToken','',document.domain.split('.').slice(-2).join('.'))
                     clearLocalStorage()
                        this.$store.commit('changeLoingStatus',false);
                              this.$Notice.success({
                                    title:this.$t(11001),
                                    desc: this.$t(11001)
                             });
                             setTimeout(() => {
                               if(this.$route.query.originFrom==='otc'){
                                  let domainurl = splitDomain(document.domain);
                                  let protocol = document.location.protocol+'//'
                                    let url = protocol+'otc.'+domainurl+'/#/login' //测试
                                    window.location.href = url;
                               }else{
                                   this.$router.push('/login')
                               }
                             }, 2000);
                  }
                }).catch((error)=>{
                        this.loaded= true;
                })



            }
           
        },
        computed:{
            inputValidate(){
               return this.newpwd;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
            },
            confirmpwd(val,oldVal){
              if(val===this.newpwd){
                this.pwdEqualtoOrigin = false;
              }else{
                this.pwdEqualtoOrigin = true;
              }
            }
        },
        mounted(){
           this.deviceObj = getBrowserMessage();
        

        },
          created(){
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
        },
        
        
    }
</script>
<style lang='less'>
.errorTips{
  	color:#ed4014;
}
.btn-primary-55{
    color: #fff;
    background-color: #12869a;
    border-color: #12869a;
    &:hover{
         color: #fff;
       text-decoration: none;
    }
}
</style>


