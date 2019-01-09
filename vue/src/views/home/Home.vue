<template>
  <div class="homebox">
    <section class="bannerSection">
      <Carousel
        v-model="value1"
        :autoplay="isAutoplay"
        loop
        :radius-dot="false"
        :height="570"
        arrow="never"
        :autoplay-speed="4000"
        style="background:#15232C"
      >
        <CarouselItem v-for="item in bannerArr">
          <div v-if="item.targetUrl == '' || item.targetUrl== null">
            <div class="demo-carousel">
              <img :src="item.imageUrl" alt>
            </div>
          </div>
          <a v-else :href="item.targetUrl" target="_blank">
            <div class="demo-carousel">
              <img :src="item.imageUrl" alt>
            </div>
          </a>
        </CarouselItem>
      </Carousel>
    </section>
    <section class="price_section">
        <div class="price_section_box">
          <ul>
              <li v-for="(v,i) in mainHomePriceObject">
                <router-link :to="{path:'/exchange',query: {symbol:v.symbol,site:v.siteType[0]}}">
                  <div v-if="v.showColor == 1" class="greenBackground"></div>
                  <div v-else class="redBackground"></div>
                  <div><span class="baseAsset">{{v.baseAsset}}</span> <span class="quoteAsset">/{{v.quoteAsset}}</span></div>
                  <div :class="[v.showColor == '1' ? 'textColorGreen' : 'textColorRed']">
                    <span :class="[v.showColor == '1' ? 'greendollars' : 'reddollars']"></span>
                    <span class="price"> {{v.last}}</span>
                  </div>
                  <div :class="[v.showColor == '1' ? 'percentGreen' : 'percentRed']">{{v.percent}}</div>
                  <img v-show="v.baseAsset == 'FF'" src="../../assets/images/home/mainHome/FF.png" width="20px" alt="" class="logo">
                  <img v-show="v.baseAsset == 'BTC'" src="../../assets/images/home/mainHome/BTC.png" width="20px" alt="" class="logo">
                  <img v-show="v.baseAsset == 'AAPLT'" src="../../assets/images/home/mainHome/APPLE.png" width="20px" alt="" class="logo">
                  <img v-show="v.baseAsset == 'EURD'" src="../../assets/images/home/mainHome/EURD.png" width="20px" alt="" class="logo">
                  </router-link>
              </li>
          </ul>
        </div>
    </section>
    <section class="siteTable">
      <market :sites="['B','C']" @getPrice="updatePrice"/>
    </section>
    <section class="market">
      <div class="market_title">{{$t('HomeMarketPosition')}}</div>
      <ul>
        <li>
          <img src="../../assets/images/newHome/Home/icon1@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('Homeexchange')}}</div>
          <div class="market_item_text">{{$t('Homeexchangedes')}}</div>
        </li>
        <li>
          <img src="../../assets/images/newHome/Home/icon2@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('homeallday')}}</div>
          <div class="market_item_text">{{$t('homealldaydes')}}</div>
        </li>
        <li>
          <img src="../../assets/images/newHome/Home/icon3@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('homeinvestor')}}</div>
          <div class="market_item_text">{{$t('homeinvestordes')}}</div>
        </li>
        <li>
          <img src="../../assets/images/newHome/Home/icon4@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('homeliqid')}}</div>
          <div class="market_item_text">{{$t('homeliqiddes')}}</div>
        </li>
        <li>
          <img src="../../assets/images/newHome/Home/icon5@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('homelegal')}}</div>
          <div class="market_item_text">{{$t('homelegaldes')}}</div>
        </li>
        <li>
          <img src="../../assets/images/newHome/Home/icon6@2x.png" width="50px" height="50px" alt>
          <div class="market_item_title">{{$t('homeprotect')}}</div>
          <div class="market_item_text">{{$t('homeprotectdes')}}</div>
        </li>
      </ul>
    </section>
    <section class="ios">
      <!-- 下载app -->
      <div class="download">
        <div class="download-left">
          <h2>{{$t('homedownlaod')}}</h2>
          <p>{{$t('hometrading')}}</p>
          <ul>
            <li>{{$t('hometoken')}}</li>
            <li>{{$t('homedata')}}</li>
            <li>{{$t('homewebsit')}}</li>
          </ul>
          <div class="download-btn">
            <img style="width:104px;height:104px;" src="../../assets/images/home/Bhome/qrcode.png" alt>
          </div>
          
        </div>
        <div class="download-right">
          <img
            src="../../assets/images/home/mainHome/shouji@2x.png"
            width="724px"
            height="381px"
            alt
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {BannerList} from '_api/home'
import  market from "@/components/market.vue";

