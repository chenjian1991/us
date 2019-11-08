<template>
    <div  id="registerHtml" class="root">
        <div  class="wrapper">
            <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    :title="this.$t('yanzheng')"
                    :mask-closable="false"
                   >
                    <div id="robot"></div>
                    <p slot="footer"></p>
                </Modal>
            <div  class="register_wraper">
                <div v-clickoutside="handleClose" class="inner_input">
                    <div class="register-title">
                        Sign Up
                        <!-- {{$t('signupEmail')}} -->
                        <!-- <h3>{{$t('signupEmail')}}</h3> -->
                        <!-- <ul>    
                            <li @click="emailTab" :class="{register_on:shows==2}">{{$t('signupEmail')}}</li>
                            <li @click="phoneTab" :class="{register_on:shows==1}">{{$t('signupPhone')}}</li>
                        </ul> -->
                    </div>
                    <div class="register-container">
                        <div  class="phone">
                            <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                            <div v-if="phoneRegister">
                                <div style="color:#fff;margin-bottom:10px;font-size:14px;">{{$t('lawTipstitle')}}</div>
                                <FormItem class="form_item">
                                    <div class="country_container country">
                                        <div @click="controCountrylSelect">
                                            <input type="hidden">
                                            <div>
                                                <img :src="countryFlag" alt="">
                                                <em v-html="globalCountryNumber" class="code"></em>
                                                <Icon v-show="!countrySelectFlag" type="ios-arrow-down" />
                                                <Icon v-show="countrySelectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="10" mode="out-in"  name='fade'>
                                            <div v-show="countrySelectFlag" class="select_dropdown country_select_down">
                                                <ul class="select_down_list">
                                                    <li @click="chooseGlobalCountry(item.en,item.image,item.locale,item.code)" v-for="item in ossJSON" :value="item.label"  :label="item.label">
                                                        <div>
                                                            <img class="flag" :src="item.image"></img>
                                                            <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                    </div>
                                    <div style="color:#fff;font-size:14px;margin-top:10px;">{{$t('lawTips')}}</div>

                                </FormItem>
                                <FormItem class="form_item" prop='userName'>
                                    <img  style="top:18px;" src="../../assets/images/register/yonghu.svg" alt="">
                                    <Input  type="text"   v-model="formValidate.userName"  :placeholder="this.$t('userName')"></Input>
                                    <div v-if="nameFlag" style="position:absolute;top:42px;color:#ed4014;right:0px;">{{$t('usernameused')}}</div>
                                </FormItem>
                                <FormItem class="form_item phone_item" prop='phoneNumber'>
                                    <div class="country_container">
                                        <div @click="controlSelect">
                                            <input type="hidden">
                                            <div>
                                                <em v-html="countryNumber" class="code"></em>
                                                <Icon v-show="!selectFlag" type="ios-arrow-down" />
                                                <Icon v-show="selectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="10" mode="out-in">
                                            <div v-show="selectFlag" class="select_dropdown">
                                                <ul class="select_down_list">
                                                <li @click="chooseCountry(item.code)" v-for="item in ossJSON" :value="item.label"  :label="item.label">
                                                    <div>
                                                        <img class="flag" :src="item.image"></img>
                                                        <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                    </div>
                                                    <span v-html="item.code"></span>
                                                </li>
                                                </ul>
                                                </div>
                                        </transition>
                                    </div>
                                    <Input  type="text"  :maxlength="30" v-model="formValidate.phoneNumber"  :placeholder="$t('phonePlacehodlerphone')"></Input>
                                </FormItem>
                                <FormItem class="form_item smsCode" prop='smsCode'>
                                    <img src="../../assets/images/register/code.svg" alt="">
                                    <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                                    <sendBtn  robotDiv='robotPhoneRegister'   @sendCick= 'sendSMSfun' :empty='empty' :phoneMessage='phoneMessage'></sendBtn>
                                </FormItem>
                                <FormItem class="form_item" prop='password'>
                                    <img src="../../assets/images/register/password.svg" alt="">
                                    <Input type="password" v-model="formValidate.password" :placeholder="$t('passwordPlacehodler')"></Input>
                                </FormItem>
                                <FormItem class="form_item" prop='confrimPassword'>
                                    <img src="../../assets/images/register/password.svg" alt="">
                                    <Input type="password" v-model="formValidate.confrimPassword" :placeholder="$t('confirmPasswordPlacehodler')"></Input>
                                </FormItem>
                                <!-- <FormItem class="form_item" prop='referrId'>
                                    <img style="width:16px;height:20px;" src="../../assets/images/register/Referral_ID.svg" alt="">
                                    <Input :disabled='referrDisable' v-model="formValidate.referrId" :placeholder="$t('referridPlacehodler')"></Input>
                                </FormItem> -->
                                <FormItem prop="interest">
                                    <CheckboxGroup v-model="formValidate.interest">
                                        <Checkbox label='ddd'><span style="color:#51809F;" class="agree_tip">{{$t('regAgree')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/legal/terms">{{$t('regTermsOfUse')}}</router-link>
                                           <span style="color:#51809F;padding:0 10px;">{{$t('registerAnd')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/legal/privacy">{{$t('隐私条款')}}</router-link>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </div>
                            <div v-if="emailRegister" class="email">
                                <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                                 <div id="captcha"></div>
                                <div style="color:#fff;margin-bottom:10px;font-size:14px;">{{$t('lawTipstitle')}}</div>
                                  <FormItem class="form_item">
                                    <div class="country_container country">
                                        <div @click="controCountrylSelect">
                                            <input type="hidden">
                                            <div>
                                                <img :src="countryFlag" alt="">
                                                <em v-html="globalCountryNumber" class="code"></em>
                                                <Icon v-show="!countrySelectFlag" type="ios-arrow-down" />
                                                <Icon v-show="countrySelectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="10" mode="out-in"  name='fade'>
                                            <div v-show="countrySelectFlag" class="select_dropdown country_select_down">
                                                <ul class="select_down_list">
                                                    <li @click="chooseGlobalCountry(item.en,item.image,item.locale,item.code)" v-for="item in ossJSON" :value="item.label"  :label="item.label">
                                                        <div>
                                                            <img class="flag" :src="item.image"></img>
                                                            <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                    </div>
                                        <div style="color:#fff;font-size:14px;margin-top:10px;">{{$t('lawTips')}}</div>
                                </FormItem>
                                 <FormItem class="form_item" prop='userName'>
                                    <img  style="top:18px;" src="../../assets/images/register/yonghu.svg" alt="">
                                    <Input  type="text"   v-model="formValidate.userName"  :placeholder="this.$t('userName')"></Input>
                                    <div v-if="nameFlag" style="position:absolute;top:42px;color:#ed4014;right:0px;">{{$t('usernameused')}}</div>
                                </FormItem>
                                <FormItem class="form_item" prop='emailNumber'>
                                    <img  style="top:18px;" src="../../assets/images/register/email.svg" alt="">
                                    <Input  type="text"   v-model="formValidate.emailNumber"  :placeholder="$t('emailPlacehodler')"></Input>
                                </FormItem>
                              
                                <FormItem class="form_item" prop='password'>
                                    <img src="../../assets/images/register/password.svg" alt="">
                                    <Input type="password" v-model="formValidate.password" :placeholder="$t('passwordPlacehodler')"></Input>
                                </FormItem>
                                <FormItem class="form_item" prop='confrimPassword'>
                                    <img src="../../assets/images/register/password.svg" alt="">
                                    <Input type="password" v-model="formValidate.confrimPassword" :placeholder="$t('confirmPasswordPlacehodler')"></Input>
                                </FormItem>
                                <FormItem class="form_item" prop='referrId'>
                                    <img style="width:16px;height:20px;" src="../../assets/images/register/Referral_ID.svg" alt="">
                                    <Input type="text" :disabled='referrDisable' v-model="formValidate.referrId" :placeholder="$t('referridPlacehodler')"></Input>
                                </FormItem>
                                <FormItem prop="interest">
                                    <CheckboxGroup v-model="formValidate.interest">
                                        <Checkbox label='ddd'><span style="color:#51809F;" class="agree_tip">{{$t('regAgree')}} </span>
                                        <router-link target="_blank" class="termsurl" to="/legal/terms">{{$t('regTermsOfUse')}}</router-link>
                                            <span style="color:#51809F;padding:0 10px;">{{$t('registerAnd')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/legal/privacy">{{$t('隐私条款')}}</router-link>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                          </div>
                            <Button v-if="loaded"  :disabled='registerbtn' id="registerBtn"  @click="handleSubmit('formValidate')" type="primary">{{$t('regSignup')}}</Button>
                            <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                        </Form>
                        <div class="register_bottom">
                            <span><span style="color:#51809F;margin-right:5px;">{{$t('regAlreadyReg')}}</span> <router-link  to='./login'>{{$t('regLogin')}}</router-link></span>
                        </div>
                    </div>
                    </div>
                    <!-- regiser-container -->
                </div>
            </div>
            <div v-if="modal2" class="alert dis-n">
                <div class="title"><i class="iconfont">&#xe604;</i></div>
                <div class="notice" name="syNotice">
                {{$t('usNotice')}}
                </div>
                <button @click="del">I GOT IT</button>
                <div class="spacer_10"></div>
            </div>
            <div v-if="modal2" class="mask dis-n"></div>

        <Modaltips :modal='showModal' :text="text"></Modaltips>
       

        </div>


    </div>
</template>

<script>
import {countrylist} from '../login/country.js'
import {getUrlKey} from '@/lib/utils.js'
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {register,emailRegister,ossjson,ipQuery} from '../../../api/urls.js';
import {postBaseApi,getApi,getApiLoin} from '../../../api/axios.js';
import Modaltips from '@/components/Modal';
import {getBrowserMessage,splitDomain,getUrlKeyandEncode} from "@/lib/utils.js"
import {geeTest} from '../../../api/usersystem.js'
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
    export default {
        name:'register',
         metaInfo(){
            return{
                title: this.pageTitle, // set a title
                meta: [{                 // set meta
                    name: 'keywords',
                    content:this.pageKeyword
                },{
                    name:'description',
                    content:this.pageDescription
                }],
            }
        },
        data() {
            
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('numberMust')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };
            const validateEmail = (rule, value, callback) => {
                if (value === ''||value ==undefined) {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                  let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('emailMustExg')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };
            const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('smsRequired')))
                }else{
                    callback()
                }
            };
            const validateUsername = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('smsRequired')))
                }else{
                    let pattern = /^[A-Za-z0-9_]{4,30}$/
                    if(!pattern.test(value)){
                         callback(new Error(this.$t('usernameexg')))
                    }else{
                        callback()
                    }
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('passwordRequier')));
                } else{
                    let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('passwordReg')))
                    }else{
                        if(this.formValidate.confrimPassword!==''){
                        this.$refs.formValidate.validateField('confrimPassword')
                        }
                    }
                    callback()
                    
                } 
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('comfrimpassRequier')));
                } else if (value !== this.formValidate.password) {
                    callback(new Error(this.$t('passwordNotMach')))
                } else {
                    callback();
                }
            };
            const validateCheckbox = (rule,value,callback) =>{
                if(value == ''){
                    callback(new Error(this.$t("checkboxRequire")))
                }else{
                    callback()
                }
            }
            return {
                pageTitle:this.$t(this.$route.meta.title),
                pageKeyword : this.$t(this.$route.meta.keywords),
                pageDescription : this.$t(this.$route.meta.description),
                srcCode:'',//空投渠道ID
                countryLanguage:localStorage.getItem('countryLanguage'),
                model1: '',
                empty:true,
                token:'',
                modal2:false,
                loaded:true,
                nameFlag:false,
                robotModalflag:false,
                phoneMessage:{
                    itc:"",
                    phone:"",
                    codeType:"PHONE",
                    operateType:"REGISTER",
                    captchaValidateStr:''
                },
                formValidate:{
                    phoneNumber:'',
                    emailNumber:'',
                    smsCode:'',
                    password:'',
                    confrimPassword:'',
                    referrId:'',
                    interest:[],
                    userName:'',
                    
                },
             
                showModal:false,
                text:'',
                ruleValidate: {
                    phoneNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    emailNumber: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    userName:[{
                        validator: validateUsername, trigger: 'change'
                    }],
                    smsCode: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confrimPassword: [
                         { validator: validatePassCheck, trigger: 'blur' }
                    ],
                     interest: [
                        { required: true, validator:validateCheckbox, type: 'array', min: 1, trigger: 'change' },
                    ],
                    
                },
                referrDisable:false,
                cityList: [],
                selectFlag:false,
                countrySelectFlag:false,
                countryNumber:'',
                globalCountryNumber:"",
                phoneRegister:false,
                emailRegister:true,
                shows:2,
                captchaIns:'',
                emailParams:{},
                registerbtn:false,
                ossJSON:[],
                countryFlag:'',
                EmailcountryName:"",
                phoneCountryName:"",
                comonUseCountry:[],
                deviceObj:{},
                ipCountry:'',
                googleID:'',
                jiYanChallenge:'',
                FrencyCountry:[],
                usModal:false,
                timer:null,
                seconds:5,
                registerResult:false,
                machine:true,
                origin:''
            }



        },
        directives: {clickoutside},
        components:{
            sendBtn,
            Modaltips,
            'remote-json':{
                render(createElement){
                    return createElement('script',{attrs:{type:"text/javascript",src:this.src}})
                },
                props:{
                    src:{type:String,required:true}
                }
            }
        },
        methods:{
            handleSubmit (name) {
                this.srcCode = getUrlKey('src') //获取韩国空投的渠道ID
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.checkGeetest()
                    }
                })
            },
            checkGeetest(){
                    geeTest('4f8eb91de0e6a7940cb7b9f63f260aa7','1',(data)=>{
                             if(this.emailRegister){//邮箱注册
                                this.emailParams = {
                                    "domainCode":document.domain==='www.55com.io'?"china":'global',
                                    'country':this.EmailcountryName,
                                    "name":this.formValidate.userName,
                                    "email":this.formValidate.emailNumber,
                                    "personType": "GEETEST",
                                    "personCode":data,//人机校验码
                                    "geeCode":data,
                                    "password":this.setSha(this.formValidate.confrimPassword),
                                    "inviteFrom":this.formValidate.referrId,
                                    "deviceType":"WEB",
                                    "deviceCode": this.deviceObj.browserVersion,
                                    "deviceInfo":{
                                            "deviceModel":this.deviceObj.browserType,
                                            "resolution":this.deviceObj.windowWith,
                                    },
                                    "detail":{
                                            "activityCode":getUrlKey('src'),
                                             "originFrom":this.origin
                                    },
                                    
                                }
                                this.emailRegisterFun(this.emailParams);
                             }else{//手机注册
                                      let params = {
                                        "country": this.phoneCountryName,
                                        "name": this.formValidate.userName,
                                        "phone": this.formValidate.phoneNumber+'+'+this.countryNumber,
                                        "phoneCode": this.formValidate.smsCode,
                                        "personType": "GEETEST",
                                        "personCode": data,
                                        "geeCode": data,
                                        "password": this.setSha(this.formValidate.confrimPassword),
                                        "inviteFrom":this.formValidate.referrId,
                                        "deviceType": "WEB",
                                        "deviceCode": this.deviceObj.browserVersion,
                                        "deviceInfo":{
                                                "deviceModel":this.deviceObj.browserType,
                                                "resolution":this.deviceObj.windowWith,
                                        },
                                        "detail":{
                                                "activityCode":getUrlKey('src'),
                                                 "originFrom":this.origin
                                        },

                                        }  
                                        this.phoneRegisterFun(params)
                             }
                    })
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            getOSSjson(){
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    this.ossJSON = res.slice(4,res.length);
                    let FrencyCountry = [];
                    res.forEach(item => {
                        if(item.type=='recommend'){
                            FrencyCountry.push(item);
                        }
                    });
                    // this.countryNumber = FrencyCountry[0].code;
                    this.globalCountryNumber = FrencyCountry[4].en;
                    // this.phoneCountryName = FrencyCountry[0].locale;
                    this.EmailcountryName = FrencyCountry[4].locale;
                    this.countryFlag=FrencyCountry[4].image;
                    // this.FrencyCountry = FrencyCountry
                })

            },
            sendSMSfun(callback){//发送验证码
                if(this.shows==1){
                    this.phoneMessage = {
                        "businessType": "phone_register",
                        "phone": this.formValidate.phoneNumber+"+"+this.countryNumber,
                        "deviceType":'WEB'
                    }
                }
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
            },
            countryCode(){
                let name = this.countryNumber;
            },
            phoneRegisterFun(params){//手机注册方法
                postBaseApi(register,{},params).then((res) =>{
                    if(res.code){
                        if(res.code =='10047'){
                            this.modal2 = true;
                            return false;
                        }
                        this.loaded = true;
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                    }else if(res.result){
                        this.registerResult = res.result;
                        this.loaded = true;
                         this.$Notice.success({
                            title: this.$t('11001'),
                            desc:this.$t('11001')
                        });
                        if(this.origin==='otc'){// 从otc过来的注册
                             let domainurl = splitDomain(document.domain);
                             let protocol = document.location.protocol+'//'
                             let url = protocol+'otc.'+domainurl+'/#/login' //测试
                             window.location.href=url
                        }else{
                            this.$router.push({
                            path:'/login',
                            query:{
                                fromWhere:this.$route.query.fromWhere,
                                src:this.$route.query.src,
                            } 
                        })
                        }
                        
                    }
                }).catch((res)=>{
                    this.loaded = true;
                  
                })
            },
            emailRegisterFun(params){//邮箱注册
                postBaseApi(emailRegister,'',params).then((res) =>{
                    if(res.result){
                            this.loaded = true;
                            let emailAdderss= this.formValidate.emailNumber;
                            localStorage.setItem('emailAdderss',emailAdderss);
                             this.$router.push({
                                  path:'/verfifyEmail',
                                    query:{
                                        fromWhere:this.$route.query.fromWhere,
                                        src:this.$route.query.src,
                                    } 
                              })
                    }
                }).catch((res) =>{
                     this.loaded = true;
                })
            },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
                this.countrySelectFlag = false;
            },
            controCountrylSelect(){
                this.countrySelectFlag = !this.countrySelectFlag;
                this.selectFlag = false;
            },
            chooseCountry(code){
                this.selectFlag = false;
                this.countryNumber = code;
            },
            chooseGlobalCountry(name,img,locale,code){
                this.countrySelectFlag = false;
                this.globalCountryNumber = name;
                this.EmailcountryName = locale;
                this.phoneCountryName = locale;
                this.countryFlag=img;
                this.countryNumber=code;
            },
            cancelUS(){ // 取消
                this.usModal = false;
            },
            handleClose(e) {
                this.selectFlag = false;
                this.countrySelectFlag = false;
            },
            phoneTab(e){
                this.phoneRegister = true;
                this.emailRegister = false;
                this.shows = 1;
            },
            emailTab(e){
                 this.phoneRegister = false;
                this.emailRegister = true;
                this.shows =2;
            },
            del(){
                this.modal2 = false;
            },
        },
        computed:{
            phoneNumberChange(){
               return this.formValidate.phoneNumber;   
            },
           
            languageChange(){
                return  this.$store.state.app.countryLanguage;//返回全局state的状态值
            }
            
        },
        watch:{
            countryLanguage:function(curVal,oldVal){
            },
            ruleValidate:{
                handler(curVal,oldVal){
                },
                deep:true
            },
            phoneNumberChange(val,oldVal){
                if(!this.formValidate.phoneNumber==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                    this.formValidate.phoneNumber= this.formValidate.phoneNumber.replace(/[^\d]g/,'');
                }
            },
            languageChange(val,oldVal){
                this.$refs.formValidate.resetFields();
                 this.pageTitle = this.$t(this.$route.meta.title)
                this.pageKeyword = this.$t(this.$route.meta.keywords)
                this.pageDescription = this.$t(this.$route.meta.description)
            }
        },
        mounted(){
            this.countryCode();
            // this.formValidate.interest=['ddd'];
            let inviteCode =  getUrlKey('invite_code');
            this.formValidate.referrId = inviteCode;
            if(inviteCode){
                this.referrDisable = true;
            }
            this.getOSSjson();
           this.deviceObj = getBrowserMessage();
           this.formValidate.emailNumber= this.$route.query.email;
           this.origin = this.$route.query.originFrom?this.$route.query.originFrom:'global';
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
        }
        
        
    }
