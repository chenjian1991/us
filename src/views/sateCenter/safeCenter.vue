<template>
   <div id="safeCenter" class="root">
      <div class="wrapper">
         <div class="safe_title">
            <router-link to='./safeCenter'>{{$t('aqzxTitle')}}</router-link>
         </div>
         <div class="safe_container">
            <div class="basic_message">
               <h2>{{$t('basicInfo')}}</h2>
               <div class="info-content">
                  <div>
                     <ul class="account-number">
                        <li>
                           <span>{{$t('accountNumber')}}</span>
                           <em v-if="phoneNumber" v-html="phoneNumber"></em>
                           <em v-if="!phoneNumber" v-html="email"></em>
                        </li>
                        <li>
                           <span>uid : </span>
                           <em v-html="uid"></em>
                        </li>
                     </ul>
                     <ul class="ff-fee">
                        <li>
                           <!-- <span style="display:inline-block;">{{$t('FFfee')}}<em >{{discountPercent}}</em></span> -->
                           <!-- <i-switch v-model="switch1" @on-change="change" />
                           <a href="javascript:;" style="color:#12869A;font-size:12px;margin-left:10px;">{{$t('ffrules')}}</a> -->
                        </li>
                     </ul>
                  </div>
                  <div>
                     <ul>
                        <li>
                           <!-- <router-link class="despoit"  :to="{path:'/deposit',query: {currency: 'FF'}}">{{$t('deposit')}}FF</router-link> -->
                        </li>
                     </ul>
                  </div>

               </div>
            </div>
            <div class="safe_level">
               <div class="level_left">
                  <h2>{{$t('aqzxSecurityLevel')}}</h2>
                  <div class="left_content">
                     <span v-if="Weak" class="level_name">{{$t('weaklevel')}}</span>
                     <span v-if="Strong" class="level_name">{{$t('Strong')}}</span>
                     <span v-if="GENERAL" class="level_name">{{$t('geneallevel')}}</span>
                     <img :src="imgSrc" alt="">
                     <div>
                        <p>{{$t('recommended')}}</p>
                        <p>{{$t('higherSec')}}</p>
                     </div>
                  </div>
               </div>
               <div class="level_right">
                  <h2>{{$t('aqzxPassword')}}</h2>
                  <div>
                     <ul>
                        <li>
                           <span>{{$t('jymmLoginPassword')}}</span>
                           <router-link to='/originLoginPassword'>{{$t('aqzxModify')}}</router-link>
                        </li>
                        <li>
                                    <span class="trading_pass">
                                        <em>{{$t('jymmTradingPassword')}}</em>
                                       <Icon v-if="!tradingPassflag" class="alert" type="md-alert"/>
                                       <Icon v-if="tradingPassflag" class="circle" type="md-checkmark-circle"/>
                                    </span>

                           <router-link v-if="!setTradingPassword" to='/originTradePassword?origin=safecenter'>
                              {{$t('aqzxset')}}
                           </router-link>
                           <router-link v-else to='/originTradePassword?origin=safecenter'>{{$t('aqzxModify')}}
                           </router-link>
                        </li>
                         <li class="set_trade_password"  v-if="setTradingPassword" >
                           <span class="trading_pass">
                              <em>{{$t('交易密码失效')}}</em>
                           </span>
                           <span class="pass_tips">{{$t('仅应用于币币交易')}}</span>
                           <RadioGroup @on-change='passwordSetTime' v-model="passwordTime">
                                        <Radio label="1">
                                             <span >{{$t('每两小时输入')}}</span>
                                        </Radio>
                                        <Radio class="radio_item" label="0">
                                             <span>{{$t('不输入')}}</span>
                                        </Radio>
                           </RadioGroup>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div class="verfification">
               <h1 class="title">{{$t('aqzxRealName')}}</h1>
               <div class="vertification_content">
                  <ul>
                     <li>
                           <span>
                              <Icon v-if="!phoneNumber" class="alert" type="md-alert"/>
                              <Icon v-if="phoneNumber" class="circle" type="md-checkmark-circle"/>
                              <em>{{$t('aqzxPhoneNumber')}}</em>
                           </span>
                        <span v-html="phoneNumber"></span>
                        <span>{{$t('aqzxPhoneExplain')}}</span>
                        <span>
                              <router-link v-if="!phoneNumber" :to="{path:'./bandPhone',query:{phoneFlag:0}}">{{$t('aqzxset')}}</router-link>
                        </span>
                     </li>
                     <li>
                           <span>
                              <Icon v-if="!email" class="alert" type="md-alert"/>
                              <Icon v-if="email" class="circle" type="md-checkmark-circle"/>
                              <em>{{$t('aqzxEmail')}}</em>
                           </span>
                        <span v-html="email"></span>
                        <span>{{$t('aqzxPhoneExplain')}}</span>
                        <span>
                           <router-link v-if="!email" :to="{path:'./bandEmail',query:{emailFlag:0}}">{{$t('aqzxset')}}</router-link>
                        </span>
                     </li>
                     <li>
                        <span>
                           <Icon v-if="!googleFlag" class="alert" type="md-alert"/>
                           <Icon v-if="googleFlag" class="circle" type="md-checkmark-circle"/>
                           <em>{{$t('aqzxGoogle')}}</em>
                        </span>
                        <span></span>
                        <span>{{$t('aqzxPhoneExplain')}}</span>
                        <span>
                           <router-link v-if="!googleFlag" to='/setGoogle'>{{$t('aqzxset')}}</router-link>
                           <router-link v-if="googleFlag" to='/closeGoogle'>{{$t('aqzxclose')}}</router-link>
                        </span>
                     </li>
                     <li>
                        <span>
                           <Icon v-if="iD" class="alert" type="md-alert"/>
                           <Icon v-if="checking" class="warning" type="md-alert"/>
                           <Icon v-if="passed" class="circle" type="md-checkmark-circle"/>
                           <em>{{$t('aqzxIdentity')}}</em>
                        </span>
                        <span></span>
                        <span>{{$t('aqzxPhoneExplaintwo')}}</span>
                        <span v-if="iD" @click="seeRealNameDetailMethod" class="seeRealNameDetail">
                           {{$t('aqzxset')}}
                        </span>
                        <span v-if="!iD" @click="seeRealNameDetailMethod" class="seeRealNameDetail">
                           {{$t('aqzxsee')}}
                        </span>
                     </li>
                     <!-- <li>
                        <span>
                           <Icon v-if="amlID" class="alert" type="md-alert"/>
                           <Icon v-if="amlChecking" class="warning" type="md-alert"/>
                           <Icon v-if="amlPassed" class="circle" type="md-checkmark-circle"/>
                           <em>{{$t('kyc2')}}</em>
                        </span>
                        <span></span>
                        <span>{{$t('kyc2Hint')}}</span>
                        <span v-if="amlID" @click="amlsetMethod" class="seeRealNameDetail">
                              {{$t('aqzxset')}}
                        </span>
                        <span v-if="!amlID" @click="amlsetMethod" class="seeRealNameDetail">
                              {{$t('aqzxsee')}}
                        </span>
                     </li> -->
                  </ul>
               </div>

            </div>
            <!--新加 api-->
            <!-- <div class="api">
               <h2 class="title">API</h2>
               <Row type="flex" justify="space-between" align="middle" class="api-row">
                  <Col span="22">{{$t('safeCenterCreate')}}<a
                     href="https://github.com/55official/55com-official-api-docs/blob/master/quote_open_api.md"
                     target="_blank">&nbsp;&nbsp;{{$t('safeCenterDoc')}}&nbsp;&nbsp;</a>
                  </Col>
                  <Col span="2" align="right">
                     <router-link to="/createAPI" class="enable" v-if="enable">{{$t('safeCenterEnable')}}</router-link>
                     <router-link to="/apiManage" class="enable" v-if="!enable">{{$t('safeCenterManage')}}</router-link>
                  </Col>
               </Row>
            </div> -->
         </div>


      </div>
      <Modaltips :modal='showModal' :text="text"></Modaltips>
       <Modal
        :mask-closable='false'
        :closable="false"
        v-model="modal1"
        :title="this.$t('safeVerify')"
        class-name="passwordPup"
        @on-ok="okSubmit"
       >
      <Form class="clearfix form_container" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
               <!-- 发送手机验证码 -->
               <div v-if="phoneFlage"  class="clearfix">
                  <div class="span-label">
                     <span>{{$t('aqzxtsendsma')}}</span><em>{{phoneNumber}}</em>
                  </div>
                  <FormItem class="form_item smsCode" prop='smsCode'>
                        <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                        <sendBtn robotDiv='robotDiv'  @sendCick= 'sendSMSfun' :empty='false' :tradePassPhone='tradePassPhone'></sendBtn>
                  </FormItem>
               </div>
               <!-- 发送邮箱验证码 -->
               <div v-if="emailFlage"   class="clearfix">
                  <div class="span-label">
                     <span>{{$t('aqzxsendemail')}}</span><span>&nbsp</span> <em>{{email}}</em>
                  </div>
                  <div>
                     <FormItem class="form_item smsCode" prop='emailCode'>
                        <Input :maxlength="6" v-model="formValidate.emailCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                        <sendBtn  robotDiv='robotDivSecond'  @sendCick= 'sendSMSfun' :empty="false" :tradePassEmail='tradePassEmail'></sendBtn>
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
   </div>
