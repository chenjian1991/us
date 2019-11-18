<template>
  <div class="gbbomain">
    <div class="gbbomain-box" :class="{ 'gbbomain-bg':isShowMask }">
      <!-- one 包括盘口  K线 -->
      <div class="gbbomain-realtime">
        <!-- 盘口 -->
        <div class="gbbomain-realtime__operat">
          <!-- 切换 header -->
          <div class="gbbomain-realtime__hd">
            <gbbo-ticker 
              :currentInfo="currentInfo">
            </gbbo-ticker>
          </div>
          <!-- 盘口 -->
          <div class="gbbomain-realtime__box">
            <gbbo-realtime
              :gbboAsksArr="gbbo_asksArr"
              :gbboBidsArr="gbbo_bidsArr"
              :bestSellPrice="bestSellPrice"
              :bestBuyPrice="bestBuyPrice"
              :maxArbitrageList="maxArbitrageList"
            ></gbbo-realtime>
          </div>
          <!--买入卖出 -->
          <div class="gbbomain-realtime__transaction">
            <create-order
              @buyBtn='buyBtn'
              @sellBtn='sellBtn'
              :briefInputData='briefInputData'
              :buyInputPrice='buyInputPrice'
              :sellInputPrice='sellInputPrice'
              :currentSymbol='currentSymbol'
              :symbolList='symbolList'
              :currentInfo="currentInfo"
              :maxArbitrageList="maxArbitrageList"
              :isLogin='isLogin'
            ></create-order>
          </div>
        </div>
        <!--K线-->
        <div class="gbbomain-realtime__line">
          <gbbo-kline></gbbo-kline>
          <div class="gbbomain-realtime__line-history">
            <gbbo-histories
              :maxArbitrageList='maxArbitrageList'
              :currentSymbolObj="currentSymbolObj">
            </gbbo-histories>
          </div>
        </div>
      </div>
      <!-- 当前订单，历史订单 -->
      <div class="gbbomain-order">
        <gbbo-order
          :myOpenList="myOpenList" 
          :myCompletedList="myCompletedList" 
          @cancelMyOrder="cancelMyOrder"
        ></gbbo-order>
      </div>
    </div>
    <!--交易密码6个框-->
    <div class="mask" v-if="showPassWordPage" @click="clickMask">
        <div class="alert alert-trade-password">
          <div class="alert-title">
              <div>{{$t("bbjyPassword")}}</div>
              <Icon type="md-close" class="closePs" @click="closePassWordPage"/>
          </div>
          <div class="alert-content">
              <div class="content-box">
                <div class="text">{{$t("bbjyInputPassword")}}</div>
                <div class="square">
                    <PasswordInput ref="childPassWord" @getPassWord="getPswData"></PasswordInput>
                </div>
                <div class="expired space-between">
                    <span>{{$t("bbjyExpiredTime")}}</span>
                    <router-link to="/originTradePassword">{{$t("bbjyForgetPassword")}}</router-link>
                </div>
                <div class="space-between">
                    <button class="cancel" @click="closePassWordPage">{{$t("bbjyTipCancel")}}</button>
                    <button class="confirm" @click="submitPassWord">{{$t("bbjyTipSubmit")}}</button>
                </div>
              </div>
          </div>
        </div>
    </div>
    <!-- 交易蒙层 -->
    <div class="quickNav" v-if="isShowMask">
      <div class="quickContent">
          <div class="quickContent-title">
            <div class="line">
                <p>{{$t('bbjyComingSoon')}}</p>
            </div>
          </div>
          <div class="countDown space-between" v-if="!isStopTrade">
            <span class="text">{{$t('bbjyDistance')}}</span>
            <div class="box-content"><span class="box"></span>
                <div class="leftTime">{{day}}</div>
            </div>
            <span class="text">{{$t('bbjyDays')}}</span>
            <div class="box-content"><span class="box"></span>
                <div class="leftTime">{{hour}}</div>
            </div>
            <span class="text">{{$t('bbjyHours')}}</span>
            <div class="box-content"><span class="box"></span>
                <div class="leftTime">{{minutes}}</div>
            </div>
            <span class="text">{{$t('bbjyMinutes')}}</span>
            <div class="box-content"><span class="box"></span>
                <div class="leftTime">{{second}}</div>
            </div>
            <span class="text">{{$t('bbjySeconds')}}</span>
          </div>
          <div v-else class="countDown space-between">
            {{$t('bbjyStop')}}
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import GbboKline from './component/GBBOKLine'
import GbboTicker from './component/Ticker'
import GbboHistories from './component/Histories'
import CreateOrder from './component/GBBOCreateOrder'
import GbboRealtime from './component/GBBORealtime'
import GbboOrder from '../gbbo/component/GBBOOrder'

import {
  getSymbolList_realtime as getSymbolListRealtime,
  getSymbolList,
  getdepthList,
  getUserInfo
} from '_api/exchange.js'

import {
  storage,
  getDecimalsNum,
  getTokenByKey as getValue,
  addSymbolSplitLine,
  isDivideAll,
  scientificToNumber,
  subNumberPoint,
  dealNumber
} from '@/lib/utils.js'

import _ from 'lodash'

import { coinInfoLinks } from './config.js'
import { Exchange } from '@/interface/exchange.js'
import PasswordInput from '@/components/PasswordInput.vue'


import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


import moment from 'moment'
import bigDecimal from 'js-big-decimal' //除法失效
import { BigNumber } from 'bignumber.js';

import { orderBookName } from './config'

let allNowPriceObject = {}//所有币种快照的最新价格的对象

