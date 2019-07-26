<template>
    <div id='whyus'>
            <!-- Hero Section -->
<div id="SVGwave1BottomSMShape" class="svg-preloader position-relative bg-light overflow-hidden">
        <div class="container space-3">
          <div class="w-md-80 w-lg-60 text-center mx-auto">
            <h1 class="display-4 space-top-md-2 font-size-md-down-3 text-primary">Why Us?</span></h1>
          </div>
        </div>
      
        <!-- SVG Background -->
        <!-- <figure class="position-absolute right-0 bottom-0 left-0">
          <img class="js-svg-injector" src="../../assets/images/headertoggle/wave-1-bottom-sm.svg" alt="Image Description"
               data-parent="#SVGwave1BottomSMShape">
        </figure> -->
        <!-- End SVG Background Section -->
      </div>
      <!-- End Hero Section -->

  <!-- ========== MAIN ========== -->
  <main id="content" role="main" class="svg-preloader">
    <!-- Privacy Section -->
    <div class="container  space-top-md-2 space-bottom-2 overflow-hidden">
      <div class="w-lg-80 mx-lg-auto">
        <div class="card shadow-sm">

          <!-- Content -->
          <div class="card-body p-7 p-md-9">
            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Deep Pool of Liquidity</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Smart aggregation of orders in all currencies and coins. Using our GBBO order routing engine allows us to provide world class liquidity with the best spread and execution available.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Premium Coin Selection</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>55 Trade only lists coins and tokens, which pass our stringent diligence process. We believe that quality outweighs quantity, especially when it comes to providing value to our customers.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Unparalleled Security</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Delivered by multi level authentication, aggressive network surveillance and cold wallet.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Real-Time onboarding</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>We take KYC/AML very seriously. Our intent is to allow you to trade in no-time because we use OCR technology, and soon to launch facial recognition, to instantly verify your identity and allow you to start trading asap. </p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">White glove service</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>You trust us with your assets and we take that seriously, so we have real people in customer support and not just chat bots. We believe the difference between the ordinary and extraordinary is that little ‘extra’.</p>
                    <!-- End Text -->
             </div>

             <div class="mb-7">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">Aggregated pricing and execution</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>Our GBBO Engine (Global Best Bid and Offer), connects all major providers from Crypto to FX, allowing us to provide the best top of book pricing available from our network.</p>
                    <!-- End Text -->
             </div>
             <div class="mb-7">
                    <!-- Text -->
                    <a href=""><p>Learn more about our management team.</p></a>
                    <!-- End Text -->
             </div>
          </div>
          <!-- End Content -->
        </div>
      </div>
    </div>
    <!-- End Privacy Section -->

    <!-- SVG Background Shapes - Left Side -->
    <div class="w-25 content-centered-y left-0 z-index-n1 mt-9">
            <!-- <figure class="ie-circle-1">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/circle-1.svg" alt="Image Description"
                   data-parent="#content">
            </figure> -->
          </div>
          <!-- End SVG Background Shapes - Left Side -->
      
          <!-- SVG Background Shapes - Right Side -->
          <div class="w-35 content-centered-y right-0 z-index-n1 mt-n9">
            <!-- <figure class="ie-bg-elements-4">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/bg-elements-4.svg" alt="Image Description"
                   data-parent="#content">
            </figure> -->
          </div>
          <!-- End SVG Background Shapes - Right Side -->
      
          <!-- SVG Background Shapes -->
          <div class="position-absolute right-0 bottom-0 left-0 z-index-n1">
            <!-- <figure class="ie-bg-elements-3">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/bg-elements-3.svg" alt="Image Description"
                   data-parent="#content">
            </figure> -->
          </div>
          <!-- End SVG Background Shapes -->
  </main>
  <!-- ========== END MAIN ========== -->
    </div>
</template>

