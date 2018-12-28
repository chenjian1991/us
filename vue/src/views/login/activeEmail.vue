<template>
    <div class="root">
        <div class="wrapper">
            <div class="title">
                <img src="../../assets/images/footer/foot-logo2.svg" alt="">
            </div>
            <div class="mail-box">
                <div class="content">
                    <p class="tips">
                         <Icon  class="success" type="md-checkmark-circle" />
                        {{$t('registerSucccess')}}
                    </p>
                    <div class="not-arrive"><router-link to='/login'>{{$t('HomeSignin')}} </router-link></div>
                </div>
            </div>
            

        </div>
        <Modal :modal='showModal' :text="text"></Modal>
    </div>
</template>

<script>
import {activationEmail} from '../../../api/urls.js';
import {getApi} from '../../../api/axios.js';
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
                emailName:'',
                whichSite:''
            }

        },
        methods:{
            getUrlParams(name){
                    let after = window.location.hash.split("?")[1];
                    if(after)
                    {
                        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                        var r = after.match(reg);
                        if(r != null) { 
                            return  decodeURIComponent(r[2]);
                        }
                        else  {
                            return '';
                        }

                    }

            },
            gotoSite(){
                if(!this.getUrlParams('code')){
                    return false;
                }
                let codeParams = this.getUrlParams('code').replace(/(\")/g, "");//去掉url中的引号；
                let url = activationEmail+'/'+codeParams;
                getApi(url,{}).then((res)=>{
                      if(res.code){
                        this.showModal = !this.showModal;
                        this.text = this.$t(res.code);
                        setTimeout(() => {  
                            //window.location.href = "https://www.55.com/#/login";
                            this.$router.push('login')
                        }, 5000);
                    }else{//请求成功跳转不同的站
                        this.showModal = !this.showModal;
                        this.text = this.$t(11001);
                        // let fromSite = res.fromSite;
                       
                        // if(fromSite==null||fromSite ==""||fromSite=="B"||fromSite=='null'){
                        //     this.whichSite = "B";
                        // }else{
                        //     this.whichSite = fromSite;
                        // }
                        // setTimeout(() => {
                        //     if(fromSite==null||fromSite ==""||fromSite=="B"){
                        //         window.location.href = "https://www.55.com/#/login";
                        //     }else if(fromSite=="F"){
                        //         window.location.href = "https://f.55.com/#/login";
                        //     }else if(fromSite=="L"){
                        //         window.location.href = "https://l.55.com/#/login";
                        //     }else if(fromSite=="S"){
                        //         window.location.href = "https://s.55.com/#/login";
                        //     }
                        // }, 5000);
                        setTimeout(() => {  
                                //window.location.href = "https://www.55.com/#/login";
                                this.$router.push('login')
                            }, 5000);
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
            this.gotoSite()
            //把头，脚，侧边栏隐藏的方法；
           
        },

      
        
        
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
    @import './activeEmail.less';
</style>

<style lang='less'>
    @import './mediaLogin.less';
</style>
