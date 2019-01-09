<template>
    <div class="main_container">
        <div  v-show="download" class="app-tip hidden-lg clearfix">
            <a class="clearfix" id="appLink" href="javascript:;">
                <img class="logo" src="../../assets/images/home/Bhome/55logo_us.png" alt="gate.io APP">
                <div class="logo2">
                   <!-- <img src="../../assets/images/home/Bhome/55logo-2.png" alt=""> -->
                    <p style="font-size:60px;">{{$t('homeplateform')}}</p>
                </div>
                <span @click="gotoDownload" class="dn-btn">Download</span>
                 <i @click="close" style="font-size:60px;margin-top:-40px;">x</i>

            </a>
        </div>
        <TradeCenterHeader v-if="showTradeHeader"/>
        <Header2 v-else/>
        <!-- Content 内容 -->
        <div style="flex:1;height:100%;width:100%;">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    
    </div>
</template>

<script>
    import Header2 from '@/components/common/Header.vue'
    import TradeCenterHeader from '@/components/common/TradeCenterHeader.vue'
    import Footer from '../../components/common/Footer.vue'
    import {AndroidDownloadUrl} from '../../../api/urls.js';
    import {getApi} from '../../../api/axios.js';
    export default {
        data(){
            return{
                ifAPP:false,
                showTradeHeader:false,
                androidURL:'',
                download:true,
                routerArr:['home','Bhome','Shome','Fhome','Chome','login','register'],
            }
           
        },
        methods:{
            close(){
                this.download = false;
            },
            getAndroidUrl(){
                getApi(AndroidDownloadUrl,{}).then((res)=>{
                    this.androidURL = res.downloadPath;
                })
            },
            gotoDownload(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    window.location.href = 'https://play.google.com/store/apps/details?id=com.globalmarkets55.us.ex55.app';
                }else if(isiOS){
                    window.location.href='https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182';

                }
            },
            judgeDevice(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                    this.download = true;
                }else if(isiOS){
                    this.download = false;
                }
            }
        },
        watch:{
            $route(to,from){ //路由site变化 
                if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
                    this.showTradeHeader = true
                }else{
                    this.showTradeHeader = false
                }
            },
        },
        components: {
           Footer,
           Header2,
           TradeCenterHeader
        },
        mounted(){
            this.ifAPP = this.$store.state.app.ifAPP;
            if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
                this.showTradeHeader = true
            }else{
                this.showTradeHeader = false
            }
           // this.judgeDevice()
           // this.getAndroidUrl()
        }
    }
</script>
<style lang='less'>
@media screen and (min-width:320px) and(max-width:970px){
    html{
    position: relative;
    body{
        position: relative;
    }
   
    }
}
</style>
<style lang="less" scoped>
    .clearfix:after {
                content:""; 
                display: block; 
                clear:both; 
    }
     .app-tip{
        width: 1200px;
        padding:25px 0px;
        background:rgba(9,59,74,0.7);
        position: fixed;
        bottom:0px;
        z-index: 99996;
        i{
            margin-left: 25px;
            font-style: normal;
            color: #fff;
        }
        #appLink{
            width: 100%;
            display:flex;
            align-items:center;
            justify-content: space-between;
            -webkit-tap-highlight-color: rgba(255,0,0,0);
            .logo{
                width: 105px;
                height: 105px;
                margin:20px 20px; 
            }
            .logo2{
                p{
                    font-size: 50px;
                    color: #FFFFFF;
                }
                img{
                    margin-top: 20px;
                    margin-left: 20px;
                }
                
            }
            .dn-btn{
                float: right;
                background:rgba(18,134,154,1);
                font-size: 50px;
                border-radius:6px;
                color: #fff;
                padding: 15px 30px;
            }
        }
    }
   
</style>