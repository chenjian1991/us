<template>
   <div>
      <div id="safeCenter">
         <div class="front-contaier">
    <AccountInfo name="AccountInfo" />

        <div class="container space-2">
                <div class="mb-9">
                    <!-- Title -->
                    <div class="mb-3">
                        <h2 class="h5 mb-0">{{$t('aqzxverify')}}</h2>
                    </div>
                    <!-- End Title -->
                    <div class="card-deck d-block d-md-flex">
                        <div class="card mb-4 mb-md-0">
                        <!-- Card google-->
                        <div class="card-body p-5">
                            <h4 class="h6">{{$t('aqzxGoogle')}} </h4>
                            <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplain')}} </p>
                            <router-link to='/closeGoogleCode' v-if="googleFlag" style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxclose')}}</router-link>
                            <router-link to='/setGoogleCode'   v-else style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxset')}}</router-link>
                        </div>
                        <!-- End Card -->
                        </div>

                        <div class="card">
                        <!-- Card  bindphone-->
                         <div class="card-body p-5">
                            <h4 class="h6">{{$t('CreateAPISMSAuthentication')}} </h4>
                            <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplain')}} </p>
                            <router-link :to="{path:'./BandPhone',query:{phoneFlag:0}}"  v-if="!phoneNumber" style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxset')}}</router-link>
                            <p class="font-size-2 mb-0">{{phoneNumber}} </p>
                           
                        </div>
                        </div>
                    </div>
                </div>
                <div class="mb-9">
                    <div class="card-deck d-block d-md-flex">
                        <div class="card mb-4 mb-md-0">
                        <!-- Card bindemail-->
                        <div class="card-body p-5">
                            <h4 class="h6"> {{$t('aqzxBandEmail')}}</h4>
                            <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplain')}} </p>
                            <router-link v-if="!email" :to="{path:'./BandEmail',query:{emailFlag:0}}"  style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxset')}}</router-link>
                            <p class="font-size-2 mb-0">{{email}} </p>
                        </div>
                        <!-- End Card -->
                        </div>

                        <div class="card">
                        <!-- Card  kyc-->
                         <div class="card-body p-5">
                            <h4 class="h6">{{$t('aqzxIdentity')}} </h4>
                            <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplaintwo')}}</p>
                            <span @click="seeRealNameDetailMethod" v-if="identifyState==='INIT'" style="background:#12869a;margin-top:20px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxset')}}</span>
                            <span @click="seeRealNameDetailMethod" v-else style="background:#12869a;margin-top:20px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxsee')}}</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="mb-9">
                    <!-- Title -->
                    <div class="mb-3">
                        <h2 class="h5 mb-0">{{$t('aqzxPassword')}}</h2>
                    </div>
                    <!-- End Title -->
                    <div class="card-deck d-block d-md-flex">
                        <div class="card mb-4 mb-md-0">
                        <!-- Card loginpassword-->
                        <div class="card-body p-5">
                            <h4 class="h6">{{$t('aqzxtloginpassword')}} </h4>
                            <p class="font-size-1 mb-0">{{$t('aqzxPhoneExplain')}} </p>
                            <router-link to='/LoginPass' style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxModify')}}</router-link>
                        </div>
                        <!-- End Card -->
                        </div>

                        <div class="card">
                        <!-- Card trad password-->
                         <div class="card-body p-5">
                            <h4 class="h6">{{$t('jymmTradingPassword')}} </h4>
                            <p class="font-size-1 mb-0">{{$t('用于保护资产安全')}}</p>
                            <router-link to='/OriginTradePassword?origin=safecenter' v-if="!setTradingPassword" style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxset')}}</router-link>
                            <router-link to='/OriginTradePassword?origin=safecenter' v-else style="background:#12869a;margin-top:10px;" class="btn btn-xs btn-primary transition-3d-hover mr-1" href="#">{{$t('aqzxModify')}}</router-link>
                            <p class="font-size-1 mb-0 mt-2" v-if="setTradingPassword" >
                                 <!-- <span class="trading_pass">
                                   {{$t('交易密码失效')}}
                                 </span> -->
                                 <div class="pass_tips">{{$t('仅应用于币币交易')}}</div>
                                 <RadioGroup @on-change='passwordSetTime' v-model="switchState">
                                             <Radio label="true">
                                                   <span >{{$t('每两小时输入')}}</span>
                                             </Radio>
                                             <Radio class="radio_item" label="false">
                                                   <span>{{$t('不输入')}}</span>
                                             </Radio>
                                 </RadioGroup>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        <!-- container -->
    </div>
      </div>
      <Modaltips :modal='showModal' :text="text"></Modaltips>
      <Modal
        :mask-closable='false'
        :closable="false"
        v-model="modal1"
        :title="this.$t('safeVerify')"
        class="passwordPup"
        @on-ok="okSubmit"
       >
      <Form class="clearfix form_container" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
               <!-- 发送手机验证码 -->
               <div v-if="phoneNumber"  class="clearfix">
                  <div class="span-label">
                     <span>{{$t('aqzxtsendsma')}}</span><em>{{phoneNumber}}</em>
                  </div>
                  <FormItem class="form_item smsCode" prop='smsCode'>
                        <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                        <sendBtn :machine='false'  business='business'  @sendCick= 'sendSMSfun' :empty='false' :switchTradePassPhone='switchTradePassPhone'></sendBtn>
                  </FormItem>
               </div>
               <!-- 发送邮箱验证码 -->
               <div v-if="email"   class="clearfix">
                  <div class="span-label">
                     <span>{{$t('aqzxsendemail')}}</span><span>&nbsp</span> <em>{{email}}</em>
                  </div>
                  <div>
                     <FormItem class="form_item smsCode" prop='emailCode'>
                        <Input :maxlength="6" v-model="formValidate.emailCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                        <sendBtn :machine='false'  business='business'  @sendCick= 'sendSMSfun' :empty="false" :switchTradePassEmail='switchTradePassEmail'></sendBtn>
                     </FormItem>
                  </div>
               </div>
               <!-- 谷歌验证 -->
               <div v-if="googleFlag"  class="clearfix">
                  <div class=" span-label">
                     <span>{{$t("googleCodenumCode")}}</span>
                  </div>
                  <FormItem class="form_item google_input" prop='googleNumber'>
                     <Input :maxlength="6" v-model="formValidate.googleNumber" :placeholder="$t('goolePlaceholder')"></Input>
                  </FormItem>
               </div>
           
         </Form>
      <p slot="footer">
         <button class="cancelBtn" style="margin-right:74px;cursor:pointer"  @click="cancelbtn">{{$t('cancel')}}</button>
         <button  v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" size="large" type="primary">{{$t('confrim')}}</button>
         <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button> 
      </p>
    </Modal>

    <Modal
        v-model="modal2"
        :title="$t('尊敬的用户')"
        :mask-closable="false">
        <p>{{$t('kycModalText1')}}</p>
        <p>{{$t('kycModalText2')}}</p>
         <div slot="footer">
            <Button type="primary" size="default"  @click="ok">{{$t('去实名')}}</Button>
            <Button size="default"  @click="cancel">{{$t('稍后再说')}}</Button>
        </div>
    </Modal>
   </div>
