<template>
   <div class="ticker" id="ticker">
      <div class="ticker-left">
         <Dropdown placement="bottom-start" class="dropdown" @on-click="changeSymbol">
            <a href="javascript:void(0)" class="f-14 f-w-5 c-D4D4D4">
               {{currentInfo.baseAsset|noData}}/{{currentInfo.quoteAsset|noData}}
               <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" v-show="false">
               <DropdownItem></DropdownItem>
            </DropdownMenu>
         </Dropdown>
         <div class="d-ib">
            <dl class="arb">
               <dt>Max Arbitrage</dt>
               <dd>{{arbData.maxArb|noData}}</dd>
            </dl>
            <dl class="arb">
               <dt>Max Spread(-)</dt>
               <dd>{{arbData.spread|noData}}</dd>
            </dl>
            <dl class="marketAvg">
               <dt>Last Price</dt>
               <dd>{{currentInfo.last|noData}}</dd>
            </dl>
            <dl>
               <dt>24h Change</dt>
               <dd :class="currentInfo.showColor>0?'c-green':'c-red'">{{currentInfo.percent|noData}}</dd>
            </dl>
            <dl>
               <dt>24h High</dt>
               <dd>{{currentInfo.high|noData}}</dd>
            </dl>
            <dl>
               <dt>24h Low</dt>
               <dd>{{currentInfo.low|noData}}</dd>
            </dl>
            <dl>
               <dt>24h Volume</dt>
               <!-- <dd>{{currentInfo.hour24Volume|noData}} {{currentInfo.quoteAsset|noData}}</dd> -->
               <dd>{{currentInfo.hour24Volume|noData}} {{currentInfo.baseAsset|noData}}</dd>
            </dl>
         </div>
      </div>
      <div class="ticker-right">
         <div class="fiat">USD
            <Icon type="md-arrow-dropdown"/>
         </div>
         <div class="theme">
            <div class="theme-box theme-box-active">
               <Icon type="md-sunny" class="sunny icon-active"/>
            </div>
            <div class="theme-box moon-box">
               <Icon type="md-moon" class="moon"/>
            </div>
         </div>
      </div>
   </div>

</template>

<script>
import {
  getParseFloat
} from "@/lib/utils.js";

export default {
  name: "Ticker",
  props: {
    currentInfo: Object,
    arbData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    noData(value) {
      if (!value) return '--'
      return value
    },
    separate(value) {
      if (typeof value === "number") return getParseFloat(value)
      return value
    }
  },
  methods:{
    changeSymbol(name){
      console.log(name)
    }
  },
  mounted() {
   //  console.log(this.currentInfo)
  },
  watch: {
    currentInfo: {
      handler(newval) {
        this.currentInfo = newval
      },
      immediate: true
    },
    'currentInfo.last':{
      handler(newval) {
        this.currentInfo.last = newval
      }
    },
    'currentInfo.percent':{
      handler(newval) {
        this.currentInfo.percent = newval
      }
    },
    'currentInfo.high':{
      handler(newval) {
        this.currentInfo.high = newval
      }
    },
    'currentInfo.low':{
      handler(newval) {
        this.currentInfo.low = newval
      }
    },
    'currentInfo.hour24Volume':{
      handler(newval) {
        this.currentInfo.hour24Volume = newval
      }
    }
  }
}
</script>
<style lang="less" scoped>
   @import '../../../assets/css/common.less';

   .c-red {
      color: #E83160 !important;
   }

   .c-green {
      color: #2CB48C !important;
   }

   .c-788390 {
      color: #788390;
   }

   .c-D4D4D4 {
      color: #D4D4D4;
   }

   .ticker {
      .d-f;
      justify-content: space-between;
      // width: 822px;
      // min-width: 822px;
      height: 40px;
      padding: 2px 6px;
      .bgc-031419;
      dl {
         display: inline-block;
         margin-right: 33px;
         dt {
            font-weight: 500;
            .c-788390;
            .f-12;
         }
         dd {
            .c-D4D4D4;
            .f-12;
            .f-w-5;
         }
      }
      .marketAvg{
         dd {
            color:#2CB48C;
         }
      }
      .arb{
         dd {
            color:#12869A;
         }
      }
      .ticker-left {
         .d-f;
         align-items: center;
         .dropdown {
            margin-right: 45px;
         }
      }
      .ticker-right {
         .d-f;
         display: none;
         align-items: center;
         .fiat {
            padding: 2px 10px 2px 14px;
            border-radius: 12px;
            border: 1px solid #093A49;
            background-color: #041D25;
            margin-right: 12px;
            .c-788390;
            .f-w-5;
         }
         .theme {
            border: 1px solid #093A49;
            border-radius: 3px;
            .theme-box {
               .d-ib;
               .t-c;
               width: 26px;
               height: 24px;
               line-height: 22px;
            }
         }
         .sunny {
            font-size: 18px !important;
         }
         .sunny, .moon {
            color: #093A49;
         }
         .theme-box-active {
            background-color: #093A49;
            border-radius: 2px;
         }
         .icon-active {
            color: #788390;
         }
      }
   }

</style>