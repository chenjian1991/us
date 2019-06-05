<template>
    <div id="google" class="root">
        <div class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">{{$t('googleVerify')}}</div>
                     <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='googleNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
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
                fromSocial:"",
                responseSocialToken:'',
                domain:'',
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
                         window.location.href= this.domain+'api/v1/memberinterface'+'/'+this.responseSocialToken+'/'+this.fromSocial;
                  }) 
              }else{
              
              }
         },
            getUserInfo(token){
                postHeaderTokenBodyApi(userInfo,token,{}).then((res) =>{
                    let tradingPasswordFlag = res.isSetTradePasswrod;
                    localStorage.setItem('tradingPasswordFlag',tradingPasswordFlag);
                    localStorage.setItem('userPhone',res.phone);
                }).catch((res) =>{
                    console.log(res)
                })
            },
            gitlogHistory(token){//登录历史接口
                  postHeaderTokenBodyApi(loginHistory,token,{}).then((res) =>{
                    let loginHistory = res.length;
                    if(loginHistory==1){//首次登录
                          this.$store.commit('CHANGEFIRSTLOGIIN',true);
                        let arr = ['resetNewpass','newPassword','activeEmail','Register','login','','null'];
                        if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                            this.$router.push('/safeCenter')
                        }else{
                             this.$router.go(-2)
                        }
                    }else{//非首次登录
                          this.$store.commit('CHANGEFIRSTLOGIIN',false);
                        let aa = this.previousRouterName;
                        let arr = ['resetNewpass','newPassword','activeEmail','Register','login','','null'];
                        if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                            this.$router.push('/safeCenter')
                        }else{
                             this.$router.go(-2)
                        }


                    }
                }).catch((res) =>{
                    this.loaded = true;
                    console.log(res)
                })
            },
            loginFun(){//绑定谷歌后的登录，走的是谷歌验证的接口
                let params = {
                    "ex55Pin":localStorage.getItem('ex55Pin'),
                    "googleCode":this.formValidate.googleNumber,
                    "userClientInfo":{
                        "deviceModel":"MI 2S",
                        "deviceId": "xxxsllsj",
                        "resolution":"1920*1080",
                        "os":"Android",
                        "netType":"4G",
                        "operator":"China Mobile"
                    }

                }
                postHeaderTokenBodyApi(googleLogin,localStorage.getItem('googleToken'),params).then((res) =>{
                    if(res.code){
                        this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                         this.loaded = true;
                    }else{
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(11001);
                        setCookies(res.token)
                        this.$store.commit('changeLoingStatus',true)// 登录后把token 复制给 isLogin  res.token  就是登录token
                        this.gitlogHistory(res.token);
                        this.getUserInfo(res.token);
                        
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
                    debugger
                    // console.log( this.previousRouterName);
                    let aa = this.previousRouterName
                    this.handleSubmit('formValidate');
                }
            }
        },
        mounted(){
            this.fromSocial = this.$route.query.fromSocial;
            this.domain = getCommouityBaseURL();
        }
        
        
    }
</script>
<style lang='less'>
#google{
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
}
    

</style>
<style scoped lang="less">
    @import './login.less';
</style>

<style lang='less'>
    @import './mediaLogin.less';
</style>
