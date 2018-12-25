<template>
    <div class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="/originLoginPassword">{{$t("aqzxchangepassword")}}</router-link>
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
                                <Input type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxNewPasswordPlaceholder')"></Input>
                            </FormItem>
                         </div>
                         <div v-if="googleFlag">
                             <div class="pull-left span-label">
                                <span>{{$t("aqzxconfirmPassword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='confrimPasswordNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input type="password" :maxlength="10" v-model="formValidate.confrimPasswordNumber" :placeholder="$t('aqzxconfirmPasswordplaceholder')"></Input>
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
            verifyNewPassword(){
                  let  params = {
                    "password":this.formValidate.passwordNumber,
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
            


        }
        
        
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
    //  #app{
    //      height: 100%;
    //  }
    .footerBox{
         flex: 0 0 auto;
     }
     .inner_input_login{
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            border-radius: 0px;
            border:solid 1px #BDC4E1;
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

</style>
<style scoped lang="less">
    @import './newPassword.less';
</style>


