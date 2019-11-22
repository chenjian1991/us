<template>
  <div class="gbbo-historiswrap">
    <div class="historis">
      <ul class="tabName">
        <!-- <li :class="{active:arbitrageIsShow}" @click="showTable('arbitrageIsShow')">Arbitrage History</li> -->
        <li :class="{active:marketsIsShow}" @click="showTable('marketsIsShow')">Markets History</li>
        <!-- <thead class="mask arbitrage" v-show="arbitrageIsShow">
          <th>Arbitrage</th>
          <th>Ask</th>
          <th>Bid</th>
          <th>Time</th>
        </thead> -->
        <thead class="mask markets" v-show="marketsIsShow">
          <th>Price</th>
          <th>Size</th>
          <th>Time</th>
        </thead>
      </ul>
      <div class="tableWrap">
        <table class="arbitrage" v-show="arbitrageIsShow">
          <!-- <thead>
            <th>Arbitrage</th>
            <th>Ask</th>
            <th>Bid</th>
            <th>Time</th>
          </thead>
          <tbody>
            <tr v-for="(v,index) in maxArbitrageList" :key="index">
              <td>{{v.priceSubtract}}</td>
              <td>{{v.lowEx}}</td>
              <td>{{v.highEx}}</td>
              <td>{{v.dateTimeStamp | formatTime}}</td>
            </tr>
          </tbody> -->
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

import moment from 'moment'

export default {
  data() {
    return {
      arbitrageIsShow: false, //初始化展示Tab
      marketsIsShow: true
    };
  },
  props:{
    tradeHistoryArr: {
      type: Array,
      default(){
        return []
      }
    }
    // maxArbitrageList:{
    //   type:Array,
    //   default:function(){
    //     return []
    //   },
    //   required: true
    // }
  },
  methods: {
    showTable(tab) {
      this.marketsIsShow = false;
      this.arbitrageIsShow = false;
      this[tab] = true;
    }
  },
  watch:{},
  filters:{
    formatTime (value) {
      if (!value) return ''
      // 2019-11-14T11:52:46.063+0000
      // return value.slice(11,19)
      return moment(value * 1000).format("HH:mm:ss")
    }
  },
  beforeDestroy() {}
};
</script>

<style lang="less">
.gbbo-historiswrap {
  width:100%;
  .historis {
    width: 100%;
    background-color: #031419;
    font-size: 12px;
    .tabName {
      position: relative;
      display: flex;
      background-color: #041d25;
      li {
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
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
        top: 30px;
        left: 0; 
        width: 100%;
        height: 20px;
        line-height: 20px;
        background-color: #031419;
        z-index: 3;
        display: flex;
        th {
          flex:1;
          height: 20px;
          line-height: 20px;
          color:#788390;
          font-weight: 500;
          &:first-child {
            padding-left:8px;
          }
          &:nth-child(2) {
            text-align: center;
          }
          &:last-child{
            padding-right:8px;
            text-align: right;
          }
        }
        &.arbitrage{
          th {
            padding-right: 30px;
            text-align: left;
            &:last-child {
              padding-right: 8px;
              text-align: right;
            }
          }
        }
      }
    }
    .tableWrap{
      position: relative;
      height: 240px;
      padding: 0 3px 0 8px;
      overflow: auto;
      table {
        width: 100%;
        margin-bottom: 10px;
        thead {
          display: flex;
          color: #788390;
          th {
            flex:1;
            height: 20px;
            line-height: 20px;
            font-weight: 500;
            text-align: left;
            &:last-child {
              text-align: right;
            }
          }
        }
        tbody{
          tr {
            display: flex;
            color: #d4d4d4;
            td {
              flex:1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: left;
              padding-right: 30px;
              height: 20px;
              line-height: 20px;
              &:first-child {
                color: #12869a;
              }
              &:last-child {
                color: #788390;
                text-align: right;
                padding-right: 0px;
              }
            }
          }
        }
        &.markets {
          thead {
            th {
              &:nth-child(2) {
                text-align: center;
              }
            }
          }
          tbody{
            tr {
              td {
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