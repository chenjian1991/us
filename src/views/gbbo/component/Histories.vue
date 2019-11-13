<template>
  <div id="historisWrap">
    <div class="historis">
      <ul class="tabName">
        <li :class="{active:arbitrageIsShow}" @click="showTable('arbitrageIsShow')">Arbitrage History</li>
        <li :class="{active:marketsIsShow}" @click="showTable('marketsIsShow')">Markets History</li>
        <thead class="mask arbitrage" v-show="arbitrageIsShow">
          <th>Arbitrage</th>
          <th>Lowest From</th>
          <th>Highest From</th>
          <th>Time</th>
        </thead>
        <thead class="mask markets" v-show="marketsIsShow">
          <th>Price</th>
          <th>Amount</th>
          <th>Time</th>
        </thead>
      </ul>
      <div class="tableWrap">
        <table class="arbitrage" v-show="arbitrageIsShow">
          <thead>
            <th>Arbitrage</th>
            <th>Lowest From</th>
            <th>Highest From</th>
            <th>Time</th>
          </thead>
          <tbody>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
            <tr>
              <td>28.87</td>
              <td>Binance</td>
              <td>Binance</td>
              <td>16:56:28</td>
            </tr>
          </tbody>
        </table>
        <table class="markets" v-show="marketsIsShow">
          <thead>
            <th>Price</th>
            <th>Amount</th>
            <th>Time</th>
          </thead>
          <tbody>
            <tr v-for="(v,index) in tradeHistoryArr" :key="index">
              <td :class="[v.showColor === -1?'redText':'greenText']">{{v.price}}</td>
              <td>{{v.volumeData}}</td>
              <td>{{v.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import bigDecimal from 'js-big-decimal' //除法失效
import moment from 'moment'

export default {
  data() {
    return {
      arbitrageIsShow: true,//初始化展示Tab
      marketsIsShow: false,
      tradeHistoryArr:[]//交易历史数据
    };
  },
  props:{
    currentSymbol:String
  },
  methods: {
    showTable(tab) {
      this.marketsIsShow = false;
      this.arbitrageIsShow = false;
      this[tab] = true;
    },
    //交易对的交易历史列表
    updateSymbolHistory() {
      if (this.WSHistory) {
        this.WSHistory.close();
        //清空交易历史
        this.tradeHistoryArr = [];
      }
      const baseURL = window.location.protocol === "http:" ? "ws://" : "wss://";
      const host = window.location.host;
      this.WSHistory = new ReconnectingWebSocket(
        `${baseURL}${host}/quote/tradeHistory.ws?symbol=BTCUSD&least=21`
      );
      this.WSHistory.onopen = function(e) {};
      this.WSHistory.onmessage = e => {
        //每次推送一条记录
        let result = JSON.parse(e.data);
        if (result.ping !== undefined) {
          var pongResponse = {};
          pongResponse.pong = result.ping;
          this.WSHistory.send(JSON.stringify(pongResponse));
          return;
        }
        //断网重连的问题
        if (result.code) {
          return;
        }
        let arr = this.tradeHistoryArr;
        /* let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize);
        let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize); */
        let obj = {};
        obj.price = bigDecimal.round(result.price, 2);
        obj.volumeData = bigDecimal.round(result.amount, 2);
        obj.date = moment(result.tradeTime).format("HH:mm:ss");
        obj.showColor = result.direction === "buy" ? 1 : -1;
        if (arr.length === 40) {
          arr.unshift(obj);
          arr.pop();
        } else {
          arr.unshift(obj);
        }
        this.tradeHistoryArr = arr;
      };
      this.WSHistory.onerror = e => {};
      this.WSHistory.onclose = e => {};
    }
  },
  mounted(){
    this.updateSymbolHistory()
  }
};
</script>

<style lang="less">
#historisWrap {
  width: 100%;
  .historis {
    width: 100%;
    background-color: #031419;
    font-size: 12px;
    .tabName {
      position: relative;
      display: flex;
      background-color: #041d25;
      li {
        padding: 10px;
        color: #788390;
        font-size: 12px;
        background-color: #041d25;
        cursor: pointer;
        &.active {
          background-color: #031419;
          color: #d4d4d4;
        }
      }
      .mask{
        position: absolute;
        top: 38px;
        left: 0; 
        width: 100%;
        background-color: #031419;
        z-index: 3;
        th {
          width: 1%;//支持到屏幕100%
          &:nth-child(2) {
            text-align: center;
          }
          &:last-child{
            text-align: right;
          }
        }
        &.arbitrage{
          th {
            width: 10%;//支持到屏幕60%
            text-align: right;
            &:first-child {
              text-align: left;
            }
          }
        }
      }
    }
    .tableWrap{
      position: relative;
      height: 221px;
      overflow: auto;
      table {
        width: 100%;
        margin-bottom: 50px;
        thead {
          color: #788390;
          th {
            text-align: right;
            width: 25%;
            &:first-child {
              text-align: left;
            }
          }
        }
        tbody{
          tr {
            color: #d4d4d4;
            td {
              max-width: 0px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: right;
              padding-left: 50px;
              width: 25%;
              &:first-child {
                color: #12869a;
                text-align: left;
                padding-left: 0px;
              }
              &:last-child {
                color: #788390;
              }
            }
          }
        }
        &.markets {
          thead {
            th {
              width: 33%;
              &:nth-child(2) {
                text-align: center;
              }
            }
          }
          tbody{
            tr {
              td {
                width: 33%;
                padding: 0;
                &:nth-child(2) {
                  text-align: center;
                }
                &.redText{
                  color: #B12548;
                }
                &.greenText{
                  color: #008A61;
                }
              }
            }
          }
        }
      }
      &::-webkit-scrollbar{
        display: none;
      }        
    }
  }
}
</style>