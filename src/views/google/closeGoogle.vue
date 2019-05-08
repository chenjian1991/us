<template>
    <div id="closeGoogle" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="">{{$t("aqzxCloseGoogleRouter")}}</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">{{$t("aqzxCloseGoogletips")}}</div>
                <div class="page-title">{{$t("aqzxCloseGoogletitle")}}</div>
                <div class="inner_input_login">
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div>
                            <div class="pull-left span-label">
                                <span>{{$t("aqzxCloseGooglePassword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passwordNumber'>
                                <img src="../../assets/images/register/security.svg" alt="">
                                <Input type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxpasswordplaceholder')"></Input>
                            </FormItem>
                         </div>
                         <div>
                             <div class="pull-left span-label">
                                <span>{{$t("googleCodenumCode")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='googleNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input :maxlength="10" v-model="formValidate.googleNumber" :placeholder="$t('goolePlaceholder')"></Input>
                            </FormItem>
                         </div>
                        <Button v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t("zhmmResetSubmit")}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>

                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {unbindGoogle} from '../../../api/urls.js';
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.unbindGoogleMthods();
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            unbindGoogleMthods(){
                  let  params = {
                    "password":this.formValidate.passwordNumber,
                    "googleCode":this.formValidate.googleNumber
                }
                postHeaderTokenBodyApi(unbindGoogle,Cookies.get('loginToken'),params).then((res) =>{
                    if(res.code){
                        // this.showModal = !this.showModal;
                        // this.text = this.$t(res.code);
                        this.$Message.error(this.$t(res.code))
                        this.loaded = true;
                    }else{
                        this.$Message.success(this.$t(11001))
                        setTimeout(() => {
                            this.$router.push('/safeCenter')
                        }, 1500);
                    }
                }).catch((error)=>{
                        this.loaded = true;
                    
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
         
            


        },
        created(){
            this.interFunc()
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
    .footerBox{
         flex: 0 0 auto;
     }
     #closeGoogle{
         .inner_input_login{
         .ivu-input{
            width: 580px;
            border: solid 1px #E7EAED;
            color: #344857;
            height: 48px;
            line-height: 48px;
            background: none;
            font-size: 14px;
            padding-left: 53px;
        }
        .ivu-form-item-content{
            position: relative;
            img{
                z-index: 99;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            
        }
        
        
        
     }
     }
     

</style>
<style scoped lang="less">
    @import './closeGoogle.less';
</style>


