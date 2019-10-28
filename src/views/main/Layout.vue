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
       <tressoHeader></tressoHeader>
        <Header2 />
        <!-- Content 内容 -->
        <div style="flex:1;height:100%;width:100%;flex-basis:auto;">
            <router-view></router-view>
        </div>
        <Footer></Footer>
        <div class="footerTips" >
            <div class="cookiesBox" v-if="isShowCookiesBox">
                <div>Our site uses cookies. By continuing to use our site you are agreeing to our <router-link to="/privacy" class="gotoPolicy">Cookie Policy</router-link> .</div>
                <div class="cookiesBtn" @click="closeCookiesBox">OK, I UNDERSTAND</div>
            </div>
            <div class="ipBox" v-if="isShowIPModal">
                <div class="ipText">{{message}}</div>
                <a class="closeBtn" @click="closeIpmodal">CLOSE</a>
            </div>
        </div>
    </div>
</template>

<script>
   import tressoHeader from '@/components/common/tressoHeader.vue'

   import Header2 from '@/components/common/US-Header.vue'
    // import TradeCenterHeader from '@/components/common/TradeCenterHeader.vue'
    // import Footer from '../../components/common/US-NEW-Footer.vue'
    import Footer from '../../components/common/Footer'
    import {AndroidDownloadUrl} from '../../../api/urls.js';
    import {getApi} from '../../../api/axios.js';
    export default {
        // metaInfo(){
        //     return{
        //         title: this.HomeTitle, // set a title
        //         meta: [{                 // set meta
        //             name: 'keywords',
        //             content:this.HomeKeyword
        //         },{
        //             name:'description',
        //             content:this.HomeDescription
        //         }],
        //     }
        // },
        data(){
            return{
                // HomeTitle:this.$t(this.$route.meta.title),
                // HomeKeyword : this.$t('HomeKeyword'),
                // HomeDescription : this.$t('HomeDescription'),
                ifAPP:false,
                isShowIPModal:true,
                isShowCookiesBox:false,
                showTradeHeader:false,
                androidURL:'',
                download:true,
                message:'Attention: Please note that residents of the state of Connecticut, Florida, Hawaii, Maine, Mississippi, New Jersey, New York, North Carolina, North Dakota, Ohio, South Dakota, Texas, Vermont, or Washington are not permitted to trade on 55.trade.',
               // routerArr:['home','Bhome','Shome','Fhome','Chome','login','register','usdd','FF','stock','cinfo','about55','capital','card','redeemsupreme','tokenizeyeezy','whyus','crypto','smartexecution','termsfront','faqs','ourcompany','team','contactus'],
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
            },
            closeCookiesBox(){
                this.isShowCookiesBox = false
                window.localStorage.setItem('COOKIESMODAL','CLOSED')
            }
        },
        watch:{
            // $route(to,from){ //路由site变化
            //     if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
            //         this.showTradeHeader = true
            //     }else{
            //         this.showTradeHeader = false
            //     }
            // },
        },
        components: {
           Footer,
           tressoHeader,
           Header2,
        //    TradeCenterHeader
        },
        mounted(){
            this.ifAPP = this.$store.state.app.ifAPP;
            // if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
            //     this.showTradeHeader = true
            // }else{
            //     this.showTradeHeader = false
            // }
            this.getAndroidUrl();
            this.judgePCorMoble()

            let cookiesModalFlag = window.localStorage.getItem('COOKIESMODAL')
            if(cookiesModalFlag !== 'CLOSED'){
                this.isShowCookiesBox = true
            }else{
                this.isShowCookiesBox = false
            }
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
        bottom: 0;
        position: fixed;
        width: 100vw;
        z-index: 90;
        .cookiesBox{
            width: 100%;
            background: rgba(48,70,85,.9);
            color: #fff;
            padding:10px 35px;
            display: flex;
            justify-content: space-between;
            text-align: center;
            font-size: 14px;
            .cookiesBtn{
                color: #fff;
                cursor: pointer;
            }
            .gotoPolicy{
                color: #fff;
                text-decoration: underline !important;
            }
        }
        .ipBox{
            width: 100%;
            height: 100%;
            background: rgba(33,40,48,.9);
            padding:10px 35px !important;
            text-align: left;
            position: relative;
            display: flex;
            color: #fff;
            font-size: 14px;
            margin-bottom: 0;
            .ipText{

            }
            .closeBtn{
                margin-left: 20px;
                color: #fff;
                &:hover{
                    color: #fff;
                }
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