</template>

<script>
   import {userInfo,setOpenTradePassword,queryTradePasswordOpen,verifyBusinessCode,switchTradingPassword} from '../../../api/urls.js';
   import { postHeaderTokenBodyApi, getHeaderTokenApi} from '../../../api/axios.js';
   import Modaltips from '@/components/Modal';
   import {Exchange} from '@/interface/exchange.js';
   import sendBtn from '../../components/sendBtn';
   import AccountInfo from "../../components/common/AccountInfo.vue";
   import {getBrowserMessage} from "@/lib/utils.js"




   export default {
      name: 'login',
      components: {
         Modaltips,
         sendBtn,
         AccountInfo
      },
      data() {
           const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    callback()
                }
            };
             const validateGoogle = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('googleMust')))
                    }else{
                        
                    }
                    callback()
                }
            };
         return {
            empty: true,
            token: '',
            showModal: false,
            text: '',
            phoneNumber: '',
            email: '',
            uid: '',
            // tradingPassflag: '',
            identifyState: '',//not set
            passed: false,
            imgSrc: '',
            identifyStatus: '',
            setTradingPassword: true,
            switch1: null,//手续费折扣开关
            exchange: null,//交易接口函数
            discountPercent: '',//手续费折扣系数
            enable: true,
            switchState:'',
            modal1:false,
            loaded:true,
            googleFlag:false,
            phoneFlage:false,
            emailFlage:false,
            switchFlag:true,
            formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    smsCode:'',
                    emailCode:'',
                    googleNumber:'',

            },
            switchTradePassPhone:{
                    "operateType":"SET_OPEN_TRADE_PASSWORD",
                    "codeType":"PHONE"
                },
            switchTradePassEmail:{
                    codeType: "EMAIL",
                    language: localStorage.getItem('countryLanguage'),
                    operateType: "SET_OPEN_TRADE_PASSWORD"
                
            },
            
             ruleValidate: {
                    smsCode: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    emailCode:[
                        { validator: validateSms, trigger: 'blur' }
                    ],
                     googleNumber:[
                        {validator: validateGoogle, trigger: 'blur'}
                    ],
                    
                },
                validateToken:'',
                deviceObj:{},
                modal2:false,
         }
      },
      methods: {
         ok(){
            if (this.identifyState === 'INIT') {/*  */
                  this.$router.push('/kyc')
            }else{
                  this.$router.push('/identityResult')
            }
         },
         cancel(){
            this.modal2 = false
         },
         handleSubmit(name) {
            this.$refs[name].validate((valid) => {
               if (valid) {
                     this.codeVerify()
               } else {

               }
            })
         },
         getUserInfo(token){
                let params = {
                     "userId":localStorage.getItem('loginUserId'),
                }
                getHeaderTokenApi(userInfo,params,token).then((res) =>{
                    let userInfo = res.data;
                    this.email = res.data.email;
                    this.phoneNumber = res.data.phone;
                    this.googleFlag = res.data.bindGoogle;
                    this.identifyState = res.data.identifyState;
                    this.setTradingPassword = res.data.setTradePassword;
                    this.switchState = res.data.openTradePassword.toString()
                }).catch((res) =>{

                })
            },
         sendSMSfun(callback){
               if(callback){//callback是从子组件传递过来的参数
                  this.showModal = !this.showModal;
                  this.text = callback;
               }
            },
         seeRealNameDetailMethod() {
            if (this.identifyState === 'INIT') {/*  */
               this.$router.push('/kyc')
            } else if (this.identifyState ==='SUCCESS'|| this.identifyState === 'SUBMIT'|| this.identifyState === 'FAIL') {
               this.$router.push('/identityResult')
            }
         },
         //手续费折扣开关
         change(status) {
            this.ffFeesFun();
         },
         ffFeesFun() {
            this.exchange.getFFfees(this.switch1, data => {
               if (data.commissionTemplateId == "FF_DEDUCTIBLE") {
                  this.switch1 = true
               } else {
                  this.switch1 = false
               }
               this.getAccountInfoData();
            })
         },
         getAccountInfoData() {
            //查询是否开启手续费折扣
            this.exchange.getAccountInfo(data => {
               if (data.commissionTemplateId == "FF_DEDUCTIBLE") {
                  this.switch1 = true
               } else {
                  this.switch1 = false
               }
               if (data.commissionTemplateContext.COMMISSION_FF_DEDUCTIBLE_RATE) {
                  this.discountPercent = Number(data.commissionTemplateContext.COMMISSION_FF_DEDUCTIBLE_RATE) * 100 + "%"
               } else {
                  this.discountPercent = ''
               }
            })
         },
         passwordSetTime(value){
            this.switchState = value;
            this.modal1 = true;
            this.formValidate.smsCode='';
            this.formValidate.googleNumber='';
            this.formValidate.emailCode='';
         },
         codeVerify(){
                let bodyParam  = {
                    "userId":localStorage.getItem('loginUserId'),
                    "businessType":'switch_trade_password',
                    "phoneCode":this.formValidate.smsCode,
                    "emailCode":this.formValidate.emailCode,
                    "googleCode":this.formValidate.googleNumber,
                }
                postHeaderTokenBodyApi(verifyBusinessCode,$cookies.get('loginToken'),bodyParam).then((res) =>{
                    if(res.result){
                       this.validateToken = res.result;
                       this.okSubmit()
                    }
                }).catch((error)=>{
                    this.loaded = true;
                })
            },

         okSubmit(){
               let params = {
                  'userId':localStorage.getItem('loginUserId'),
                  'state':this.switchState,
                  'deviceType':'WEB',
                  "deviceCode": localStorage.getItem('deviceCode'),
               }
               postHeaderTokenBodyApi(switchTradingPassword,this.validateToken,params).then((res)=>{
                  if(res.result){
                     this.$Notice.success({
                           title:this.$t(11001),
                           desc:this.$t(11001)
                     });
                     this.modal1 = false;
                     this.getUserInfo($cookies.get('loginToken'))
                     localStorage.removeItem("ORDER_SESSION");
                     localStorage.removeItem("PASSWORDTOKEN");
                  }
                        
               })
         },
         cancelbtn(){
               this.getUserInfo($cookies.get('loginToken'))
               this.modal1 = false;
         },
      },
      computed: {
         languageChange() {
            return this.$store.state.app.countryLanguage;//  返回全局state的状态值
         },
      },
      watch: {
         languageChange(val, oldVal) {

         },
      },
      destroyed() {
         this.exchange = null
      },
      mounted() {
         this.deviceObj = getBrowserMessage();
          this.switchTradePassPhone = { //手机发送
            "userId":localStorage.getItem('loginUserId'),
            "businessType":"switch_trade_password",
            "sendCodeType":'phone'
         }
         this.switchTradePassEmail = {//邮箱发送
            "userId":localStorage.getItem('loginUserId'),
            "businessType":"switch_trade_password",
            "sendCodeType":'email'
         }
         this.getUserInfo($cookies.get('loginToken'))
         var ssoProvider = {};
         let loginToken = $cookies.get('loginToken');
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         if (loginToken) {
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               fn(loginToken);
            }.bind(this);
            // 查询是否FF手续费折扣
            // this.getAccountInfoData();
         }
         this.exchange.getAccountInfo(function (result) {
            if (result.secretKeySummaryList.length !== 0) {
               this.enable = false
            }
         }.bind(this))
      }
   }
