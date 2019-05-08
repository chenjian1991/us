<template>
    <div id="newloginpassword" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="">{{$t("aqzxchangepassword")}}</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">{{$t("aqzxtips")}}</div>
                <div class="page-title">{{$t("aqzxchangepassword")}}</div>
                <div class="inner_input_login">
                    <div class="login_title">
                        <div class="pull-left step-one">
                            <p class="step active">1</p>
                            <p>{{$t("aqzxverify")}}</p>
                        </div>
                        <div class="line"></div>
                        <div class="pull-right step-two">
                            <p class="step active">2</p>
                            <p>{{$t("aqzxsetnewpass")}}</p>
                        </div>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div>
                            <div class="pull-left span-label">
                                <span>{{$t("aqzxNewPassword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passwordNumber'>
                                <img src="../../assets/images/register/security.svg" alt="">
                                <Input  :maxlength="20" type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxNewPasswordPlaceholder')"></Input>
                            </FormItem>
                         </div>
                         <div v-if="googleFlag">
                             <div class="pull-left span-label">
                                <span>{{$t("aqzxconfirmPassword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='confrimPasswordNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input type="password" :maxlength="20" v-model="formValidate.confrimPasswordNumber" :placeholder="$t('aqzxconfirmPasswordplaceholder')"></Input>
                            </FormItem>
                         </div>
                        <Button v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t("aqzxnext")}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                       
                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {resetLoginPassword} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
    export default {
        name:'login',
        components:{
            Modal
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
             const validateConfirmPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('comfrimpassRequier')));
                } else if (value !== this.formValidate.passwordNumber) {
                    callback(new Error(this.$t('passwordNotMach')))
                } else {
                    callback();
                }
            };
            return {
                formValidate:{
                    passwordNumber:'',
                    confrimPasswordNumber:''
                },
                showModal:false,
                text:'',
                googleFlag:false,
                loaded:true,
                ruleValidate: {
                    passwordNumber: [
                        { validator: validateLoginPass, trigger: 'blur' }
                    ],
                    confrimPasswordNumber:[
                        {validator: validateConfirmPass, trigger: 'blur'}
                    ]
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded= false;
                       this.verifyNewPassword();
                    } else {
                    }
                })
            },
              setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
            },
            verifyNewPassword(){
                // let hash;
                // let hashFlag = localStorage.getItem('hashFlag');
                // if(hashFlag=='true'){
                //     hash = true
                // }else{
                //     hash = false;
                // }
                  let  params = {
                    "password":this.setSha(this.formValidate.passwordNumber),
                    "ex55Pin":localStorage.getItem('loginEx55Pin'),
                }
                postHeaderTokenBodyApi(resetLoginPassword,localStorage.getItem('validatePasswordToken'),params).then((res) =>{
                    if(res.code){
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        this.loaded= true;
                    }else{
                        Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')});
                        localStorage.removeItem("ACCOUNT_TOKEN");
                        localStorage.removeItem("ORDER_TOKEN");
                        localStorage.removeItem("ASSET_TOKEN");
                        localStorage.removeItem("UTIL_TOKEN");
                        localStorage.removeItem("accountId");
                        localStorage.removeItem("ACCOUNT_SESSION");
                        localStorage.removeItem("ORDER_SESSION");
                        localStorage.removeItem("ASSET_SESSION");
                        localStorage.removeItem("orderTicket");
                        localStorage.removeItem("googleFlag");
                        localStorage.removeItem("phoneNumber");
                        localStorage.removeItem("userNumer");
                        localStorage.removeItem("ex55pin");
                        localStorage.removeItem("emailFlag");
                        localStorage.removeItem("ifEmail");
                        localStorage.removeItem("ifsetgoogle");
                        localStorage.removeItem("isSetTradePasswrod");
                        localStorage.removeItem("securitPhone");
                        localStorage.removeItem("curPage");
                        localStorage.removeItem("Emailtoken");
                        localStorage.removeItem("phoneToken");
                        this.$store.commit('changeLoingStatus',false);
                            this.showModal = true;
                             this.text = this.$t(11001);// 成功提示框
                             setTimeout(() => {
                                this.$router.push('/login')
                             }, 2000);
                       
                    }
                }).catch((error)=>{
                        this.loaded= true;
                })



            }
           
        },
        computed:{
            inputValidate(){
               return this.formValidate.passwordNumber;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){
            let googleFlage = localStorage.getItem('google');
            if(googleFlage=='true'){
                this.googleFlag = true;
            }else{
                this.googleFlag = false;
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
        },
        
        
    }
</script>
<style lang='less'>
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    .footerBox{
         flex: 0 0 auto;
     }
     #newloginpassword{
         .inner_input_login{
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            border: solid 1px #E7EAED;
            color: #344857;
            background: none;
            font-size: 14px;
        }
        .ivu-form-item-content{
            position: relative;
            img{
                z-index: 99;
                position: absolute;
                top: 16px;
                left: 14px;
            }
            
        }
        
        
     }
     }
     

</style>
<style scoped lang="less">
    @import './newPassword.less';
</style>


