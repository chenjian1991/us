<template>
   <main class="home home-common" id="home">
      <!--top-->
      <div class="top bgc1">
         <div class="container">
            <h1 class="c-fff f-48 f-w">Maximize Returns, Minimize Hassle</h1>
            <section class="c-l-gray f-18 mt-1 top-desc">
               Tresso’s institutional-grade Global Best Bid and Offer (GBBO™) technology scans the deepest global
               liquidity pools to deliver the best prices on digital currencies. Coupled with no fees, high-speed
               conversion, and a seamless single point of execution, Tresso gives the savvy trader the greatest
               opportunities to win. All in a single account.
            </section>
            <Button type="info" class="mt-5 f-14 btn">GET STARTED</Button>
         </div>
      </div>
      <!--GBBO-->
      <div class="gbbo bgc2 pt-lg-11 pb-lg-11 pt-3 pb-5">
         <div class="container">
            <div class="d-flex align-items-center"><span class="f-28 c-fff f-w mr-4">GBBO™</span><span
               class="f-14 c-d-gray">Global Best Bid and Offer</span></div>
            <div class="bgc3 f-16 c-blue br-4 f-w mt-4 mb-3 title-box">USD</div>
            <div class="row justify-content-between" v-model="gbboList">
               <div class="col-md-3" v-model="gbboList.base">
                  <div class="f-16 bgc3 br-4 text-center list-box mb-3">GBBO Markets</div>
                  <div class="f-16 d-flex justify-content-between mb-2">
                     <div>
                        <span class="c-fff">{{gbboList.base.baseAssets}}</span>
                        <span class="c-d-gray">{{gbboList.base.quoteAssets}}</span>
                     </div>
                     <div>{{gbboList.base.price}}</div>
                  </div>
                  <div>
                     <span class="f-14">24h Vol：{{gbboList.base.vol}}</span>
                  </div>
               </div>
               <div class="col-md-3" v-model="gbboList.buy">
                  <div class="f-16 bgc3 br-4 text-center list-box mb-3">Buy at Lowest</div>
                  <div class="f-16 d-flex justify-content-between mb-2">
                     <span class="c-blue">{{gbboList.buy.price}}</span>
                     <span>{{gbboList.buy.exchange}}</span>
                  </div>
                  <div class="f-14">< Markets Avg {{gbboList.buy.diffAvg}}</div>
               </div>
               <div class="col-md-3" v-model="gbboList.sell">
                  <div class="f-16 bgc3 br-4 text-center list-box mb-3">Sell at Highest</div>
                  <div class="f-16 d-flex justify-content-between mb-2">
                     <span class="c-blue">{{gbboList.sell.price}}</span>
                     <span>{{gbboList.sell.exchange}}</span>
                  </div>
                  <div class="f-14">< Markets Avg {{gbboList.sell.diffAvg}}</div>
               </div>
               <div class="col-md-3" v-model="gbboList.avg">
                  <div class="f-16 bgc3 br-4 text-center list-box mb-3">Arbitrage</div>
                  <div class="d-flex justify-content-between">
                     <div>
                        <div class="f-16 c-fff mb-2">{{gbboList.avg.price}}</div>
                        <div class="f-14">Est Return {{gbboList.avg.change}}</div>
                     </div>
                     <div class="d-flex align-items-center">
                        <Button class="c-blue f-14 trade-btn" :class="gbboList.avg.disableTrade?'disabled':''">Instant
                           Trade
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--Why Tresso?-->
      <div class="pb-11">
         <row-box :rowLists="tresso">
            <div :slot="item.name" class="tresso pr-lg-9 pt-lg-6 pt-3" v-for="(item,i) in tressoList" :key="i">
               <img v-lazy='item.img' class="tresso-img">
               <p class="f-18 c-d-black mt-6 mb-2">{{item.title}}</p>
               <section class="f-14 c-dark-gray">{{item.section}}</section>
            </div>
         </row-box>
      </div>
      <!--GBBO-->
      <div class="gbboTM-box pb-11 bgc2">
         <row-box :rowLists="gbboTM">
            <div class="gbboTMBg p-6">
               <h3 class="f-24 c-fff f-w">Global Best Bid & Offer (GBBO™) fuels next-level trading</h3>
               <section class="c-gray-b f-14 mt-3">
                  Building upon the foundations of National Best Bid & Offer required in traditional securities markets,
                  GBBO™ connects disjointed, local exchanges into a unified global liquidity pool to provide its traders
                  with:
               </section>
            </div>
            <p class="f-12 c-blue mt-4">This power is not currently available in any single exchange, regardless of
               size, and only available at Tresso.</p>
            <div :slot="item.name" class="gbboTM pr-lg-9" v-for="(item,i) in gbboTMList" :key="i">
               <img v-lazy='item.img' class="gbboTM-img">
               <p class="f-18 c-d-black mt-6 mb-2">{{item.title}}</p>
               <section class="f-14 c-dark-gray">{{item.section}}</section>
            </div>
         </row-box>
      </div>
      <!--CONNECTED EXCHANGES-->
      <div class="connected-box bgc4 d-flex align-items-center justify-content-center t-c">
         <div class="p-5">
            <h3 class="f-36 c-d-black f-w">CONNECTED EXCHANGES</h3>
            <p class="f-18 c-d-gray mt-2">[LOGOS  OF CONNECTED EXCHANGES, APPROVED AND SUPPLIED BY CHARLIE YEH]</p>
         </div>
      </div>
      <!--free-->
      <!--<div class="free-box bgc-fff t-c p-lg-11">-->
      <!--<div class="p-3">-->
      <!--<h3 class="f-36 c-d-black f-w">Keep more of your margin with FREE trading</h3>-->
      <!--</div>-->
      <!--</div>-->
      <!--2 ways to connect-->
      <div class="connect-box bgc3 pb-11">
         <row-box :rowLists="connect" class="mb-5">
            <div :slot="item.name" class="connect bgc-fff br-8 p-lg-7 pr-lg-9 mt-3 p-5" v-for="(item,i) in connectList"
                 :key="i">
               <img v-lazy='item.img' class="connect-img">
               <p class="f-20 c-d-black mt-4 mb-2">{{item.title}}</p>
               <section class="f-16 c-d-gray f-w-5">{{item.section}}</section>
            </div>
         </row-box>
      </div>
      <!---->
      <!--&lt;!&ndash;Keep more of your margin with FREE trading&ndash;&gt;-->
      <!--<div class="margin-box bgc-fff pb-5">-->
      <!--<row-box :rowLists="margin">-->
      <!--<div :slot="item.name" class="margin bgc-fff br-8 p-lg-6 pr-lg-7" v-for="(item,i) in marginList" :key="i">-->
      <!--&lt;!&ndash;<img v-lazy='item.img' class="view-img">&ndash;&gt;-->
      <!--</div>-->
      <!--</row-box>-->
      <!--</div>-->
      <!--manager-->
      <div class="manager-box bgc-fff p-11">
         <div class="container pt-4 pb-4">
            <div class="row justify-content-between align-items-center">
               <div class="col-md-3">
                  <img v-lazy='require("../../assets/images/tresso/manager.png")' class="manager-img">
               </div>
               <div class="col-md-9">
                  <img src="../../assets/images/tresso/left.png" alt="">
                  <section class="f-16 c-d-black mb-6">
                     “Given the maturation of the crypto, token, and digital asset markets, the trading standards and
                     operations found in current exchanges are woefully underdeveloped when compared with those of
                     traditional markets. Tresso’s institutional-grade trading with Global Best Bid and Offer is a
                     necessary innovation to these nontraditional markets. GBBO™ is the first of many innovations that
                     we
                     expect to bring to this marketplace to enhance institutional trust, credence and participation in
                     nontraditional digital assets such as crypto.”
                  </section>
                  <img src="" alt="">
               </div>
            </div>
         </div>
      </div>
      <!--PARTNERS-->
      <div class="partners-box bgc3 p-11">
         <div class="container pt-4 pb-4">
            <h3 class="f-36 c-fff f-w t-c">PARTNERS</h3>
            <ul class="mt-11 d-flex justify-content-between">
               <li v-for="item in partnersList">
                  <!--<img v-lazy="item.img" class="partners-img">-->
               </li>
            </ul>
         </div>
      </div>
      <!--trading-->
      <div class="trading-box bgc-fff p-lg-11 t-c pt-5 pb-5">
         <div class="container p-lg-11">
            <h3 class="f-36 c-d-black f-w t-c">Want more efficient trading?</h3>
            <p class="f-18 c-d-gray mt-3">Tresso’s tech-driven trading platform is almost ready to launch. Join the
               waitlist now.</p>
            <Button class="bgc-blue c-fff f-14 btn mt-7">
               BE THE FIRST TO KNOW
            </Button>
         </div>
      </div>
   </main>