</template>

<script>
   import {userInfo, identify,amlqueryState,queryTradePasswordOpen,setOpenTradePassword,identifyQueryUrl} from '../../../api/urls.js';
   import {postBaseApi, postHeaderTokenBodyApi, getHeaderTokenApi} from '../../../api/axios.js';
   import Modaltips from '@/components/Modal';
   import Cookies from 'js-cookie';
   import {Exchange} from '@/interface/exchange.js'
   import sendBtn from '../../components/sendBtn';

   export default {
      name: 'login',
      components: {
         Modaltips,
         sendBtn
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
            tradingPassflag: '',
            googleFlag: false,
            iD: false,//not set
            checking: false,
            passed: false,
            amlID:false,
            amlChecking:false,
            amlPassed:false,
            imgSrc: '',
            weaklevel: 'w',
            sronglevel: 's',
            geneallevel: 'm',
            Weak: false,
            Strong: false,
            GENERAL: false,
            identifyStatus: '',
            amlStatus:'',
            setTradingPassword: false,
            switch1: null,//手续费折扣开关
            exchange: null,//交易接口函数
            discountPercent: '',//手续费折扣系数
            enable: true,
            passwordTime:'',
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
               tradePassPhone:{
                    "operateType":"SET_OPEN_TRADE_PASSWORD",
                    "codeType":"PHONE"
                },
            tradePassEmail:{
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

         }
      },
      methods: {
         handleSubmit(name) {
            this.$refs[name].validate((valid) => {
               if (valid) {
                      this.okSubmit()
               } else {
                  //this.$Message.error('Fail!');
               }
            })
         },
         getUserInfo(token) {
            postHeaderTokenBodyApi(userInfo, token, {}).then((res) => {
               if (res.code) {
                  this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                  this.text = this.$t(res.code);
                  if (res.code == '10013') {
                     this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                     this.text = this.$t(res.code);
                     this.$store.commit('changeLoingStatus', false);
                     setTimeout(() => {
                        this.$router.push('/login');
                     }, 2000);
                  }
               } else {
                  let tradingPasswordFlag = res.isSetTradePasswrod;
                  this.setTradingPassword = tradingPasswordFlag;

                  this.uid = res.ex55Pin;
                  this.phoneNumber = res.phone;
                  this.email = res.email;
                  this.tradingPassflag = res.isSetTradePasswrod;
                  this.googleFlag = res.isBindingGoogle;
                  let level = res.securityLevel;
                  localStorage.setItem('email', this.email);
                  localStorage.setItem('phone', this.phoneNumber);
                  localStorage.setItem('google', this.googleFlag);

                  localStorage.setItem('loginEx55Pin', this.uid);
                  localStorage.setItem('ifEmail', this.email);
                  localStorage.setItem('securitPhone', this.phoneNumber);
                  localStorage.setItem('ifsetgoogle', this.googleFlag);
                  if(this.phoneNumber==null){
                           this.phoneFlage = false;
                     }else{
                           this.phoneFlage = true;
                     }
                      if(this.email==null){                                                                                                           
                           this.emailFlage = false;
                     }else{
                           this.emailFlage = true;
                     }
                     if(this.googleFlag==false){
                           this.googleFlag = false;
                     }else{
                           this.googleFlag = true;
                     }
                  if (level == "WEAK") {
                     this.imgSrc = require('../../assets/images/safety/Weak.png')
                     this.Weak = true;
                  } else if (level == "GENERAL") {
                     this.imgSrc = require('../../assets/images/safety/Medium.png')
                     this.GENERAL = true;
                  } else if (level == "STRONG") {
                     this.imgSrc = require('../../assets/images/safety/Strong.png')
                     this.Strong = true;
                  }

               }


            }).catch((res) => {
            })
         },
         amlsetMethod(){
               if(this.amlStatus=='NOHAVE'){
                  this.$router.push('amlKyc')
               }else{
                  this.$router.push('amlkycResult')
               }
         },
         passwordSetTime(value){
            this.passwordTime = value;
            this.modal1 = true;
            this.formValidate.smsCode='';
            this.formValidate.googleNumber='';
            this.formValidate.emailCode='';
            // console.log(value)
         },
           queryOpenTradepassword(){
                  getHeaderTokenApi(queryTradePasswordOpen,"",Cookies.get('loginToken')).then((res)=>{
                     console.log(res)
                     this.switchFlag = res.data.result;
                     if(this.switchFlag){
                        this.passwordTime = '1'
                     }else{
                        this.passwordTime = '0'
                     }
                  })

         },
          sendSMSfun(callback){
                    this.tradePassPhone = { //手机发送
                        "operateType":"SET_OPEN_TRADE_PASSWORD",
                        "codeType":"PHONE"
                    }
                    this.tradePassEmail = {//邮箱发送
                        "codeType": "EMAIL",
                        "operateType": "SET_OPEN_TRADE_PASSWORD"
                    }
                    if(callback){//callback是从子组件传递过来的参数
                        this.showModal = !this.showModal;
                        this.text = callback;
                    }

            },
              okSubmit(){
                      let params = {
                           "googleCode":this.formValidate.googleNumber,
                           "phoneCode":this.formValidate.smsCode,
                           "emailCode":this.formValidate.emailCode,
                           openTradePassword:this.passwordTime
                        }
                        postHeaderTokenBodyApi(setOpenTradePassword,Cookies.get('loginToken'),params).then((res)=>{
                                 console.log(res)
                                 if(res.code){
                                    this.$Notice.error({
                                       title: this.$t(res.code),
                                       desc:this.$t(res.code)
                                    });
                              }else{
                                    this.modal1 = false;
                                    this.queryOpenTradepassword();
                                    localStorage.removeItem("ORDER_SESSION");
                                    localStorage.removeItem("PASSWORDTOKEN")
                                    this.$Notice.success({
                                       title: this.$t('11001'),
                                       desc:this.$t('11001')
                                    });
                              }
                        })
         },
         cancelbtn(){
                this.queryOpenTradepassword();
                this.modal1 = false;
         },
         // L2queryState(token){
         //        getHeaderTokenApi(amlqueryState,'',token).then((res)=>{
         //            if(res.data.result){
         //               this.amlStatus = res.data.result;
         //               if(res.data.result=='SUCCESS'){
         //                   this.amlPassed = true;
         //               }else if(res.data.result=='FAIL'||res.data.result=='NOHAVE'){
         //                   this.amlID = true;
         //               }else if(res.data.result =='SUBMIT'||res.data.result=='PENDING'){
         //                  this.amlChecking  = true; 
         //               }
         //            }else if(res.data.code){
         //                if(res.data.code =='10013'){
         //                    this.$router.push('login')
         //                }
         //                this.$Notice.error({
         //                        title: this.$t(res.data.code),
         //                        desc:this.$t(res.data.code)
         //                 });
         //            }
         //        })
         // },

          getRealNameIdentify(token){
                 getHeaderTokenApi(identifyQueryUrl, {}, token).then((res) => {
                if (res.data.code) {
                        this.$Notice.error({
                            title: this.$t(res.data.code),
                            desc: this.$t(res.data.code)
                        });
                        this.$router.push('/login')
                    }
               if(res.data==''|| res.data==null){//空
                  this.iD = true;
                  this.checking = false;
                  this.passed = false;
                  this.identifyStatus ='';
                  return;
               }
               let identifyFlag = res.data.dataStatus;
               this.identifyStatus = identifyFlag;
               if (identifyFlag == 1 || identifyFlag == 4) {//失败
                  this.iD = true;
                  this.checking = false;
                  this.passed = false;
               } else if (identifyFlag == 3) {//成功
                  this.iD = false;
                  this.checking = false;
                  this.passed = true;

               } else if (identifyFlag == 2) {//submit
                  this.checking = true;
                  this.iD = false;
                  this.passed = false;
               }
            }).catch((res) => {
               console.log(res)
            })
         },
         seeRealNameDetailMethod() {
            let loginToken = Cookies.get("loginToken");
            getHeaderTokenApi(identifyQueryUrl, {}, loginToken)
            .then(res => {
               if (res.data == "" || res.data == null||res=='{}') {
                  this.$router.push("/kyc");
                  return;
               }
                  if (res.data.code) {
                  this.$Notice.error({
                  title: this.$t(res.data.code),
                  desc: this.$t(res.data.code)
                  });
                  this.$router.push("/login");
               }
               let status = res.data.dataStatus;
               if (status == 1) {
                  this.$router.push("/kyc");
               } else {
                  this.$router.push("/identityResult");
               }
            })
            .catch(error => {
               console.log(error)
            });
         },
         // seeRealNameDetailMethod() {
         //    if (this.identifyStatus == 'NOT_SET') {/*  */
         //       this.$router.push('/kyc')
         //    } else if (this.identifyStatus == 'PASSED' || this || s.identifyStatus == 'CHECKING' || this.identifyStatus == 'FAILURE') {
         //       this.$router.push('/identityResult')
         //    }
         // },
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
         }

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
         console.log()
         let loginToken = Cookies.get('loginToken');
         this.getUserInfo(loginToken)
         this.getRealNameIdentify(loginToken)
         //  this.L2queryState(loginToken)
          this.queryOpenTradepassword()
         localStorage.setItem('curPage', 0)//只有在安全中心页面设置0，才会在交易密码页面显示正确的发送验证码页面
         var ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         // //登录以后查询资产 挂单 成交记录
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
   .ff-fee .ivu-switch-checked {
      border-color: #12869A;
      background-color: #12869A;
   }

   .ff-fee .ivu-switch:focus {
      box-shadow: none;
   }
    .passwordPup{
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
                   background-color: #fff;

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
         padding-bottom: 30px;
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
      .alert{
         padding: 0px;
         margin-bottom: 0px;
      }
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
   @import './safeCenter.less';

   .wrapper {
      padding-bottom: 40px;
      @color: #12869A;
      .api {
         margin-top: 40px;
         .title {
            font-size: 16px;
            margin-bottom: 11px;
         }
         .api-row {
            background-color: #fff;
            padding: 20px 30px;
            color: #949DA6;
            a {
               color: @color;
            }
            .enable {
               font-size: 14px;
               color: @color;
            }
         }
      }
   }
</style>







