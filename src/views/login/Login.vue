<template>
    <div class="root">
        <div id="login" class="wrapper">
            <div class="register_wraper">
                <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    :title="this.$t('yanzheng')"
                    :mask-closable="false"
                    :scrollable='true'
                   
                   >
                    <div id="robotLogin"></div>
                    <p slot="footer"></p>
                </Modal>
                <div class="inner_input_login">
                    <div class="login_title">{{$t('dlWelcome')}}</div>
                     <Form ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg">
                            <Input class="isfocus_enter" v-model="formValidate.phoneNumber" :placeholder="$t('siginAcountPlaceholder')"></Input>
                        </FormItem>
                        <FormItem class="form_item" prop='password'>
                            <img src="../../assets/images/register/security.svg">
                            <Input class="isfocus_enter" type="password" v-model="formValidate.password" :placeholder="$t('signPasswordPlaceholder')"></Input>
                        </FormItem>
                         <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                         <div id="captcha"></div>
                        <Button v-if="loaded" class="loginbtn" @keydown.native.enter ="handleSubmit('formValidate')"  @click="handleSubmit('formValidate')" type="primary">{{$t('dlLogin')}}</Button>
                        <Button v-else disabled loading class="loginbtn" @keydown.native.enter ="handleSubmit('formValidate')"  @click="handleSubmit('formValidate')" type="primary"></Button>
                        
                    </Form>
                    
                     <div class="login_footer">
                            <router-link style="color:#51809F;" to='/forgot'>{{$t('dlForgot')}}</router-link>
                            <router-link style="color:#51809F;" to='/register'>{{$t('dlSignup')}}</router-link>
                    </div>
                  
                </div>
            </div>
        </div>
        <!-- <Modaltips :modal='showModal' :text="text"></Modaltips> -->
         <Modal  class="frozenModal"
                        v-model="modal3"
                        :closable="false"
                        :mask-closable="false"
                        >
                        <div class="header" slot="header">
                           <Icon class="warning"  type="md-alert"/>
                        </div>
                        <p>{{frozenReason}}</p>
                         <div slot="footer">
                            <Button type="primary" size="large"  @click="confirm">{{$t('confirmbtn')}}</Button>
                        </div>
                 </Modal> 
           <!-- <div v-if="modal2" class="alert dis-n">
                <div class="title"><i class="iconfont">&#xe604;</i></div>
                <div class="notice" name="syNotice">
                {{$t('usNotice')}}
                </div>
                <button @click="del">I GOT IT</button>
                <div class="spacer_10"></div>
            </div>
            <div v-if="modal2" class="mask dis-n"></div> -->
           


    </div>
</template>

<script>
import {login,userInfo,userVerify,verifyEmail,loginHistory,hashUrl,socialToken,ipQuery} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi,getApi,getApiLoin} from '../../../api/axios.js';

