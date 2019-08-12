<template>
    <div  id="bandphone" class="root">
        <div  class="wrapper">
            <div  class="register_wraper">
                   <div class="band-nav">
                        <router-link to='/safeCenter'>{{$t('tbdhAccountSecurity')}}  </router-link>><router-link to='/bandingPhone'> {{$t('aqzxBandPhone')}}</router-link>
                    </div>
                    <div class="tips">
                            {{$t('aqzxTips')}}
                    </div>
                  <div class="divider"></div>
                <div v-clickoutside="handleClose" class="inner_input">
                    <div class="register-container bandPhone">
                        <div  class="phone">
                            <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                                <div class="phone-item">
                                    <div class="bandphone-div">
                                        <span class="label-span">{{$t('phonenumber')}}</span>
                                            <FormItem class="form_item phone_item" prop='phoneNumber'>
                                            <div style="width:109px;" class="country_container">
                                                <div @click="controlSelect">
                                                    <input type="hidden">
                                                    <div>
                                                        <em v-html="countryNumber" class="code"></em>
                                                        <Icon v-show="!selectFlag" type="ios-arrow-down" />
                                                        <Icon v-show="selectFlag" type="ios-arrow-up" />
                                                    </div>
                                                </div>
                                                <transition :duration="1000" mode="out-in"  name='fade'>
                                                    <div v-show="selectFlag" class="select_dropdown">
                                                        <ul class="select_down_list">
                                                        <li @click="chooseCountry(item.label)" v-for="item in cityList" :value="item.label"  :label="item.label">
                                                            <span v-html="item.value"></span>
                                                            <span v-html="item.label"></span>
                                                        </li>
                                                        </ul>
                                                        </div>
                                                </transition>
                                                </div>
                                                <Input class=""  type="text"  :maxlength="30" v-model="formValidate.phoneNumber"  :placeholder="$t('phonePlacehodlerphone')"></Input>
                                            </FormItem>
                                    </div>
                                    <div class="bandphone-div">
                                            <span class="label-span">{{$t('smscode')}}</span>
                                        <div>
                                            <FormItem class="form_item smsCode" prop='smsCode'>
                                            <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                                            <sendBtn robotDiv='robotSendPhone'  @sendCick= 'sendSMSfun' :empty='empty' :ssoPhone='ssoPhone'></sendBtn>
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div class="bandphone-div" v-if="googleFlag">
                                            <span class="label-span">{{$t('aqzxGooglecode')}}</span>
                                            <FormItem class="form_item" prop='googleCode'>
                                                <Input :maxlength="6" type="text" v-model="formValidate.googleCode" :placeholder="$t('goolePlaceholder')"></Input>
                                            </FormItem>
                                    </div>
                                    

                                </div>
                                <Button v-if="loaded" class="pull-right"  @click="handleSubmit('formValidate')" type="primary">{{$t('zhmmResetSubmit')}}</Button>
                                <Button v-else disabled loading class="loginbtn pull-right"  @click="handleSubmit('formValidate')" type="primary"></Button>

                        </Form>
                    </div>
                    </div>
                </div>


            </div>
        <Modal :modal='showModal' :text="text"></Modal>


        </div>


    </div>
</template>

