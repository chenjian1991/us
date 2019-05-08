<template>
    <div id="googlepage" class="root">
        <div class="wrapper">
            <div class="google-content">
                <div class="title">
                   <router-link to='/safeCenter'>{{$t('ggyzMAcountSecurity')}}</router-link> 
                   <router-link to=''>{{$t('ggyzMGoogleAuthentication')}}</router-link>
                </div>
                <div class="content">
                    <div class="content-title">
                        {{$t('ggyzMGoogleAuthentication')}}
                    </div>
                    <div class="inner-step">
                        {{$t('ggyzGoogleTip')}}
                    </div>
                    <div class="step-content">
                        <Tabs :animated='false' type='card' @on-click='currenttabChange'  v-model='currenttab'>
                            <TabPane :label="stepOne" name="1">
                                <div class="app-down">
                                    <div class="down-title">{{$t('ggyzDownloadAndInstall')}}</div>
                                    <div class="down-address">
                                        <div class="ios pull-left">
                                            <div class="ios-title">IOS</div>
                                            <div class="ios-description">{{$t('ggyzIOSMethod')}}</div>
                                            <div  class="clearfix img-container">
                                                <a target="_blank" href="https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8"> <img src="../../assets/images/google/APP-STORE.png" alt=""></a>
                                                <em  @mouseenter="showMth('ios')" @mouseleave="hideMth('ios')" class="scancode"></em>
                                                <img v-if="showPic" class="scanpic" src="../../assets/images/google/step-1.png" alt="">
                                            </div>
                                           
                                        </div>
                                         <div class="android pull-right">
                                            <div class="ios-title">Android</div>
                                            <div class="ios-description">{{$t('ggyzAndroidMethod')}}</div>
                                            <div  class="clearfix img-container">
                                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">  <img src="../../assets/images/google/Google-play.png" alt=""></a>
                                                <em  @mouseenter="showMth('android')" @mouseleave='hideMth("android")' class="scancode"></em>
                                                <img style="width:97px;height:98px;" v-if="showAdroindpic" class="scanpic android-pic" src="../../assets/images/google/android-google.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </TabPane>
                            <TabPane :label="stepTwo" name="2">
                                 <div class="step-two-content">
                                     <div class="steptwo-title">{{$t('ggyzUseAPPScan')}}</div>
                                     <div class="content">
                                         <div class="pull-left secrit-img">
                                             <!-- <div id="qrcode"></div> -->
                                              <vue-qr  :margin='3' :size='115' :text="QRCodeurl"></vue-qr>
                                         </div>
                                         <div class="pull-left Key">
                                             <p>{{$t('ggyzManuallyAPP')}}</p>
                                             <p>{{$t('ggyzProvidedKey')}}</p>
                                             <p style="color:#12869a">{{qrCodeString}}</p>
                                         </div>
                                     </div>
                                 </div>
                            </TabPane>
                            <TabPane :label="stepThree" name="3">
                                 <div class="step-two-content">
                                     <div class="steptwo-title">{{$t('ggyzSaveKeyOnPaper')}}</div>
                                     <div class="content">
                                         <div class="pull-left secrit-img key-img">
                                            {{qrCodeString}}
                                         </div>
                                         <div class="pull-left Key step-three-key">
                                             <p>{{$t('ggyzRecoverTip')}}</p>
                                             <p>{{$t('ggyzSupportTicket')}}</p>
                                         </div>
                                     </div>
                                 </div>
                            </TabPane>
                            <TabPane :label="stepFour" name="4">
                                    <div class="stepfour-title">{{$t('ggyzEnter6GA')}}</div>
                                <div class="step-four">
                                <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                                    <!-- 秘钥 -->
                                    <div class="clearfix">
                                        <div class="pull-left span-label">
                                            <span>{{$t("aqzxgooglekey")}}</span>
                                        </div>
                                        <FormItem class="form_item pull-left" prop='keyNumber'>
                                            <Input type="password" v-model="formValidate.keyNumber" :placeholder="$t('aqzxgoogleplaceholder')"></Input>
                                        </FormItem>
                                    </div>
                                    <!-- 登录密码 -->
                                     <div class="clearfix">
                                        <div class="pull-left span-label">
                                            <span>{{$t("aqzxloginpass")}}</span>
                                        </div>
                                        <FormItem class="form_item pull-left" prop='passwordNumber'>
                                            <Input type="password" v-model="formValidate.passwordNumber" :placeholder="$t('aqzxpasswordplaceholder')"></Input>
                                        </FormItem>
                                    </div>
                                    <!-- 谷歌验证 -->
                                    <div class="clearfix">
                                        <div class="pull-left span-label">
                                            <span>{{$t("googleCodenumCode")}}</span>
                                        </div>
                                        <FormItem class="form_item pull-left" prop='googleNumber'>
                                            <Input :maxlength="10" v-model="formValidate.googleNumber" :placeholder="$t('aqzxgooglecodeplaceholder')"></Input>
                                        </FormItem>
                                    </div>
                                 </Form>
                                 </div>
                            </TabPane>
                        </Tabs>
                        
                    </div>
                    <div class="footer-button">
                        <button class="pull-left" @click="prveStep">{{$t("ggyzPrevStep1")}}</button>
                        <button v-if="currenttab!=='4'" class="pull-right" @click="nextStep">{{$t("ggyzNextStep3")}}</button>
                        <button @click="handleSubmit('formValidate')" v-if="currenttab=='4'&&loaded==true" class="pull-right" >{{$t('ggyzEnableGA')}}</button>
                        <!-- <Button v-if="currenttab=='4'&&loaded==false" disabled loading class="loginbtn pull-right"  @click="handleSubmit('formValidate')" type="primary"></Button> -->

                    </div>
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {queryGoogleURL,bindGoogle} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import Cookies from 'js-cookie';
//import QRCode from 'qrcodejs2'//二维码
import VueQr from 'vue-qr'
    export default {
        name:'login',
        components:{
            Modal,
            VueQr
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
               const validateGoogle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('googleMust')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };
            return {
                empty:true,
                token:'',
                ex55Pin:'',
                captchaIns:'',
                loaded:true,
                paramsObj:{},
                formValidate:{
                    keyNumber:'',
                    passwordNumber:'',
                    googleNumber:'',
                },
                QRCodeurl:"",
                qrCodeString:"",
                showModal:false,
                text:'',
                currenttab:'1',
                ruleValidate: {
                    keyNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    passwordNumber: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    googleNumber:[
                        {validator:validateGoogle,trigger:'blur'}
                    ]

                    
                },
                stepOne: (h) => {
                    return h('div', [
                        h('span', this.$t('ggyzDownloadApp')),
                    ])
                },
                 stepTwo: (h) => {
                    return h('div', [
                        h('span', this.$t('ggyzScanQRCode')),
                    ])
                },
                 stepThree: (h) => {
                    return h('div', [
                        h('span', this.$t('ggyzBackupKey')),
                    ])
                },
                 stepFour: (h) => {
                    return h('div', [
                        h('span', this.$t('ggyzEnableGoogle')),
                    ])
                },
                showPic:false,
                showAdroindpic:false

            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.bindGoogleMthod()
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            currenttabChange(){
            },
            nextStep(){
                let currentInex = this.currenttab;
                if(currentInex==1){
                    this.currenttab='2'
                }else if(currentInex ==2){
                    this.currenttab = '3'
                }else if(currentInex==3){
                    this.currenttab = '4'
                }
            },
            prveStep(){
                let currentInex = this.currenttab;
                if(currentInex==4){
                    this.currenttab='3'
                }else if(currentInex ==3){
                    this.currenttab = '2'
                }else if(currentInex==2){
                    this.currenttab = '1'
                }
            },
            showMth(name)
            {
                if(name=='ios'){
                     this.showPic = true;
                }else{
                    this.showAdroindpic = true;
                }
            },
            hideMth(name){
                if(name=='ios'){
                    this.showPic = false;
                }else{
                    this.showAdroindpic = false;
                }
            },
            getQrcode(){
                postHeaderTokenBodyApi(queryGoogleURL,Cookies.get('loginToken'),{}).then((res)=>{
                    this.QRCodeurl = res.qrCode;
                    this.qrCodeString = res.secretKey;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = '::'+ sha256(passwrod)//要加密的密码
                return pw;
            },
            bindGoogleMthod(){
                let hashFlag;
                let hash = localStorage.getItem('hashFlag');
                if(hash=='true'){
                    hashFlag = true
                }else{
                    hashFlag = false;
                }
                let params = {
                        "secretKey":this.formValidate.keyNumber,
                        "password":hashFlag?this.setSha(this.formValidate.passwordNumber):this.formValidate.passwordNumber,
                        "googleCode":this.formValidate.googleNumber
                    }
                    postHeaderTokenBodyApi(bindGoogle,Cookies.get('loginToken'),params).then((res)=>{
                        let result = res.result;
                        if(result==true){
                            // this.showModal = !this.showModal;
                            // this.text = this.$t(11001);
                            this.$Message.success(this.$t(11001))
                            this.$router.push('/safeCenter');
                        }else if(res.code){
                            // this.showModal = !this.showModal;
                            // this.text = this.$t(res.code);
                            this.$Message.error(this.$t(res.code))
                            this.loaded = true;
                        }
                    }).catch((error)=>{
                        console.log('error')
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
            this.getQrcode()
        },
        created(){
            this.interFunc()
        }
     
        
        
    }
</script>
<style lang="less">
     #googlepage{
         .ivu-btn-primary[disabled]{
            color: #fff !important;
            background-color: #d1d3df !important;
        }
        .ivu-icon-ios-loading:before{
            font-size: 35px !important;
            font-weight:bold !important;
        }
        .ivu-btn>.ivu-icon{
            line-height:1 !important;
        }
        .ivu-form-item{
            margin-bottom: 24px !important;
        }
                .ivu-tabs-nav{
            width: 100%;
            .ivu-tabs-tab{
                width: 25%;
                text-align: center;
                color: #AAB0CC;
                font-size: 14px;
                border-radius: 0px;
                background: #E7EAED;
                border:none;
                border-right: 1px solid #d6dee1;
                margin-right: 0px;
                &:nth-child(1){
                    border-left: none;
                }
            }
        }
        .ivu-tabs-bar{
            border-bottom: none;
            span{
                color: #344857;
            }
        }
        .ivu-tabs-tab-active{
            background: #12869a !important;
            border-right: none !important;
            border-left: none !important;
           div{
               span{
                   color: #fff;
               }
           }
        }
        .ivu-form{
            margin: 0 auto;
            .ivu-input{
                padding-left: 10px;
                width: 400px;
                border: solid 1px #E7EAED;
                color: #344857;
                height: 48px;
                line-height: 48px;
                background: none;
                font-size: 14px;
            }
        } 

        }
</style>

<style scoped lang="less">
    @import './setGoogle.less';
</style>


