<template>
    <div id="origintradepassword" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="/originLoginPassword">{{$t("aqzxchangetradepassword")}}</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">{{$t("aqzxtradepasswordtips")}}</div>
                <div class="page-title">{{$t("aqzxchangetradepassword")}}</div>
                <div class="inner_input_login">
                    <div class="login_title">
                        <div class="pull-left step-one">
                            <p class="step active">1</p>
                            <p>{{$t("aqzxverify")}}</p>
                        </div>
                        <div class="line"></div>
                        <div class="pull-right step-two">
                            <p class="step">2</p>
                            <p>{{$t("aqzxchangetradepassword")}}</p>
                        </div>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div class="clearfix">
                            <div class="pull-left span-label">
                                <span>{{$t("aqzxloginpass")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passwordNumber'>
                                <img src="../../assets/images/register/security.svg" alt="">
                                <Input type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxpasswordplaceholder')"></Input>
                            </FormItem>
                         </div>
                         <!-- 发送手机验证码 -->
                         <div v-if="phoneFlage"  class="clearfix">
                            <div class="pull-left span-label">
                                <span>{{$t('aqzxtsendsma')}}</span><em>{{phoneNumber}}</em>
                            </div>
                             <FormItem class="form_item smsCode pull-left" prop='smsCode'>
                                    <img src="../../assets/images/register/code.svg" alt="">
                                    <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                                    <sendBtn   @sendCick= 'sendSMSfun' :empty='false' :tradePassPhone='tradePassPhone'></sendBtn>
                            </FormItem>
                         </div>
                         <!-- 发送邮箱验证码 -->
                         <div v-if="emailFlage"  class="clearfix">
                            <div class="pull-left span-label">
                                <span>{{$t('aqzxsendemail')}}</span><em>{{emailAddress}}</em>
                            </div>
                             <div>
                                <FormItem class="form_item smsCode pull-left" prop='emailCode'>
                                    <img src="../../assets/images/register/code.svg" alt="">
                                    <Input :maxlength="6" v-model="formValidate.emailCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                                    <sendBtn   @sendCick= 'sendSMSfun' :empty="false" :tradePassEmail='tradePassEmail'></sendBtn>
                                </FormItem>
                            </div>
                         </div>
                         <!-- 谷歌验证 -->
                         <div v-if="googleFlag"  class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t("googleCodenumCode")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='googleNumber'>
                                <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input :maxlength="10" v-model="formValidate.googleNumber" :placeholder="$t('goolePlaceholder')"></Input>
                            </FormItem>
                         </div>
                        <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">{{$t("aqzxnext")}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                       
                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {TradingPasswordVerify,userInfo} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
import sendBtn from '../../components/sendBtn';

    export default {
        name:'login',
        components:{
            Modal,
            sendBtn
        },
        data() {
               const validateLoginPass = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('passwordReg')))
                    }else{
                        
                    }
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
              const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    callback()
                }
            };
            return {
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    passwordNumber:'',
                    smsCode:'',
                    emailCode:'',
                    googleNumber:'',

                },
                showModal:false,
                text:'',
                validateToken:'',
                empty:false,
                googleFlag:false,
                phoneFlage:false,
                emailFlage:false,
                emailAddress:'',
                phoneNumber:'',
                googleNum:'',
                loaded:true,
                validatetradePasswordToken:'',
                tradePassPhone:{
                    "operateType":"SET_TRADE_PASSWORD",
                    "codeType":"PHONE"
                },
                tradePassEmail:{
                    codeType: "EMAIL",
                    language: localStorage.getItem('countryLanguage'),
                    operateType: "SET_TRADE_PASSWORD"
                
                },
                ruleValidate: {
                    passwordNumber: [
                        { validator: validateLoginPass, trigger: 'blur' }
                    ],
                    googleNumber:[
                        {validator: validateGoogle, trigger: 'blur'}
                    ],
                    smsCode: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    emailCode:[
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded=false;
                       this.verifyCode();
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            verifyCode(){
                  let  params = {
                    "password":this.formValidate.passwordNumber,
                    "googleCode":this.formValidate.googleNumber,
                    "phoneCode":this.formValidate.smsCode,
                    "emailCode":this.formValidate.emailCode,
                }
                postHeaderTokenBodyApi(TradingPasswordVerify,Cookies.get('loginToken'),params).then((res) =>{
                    if(res.code){
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        this.loaded= true;
                    }else{
                        this.validatetradePasswordToken = res.token;
                        localStorage.setItem('validatePasswordToken',this.validatetradePasswordToken)
                        this.$router.push('/newtradePassword')
                    }
                }).catch((error)=>{
                        this.loaded= true;
                })
            },
             sendSMSfun(callback){
                    this.tradePassPhone = { //手机发送
                        "operateType":"SET_TRADE_PASSWORD",
                        "codeType":"PHONE"
                    }
                    this.tradePassEmail = {//邮箱发送
                        "codeType": "EMAIL",
                        "language": localStorage.getItem('countryLanguage'),
                        "operateType": "SET_TRADE_PASSWORD"
                    }
                    if(callback){//callback是从子组件传递过来的参数
                        this.showModal = !this.showModal;
                        this.text = callback;
                    }

            },
            getUserInfo(token){
                postHeaderTokenBodyApi(userInfo,token,{}).then((res) =>{
                 this.emailAddress = res.email;
                 this.phoneNumber = res.phone;
                 this.googleNum = res.isBindingGoogle;
                 //转化
                    if(this.phoneNumber==null){
                        this.phoneFlage = false;
                    }else{
                        this.phoneFlage = true;
                    }
                    if(this.emailAddress==null){
                        this.emailFlage = false;
                    }else{
                        this.emailFlage = true;
                    }
                    if(this.googleNum==false){
                        this.googleFlag = false;
                    }else{
                        this.googleFlag = true;
                    }
                 localStorage.setItem('ex55Pin',res.ex55Pin);

                }).catch((res) =>{
                    console.log(res)
                })
            },
            safecenterIN(){
                this.emailFlage = localStorage.getItem('email')=='null' ? false : true;
                this.phoneFlage = localStorage.getItem('phone')=='null' ? false : true;
                this.googleFlag = localStorage.getItem('google')=='false' ? false : true;
                this.emailAddress = localStorage.getItem('email');
                this.phoneNumber = localStorage.getItem('phone');
            }
                

           
        },
        computed:{
            inputValidate(){
               return this.formValidate.passwordNumber;   
            },
            smsCodeChange(){
               return this.formValidate.smsCode;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();

            },
            smsCodeChange(val,oldVal){
                if(!this.formValidate.smsCode==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                    this.formValidate.smsCode= this.formValidate.smsCode.replace(/[^\d]g/,'');
                }
            },
        },
        mounted(){
            let origin =this.$route.query.origin;
            if(origin=="safecenter"){
                this.safecenterIN()
            }else{
                this.getUserInfo(Cookies.get('loginToken'))
            }


        }
        
        
    }
</script>
<style lang='less'>
#origintradepassword{
     .ivu-btn{
         border-radius: 0px !important;
     }
    
}
    

</style>
<style scoped lang="less">
    @import './originTradePassword.less';
</style>


