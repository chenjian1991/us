<template>
   <main class="home home-common" id="home">
      <!--top-->
      <div class="top bgc1">
         <div class="container">
            <h1 class="c-fff f-48 f-w pt-6 pt-lg-0">Maximize Returns, Minimize Hassle</h1>
            <section class="c-l-gray f-18 mt-1 top-desc pt-6 pt-lg-0">
               Tresso’s institutional-grade Global Best Bid and Offer (GBBO™) technology scans the deepest global
               liquidity pools to deliver the best prices on digital currencies. Coupled with no fees, high-speed
               conversion, and a seamless single point of execution, Tresso gives the savvy trader the greatest
               opportunities to win. All in a single account.
            </section>
            <router-link to='/register' class="btn btn-sm btn-primary transition-3d-hover button bgc-blue f-14 mt-7">
               Join the Beta
            </router-link>
         </div>
      </div>
      <div class="gbbo bgc-fff pt-lg-11 pb-lg-11 pt-3" id="GBBO">
         <div class="container">
            <div class="d-flex align-items-center"><span class="f-28 c-1C2730 f-w-6 mr-4">GBBO™</span><span
               class="f-14 c-77838F">Global Best Bid and Offer</span></div>
            <ul class="gbbo-title-list bgc-F1F5FA mt-4">
               <li class="d-ib f-16 t-c f-w-5 c-77838F gbbo-title-item" v-for="item in gbboTitle">{{item.title}}</li>
            </ul>
            <div class="row justify-content-between pt-3 pb-3 gbbo-box" v-model="gbboList">
               <!--Max Arbitrage-->
               <div class="col-3 item-line">
                  <div class="f-16 d-flex justify-content-between mb-2">
                     <div>
                        <span class="symbol f-w-5">{{gbboBase.baseAssets}}</span>
                        <span class="symbol f-w-5">{{gbboBase.quoteAssets}}</span>
                     </div>
                     <router-link :to="{path:'exchange',query:{symbol:symbol}}"
                                  class="btn btn-sm btn-primary transition-3d-hover c-01B2D6 f-12 trade-btn">
                        One-Click Arbitrage
                     </router-link>
                  </div>
                  <div class="d-flex justify-content-between align-items-baseline">
                     <span class="f-20 c-01B2D6">{{gbboList.avg|compare}}</span>
                     <span class="common-style">Amount：{{gbboList.vol}}</span>
                  </div>
               </div>
               <!--Buy at Global Lowest Price-->
               <div class="col-3 item-line">
                  <div class="f-16 d-flex justify-content-between align-items-center mb-3">
                     <span class="f-18 c-EB4D59">{{gbboList.sellPrice}}</span>
                     <span class="f-14 c-151D24">From: {{gbboList.sellExchange|marketName}}</span>
                  </div>
                  <div class="common-style">< Market Avg {{gbboList.sellDiffAvg|compare}}</div>
               </div>
               <!--Sell at Global Highest Price-->
               <div class="col-3 item-line">
                  <div class="f-16 d-flex justify-content-between align-items-center mb-3">
                     <span class="f-18 c-66B76D">{{gbboList.buyPrice}}</span>
                     <span class="f-14 c-151D24">From: {{gbboList.buyExchange|marketName}}</span>
                  </div>
                  <div class="common-style">> Market Avg {{gbboList.buyDiffAvg|compare}}</div>
               </div>
               <!--Market Avg Price-->
               <div class="col-3">
                  <div class="f-16 d-flex justify-content-between align-items-center mb-3">
                     <span class="f-18 c-151D24">{{gbboList.avgPrice}}</span>
                     <span class="f-14 c-66B76D">{{gbboList.avgChange}}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                     <span class="common-style">24h Vol：</span>
                     <span class="common-style">{{gbboList.vol}}</span>
                  </div>
               </div>
            </div>

            <div class="container gbboTableWrap">
               <div class="gbboTable">
               </div>
            </div>
         </div>
      </div>
      <div class="gbbo-mobile d-none">
         <div>
            <div class="d-flex justify-content-between mobile-title">
               <div class="f-16 f-w-6 c-151D24">{{gbboBase.baseAssets}}{{gbboBase.quoteAssets}}</div>
               <div><span class="f-14 f-w-5 c-151D24">Max Arbitrage: </span><span class="f-18 f-w-6 c-01B2D6">{{gbboList.avg}}</span>
               </div>
            </div>
            <ul class="list">
               <li class="item">
                  <h4 class="f-30 c-EB4D59">{{gbboList.sellPrice}}</h4>
                  <p class="f-16 c-77838F">Buy at Lowest</p>
               </li>
               <li class="item">
                  <h4 class="f-30 c-EB4D59">{{gbboList.buyPrice}}</h4>
                  <p class="f-16 c-77838F">Sell at Highest</p>
               </li>
               <li class="item">
                  <h4 class="f-30 c-151D24">{{gbboList.sellPrice}}</h4>
                  <p class="f-16 c-77838F">Market Avg Price</p>
               </li>
            </ul>
         </div>
      </div>

      <!--GBBOTM-->
      <div class="gbboTM-box pb-11 bgc2">
         <Rowbox :rowLists="gbboTM">
            <div class="gbboTMBg p-6 mb-5 pb-6">
               <h3 class="f-24 c-fff f-w">Global Best Bid & Offer (GBBO™) fuels next-level trading</h3>
               <section class="c-B9C9D6 f-14 mt-3">
                  Building upon the foundations of National Best Bid & Offer that is required in traditional securities
                  markets,
                  GBBO™ connects disjointed, local exchanges into a unified global liquidity pool to provide its traders
                  with:
               </section>
            </div>
         </Rowbox>
         <div class="container">
            <div class="row justify-content-between">
               <div class="col-md-6">
                  <div class="gbboTM mb-7" v-for="(item,i) in gbboTMList1" :key="i">
                     <img v-lazy="require('../../assets/images/tresso/checked.png')" class="gbboTM-img mr-4">
                     <dl class="d-ib gbboTM-dl">
                        <dt class="f-18 f-w-5 c-fff mb-2">{{item.title}}</dt>
                        <dd class="f-14 c-B9C9D6 gbboTM-dd">{{item.des}}</dd>
                     </dl>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="gbboTM mb-7" v-for="(item,i) in gbboTMList2" :key="i">
                     <img v-lazy="require('../../assets/images/tresso/checked.png')" class="gbboTM-img mr-4">
                     <dl class="d-ib gbboTM-dl">
                        <dt class="f-18 f-w-5 c-fff mb-2">{{item.title}}</dt>
                        <dd class="f-14 c-B9C9D6 gbboTM-dd">{{item.des}}</dd>
                     </dl>
                  </div>
               </div>
            </div>
            <p class="f-16 c-01B2D6">This power is not currently available in any single exchange, regardless of
               size, and only available at Tresso.</p>
         </div>

      </div>
      <!--Keep more of your margin with FREE trading-->
      <div class="free-box bgc-fff t-c pt-11 pb-11">
         <div class="container p-3">
            <h3 class="f-36 c-d-black f-w">Keep more of your margin with FREE trading</h3>
            <div style="width: 100%;overflow-x: scroll" id="free" class="free-scroll">
               <img v-lazy="require('../../assets/images/tresso/trading.png')" class="free-img mt-9">
            </div>
         </div>
      </div>
      <!--Why Tresso?-->
      <div class="pb-11 bgc2">
         <Rowbox :rowLists="tresso">
            <div :slot="item.name" class="tresso mt-4" v-for="(item,i) in tressoList" :key="i">
               <div v-bind:class="i===0?'pr-lg-8':i===1?'pl-lg-5':'pl-lg-9'">
                  <img v-lazy='item.img' class="tresso-img">
                  <p class="f-20 c-fff mt-6 mb-2 f-w-6">{{item.title}}</p>
                  <section class="f-16 c-B9C9D6 f-w-5">{{item.section}}</section>
               </div>
            </div>
         </Rowbox>
      </div>
      <!--2 ways to connect-->
      <div class="connect-box bgc-EBEFF5">
         <Rowbox :rowLists="connect" class="pb-5">
            <div :slot="item.name" class="connect bgc-fff br-8 p-lg-7 pr-lg-9 mt-3 p-5" v-for="(item,i) in connectList"
                 :key="i">
               <img v-lazy='item.img' class="connect-img">
               <p class="f-20 c-d-black mt-4 mb-2 f-w-6">{{item.title}}</p>
               <section class="f-16 c-d-gray f-w-5">{{item.section}}</section>
            </div>
         </Rowbox>
      </div>
      <div class="connect-bg"></div>
      <!--manager-->
      <div class="manager-box bgc-fff p-lg-11">
         <div class="container pt-4 pb-4">
            <div class="row justify-content-between align-items-stretch">
               <div class="col-md-5">
                  <img v-lazy='require("../../assets/images/tresso/manager.png")' class="manager-img">
               </div>
               <div class="col-md-7">
                  <div class=" mt-3 mt-lg-0">
                     <img src="../../assets/images/tresso/left.png" class="manager-icon" alt="">
                  </div>
                  <div class="pl-lg-10 pr-lg-10 mt-3 mt-lg-0">
                     <h4 class="f-30 c-d-black mb-2 mt-lg-7">Join the Innovation.</h4>
                     <p class="f-16 f-w-5 c-d-black mb-3">David Weild, Former Vice Chairman of Nasdaq</p>
                     <section class="f-16 c-77838F mb-2 f-w-5">
                        Given the maturation of the crypto, token, and digital asset markets, the trading standards and
                        operations found in current exchanges are woefully underdeveloped when compared with those of
                        traditional markets. Tresso’s institutional-grade trading with Global Best Bid and Offer is a
                        necessary innovation to these nontraditional markets. GBBO™ is the first of many innovations
                        that
                        we expect to bring to this marketplace to enhance institutional trust, credence and
                        participation
                        in nontraditional digital assets such as crypto.
                     </section>
                  </div>
                  <div class="t-r mt-lg-7 mt-3 mt-lg-0">
                     <img src="../../assets/images/tresso/right.png" class="manager-icon" alt="">
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--PARTNERS-->
      <div class="partners-box bgc3 pt-lg-11 pb-lg-11">
         <div class="container pt-4 pb-4">
            <h3 class="f-36 c-fff f-w t-c">PARTNERS</h3>
            <ul class="p-3 mt-lg-11 partners">
               <li v-for="item in partnersList" class="partners-li">
                  <img v-lazy="item.img" class="partners-img mt-2">
               </li>
            </ul>
         </div>
      </div>
      <!--trading-->
      <div class="trading-box bgc-fff p-lg-11 t-c pt-5 pb-5">
         <div class="container p-lg-11">
            <h3 class="f-36 c-d-black f-w t-c">Want more efficient trading?</h3>
            <p class="f-18 c-d-gray mt-3">Tresso is currently in closed beta. Sign up now to be first on the list.</p>
            <router-link to='/register'
                         class="btn btn-sm btn-primary transition-3d-hover button bgc-blue f-14 mt-7 border-0">
               Join the Beta
            </router-link>
         </div>
      </div>
   </main>
