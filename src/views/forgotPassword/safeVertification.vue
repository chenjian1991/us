<template>
    <div  id="forgotpassword" class="root">
        <div  class="wrapper">
            <div  class="register_wraper">
                <div class="title">
                     <h2>{{$t('zhmmSecurity')}}</h2>
                    <p>{{$t('zhmmSecurityExplain')}}</p>
                </div>
                <div  class="inner_input inner_input_login">
                    <Form v-if="phoneFlage" ref="formValidateDisable" :model='formValidateDisable' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                            <Input :disabled="true"  type="text"  :maxlength="30" v-model="formValidateDisable.phoneNumber"  :placeholder="$t('phonePlacehodler')"></Input>
                        </FormItem>
                    </Form>
                    <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <!-- 手机 -->
                        <FormItem v-if="phoneFlage" class="form_item smsCode" prop='smsCode'>
                            <img src="../../assets/images/register/code.svg" alt="">
                            <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                            <sendBtn  robotDiv='robotDiv'  @sendCick= 'sendSMSfun' :empty='empty' :ForgotPhonePassworMessage='ForgotPhonePassworMessage'></sendBtn>
                        </FormItem>
                        <!-- 邮箱 -->
                         <FormItem v-if="emailFlage" class="form_item" prop='EmailName'>
                            <img style="top:18px;" src="../../assets/images/register/email.svg" alt="">
                            <Input :disabled="true"  type="text"  :maxlength="30" v-model="formValidate.EmailName"  :placeholder="$t('phonePlacehodler')"></Input>
                        </FormItem>
                          <FormItem v-if="emailFlage" class="form_item smsCode" prop='EmailCode'>
                            <img src="../../assets/images/register/code.svg" alt="">
                            <Input :maxlength="6" v-model="formValidate.EmailCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                            <sendBtn robotDiv='robotsecondDiv'   @sendCick= 'sendSMSfun' :empty='empty' :ForgotEmailPassworMessage='ForgotEmailPassworMessage'></sendBtn>
                        </FormItem>
                        <!--  google-->
                        <FormItem v-if="isBingGoogle" class="form_item" prop='googleCode'>
                            <img src="../../assets/images/register/password.svg" alt="">
                            <Input type="text" :maxlength="6" v-model="formValidate.googleCode" :placeholder="$t('googleCodenum')"></Input>
                        </FormItem>
                        <Button v-if="loaded"  @click="handleSubmit('formValidate')" type="primary">{{$t('zhmmResetSubmit')}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>

                    </Form>
                    






                </div>


            </div>
        <Modal :modal='showModal' :text="text"></Modal>


        </div>


    </div>
</template>

<script>
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import {codeVerify,restPasswordVerify} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import Cookies from 'js-cookie'

    export default {
        name:'safevertification',
        data() {
            
             const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('googleMust')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };
            return {
                model1: '',
                empty:true,
                isBingGoogle:false,
                emailFlage :false,
                phoneFlage :false,
                loaded:true,
                ForgotPhonePassworMessage:{
                    "ex55Pin":'',
                    "codeType":"PHONE",
                    "operateType":"RESET_PASSWORD",
                    "phone":''
                },
                ForgotEmailPassworMessage:{
                    "ex55Pin":'',
                    "codeType":"PHONE",
                    "operateType":"RESET_PASSWORD",
                    "language":localStorage.getItem('countryLanguage'),
                    "email":'',

                },
                formValidateDisable:{
                    phoneNumber:'',
                },
                formValidate:{
                    phoneNumber:'',
                    smsCode:'',
                    googleCode:'',
                },
                showModal:false,
                text:'',
                ruleValidate: {
                    smsCode: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    googleCode: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    EmailCode:[
                        { validator: validatePhone, trigger: 'blur' }
                    ]
                },


            }



        },
        components:{
            sendBtn,
            Modal
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.codeVerify();
                    } else {
                    }
                })
            },
            sendSMSfun(callback){
                    // let PhoneNumber = localStorage.getItem('userNumer');
                    // if(PhoneNumber.indexOf('@')!==-1){//邮箱登录
                    //         this.ForgotEmailPassworMessage = {
                    //                 "ex55Pin":localStorage.getItem('ex55pin'),
                    //                 "codeType":"EMAIL",
                    //                 "operateType":"RESET_PASSWORD",
                    //                 "email":localStorage.getItem('userNumer')
                    //         }
                    //      }else{
                    //         this.ForgotPhonePassworMessage = {
                    //                 "ex55Pin":localStorage.getItem('ex55pin'),
                    //                 "codeType":"PHONE",
                    //                 "operateType":"RESET_PASSWORD",
                    //                 "phone":localStorage.getItem('userNumer')
                    //             }
                    // }
                    this.ForgotEmailPassworMessage = {//发送邮箱验证码参数
                        "ex55Pin":localStorage.getItem('ex55pin'),
                        "codeType":"EMAIL",
                        "operateType":"RESET_PASSWORD",
                        "email":localStorage.getItem('userNumer'),
                         "language":localStorage.getItem('countryLanguage')
                    }
                    this.ForgotPhonePassworMessage = {//发送手机验证码参数
                        "ex55Pin":localStorage.getItem('ex55pin'),
                        "codeType":"PHONE",
                        "operateType":"RESET_PASSWORD",
                        "phone":localStorage.getItem('userNumer')
                    }

                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }

            },
            codeVerify(){
                let bodyParam  = {
                    "ex55Pin":localStorage.getItem('ex55pin'),
                    "phone":this.formValidateDisable.phoneNumber,
                    "phoneCode":this.formValidate.smsCode,
                    "email":this.formValidate.EmailName,
                    "emailCode":this.formValidate.EmailCode,
                    "googleCode":this.formValidate.googleCode
                }
                postBaseApi(restPasswordVerify,{},bodyParam).then((res) =>{
                    if(res.code){
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        this.loaded = true;
                    }else{
                        localStorage.setItem('codeVerifyToken',res.token)
                        this.$router.push('/resetNewpass');
                    }

                }).catch((error)=>{
                        this.loaded = true;
                })
            },

        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//返回全局state的状态值
            }
            
        },
        watch:{
            languageChange(val,oldVal){
                this.$refs.formValidate.resetFields();
            }
        },
        mounted(){
            this.empty = false;//按钮高亮
            this.formValidateDisable.phoneNumber=localStorage.getItem('phoneNumber')
            this.isBingGoogle=localStorage.getItem('googleFlag') === 'false' ? false : true;//将获取到的‘false’字符串转换成false bollen类型
            let emailName = localStorage.getItem('emailFlag');
            let phoneNumber = localStorage.getItem('phoneNumber');
            if(phoneNumber=='null'||phoneNumber==null){
                this.phoneFlage = false;
            }else{
                this.phoneFlage = true;
            }
            if(emailName=='null'||emailName==null){
                    this.emailFlage = false;
            }else{
                this.emailFlage = true;
                this.formValidate.EmailName =localStorage.getItem('emailFlag');
            }

        

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
     #forgotpassword{
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
     }
     .inner_input{
        .ivu-form-item{
            margin-bottom: 24px !important;
        }
         .ivu-input{
             width: 580px;
            height: 48px;
            padding-left: 53px;
            border:solid 1px #BDC4E1;
            font-size: 14px;
        }
        .ivu-form-item-content{
            position: relative !important;
            img{
                z-index: 99;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            
        }
        
        
     }





    
</style>
<style scoped lang="less">
    @import './safeVertification.less';
</style>