<script>
import {countrylist} from '../login/country.js'
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {codeVerify,register, transaction,binding,ssoCodeVerify} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,postHeaderSeveralTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import Cookies from 'js-cookie'
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
                  let pattern =  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
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
                } else if (value !== this.formValidate.googleCode) {
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
                loaded:true,
                phoneMessage:{
                    itc:"",
                    phone:"",
                    codeType:"PHONE",
                    operateType:"REGISTER",
                    captchaValidateStr:''
                },
                formValidate:{
                    emailName:'',
                    smsCode:'',
                    googleCode:'',
                    confrimPassword:'',
                    referrId:'',
                    interest:[],
                },
                ssoPhone:{
                    "operateType":"BIND_PHONE",
                    "codeType":"PHONE",
                    "itc":'',
                    "phone":''
                },
                showModal:false,
                text:'',
                ruleValidate: {
                    emailName: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    emailNumber: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    smsCode: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    googleCode: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                },
                referrDisable:false,
                cityList: [],
                selectFlag:false,
                countryNumber:'',
                phoneRegister:true,
                emailRegister:false,
                shows:1,
                phoneFlag:0,
                emailFlag:0,
                googleFlag:false,
                phone:''


            }



        },
          directives: {clickoutside},
        components:{
            sendBtn,
            Modal
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.ssoCodeVerify();
                    } else {
                    }
                })
            },
             dealCountry(){
                    let countryArr = []
                countrylist.map((v,i) => {
                    let country = v.split('-');
                    let name = country[0];
                    let code = country[2];
                    let countrylist = {
                        value:name,
                        label:code
                    }
                    countryArr.push(countrylist)
                    this.cityList = countryArr;
                })
            },
            countryCode(){
                let name = this.countryNumber;
            },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
            },
            chooseCountry(code){
                this.selectFlag = false;
                this.countryNumber = code;
            },
             handleClose(e) {
                this.selectFlag = false;
            },
            sendSMSfun(callback){
                let len = this.countryNumber.length;
                let itc = this.countryNumber.substring(1);
                let value = {
                        "operateType":"BIND_PHONE",
                         "codeType":"PHONE",
                        "itc":itc,
                        "phone":this.formValidate.phoneNumber
                }
                this.$store.commit('changebandPhoneObj',value)
                this.ssoPhone = {
                         "operateType":"BIND_PHONE",
                         "codeType":"PHONE",
                          "itc":itc,
                          "phone":this.formValidate.phoneNumber
                    }
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
            },
            ssoCodeVerify(){
                let  params = {
                    "operateType":"BIND_PHONE",
                    "codeType":"PHONE",
                    "phone":this.formValidate.phoneNumber,
                    "phoneCode":this.formValidate.smsCode,
                    "googleCode":this.formValidate.googleCode

                }
                postHeaderTokenBodyApi(ssoCodeVerify,Cookies.get('loginToken'),params).then((res) =>{
                    if(res.code){
                        this.loaded= true;
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                    }else{
                        this.token = res.token;
                        this.bindMetond()
                    }
                })


            },
            bindMetond(){
                 let len = this.countryNumber.length;
                let itc = this.countryNumber.substring(1);
                let ssoToken = Cookies.get('loginToken');
                let params = {
                    "phone":this.formValidate.phoneNumber,
                    "phoneCode":this.formValidate.smsCode,
                    "googleCode":this.formValidate.googleCode,
                    "operateType":"BIND_PHONE",
                    "bindType":"PHONE",
                    "itc":itc,
                }
                    postHeaderSeveralTokenBodyApi(binding,ssoToken,this.token,params).then((res)=>{
                        if(res.result==true){
                            this.$router.push('/safeCenter')
                        }else{
                             this.loaded= true;
                             this.showModal = !this.showModal;
                             this.text = this.$t(res.code);
                        }
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
             phoneNumberChange(){
               return this.formValidate.phoneNumber;   
            },
            
        },
        watch:{
            ruleValidate:{
                handler(curVal,oldVal){
                },
                deep:true
            },
            languageChange(val,oldVal){
                this.$refs.formValidate.resetFields();
            },
            phoneNumberChange(val,oldVal){
                if(!this.formValidate.phoneNumber==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                    this.formValidate.phoneNumber= this.formValidate.phoneNumber.replace(/[^\d]g/,'');
                }
            },
        },
        mounted(){
            this.phoneFlag = this.$route.query.phoneFlag;
           //this.emailDisable()
           if(localStorage.getItem('google')=='true'){//  获取的是字符串类型的true和false
               this.googleFlag = true
           }else{
               this.googleFlag = false;
           }
            this.dealCountry();
            this.countryCode();
            this.countryNumber = '+1';
           


        },
        created(){
            this.interFunc()
        }
        
        
    }
</script>
<style lang='less'>
#bandphone{
    .inner_input{
        .bandPhone{
            .ivu-input-wrapper{
                width: auto;
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
<style scoped lang="less">
    @import './bandPhone.less';
</style>

