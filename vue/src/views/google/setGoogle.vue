<template>
    <div id="googlepage" class="root">
        <div class="wrapper">
            <div class="google-content">
                <div class="title">
                   <router-link to='/safeCenter'>{{$t('ggyzMAcountSecurity')}}</router-link> 
                   <router-link to='/safeCenter'>{{$t('ggyzMGoogleAuthentication')}}</router-link>
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
                                             <p>{{qrCodeString}}</p>
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
            
            bindGoogleMthod(){
                let params = {
                        "secretKey":this.qrCodeString ,
                        "password":this.formValidate.passwordNumber,
                        "googleCode":this.formValidate.googleNumber
                    }
                    postHeaderTokenBodyApi(bindGoogle,Cookies.get('loginToken'),params).then((res)=>{
                        let result = res.result;
                        if(result==true){
                            this.$router.push('/safeCenter')
                        }else if(res.code){
                            this.showModal = !this.showModal;
                            this.text = this.$t(res.code);
                            this.loaded = true;
                        }
                    }).catch((error)=>{
                        console.log('error')
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
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){
            this.getQrcode()
        },
     
        
        
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
                .ivu-tabs-nav{
            width: 100%;
            .ivu-tabs-tab{
                width: 25%;
                text-align: center;
                color: #AAB0CC;
                font-size: 14px;
                border-radius: 0px;
                background: #1C235C;
                border:none;
                border-right: 1px solid #2A3B7A;
                margin-right: 0px;
                &:nth-child(1){
                    border-left: none;
                }
            }
        }
        .ivu-tabs-bar{
            border-bottom: 1px solid #2A3B7A;
        }
        .ivu-tabs-tab-active{
            background: #3F53A6 !important;
            border-right: none !important;
            border-left: none !important;
           div{
               span{
                   color: #FEFEFF;
               }
           }
        }
        .ivu-form{
            margin: 0 auto;
            .ivu-input{
                padding-left: 10px;
                width: 400px;
            }
        } 



        }
</style>

<style scoped lang="less">
    @import './setGoogle.less';
</style>