</script>

<style lang='less'>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-footer{
            border-top: none;
        }
    }
    .ivu-form{
            .ivu-input{
                width: 580px;
                height: 48px;
                padding-left: 53px;
                border-radius: 0px;
                font-size: 14px;
                background: #353948;
                color:#fff;
            }
            .phone_item{
                .ivu-form-item-content{
                    display: flex;
                    justify-content: flex-start;
                    .ivu-select-selected-value{
                        text-align: center;
                    }
                }
                .ivu-input{
                    width: 467px;
                    margin-left:5px;
                    padding-left:20px;
                }
            }
        }

        #registerHtml{
            .ivu-form{
                .ivu-input{
                    border:1px solid #293B47;
                    border-radius: 5px;
                    background: #13222B;
                }
                .ivu-form-item-error{
                    .ivu-input{
                        border: 1px solid #CF424E;
                    }
                } 
                .ivu-btn-primary[disabled]{
                    background-color: #233743 !important;
                    border: none;

                }
                .ivu-btn-primary{
                    background: #12869A;
                    border: none;
                    &:hover{
                         background: #04798c;
                       }
                }

            }
            .ivu-checkbox-inner{
                width:18px;
                height:18px;
                border-color: #51809F;
                background: #111E26;
            }
            .ivu-checkbox-checked{
                .ivu-checkbox-inner{
                        border-color: #12869A;
                        background-color: #12869A;

                }
            }
            .ivu-checkbox-inner:after{
                content: '';
                display: table;
                width: 8px;
                height: 12px;
                position: absolute;
                top: 0px;
                left: 4px;
                border: 2px solid #fff;
                border-top: 0;
                border-left: 0;
            } 
        }
