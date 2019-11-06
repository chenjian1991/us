<template>
    <div class="btn_contain">
        <Button ref="btn"  :disabled='empty'  v-show="show" :class="fatherClass" @click="sendCode" class="sendMs" type="primary">{{$t('regSend')}}</Button>
        <Button :disabled='!show' v-show="!show" :class="fatherClass" class="sendMs" type="primary">{{count}}s</Button>
         <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
        <div id="captcha"></div>
         <Modal
            class-name="vertical-center-modal"
            v-model="robotModalflag"
            :title="this.$t('yanzheng')"
            :mask-closable="false"
            >
            <div :id="robotDiv"></div>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>

<script>
    import {sendSms,businessSend,verifyEmail,userVerify,ipQuery,bindSend} from '../../api/urls.js';
    import {postBaseApi,postHeaderTokenBodyApi,getApi,getApiLoin} from '../../api/axios.js';
    import {geeTest} from '../../api/usersystem.js'
   import Cookies from 'js-cookie';
    export default {
        name:'sendBtn',
        props:{
            phoneMessage:Object,//手机注册
           // emailMessage:Object,//邮箱注册
            empty:Boolean,
            ssoPhone:Object,//绑定手机发送验证码
            ssoEmail:Object,//绑定邮箱发送验证码,
            ForgotPhonePassworMessage:Object,//忘记密码手机发送验证码
            ForgotEmailPassworMessage:Object,//忘记密码邮箱发送验证码
            tradePassPhone:Object,//设置交易密码手机发送验证码
            tradePassEmail:Object,//设置交易密码邮箱发送验证码
            switchTradePassPhone:Object,//开启交易密码手机
            switchTradePassEmail:Object,//开启交易密码邮箱
            fatherClass:String,
            robotDiv:'',
            machine:Boolean,
            Bindmachine:Boolean,
            forgot:Boolean,
            business:String,
           

        },
        data() {
            return {
                notLogin: false,
                countryLanguage:'简体中文',
                show:true,
                count:'',
                timer:null,
                captchaIns:'',
                robotModalflag:false,
                ipCountry:'',
                googleID:"",
                loginToken:'',
                
                


            }
        },
        methods: {
            sendCode(){
                this.$emit('sendCick')//触发父组件的方法
                if(this.machine){//需要人机验证
                    if(this.phoneMessage){//手机注册发送验证码
                        this.checkGeetest('25e87d5e8ba4373ac4c3e1adc20d4f55','3')
                    }
                }
                if(this.business){//不要人机验证 业务发送
                         if(this.ForgotPhonePassworMessage){//忘记密码手机发送验证码
                             this.businessPostRequest(localStorage.getItem('outerToken'),this.ForgotPhonePassworMessage,this)
                        }else if(this.ForgotEmailPassworMessage){//忘记密码邮箱发送验证码
                             this.businessPostRequest(localStorage.getItem('outerToken'),this.ForgotEmailPassworMessage,this)
                        }else if(this.tradePassEmail){//修改交易密码邮箱发送验证码
                             this.businessPostRequest(Cookies.get('loginToken'),this.tradePassEmail,this)
                        }else if(this.tradePassPhone){//修改交易密码手机发送验证码
                             this.businessPostRequest(Cookies.get('loginToken'),this.tradePassPhone,this)
                        }else if(this.switchTradePassPhone){//开启交易密码发送手机验证码
                             this.businessPostRequest(Cookies.get('loginToken'),this.switchTradePassPhone,this)
                        }else if(this.switchTradePassEmail){//开启交易密码邮箱发送
                             this.businessPostRequest(Cookies.get('loginToken'),this.switchTradePassEmail,this)
                        }else if(this.ssoPhone){// 绑定邮箱发送手机验证码
                             this.businessPostRequest(Cookies.get('loginToken'),this.ssoPhone,this)
                        }else if(this.ssoEmail){//绑定手机发送邮箱验证码
                             this.businessPostRequest(Cookies.get('loginToken'),this.ssoEmail,this)
                        }
                }
            },
            checkGeetest(id,interactive){//人机验证
                    geeTest(id,interactive,(data)=>{
                        let obj = {
                            "personType": "GEETEST",
                            "personCode": data,
                        }
                        if(this.phoneMessage){//手机注册发验证码
                                let registerParams = Object.assign(this.phoneMessage,obj)
                                this.sendPostRequest(registerParams,this);
                         }
                      

                    })
            },
            sendPostRequest(params,_that){//登录注册发送验证码 send
                    postBaseApi(sendSms,'',params).then((res) =>{
                        if(res.code){// 发送失败
                            let code = res.code;
                        }else{
                             _that.show = false;
                            const TIME_COUNT = 60;
                            if(!_that.timer){
                                _that.count = TIME_COUNT;
                                _that.show = false;
                                _that.timer = setInterval(() =>{
                                    if(_that.count>0&&_that.count<=TIME_COUNT){
                                        _that.count--;
                                    }else{//倒计时到0的时候
                                        _that.show = true;
                                        clearInterval(_that.timer);
                                        _that.timer = null;
                                       
                                }
                                },1000)
                            }
                        }
                 
                }).catch((res) =>{

                })
            },
              businessPostRequest(outerToken,params,_that){//业务发送验证码
                    postHeaderTokenBodyApi(businessSend,outerToken,params).then((res) =>{
                        console.log(res)
                            _that.show = false;
                            const TIME_COUNT = 60;
                            if(!_that.timer){
                                _that.count = TIME_COUNT;
                                _that.show = false;
                                _that.timer = setInterval(() =>{
                                    if(_that.count>0&&_that.count<=TIME_COUNT){
                                        _that.count--;
                                    }else{
                                        _that.show = true;
                                        clearInterval(_that.timer);
                                        _that.timer = null;
                                         _that.captchaIns='';
                                       
                                    }
                                },1000)
                            }
                     
                 
                }).catch((res) =>{
                    if(this.forgot){//  忘记密码发送验证码token失效时跳转到上一步重新验证
                        if(res.data.code==='Cx000001'){
                        this.$router.push('/forgot')
                        }
                    }
                    
                })
            },
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            }
        },
        watch:{
            languageChange(val,olaVal){
                  
                
            }
        },
        mounted() {
            //  从url里面读取token  和app交互
            console.log(this.business)
            const params = this.$route.query;
            if (params['token']) {
                this.loginToken = params['token']
            }else{
                 this.loginToken = Cookies.get('loginToken')
            }
           
           
            
           
        }
    }
</script>

<style scoped lang="less">
.btn_contain{
    .sendMs{
        width: 112px;
        height: 48px;
        text-align: center;
        font-size:16px;
        background: #12869a;
    }
    .newBtn{
        // height: auto !important;
        width:90px;
        height:43px !important;
    }
    .ivu-btn-primary[disabled]{
        color: #c5c8ce;
       opacity: 0.65;
   }
    .ivu-btn-primary{
         border:1px solid #ced4da ;
    }
}
</style>
<style lang='less'>
 .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-footer{
            border-top: none;
        }
    }
</style>