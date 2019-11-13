<template>
  <div class="gbbomain-create-order">
    <div class="inputOrderBox">
        <!-- 一键套利 -->
        <div class="buy-panel buy-sell-common">
            <div>
        <div class="available-container">
          <div>
              One Click Arbitrage
          </div>
          <div>
            <img src="../images/Wallet.svg" alt="">
            <span v-if="isLogin">{{quoteCoinAvailable | scientificToNumber}}</span>
            <span v-else>--</span>&nbsp;
            <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
          </div>
        </div>
        <div class="trade-msg">
          <div class="price-box">
            <div class="price-box-label">
              <div>{{$t("bbjyBuyPrice")}}</div>
              <div>{{$t("bbjyBuyAmount")}}</div>
            </div>
            <div class="input_container">
              <div class="inputbox">
                <input
                  @input="handleBuyPriceInput"
                  type="text"
                  ref="buyInput"
                  maxlength="14"
                  :class="{'input-empty-color':buyPriceEmpty}"
                  class="input-price"
                  autocomplete="off"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                  :disabled='arbFlag'
                />
                <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                <i  @click="clickLock('Arbi')" :class="[buy_input_change_Arbitrage?'gbbo_lock':'gbbo_unlock']"/>
                <!-- <div class="currencyInput">
                  ≈ {{buyPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                </div> -->
              </div>
              <div class="inputbox">
                <input
                  @input="handleBuyCountInput"
                  type="text"
                  maxlength="14"
                  ref="buyCountInputRef"
                  :class="{'input-empty-color':buyCountEmpty}"
                  class="input-num"
                  autocomplete="off"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                />
                <div class="name-show baseAsset">{{currentInfo.baseAsset}}</div>
              </div>
            </div>
          </div>
          <div class="rangePercent">
              <ul>
                  <li @click="choosePercent(index,'Arbitrage')" :class="{active:itemIndex===index}" v-for="(item,index) in percentArr">{{item}}%</li>
              </ul>
          </div>
          <div class="totalMoney-label">
            <em>Expect</em>&nbsp;&nbsp;
            <div>
                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
          <div class="totalMoney-label">
            <em>Fee</em>&nbsp;&nbsp;
            <div>
                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
          <button class="mybtn btn-back" v-if="!isLogin">
            <router-link to="/login" class="text">{{$t('bbjyBuyLogin')}}</router-link>
            <em>{{$t("bbjyOr")}}</em>
            <router-link class="text" to="/register">{{$t('bbjyBuyRegister')}}</router-link>
            <em>{{$t("bbjyToTrade")}}</em>
          </button>
          <!-- 买入按钮 -->
          <button class="mybtn  Arbitrage-btn" :disabled="buyDisabled" @click="buyBtn" v-else>
            <span>One Click Arbitrage</span>
          </button>
        </div>
        </div>
      </div>
      <!--买入-->
      <div class="buy-panel buy-sell-common">
          <div>
        <div class="available-container">
          <!-- 可用币种数量 -->
          <div>
              Buy BTC
          </div>
          <div> 
                <img src="../images/Wallet.svg" alt="">
                <span v-if="isLogin">{{quoteCoinAvailable | scientificToNumber}}</span>
                <em v-else>--</em>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
          </div>
        
        </div>
        <div class="trade-msg">
          <div class="price-box">
            <div class="price-box-label">
              <div>Lowest</div>
              <div>Amount</div>
            </div>
            <div class="input_container">
              <div class="inputbox">
                <input
                  @input="handleBuyPriceInput"
                  type="text"
                  ref="buyInput"
                  maxlength="14"
                  :class="{'input-empty-color':buyPriceEmpty}"
                  class="input-price"
                  autocomplete="off"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                  :disabled='changeFlag'
                />
                <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                <i  @click="clickLock('change')" :class="[buy_input_change?'gbbo_lock':'gbbo_unlock']"/>

                <!-- <div class="currencyInput">
                  ≈ {{buyPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                </div> -->
              </div>
              <div class="inputbox">
                <input
                  @input="handleBuyCountInput"
                  type="text"
                  maxlength="14"
                  ref="buyCountInputRef"
                  :class="{'input-empty-color':buyCountEmpty}"
                  class="input-num"
                  autocomplete="off"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                />
                <div class="name-show baseAsset">{{currentInfo.baseAsset}}</div>
              </div>
            </div>
          </div>
          <div class="rangePercent">
              <ul>
                  <li @click="choosePercent(index,'buy')" :class="{active:itemIndexBuy===index}" v-for="(item,index) in percentArr">{{item}}%</li>
              </ul>
          </div>
          <div class="totalMoney-label">
            <em>{{$t("bbjyBuyTotal")}}</em>&nbsp;&nbsp;
            <div>
                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
           <div class="totalMoney-label">
            <em>Fee</em>&nbsp;&nbsp;
            <div>
                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
          <button class="mybtn btn-back" v-if="!isLogin">
            <router-link to="/login" class="text">{{$t('bbjyBuyLogin')}}</router-link>
            <em>{{$t("bbjyOr")}}</em>
            <router-link class="text" to="/register">{{$t('bbjyBuyRegister')}}</router-link>
            <em>{{$t("bbjyToTrade")}}</em>
          </button>
          <!-- 买入按钮 -->
          <button class="mybtn buy-btn" :disabled="buyDisabled" @click="buyBtn" v-else>
            <span>Buy at Lowest Price </span>
          </button>
        </div>
        </div>
      </div>
      <!--卖出-->
      <div class="buy-panel buy-sell-common">
          <div>
        <div class="available-container">
          <div>
              Sell BTC
          </div>
          <div>
            <img src="../images/Wallet.svg" alt="">
            <span v-if="isLogin">{{baseAssetAvailable | scientificToNumber}}</span>
            <em v-else>--</em>&nbsp;
            <span class="baseAsset">{{currentInfo.baseAsset}}</span>
         </div>
          
        </div>
        <div class="trade-msg">
          <div class="price-box">
            <div class="price-box-label">
              <div>{{$t("bbjySellPrice")}}</div>
              <div>{{$t("bbjySellAmount")}}</div>
            </div>
            <div class="input_container">
              <div class="inputbox">
                <input
                  @input="handleSellPriceInput"
                  type="text"
                  maxlength="14"
                  ref="sellInput"
                  :class="{'input-empty-color':sellPriceEmpty}"
                  class="input-price"
                  autocomplete="off"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                  :disabled="sellFlag"
                />
                <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                <i  @click="clickLock('sell')" :class="[buy_input_change_sell?'gbbo_lock':'gbbo_unlock']"/>

                <!-- <div class="currencyInput">
                  ≈ {{sellPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                </div> -->
              </div>
              <div class="inputbox">
                <input
                  @input="handleSellCountInput"
                  type="text"
                  ref="sellCountInputRef"
                  maxlength="14"
                  :class="{'input-empty-color':sellCountEmpty}"
                  class="input-price"
                  autocomplete="off"
                  data-style="amount"
                  style="ime-mode:disabled"
                  ondragenter="return false"
                />
                <div class="name-show baseAsset">{{currentInfo.baseAsset}}</div>
              </div>
            </div>
          </div>
          <div class="rangePercent">
              <ul>
                  <li @click="choosePercent(index,'sell')" :class="{active:itemIndexSell===index}" v-for="(item,index) in percentArr">{{item}}%</li>
              </ul>
          </div>
          <!-- <div class="range">
            <div class="path sell-path"></div>
            <div class="range-ball" data-side="sell" :data="sellBallTotal" @click="changeSailBall">
              <div class="ball sell-ball" style="left: 0;transform: translateX(0);" data-num="0">
                <div v-if="sellBallPercentage == '0'" class="active-sellball"></div>
              </div>
              <div
                class="ball sell-ball"
                style="left: 25%;transform: translateX(-25%);"
                data-num="0.25"
              >
                <div v-if="sellBallPercentage == '0.25'" class="active-sellball"></div>
              </div>
              <div
                class="ball sell-ball"
                style="left: 50%;transform: translateX(-50%);"
                data-num="0.5"
              >
                <div v-if="sellBallPercentage == '0.5'" class="active-sellball"></div>
              </div>
              <div
                class="ball sell-ball"
                style="left: 75%;transform: translateX(-75%);"
                data-num="0.75"
              >
                <div v-if="sellBallPercentage == '0.75'" class="active-sellball"></div>
              </div>
              <div
                class="ball sell-ball"
                style="left: 100%;transform: translateX(-100%);"
                data-num="1"
              >
                <div v-if="sellBallPercentage == '1'" class="active-sellball"></div>
              </div>
            </div>
            <div class="range-num">
              <div class="num" style="left: 0;transform: translateX(0);">&nbsp;0</div>
              <div class="num" style="left: 25%;transform: translateX(-25%);">25</div>
              <div class="num" style="left: 50%;transform: translateX(-50%);">50</div>
              <div class="num" style="left: 75%;transform: translateX(-75%);">75</div>
              <div class="num" style="left: 100%;transform: translateX(-100%);">100</div>
            </div>
          </div> -->
          <!-- 总价 -->
          <div class="totalMoney-label">
            <em>{{$t("bbjySellTotal")}}</em>&nbsp;&nbsp;
            <div>
                 <span class="total-num">{{sellOutTatal}}</span>&nbsp;
                 <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
           <div class="totalMoney-label">
            <em>Fee</em>&nbsp;&nbsp;
            <div>
                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
          <!-- 卖出按钮 -->
          <button class="mybtn btn-back" v-if="!isLogin">
            <router-link to="/login" class="text">{{$t('bbjyBuyLogin')}}</router-link>
            <em>{{$t("bbjyOr")}}</em>
            <router-link class="text" to="/register">{{$t('bbjyBuyRegister')}}</router-link>
            <em>{{$t("bbjyToTrade")}}</em>
          </button>
          <button class="mybtn sell-btn" :disabled="sellDisabled" @click="sellBtn" v-else>
            <span>Sell at Highest Price</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment, {isMoment} from 'moment'
import bigDecimal from 'js-big-decimal' //除法失效
import {BigNumber} from 'bignumber.js';
import {Exchange} from '@/interface/exchange.js'
import {
    getSymbolList,
    // getSymbolList_realtime,
    // getdepthList,
    // getDeleteFavoritesPair,
    getUserInfo
  } from '_api/exchange.js'
 import {
    //   getObjFirstKey,
      getDecimalsNum,
      onlyInputNumAndPoint,
      getTokenByKey as getValue,
    //   addSymbolSplitLine,
    //   storage,
      isDivideAll,
    //   getLastUTCMinutes,
    //   getIndexInObject,
      scientificToNumber,
    //   isSameUTCDay,
      subNumberPoint,
    //   getObjFirstValue,
    //   dealNumber
   } from '@/lib/utils.js'
export default {
  name: "gbbo",
  data() {
    return {
        isLogin:true,
        currentInfo: {
            quoteAsset:'USD',
            baseAsset:'BTC'
        }, //当前交易对的基本信息集合
        buyPriceEmpty: false,
        buyCountEmpty: false,
        sellPriceEmpty: false,
        sellCountEmpty: false,
        buyPriceInput: '',
        buyCountInput: '',
        sellCountInput: '',
        sellPriceInput: '',
        currencyName: '',//当前的法币名称
        currencyRate: 1,//当前法币的比率
        currentSymbolRate: 1, //当前交易对 对USD的系数
        baseAssetAvailable: 0,//可用的交易资产 卖出
        quoteCoinAvailable: 0,//可用的计价资产 买入
        buyPriceCurrency: "--",//买入价格法币估值
        sellPriceCurrency: "--",
        symbolCurrency: "--",//当前交易对法币估值
        buyDisabled: false,
        sellDisabled: false,
        myBanalceTimer: null,
        buyBallPercentage: '0',//下单买入百分比 0 0.25 0.5 0.75 1
        sellBallPercentage: '0',//下单卖出百分比
        buy_input_change: true,//是否输入
        buy_input_change_Arbitrage:true,
        buy_input_change_sell:true,
        percentArr:[25,50,75,100],
        itemIndex:0,
        itemIndexBuy:0,
        itemIndexSell:0,
        orderType: null,//撤单 cancle  下单  输入密码用
        orderID: null,
        showPassWordPage: false,
        exchangePassWord: null,//交易密码
        setTradePassword: false,//localstorage 是否
        symbolList: {},//交易接口的symbolList 接口
        loginToken: $cookies.get('loginToken'),//登陆token
        arbFlag:false,
        changeFlag:false,
        sellFlag:false,
    };
  },
   props: {
       isSetTradePasswrod:{
           type:Boolean,
           default:true
       },
       openTradePassword:{
           type:Boolean,
           default:false
       },
       currentSymbol:{// 当前交易对
           type:String,
           default:'BTCUSD'
       },
    //    currentInfo: {
    //         type:Object,
    //         quoteAsset:'USD',
    //         baseAsset:'BTC'
    //     },
  },
  created() {
        var ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         if (this.isLogin) {
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               if (this.loginToken) {
                  fn(this.loginToken);
               }
            }.bind(this)
         }
        // if($cookies.get('loginToken')){
        //   getUserInfo({userId: localStorage.getItem('loginUserId')},$cookies.get('loginToken'))
        //       .then((res) => {                
        //         const { data: { setTradePassword, openTradePassword } } = res
        //         // 是否设置交易密码
        //         this.isSetTradePasswrod = setTradePassword
        //         // 是否打开交易密码
        //         this.openTradePassword = openTradePassword
        //         console.log(setTradePassword)
                
        //       })
        // }
  },
  beforeMount(){
         this.getSymbolListData();
  },
  mounted() {

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
  },
  methods: {
      clickLock(name){
          if(name==='Arbi'){
             this.buy_input_change_Arbitrage = !this.buy_input_change_Arbitrage;
             this.arbFlag = !this.arbFlag;
          }else if(name==='change'){
             this.buy_input_change = !this.buy_input_change;
             this.changeFlag = !this.changeFlag;
          }else if(name==='sell'){
             this.buy_input_change_sell = !this.buy_input_change_sell;
             this.sellFlag = !this.sellFlag;
          }
      },
       buyBtn() {
        //    console.log(this.symbolList[this.currentSymbol].priceTickSize)
        //    let params = {
        //         orderType : 'BUY',
        //         buyDisabled : true,
        //         minPrice : this.symbolList[this.currentSymbol].minPrice,
        //         maxPrice : this.symbolList[this.currentSymbol].maxPrice,
        //         minQuantity : this.symbolList[this.currentSymbol].minQuantity,
        //         maxQuantity : this.symbolList[this.currentSymbol].maxQuantity,
        //         status : this.symbolList[this.currentSymbol].status,
        //         priceTickSize : this.symbolList[this.currentSymbol].priceTickSize,
        //         quantityStepSize : this.symbolList[this.currentSymbol].quantityStepSize,
        //         isPriceSize : isDivideAll(this.buyPriceInput, priceTickSize),
        //         isQuantitySize : isDivideAll(this.buyCountInput, quantityStepSize),
        //    }
            let params = {
                buyPriceInput:this.buyPriceInput,
                buyCountInput:this.buyCountInput,
            }
           this.$emit('buyBtn',params)
            
         },
         sellBtn() {
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
                  title: this.$t('bbjyEnterSellPrice'),
               });
               this.sellDisabled = false;
            } else if (!this.sellCountInput) {
               this.sellCountEmpty = true
               // this.$Message.warning('请输入卖出数量');
               this.$Notice.warning({
                  title: this.$t('bbjyEnterSellVolume'),
               });
               this.sellDisabled = false;
            } else if (Number(this.sellPriceInput) > Number(maxPrice)) {
               // this.$Message.warning('卖出价格不能超过'+maxPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceNotMore') + maxPrice,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellPriceInput) < Number(minPrice)) {
               // this.$Message.warning('卖出价格不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceNotLess') + minPrice,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellCountInput) > Number(maxQuantity)) {
               // this.$Message.warning('卖出数量不能超过'+maxQuantity);
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeNotMore') + maxQuantity,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellCountInput) < Number(minQuantity)) {
               // this.$Message.warning('卖出数量不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeNotLess') + minQuantity,
               });
               this.sellDisabled = false;
            } else if (!isPriceSize) {
               // 价格整数倍于
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceMultiple') + priceTickSize,
               });
               this.sellDisabled = false;
            } else if (!isQuantitySize) {
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeMultiple') + quantityStepSize,
               });
               this.sellDisabled = false;
            } else if (status == "HALT") {
               //账户停止
               this.$Notice.warning({
                  title: this.$t('bbjyAccountError'),
               });
               this.sellDisabled = false;
            }
            //未设置交易密码直接下单
            else if (!this.setTradePassword) {
               this.$Notice.warning({
                  title: this.$t('bbjyNoPasswordError'),
               });
               setTimeout(function () {
                  this.$router.push('/originTradePassword')
               }.bind(this), 1000);
            } else if (this.$store.state.exchange.inputTradePassWordStatus) {
               //需要输入交易密码
               if (getValue("ORDER_SESSION")) {
                  this.sellDisabled = true;
                  this.exchange.createNewOrder({
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
        //  getSymbolListData() {
        //     getSymbolList().then(res => {
        //        if (this.loginToken) {
        //           this.isLogin = true
        //        }
        //        this.symbolList = {};
        //        res.map((v, i) => {
        //           this.symbolList[v.symbol] = v;
        //        })
        //        //增加蒙层逻辑
        //     //    this.isShowTradeMask();
        //        //查询委托订单
        //     //    this.getSSEOrderList()
        //     }).catch(error => {

        //     })
        //  },
         choosePercent(index,direction){
            switch(direction){
                case 'Arbitrage':
                this.itemIndex = index;
                break;
                case 'buy' :
                this.itemIndexBuy = index;
                break;
                case 'sell' :
                this.itemIndexSell = index;
                break;
            }
         },
          showCurrentPriceInfo(v) {
            //给title赋值行情
            if (v.last) {
               document.title = `${v.last}  | ${v.baseAsset}/${v.quoteAsset}`
            } else {
               document.title = `-- | ${v.baseAsset}/${v.quoteAsset}`
            }
            this.currentInfo = v
         },
      handleBuyPriceInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置为空样式
            this.buyPriceEmpty = false
            let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
            //    e.target.value = onlyInputNumAndPoint(e.target.value,6)  
            e.target.value = onlyInputNumAndPoint(e.target.value, pricelong)
            this.buyPriceInput = e.target.value
         },
         handleBuyCountInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置样式
            this.buyCountEmpty = false
            let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize)
            this.buyCountInput = e.target.value
         },
         handleSellPriceInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置为空样式
            this.sellPriceEmpty = false
            let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, pricelong)
            this.sellPriceInput = e.target.value
         },
         handleSellCountInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置样式
            this.sellCountEmpty = false
            let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize)
            this.sellCountInput = e.target.value
         },
         changeBuyBall(e) {
            if (e.target.getAttribute('data-num')) {
               let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
               this.buyBallPercentage = e.target.getAttribute('data-num')
               this.$refs.buyCountInputRef.value = bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage) === "0" ? '0' : subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
               this.buyCountInput = subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
            }
         },
         changeSailBall(e) {
            if (e.target.getAttribute('data-num')) {
               let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
               this.sellBallPercentage = e.target.getAttribute('data-num')
               this.$refs.sellCountInputRef.value = bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage) === '0' ? '0' : subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
               this.sellCountInput = subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
            }
         },
  },
  components: {}
};
</script>
<style lang="less">
  @fontColor:#688A9D;
