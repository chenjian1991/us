<template>
    <div id="forgotpassword" class="root">
        <div class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">{{$t('zhmmSetNewPassword')}}</div>
                     <Form onsubmit="return false;" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='password'>
                            <img src="../../assets/images/register/security.svg" alt="">
                            <Input type="password" v-model="formValidate.password" :placeholder="$t('signPasswordPlaceholder')"></Input>
                        </FormItem>
                          <FormItem class="form_item" prop='confrimPassword'>
                            <img src="../../assets/images/register/password.svg" alt="">
                            <Input type="password" v-model="formValidate.confrimPassword" :placeholder="$t('confirmPasswordPlacehodler')"></Input>
                        </FormItem>
                        <Button v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t('zhmmSetSubmit')}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>

                    </Form>
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {resetNewpass} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import { duration } from 'moment';


    export default {
        name:'reset',
        components:{
            Modal
        },
        data() {
             const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('passwordRequier')));
                } else{
                    let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('passwordReg')))
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
            return {
                token:'',
                ex55Pin:'',
                loaded:true,
                formValidate:{
                    password:'',
                    confrimPassword:'',
                },
                showModal:false,
                text:'',
                ruleValidate: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confrimPassword: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.postResetPass()
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            postResetPass(){
                let parasm = {
                    "ex55Pin":localStorage.getItem('ex55pin'),
                    "password":this.setSha(this.formValidate.password),
                }
                postHeaderTokenBodyApi(resetNewpass,localStorage.getItem('codeVerifyToken'),parasm).then((res) =>{
                        if(res.code){
                            this.showModal = !this.showModal;
                            this.text = this.$t(res.code);
                            this.loaded = true;
                        }else{
                             this.showModal = true;
                             this.text = this.$t(11001);
                             setTimeout(() => {
                                this.$router.push('/login')
                             }, 1000);
                        }
                })
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
            },



        },
        computed:{
            inputValidate(){
               return this.formValidate.confrimPassword;   
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
     #forgotpassword{
            .inner_input_login{
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            font-size: 14px;
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
    @import './resetNewpass.less';
</style>