export default {
  name: 'gbbo',
  metaInfo() {
    return {
      meta: [{                 // set meta
          name: 'keywords',
          content: this.pageKeyword
      }, {
          name: 'description',
          content: this.pageDescription
      }],
    }
  },
  components:{
    GbboKline,
    GbboTicker,
    PasswordInput,
    CreateOrder,
    GbboRealtime,
    GbboHistories,
    GbboOrder
  },
  data(){
    return{
      historySymbolObj: {},
      briefInputData:{
        quoteCoinAvailable:'',
        baseAssetAvailable:'',
      },
      buyInputPrice:0,
      sellInputPrice:0,
      openTradePassword: false, // 是否打开交易密码
      // 是否设置交易密码
      isSetTradePasswrod: false,
      //2019性能优化-左侧币种选择栏
      siteName: 'B',
      siteIndexNumber: 0,//站点序号 数字
      quoteIndexName: '',//计价币种tab页签 币种名称 字符串格式
      currentQuoteCoinName: '',//左侧币种列表计价资产币
      //左侧币种选择栏
      isShowMainBoard: true,//切换主板 自选
      searchCoin: '',//币种搜索
      markSymbolArr: [],//自选币种列表
      currentSymbol: '', //当前行情交易对
      currentSymbolObj: {},//当前行情+交易对的对象
      currentInfo: {}, //当前交易对的基本信息集合
      isLogin: this.$store.state.app.isLogin || false,
      tradeHistoryArr: [], //交易历史列表
      pageKeyword: this.$t(this.$route.meta.keywords),
      pageDescription: this.$t(this.$route.meta.description),
      //页面初始化
      symbolList: {},//交易接口的symbolList 接口
      symbolList_quote: {},//行情快照需要的symboList
      symbolListSelf: {},
      quoteWS: null,//行情websocket推送
      klineWS: null,
      noPadding: '--',
      // currentQuoteCoin: 0, //选中的计价资产
      quoteCoinList: {}, //计价资产
      baseAssetList: [], //交易资产
      pushData: {},
      tradeHistoryList: [], //快照交易历史
      isShowCoinLink: true,//石否现实币种详情链接
      coinInfoLink: '',//币种详情链接
      currencyName: '',//当前的法币名称
      currencyRate: 1,//当前法币的比率
      currentSymbolRate: 1, //当前交易对 对USD的系数
      // buyPriceCurrency:"--",//买入价格法币估值
      // sellPriceCurrency:"--",
      symbolCurrency: "--",//当前交易对法币估值
      // ****盘口****
      isShowDepth: 1,//1显示盘口 2为交易历史
      isInitPage: true,//第一次进入页面 展示盘口的买入1 卖出1
      depthListTimer: null,
      depthPageWidth: 100,
      depthTimer: false,
      bidsArr: [],
      asksArr: [],
      //****交易相关 */
      exchange: null,//交易接口函数
      loginToken: $cookies.get('loginToken'),//登陆token
      // ***** 买入 卖出 ******//
      FFDeductible: 0,//1 开启手续费折扣 2.FF余额低 3.手续费折扣中
      commissionTemplateId: false,//开启折扣开关 true 开启
      isShowMask: false,
      isStopTrade: false,
      maskInterval: null,
      day: 0,
      hour: 0,
      minutes: 0,
      second: 0,
      buyDisabled: false,
      sellDisabled: false,
      myBanalceTimer: null,
      buyBallPercentage: '0',//下单买入百分比 0 0.25 0.5 0.75 1
      sellBallPercentage: '0',//下单卖出百分比
      buyPriceEmpty: false,
      buyCountEmpty: false,
      sellPriceEmpty: false,
      sellCountEmpty: false,
      buyPriceInput: '',
      buyCountInput: '',
      sellCountInput: '',
      sellPriceInput: '',
      baseAssetAvailable: 0,//可用的交易资产 卖出
      quoteCoinAvailable: 0,//可用的计价资产 买入
      // a:'',
      // ****我的挂单 & 成交历史记录
      noOrder: true,
      noMyDealOrder: true,
      SSE_order: null,//订单推送
      sseInitArr: [], //订阅推送刚开始接受的快照
      myOpenList: [],//未成交订单
      myCompletedList: [],//完成成交和已经撤单
      //***下单 买入 */
      orderType: null,//撤单 cancle  下单  输入密码用
      orderID: null,
      showPassWordPage: false,
      exchangePassWord: null,//交易密码
      setTradePassword: false,//localstorage 是否
      //币种详情相关
      isShowStockPage: false, //股票通证详情页入口
      //隐藏已撤单
      hideCancleOrder: false,
      //GBBO业务相关
      isGBBO: true,
      stompClient: null,
      arbStompClient: null,
      gbbo_asksArr: [],
      gbbo_bidsArr: [],
      bestSellPrice: null,
      bestBuyPrice: null,
      subNumber: 0,//差值
      isShowARB: '',
      GBBO_rate: 0,
      sell_exchange_logo: '',
      buy_exchange_logo: '',
      buy_input_change: false,//是否输入
      sell_input_change: false,
      isInitOrderBook: true,
      buyRangeValue: 0,//滑块值
      sellRangeValue: 0,
      orderTicketTimer: null,//orderTicket定时器
      updateAt: '',//路总需求 要加这个隐藏字段
      maxArbitrageList:[],
    }
  },
  created() {
    //可以往data上挂载
    var ssoProvider = {};
    //创建实例
    this.exchange = new Exchange(ssoProvider);
    // //登录以后查询资产 挂单 成交记录
    if (this.isLogin) {
      this.exchange.ssoProvider.getSsoToken = function (fn) {
          if (this.loginToken) {
            fn(this.loginToken);
          }
      }.bind(this);
    }
    if ($cookies.get('loginToken')) {
      getUserInfo({userId: localStorage.getItem('loginUserId')}, $cookies.get('loginToken'))
          .then((res) => {
            const {data: {setTradePassword, openTradePassword}} = res
            // 是否设置交易密码
            this.isSetTradePasswrod = setTradePassword
            // 是否打开交易密码
            this.openTradePassword = openTradePassword

          })
    }
    //交易相关的交易对
    this.getSymbolListData();
    // 行情相关交易
    this.getSymbolListRealtimeData()
  },
  mounted() {
    let loginUserId = localStorage.getItem('loginUserId') || this.$route.query.loginUserId;
    if (this.$route.query.loginUserId !== 'null' || this.$route.query.loginUserId !== 'undefined' || this.$route.query.loginUserId !== undefined) {
      localStorage.setItem('loginUserId', loginUserId);
    }
    this.$store.commit('changeHeaderColor', '#15232C');
    this.$store.commit('changeFooterColor', '#15232C');
    // 登录的情况下
    if ($cookies.get('loginToken') && localStorage.getItem('loginUserId')) {
      //获取交易密码开关
      this.$store.dispatch("getTradePassWordStatus");
    }
  },
  filters: {
    formatNumberLength: function (value) {
      if (!value) return ''
      return bigDecimal.round(value, 8)
    }
  },
  watch: {
    currentSymbol(v) {
      //查询可用资产
      this.getMyAssetData()
    },
    depthPageWidth(val) {
      //优化性能
      if (!this.depthTimer) {
          this.depthPageWidth = val
          this.depthTimer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            that.depthTimer = false
          }, 500)
      }
    },
    listenstage: function (newV, oldV) {
      //法币估值做相应的刷新
      this.getCurrencyData()
      this.pageKeyword = this.$t(this.$route.meta.keywords)
      this.pageDescription = this.$t(this.$route.meta.description)
    }
  },
  computed: {
    buyInTotal: function () { //买入总价
      return bigDecimal.multiply(this.buyPriceInput, this.buyCountInput);
    },
    sellOutTatal: function () { //卖出总价
      return bigDecimal.multiply(this.sellPriceInput, this.sellCountInput);
    },
    buyBallTotal: function () { //能买入的总数量
      return this.buyPriceInput == 0 ? '' : new BigNumber(this.quoteCoinAvailable).dividedBy(new BigNumber(this.buyPriceInput)).toNumber()
    },
    sellBallTotal: function () { //能卖出的总数量
      return this.baseAssetAvailable
    },
    //监听vuex中数据的变化
    listenstage() {
      return this.$store.state.app.currentCurrencyState;
    },
    searchIn: function () {
      if (this.searchCoin !== '') {
          return this.markSymbolArr.filter((item) => {
            return item.symbol.indexOf(this.searchCoin.toUpperCase()) > -1
          })
      }
      return this.markSymbolArr
    },
    myCompletedList_sort: function () {
      return this.myCompletedList.filter((item) => {
          if (this.hideCancleOrder) {
            return item.orderStatus !== 'CANCELLED'
          } else {
            return item
          }
      })
    }
  },
  methods: {
    changeBaseAssetList(v) {
      //以后优化 改为 params传参就好了
      this.$router.push({
          query: {
            // symbol:''
          }
      })
      //清空盘口深度
      this.bidsArr = []
      this.asksArr = []
      this.isInitOrderBook = true

      //K线基本数据配置使用
      storage.set('currentSymbolObj', v)
      this.currentSymbol = v.symbol
      this.currentSymbolObj = v;
      //更新大盘上方交易对行情
      this.showCurrentPriceInfo(v)
      //重置点击
      this.buyDisabled = false
      this.sellDisabled = false
      //更新交易历史 传入v 获取精度
      // this.updateSymbolHistory()
      this.getGBBODepth()
      this.buy_input_change = false
      this.sell_input_change = false
      //判断是否展示交易蒙层
      this.isShowTradeMask();
      //更新当前交易对法币估值
      this.symbolCurrency = '--'
      this.getCurrencyData()
      this.getCoinInfoLinks(v.baseAsset)

      //切换交易对清空买入卖出
      this.buyPriceInput = ''
      this.buyCountInput = ''
      this.sellCountInput = ''
      this.sellPriceInput = ''
      this.$refs.buyInput.value = ''
      this.$refs.sellInput.value = ''
      this.$refs.buyCountInputRef.value = ''
      this.$refs.sellCountInputRef.value = ''
      this.isInitPage = true
      //股票详情入口
      if (this.siteName === 'S') {
          this.isShowStockPage = true
      } else {
          this.isShowStockPage = false
      }
      // 百分比的球
      this.buyBallPercentage = this.sellBallPercentage = 0
      this.buyCountInput = this.sellCountInput = ''
    },
    getFilterList: function (rows) {
      return rows.filter((row) => {
          return row.baseAsset.indexOf(this.searchCoin.toUpperCase()) > -1
      })
    },
    //判断是否展示交易蒙层
    isShowTradeMask() {
      this.isStopTrade = false
      this.isShowMask = false
      if (JSON.stringify(this.symbolList) != "{}" && this.symbolList[this.currentSymbol]) {
          //下单服务正常运行
          let orderSymbolObj = this.symbolList[this.currentSymbol]
          if (orderSymbolObj.status === 'HALT' && orderSymbolObj.nextStatus && orderSymbolObj.nextStatusAt) {
            //倒计时
            this.isShowMask = true
            this.buyDisabled = true
            this.sellDisabled = true
            //情况盘口
            this.bidsArr = []
            this.asksArr = []
            this.refreashTime(orderSymbolObj.nextStatusAt)
            return
          } else if (orderSymbolObj.status === 'HALT') {
            //暂停交易
            this.isShowMask = true
            this.isStopTrade = true
          }
      }
    },
    //未开放交易对 倒计时
    refreashTime(targetDate) {
      targetDate = targetDate + 10 * 1000
      this.maskInterval && clearInterval(this.maskInterval)
      if (targetDate && typeof targetDate === 'number') {
          this.maskInterval = setInterval(() => {
            var today = new Date().getTime();
            if (targetDate <= today) {
                //关闭蒙层
                this.isShowMask = false;
                this.buyDisabled = false
                this.sellDisabled = false
                window.location.reload();
                clearInterval(this.maskInterval)
                //重新请求下单交易对 获取可交易状态
            } else {
                var ts = (targetDate - today);
                this.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
                this.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                this.minutes = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
                this.second = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
            }
          }, 1000)
      }
    },
    //币种详情列表展示逻辑
    getCoinInfoLinks(baseAsset) {
      if (coinInfoLinks[baseAsset]) {
          this.isShowCoinLink = true;
          this.coinInfoLink = `https://coinmarketcap.com/currencies/${coinInfoLinks[baseAsset]}/`;
      } else {
          this.isShowCoinLink = false
      }
    },
    getSymbolListRealtimeData() {
      getSymbolListRealtime().then(res => {
        let symbolUrl = ''
        //注释排序
        res.forEach((val) => {
          // 拼装推送数据查询url
          symbolUrl += `symbol=${val.symbol}&${val.symbol}_least=1&`
          // 拼装行情的symbol为Key的symbolList 对象
          this.symbolList_quote[val.symbol] = val
        })
        console.log('aaaaa',this.symbolList_quote)
        // 第一个交易对信息
        const firstSymbol = res[0]
        const { priceTickSize, quantityStepSize } = firstSymbol
        this.currentSymbol = firstSymbol.symbol // 第一个交易对
        this.currentSymbolObj = firstSymbol 
        
        

        this.historySymbolObj = {
          symbol: this.currentSymbol,
          priceTickSize,
          quantityStepSize
        }

        //K线基本数据配置使用
        storage.set('currentSymbolObj', firstSymbol)

        if (firstSymbol) {
          this.getCoinInfoLinks(firstSymbol.baseAsset)
          this.isInitPage = true
          this.getGBBODepth()
          this.getMyAssetData()
        }
        // 当有快照驱动时数据变化
        this.getSSERealTime(symbolUrl)
        
        
      })
    },
    getGBBODepth() {
      if (this.stompClient == null || !this.stompClient.connected) {
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
        this.stompClient.connect({}, (frame) => {
          this.stompClient.subscribe(`/topic/orderbook/${this.currentSymbol}`, (message) => {
            if (message.body) {
              this.sortOrderBook(JSON.parse(message.body))
            }
          });
        }, (error) => {
          console.log('new Sockjs  error')
          this.stompClient.disconnect()
          this.stompClient = null
          this.getGBBODepth()
        });
      }
      if (this.arbStompClient == null || !this.arbStompClient.connected) {
        const domain = document.domain;
        let arbSocket = null
        if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
          arbSocket = new SockJS('https://' + domain + '/xchange/marketdata');
        } else {
          arbSocket = new SockJS('http://52.68.13.17:20013/xchange/marketdata');
        }
        
        // socket = new SockJS('https://www.tresso.com/xchange/marketdata');
        this.arbStompClient = Stomp.over(arbSocket);
        this.arbStompClient.debug = null
        this.arbStompClient.heartbeat.outgoing = 1000;
        this.arbStompClient.connect({}, (frame) => {
          this.arbStompClient.send("/app/summarized.ws", {}, JSON.stringify({symbol:"BTCUSD",interval:"MINUTE_1"}))
          this.arbStompClient.subscribe(`/topic/runtime/${this.currentSymbol}`, (message) => {
            if (message.body) {
              // this.maxArbitrageBook(JSON.parse(message.body))
              this.maxArbitrageList = JSON.parse(message.body)
            }
          });
          this.arbStompClient.subscribe('/topic/runtime/BTCUSD/MINUTE_1', (message) => {
            // console.log(message)
            if(message.body){
              this.kLineData = JSON.parse(message.body)
            }
          })
          
        }, (error) => {
          console.log('new Sockjs  error')
          this.arbStompClient.disconnect()
          this.arbStompClient = null
          this.getGBBODepth()
        });
      }

    },

    sortOrderBook(data) {
      let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
      // let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
      var result = data
      //路总需求 要加这个隐藏字段
      this.updateAt = result.updateAt

      // console.log(data, 'GBBO order asks=' + result.asks[result.asks.length - 1].priceWithFee, 'GBBO order bids=' + result.bids[0].priceWithFee)

      this.gbbo_asksArr = result.asks.map((val) => {
          val.total = new BigNumber(val.priceWithFee) * new BigNumber(val.qty)
          if (val.provider && orderBookName.includes(val.provider)) {
            return val
          } else if (val.provider && val.provider === 'E55') {
            return Object.assign({}, val, {provider: 'TRESSO'})
          } else if (val.provider) {
            return Object.assign({}, val, {provider: 'Node of Apifiny'})
          }
      })

      if (!this.buy_input_change) {
          this.bestSellPrice = result.asks[result.asks.length - 1].priceWithFee
          this.buy_exchange_logo = result.asks[result.asks.length - 1].provider
          this.buyPriceInput = this.bestSellPrice
          // this.$refs.buyInput.value = this.bestSellPrice
          this.buyInputPrice = this.bestSellPrice;
      }

      this.gbbo_bidsArr = result.bids.map((val) => {
          val.total = new BigNumber(val.priceWithFee) * new BigNumber(val.qty)
          if (val.provider && orderBookName.includes(val.provider)) {
            return val
          } else if (val.provider && val.provider === 'E55') {
            return Object.assign({}, val, {provider: 'TRESSO'})
          } else if (val.provider) {
            return Object.assign({}, val, {provider: 'Node of Apifiny'})
          }
      })
      if (!this.sell_input_change) {
          this.bestBuyPrice = result.bids[0].priceWithFee
          this.sell_exchange_logo = result.bids[0].provider // 交易所logo
          this.sellPriceInput = this.bestBuyPrice
          // this.$refs.sellInput.value = this.bestBuyPrice
          this.sellInputPrice = this.bestBuyPrice;

      }
      var diff = this.bestSellPrice - this.bestBuyPrice
      this.subNumber = bigDecimal.round(Math.abs(diff), priceLong)
      this.GBBO_rate = bigDecimal.round(new BigNumber(this.subNumber) * new BigNumber(this.currencyRate), 4)
      if (diff < 0) {
          this.isShowARB = "Arbitrage"
      } else {
          this.isShowARB = "Spread"
      }
    },
    // maxArbitrageBook(data) {
    //   this.maxArbitrageList = data;
    // },
    //获取推送行情
    getSSERealTime(url) {
      let SSEcache = null
      const baseURL = (window.location.protocol === 'http:') ? 'ws://' : 'wss://';
      const host = window.location.host;
      this.quoteWS = new ReconnectingWebSocket(`${baseURL}${host}/quote/realTime.ws?${url}`)
      this.quoteWS.onopen = (e) => {
      };
      this.quoteWS.onmessage = (e) => {
          //每次推送一条记录
          let result = JSON.parse(e.data)
          if (result.ping !== undefined) {
            var pongResponse = {};
            pongResponse.pong = result.ping;
            this.quoteWS.send(JSON.stringify(pongResponse))
            return;
          }
          allNowPriceObject[result.symbol] = result
          //快照去重
          if (SSEcache && SSEcache.dateTime == result.dateTime && SSEcache.volume == result.volume) {
            return;
          } else {
            let v = {} //快照的涨跌幅
            if (result && this.symbolList_quote[result.symbol]) {

                let long = getDecimalsNum(this.symbolList_quote[result.symbol].priceTickSize)
                let diff = '';
                let a = '';

                //计算涨跌幅 percent  +
                if (result.previousClose && result.last) {
                  diff = bigDecimal.subtract(dealNumber(result.last, 20), dealNumber(result.previousClose, 20));
                  a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(result.previousClose)).toFixed(6), '100')
                } else {
                  diff = bigDecimal.subtract(scientificToNumber(result.last), scientificToNumber(result.open));
                  a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(result.open)).toFixed(6), '100')
                }

                //涨跌幅%
                v.percent = bigDecimal.round(a, 2) + '%'
                //绿涨红跌 1绿色 0灰色 -1红色
                v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)
                //计算最新价格精度
                v.last = bigDecimal.round(scientificToNumber(result.last), long)
                //24H交易量
                v.hour24Volume = bigDecimal.round(result.hour24Volume, 2)
                //判断是否是收藏
                let markSymbol = JSON.parse(localStorage.getItem('mark_symbol'))
                if (markSymbol && markSymbol[result.symbol]) {
                  v.marked = true
                  let index = _.findIndex(this.markSymbolArr, {'symbol': result.symbol});
                  if (index == -1) {
                      this.markSymbolArr.push(Object.assign(result, v, this.symbolList_quote[result.symbol]))
                  } else {
                      this.markSymbolArr.splice(index, 1, Object.assign(result, v, this.symbolList_quote[result.symbol]))
                  }
                }
                //展示当前的交易对的大盘上方行情
                if (this.currentSymbol === result.symbol) {
                  console.log(1)
                  this.currentSymbolObj = Object.assign(result, v, this.symbolList_quote[result.symbol])
                  this.showCurrentPriceInfo(this.currentSymbolObj)
                }
                // this.getCurrencyData()
            }
            //处理币种列表行情
            if (this.symbolList_quote[result.symbol]) {
                // let quoteAsset = this.symbolList_quote[result.symbol].quoteAsset
                // let siteType = this.symbolList_quote[result.symbol].siteType[0]
                // this.symbolListSelf[siteType][quoteAsset].map((item, i) => {
                //    if (item.symbol === result.symbol) {
                //       this.symbolListSelf[siteType][quoteAsset][i] = Object.assign(v, item, result)
                //       return
                //    }
                // })
                // //计算法币估值
                // //板块部分双向绑定
                // this.symbolListSelf = Object.assign({}, this.symbolListSelf)
                //处理当前
                SSEcache = result
            }
          }
      }
      this.quoteWS.onerror = (e) => {
          console.log("The 'this.quoteWS' connect error");

      }
      //关闭时候触发
      this.quoteWS.onclose = (e) => {
      };
    },
    //展示最新的交易资产行情信息
    //v symbol 行情合并后的对象
    showCurrentPriceInfo(v) {
      //给title赋值行情
      if (v.last) {
          document.title = `${v.last}  | ${v.baseAsset}/${v.quoteAsset}`
      } else {
          document.title = `-- | ${v.baseAsset}/${v.quoteAsset}`
      }
      this.currentInfo = v
    },
    //处理法币估值
    getCurrencyData() {
      if (!allNowPriceObject[this.currentSymbolObj.symbol]) {
          return
      }
      //计价资产是否是USDD USDT
      //法币估值处理
      let legalTender = JSON.parse(localStorage.getItem('currentCurrency'))
      this.currencyRate = legalTender.rate
      this.currencyName = legalTender.name
      if (this.currentSymbolObj.quoteAsset === "USDT" || this.currentSymbolObj.quoteAsset === "USDD") {
          this.currentSymbolRate = 1
          this.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolObj.last) * new BigNumber(this.currencyRate), 4)
      } else if (allNowPriceObject[this.currentSymbolObj.quoteAsset + "USDT"]) {
          //是否存在 计价资产/USDT的交易对
          // if(allNowPriceObject[this.currentSymbolObj.quoteAsset+"USDT"].last){
          this.currentSymbolRate = bigDecimal.round(new BigNumber(this.currentSymbolObj.last) * new BigNumber(allNowPriceObject[this.currentSymbolObj.quoteAsset + "USDT"].last), 4)
          this.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolRate) * new BigNumber(this.currencyRate), 4)
          // }
      }
    },
    //获取交易对的实时价格
    getSymbolNowPrice(symbol) {
      return _.last(this.pushData[symbol])
    },
    //获取交易对 下单专用
    getSymbolListData() {
      getSymbolList().then(res => {
          if (this.$store.state.app.isLogin || this.loginToken) {
            this.isLogin = true
          }
          this.symbolList = {};
          res.map((v, i) => {
            this.symbolList[v.symbol] = v
            
          })
          //增加蒙层逻辑
          this.isShowTradeMask();
          //查询委托订单
          this.getSSEOrderList()
      }).catch(error => {

      })
    },
    //获取盘口深度
    getDethTableData() {
      if (this.depthListTimer) {
          clearTimeout(this.depthListTimer)
          this.depthListTimer = null
      }
      getdepthList({'symbol': this.currentSymbol}).then(res => {
          if (res.data && !this.isShowMask) {//无数据时 是null  有蒙层时候不展示盘口数据
            this.updateDepthArr(res.data, this.currentSymbolObj.depthPeak)
            this.depthListTimer = setTimeout(() => {
                this.getDethTableData()
            }, 3000)
          }
      }).catch(e => {
          this.depthListTimer = setTimeout(() => {
            this.getDethTableData()
          }, 10000)
      })
    },
    //**********************组装处理盘口展示数据 */
    getClickBuyPrice(price, count) {
      if (price) {
          this.$refs.sellInput.value = price
          this.sellPriceInput = price
          this.buyPriceInput = price
          this.$refs.buyInput.value = price
      }
      if (count) {
          this.buyCountInput = count
          this.$refs.buyCountInputRef.value = count

          this.$refs.sellCountInputRef.value = count
          this.sellCountInput = count
      }
    },
    getClickSellPrice(price, count) {
      if (price) {
          this.buyPriceInput = price
          this.$refs.buyInput.value = price

          this.$refs.sellInput.value = price
          this.sellPriceInput = price
      }
      if (count) {
          this.buyCountInput = count
          this.$refs.buyCountInputRef.value = count

          this.$refs.sellCountInputRef.value = count
          this.sellCountInput = count
      }
    },
    //把盘口的成交价 和成交历史的成交价格 赋值到下单口
    getClickPrice(price) {
      if (price) {
          this.buyPriceInput = price
          this.$refs.buyInput.value = price
          this.$refs.sellInput.value = price
          this.sellPriceInput = price
      }
    },
    //盘口深度
    updateDepthArr(json, depthPeak) {
      let asks = json.asks;
      let bids = json.bids;
      let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
      let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
      let aArr = []
      let bArr = []
      //卖出
      asks.map((v, i) => {
          let obj = {}
          obj.price = bigDecimal.round(scientificToNumber(v.price), priceLong)
          obj.quantity = bigDecimal.round(v.quantity, volumeLong)
          obj.total = bigDecimal.multiply(v.price, v.quantity)
          obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
          aArr.unshift(obj)
      })
      this.asksArr = aArr
      if (this.isInitOrderBook) {
          var div = this.$refs.buyOrderContainer;
          //此时必须异步执行滚动条滑动至底部
          setTimeout(() => {
            div.scrollTop = div.scrollHeight;
          }, 0)
          this.isInitOrderBook = false
      }
      //买入盘口
      bids.map((v, i) => {
          let obj = {}
          obj.price = bigDecimal.round(scientificToNumber(v.price), priceLong)
          obj.quantity = bigDecimal.round(v.quantity, volumeLong)
          obj.total = bigDecimal.multiply(v.price, v.quantity)
          obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
          bArr.push(obj)
      })
      this.bidsArr = bArr
      //默认第一个盘口价格
      if (this.isInitPage && asks.length > 0) {
          let buyInput = subNumberPoint(scientificToNumber(asks[0].price), priceLong)
          this.buyPriceInput = buyInput
          this.$refs.buyInput.value = buyInput
          // let  buy_count = bigDecimal.round(scientificToNumber(asks[0].quantity), volumeLong)
          // this.buyCountInput = buy_count
          // this.$refs.buyCountInputRef.value = buy_count
      }
      if (this.isInitPage && bids.length > 0) {
          let sellInput = subNumberPoint(scientificToNumber(bids[0].price), priceLong)
          this.$refs.sellInput.value = sellInput
          this.sellPriceInput = sellInput

          // let  sell_count = bigDecimal.round(scientificToNumber(bids[0].quantity), volumeLong)
          // this.$refs.sellCountInputRef.value = sell_count
          // this.sellCountInput = sell_count
      }
      this.isInitPage = false
    },
    //展示可用的资产
    getMyAssetData() {
      if (!this.isLogin) {
          return false;
      }
      if (this.myBanalceTimer) {
          clearTimeout(this.myBanalceTimer)
          this.myBanalceTimer = null
      }
      let baseAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['baseAssetPrecision']
      let quoteAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['quoteAssetPrecision']

      //查询账户资产
      this.exchange.balance((data) => {
        // this.baseAssetAvailable = '--'
        // this.quoteCoinAvailable = '--'
        this.baseAssetAvailable = subNumberPoint(0, baseAssetQuantityLong)
        this.quoteCoinAvailable = subNumberPoint(0, quoteAssetQuantityLong)
        data.map((v, i) => {
          if (v.currency === 'FF' && v.available == 0 && this.commissionTemplateId) {
              //FF为0 折扣开关一打开
              this.FFDeductible = 2
          }
          if (v.currency === this.currentSymbolObj.baseAsset) {
              this.baseAssetAvailable = subNumberPoint(v.available, baseAssetQuantityLong)
          } else if (v.currency === this.currentSymbolObj.quoteAsset) {
              this.quoteCoinAvailable = subNumberPoint(v.available, quoteAssetQuantityLong)
          }
          // 给子组件传餐
          this.briefInputData = {
            quoteCoinAvailable: this.quoteCoinAvailable,
            baseAssetAvailable: this.baseAssetAvailable,
          }
        })
        this.myBanalceTimer = setTimeout(() => {
          this.getMyAssetData()
        }, 60000)
      })
    },
    /**
    * 委托单 我的成交记录
    */
    //获取推送的订单
    getSSEOrderList() {
      if (!this.isLogin) {
          return false;
      }
      let sseOrderCount = 0
      //刚进页面初始数据
      this.updateOpenListAndCompletedList();
      this.exchange.listFilledOrder((token, accountId) => {
        let baseURL = window.location.protocol + '//' + window.location.host
        //判断orderId
        this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
        this.SSE_order.onopen = function (e) {
        };
        this.SSE_order.addEventListener('_RESULT', (e) => {
          let result = JSON.parse(e.data)
          if (result) {
            //更新列表
            this.updateOpenListAndCompletedList();
            //查询可用资产
            this.getMyAssetData()
          }
        })
        this.SSE_order.addEventListener('_ERROR', function (e) {
        })
        this.SSE_order.onerror = (e) => {
          this.SSE_order.close()
          if (sseOrderCount > 5) return
          setTimeout(() => {
            sseOrderCount += 1
            this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
          }, 3000)
        };
      })
    },
    //更新挂单 成交记录 更新我的委托单
    updateOpenListAndCompletedList() {
      if (!this.isLogin) {
        return false;
      }
      //更新我的委托单
      this.exchange.listOpenOrder(function (data) {
        let arr = []
        data.map((v, i) => {
          if (this.symbolList[v.symbol]) {
              v.isDisabled = false
              v.btnText = 'bbjyCancel'
              v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
              // v.orderType = v.orderType==="LIMIT"?"限价单":''
              let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
              let quantityLong = this.symbolList && this.symbolList[v.symbol]['quantityStepSize']
              v.symbol = addSymbolSplitLine(v.symbol)
              v.limitPrice = bigDecimal.round(v.limitPrice, getDecimalsNum(priceLong))
              v.filledCumulativeQuantity = bigDecimal.round(v.filledCumulativeQuantity, getDecimalsNum(quantityLong))
              v.quantity = bigDecimal.round(v.quantity, getDecimalsNum(quantityLong))
              // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
              v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(), 100), 2);
              v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice, v.quantity), 8)
              if (v.orderStatus == 'PENDING_SUBMIT' && v.cancelledUpdateAt) {
                v.isDisabled = true
                v.btnText = 'bbjyCancelling'
              }
              arr.push(v)
          }
        })
        this.myOpenList = arr
      }.bind(this))
      //更新我的成交记录
      this.exchange.listCompletedOrder(1, function (res) {
        let arr = []
        res.data.map((v, i) => {
          if (this.symbolList[v.symbol]) {
            v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
            // v.orderType = v.orderType==="LIMIT"?"限价单":''
            let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
            let quantityLong = this.symbolList && this.symbolList[v.symbol]['quantityStepSize']
            v.symbol = addSymbolSplitLine(v.symbol)
            v.filledAveragePrice = bigDecimal.round(v.filledAveragePrice, getDecimalsNum(priceLong))
            v.limitPrice = bigDecimal.round(v.limitPrice, getDecimalsNum(priceLong))
            v.filledCumulativeQuantity = bigDecimal.round(v.filledCumulativeQuantity, getDecimalsNum(quantityLong))
            v.quantity = bigDecimal.round(v.quantity, getDecimalsNum(quantityLong))
            if (!Number(v.quantity) == 0) {
              // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
              v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(), 100), 2);
            } else {
              v.percent = 0
            }
            v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice, v.quantity), 8)
            arr.push(v)
          }
        })
        this.myCompletedList = arr
      }.bind(this))
    },
    //交易密码
    getPswData(callbackData) {
      if (callbackData && callbackData.length === 6) {
        //跳转到再次输入密码页面
        this.exchangePassWord = callbackData
      }
    },
    //撤单
    cancelMyOrder(orderId, v) {
      v.isDisabled = true;
      if (!orderId) {
          return false;
      } else if (!this.currentSymbol) {
          return false;
      }
      //撤单操作
      this.orderType = 'cancel'
      this.orderID = orderId
      if (!this.isSetTradePasswrod) {
        //交易密码是否设置
        this.$Notice.warning({
          title: this.$t('bbjyNoPasswordError'),
        });
        setTimeout(function () {
          this.$router.push('/originTradePassword')
        }.bind(this), 1000);

        //继续撤单
      } else if (this.openTradePassword) {
        //密码
        if (getValue("ORDER_SESSION")) {
          //密码为失效
          this.exchange.cancelOrder(this.orderID, null, (data) => {
              //撤单成功
              this.$Notice.success({
                title: this.$t('tsTips'),
                desc: this.$t('bbjyCancelMsg'),
              })
          }, () => {
              v.isDisabled = false;
          });
        } else {
          this.openPassWordPage();
          v.isDisabled = false;
        }
      } else {
        this.submitPassWord()
      }

    },
    buyBtn(callbackData) {
       this.buyPriceInput = callbackData.buyPriceInput;
       this.buyCountInput = callbackData.buyCountInput;
      window._czc.push(["_trackEvent", '币币交易页面', '点击', '买入按钮', 0, 'buyBtn']);
      if (!this.symbolList || JSON.stringify(this.symbolList) == "{}" || !this.symbolList[this.currentSymbol]) {
        //暂停交易
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyStop'),
        });
        return
      }
      this.orderType = 'BUY'
      this.buyDisabled = true
      let minPrice = this.symbolList[this.currentSymbol].minPrice
      let maxPrice = this.symbolList[this.currentSymbol].maxPrice
      let minQuantity = this.symbolList[this.currentSymbol].minQuantity
      let maxQuantity = this.symbolList[this.currentSymbol].maxQuantity
      let status = this.symbolList[this.currentSymbol].status
      let priceTickSize = this.symbolList[this.currentSymbol].priceTickSize
      let quantityStepSize = this.symbolList[this.currentSymbol].quantityStepSize
      let isPriceSize = isDivideAll(this.buyPriceInput, priceTickSize)
      let isQuantitySize = isDivideAll(this.buyCountInput, quantityStepSize)
      if (!this.buyPriceInput) {
        this.buyPriceEmpty = true
        //买入价格
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyEnterBuyPrice'),
        });
        this.buyDisabled = false
      } else if (!this.buyCountInput) {
        this.buyCountEmpty = true
        //数量
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyEnterBuyVolume'),
        });
        this.buyDisabled = false
      } else if (Number(this.buyPriceInput) > Number(maxPrice)) {
        //买入价格不能超过
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyPriceNotMore') + ' ' + maxPrice,
        });
        this.buyDisabled = false
      } else if (Number(this.buyPriceInput) < Number(minPrice)) {
        // this.$Message.warning('买入价格不能少于'+minPrice);
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyPriceNotLess') + ' ' + minPrice,
        });
        this.buyDisabled = false
      } else if (Number(this.buyCountInput) > Number(maxQuantity)) {
        // this.$Message.warning('买入数量不能超过'+maxQuantity);
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyVolumeNotMore') + ' ' + maxQuantity,
        });
        this.buyDisabled = false
      } else if (Number(this.buyCountInput) < Number(minQuantity)) {
        // this.$Message.warning('买入数量不能少于'+minPrice);
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyVolumeNotLess') + ' ' + minQuantity,
        });
        this.buyDisabled = false
      } else if (Number(this.buyInTotal) > Number(this.quoteCoinAvailable)) {
        // this.$Message.warning('买入总额不能超过'+可用资产);
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyTotalNotMore') + ' ' + this.$t('bbjyBuyAvailable').toLowerCase(),
        });
        this.buyDisabled = false
      } else if (!isPriceSize) {
        // 价格整数倍于
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyPriceMultiple') + ' ' + priceTickSize,
        });
        this.buyDisabled = false
      } else if (!isQuantitySize) {
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyBuyVolumeMultiple') + ' ' + quantityStepSize,
        });
        this.buyDisabled = false
      } else if (status == "HALT") {
        //账户停止
        this.$Notice.warning({
          title: this.$t('tsTips'),
          desc: this.$t('bbjyAccountError'),
        });
        this.buyDisabled = false
      }else if (!this.isSetTradePasswrod) { // 未设置交易密码
        // else if (!this.$store.state.exchange.inputTradePassWordStatus) {
        this.$Notice.warning({
          title: this.$t('bbjyNoPasswordError'),
        });
        this.buyDisabled = false
        setTimeout(function () {
          this.$router.push('/originTradePassword')
        }.bind(this), 1000);
      }
      else if (this.openTradePassword) {
        //需要输入密码
        if (getValue("ORDER_SESSION")) {
          this.exchange.createGBBOOrder({
            "symbol": this.currentSymbol,
            "orderType": "LIMIT",
            "orderSide": this.orderType,
            "quantity": this.buyCountInput,
            "limitPrice": this.buyPriceInput
          }, null, () => {
            this.buyDisabled = false
            this.$Notice.success({
                title: this.$t('tsTips'),
                desc: this.$t('bbjyOrderSuccess'),
            });
          }, () => {
            this.buyDisabled = false;
          });
        } else {
          this.openPassWordPage();
        }
      } else {
        //直接下单
        this.submitPassWord()
      }
    },
    sellBtn(callbackData) {
      this.sellCountInput = callbackData.sellCountInput;
      this.sellPriceInput = callbackData.sellPriceInput;
      window._czc.push(["_trackEvent", '币币交易页面', '点击', '卖出按钮', 0, 'sellBtn']);
      if (!this.symbolList || JSON.stringify(this.symbolList) == "{}" || !this.symbolList[this.currentSymbol]) {
          //暂停交易
          this.$Notice.warning({
            title: this.$t('bbjyStop'),
          })
          return
      }
      this.orderType = 'SELL'
      let minPrice = this.symbolList[this.currentSymbol].minPrice
      let maxPrice = this.symbolList[this.currentSymbol].maxPrice
      let minQuantity = this.symbolList[this.currentSymbol].minQuantity
      let maxQuantity = this.symbolList[this.currentSymbol].maxQuantity
      let status = this.symbolList[this.currentSymbol].status
      let priceTickSize = this.symbolList[this.currentSymbol].priceTickSize
      let quantityStepSize = this.symbolList[this.currentSymbol].quantityStepSize
      let isPriceSize = isDivideAll(this.sellPriceInput, priceTickSize)
      let isQuantitySize = isDivideAll(this.sellCountInput, quantityStepSize)
      if (!this.sellPriceInput) {
          this.sellPriceEmpty = true
          // this.$Message.warning('请输入卖出价格');
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjyEnterSellPrice'),
          });
          this.sellDisabled = false;
      } else if (!this.sellCountInput) {
          this.sellCountEmpty = true
          // this.$Message.warning('请输入卖出数量');
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjyEnterSellVolume'),
          });
          this.sellDisabled = false;
      } else if (Number(this.sellPriceInput) > Number(maxPrice)) {
          // this.$Message.warning('卖出价格不能超过'+maxPrice);
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellPriceNotMore') + ' ' + maxPrice,
          });
          this.sellDisabled = false;
      } else if (Number(this.sellPriceInput) < Number(minPrice)) {
          // this.$Message.warning('卖出价格不能少于'+minPrice);
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellPriceNotLess') + ' ' + minPrice,
          });
          this.sellDisabled = false;
      } else if (Number(this.sellCountInput) > Number(maxQuantity)) {
          // this.$Message.warning('卖出数量不能超过'+maxQuantity);
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellVolumeNotMore') + ' ' + maxQuantity,
          });
          this.sellDisabled = false;
      } else if (Number(this.sellCountInput) < Number(minQuantity)) {
          // this.$Message.warning('卖出数量不能少于'+minPrice);
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellVolumeNotLess') + ' ' + minQuantity,
          });
          this.sellDisabled = false;
      } else if (Number(this.sellCountInput) > Number(this.baseAssetAvailable)) {
          // this.$Message.warning('卖出数量不能超过'+可用资产);
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellVolumeNotMore') + ' ' + this.$t('bbjyBuyAvailable').toLowerCase(),
          });
          this.sellDisabled = false;
      } else if (!isPriceSize) {
          // 价格整数倍于
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellPriceMultiple') + ' ' + priceTickSize,
          });
          this.sellDisabled = false;
      } else if (!isQuantitySize) {
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjySellVolumeMultiple') + ' ' + quantityStepSize,
          });
          this.sellDisabled = false;
      } else if (status == "HALT") {
          //账户停止
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjyAccountError'),
          });
          this.sellDisabled = false;
      }
      //未设置交易密码直接下单
      else if (!this.isSetTradePasswrod) {
          this.$Notice.warning({
            title: this.$t('tsTips'),
            desc: this.$t('bbjyNoPasswordError'),
          });
          setTimeout(function () {
            this.$router.push('/originTradePassword')
          }.bind(this), 1000);
      }
      else if (this.openTradePassword) {
          //需要输入交易密码
          if (getValue("ORDER_SESSION")) {
            this.sellDisabled = true;
            this.exchange.createGBBOOrder({
                  "symbol": this.currentSymbol,
                  "orderType": "LIMIT",
                  "orderSide": this.orderType,
                  "quantity": this.sellCountInput,
                  "limitPrice": this.sellPriceInput
                },
                null,
                (data) => {
                  // orderComplete();
                  this.sellDisabled = false;
                  this.$Notice.success({
                      title: this.$t('tsTips'),
                      desc: this.$t('bbjyOrderSuccess'),
                  });
                },
                (data) => {
                  this.sellDisabled = false;
                }
            );
          } else {
            this.openPassWordPage();
          }
      } else {
          //下单
          this.submitPassWord()
      }
    },
    openPassWordPage() {
      // if (this.$store.state.exchange.openTradePasswordStatus) {
      document.body.style.overflow = 'hidden';
      this.showPassWordPage = true;
      // } else {
      //    this.submitPassWord()
      // }
    },
    closePassWordPage() {//关闭交易密码页面
      this.showPassWordPage = false;
      this.sellDisabled = false;
      this.buyDisabled = false;
      this.exchangePassWord = null
      document.body.style.overflow = '';
    },
    clickMask() {//交易框获取焦点
      this.$refs.childPassWord.getFocus();
    },
    //跳转到股票详情页
    gotoStockPage() {
      if (this.currentSymbolObj) {
          this.$router.push({
            path: '/StockToken',
            query: {
                symbol: this.currentSymbolObj.symbol,
                baseAsset: this.currentSymbolObj.baseAsset
            }
          })
      }
    },
    //切换深度 交易历史
    changeDepth(index) {
      this.isShowDepth = index
      //盘口保持卖一价可见
      if (this.$refs.buyOrderContainer) {
          var buyDiv = this.$refs.buyOrderContainer;
          //此时必须异步执行滚动条滑动至底部
          setTimeout(() => {
            buyDiv.scrollTop = buyDiv.scrollHeight;
          }, 0)
      }
      if (this.$refs.sellOrderContainer) {
          var sellDiv = this.$refs.sellOrderContainer;
          //此时必须异步执行滚动条滑动至底部
          setTimeout(() => {
            sellDiv.scrollTop = 0
          }, 0)
      }
      this.$refs.tradeHistory.scrollTop = 0
    },
    submitPassWord() {//提交交易密码页面
      if (this.openTradePassword && this.showPassWordPage) {
          if (this.exchangePassWord == null || this.exchangePassWord.length < 6) {
            this.$Notice.warning({
                title: this.$t('bbjyInputPassword'),
            });
            return false
          }
      } else {
          this.exchangePassWord = ""
      }
      if (this.orderType === "cancel") {
          this.exchange.cancelOrder(this.orderID, this.exchangePassWord, (data) => {
            //隐藏密码输入框
            this.closePassWordPage()
            //撤单成功
            this.$Notice.success({
                title: this.$t('tsTips'),
                desc: this.$t('bbjyCancelMsg'),
            })
          }, () => {
            // v.isDisabled = false;
          });
      } else {
          this.sellDisabled = true;
          this.buyDisabled = true;
          if (this.isGBBO) {
            this.exchange.createGBBOOrder(
                {
                  "symbol": this.currentSymbol,
                  "orderType": "LIMIT",
                  "orderSide": this.orderType,
                  "quantity": this.orderType === "BUY" ? this.buyCountInput : this.sellCountInput,
                  "limitPrice": this.orderType === "BUY" ? this.buyPriceInput : this.sellPriceInput,
                },
                this.exchangePassWord,
                (data) => {
                  this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                  this.$Notice.success({
                      title: this.$t('tsTips'),
                      desc: this.$t('bbjyOrderSuccess'),
                  });
                  //隐藏密码框
                  this.closePassWordPage()
                }, (error) => {
                  //错误提示
                  this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                  this.closePassWordPage()
                }
            );
          } else {
            this.exchange.createNewOrder(
                {
                  "symbol": this.currentSymbol,
                  "orderType": "LIMIT",
                  "orderSide": this.orderType,
                  "quantity": this.orderType === "BUY" ? this.buyCountInput : this.sellCountInput,
                  "limitPrice": this.orderType === "BUY" ? this.buyPriceInput : this.sellPriceInput,
                },
                this.exchangePassWord,
                (data) => {
                  this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                  if (this.orderType === "BUY" || this.orderType === "SELL") {
                      if (this.orderType === "BUY") {
                        this.buyCountInput = ''
                        this.$refs.buyCountInputRef.value = ''
                      } else {
                        this.sellCountInput = ''
                        this.$refs.sellCountInputRef.value = ''
                      }
                      this.$Notice.success({
                        title: this.$t('tsTips'),
                        desc: this.$t('bbjyOrderSuccess'),
                      });
                  }
                  //隐藏密码框
                  this.closePassWordPage()
                }, (error) => {
                  //错误提示
                  this.sellDisabled = false;
                  this.buyDisabled = false;
                  this.closePassWordPage()
                }
            );
          }

      }
    },
    rangeFormat(val) {
      return `${val}%`;
    },
  },
  beforeDestroy() {
    //关闭盘口轮询查询
    clearTimeout(this.depthListTimer)
    clearTimeout(this.myBanalceTimer)
    clearTimeout(this.orderTicketTimer)
    this.myBanalceTimer = null
    this.depthListTimer = null
    this.orderTicketTimer = null

    //关闭SSE行情推送
    this.quoteWS && this.quoteWS.close();
    this.SSE_order && this.SSE_order.close();
    this.WSHistory && this.WSHistory.close();

    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    if (this.arbStompClient !== null) {
      this.arbStompClient.disconnect();
    }
  }
}
</script>
<style lang="less">
@import './GBBOMain.less';
</style>