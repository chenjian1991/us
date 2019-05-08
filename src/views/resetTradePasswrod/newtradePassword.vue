<template>
    <div id="origintradepassword" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="">{{$t("aqzxchangetradepassword")}}</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">{{$t("aqzxtradepasswordtips")}}</div>
                <div class="page-title">{{$t("aqzxchangetradepassword")}}</div>
                <div class="inner_input_login">
                    <div class="login_title">
                        <div class="pull-left step-one">
                            <p class="step active">1</p>
                            <p>{{$t("aqzxverify")}}</p>
                        </div>
                        <div class="line"></div>
                        <div class="pull-right step-two">
                            <p class="step active">2</p>
                            <p>{{$t("aqzxchangetradepassword")}}</p>
                        </div>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div class="clearfix">
                            <div class="pull-left span-label">
                                <span>{{$t("aqzxtradeword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passwordNumber'>
                                <img src="../../assets/images/register/security.svg" alt="">
                                <Input type="password" :maxlength="6" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxtradeplacehoder')"></Input>
                            </FormItem>
                         </div>
                         <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t("aqzxconfirmword")}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='confirmPassword'>
                                <img src="../../assets/images/register/accountnew.svg" alt="">
                                <Input type="password" :maxlength="6" v-model="formValidate.confirmPassword" :placeholder="$t('aqzxtradeplacehoder')"></Input>
                            </FormItem>
                         </div>
                        <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">{{$t("zhmmResetSubmit")}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {setTradingPassword} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
    export default {
        name:'tradepassword',
        components:{
            Modal,
        },
        data() {
              const validateGoogle = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('aqzxtradeplacehoder')))
                    }else{
                        
                    }
                    callback()
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('comfrimpassRequier')));
                } else if (value !== this.formValidate.passwordNumber) {
                    callback(new Error(this.$t('passwordNotMach')))
                } else {
                    callback();
                }
            };
       
            return {
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    passwordNumber:'',
                    confirmPassword:'',
                },
                showModal:false,
                text:'',
                validateToken:'',
                empty:false,
                loaded:true,
                validatetradePasswordToken:'',
                ruleValidate: {
                    passwordNumber: [
                        { validator: validateGoogle, trigger: 'blur' }
                    ],
                    confirmPassword:[
                        {validator: validatePassCheck, trigger: 'blur'}
                    ],
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded=false;
                       this.setTradingPasswordMthod();
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            setTradingPasswordMthod(){
                    let  params = {
                        "password":this.formValidate.passwordNumber,
                        "ex55Pin":localStorage.getItem('ex55Pin')?localStorage.getItem('ex55Pin'):localStorage.getItem('loginEx55Pin'),
                    }
                postHeaderTokenBodyApi(setTradingPassword,localStorage.getItem('validatePasswordToken'),params).then((res) =>{
                    if(res.code){
                        this.loaded = true;
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        if(res.code=='10013'){
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 3000);
                        }
                    }else{
                        this.showModal = true;
                        this.text = this.$t(11001);
                        localStorage.setItem('tradingPasswordFlag',true);
                       setTimeout(() => {
                            this.showModal = true;
                            this.text = this.$t(11001);
                            this.$router.push('/safeCenter')
                       }, 1000);
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
#origintradepassword{
     
    
}
    

</style>
<style scoped lang="less">
    @import './newtradePassword.less';
</style>