</script>
<style lang='less'>
#safeCenter{
    .container{
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }   
    .ivu-radio-group{
       vertical-align: top;
       margin-left:5px;
    }
    .btn-primary:hover{
       color:#fff !important;
    }
}

   // .ff-fee .ivu-switch-checked {
   //    border-color: #12869A;
   //    background-color: #12869A;
   // }
   // .ff-fee .ivu-switch:focus {
   //    box-shadow: none;
   // }
   .passwordPup{
      em{
         font-style: normal;
      }
        .form_container{
            .span-label{
               color:#949DA6;
               font-size: 14px;
               padding-bottom: 10px;
            }
            .smsCode{
               position: relative !important;
               .btn_contain{
                     position: absolute;
                     right: 0px;
                     top: 0px;
                     .sendMs{
                        width: 90px;
                        height: 40px;
                     }
               }
            }
            .form_item{
               .ivu-input-wrapper{
                  width: 250px;
                  .ivu-input{
                     height: 40px;
                     width: 100%;
                     background: #fff;

                  }
               }
               
            }
            .google_input{
               .ivu-input-wrapper{
                  width: 340px;
               }
            }
         }
      .ivu-modal-body{
         width: 368px;
         margin: 0 auto;
          .clearfix{
         margin-top: 20px;
      }
      }
      .ivu-modal-footer{
         text-align: center;
         border-top: none;
         p{
            button{
               background: #12869A;
               color:#fff;
               width: 120px;
               height: 40px;
               line-height: 40px;
               outline:none;
            }
            .cancelBtn{
               background: none;
               color: #12869A;
               border:1px solid #12869A;
               &:hover{
                  background: #12869A;
                  color:#fff;
               }
            }
         }
      }
   }
   #safeCenter{
      .ivu-radio-checked .ivu-radio-inner{
         border-color: #2d8cf0;
      }
      .ivu-radio-inner:after{
         background-color: #12869A;
         border: 1px solid #12869A;
      }
   } 
</style>

<style scoped lang="less">
   .wrapper {
      padding-bottom: 40px;
      @color: #12869A;
   }
</style>