</template>

<script>
   import SockJS from 'sockjs-client';
   import Stomp from 'stompjs';
   import {BigNumber} from "bignumber.js";
   import bigDecimal from "js-big-decimal"; //除法失效
   import Rowbox from '@/components/Rowbox'

   import {getSymbolList_realtime} from "_api/exchange.js";
   import {
      getDecimalsNum,
   } from "@/lib/utils.js";


   export default {
      name: "index",
      components: {
         'Rowbox': Rowbox,
      },
      filters: {
         compare: function (value) {
            if (value < 0) return 0
            return value
         },
         marketName(name) {
            if (name === 'E55') {
               return 'TRESSO'
            } else if (name === 'GEMINI' || name === 'KRAKEN' || name === 'BITTREX' || name === 'COINBASEPRO') {
               return name
            } else {
               return 'Node of Apifiny'
            }
         }
      },
      data() {
         return {
            symbol: 'BTCUSD',
            stompClient: null,
            symbolList_quote: [],
            currentSymbolObj: {},
            priceLong: 0,
            gbboTitle: [{title: 'Max Arbitrage',}, {title: 'Buy at Global Lowest Price',}, {title: 'Sell at Global Highest Price',}, {title: 'Market Avg Price',}],
            gbboBase: {
               baseAssets: 'BTC',
               quoteAssets: '/USD',
            },
            gbboList: {
               avgPrice: 0,
               vol: 0,
               change: 0,
               buyPrice: 0,
               buyExchange: '',
               buyDiffAvg: 0,
               sellPrice: 0,
               sellExchange: '',
               sellDiffAvg: 0,
               avg: 0,
               avgChange: 0,
            },
            tresso: {
               title: 'Why Tresso?',
               default: false,
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
                  section: 'No transaction or withdrawal fees for every user. And never a subscription fee - always FREE to use.'
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
            gbboTMList1: [
               {
                  title: "DEEPEST LIQUIDITY",
                  des: "Global consolidated order book fills large volume trades with ease"
               },
               {
                  title: "CROSS-CURRENCY CONVERSION",
                  des: "Execute cross-currency orders for access to true global best pricing, all at no additional fee"
               },
               {
                  title: "TRUE SINGLE ACCOUNT",
                  des: "No need to open, keep, and maintain accounts with multiple systems and exchanges"
               },
            ],
            gbboTMList2: [
               {
                  title: "BEST GLOBAL PRICES",
                  des: "Using smart order router and matching engine technology, GBBO uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
               },
               {
                  title: "INSTANT ARBITRAGE",
                  des: "Arbitrage from a single network of exchanges instantly, utilizing GBBO’s global consolidated order book"
               },
            ],
            connect: {
               title: 'Two ways to connect',
               default: true,
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
                  section: 'High-speed trading engine designed for quant funds, trading firms, VIP retail clients, and mining pools. Use the next generation FIX-based trading API with no rate limits.'
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
            partner: {
               title: 'PARTNERS',
               default: false,
               list: [
                  [{
                     num: 3,
                     name: 'one',
                  }, {
                     num: 3,
                     name: 'two',
                  }, {
                     num: 3,
                     name: 'three',
                  }, {
                     num: 3,
                     name: 'four',
                  }]
               ]
            },
            partnersList: [
               {img: require('../../assets/images/tresso/partner1.png')},
               {img: require('../../assets/images/tresso/partner2.png')},
               {img: require('../../assets/images/tresso/partner3.png')},
               {img: require('../../assets/images/tresso/partner4.png')},
               {img: require('../../assets/images/tresso/partner5.png')}
            ],
         }
      },
      methods: {
         init() {
            // 获取gbbo btcusd交易对行情
            getSymbolList_realtime().then(res => {
               res.map((v) => {
                  this.symbolList_quote[v.symbol] = v;
                  if (v.symbol === this.symbol) {
                     this.currentSymbolObj = v;
                  }
               });
               this.priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)

               this.getSockJS()
               this.getSSERealTime()
            })
         },
         getSSERealTime() {
            let url = `symbol=${this.symbol}&${this.symbol}_least=1&`
            const baseURL = (window.location.protocol === 'http:') ? 'ws://' : 'wss://';
            const host = window.location.host;
            this.quoteWS = new ReconnectingWebSocket(`${baseURL}${host}/quote/realTime.ws?${url}`)
            this.quoteWS.onopen = (e) => {
            };
            this.quoteWS.onmessage = (e) => {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               //心跳
               if (result.ping !== undefined) {
                  var pongResponse = {};
                  pongResponse.pong = result.ping;
                  this.quoteWS.send(JSON.stringify(pongResponse))
                  return;
               }
               if (result) {
                  //24H交易量
                  this.gbboList.vol = bigDecimal.round(result.hour24Volume, 2)
               }
            }
            this.quoteWS.onerror = (e) => {
               console.log("The 'this.quoteWS' connect error");
            }
            //关闭时候触发
            this.quoteWS.onclose = (e) => {
            };
         },

         getSockJS() {
            if (this.stompClient === null || !this.stompClient.connected) {
               const domain = document.domain;
               let socket = null
               if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
                  socket = new SockJS('https://' + domain + '/xchange/marketdata');
               } else {
                  socket = new SockJS('http://52.73.95.54:8090/xchange/marketdata');
               }
               this.stompClient = Stomp.over(socket);
               this.stompClient.debug = null
               this.stompClient.heartbeat.outgoing = 1000;
               this.stompClient.connect({}, () => {
                  this.stompClient.subscribe(`/topic/bbo/${this.symbol}`, (message) => {
                     if (message.body) {
                        this.getAvgPrice(JSON.parse(message.body))
                     }
                  });
                  this.stompClient.subscribe(`/topic/orderbook/${this.symbol}`, (message) => {
                     if (message.body) {
                        this.sortOrderBook(JSON.parse(message.body))
                     }
                  });
               }, () => {
                  console.log('The websocket connet error')
                  this.stompClient = null
               });
            }
         },
         // 计算平均价
         getAvgPrice(data) {
            const providerBBOMap = Object.values(data.providerBBOMap)
            let sum = 0
            let length = providerBBOMap.length
            providerBBOMap.forEach((v) => {
               if (v['askLevel'] && v['bidLevel']) {
                  sum += v['askLevel']['priceWithFee'] + v['bidLevel']['priceWithFee']
               } else {
                  --length
               }
            })
            this.gbboList.avgPrice = new BigNumber(sum).dividedBy(length * 2).toFixed(2);
         },
         sortOrderBook(data) {
            const result = data
            //卖盘 最低价买
            this.gbboList.sellPrice = result.asks[result.asks.length - 1].priceWithFee.toFixed(2)
            this.gbboList.sellExchange = result.asks[result.asks.length - 1].provider

            //买盘 最高价卖
            this.gbboList.buyPrice = result.bids[0].priceWithFee.toFixed(2)
            this.gbboList.buyExchange = result.bids[0].provider // 交易所logo

            const avg = this.gbboList.avgPrice
            this.gbboList.sellDiffAvg = bigDecimal.subtract(avg, this.gbboList.sellPrice)

            this.gbboList.buyDiffAvg = bigDecimal.subtract(this.gbboList.buyPrice, avg)

            // 差价
            const diff = this.gbboList.buyPrice - this.gbboList.sellPrice
            this.gbboList.avg = bigDecimal.round(diff, this.priceLong)

            if (diff <= 0) {
               this.gbboList.avgChange = 0
            } else {
               this.gbboList.avgChange = new BigNumber(this.gbboList.avg).dividedBy(avg).multipliedBy(100).toFixed(4) + '%';
            }
         },
      },
      mounted() {
         this.init()
      },
      beforeDestroy() {
         if (this.stompClient != null) {
            this.stompClient.disconnect();
         }
      },
   }
