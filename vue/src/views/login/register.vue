<template>
    <div  id="registerHtml" class="root">
        <div  class="wrapper">
            <div  class="register_wraper">
                <!-- <div class="title">{{$t('regPhone')}}</div> -->
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
                                    <div style="color:#12869A;">Select your current state of legal residence:</div>
                                    <div class="country_container country">
                                        <div @click="controCountrylSelect">
                                            <input type="hidden">
                                            <div>
                                                <img class="uniteState" :src="countryFlag" alt="">
                                                <em v-html="globalCountryNumber" class="code"></em>
                                                <Icon v-show="!countrySelectFlag" type="ios-arrow-down" />
                                                <Icon v-show="countrySelectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="500" mode="out-in"  name='fade'>
                                            <div v-show="countrySelectFlag" class="select_dropdown country_select_down">
                                                <ul class="select_down_list">
                                                    <li @click="chooseGlobalCountry(item.en,item.image)" v-for="item in ossJSON" :value="item.label"  :label="item.label">
                                                        <div>
                                                            <img class="flag" :src="item.image"></img>
                                                            <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                   
                                    </div>
                                    <div style="font-size:12px;line-height:15px;color:#51809f;margin-top:15px;text-align:justify;">
                                        Currently, 55 Global Markets does not serve residents of the following jurisdiction: Alabama, Arizona, Connecticut, Georgia, Hawaii, Idaho, Louisiana, New York, North Carolina, Vermont, Washington, District of Columbia, American Samoa, Guam, Northern Mariana Islands, Puerto Rico, Virgin Islands, U.S., United States Minor Outlying Islands, Armed Forces Americas, Armed Forces Europe, Armed Forces Pacific. 
                                        We are working hard to be able to do so in the near future. Please check back in the near future for updates.
                                    </div>
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
                                        <transition :duration="500" mode="out-in"  name='fade'>
                                            <div v-show="selectFlag" class="select_dropdown">
                                                <ul class="select_down_list">
                                                <li @click="chooseCountry(item.code)" v-for="item in ossCountryJSON" :value="item.label"  :label="item.label">
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
                                        <router-link class="termsurl" to="/terms">{{$t('regTermsOfUse')}}</router-link>
                                            <!-- <a class="agreeAble" target="_blank" :href="agreeAbleUrl">{{$t('regTermsOfUse')}}</a> -->
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </div>
                            <div v-if="emailRegister" class="email">
                                <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                                 <div id="captcha"></div>
                                  <FormItem class="form_item">
                                    <div style="color:#12869A;">Select your current state of legal residence:</div>
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
                                        <transition :duration="500" mode="out-in"  name='fade'>
                                            <div v-show="countrySelectFlag" class="select_dropdown country_select_down">
                                                <ul class="select_down_list">
                                                    <li @click="chooseGlobalCountry(item.en,item.image)" v-for="item in ossJSON" :value="item.label"  :label="item.label">
                                                        <div>
                                                            <img class="flag" :src="item.image"></img>
                                                            <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                    </div>
                                    <div style="font-size:12px;line-height:15px;color:#51809f;margin-top:15px;text-align:justify;">
                                        Currently, 55 Global Markets does not serve residents of the following jurisdiction: Alabama, Arizona, Connecticut, Georgia, Hawaii, Idaho, Louisiana, New York, North Carolina, Vermont, Washington, District of Columbia, American Samoa, Guam, Northern Mariana Islands, Puerto Rico, Virgin Islands, U.S., United States Minor Outlying Islands, Armed Forces Americas, Armed Forces Europe, Armed Forces Pacific. 
                                        We are working hard to be able to do so in the near future. Please check back in the near future for updates.
                                    </div>
                                </FormItem>
                                <FormItem class="form_item" prop='emailNumber'>
                                    <img  style="top:13px;" src="../../assets/images/register/email.svg" alt="">
                                    <Input  type="text"   v-model="formValidate.emailNumber"  :placeholder="$t('emailPlacehodler')"></Input>
                                </FormItem>
                                <!-- <FormItem class="form_item smsCode" prop='smsCode'>
                                    <img src="../../assets/images/register/code.svg" alt="">
                                    <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                                    <sendBtn   @sendCick= 'sendSMSfun' :empty='empty' :emailMessage='emailMessage'></sendBtn>
                                </FormItem> -->
                                <FormItem style="margin-top:30px" class="form_item passwrod-item" prop='password'>
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
                                        <router-link class="termsurl" to="/terms">{{$t('regTermsOfUse')}}</router-link>
                                        <!-- <a class="agreeAble" target="_blank" :href="agreeAbleUrl">{{$t('regTermsOfUse')}}</a> -->
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                          </div>


                            <Button v-if="loaded"  :disabled='registerbtn'  @click="handleSubmit('formValidate')" type="primary">{{$t('regSignup')}}</Button>
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
            <!-- <div v-if="modal2" class="alert dis-n">
                <div class="title"><i class="iconfont">&#xe604;</i></div>
                <div class="notice" name="syNotice">
                {{$t('usNotice')}}
                </div>
                <button @click="del">I GOT IT</button>
                <div class="spacer_10"></div>
            </div>
            <div v-if="modal2" class="mask dis-n"></div> -->

        <Modal :modal='showModal' :text="text"></Modal>
       

        </div>


    </div>
</template>

