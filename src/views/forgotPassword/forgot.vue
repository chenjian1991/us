<template>
    <div id="forgotpassword" class="root">
        <Modal
            class-name="vertical-center-modal"
            v-model="robotModalflag"
            :title="this.$t('yanzheng')"
            :mask-closable="false"
            :scrollable='true'
            
            >
            <div id="robotForgotpwd"></div>
            <p slot="footer"></p>
        </Modal>
        <div class="wrapper">
            <div class="register_wraper">
                <div class="inner_input_login">
                    <div class="login_title">
                        <h2>{{$t('zhmmResetPassword')}}</h2>
                        <p>{{$t('zhmmResetExplain')}}</p>
                    </div>
                     <Form onsubmit="return false;" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                            <Input v-model="formValidate.phoneNumber" :placeholder="$t('zhmmInputAccount')"></Input>
                        </FormItem>
                        <Button v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t('zhmmResetSubmit')}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                        <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                         <div id="captcha"></div>
                    </Form>
                    
                </div>
            </div>

        </div>
        <ModalTips :modal='showModal' :text="text"></ModalTips>


    </div>
</template>

<script>
import {login,userInfo,userVerify,verifyEmail,ipQuery} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApiLoin} from '../../../api/axios.js';
import ModalTips from '@/components/Modal';


    export default {
        name:'login',
        components:{
            ModalTips
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
            return {
                empty:true,
                formValidate:{
                    phoneNumber:'',
                },
                showModal:false,
                loaded:true,
                text:'',
                captchaIns:'',
                robotModalflag:false,
                googleID:'',
                ipCountry:'',
                ruleValidate: {
                    phoneNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.loaded = false;
                        this.empty = false;
                        let acountNumber  = this.formValidate.phoneNumber;
                         if(acountNumber.indexOf('@')!==-1){//邮箱登录
                            if(this.ipCountry=='中国'){
                                this.captchaIns && this.captchaIns.popUp()
                            }else{
                                this.robotModalflag = true;
                            }
                         }else{
                              this.postUserVrify()
                         }


                    } else {
                        //this.$Message.error('Fail!');
                    }
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
                        if(data){
                            let value = document.getElementsByName('NECaptchaValidate')[0].value;
                            _that.requestGoogleFunEmail(value,'wangyi')
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
                console.log(grecaptcha)
                if(grecaptcha){
                    console.log('true')
                    let widgetId=grecaptcha.render('robotForgotpwd', {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        if(data.length!==0){
                            _that.requestGoogleFunEmail(data,'google')
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
                }else{
                    this.ipCountry='美国'
                }
                

            },
            ipQueryFun(){//ip所在国家查询
                getApiLoin(ipQuery,'').then((res)=>{
                    if(res.resultcode==200){
                        this.ipCountry = res.result.Country;
                        if(this.ipCountry=='中国'){

                         }else{//只有非中国的时候才实例化谷歌都方法
                            this.onloadCallback();
                         }
                    }else{
                        this.ipCountry='美国'//ip查询失败的时候默认中国
                    }
                }).catch((error)=>{//当ip获取失败都时候默认是中国
                    console.log('errorrrrr')
                    this.ipCountry='美国'// 请求超时的还是把ip写死中国
                })
            },
            postUserVrify(){//验证手机是否存在
                let phoneNumber = this.formValidate.phoneNumber;
                let phone = {
                    'phone':phoneNumber
                }
                   postBaseApi(userVerify,{},phone).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                         this.loaded = true;
                    }else{
                        localStorage.setItem('googleFlag',res.isBindingGoogle);
                        localStorage.setItem('phoneNumber',res.phone);
                        localStorage.setItem('userNumer',this.formValidate.phoneNumber);
                        localStorage.setItem('ex55pin',res.ex55Pin);
                        localStorage.setItem('emailFlag',res.email);
                        this.$router.push('/safeVatification');
                    }
                    

                }).catch((error)=>{
                    this.loaded = true;
                })
            },
            requestGoogleFunEmail(value,validType){//验证邮箱是否存在
                let emailNumber = this.formValidate.phoneNumber;
                let email = {
                    'email':emailNumber,
                    captchaValidateStr:value,
                    captchaValidateType:validType,
                }
                postBaseApi(verifyEmail,{},email).then((res) =>{
                    if(res.code){
                        if(this.ipCountry=='中国'){
                            this.initRobot()//注册失败后是实利化人机验证
                        }else{
                            grecaptcha.reset(this.googleID);//注册失败后是实利化人机验证
                        }
                        this.showModal = !(this.showModal);
                        this.text = this.$t(res.code);
                        this.loaded = true;

                    }else{
                        localStorage.setItem('googleFlag',res.isBindingGoogle);
                        localStorage.setItem('phoneNumber',res.phone);
                        localStorage.setItem('userNumer',this.formValidate.phoneNumber);
                        localStorage.setItem('ex55pin',res.ex55Pin);
                        localStorage.setItem('emailFlag',res.email);
                        this.ex55Pin = res.ex55Pin;
                        this.$router.push('/safeVatification');
                    }
                    

                }).catch((error)=>{
                        this.loaded = true;
                })

            },



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
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){
                this.initRobot()
                // /this.onloadCallback();
                this.ipQueryFun()
        },
        beforeMount(){
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
        }
        
        
    }
</script>
<style lang='less'>
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
        display: -ms-flexbox;
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
            border-radius: 0px;
            border:solid 1px #293B47;
            background: #13222B;
            border-radius: 5px;
            font-size: 14px;
            color:#fff;
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
    @import './forgot.less';
</style>