// import Modaltips from '@/components/Modal';
import { duration } from 'moment';
import {setCookies} from '@/config';
import {getCommouityBaseURL,clearLocalStorage} from '../../config/index.js';
import { debuglog } from 'util';
import {getUrlKeyandEncode} from '@/lib/utils.js'
import {getBrowserMessage} from "@/lib/utils.js"
import {geeTest} from '../../../api/usersystem.js'



    export default {
        name:'login',
         metaInfo(){
            return{
                title: this.pageTitle, // set a title
                meta: [{                 // set meta
                    name: 'keywords',
                    content:this.pageKeyword
                },{
                    name:'description',
                    content:this.pageDescription
                }],
            }
        },
        components:{
            // Modaltips
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
                 pageTitle:this.$t(this.$route.meta.title),
                pageKeyword : this.$t(this.$route.meta.keywords),
                pageDescription : this.$t(this.$route.meta.description),
                users:[],//特殊用户
                frozenReason:'',
                // empty:true,
                token:'',
                ex55Pin:'',
                captchaIns:'',
                modal2:false,
                modal3:false,
                loaded:true,
                paramsObj:{},
                formValidate:{
                    phoneNumber:'',
                    password:'',
                },
                hashFlag:false,
                showModal:false,
                text:'',
                fromSocial:undefined,
                robotModalflag:false,
                ipCountry:'',
                googleID:'',
                domain:'',
                responseSocialToken:'',
                deviceObj:{},
                fromSite:'',
                ruleValidate: {
                    phoneNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    
                },
                jiYanChallenge:'',
                queryStatusObj:{},
                loginObj:{}
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                            this.loaded = false;
                            this.checkGeetest()
                    } 
                })
            },
              checkGeetest(){
                    geeTest('95bf5aac7dc0c5e7adc943823b363fb2','2',(data)=>{
                            let params = {
                                "loginName": this.formValidate.phoneNumber,
                                "password": this.setSha(this.formValidate.password),
                                "personType":'GEETEST',
                                "personCode":data,
                                "deviceType": "WEB",
                                "deviceCode": this.deviceObj.browserVersion,
                                "deviceInfo":{
                                        "deviceModel":this.deviceObj.browserType,
                                        "resolution":this.deviceObj.windowWith,
                                },
                            }
                            this.loginFunc(params)
                    }).catch((error)=>{
                            this.loaded = true;
                    })
            },
            loginFunc(params){
                 clearLocalStorage();//每次登录成功之前都需要清楚所有token
                postBaseApi(login,{},params).then((res)=>{
                    this.loaded = true;
                    localStorage.setItem('deviceCode',this.deviceObj.browserVersion)
                    this.loginObj = res;
                    if(res.beforeToken){//绑定谷歌了
                        localStorage.setItem('loginGoogleUserId', res.userId)
                        localStorage.setItem('beforeToken',res.beforeToken)
                         if(this.fromSocial=='null'&&this.fromSite==undefined){//本站过来
                                this.$router.push('/google');
                            }else if(this.fromSite){//跳回来源页面
                                this.$router.push({
                                        path:'/google',
                                        query:{
                                            fromWhere:this.fromSite
                                        }
                                    })
                            } else{//跳回social
                                this.$router.push({
                                        path:'/google',
                                        query:{
                                            fromSocial:this.fromSocial
                                        }
                            })
                        }
                    }else{//没有绑定谷歌直接登录
                        setCookies(res.loginToken)
                        localStorage.setItem('loginUserId', res.userId)
                        this.$store.commit('changeLoingStatus',true)// 登录后把token 复制给 isLogin
                        this.$store.commit('CHANGEFIRSTLOGIIN',false);
                        this.$store.dispatch("getMarkSymbol");
                        if(this.fromSocial=="null"&&this.fromSite==undefined){//既不是social也不是ato
                        let router = this.previousRouterName;
                        let arr = ['resetNewpass','newPassword','activeEmail','register','verfifyEmail','login',null,'','forgot','NewLoginpwd','google','safeVatification','login'];
                        if(arr.indexOf(this.previousRouterName)!==-1){//说明找到了
                            this.$router.push('/home')
                        }else{
                            this.$router.go(-1)
                            
                        }
                        }else if(this.fromSite){//如果是ato
                            this.$router.push(this.fromSite)
                        }else{//如果是social
                            this.gotoSocial(token)
                        }
                       
                    }
                }).catch((error)=>{
                    this.loaded = true;
                    if(error.data.code==="Cx000024"){
                        this.$router.push('/verfifyEmail')
                    }
                })
            },
            confirm(){
                this.modal3 = false;
            },
            setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
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
                 this.$refs.formValidate.resetFields();
                this.pageTitle = this.$t(this.$route.meta.title)
                this.pageKeyword = this.$t(this.$route.meta.keywords)
                this.pageDescription = this.$t(this.$route.meta.description)
            },
        },
        mounted(){
            this.deviceObj = getBrowserMessage();
            this.fromSite = this.$route.query.fromWhere;
           this.$store.commit('changeLoingStatus',false)
           this.fromSocial = getUrlKeyandEncode('socialback');
           this.domain = getCommouityBaseURL();
           console.log('adddd')
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
						if (key == 13) {
							_this.handleSubmit('formValidate') //此方法是当按下enter键后要做的动作。
						}
						
            }
        },
      
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
      .frozenModal{
         .header{
             .warning{
                color:#ff9c00;
                  font-size: 30px;
             }
             text-align: center;
         }
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
