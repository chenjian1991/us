<template>
    <div id="loginPassword" class="root">
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
                            <p class="step">2</p>
                            <p>{{$t("aqzxsetnewpass")}}</p>
                        </div>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div>
                            <div class="pull-left span-label">
                                <span>{{$t("aqzxoldpass")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passwordNumber'>
                                <img src="../../assets/images/register/security.svg" alt="">
                                <Input type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxoldPasswordPlaceholder')"></Input>
                            </FormItem>
                         </div>
                         <div v-if="googleFlag">
                             <div class="pull-left span-label">
                                <span>{{$t("googleCodenumCode")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='googleNumber'>
                                <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input :maxlength="6" v-model="formValidate.googleNumber" :placeholder="$t('goolePlaceholder')"></Input>
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
import {resetLoginPasswordVerify,hashUrl} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
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
                formValidate:{
                    passwordNumber:'',
                    googleNumber:''
                },
                showModal:false,
                text:'',
                googleFlag:false,
                validateToken:'',
                loaded:true,
                ruleValidate: {
                    passwordNumber: [
                        { validator: validateLoginPass, trigger: 'blur' }
                    ],
                    googleNumber:[
                        {validator: validateGoogle, trigger: 'blur'}
                    ]
                    
                },
               


            }



        },
      
        methods:{
          async handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                       this.verifyOriginPassword();
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
          async  verifyOriginPassword(){
                let hashFlag = await this.getHashFlag(localStorage.getItem('userAccount'));
                  let  params = {
                    "password":hashFlag?this.setSha(this.formValidate.passwordNumber):this.formValidate.passwordNumber,
                    "googleCode":this.formValidate.googleNumber
                }
                postHeaderTokenBodyApi(resetLoginPasswordVerify,Cookies.get('loginToken'),params).then((res) =>{
                    if(res.code){
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        this.loaded = true;
                    }else{
                        this.validatePasswordToken = res.token;
                        localStorage.setItem('validatePasswordToken',this.validatePasswordToken)
                        this.$router.push('/newPassword')
                    }
                }).catch((error)=>{
                        this.loaded = true;
                    
                })



            },
              getHashFlag(account){
                let params = {
                    account:account
                }
                let resResult = getApi(hashUrl,params).then((res)=>{
                    return res.result;
                })
                return resResult;
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
            },
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
            let googleFlage = localStorage.getItem('google')
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
     #loginPassword{
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
    @import './originPassword.less';
</style>