<script>
import {login,userInfo,userVerify,verifyEmail,loginHistory,hashUrl,socialToken,ipQuery} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
import Modaltips from '@/components/Modal';
import { duration } from 'moment';
import {setCookies} from '@/config';
import {getUrlKeyandEncode} from '@/lib/utils.js';
import {getCommouityBaseURL} from '../../config/index.js';
import { setTimeout } from 'timers';

    export default {
        name:'login',
        components:{
            Modaltips,
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
                // googleRobotFlag:true,
                text:'',
                responseSocialToken:'',
                domain:'',
                fromSocial:'',
                robotModalflag:false,
                ipCountry:'',
                googleID:"",
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
             console.log( this.previousRouterName);
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
                                "userClientInfo":{
                                    "deviceModel":"MI 2S",
                                    "deviceId": "xxxsllsj",
                                    "resolution":"1920*1080",
                                    "os":"Android",
                                    "netType":"4G",
                                    "operator":"China Mobile"
                                    }
                            }
                         }else{
                              params = {
                                "phone":this.formValidate.phoneNumber,
                                "password":this.hashFlag?this.setSha(this.formValidate.password):this.formValidate.password,
                                "codeType":"PHONE",
                                "userClientInfo":{
                                    "deviceModel":"MI 2S",
                                    "deviceId": "xxxsllsj",
                                    "resolution":"1920*1080",
                                    "os":"Android",
                                    "netType":"4G",
                                    "operator":"China Mobile"
                                    }
                            }
                         }
                            // this.paramsObj = params;
                            //  this.captchaIns && this.captchaIns.popUp()
                         if(this.ipCountry=='中国'){
                            //  console.log('中国')
                              this.paramsObj = params;
                             this.captchaIns && this.captchaIns.popUp()
                         }else{
                            //  console.log('外国')
                            this.paramsObj = params;
                            this.robotModalflag = true;
                         }
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
            ipQueryFun(){//ip所在国家查询
                getApi(ipQuery,'').then((res)=>{
                    if(res.resultcode==200){
                        this.ipCountry = res.result.Country;
                        if(this.ipCountry=='中国'){
                             
                         }else{//只有非中国的时候才实例化谷歌都方法
                                this.onloadCallback();
                         }
                        // console.log('uuu',this.ipCountry)
                    }else{
                        this.onloadCallback();//当ip获取失败都时候默认是谷歌验证
                        this.ipCountry = '';//查询失败
                    }
                })
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
        gotoSocial(loginToken){//拿登陆token去换取social token
              if(loginToken){//登陆了
                  postHeaderTokenBodyApi(socialToken,loginToken,{}).then((res)=>{
                         this.responseSocialToken = res.token;
                         window.location.href= this.domain+'api/v1/memberinterface'+'/'+this.responseSocialToken+'/'+this.fromSocial;
                  }) 
              }else{
              
              }
         },
            gitlogHistory(token){//登录历史接口
                  postHeaderTokenBodyApi(loginHistory,token,{}).then((res) =>{
                    let loginHistory = res.length;
                    if(loginHistory==1){//首次登录
                          this.$store.commit('CHANGEFIRSTLOGIIN',true);
                        //   this.$router.push('/home');  
                        let arr = ['resetNewpass','newPassword','activeEmail','register','login','','null'];
                        if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                            this.$router.push('/safeCenter')
                        }else{
                             this.$router.go(-1)
                        }
                    }else{//非首次登录
                          this.$store.commit('CHANGEFIRSTLOGIIN',false);
                        let arr = ['resetNewpass','newPassword','activeEmail','register','login','','null'];
                        if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                            this.$router.push('/safeCenter')
                        }else{
                             this.$router.go(-1)
                        }

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
            verifiyedMethod(value,validType){
                     let _that = this;
                     _that.loaded = false;
                    let captchaValidateStr = {
                        captchaValidateStr:value,
                        captchaValidateType:validType
                    }
                    let registerParams = Object.assign(_that.paramsObj,captchaValidateStr)// 对象组合
                    postBaseApi(login,{},registerParams).then((res) =>{// 成功之后调用登录接口
                    if(res.code){
                        if(this.ipCountry=='中国'){
                            this.initRobot()//注册失败后是实利化人机验证
                        }else{
                            grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                        }
                        _that.loaded = true;
                        if(res.code == '10044'){//用户未激活，则跳转到重新发送页面
                            let emailaddress = _that.formValidate.phoneNumber;
                            localStorage.setItem('emailAdderss',emailaddress);
                            setTimeout(() => {
                                _that.$router.push('/verfifyEmail');
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
                                localStorage.setItem('googleToken',res.token)
                                let acountNumber  = _that.formValidate.phoneNumber;
                                if(acountNumber.indexOf('@')!==-1){//邮箱登录
                                    _that.requestGoogleFunEmail()
                                }else{//手机登录
                                    _that.requestGoogleFun()
                                    
                                }
                        }else{//没有绑定谷歌验证直接登录
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
                        if(data){//网易人机验证通过
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                             _that.verifiyedMethod(value,'wangyi')
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
            onloadCallback(){
                let _that = this;
                // console.log("grecaptcha is ready!");
                let widgetId=grecaptcha.render('robot', {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        if(data.length!==0){
                            _that.verifiyedMethod(data,'google')
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
                    // console.log('ccc',widgetId)
                    _that.googleID = widgetId;
                    return widgetId;

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
                        if(this.fromSocial=='null'){//说明是从social跳过来的
                                this.$router.push('/google');
                        }else{
                             this.$router.push({
                                    path:'/google',
                                    query:{
                                        fromSocial:this.fromSocial
                                    }
                                })
                        }
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
                         if(this.fromSocial=='null'){
                                this.$router.push('/google');
                        }else{//说明是从social跳过来的
                             this.$router.push({
                                    path:'/google',
                                    query:{
                                        fromSocial:this.fromSocial
                                    }
                                })
                        }
                    }
                    

                })

            },
              del(){
                    this.modal2 = false;
            },
            judgePCorMoble(){
                let u = navigator.userAgent;
                // console.log(u)
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {// 移动端
                    window.location.href='http://47.75.120.27:8030/mobile/#/login';
                } else {

                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    console.log(from)
                // 通过 `vm` 访问组件实例

                })
            }


        },
        computed:{
            inputValidate(){
               return this.formValidate.phoneNumber;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            previousRouterName(){
                return this.$store.state.app.routerHistory;
            }
            
        },
        watch:{
            languageChange(val,oldVal){
                this.initRobot()
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){
            //初始化为未登录状态
            // this.beforeRouteEnter()
            $.HSCore.components.HSSVGIngector.init('.js-svg-injector');
           this.$store.commit('changeLoingStatus',false)
           this.initRobot();
           this.fromSocial = getUrlKeyandEncode('socialback');
           this.domain = getCommouityBaseURL();
           this.ipQueryFun()

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


