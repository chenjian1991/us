<template>
    <div id="activeEmail" class="root">
        <div class="wrapper">
            <div class="title">
                <img src="../../assets/images/footer/foot-logo.png" alt="">
            </div>
            <div class="mail-box">
                <div class="content">
                    <p class="tips">
                         <Icon  class="success" type="md-checkmark-circle" />
                        {{$t('registerSucccess')}}
                    </p>
                    <div class="not-arrive">
                        <router-link to='/login'> {{$t('HomeSignin')}}</router-link>
                    </div>
                </div>
            </div>
            <div>
                <p class="d-flex justify-content-around mt-3">
                    <a target="_blank" class="text-white" download="../../../public/Terms.docx" href="https://www.tresso.com/Terms.docx">User Agreement</a>
                    <a target="_blank" class="text-white" download="../../../public/Privacy.docx" href="https://www.tresso.com/Privacy.docx">Privacy Policy</a>
                </p>
             </div>
            

        </div>
        <Modal :modal='showModal' :text="text"></Modal>
    </div>
</template>

<script>
import {activationEmail} from '../../../api/urls.js';
import {getApi,postBaseApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import {getUrlKey,getBrowserMessage} from '@/lib/utils.js'
    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
            return {
                showModal:false,
                text:'',
                emailName:'',
                whichSite:'',
                deviceObj:{}
            }

        },
        methods:{
            gotoSite(){
            
                let param = {
                    "email": getUrlKey('email').replace(/(\")/g, ""),
                    "activationCode": getUrlKey('code').replace(/(\")/g, ""),
                    "deviceType": "WEB",
                    "deviceCode": this.deviceObj.browserVersion
                    }
                 postBaseApi(activationEmail,{},param).then((res) => {
                        if(res.result){
                        this.$Notice.success({
                           title:this.$t(11001),
                           desc:this.$t(11001)
                     });
                    }
                    }).catch((error)=>{

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
            this.deviceObj = getBrowserMessage();
            this.gotoSite()

            console.log(this.deviceObj)
        },

      
        
        
    }
</script>
<style lang='less'>
    html{
         min-height:100vh;
         body{
            min-height:100vh;
            #activeEmail{
             min-height:100vh;
            }
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


</style>
<style scoped lang="less">
    
    @import './activeEmail.less';
</style>

<style lang='less'>
    @import './mediaLogin.less';
</style>
