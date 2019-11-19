
<template>
    <div id="bandphone" class="root">
  <!-- Title Section -->
    <div v-if="!DeviceType" class="bg-light">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('aqzxBandPhone')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('aqzxBandPhone')}}</li>
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
          <!-- <h2 class="h3  font-weight-normal mb-3">{{$t('aqzxBandPhone')}}</h2> -->
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
        <!-- Form Group -->
         <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('phonenumber')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <Select  v-model="countryName" style="width:110px;height:44px;">
                            <Option  v-for="item in cityList" :value="item.value"  :label="item.value" >
                                    <span v-html="item.label"></span>
                                    <span v-html="item.value"></span>
                                <!-- <span>+{{item.code}}</span> -->
                                </Option>
                        </Select>
                    </div>
                    <input  @input="inputPhone" v-model='phoneNumber' type="number" class="form-control" name="phone" id="signupPassword" :placeholder="this.$t('phonePlacehodlerphone')" aria-label="phone" aria-describedby="signupPasswordLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="emailNumber">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('SMSPlacehodler')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input :maxlength='6' v-model='phoneCode' type="number" class="form-control" name="phonecode" id="emailNumber" :placeholder="this.$t('SMSPlacehodler')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                    <sendBtn business='business'  :Bindmachine='false' :fatherClass='fatherClass'  @sendCick= 'sendSMSfun' :empty='empty' :ssoPhone='ssoPhone'></sendBtn>
                                </span>
                            </div>
                </div>
            </div>
         </div>
        <!-- email-->
       <div v-if="emailAddress" class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="emailNumber">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('aqzxEmailSms')}} {{emailAddress}}
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
                                   <sendBtn business='business' :Bindmachine='false' :fatherClass='fatherClass'  @sendCick= 'sendSMSfun'  :ssoEmail='ssoEmail'></sendBtn>
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
                         {{$t('aqzxgooglecode')}}
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
import {countrylist} from '../login/country.js'
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {bindAccount,userInfo,verifyBusinessCode} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getHeaderTokenApi,getApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';

    export default {
        name:'register',
        data() {
            return {
                //front
                phoneNumber:'',
                phoneCode:'',
                googlecode:'',
                countryName:'86',
                countryLanguage:localStorage.getItem('countryLanguage'),
                empty:true,
                token:'',
                loaded:true,
                ssoPhone:{},
                ssoEmail:{},
                showModal:false,
                text:'',
                cityList: [],
                phoneRegister:true,
                emailRegister:false,
                shows:1,
                phoneFlag:0,
                emailFlag:0,
                googleFlag:false,
                phone:'',
                fatherClass: 'newBtn',
                emailAddress:'',
                EmailCode:'',
                FromOrigin:'',
                DeviceType:'',
                userCountry:'',
            }



        },
        components:{
            sendBtn,
            Modal
        },
        methods:{
            handleSubmit (name) {
                   if(this.phoneNumber==''||this.phoneCode==''){
                    this.$Notice.error({
                            title:this.$t('输入框不能为空'),
                            desc: this.$t('输入框不能为空')
                        });
                    return false;
                }else{
                    if(this.emailAddress){
                        if(this.EmailCode===''){
                             this.$Notice.error({
                                title:this.$t('输入框不能为空'),
                                desc: this.$t('输入框不能为空')
                                });
                            return false;
                        }
                    }
                    if(this.googleFlag){
                        if(this.googlecode===''){
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
                    this.loaded = false;
                    this.codeVerify();

                }
               
            },
            codeVerify(){
                let bodyParam  = {
                    "userId":localStorage.getItem('loginUserId'),
                    "businessType":'bind_phone',
                    "phoneCode":this.phoneCode,
                    "emailCode":this.EmailCode,
                    "googleCode":this.googlecode,
                    "bindAccount":this.phoneNumber+'+'+this.countryName.substring(1),
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
             dealCountry(){
                    getApi('https://oss.55com.io/content/country/55-country.json',{}).then((res)=>{
                             let arr = res.slice(4,res.length);
                             let newArr = [];
                             arr.forEach((v,i)=>{
                                 newArr.push({
                                     value:v.code,
                                     label:v.en
                                 })
                             })
                             this.cityList = newArr;
                             this.countryName = this.cityList[0].value;
                             
                            console.log('ccc',this.userCountry);
                    })
            },
            inputPhone(){
                 this.ssoPhone = {
                        "userId":localStorage.getItem('loginUserId'),
                        "businessType":"bind_phone",
                        "sendCodeType":'phone',
                        "bindAccount":this.phoneNumber+'+'+this.countryName.substring(1),
                }
            },
            getUserInfo(token){
                let params = {
                     "userId":localStorage.getItem('loginUserId'),
                }
                getHeaderTokenApi(userInfo,params,token).then((res) =>{
                    let userInfo = res.data;
                    this.googleFlag = res.data.bindGoogle;
                    this.emailAddress = res.data.email;
                    this.userCountry = res.data.country;

                }).catch((res) =>{

                })
            },
            sendSMSfun(callback){
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
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
             phoneNumberChange(){
               return this.phoneNumber;   
            },
            
        },
        watch:{
            languageChange(val,oldVal){
            },
            phoneNumberChange(val,oldVal){
                if(!this.phoneNumber==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                    this.phoneNumber= this.phoneNumber.replace(/[^\d]g/,'');
                }
            },
        },
        mounted(){
            this.getUserInfo($cookies.get('loginToken'))
            this.dealCountry();

            this.ssoEmail = {
                "userId":localStorage.getItem('loginUserId'),
                "businessType":"bind_phone",
                "sendCodeType":'email'
            }
            this.FromOrigin = this.$route.query.origin;
        },
        created(){
            this.interFunc()
            this.DeviceType = this.$route.query.type;
            if(this.$route.query.type === 'mobile'){
                    this.$emit('public_header', false);
                    this.$emit('public_footer', false);
             }

        }
        
        
    }
</script>
<style lang='less'>
#bandphone{
    .btn-primary-55{
        color: #fff;
        background-color: #12869a;
        border-color: #12869a;
        &:hover{
            color: #fff;
        text-decoration: none;
        }
    }
.ivu-select-selection{
    height:100%;
    line-height:44px;
    >div{
        height:100%;
    }
    .ivu-select-selected-value{
        height:44px;
        line-height:44px;
        font-size:16px;
        padding-left:30px;
    }
}
.ivu-select-dropdown{
    width:100%;
    .ivu-select-dropdown-list{
        li{
            display:flex;
            justify-content:space-between;
        }
    }
}
.btn-primary{
    background:#fff;
    color:#515a6e;
    height:50px;
    line-height: 28px;
    font-size: 20px;
}
    .inner_input{
        .bandPhone{
            .ivu-input-wrapper{
                width: auto;
            }
            .ivu-form-item{
                margin-bottom: 24px;
            }
            .phone_item{
                .ivu-form-item-content{
                    display: flex;
                    justify-content: space-between;
                }
                .ivu-input{
                    width: 460px;
                    margin-left: 10px;
                }
            }
           .ivu-input{
                height: 48px;
                padding-left: 15px;
                border: solid 1px #E7EAED;
                color: #344857;
                background: none;
                font-size: 14px;
                width: 580px;
             }
        }
         .btn_contain{
        .sendMs{
            background: #12869a;
            border: none;
        }
    }
    }
}
    
</style>

<style scoped lang='less'>
    .main_container{
        min-height: 100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    //  #app{
    //      height: 100%;
    //  }
    .footerBox{
         flex: 0 0 auto;
     }
     .inner_input{
         .ivu-btn{
            width: 580px;
            height: 48px;
            font-size:16px;
            background: #12869a;
            border-color: #12869a;
            border-radius: 5px!important;
            &:hover{
                background:#108093;
            }
        }
        
     }
</style>


