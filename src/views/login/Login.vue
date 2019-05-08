<template>
    <div class="root">
        <div id="login" class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">{{$t('dlWelcome')}}</div>
                     <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                            <Input class="isfocus_enter" v-model="formValidate.phoneNumber" :placeholder="$t('siginAcountPlaceholder')"></Input>
                        </FormItem>
                        <FormItem class="form_item" prop='password'>
                            <img src="../../assets/images/register/security.svg" alt="">
                            <Input class="isfocus_enter" type="password" v-model="formValidate.password" :placeholder="$t('signPasswordPlaceholder')"></Input>
                        </FormItem>
                         <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                         <div id="captcha"></div>
                        <Button v-if="loaded" class="loginbtn" @keydown.native.enter ="handleSubmit('formValidate')"  @click="handleSubmit('formValidate')" type="primary">{{$t('dlLogin')}}</Button>
                        <Button v-else disabled loading class="loginbtn" @keydown.native.enter ="handleSubmit('formValidate')"  @click="handleSubmit('formValidate')" type="primary"></Button>
                        
                    </Form>
                     <div class="login_footer">
                             <!-- <a href="../../../../login/forget.html">{{$t('dlForgot')}}</a> -->
                            <router-link style="color:#51809F;" to='/forgot'>{{$t('dlForgot')}}</router-link>
                            <router-link style="color:#51809F;" to='/register'>{{$t('dlSignup')}}</router-link>
                    </div>
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>
           <div v-if="modal2" class="alert dis-n">
                <div class="title"><i class="iconfont">&#xe604;</i></div>
                <div class="notice" name="syNotice">
                {{$t('usNotice')}}
                </div>
                <button @click="del">I GOT IT</button>
                <div class="spacer_10"></div>
            </div>
            <div v-if="modal2" class="mask dis-n"></div>


    </div>
</template>

