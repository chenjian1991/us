<template>
<div>
     <!-- Title Section -->
    <div class="bg-light mb-5">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('ggyzMGoogleAuthentication')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('ggyzMGoogleAuthentication')}}</li>
              </ol>
            </nav>
            <!-- End Breadcrumb -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Title Section -->
    <div id="setGoogle" class="container">
        <!-- <h3 class="mt-6 mb-6">{{$t('ggyzMGoogleAuthentication')}}</h3> -->
        <h6 class="mb-6">{{$t('ggyzGoogleTip')}}</h6>
        <!-- Step Form -->
<form class="js-validate js-step-form mb-5"
      data-progress-id="#progressStepForm"
      data-steps-id="#contentStepForm"
      novalidate="novalidate">
  <div class="card">
    <div class="card-header p-5">
      <nav id="progressStepForm" class="js-step-progress nav nav-icon nav-justified text-center">

        <a :data-previous-step="item.step" :class="num == index ? 'colorTab nav-item':'nav-item'" @click="tabIcon(index)" v-for="(item,index) in arricon" :key="index" style="font-size:14px;">
          <span :class="num == index ?'trans nav-icon-action':'nav-icon-action'">
            <span :class="item.icon"></span>
          </span>
          {{$t(item.name)}}
        </a>
        <!-- <a data-previous-step="#selectStepOne" class="nav-item">
          <span class="nav-icon-action">
            <span class="fas fa-download nav-icon-action-inner"></span>
          </span>
          {{$t('ggyzDownloadApp')}}
        </a> -->
        <!-- <a data-previous-step="#selectStepTwo" class="nav-item">
          <span class="nav-icon-action">
            <span  class="fas fa-qrcode nav-icon-action-inner"></span>
          </span>
          {{$t('ggyzScanQRCode')}}
        </a>
        <a href="javascript:;" data-previous-step="#selectStepThree" class="nav-item">
          <span class="nav-icon-action">
            <span class="fas fa-save nav-icon-action-inner"></span>
          </span>
          {{$t('ggyzBackupKey')}}
        </a>
          <a data-next-step="#selectStepFour" class="nav-item">
          <span class="nav-icon-action">
            <span class="fas fa-check-square nav-icon-action-inner"></span>
          </span>
         {{$t('ggyzEnableGoogle')}}
        </a> -->
      </nav>
    </div>

    <!-- Content Step Form -->
    <div id="contentStepForm" class="card-body p-5">
      <div id="selectStepOne" class="active">
          <!-- Title -->
      <div class="w-md-80 w-lg-50 text-center mx-md-auto">
        <h2>{{$t('步骤一')}}</h2>
        <span class="btn btn-xs btn-soft-success btn-pill mb-2">{{$t('ggyzDownloadAndInstall')}}</span>
      </div>
      <!-- End Title -->
            <!-- Blog Card Section -->
    <div class="container space-top-1">
      <div class="w-lg-80 mx-lg-auto">
        <div class="card-deck d-block d-md-flex card-md-gutters-3">
          <!-- Blog Card -->
          <article class="card border-0 text-white shadow-sm transition-3d-hover mb-5 mb-md-0">
            <div class="card-body p-6">
                <h1 class="text-dark h4">iOS</h1>
                <div class="text-dark mb-6">{{$t('ggyzIOSMethod')}}</div>
               <!-- Button -->
                <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182" target="_blank">
                    <button type="button" class="btn btn-xs btn-primary btn-wide transition-3d-hover text-left mb-2 mr-sm-1">
                    <span class="media align-items-center">
                        <span class="fab fa-apple font-size-2 mr-3"></span>
                        <span class="media-body">
                        <span class="d-block">{{$t('fronthomefootAPPios')}}</span>
                        <strong class="font-size-1">App Store</strong>
                        </span>
                    </span>
                    </button>
                </a >
                 <!-- End Button -->
                <em  @mouseenter="showMth('ios')" @mouseleave="hideMth('ios')" class="scancode"></em>
                <img v-if="showPic" class="scanpic" src="../../assets/images/google/step-1.png">

                 
            </div>
          </article>
          <!-- End Blog Card -->

          <!-- Blog Card -->
          <article class="card border-0 shadow-sm transition-3d-hover">
            <div class="card-body p-6">
              <h1 class="text-dark h4">Android</h1>
              <div class="text-dark mb-6">{{$t('ggyzAndroidMethod')}}</div>
                <!-- Button -->
                    <a href="https://play.google.com/store/apps/details?id=com.ex55.app" target="_blank">
                        <button type="button" class="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2">
                        <span class="media align-items-center">
                            <span class="fab fa-google-play font-size-2 mr-3"></span>
                            <span class="media-body">
                            <span class="d-block">{{$t('fronthomefootAPPandroid')}}</span>
                            <strong class="font-size-1">Google Play</strong>
                            </span>
                        </span>
                        </button>
                    </a >
                    <!-- End Button -->
                    <em  @mouseenter="showMth('android')" @mouseleave='hideMth("android")' class="scancode"></em>
                    <img style="width:97px;height:98px;" v-if="showAdroindpic" class="scanpic android-pic" src="../../assets/images/google/android-google.png">
            </div>
          </article>
          <!-- End Blog Card -->
        </div>
      </div>
    </div>
    <!-- End Blog Card Section -->

        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-sm btn-primary transition-3d-hover mr-1" @click="next(1)" data-next-step="#selectStepTwo">{{$t('newK1buttonN')}}</button>
        </div>
      </div>

      <div id="selectStepTwo" style="display: none;">
              <!-- Title -->
      <div class="w-md-80 w-lg-50 text-center mx-md-auto">
        <h2>{{$t('步骤二')}}</h2>
        <span class="btn btn-xs btn-soft-success btn-pill mb-2">{{$t('ggyzUseAPPScan')}}</span>
      </div>
      <!-- End Title -->
            <!-- Blog Card Section -->
    <div class="container space-top-1">
      <div class="w-lg-65 mx-lg-auto">
        <div class="card-deck d-block d-md-flex card-md-gutters-3">
          <!-- Blog Card -->
          <article class="card border-0 text-white shadow-sm transition-3d-hover mb-5 mb-md-0 pb-4">
            <div class="card-body p-6 mx-md-auto">
                      <VueQr  :margin='3' :size='115' :text="QRCodeurl"></VueQr>
            </div>
             <div class="mx-md-auto text-dark text-center p-5">
                  <h6 class="text-center mb-2">{{$t('ggyzManuallyAPP')}}</h6>
                  <h4 style="color:rgb(18, 134, 154)" class="text-center">{{qrCodeString}}</h4>
             </div>

          </article>
          <!-- End Blog Card -->
        </div>
      </div>
    </div>
    <!-- End Blog Card Section -->
        <div class="d-flex justify-content-end">
          <a class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1" href="javascript:;" @click="next(0)" data-previous-step="#selectStepOne">{{$t('newK1buttonP')}}</a>
          <button type="button" class="btn btn-sm btn-primary transition-3d-hover" @click="next(2)" data-next-step="#selectStepThree">{{$t('newK1buttonN')}}</button>
        </div>
      </div>

      <div id="selectStepThree" style="display: none;">
              <!-- Title -->
      <div class="w-md-80 w-lg-50 text-center mx-md-auto">
        <h2>{{$t('步骤三')}}</h2>
        <span class="btn btn-xs btn-soft-success btn-pill mb-2">{{$t('ggyzSaveKeyOnPaper')}}，{{$t('ggyzRecoverTip')}} </span>
      </div>
      <!-- End Title -->
            <!-- Blog Card Section -->
    <div class="container space-top-1">
      <div class="w-lg-65 mx-lg-auto">
        <div class="card-deck d-block d-md-flex card-md-gutters-3">
          <!-- Blog Card -->
          <article class="card border-0 text-white shadow-sm transition-3d-hover mb-5 mb-md-0 pb-4">
            <div class="card-body p-6 mx-md-auto">
                <div class="key-img text-dark text-left">
                    {{qrCodeString}}
                </div>
            </div>
             <div class="mx-md-auto text-dark text-center p-5">
                  <h6 class="text-center mb-2">{{$t('ggyzSupportTicket')}}</h6>
             </div>

          </article>
          <!-- End Blog Card -->
        </div>
      </div>
    </div>
    <!-- End Blog Card Section -->

        <div class="d-flex justify-content-end">
          <a class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1" href="javascript:;" @click="next(1)" data-previous-step="#selectStepTwo">{{$t('newK1buttonP')}}</a>
          <button type="button" data-next-step="#selectStepFour" @click="next(3)"  class="btn btn-sm btn-primary transition-3d-hover">{{$t('newK1buttonN')}}</button>
        </div>
      </div>
      <div id="selectStepFour" style="display: none;">
                    <!-- Title -->
            <div class="w-md-80 w-lg-50 text-center mx-md-auto">
                <h2>{{$t('步骤四')}}</h2>
                <span class="btn btn-xs btn-soft-success btn-pill mb-2">{{$t('ggyzMGoogleAuthentication')}}</span>
            </div>
            <!-- End Title -->
            <div class="w-lg-65 mx-lg-auto space-top-1">
                <article class="card border-0 text-white shadow-sm transition-3d-hover mb-5 mb-md-0 pb-4">
                    <div class="card-body p-6">
                             <!-- Form Group -->
         <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="form-label" for="signupPassword">
                    <span class="d-flex text-dark justify-content-between align-items-center">
                        {{$t("aqzxgooglekey")}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signupPasswordLabel">
                        <span class="fas fa-lock"></span>
                        </span>
                    </div>
                    <input  v-model='kyeofsecret' type="password" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('aqzxgoogleplaceholder')" aria-label="Password" aria-describedby="signupPasswordLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <!-- 登录密码-->
        <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="phoneNumber">
                    <span class="d-flex text-dark justify-content-between align-items-center">
                        {{$t("aqzxloginpass")}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input  v-model='loginPwd' type="password" class="form-control" name="phonecode" id="phoneNumber" :placeholder="this.$t('aqzxpasswordplaceholder')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                </span>
                            </div>
                </div>
            </div>
         </div>
        <!-- 谷歌验证 -->
        <div  class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="emailNumber">
                    <span class="d-flex text-dark justify-content-between align-items-center">
                        {{$t('googleCodenumCode')}}  
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="phonecodeLabel">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input :maxlength='6' v-model='codeOfGoogle' type="number" class="form-control" name="emailcode" id="emailNumber" :placeholder="this.$t('aqzxgooglecodeplaceholder')" aria-label="Password" aria-describedby="phonecodeLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                            <div class="input-group-append">
                                <span style='padding:0px;' class="input-group-text">
                                </span>
                            </div>
                </div>
            </div>
         </div>
        <!-- form end -->
            </div>
                       
          </article>
            </div>
        <div class="d-flex justify-content-end mt-3">
          <a class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1" href="javascript:;" @click="next(2)" data-previous-step="#selectStepThree">{{$t('newK1buttonP')}}</a>
          <button type="button" @click="handleSubmit('formValidate')" class="btn btn-sm btn-primary transition-3d-hover">{{$t('ggyzMGoogleAuthentication')}}</button>
        </div>
      </div>
    </div>
    <!-- End Content Step Form -->
  </div>
</form>
<!-- End Step Form -->
    </div>
</div>
          
</template>


<script>
import {queryGoogleURL,bindGoogle} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getHeaderTokenApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';


//import QRCode from 'qrcodejs2'//二维码
import VueQr from 'vue-qr'
    export default {
        name:'login',
        components:{
            Modal,
            VueQr
        },
        data() {
             const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('passwordRequier')));
                } else{
                    let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('passwordReg')))
                    }
                    callback()
                    
                } 
            };
             
            return {
                num: 0,
                arricon:[{
                    ind: 0,
                    name: 'ggyzDownloadApp',
                    icon: 'fas fa-download nav-icon-action-inner',
                    step: '#selectStepOne',
                    isShow: true
                  },{
                    ind: 1,
                    name: 'ggyzScanQRCode',
                    icon: 'fas fa-qrcode nav-icon-action-inner',
                    step: '#selectStepTwo',
                    isShow: false
                  },{
                    ind: 2,
                    name: 'ggyzBackupKey',
                    icon: 'fas fa-save nav-icon-action-inner',
                    step: '#selectStepThree',
                    isShow: false
                  },{
                    ind:3,
                    name: 'ggyzEnableGoogle',
                    icon: 'fas fa-check-square nav-icon-action-inner',
                    step: '#selectStepFour',
                    isShow: false
                  }],
                //front
                kyeofsecret:'',
                loginPwd:'',
                codeOfGoogle:'',

                empty:true,
                token:'',
                ex55Pin:'',
                captchaIns:'',
                loaded:true,
                paramsObj:{},
               
                QRCodeurl:"",
                qrCodeString:"",
                showModal:false,
                text:'',
                currenttab:'1',

                showPic:false,
                showAdroindpic:false

            }

        },
        methods:{
          tabIcon (index) {
            this.num = index
            this.arricon.map((v,i) => {
              if (v.step == this.arricon[index].step) {
                $(this.arricon[i].step).show()
              }else{
                $(this.arricon[i].step).hide()
              }
            })
          },
          next (inde) {
            this.tabIcon(inde)
          },
            handleSubmit (name) {
                 if(this.kyeofsecret==''||this.loginPwd==''||this.codeOfGoogle=='') {
                  this.$Notice.error({
                        title:this.$t('输入框不能为空'),
                        desc: this.$t('输入框不能为空')
                    });
                  return false;
              }
               if($('.invalid-feedback').text()!==''){//如果有红色的提示语则阻止其提交
                return false;
              }
                this.bindGoogleMthod()
            },
            showMth(name)
            {
                if(name=='ios'){
                     this.showPic = true;
                }else{
                    this.showAdroindpic = true;
                }
            },
            hideMth(name){
                if(name=='ios'){
                    this.showPic = false;
                }else{
                    this.showAdroindpic = false;
                }
            },
            getQrcode(){
              let params = {
                userId:localStorage.getItem('loginUserId')
              }
                getHeaderTokenApi(queryGoogleURL,params,$cookies.get('loginToken')).then((res)=>{
                    this.QRCodeurl = res.data.qrCode;
                    this.qrCodeString = res.data.secretKey;
                }).catch((error)=>{
                })
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            bindGoogleMthod(){
                let hashFlag;
                let hash = localStorage.getItem('hashFlag');
                if(hash=='true'){
                    hashFlag = true
                }else{
                    hashFlag = false;
                }
                let params = {
                        "userId": localStorage.getItem('loginUserId'),
                        "password":this.setSha(this.loginPwd),
                        "googleKey": this.kyeofsecret,
                        "googleCode": this.codeOfGoogle
                    }
                    postHeaderTokenBodyApi(bindGoogle,$cookies.get('loginToken'),params).then((res)=>{
                        if(res.result){
                             this.$Notice.success({
                                    title:this.$t(11001),
                                    desc: this.$t(11001)
                             });
                            this.$router.push('/SafeCenter');
                        }
                    }).catch((error)=>{

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
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            
        },
        watch:{
            languageChange(val,oldVal){

            },
        },
        mounted(){
            this.getQrcode();
            // $.HSCore.components.HSStepForm.init('.js-step-form');
            //  $.HSCore.components.HSValidation.init('.js-validate', {//实例化表单验证方法 js-validate
               
            //    });
        },
        created(){
            this.interFunc()
        }
        
        
    }
</script>
<style lang="less" scoped>
.trans{
  background-color: #12869A;
  transform: scale(1);
  transition: all 0.6s;
  span{
    color:#fff;
  }

}

.colorTab{
  color:#12869A !important;
}
</style>
<style lang="less">
#setGoogle{
    .key-img{
        background: url('../../assets/images/google/key.png');
        background-size: cover;
        width: 200px;
        height: 120px;
        line-height: 120px;
        font-size: 14px;

    }
     .scancode{
            margin-left: 20px;
            display: inline-block;
            width: 35px;
            height: 35px;
            background: url(../../assets/images/google/erweima-tubiao.png) no-repeat;
            vertical-align:top;
        }
        .scanpic{
            position: absolute;
            right: -1px;
        }
        .android-pic{
            position: absolute;
            right: -1px; 
        }
}
</style>



