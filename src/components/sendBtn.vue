<template>
    <div class="btn_contain">
        <Button ref="btn"  :disabled='empty'  v-show="show" @click="sendCode" :class="fatherClass" class="sendMs" type="primary">{{$t('regSend')}}</Button>
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
    import {sendSms,ssoSend,verifyEmail,userVerify,ipQuery} from '../../api/urls.js';
    import {postBaseApi,postHeaderTokenBodyApi,getApi,getApiLoin} from '../../api/axios.js';
    import Cookies from 'js-cookie'
    import { debuglog } from 'util';
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
            robotDiv:'',
            fatherClass:String
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


            }
        },
        methods: {
            sendCode(){
                this.$emit('sendCick')//触发父组件的方法
                if(this.ssoEmail||this.tradePassEmail){//邮箱不需要人机验证
                    this.noMachineBtnPost();
                }
               //this.captchaIns && this.captchaIns.popUp()//弹出人机验证
                if(this.ipCountry=='中国'){
                     this.captchaIns && this.captchaIns.popUp()//弹出人机验证
                }else{
                    if(this.ssoEmail||this.tradePassEmail){//不需要人机验证

                    }else{
                         this.robotModalflag = true;
                    }
                }

            },
            //  ipQueryFun(){//ip所在国家查询
            //     getApi(ipQuery,'').then((res)=>{
            //         if(res.resultcode==200){
            //             this.ipCountry = res.result.Country;
            //             if(this.ipCountry=='中国'){
                            
            //             }else{//只有非中国都时候才实例化谷歌都方法
            //                  this.onloadCallback();
            //             }
            //         }else{
            //             this.onloadCallback()//当ip获取失败都时候默认是谷歌验证
            //             this.ipCountry = '';//查询失败
            //         }
            //     })
            // },
            ipQueryFun(){//ip所在国家查询
                getApiLoin(ipQuery,'').then((res)=>{
                    if(res.resultcode==200){
                        this.ipCountry = res.result.Country;
                        if(this.ipCountry=='中国'){
                             
                         }else{//只有非中国的时候才实例化谷歌都方法
                                 this.onloadCallback();
                         }
                    }else{
                          this.ipCountry='美国'//ip查询失败的时候默认美国
                    }
                }).catch((error)=>{//当ip获取失败都时候默认是谷歌验证
                    this.ipCountry='美国'// 请求超时的还是把ip写死美国
                })
            },
            onloadCallback(){//谷歌人机验证方法
                let _that = this;
                // console.log("grecaptcha is ready!");
                let widgetId=grecaptcha.render(this.robotDiv, {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        if(data.length!==0){
                            let obj = {
                                     captchaValidateStr:data,
                                     captchaValidateType:'google'
                                }
                            if(_that.phoneMessage){//手机注册发送验证码
                                let registerParams = Object.assign(_that.phoneMessage,obj)
                                _that.$options.methods.sendPostRequest(registerParams,_that);
                            }else if(_that.tradePassPhone){//修改交易密码发送手机验证码
                                let registerParams = Object.assign(_that.tradePassPhone,obj)
                                 _that.SSOpostRequest(registerParams,_that);
                            }else if(_that.ssoPhone){//绑定手机发送验证码
                                let registerParams = Object.assign(_that.ssoPhone,obj)
                                 _that.phonePostVerifyMethod(registerParams)
                            }else if(_that.ForgotEmailPassworMessage){//邮箱找回密码发送验证码
                                    let registerParams = Object.assign(_that.ForgotEmailPassworMessage,obj)
                                    _that.$options.methods.sendPostRequest(registerParams,_that);
                            }else if(_that.ForgotPhonePassworMessage){//手机找回密码发送验证码
                                    let registerParams = Object.assign(_that.ForgotPhonePassworMessage,obj)
                                    _that.$options.methods.sendPostRequest(registerParams,_that);
                            }

                            setTimeout(()=>{
                                _that.robotModalflag= false;
                            },2000)
                        }
                    },
                    "expired-callback":function(){//验证失效回调函数
                        console.log('expired-callback')
                    },
                    "error-callback":function(){//因为网络等问题无法验证，通过回调函数提醒用户重试
                        console.log('error-callback')
                    },

                    });
                    _that.googleID = widgetId;
                    return widgetId;

            },
            initRobot(){
                let _that = this;　
                let captchaIns;
                if (captchaIns) {
                    captchaIns.destroy()
                }
                let lan = this.$store.state.app.countryLanguage;//从全局变量中取值，保持全栈语言统一性
                if(lan==='zh-CN'){
                        lan = 'zh-CN'
                }else{
                    lan = 'en'
                }
                initNECaptcha({
                    element: '#captcha',
                    captchaId: 'a3cd39c172284133a3470b7ec05a2bb0',
                    mode: 'popup',
                    width: '320px',
                    lang:lan,
                    onReady: function (instance) {
                        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                    },
                    onVerify: function (err, data) {
                        if(err){
                        //
                        }
                        if(data){
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                            let captchaValidateStr = {
                                captchaValidateStr:value
                            }
                             let obj = {
                                     captchaValidateStr:value,
                                     captchaValidateType:'wangyi'
                                }
                            if(_that.phoneMessage){//手机注册发送验证码
                                let registerParams = Object.assign(_that.phoneMessage,obj)
                                _that.$options.methods.sendPostRequest(registerParams,_that);
                            }else if(_that.ForgotEmailPassworMessage){//邮箱找回密码发送验证码
                                    let registerParams = Object.assign(_that.ForgotEmailPassworMessage,captchaValidateStr)
                                    _that.$options.methods.sendPostRequest(registerParams,_that);
                            }else if(_that.ForgotPhonePassworMessage){//手机找回密码发送验证码
                                    let registerParams = Object.assign(_that.ForgotPhonePassworMessage,captchaValidateStr)
                                    _that.$options.methods.sendPostRequest(registerParams,_that);
                            }else if(_that.ssoPhone){//绑定手机发送验证码
                                let registerParams = Object.assign(_that.ssoPhone,obj)
                                _that.phonePostVerifyMethod(registerParams)//验证手机
                            }else if(_that.tradePassPhone){//修改交易密码发送手机短信
                                let registerParams = Object.assign(_that.tradePassPhone,obj)
                                 _that.SSOpostRequest(registerParams,_that);
                            }
                            
                        }
                    }
                }, function (instance) {
                    // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
                    _that.captchaIns = instance;
                }, function onerror(err) {
                    _that.captchaIns = ''
                    //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                })//初始化函数结尾

                return captchaIns;
            },
            machineVerifyPass(){

            },
            noMachineBtnPost(){//不需要人机验证
                if(this.ssoEmail){//绑定邮箱发送验证码
                    this.emaiPostVerifyMethod()//验证邮箱
                }else if(this.tradePassEmail){//交易密码邮箱发送验证码
                    this.SSOpostRequest(this.tradePassEmail,this);
                }
               
            },
            sendPostRequest(params,_that){//登录注册发送验证码 send
                    postBaseApi(sendSms,'',params).then((res) =>{
                        if(res.code){// 发送失败
                            let code = res.code;
                            _that.$emit('sendCick',_that.$t(code))//触发父组件的方法，并传递参数给父组件；
                             if(_that.ipCountry=='中国'){
                                    _that.initRobot();
                                }else{
                                    //  _that.onloadCallback();
                                    grecaptcha.reset(_that.googleID);
                                }   
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
                                         _that.captchaIns='';
                                        if(_that.ipCountry=='中国'){
                                                _that.initRobot();
                                        }else{
                                             grecaptcha.reset(_that.googleID);
                                                // _that.onloadCallback();
                                        } 
                                }
                                },1000)
                            }
                        }
                 
                }).catch((res) =>{
                   if(this.ipCountry=='中国'){
                            _that.initRobot();
                    }else{
                        _that.onloadCallback();
                    } 
                })
            },
              SSOpostRequest(params,_that){//sso.send 发送短信验证码
                    postHeaderTokenBodyApi(ssoSend,Cookies.get('loginToken'),params).then((res) =>{
                        if(res.code){
                            let code = res.code;
                            _that.$emit('sendCick',_that.$t(code))//触发父组件的方法，并传递参数给父组件；
                         if(res.code == '10013'){
                             _that.$emit('sendCick',_that.$t(code))//触发父组件的方法，并传递参数给父组件；
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 2000);
                        }
                          if(this.ssoEmail||this.tradePassEmail){
                                // 不需要初始化人机验证
                            }else{
                                if(this.ipCountry=='中国'){
                                        this.initRobot()//注册失败后是实利化人机验证
                                }else{
                                        grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                                    }
                            }
                        }else{
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
                                            if(this.ssoEmail||this.tradePassEmail){
                                                // 不需要初始化人机验证
                                            }else{
                                                 if(_that.ipCountry=='中国'){
                                                     _that.initRobot()//注册失败后是实利化人机验证
                                                 }else{
                                                    grecaptcha.reset(_that.googleID);//注册失败后是实利化人机验证
                                                 }

                                            }
                                    }
                                },1000)
                            }
                        }
                 
                }).catch((res) =>{
                    _that.initRobot()
                })
            },

            emaiPostVerifyMethod(){// 验证邮箱是否存在
                let params = {
                    "email":this.$store.state.app.bandEmail.email,
                }
                postBaseApi(verifyEmail,'',params).then((res) =>{
                    
                    if(res.code==10014){//只有此种情况才允许绑定邮箱
                        let objParams;
                        if(this.ssoPhone){
                              objParams = this.$store.state.app.bandPhoneObj;
                        }else if(this.ssoEmail){
                              objParams = this.$store.state.app.bandEmail;
                        }
                        this.SSOpostRequest(objParams,this)
                    }else if(res.code&&res.code!==10014){// 其他错误情况，比如参数错误，邮箱格式错误
                        this.$emit('sendCick',this.$t(res.code))
                    }else{//邮箱已经存在了，不允许绑定，提示给用户
                        this.$emit('sendCick',this.$t(11002))
                    }
                })
            },
             phonePostVerifyMethod(valiateParams){// 验证手机是否存在
                let params = {
                    "phone":this.$store.state.app.bandPhoneObj.phone,
                }
                postBaseApi(userVerify,'',params).then((res) =>{
                    if(res.code==10014){//只有此种情况才允许绑定邮箱,手机不存在
                        let objParams;
                        if(this.ssoPhone){
                            objParams = this.$store.state.app.bandPhoneObj;
                        }else if(this.ssoEmail){
                            objParams = this.$store.state.app.bandEmail;
                        }
                        this.SSOpostRequest(valiateParams,this);

                    }else if(res.code&&res.code!==10014){//其他错误情况，比如参数错误，手机格式错误
                        this.$emit('sendCick',this.$t(res.code));
                         if(this.ipCountry=='中国'){
                            this.initRobot()//注册失败后是实利化人机验证
                        }else{
                             grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                        }
                    }else{//手机已经存在了，不允许绑定，提示给用户
                        this.$emit('sendCick',this.$t(11003));
                        if(this.ipCountry=='中国'){
                            this.initRobot()//注册失败后是实利化人机验证
                        }else{
                             grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                        }
                    }

                })
            }
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            }
        },
        watch:{
            languageChange(val,olaVal){
                    if(this.ssoEmail||this.tradePassEmail){
                        //切换语言的实利化了人际验证，导致点击发送的时候弹出了人机验证，这样是错误的
                    }else{
                      this.initRobot()  //这个地方才需要实力化人机验证
                  }
                
            }
        },
        mounted() {
            this.ipQueryFun();
            //  console.log('ccc',this.robotDiv)
            if(this.ssoEmail||this.tradePassEmail){
              
            }else{
                this.initRobot()
                
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
        border: none;
    }
    .newBtn{
            width:90px;
            height:44px;
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