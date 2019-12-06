<template>
  <div class="gbbomain-create-order">
    <div class="inputOrderBox">
      <!-- 一键套利 -->
      <div class="buy-sell-common">
        <div>
          <div class="available-container">
            <Tooltip class="tootips" placement="top" content="One Click Arbitrage">
              <div>Arbitrage</div>
            </Tooltip>
            <div class="coinContainer">
              <div  @click="changeStatus">
                <img src="../images/Wallet.svg" alt />
                <span v-if="isLogin">{{availableCoin | scientificToNumber}}</span>
                <span v-if="!isLogin">--</span>&nbsp;
                <span class="quoteAsset">{{assetName?assetName:currentInfo.quoteAsset}}</span>
                <Icon v-if="showCoin"  type="md-arrow-dropup" />
                <Icon  v-else type="md-arrow-dropdown" />
              </div>
              <ul @click="changeCoin($event)" v-if="showCoin" class="available-assets">
                <li value='quote'>
                  {{currentInfo.quoteAsset}}
                </li>
                <li value='base'>
                  {{currentInfo.baseAsset}}
                </li>
              </ul>
            </div>
          </div>
          <div class="trade-msg">
            <div class="price-box">
              <div class="price-box-label">
                <div class="arb-label">Arbitrage</div>
                <div class="arb-label">Size</div>
              </div>
              <div class="input_container">
                <div class="inputbox">
                  <input
                    @input="handleBuyPriceInput"
                    type="text"
                    ref="buyArbitraInput"
                    maxlength="14"
                    :class="{'input-empty-color':buyPriceEmpty,'gbbo_lock_arbitra':buy_input_change_Arbitrage}"
                    class="input-price"
                    autocomplete="off"
                    style="ime-mode:disabled"
                    ondragenter="return false"
                    :disabled="arbFlag"
                  />
                  <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                  <i @click="clickLock('Arbi')"
                    :class="[buy_input_change_Arbitrage?'gbbo_lock':'gbbo_unlock']"
                  />
                  <!-- <div class="currencyInput">
                  ≈ {{buyPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                  </div>-->
                </div>
                <div class="inputbox">
                  <input
                    @input="handleArbitraBuyCountInput"
                    type="text"
                    maxlength="14"
                    ref="buyArbitraCountInputRef"
                    :class="{'input-empty-color':buyCountEmpty,'gbbo_lock_arbitra':arbCountFlag}"
                    class="input-num"
                    autocomplete="off"
                    style="ime-mode:disabled"
                    ondragenter="return false"
                    :disabled="arbCountFlag"
                  />
                  <div class="name-show baseAsset">{{assetName}}</div>
                </div>

                <div class="rangePercent">
                  <ul>
                    <li
                      :class="{active:itemIndex===index}"
                      v-for="(item,index) in percentArr"
                    >{{item}}%</li>
                    <!-- <li
                      @click="choosePercent(item,index,'Arbitrage')"
                      :class="{active:itemIndex===index}"
                      v-for="(item,index) in percentArr"
                    >{{item}}%</li> -->
                  </ul>
                </div>
              </div>
            </div>
            <div class="totalMoney-label">
              <em>Expect</em>&nbsp;&nbsp;
              <div>
                <span id="buy_total" class="total-num">{{buyArbitraInTotal}}</span>&nbsp;
                <span id="buy_total" class="total-num">--</span>&nbsp;
                <span class="quoteAsset">{{assetName}}</span>
              </div>
            </div>
            <div class="totalMoney-label">
              <em>Fee</em>&nbsp;&nbsp;
              <div>
                <span id="buy_total" class="total-num">{{buyArbitraInTotalFee}}%</span>&nbsp;
                <!-- <span class="quoteAsset">{{assetName}}</span> -->
              </div>
            </div>
            <button class="mybtn btn-back" v-if="!isLogin">
              <router-link to="/login" class="text">{{$t('bbjyBuyLogin')}}</router-link>
              <em>{{$t("bbjyOr")}}</em>
              <router-link class="text" to="/register">{{$t('bbjyBuyRegister')}}</router-link>
              <em>{{$t("bbjyToTrade")}}</em>
            </button>
            <!-- 买入按钮 -->
               <Tooltip class="mybtn Arbitrage-btn" v-else placement="top" content="Coming Soon...">
                  <button class="Arbitrage-btn"  disabled="true" @click="buyBtn" >
                      <span>One Click Arbitrage</span>
                  </button>
               </Tooltip>
               <!-- <button v-else class="Arbitrage-btn mybtn"  disabled="true" @click="buyBtn" >
                      <span>Coming Soon...</span>
                </button> -->
          </div>
        </div>
      </div>
      <!--买入-->
      <div class="buy-sell-common" style="margin-left:6px;">
        <div>
          <div class="available-container">
            <!-- 可用币种数量 -->
            <div>Buy {{currentInfo.baseAsset}}</div>
            <div>
              <img src="../images/Wallet.svg" alt />
              <span v-if="isLogin">{{briefInputData.quoteCoinAvailable | scientificToNumber}}</span>
              <em v-else>--</em>&nbsp;
              <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
            </div>
          </div>
          <div class="trade-msg">
            <div class="price-box">
              <div class="price-box-label">
                <div>Price</div>
                <div>Size</div>
              </div>
              <div class="input_container">
                <div class="inputbox">
                  <input
                    @input="handleBuyPriceInput"
                    type="text"
                    ref="buyInput"
                    maxlength="14"
                    :class="{'input-empty-color':buyPriceEmpty,'gbbo_lock_input':buy_input_change}"
                    class="input-price"
                    autocomplete="off"
                    style="ime-mode:disabled"
                    ondragenter="return false"
                    :disabled="changeFlag"
                  />
                  <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                  <i
                    @click="clickLock('buy')"
                    :class="[buy_input_change?'gbbo_lock':'gbbo_unlock']"
                  />
                  <!-- <div class="currencyInput">
                  ≈ {{buyPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                  </div>-->
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

                <div class="rangePercent">
                  <ul>
                    <li
                      @click="choosePercent(item,index,'buy')"
                      :class="{active:itemIndexBuy===index}"
                      v-for="(item,index) in percentArr"
                    >{{item}}%</li>
                  </ul>
                </div>
              </div>
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
                <span id="buy_total" class="total-num">{{buyTotalFee}}%</span>&nbsp;
                <!-- <span class="quoteAsset">{{currentInfo.quoteAsset}}</span> -->
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
              <span>Buy BTC</span>
            </button>
          </div>
        </div>
      </div>
      <div class="border-line">
        <span></span>
      </div>
      <!--卖出-->
      <div class="buy-sell-common">
        <div>
          <div class="available-container">
            <div>Sell {{currentInfo.baseAsset}}</div>
            <div>
              <img src="../images/Wallet.svg" alt />
              <span v-if="isLogin">{{briefInputData.baseAssetAvailable | scientificToNumber}}</span>
              <em v-else>--</em>&nbsp;
              <span class="baseAsset">{{currentInfo.baseAsset}}</span>
            </div>
          </div>
          <div class="trade-msg">
            <div class="price-box">
              <div class="price-box-label">
                <div>{{$t("bbjySellPrice")}}</div>
                <div>Size</div>
              </div>
              <div class="input_container">
                <div class="inputbox">
                  <input
                    @input="handleSellPriceInput"
                    type="text"
                    maxlength="14"
                    ref="sellInput"
                    :class="{'input-empty-color':sellPriceEmpty,'gbbo_lock_input_sell':buy_input_change_sell}"
                    class="input-price"
                    autocomplete="off"
                    style="ime-mode:disabled"
                    ondragenter="return false"
                    :disabled="sellFlag"
                  />
                  <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                  <i
                    @click="clickLock('sell')"
                    :class="[buy_input_change_sell?'gbbo_lock':'gbbo_unlock']"
                  />

                  <!-- <div class="currencyInput">
                  ≈ {{sellPriceCurrency | scientificToNumber}}
                  {{currencyName}}
                  </div>-->
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

                <div class="rangePercent">
                  <ul>
                    <li
                      @click="choosePercent(item,index,'sell')"
                      :class="{active:itemIndexSell===index}"
                      v-for="(item,index) in percentArr"
                    >{{item}}%</li>
                  </ul>
                </div>
              </div>
            </div>
            
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
                <span id="buy_total" class="total-num">{{sellTotalFee}}%</span>&nbsp;
                <!-- <span class="quoteAsset">{{currentInfo.quoteAsset}}</span> -->
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
              <span>Sell BTC</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment, { isMoment } from "moment";
import bigDecimal from "js-big-decimal"; //除法失效
import { BigNumber } from "bignumber.js";
import { Exchange } from "@/interface/exchange.js";
import {
  getSymbolList,
  // getSymbolList_realtime,
  // getdepthList,
  // getDeleteFavoritesPair,
  getUserInfo
} from "_api/exchange.js";
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
  subNumberPoint
  //   getObjFirstValue,
  //   dealNumber
} from "@/lib/utils.js";
export default {
  name: "createOrder",
  data() {
    return {
      // currentInfo: {
      //   quoteAsset: "USD",
      //   baseAsset: "BTC"
      // }, //当前交易对的基本信息集合
      buyPriceEmpty: false,
      buyCountEmpty: false,
      sellPriceEmpty: false,
      sellCountEmpty: false,
      // buyArbitraPriceInput: "",
      buyArbitraCountInput: "",
      buyPriceInput: "",
      buyCountInput: "",
      sellCountInput: "",
      sellPriceInput: "",
      currencyName: "", //当前的法币名称
      currencyRate: 1, //当前法币的比率
      currentSymbolRate: 1, //当前交易对 对USD的系数
      baseAssetAvailable: 0, //可用的交易资产 卖出
      quoteCoinAvailable: 0, //可用的计价资产 买入
      buyPriceCurrency: "--", //买入价格法币估值
      sellPriceCurrency: "--",
      symbolCurrency: "--", //当前交易对法币估值
      buyDisabled: false,
      sellDisabled: false,
      myBanalceTimer: null,
      arbitraBallPercentage:'0',
      buyBallPercentage: "0", //下单买入百分比 0 0.25 0.5 0.75 1
      sellBallPercentage: "0", //下单卖出百分比
      buy_input_change: true, //是否输入
      buy_input_change_Arbitrage: true,
      buy_input_change_sell: true,
      percentArr: [25, 50, 75, 100],
      itemIndex: "",
      itemIndexBuy: "",
      itemIndexSell: "",
      orderType: null, //撤单 cancle  下单  输入密码用
      orderID: null,
      showPassWordPage: false,
      exchangePassWord: null, //交易密码
      setTradePassword: false, //localstorage 是否
      loginToken: $cookies.get("loginToken"), //登陆token
      arbFlag: true,
      arbCountFlag:false,
      changeFlag: true,
      sellFlag: true,
      buyTotalFee: 0,
      sellTotalFee: 0,
      buyArbitraInTotalFee:0,
      showCoin:false,
      quoteName:true,
      availableCoin:'',
      assetName:'',
      buyArbitraInTotal:'',
      
    };
  },
  props: {
    isLogin: Boolean,
    currentSymbol: {
      // 当前交易对
      type: String,
      default: "BTCUSD"
    },
    symbolList: Object,
    briefInputData: Object,
    buyInputPrice: Number,
    sellInputPrice: Number,
    maxArbitrageList:Array,
    currentInfo:Object,
    arbData:Object,
   
  },
  watch: {
    arbData(){
      if(this.buy_input_change_Arbitrage){
        if(this.arbData.matchMap[0]){
          this.$refs.buyArbitraInput.value = this.arbData.matchMap[0].arb;
        }
      } 
    },  
    buyInputPrice() {
      if(this.buy_input_change){//锁定状态，才去获取最新价
        this.$refs.buyInput.value = this.buyInputPrice;
        this.buyPriceInput = this.buyInputPrice;
      }
    },
    sellInputPrice() {
      if(this.buy_input_change_sell){
        this.$refs.sellInput.value = this.sellInputPrice;
        this.sellPriceInput = this.sellInputPrice;
      }
    },
    briefInputData() {
      this.quoteCoinAvailable = this.briefInputData.quoteCoinAvailable;
      this.baseAssetAvailable = this.briefInputData.baseAssetAvailable;
      this.availableCoin = this.briefInputData.quoteCoinAvailable;
    },
    currentInfo(){
      this.assetName = this.currentInfo.quoteAsset;
    }
  },
  computed: {
    buyInTotal: function() {
      //买入总价
      return bigDecimal.multiply(this.buyPriceInput, this.buyCountInput);
    },
    sellOutTatal: function() {
      //卖出总价
      return bigDecimal.multiply(this.sellPriceInput, this.sellCountInput);
    },
    buyBallTotal: function() {
      //能买入的总数量
      return this.buyPriceInput == 0
        ? ""
        : new BigNumber(this.quoteCoinAvailable)
            .dividedBy(new BigNumber(this.buyPriceInput))
            .toNumber();
    },
    sellBallTotal: function() {
      //能卖出的总数量
      return this.baseAssetAvailable;
    }
  },
  methods: {
    changeStatus(){
      this.showCoin = !this.showCoin;
    },
    changeCoin(e){
      this.showCoin = !this.showCoin;
      let direction = e.target.getAttribute('value');
      if(direction==='quote'){
          this.availableCoin = this.briefInputData.quoteCoinAvailable;
          this.assetName = this.currentInfo.quoteAsset;
      }else{
          this.availableCoin = this.briefInputData.baseAssetAvailable;
          this.assetName = this.currentInfo.baseAsset;

      }
      this.quoteName = !this.quoteName;
    },
    clickLock(name) {
      if (name === "Arbi") {
        this.buy_input_change_Arbitrage = !this.buy_input_change_Arbitrage;
        this.arbFlag = !this.arbFlag;
        if(this.arbFlag){
          this.arbCountFlag = false;
        }else{
          this.arbCountFlag = true;
        }
      } else if (name === "buy") {
        this.buy_input_change = !this.buy_input_change;
        this.changeFlag = !this.changeFlag;
        if(this.buy_input_change){
           this.$refs.buyInput.value = this.buyInputPrice;
          this.buyPriceInput = this.buyInputPrice;
        }
      } else if (name === "sell") {
        this.buy_input_change_sell = !this.buy_input_change_sell;
        this.sellFlag = !this.sellFlag;
        if(this.buy_input_change_sell){
            this.$refs.sellInput.value = this.sellInputPrice;
            this.sellPriceInput = this.sellInputPrice;
        }
      }
    },
    buyBtn() {
      let params = {
        buyPriceInput: this.buyPriceInput,
        buyCountInput: this.buyCountInput
      };
      this.$emit("buyBtn", params);
    },
    sellBtn() {
      let params = {
        sellPriceInput: this.sellPriceInput,
        sellCountInput: this.sellCountInput
      };
      this.$emit("sellBtn", params);
    },
    choosePercent(itemPercent, index, direction) {
      switch (direction) {
        case "Arbitrage":
          this.itemIndex = index;
            if (this.isLogin) {
            let volumeLong = getDecimalsNum(//精度
              this.symbolList[this.currentSymbol].quantityStepSize
            );
            this.arbitraBallPercentage = itemPercent / 100;//百分比
            this.$refs.buyArbitraCountInputRef.value =
              bigDecimal.multiply(Number(this.availableCoin), this.arbitraBallPercentage) ===
              "0"
                ? "0"
                : subNumberPoint(
                    bigDecimal.multiply(
                      Number(this.availableCoin),//能够买的数量
                      this.arbitraBallPercentage
                    ),
                    volumeLong
                  );
            this.buyArbitraCountInput = subNumberPoint(
              bigDecimal.multiply(Number(this.availableCoin), this.arbitraBallPercentage),
              volumeLong
            );
          }
          let arbitraFee = this.symbolList[this.currentSymbol].commissionRate*100;
          this.buyArbitraInTotalFee = arbitraFee.toFixed(2);

          // let arbitraPrice = this.maxArbitrageList[0].priceSubtract;
          // let arbitraAmount = this.maxArbitrageList[0].qtySubtract;
          // let profits = bigDecimal.multiply(this.maxArbitrageList[0].priceSubtract,this.maxArbitrageList[0].qtySubtract)
          this.buyArbitraInTotal=bigDecimal.add(profits,this.buyArbitraCountInput)
          break;
        case "buy":
          this.itemIndexBuy = index;
          if (this.isLogin) {
            let volumeLong = getDecimalsNum(
              this.symbolList[this.currentSymbol].quantityStepSize
            );
            this.buyBallPercentage = itemPercent / 100;
            this.$refs.buyCountInputRef.value =
              bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage) ===
              "0"
                ? "0"
                : subNumberPoint(
                    bigDecimal.multiply(
                      this.buyBallTotal,
                      this.buyBallPercentage
                    ),
                    volumeLong
                  );
            this.buyCountInput = subNumberPoint(
              bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage),
              volumeLong
            );
          }
          let Fee = this.symbolList[this.currentSymbol].commissionRate*100;
          this.buyTotalFee = Fee.toFixed(2);
          break;
        case "sell":
          this.itemIndexSell = index;
          if (this.isLogin) {
            let volumeLong = getDecimalsNum(
              this.symbolList[this.currentSymbol].quantityStepSize
            );
            this.sellBallPercentage = itemPercent / 100;
            this.$refs.sellCountInputRef.value =
              bigDecimal.multiply(
                this.sellBallTotal,
                this.sellBallPercentage
              ) === "0"
                ? "0"
                : subNumberPoint(
                    bigDecimal.multiply(
                      this.sellBallTotal,
                      this.sellBallPercentage
                    ),
                    volumeLong
                  );
            this.sellCountInput = subNumberPoint(
              bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage),
              volumeLong
            );
          }
          let sellFee = this.symbolList[this.currentSymbol].commissionRate*100;
          this.sellTotalFee =sellFee.toFixed(2);
          
          break;
      }
    },
    handleBuyPriceInput(e) {
      if (!this.symbolList[this.currentSymbol]) {
        return;
      }
      //重置为空样式
      this.buyPriceEmpty = false;
      let pricelong = getDecimalsNum(
        this.symbolList[this.currentSymbol].priceTickSize
      );
      e.target.value = onlyInputNumAndPoint(e.target.value, pricelong);
      this.buyPriceInput = e.target.value;
    },
    handleArbitraBuyCountInput(e){
      if (!this.symbolList[this.currentSymbol]) {
        return;
      }
      //重置样式
      this.buyCountEmpty = false;
      let quantityStepSize = getDecimalsNum(
        this.symbolList[this.currentSymbol].quantityStepSize
      );
      e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize);
      this.buyArbitraCountInput = e.target.value;
      if(this.arbData.totalArb){// 必须有差价的时候才可以计算
        let price = this.currentInfo.last;
        let size = e.target.value;
        let amount = new BigNumber(size).dividedBy(price)
        let totalAmount = this.arbData.totalAmount;
        let totalArbitrage = this.arbData.totalArb;
        if(Number(amount)-Number(totalAmount)>0){//如果输入size大于总的total size expect = size +total arbitrage;
            this.buyArbitraInTotal=bigDecimal.add(e.target.value,totalArbitrage);
        }
      console.log(amount)
      }
      
      //  let arbitraPrice = this.maxArbitrageList[0].priceSubtract;
      //  let arbitraAmount = this.maxArbitrageList[0].qtySubtract;
      //  let profits = bigDecimal.multiply(this.maxArbitrageList[0].priceSubtract,this.maxArbitrageList[0].qtySubtract)
      //  this.buyArbitraInTotal=bigDecimal.add(profits,this.buyArbitraCountInput)
    },
    handleBuyCountInput(e) {
      if (!this.symbolList[this.currentSymbol]) {
        return;
      }
      //重置样式
      this.buyCountEmpty = false;
      let quantityStepSize = getDecimalsNum(
        this.symbolList[this.currentSymbol].quantityStepSize
      );
      e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize);
      this.buyCountInput = e.target.value;
    },
    handleSellPriceInput(e) {
      if (!this.symbolList[this.currentSymbol]) {
        return;
      }
      //重置为空样式
      this.sellPriceEmpty = false;
      let pricelong = getDecimalsNum(
        this.symbolList[this.currentSymbol].priceTickSize
      );
      e.target.value = onlyInputNumAndPoint(e.target.value, pricelong);
      this.sellPriceInput = e.target.value;
    },
    handleSellCountInput(e) {
      if (!this.symbolList[this.currentSymbol]) {
        return;
      }
      //重置样式
      this.sellCountEmpty = false;
      let quantityStepSize = getDecimalsNum(
        this.symbolList[this.currentSymbol].quantityStepSize
      );
      e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize);
      this.sellCountInput = e.target.value;
    }
  },
  components: {},
  mounted() {
    this.availableCoin = this.briefInputData.quoteCoinAvailable;
    this.$refs.sellInput.value = this.sellInputPrice;
    this.$refs.buyInput.value = this.buyInputPrice;
    if(this.arbData.minArb&&this.arbData.maxArb){
      this.$refs.buyArbitraInput.value = this.arbData.minArb+'-'+this.arbData.maxArb;
    }
  },
  created() {
    var ssoProvider = {};
    //创建实例
    this.exchange = new Exchange(ssoProvider);
    if (this.isLogin) {
      this.exchange.ssoProvider.getSsoToken = function(fn) {
        if (this.loginToken) {
          fn(this.loginToken);
        }
      }.bind(this);
    }
  },
  beforeMount() {
    //  this.getSymbolListData();
  },
};
</script>
<style lang="less">
@fontColor: #688a9d;
.gbbomain-create-order {
  .inputOrderBox {
    display: flex;
    align-items: center;
  }
  .border-line {
    padding: 28px 3px 0;
    height: 270px;
    background: #031419;

    span{
      display: inline-block;
      width: 0;
      height: 207px;
      border-right: 1px dashed#083441;
    }
  }
  .buy-sell-common {
    flex: 1;
    width: 270px;
    min-height: 270px;
    background: #031419;

    > div {
      padding: 20px 12px 10px 12px;
    }
    button {
      border: 0;
      outline: none;
    }
    .available-container {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      height: 45px;
      .tootips{
        .ivu-tooltip-inner{
          font-weight: 350;
        }
      }
      .coinContainer{
        position: relative;
        .available-assets{
          position: absolute;
          width: 100%;
          z-index: 999;
          li{
            background: #041D25;
            text-align:right;
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            &:hover{
              background:#0C242C;
            }
            span{
              color: #FFFFFF;
              font-size: 12px;
              font-weight: 500;
            }
            
          }
      }
      }
      
      div {
        color: #d4d4d4;
        font-size: 14px;
        font-weight: 500;
      }
      span {
        font-size: 12px;
        color: #d4d4d4;
        font-weight: 500;
        font-style: normal;
        margin-left: 6px;
      }
      em {
        margin-left: 6px;
      }
    }
    .cost-price {
      text-align: right;
    }
    .trade-msg {
      .rangePercent {
        ul {
          display: flex;
          justify-content: space-between;
          padding: 8px 0 7px 0px;
          li {
            padding: 2px 6px;
            background: rgba(4, 29, 37, 1);
            border-radius: 2px;
            border: 1px solid rgba(8, 52, 65, 1);
            cursor: pointer;
            font-weight: 500;
            &.active {
              color: #788390;
              border: 1px solid #788390;
            }
          }
        }
      }
      position: relative;
      .price-box {
        display: flex;
        .price-box-label {
          div {
            height: 30px;
            line-height: 30px;
            padding-right: 25px;
            color: #788390;
            font-size: 12px;
            font-weight: 500;
            &:first-child {
              margin-bottom: 12px;
            }
          }
          .arb-label{
            padding-right: 5px;
          }
        }
        .input_container {
          flex: 1;
          position: relative;
          .inputbox {
            position: relative;
            &:nth-child(2) {
              margin-top: 12px;
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
          height: 30px;
          padding: 0 5px;
          color: #c2d8e8;
          border-radius: 2px;
          font-size: 14px;
          background-color: transparent;
          border: 1px solid rgba(41, 59, 71, 1);
          &:focus {
            background: rgba(22, 42, 54, 1);
            border: 1px solid rgba(81, 128, 159, 1);
            border-radius: 2px;
          }
        }
        .currencyInput {
          height: 22px;
          padding-left: 12px;
          color: #688a9d;
          font-size: 8px;
          background: #1b2c36;
          line-height: 22px;
        }
        .name-show {
          color: @fontColor;
          position: absolute;
          right: 10px;
          top: 17px;
          font-size: 12px;
          transform: translateY(-50%);
          font-weight: 400;
        }
        .gbbo_lock {
          position: absolute;
          right: 46px;
          top: 10px;
          width: 10px;
          height: 12px;
          background: url("../images/Lock.svg");
          background-size: 10px 12px;
        }
        .gbbo_lock_input_sell{
             border:1px solid #041D25;
            color: #2cb48c;
        }
        .gbbo_lock_arbitra{
            border:1px solid #041D25;
            color: #12869A;
        }
        .gbbo_lock_input{
           border:1px solid #041D25;
           color: #E83160;
        }
        .gbbo_unlock {
          position: absolute;
          right: 46px;
          top: 10px;
          width: 10px;
          height: 12px;
          background: url("../images/Unlock.svg");
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
        margin-top: 14px;
        height: 37px;
        margin-bottom: 14px;
        .path {
          position: absolute;
          top: 9px;
          width: 100%;
          height: 2px;
          background-color: #16453f;
        }
        .sell-path {
          background-color: #3b292f;
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
            background: #27a781;
          }
          .active-sellball {
            width: 12px;
            height: 12px;
            margin: 3px 0 0 3px;
            border-radius: 50%;
            background: #cf424e;
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
            color: @fontColor;
            font-weight: bold;
          }
        }
      }
      .totalMoney-label {
        display: flex;
        justify-content: space-between;
        padding-top: 3px;
        height: 20px;
        line-height: 20px;
        em,
        span {
          font-size: 14px;
          color: #788390;
          font-weight: 500;
          font-style: normal;
        }
        > div {
          span {
            color: #d4d4d4;
            font-size: 12px;
            font-weight: 500;
          }
        }
        .quoteAsset {
          font-size: 12px;
          font-weight: 500;
          color: #d4d4d4;
        }
      }
      .mybtn {
        width: 100%;
        height: 30px;
        border-radius: 3px;
        margin-top: 8px;
        span {
          color: #fff;
          font-weight: 500;
          font-size: 12px;
        }
      }
      .Arbitrage-btn {
        background-color: #788390;
        text-align: center;
        line-height: 29px;
        &:hover {
          background-color: #788390;
        }
      }
      .buy-btn {
        background-color: #00a077;
        &:hover {
          background-color: #00a077;
        }
      }
      .btn-back {
        background-color: #162a36;
        border: 0;
        a,
        em {
          font-size: 14px;
          color: #688a9d;
          font-style: normal;
          margin: 3px;
        }
        a {
          color: #c2d8e8;
          &:hover {
            color: #12869a;
          }
        }
      }
      .sell-btn {
        background-color: #cf424e;
        &:hover {
          background: #c43c3f;
        }
      }
    }
  }
}
</style>