.gbbomain-create-order{
    background:#031419;
    .inputOrderBox{
                  display: flex;
                  align-items: center;
                }
                .buy-sell-common {
                  width: 270px;
                  >div{
                     padding:20px 12px 10px 12px;
                  }
                  button{
                    border: 0;
                    outline:none;
                  }
                      .available-container{
                        display: flex;
                        justify-content: space-between;
                        padding-bottom: 25px;
                        div{
                            color:#D4D4D4;
                            font-size: 14px;
                            font-weight:500;
                        }
                        span{
                          font-size: 12px;
                          color:#D4D4D4;
                          font-weight:500;
                          font-style: normal;
                          margin-left: 6px
                        }
                        em{
                            margin-left: 6px
                        }
                      }
                    .cost-price {
                      text-align: right;
                    }
                  .trade-msg {
                      .rangePercent{
                          margin-bottom: 5px;
                          ul{
                            display: flex;
                            justify-content: space-between;
                            margin-left:67px;
                            margin-top:8px;
                            li{
                                padding:2px 6px;
                                background:rgba(4,29,37,1);
                                border-radius:2px;
                                border:1px solid rgba(8,52,65,1);
                                cursor: pointer;
                                font-weight: 500;
                                &.active{
                                    color: #788390;
                                    border:1px solid #788390;
                                }
                            }

                          }
                      }
                    position: relative;
                    .price-box {
                      display: flex;
                      .price-box-label{
                        div{
                          height: 34px;
                          line-height: 34px;
                          padding-right: 25px;
                          color: #788390;
                          font-size: 12px;
                          font-weight: 500;
                          &:first-child{
                            margin-bottom: 22px;
                          }
                        }
                      }
                      .input_container{
                        flex: 1;
                        position: relative;
                        .inputbox{
                          position: relative;
                          &:nth-child(2){
                              margin-top: 22px;
                          }
                        }
                      }
                      
                      .input-empty-color {
                        background-color: rgba(255, 0, 0, 0.1) !important;
                        border-color: red !important;
                      }
                      input {
                        box-sizing: border-box;
                        width: 100%;
                        height: 34px;
                        padding: 0 5px;
                        color:#C2D8E8;
                        border-radius: 2px;
                        font-size: 14px;
                        background-color: transparent;
                        border: 1px solid rgba(41,59,71,1);
                        &:focus {
                          background:rgba(22,42,54,1);
                          border:1px solid rgba(81,128,159,1);
                          border-radius:2px;
                        }
                      }
                      .currencyInput{
                        height: 22px;
                        padding-left:12px;
                        color: #688A9D;
                        font-size: 8px;
                        background: #1B2C36;
                        line-height: 22px;
                      }
                      .name-show {
                        color: @fontColor;
                        position: absolute;
                        right: 10px;
                        top:17px;
                        font-size: 12px;
                        transform: translateY(-50%);
                        font-weight:400;
                      }
                      .gbbo_lock {
                      position: absolute;
                      right: 46px;
                      top: 10px;
                      width: 10px;
                      height: 12px;
                      background: url('../images/Lock.svg');
                      background-size: 10px 12px;
                    }
                    .gbbo_unlock {
                      position: absolute;
                      right: 46px;
                      top: 10px;
                      width: 10px;
                      height: 12px;
                      background: url('../images/Unlock.svg');
                      background-size: 10px 12px;
                    }

                    }
                    .amount {
                      margin-top: 16px;
                    }
                    .trans {
                      height: 24px;
                      line-height: 24px;
                      text-align: left;
                      font-size: 10px;
                      padding-left: 12px;
                    }
                    .range {
                      position: relative;
                      margin-top:14px;
                      height: 37px;
                      margin-bottom:14px;
                      .path {
                        position: absolute;
                        top: 9px;
                        width: 100%;
                        height: 2px;
                        background-color: #16453F;
                      }
                      .sell-path{
                        background-color: #3B292F;
                      }
                      .range-ball {
                        position: relative;
                        height: 20px;
                        .ball {
                          position: absolute;
                          top: 50%;
                          margin-top: -10px;
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                        }
                        .active-ball {
                          width: 12px;
                          height: 12px;
                          margin: 3px 0 0 3px;
                          border-radius: 50%;
                          background: #27A781;
                        }
                        .active-sellball{
                          width: 12px;
                          height: 12px;
                          margin: 3px 0 0 3px;
                          border-radius: 50%;
                          background: #CF424E;
                        }
                      }
                      .range-num {
                        position: relative;
                        height: 20px;
                        .num {
                          position: absolute;
                          top: 50%;
                          margin-top: -10px;
                          font-size: 12px;
                          text-align: center;
                          color:@fontColor;
                          font-weight: bold;
                        }
                      }
                    }
                    .totalMoney-label{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 5px;
                      em,span{
                        font-size: 14px;
                        color: #788390;
                        font-weight: 500;
                        font-style: normal;
                      }
                      >div{
                          span{
                              color: #D4D4D4;
                              font-size: 12px;
                              font-weight: 500;
                          }
                      }
                      .quoteAsset {
                        font-size: 12px;
                        font-weight: 500;
                        color: #D4D4D4;
                        }
                    }
                    .mybtn {
                      width: 100%;
                      height: 30px;
                      border-radius: 3px;
                      margin-top: 11px;
                      span{
                          color: #fff;
                          font-weight: 500;
                          font-size: 12px;
                      }
                    //   a {
                    //     font-weight: bold;
                    //   }
                    }
                    .Arbitrage-btn{
                        background-color: #12869A;
                        &:hover{
                         background-color: #12869A;
                        }
                    }
                    .buy-btn {
                      background-color: #00A077;
                      &:hover{
                        background-color: #00A077;
                      }
                    }
                    .btn-back{
                      background-color:#162A36; 
                      border: 0;
                      a,em{
                        font-size: 14px; 
                        color: #688A9D;                       
                      }
                      a{
                        color:#C2D8E8;
                        &:hover{
                          color: #12869A;
                        }
                      }
                    }
                    .sell-btn {
                      background-color: #CF424E;
                      &:hover{
                        background: #C43C3F;
                      }
                    }
                  }
                }
}
</style>