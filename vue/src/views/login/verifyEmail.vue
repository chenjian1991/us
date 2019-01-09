<template>
    <div class="root">
        <div class="wrapper">
            <div class="title">{{$t('VerifyEmail')}}</div>
            <div class="mail-box">
                <div class="content">
                    <p class="tips">{{$t('sendEmailto')}} <span class="font-bold" v-html="emailName"></span>. 
                        {{$t('emailSendclick')}}
                    </p>
                    <div v-if="arrive" @click="sendAgain" class="not-arrive">{{$t('emailDontArrive')}}</div>
                    <div v-else class="not-arrive resentemail">{{$t('emailreSend')}}</div>
                </div>
            </div>
            

        </div>
        <Modal :modal='showModal' :text="text"></Modal>
    </div>
</template>

<script>
import {reSendEmail} from '../../../api/urls.js';
import {postBaseApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import Cookies from 'js-cookie'


    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
            return {
                showModal:false,
                text:'',
                arrive:true,
                emailName:'',
                

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
            sendAgain(){
                this.arrive = false;
                setTimeout(() => {
                    this.arrive = true;
                }, 5000);
                let emailParam = {
                     "email":localStorage.getItem('emailAdderss'),
                     "language":localStorage.getItem('countryLanguage'),
                }
                postBaseApi(reSendEmail,{},emailParam).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                         if(res.code == '10045'){//已经激活成功，直接跳转登录页面
                             setTimeout(() => {
                                 this.$router.push('/login');
                             }, 3000);
                         }
                       
                    }else{
                        console.log(res)
                        // let ex55Pin = res.ex55Pin;
                        // localStorage.setItem('ex55Pin',ex55Pin)
                        // this.ex55Pin = ex55Pin;
                        // this.$router.push('/google');
                    }
                    

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
            console.log('aaa')
            //把头，脚，侧边栏隐藏的方法；
            // this.$store.commit('changeLeftCol',false);
            // this.$store.commit('changeHeaderPart',false);
            // this.$store.commit('changeFooterPart',false);
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
<style scoped lang="less">
    @import './verifyEmail.less';
</style>

<style lang='less'>
body{
    overflow: auto !important;
}
   // @import './mediaLogin.less';
</style>
