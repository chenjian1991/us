<template>
    <div class="main_container">
        <TradeCenterHeader v-if="showTradeHeader"/>
        <Header2 v-else/>
        <!-- Content 内容 -->
        <div style="flex:1;height:100%;width:100%;">
            <router-view></router-view>
        </div>
        <Footer></Footer>
        <div v-show="download" class="hidden-lg clearfix">
            <div class="app-tip">
            <a class="clearfix" id="appLink" href="javascript:;">
                <img class="logo" src="../../assets/images/home/Bhome/55logo.png" alt="gate.io APP">
                <div class="logo2">
                   <img src="../../assets/images/home/Bhome/55logo-2.png" alt="">
                    <p style="font-size:45px;">One World,One Exchange</p>
                </div>
                <span @click="gotoDownload" class="dn-btn">Download</span>
            </a>
            <i @click="close" style="font-size:60px;margin-top:80px;">x</i>
        </div>
        </div>
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
                    window.location.href = this.androidURL;
                }else if(isiOS){
                    window.location.href='https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182';

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
            this.getAndroidUrl()
        }
    }
</script>
<style lang="less" scoped>
html{
    position: relative;
    body{
        position: relative;
    }
   
}
    .clearfix{
        height: 264px;
    }
    .clearfix:after {
                content:""; 
                display: block; 
                clear:both; 
    }
     .app-tip{
        width: 1200px;
        height: 264px;
        background: linear-gradient(#093B4A, #072C37); 
        box-shadow: 0 0 2px rgba(0,0,0,0.1);
        position: fixed;
        bottom: 0;
        z-index: 99996;
        i{
            margin-top: 15px;
            margin-left: 25px;
            font-style: normal;
            color: #fff;
        }
        #appLink{
            width: 93%;
            padding: 40px 0;
            float: left;
            -webkit-tap-highlight-color: rgba(255,0,0,0);
            .logo{
                float: left;
                width: 160px;
                height: 160px;
                margin:20px 20px; 
            }
            .logo2{
                float: left;
                p{
                    font-size: 50px;
                    color: #FFFFFF;
                    margin-top: 40px;
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
                margin-top: 50px;
            }
        }
    }
   
</style>