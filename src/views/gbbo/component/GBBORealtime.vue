<template>
  <div class="realtime">
    <div class="realtime-item">
      <div class="realtime-item__header">
        <div class="arb">Spread</div>
        <div class="amount">Size</div>
        <div class="sell">Ask</div>
        <div class="buy">Bid</div>
      </div>
      <div class="realtime-item__content">
        <ul class="realtime-item__content-list arb-list">
          <li v-for="(v, index) in arbData.matchMap" :key="index">
            <span class="arb">{{v.arb}}</span>
            <span class="amount">{{v.amount | formatNumberLength}}</span>
            <span class="sell">{{v.sell}}</span>
            <span class="buy">{{v.buy}}</span>
          </li>
        </ul>
      </div>
      <div class="realtime-item__footer arb-footer">
        <div>
          <p>Total Arbitrage</p>
          <span
            class="last-arb"
          >{{arbData.totalArb | noData}}</span>
        </div>
        <div>
          <p>Total Size</p>
          <span>{{arbData.totalAmount | noData}}</span>
        </div>
      </div>
    </div>
    <div class="realtime-item mx-px">
      <div class="realtime-item__header">
        <div class="lowest">Global Best Ask</div>
        <div class="amount">Size</div>
        <div class="total">Total</div>
      </div>
      <div class="realtime-item__content">
        <ul class="realtime-item__content-list lowest-list" ref="buyOrderContainer">
          <li
            v-for="(v, index) in gbboAsksArr"
            :key="index"
            @click="getClickSellPrice(v.priceWithFee,v.qty)"
          >
            <span class="lowest">
              {{v.priceWithFee}}
              <em>{{v.provider}}</em>
            </span>
            <span class="amount">{{v.qty | formatNumberLength}}</span>
            <span class="total">{{v.total | formatNumberLength2}}</span>
          </li>
        </ul>
      </div>
      <div class="realtime-item__footer lowest-footer">
        <p>Last Best Ask</p>
        <span>{{bestSellPrice}}</span>
      </div>
    </div>
    <div class="realtime-item">
      <div class="realtime-item__header">
        <div class="highest">Global Best Bid</div>
        <div class="amount">Size</div>
        <div class="total">Total</div>
      </div>
      <div class="realtime-item__content">
        <ul class="realtime-item__content-list highest-list" ref="sellOrderContainer">
          <li
            v-for="(v, index) in gbboBidsArr"
            :key="index"
            @click="getClickBuyPrice(v.priceWithFee,v.qty)"
          >
            <span class="highest">
              {{v.priceWithFee}}
              <em>{{v.provider}}</em>
            </span>
            <span class="amount">{{v.qty | formatNumberLength}}</span>
            <span class="total">{{v.total | formatNumberLength2}}</span>
          </li>
        </ul>
      </div>
      <div class="realtime-item__footer highest-footer">
        <p>Last Best Bid</p>
        <span>{{bestBuyPrice}}</span>
        <div class="more">
          <a>More</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bigDecimal from "js-big-decimal"; //除法失效
export default {
  name: "GBBORealtime",
  data() {
    return {
      isScroll: false
    };
  },
  created() {},
  mounted() {},
  props: {
    gbboAsksArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    gbboBidsArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    arbData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    bestSellPrice: {
      type: Number,
      default: null
    },
    bestBuyPrice: {
      type: Number,
      default: null
    }
  },
  watch: {
    // isInitOrderBook(val) {
    //   if (val) {
    //     var div = this.$refs.buyOrderContainer;
    //     setTimeout(() => {
    //       div.scrollTop = div.scrollHeight;
    //     }, 0);
    //     val = false;
    //   }
    // }
  },
  computed: {
    // isInitOrderBook() {
    //   if (this.gbboAsksArr.length > 12) {
    //     this.isScroll = true;
    //   } else {
    //     this.isScroll = false;
    //   }
    //   return this.isScroll;
    // }
  },
  methods: {
    getClickSellPrice(price, count) {
      this.$emit("getClickSellPrice", price, count);
    },
    getClickBuyPrice(price, count) {
      this.$emit("getClickBuyPrice", price, count);
    }
  },
  filters: {
    noData: function (value) {
      if (!value) return '0'
      return value
    },
    formatNumberLength: function(value) {
      if (!value) return "";
      return bigDecimal.round(value, 6);
    },
    formatNumberLength2: function(value) {
      if (!value) return "";
      return bigDecimal.round(value, 2);
    },
    formatTime: function(value) {
      if (!value) return "";
      // 2019-11-14T11:52:46.063+0000
      return value.slice(11, 19);
    }
  },
  components: {}
};
</script>
<style lang="less">
.realtime {
  // width:822px;
  display: flex;
  &-item {
    flex: 1;
    width: 270px;
    height: 460px;
    // height: 297px;
    font-size: 12px;
    background: #031419;
    &__header {
      padding: 0 8px 0 8px;
      height: 20px;
      line-height: 20px;
      color: #788390;
      font-weight: 500;
      background: #041d25;
      display: flex;
      div{
        flex: 1;
      }
      .buy {
        padding-left: 15px;
        text-align: left;
      }
      .sell {
        padding-left: 25px;
        text-align: left;
      }
      .lowest,
      .highest {
        flex: 1.8;
      }
      .amount,
      .total {
        text-align: right;
      }
    }
    &__content {
      height: 400px;
      // height: 234px;
      overflow: hidden;
      &-list {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        li {
          padding: 0 3px 0 8px;
          display: flex;
          // cursor: pointer;
          span {
            flex: 1;
            height: 20px;
            line-height: 20px;
          }
          .lowest {
            color: #e83160;
          }
          .highest {
            color: #0ab68a;
          }
          .lowest,
          .highest {
            flex: 1.8;
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
            }
          }
          .arb {
            color: #12869a;
          }
          .amount,
          .total {
            color: #d4d4d4;
            text-align: right;
          }
          .buy,
          .sell {
            color: #788390;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
          }
          .buy {
            padding-left: 15px;
          }
          .sell {
            padding-left: 25px;
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
      .arb-list {
        li:hover {
          background: rgba(21, 148, 169, 0.1);
        }
      }
      .lowest-list {
        li:hover {
          background: rgba(232, 49, 96, 0.15);
        }
      }
      .highest-list {
        li:hover {
          background: rgba(44, 180, 140, 0.1);
        }
      }
    }
    &__footer {
      width: 100%;
      height: 40px;
      padding: 5px 8px;
      position: relative;
      p {
        height: 14px;
        line-height: 14px;
        color: #788390;
        font-weight: 500;
      }
      span {
        padding-right: 8px;
        height: 14px;
        line-height: 14px;
        color: #d4d4d4;
        font-weight: bold;
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
        display: none;
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
      div {
        margin-right: 20px;
        display: inline-block;
        span {
          color: #d4d4d4;
        }
        .last-arb {
          color: #12869a;
        }
      }
    }
    .lowest-footer {
      background: #460f1d;
      span {
        color: #e83160;
      }
    }
    .highest-footer {
      background: #083326;
      span {
        color: #2cb48c;
      }
    }
  }
  .mx-px {
    margin: 0 6px;
  }
}
</style>