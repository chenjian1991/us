<template>
    <div class="root">
        <div class="wrapper">
            <div class="safe_title">
                <router-link to='./safeCenter'>{{$t('aqzxTitle')}}</router-link>
            </div>
            <div class="safe_container">
                <div class="basic_message">
                    <h2>{{$t('basicInfo')}}</h2>
                    <ul>
                        <li>
                            <span>{{$t('accountNumber')}}</span>
                            <em v-if="phoneNumber" v-html="phoneNumber"></em>
                            <em v-if="!phoneNumber" v-html="email"></em>
                        </li>
                        <li>
                            <span>uid :</span>
                            <em v-html="uid"></em>
                        </li>
                    </ul>
                </div>
                <div class="safe_level">
                    <div class="level_left">
                        <h2>{{$t('aqzxSecurityLevel')}}</h2>
                        <div class="left_content">
                            <span v-if="Weak"  class="level_name">{{$t('weaklevel')}}</span>
                            <span v-if="Strong"  class="level_name">{{$t('Strong')}}</span>
                            <span v-if="GENERAL"  class="level_name">{{$t('geneallevel')}}</span>
                                <img :src="imgSrc" alt="">
                            <div>
                                <p>{{$t('recommended')}}</p>
                                <p>{{$t('higherSec')}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="level_right">
                         <h2>{{$t('aqzxPassword')}}</h2>
                        <div>
                            <ul>
                                <li>
                                    <span>{{$t('jymmLoginPassword')}}</span>
                                    <router-link to='/originLoginPassword'>{{$t('aqzxModify')}}</router-link>
                                    <!-- <a href="../../../../securityCenter/resetPassword.html">{{$t('aqzxModify')}}</a> -->
                                </li>
                                <li>
                                    <span class="trading_pass">
                                        <em>{{$t('jymmTradingPassword')}}</em>
                                       <Icon v-if="!tradingPassflag"  class="alert" type="md-alert" />
                                       <Icon  v-if="tradingPassflag" class="circle" type="md-checkmark-circle" />
                                    </span>

                                    <!-- <a v-if="!setTradingPassword" href="../../../../securityCenter/setTradingPassword.html">{{$t('aqzxset')}}</a>
                                    <a v-else href="../../../../securityCenter/setTradingPassword.html">{{$t('aqzxModify')}}</a> -->
                                    <router-link v-if="!setTradingPassword" to='/originTradePassword?origin=safecenter'>{{$t('aqzxset')}}</router-link>
                                    <router-link v-else to='/originTradePassword?origin=safecenter'>{{$t('aqzxModify')}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="verfification">
                    <h1 class="title">{{$t('aqzxRealName')}}</h1>
                    <div class="vertification_content">
                        <ul>
                            <li>
                                <span>
                                    <Icon v-if="!phoneNumber" class="alert" type="md-alert" />
                                    <Icon v-if="phoneNumber" class="circle" type="md-checkmark-circle" />
                                    <em>{{$t('aqzxPhoneNumber')}}</em>
                                </span>
                                <span v-html="phoneNumber"></span>
                                <span>{{$t('aqzxPhoneExplain')}}</span>
                                <span>
                                     <router-link v-if="!phoneNumber" :to="{path:'./bandPhone',query:{phoneFlag:0}}" >{{$t('aqzxset')}}</router-link>
                                     <!-- <router-link v-if="phoneNumber"  to='./bandEmail'>修改</router-link> -->
                                </span>
                            </li>
                             <li>
                                <span>
                                    <Icon v-if="!email" class="alert" type="md-alert" />
                                    <Icon v-if="email" class="circle" type="md-checkmark-circle" />
                                    <em>{{$t('aqzxEmail')}}</em>
                                </span>
                                <span v-html="email"></span>
                                <span>{{$t('aqzxPhoneExplain')}}</span>
                                <span>
                                     <router-link v-if="!email"  :to="{path:'./bandEmail',query:{emailFlag:0}}">{{$t('aqzxset')}}</router-link>
                                     <!-- <router-link v-if="email"   :to="{path:'./bandEmail',query:{emailFlag:1}}">修改</router-link> -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Icon v-if="!googleFlag" class="alert" type="md-alert" />
                                    <Icon v-if="googleFlag" class="circle" type="md-checkmark-circle" />
                                    <em>{{$t('aqzxGoogle')}}</em>
                                </span>
                                <span></span>
                                <span>{{$t('aqzxPhoneExplain')}}</span>
                                <span>
                                    <a v-if="!googleFlag" href="../../../../securityCenter/googleVertification.html">{{$t('aqzxset')}}</a>
                                    <a v-if="googleFlag" href="../../../../securityCenter/closeGoogleVertifiction.html">{{$t('aqzxclose')}}</a>
                                    <!-- <router-link v-if="!googleFlag" to='/setGoogle'>{{$t('aqzxset')}}</router-link>
                                    <router-link v-if="googleFlag" to='/closeGoogle'>{{$t('aqzxclose')}}</router-link> -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    <Icon v-if="iD" class="alert" type="md-alert" />
                                    <Icon v-if="checking" class="warning" type="md-alert" />
                                    <Icon v-if="passed" class="circle" type="md-checkmark-circle" />
                                    <em>{{$t('aqzxIdentity')}}</em>
                                </span>
                                <span></span>
                                <span>{{$t('aqzxPhoneExplaintwo')}}</span>
                                <span @click="seeRealNameDetailMethod"  class="seeRealNameDetail">
                                    {{$t('aqzxset')}}
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>


        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {userInfo,identify} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getHeaderTokenApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import Cookies from 'js-cookie'

    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
            return {
                empty:true,
                token:'',
                showModal:false,
                text:'',
                phoneNumber:'',
                email:'',
                uid:'',
                tradingPassflag:'',
                googleFlag:false,
                iD:false,//not set
                checking:false,
                passed:false,
                imgSrc:'',
                weaklevel:'w',
                sronglevel:'s',
                geneallevel:'m',
                Weak:false,
                Strong:false,
                GENERAL:false,
                identifyStatus:'',
                setTradingPassword:false



            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            getUserInfo(token){
                postHeaderTokenBodyApi(userInfo,token,{}).then((res) =>{
                    if(res.code){
                        this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                        this.text = this.$t(res.code);
                        if(res.code == '10013'){
                            this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                            this.text = this.$t(res.code);
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 2000);
                        }
                    }else{
                        let tradingPasswordFlag = res.isSetTradePasswrod;
                        this.setTradingPassword = tradingPasswordFlag;
                        
                        this.uid = res.ex55Pin;
                        this.phoneNumber  = res.phone;
                        this.email = res.email;
                        this.tradingPassflag = res.isSetTradePasswrod;
                        this.googleFlag = res.isBindingGoogle;
                        let level = res.securityLevel;
                        localStorage.setItem('email',this.email);
                        localStorage.setItem('phone',this.phoneNumber);
                        localStorage.setItem('google',this.googleFlag);
                        
                        localStorage.setItem('loginEx55Pin',this.uid);
                        localStorage.setItem('ifEmail',this.email);
                        localStorage.setItem('securitPhone',this.phoneNumber);
                        localStorage.setItem('ifsetgoogle',this.googleFlag);

                        if(level == "WEAK"){
                            this.imgSrc = require('../../assets/images/safety/Weak.png')
                            this.Weak = true;
                        }else if(level =="GENERAL"){
                            this.imgSrc = require('../../assets/images/safety/Medium.png')
                            this.GENERAL = true;
                        }else if(level =="STRONG"){ 
                            this.imgSrc = require('../../assets/images/safety/Strong.png')
                            this.Strong = true;
                        }

                    }
                    

                }).catch((res) =>{
                    console.log(res)
                })
            },
            getRealNameIdentify(token){
                getHeaderTokenApi(identify,{},token).then((res) =>{
                    let aa = res.data;
                    let identifyFlag = res.data.checkStatus;
                    this.identifyStatus = identifyFlag;
                    if(identifyFlag=='NOT_SET'){
                        this.iD = true;
                        this.checking = false;
                        this.passed = false;

                    }else if(identifyFlag == 'PASSED'){
                        this.iD = false;
                        this.checking = false;
                        this.passed = true;

                    }else if(identifyFlag =='CHECKING'){
                        this.checking = true;
                        this.iD = false;
                        this.passed = false;
                    }
                }).catch((res) =>{
                    console.log(res)
                })
            },
            seeRealNameDetailMethod(){
                  if(this.identifyStatus=='NOT_SET'){/*  */
                       // this.$router.push('/identiy')
                       window.location.href = "../../../../identityAuthentication/noAuthentication.html";
                    }else if(this.identifyStatus == 'PASSED'){
                        window.location.href = "../../../../identityAuthentication/passed.html";
                    }else if(this.identifyStatus =='CHECKING'){
                       window.location.href = "../../../../identityAuthentication/underReview.html";
                    }else if(this.identifyStatus=='FAILURE'){
                         window.location.href = '../../../../identityAuthentication/noPass.html';
                    }
            }

        
        
         

        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
                
            },
        },
        mounted(){
            this.getUserInfo(Cookies.get('loginToken'))
            this.getRealNameIdentify(Cookies.get('loginToken'))
            localStorage.setItem('curPage',0)//只有在安全中心页面设置0，才会在交易密码页面显示正确的发送验证码页面
        }
        
        
    }
</script>
<style scoped lang="less">
    @import './safeCenter.less';
</style>







