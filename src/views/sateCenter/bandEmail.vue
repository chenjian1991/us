<template>
    <div id="bandemail" class="root">
          <!-- Title Section -->
    <div v-if='!DeviceType' class="bg-light">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('aqzxBandEmail')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('aqzxBandEmail')}}</li>
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
      <form autocomplete="off" action=''  @submit.prevent="handleSubmit" class="js-validate w-md-75 w-lg-50 mx-md-auto">
        <!-- Title -->
        <div class="mb-7">
          <!-- <h2 class="h3  font-weight-normal mb-3">{{$t('aqzxBandEmail')}}</h2> -->
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{{$t('aqzxTips')}}</strong>
          </div>
        </div>
        <!-- End Title -->
        <!-- Title -->
        <div class="row align-items-center mb-4">
          <div class="col-md-8 mb-3 mb-md-0">
            <h2 class="h5 mb-0">{{$t('zhmmSecurity')}}</h2>
          </div>
        </div>
        <!-- End Title -->
    
        <!--邮箱验证-->
         <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxEmailAdders')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signupPasswordLabel">
                        <span class="fas fa-lock"></span>
                        </span>
                    </div>
                    <input @input='inputEmail'  v-model='emailAddress' type="email" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('newK1mailpop')" aria-label="Password" aria-describedby="signupPasswordLabel" required
                            data-msg="只允许英文字母、数字、下划线、英文句号、以及中划线组成"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="emailNumber">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxEmailSms')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input  :maxlength='6' v-model='EmailCode' type="number" class="form-control" name="emailcode" id="emailNumber" :placeholder="this.$t('aqzxEmailSms')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            data-msg="邮箱验证码必须是6位数字"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                   <sendBtn business='business' :Bindmachine='false' :fatherClass='fatherClass'  @sendCick= 'sendSMSfun' :empty='empty' :ssoEmail='ssoEmail'></sendBtn>
                                </span>
                            </div>
                </div>
            </div>
         </div>
             <!--  手机验证 -->
        <div v-if='phoneNumber' class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="phoneNumber">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxtsendsma')}}  {{phoneNumber}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input :maxlength='6' v-model='phoneCode' type="number" class="form-control" name="emailcode" id="emailNumber" :placeholder="this.$t('SMSPlacehodler')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                    <sendBtn business='business' :Bindmachine='false' :fatherClass='fatherClass'  @sendCick= 'sendSMSfun' :ssoPhone='ssoPhone'></sendBtn>
                                </span>
                            </div>
                </div>
            </div>
         </div>
          <!-- google -->
        <div v-if='googleFlag' class="form-group">
            <div class="js-form-message js-focus-state">
                <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                         {{$t('aqzxGooglecode')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signinSrPassword">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input  :maxlength='6' v-model='googlecode' type="number" class="form-control" name="googleCode" id="signinSrPassword" :placeholder="this.$t('goolePlaceholder')" aria-label="请输入谷歌验证码" aria-describedby="signupConfirmPasswordLabel" required
                            data-msg="谷歌验证码必须是6位数字"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
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
   <Modal :modal='showModal' :text="text"></Modal>
    </div>
</template>
<script>
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {bindAccount,userInfo,verifyBusinessCode} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,postHeaderSeveralTokenBodyApi,getHeaderTokenApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import {countrylist} from '../login/country.js'
    export default {
        name:'register',
        data() {
            return {
                //front
                emailAddress:'',
                EmailCode:'',
                googlecode:'',
                googleFlag:false,
                countryLanguage:localStorage.getItem('countryLanguage'),
                model1: '',
                empty:true,
                token:'',
                ssoEmail:{
                },
                ssoPhone:{},
                showModal:false,
                text:'',
                countryNumber:'',
                fatherClass: 'newBtn',
                phoneCode:'',
                phoneNumber:'',
                FromOrigin:'',
                DeviceType:'',
                

            }
        },
        components:{
            sendBtn,
            Modal
        },
        methods:{
            handleSubmit (name) {
                  if(this.emailAddress==''||this.EmailCode==''){
                    this.$Notice.error({
                           title:this.$t('输入框不能为空'),
                            desc: this.$t('输入框不能为空')
                        });
                    return false;
                }else{
                    if(this.phoneNumber){
                        if(this.phoneCode==''){
                            this.$Notice.error({
                                title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                        }
                    }
                    if(this.googleFlag){
                        if(this.googlecode==''){
                            this.$Notice.error({
                                title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                        }
                    }
                     let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    if(pattern.test(this.confirmTradepwd)){
                            this.$Notice.error({
                                title:this.$t('emailMustExg'),
                                desc: this.$t('emailMustExg')
                            });
                            return
                    }
                    if($('.invalid-feedback').text()!==''){//如果有红色的提示语则阻止其提交
                        return false;
                    }
                        this.loaded=false;
                        this.codeVerify();

                }
              
               
            },
             getUserInfo(token){
                let params = {
                     "userId":localStorage.getItem('loginUserId'),
                }
                getHeaderTokenApi(userInfo,params,token).then((res) =>{
                    let userInfo = res.data;
                    this.phoneNumber = res.data.phone;
                    this.googleFlag = res.data.bindGoogle;
                }).catch((res) =>{

                })
            },
            inputEmail(){
                this.ssoEmail = {
                    "userId":localStorage.getItem('loginUserId'),
                    "businessType":"bind_email",
                    "sendCodeType":'email',
                    "bindAccount":this.emailAddress,
                }
            },
            sendSMSfun(callback){
                let value = {
                        "userId": localStorage.getItem('loginUserId'),
                        "businessType":"bind_email",
                        "account":this.emailAddress
                }
                this.$store.commit('changeBandEmail',value);
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
            },
            codeVerify(){
                let bodyParam  = {
                    "userId":localStorage.getItem('loginUserId'),
                    "businessType":'bind_email',
                    "phoneCode":this.phoneCode,
                    "emailCode":this.EmailCode,
                    "googleCode":this.googlecode,
                    "bindAccount":this.emailAddress,
                }
                postHeaderTokenBodyApi(verifyBusinessCode,$cookies.get('loginToken'),bodyParam).then((res) =>{
                    if(res.result){
                        this.$Notice.success({
                           title:this.$t(11001),
                           desc:this.$t(11001)
                     });
                      if(this.FromOrigin){
                         this.$router.push('kyc')
                     }else{
                        this.$router.push('/SafeCenter')
                     }
                     
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
            languageChange(){
                return  this.$store.state.app.countryLanguage;//返回全局state的状态值
            },
            EmailNumberChange(){
               return this.emailAddress;   
            },
            
        },
        watch:{
            languageChange(val,oldVal){
            },
            EmailNumberChange(val,oldVal){
                if(!this.emailAddress==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                }
            },
        },
        mounted(){
            this.getUserInfo($cookies.get('loginToken'));
            this.FromOrigin = this.$route.query.origin;

            this.ssoPhone = {
                "userId":localStorage.getItem('loginUserId'),
                "businessType":"bind_email",
                "sendCodeType":'phone'
            }

        },
        created(){
            this.interFunc();
            this.DeviceType = this.$route.query.type;
            if(this.$route.query.type === 'mobile'){
                    this.$emit('public_header', false);
                    this.$emit('public_footer', false);
             }
        }
        
    }
</script>
<style lang='less'>
#bandemail{
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




