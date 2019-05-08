<template>
    <div>
        <!-- <div  v-show="download" class="app-tip hidden-lg clearfix">
            <a class="clearfix" id="appLink" href="javascript:;">
                <img class="logo" src="../../assets/images/home/Bhome/55logo.png" alt="gate.io APP">
                <div class="logo2">
                    <p style="font-size:60px;">{{$t('homeplateform')}}</p>
                </div>
                <span @click="gotoDownload" class="dn-btn">{{$t('homedownlaod')}}</span>
                 <Icon @click="close" style="font-size:60px;" type="md-close" />

            </a>
        </div> -->
        <TradeCenterHeader v-if="showTradeHeader"/>
        <Header2 v-else/>
        <!-- Content 内容 -->
        <div style="flex:1;height:100%;width:100%;flex-basis:auto;">
            <router-view></router-view>
        </div>
        <Footer></Footer>
        <div class="footerTips" v-if="isShowIPModal">
            <p>
                {{message}}
            </p>
            <a class="closeBtn" @click="closeIpmodal">CLOSE</a>
        </div>
    </div>
</template>

<script>
    import Header2 from '@/components/common/US-Header.vue'
    import TradeCenterHeader from '@/components/common/TradeCenterHeader.vue'
    import Footer from '../../components/common/US-Footer.vue'
    import {AndroidDownloadUrl} from '../../../api/urls.js';
    import {getApi} from '../../../api/axios.js';
    export default {
        data(){
            return{
                ifAPP:false,
                isShowIPModal:true,
                showTradeHeader:false,
                androidURL:'',
                download:true,
                message:'Attention: please note that residents of the state of Connecticut, Florida, Hawaii, Maine, Mississippi, New Jersey, New York, North Carolina, North Dakota, Ohio, South Dakota, Texas, Vermont, Washington are not permitted to trade on 55.com',
                routerArr:['home','Bhome','Shome','Fhome','Chome','login','register','usdd','FF','stock','cinfo','about55','capital','card','redeemyeezy','tokenizeyeezy'],

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
            },
            judgePCorMoble(){
                let u = navigator.userAgent;
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {// 移动端
                    this.download = true;
                } else {
                    this.download = false;

                }
            },
            closeIpmodal(){
                this.isShowIPModal = false
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
            this.getAndroidUrl();
            this.judgePCorMoble()

            //获取拦截公告
            //  getApi('/api/content/ip-restrict').then(data =>{
            //          if(data.state == 'RESTRICT'){
            //             this.message = data.message
            //             this.isShowIPModal = true
            //         }else if(data.state == 'UNKNOWN'){
            //             this.message = data.message
            //             this.isShowIPModal = true
            //         }else{
            //             this.isShowIPModal = false
            //         }
            //    })
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
    .footerTips{
        align-items:flex-start;
        background: rgba(33,40,48,.9);
        flex-direction: row;
        bottom: 0;
        display: flex;
        justify-content:space-between;
        position: fixed;
        width: 100vw;
        z-index: 90;
        padding:32px 20px;
        p{
            padding:0 10px !important;
            position: relative;
            color: #fff;
        }
        .closeBtn{
            color: #fff;
            &:hover{
                color: #fff;
            }
        }
    }
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
        z-index: 99999999;
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