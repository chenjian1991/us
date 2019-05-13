<template>
    <div class="ushomecontainer"> 
        <!-- Skippy -->
        <a id="skippy" class="sr-only sr-only-focusable u-skippy" href="#content">
            <div class="container">
            <span class="u-skiplink-text">Skip to main content</span>
            </div>
        </a>
        <!-- End Skippy -->

       <!-- <USHeader/> -->

        <!-- ========== MAIN ========== -->
        <main id="content" role="main">
            <!-- Hero v1 Section -->
            <div class="u-hero-v1">
              <!-- Hero Carousel Main -->
              <div id="heroNav" class="js-slick-carousel u-slick"
                  data-autoplay="true"
                  data-speed="10000"
                  data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                  data-arrow-left-classes="fa fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left ml-lg-2 ml-xl-4"
                  data-arrow-right-classes="fa fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right mr-lg-2 mr-xl-4"
                  data-numbered-pagination="#slickPaging"
                  data-nav-for="#heroNavThumb">
                  <div class="js-slide">
                      <!-- Slide #1 -->
                      <div class="d-flex align-items-center u-hero-v1__main" style="background-image: url(assets/svg/bg/banner.jpg);">
                          <div class="container u-space-4-top u-space-5-top--md u-space-3-top--lg u-space-3-bottom">
                              <div class="row position-relative">
                                  <div class="col-md-8 col-lg-6 position-relative">
                                      <h1 class="text-white display-4 font-size-48--md-down mp-0"
                                          data-scs-animation-in="fadeInUp"
                                          data-scs-animation-delay="200">
                                          <span class="font-weight-bold">Asset Network</span>
                                      </h1>
                                      <span class="d-block h4 text-white font-weight-light mb-2 mt-2"
                                              data-scs-animation-in="fadeInUp">
                                          Global asset access & liquidity for everyone
                                      </span>
                                  </div>
                                  <div class=" position-absolute" style="top:0;right:0" id="gbbo_container">
                                    <div class="title">
                                      <span class="front">BTC</span>
                                      <span class="back">/USD</span>
                                    </div>
                                    <div class="subTitle">
                                      <div class="tab">Ask</div>
                                      <div class="tab">Qty</div>
                                      <div class="tab">Bid</div>
                                      <div class="tab">Qty</div>
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
                                          <span>{{BTCUSD.BITREX?BTCUSD.BITREX[0].toFixed(2):'-'}}</span>
                                        </div>
                                        <div class="cell">
                                          <span>{{BTCUSD.BITREX?BTCUSD.BITREX[1].toFixed(4):'-'}}</span>
                                        </div>
                                        <div class="cell">
                                          <span>{{BTCUSD.BITREX?BTCUSD.BITREX[2].toFixed(2):'-'}}</span>
                                        </div>
                                        <div class="cell">
                                          <span>{{BTCUSD.BITREX?BTCUSD.BITREX[3].toFixed(4):'-'}}</span>
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
                              <div class="row ">
                                  <!-- Form -->
                                  <form class="js-validate js-form-message mt-4 col-md-6">
                                      <div class="js-focus-state input-group input-group-lg u-form u-form--lg u-form--white-brd">
                                          <input type="email" class="form-control u-form__input" name="email" required
                                              placeholder="Enter your email address"
                                              v-model="emailName"
                                              aria-label="Enter your email address"
                                              data-msg="Please enter a valid email address."
                                              data-error-class="u-has-error"
                                              data-success-class="u-has-success">
                                          <div class="input-group-append u-form__append ">
                                              <button type="submit" class="btn btn-warning u-btn-wide" @click="join55">Join 55</button>
                                          </div>
                                      </div>
                                  </form>
                                  <!-- End Form -->
                              </div>
                             
                          </div>
                      </div>
                      <!-- End Slide #1 -->
                  </div>
              </div>
              <!-- End Hero Carousel Main -->

              <!-- Slick Paging -->
              <div class="container position-relative">
                  <div id="slickPaging" class="u-slick__paging-v1" style="display:none"></div>
              </div>
              <!-- End Slick Paging -->

              <!-- Hero Carousel Secondary -->
              <!-- <div id="heroNavThumb" class="js-slick-carousel u-slick"
                  data-autoplay="true"
                  data-speed="10000"
                  data-is-thumbs="true"
                  data-nav-for="#heroNav">
                  <div class="js-slide">
                    
                      <div class="d-flex align-items-center bg-white">
                          <div class="w-100">
                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class="row">
                                              <div class="col-md-10 col-sm-11 col-xs-11 m-auto py-4">
                                                      <h3 class="h4 mb-2">
                                                          <span class=" h4 d-block text-primary-55 font-weight-blod font-size pl-3">Our aggregated connected exchange volume:</span>
                                                      </h3>
                                                      <h4 class="mt-2 pl-3">208,2323,456 USD</h4>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-md-6 bg-primary-55">
                                          <div class="row">
                                              <div class="col-md-8 col-sm-11 col-xs-11 ml-5 py-4">
                                                      <h3 class="h4 mb-2 text-white pl-3">
                                                          Get the lowest buy and highest sell price, all on one platform:
                                                      </h3>
                                                      <p class="text-white mt-2 h5 pl-3">Average arbitrage: <span style="color:#0f8">201.01 USD(+3.5%)</span></p>
                                                      <p class="text-white mt-2 h5 pl-3">TBD what to display here for GBBO feature</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              <div class="w-100 h-100 d-none d-lg-inline-block bg-primary u-hero-v1__last">
                                  <div class=" u-hero-v1__last-inner">
                                      <h3 class="h5 text-white">
                                          Get the lowest buy and highest sell price, all on one platform:
                                      </h3>
                                      <p class="text-white mb-0 h5">Average arbitrage: <span style="color:#0f8">201.01 USD(+3.5%)</span></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div> -->
              <!-- End Hero Carousel Secondary -->
              </div>
            <!-- End Hero v1 Section -->

            <hr class="my-0">

            <!-- GBBO start -->
            <div class="container  u-space-3-top pb-4">
                <div class="row justify-content-center text-primary-55 h2 text-center">
                    GBBO - Global Best Bid and Offer
                </div>
                <div class="row justify-content-center text-secondary text-center">
                    Buy and sell at best rates on a network of trading platforms 
                </div>
                </br>
                <div id="gbbo_detail">
                  <div class="logo">
                    <div class="logo_item">
                      <img src="../../../assets/images/index/55_big@2x.png" style="width:80px;height:19px" alt="">
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
                      <span class="row_left"  :class="{up:BTCUSDTWaveArray[6] === 1,down:BTCUSDTWaveArray[6] === -1}">{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[2]*USDTUSDD).toFixed(2): "-"}}</span>
                      <span class="row_right" :class="{up:BTCUSDTWaveArray[4] === 1,down:BTCUSDTWaveArray[4] === -1}">{{BTCUSDT.BINANCE?(BTCUSDT.BINANCE[0]*USDTUSDD).toFixed(2): "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:BTCUSDTWaveArray[8] === 1,down:BTCUSDTWaveArray[8] === -1}">{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[0]*USDTUSDD).toFixed(2): "-"}}</span>
                      <span class="row_right" :class="{up:BTCUSDTWaveArray[10] === 1,down:BTCUSDTWaveArray[10] === -1}">{{BTCUSDT.HUOBI?(BTCUSDT.HUOBI[2]*USDTUSDD).toFixed(2): "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:BTCUSDWaveArray[0] === 1,down:BTCUSDWaveArray[0] === -1}">{{BTCUSD.BITREX?(BTCUSD.BITREX[0]).toFixed(2): "-"}}</span>
                      <span class="row_right" :class="{up:BTCUSDWaveArray[2] === 1,down:BTCUSDWaveArray[2] === -1}">{{BTCUSD.BITREX?(BTCUSD.BITREX[2]).toFixed(2): "-"}}</span>
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
                      <span class="row_left"  :class="{up:ETHBTCWaveArray[12] === 1,down:ETHBTCWaveArray[12] === -1}">{{ETHBTC.BITREX?ETHBTC.BITREX[0].toFixed(6): "-"}}</span>
                      <span class="row_right" :class="{up:ETHBTCWaveArray[14] === 1,down:ETHBTCWaveArray[14] === -1}">{{ETHBTC.BITREX?ETHBTC.BITREX[2].toFixed(6): "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:ETHBTCWaveArray[16] === 1,down:ETHBTCWaveArray[16] === -1}">{{ETHBTC.COINBASEPRO?ETHBTC.COINBASEPRO[0].toFixed(6): "-"}}</span>
                      <span class="row_right" :class="{up:ETHBTCWaveArray[18] === 1,down:ETHBTCWaveArray[18] === -1}">{{ETHBTC.COINBASEPRO?ETHBTC.COINBASEPRO[2].toFixed(6): "-"}}</span>
                    </div>
                  </div>
                  <div class="pair">
                    <div class="title row">
                      <div class="pairName">
                        <span class="front">DASH</span>
                        <span class="back">/ETH</span>
                      </div>
                      <div class="tradeBtn" @click="$router.push('/exchange?symbol=DASHETH')">Trade</div>
                    </div>
                    <div class="row">
                      <span>Best Ask</span>
                      <span>Best Bid</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:DASHBTCWaveArray[0] === 1,down:DASHBTCWaveArray[0] === -1}">{{DASHBTC.E55?(DASHBTC.E55[0]/ETHBTCRate).toFixed(6):"-"}}</span>
                      <span class="row_right" :class="{up:DASHBTCWaveArray[2] === 1,down:DASHBTCWaveArray[2] === -1}">{{DASHBTC.E55?(DASHBTC.E55[2]/ETHBTCRate).toFixed(6):"-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:DASHBTCWaveArray[4] === 1,down:DASHBTCWaveArray[4] === -1}">{{DASHBTC.BINANCE?(DASHBTC.BINANCE[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:DASHBTCWaveArray[6] === 1,down:DASHBTCWaveArray[6] === -1}">{{DASHBTC.BINANCE?(DASHBTC.BINANCE[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:DASHBTCWaveArray[8] === 1,down:DASHBTCWaveArray[8] === -1}">{{DASHBTC.HUOBI?(DASHBTC.HUOBI[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:DASHBTCWaveArray[10] === 1,down:DASHBTCWaveArray[10] === -1}">{{DASHBTC.HUOBI?(DASHBTC.HUOBI[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:DASHBTCWaveArray[12] === 1,down:DASHBTCWaveArray[12] === -1}">{{DASHBTC.BITREX?(DASHBTC.BITREX[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:DASHBTCWaveArray[14] === 1,down:DASHBTCWaveArray[14] === -1}">{{DASHBTC.BITREX?(DASHBTC.BITREX[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:DASHBTCWaveArray[16] === 1,down:DASHBTCWaveArray[16] === -1}">{{DASHBTC.COINBASEPRO?(DASHBTC.COINBASEPRO[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:DASHBTCWaveArray[18] === 1,down:DASHBTCWaveArray[18] === -1}">{{DASHBTC.COINBASEPRO?(DASHBTC.COINBASEPRO[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                  </div>
                  <div class="pair">
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
                      <span class="row_left"  :class="{up:ZECBTCWaveArray[12] === 1,down:ZECBTCWaveArray[12] === -1}">{{ZECBTC.BITREX?(ZECBTC.BITREX[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:ZECBTCWaveArray[14] === 1,down:ZECBTCWaveArray[14] === -1}">{{ZECBTC.BITREX?(ZECBTC.BITREX[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                    <div class="row">
                      <span class="row_left"  :class="{up:ZECBTCWaveArray[16] === 1,down:ZECBTCWaveArray[16] === -1}">{{ZECBTC.COINBASEPRO?(ZECBTC.COINBASEPRO[0]/ETHBTCRate).toFixed(6) : "-"}}</span>
                      <span class="row_right" :class="{up:ZECBTCWaveArray[18] === 1,down:ZECBTCWaveArray[18] === -1}">{{ZECBTC.COINBASEPRO?(ZECBTC.COINBASEPRO[2]/ETHBTCRate).toFixed(6) : "-"}}</span>
                    </div>
                  </div>
                </div>
            </div>
            <!-- GBBO end -->

            <!-- 55 social start 社区-->
            <div style="background-image: url(assets/svg/bg/social_bg.jpg);">
                <div class="u-bg-img-hero" >
                    <div class="container u-space-3">
                    <!-- Title -->
                    <div class="text-center mb-4">
                        <!-- SVG Quote -->
                        <figure class="mx-auto mb-2" style="width: 50px;">
                            <div class="d-flex justify-content-center my-2">
                                <img src="assets/svg/bg/55social_logo.png" alt="">
                            </div>
                        </figure>
                        <!-- End SVG Quote -->

                        <h2 class="text-white font-weight-medium">Connect with influencers worldwide</h2>
                        <!-- <div class=" text-white pb-4">
                            Get real time market information from top traders
                        </div> -->
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
                            <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" :href="siteCommunityURL" target="_blank">55 Community <span class="fa fa-angle-right ml-2"></span></a> 
                            <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" :href="btcCommunityURL" target="_blank">BTC Community <span class="fa fa-angle-right ml-2"></span></a>   
                            <!-- <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" href="index.html" target="_blank">EOS Commuity <span class="fa fa-angle-right ml-2"></span></a> -->
                            <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" :href="ethCommunityURL" target="_blank">ETH Community <span class="fa fa-angle-right ml-2"></span></a> 
                            <a class="btn m-1 btn-primary u-btn-primary u-btn-wide u-btn-pill transition-3d-hover" :href="supremeURL" target="_blank">Supreme Community <span class="fa fa-angle-right ml-2"></span></a>
                        </div>
                        <!-- End Testimonials -->
                        </div>
                    </div>
                    <!-- End Slick Carousel - Testimonials Main Nav -->

                    <!-- Slick Carousel - Testimonials Pagination Nav -->
                    <div id="testimonialsNavPagination" class="js-slick-carousel u-slick u-slick--gutters-3 u-slick--pagination-testimonials-v1"
                        data-infinite="true"
                        data-slides-show="3"
                        data-center-mode="true"
                        data-focus-on-select="true"
                     
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
                        <a class="js-slide rounded-pill p-2" :href="LisaURL" target="_blank">
                          <!-- Authors -->
                              <div class="media align-items-center">
                                  <div class="d-flex mr-3">
                                  <img class="u-md-avatar rounded-circle" src="assets/img/100x100/img1.jpg" alt="Image Description">
                                  </div>
                                  <div class="media-body">
                                  <h4 class="h6 u-slick--pagination-testimonials-v1__title mb-0">Lisa Loud</h4>
                                  <p class="small u-slick--pagination-testimonials-v1__text mb-0">BitMEX - Head of Marketing</p>
                                  </div>
                              </div>
                          <!-- End Authors -->
                        </a>
                        <a class="js-slide rounded-pill p-2" :href="LoganURL" target="_blank">
                              <!-- Authors -->
                              <div class="media align-items-center">
                                  <div class="d-flex mr-3">
                                  <img class="u-md-avatar rounded-circle" src="assets/img/100x100/img3.jpg" alt="Image Description">
                                  </div>
                                  <div class="media-body">
                                  <h4 class="h6 u-slick--pagination-testimonials-v1__title mb-0">Logan Schauer</h4>
                                  <p class="small u-slick--pagination-testimonials-v1__text mb-0">CEO of Crypto Media Group</p>
                                  </div>
                              </div>
                              <!-- End Authors -->
                        </a>
                        
                        <a class="js-slide rounded-pill p-2" :href="GeoffURL" target="_blank">
                            <!-- Authors -->
                            <div class="media align-items-center">
                                <div class="d-flex mr-3">
                                <img class="u-md-avatar rounded-circle" src="assets/img/100x100/img4.jpg" alt="Image Description">
                                </div>
                                <div class="media-body">
                                <h4 class="h6 u-slick--pagination-testimonials-v1__title mb-0">Geoff Shearer</h4>
                                <p class="small u-slick--pagination-testimonials-v1__text mb-0">Director of 55 Social</p>
                                </div>
                            </div>
                            <!-- End Authors -->
                        </a>

                        <a class="js-slide rounded-pill p-2" :href="JasonURL" target="_blank">
                              <!-- Authors -->
                              <div class="media align-items-center">
                                  <div class="d-flex mr-3">
                                  <img class="u-md-avatar rounded-circle" src="assets/img/100x100/img2.jpg" alt="Image Description">
                                  </div>
                                  <div class="media-body">
                                  <h4 class="h6 u-slick--pagination-testimonials-v1__title mb-0">Jason Zhao</h4>
                                  <p class="small u-slick--pagination-testimonials-v1__text mb-0">Top Crypto Trader</p>
                                  </div>
                              </div>
                              <!-- End Authors -->
                        </a>
                    </div>
                    <!-- End Slick Carousel - Testimonials Pagination Nav -->
                    </div>
                </div>
            </div>
            <!--  55 social end -->

            <!-- yezi start -->
                <!-- <div class="container u-space-3">
                  <div class="h2 text-primary-55 text-center py-3">Unrestricted flow of assets</div>
                  <div class="h6 text-center text-secondary pb-3">Buy and sell tokenized limited edition items</div>
                  <div class="row">
                    <div class="col-lg-7 mb-7 mb-lg-0">
                      <div class="cbp"
                          data-layout="grid"
                          data-animation="quicksand"
                          data-x-gap="32"
                          data-y-gap="32"
                          data-media-queries='[
                            {"width": 300, "cols": 1}
                          ]'>
                        <div class="cbp-item">
                          <div class="cbp-caption">
                            <img class="rounded" src="assets/yeezy.jpg" alt="Image Description">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="stickyBlockStartPoint" class="col-lg-5">
                      <div class="js-sticky-block pl-lg-4"
                          data-sticky-view="lg"
                          data-start-point="#stickyBlockStartPoint"
                          data-end-point="#stickyBlockEndPoint"
                          data-offset-top="80"
                          data-offset-bottom="130">
                        <div class="mb-6">
                          </br>
                          <h1 class="h4 text-primary-55 font-weight-bold">YEEZY Token</h1>
                          <p class="mb-0">The YEEZY Token is an asset backed token supported by YEEZY 350 sneakers. Each token represents a fraction of the asset package. When you obtain sufficient tokens, you can redeem authentic Yeezy sneaker.</p>
                        </div>

                        <hr class="my-5">

                        <ul class="list-unstyled mb-0">
                          <li  class="media mb-1">
                            <div class="d-flex w-40 w-sm-30">
                              <h3 style="margin-top:4px;box-sizing: border-box;" class="h6 w-100">Authenticated by:</h3>
                            </div>
                            <div class="media-body">
                              <small class="text-muted pl-4">
                                <a href="https://chdaniel.com/" target="_new">LEGIT CHECK</a> 
                              </small>
                            </div>
                          </li>

                          <li class="media mb-1">
                            <div class="d-flex w-40 w-sm-30">
                              <h4 style="margin-top: 4px;box-sizing: border-box;" class="h6">Custody</h4>
                            </div>
                            <div class="media-body">
                              <small class="text-muted pl-4">
                                  DAOTrust
                              </small>
                            </div>
                          </li>


                          <li class="media">
                            <div class="d-flex w-40 w-sm-30">
                              <h4 class="h6">Redemption</h4>
                            </div>
                            <div class="media-body">
                              <small class="d-block text-muted mb-1 pl-4">
                                Supported
                              </small>
                            </div>
                          </li>
                          
                        </ul>

                        <hr class="my-5">

                       
                          <button data-v-de088f66="" type="button" class="btn btn-xs btn-secondary u-btn-secondary u-btn-wide transition-3d-hover text-left mb-2"><span><span data-v-de088f66="" class="d-flex mr-3"><span data-v-de088f66=""></span></span><span data-v-de088f66="" class="media-body"><span data-v-de088f66="" class="d-block">coming soon</span><strong data-v-de088f66="" class="font-size-14">Buy YEEZY Tokens</strong></span></span></button>
                          <br>

                          <a :href="yeezyCommunityURL" target="_blank">
                          <button type="button" class="btn btn-xs btn-primary u-btn-primary u-btn-wide transition-3d-hover text-left mb-2">
                            <span class="media align-items-center">
                              <span class="media-body">
                                <span class="d-block"></span>
                                <strong class="font-size-14">Go to YEEZY Community</strong>
                              </span>
                            </span>
                          </button>
                          </a>
                          <br>
                          <button type="button" @click="$router.push('/tokenizeyeezy')" class="btn btn-xs btn-primary u-btn-primary u-btn-wide transition-3d-hover text-left mb-2">
                            <span class="media align-items-center">
                              <span class="media-body">
                                <span class="d-block"></span>
                                <strong class="font-size-14">Tokenize Your YEEZY Sneaker</strong>
                              </span>
                            </span>
                          </button>
                                   <br>     
                          <button data-v-de088f66="" type="button" class="btn btn-xs btn-secondary u-btn-secondary u-btn-wide transition-3d-hover text-left mb-2"><span><span data-v-de088f66="" class="d-flex mr-3"><span data-v-de088f66=""></span></span><span data-v-de088f66="" class="media-body"><span data-v-de088f66="" class="d-block">coming soon</span><strong data-v-de088f66="" class="font-size-14">Redeem YEEZY Sneaker with Tokens</strong></span></span></button>
                          
                      </div>
                    </div>
                  </div>
                </div> -->
            <!-- yezi end -->
          <!-- ATO -->
          <div class="container u-space-3" id="atoRow">
            <div class="row justify-content-lg-between align-items-lg-center">
              <div class="col-lg-5 order-lg-2 mb-9 mb-lg-0">
                <!-- Description -->
                <h2 class="font-weight-medium">Asset Token Onboarding</h2>
                <p>55 has designed and implemented a new generation of issuance and supervision mechanisms known as the Asset Token Onboarding (ATO). ATO is designed to protect the investor’s right to know and will be applied throughout the whole lifecycle of a token from listing to delisting. </p >
                <!-- End Description -->

                <!-- List -->
                <ul class="list-unstyled text-secondary">
                  <li class="media my-3">
                    <div class="d-flex mt-1 mr-2">
                      <span class="fa fa-check text-success"></span>
                    </div>
                    <div class="media-body">
                      A stack of tokenization utilities  
                    </div>
                  </li>
                  <li class="media my-3">
                    <div class="d-flex mt-1 mr-2">
                      <span class="fa fa-check text-success"></span>
                    </div>
                    <div class="media-body">
                      Local marketing team to bring your product to market
                    </div>
                  </li>
                  <li class="media my-3">
                    <div class="d-flex mt-1 mr-2">
                      <span class="fa fa-check text-success"></span>
                    </div>
                    <div class="media-body">
                      Token can be listed only if oversubscribed by 2.5 times during pre-sale.
                    </div>
                  </li>
                </ul>
                <!-- End List -->
                </br>
                For ATO, please send email to 
                <a  href="mailto:ato@55.com">
                            <Icon class="email-icon" type="ios-mail-outline" />
                            ato@55.com
                        </a>
              </div>

              <div class="col-lg-7 order-lg-1">

                <div class="text-center" >
                  <img src="assets/25_1.png" style="width:100%;height:100%" alt="">
                </div>

              </div>
            </div>
          </div>
        <!-- End ATO -->   
            <!-- supreme start -->
            <div class="u-gradient-half-warning-v3" style="background-image: url(/assets/svg/supreme/supreme.jpg); background-repeat:repeat-y;background-size: 100%,100%;">
                <div class="container u-space-2">
                  <div class="col-md-12 col-lg-12 col-xl-12">
                    <div class="text-center mb-4">
                      <h2 class="h1 text-white font-weight-normal">Upcoming ATO - Supreme Token <img class="img-fluid" src="/assets/svg/supreme/supremelogo.png" alt="Image Description" width="12%"></h2>
                      <p class="lead u-text-light">Buy Supreme tokens through ATO and using tokens to redeem 100% authentic Supreme product at original retail price.</p>
                    </div>
                  </div>
                <br>
              <div class="row justify-content-md-between">
                <!-- Item Image -->
                <div class="col-md-6 mb-7 mb-md-0">
                  <div class="js-slick-carousel u-slick"
                      data-infinite="true"
                      data-arrows-classes="u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                      data-arrow-left-classes="fa fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left"
                      data-arrow-right-classes="fa fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right"
                      data-pagi-classes="text-center u-slick__pagination u-slick__pagination--white mt-7 mb-0">
                    <div class="js-slide px-7 my-4">
                      <img class="img-fluid" src="/assets/svg/supreme/img6.png" alt="Image Description">
                    </div>
                    <div class="js-slide px-7 my-4">
                      <img class="img-fluid" src="/assets/svg/supreme/img7.png" alt="Image Description">
                    </div>
                  </div>
                </div>
                <!-- End Item Image -->

                <!-- Content -->
                <div class="col-md-5">
                  <div class="mb-5">
                    <h3 class="text-white font-weight-normal">Supreme Swarovski Box Logo Hooded Sweatshirt</h3>
                    </br>
                    <span class="d-block h6 text-white mb-2">Original Retail Price：$598</span>
                    <span class="d-block h6 text-white mb-2">Market Price：$1403 - Price Quote from StockX</span>
                    <span class="d-block h6 text-white mb-2">Tokens Required for Redemption：59800 Tokens/Hoodie</span>
                    <span class="d-block h6 text-white mb-2">ATO Token Price：$0.01</span>
                    <span class="d-block h6 text-white mb-2">Total ATO Sales Amount：598,000 Supreme Tokens</span>
                    <span class="d-block h6 text-white mb-2">ATO Starts in：
                         <!-- Countdown -->
                        <div class="js-countdown row mb-5"
                            data-end-date="2019/05/21 13:00:00"
                            data-month-format="%m"
                            data-days-format="%D"
                            data-hours-format="%H"
                            data-minutes-format="%M"
                            data-seconds-format="%S"
                            style="padding-top:20px">
                          <div  style="background:#d93649;margin-left:15px">
                            <strong class="js-cd-days h3 text-white font-weight-bold mb-0"></strong>
                            <span class="h5 font-weight-normal mb-0">Days</span>
                          </div>
                          <div style="background:#d93649;margin-left:15px">
                            <strong class="js-cd-hours h3 text-white font-weight-bold mb-0"></strong>
                            <span class="h5 font-weight-normal mb-0">Hours</span>
                          </div>
                          <div style="background:#d93649;margin-left:15px">
                            <strong class="js-cd-minutes h3 text-white font-weight-bold mb-0"></strong>
                            <span class="h5 font-weight-normal mb-0">Mins</span>
                          </div>
                          <div style="background:#d93649;margin-left:15px">
                            <strong class="js-cd-seconds h3 text-white font-weight-bold mb-0"></strong>
                            <span class="h5 font-weight-normal mb-0">Secs</span>
                          </div>
                        </div>
                        <!-- End Countdown -->
                    </span>
                  </div>

                  <button type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">Open on 21st May 13:00 (UTC+8)</span><strong data-v-d1e1e420="" class="font-size-14">Buy Supreme Token through ATO</strong></span></span></button>&
                  <router-link to="/identiy">
                    <button type="button" class="btn btn-xs btn-dark u-btn-dark u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">KYC before ATO</span><strong data-v-d1e1e420="" class="font-size-14">ID Verification Now</strong></span></span></button>
                  </router-link>
                  <a :href="supremeURL" target="_blank"><button type="button" class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"><span data-v-d1e1e420="" class="media align-items-center"><span data-v-d1e1e420="" class="media-body"><span data-v-d1e1e420="" class="d-block">Know more about Supreme</span><strong data-v-d1e1e420="" class="font-size-14">Join Supreme Community</strong></span></span></button></a>
                </div>
                <!-- End Content -->
              </div>
             </div>
           </div>
            <!-- supreme end -->

            <!-- Front in Frames Section -->
           <div style="background:#f6f9fc" id="55card">
                <div class="container u-space-3 " >
                  <div class="row justify-content-between align-items-center">
                    <div class="col-lg-5 mb-7 mb-lg-0">
                      <div class="pr-md-4">
                        <!-- Title -->
                        <div class="mb-7">
                          
                          <h2 class="text-primary">55 <span class="font-weight-bold">VISA Debit Card</span></h2>
                          
                          <p>Seamlessly integrated with 55 GBBO, your cryptocurrencies can be converted to fiat currency almost in real time. 55, in collaboratin with VISA and major payment service providers worldwide, allows you to pay at millions of storefront or POS terminals.</p >
                        </div>
                        <!-- End Title -->
                        
                        <button type="button" @click="$router.push('/card')" class="btn btn-xs btn-dark u-btn-dark u-btn-wide transition-3d-hover text-left mb-2">
                            <span class="media align-items-center">
                              <span class="d-flex mr-3">
                                <span class="fab fa-cc-visa font-size-26"></span>
                              </span>
                              <span class="media-body">
                                <span class="d-block">Pre-order Now</span>
                                <strong class="font-size-14">55 Visa Debit Card</strong>
                              </span>
                            </span>
                          </button>
                      </div>
                    </div>

                    <div class="col-lg-6 position-relative">
                      <!-- Image Gallery -->
                      <div class="row mx-gutters-2">
                        <div class="col-5 align-self-end px-2 mb-3">
                          <!-- Fancybox -->
                          <a>
                            <img class="img-fluid rounded" src="assets/svg/bg/topleft.jpg" alt="Image Description">


                          </a >
                          <!-- End Fancybox -->
                        </div>

                        <div class="col-7 px-2 mb-3">
                          <!-- Fancybox -->
                          <a>
                            <img class="img-fluid rounded" src="assets/svg/bg/topright.jpeg" alt="Image Description">


                          </a >
                          <!-- End Fancybox -->
                        </div>

                        <div class="col-5 offset-1 px-2 mb-3">
                          <!-- Fancybox -->
                          <a>
                            <img class="img-fluid rounded" src="assets/svg/bg/bottomleft.jpg" alt="Image Description">


                          </a >
                          <!-- End Fancybox -->
                        </div>

                        <div class="col-5 px-2 mb-3">
                          <!-- Fancybox -->
                          <a>
                            <img class="img-fluid rounded" src="assets/svg/bg/bottomright.jpg" alt="Image Description">

                          </a >
                          <!-- End Fancybox -->
                        </div>
                      </div>
                      <!-- End Image Gallery -->

                      <!-- SVG Background Shape -->
                      <figure class="w-100 u-content-centered-y z-index-minus-1">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 1109.8 797.1" style="enable-background:new 0 0 1109.8 797.1;" xml:space="preserve">
                          <path class="u-fill-primary" opacity=".05" d="M105.1,267.1C35.5,331.5-3.5,423,0.3,517.7c5.8,145.3,110.7,314.2,588,273.1c753-64.7,481.3-358.3,440.4-398.3
                            c-4-3.9-7.9-7.9-11.7-12L761.9,104.8C639.4-27.6,432.5-35.6,299.9,87L105.1,267.1z"/>
                        </svg>
                      </figure>
                      <!-- End SVG Background Shape -->
                    </div>
                  </div>
                </div>
            </div>
            <!-- End Front in Frames Section -->

            <!-- Subscribe Section transfer 国际汇款-->
                <div class="position-relative u-gradient-half-primary-v1 u-space-3-top u-space-3-bottom" style="background-image: url(assets/svg/bg/transfer_bg.jpg);" >
                  <div class="container">
                    <div class="row justify-content-md-center">
                      <div class="col-md-12 col-lg-12 col-xl-12">
                        <!-- Title -->
                        <div class="text-center mb-4">
                          <h2 class="h1 text-white font-weight-normal">Transfer Bitcoin to a bank account with no hassle</h2>
                          <p class="lead u-text-light">You can now convert your BTC or other major cryptocurrencies to fiat and send to a bank account with a few clicks.</p>
                        </div>
                        <!-- End Title -->

                       
                      </div>

                      <div class="col-xl-2 d-none d-xl-inline-block mt-auto mb-7">
                        <div class="position-relative p-3">
                          <!-- <p class="small u-text-light mb-0">Be the lucky user to earn <span class="text-white font-weight-bold">$1000</span> bonus now!</p> -->

                          <!-- SVG Shape -->
                          <!-- <figure class="position-absolute-top-0">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 254 204.2" style="enable-background:new 0 0 254 204.2;" xml:space="preserve">
                              <path class="u-fill-none u-stroke-white" opacity=".5" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="10" d="M0.5,171V6.5c0-3.3,3.3-6,7.3-6h238.6c3.9,0,7.1,2.6,7.1,5.8v164c0,3.6-3.5,6.5-7.9,6.5H61.4
                                c-3,0-5.6,1.4-6.8,3.7l-22,22.6l-0.2-22.4c-1.1-2.3-3.8-3.9-6.8-3.9H7.6C3.7,176.8,0.5,174.2,0.5,171z"/>
                            </svg>
                          </figure> -->
                          <!-- End SVG Shape -->
                        </div>
                      </div>
                    </div>
                     <!-- Form -->
                        <form class="js-validate js-form-message mb-2">
                          <div class="js-focus-state input-group input-group-lg u-form u-form--lg u-form--white-brd">
                            <div class="row align-items-md-center u-space-1 m-auto">
                                <div class="col-lg-4 mb-4 mb-lg-0">
                                  <form class="js-focus-state input-group u-form">
                                    <div class="input-group-prepend u-form__prepend">
                                    <span class="input-group-text u-form__text">
                                      I want to withdraw 
                                    </span>
                                    </div>
                                    <input v-model="body_count" type="search" class="form-control u-form__input" placeholder="" aria-label="">
                                  </form>
                                </div>

                                <div class="col-sm-6 col-lg-2 mb-4 mb-lg-0">
                                  <select class="custom-select" v-model="body_coin">
                                    <option value="BTC">BTC</option>
                                    <option value="ETH">ETH</option>
                                  </select>
                                </div>
                                <span class=" text-white">to</span>
                                <div class="col-sm-6 col-lg-3 mb-4 mb-lg-0">
                                  <select class="custom-select" v-model="body_account">
                                    <option value="Bank" >Bank Account</option>
                                    <option value="more to come">more to come</option>
                                  </select>
                                </div>
                                 <!-- End Language -->
                                <div class="input-group-append u-form__append">
                                  <div  class="btn btn-warning u-btn-wide" @click="transfer">Withdraw Now</div>
                                </div>
                              </div>
                           
                          </div>
                        </form>
                        <!-- End Form -->
                  </div>

               
                </div>
            <!-- End Subscribe Section -->

               

            <!-- Blog Grid Section Read our news & -->
                <div class="u-bg-light-blue-50">
                    <div class="container u-space-3">
                        <!-- Title -->
                        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
                        <h2 class="text-primary-55">Read our <span class="font-weight-bold">news &amp; blogs</span></h2>
                        <!-- <p>Our duty towards you is to share our experience we're reaching in our work path with you.</p> -->
                        </br>
                        </div>
                        <!-- End Title -->

                        <!-- News Carousel -->
                        <div class="js-slick-carousel u-slick u-slick--equal-height u-slick--gutters-2"
                            data-slides-show="4"
                            data-slides-scroll="1"
                            data-pagi-classes="text-center u-slick__pagination mt-7 mb-0"
                            data-responsive='[{
                            "breakpoint": 1200,
                            "settings": {
                                "slidesToShow": 3
                            }
                            }, {
                            "breakpoint": 992,
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
                              <!-- Blog Grid -->
                              <div class="js-slide d-flex align-items-start flex-column w-100 bg-white rounded p-5">
                                  <!-- Info -->
                                  <h3 class="h5">
                                    <a href="#">A Letter from David Weild  </a>
                                  </h3>
                                  <!-- <p>GBBO 101?</p> -->
                                  <p>55 aims to reshape the way that purchases and sales of assets are conducted using blockchain technology.</p>
                                  <!-- End Info -->

                                  <div class="w-100 mt-auto">
                                  <hr>
                                  <!-- Author -->
                                  <div class="media">
                                      <div class="d-flex mr-3">
                                      <img class="img-fluid u-sm-avatar rounded-circle" src="assets/img/100x100/1.png" alt="Image Description">
                                      </div>
                                      <div class="media-body">
                                      <h4 class="d-inline-block mb-0">
                                          <a class="d-block font-size-13" href="javascrip:;">David Weild</a>
                                      </h4>
                                      </div>
                                  </div>
                                  <!-- End Author -->
                                  </div>
                              </div>
                              <!-- End Blog Grid -->

                              <!-- Blog Grid -->
                              <div class="js-slide d-flex align-items-start flex-column w-100 bg-white rounded p-5">
                                  <!-- Info -->
                                  <h3 class="h5">
                                    <a href="#">Connect people in crypto world!</a>
                                  </h3>
                                  <!-- <p>GBBO 101?</p> -->
                                  <p>55 Social is a built-in social trading platform that will change the landscape of the trading world.</p>
                                  <!-- End Info -->

                                  <div class="w-100 mt-auto">
                                  <hr>
                                  <!-- Author -->
                                  <div class="media">
                                      <div class="d-flex mr-3">
                                      <img class="img-fluid u-sm-avatar rounded-circle" src="assets/img/100x100/img3.jpg" alt="Image Description">
                                      </div>
                                      <div class="media-body">
                                      <h4 class="d-inline-block mb-0">
                                          <a class="d-block font-size-13" href="javascrip:;">Logan Schauer</a>
                                      </h4>
                                      </div>
                                  </div>
                                  <!-- End Author -->
                                  </div>
                              </div>
                              <!-- End Blog Grid -->

                              <!-- Blog Grid -->
                              <div class="js-slide d-flex align-items-start flex-column w-100 bg-white rounded p-5">
                                  <!-- Info -->
                                  <h3 class="h5">
                                  <a href="#">Why ATO Protocol？</a>
                                  </h3>
                                  <p>The widespread problem with many ICOs at the time and the following year was that  many were riddled with fraudulent activity</p>
                                  <!-- End Info -->

                                  <div class="w-100 mt-auto">
                                  <hr>
                                  <!-- Author -->
                                  <div class="media">
                                      <div class="d-flex mr-3">
                                      <img class="img-fluid u-sm-avatar rounded-circle" src="assets/img/100x100/2.png" alt="Image Description">
                                      </div>
                                      <div class="media-body">
                                      <h4 class="d-inline-block mb-0">
                                          <a class="d-block font-size-13" href="javascrip:;">Lisa Loud</a>
                                      </h4>
                                      </div>
                                  </div>
                                  <!-- End Author -->
                                  </div>
                              </div>
                              <!-- End Blog Grid -->

                              <!-- Blog Grid -->
                              <div class="js-slide d-flex align-items-start flex-column w-100 bg-white rounded p-5">
                                  <!-- Info -->
                                  <h3 class="h5">
                                  <a href="#">One stop for global best price</a>
                                  </h3>
                                  <p>An essential aspect of what makes our network specialized is perhaps one of our greatest pillars GBBO</p>
                                  <!-- End Info -->

                                  <div class="w-100 mt-auto">
                                  <hr>
                                  <!-- Author -->
                                  <div class="media">
                                      <div class="d-flex mr-3">
                                      <img class="img-fluid u-sm-avatar rounded-circle" src="assets/img/100x100/3.png" alt="Image Description">
                                      </div>
                                      <div class="media-body">
                                      <h4 class="d-inline-block mb-0">
                                          <a class="d-block font-size-13" href="javascrip:;">Ashu Swami</a>
                                      </h4>
                                      </div>
                                  </div>
                                  <!-- End Author -->
                                  </div>
                              </div>
                              <!-- End Blog Grid -->
                        </div>
                        <!-- End News Carousel -->
                    </div>
                </div>
            <!-- End Blog Grid Section -->

            <!-- Team Section 高管团队 -->
                    <div class="container u-space-3">
                        <!-- Title -->
                        <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
                            <h2 class="text-primary-55">Management Team</h2>
                            <p></p>
                            </br>
                            </br>
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
                                <div class="row pb-6">
                                    <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                    <h3 class="h5 mb-4">David Weild</h3>
                                    <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">Co-Chairman</span>
                                    <p class="font-size-14">David is a former Vice Chairman of Nasdaq. He priced over 1,000 equity offerings as head of a Top 10 investment bank and is renowned for his thought leadership that led him to be called the “Father of the JOBS Act.” </p>
                                    </div>
                                    <div class="col-sm-6">
                                      <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_1.jpg" alt="Image Description">
                                    </div>
                                </div>
                            <!-- End Team -->
                            </div>
                             <div class="js-slide px-3">
                            <!-- Team -->
                            <div class="row">
                                <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                <h3 class="h5 mb-4">Darren Sandler</h3>
                                <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3" style="text-align:left">Chief Compliance Officer </br></br> General Counsel</span>
                                <p class="font-size-14">Darren is Chief Compliance Officer and General Counsel. Previously, Darren was an attorney at Kirkland & Ellis LLP and Schulte Roth & Zabel LLP. While at Kirkland and Ellis, Darren led the firm's first blockchain client matter.</p>

                                </div>
                                <div class="col-sm-6">
                                <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_4.jpg" alt="Image Description">
                                </div>
                            </div>
                            <!-- End Team -->
                            </div>
                              
                              <div class="js-slide px-3">
                            <!-- Team -->
                            <div class="row">
                                <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                <h3 class="h5 mb-4">Ashu Swami</h3>
                                <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">CEO of 55 Pro</span>
                                <p class="font-size-14">Ashu is the CEO of 55 Pro. Previously, Ashu headed a SPV of Quadeye Securities which pioneered and traded Mining Swaps, operated cloud mining datacenters, and managed a mining investment fund. </p>

                                </div>
                                <div class="col-sm-6">
                                <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_3.jpg" alt="Image Description">
                                </div>
                            </div>
                            <!-- End Team -->
                            </div>
                            <div class="js-slide px-3">
                            <!-- Team -->
                                <div class="row pb-6">
                                    <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                    <h3 class="h5 mb-4">Simon Grunfeld</h3>
                                    <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">SVP of Operations</span>
                                    <p class="font-size-14">Simon's professional background is mostly from the retail FX and IT solutions marketplace. Simon has a solid background of the inner workings of the capital markets, which came by way of the fintech experience he developed over the years.</p>
                                    </div>
                                    <div class="col-sm-6">
                                      <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_9.jpg" alt="Image Description">
                                    </div>
                                </div>
                            <!-- End Team -->
                            </div>

                            <div class="js-slide px-3">
                            <!-- Team -->
                            <div class="row">
                                <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                <h3 class="h5 mb-4">Lisa Loud	</h3>
                                <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">SVP of Business Development</span>
                                <p class="font-size-14">Lisa Loud has joined 55 as SVP of Business Development. Lisa led strategy at BitMEX from 2017, and during her tenure, the exchange volume reached the largest crypto volume worldwide in early 2018. </p>
                                </div>
                                <div class="col-sm-6">
                                <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_2.jpg" alt="Image Description">
                                </div>
                            </div>
                            <!-- End Team -->
                            </div>

                            <div class="js-slide px-3">
                            <!-- Team -->
                                <div class="row pb-6">
                                    <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                    <h3 class="h5 mb-4">Logan Schauer</h3>
                                    <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">VP of Marketing</span>
                                    <p class="font-size-14">Logan is the Vice President of Global Marketing at 55. Logan joins 55 from Crypto Media Group, where he was the CEO. Crypto Media Group was a marketing firm providing blockchain visionaries with access to fintech marketing specialists.</p>
                                    </div>
                                    <div class="col-sm-6">
                                      <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_5.jpg" alt="Image Description">
                                    </div>
                                </div>
                            <!-- End Team -->
                            </div>

                            <div class="js-slide px-3">
                            <!-- Team -->
                                <div class="row pb-6">
                                    <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                    <h3 class="h5 mb-4">Danielle Frizziola</h3>
                                    <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">VP of Human Resources</span>
                                    <p class="font-size-14">Danielle Frizziola is a seasoned Human Resources and Recruiting Executive specializing in emerging technology and creative spaces. She is a mentor to HR professionals worldwide.</p>
                                    </div>
                                    <div class="col-sm-6">
                                      <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_6.jpg" alt="Image Description">
                                    </div>
                                </div>
                            <!-- End Team -->
                            </div>


                            <div class="js-slide px-3">
                            <!-- Team -->
                                <div class="row pb-6">
                                    <div class="col-sm-6 d-sm-flex align-items-sm-start flex-sm-column text-center text-sm-left mb-7 mb-sm-0">
                                    <h3 class="h5 mb-4">Geoff Shearer</h3>
                                    <span class="badge u-badge-primary badge-pill u-badge-bigger mb-3">Director of Global Marketing</span>
                                    <p class="font-size-14">Geoff comes to 55 as the Director of Global Marketing and Community. Geoff joins 55 from Crypto Media Group where he oversaw business operations, strategy, and development as Chief Operating Officer.</p>
                                    </div>
                                    <div class="col-sm-6">
                                      <img class="img-fluid rounded mx-auto" src="assets/svg/bg/leader_8.jpg" alt="Image Description">
                                    </div>
                                </div>
                            <!-- End Team -->
                            </div>

                        </div>
                        <!-- End Slick Carousel -->
                    </div>
            <!-- End Team Section -->

            <!-- Features Section 下载APP -->
                <div style="background:#f6f9fc">
                    <div class="position-relative u-space-3 u-space-4--lg">
                    <!-- SVG Image Gradient -->
                      <div class="col-lg-6 u-content-centered-y--lg">
                        

                        <!-- SVG Phone Mockup -->
                        <figure class="u-devices-v3">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 317.5 665" style="enable-background:new 0 0 317.5 665;" xml:space="preserve">
                            <path class="u-fill-white" d="M263,666H54c-29.7,0-54-24.3-54-54V55C0,25.3,24.3,1,54,1h209c29.7,0,54,24.3,54,54v557
                              C317,641.7,292.7,666,263,666z"></path>
                            <circle class="u-fill-gray-75" cx="159.5" cy="619.5" r="25.5"></circle>
                            <path class="u-fill-gray-75" fill-rule="evenodd" clip-rule="evenodd" d="M180,52h-42c-2.2,0-4-1.8-4-4v0c0-2.2,1.8-4,4-4h42c2.2,0,4,1.8,4,4v0C184,50.2,182.2,52,180,52z"></path>
                            <g>
                              <defs>
                                <rect id="phoneFrameID1" x="19.4" y="81.3" width="280" height="500"></rect>
                              </defs>
                              <clipPath id="phoneFrameID2">
                                <use xlink:href="#phoneFrameID1" style="overflow:visible;"></use>
                              </clipPath>
                              <g style="clip-path:url(#phoneFrameID2);">
                                <!-- Apply your (282px width to 500px height) image here -->
                                <image style="overflow:visible;" width="282" height="500" xlink:href="assets/app@2x.png" transform="matrix(1 0 0 1 18 81)"></image>
                              </g>
                              <use class="u-fill-none u-stroke-light-blue-125" xlink:href="#phoneFrameID1" stroke-miterlimit="10" style="overflow: visible;"></use>
                            </g>
                          </svg>
                        </figure>
                        <!-- End SVG Phone Mockup -->
                      </div>

                      <div class="container">
                        <div class="row justify-content-lg-end">
                          <div class="col-lg-5">
                            <!-- Title -->
                            <div class="pl-lg-4">
                              <div class="mb-5">
                                <h2 class="font-weight-medium">We put power in your hands!</h2>
                                <p>
                                  All your tokenized assets in one place</br>
                                  Clear overview of all markets live data</br>
                                  Secure, Fast, and Seamless integration with 55.com
                                </p>
                              </div>

                              <!-- Button -->
                              <!-- <button type="button" class="btn btn-xs  btn-dark u-btn-dark u-btn-wide transition-3d-hover text-left mb-2 mr-sm-1">
                                <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182" target="_new" class=" text-white">
                                  <span class="media align-items-center">
                                    <span class="d-flex mr-3">
                                      <span class="fab fa-apple font-size-26"></span>
                                    </span>
                                    <span class="media-body">
                                      <span class="d-block">Download on the</span>
                                      <strong class="font-size-14">App Store</strong>
                                    </span>
                                  </span>
                                </a>
                              </button> -->
                              <!-- End Button -->
                              <button data-v-2e45a3aa="" type="button" class="btn btn-xs  btn-secondary u-btn-secondary u-btn-wide transition-3d-hover text-left mb-2 mr-sm-1"><a data-v-2e45a3aa="" href="javascript:;" target="_new" class=" text-white"><span data-v-2e45a3aa="" class="media align-items-center"><span data-v-2e45a3aa="" class="d-flex mr-3"><span data-v-2e45a3aa="" class="fab fa-apple font-size-26"></span></span><span data-v-2e45a3aa="" class="media-body"><span data-v-2e45a3aa="" class="d-block">Coming soon
                              </span><strong data-v-2e45a3aa="" class="font-size-14">App Store</strong></span></span></a ></button>

                              <!-- Button -->
                              <button type="button" class="btn btn-xs btn-dark u-btn-dark u-btn-wide transition-3d-hover text-left mb-2">
                                <a href="https://play.google.com/store/apps/details?id=com.globalmarkets55.us.ex55.app" target="_new" class="text-white">
                                  <span class="media align-items-center">
                                    <span class="d-flex mr-3">
                                      <span class="fab fa-google-play font-size-26"></span>
                                    </span>
                                    <span class="media-body">
                                      <span class="d-block">Get it on</span>
                                      <strong class="font-size-14">Google Play</strong>
                                    </span>
                                  </span>
                                </a>
                              </button>
                              <!-- End Button -->
                            </div>
                            <!-- End Title -->
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            <!-- End Features Section -->
            <!-- Clients Section -->
                <div class="container u-space-2">
                      <div class="title" style="text-align:center;font-size:22px;color:#12869a !important;padding:22px">Partners</div>

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
                      <img class="u-clients" src="assets/svg/logos/parnter/partner-logo4.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="../../../assets/images/fenwick_logo.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="assets/svg/logos/parnter/partner-logo3.png" alt="Image Description">
                    </div>
                    <!-- <div class="js-slide">
                      <img class="u-clients" src="assets/svg/logos/parnter/partner-logo4.png" alt="Image Description">
                    </div> -->
                  </div>
                </div>
            <!-- End Clients Section -->
        </main>
        <!-- ========== END MAIN ========== -->
        <!-- ========== FOOTER ========== -->
              <!-- <Footer/>        -->
        <!-- ========== END FOOTER ========== -->
        <!-- Go to Top -->
            <a class="js-go-to u-go-to" href="#"
              data-position='{"bottom": 15, "right": 15 }'
              data-type="fixed"
              data-offset-top="400"
              data-compensation="#header"
              data-show-effect="slideInUp"
              data-hide-effect="slideOutDown">
              <span class="fa fa-arrow-up u-go-to__inner"></span>
            </a>
        <!-- End Go to Top -->
    </div>
</template>

<script>
    import Footer from '../../../components/common/US-Footer'
    import USHeader from '../../../components/common/US-Header'
    import SockJS from  'sockjs-client';  
    import  Stomp from 'stompjs';
    import {getRealtimeList} from '../../../../api/balances'
    import {getCommouityBaseURL} from '../../../config/index'
    import {postHeaderTokenBodyApi} from '_api/axios'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
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
              DASHBTC:{},
              DASHBTCArray:[],
              DASHBTCWaveArray:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
              LoganURL:'',
              GeoffURL:'',
              supremeURL:'',
              loginToken:Cookies.get('loginToken'),
              chatToken:'',
            }
        },
        components:{
            Footer,
            USHeader
        },
        methods: {
            join55() {
                this.$router.push({
                    path:'register',
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
                      this.JasonURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wj6g6b')
                      this.LoganURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/w8sswa')
                      this.GeoffURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/gfs9968')
                  })
                }else{
                      this.chatToken = 'null/'
                      //社区链接
                      this.siteCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/967250642861035532/feed')
                      this.ethCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252480964431879/feed')
                      this.btcCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/' +this.chatToken+encodeURIComponent('/groups/profile/967252342116192258/feed')
                      this.yeezyCommunityURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/968138529123078148/feed')
                      this.supremeURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/groups/profile/973135123669061637/feed')
                      this.LisaURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/w8sswa')
                      this.LisaURL = getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wj73vs')
                      this.JasonURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/wj6g6b')
                      this.LoganURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/w8sswa')
                      this.GeoffURL= getCommouityBaseURL()+'api/v1/memberinterface/'+this.chatToken+encodeURIComponent('/gfs9968')
                }
            },
            transfer(){
                this.$router.push({
                    path:'interFinanceOne',
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
              console.log(domain)
              if(domain.startsWith('www.') || domain.startsWith('us.')){
                let socket = new SockJS('https://'+ domain +'/xchange/marketdata');
                this.stompClient = Stomp.over(socket);
                this.stompClient.debug = null
              }else {
                let socket = new SockJS('https://www.55.com/xchange/marketdata');
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
                  this.stompClient.subscribe('/topic/bbo/DASHBTC',(data) => {
                    this.saveExchangeData('DASHBTC',data)
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
              const {HUOBI,BITREX,E55,BINANCE,COINBASEPRO} = JSON.parse(data.body).providerBBOMap
              this.getExchangeData(HUOBI,'HUOBI',type)
              this.getExchangeData(BITREX,'BITREX',type)
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
            }
        },
        
        beforeMount(){
           
        },
        
        mounted(){
              // initialization of HSMegaMenu component
                $('.js-mega-menu').HSMegaMenu({
                    event: 'hover',
                    pageContainer: $('.container'),
                    breakpoint: 768,
                    hideTimeOut: 0
                });
                 
            // initialization of header
                $.HSCore.components.HSHeader.init($('#header'));

                // initialization of unfold component
                $.HSCore.components.HSUnfold.init($('[data-unfold-target]'));

                // initialization of fancybox
                $.HSCore.components.HSFancyBox.init('.js-fancybox');

                // initialization of slick carousel
                $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

                // initialization of form validation
                $.HSCore.components.HSValidation.init('.js-validate');

                // initialization of forms
                $.HSCore.helpers.HSFocusState.init();

                // initialization of cubeportfolio
                $.HSCore.components.HSCubeportfolio.init('.cbp');


                // initialization of countdowns
                var countdowns = $.HSCore.components.HSCountdown.init('.js-countdown', {
                  yearsElSelector: '.js-cd-years',
                  daysElSelector: '.js-cd-days',
                  hoursElSelector: '.js-cd-hours',
                  minutesElSelector: '.js-cd-minutes',
                  secondsElSelector: '.js-cd-seconds'
                });

                // initialization of sticky blocks
                setTimeout(function () {
                    $.HSCore.components.HSStickyBlock.init('.js-sticky-block');
                }, 300);

                // initialization of go to
                $.HSCore.components.HSGoTo.init('.js-go-to');
                //获得汇率
                getRealtimeList().then(data => this.USDTUSDD = data.find(item => item.symbol === 'USDTUSDD').last)
                getRealtimeList().then(data => this.ETHBTCRate = data.find(item => item.symbol === 'ETHBTC').last)
                
                this.initWebSocket()
                this.initURL()

        },
        beforeDestroy() {
          // 页面离开时断开连接,清除定时器
          this.disconnect();
          clearInterval(this.timer);
        },
        computed: {
         loginStatus() {
            return this.$store.state.app.isLogin;
         },
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
          DASHBTC(){
            this.gbboWave('DASHBTC')
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
  margin 70px auto 100px 
  overflow hidden
  display flex
  justify-content space-between
  .logo
    margin-top 94px
    .logo_item
      height 48px
      line-height 48px
      width 142px
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