</template>

<script>
   import SockJS from 'sockjs-client';
   import Stomp from 'stompjs';
   import {BigNumber} from "bignumber.js";
   import bigDecimal from "js-big-decimal"; //除法失效
   import rowbox from '@/components/rowbox'

   import {getSymbolList_realtime_USDT} from "_api/exchange.js";
   import {
      getDecimalsNum,
   } from "@/lib/utils.js";

   export default {
      name: "index",
      components: {
         'row-box': rowbox
      },
      data() {
         return {
            stompClient: null,
            symbolList_quote: [],
            currentSymbolObj: {},
            gbboTitle: [{title: 'GBBO Markets',}, {title: 'Buy at Lowest',}, {title: 'Sell at Highest',}, {title: 'Arbitrage',}],
            gbboList: {
               base: {
                  baseAssets: 'BTC',
                  quoteAssets: '/USD',
                  price: 0,
                  vol: 0,
                  change: 0,
               },
               buy: {
                  price: 0,
                  exchange: '',
                  diffAvg: 0,
               },
               sell: {
                  price: 0,
                  exchange: '',
                  diffAvg: 0,
               },
               avg: {
                  price: 0,
                  change: 0,
                  disableTrade: false,
               },
            },
            tresso: {
               title: 'Why Tresso?',
               default: true,
               list: [
                  [{
                     num: 4,
                     name: 'left',
                  }, {
                     num: 4,
                     name: 'middle',
                  }, {
                     num: 4,
                     name: 'right',
                  }]
               ]
            },
            tressoList: [
               {
                  name: 'left',
                  img: require('../../assets/images/tresso/tresso1.png'),
                  title: 'GBBO™ Technology',
                  section: 'GBBO™ provides best global pricing through smart order routing and matching engine on a global consolidated order book.'
               },
               {
                  name: 'middle',
                  img: require('../../assets/images/tresso/tresso2.png'),
                  title: 'Deepest Liquidity Pools',
                  section: 'Execute unbroken high volume orders via Tresso’s interconnected liquidity pools with the backing of a third party audit system.'
               },
               {
                  name: 'right',
                  img: require('../../assets/images/tresso/tresso3.png'),
                  title: 'Free Trading',
                  section: 'No transaction fees on trade executions for every user. '
               },
            ],
            gbboTM: {
               title: 'GBBO™ ',
               default: false,
               list: [
                  [{
                     num: 6,
                     name: 'left',
                  }, {
                     num: 6,
                     name: 'right',
                  }]
               ]
            },
            gbboTMList: [
               {
                  name: 'left',
                  img: require('../../assets/images/tresso/tresso1.png'),
                  title: 'GBBO™ Technology',
                  section: 'GBBO™ provides best global pricing through smart order routing and matching engine on a global consolidated order book.'
               },
               {
                  name: 'middle',
                  img: require('../../assets/images/tresso/tresso2.png'),
                  title: 'Deepest Liquidity Pools',
                  section: 'Execute unbroken high volume orders via Tresso’s interconnected liquidity pools with the backing of a third party audit system.'
               },
               {
                  name: 'right',
                  img: require('../../assets/images/tresso/tresso3.png'),
                  title: 'Free Trading',
                  section: 'No transaction fees on trade executions for every user. '
               },
            ],
            connect: {
               title: '2 ways to connect',
               default: false,
               list: [
                  [{
                     num: 6,
                     name: 'left',
                  }, {
                     num: 6,
                     name: 'right',
                  }]
               ]
            },
            connectList: [
               {
                  name: 'left',
                  img: require('../../assets/images/tresso/connect1.png'),
                  title: 'Web Platform',
                  section: 'Institutional-grade tech and functionality on a web platform built for retail traders.'
               },
               {
                  name: 'right',
                  img: require('../../assets/images/tresso/connect2.png'),
                  title: 'API',
                  section: 'IHigh-speed trading engine designed for quant funds, trading firms, VIP retail clients, and mining pools. Use the next generation FIX-based trading API with no rate limits.'
               },
            ],
            margin: {
               title: 'Keep more of your margin with FREE trading',
               default: true,
               list: [
                  [{
                     num: 12,
                     name: 'middle',
                  }]
               ]
            },
            marginList: [
               {
                  name: 'middle',
                  img: '',
               },
            ],
            manager: {
               title: '',
               default: false,
               show: false,
               list: [
                  [{
                     num: 3,
                     name: 'left',
                  }, {
                     num: 9,
                     name: 'right',
                  }]
               ]
            },
            partnersList: [
               {img: require('../../assets/images/tresso/partner1.png')},
               {img: require('../../assets/images/tresso/partner2.png')},
               {img: require('../../assets/images/tresso/partner3.png')},
               // {img: require('../../assets/images/tresso/partner4.png')},
               {img: require('../../assets/images/tresso/partner5.png')}
            ],
         }
      },
      methods: {
         init() {
            // 获取gbbo btcusdd交易对行情
            getSymbolList_realtime_USDT().then(res => {
               console.log(res)
               res.map((v, i) => {
                  this.symbolList_quote[v.symbol] = v; //拼装行情的symbol为Key的symbolList 对象
                  if (v.symbol === 'BTCUSD') {
                     this.currentSymbolObj = v;
                  }
               });
               // this.getSockJS()
            })
         },
         getSockJS() {
            if (this.stompClient == null || !this.stompClient.connected) {
               const domain = document.domain;
               let socket = null
               if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
                  socket = new SockJS('https://' + domain + '/xchange/marketdata');
               } else {
                  socket = new SockJS('http://52.68.13.17:8090/xchange/marketdata');
               }
               this.stompClient = Stomp.over(socket);
               this.stompClient.debug = null
               this.stompClient.heartbeat.outgoing = 1000;
               this.stompClient.connect({}, () => {
                  this.stompClient.subscribe('/topic/orderbook/BTCUSDD', (message) => {
                     if (message.body) {
                        this.sortOrderBook(JSON.parse(message.body))
                     }
                  });
                  this.stompClient.subscribe('/topic/ticker/BTCUSDD', (message) => {
                     this.getVol(JSON.parse(message.body))
                  });
                  // 平均价
                  this.stompClient.subscribe('/topic/trade/BTCUSDD', (message) => {
                     this.getAvgPrice(JSON.parse(message.body))
                  });
               }, (error) => {
                  this.stompClient = null
               });
            }
         },
         // 24小时交易量
         getVol(data) {
            let volTotal = '';
            for (let vol in data) {
               if (data.hasOwnProperty(vol)) {
                  volTotal = bigDecimal.add(data[vol].volume, volTotal)
               }
            }
            this.gbboList.base.vol = new BigNumber(volTotal).toFixed(2)
         },
         // 计算平均价
         getAvgPrice(data) {
            let priceTotal = '';
            let avgObj_length = Object.keys(data).length;
            for (let price in data) {
               if (data.hasOwnProperty(price)) {
                  priceTotal = bigDecimal.add(data[price].trades[0].price, priceTotal)
               }
            }
            this.gbboList.base.price = new BigNumber(priceTotal).dividedBy(avgObj_length).toFixed(2);
         },
         sortOrderBook(data) {
            let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
            var result = data

            this.gbboList.sell.price = result.asks[result.asks.length - 1].priceWithFee.toFixed(2)
            this.gbboList.sell.exchange = result.asks[result.asks.length - 1].provider


            this.gbboList.buy.price = result.bids[0].priceWithFee.toFixed(2)
            this.gbboList.buy.exchange = result.bids[0].provider // 交易所logo

            // 平均值 暂55代替
            // this.avgPrice = this.e55BTCUSDD.last
            // lower
            const avg = this.gbboList.base.price
            this.gbboList.buy.diffAvg = bigDecimal.subtract(avg, this.gbboList.sell.price)

            // higher
            this.gbboList.sell.diffAvg = bigDecimal.subtract(this.gbboList.buy.price, avg)

            // 差价
            var diff = this.gbboList.buy.price - this.gbboList.sell.price
            if (diff <= 0) {
               diff = 0
               this.gbboList.avg.price = 0
               this.gbboList.avg.disableTrade = true
            } else {
               this.gbboList.avg.disableTrade = false
               this.gbboList.avg.price = bigDecimal.round(diff, priceLong)
            }

            // 价差百分比  (subNumber / avgPrice  *100%)，保留到小数点4位
            this.gbboList.avg.change = new BigNumber(this.gbboList.avg.price).dividedBy(avg).multipliedBy(100).toFixed(4) + '%';

         },
      },
      mounted() {
         this.init()
      },

   }