<script>
import {countrylist} from '../login/country.js'
//import {ssojson} from '55-country.json'
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {codeVerify,register,emailRegister,ossjson} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
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
                countryLanguage:localStorage.getItem('countryLanguage'),
                model1: '',
                empty:true,
                token:'',
                //modal2:false,
                loaded:true,
                //agreeAbleUrl:'',
               // agreeAbleUrlEn:'https://55support.zendesk.com/hc/en-us/articles/360004716273-Terms-of-User',
                //agreeAbleUrlCH:'https://55support.zendesk.com/hc/zh-cn/articles/360004716273-Terms-of-User',
                phoneMessage:{
                    itc:"",
                    phone:"",
                    codeType:"PHONE",
                    operateType:"REGISTER",
                    captchaValidateStr:''
                },
                formValidate:{
                    phoneNumber:'',
                    smsCode:'',
                    password:'',
                    confrimPassword:'',
                    referrId:'',
                    interest:[],
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
                ossCountryJSON:[],
                countryFlag:'https://oss.55.com/content/state/image/AK.png'
                



            }



        },
        directives: {clickoutside},
        components:{
            sendBtn,
            Modal,
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        if(this.emailRegister){//如果是邮箱注册
                            this.captchaIns && this.captchaIns.popUp()
                        }else{//如果是手机注册
                            this.loaded = false;
                             this.codeVerifyFun();
                        }
                    } else {//验证不通过


                    }
                })
            },
            getOSSStateJson(){
                getApi('https://oss.55.com/content/state/55-state.json',{}).then((res)=>{
                    this.ossJSON = res;
                })
            },
            getOssCountryJson(){
                getApi('https://oss.55.com/content/country/55-country.json',{}).then((res)=>{
                    this.ossCountryJSON = res;
                })
            },



            // dealCountry(){
            //         let countryArr = []
            //     countrylist.map((v,i) => {
            //         let country = v.split('-');
            //         let name = country[0];
            //         let code = country[2];
            //         let countrylist = {
            //             value:name,
            //             label:code
            //         }
            //         countryArr.push(countrylist)
            //         this.cityList = countryArr;
            //     })
            // },
            sendSMSfun(callback){
                let len = this.countryNumber.length;
                let itc = this.countryNumber.substring(1);
                if(this.shows==1){
                    this.phoneMessage = {
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
                            // let aa = document.getElementsByName('NECaptchaValidate')[0];
                            // let bb = document.getElementsByName('NECaptchaValidate')
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                            _that.emailParams = {
                                    "email":_that.formValidate.emailNumber,
                                    "password":_that.formValidate.confrimPassword,
                                    "inviteCode":_that.formValidate.referrId,
                                    "fromSite":"B",
                                    "language":localStorage.getItem('countryLanguage'),
                                    "captchaValidateStr":value,
                                    "country":'US',
                                    "area":_that.globalCountryNumber

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



            phoneRegisterFun(){//手机注册方法
                let len = this.countryNumber.length;
                let itc = this.countryNumber.substring(1);
                let params;
                if(this.phoneRegister){
                        params = {
                        "codeType":"PHONE",
                        "itc":itc,
                        "phone":this.formValidate.phoneNumber,
                        "password":this.formValidate.confrimPassword,
                        "inviteCode":this.formValidate.referrId,
                        "fromSite":"B",
                         "country":'US',
                         "area":this.globalCountryNumber,
                        }  
                }else{
                     params = this.emailParams;
                }
              
                postHeaderTokenBodyApi(register,this.token,params).then((res) =>{
                    if(res.code){
                        this.loaded = true;
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
                        this.initRobot()//注册失败后是实利化人机验证
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
            getUrlParams(name){
                    let after = window.location.hash.split("?")[1];
                    if(after)
                    {
                        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                        var r = after.match(reg);
                        if(r != null) {
                            return  decodeURIComponent(r[2]);
                        }
                        else  {
                            return '';
                        }

                    }

            },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
            },
            controCountrylSelect(){
                this.countrySelectFlag = !this.countrySelectFlag;
            },
            chooseCountry(code){
                this.selectFlag = false;
                this.countryNumber = code;
            },
            chooseGlobalCountry(name,img){
                this.countrySelectFlag = false;
                this.globalCountryNumber = name;
                this.countryFlag=img;
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
            // del(){
            //     this.modal2 = false;
            // },


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
          
            // emailNumberChange(val,oldVal){
            //     if(!this.formValidate.emailNumber==''){
            //         this.empty = false;
            //     }else{
            //         this.empty = true;
            //     }
            // },
            languageChange(val,oldVal){
                this.$refs.formValidate.resetFields();
                //this.userTerms()
            }
        },
        mounted(){
            this.initRobot()
            //this.dealCountry();
            this.countryCode();
            this.countryNumber = '+1';
            this.globalCountryNumber='California'
           // this.formValidate.interest=['ddd'];
            let inviteCode =  this.getUrlParams('code');
            this.formValidate.referrId = inviteCode;
            if(inviteCode){
                this.referrDisable = true;
            }
            this.getOSSStateJson();
            this.getOssCountryJson();

        }
        
        
    }
</script>

<style lang='less'>
    .ivu-form{
              .ivu-input{
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
                    width: 400px;
                    height: 38px;
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
                }
                .smsCode{
                      .ivu-input-type{
                           width: 280px;
                           .ivu-input{
                               width: 280px !important;
                           }
                       }
                        .sendMs{
                               width: 100px;
                               height: 38px;
                               border-radius: 3px;
                           }
                }
                .phone_item{
                    .ivu-input-type{
                        width: 290px;
                        .ivu-input{
                            width: 100%;
                            margin-left:20px;
                        }
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
    //  #app{
    //      height: 100%;
    //  }
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
                top: 8px;
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
                    position: static;
                    margin-top:-3px;
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
