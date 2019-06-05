<template>
    <div  id="registerHtml" class="root">
        <div  class="wrapper">
            <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    title="验证"
                    :mask-closable="false"
                   >
                    <div id="robot"></div>
                    <p slot="footer"></p>
                </Modal>
            <div  class="register_wraper">
                <div v-clickoutside="handleClose" class="inner_input">
                    <div class="register-title">
                        <ul>    
                            <li @click="emailTab" :class="{register_on:shows==2}">{{$t('signupEmail')}}</li>
                            <li @click="phoneTab" :class="{register_on:shows==1}">{{$t('signupPhone')}}</li>
                        </ul>
                    </div>
                    <div class="register-container">
                        <div  class="phone">
                            <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                            <div v-if="phoneRegister">
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
                                    <sendBtn   @sendCick= 'sendSMSfun' :empty='empty' :phoneMessage='phoneMessage'></sendBtn>
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
                                    <Input :disabled='referrDisable' v-model="formValidate.referrId" :placeholder="$t('referridPlacehodler')"></Input>
                                </FormItem>
                                <FormItem prop="interest">
                                    <CheckboxGroup v-model="formValidate.interest">
                                        <Checkbox label='ddd'><span style="color:#51809F;" class="agree_tip">{{$t('regAgree')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/terms">{{$t('regTermsOfUse')}}</router-link>
                                           <span style="color:#51809F;padding:0 10px;">{{$t('registerAnd')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/privacy">{{$t('隐私条款')}}</router-link>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </div>
                            <div v-if="emailRegister" class="email">
                                <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                                 <div id="captcha"></div>
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
                                <!-- <FormItem class="form_item smsCode" prop='smsCode'>
                                    <img src="../../assets/images/register/code.svg" alt="">
                                    <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                                    <sendBtn   @sendCick= 'sendSMSfun' :empty='empty' :emailMessage='emailMessage'></sendBtn>
                                </FormItem> -->
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
                                    <Input  :disabled='referrDisable' v-model="formValidate.referrId" :placeholder="$t('referridPlacehodler')"></Input>
                                </FormItem>
                                <FormItem prop="interest">
                                    <CheckboxGroup v-model="formValidate.interest">
                                        <Checkbox label='ddd'><span style="color:#51809F;" class="agree_tip">{{$t('regAgree')}} </span>
                                        <router-link target="_blank" class="termsurl" to="/terms">{{$t('regTermsOfUse')}}</router-link>
                                            <span style="color:#51809F;padding:0 10px;">{{$t('registerAnd')}}</span>
                                        <router-link target="_blank" class="termsurl" to="/privacy">{{$t('隐私条款')}}</router-link>
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
import {codeVerify,register,emailRegister,ossjson,userNameUnique,ipQuery} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
import Modaltips from '@/components/Modal';
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
                    let pattern = /^[A-Za-z0-9_]{4,20}$/
                    if(!pattern.test(value)){
                         callback(new Error(this.$t('usernameexg')))
                    }else{
                        callback()
                         getApi(userNameUnique+value,'').then((res)=>{
                            if(res.result){//true,可以设置
                                this.nameFlag = false;
                            }else{//名字重复
                                this.nameFlag = true;
                            }
                        })
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
                        validator: validateUsername, trigger: 'blur'
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
                ipCountry:'',
                googleID:'',
                



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
                //注册按钮埋点统计
                // window._czc.push(["_trackEvent",'注册按钮','注册新用户','统计55全球市场注册','5','registerBtn']);
                this.srcCode = getUrlKey('src') //获取韩国空投的渠道ID
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.emailRegister){//如果是邮箱注册
                            //  this.captchaIns && this.captchaIns.popUp()
                            if(this.ipCountry=='中国'){
                                this.captchaIns && this.captchaIns.popUp()
                            }else{
                                    this.robotModalflag = true;
                                }

                        }else{//如果是手机注册
                            this.loaded = false;
                             this.codeVerifyFun();
                        }
                    } else {//验证不通过


                    }
                })
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
            },
          getOSSjson(){
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    this.ossJSON = res;
                    let FrencyCountry = [];
                    res.forEach(item => {
                        if(item.type=='recommend'){
                            FrencyCountry.push(item);
                        }
                    });
                    // console.log(FrencyCountry)
                    //把默认值写在then里面就避免了异步问题，解决了在mounted里面直接写的问题
                    this.countryNumber = FrencyCountry[4].code;
                    this.globalCountryNumber = FrencyCountry[4].en;
                    this.phoneCountryName = FrencyCountry[4].locale;
                    this.EmailcountryName = FrencyCountry[4].locale;
                    this.countryFlag=FrencyCountry[4].image;

                })

            },
            sendSMSfun(callback){
                let itc = this.countryNumber;
                if(this.shows==1){
                    this.phoneMessage = {//手机注册发送验证
                        itc:itc,
                        phone:this.formValidate.phoneNumber,
                        codeType:"PHONE",
                        operateType:"REGISTER",
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
            codeVerifyFun(){
                let params;
                if(this.phoneRegister){
                       params = {
                        "phone":this.formValidate.phoneNumber,
                        "phoneCode":this.formValidate.smsCode,
                        "codeType":"PHONE",
                        "operateType":"REGISTER"
                     }
                }
                postBaseApi(codeVerify,{},params).then((res) =>{
                    if(res.code){
                        this.loaded = true
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                    }else{
                        this.token = res.token;
                        this.phoneRegisterFun();
                    }
                })



            },
             ipQueryFun(){//ip所在国家查询
                getApi(ipQuery,'').then((res)=>{
                    if(res.resultcode==200){
                        this.ipCountry = res.result.Country;
                        if(this.ipCountry=='中国'){
                             
                         }else{//只有非中国的时候才实例化谷歌都方法
                                this.onloadCallback();
                         }
                    }else{
                        this.onloadCallback();//当ip获取失败都时候默认是谷歌验证
                        this.ipCountry = '';//查询失败
                    }
                })
            },
             initRobot(){
                let _that = this;
                let captchaIns;
                if (captchaIns) {
                    captchaIns.destroy()
                }
                let lan = this.$store.state.app.countryLanguage;
                if(lan==='zh-CN'){
                        lan = 'zh-CN'
                }else{
                    lan = 'en'
                }
             
                initNECaptcha({
                    element: '#captcha',
                    captchaId: 'a3cd39c172284133a3470b7ec05a2bb0',
                    mode: 'popup',
                    width: '320px',
                    lang:lan,
                    onReady: function (instance) {
                        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    },
                    onVerify: function (err, data) {
                        if(err){
                        //
                        }
                        if(data){
                            _that.loaded=false;
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                            _that.emailParams = {//邮箱注册
                                    "personCode":value,//人机校验码
                                    "personCodeType":'wangyi',
                                    "profileEmail":_that.formValidate.emailNumber,
                                    "uniqueName":_that.formValidate.userName,
                                    "inviteCode":_that.formValidate.referrId,
                                    "password":_that.setSha(_that.formValidate.confrimPassword),
                                    'country':_that.EmailcountryName,
                                    "site":"B",
                                    "activityCode":getUrlKey('src'),
                                     "userClientInfo":{
                                        "deviceModel":"MI 2S",
                                        "deviceId": "xxxsllsj",
                                        "resolution":"1920*1080",
                                        "os":"Android",
                                        "netType":"4G",
                                        "operator":"China Mobile"
                                        }
                            }
                            _that.emailRegisterFun();
                        }
                    }
                }, function (instance) {
                    // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
                    _that.captchaIns = instance;
                }, function onerror(err) {
                    _that.captchaIns = ''
                    //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                })//初始化函数结尾

                return captchaIns;
            },
            onloadCallback(){
                let _that = this;
                // console.log("grecaptcha is ready!");
                let widgetId=grecaptcha.render('robot', {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        // console.log(data)
                        if(data.length!==0){
                             _that.loaded=false;
                            _that.emailParams = {//邮箱注册
                                    "personCode":data,//人机校验码
                                    "personCodeType":'google',
                                    "profileEmail":_that.formValidate.emailNumber,
                                    "uniqueName":_that.formValidate.userName,
                                    "inviteCode":_that.formValidate.referrId,
                                    "password":_that.setSha(_that.formValidate.confrimPassword),
                                    'country':_that.EmailcountryName,
                                    "site":"B",
                                    "activityCode":getUrlKey('src'),
                                     "userClientInfo":{
                                        "deviceModel":"MI 2S",
                                        "deviceId": "xxxsllsj",
                                        "resolution":"1920*1080",
                                        "os":"Android",
                                        "netType":"4G",
                                        "operator":"China Mobile"
                                        }
                            }
                            _that.emailRegisterFun();
                            setTimeout(()=>{
                                _that.robotModalflag= false;
                            },2000)
                        //  console.log('Verified: not robot');
                        }
                    },
                    "expired-callback":function(){//验证失效回调函数
                        console.log('expired-callback')
                    },
                    "error-callback":function(){//因为网络等问题无法验证，通过回调函数提醒用户重试
                        console.log('error-callback')
                    },

                    });
                    _that.googleID = widgetId;
                    return widgetId;

            },


            phoneRegisterFun(){//手机注册方法
                let itc = this.countryNumber;
                let params;
                if(this.phoneRegister){
                        params = {
                        "profileItc": itc,
                        "profilePhone": this.formValidate.phoneNumber,
                        "uniqueName":this.formValidate.userName,
                        "inviteCode": this.formValidate.referrId,
                        "password": this.setSha(this.formValidate.confrimPassword),
                        "country": this.phoneCountryName,
                        "site": "B",
                        "activityCode":getUrlKey('src'),
                         "userClientInfo":{
                                        "deviceModel":"MI 2S",
                                        "deviceId": "xxxsllsj",
                                        "resolution":"1920*1080",
                                        "os":"Android",
                                        "netType":"4G",
                                        "operator":"China Mobile"
                                        }
                        
                        }  
                }else{
                     params = this.emailParams;
                }
              
                postHeaderTokenBodyApi(register,this.token,params).then((res) =>{
                    if(res.code){
                        this.loaded = true;
                        if(res.code =='10047'){
                            this.modal2 = true;
                            return false;
                        }
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);

                    }else{
                        this.loaded = true;
                           let loginToken = res.token;
                            this.showModal = true;
                             this.text = this.$t(11000);// 成功提示框
                              this.$router.push('/login')
                       
                    }
                }).catch((res)=>{
                    this.loaded = true;
                })
            },
            emailRegisterFun(){//邮箱注册
                let params;
                params = this.emailParams;
                postBaseApi(emailRegister,'',params).then((res) =>{
                    if(res.code){
                        this.loaded = true;
                        if(this.ipCountry=='中国'){
                            this.initRobot()//注册失败后是实利化人机验证
                        }else{
                            grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                        }
                        if(res.code=='10044'){//改用户未激活
                             setTimeout(() => {
                                this.$router.push('/verfifyEmail')
                             }, 3000);
                        }else if(res.code=='10045'){//改用户已激活
                            setTimeout(() => {
                                this.$router.push('/login')
                             }, 3000);
                        }else if(res.code=='10002'){//已经注册成功，可以登录
                                setTimeout(() => {
                                this.$router.push('/login')
                             }, 3000);
                        }else if(res.code =="10047"){
                            this.modal2 = true;
                            return false;
                        }
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                    }else{
                            this.loaded = true;
                            this.initRobot()//注册成功后是实利化人机验证
                            let emailAdderss= this.formValidate.emailNumber;
                            localStorage.setItem('emailAdderss',emailAdderss);
                            let loginToken = res.token;
                            this.$router.push('/verfifyEmail')
                       
                    }
                }).catch((res) =>{
                     this.loaded = true;
                     this.initRobot()//注册成功后是实利化人机验证
                })
            },
            // userTerms(){
            //     let lang = this.$store.state.app.countryLanguage;
            //     if(lang=='en'){
            //         this.agreeAbleUrl = this.agreeAbleUrlEn;
            //     }else{
            //         this.agreeAbleUrl = this.agreeAbleUrlCH;
            //     }
            // },
            // getUrlParams(name){
            //         let after = window.location.hash.split("?")[1];
            //         if(after)
            //         {
            //             let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            //             var r = after.match(reg);
            //             if(r != null) {
            //                 return  decodeURIComponent(r[2]);
            //             }
            //             else  {
            //                 return '';
            //             }

            //         }

            // },
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
            judgePCorMoble(){
                let u = navigator.userAgent;
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {// 移动端
                    if(getUrlKey('invite_code')){
                        window.location.href='http://47.75.120.27:8030/mobile/#/emailRegister?invite_code='+getUrlKey('invite_code');
                    }else{
                        window.location.href='http://47.75.120.27:8030/mobile/#/emailRegister';
                    }
                } else {

                }
            }


        },
        computed:{
            phoneNumberChange(){
               return this.formValidate.phoneNumber;   
            },
            // emailNumberChange(){
            //     return this.formValidate.emailNumber;
            // },
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
                //this.userTerms()
            }
        },
        mounted(){
            this.initRobot()
            this.countryCode();
            this.ipQueryFun()
            // this.formValidate.interest=['ddd'];
            let inviteCode = getUrlKey('invite_code');
            this.formValidate.referrId = inviteCode;
            if(inviteCode){
                this.referrDisable = true;
            }
            this.getOSSjson();
            this.formValidate.emailNumber = this.$route.query.email;
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
               // border:solid 1px #BDC4E1;
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
                border-color: #51809F;
                background: #111E26;
            }
            .ivu-checkbox-checked{
                .ivu-checkbox-inner{
                        border-color: #12869A;
                        background-color: #12869A;
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

   // @import './mediaRegister.less';
</style>
