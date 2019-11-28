<template>
  <main id="usd_fees" class="usd-fees">
    <header class="bgc-151D24 header pt-2">
      <div class="container">
        <h1 class="f-46 f-w-5 c-fff pt-10">Fee Stucture</h1>
      </div>
    </header>
    <div class="container">
      <ul class="mt-lg-10 mb-lg-10 pt-lg-6 pb-lg-6 mt-5 mb-5 ul">
        <li class="li fee-header">
          <div class="li-header">PRICING TIER</div>
          <div class="li-header">TAKER FEE</div>
          <div class="li-header">MAKER FEE</div>
        </li>
        <li v-for="fee in feeList" class="li item">
          <div class="li-content">{{fee.pricing}}</div>
          <div class="li-content">{{fee.taker}}</div>
          <div class="li-content">{{fee.maker}}</div>
        </li>
      </ul>
    </div>

  </main>
</template>

<script>
  export default {
    name: "fee",
    data(){
      return{
        feeList:[
          {pricing:'Up to $10k',taker:'0.50%',maker:'0.50%'},
          {pricing:'$10k - $50k',taker:'0.35%',maker:'0.35%'},
          {pricing:'$50k - $100k',taker:'0.25%',maker:'0.15%'},
          {pricing:'$100k - $1m',taker:'0.20%',maker:'0.10%'},
          {pricing:'$1m - $10m',taker:'0.18%',maker:'0.08%'},
          {pricing:'$10m - $50m',taker:'0.15%',maker:'0.05%'},
          {pricing:'$50m - $100m',taker:'0.10%',maker:'0.00%'},
          {pricing:'$100m - $300m',taker:'0.07%',maker:'0.00%'},
          {pricing:'$300m - $500m',taker:'0.06%',maker:'0.00%'},
          {pricing:'$500m - $1b',taker:'0.05%',maker:'0.00%'},
          {pricing:'$1b+',taker:'0.04%',maker:'0.00%'},
        ],
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/common.less';

  .usd-fees {
    .header {
      height: 220px;
    }
    .ul{
      margin: 0 auto;
      .li{
        height: 58px;
      }
      .li-header,.li-content{
        .d-ib;
        width: 100/3%;
        height: inherit;
        line-height: 58px;
        .f-16;
        .f-w-5;
        .t-c;
        .c-304454;
      }
      .fee-header{
        border-bottom: solid 1px #E7EAF3;
      }
      .item{
        &:nth-child(odd){
          background-color: #F8FAFD;
        }
      }
    }

  }
</style>