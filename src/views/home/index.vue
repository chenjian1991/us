<template>
  <main class="home home-common" id="home">
    <!--top-->
    <div class="top bgc-151D24 pb-5">
      <div class="container">
        <h1 class="c-fff f-w pt-3 pt-lg-0 top-title">
          Superior Trading with GBBO™: Global<br>
          Best Bid and Offer
        </h1>
        <section class="c-l-gray f-18 mt-1 top-desc pt-6 pt-lg-0">
          Tresso’s institutional-grade GBBO™ technology scans the deep liquidity pools across the globe to deliver the
          best prices available from its network of partner nodes. Coupled with high-speed cross-fiat conversion, a
          seamless single point of execution and no additional fees for USDD* transactions, Tresso gives the expert
          trader more opportunities to win.
        </section>
        <router-link to='/register' class="btn btn-sm transition-3d-hover button bgc-01B2D6 f-14 c-fff mt-7">
          Join the Beta
        </router-link>
      </div>
    </div>
    <div class="gbbo pb-lg-11 pt-3 pt-lg-0 gbboPC" id="GBBO">
      <div class="container">
        <div class="d-flex align-items-baseline"><span class="f-28 c-fff f-w-6 mr-4">GBBO™</span><span
            class="f-14 c-B9C9D6">Global Best Bid and Offer</span></div>
        <section>
          <div class="quote">
            <div class="left">
              <div class="square-box">
                <div class="arrow" v-show="turn"></div>
                <div class="square" @click="toggle">
                  <img src="../../assets/images/tresso/down-icon.png" alt="" class="img" v-show="turn">
                  <img src="../../assets/images/tresso/right-icon.png" alt="" class="img" v-show="!turn">
                </div>
              </div>
              <span class="symbol c-fff">{{gbboBase.baseAssets}}{{gbboBase.quoteAssets}}</span>
              <span class="desc">Max Arbitrage:</span>
              <span class="f-20 f-w-6 c-01B2D6 mr-4">{{gbboList.maxArb|compare}}</span>
              <!--<Tooltip placement="top-start" offset="-15 25">-->
              <!--<router-link :to="{path:'exchange',query:{symbol:symbol}}"-->
              <!--class="btn btn-sm btn-primary transition-3d-hover trade-btn disabled">-->
              <!--One-Click Arbitrage-->
              <!--</router-link>-->
              <!--<div slot="content" class="c-fff">-->
              <!--One-Click Arbitrage is under <br> development. Ready in 2020.-->
              <!--</div>-->
              <!--</Tooltip>-->
              <router-link :to="loginToken?{path:'gbbo'}:{path:'login'}"
                           class="btn btn-sm btn-primary transition-3d-hover trade-btn">
                One-Click Arbitrage
              </router-link>
            </div>
            <div class="right">
              <span class="desc">Market Avg:</span>
              <span class="f-18 c-00A077 price">{{gbboList.avgPrice|separate}}</span>
              <!--<span class="change change-up">{{gbboList.avgChange}}</span>-->
              <span class="desc">24h Vol:</span>
              <span class="symbol c-DBE8F2">{{gbboList.vol|separate}}</span>
            </div>
          </div>
          <ul class="list" v-show="turn">
            <li class="bgc-19232C">
              <span class="item" v-for="item of gbboTitle">{{item.title}}</span>
            </li>
            <li v-for="(gbbo,i) of quoteList" :key="gbbo.id" v-show="i===0" class="bgc-131A21">
              <div class="item">
                <p class="f-20 c-01B2D6 f-w-5">{{gbbo.arb|compare}}</p>
                <p class="f-14 c-8996A2 f-w-5">Est Return：{{gbboList.avgChange|compare}}</p>
              </div>
              <div class="item">
                <span class="f-16 c-DBE8F2 f-w-5">{{gbbo.amount.toFixed(8)}}</span>
              </div>
              <div class="item">
                <span class="f-16 c-E83160 f-w-5 mr-4">{{gbbo.sellPrice}}</span>
                <span class="f-14 c-8996A2">{{gbbo.sell|marketName}}</span>
                <p class="f-14 c-8996A2 f-w-5">< Markets Avg {{sellDiffAvg|compare}}</p>
              </div>
              <div class="item">
                <span class="f-18 c-00A077 f-w-5 mr-4">{{gbbo.buyPrice}}</span>
                <span class="f-14 c-8996A2">{{gbbo.buy|marketName}}</span>
                <p class="f-14 c-8996A2 f-w-5">> Market Avg {{buyDiffAvg|compare}}</p>
              </div>
            </li>
            <li v-for="(gbbo,i) of quoteList" :key="gbbo.id" v-show="i!==0"
                :class="i%2!==0?'bgc-19232C':'bgc-131A21'">
              <div class="item">
                <p class="f-20 c-01B2D6 f-w-5">{{gbbo.arb|compare}}</p>
              </div>
              <div class="item">
                <span class="f-16 c-DBE8F2 f-w-5">{{gbbo.amount}}</span>
              </div>
              <div class="item">
                <span class="f-16 c-E83160 f-w-5 mr-4">{{gbbo.sellPrice}}</span>
                <span class="f-14 c-8996A2">{{gbbo.sell|marketName}}</span>
              </div>
              <div class="item">
                <span class="f-18 c-00A077 f-w-5 mr-4">{{gbbo.buyPrice}}</span>
                <span class="f-14 c-8996A2">{{gbbo.buy|marketName}}</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <!--h5-->
    <div class="gbbo-mobile gbboMobile" id="GBBO">
      <h1 class="f-30 c-fff f-w-6 pl-3">GBBO™</h1>
      <p class="f-18 c-B9C9D6 f-w-5 pl-3">Global Best Bid and Offer</p>
      <Row class="mobile-title-box">
        <Col span="2">&nbsp;</Col>
        <Col span="6" class="title">Pair</Col>
        <Col span="6" class="title">Market Avg</Col>
        <Col span="10" class="title">Max Arbitrage</Col>
      </Row>
      <Row class="mobile-quote-list">
        <Col span="2" class="t-c">
          <img src="../../assets/images/tresso/mobile-down.png" alt="" class="img" v-show="turn" @click="toggle">
          <img src="../../assets/images/tresso/mobile-right.png" alt="" class="img" v-show="!turn" @click="toggle">
        </Col>
        <Col span="6" class="f-16 f-w-5 c-C7D5E1">{{gbboBase.baseAssets}}{{gbboBase.quoteAssets}}</Col>
        <Col span="6" class="f-18 f-w-5 c-00A077">{{gbboList.avgPrice|separate}}</Col>
        <Col span="4" class="f-16 f-w-5 c-01B2D6">{{gbboList.maxArb}}</Col>
        <Col span="6" class="t-r pr-3">
          <router-link :to="{path:'exchange',query:{symbol:symbol}}"
                       class="btn btn-sm btn-primary transition-3d-hover mobile-trade-btn disabled">
            One-Click<br>Arbitrage
          </router-link>
        </Col>
      </Row>
      <div v-show="turn">
        <Row class="mobile-gbbo-box">
          <Col span="6" class="title">Arbitrage</Col>
          <Col span="6" class="title">Size</Col>
          <Col span="6" class="title t-r">Best Ask</Col>
          <Col span="6" class="title t-r">Best Bid</Col>
        </Row>
        <Row class="mobile-gbbo-list" v-for="gbbo of quoteList" :key="gbbo.id">
          <Col span="6" class="f-16 f-w-6 c-01B2D6">{{gbbo.arb|compare}}</Col>
          <Col span="6" class="f-16 f-w-6 c-C6D4E0">{{gbbo.amount.toFixed(8)}}</Col>
          <Col span="6" class="t-r">
            <p class="f-16 f-w-6 c-E83160">{{gbbo.sellPrice}}</p>
            <p class="f-12 f-w-5 c-8996A2">{{gbbo.sell|marketName}}</p>
          </Col>
          <Col span="6" class="t-r">
            <p class="f-16 f-w-6 c-00A077">{{gbbo.buyPrice}}</p>
            <p class="f-12 f-w-5 c-8996A2">{{gbbo.buy|marketName}}</p>
          </Col>
        </Row>
      </div>
    </div>

    <!--GBBOTM-->
    <div class="gbboTM-box pt-11 pb-11 bgc-12191F">
      <div class="container p-3">
        <h3 class="f-36 c-FEFFFF f-w-6 t-c">The Power of GBBO</h3>
        <p class="f-16 f-w-5 c-B9C9D6 mt-6 t-c">Tresso’s proprietary technology, GBBO™, provides access* to many of the
          deepest global liquidity pools and enables superior trade execution. <br>This power is not currently available
          in any single exchange, regardless of size, and only available at Tresso.</p>
        <ul class="mt-5">
          <li class="gbbo-item t-l pr-6" v-for="(item,i) in gbboTMList" :key="i">
            <div class="d-f mt-8">
              <img src="../../assets/images/tresso/checked.png" class="gbboTM-img mr-4">
              <dl class="d-ib gbboTM-dl">
                <dt class="f-18 f-w-5 c-fff mb-2">{{item.title}}</dt>
                <dd class="f-14 c-B9C9D6 gbboTM-dd">{{item.des}}</dd>
              </dl>
            </div>
          </li>
          <li class="f-14 c-77838F t-r">*Subject to applicable regulations</li>
        </ul>
      </div>
    </div>
    <!--Keep more of your margin with FREE trading-->
    <div class="free-box bgc-fff t-c pt-11 pb-11">
      <div class="container p-3">
        <h3 class="f-36 c-304454 f-w">Keep more of your margin with FREE trading</h3>
        <div style="width: 100%;overflow-x: scroll" id="free" class="free-scroll">
          <img v-lazy="require('../../assets/images/tresso/trading.png')" class="free-img mt-9">
        </div>
        <p class="f-14 c-77838F t-l mt-4">**Using smart order routing and matching engine technology, GBBO discovers the
          best prices attainable from its entire global* network.</p>
      </div>
    </div>
    <!--Why Tresso?-->
    <div class="pb-11 bgc-12191F">
      <Rowbox :rowLists="tresso" class="pl-8 pr-8 pl-lg-0 pr-lg-0">
        <div :slot="item.name" class="tresso mt-4" v-for="(item,i) in tressoList" :key="i">
          <div v-bind:class="i===0?'pr-lg-8':i===1?'pl-lg-5':'pl-lg-9'">
            <img v-lazy='item.img' class="tresso-img">
            <p class="f-20 c-fff mt-6 mb-2 f-w-6">{{item.title}}
              <!--提示-->
              <Tooltip placement="top-end" offset="10" v-if="i===2">
                <img src="../../assets/images/tresso/help.png" alt="" width="16" class="ml-1 mb-2">
                <!--<Icon type="ios-help-circle" class="help-icon c-2A3D4D"/>-->
                <section slot="content" class="f-w-4 c-FEFFFF">
                  Tresso offers no fee trading for USDD pairs. The displayed <br>
                  price may include fees charged by our service providers <br>
                  and/or market makers. <br>
                  The fee structure for USDD pairs can be found
                  <router-link to='/usd_fees'>here</router-link>
                </section>
              </Tooltip>
            </p>
            <section class="f-16 c-B9C9D6 f-w-5">{{item.section}}</section>
          </div>
        </div>
      </Rowbox>
    </div>
    <!--2 ways to connect-->
    <div class="connect-box bgc-F7F9FB pb-11">
      <Rowbox :rowLists="connect" class="pb-5">
        <div :slot="item.name" class="connect bgc-fff br-8 p-lg-7 pr-lg-9 mt-5 mt-lg-3 p-5"
             v-for="(item,i) in connectList"
             :key="i">
          <img v-lazy='item.img' class="connect-img">
          <p class="f-20 c-304454 mt-4 mb-2 f-w-6">{{item.title}}</p>
          <section class="f-16 c-d-gray f-w-5">{{item.section}}</section>
        </div>
      </Rowbox>
    </div>
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
            <div class="pl-lg-10 pr-lg-10 mt-3 mt-lg-0 p-4 p-lg-0">
              <h4 class="f-30 c-304454 mb-2 mt-lg-7">Join the Innovation.</h4>
              <p class="f-16 f-w-5 c-304454 mb-3">David Weild, Former Vice Chairman of Nasdaq</p>
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
    <div class="partners-box bgc-1A232B pt-lg-11 pb-lg-11">
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
        <h3 class="f-36 c-304454 f-w t-c">Want more efficient trading?</h3>
        <p class="f-18 c-d-gray mt-3">Tresso is currently in closed beta. Sign up now to be first on the list.</p>
        <router-link to='/register'
                     class="btn btn-sm transition-3d-hover button bgc-01B2D6 f-14 c-fff mt-7 border-0">
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
    getDecimalsNum, getParseFloat
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
        } else if (name === 'GEMINI' || name === 'KRAKEN' || name === 'BITTREX' || name === 'COINBASEPRO' || name === 'TRESSO') {
          return name
        } else {
          return 'Market Maker'
        }
      },
      separate: function (value) {
        if (value === '--') return value
        return getParseFloat(value, 2)
      },
    },
    data() {
      return {
        loginToken: $cookies.get('loginToken'),
        symbol: 'BTCUSD',
        turn: true,
        stompClient: null,
        arbStompClient: null,
        symbolList_quote: [],
        currentSymbolObj: {},
        priceLong: 0,
        quoteList: [],
        quoteWS: null,//行情websocket推送
        gbboTitle: [{title: 'Spread (-)',}, {title: 'Size',}, {title: 'Best Ask',}, {title: 'Best Bid',}],
        gbboBase: {
          baseAssets: 'BTC',
          quoteAssets: '/USD',
        },
        gbboList: {
          maxArb: '--',
          avgPrice: '--',
          avgChange: '--',
          vol: '--',
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
            section: 'GBBO™ provides best attainable global price** through smart order routing and matching engine on a global consolidated order book.'
          },
          {
            name: 'middle',
            img: require('../../assets/images/tresso/tresso2.png'),
            title: 'Deepest Attainable Liquidity Pools',
            section: 'Execute high volume orders via Tresso’s access to deepest attainable liquidity pools.'
          },
          {
            name: 'right',
            img: require('../../assets/images/tresso/tresso3.png'),
            title: 'Free Trading (USDD Pair)',
            section: 'No transaction, withdrawal fees or subscription fee for every user. What you see is what you pay.'
          },
        ],
        gbboTMList: [
          {
            title: "DEEPEST LIQUIDITY",
            des: "Global consolidated order book fills large volume trades with ease"
          },
          {
            title: "BEST GLOBAL PRICES",
            des: "Using smart order router and matching engine technology, GBBO™ uncovers the best available (lowest) ask price and the best available (highest) bid price in crypto trading"
          },
          {
            title: "CROSS-CURRENCY CONVERSION",
            des: "Execute cross-currency orders for access to true global best pricing, all at no additional fee"
          },
          {
            title: "TRUE SINGLE ACCOUNT",
            des: "No need to open, keep, and maintain accounts with multiple systems and exchanges"
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
        // if (this.stompClient === null || !this.stompClient.connected) {
        //    const domain = document.domain;
        //    let socket = null
        //    if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
        //       socket = new SockJS('https://' + domain + '/xchange/marketdata');
        //    } else {
        //       socket = new SockJS('http://52.73.95.54:8090/xchange/marketdata');
        //    }
        //    this.stompClient = Stomp.over(socket);
        //    this.stompClient.debug = null
        //    this.stompClient.heartbeat.outgoing = 1000;
        //    this.stompClient.connect({}, () => {
        //       this.stompClient.subscribe(`/topic/bbo/${this.symbol}`, (message) => {
        //          if (message.body) {
        //             this.getAvgPrice(JSON.parse(message.body))
        //          }
        //       });
        //    }, () => {
        //       console.log('The websocket connet error')
        //       this.stompClient = null
        //    });
        // }
        if (this.arbStompClient === null || !this.arbStompClient.connected) {
          const domain = document.domain;
          let socket = null
          if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
            socket = new SockJS('https://' + domain + '/echart/xchange/marketdata');
          } else {
            socket = new SockJS('http://52.68.13.17:20013/echart/xchange/marketdata');
          }
          this.arbStompClient = Stomp.over(socket);
          this.arbStompClient.debug = null
          this.arbStompClient.heartbeat.outgoing = 1000;
          this.arbStompClient.connect({}, () => {
            //均价
            const params = JSON.stringify({symbol: "BTCUSD", interval: "MINUTE_1"})
            this.arbStompClient.send("/echart/app/summarized.ws", {}, params)


            this.arbStompClient.subscribe(`/topic/arb/${this.symbol}`, (message) => {
              if (message.body) {
                this.arb(JSON.parse(message.body))
              }
            });
            this.arbStompClient.subscribe(`/topic/runtime/${this.symbol}/MINUTE_1`, (message) => {
              console.log(message)

              if (message.body) {
                this.getAvgPrice(JSON.parse(message.body))
              }
            })
          }, () => {
            console.log('The websocket connet error')
            this.arbStompClient = null
          });
        }
      },
      // 计算平均价
      getAvgPrice(data) {
        console.log(data)
        this.gbboList.avgPrice = data.ma

        //每个交易所的value的数组
        // const providerBBOMap = Object.values(data.providerBBOMap).filter((v) => {
        //    if (v.provider !== 'TRESSO') return v
        // })
        // let sum = 0
        // let length = providerBBOMap.length
        // sum = providerBBOMap.reduce((total, currentValue) => {
        //    if (currentValue['askLevel'] && currentValue['bidLevel']) {
        //       return total + currentValue['askLevel']['priceWithFee'] + currentValue['bidLevel']['priceWithFee']
        //    } else {
        //       --length
        //       return total
        //    }
        // }, 0)

        // this.gbboList.avgPrice = new BigNumber(sum).dividedBy(length * 2).toFixed(2);
      },
      arb(data) {
        this.gbboList.maxArb = data.maxArb.toFixed(2)
        this.quoteList = data['matchMap'].slice(0, 5)
        this.gbboList.sellPrice = data['matchMap'][0] && data['matchMap'][0].sellPrice
        this.gbboList.buyPrice = data['matchMap'][0] && data['matchMap'][0].buyPrice
        // 差价
        const maxArb = data.maxArb

        if (maxArb <= 0) {
          this.gbboList.avgChange = 0
        } else {
          this.gbboList.avgChange = new BigNumber(maxArb).dividedBy(this.gbboList.avgPrice).multipliedBy(100).toFixed(4) + '%';
        }
      },
      toggle() {
        this.turn = !this.turn
      },
    },
    mounted() {
      this.init()
    },
    computed: {
      sellDiffAvg: function () {
        return bigDecimal.round(this.gbboList.avgPrice - this.gbboList.sellPrice, this.priceLong)
      },
      buyDiffAvg: function () {
        return bigDecimal.round(this.gbboList.buyPrice - this.gbboList.avgPrice, this.priceLong)
      },
    },
    beforeDestroy() {
      this.quoteWS && this.quoteWS.close();
      if (this.stompClient != null) {
        this.stompClient.disconnect();
      }
      if (this.arbStompClient != null) {
        this.arbStompClient.disconnect();
      }
    },
  }