export default {
  data() {
    return {
      value1:0,
      isAutoplay:false,
      clientType:'PC',
      fromSite:'US',
      language:window.localStorage.getItem('countryLanguage') || 'zh-CN',
      bannerArr:[],
      mainHomePriceObject:{},
    }
  },
  methods: {
    initBannerList() {
      this.value1 = 0;
      this.bannerArr = []
      this.isAutoplay = false
      let params = {}
      params.clientType = this.clientType
      params.fromSite = this.fromSite
      params.language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage') || 'zh-CN'
      BannerList(params).then(data => {
        data.map((v,i) => {
           this.bannerArr.push({imageUrl:v.imageUrl,targetUrl:v.targetUrl,subjectName:v.subjectName})
        })
        if(this.bannerArr.length>1){
          this.isAutoplay = true
        }
      })
    },
    updatePrice(obj){
      this.mainHomePriceObject =Object.assign({},obj) 
    }
  },
  computed:{
      languageChange(){
          return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
      },
      loginStatus(){
          return this.$store.state.app.isLogin;
      },
  },
  watch:{
      languageChange(val,oldVal){//监听全局语言的状态
          this.initBannerList()
      },
      loginStatus(val,oldVal){
          if(val){
              this.isLogin = true;
          }else{
              this.isLogin = false;
          }
      },
  },
  mounted(){
    this.$store.commit('changeHeaderColor', '');
    this.$store.commit('changeFooterColor', '#15232C');
    //Header设为透明色
    this.initBannerList();

  },
  components: {
   market
  }
};
</script>
<style lang='less'>
@media screen and (min-width:320px) and(max-width:970px){
  html{
    width: 1200px;
  }
  .nav_box{
    width: 1200px;
  }

}


</style>
<style>
/* banner图 */
.ivu-carousel-dots {
  height: 50px !important;
  position: absolute;
  bottom: 10px !important;
  width: 100%;
  left: 30%;
}
.ivu-carousel-dots li button {
  background: #fff !important;
  border-radius: 0px !important;
  height: 4px !important;
}
</style>


