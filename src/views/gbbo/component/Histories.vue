<template>
  <div class="gbbo-historiswrap">
    <div class="historis">
      <ul class="tabName">
        <li :class="{active:arbitrageIsShow}" @click="showTable('arbitrageIsShow')">Arbitrage History</li>
        <li :class="{active:marketsIsShow}" @click="showTable('marketsIsShow')">Markets History</li>
        <thead class="mask arbitrage" v-show="arbitrageIsShow">
          <th>Arbitrage</th>
          <th>Ask</th>
          <th>Bid</th>
          <th>Time</th>
        </thead>
        <thead class="mask markets" v-show="marketsIsShow">
          <th>Price</th>
          <th>Size</th>
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
            <tr v-for="(v,index) in maxArbitrageList" :key="index">
              <td>{{v.priceSubtract}}</td>
              <td>{{v.lowEx}}</td>
              <td>{{v.highEx}}</td>
              <td>{{v.dateTime | formatTime}}</td>
            </tr>
          </tbody>
        </table>
        <table class="markets" v-show="marketsIsShow">
          <thead>
            <th>Price</th>
            <th>Size</th>
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

import {
  getDecimalsNum
} from '@/lib/utils.js'

export default {
  data() {
    return {
      arbitrageIsShow: true,//初始化展示Tab
      marketsIsShow: false,
      tradeHistoryArr:[]//交易历史数据
    };
  },
  props:{
    currentSymbolObj: {
      type: Object,
      default: function(){
        return {
          symbol:"BTCUSD",
          priceTickSize:"0.00000001",
          quantityStepSize:"0.00000001",
        }
      },
      required: true
    },
    maxArbitrageList:{
      type:Array,
      default:function(){
        return []
      },
      required: true
    }    
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
      this.WSHistory = this.reconnectingWebSocket(`/quote/tradeHistory.ws?symbol=${this.currentSymbolObj.symbol}&least=21`)
      this.WSHistory.onopen = e => {
        console.log('history_websocket','打开')
      };
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
        this.resetTradeHistoryArr(result)
      };
      this.WSHistory.onerror = e => {
        console.log('history_websocket_err',e)
      };
      this.WSHistory.onclose = () => {
        this.WSHistory.close()
        console.log('history_websocket','关闭')
      };
    },
    //重置交易历史数组
    resetTradeHistoryArr(result){
      let arr = this.tradeHistoryArr;
      const priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize);
      const volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize);
      let obj = {};
      obj.price = bigDecimal.round(result.price, priceLong);
      obj.volumeData = bigDecimal.round(result.amount, volumeLong);
      obj.date = moment(result.tradeTime).format("HH:mm:ss");
      obj.showColor = result.direction === "buy" ? 1 : -1;
      //控制数组长度
      if (arr.length === 40) {
        arr.unshift(obj);
        arr.pop();
      } else {
        arr.unshift(obj);
      }
    },
    //连接websocket，采用ReconnectingWebSocket库，支持断线重连
    reconnectingWebSocket(url){
      const baseURL = window.location.protocol === "http:" ? "ws://" : "wss://";
      const host = window.location.host;
      return new ReconnectingWebSocket(
        `${baseURL}${host}${url}`
      );
    },
  },
  watch:{
    currentSymbolObj(){
      console.log('enter history')
      this.updateSymbolHistory()
    }
  },
  filters:{
    formatTime (value) {
      if (!value) return ''
      // 2019-11-14T11:52:46.063+0000
      return value.slice(11,19)
    }
  },
  beforeDestroy() {
    this.WSHistory && this.WSHistory.close()
  },
};
</script>

<style lang="less">
.gbbo-historiswrap {
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
        font-weight: 700;
        background-color: #041d25;
        border-right: 1px solid #000;
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
      height: 232px;
      padding: 0 3px 0 8px;
      overflow: auto;
      table {
        width: 100%;
        margin-bottom: 10px;
        thead {
          color: #788390;
          th {
            text-align: right;
            width: 25%;
            font-weight: 500;
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
      &::-webkit-scrollbar {
        width: 5px;
        // display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #093a49;
      }       
    }
  }
}
</style>