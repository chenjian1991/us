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
          <ul class="realtime-item-list arb-list">
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
            <li>
              <span class="arb">21.31</span>
              <span class="amount text-right">0.071348</span>
              <span class="time text-right">16:56:28</span>
            </li>
          </ul>
        </div>
        <div class="realtime-item-footer arb-footer">
          <p>Last Arbitrage</p>
          <span class="last-arb">21.31</span>
        </div>
      </div>
      <div class="realtime-item" style="margin: 0 6px;">
        <div class="realtime-item-header">
          <div class="lowest">Global Lowest Price</div>
          <div class="text-right amount">Amount</div>
          <div class="text-right time">Total</div>
        </div>
        <div class="realtime-item-content">
          <ul class="realtime-item-list lowest-list" ref="buyOrderContainer">
            <li v-for="v in gbbo_asksArr" @click="getClickSellPrice(v.priceWithFee,v.qty)">
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
            <li v-for="v in gbbo_bidsArr" @click="getClickBuyPrice(v.priceWithFee,v.qty)">
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
  name: "gbbo",
  data() {
    return {};
  },
  created() {},
  mounted() {
    
  },
  props: {
    gbbo_asksArr:{
      type:Array,
      default: function() {
        return []
      }
    },
    gbbo_bidsArr:{
      type:Array,
      default: function() {
        return []
      }
    },
    bestSellPrice:{
      type:Number,
      default:null,
    },
    bestBuyPrice:{
      type:Number,
      default:null,
    },
  },
  computed: {},
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
    }
  },
  components: {}
};
</script>
<style lang="less">
.gbbomain-realtime-box {
  .realtime-box {
    width:822px;
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
                width: 60px;
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
            display: none;
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
  }
}
</style>