</script>

<style lang="less" scoped>
   .home {
      @media screen and (min-width: 1140px) {
         .top {
            padding-top: 170px;
         }

         .connected-box {
            height: 600px;
         }
      }
      .top {
         .top-desc {
            max-width: 750px;
         }
      }

      .title-box {
         height: 60px;
         line-height: 60px;
         padding-left: 40px;
      }
      .list-box {
         height: 50px;
         line-height: 50px;
      }
      .trade-btn {
         border-color: #01B2D6;
         background-color: transparent;
         padding: 5px 10px;
      }
      .tresso {
         .tresso-img {
            width: 60px;
         }
      }
      .gbboTM-box {
         .gbboTMBg {
            background: url("../../assets/images/tresso/gbboTM.png") top center;
            background-size: cover;

         }
      }
      .connect-box {
         .connect {
            .connect-img {
               width: 66px;
            }
         }
      }
      .manager-box {
         .manager-img {
            width: 220px;
         }
      }
      .partners-box {
         .partners-img {
            width: 140px;

         }
      }
   }

   .home-common {
      font-family: PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
      .c-fff {
         color: #fff;
      }
      .c-l-gray {
         color: #C7D1D9;
      }
      .c-d-gray {
         color: #77838F;
      }
      .c-gray-b {
         color: #B9C9D6;
      }
      .c-gray-9 {
         color: #93A4B2;
      }
      .c-blue {
         color: #01B2D6;
      }
      .c-l-black {
         color: #1A232B;
      }
      .c-d-black {
         color: #304454;
      }
      .f-48 {
         font-size: 48px;
      }
      .f-36 {
         font-size: 36px;
      }
      .f-28 {
         font-size: 28px;
      }
      .f-24 {
         font-size: 20px;
      }
      .f-20 {
         font-size: 20px;
      }
      .f-18 {
         font-size: 18px;
      }
      .f-16 {
         font-size: 16px;
      }
      .f-14 {
         font-size: 14px;
      }
      .f-12 {
         font-size: 12px;
      }
      .f-w {
         font-weight: bolder;
      }
      .f-w-5 {
         font-weight: 500;
      }
      .bgc1 {
         background-color: #151D24;
      }
      .bgc2 {
         background-color: #12191F;
      }
      .bgc3 {
         background-color: #1A232B;
      }
      .bgc4 {
         background-color: #F8F9FA;
      }
      .bgc-fff {
         background-color: #fff;
      }
      .bgc-blue {
         background-color: #01B2D6;
      }
      .btn {
         padding: 12px 20px;
      }
      .br-4 {
         border-radius: 4px;
      }
      .br-8 {
         border-radius: 8px;
      }
      .t-c {
         text-align: center;
      }
   }
</style>