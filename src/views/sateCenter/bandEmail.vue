<template>
    <div  id="bandemail" class="root">
        <div  class="wrapper">
            <div  class="register_wraper">
                   <div class="band-nav">
                        <router-link to='/safeCenter'>{{$t('aqzxSafeCeneter')}} </router-link>><router-link to=''> {{$t('aqzxBandEmail')}}</router-link>
                    </div>
                    <div class="tips">
                           {{$t('aqzxTips')}}
                    </div>
                  <div class="divider"></div>
                <div class="inner_input">
                    <div class="register-container bandPhone">
                        <div  class="phone">
                            <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                            <div class="phone-item">
                                <div>
                                    <!-- <span v-if="emailFlag==0">Email：</span>
                                    <span v-if="emailFlag==1">Original Email：</span> -->
                                    <span> {{$t('aqzxEmail')}}</span>
                                    <FormItem class="form_item" prop='emailName'>
                                         <Input   type="text"  :maxlength="30" v-model="formValidate.emailName"  :placeholder="$t('emailPlacehodler')"></Input>
                                     </FormItem>
                                </div>
                                <div>
                                    <div>
                                        <span> {{$t('aqzxEmailCode')}}</span>
                                    </div>
                                    <div>
                                        <FormItem class="form_item smsCode" prop='smsCode'>
                                        <Input :maxlength="6" v-model="formValidate.smsCode" :placeholder="$t('emialCodePlaceholder')"></Input>
                                        <sendBtn   @sendCick= 'sendSMSfun' :empty='empty' :ssoEmail='ssoEmail'></sendBtn>
                                        </FormItem>
                                    </div>
                                </div>
                             <div v-if="googleFlag">
                                    <span>{{$t('aqzxGooglecode')}}</span>
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
import '../../lib/utils.js'
import sendBtn from '../../components/sendBtn'
import Cookies from 'js-cookie'
import {ssoCodeVerify,binding,verifyEmail} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,postHeaderSeveralTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';

    export default {
        name:'register',
        data() {
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
            const validateGoogle = (rule, value, callback) => {
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


       
            return {
                countryLanguage:localStorage.getItem('countryLanguage'),
                model1: '',
                empty:true,
                token:'',
                formValidate:{
                    emailName:'',
                    smsCode:'',
                    googleCode:'',
                },
                loaded:true,
                ssoEmail:{
                     "operateType":"BIND_EMAIL",
                     "codeType":"EMAIL",
                     "email":'',
                     "language":localStorage.getItem('countryLanguage')

                },
                showModal:false,
                text:'',
                ruleValidate: {
                    emailName: [
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    smsCode: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    googleCode: [
                        { validator: validateGoogle, trigger: 'blur' }
                    ],
                },
                countryNumber:'',
                shows:1,
                emailFlag:0,
                googleFlag:false


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
                        this.loaded=false;
                         this.ssoCodeVerifyMethod();
                    } else {

                    }
                })
            },
    
            sendSMSfun(callback){
                let value = {
                    "operateType":"BIND_EMAIL",
                    "codeType":"EMAIL",
                    "email":this.formValidate.emailName,
                    "language":localStorage.getItem('countryLanguage')
                }
                this.$store.commit('changeBandEmail',value);
                  this.ssoEmail = {
                          "operateType":"BIND_EMAIL",
                          "codeType":"EMAIL",
                          "email":this.formValidate.emailName,
                          "language":localStorage.getItem('countryLanguage')
                    }
                if(callback){//callback是从子组件传递过来的参数
                    this.showModal = !this.showModal;
                    this.text = callback;
                }
            },
            ssoCodeVerifyMethod(){//验证验证码
                let  params = {
                    "operateType":"BIND_EMAIL",
                    "codeType":"EMAIL",
                    "email":this.formValidate.emailName,
                    "emailCode":this.formValidate.smsCode,
                    "googleCode":this.formValidate.googleCode

                }
                postHeaderTokenBodyApi(ssoCodeVerify,Cookies.get('loginToken'),params).then((res) =>{
                    if(res.code){
                        this.loaded=true;
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                    }else{
                        this.token = res.token;
                        this.bindMetond()
                    }
                }).catch((error)=>{
                        this.loaded=true;
                })


            },
            bindMetond(){
                 let len = this.countryNumber.length;
                let itc = this.countryNumber.substring(1);
                let ssoToken = Cookies.get('loginToken');
                let params = {
                    "email":this.formValidate.emailName,
                    "emailCode":this.formValidate.smsCode,
                    "googleCode":this.formValidate.googleCode,
                    "operateType":"BIND_EMAIL",
                    "bindType":"EMAIL",
                }
                    postHeaderSeveralTokenBodyApi(binding,ssoToken,this.token,params).then((res)=>{
                        if(res.result==true){
                             this.loaded=true;
                            this.$router.push('/safeCenter')
                        }else{
                             this.showModal = !this.showModal;
                             this.text = this.$t(res.code);
                        }
                    }).catch((error)=>{
                        this.loaded=true;
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
           
            
            // emailDisable(){
            //     if(this.emailFlag==1){
            //         this.empty = false;
            //         let emailAddress = localStorage.getItem('email');
            //         this.formValidate.emailName = emailAddress;
            //     }
            // }


        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//返回全局state的状态值
            },
            EmailNumberChange(){
               return this.formValidate.emailName;   
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
            EmailNumberChange(val,oldVal){
                if(!this.formValidate.emailName==''){
                    this.empty = false;
                }else{
                    this.empty = true;
                }
            },
        },
        mounted(){
            this.emailFlag = this.$route.query.emailFlag;
            if(localStorage.getItem('google')=='true'){//  获取的是字符串类型的true和false
               this.googleFlag = true
           }else{
               this.googleFlag = false;
           }
           //this.emailDisable()

        },
        created(){
            this.interFunc()
        }
        
        
    }
</script>
<style lang='less'>
#bandemail{
      .inner_input{
        .bandPhone{
            .ivu-input-wrapper{
                width: auto;
            }
            .ivu-input{
                padding-left: 15px;
                width: 580px;
                border: solid 1px #E7EAED;
                color: #344857;
                background: none;
                font-size: 14px;
                
            }
        }
    }
    .btn_contain{
        .sendMs{
            background: #12869a;
            border: none;
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
            border-radius: 0px;
        }
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            border-radius: 0px;
            border:solid 1px #BDC4E1;
            font-size: 14px;
            background: #353948;
            color:#fff;
        }
        
        
     }





    
</style>
<style scoped lang="less">
    @import './bandEmail.less';
</style>

