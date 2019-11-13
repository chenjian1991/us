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
      <div class="gbbo bgc-fff pt-lg-11 pb-lg-11 pt-3 pb-5" id="GBBO">
         <div class="container">
            <div class="d-flex align-items-center"><span class="f-28 c-1C2730 f-w mr-4">GBBO™</span><span
               class="f-14 c-77838F">Global Best Bid and Offer</span></div>
            <!-- <div class="bgc3 f-16 c-blue br-4 f-w mt-4 mb-3 title-box">USD</div> -->
            <div class="container gbboTableWrap">
               <div class="gbboTable">
                  <div class="row justify-content-between" v-model="gbboList">
                     <div class="col-3 p-0" v-model="gbboList.base">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Market Avg Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <div>
                                    <span class="c-fff f-w-5">{{gbboList.base.baseAssets}}</span>
                                    <span class="c-fff f-w-5">{{gbboList.base.quoteAssets}}</span>
                                 </div>
                                 <div>{{gbboList.base.price}}</div>
                              </div>
                              <div>
                                 <span class="f-14 c-fff">24h Vol：{{gbboList.base.vol}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.sell">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Buy at Global Lowest Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <span class="redNum">{{gbboList.sell.price}}</span>
                                 <span>From:{{gbboList.sell.exchange|marketName}}</span>
                              </div>
                              <div class="f-14 c-fff">< Market Avg {{gbboList.sell.diffAvg|compare}}</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.buy">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Sell at Global Highest Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <span class="greenNum">{{gbboList.buy.price}}</span>
                                 <span class="c-fff">From:{{gbboList.buy.exchange|marketName}}</span>
                              </div>
                              <div class="f-14 c-fff">> Market Avg {{gbboList.buy.diffAvg|compare}}</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.avg">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Arbitrage</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 noBorder">
                              <div class="d-flex justify-content-between">
                                 <div>
                                    <div class="f-16 c-fff mb-2 c-blue">{{gbboList.avg.price|compare}}</div>
                                    <div class="f-14 c-fff">Est Return {{gbboList.avg.change}}</div>
                                 </div>
                                 <div class="d-flex align-items-center">
                                    <!-- <router-link :to="{path:'exchange',query:{symbol:symbol}}"
                                                class="btn btn-sm btn-primary transition-3d-hover c-blue f-14 trade-btn">
                                       Instant Trade
                                    </router-link> -->
                                    <div class="btn btn-sm btn-primary c-blue f-14 trade-btn lock">
                                       Instant Trade
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!--GBBO-->
      <div class="gbbo bgc2 pt-lg-11 pb-lg-11 pt-3 pb-5" id="GBBO">
         <div class="container">
            <div class="d-flex align-items-center"><span class="f-28 c-fff f-w mr-4">GBBO™</span><span
               class="f-14 c-d-gray">Global Best Bid and Offer</span></div>
            <!-- <div class="bgc3 f-16 c-blue br-4 f-w mt-4 mb-3 title-box">USD</div> -->
            <div class="container gbboTableWrap">
               <div class="gbboTable">
                  <div class="row justify-content-between" v-model="gbboList">
                     <div class="col-3 p-0" v-model="gbboList.base">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Market Avg Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <div>
                                    <span class="c-fff f-w-5">{{gbboList.base.baseAssets}}</span>
                                    <span class="c-fff f-w-5">{{gbboList.base.quoteAssets}}</span>
                                 </div>
                                 <div>{{gbboList.base.price}}</div>
                              </div>
                              <div>
                                 <span class="f-14 c-fff">24h Vol：{{gbboList.base.vol}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.sell">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Buy at Global Lowest Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <span class="redNum">{{gbboList.sell.price}}</span>
                                 <span>From:{{gbboList.sell.exchange|marketName}}</span>
                              </div>
                              <div class="f-14 c-fff">< Market Avg {{gbboList.sell.diffAvg|compare}}</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.buy">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Sell at Global Highest Price</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 pr-5">
                              <div class="f-16 d-flex justify-content-between mb-2">
                                 <span class="greenNum">{{gbboList.buy.price}}</span>
                                 <span class="c-fff">From:{{gbboList.buy.exchange|marketName}}</span>
                              </div>
                              <div class="f-14 c-fff">> Market Avg {{gbboList.buy.diffAvg|compare}}</div>
                           </div>
                        </div>
                     </div>
                     <div class="col-3 p-0" v-model="gbboList.avg">
                        <div class="f-16 bgc3 br-4 text-center list-box c-fff mb-3 dataTitle">Arbitrage</div>
                        <div class="dataWrap pb-3">
                           <div class="dataInner pl-5 noBorder">
                              <div class="d-flex justify-content-between">
                                 <div>
                                    <div class="f-16 c-fff mb-2 c-blue">{{gbboList.avg.price|compare}}</div>
                                    <div class="f-14 c-fff">Est Return {{gbboList.avg.change}}</div>
                                 </div>
                                 <div class="d-flex align-items-center">
                                    <!-- <router-link :to="{path:'exchange',query:{symbol:symbol}}"
                                                class="btn btn-sm btn-primary transition-3d-hover c-blue f-14 trade-btn">
                                       Instant Trade
                                    </router-link> -->
                                    <div class="btn btn-sm btn-primary c-blue f-14 trade-btn lock">
                                       Instant Trade
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!--Why Tresso?-->
      <div class="pb-11">
         <Rowbox :rowLists="tresso">
            <div :slot="item.name" class="tresso mt-4" v-for="(item,i) in tressoList" :key="i">
               <div v-bind:class="i===0?'pr-lg-8':i===1?'pl-lg-5':'pl-lg-9'">
                  <img v-lazy='item.img' class="tresso-img">
                  <p class="f-20 c-d-black mt-6 mb-2 f-w-6">{{item.title}}</p>
                  <section class="f-16 c-d-gray f-w-5">{{item.section}}</section>
               </div>
            </div>
         </Rowbox>
      </div>
      <!--GBBO-->
      <div class="gbboTM-box pb-11 bgc2">
         <Rowbox :rowLists="gbboTM">
            <div class="gbboTMBg p-6 mb-5">
               <h3 class="f-24 c-fff f-w">Global Best Bid & Offer (GBBO™) fuels next-level trading</h3>
               <section class="c-gray-b f-14 mt-3">
                  Building upon the foundations of National Best Bid & Offer that is required in traditional securities
                  markets,
                  GBBO™ connects disjointed, local exchanges into a unified global liquidity pool to provide its traders
                  with:
               </section>
            </div>
            <Collapse></Collapse>
            <p class="f-16 c-blue">This power is not currently available in any single exchange, regardless of
               size, and only available at Tresso.</p>
         </Rowbox>
      </div>
      <!--CONNECTED EXCHANGES 需求先隐藏-->
      <!--<div class="connected-box bgc4 position-relative">-->
      <!--<div class="pt-lg-11">-->
      <!--<div class="row justify-content-center pt-lg-8">-->
      <!--<div class="col-3 mt-3" style="transform: translate3d(0, 0, 0px);">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/2.png" alt="Image Description">-->
      <!--</div>-->
      <!--<div class="col-3" style="transform: translate3d(30%, 0, 0px);">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/3.png" alt="Image Description">-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="row justify-content-between mt-6">-->
      <!--<div class="col-3 t-c">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/1.png" alt="Image Description">-->
      <!--</div>-->
      <!--<div class="col-3 t-c">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/4.png" alt="Image Description">-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="row justify-content-between mt-11">-->
      <!--<div class="col-4 t-c">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/4.png" alt="Image Description">-->
      <!--</div>-->
      <!--<div class="col-4 t-c mt-5">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/1.png" alt="Image Description">-->
      <!--</div>-->
      <!--<div class="col-4 t-c">-->
      <!--<img class="img-fluid" src="../../assets/images/tresso/5.png" alt="Image Description">-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="t-c connected">-->
      <!--<div class="p-5">-->
      <!--<h3 class="f-36 c-d-black f-w">CONNECTED EXCHANGES</h3>-->
      <!--<p class="f-18 c-d-gray mt-2">[LOGOS  OF CONNECTED EXCHANGES, APPROVED AND SUPPLIED BY CHARLIE YEH]</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->

      <!--Keep more of your margin with FREE trading-->
      <div class="free-box bgc-fff t-c pt-11 pb-11">
         <div class="container p-3">
            <h3 class="f-36 c-d-black f-w">Keep more of your margin with FREE trading</h3>
            <div style="width: 100%;overflow-x: scroll" id="free" class="free-scroll">
               <img v-lazy="require('../../assets/images/tresso/trading.png')" class="free-img mt-9">
            </div>
         </div>
      </div>
      <!--2 ways to connect-->
      <div class="connect-box bgc3">
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
                  <div>
                     <img src="../../assets/images/tresso/left.png" class="manager-icon" alt="">
                  </div>
                  <div class="pl-lg-10 pr-lg-10">
                     <h4 class="f-30 c-d-black mb-3 mt-lg-7">Join the Innovation.</h4>
                     <section class="f-16 c-d-black mb-2 f-w-5">
                        Given the maturation of the crypto, token, and digital asset markets, the trading standards and
                        operations found in current exchanges are woefully underdeveloped when compared with those of
                        traditional markets. Tresso’s institutional-grade trading with Global Best Bid and Offer is a
                        necessary innovation to these nontraditional markets. GBBO™ is the first of many innovations
                        that
                        we expect to bring to this marketplace to enhance institutional trust, credence and
                        participation
                        in nontraditional digital assets such as crypto.
                     </section>
                     <p class="f-14 c-d-gray mb-2">David Weild, Former Vice Chairman of Nasdaq</p>
                  </div>
                  <div class="t-r mt-lg-7">
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
            <ul class="row p-3 mt-lg-11 d-flex justify-content-between">
               <li v-for="item in partnersList">
                  <img v-lazy="item.img" class="partners-img">
               </li>
            </ul>
         </div>
      </div>
      <!--trading-->
      <div class="trading-box bgc-fff p-lg-11 t-c pt-5 pb-5">
         <div class="container p-lg-11">
            <h3 class="f-36 c-d-black f-w t-c">Want more efficient trading?</h3>
            <p class="f-18 c-d-gray mt-3">Tresso is currently in closed beta. Sign up now to be first on the list.</p>
            <router-link to='/register' class="btn btn-sm transition-3d-hover bgc-blue f-14 mt-7 c-fff trading-btn">
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

   import Collapse from './component/Collapse'

   export default {
      name: "index",
      components: {
         'Rowbox': Rowbox,
         Collapse
      },
      filters: {
         compare: function (value) {
            //if (!value) return ''
            if (value < 0) return 0
            return value
         },
         marketName(name){
            if(name === 'E55'){
               return 'TRESSO'
            }else if(name === 'GEMINI' || name === 'KRAKEN' || name === 'BITTREX' || name === 'COINBASEPRO'){
               return name
            }else{
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
            connect: {
               title: 'Two ways to connect',
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
               res.map((v, i) => {
                  this.symbolList_quote[v.symbol] = v;
                  if (v.symbol === this.symbol) {
                     this.currentSymbolObj = v;
                  }
               });
               this.getSockJS()
            })
         },
         getSockJS() {
            if (this.stompClient === null || !this.stompClient.connected) {
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
                  this.stompClient.subscribe(`/topic/trade/${this.symbol}`, (message) => {
                     if (message.body) {
                        this.getAvgPrice(JSON.parse(message.body))
                     }
                  });
                  this.stompClient.subscribe(`/topic/ticker/${this.symbol}`, (message) => {
                     if (message.body) {
                        this.getVol(JSON.parse(message.body))
                     }
                  });
                  this.stompClient.subscribe(`/topic/orderbook/${this.symbol}`, (message) => {
                     if (message.body) {
                        this.sortOrderBook(JSON.parse(message.body))
                     }
                  });
               }, () => {
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
            let priceTotal = 0;
            let avgObj_length = Object.keys(data).length;
            for (let i in data) {
               if (data.hasOwnProperty(i)) {
                  let price = data[i].trades[0].price
                  priceTotal = bigDecimal.add(price, priceTotal)
               }
            }
            //总价除以交易所数量
            this.gbboList.base.price = new BigNumber(priceTotal).dividedBy(avgObj_length).toFixed(2);
         },
         sortOrderBook(data) {
            let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
            var result = data

            //卖盘 最低价买
            this.gbboList.sell.price = result.asks[result.asks.length - 1].priceWithFee.toFixed(2)
            this.gbboList.sell.exchange = result.asks[result.asks.length - 1].provider

            //买盘 最高价卖
            this.gbboList.buy.price = result.bids[0].priceWithFee.toFixed(2)
            this.gbboList.buy.exchange = result.bids[0].provider // 交易所logo

            const avg = this.gbboList.base.price
            this.gbboList.sell.diffAvg = bigDecimal.subtract(avg, this.gbboList.sell.price)

            this.gbboList.buy.diffAvg = bigDecimal.subtract(this.gbboList.buy.price, avg)

            // 差价
            var diff = this.gbboList.buy.price - this.gbboList.sell.price
            this.gbboList.avg.price = bigDecimal.round(diff, priceLong)

            if (diff <= 0) {
               this.gbboList.avg.change = 0
            } else {
               this.gbboList.avg.change = new BigNumber(this.gbboList.avg.price).dividedBy(avg).multipliedBy(100).toFixed(4) + '%';
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
      @media screen and (min-width: 768px) {
         .top {
            padding-top: 189px;
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
      .top {
         background: url("../../assets/images/tresso/banner.png") top center no-repeat;
         background-size: cover;
         height: 800px;
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
         padding: 7px 11px;
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
         background: #1A232B url("../../assets/images/tresso/connectBg.png") top center;
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
            width: 1110px;
            /*width: 100%;*/
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
   .gbboTableWrap{
      overflow: auto;
      padding:0;
      .gbboTable{
         width:1095px;
         color: #fff;
         .dataTitle{
            color: #fff;
         }
         .dataWrap{
            border-bottom: 1px #2E3D49 solid;
            color: #fff;
            .dataInner{
               border-right: 1px #2E3D49 solid;
               &.noBorder{
                  border-right: none;
               }
               .redNum{
                  color: #EB4D59;
               }
               .greenNum{
                  color:#66B76D;
               }
               .lock{
                  background-color: gray;
                  border: none;
                  color: #fff;
                  cursor: not-allowed;
               }
            }
         }
      }
   }
</style>