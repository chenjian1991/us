<template>
    <div  id="forgotpassword" class="root">
        <div  class="wrapper">
            <div  class="register_wraper">
                <div class="title">
                     <h2>{{$t('zhmmSecurity')}}</h2>
                    <p>{{$t('zhmmSecurityExplain')}}</p>
                </div>
                <div  class="inner_input inner_input_login">
                    <Form onsubmit="return false;" v-if="phone" ref="formValidateDisable" :model='formValidateDisable' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg">
                            <Input :disabled="true"  type="text"  :maxlength="30" v-model="phone" :placeholder="$t('phonePlacehodler')"></Input>
                        </FormItem>
                    </Form>
                    <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <!-- 手机 -->
                        <FormItem v-if="phone" class="form_item smsCode" prop='smsCode'>
                            <img src="../../assets/images/register/code.svg">
                            <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('SMSPlacehodler')"></Input>
                            <sendBtn business='business' :forgot='true' :machine='false' robotDiv='robotPhone'   @sendCick= 'sendSMSfun' :empty='empty' :ForgotPhonePassworMessage='ForgotPhonePassworMessage'></sendBtn>
                        </FormItem>
                        <!-- 邮箱 -->
                         <FormItem v-if="email" class="form_item" prop='EmailName'>
                            <img style="top:18px;" src="../../assets/images/register/email.svg">
                            <Input :disabled="true"  type="text"  :maxlength="30" v-model="email"  :placeholder="$t('phonePlacehodler')"></Input>
                        </FormItem>
                          <FormItem v-if="email" class="form_item smsCode" prop='EmailCode'>
                            <img src="../../assets/images/register/code.svg">
                            <Input :maxlength="6" v-model.trim="formValidate.EmailCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                            <sendBtn business='business' :forgot='true' :machine='machine' robotDiv='robotEmail'   @sendCick= 'sendSMSfun' :empty='empty' :ForgotEmailPassworMessage='ForgotEmailPassworMessage'></sendBtn>
                        </FormItem>
                        <!--  google-->
                        <FormItem v-if="bindGoogle==true" class="form_item" prop='googleCode'>
                            <img src="../../assets/images/register/password.svg">
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
import {restPasswordVerify,verifyBusinessCode} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';

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
                    "userId":"",
                    "businessType":"forget_password",
                    "sendCodeType":'phone'
                },
                ForgotEmailPassworMessage:{
                    "token":'',
                    "userId":"",
                    "businessType":"forget_password",
                    "sendCodeType":'email'

                },
                formValidateDisable:{
                    phone:'',
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
                phone:'',
                email:'',
                bindGoogle:'',
                userId:'',
                outerToken:'',
                machine:false,
                verifyBusinessResult:'',
                origin:''


            }



        },
        components:{
            sendBtn,
            Modal,
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.loaded = false;
                        this.codeVerify();
                    } else {

                    }
                })
            },
            sendSMSfun(callback){
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
            },
            codeVerify(){
                let bodyParam  = {
                    "userId":this.userId,
                    "businessType":'forget_password',
                    "phoneCode":this.formValidate.smsCode,
                    "emailCode":this.formValidate.EmailCode,
                    "googleCode":this.formValidate.googleCode,
                }
                postHeaderTokenBodyApi(verifyBusinessCode,this.outerToken,bodyParam).then((res) =>{
                    if(res.result){
                        // this.$Notice.success({
                        //         title:this.$t(11001),
                        //         desc: this.$t(11001)
                        //     });
                        this.loaded = true;
                        this.verifyBusinessResult = res.result;
                        localStorage.setItem('codeVerifyToken',res.result)
                        localStorage.setItem('outerUserId',this.userId)
                        this.$router.push({
                            path:'/resetNewpass',
                            query:{
                                originFrom:this.$route.query.originFrom
                            }
                        });
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
            this.phone = this.$route.query.phone;
            this.email = this.$route.query.email;
            this.bindGoogle = this.$route.query.bindGoogle;
            this.userId = this.$route.query.userId;
            // this.origin = this.$route.query.originFrom;
            this.outerToken = localStorage.getItem('outerToken');
            this.ForgotEmailPassworMessage = {//发送邮箱验证码参数
                    "userId":this.userId,
                    "businessType":"forget_password",
                    "sendCodeType":'email'
            }
            this.ForgotPhonePassworMessage = {//发送手机验证码参数
                "userId":this.userId,
                "businessType":"forget_password",
                "sendCodeType":'phone'
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
                // background-color: #d1d3df !important;
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