</style>

<style scoped lang='less'>
    .ivu-checkbox+span, .ivu-checkbox-wrapper+span{
        margin-right:4px;
        margin-left:10px;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner:after{
        display: table;
        width: 8px;
        height: 12px;
        position: absolute;
        top: 0px;
        left: 4px;
        content: '';
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(1);
        -ms-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
        -webkit-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
    }
    .main_container{
        min-height: 100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
   
    .footerBox{
         flex: 0 0 auto;
     }
     .ivu-select-item{
         padding:7px 16px !important;
     }
     .termsurl{
         color:#12869A;
     }
     .inner_input{
         .ivu-btn{
            border-radius: 0px;
        }
        .ivu-form-item{
            margin-bottom: 24px !important;
        }
        .ivu-form-item-content{
            position: relative !important;
            img{
                z-index: 99;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            img.flag{
                position: static;
                width:20px;
                height: 14px;
                
            }
            .country{
                img{
                    width:20px;
                    height:14px;
                    margin-top:3px;
                }
            }
           
        
            
        }


        
        
     }
@media screen and (min-width:320px) and(max-width:970px){
     .inner_input{
         .ivu-select{
             .ivu-select-dropdown{
                   width: 101% !important;
                    left: 0px !important;;
             }
         }
}
}




    
</style>
<style scoped lang="less">
    @import './register.less';
</style>
<style lang='less'>
   @import './mediaRegister.less';
</style>
