<template>
    <div>
            <div id="home_app">
                <div v-if="maskflag" class="weixin-tips1">
                   
                </div>
                 <div v-if="maskflag"  class="tips-content1">
                          <img class="app-img" src="../../assets/images/home/Group@2x.png" alt="">
                          <div class="open-browser">
                               <p>{{$t('openbrowser')}}</p>
                          </div>
                </div>
                <div class="content">
                        <div class="logo">
                            <img src="../../assets/images/downlaod/logo@2x.png" alt="">
                        </div>
                        <p class="slogan">One World, One Exchange!</p>
                        <div class="content_inner">
                            <!-- ios -->
                            <div v-if="iosFlag">
                                 <div v-if="chinaFlag" class="ios ">
                                    <img src="../../assets/images/downlaod/changyonglogo35@2x.png" alt="">
                                    <a :href="iosHelpUrl">iOS {{$t('downloadappChina')}}</a>
                                </div>
                                <div  @click="downloadAPP" class="ios marigin_top60">
                                    <img src="../../assets/images/downlaod/changyonglogo35@2x.png" alt="">
                                    <a href="javascript:;">iOS {{$t('downloadappnotChina')}}</a>
                                </div>
                                <!-- <p class="download_method">{{$t('downloadmethods')}} <a class="methods" :href="iosHelpUrl">{{$t('seemethods')}}</a></p> -->
                            </div>
                            <!-- android -->
                              <div v-else>
                                   <div @click="maskshow" v-if="weixinflag" class="ios weixinn">
                                        <img src="../../assets/images/downlaod/anzhuo@2x.png" alt="">
                                        <a href="javascript:;"  class="ios-btn andorid-btn">Android {{$t('loacldownload')}}</a>
                                    </div>
                                    <div v-else class="ios notweixin">
                                        <img src="../../assets/images/downlaod/anzhuo@2x.png" alt="">
                                        <a :href="androidURL"  class="ios-btn andorid-btn">Android {{$t('loacldownload')}}</a>
                                    </div>
                                    <div @click="googleplay" class="ios">
                                        <img src="../../assets/images/downlaod/GooglePlaylogo@2x.png" alt="">
                                        <a href="https://play.google.com/store/apps/details?id=com.ex55.app">Google Play {{$t('downloadapp')}}</a>
                                    </div>
                              </div>
                            <div class="ipone_bg">

                             </div>
                        </div>
                   
                     

                </div>
            </div>

       </div>
    </div>
</template>
<script>
    import {AndroidDownloadUrl} from '../../../api/urls.js';
    import {getApi} from '../../../api/axios.js';

    export default {
        data(){
            return{
                 androidURL:'',
                 iosHelpUrl:'https://55support.zendesk.com/hc/zh-cn/articles/360012684013',
                 weixinflag:false,
                 maskflag:false,
                 iosFlag : true,
                 chinaFlag : true
            }
        },
        components:{
          
        },
        computed:{
    
         
        },
        methods:{
            downloadAPP(){
                    window.location.href='https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182';
            },
            googleplay(){
                    window.location.href='https://play.google.com/store/apps/details?id=com.ex55.app';
            },
            changeURl(){
                let lang  = localStorage.getItem('countryLanguage');
                    if(lang=='zh-CN'){
                           this.iosHelpUrl='https://55support.zendesk.com/hc/zh-cn/articles/360012684013'
                           this.chinaFlag = true;
                    }else{
                           this.iosHelpUrl='https://55support.zendesk.com/hc/en-us/articles/360012684013'
                           this.chinaFlag = false;
                    }

            },
            browserRedirect(){
                let sUserAgent = navigator.userAgent.toLowerCase();
                let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                // let bIsMidp = sUserAgent.match(/midp/i) == "midp";
                // let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                // let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                let bIsAndroid = sUserAgent.match(/android/i) == "android";
                // let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                // let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                if (bIsIpad || bIsIphoneOs) {
                    this.iosFlag = true;
                }else{//如果是安卓
                    this.iosFlag = false;
                }

            },
                weixin(){
                    let ua = navigator.userAgent.toLowerCase();
                    let isWeixin = ua.indexOf('micromessenger') != -1;
                    let sUserAgent = navigator.userAgent.toLowerCase();
                    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                    let bIsAndroid = sUserAgent.match(/android/i) == "android";
                    if (isWeixin && bIsAndroid) {//微信中打开，并且是安卓
                        this.weixinflag = true;
                    }else{
                        this.weixinflag = false;
                    }
                },
                maskshow(){
                    this.maskflag =true;
                },
                getAndroidUrl(){
                getApi(AndroidDownloadUrl,{}).then((res)=>{
                    this.androidURL = res.downloadPath;
                })
            }
            
        },
   
        mounted(){
            this.getAndroidUrl()
            this.changeURl();
            this.weixin();
            this.browserRedirect();
            


           
        },
            
    }
</script>
<style lang='less' scoped>
    @import "./download.less";
</style>

