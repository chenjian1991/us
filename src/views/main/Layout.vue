<template>
  <div>
    <tressoHeader></tressoHeader>
    <!--<Header2 />-->
    <!-- Content 内容 -->
    <div style="flex:1;height:100%;width:100%;flex-basis:auto;">
        <router-view></router-view>
    </div>
    <Footer></Footer>
    <div class="footerTips" >
        <div class="cookiesBox" v-if="isShowCookiesBox">
          <div>Our site uses cookies. By continuing to use our site you are agreeing to our <router-link to="/legal/privacy" target="_blank" class="gotoPolicy">Cookie Policy</router-link> .</div>
          <div class="cookiesBtn" @click="closeCookiesBox">OK, I UNDERSTAND</div>
        </div>
        <div class="ipBox" v-if="isShowIPModal">
          <div class="ipText" v-once>{{message}}</div>
          <a class="closeBtn" @click="closeIpmodal">CLOSE</a>
        </div>
    </div>
  </div>
</template>

<script>
  import tressoHeader from '@/components/common/tressoHeader.vue'
  import Footer from '../../components/common/Footer'
  import { AndroidDownloadUrl } from '../../../api/urls.js'
  import { getApi } from '../../../api/axios.js'
  export default {
    data(){
      return{
        ifAPP:false,
        isShowIPModal:true,
        isShowCookiesBox:false,
        showTradeHeader:false,
        androidURL:'',
        download:true,
        message:'Attention: Please note that residents of the state of Connecticut, Florida, Texas, Hawaii, Mississippi, New Jersey, Maine, New York, North Carolina, North Dakota, Ohio, South Dakota, Vermont, or Washington are not permitted to trade on tresso.com.'          
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
        // Header2,
    //    TradeCenterHeader
    },
    mounted(){
      this.ifAPP = this.$store.state.app.ifAPP;
      this.getAndroidUrl();
      this.judgePCorMoble()

      const cookiesModalFlag = window.localStorage.getItem('COOKIESMODAL')
      if(cookiesModalFlag !== 'CLOSED'){
          this.isShowCookiesBox = true
      }else{
          this.isShowCookiesBox = false
      }
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
      .ipText{}
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