<template>
  <div class="ushomecontainer">
    <!-- Hero Section -->
    <div class="bg-img-hero" style="background-image: url(../../../assets/banner.jpg)">
      <div class="container space-2">
        <div class="row justify-content-lg-between align-items-center">
          <div class="col-lg-6 mb-7 mb-lg-0">
            <div class="mb-4">
              <h1 class="font-weight-semi-bold col-lg-11" style="color:#fff;font-size:30px;padding: 0;">Buy and Sell Crypto at Our Most Competitive Pricing</h1>
              <h1 class="font-weight-semi-bold" style="color:#fff;font-size:30px"></h1>
            </div>
              <!-- Subscribe Form -->
              <form class="js-validate js-form-message">
                <label class="sr-only" for="subscribeSrEmail">{{$t("fronthomeHerosign")}}</label>
                <div class="input-group input-group-lg input-group-borderless">
                  <input v-model="emailName" type="email" class="form-control" name="email" id="subscribeSrEmail" :placeholder="$t('fronthomeHerosign')" aria-label="Enter your email address" aria-describedby="subscribeButton" required
                        data-msg="Please enter a valid email address.">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-success btn-wide myHover" style="background-color:#12869A;border:none" id="subscribeButton" @click="join55">
                      {{$t("fronthomeHerosignin")}}
                    </button>
                  </div>
                </div>
              </form>
              <!-- End Subscribe Form -->        
          </div>

          <div class="col-md-5 align-self-md-end d-none d-md-inline-block" style="height:280px">
            <div class=" position-absolute" style="top:0;right:0" id="gbbo_container">
                                          <div class="title">
                                            <span class="front">BTC</span>
                                            <span class="back">/USD</span>
                                          </div>
                                          <div class="subTitle">
                                            <div class="tab">{{$t('gbbo_Ask')}}</div>
                                            <div class="tab">{{$t('gbbo_Qty')}}</div>
                                            <div class="tab">{{$t('gbbo_Bid')}}</div>
                                            <div class="tab">{{$t('gbbo_Qty')}}</div>
                                          </div>
                                          <div class="main">
                                            <div class="row">
                                              <div class="cell">
                                                <img src="../../../assets/images/index/55_small@2x.png" alt="">
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.E55?(BTCUSDT.E55[0]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.E55?BTCUSDT.E55[1].toFixed(4):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.E55?(BTCUSDT.E55[2]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.E55?BTCUSDT.E55[3].toFixed(4):'-'}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="cell">
                                                <img src="../../../assets/images/index/binance_small.png" alt="">
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[0]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.BINANCE?BTCUSDT.BINANCE[1].toFixed(4):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[2]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.BINANCE?BTCUSDT.BINANCE[3].toFixed(4):'-'}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="cell">
                                                <img src="../../../assets/images/index/huobi_small.png" alt="">
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[0]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.HUOBI?BTCUSDT.HUOBI[1].toFixed(4):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[2]*USDTUSDD).toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSDT.HUOBI?BTCUSDT.HUOBI[3].toFixed(4):'-'}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="cell">
                                                <img src="../../../assets/images/index/bittrex_small.png" alt="">
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.BITTREX?BTCUSD.BITTREX[0].toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.BITTREX?BTCUSD.BITTREX[1].toFixed(4):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.BITTREX?BTCUSD.BITTREX[2].toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.BITTREX?BTCUSD.BITTREX[3].toFixed(4):'-'}}</span>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="cell">
                                                <img src="../../../assets/images/index/coinbase_small.png" alt="">
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.COINBASEPRO?BTCUSD.COINBASEPRO[0].toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.COINBASEPRO?BTCUSD.COINBASEPRO[1].toFixed(4):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.COINBASEPRO?BTCUSD.COINBASEPRO[2].toFixed(2):'-'}}</span>
                                              </div>
                                              <div class="cell">
                                                <span>{{BTCUSD.COINBASEPRO?BTCUSD.COINBASEPRO[3].toFixed(4):'-'}}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->
    <div class="container card-deck d-block d-lg-flex card-lg-gutters-3 space-top-1 space-top-sm-2 mx-auto" style="padding:0">
      <div class="card card-frame mb-3" v-for="(v,i) in mainHomePriceObject" style="height:140px;border:none">
        <div id="recommend">
          <router-link :to="{path:'/exchange',query: {symbol:v.symbol}}">
            <div v-if="v.showColor == 1" class="greenBackground"></div>
            <div v-else class="redBackground"></div>
            <div class="percent_line">
              <div>
                <img :src="v.imageUrl" width="28px" alt class="logo">
                <span class="baseAsset">{{v.exCurrency}}</span>
                <span class="quoteAsset">/{{v.baseCurrency}}</span>
              </div>
              <div :class="[v.showColor == '1' ? 'percentGreen' : 'percentRed']">
                <span v-if="v.showColor == 1">+</span>
                {{v.percent}}
              </div>
            </div>
            <div :class="[v.showColor == '1' ? 'textColorGreen' : 'textColorRed']">
              <span class="price">{{v.last}}</span>
            </div>
            <!-- <div class="legal_coin">{{currencyName}}&nbsp{{v.symbolCurrency}}</div> -->
          </router-link>
        </div>
      </div>
    </div>
    <br>
        <!-- ========== gbbo ========== -->
        <main id="content" role="main">
            <!-- GBBO start -->
            <div class="container  u-space-3-top">
                <!-- <div class="row justify-content-center text-primary-55 h2 text-center" style="color:#12869A;font-weight: 500">
                    {{$t("fronthomeGBBOtitle")}}
                </div> -->
                <div id="gbbo_detail" class="space-top-1">
                  <div class="logo">
                    <div class="logo_item">
                      <img src="../../../assets/images/index/55_big_1@2x.png" style="width:auto;height:56%" alt="">
                    </div>
                    <div class="logo_item">
                      <img src="../../../assets/images/index/binance_big.png" style="width:112px;height:22px" alt="">
                    </div>
                    <div class="logo_item">
                      <img src="../../../assets/images/index/huobi_big.png" style="width:78px;height:23px" alt="">
                    </div>
                    <div class="logo_item">
                      <img src="../../../assets/images/index/bittrex_big.png" style="width:89px;height:22px" alt="">
                    </div>
                    <div class="logo_item">
                      <img src="../../../assets/images/index/cinbase_big.png" style="width:100px;height:21px" alt="">
                    </div>
                  </div>
                  <div class="gbbo_right">
                    <div class="pair_wrap">
                      <div class="pair">
                        <div class="title row">
                          <div class="pairName">
                            <span class="front">BTC</span>
                            <span class="back">/USD</span>
                          </div>
                          <div class="tradeBtn" @click="$router.push('/exchange?symbol=BTCUSD')">Trade</div>
                        </div>
                        <div class="row">
                          <span>Best Ask</span>
                          <span>Best Bid</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:BTCUSDTWaveArray[0] === 1,down:BTCUSDTWaveArray[0] === -1}">{{BTCUSDT.E55?(BTCUSDT.E55[0]*USDTUSDD).toFixed(2):"-"}}</span>
                          <span class="row_right" :class="{up:BTCUSDTWaveArray[2] === 1,down:BTCUSDTWaveArray[2] === -1}">{{BTCUSDT.E55?(BTCUSDT.E55[2]*USDTUSDD).toFixed(2):"-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:BTCUSDTWaveArray[6] === 1,down:BTCUSDTWaveArray[6] === -1}">{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[0]*USDTUSDD).toFixed(2): "-"}}</span>
                          <span class="row_right" :class="{up:BTCUSDTWaveArray[4] === 1,down:BTCUSDTWaveArray[4] === -1}">{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[2]*USDTUSDD).toFixed(2): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:BTCUSDTWaveArray[8] === 1,down:BTCUSDTWaveArray[8] === -1}">{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[0]*USDTUSDD).toFixed(2): "-"}}</span>
                          <span class="row_right" :class="{up:BTCUSDTWaveArray[10] === 1,down:BTCUSDTWaveArray[10] === -1}">{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[2]*USDTUSDD).toFixed(2): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:BTCUSDWaveArray[0] === 1,down:BTCUSDWaveArray[0] === -1}">{{BTCUSD.BITTREX?(BTCUSD.BITTREX[0]).toFixed(2): "-"}}</span>
                          <span class="row_right" :class="{up:BTCUSDWaveArray[2] === 1,down:BTCUSDWaveArray[2] === -1}">{{BTCUSD.BITTREX?(BTCUSD.BITTREX[2]).toFixed(2): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:BTCUSDWaveArray[4] === 1,down:BTCUSDWaveArray[4] === -1}">{{BTCUSD.COINBASEPRO?(BTCUSD.COINBASEPRO[0]).toFixed(2): "-"}}</span>
                          <span class="row_right" :class="{up:BTCUSDWaveArray[6] === 1,down:BTCUSDWaveArray[6] === -1}">{{BTCUSD.COINBASEPRO?(BTCUSD.COINBASEPRO[2]).toFixed(2): "-"}}</span>
                        </div>
                      </div>
                      <div class="pair">
                        <div class="title row">
                          <div class="pairName">
                            <span class="front">ETH</span>
                            <span class="back">/BTC</span>
                          </div>
                          <div class="tradeBtn" @click="$router.push('/exchange?symbol=ETHBTC')">Trade</div>
                        </div>
                        <div class="row">
                          <span>Best Ask</span>
                          <span>Best Bid</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ETHBTCWaveArray[0] === 1,down:ETHBTCWaveArray[0] === -1}">{{ETHBTC.E55?ETHBTC.E55[0].toFixed(6):"-"}}</span>
                          <span class="row_right" :class="{up:ETHBTCWaveArray[2] === 1,down:ETHBTCWaveArray[2] === -1}">{{ETHBTC.E55?ETHBTC.E55[2].toFixed(6):"-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ETHBTCWaveArray[4] === 1,down:ETHBTCWaveArray[4] === -1}">{{ETHBTC.BINANCE?ETHBTC.BINANCE[0].toFixed(6): "-"}}</span>
                          <span class="row_right" :class="{up:ETHBTCWaveArray[6] === 1,down:ETHBTCWaveArray[6] === -1}">{{ETHBTC.BINANCE?ETHBTC.BINANCE[2].toFixed(6): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ETHBTCWaveArray[8] === 1,down:ETHBTCWaveArray[8] === -1}">{{ETHBTC.HUOBI?ETHBTC.HUOBI[0].toFixed(6): "-"}}</span>
                          <span class="row_right" :class="{up:ETHBTCWaveArray[10] === 1,down:ETHBTCWaveArray[10] === -1}">{{ETHBTC.HUOBI?ETHBTC.HUOBI[2].toFixed(6): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ETHBTCWaveArray[12] === 1,down:ETHBTCWaveArray[12] === -1}">{{ETHBTC.BITTREX?ETHBTC.BITTREX[0].toFixed(6): "-"}}</span>
                          <span class="row_right" :class="{up:ETHBTCWaveArray[14] === 1,down:ETHBTCWaveArray[14] === -1}">{{ETHBTC.BITTREX?ETHBTC.BITTREX[2].toFixed(6): "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ETHBTCWaveArray[16] === 1,down:ETHBTCWaveArray[16] === -1}">{{ETHBTC.COINBASEPRO?ETHBTC.COINBASEPRO[0].toFixed(6): "-"}}</span>
                          <span class="row_right" :class="{up:ETHBTCWaveArray[18] === 1,down:ETHBTCWaveArray[18] === -1}">{{ETHBTC.COINBASEPRO?ETHBTC.COINBASEPRO[2].toFixed(6): "-"}}</span>
                        </div>
                      </div>
                      <div class="pair">
                        <div class="title row">
                          <div class="pairName">
                            <span class="front">LTC</span>
                            <span class="back">/ETH</span>
                          </div>
                          <div class="tradeBtn" @click="$router.push('/exchange?symbol=LTCETH')">Trade</div>
                        </div>
                        <div class="row">
                          <span>Best Ask</span>
                          <span>Best Bid</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:LTCBTCWaveArray[0] === 1,down:LTCBTCWaveArray[0] === -1}">{{LTCBTC.E55?(LTCBTC.E55[0]/ETHBTCRate).toFixed(6):"-"}}</span>
                          <span class="row_right" :class="{up:LTCBTCWaveArray[2] === 1,down:LTCBTCWaveArray[2] === -1}">{{LTCBTC.E55?(LTCBTC.E55[2]/ETHBTCRate).toFixed(6):"-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:LTCBTCWaveArray[4] === 1,down:LTCBTCWaveArray[4] === -1}">{{LTCBTC.BINANCE?(LTCBTC.BINANCE[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:LTCBTCWaveArray[6] === 1,down:LTCBTCWaveArray[6] === -1}">{{LTCBTC.BINANCE?(LTCBTC.BINANCE[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:LTCBTCWaveArray[8] === 1,down:LTCBTCWaveArray[8] === -1}">{{LTCBTC.HUOBI?(LTCBTC.HUOBI[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:LTCBTCWaveArray[10] === 1,down:LTCBTCWaveArray[10] === -1}">{{LTCBTC.HUOBI?(LTCBTC.HUOBI[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:LTCBTCWaveArray[12] === 1,down:LTCBTCWaveArray[12] === -1}">{{LTCBTC.BITTREX?(LTCBTC.BITTREX[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:LTCBTCWaveArray[14] === 1,down:LTCBTCWaveArray[14] === -1}">{{LTCBTC.BITTREX?(LTCBTC.BITTREX[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:LTCBTCWaveArray[16] === 1,down:LTCBTCWaveArray[16] === -1}">{{LTCBTC.COINBASEPRO?(LTCBTC.COINBASEPRO[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:LTCBTCWaveArray[18] === 1,down:LTCBTCWaveArray[18] === -1}">{{LTCBTC.COINBASEPRO?(LTCBTC.COINBASEPRO[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                      </div>
                      <!-- <div class="pair">
                        <div class="title row">
                          <div class="pairName">
                            <span class="front">ZEC</span>
                            <span class="back">/ETH</span>
                          </div>
                          <div class="tradeBtn" @click="$router.push('/exchange??symbol=ZECETH')">Trade</div>
                        </div>
                        <div class="row">
                          <span>Best Ask</span>
                          <span>Best Bid</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ZECBTCWaveArray[0] === 1,down:ZECBTCWaveArray[0] === -1}">{{ZECBTC.E55?(ZECBTC.E55[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:ZECBTCWaveArray[2] === 1,down:ZECBTCWaveArray[2] === -1}">{{ZECBTC.E55?(ZECBTC.E55[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ZECBTCWaveArray[4] === 1,down:ZECBTCWaveArray[4] === -1}">{{ZECBTC.BINANCE?(ZECBTC.BINANCE[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:ZECBTCWaveArray[6] === 1,down:ZECBTCWaveArray[6] === -1}">{{ZECBTC.BINANCE?(ZECBTC.BINANCE[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ZECBTCWaveArray[8] === 1,down:ZECBTCWaveArray[8] === -1}">{{ZECBTC.HUOBI?(ZECBTC.HUOBI[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:ZECBTCWaveArray[10] === 1,down:ZECBTCWaveArray[10] === -1}">{{ZECBTC.HUOBI?(ZECBTC.HUOBI[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ZECBTCWaveArray[12] === 1,down:ZECBTCWaveArray[12] === -1}">{{ZECBTC.BITTREX?(ZECBTC.BITTREX[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:ZECBTCWaveArray[14] === 1,down:ZECBTCWaveArray[14] === -1}">{{ZECBTC.BITTREX?(ZECBTC.BITTREX[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                        <div class="row">
                          <span class="row_left"  :class="{up:ZECBTCWaveArray[16] === 1,down:ZECBTCWaveArray[16] === -1}">{{ZECBTC.COINBASEPRO?(ZECBTC.COINBASEPRO[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                          <span class="row_right" :class="{up:ZECBTCWaveArray[18] === 1,down:ZECBTCWaveArray[18] === -1}">{{ZECBTC.COINBASEPRO?(ZECBTC.COINBASEPRO[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  </div>
            </div>
            <!-- GBBO end -->
        </main>
        <!-- ========== end gbbo ========== -->
    <section class="container space-top-2">
      <!-- <div class="row justify-content-center text-primary-55 h2 text-center" style="color:#12869A;font-weight: 500;width:100%">
                    {{$t("fronthomeMarkettitle")}}
                </div> <br><br> -->
      <market :sites="['B']"/>
    </section>
    <!-- 55 social start 社区 -->
    <div id="SVGbgElements5" class="position-relative gradient-half-primary-v1" style="margin-top:40px;background-image: url('../../../assets/svg/bg/social_bg.jpg');">
      <div class="container position-relative z-index-2 space-2 space-md-3">
        <!-- Title -->
        <div class="text-center mb-4">
          <!-- SVG Quote -->
          <figure class="mx-auto mb-2">
            <div class="d-flex justify-content-center my-2">
                <img src="../../../assets/images/index/55social_logo.png" alt="">
            </div>
          </figure>
          <!-- End SVG Quote -->

          <h2 class="text-white font-weight-medium">{{$t("fronthomeSocialtitle")}}</h2>
        </div>
        <!-- End Title -->
                        <!-- Slick Carousel - Testimonials Main Nav -->
                        <div id="testimonialsNavMain" class="js-slick-carousel u-slick text-center w-lg-75 mx-lg-auto mb-7"
                            data-adaptive-height="true"
                            data-infinite="false"
                            data-fade="true"
                            data-nav-for="#testimonialsNavPagination">
                            <div>
                            <!-- Testimonials -->
                            <div class="mb-4">
                                <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover myHover" :href="siteCommunityURL" target="_blank">{{$t("fronthomeSocialgroupEn")}} <span class="fa fa-angle-right ml-2"></span></a> 
                                <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover myHover" :href="btcCommunityURL" target="_blank">{{$t("fronthomeSocialgroupBtc")}} <span class="fa fa-angle-right ml-2"></span></a>   
                                <!-- <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" href="index.html" target="_blank">EOS Commuity <span class="fa fa-angle-right ml-2"></span></a> -->
                                <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover myHover" :href="ethCommunityURL" target="_blank">{{$t("fronthomeSocialgroupEth")}} <span class="fa fa-angle-right ml-2"></span></a> 
                                <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover myHover" :href="cryURL" target="_blank">Crypto News<span class="fa fa-angle-right ml-2"></span></a>
                            </div>
                            <!-- End Testimonials -->
                            </div>
                        </div>
                        <!-- End Slick Carousel - Testimonials Main Nav -->

        <!-- Slick Carousel - Testimonials Pagination Nav -->
        <div id="testimonialsNavPaginationExample3" class="js-slick-carousel u-slick u-slick--gutters-3 u-slick--pagination-interactive"
            data-infinite="true"
            data-slides-show="3"
            data-responsive='[{
              "breakpoint": 1200,
              "settings": {
                "slidesToShow": 2
              }
            }, {
              "breakpoint": 768,
              "settings": {
                "slidesToShow": 2
              }
            }, {
              "breakpoint": 554,
              "settings": {
                "slidesToShow": 1
              }
            }]'>
          <!-- <a class="js-slide rounded-pill p-2" :href="LisaURL" target="_blank">
            <div class="media align-items-center">
              <div class="u-avatar mr-3">
                <img class="img-fluid rounded-circle" src="../../../assets/images/index/figure/img1.jpg" alt="Image Description">
              </div>
              <div class="media-body">
                <h4 class="h6 u-slick--pagination-interactive__title mb-0">Lisa Loud</h4>
                <p class="small u-slick--pagination-interactive__text mb-0">SVP of Strategic Partnerships</p>
              </div>
            </div>
          </a> -->
          <a class="js-slide rounded-pill p-2"  :href="GeoffURL" target="_blank">
            <!-- Authors -->
            <div class="media align-items-center">
              <div class="u-avatar mr-3">
                <img class="img-fluid rounded-circle" src="../../../assets/images/index/figure/img2.jpg" alt="Image Description">
              </div>
              <div class="media-body">
                <h4 class="h6 u-slick--pagination-interactive__title mb-0">Geoff Shearer</h4>
                <p class="small u-slick--pagination-interactive__text mb-0">Director of Global Marketing</p>
              </div>
            </div>
            <!-- End Authors -->
          </a>
          <a class="js-slide rounded-pill p-2" :href="JasonURL" target="_blank">
            <!-- Authors -->
            <div class="media align-items-center">
              <div class="u-avatar mr-3">
                <img class="img-fluid rounded-circle" src="../../../assets/images/index/figure/img3.jpg" alt="Image Description">
              </div>
              <div class="media-body">
                <h4 class="h6 u-slick--pagination-interactive__title mb-0">Simon</h4>
                <p class="small u-slick--pagination-interactive__text mb-0">SVP of Operations</p>
              </div>
            </div>
            <!-- End Authors -->
          </a>
        </div>
        <!-- End Slick Carousel - Testimonials Pagination Nav -->
      </div>
    </div>
    <!-- End 55 social start 社区 -->
<!-- Team Section 高管团队 -->
<div class="container space-top-1 space-bottom-2 space-top-sm-2 space-bottom-sm-2">
    <!-- Title -->
  <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
      <h2 class="text-primary-55" style="color:#12869A;font-weight: 500">{{$t("fronthomeMteam")}}</h2>
  </div>
  <!-- End Title -->

  <!-- Slick Carousel -->
  <div class="js-slick-carousel u-slick u-slick--gutters-3"
       data-slides-show="2"
       data-slides-scroll="1"
       data-pagi-classes="text-center u-slick__pagination mt-7 mb-0"
       data-responsive='[{
         "breakpoint": 992,
         "settings": {
           "slidesToShow": 1
         }
       }, {
         "breakpoint": 768,
         "settings": {
           "slidesToShow": 1
         }
       }, {
         "breakpoint": 554,
         "settings": {
           "slidesToShow": 1
         }
       }]'>
    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">David Weild</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">Co-Chairman</span>
          </div>
          <p class="font-size-1">David is a former Vice Chairman of Nasdaq. He priced over 1,000 equity offerings as head of a Top 10 investment bank and is renowned for his thought leadership that led him to be called the “Father of the JOBS Act.” </p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_1.jpg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>

    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Darren Sandler</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">CCO & General Counsel</span>
          </div>
          <p class="font-size-1">Darren is Chief Compliance Officer and General Counsel. Previously, Darren was an attorney at Kirkland & Ellis LLP and Schulte Roth & Zabel LLP. While at Kirkland and Ellis, Darren led the firm's first blockchain client matter.</p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_4.jpg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>

    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Ashu Swami</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">CTO</span>
          </div>
          <p class="font-size-1">Ashu is the CTO of 55. Previously, Ashu headed a SPV of Quadeye Securities which pioneered and traded Mining Swaps, operated cloud mining datacenters, and managed a mining investment fund. </p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_3.jpg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>

    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Simon Grunfeld</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">SVP of Operations</span>
          </div>
          <p class="font-size-1">Simon's professional background is mostly from the retail FX and IT solutions marketplace. Simon has a solid background of the inner workings of the capital markets, which came by way of the fintech experience he developed over the years.</p>
        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_9.jpg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>
    <!-- <div class="js-slide px-3">
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Lisa Loud</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">SVP of Strategic Partnerships</span>
          </div>
          <p class="font-size-1">Lisa Loud has joined 55 as  SVP of Strategic Partnerships. Lisa led strategy at BitMEX from 2017, and during her tenure, the exchange volume reached the largest crypto volume worldwide in early 2018.</p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_2.jpg" alt="Image Description">
        </div>
      </div>
    </div> -->
    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Jeremy Xue</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">SVP of Technology</span>
          </div>
          <p class="font-size-1">Jeremy Xue is the Senior VP of Technology of 55. Xue previously founded a cryptocurrency exchange BitChain Exchange and served as Chief Technology Officer. Xue implemented the latest trading platform for the New York Stock Exchange.</p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/JeremyXue.jpeg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>
    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Danielle Frizziola</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">VP of Human Resources</span>
          </div>
          <p class="font-size-1">Danielle Frizziola is a seasoned Human Resources and Recruiting Executive specializing in emerging technology and creative spaces. She is a mentor to HR professionals worldwide.</p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/leader_6.jpg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>
    <div class="js-slide px-3">
      <!-- Team -->
      <div class="row">
        <div class="col-sm-6 d-sm-flex align-content-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
          <div class="w-100">
            <h3 class="h5 mb-4">Andrew Banhidi</h3>
          </div>
          <div class="d-inline-block">
            <span class="badge badge-primary badge-pill badge-bigger mb-3">Head of Research and Technology Sales</span>
          </div>
          <p class="font-size-1">Andrew spent 9 years as the CTO of Global Equities, Sales, Research, and Investment Banking at Bank of America Merrill Lynch. During this time, he oversaw the build out of the entire electronic trading stack, a cross-asset, API-based messaging system for normalizing all cross-asset processing.</p>

        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded mx-auto" src="../../../assets/images/index/figure/Andrew.jpeg" alt="Image Description">
        </div>
      </div>
      <!-- End Team -->
    </div>
  </div>
  <!-- End Slick Carousel -->
</div>
<!-- End Team Section -->
            <!-- Clients Section -->
                <div class=" u-space-2" style="padding-bottom:30px;background-color:#F6F9FC">
                      <div class="title" style="text-align:center;font-size:22px;color:#12869a !important;padding:22px">{{$t("fronthomePartners")}}</div>

                  <div class="js-slick-carousel u-slick"
                      data-autoplay="true"
                      data-speed="5000"
                      data-infinite="true"
                      data-slides-show="6"
                      data-responsive='[{
                        "breakpoint": 1200,
                        "settings": {
                          "slidesToShow": 4
                        }
                      }, {
                        "breakpoint": 992,
                        "settings": {
                          "slidesToShow": 4
                        }
                      }, {
                        "breakpoint": 768,
                        "settings": {
                          "slidesToShow": 3
                        }
                      }, {
                        "breakpoint": 576,
                        "settings": {
                          "slidesToShow": 3
                        }
                      }, {
                        "breakpoint": 480,
                        "settings": {
                          "slidesToShow": 2
                        }
                      }]'>
                    <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/index/logo1@2x.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/index/logo2@2x.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/index/logo3@2x.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/index/logo4@2x.png" alt="Image Description">
                    </div>
                    <!-- <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/index/logo5@2x.png" alt="Image Description">
                    </div> -->
                  </div>
                </div>
            <!-- End Clients Section -->

  </div>
</template>

<script>
    import SockJS from  'sockjs-client';  
    import  Stomp from 'stompjs';
    import {getRealtimeList} from '_api/balances.js'
    import {CHAT_URL, getMainSite,getCommouityBaseURL} from '../../../config/index'
    import {getHeaderTokenApi,postHeaderTokenBodyApi} from '_api/axios'
    import Cookies from 'js-cookie'
    import { BannerList, getRecommendSymbol, getCurrencyImg,AnnoucementList } from "_api/home";
    import { queryGlobal, queryConfig } from "_api/miningKo.js";
    import market from "@/components/market.vue";
    import {
      getParseFloat,
      getDecimalsNum,
      scientificToNumber
    } from "@/lib/utils.js";
    import { getSymbolList_realtime } from "_api/exchange.js";
    import bigDecimal from "js-big-decimal"; //除法失效
    import { BigNumber } from "bignumber.js";
    import moment from 'moment';
    import { mapState } from "vuex";
    let allNowPriceObject = {};
    export default{
        metaInfo(){
            return{
                title: this.pageTitle, // set a title
                meta: [{                 // set meta
                    name: 'keywords',
                    content:this.pageKeyword
                },{
                    name:'description',
                    content:this.pageDescription
                }],
            }
        },
        data() {
            return {
              pageTitle:this.$t(this.$route.meta.title),
              pageKeyword : this.$t(this.$route.meta.keywords),
              pageDescription : this.$t(this.$route.meta.description),
              value1: 0,
              value2: 0,
              isAutoplay: false,
              clientType: "PC",
              fromSite: "ALL",
              language: window.localStorage.getItem("countryLanguage") || "zh-CN",
              bannerArr: [],
              mainHomePriceObject: [],
              currencyName: "$",
              webSocketSource: "",
              symbolList_quote: {},
              body_count:'',
              body_coin:'BTC',
              body_account:'Bank',
              emailName:'',
              BTCUSD:{},
              BTCUSDArray:[],
              BTCUSDWaveArray:[0,0,0,0,0,0,0,0],
              BTCUSDT:{},
              BTCUSDTArray:[],
              BTCUSDTWaveArray:[0,0,0,0,0,0,0,0,0,0,0,0],
              ETHBTC:{},
              ETHBTCArray:[],
              ETHBTCWaveArray:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              LTCBTC:{},
              LTCBTCArray:[],
              LTCBTCWaveArray:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              ZECBTC:{},
              ZECBTCArray:[],
              ZECBTCWaveArray:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              USDTUSDD: 0.98,
              ETHBTCRate: 0.028,
              siteCommunityURL:'',//55社区
              btcCommunityURL:'',
              ethCommunityURL:'',
              yeezyCommunityURL:'',
              JasonURL:'',
              LisaURL:'',
              AshuURL:'',
              LoganURL:'',
              GeoffURL:'',
              DavidURL:'',
              supremeURL:'',
              cryURL:'',
              loginToken:Cookies.get('loginToken'),
              chatToken:'',
              adArr:[],
              moreAnounce: "",
              toLang:""
            }
        },
        methods: {
            join55() {
                this.$router.push({
                    path:'/register',
                    query:{
                        email:this.emailName,
                    }
                })
            },
            initURL(){
                if(this.loginToken){
                    postHeaderTokenBodyApi('api/sso/social/get-token',this.loginToken,null).then(data => {
                      this.chatToken = data.token +'/'
                      // this.iframeURL = `${CHAT_URL.baseURL}${this.chatToken}/`+encodeURIComponent(`${CHAT_URL.englishURL}`)
                      //社区链接
                      this.siteCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967250642861035532/feed')
                      this.ethCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252480964431879/feed')
                      this.btcCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252342116192258/feed')
                      this.yeezyCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/968138529123078148/feed')
                      this.supremeURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/973135123669061637/feed')
                      this.LisaURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wj73vs')
                      this.JasonURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wjyfst')
                      this.LoganURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/w8sswa')
                      this.GeoffURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/gfs9968')
                      this.DavidURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/davidweild')
                      this.AshuURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/ashuswami')
                      this.cryURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/Crypto_News')
                  })
                }else{
                      this.chatToken = 'null/'
                      //社区链接
                      this.siteCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967250642861035532/feed')
                      this.ethCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252480964431879/feed')
                      this.btcCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252342116192258/feed')
                      this.yeezyCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/968138529123078148/feed')
                      this.supremeURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/973135123669061637/feed')
                      this.LisaURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wj73vs')
                      this.JasonURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wjyfst')
                      this.LoganURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/w8sswa')
                      this.GeoffURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/gfs9968')
                      this.DavidURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/davidweild')
                      this.AshuURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/ashuswami')
                      this.cryURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/Crypto_News')
                }
            },
            transfer(){
                this.$router.push({
                    path:'/interFinanceOne',
                    query:{
                        count:this.body_count,
                        coin:this.body_coin,
                        account:this.body_account
                    }
                })
            },
            initWebSocket() {
              this.initConnect()
              let self = this;
              // 断开重连机制,尝试发送消息,捕获异常发生时重连
              this.timer = setInterval(() => {
                try {
                  self.stompClient.send("test");
                } catch (err) {
                  console.log("断线了: " + err);
                  self.initConnect()
                }
              }, 5000);
            },
            initConnect(){
              const domain = document.domain;
              if(domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('global.') || domain.startsWith('55ex.')){
                let socket = new SockJS('https://'+ domain +'/xchange/marketdata');
                this.stompClient = Stomp.over(socket);
                this.stompClient.debug = null
              }else {
                let socket = new SockJS('http://gbbo.55.exchange:8090/xchange/marketdata');
                this.stompClient = Stomp.over(socket);
                this.stompClient.debug = null
              }
              this.connection('btc_usd');
            },
            connection(symbol) {
                const sym2 = symbol.toUpperCase().replace(/_/, '');

                this.stompClient.connect({}, (frame)=> {
                  this.stompClient.subscribe('/topic/bbo/' + sym2,(data) => {
                    this.saveExchangeData(sym2,data)
                  });
                  this.stompClient.subscribe('/topic/bbo/BTCUSDT',(data) => {
                    this.saveExchangeData('BTCUSDT',data)
                  });
                  this.stompClient.subscribe('/topic/bbo/ETHBTC',(data) => {
                    this.saveExchangeData('ETHBTC',data)
                  });
                  this.stompClient.subscribe('/topic/bbo/ZECBTC',(data) => {
                    this.saveExchangeData('ZECBTC',data)
                  });
                  this.stompClient.subscribe('/topic/bbo/LTCBTC',(data) => {
                    this.saveExchangeData('LTCBTC',data)
                  });
                  
                });
            },
            // 断开连接
            disconnect() {
              if (this.stompClient != null) {
                this.stompClient.disconnect();
                console.log("Disconnected");
              }
            },
            saveExchangeData(type,data){
              const {HUOBI,BITTREX,E55,BINANCE,COINBASEPRO} = JSON.parse(data.body).providerBBOMap
              this.getExchangeData(HUOBI,'HUOBI',type)
              this.getExchangeData(BITTREX,'BITTREX',type)
              this.getExchangeData(E55,'E55',type)
              this.getExchangeData(BINANCE,'BINANCE',type)
              this.getExchangeData(COINBASEPRO,'COINBASEPRO',type)
            },
            getExchangeData (exchange,coinName,pairName){
              if(exchange){
                const date = new Date (exchange.updateTime)
                const time = date.getHours() + ':' +date.getMinutes() + ':' + date.getSeconds()
                this[pairName] = Object.assign({}, this[pairName], { [coinName]:[
                  exchange.askLevel.price,
                  exchange.askLevel.qty,
                  exchange.bidLevel.price,
                  exchange.bidLevel.qty,
                ]})
              }
            },
            gbboWave(coinPair){
              let arr = [this[coinPair].E55,this[coinPair].BINANCE,this[coinPair].HUOBI,this[coinPair].BITREX,this[coinPair].COINBASEPRO]
              arr = arr.reduce((n1,n2) =>{
                if(n2){
                  return n1.concat(n2)
                }else {
                  return n1
                }
              },[]);
              const _Array = coinPair + 'Array'
              const _WaveArray = coinPair +'WaveArray'
              if(this[_Array][0]){
                arr.forEach((item,index) => {
                  if( item > this[_Array][index] ){
                    this[_WaveArray][index] = 1
                    setTimeout(()=>{
                      this[_WaveArray][index] = 0
                    },200)
                  }else if( item < this[_Array][index] ){
                    this[_WaveArray][index] = -1
                    setTimeout(()=>{
                      this[_WaveArray][index] = 0
                    },200)
                  }
                })
              }
              this[_Array] = arr
            },
    initBannerList() {
      this.value1 = 0;
      this.bannerArr = [];
      this.isAutoplay = false;
      let params = {};
      params.clientType = this.clientType;
      params.fromSite = this.fromSite;
      let language =
        this.$store.state.app.countryLanguage ||
        window.localStorage.getItem("countryLanguage");
      if (
        language == "en" ||
        language == "vi" ||
        language == "ko" ||
        language == "zh-CN" ||
        language == "id-id"
      ) {
        params.language =
          this.$store.state.app.countryLanguage ||
          window.localStorage.getItem("countryLanguage") ||
          "zh-CN";
      } else {
        params.language = "en";
      }
      BannerList(params).then(data => {
        data.map((v, i) => {
          this.bannerArr.push({
            imageUrl: v.imageUrl,
            targetUrl: v.targetUrl,
            subjectName: v.subjectName
          });
        });
        if (this.bannerArr.length > 1) {
          this.isAutoplay = true;
        }
      });
    },
    //币种推荐位行情
    async initRecommendSymbol() {
      if (this.webSocketSource) {
        this.webSocketSource.close();
      }
      await getSymbolList_realtime().then(res => {
        res.map((v, i) => {
          this.symbolList_quote[v.symbol] = v; //拼装行情的symbol为Key的symbolList 对象
        });
      });
      let SSEURl = "";
      //调用推荐位接口
      await getRecommendSymbol().then(data => {
        let paramsArr = [];
        if (data.length > 0) {
          data.splice(0, 4).map((v, i) => {
            paramsArr.push(v.exCurrency);
            if (this.mainHomePriceObject.length < 4) {
              this.mainHomePriceObject.push(v);
            }
            //订阅行情
            if (v.baseCurrency == "USD" || v.baseCurrency == "BTC" || v.baseCurrency == "ETH") {
              SSEURl += `symbol=${v.symbol}&${v.symbol}_least=1&`; //拼装推送数据查询url
            } else {
              SSEURl += `symbol=${v.baseCurrency}USDT&${
                v.baseCurrency
              }USDT_least=1&`; //拼装推送数据查询url
            }
          });
          //币种图标
          getCurrencyImg({ currency: paramsArr.toString() }).then(info => {
            this.mainHomePriceObject.map((v, i) => {
              info.forEach(item => {
                if (v.exCurrency == item.currency) {
                  v.imageUrl = item.projectInfo.image;
                }
              });
            });
          });
          if (!this.webSocketSource) {
            //订阅行情
            this.getSSERealTime(SSEURl);
          }
        }
      });
    },
    //获取推送行情
    getSSERealTime(url) {
      let SSEcache = null;
      const baseURL = window.location.protocol == "http:" ? "ws://" : "wss://";
      const host = window.location.host;
      //ws断开尝试重连间隔 5s
      this.webSocketSource = new ReconnectingWebSocket(
        `${baseURL}${host}/quote/realTime.ws?${url}`,
        null,
        { debug: true, reconnectInterval: 5000 }
      );
      this.webSocketSource.onopen = e => {
        // console.log("open");
      };
      this.webSocketSource.onmessage = e => {
        //每次推送一条记录
        let result = JSON.parse(e.data);
        if (result.ping != undefined) {
          var pongResponse = {};
          pongResponse.pong = result.ping;
          this.webSocketSource.send(JSON.stringify(pongResponse));
          return;
        }
        allNowPriceObject[result.symbol] = result;
        //快照去重
        if (
          SSEcache &&
          SSEcache.dateTime == result.dateTime &&
          SSEcache.volume == result.volume
        ) {
          return;
        } else {
          let v = {}; //快照的涨跌幅
          if (result.symbol) {
            let long = getDecimalsNum(
              this.symbolList_quote[result.symbol].priceTickSize
            );
            let diff = "";
            let a = "";
            //计算涨跌幅 percent  +
            if (result.previousClose && result.last) {
              diff = bigDecimal.subtract(result.last, result.previousClose);
              a = bigDecimal.multiply(
                new BigNumber(diff)
                  .dividedBy(new BigNumber(result.previousClose))
                  .toFixed(6),
                "100"
              );
            } else {
              diff = bigDecimal.subtract(
                scientificToNumber(result.last),
                scientificToNumber(result.open)
              );
              a = bigDecimal.multiply(
                new BigNumber(diff)
                  .dividedBy(new BigNumber(result.open))
                  .toFixed(6),
                "100"
              );
            }
            //涨跌幅%
            v.percent = bigDecimal.round(a, 2) + "%";
            //绿涨红跌 1绿色 0灰色 -1红色
            v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0);
            //计算最新价格精度
            v.last = bigDecimal.round(scientificToNumber(result.last), long);
            // v.last = result.last
            //24H交易量
            v.hour24Volume = bigDecimal.round(result.hour24Volume, 2);
            //法币估值
            let legalTender = JSON.parse(
              localStorage.getItem("currentCurrency")
            );
            this.currencyRate = legalTender.rate;
            this.currencyName = legalTender.shortcut
              ? legalTender.shortcut
              : "$";
            if (
              this.symbolList_quote[result.symbol].quoteAsset == "USD" ||
              this.symbolList_quote[result.symbol].quoteAsset == "BTC" ||
              this.symbolList_quote[result.symbol].quoteAsset == "ETH" 
            ) {
              this.currentSymbolRate = 1;
              v.symbolCurrency = bigDecimal.round(
                new BigNumber(result.last) * new BigNumber(this.currencyRate),
                4
              );
            } else {
              if (allNowPriceObject(v.quoteAsset + "USDT")) {
                this.currentSymbolRate = bigDecimal.round(
                  new BigNumber(result.last) *
                    new BigNumber(
                      allNowPriceObject(v.quoteAsset + "USDT").last
                    ),
                  4
                );
                v.symbolCurrency = bigDecimal.round(
                  new BigNumber(this.currentSymbolRate) *
                    new BigNumber(this.currencyRate),
                  4
                );
              }
            }
            //板块部分双向绑定
            // this.symbolListSelf = Object.assign({},this.symbolListSelf)
            let number = _.findIndex(this.mainHomePriceObject, {
              symbol: result.symbol
            });
            this.mainHomePriceObject.splice(
              number,
              Object.assign(this.mainHomePriceObject[number], v)
            );
            //处理当前
            SSEcache = result;
          }
        }
      };
      this.webSocketSource.onerror = e => {
        // console.log("home ws error");
      };
      this.webSocketSource.onclose = e => {
        // console.log("home ws close");
      };
    },
    countTime() {
      //获取当前时间
      const date = new Date();
      const now = date.getTime();
      //获取截止时间
      const end = 1562212800000
      //时间差
      const leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      let d, h, m, s;
      if (leftTime > 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = d * 24 + Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
      } else {
        return;
      }
      //将倒计时赋值到div中
      //this.ref.hour.innerHTML = d+"天";
      if (this.$refs.hour) {
        this.$refs.hour.innerHTML = h > 9 ? h : "0" + h;
        this.$refs.minute.innerHTML = m > 9 ? m : "0" + m;
        this.$refs.second.innerHTML = s > 9 ? s : "0" + s;
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
    gotoSocial() {
      let loginFlag = Cookies.get("loginToken");
      if (loginFlag) {
        //登陆了
        postHeaderTokenBodyApi(socialToken, loginFlag, {}).then(res => {
          if (res.code) {
            this.$Notice.error({
              title: this.$t(res.message),
              desc: this.$t(res.message)
            });
            if (res.code == "Bx000002") {
              this.$router.push("/login");
            }
          } else {
            let responseToken = res.token;
            let socialURL = CHAT_URL.baseURL + responseToken;
            let name = "/groups/profile/989838497277808642/feed";

            // console.log(socialURL+'/'+encodeURIComponent(name))
            window.open(socialURL + "/" + encodeURIComponent(name));
          }
        });
      } else {
        window.open(
          getCommouityBaseURL() + "/groups/profile/989838497277808642/feed"
        );
        // console.log(getCommouityBaseURL())
      }
    },
    formatNumber(str) {
      str = str.toString()
      var re = /(?=(?!\b)(\d{3})+$)/g;
      return str.replace(re, ",");
    },
    isKYC() {
      let loginToken = Cookies.get('loginToken');
      if( !loginToken ){
        this.$router.push('/login')
        return
      }
      getHeaderTokenApi(identifyQueryUrl, {}, loginToken).then((res) => {
        let status = res.data.dataStatus;
        if(res.data==''){
          this.$router.push('/kyc')
          return
        }
        if (status == 1) {
          this.$router.push('/kyc')
        } else {
          this.$router.push('/identityResult')
        }
      }).catch((error) => {
          // console.log(error)
      })
    },
    initAnnouncementData() {
      this.adArr = [];
      AnnoucementList({ language: this.language, fromSite: "ALL" }).then(
        data => {
          data.map((v, i) => {
            if (v.clientType == "PC") {
              this.adArr.push({
                icon: v.title.substr(0, 1),
                title: v.title,
                targetUrl: v.targetUrl,
                createTime: moment(v.createTime).format("MM-DD")
              });
            }
          });
        }
      );
    },
    footerUrl() {
      let lang = this.$store.state.app.countryLanguage;
      if (lang == "en") {
        this.moreAnounce =
          "https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements";
      } else if (lang == "vi") {
        this.moreAnounce =
          "https://55support.zendesk.com/hc/en/categories/360000443513-Announcements";
      } else if (lang == "ko") {
        this.moreAnounce =
          "https://55support.zendesk.com/hc/ko/categories/360000443513";
      } else if (lang == "zh-CN" || lang == "zh") {
        this.moreAnounce =
          "https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements";
      }
      this.toLang = lang === 'zh-CN' || lang === 'zh' ?'zh-cn':'en-us'
    },


        },
        
        beforeMount(){
           
        },
        
        mounted(){

                // initialization of go to
                $.HSCore.components.HSGoTo.init('.js-go-to');
                // initialization of unfold component
                $.HSCore.components.HSUnfold.init($('[data-unfold-target]'));
                // initialization of malihu scrollbar
                $.HSCore.components.HSMalihuScrollBar.init($('.js-scrollbar'));     
                // initialization of slick carousel       
                $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');    
                // initialization of svg injector module
                $.HSCore.components.HSSVGIngector.init('.js-svg-injector');
                //获得汇率
                getRealtimeList().then(data => this.USDTUSDD = data.find(item => item.symbol === 'USDTUSDD').last)
                getRealtimeList().then(data => this.ETHBTCRate = data.find(item => item.symbol === 'ETHBTC').last)
                
                this.initWebSocket()
                this.initURL()
                this.$store.commit("changeHeaderColor", "");
                this.$store.commit("changeFooterColor", "#15232C");
                //Header设为透明色
                this.initBannerList();
                // 推荐位
                this.initRecommendSymbol();
                this.countTime();
                this.initAnnouncementData();
                this.footerUrl();
        },
        beforeDestroy() {
          // 页面离开时断开连接,清除定时器
          this.disconnect();
          clearInterval(this.timer);
          this.webSocketSource && this.webSocketSource.close();
        },
        computed: {
          loginStatus() {
            return this.$store.state.app.isLogin;
          },
          languageChange() {
            return this.$store.state.app.countryLanguage; //  返回全局state的状态值
          },
          loginStatus() {
            return this.$store.state.app.isLogin;
          },
          //监听vuex中数据的变化
          listenstage() {
            return this.$store.state.app.currentCurrencyState;
          },
          ...mapState({
            ATOInfo: state => state.app.ATOInfo
          })
        },
        watch:{
          BTCUSD(){
            this.gbboWave('BTCUSD')
          },
          BTCUSDT(){
            this.gbboWave('BTCUSDT')
          },
          ETHBTC(){
            this.gbboWave('ETHBTC')
          },
          LTCBTC(){
            this.gbboWave('LTCBTC')
          },
          ZECBTC(){
            this.gbboWave('ZECBTC')
          },
                   loginStatus(val, oldVal) {
            if (val) {
               this.isLogin = true;
            } else {
               this.isLogin = false;

            }
            setTimeout(()=>{
                this.initURL()
            },1000)
            
         },
          languageChange(val, oldVal) {
            //监听全局语言的状态
            this.initBannerList();
            this.pageTitle = this.$t(this.$route.meta.title)
            this.pageKeyword = this.$t(this.$route.meta.keywords)
            this.pageDescription = this.$t(this.$route.meta.description)
            if (val == 'en' || val == 'vi' || val == 'ko' || val == 'zh-CN'||val == "id-id") {
              this.language = val;
              this.initAnnouncementData();
            } else {
              this.language = "en";
              this.initAnnouncementData();
            }
            this.footerUrl();
          },
          loginStatus(val, oldVal) {
            if (val) {
              this.isLogin = true;
            } else {
              this.isLogin = false;
            }
          },
          listenstage: function(newV, oldV) {
            // 推荐位
            this.initRecommendSymbol();
          }
         
        },
        components:{
          market
        }
    }
</script>

<style lang="less" scoped>
.ushomecontainer{
    width:100%;
    height: 100%;
}
@media screen and (min-width:320px) and(max-width:970px){
    #gbbo_container{
        display: none;
    }
    .u-devices-v3{
        display: none;

    }
    #power-hands{
      // display: none;
    }
}
#recommend {
  position: relative;
  padding: 26px 25px 0 25px;
  width: 100%;
  height: 100%;
  box-shadow: 0 7px 22px 0 rgba(204, 204, 204, 0.5);
  background: #ffffff;
  border-radius: 2px;
  margin-right: 20px;
  color: #344857;
  margin-top: 0;
  transition: margin-top 0.4s ease;
  &:hover {
    margin-top: -5px;
  }
  &:last-child {
    margin-right: 0;
  }
  .redBackground {
    width: 144px;
    height: 140px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1100;
    background: url("../../../assets/images/home/mainHome/redBack.png")
      center center;
    background-size: 144px 140px;
  }
  .greenBackground {
    width: 144px;
    height: 140px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1100;
    background: url("../../../assets/images/home/mainHome/greenBack.png")
      center center;
    background-size: 144px 140px;
  }
  .percent_line {
    display: flex;
    justify-content: space-between;
  }
  .legal_coin {
    font-size: 14px;
    color: #949da6;
    margin-top: 5px;
  }
  .baseAsset {
    font-size: 14px;
    color: #344857;
  }
  .quoteAsset {
    font-size: 12px;
    color: #949da6;
  }
  .price {
    font-size: 28px;
    margin-top: 10px;
    display: inline-block;
  }
  .textColorRed {
    color: #ea4853;
  }
  .textColorGreen {
    color: #66b76d;
  }
  .logo {
    margin-right: 10px;
  }
  .percentGreen {
    width: 60px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #66b76d;
  }
  .percentRed {
    width: 60px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #ea4853;
  }
}
</style>
<style lang="stylus">
#gbbo_container
  width:402px;
  border-radius:4px 4px 4px 4px;
  .title
    width 100%
    height 40px
    line-height 40px
    text-align center
    background-color #1A4158
    font-size:12px;
    font-weight:500;
    color:rgba(255,255,255,1);
    border-radius:4px 4px 0 0;
    .front
      font-size:16px;
      font-weight:500;
      color:rgba(255,255,255,1);
  .subTitle
    width:100%;
    height:40px;
    line-height 40px
    background:rgba(37,77,101,1);
    padding-left 72px
    padding-right 20px
    display flex
    justify-content space-around
    color #AAD5EC
  .main
    background-color #154159
    .row
      margin 0
      width 100%
      height 40px
      line-height 40px
      display flex
      justify-content space-around
      align-items center
      padding 0 20px
      box-sizing border-box
      &:nth-child(2n+1)
        background-color:#153C52
      &:nth-child(2n)
        background-color:#0F3147
      &:last-child
        border-radius:0 0 4px 4px;
      .cell
        color #fff
        font-weight 400
        font-size:12px;
        img
          width 20px
          height 20px
#gbbo_detail
  width 100%
  overflow hidden
  display flex
  justify-content space-between
  .logo
    margin-top 94px
    .logo_item
      height 48px
      line-height 48px
      width 142px
  .gbbo_right
    width 100%
    overflow auto
    .pair_wrap
      display flex
      width 900px
      justify-content space-around
      margin 0 auto
      .pair
        .row
          width 212px
          height 48px
          margin 0
          padding 0 20px
          box-sizing border-box
          line-height 48px
          text-align center
          display flex
          justify-content space-between
          color #535C64
          .up
            background-color #edf8ef
            color #66B76D
          .down
            background-color #fff1f3
            color #EA4853
          .row_left
            padding 0 10px
            margin-left -10px
          .row_right
            padding 0 10px
            margin-right -10px
          &:nth-child(2n+1)
            background-color #F8FAFD
          &:nth-child(1)
            background-color #fff
          &:nth-child(2)
            color #1E2022
          &:nth-child(3)
            color #12869A
        .title
          width 212px
          height 48px
          .pairName
            .front
              font-size:20px;
              font-weight:500;
              color:rgba(30,32,34,1);
            .back
              font-size:14px;
              font-weight:400;
              color #1E2022
          .tradeBtn
            width:72px;
            height:30px;
            background:rgba(18,134,154,1);
            border-radius:2px;
            line-height 30px
            margin-top 10px
            color #fff
            cursor pointer
</style>