</script>

<style lang="less" scoped>
   @import '../../assets/css/common.less';

   .home {
      @media screen and (min-width: 1200px) {
         .partners {
            .d-f;
            justify-content: space-between;
         }
      }
      @media screen and (max-width: 1199px) {
         .partners {
            .partners-li {
               text-align: center;
            }
         }
      }
      @media screen and (min-width: 768px) {
         .top {
            padding-top: 189px;
         }

         .gbboTMBg {
            background-size: cover;
         }

         .connected-box {
            height: 600px;
         }

         .manager-box {
            .manager-img {
               width: 370px !important;
            }
         }
      }
      @media screen and (max-width: 767px) {
         .gbboTMBg {
            background-size: contain;
         }
      }
      .top {
         background: url("../../assets/images/tresso/banner.png") top center no-repeat;
         background-size: cover;
         height: 800px;
         .top-desc {
            max-width: 750px;
         }
      }
      .gbbo {
         .gbbo-title-list {
            width: 100%;
            border-radius: 4px 4px 0px 0px;
            .gbbo-title-item {
               width: 25%;
               height: 50px;
               line-height: 50px;
            }
         }
         .symbol {
            .c-151D24;
         }
         .common-style {
            .c-77838F;
            .f-14
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
         padding: 5px 8px;
      }
      .tresso {
         .tresso-img {
            width: 60px;
         }
      }
      .gbboTM-box {
         .gbboTMBg {
            background: url("../../assets/images/tresso/gbboTM.png") top center;
            /*background-size: cover;*/

         }
         .gbboTM-img {
            width: 24px;
            vertical-align: text-top;
         }
         .gbboTM-dl {
            width: 80%;
            vertical-align: text-top;
         }
         .gbboTM-dd {
            line-height: 24px;

         }
      }
      .connected-box {
         .connected {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            /*margin: 0 auto;*/
            display: flex;
            align-items: center;
            justify-content: center;
         }
         .img-fluid {
            width: 40px;
            height: 40px;
            box-sizing: content-box;
            border: solid 20px #fff;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
         }
         .row {
            margin-left: 0;
            margin-right: 0;
         }
      }
      .connect-bg {
         background: #EBEFF5 url("../../assets/images/tresso/connectBg.png") top center;
         background-size: cover;
         height: 80px;
      }
      .connect-box {
         .connect {
            .connect-img {
               width: 66px;
            }
         }
      }
      .free-box {
         .free-img {
            width: 100%;
         }
      }
      .manager-box {
         .manager-img {
            width: 100%;
         }
         .manager-icon {
            width: 23px;
         }
      }
      .partners-box {
         .partners-img {
            width: 192px;
         }
      }
      .trading-box {
         .trading-btn {
            padding: 13px 67px;
         }
      }

      /*设置溢出滚动条样式*/
      .free-scroll::-webkit-scrollbar {
         width: 10px;
         /* 不给背景色不会影响数据多少的样式*/
         background-color: transparent;
      }

      .free-scroll::-webkit-scrollbar-thumb {
         width: 10px;
         -webkit-border-radius: 5px;
         border-radius: 5px;
      }

      .free-scroll::-webkit-scrollbar-track {
         -webkit-border-radius: 5px;
         border-radius: 5px;
      }

   }

   .gbbo-mobile {
      .mobile-title {
         padding: 20px;
         line-height: 60px;
      }
      .list {
         .bgc-F1F5FA;
         padding: 22px 0;
         .item {
            position: relative;
            .d-ib;
            width: 100/3%;
            .t-c;
            &:after {
               content: "";
               position: absolute;
               border-right: solid 1px #E2E5EE;
               right: -1px;
               top: 18px;
               bottom: 18px;
            }

         }
      }
   }

   .gbbo-box {
      position: relative;
      border-bottom: 1px #E2E5EE solid;
   }

   .item-line {
      &:after {
         content: "";
         position: absolute;
         border-right: solid 1px #E2E5EE;
         /*width: 1px;*/
         /*background-color: #E2E5EE;*/
         right: -1px;
         top: 12px;
         bottom: 12px;
      }
   }

</style>