</script>
<style lang="less">
  #home {
    /*tooltip*/
    .ivu-tooltip-inner {
      max-width: none;
      padding: 12px 26px;
      font-size: 14px;
    }
  }

</style>

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
    @media screen and (min-width: 992px) {
      .gbboPC {
        display: block !important;
      }

      .gbboMobile {
        display: none !important;
      }
    }
    @media screen and (max-width: 991px) {
      .gbboPC {
        display: none !important;
      }

      .gbboMobile {
        display: block !important;
      }
    }
    @media screen and (min-width: 768px) {
      .top {
        padding-top: 80px;
        .top-title {
          .f-40;
        }
      }

      .gbboTMBg {
        background-size: cover;
      }
    }
    @media screen and (max-width: 767px) {
      .top {
        .top-title {
          .f-34;
        }
      }

      .gbboTMBg {
        background-size: contain;
      }

      .partners-img {
        width: 192*0.8px !important;
      }

    }

    .top {
      background: url("../../assets/images/tresso/banner.png") no-repeat;
      background-position: center;
      background-size: cover;

      min-height: 530px;
      .top-desc {
        max-width: 750px;
      }
    }
    .gbbo {
      .bgc-151D24;
      .gbbo-title-list {
        width: 100%;
        border-radius: 4px 4px 0 0;
        .gbbo-title-item {
          width: 25%;
          height: 50px;
          line-height: 50px;
        }
      }
      .quote {
        .d-f;
        justify-content: space-between;
        height: 74px;
        margin-top: 20px;
        .bgc-2A3D4D;
        border-radius: 4px;
        .left, .right {
          .d-f;
          align-items: center;
        }
        .square-box {
          position: relative;
          margin-right: 22px;
          .square {
            .d-ib;
            width: 74px;
            height: 74px;
            line-height: 74px;
            text-align: center;
            .bgc-01B2D6;
            border-radius: 4px 0 0 4px;
            .img {
              width: 22px;
              cursor: pointer;
            }
          }
          .arrow {
            position: absolute;
            left: 50%;
            bottom: -8px;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 8px 8px 0;
            border-top-color: #01B2D6;
          }
        }

        .desc {
          margin-right: 14px;
          .f-16;
          .c-B9C9D6;
          .f-w-5;
        }
        .symbol {
          margin-right: 20px;
          .f-20;
          .f-w-6;
        }
        .price {
          margin-right: 30px;
          .f-20;
          .f-w-6;
        }
        .common-style {
          .c-77838F;
          .f-14
        }
        .change {
          padding: 1px 9px;
          margin-right: 20px;
          .f-12;
          border-radius: 2px;
        }
        .change-up {
          .c-00A077;
          background: rgba(0, 160, 119, 0.14);
        }

      }
      .list {
        height: 530px;
        li {
          .d-f;
          align-items: center;
          padding-left: 96px;
          height: 78px;
          &:nth-child(1) {
            height: 50px;
            span {
              .f-14;
              .c-DBE8F2;
            }
          }
        }
        .item {
          .d-ib;
          width: 25%;
        }
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
      /*width: 160px;*/
      /*height: 40px;*/
      padding: 7px 18px;
      .f-14;
      .c-fff;
      .bgc-01B2D6;
      border: none;
      opacity: 1;
    }

    .tresso {
      .tresso-img {
        width: 60px;
      }
    }

    .gbboTM-box {
      .gbboTM-img {
        width: 24px;
        height: 24px;
        vertical-align: text-top;
      }
      .gbbo-item {
        .d-ib;
        width: 50%;
      }
      .gbboTM-dl {
        text-align: left;
        vertical-align: text-top;
      }
      .gbboTM-dd {
        line-height: 24px;
      }
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
        max-width: 370px;
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
    .bgc-151D24;
    .img {
      width: 17px;
    }
    .mobile-title-box {
      background-color: #131A21;
      height: 45px;
      line-height: 45px;
      .title {
        .f-14;
        .c-8996A2;
        .f-w-5;
      }
    }
    .mobile-trade-btn {
      padding: 5px 14px;
      line-height: 14px;
      .f-12;
      .f-w-5;
      .c-fff;
      .bgc-01B2D6;
      border: none;
      opacity: 1;
    }
    .mobile-quote-list {
      height: 65px;
      line-height: 65px;
      background-color: #151D24;
      border-top: solid 1px #1E2A36;
    }
    .mobile-gbbo-box {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      .f-12;
      .c-8996A2;
      background-color: #131A21;
      border-bottom: solid 1px #1E2A36;
    }
    .mobile-gbbo-list {
      .d-f;
      align-items: center;
      height: 55px;
      padding: 0 15px;
      border-bottom: solid 1px #091016;
      background-color: #131A21;
    }
  }

</style>