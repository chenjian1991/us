<template>
  <div id="homeContain" class="homebox">
    <section class="bannerSection">
      <Carousel v-model="value1" :autoplay="isAutoplay" loop :radius-dot="false" :height="570" arrow="never" :autoplay-speed="4000" style="background:#15232C">
          <CarouselItem v-for="(item,index) in bannerArr" :key="index">
            <div v-if="item.targetUrl == '' || item.targetUrl== null">
              <div class="demo-carousel">
                <img :src="item.imageUrl" alt="">
              </div>
            </div>
            <a v-else :href="item.targetUrl" target="_blank">
              <div class="demo-carousel" >
                <img :src="item.imageUrl" alt="">
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
                  <div class="percent_line">
                      <div>
                        <img v-show="v.baseAsset == 'FF'" src="../../assets/images/home/mainHome/FF.png" width="20px" alt="" class="logo">
                          <img v-show="v.baseAsset == 'BTC'" src="../../assets/images/home/mainHome/BTC.png" width="20px" alt="" class="logo">
                          <img v-show="v.baseAsset == 'AAPLT'" src="../../assets/images/home/mainHome/APPLE.png" width="20px" alt="" class="logo">
                          <img v-show="v.baseAsset == 'EURD'" src="../../assets/images/home/mainHome/EURD.png" width="20px" alt="" class="logo">
                          <span class="baseAsset">{{v.baseAsset}}</span><span class="quoteAsset">/{{v.quoteAsset}}</span>
                      </div>
                    <div :class="[v.showColor == '1' ? 'percentGreen' : 'percentRed']"><span v-if="v.showColor == 1">+</span>{{v.percent}}%</div>
                  </div>
                  <div :class="[v.showColor == '1' ? 'textColorGreen' : 'textColorRed']">
                    <!-- <span :class="[v.showColor == '1' ? 'greendollars' : 'reddollars']"></span> -->
                    <span class="price"> {{v.last}}</span>
                  </div>
                  <div class="legal_coin">
                   {{currencyName}}&nbsp{{v.symbolCurrency}}
                  </div>
                 
                  </router-link>
              </li>
          </ul>
        </div>
    </section>
    <!-- <section class="korea_mining_section">
      <div class="box">
        <div class="top">
            <div class="top_title">{{$t('miningname')}}</div>
            <div class="mining_box">
              <div class="left">
                <div class="progress_box"> 
                  <div class="progress" v-bind:style="progressStyleObject">
                     <img src="../../assets/images/home/mainHome/mining.gif" width="40px" alt="">
                  </div>
                </div>
                <div class="progress_text">
                  <span>{{$t('miningout')}} <span class="active">{{minedAmount || '--'}} FF</span></span>
                  <span>{{$t('totalmining')}} <span class="active">{{miningAmount || '--'}} FF</span></span>
                </div>
              </div>
              <div class="right"><router-link to='/miningKorea' class="korea_btn">{{$t('startmining')}}</router-link></div>
            </div>
        </div>
        <ul class="bottom">
            <li>
              <div>{{FFUSDT.last}} USD</div>
              <div>{{$t('ffprice')}}</div>
            </li>
            <li>
              <div>{{residueAmount || '--'}} FF</div>
              <div>{{$t('remainingmining')}}</div>
            </li>
            <li>
              <div>{{miningSpeed || '0'}} FF/h</div>
              <div>{{$t('miningspeed')}}</div>
            </li>
            <li>
              <div>{{miningCount || '0'}}</div>
              <div>{{$t('miningtimes')}}</div>
            </li>
        </ul>
      </div>
    </section> -->
    <section class="siteTable">
       <market :sites="['B','C']" @getPrice="updatePrice"/>
    </section>
    <!-- <section class="FF_section">
      <div class="center ff">{{$t('HomeFF')}}</div>
      <div class="center ff_title">{{$t('HomeGlobalmarket')}}</div>
      <ul class="center">
        <li>
            <img src="../../assets/images/newHome/Home/ff01@2x.png" width="54px" height="69px" alt="">
            <span class="line"></span>
            <div class="ff_text">{{$t('HomeBuyingMining')}}</div>
            <div class="ff_content">{{$t('HomeBuyingMiningTip')}}</div>
        </li>
        <li>
            <img src="../../assets/images/newHome/Home/ff02@2x.png" width="54px" height="69px" alt="">
            <span class="line"></span>
            <div class="ff_text">{{$t('HomeSuperMiner')}}</div>
            <div class="ff_content">{{$t('HomeSuperMinerTip')}}</div>
        </li>
        <li>
            <img src="../../assets/images/newHome/Home/ff03@2x.png" width="54px" height="69px" alt="">
            <span class="line"></span>
            <div class="ff_text">{{$t('HomeFFTokenRecycle')}}</div>
            <div class="ff_content">{{$t('HomeFFTokenTip')}}</div>
        </li>
      </ul>
      <router-link to="/FF" class="center abttion">{{$t('bbjyMore')}}</router-link>
    </section> -->
    <section class="market">
        <div class="market_title">{{$t('HomeMarketPosition')}}</div>
        <ul>
          <li>
              <img src="../../assets/images/newHome/Home/icon1@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('Homeexchange')}}</div>
              <div class="market_item_text">{{$t('Homeexchangedes')}}</div>
          </li>
          <li>
              <img src="../../assets/images/newHome/Home/icon2@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('homeallday')}}</div>
              <div class="market_item_text">{{$t('homealldaydes')}}</div>
          </li>
          <li>
              <img src="../../assets/images/newHome/Home/icon3@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('homeinvestor')}}</div>
              <div class="market_item_text">{{$t('homeinvestordes')}}</div>
          </li>
          <li>
              <img src="../../assets/images/newHome/Home/icon4@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('homeliqid')}}</div>
              <div class="market_item_text"> {{$t('homeliqiddes')}}</div>
          </li>
          <li>
              <img src="../../assets/images/newHome/Home/icon5@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('homelegal')}}</div>
              <div class="market_item_text">{{$t('homelegaldes')}}</div>
          </li>
          <li>
              <img src="../../assets/images/newHome/Home/icon6@2x.png" width="50px" height="50px" alt="">
              <div class="market_item_title">{{$t('homeprotect')}}</div>
              <div class="market_item_text">{{$t('homeprotectdes')}}</div>
          </li>
        </ul>
    </section>
    <section class="ios">
      <!--  下载app -->
      <div class="download">
          <div class="download-left">
              <h2>{{$t('homedownlaod')}}</h2>
              <p>{{$t('hometrading')}}</p>
              <ul>
                  <li> {{$t('hometoken')}}</li>
                  <li>{{$t('homedata')}}</li>
                  <li>{{$t('homewebsit')}}</li>
              </ul>
              <div class="download-btn">
                      <img style="width:104px;height:104px;" src="../../assets/images/home/Bhome/newQrcode.png" alt="">
              </div>
          </div>
          <div class="download-right">
              <img src="../../assets/images/home/mainHome/shouji@2x.png" width="724px" height="381px" alt="">
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import {BannerList} from '_api/home'
import {BigNumber} from 'bignumber.js';
import { queryGlobal,queryConfig } from '_api/miningKo.js'
import market from "@/components/market.vue";
import { getParseFloat } from '@/lib/utils.js'
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
      currencyName:'$'
      //韩国挖矿
      // FFUSDT:{},
      // minedAmount:'0',
      // miningAmount:'0',
      // miningCount:'',
      // residueAmount:'0',
      // miningSpeed:'',
      // miningTimer:null,//挖矿进度轮训
      // startTime:'',//活动开始时间
      // progressStyleObject:{
      //   width:'40px'
      //   width:'40px'
      // },
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
      let language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage')
      if(language=='en'||language=='vi'||language=='ko'||language=='zh-CN'){
          params.language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage') || 'zh-CN'
      }else{
          params.language = 'en'
      }
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
      this.FFUSDT = obj.FFUSDT
      this.mainHomePriceObject =Object.assign({},obj) 
      let legalTender = JSON.parse(localStorage.getItem('currentCurrency'));
      this.currencyName = legalTender.shortcut?legalTender.shortcut:'$';
      // console.log(this.mainHomePriceObject)
    },
    // initKoreaMining(){
    //     queryGlobal().then(data => {
    //       if(data){
    //         this.minedAmount = getParseFloat(Math.floor(Number(data.minedAmount)));
    //         // this.minedAmount = 200000000
    //         this.miningAmount= getParseFloat(data.miningAmount)
    //         this.miningCount= data.miningCount
    //         //剩余矿池
    //         this.residueAmount= getParseFloat(Math.floor(Number(data.residueAmount)));
    //         // 计算宽度
    //         let progressWidth = new BigNumber(data.minedAmount).dividedBy(data.miningAmount).multipliedBy(960).toFixed(2) + 40
    //         this.progressStyleObject = {'width' : progressWidth+'px'}
    //         if(!this.startTime){
    //           queryConfig().then(result => {
    //               this.startTime  = result.startTime
    //               if(new Date().getTime() > this.startTime){
    //                 let hours  = ((new Date().getTime()-this.startTime)/1000/60/60).toFixed(4)
    //                 this.miningSpeed = new BigNumber(data.minedAmount).dividedBy(new BigNumber(hours)).toFixed(2)
    //               }
    //           })
    //         }else{
    //           if(new Date().getTime() > this.startTime){
    //                 let hours  = ((new Date().getTime()-this.startTime)/1000/60/60).toFixed(4)
    //                 this.miningSpeed = new BigNumber(data.minedAmount).dividedBy(new BigNumber(hours)).toFixed(2)
    //             }
    //         }
    //         this.miningTimer = setTimeout(()=>{
    //           this.initKoreaMining()
    //         },3000)
    //       }
    //     })
    // }
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
    // 韩国挖矿首页
    // this.initKoreaMining();

  },
  destroyed(){
    clearTimeout(this.miningTimer)
  },
  components: {
   market
  }
};
</script>
<style>
  /* banner图  */
  .ivu-carousel-dots{
    height: 50px !important;
    position: absolute;
    bottom:10px !important;
    width: 100%;
    left: 30%;
  }
  .ivu-carousel-dots li button{
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
      height: 160px;
      position: relative;
      ul{
        display: flex;
        position: absolute;
        z-index: 800;
        top:-10px;
        left:0;
        li{
          position: relative;
          padding:26px 25px 0 25px;
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
          // .reddollars{
          //   display: inline-block;
          //   width: 11px;
          //   height: 18px;
          //   background: url('../../assets/images/home/mainHome/redDollar.png') center center;
          //   background-size: 11px 15px;
          // }
          // .greendollars{
          //   display: inline-block;
          //   width: 11px;
          //   height: 18px;
          //   background: url('../../assets/images/home/mainHome/greenDollar.png') center center;
          //   background-size: 11px 15px;
          // }
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
          .percent_line{
            display: flex;
            justify-content: space-between;
          }
          .legal_coin{
            font-size: 14px;
            color: #949DA6;
            margin-top: 5px;
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
            margin-top: 10px;
            display: inline-block;
          }
          .textColorRed{
            color: #EA4853
          }
          .textColorGreen{
            color: #66B76D
          }
          .logo{
            // position: absolute;
            // top:20px;
            // right: 20px;
            // z-index: 1000;
            margin-right: 10px;
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
  .korea_mining_section{
    width: 100%;
    min-height: 420px;
    margin-bottom: 40px;
    .box{
      width: 1200px;
      margin:0 auto;
      .top{
        width: 100%;
        background: #F6FAFA;
        margin-bottom:10px;
        padding:50px 40px;
        // 挖矿标题
        .top_title{
          font-size: 26px;
          text-align: center;
          color: #12869A;
          font-weight: 500;
          margin-bottom: 40px;
        }
        .mining_box{
          display: flex;
          justify-content: space-between;
          .left{
            width: 960px;
            .progress_box{
              height: 36px;
              width: 100%;
              background:linear-gradient(90deg,rgba(18,134,154,1),rgba(30,149,169,1));
              border-radius:2px;
              .progress{
                height: 100%;
                min-width: 40px;
                border-radius:2px 16px 16px 2px;
                background: #007387;
                position: relative;
                img{
                  position: absolute;
                  bottom: 0;
                  right: 6px;
                }
              }
            }
            .progress_text{
              width: 100%;
              display: flex;
              justify-content:space-between;
              padding-top:14px;
              font-size: 14px;
              span{
                .active{
                  color: #12869A;
                }
              }
            }


          }
          .right{
            a{
              display: block;
              width: 120px;
              height: 36px;
              background: #12869A;
              color: #fff;
              text-align: center;
              line-height: 36px;
            }
            .korea_btn{
              &:hover{
                background: #108093;
              }
            }
          }
        }



      }
      .bottom{
        height: 120px;
        width: 100%;
        background: #F6FAFA;
        display: flex;
        padding:37px 0;
        li{
          flex:1;
          border-right: 1px solid #E7EAED;
          &:last-child{
            border-right:none;
          }
          div{
            text-align: center;
            font-weight: 400;
            &:nth-child(1){
              font-size: 24px;
              color: #12869A;
            };
            &:nth-child(2){
              color: #949DA6;
              font-size: 14px;
            }
            
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
    height: 584px;
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
      margin-bottom:50px;
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
          .line{
                        width: 30px;
                        height: 2px;
                        background: #fff;
                        text-align: center;
                        margin: 30px auto;
                        display: block;
                    }
        .ff_text{
          font-size: 16px;
          padding:0px 0 15px 0;
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
        padding-left: 20px;
        .download-left{
           // margin-left: 70px;
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
<style lang='less'>
@import "./MediaHome.less";
</style>
