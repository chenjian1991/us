<template>
    <div class="root">
        <div class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">{{$t('googleVerify')}}</div>
                     <Form onsubmit="return false;" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='googleNumber'>
                            <img src="../../assets/images/register/accountnew.svg">
                            <Input :maxlength="6" v-model="formValidate.googleNumber" :placeholder="$t('goolePlaceholder')"></Input>
                        </FormItem>
                        <Button v-if="loaded" class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t('confrim')}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                    </Form>
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {userInfo,googleLogin,loginHistory,socialToken} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import {setCookies} from '@/config';
import {getCommouityBaseURL} from '../../config/index.js';
import { debuglog } from 'util';
import {getBrowserMessage} from "@/lib/utils.js"


    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
               const validatePhone = (rule,value,callback) =>{
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
                token:'',
                loaded:true,
                paramsObj:{},
                formValidate:{
                    googleNumber:'',
                },
                showModal:false,
                text:'',
                fromSocial:'',
                responseSocialToken:'',
                domain:'',
                deviceObj:{},
                fromSite:'',
                ruleValidate: {
                    googleNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loginFun()
                        this.loaded = false;
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            gotoSocial(loginToken){//拿登陆token去换取social token
              if(loginToken){//登陆了
                  postHeaderTokenBodyApi(socialToken,loginToken,{}).then((res)=>{
                         this.responseSocialToken = res.token;
                         window.location.href= this.domain+'/api/v1/memberinterface'+'/'+this.responseSocialToken+'/'+this.fromSocial;
                  }) 
              }else{
              
              }
         },
            loginFun(){//绑定谷歌后的登录，走的是谷歌验证的接口
                let params = {
                    "userId": localStorage.getItem('loginGoogleUserId'),
                    "googleCode": this.formValidate.googleNumber,
                    "deviceType": "WEB",
                    "deviceCode": localStorage.getItem('deviceCode'),
                    "deviceInfo": {
                        "deviceModel": this.deviceObj.browserType,
                        "resolution": this.deviceObj.windowWith
                    }

                }
                postHeaderTokenBodyApi(googleLogin,localStorage.getItem('beforeToken'),params).then((res) =>{
                    if(res.loginToken){
                            this.$Notice.success({
                                title:this.$t(11001),
                                desc:this.$t(11001)
                            });
                            setCookies(res.loginToken)
                            localStorage.setItem('loginUserId',res.userId)
                            this.$store.commit('changeLoingStatus',true)// 登录后把token 复制给 isLogin  res.token  就是登录token
                            if(this.fromSocial==undefined&&this.fromSite==undefined){//既不是social也不是ato
                                let router = this.previousRouterName;
                                let arr = ['resetNewpass','newPassword','activeEmail','register','verfifyEmail','login','',null,'forgot','safeVatification','login'];
                                if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                                    this.$router.push('/home')
                                }else{
                                    this.$router.go(-2)
                                }
                            } else if(this.fromSite){//来自ato
                                    this.$router.push(this.fromSite)
                            }else{//说明来自social
                                    this.gotoSocial(token)
                            }
                    }
                }).catch((error)=>{
                        this.loaded = true;

                })

            }

           

        },
        computed:{
            inputValidate(){
               return this.formValidate.googleNumber;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            googleNumberlength(){
                return this.formValidate.googleNumber.length;
            },
            previousRouterName(){
                return this.$store.state.app.routerHistory;
            }
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
            },
            googleNumberlength(val,oldVal){
                if(val==6){
                    this.handleSubmit('formValidate');
                }
            }
        },
        mounted(){
            this.fromSocial = this.$route.query.fromSocial;
            this.fromSite = this.$route.query.fromWhere;
            this.domain = getCommouityBaseURL();
            this.deviceObj = getBrowserMessage();


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
            border:solid 1px #293B47;
            font-size: 14px;
            background: #111E26;
            color: #fff;
            border-radius: 3px;
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

</style>
<style scoped lang="less">
    @import './login.less';
</style>

<style lang='less'>
    @import './mediaLogin.less';
</style>