<style scoped lang="less">
.homebox{
  width: 100%;
  .bannerSection {
    overflow: hidden;
    background: #15232C;
    width: 100%;
    min-height: 570px;
    .demo-carousel{
      width:100%;
      height: 570px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      img{
        width: auto;
      }
    }
  }
  .price_section{
    width: 100%;
    min-height: 150px;
    .price_section_box{
      width: 1200px;
      margin: 0 auto;
      height: 190px;
      position: relative;
      ul{
        display: flex;
        position: absolute;
        z-index: 800;
        top:-10px;
        left:0;
        li{
          position: relative;
          padding:26px 25px;
          width: 285px;
          height: 140px;
          box-shadow:0 7px 22px 0 rgba(204,204,204,.5);
          background: #FFFFFF;
          border-radius:2px;
          margin-right: 20px;
          color:#344857;
          margin-top: 0;
          transition: margin-top .4s ease;
          &:hover{
            margin-top:-5px;
          }
          &:last-child{
            margin-right: 0;
          }
          .reddollars{
            display: inline-block;
            width: 11px;
            height: 18px;
            background: url('../../assets/images/home/mainHome/redDollar.png') center center;
            background-size: 11px 15px;
          }
          .greendollars{
            display: inline-block;
            width: 11px;
            height: 18px;
            background: url('../../assets/images/home/mainHome/greenDollar.png') center center;
            background-size: 11px 15px;
          }
          .redBackground{
            width: 144px;
            height: 140px;
            position: absolute;
            top:0;
            right: 0;
            z-index: 1100;
            background: url('../../assets/images/home/mainHome/redBack.png') center center;
            background-size: 144px 140px;
          }
          .greenBackground{
            width: 144px;
            height: 140px;
            position: absolute;
            top:0;
            right: 0;
            z-index: 1100;
            background: url('../../assets/images/home/mainHome/greenBack.png') center center;
            background-size: 144px 140px;
          }
          .baseAsset{
            font-size: 14px;
            color: #344857;
          }
          .quoteAsset{
            font-size:12px;
            color:#949da6;
          }
          .price{
            font-size: 28px;
          }
          .textColorRed{
            color: #EA4853
          }
          .textColorGreen{
            color: #66B76D
          }
          .logo{
            position: absolute;
            top:20px;
            right: 20px;
            z-index: 1000;
          }
          .percentGreen{
            width: 60px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background: #66B76D;
          }
          .percentRed{
            width: 60px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background: #EA4853;
          }
        }
      }

    }
  }
  .siteTable{
    min-height: 500px;
  }
  .FF_section{
    width: 100%;
    box-sizing: border-box;
    height: 554px;
    //background: #15232C;
    background:linear-gradient(0deg,rgba(9,59,74,1),rgba(7,44,55,1));
    color: #fff;
    overflow: hidden;
    .center{
      margin:0 auto;
    }
    .ff{
      width: 100%;
      text-align: center;
      margin-top:70px;
      margin-bottom:27px;
      font-size: 30px;
      font-weight: bold;
    }
    .ff_title{
      width: 100%;
      text-align: center;
      font-size: 24px;
      margin-bottom:73px;
    }
    ul{
      width:1200px;
      display: flex;
      justify-content:space-between;
      li{
        width:310px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .ff_text{
          font-size: 16px;
          padding:23px 0 15px 0;
        }
        .ff_content{
          text-align: center;
          font-size:14px;
          color: #7395A0;
        }
      }
    }
    .abttion{
      width:130px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border:1px solid rgba(80,195,203,0.7);
      margin-top:40px;
      color: #fff;
      &:hover{
        color: #50C3CB;
        border:1px solid rgba(80,195,203,1);
      }
    }
  }
  .market{
    width: 100%;
    height: 590px;
    .market_title{
      width: 100%;
      text-align: center;
      color:#344857;
      font-size:30px;
      padding:70px 0 68px;
    }
    ul{
      display: flex;
      width: 1200px;
      margin: 0 auto;
      flex-wrap:wrap;
      li{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        margin-bottom:70px;
        .market_item_title{
          width: 100%;
          text-align: center;
          font-size:16px;
          color: #344857;
          font-weight: bolder;
          margin:24px 0 15px 0;
        }
        .market_item_text{
          font-size: 14px;
          color: #949DA6;
          text-align: center;
        }
      }
    }
  }
  .ios{
    background: #F5F7F8;
  }
  .download{
        max-width: 1200px;
        margin: 0 auto;
        height: 483px;
        display: flex;
        justify-content: space-between;
        .download-left{
            margin-left: 15px;
            h2{
                margin-top: 66px;
                font-size:22px;
                color:#344857;
            }
            p{
                font-size:12px;
                color:#344857;
                margin-top: 15px;
                font-weight: normal;
            }
            ul{
                margin-top: 50px;
                margin-left: 15px;
                li{
                    list-style-type: disc;
                    font-size:12px;
                    color:#949DA6;
                    margin-top: 14px;
                }
            }
            .download-btn{
              margin-top: 38px;

            }
        }
        .download-right{
            width: 724px;
            position: relative;
            // background:url('../../assets/images/home/Bhome/download-bg.png') no-repeat 90px 93px;
            img{
                position: absolute;
                right:0px;
                bottom:0;
            }
        }

    }
}
</style>