<script>
import {login,userInfo,userVerify,verifyEmail,loginHistory,hashUrl} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import { duration } from 'moment';
import {setCookies} from '@/config'


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
                    let pattern =/[*]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('numberMust')))
                    }else{
                        
                    }
                    callback()
                }
            };
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
            return {
                empty:true,
                token:'',
                ex55Pin:'',
                captchaIns:'',
                modal2:false,
                loaded:true,
                paramsObj:{},
                formValidate:{
                    phoneNumber:'',
                    password:'',
                },
                hashFlag:false,
                showModal:false,
                text:'',
                ruleValidate: {
                    phoneNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.empty = false;
                         let acountNumber  = this.formValidate.phoneNumber;
                         let hashParams = {
                                account:acountNumber
                            }
                          getApi(hashUrl,hashParams).then((res)=>{//查询是否加哈希值
                                this.hashFlag = res.result;
                                 let params;
                            if(acountNumber.indexOf('@')!==-1){//邮箱登录
                              params = {
                                "email":this.formValidate.phoneNumber,
                                "password":this.hashFlag?this.setSha(this.formValidate.password):this.formValidate.password,
                                "codeType":"EMAIL",
                            }
                         }else{
                              params = {
                                "phone":this.formValidate.phoneNumber,
                                "password":this.hashFlag?this.setSha(this.formValidate.password):this.formValidate.password,
                                "codeType":"PHONE",
                            }
                         }
                            this.paramsObj = params;
                            this.captchaIns && this.captchaIns.popUp()
                        }).catch((error)=>{
                                this.$Message.error('server error')
                            })
                        
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            // getHashFlag(account){
            //     let params = {
            //         account:account
            //     }
            //     getApi(hashUrl,params).then((res)=>{
            //         this.hashFlag = res;
            //         console.log(res);
            //     })
            // },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
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
                          this.$router.push('/home');  

                    }else{//非首次登录
                          this.$store.commit('CHANGEFIRSTLOGIIN',false);
                         this.$router.push('/home');  
                    }
                    //请求自选的币种
                    this.$store.dispatch("getMarkSymbol");

                }).catch((res) =>{
                    console.log(res)
                    this.loaded=true;
                })
            },
            removeALLtoken(){
                    localStorage.removeItem("ACCOUNT_TOKEN");
                    localStorage.removeItem("ORDER_TOKEN");
                    localStorage.removeItem("ASSET_TOKEN");
                    localStorage.removeItem("UTIL_TOKEN");
                    localStorage.removeItem("accountId");
                    localStorage.removeItem("ACCOUNT_SESSION");
                    localStorage.removeItem("ORDER_SESSION");
                    localStorage.removeItem("ASSET_SESSION");
                    localStorage.removeItem("orderTicket");
                    localStorage.removeItem("googleFlag");
                    localStorage.removeItem("phoneNumber");
                    localStorage.removeItem("userNumer");
                   // localStorage.removeItem("ex55pin");  不能删除
                    localStorage.removeItem("emailFlag");
                    localStorage.removeItem("ifEmail");
                    localStorage.removeItem("ifsetgoogle");
                    localStorage.removeItem("isSetTradePasswrod");
                    localStorage.removeItem("securitPhone");
                    localStorage.removeItem("curPage");
                    localStorage.removeItem("Emailtoken");
                    localStorage.removeItem("phoneToken");
            },
            initRobot(){
                let _that = this;
                let captchaIns;
                if (captchaIns) {
                    captchaIns.destroy()
                }
                let lan = this.$store.state.app.countryLanguage;
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
                     onClose: function () {
                        // 弹出关闭结束后将会触发该函数
                        // console.log('close')
                        // _that.loaded = true;
                    },
                    onVerify: function (err, data) {
                        if(err){
                        //
                        }
                        if(data){
                            _that.loaded = false;
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                            let captchaValidateStr = {
                                captchaValidateStr:value
                            }
                            let registerParams = Object.assign(_that.paramsObj,captchaValidateStr)// 对象组合
                            postBaseApi(login,{},registerParams).then((res) =>{// 成功之后调用登录接口
                            if(res.code){
                                _that.initRobot()
                                _that.loaded = true;
                                if(res.code == '10044'){//用户未激活，则跳转到重新发送页面
                                  let emailaddress = _that.formValidate.phoneNumber;
                                  localStorage.setItem('emailAdderss',emailaddress);
                                    setTimeout(() => {
                                        _that.$router.push('/verfifyEmail')
                                    }, 1500);
                                }else if(res.code == '10047'){//美国ip登录提示
                                    _that.modal2 = true;
                                    return false;
                                }
                                _that.showModal = !(_that.showModal);//！取非解决了弹出只谈一次的bug
                                _that.text = _that.$t(res.code);
                                
                            }else{//如果绑定了谷歌验证码
                                localStorage.setItem('userAccount',_that.formValidate.phoneNumber)
                                localStorage.setItem('hashFlag',_that.hashFlag);
                                let needGoogle = res.needGoogleCode;
                                if(needGoogle){
                                    //_that.loaded = true;
                                    localStorage.setItem('googleToken',res.token)
                                       let acountNumber  = _that.formValidate.phoneNumber;
                                        if(acountNumber.indexOf('@')!==-1){//邮箱登录
                                            _that.requestGoogleFunEmail()
                                        }else{//手机登录
                                             _that.requestGoogleFun()
                                            
                                        }



                                }else{//没有绑定谷歌验证直接登录
                                    //_that.loaded = true;
                                    let token = res.token;//没有绑定谷歌的情况下token才是登录token
                                    setCookies(token)
                                     _that.getUserInfo(token)
                                     _that.gitlogHistory(token);
                                    _that.$store.commit('changeLoingStatus',true)// 登录后把token 复制给 isLogin
                                    _that.removeALLtoken();//每次登录成功之后都需要清楚所有token
                                }
                               
                            }
                         }).catch((res)=>{//500
                            _that.initRobot()
                            _that.loaded = true;
                         })

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
            requestGoogleFun(){//绑定手机的验证
                let phoneNumber = this.formValidate.phoneNumber;
                let phone = {
                    'phone':phoneNumber
                }
                postBaseApi(userVerify,{},phone).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                    }else{
                        let ex55Pin = res.ex55Pin;
                        localStorage.setItem('ex55Pin',ex55Pin)
                        this.ex55Pin = ex55Pin;
                        this.$router.push('/google');
                    }
                    

                })

            },
             requestGoogleFunEmail(){//绑定邮箱的验证
                let emailNumber = this.formValidate.phoneNumber;
                let email = {
                    'email':emailNumber
                }
                postBaseApi(verifyEmail,{},email).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                    }else{
                        let ex55Pin = res.ex55Pin;
                        localStorage.setItem('ex55Pin',ex55Pin)
                        this.ex55Pin = ex55Pin;
                        this.$router.push('/google');
                    }
                    

                })

            },
              del(){
                    this.modal2 = false;
            },
            judgePCorMoble(){
                let u = navigator.userAgent;
                console.log(u)
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {// 移动端
                    window.location.href='http://47.75.120.27:8030/mobile/#/login';
                } else {

                }
            }


        },
        computed:{
            inputValidate(){
               return this.formValidate.phoneNumber;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            
        },
        watch:{
            languageChange(val,oldVal){
                this.initRobot()
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){
            //初始化为未登录状态
           this.$store.commit('changeLoingStatus',false)
           this.initRobot();
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
            // this.judgePCorMoble()
        },
        beforeCreate(){
            
           
        }
        
        
    }
</script>
<style lang='less'>
.ivu-btn-primary[disabled]{
    color: #fff !important;
    background-color: #d1d3df !important;
}
.ivu-icon-ios-loading:before{
    font-size: 20px !important;
    font-weight:bold !important;
}
.ivu-btn>.ivu-icon{
    line-height:1 !important;
}
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
     #login{
           .inner_input_login{
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            font-size: 14px;
            color:#fff;
            border:1px solid #293B47;
            border-radius: 5px;
            background: #13222B;
            
        }
         .ivu-form-item-error{
                .ivu-input{
                    border: 1px solid #CF424E;
                }
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
