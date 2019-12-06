<template>
  <main class="home" id="home">
    <!--top-->
    <div class="top pb-5">
      <div class="container">
        <h1 class="f-40 c-fff f-w-5 pt-3 pt-lg-0 top-title">
          Superior Trading with GBBO™:<br>
          Global Best Bid and Offer
        </h1>
        <section class="c-C7D1D9 f-18 mt-1 top-desc pt-6 pt-lg-0">
          Tresso’s institutional-grade GBBO™ technology scans deep liquidity pools across the globe to deliver the best
          prices available from its network of partner nodes. Coupled with high-speed cross-fiat conversion, a seamless
          single point of execution and no additional fees for <a
            href="https://tresso.zendesk.com/hc/en-us/articles/360038973474-What-is-USD-Digital-USDD-" target="_blank"
            class="underline c-C7D1D9">USDD</a> transactions, Tresso gives the expert trader more
          opportunities to win.
        </section>
        <router-link :to="loginToken?'/balances':'/login'"
                     class="btn btn-sm transition-3d-hover button bgc-01B2D6 f-14 c-fff mt-7">
          Join the Beta
        </router-link>
      </div>
    </div>
    <div class="gbbo pb-lg-11 pt-0 gbboPC" id="GBBO">
      <div class="container">
        <div class="d-flex align-items-baseline"><span class="f-28 c-fff f-w-6 mr-4">GBBO™</span><span
            class="f-14 c-B9C9D6">Global Best Bid and Offer, Powered by APIFINY</span></div>
        <section>
          <!--头部-->
          <div class="quote">
            <div class="left pl-7">
              <span class="symbol c-fff">{{gbboBase.baseAssets}}{{gbboBase.quoteAssets}}</span>
              <span class="desc">Max Arbitrage:</span>
              <span class="f-20 f-w-6 c-01B2D6 mr-4" style="width: 55px">{{gbboList.maxArb|compare}}</span>
              <button class="btn btn-sm btn-primary transition-3d-hover trade-btn" style="cursor: pointer" @click="clickArbitrage">One-Click
                Arbitrage
              </button>
            </div>
            <div class="right">
              <span class="desc">Market Avg:</span>
              <span class="f-18 c-00A077 price">{{gbboList.avgPrice|separate}}</span>
              <span class="desc">24h Vol:</span>
              <span class="symbol c-DBE8F2">{{gbboList.vol|separate}}</span>
            </div>
          </div>
          <!--数据列表-->
          <ul class="list">
            <li class="bgc-19232C">
              <span class="item" v-for="item of gbboTitle">{{item.title}}</span>
            </li>
            <!--点击每一行 跳到gbbo页面-->
            <router-link to="/gbbo">
              <!--没数据-->
              <li class="bgc-131A21" v-show="quoteList.length===0">
                <div class="item">
                  <p class="f-20 c-01B2D6 f-w-5">0</p>
                </div>
                <div class="item">
                  <span class="f-16 c-DBE8F2 f-w-5">0</span>
                </div>
                <div class="item">
                  <span class="f-16 c-E83160 f-w-5 mr-4">{{noDiff.sellPrice}}</span>
                  <span class="f-14 c-8996A2">{{noDiff.sell|marketName}}</span>
                </div>
                <div class="item">
                  <span class="f-18 c-00A077 f-w-5 mr-4">{{noDiff.buyPrice}}</span>
                  <span class="f-14 c-8996A2">{{noDiff.buy|marketName}}</span>
                </div>
              </li>
              <!--有数据 第一行-->
              <li v-for="gbbo of quoteList.slice(0,1)" :key="gbbo.id" class="bgc-131A21">
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
            </router-link>

          </ul>
          <ul class="toggle-list" v-show="turn">
            <router-link to="/gbbo">
              <li v-for="(gbbo,i) of quoteList.slice(1)" :key="gbbo.id"
                  :class="i%2===0?'bgc-19232C':'bgc-131A21'">
                <div class="item">
                  <p class="f-20 c-01B2D6 f-w-5">{{gbbo.arb|compare}}</p>
                </div>
                <div class="item">
                  <span class="f-16 c-DBE8F2 f-w-5">{{gbbo.amount.toFixed(8)}}</span>
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
            </router-link>
          </ul>
          <div class="view" @click="turn=!turn">
            <span>{{turn!==true?'View more':'Collapse'}}</span>
            <img src="../../assets/images/tresso/down.png" alt="" :class="{'up-down-transform':turn}">
          </div>
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
          <a href="javascript:;"
             class="btn btn-sm btn-primary transition-3d-hover mobile-trade-btn" @click="clickArbitrage">
            One-Click<br>Arbitrage
          </a>
        </Col>
      </Row>
      <div>
        <Row class="mobile-gbbo-box">
          <Col span="6" class="title">Spread (-)</Col>
          <Col span="6" class="title">Size</Col>
          <Col span="6" class="title t-r">Best Ask</Col>
          <Col span="6" class="title t-r">Best Bid</Col>
        </Row>
        <router-link to="/gbbo">
          <Row class="mobile-gbbo-list" v-for="gbbo of quoteList.slice(0,1)" :key="gbbo.id">
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
          <Row class="mobile-gbbo-list" v-for="gbbo of quoteList.slice(1)" :key="gbbo.id" v-show="turn">
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
          <!--没数据-->
          <Row class="mobile-gbbo-list" v-show="quoteList.length===0">
            <Col span="6" class="f-16 f-w-6 c-01B2D6">0</Col>
            <Col span="6" class="f-16 f-w-6 c-C6D4E0">0</Col>
            <Col span="6" class="t-r">
              <p class="f-16 f-w-6 c-E83160">{{noDiff.sellPrice}}</p>
              <p class="f-12 f-w-5 c-8996A2">{{noDiff.sell|marketName}}</p>
            </Col>
            <Col span="6" class="t-r">
              <p class="f-16 f-w-6 c-00A077">{{noDiff.buyPrice}}</p>
              <p class="f-12 f-w-5 c-8996A2">{{noDiff.buy|marketName}}</p>
            </Col>
          </Row>
        </router-link>
      </div>
    </div>

    <!--GBBOTM-->
    <div class="gbboTM-box pt-11 pb-11 bgc-12191F">
      <div class="container p-3">
        <h3 class="f-36 c-FEFFFF f-w-6 t-c">The Power of GBBO</h3>
        <p class="f-16 f-w-5 c-B9C9D6 mt-6 t-c">Tresso’s proprietary technology, GBBO™, provides access* to many of the
          deepest global liquidity pools and enables superior trade execution. <br>This power is not currently available
          in any single exchange, regardless of size, and only available at Tresso.</p>
        <div class="row mt-10">
          <div class="col-md-6">
            <ul>
              <li class="gbbo-item t-l" v-for="(item,i) in gbboTMList" :key="i">
                <div class="d-f mb-6">
                  <img src="../../assets/images/tresso/checked.png" class="gbboTM-img mr-4">
                  <dl class="d-ib gbboTM-dl">
                    <dt class="f-18 f-w-5 c-fff mb-2">{{item.title}}</dt>
                    <dd class="f-14 c-B9C9D6 gbboTM-dd">{{item.des}}</dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-6 gbboTM-right pb-6">
            <img src="../../assets/images/tresso/power.png" alt="" style="width: 100%;max-width: 420px"
                 class="mt-2 mb-3">
            <p class="f-14 c-77838F self">*Subject to applicable regulations</p>
          </div>
        </div>
      </div>
    </div>
    <!--Keep more of your margin with FREE trading-->
    <div class="free-box bgc-fff t-c pt-11 pb-11">
      <div class="container p-3">
        <h3 class="f-36 c-304454 f-w">Keep More with Lower Fees</h3>
        <div style="width: 100%;overflow-x: scroll" id="free" class="free-scroll">
          <img v-lazy="require('../../assets/images/tresso/trading.png')" class="free-img mt-9"
               style="max-height: 390px">
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
                <section slot="content" class="f-w-4 c-FEFFFF">
                  Tresso offers no fee trading for USDD pairs. The displayed <br>
                  price may include fees charged by our service providers <br>
                  and/or market makers. <br>
                  The fee structure for USD pairs can be found
                  <router-link to='/usd_fees' class="here">here</router-link>
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
             v-for="(item,i) in connectList" :key="i" :class="i===1?'c-p':''" @click="goApi(i)">
          <img v-lazy='item.img' class="connect-img">
          <p class="f-20 c-304454 mt-4 mb-2 f-w-6">{{item.title}}</p>
          <section class="f-16 c-d-gray f-w-5">{{item.section}}</section>
        </div>
      </Rowbox>
    </div>
    <!--manager-->
    <div class="manager-box bgc-fff pt-11 pb-11">
      <div class="container pt-4 pb-4">
        <div class="row">
          <div class="col-md-5 p-0 t-c">
            <img v-lazy='require("../../assets/images/tresso/manager.png")' class="manager-img mb-3">
          </div>
          <div class="col-md-7 manager-right">
            <img src="../../assets/images/tresso/left.png" class="right-top manager-icon" alt="">
            <div class="pl-3 pr-3">
              <h4 class="f-30 c-304454 mb-2">Join the Innovation.</h4>
              <p class="f-16 f-w-5 c-304454 mb-3">David Weild, Former Vice Chairman of Nasdaq</p>
              <section class="f-16 c-77838F f-w-5">
                The Internet makes connections available everywhere. Blockchain technology makes assets 
                trustworthy, credible and has "findability." In the near future, assets can flow freely
                 on a unified market around the world like commodities. Apifiny is committed to this 
                 mission. Cryptocurrency is just the beginning.
              </section>
            </div>
            <img src="../../assets/images/tresso/right.png" class="right-bottom manager-icon" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--PARTNERS-->
    <div class="partners-box bgc-1A232B pt-11 pb-11">
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
    <div class="trading-box bgc-fff pt-11 pb-11 t-c">
      <div class="container pt-4 pb-4">
        <h3 class="f-36 c-304454 f-w t-c">Want more efficient trading</h3>
        <p class="f-18 c-d-gray mt-3">Tresso is currently in closed beta. Sign up now to be first on the list.</p>
        <router-link :to="loginToken?'/balances':'/login'"
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
        noDiff: {
          buyPrice: 0,
          buy: "",
          sell: "",
          sellPrice: 0
        },
        tresso: {
          title: 'Why Tresso',
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
            title: "DEEP GLOBAL LIQUIDITY",
            des: "Access* to many of the deeped global liquidity pools facilitates large volume trades."
          },
          {
            title: "CROSS-CURRENCY CONVERSION",
            des: "High-speed, cross-currency conversion against multiple fiats dramatically increases the number of available trading pairs at no additional FX fees."
          },
          {
            title: "ONE ACCOUNT, GLOBAL ACCESS*",
            des: "No need to open, keep, and maintain accounts with multiple systems and exchanges."
          },
          {
            title: "BEST ATTAINABLE GLOBAL PRICES",
            des: "Using smart order routing and matching engine technology, GBBO discovers the best prices attainable from its entire global* network."
          },
          {
            title: "EASY ARBITRAGE",
            des: "Tresso’s separate order books for buying and selling monitors, captures and facilitates global arbitrage opportunities in a single click."
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
          this.getTicker()
        })
      },
      //按钮逻辑
      clickArbitrage() {
        if (this.loginToken) {
          this.$router.push('/gbbo')
        } else {
          this.$router.push({
            name: 'login',
            params: {
              path: '/gbbo'
            }
          })
        }
      },
      getSockJS() {
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
      getTicker() {
        if (this.stompClient == null || !this.stompClient.connected) {
          const domain = document.domain;
          let socket = null
          if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
            socket = new SockJS('https://' + domain + '/xchange/marketdata');
          } else {
            socket = new SockJS('http://52.73.95.54:8090/xchange/marketdata')
          }
          this.stompClient = Stomp.over(socket);
          this.stompClient.debug = null
          this.stompClient.heartbeat.outgoing = 1000;
          this.stompClient.connect({}, () => {
            this.stompClient.subscribe(`/topic/ticker/${this.symbol}`, (message) => {
              if (message.body) {
                this.ticker(JSON.parse(message.body))
              }
            });
          }, () => {
            console.log('new Sockjs  error')
            this.stompClient.disconnect()
          });
        }
      },
      //24h 交易量
      ticker(data) {
        const providerBBOMap = Object.values(data)
        let sum = 0
        sum = providerBBOMap.reduce((total, currentValue) => {
          return total + currentValue['volume']
        }, 0)
        this.gbboList.vol = sum.toFixed(2);
      },
      // 计算平均价
      getAvgPrice(data) {
        this.gbboList.avgPrice = data.ma
      },
      //展示数据
      arb(data) {
        console.log(data)
        if (data.matchMap.length) {
          this.gbboList.maxArb = data.maxArb.toFixed(2)
          this.quoteList = data['matchMap'].slice(0, 5)
          this.gbboList.sellPrice = data['matchMap'][0] && data['matchMap'][0].sellPrice
          this.gbboList.buyPrice = data['matchMap'][0] && data['matchMap'][0].buyPrice
          // 差价
          const maxArb = data['matchMap'][0].arb

          if (maxArb <= 0) {
            this.gbboList.avgChange = 0
          } else {
            this.gbboList.avgChange = new BigNumber(maxArb).dividedBy(this.gbboList.avgPrice).multipliedBy(100).toFixed(4) + '%';
          }
        } else {
          this.gbboList.maxArb = 0
          this.noDiff = data.firstLeg
        }
      },
      toggle() {
        this.turn = !this.turn
      },
      goApi(i) {
        if (i === 1) {
          this.$router.push('/API')
        }
      }
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
    .ivu-tooltip-content {
      background-color: #2A3D4D;
    }
    .ivu-tooltip-arrow {
      border-top-color: #2A3D4D;
    }
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
    font-size: 0;
    @media screen and (max-width: 576px) {
      .partners {
        .partners-img {
          width: 192*0.8px !important;
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

    .top {
      background: #151D24 url("../../assets/images/tresso/banner.png") no-repeat;
      background-position: center;
      background-size: cover;

      min-height: 530px;
      .d-f;
      align-items: center;
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
      .list, .toggle-list {
        li {
          .d-f;
          align-items: center;
          padding-left: 96px;
          height: 78px;
        }
        .item {
          .d-ib;
          width: 25%;
        }
      }
      .list {
        li {
          &:nth-child(1) {
            height: 50px;
            span {
              .f-14;
              .c-DBE8F2;
            }
          }
        }
      }
      .toggle-list {
        height: 312px;
      }
      .view {
        .f-14;
        .f-w-5;
        .c-01B2D6;
        .t-c;
        margin-top: 18px;
        span {
          .c-p;
        }
        img {
          width: 13px;
          margin-left: 9px;
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
      .here {
        .c-01B2D6;
        text-decoration: underline !important;
      }
    }

    .gbboTM-box {
      .gbboTM-img {
        width: 24px;
        height: 24px;
        vertical-align: text-top;
      }
      .gbboTM-dl {
        text-align: left;
        vertical-align: text-top;
      }
      .gbboTM-dd {
        line-height: 24px;
      }
      .gbboTM-right {
        .d-f;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
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
      .manager-right {
        .d-f;
        align-items: center;
        .right-top {
          align-self: flex-start;
        }
        .right-bottom {
          align-self: flex-end;
        }
      }
      .manager-icon {
        width: 23px;
      }
    }

    .partners-box {
      .partners {
        .d-f;
        justify-content: center;
        align-items: center;
        flex-flow: wrap;
      }
      .partners-img {
        width: 100%;
        max-width: 192px;
        min-width: 140px;
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
    .up-down-transform {
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
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
      border-top: solid 1px #1E2A36;
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