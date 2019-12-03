<template>
  <main id="api" class="api">
    <header class="header">
      <div class="container header-content t-c">
        <h1 class="f-40 c-fff f-w-5">Spectacular Speed with GBBO API*</h1>
        <p class="mt-4 desc">
          In addition to all the advantages of GBBO™’s API gives the professional trader the single most
          important advantage in competitive trading: SPEED
        </p>
        <!--<div class="row d-flex justify-content-center">-->
          <!--<div class="col-md-6">-->
            <!--<router-link to='' class="btn btn-sm transition-3d-hover no-bg-btn">-->
              <!--Get Started-->
            <!--</router-link>-->
          <!--</div>-->
          <!--<div class="col-md-6">-->
            <!--<router-link to='' class="btn btn-sm transition-3d-hover bg-btn">-->
              <!--API Documentation-->
            <!--</router-link>-->
          <!--</div>-->
        <!--</div>-->
        <a :href="loginToken?'https://api.tresso.com/':'/login'" class="btn btn-sm transition-3d-hover no-bg-btn mr-sm-5">Get Started</a>
        <a href="https://api.tresso.com/" class="btn btn-sm transition-3d-hover bg-btn">API Documentation</a>
      </div>
    </header>
    <div class="row row-box">
      <div class="container">
        <div class="col-md-8 section">
          <h3 class="title">TPS up to 500</h3>
          <article class="article">
            Tresso's next generation FIX API propels TPS up to 500, 10 x the industry standard. Combined with Tresso's
            institution-grade matching engine capable of handling 30,000 orders per symbol, order execution is smoother
            than ever.
          </article>
        </div>
      </div>
      <div class="col-md-4 tps-bg"></div>
    </div>
    <div class="row row-box">
      <div class="col-md-4 feed-bg"></div>
      <div class="container feed">
        <div class="col-md-8 section">
          <h3 class="title">10-100ms Market Data Feed</h3>
          <article class="article">
            For traders with the right technology, Tresso is able to provide superior market data feed speed within the
            range of 10-100ms, allowing traders to query a unified order book from all of Tresso's connected exchanges.
          </article>
        </div>
      </div>
    </div>
    <div class="row row-box">
      <div class="container">
        <div class="col-md-8 section">
          <h3 class="title">In-house Colocation to Minimize Latency</h3>
          <article class="article">
            Parse responses and send instructions at high speed by hosting your algorithm on the Tresso servers. Reduce
            latency on all communications between your algorithms and the market. Coming soon in early 2020.
          </article>
        </div>
      </div>
      <div class="col-md-4 latency-bg"></div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "API",
    data(){
      return{
        loginToken: $cookies.get('loginToken'),
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/css/common.less';

  @media (min-width: 768px) {
    .tps-bg, .latency-bg {
      position: absolute;
      top: 0;
      right: 0;
    }

    .feed-bg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .api {
    .header {
      position: relative;
      height: 700px;
      background: url("../../assets/images/api/banner.png") no-repeat;
      background-position: center;
      background-size: cover;
      .header-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .desc {
          margin: 0 auto 66px;
          width: 80%;
          .f-20;
          .c-fff;
          line-height: 28px;
        }
        .no-bg-btn, .bg-btn {
          width: 180px;
          height: 46px;
          .f-16;
          .c-fff;
          .f-w-5;
          border-radius: 0;
          margin-bottom: 10px;
        }
        .no-bg-btn {
          border: solid 1px #01B2D6;
        }
        .bg-btn {
          background-color: #01B2D6;
        }
      }
    }
    .row-box {
      position: relative;
      margin: 0;
      padding: 0;
      .bgc-000000;

      .tps-bg {
        background: url("../../assets/images/api/TPS.png") center no-repeat;
      }
      .feed-bg {
        background: url("../../assets/images/api/feed.png") center no-repeat;
      }
      .latency-bg {
        background: url("../../assets/images/api/latency.png") center no-repeat;
      }
      .tps-bg, .feed-bg, .latency-bg {
        height: 400px;
        background-size: cover;
      }
      .container {
        padding: 0;
        height: 400px;
        .d-f;
        align-items: center;
      }
      .feed{
        flex-direction: row-reverse;
        .t-r;
        .article{
          .d-ib;
          //.t-r;
        }
      }
      .section {
        .title {
          .f-30;
          .f-w-5;
          .c-fff;
        }
        .article {
          max-width: 600px;
          .f-16;
          .f-w-5;
          .c-fff;
          margin-top: 34px;
        }
      }

    }

  }
</style>