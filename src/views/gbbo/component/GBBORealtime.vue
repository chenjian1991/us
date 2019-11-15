<template>
  <div class="gbbomain-realtime-box">
    <div class="realtime-box">
      <div class="realtime-item">
        <div class="realtime-item-header">
          <div class="arb">Max Arbitrage</div>
          <div class="text-right amount">Amount</div>
          <div class="text-right time">Time</div>
        </div>
        <div class="realtime-item-content">
          <ul v-if="maxArbitrageList.length > 0" class="realtime-item-list arb-list">
            <li v-for="v in maxArbitrageList">
              <span class="arb">{{v.priceSubtract}}</span>
              <span class="amount text-right">{{v.qtySubtract}}</span>
              <span class="time text-right">{{v.dateTime | formatTime}}</span>
            </li>
          </ul>
        </div>
        <div class="realtime-item-footer arb-footer">
          <p>Last Arbitrage</p>
          <span v-if="maxArbitrageList.length > 0" class="last-arb">{{maxArbitrageList[0].priceSubtract}}</span>
        </div>
      </div>
      <div class="realtime-item mx-px">
        <div class="realtime-item-header">
          <div class="lowest">Global Lowest Price</div>
          <div class="text-right amount">Amount</div>
          <div class="text-right time">Total</div>
        </div>
        <div class="realtime-item-content">
          <ul class="realtime-item-list lowest-list" ref="buyOrderContainer">
            <li v-for="v in gbboAsksArr" @click="getClickSellPrice(v.priceWithFee,v.qty)">
              <span class="lowest">
                {{v.priceWithFee}}
                <em>{{v.provider}}</em>
              </span>
              <span class="amount text-right">{{v.qty | formatNumberLength}}</span>
              <span class="total text-right">{{v.total | formatNumberLength2}}</span>
            </li>
          </ul>
        </div>
        <div class="realtime-item-footer lowest-footer">
          <p>Last Lowest Price</p>
          <span class="last-lowest">{{bestSellPrice}}</span>
        </div>
      </div>
      <div class="realtime-item">
        <div class="realtime-item-header">
          <div class="highest">Global Highest Price</div>
          <div class="text-right amount">Amount</div>
          <div class="text-right time">Total</div>
        </div>
        <div class="realtime-item-content">
          <ul class="realtime-item-list highest-list" ref="sellOrderContainer">
            <li v-for="v in gbboBidsArr" @click="getClickBuyPrice(v.priceWithFee,v.qty)">
              <span class="highest">
                {{v.priceWithFee}}
                <em>{{v.provider}}</em>
              </span>
              <span class="amount text-right">{{v.qty | formatNumberLength}}</span>
              <span class="total text-right">{{v.total | formatNumberLength2}}</span>
            </li>
          </ul>
        </div>
        <div class="realtime-item-footer highest-footer">
          <p>Last Highest Price</p>
          <span class="last-highest">{{bestBuyPrice}}</span>
          <div class="more">
            <a>More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bigDecimal from 'js-big-decimal' //除法失效
export default {
  name: "GBBORealtime",
  data() {
    return {
      isScroll:false,
    };
  },
  created() {},
  mounted() {
    
  },
  props: {
    gbboAsksArr:{
      type: Array,
      default: function() {
        return []
      }
    },
    gbboBidsArr:{
      type: Array,
      default: function() {
        return []
      }
    },
    maxArbitrageList:{
      type: Array,
      default: function() {
        return []
      }
    },
    bestSellPrice:{
      type:Number,
      default:null
    },
    bestBuyPrice:{
      type:Number,
      default:null
    },
  },
  watch: {
    isInitOrderBook(val) {
      if(val) {
        var div = this.$refs.buyOrderContainer;
        setTimeout(() => {
          div.scrollTop = div.scrollHeight;
        }, 0)
        val = false
      }
    },
  },
  computed: {
    isInitOrderBook() {
      if(this.gbboAsksArr.length > 12) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
      return this.isScroll
    }
  },
  methods: {
    getClickSellPrice(price, count){
      this.$emit("getClickSellPrice", price, count)
    },
    getClickBuyPrice(price, count){
      this.$emit("getClickBuyPrice", price, count)
    },
  },
  filters: {
    formatNumberLength: function (value) {
      if (!value) return ''
      return bigDecimal.round(value, 6)
    },
    formatNumberLength2: function (value) {
      if (!value) return ''
      return bigDecimal.round(value, 2)
    },
    formatTime: function (value) {
      if (!value) return ''
      // 2019-11-14T11:52:46.063+0000
      return value.slice(11,19)
    }
  },
  components: {}
};
</script>
<style lang="less">
.gbbomain-realtime-box {
  .realtime-box {
    // width:822px;
    display: flex;
    .realtime-item {
      flex: 1;
      width: 270px;
      height: 294px;
      font-size: 12px;
      background: #031419;
      position: relative;
      .realtime-item-header {
        padding: 0 6px 0 8px;
        height: 20px;
        line-height: 20px;
        color: #788390;
        background: #041d25;
        display: flex;
        div {
          flex: 1;
        }
        .lowest {
          flex: 1.8;
        }
        .highest {
          flex: 1.8;
        }
      }
      .realtime-item-content {
        height: 274px;
        overflow: hidden;
        .realtime-item-list {
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
          padding-bottom: 40px;
          li {
            padding: 0 6px 0 8px;
            display: flex;
            cursor: pointer;
            span {
              height: 20px;
              line-height: 20px;
              flex: 1;

              em {
                display: block;
                width: 50%;
                float: right;
                color: #788390;
                font-style: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                position: relative;
                &:after {
                  content: "";
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translate(0, -50%);
                  height: 20px;
                  width: 0px;
                }
              }
            }
            .lowest {
              flex: 1.8;
              color: #e83160;
            }
            .highest {
              flex: 1.8;
              color: #0ab68a;
            }
            .arb {
              color: #12869a;
            }
            .amount,
            .total {
              color: #d4d4d4;
            }
            .time {
              color: #5d7c86;
            }
            &:hover{
              cursor: pointer;
            }
          }

          &::-webkit-scrollbar {
            width: 5px;
            // display: none;
          }
          &::-webkit-scrollbar-thumb{
            background: #093A49;
          }

        }
        .arb-list {
          li:hover{
            background: rgba(21, 148, 169,0.1);
          }
        }
        .lowest-list {
          li:hover{
            background:rgba(232,49,96,0.15);
          }
        }
        .highest-list {
          li:hover{
            background: rgba(44, 180, 140,0.1);
          }
        }
      }
      .realtime-item-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        padding: 5px 8px;
        p {
          height: 14px;
          line-height: 14px;
          color: #788390;
        }
        span {
          padding-right: 8px;
          height: 14px;
          line-height: 14px;
          color: #d4d4d4;
        }
        .last-arb {
          color: #12869a;
        }
        .last-lowest {
          color: #e83160;
        }
        .last-highest {
          color: #2cb48c;
        }
        .more {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          right: 0;
          background: #041d25;
          text-align: center;
          padding: 11px 0 12px;
          a {
            display: inline-block;
            height: 14px;
            line-height: 14px;
            color: #d4d4d4;
            text-decoration: underline !important;
          }
        }
      }
      .arb-footer {
        background: #003139;
      }
      .lowest-footer {
        background: #460f1d;
      }
      .highest-footer {
        background: #083326;
      }
    }
    .mx-px {
      margin: 0 6px;
    }
  }
}
</style>