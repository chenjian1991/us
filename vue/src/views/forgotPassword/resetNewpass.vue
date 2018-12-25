<template>
    <div id="resetnewpass" class="root">
        <div class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">{{$t('zhmmSetNewPassword')}}</div>
                     <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
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
                    "password":this.formValidate.password,

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
            }



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
     #resetnewpass{
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







