<template>
    <div id="tradePassword" class="root">
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
      <form autocomplete="off" action=''  @submit.prevent="handleSubmit" class="js-validate w-md-75 w-lg-50 mx-md-auto">
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
            <h2 class="h5 mb-0">{{$t('zhmmSecurity')}}</h2>
          </div>
        </div>
        <!-- End Title -->
        <!-- Form Group -->
         <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxoldpass')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signupPasswordLabel">
                        <span class="fas fa-lock"></span>
                        </span>
                    </div>
                    <input :maxlength='20' v-model='pwd' type="password" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('aqzxpasswordplaceholder')" aria-label="Password" aria-describedby="signupPasswordLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <!-- 手机验证 -->
        <div v-if="phoneNumber" class="form-group">
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
                    <input :maxlength='6' v-model='phoneCode' type="number" class="form-control" name="phonecode" id="phoneNumber" :placeholder="this.$t('SMSPlacehodler')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                    <sendBtn business='business' :machine='false' robotDiv='robotPhone' :fatherClass='fatherClass'  @sendCick= 'sendSMSfun' :empty='false' :tradePassPhone='tradePassPhone'></sendBtn>
                                </span>
                            </div>
                </div>
            </div>
         </div>
        <!-- 邮箱验证 -->
        <div v-if="emailAddress" class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="emailNumber">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxsendemail')}}  {{emailAddress}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input :maxlength='6' v-model='EmailCode' type="number" class="form-control" name="emailcode" id="emailNumber" :placeholder="this.$t('emialCodePlaceholder')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                   <sendBtn business='business' :machine='false' robotDiv='robotEmail' :fatherClass='fatherClass'   @sendCick= 'sendSMSfun' :empty="false" :tradePassEmail='tradePassEmail'></sendBtn>
                                </span>
                            </div>
                </div>
            </div>
         </div>
         <!-- google -->
        <div v-if="googleFlag"  class="form-group">
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
                    <input :maxlength='6' v-model='googlecode' type="number" class="form-control" name="googleCode" id="signinSrPassword" :placeholder="this.$t('goolePlaceholder')" aria-label="请输入谷歌验证码" aria-describedby="signupConfirmPasswordLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <!-- End Form Group -->
        <!-- Button -->
        <div class="row align-items-center mb-5">
          <div class="col-12 text-left">
            <button type="button" value="button" @click="handleSubmit" class="btn btn-primary-55 transition-3d-hover">{{$t('aqzxnext')}}</button>
          </div>
        </div>
        <!-- End Button -->
      </form>
    </div>
    <!-- End Login Form -->
  </main>
   <Modal :modal='showModal' :text="text"></Modal>
  <!-- ========== END MAIN ========== -->
    </div>
</template>

<script>
import {TradingPasswordVerify,userInfo,verifyBusinessCode} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getHeaderTokenApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import sendBtn from '../../components/sendBtn';
import Cookies from 'js-cookie'
    export default {
        name:'login',
        components:{
            Modal,
            sendBtn
        },
        data() {
            return {
                 //front
                pwd:'',
                phoneCode:'',
                EmailCode:'',
                googlecode:'',
                googleFlag:false,
                showModal:false,
                text:'',
                empty:false,
                emailAddress:'',
                phoneNumber:'',
                googleNum:'',
                loaded:true,
                fatherClass: 'newBtn',
                tradePassPhone:{
                   
                },
                tradePassEmail:{
                  
                },
                userId:''
            }

        },
        methods:{
            handleSubmit (name) {
                if(this.phoneNumber&&this.emailAddress){
                    if(this.pwd==''||this.phoneCode==''||this.EmailCode==''){
                             this.$Notice.error({
                                    title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                    }
                }else if(this.phoneNumber&&this.emailAddress&&this.googleFlag){
                        if(this.pwd==''||this.phoneCode==''||this.EmailCode==''||this.googlecode==''){
                             this.$Notice.error({
                                   title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                    }
                }else if(this.phoneNumber){
                    if(this.pwd==''||this.phoneCode==''){
                             this.$Notice.error({
                                    title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                    }
                }else if(this.emailAddress){
                        if(this.pwd==''||this.EmailCode==''){
                             this.$Notice.error({
                                    title:this.$t('输入框不能为空'),
                                    desc: this.$t('输入框不能为空')
                                });
                            return false;
                    }
                }
              if($('.invalid-feedback').text()!==''){//如果有红色的提示语则阻止其提交
                return false;
              }
            //    this.loaded=false;
                this.codeVerify();
              
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            codeVerify(){
                    let bodyParam  = {
                        "password":this.setSha(this.pwd),
                        "userId":this.userId,
                        "businessType":'set_trade_password',
                        "phoneCode":this.phoneCode,
                        "emailCode":this.EmailCode,
                        "googleCode":this.googlecode,
                    }
                postHeaderTokenBodyApi(verifyBusinessCode,Cookies.get('loginToken'),bodyParam).then((res) =>{
                    if(res.result){
                        // this.$Notice.success({
                        //         title:this.$t(11001),
                        //         desc: this.$t(11001)
                        // });
                        this.loaded = true;
                        localStorage.setItem('validatePasswordToken',res.result)
                        this.$router.push('/NewTradePassword')
                        this.$router.push({
                            path:'/NewTradePassword',
                            query:{
                                originFrom:this.$route.query.originFrom,
                                userId:this.$route.query.loginUserId,
                                deviceCode:this.$route.query.deviceCode
                            }
                        })

                    }
                }).catch((error)=>{
                    this.loaded = true;
                })
            },
             sendSMSfun(callback){
                    if(callback){//callback是从子组件传递过来的参数
                        this.showModal = !this.showModal;
                        this.text = callback;
                    }
            },
            getUserInfo(token){
                let params = {
                     "userId":this.userId,
                }
                getHeaderTokenApi(userInfo,params,token).then((res) =>{
                    let userInfo = res.data;
                    this.emailAddress = res.data.email;
                    this.phoneNumber = res.data.phone;
                    this.googleFlag = res.data.bindGoogle;
                }).catch((res) =>{

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
               return this.pwd;   
            },
            smsCodeChange(){
               return this.googlecode;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch:{
            languageChange(val,oldVal){

            },
            smsCodeChange(val,oldVal){
                if(!this.googlecode==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                    this.googlecode= this.googlecode.replace(/[^\d]g/,'');
                }
            },
        },
        mounted(){
            this.userId = this.$route.query.loginUserId?this.$route.query.loginUserId:localStorage.getItem('loginUserId');
            this.getUserInfo(Cookies.get('loginToken'))
             this.tradePassPhone = { //手机发送
                "userId":this.userId,
                "businessType":"set_trade_password",
                "sendCodeType":'phone'
            }
            this.tradePassEmail = {//邮箱发送
                "userId":this.userId,
                "businessType":"set_trade_password",
                "sendCodeType":'email'
            }
          
        },
        created(){
            this.interFunc()
        }
    }
</script>
<style lang='less'>
#tradePassword{
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

    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    .footerBox{
         flex: 0 0 auto;
     }
     #loginPassword{
         .container{
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }   
          .inner_input_login{
         .ivu-input{
           width: 580px;
            height: 48px;
            padding-left: 53px;
            border: solid 1px #E7EAED;
            color: #344857;
            background: none;
            font-size: 14px;
        }
        .ivu-form-item-content{
            position: relative;
            img{
                z-index: 99;
                position: absolute;
                top: 16px;
                left: 14px;
            }
            
        }
        
        
     }
     }
    

</style>




