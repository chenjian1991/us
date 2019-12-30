<template>
    <div class="root">
        <div class="wrapper">
            <Modal
                    class-name="vertical-center-modal"
                    v-model="robotModalflag"
                    :title="this.$t('yanzheng')"
                    :mask-closable="false"
                    :scrollable='true'
                   
                   >
                    <div id="robotVerify"></div>
                    <p slot="footer"></p>
                </Modal>
            <div class="title">{{$t('VerifyEmail')}}</div>
            <div class="mail-box">
                <div class="content">
                    <p class="tips">{{$t('sendEmailto')}} <span class="font-bold" v-html="emailName"></span>. 
                        {{$t('emailSendclick')}}
                    </p>
                    <div v-if="arrive" @click="handleSubmit" class="not-arrive">Email didn't arrive?</div>
                    <div v-else class="not-arrive resentemail">{{$t('emailreSend')}}</div>
                </div>
            </div>
            

        </div>
    </div>
</template>

<script>
import {reSendEmail,ipQuery} from '../../../api/urls.js';
import {postBaseApi,getApiLoin} from '../../../api/axios.js';
import { debug } from 'util';
import {geeTest,onloadCallback} from '../../../api/usersystem.js'


    export default {
        name:'login',
        data() {
            return {
                arrive:true,
                emailName:'',
                ipCountry:'',
                captchaIns:'',
                robotModalflag:false,
                googleID:'',
                

            }

        },
      
        methods:{
            handleSubmit() {
                var _that = this;
                    this.robotModalflag = true;
                    onloadCallback('robotVerify',function(res){
                        if(res){
                        let emailParam = {
                                "domainCode": document.domain==='www.55com.io'?"china":'global',
                                "personType": "GOOGLE",
                                "personCode": res,
                                "email": localStorage.getItem('emailAdderss'),
                                "deviceType": "WEB"
                            }
                            _that.sendAgain(emailParam)
                            setTimeout(()=>{
                                _that.robotModalflag= false;
                            },2000)
                        }
                },function(err){
                        _that.robotModalflag = false;
                        _that.loaded = true
                },function(netError){
                        _that.robotModalflag = false;
                        _that.loaded = true
                })
            //    this.checkGeetest()
            },
            checkGeetest(){
                    geeTest('4f8eb91de0e6a7940cb7b9f63f260aa7','1',(data)=>{
                            let emailParam = {
                                    "domainCode": document.domain==='www.55com.io'?"china":'global',
                                    "personType": "GEETEST",
                                    "personCode": data,
                                    "email": localStorage.getItem('emailAdderss'),
                                    "deviceType": "WEB"
                                }
                                this.sendAgain(emailParam)
                    })
            },
            sendAgain(emailParam){
                postBaseApi(reSendEmail,{},emailParam).then((res) =>{
                     this.arrive = false;
                    setTimeout(() => {
                        this.arrive = true;
                    }, 5000);
                  
                }).catch((eror)=>{
                     
                })
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
            this.emailName = localStorage.getItem('emailAdderss')
        }
        
        
    }
</script>
<style lang='less'>
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    //  #app{
    //      height: 100%;
    //      background: #18183e;
    //  }
    .footerBox{
         flex: 0 0 auto;
     }


</style>
<style lang='less'>
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    //  #app{
    //      height: 100%;
    //      background: #18183e;
    //  }
    .footerBox{
         flex: 0 0 auto;
     }


</style>
<style scoped lang="less">
    @import './verifyEmail.less';
</style>

<style lang='less'>
body{
    overflow: auto !important;
}
    @import './mediaLogin.less';
</style>
