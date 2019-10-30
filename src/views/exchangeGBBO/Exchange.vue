<template>
   <div class="wrapper" id="exchange">
      <div class="exchange-container">
         <div class="content">
            <!-- 上部  左侧列表 K线 下单-->
            <div class="up">
               <!--左边币种信息-->
               <div class="aside">
                  <div class="aside-content">
                     <!-- 分站点 -->
                     <div class="siteBox">
                        <div class="siteName">
                           <span v-if="siteName === 'B'">{{$t('headerblockexchange')}}</span>
                           <!-- <span v-if="siteName == 'S'">{{$t('headerstockexchange')}}</span> -->
                           <!--<span v-if="siteName == 'F'">{{$t('headerfranceexchange')}}</span>-->
                           <span v-if="siteName == 'C'">{{$t('headercustomerexchange')}}</span>
                           <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
                           <ul @click="changeBoard">
                              <li data-site="BTC" siteName="B">{{$t('headerblockexchange')}}</li>
                              <!-- <li  data-site="USDT" siteName="S">{{$t('headerstockexchange')}}</li> -->
                              <!--<li data-site="USDD" siteName="F">{{$t('headerfranceexchange')}}</li>-->
                              <li data-site="USDT" siteName="C">{{$t('headercustomerexchange')}}</li>
                           </ul>
                        </div>
                        <div class="myCoin" @click="openMyCoin" :class="[isShowMainBoard? '' : 'markActive']">
                           <Icon type="md-star" size="16" style="margin-top:-4px"/>
                           {{$t('自选')}}
                        </div>
                     </div>
                     <div class="searchBox">
                        <Input v-model="searchCoin" clearable style="width: 100%">
                        <Icon color="#C2D8E8" type="ios-search" slot="prefix"/>
                        </Input>
                     </div>
                     <!-- 板块滑动选择 -->
                     <Carousel v-model="siteIndexNumber" :dots="'none'" :arrow="'never'" v-if="isShowMainBoard" id="ex-carousel">
                        <CarouselItem v-for="(siteItem, siteKey,siteIndex) in symbolListSelf" :key="siteIndex">
                           <Tabs :value="currentQuoteCoinName" size="small" :animated="false">
                              <TabPane v-for="(item, key,index) in siteItem" :key="index" :label="key" :name="key">
                                 <ul class="nav">
                                    <li>{{$t('bbjyChooseType')}}</li>
                                    <li>{{$t('bbjyChoosePrice')}}</li>
                                    <li>{{$t('bbjyChange')}}</li>
                                 </ul>
                                 <ul class="coinInfo">
                                    <li class="priceList" v-for="(v, key,index) in getFilterList(item)"
                                        @click="changeBaseAssetList(v)" :key="key">
                                       <div class="priceItme">
                                          <Icon type="md-star" color="#12869A" size="14" v-if="v.marked"
                                                @click.stop="addMarkCoin(v,key,false)"/>
                                          <Icon type="md-star" color="#374853" size="14" v-else
                                                @click.stop="addMarkCoin(v,key,true)"/>
                                          {{v.baseAsset}}
                                          <!-- <i class="gbbo-img" v-if="v.symbol==='BTCUSDD'&&isGBBO"></i> -->
                                          <i class="gbbo-img" ></i>
                                       </div>
                                       <div class="priceItme">{{v.last?v.last:'--' | scientificToNumber}}</div>
                                       <div class="priceItme redText" v-if="v.showColor === -1">{{v.percent || '--'}}
                                       </div>
                                       <div class="priceItme greenText" v-else>{{v.showColor === 1?'+':''}}{{v.percent||
                                          '--'}}
                                       </div>
                                    </li>
                                 </ul>
                              </TabPane>
                           </Tabs>
                        </CarouselItem>
                     </Carousel>
                     <div class="markBox" v-else>
                        <ul class="nav">
                           <li>{{$t('bbjyChooseType')}}</li>
                           <li>{{$t('bbjyChoosePrice')}}</li>
                           <li>%</li>
                        </ul>
                        <ul class="coinInfo">
                           <li class="empty-mark" v-if="markSymbolArr.length == 0">
                              <div class="icon"></div>
                              {{$t('暂无记录')}}
                           </li>
                           <li v-else class="priceList" v-for="(v, key,index) in searchIn "
                               @click="changeBaseAssetList(v)" :key="key">
                              <div class="priceItme">
                                 <Icon type="md-star" color="#12869A" size="14"
                                       @click.stop="deleteMarkCoin(v,key,false)"/>
                                 {{v.baseAsset}}/{{v.quoteAsset}}
                              </div>
                              <div class="priceItme price-priceItme">{{v.last?v.last:'--' | scientificToNumber}}</div>
                              <div class="priceItme last-priceItme redText" v-if="v.showColor === -1">{{v.percent ||
                                 '--'}}
                              </div>
                              <div class="priceItme last-priceItme greenText" v-else>{{v.showColor ===
                                 1?'+':''}}{{v.percent|| '--'}}
                              </div>
                           </li>
                        </ul>
                        <!-- <div v-else class="mark-login">
                                    <div class="mark-login-text">登录后开启自选功能</div>
                                    <router-link to='/login'>{{$t('bbjyBuyLogin')}}</router-link>
                                </div> -->
                     </div>
                  </div>
               </div>
               <!--右边图表及交易与盘口信息-->
               <div class="content-right">

                  <div class="main">
                     <div class="page-content" :class="{main_mask:isShowMask}">
                        <div class="trading-chart">
                           <!--大盘信息-->
                           <div class="trading-box">
                              <Tooltip :content="$t('通证信息')" placement="top">
                                 <Icon type="ios-paper" class="stockpage" @click="gotoStockPage"
                                       v-if="isShowStockPage"/>
                              </Tooltip>
                              <!--大盘信息-->
                              <div class="trading-coin">
                                 <div class="coin-name">
                                    <span class="baseAsset">{{currentInfo.baseAsset}}/</span><span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
                                 </div>
                                 <div class="coin-price">
                                    <div class="current-price">{{currentInfo.last | scientificToNumber}}</div>
                                    <div class="currencyRate">≈ {{symbolCurrency | scientificToNumber}} {{currencyName}}
                                    </div>
                                 </div>
                              </div>
                              <ul class="price-list clearfix">
                                 <li>
                                    <div class="base">{{$t('bbjyChange')}}</div>
                                    <div v-if="currentInfo.showColor === -1" class="redText"> {{currentInfo.percent}}
                                    </div>
                                    <div v-else class="greenText"> {{currentInfo.showColor ===
                                       1?'+':''}}{{currentInfo.percent}}
                                    </div>
                                 </li>
                                 <li>
                                    <div class="base">{{$t('bbjyHourHigh')}}</div>
                                    <div class="numbers"> {{currentInfo.high | scientificToNumber}}</div>
                                 </li>
                                 <li>
                                    <div class="base">{{$t('bbjyHourLow')}}</div>
                                    <div class="numbers"> {{currentInfo.low | scientificToNumber}}</div>
                                 </li>
                                 <li>
                                    <div class="base">{{$t("bbjyHourVol")}}</div>
                                    <div class="numbers"> {{currentInfo.hour24Volume | scientificToNumber}}</div>
                                 </li>
                              </ul>
                              <div class="coin_link" v-if="isShowCoinLink">
                                 <a :href="coinInfoLink" target="_blank"></a>
                              </div>
                           </div>
                           <!--这里是图表, 高度不定-->
                           <div class="tvChartContainer">
                              <TVChartContainer :symbol="currentSymbol"/>
                           </div>
                        </div>

                        <div class="trade-wrap clearfix">

                           <!--左侧下单交易信息-->
                           <div class="trade-panel">
                              <!-- <div class="saleTitle">
                                           <span class="title">下单委托</span>
                                           <span v-if="FFDeductible == 1" class="discountText1">
                                               <i class="ffdiscountLogo_1 fficon"></i>
                                               <router-link to='/safeCenter'>{{$t('开启手续费折扣')}}</router-link>
                                           </span>
                                           <Tooltip :content="$t('FF余额低')" placement="top" >
                                               <span class="discountText2" v-if="FFDeductible == 2">
                                                   <i class="ffdiscountLogo_1 fficon"></i>
                                                   <router-link to='/safeCenter'>{{$t('手续费折扣中')}}</router-link>
                                               </span>
                                           </Tooltip>
                                           <Tooltip :content="$t('FF折扣中')" placement="top">
                                               <span class="discountText3" v-if="FFDeductible == 3">
                                                   <i class="ffdiscountLogo_1 fficon"></i>
                                                   <router-link to='/safeCenter'>{{$t('手续费折扣中')}}</router-link>
                                               </span>
                                           </Tooltip>
                                       </div> -->
                              <div class="inputOrderBox">
                                 <!--买入-->
                                 <div class="buy-panel buy-sell-common">
                                    <div class="available-container">
                                       <!-- 可用币种数量 -->
                                       <span>{{$t("bbjyBuyAvailable")}}</span>&nbsp;
                                       <span v-if="isLogin">{{quoteCoinAvailable | scientificToNumber}}</span>
                                       <span v-else>--</span>&nbsp;
                                       <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
                                    </div>
                                    <div v-if="isGBBO" class="gbboPrice">
                                       <span>{{$t('exchangeCheapest')}}</span>
                                       <span class="logobox">
                                                        <i :class="buy_exchange_logo"></i>
                                                        {{bestSellPrice}} {{currentInfo.quoteAsset}}
                                                    </span>
                                    </div>
                                    <div class="trade-msg">
                                       <div class="price-box">
                                          <div class="price-box-label">
                                             <div>{{$t("bbjyBuyPrice")}}</div>
                                             <div>{{$t("bbjyBuyAmount")}}</div>
                                          </div>
                                          <div class="input_container">
                                             <div class="inputbox">
                                                <input @input="handleBuyPriceInput" type="text" ref="buyInput"
                                                       maxlength="14" :class="{'input-empty-color':buyPriceEmpty}"
                                                       class="input-price" autocomplete="off" style="ime-mode:disabled"
                                                       ondragenter="return false">
                                                <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                                                <i v-if="isGBBO" :class="[buy_input_change?'gbbo_lock':'gbbo_unlock']"/>
                                                <div class="currencyInput" v-if="!isGBBO"> ≈ {{buyPriceCurrency |
                                                   scientificToNumber}} {{currencyName}}
                                                </div>
                                                <div class="currencyInput" v-else>
                                                   <span v-if="buy_input_change">limit price</span>
                                                   <div v-else>
                                                      {{$t('exchangeGBBORouter')}}
                                                      <!-- <Tooltip placement="top" :content="$t('exchangeGBBORouterDesc')">
                                                         <Icon type="md-help-circle"/>
                                                      </Tooltip> -->
                                                   </div>
                                                </div>
                                             </div>
                                             <div class="inputbox">
                                                <input @input="handleBuyCountInput" type="text" maxlength="14"
                                                       ref="buyCountInputRef"
                                                       :class="{'input-empty-color':buyCountEmpty}"
                                                       class="input-num" autocomplete="off" style="ime-mode:disabled"
                                                       ondragenter="return false">
                                                <div class="name-show baseAsset">{{currentInfo.baseAsset}}</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="range-box" id="range-box-buy">
                                          <Slider v-model="buyRangeValue" :tip-format="rangeFormat"
                                                  @on-change="changeBuyBall('',$event)"></Slider>
                                          <div class="range-ball" data-side="buy" :data="buyBallTotal"
                                               @click="changeBuyBall">
                                             <div class="ball" :class="buyRangeValue>0?'buy-ball-active':'buy-ball'"
                                                  style="left: 0;transform: translateX(0);"
                                                  data-num="0">
                                             </div>
                                             <div class="ball" :class="buyRangeValue>=25?'buy-ball-active':'buy-ball'"
                                                  style="left: 25%;transform: translateX(-25%);"
                                                  data-num="0.25">
                                             </div>
                                             <div class="ball" :class="buyRangeValue>=50?'buy-ball-active':'buy-ball'"
                                                  style="left: 50%;transform: translateX(-50%);"
                                                  data-num="0.5">
                                             </div>
                                             <div class="ball" :class="buyRangeValue>=75?'buy-ball-active':'buy-ball'"
                                                  style="left: 75%;transform: translateX(-75%);"
                                                  data-num="0.75">
                                             </div>
                                             <div class="ball" :class="buyRangeValue>=100?'buy-ball-active':'buy-ball'"
                                                  style="left: 100%;transform: translateX(-100%);"
                                                  data-num="1">
                                             </div>
                                          </div>
                                       </div>
                                       <p class="totalMoney-label">
                                          <span>{{$t("bbjyBuyTotal")}}</span>&nbsp;&nbsp;
                                          <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                                          <span><span class="quoteAsset">{{currentInfo.quoteAsset}}</span></span>
                                       </p>
                                       <button class="mybtn btn-back" v-if="!isLogin">
                                          <router-link to='/login' class="text"> {{$t('bbjyBuyLogin')}}</router-link>
                                          <span>{{$t("bbjyOr")}}</span>
                                          <router-link class="text" to='/register'> {{$t('bbjyBuyRegister')}}
                                          </router-link>
                                          <span>{{$t("bbjyToTrade")}}</span>
                                       </button>
                                       <!-- 买入按钮 -->
                                       <button class="mybtn buy-btn" :disabled="buyDisabled" @click="buyBtn" v-else>
                                          <span>{{$t("bbjyBuyOperation")}}</span>
                                       </button>
                                    </div>
                                 </div>
                                 <!--卖出-->
                                 <div class="sell-panel buy-sell-common">
                                    <div class="available-container">
                                       <span>{{$t("bbjySellAvailable")}}</span>&nbsp;
                                       <span v-if="isLogin">{{baseAssetAvailable | scientificToNumber}}</span>
                                       <span v-else>--</span>&nbsp;
                                       <span class="baseAsset">{{currentInfo.baseAsset}}</span>
                                    </div>
                                    <div v-if="isGBBO" class="gbboPrice">
                                       <span>{{$t('exchangeHighest')}}</span>
                                       <span class="logobox">
                                                        <i :class="sell_exchange_logo"></i>
                                                        {{bestBuyPrice}} {{currentInfo.quoteAsset}}
                                                    </span>
                                    </div>
                                    <div class="trade-msg">
                                       <div class="price-box">
                                          <div class="price-box-label">
                                             <div>{{$t("bbjySellPrice")}}</div>
                                             <div>{{$t("bbjySellAmount")}}</div>
                                          </div>
                                          <div class="input_container">
                                             <div class="inputbox">
                                                <input @input="handleSellPriceInput" type="text" maxlength="14"
                                                       ref="sellInput" :class="{'input-empty-color':sellPriceEmpty}"
                                                       class="input-price"
                                                       autocomplete="off"
                                                       style="ime-mode:disabled"
                                                       ondragenter="return false"
                                                />
                                                <div class="name-show quoteAsset">{{currentInfo.quoteAsset}}</div>
                                                <i v-if="isGBBO"
                                                   :class="[sell_input_change?'gbbo_lock':'gbbo_unlock']"/>
                                                <div class="currencyInput" v-if="!isGBBO"> ≈ {{sellPriceCurrency |
                                                   scientificToNumber}} {{currencyName}}
                                                </div>
                                                <div class="currencyInput" v-else>
                                                   <span v-if="sell_input_change">limit price</span>
                                                   <div v-else>
                                                      {{$t('exchangeGBBORouter')}}
                                                      <!-- <Tooltip placement="top" :content="$t('exchangeGBBORouterDesc')">
                                                         <Icon type="md-help-circle"/>
                                                      </Tooltip> -->
                                                   </div>
                                                </div>
                                             </div>
                                             <div class="inputbox">
                                                <input @input="handleSellCountInput" type="text" ref="sellCountInputRef"
                                                       maxlength="14" :class="{'input-empty-color':sellCountEmpty}"
                                                       class="input-price"
                                                       autocomplete="off" data-style="amount"
                                                       style="ime-mode:disabled"
                                                       ondragenter="return false"
                                                />
                                                <div class="name-show baseAsset">{{currentInfo.baseAsset}}</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="range-box" id="range-box-sell">
                                          <Slider v-model="sellRangeValue" :tip-format="rangeFormat"
                                                  @on-change="changeSellBall('',$event)"></Slider>
                                          <div class="range-ball" data-side="sell" :data="sellBallTotal"
                                               @click="changeSellBall">
                                             <div class="ball" :class="sellRangeValue>0?'sell-ball-active':'sell-ball'"
                                                  style="left: 0;transform: translateX(0);"
                                                  data-num="0">
                                             </div>
                                             <div class="ball"
                                                  :class="sellRangeValue>=25?'sell-ball-active':'sell-ball'"
                                                  style="left: 25%;transform: translateX(-25%);"
                                                  data-num="0.25">
                                             </div>
                                             <div class="ball"
                                                  :class="sellRangeValue>=50?'sell-ball-active':'sell-ball'"
                                                  style="left: 50%;transform: translateX(-50%);"
                                                  data-num="0.5">
                                             </div>
                                             <div class="ball"
                                                  :class="sellRangeValue>=75?'sell-ball-active':'sell-ball'"
                                                  style="left: 75%;transform: translateX(-75%);"
                                                  data-num="0.75">
                                             </div>
                                             <div class="ball"
                                                  :class="sellRangeValue>=100?'sell-ball-active':'sell-ball'"
                                                  style="left: 100%;transform: translateX(-100%);"
                                                  data-num="1">
                                             </div>
                                          </div>
                                       </div>
                                       <!-- 总价 -->
                                       <p class="totalMoney-label">
                                          <span>{{$t("bbjySellTotal")}}</span>&nbsp;&nbsp;
                                          <span class="total-num">{{sellOutTatal}}</span>&nbsp;
                                          <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
                                       </p>
                                       <!-- 卖出按钮 -->
                                       <button class="mybtn btn-back" v-if="!isLogin">
                                          <router-link to='/login' class="text"> {{$t('bbjyBuyLogin')}}</router-link>
                                          <span>{{$t("bbjyOr")}}</span>
                                          <router-link class="text" to='/register'> {{$t('bbjyBuyRegister')}}
                                          </router-link>
                                          <span>{{$t("bbjyToTrade")}}</span>
                                       </button>
                                       <button class="mybtn sell-btn" :disabled="sellDisabled" @click="sellBtn" v-else>
                                          <span>{{$t("bbjySellOperation")}}</span>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>

                        </div>
                     </div>
                     <div class="quickNav" v-if="isShowMask">
                        <div class="quickContent">
                           <div class="quickContent-title">
                              <div class="line">
                                 <p>{{$t('bbjyComingSoon')}}</p>
                              </div>
                           </div>
                           <div class="countDown space-between" v-if="!isStopTrade">
                              <span class="text">{{$t('bbjyDistance')}}</span>
                              <div class="box-content"><span class="box"></span>
                                 <div class="leftTime">{{day}}</div>
                              </div>
                              <span class="text">{{$t('bbjyDays')}}</span>
                              <div class="box-content"><span class="box"></span>
                                 <div class="leftTime">{{hour}}</div>
                              </div>
                              <span class="text">{{$t('bbjyHours')}}</span>
                              <div class="box-content"><span class="box"></span>
                                 <div class="leftTime">{{minutes}}</div>
                              </div>
                              <span class="text">{{$t('bbjyMinutes')}}</span>
                              <div class="box-content"><span class="box"></span>
                                 <div class="leftTime">{{second}}</div>
                              </div>
                              <span class="text">{{$t('bbjySeconds')}}</span>
                           </div>
                           <div v-else class="countDown space-between">
                              {{$t('bbjyStop')}}
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- 改版后盘口交易历史 -->
                  <div class="depthHistoryContainer">
                     <ul class="title">
                        <li v-bind:class="[isShowDepth===1? 'active' : '', ]" @click="changeDepth(1)">{{$t('盘口')}}</li>
                        <li v-bind:class="[isShowDepth===2 ? 'active' : '', ]" @click="changeDepth(2)">
                           {{$t('bbjyTradeHistory')}}
                        </li>
                     </ul>
                     <!-- 右侧盘口信息 -->
                     <div class="order-book" v-show="isShowDepth === 1">
                        <ul class="item-title-list list-title">
                           <li class="text-title price">
                              {{$t('bbjyNowPrice')}} ({{currentInfo.quoteAsset }})
                           </li>
                           <li class="text-title amount">
                              {{$t('bbjyNowAmount')}} ({{currentInfo.baseAsset}})
                           </li>
                           <li class="text-title time" v-if="isGBBO">
                              {{$t('exchangeExchange')}}
                           </li>
                           <li class="text-title time" v-else>
                              {{($t('bbjyNowTotal'))}} ({{currentInfo.quoteAsset}})
                           </li>
                        </ul>
                        <div class="order-book-content">
                           <div class="sell-buy-orders">
                              <ul class="orders-body sell-orders-body" ref="buyOrderContainer" v-if="!isGBBO">
                                 <li v-for="v in asksArr" @click="getClickSellPrice(v.price,v.quantity)">
                                    <span class="price redText pointer">{{v.price}}</span>
                                    <span class="amount">{{v.quantity}}</span>
                                    <span class="time">{{v.total}}</span>
                                    <b class="sell-order-color" :style="{width:v.width+'px'}"></b>
                                 </li>
                              </ul>
                              <ul class="orders-body sell-orders-body" ref="buyOrderContainer" v-else>
                                 <li v-for="v in gbbo_asksArr" @click="getClickSellPrice(v.priceWithFee,v.qty)">
                                    <span class="price redText pointer">{{v.priceWithFee}}</span>
                                    <span class="amount">{{v.qty | formatNumberLength}}</span>
                                    <span class="time">{{v.provider}}</span>
                                    <!-- <b class="sell-order-color" :style="{width:v.width+'px'}"></b> -->
                                 </li>
                              </ul>
                           </div>
                           <div class="current" v-if="!isGBBO">
                           <span class="current-price pointer"
                                 :class="[currentSymbolObj.showColor === -1?'redText':'greenText']"
                                 @click="getClickPrice(currentSymbolObj.last)">{{this.currentSymbolObj.last | scientificToNumber}}</span>
                              <span
                                 class="currencyRate">&nbsp;&nbsp;≈{{symbolCurrency | scientificToNumber}} {{currencyName}}</span>
                           </div>
                           <div class="current gbboDethBoard" v-else>
                              <div>
                                 <span>{{subNumber}}</span>
                                 <span
                                    class="costMoney"> {{currentInfo.quoteAsset}} ≈ {{GBBO_rate}}{{currencyName}}</span>
                              </div>
                              <span>{{isShowARB}}</span>
                           </div>
                           <div class="sell-buy-orders">
                              <ul class="orders-body buy-orders-body" ref="sellOrderContainer" v-if="!isGBBO">
                                 <li v-for="v in bidsArr" @click="getClickBuyPrice(v.price,v.quantity)">
                                    <span class="price greenText">{{v.price}}</span>
                                    <span class="amount">{{v.quantity}}</span>
                                    <span class="time">{{v.total}}</span>
                                    <b class="buy-order-color" :style="{width:v.width+'px'}"></b>
                                 </li>
                              </ul>
                              <ul class="orders-body buy-orders-body" ref="sellOrderContainer" v-else>
                                 <li v-for="v in gbbo_bidsArr" @click="getClickBuyPrice(v.priceWithFee,v.qty)">
                                    <span class="price greenText">{{v.priceWithFee}}</span>
                                    <span class="amount">{{v.qty | formatNumberLength}}</span>
                                    <span class="time">{{v.provider}}</span>
                                    <!-- <b class="buy-order-color" :style="{width:v.width+'px'}"></b> -->
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <!--21条成交历史-->
                     <div class="below-right" v-show="isShowDepth === 2">
                        <ul class="item-title-list list-title">
                           <li class="text-title price">
                              {{$t('bbjyNowPrice')}} ({{currentInfo.quoteAsset }})
                           </li>
                           <li class="text-title amount">
                              {{$t('bbjyNowAmount')}} ({{currentInfo.baseAsset}})
                           </li>
                           <li class="text-title time">
                              {{$t('bbjyOrderDate')}}
                           </li>
                        </ul>
                        <div class="trade-history">
                           <div class="history-content" ref="tradeHistory">
                              <div class="history_row" v-for="(v,i) in tradeHistoryArr" @click="getClickPrice(v.price)"
                                   :key="i">
                                 <div class="price"
                                      :class="[v.showColor === -1?'redText':'',v.showColor === 1?'greenText':'','pointer']">
                                    {{v.price}}
                                 </div>
                                 <div class="amount">{{v.volumeData}}</div>
                                 <div class="time">{{v.date}}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>

            <!-- 下部 委托单 成交记录 交易历史 -->
            <div class="below clearfix">
               <!--当前委托单-->
               <div class="below-left">
                  <div class="open-order">
                     <ul class="space-between item-title">
                        <li>{{$t("bbjyOpenOrders")}}</li>
                        <li>
                           <router-link to='/order'>{{$t('bbjyOrderAll')}}</router-link>
                        </li>
                     </ul>
                     <div class="table-box">
                        <ul>
                           <li class="tr-title">
                              <div>{{$t('bbjyOrderDate')}}</div>
                              <div>{{$t("bbjyOrderPair")}}</div>
                              <div>{{$t("bbjyOrderType")}}</div>
                              <div>{{$t("bbjyOrderSide")}}</div>
                              <div>{{$t("bbjyOrderPrice")}}</div>
                              <div>{{$t("bbjyOrderAmount")}}</div>
                              <div>{{$t("bbjyOrderFilled")}}</div>
                              <div>{{$t("bbjyOrderTotal")}}</div>
                              <div>{{$t("bbjyOperation")}}</div>
                           </li>
                           <li class="no-order" v-if="myOpenList.length === 0">
                              <img src="../../assets/images/exchange/no_order.png" width="50px" height="42px" alt="">
                              {{$t("bbjyOrderTIP")}}
                           </li>
                           <li v-else v-for="(v,i) in myOpenList" class="orderItem">
                              <div>{{v.createdAt}}</div>
                              <div>{{v.symbol}}</div>
                              <div>{{$t(v.orderType)}}</div>
                              <div :class="[v.orderSide === 'BUY'?'greenText':'redText']">{{$t(v.orderSide)}}</div>
                              <div>{{v.limitPrice}}</div>
                              <div>{{v.filledCumulativeQuantity +'/'+ v.quantity}}</div>
                              <div>{{v.percent}}%</div>
                              <div>{{v.total}}</div>
                              <!-- 撤单 -->
                              <div class="cancleBtn">
                                <a 
                                  class="cancel"
                                  @click="cancelMyOrder(v.orderId,v)"
                                  :disabled="v.isDisabled">
                                {{$t(v.btnText)}}
                                </a>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <!-- 历史委托单 -->
                  <div class="history">
                     <ul class="space-between item-title">
                        <li>{{$t("bbjyHistory")}}</li>
                        <li>
                           <Checkbox v-model="hideCancleOrder" class="hideCancleOrder">{{$t('隐藏已撤单')}}</Checkbox>
                           <router-link to='/order'>{{$t("bbjyOrderAll")}}</router-link>
                        </li>
                     </ul>
                     <div class="table-box">
                        <ul>
                           <li class="tr-title">
                              <div>{{$t("bbjyHistoryDate")}}</div>
                              <div>{{$t("bbjyHistoryPair")}}</div>
                              <div>{{$t("bbjyHistoryType")}}</div>
                              <div>{{$t("bbjyHistorySide")}}</div>
                              <div>{{$t("bbjyHistoryAvg")}}</div>
                              <div>{{$t("bbjyHistoryPrice")}}</div>
                              <div>{{$t("bbjyHistoryAmount")}}</div>
                              <div>{{$t("bbjyHistoryFilled")}}</div>
                              <div>{{$t("bbjyHistoryTotal")}}</div>
                              <div>{{$t("bbjyHistoryStatus")}}</div>
                           </li>
                           <!--无历史-->
                           <li class="no-order" v-if="myCompletedList.length === 0">
                              <img src="../../assets/images/exchange/no_order.png" width="50px" height="42px" alt="">
                              {{$t("bbjyHistoryTIP")}}
                           </li>
                           <li v-else v-for="v in myCompletedList_sort" class="orderItem">
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.createdAt}}</div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.symbol}}</div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{$t(v.orderType)}}
                              </div>
                              <div
                                 :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'',v.orderSide === 'BUY'?'greenText':'redText']">
                                 {{$t(v.orderSide)}}
                              </div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">
                                 {{v.filledAveragePrice}}
                              </div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.limitPrice}}</div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">
                                 {{v.filledCumulativeQuantity +'/'+ v.quantity}}
                              </div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.percent}}%</div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{v.total}}</div>
                              <div :class="[v.orderStatus === 'CANCELLED'?'CANCELLED_Text':'']">{{$t(v.orderStatus)}}
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
      <!--交易密码6个框-->
      <div class="mask" v-if="showPassWordPage" @click="clickMask">
         <div class="alert alert-trade-password">
            <div class="alert-title">
               <div>{{$t("bbjyPassword")}}</div>
               <Icon type="md-close" class="closePs" @click="closePassWordPage"/>
            </div>
            <div class="alert-content">
               <div class="content-box">
                  <div class="text">{{$t("bbjyInputPassword")}}</div>
                  <div class="square">
                     <PasswordInput ref="childPassWord" @getPassWord="getPswData"></PasswordInput>
                  </div>
                  <div class="expired space-between">
                     <span>{{$t("bbjyExpiredTime")}}</span>
                     <router-link to="/originTradePassword">{{$t("bbjyForgetPassword")}}</router-link>
                  </div>
                  <div class="space-between">
                     <button class="cancel" @click="closePassWordPage">{{$t("bbjyTipCancel")}}</button>
                     <button class="confirm" @click="submitPassWord">{{$t("bbjyTipSubmit")}}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- 聊天 -->
      <!-- <div class="chat_container"></div> -->
      <CHAT/>
   </div>
</template>

<script>
  import {
    getSymbolList,
    getSymbolList_realtime,
    getdepthList,
    getDeleteFavoritesPair,
    getUserInfo
  } from '_api/exchange.js'
   import {
      getObjFirstKey,
      getDecimalsNum,
      onlyInputNumAndPoint,
      getTokenByKey as getValue,
      addSymbolSplitLine,
      storage,
      isDivideAll,
      getLastUTCMinutes,
      getIndexInObject,
      scientificToNumber,
      isSameUTCDay,
      subNumberPoint,
      getObjFirstValue,
      dealNumber
   } from '@/lib/utils.js'
   import {TokenType, coinInfoLinks} from './config.js'
   import {Exchange} from '@/interface/exchange.js'
   import PasswordInput from '@/components/PasswordInput.vue'
   import TVChartContainer from '@/components/KLine/TVChartContainer.vue'
   import SockJS from 'sockjs-client';
   import Stomp from 'stompjs';
   import CHAT from '@/components/exchange/CHAT.vue'
   import _ from 'lodash'
   import Cookies from 'js-cookie'
   import moment, {isMoment, defineLocale} from 'moment'
   import bigDecimal from 'js-big-decimal' //除法失效
   import {BigNumber} from 'bignumber.js';

   let allNowPriceObject = {}//所有币种快照的最新价格的对象
   export default {
      metaInfo() {
         return {
            meta: [{                 // set meta
               name: 'keywords',
               content: this.pageKeyword
            }, {
               name: 'description',
               content: this.pageDescription
            }],
         }
      },
      data() {
         return {
           // 是否设置交易密码
           isSetTradePasswrod: false,
            //2019性能优化-左侧币种选择栏
            siteName: 'B',
            siteIndexNumber: 0,//站点序号 数字
            quoteIndexName: '',//计价币种tab页签 币种名称 字符串格式
            currentQuoteCoinName: '',//左侧币种列表计价资产币
            //左侧币种选择栏
            isShowMainBoard: true,//切换主板 自选
            searchCoin: '',//币种搜索
            markSymbolArr: [],//自选币种列表
            currentSymbol: '', //当前行情交易对
            currentSymbolObj: {},//当前行情+交易对的对象
            currentInfo: {}, //当前交易对的基本信息集合
            isLogin: this.$store.state.app.isLogin || false,
            tradeHistoryArr: [], //交易历史列表
            pageKeyword: this.$t(this.$route.meta.keywords),
            pageDescription: this.$t(this.$route.meta.description),
            //页面初始化
            symbolList: {},//交易接口的symbolList 接口
            symbolList_quote: {},//行情快照需要的symboList
            symbolListSelf: {},
            quoteWS: null,//行情websocket推送
            klineWS: null,
            noPadding: '--',
            // currentQuoteCoin: 0, //选中的计价资产
            quoteCoinList: {}, //计价资产
            baseAssetList: [], //交易资产
            pushData: {},
            tradeHistoryList: [], //快照交易历史
            isShowCoinLink: true,//石否现实币种详情链接
            coinInfoLink: '',//币种详情链接
            currencyName: '',//当前的法币名称
            currencyRate: 1,//当前法币的比率
            currentSymbolRate: 1, //当前交易对 对USD的系数
            // buyPriceCurrency:"--",//买入价格法币估值
            // sellPriceCurrency:"--",
            symbolCurrency: "--",//当前交易对法币估值
            // ****盘口****
            isShowDepth: 1,//1显示盘口 2为交易历史
            isInitPage: true,//第一次进入页面 展示盘口的买入1 卖出1
            depthListTimer: null,
            depthPageWidth: 100,
            depthTimer: false,
            bidsArr: [],
            asksArr: [],
            //****交易相关 */
            exchange: null,//交易接口函数
            loginToken: Cookies.get('loginToken'),//登陆token
            // ***** 买入 卖出 ******//
            FFDeductible: 0,//1 开启手续费折扣 2.FF余额低 3.手续费折扣中
            commissionTemplateId: false,//开启折扣开关 true 开启
            isShowMask: false,
            isStopTrade: false,
            maskInterval: null,
            day: 0,
            hour: 0,
            minutes: 0,
            second: 0,
            buyDisabled: false,
            sellDisabled: false,
            myBanalceTimer: null,
            buyBallPercentage: '0',//下单买入百分比 0 0.25 0.5 0.75 1
            sellBallPercentage: '0',//下单卖出百分比
            buyPriceEmpty: false,
            buyCountEmpty: false,
            sellPriceEmpty: false,
            sellCountEmpty: false,
            buyPriceInput: '',
            buyCountInput: '',
            sellCountInput: '',
            sellPriceInput: '',
            baseAssetAvailable: 0,//可用的交易资产 卖出
            quoteCoinAvailable: 0,//可用的计价资产 买入
            // a:'',
            // ****我的挂单 & 成交历史记录
            noOrder: true,
            noMyDealOrder: true,
            SSE_order: null,//订单推送
            sseInitArr: [], //订阅推送刚开始接受的快照
            myOpenList: [],//未成交订单
            myCompletedList: [],//完成成交和已经撤单
            //***下单 买入 */
            orderType: null,//撤单 cancle  下单  输入密码用
            orderID: null,
            showPassWordPage: false,
            exchangePassWord: null,//交易密码
            setTradePassword: false,//localstorage 是否
            //币种详情相关
            isShowStockPage: false, //股票通证详情页入口
            //隐藏已撤单
            hideCancleOrder: false,
            //GBBO业务相关
            isGBBO: true,
            stompClient: null,
            gbbo_asksArr: [],
            gbbo_bidsArr: [],
            bestSellPrice: null,
            bestBuyPrice: null,
            subNumber: 0,//差值
            isShowARB: 'SPREAD',
            GBBO_rate: 0,
            sell_exchange_logo: '',
            buy_exchange_logo: '',
            buy_input_change: false,//是否输入
            sell_input_change: false,
            isInitOrderBook: true,
            buyRangeValue: 0,//滑块值
            sellRangeValue: 0,
            orderTicketTimer: null,//orderTicket定时器
            updateAt: '',//路总需求 要加这个隐藏字段
         }
      },
      components: {
         PasswordInput: PasswordInput,
         TVChartContainer: TVChartContainer,
         CHAT,
      },
      methods: {
         //切换版块
         changeBoard(e) {
            this.isShowMainBoard = true
            let quoteCoinName = e.target.getAttribute('data-site');
            let siteName = e.target.getAttribute('siteName');
            this.siteIndexNumber = getIndexInObject(this.symbolListSelf, siteName)
            this.currentQuoteCoinName = quoteCoinName
            this.siteName = siteName
         },
         //切换交易资产
         changeBaseAssetList(v) {
            //以后优化 改为 params传参就好了
            this.$router.push({
               query: {
                  // symbol:''
               }
            })
            //清空盘口深度
            this.bidsArr = []
            this.asksArr = []
            this.isInitOrderBook = true
            //loading
            // clearTimeout(this.depthListTimer)

            ////K线基本数据配置使用
            storage.set('currentSymbolObj', v)
            this.currentSymbol = v.symbol
            this.currentSymbolObj = v;
            //更新大盘上方交易对行情
            this.showCurrentPriceInfo(v)
            //重置点击
            this.buyDisabled = false
            this.sellDisabled = false
            //更新交易历史 传入v 获取精度
            this.updateSymbolHistory()
            //是否是GBBO
            // if(v.symbol == 'BTCUSDD'){
            // if (this.$route.query['type'] === 'gbbo' && v.symbol === 'BTCUSDD') {
              //  this.isGBBO = true
               this.getGBBODepth()
            // } else {
            //    this.isGBBO = false
            //    if (this.stompClient) {
            //       this.stompClient.disconnect(function () {
            //       })
            //    }
            //    //更新盘口深度
            //    this.getDethTableData();
            // }
            this.buy_input_change = false
            this.sell_input_change = false
            //刷新可用资产
            // this.getMyAssetData();
            //判断是否展示交易蒙层
            this.isShowTradeMask();
            //更新当前交易对法币估值
            this.symbolCurrency = '--'
            this.getCurrencyData()
            this.getCoinInfoLinks(v.baseAsset)

            //切换交易对清空买入卖出
            this.buyPriceInput = ''
            this.buyCountInput = ''
            this.sellCountInput = ''
            this.sellPriceInput = ''
            this.$refs.buyInput.value = ''
            this.$refs.sellInput.value = ''
            this.$refs.buyCountInputRef.value = ''
            this.$refs.sellCountInputRef.value = ''
            this.isInitPage = true
            //股票详情入口
            if (this.siteName === 'S') {
               this.isShowStockPage = true
            } else {
               this.isShowStockPage = false
            }
            // 百分比的球
            this.buyBallPercentage = this.sellBallPercentage = 0
            this.buyCountInput = this.sellCountInput = ''
         },
         getFilterList: function (rows) {
            return rows.filter((row) => {
               return row.baseAsset.indexOf(this.searchCoin.toUpperCase()) > -1
            })
         },
         //打开自选
         openMyCoin() {
            this.isShowMainBoard = !this.isShowMainBoard
         },
         //添加自选
         addMarkCoin(v, index, params) {
            //页面渲染
            let number = _.findIndex(this.symbolListSelf[this.siteName][this.currentQuoteCoinName], {'symbol': v.symbol});
            this.symbolListSelf[this.siteName][this.currentQuoteCoinName][number] = Object.assign(v, {marked: params})
            this.symbolListSelf = Object.assign({}, this.symbolListSelf)
            //缓存到本地存储
            let local_symbol = JSON.parse(localStorage.getItem('mark_symbol'))
            if (params) {
               let obj = {}
               obj[v.symbol] = 'marked'
               if (local_symbol) {
                  let result = Object.assign(local_symbol, obj)
                  localStorage.setItem('mark_symbol', JSON.stringify(result))
               } else {
                  localStorage.setItem('mark_symbol', JSON.stringify(obj))
               }
               this.$store.dispatch("updateMarkSymbol");
               this.markSymbolArr.push(v)
            } else {
               //删除
               let index = _.findIndex(this.markSymbolArr, {'symbol': v.symbol});
               //删除列表
               this.markSymbolArr.splice(index, 1)

               delete local_symbol[v.symbol]
               localStorage.setItem('mark_symbol', JSON.stringify(local_symbol))
               if (this.isLogin) {
                  //删除接口
                  getDeleteFavoritesPair([v.symbol]).then(data => {
                  })
               }
            }
         },
         //删除自选
         deleteMarkCoin(v, index, params) {
            let site = this.symbolList_quote[v.symbol].siteType[0]
            let quoteCoinName = this.symbolList_quote[v.symbol].quoteAsset
            // let number = getIndexInObject(this.symbolListSelf[site][quoteCoinName],v.symbol)
            let number = _.findIndex(this.symbolListSelf[site][quoteCoinName], {'symbol': v.symbol});
            //改变数据
            this.symbolListSelf[site][quoteCoinName][number] = Object.assign(v, {marked: params})
            this.symbolListSelf = Object.assign({}, this.symbolListSelf)
            //删除本地缓存
            let local_symbol = JSON.parse(localStorage.getItem('mark_symbol'))
            delete local_symbol[v.symbol]
            localStorage.setItem('mark_symbol', JSON.stringify(local_symbol))
            if (this.isLogin) {
               //删除接口
               getDeleteFavoritesPair([v.symbol]).then(data => {
               })
            }
            //删除列表
            this.markSymbolArr.splice(index, 1)
         },
         //判断是否展示交易蒙层
         isShowTradeMask() {
            this.isStopTrade = false
            this.isShowMask = false
            if (JSON.stringify(this.symbolList) != "{}" && this.symbolList[this.currentSymbol]) {
               //下单服务正常运行
               let orderSymbolObj = this.symbolList[this.currentSymbol]
               if (orderSymbolObj.status === 'HALT' && orderSymbolObj.nextStatus && orderSymbolObj.nextStatusAt) {
                  //倒计时
                  this.isShowMask = true
                  this.buyDisabled = true
                  this.sellDisabled = true
                  //情况盘口
                  this.bidsArr = []
                  this.asksArr = []
                  this.refreashTime(orderSymbolObj.nextStatusAt)
                  return
               } else if (orderSymbolObj.status === 'HALT') {
                  //暂停交易
                  this.isShowMask = true
                  this.isStopTrade = true
               }
            }
         },
         //未开放交易对 倒计时
         refreashTime(targetDate) {
            targetDate = targetDate + 10 * 1000
            this.maskInterval && clearInterval(this.maskInterval)
            if (targetDate && typeof targetDate === 'number') {
               this.maskInterval = setInterval(() => {
                  var today = new Date().getTime();
                  if (targetDate <= today) {
                     //关闭蒙层
                     this.isShowMask = false;
                     this.buyDisabled = false
                     this.sellDisabled = false
                     window.location.reload();
                     clearInterval(this.maskInterval)
                     //重新请求下单交易对 获取可交易状态
                  } else {
                     var ts = (targetDate - today);
                     this.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
                     this.hour = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
                     this.minutes = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
                     this.second = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
                  }
               }, 1000)
            }
         },
         //币种详情列表展示逻辑
         getCoinInfoLinks(baseAsset) {
            if (coinInfoLinks[baseAsset]) {
               this.isShowCoinLink = true;
               this.coinInfoLink = `https://coinmarketcap.com/currencies/${coinInfoLinks[baseAsset]}/`;
            } else {
               this.isShowCoinLink = false
            }
         },
         //交易对的交易历史列表
         updateSymbolHistory() {
            if (this.WSHistory) {
               this.WSHistory.close()
               //清空交易历史
               this.tradeHistoryArr = []
            }
            const baseURL = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
            const host = window.location.host;
            this.WSHistory = new ReconnectingWebSocket(`${baseURL}${host}/quote/tradeHistory.ws?symbol=${this.currentSymbol}&least=21`)
            this.WSHistory.onopen = function (e) {
            };
            this.WSHistory.onmessage = (e) => {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               if (result.ping !== undefined) {
                  var pongResponse = {};
                  pongResponse.pong = result.ping;
                  this.WSHistory.send(JSON.stringify(pongResponse))
                  return;
               }
               //断网重连的问题
               if (result.code) {
                  return;
               }
               let arr = this.tradeHistoryArr
               let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
               let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
               let obj = {}
               obj.price = bigDecimal.round(result.price, priceLong)
               obj.volumeData = bigDecimal.round(result.amount, volumeLong)
               obj.date = moment(result.tradeTime).format('HH:mm:ss')
               obj.showColor = result.direction === 'buy' ? 1 : -1
               if (arr.length === 40) {
                  arr.unshift(obj)
                  arr.pop()
               } else {
                  arr.unshift(obj)
               }
               this.tradeHistoryArr = arr
            }
            this.WSHistory.onerror = (e) => {
            }
            this.WSHistory.onclose = (e) => {
            };
         },
         //展示最新的交易资产行情信息
         //v symbol 行情合并后的对象
         showCurrentPriceInfo(v) {
            //给title赋值行情
            if (v.last) {
               document.title = `${v.last}  | ${v.baseAsset}/${v.quoteAsset}`
            } else {
               document.title = `-- | ${v.baseAsset}/${v.quoteAsset}`
            }
            this.currentInfo = v
         },
         //处理法币估值
         getCurrencyData() {
            if (!allNowPriceObject[this.currentSymbolObj.symbol]) {
               return
            }
            //计价资产是否是USDD USDT
            //法币估值处理
            let legalTender = JSON.parse(localStorage.getItem('currentCurrency'))
            this.currencyRate = legalTender.rate
            this.currencyName = legalTender.name
            if (this.currentSymbolObj.quoteAsset === "USDT" || this.currentSymbolObj.quoteAsset === "USDD") {
               this.currentSymbolRate = 1
               this.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolObj.last) * new BigNumber(this.currencyRate), 4)
            } else if (allNowPriceObject[this.currentSymbolObj.quoteAsset + "USDT"]) {
               //是否存在 计价资产/USDT的交易对
               // if(allNowPriceObject[this.currentSymbolObj.quoteAsset+"USDT"].last){
               this.currentSymbolRate = bigDecimal.round(new BigNumber(this.currentSymbolObj.last) * new BigNumber(allNowPriceObject[this.currentSymbolObj.quoteAsset + "USDT"].last), 4)
               this.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolRate) * new BigNumber(this.currencyRate), 4)
               // }
            }
         },
         //获取交易对的实时价格
         getSymbolNowPrice(symbol) {
            return _.last(this.pushData[symbol])
         },
         //获取交易对 下单专用
         getSymbolListData() {
            getSymbolList().then(res => {
               if (this.$store.state.app.isLogin || this.loginToken) {
                  this.isLogin = true
               }
               this.symbolList = {};
               res.map((v, i) => {
                  this.symbolList[v.symbol] = v
               })
               //增加蒙层逻辑
               this.isShowTradeMask();
               //查询委托订单
               this.getSSEOrderList()
            }).catch(error => {

            })
         },
         //获取K线行情交易对
         getSymbolListRealtimeData() {
            getSymbolList_realtime().then(res => {
               let siteObj = {}  //只按照站区分数据
               let symbolUrl = ''
               let arr = []
               //注释排序
               let sortArr = _.sortBy(res, ['symbolType', 'quoteAsset']) //排序
               // let sortArr = res //排序
               // storage.set('symbloList',res)
               sortArr.map((v, i) => {
                  v.siteType.map((site, i) => {
                     // v 每个站
                     if (siteObj[site]) {
                        if (siteObj[site][v.quoteAsset]) {
                           siteObj[site][v.quoteAsset].push(v)
                        } else {
                           siteObj[site][v.quoteAsset] = [v]
                        }
                     } else {
                        let obj = {};
                        obj[v.quoteAsset] = [v]
                        siteObj[site] = obj
                     }

                  })
                  symbolUrl += `symbol=${v.symbol}&${v.symbol}_least=1&` //拼装推送数据查询url
                  this.symbolList_quote[v.symbol] = v //拼装行情的symbol为Key的symbolList 对象
               })
               this.symbolListSelf = siteObj
               //只有站点默认展示第一个交易对
               let siteRouter = this.$route.query.site
               //url 只有site
              //  if (siteRouter && !this.$route.query.symbol) {
              //     let index = getIndexInObject(siteObj, siteRouter)
              //     this.siteIndexNumber = index
              //     this.siteName = siteRouter
              //     if (siteRouter == 'S') {
              //        this.isShowStockPage = true
              //     }
              //     this.currentSymbol = getObjFirstValue(siteObj[siteRouter])[0].symbol
              //     this.currentSymbolObj = this.symbolList_quote[this.currentSymbol]
              //     //当前的计价资产名称
              //     this.currentQuoteCoinName = this.currentSymbolObj && this.currentSymbolObj.quoteAsset
              //     //增加蒙层逻辑
              //     this.isShowTradeMask()
              //  } else if (this.$route.query.symbol || storage.has('currentSymbol')) { //根据url展示默认的交易对
              //     this.currentSymbol = this.$route.query.symbol || storage.get('currentSymbol')
              //     this.currentSymbolObj = this.symbolList_quote[this.currentSymbol]
              //     if (this.currentSymbolObj) {
              //        this.siteName = this.currentSymbolObj.siteType[0]
              //        //站点的顺序
              //        this.siteIndexNumber = getIndexInObject(siteObj, this.currentSymbolObj.siteType[0])
              //        //股票详情入口
              //        if (this.siteName == 'S') {
              //           this.isShowStockPage = true
              //        }
              //        //当前的计价资产名称
              //        this.currentQuoteCoinName = this.currentSymbolObj && this.currentSymbolObj.quoteAsset
              //        //增加蒙层逻辑
              //        this.isShowTradeMask()
              //     }
              //  } else {
                  this.currentSymbol = sortArr[0].symbol //默认排序后的第一个交易对
                  this.currentSymbolObj = sortArr[0]
              //  }
               //K线基本数据配置使用
               storage.set('currentSymbolObj', this.currentSymbolObj)
               if (this.currentSymbolObj) {
                  this.getCoinInfoLinks(this.currentSymbolObj.baseAsset)
                  this.isInitPage = true
                  // if(this.currentSymbol == 'BTCUSDD'){
                  // if (this.$route.query['type'] === 'gbbo' && this.currentSymbol === 'BTCUSDD') {
                    //  this.isGBBO = true
                     this.getGBBODepth()
                  // } else {
                  //    this.isGBBO = false
                  //    // //盘口深度轮询查询
                  //    this.getDethTableData()
                  // }
                  //获取我的可用资产 1分钟轮询一次
                  //监听currentSymbolObj 请求我的可用资产
                  this.getMyAssetData()
               }
               //当有快照驱动时数据变化
               this.getSSERealTime(symbolUrl)
               //成交历史
               this.updateSymbolHistory()
               //   orderTicket
               this.getOrderId()
            })
         },
         //获取盘口深度
         getDethTableData() {
            if (this.depthListTimer) {
               clearTimeout(this.depthListTimer)
               this.depthListTimer = null
            }
            getdepthList({'symbol': this.currentSymbol}).then(res => {
               if (res.data && !this.isShowMask) {//无数据时 是null  有蒙层时候不展示盘口数据
                  this.updateDepthArr(res.data, this.currentSymbolObj.depthPeak)
                  this.depthListTimer = setTimeout(() => {
                     this.getDethTableData()
                  }, 3000)
               }
            }).catch(e => {
               this.depthListTimer = setTimeout(() => {
                  this.getDethTableData()
               }, 10000)
            })
         },
        getGBBODepth() {
          if (this.stompClient == null || !this.stompClient.connected) {
              const domain = document.domain;
              let socket = null
              if (domain.startsWith('www.') || domain.startsWith('us.') || domain.startsWith('55ex.')) {
                socket = new SockJS('https://' + domain + '/xchange/marketdata');
              } else {
                // socket = new SockJS('http://52.68.13.17:8090/xchange/marketdata');
                socket = new SockJS('http://52.73.95.54:8090/xchange/marketdata')
              }
              // const socket = new SockJS('http://52.73.95.54:8090/xchange/marketdata')
              // const socket = new SockJS('https://www.55.center/xchange/marketdata');
              this.stompClient = Stomp.over(socket);
              this.stompClient.debug = null
              this.stompClient.heartbeat.outgoing = 1000;
              this.stompClient.connect({}, (frame) => {
                this.stompClient.subscribe('/topic/orderbook/BTCUSD', (message) => {
                // this.stompClient.subscribe('/topic/orderbook/BTCUSDD', (message) => {
                    if (message.body) {
                      this.sortOrderBook(JSON.parse(message.body))
                    }
                });
              }, (error) => {
                console.log('new Sockjs  error')
                this.stompClient.disconnect()
                this.stompClient = null
                this.getGBBODepth()
              });
          }
        },
         sortOrderBook(data) {
            let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
            // let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
            var result = data

            //路总需求 要加这个隐藏字段
            this.updateAt = result.updateAt
            // console.log(data, 'GBBO order asks=' + result.asks[result.asks.length - 1].priceWithFee, 'GBBO order bids=' + result.bids[0].priceWithFee)

            this.gbbo_asksArr = result.asks
            
            if (!this.buy_input_change) {
               this.bestSellPrice = result.asks[result.asks.length - 1].priceWithFee
               this.buy_exchange_logo = result.asks[result.asks.length - 1].provider
               this.buyPriceInput = this.bestSellPrice
               this.$refs.buyInput.value = this.bestSellPrice
            }
            if (this.isInitOrderBook) {
               var div = this.$refs.buyOrderContainer;
               //此时必须异步执行滚动条滑动至底部
               setTimeout(() => {
                  div.scrollTop = div.scrollHeight;
               }, 0)
               this.isInitOrderBook = false
            }
            this.gbbo_bidsArr = result.bids
            if (!this.sell_input_change) {
               this.bestBuyPrice = result.bids[0].priceWithFee
               this.sell_exchange_logo = result.bids[0].provider // 交易所logo
               this.sellPriceInput = this.bestBuyPrice
               this.$refs.sellInput.value = this.bestBuyPrice

            }
            var diff = this.bestSellPrice - this.bestBuyPrice
            this.subNumber = bigDecimal.round(Math.abs(diff), priceLong)
            this.GBBO_rate = bigDecimal.round(new BigNumber(this.subNumber) * new BigNumber(this.currencyRate), 4)
            if (diff < 0) {
               this.isShowARB = "ARBITRAGE"
            } else {
               this.isShowARB = "SPREAD"
            }
         },
         //获取推送行情
         getSSERealTime(url) {
            let SSEcache = null
            const baseURL = (window.location.protocol === 'http:') ? 'ws://' : 'wss://';
            const host = window.location.host;
            this.quoteWS = new ReconnectingWebSocket(`${baseURL}${host}/quote/realTime.ws?${url}`)
            this.quoteWS.onopen = (e) => {
            };
            this.quoteWS.onmessage = (e) => {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               if (result.ping !== undefined) {
                  var pongResponse = {};
                  pongResponse.pong = result.ping;
                  this.quoteWS.send(JSON.stringify(pongResponse))
                  return;
               }
               allNowPriceObject[result.symbol] = result
               //快照去重
               if (SSEcache && SSEcache.dateTime == result.dateTime && SSEcache.volume == result.volume) {
                  return;
               } else {
                  let v = {} //快照的涨跌幅
                  if (result && this.symbolList_quote[result.symbol]) {

                     let long = getDecimalsNum(this.symbolList_quote[result.symbol].priceTickSize)
                     let diff = '';
                     let a = '';

                     //计算涨跌幅 percent  +
                     if (result.previousClose && result.last) {
                        diff = bigDecimal.subtract(dealNumber(result.last, 20), dealNumber(result.previousClose, 20));
                        a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(result.previousClose)).toFixed(6), '100')
                     } else {
                        diff = bigDecimal.subtract(scientificToNumber(result.last), scientificToNumber(result.open));
                        a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(result.open)).toFixed(6), '100')
                     }

                     //涨跌幅%
                     v.percent = bigDecimal.round(a, 2) + '%'
                     //绿涨红跌 1绿色 0灰色 -1红色
                     v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)
                     //计算最新价格精度
                     v.last = bigDecimal.round(scientificToNumber(result.last), long)
                     //24H交易量
                     v.hour24Volume = bigDecimal.round(result.hour24Volume, 2)
                     //判断是否是收藏
                     let markSymbol = JSON.parse(localStorage.getItem('mark_symbol'))
                     if (markSymbol && markSymbol[result.symbol]) {
                        v.marked = true
                        let index = _.findIndex(this.markSymbolArr, {'symbol': result.symbol});
                        if (index == -1) {
                           this.markSymbolArr.push(Object.assign(result, v, this.symbolList_quote[result.symbol]))
                        } else {
                           this.markSymbolArr.splice(index, 1, Object.assign(result, v, this.symbolList_quote[result.symbol]))
                        }
                     }
                     //展示当前的交易对的大盘上方行情
                     if (this.currentSymbol === result.symbol) {
                        this.currentSymbolObj = Object.assign(result, v, this.symbolList_quote[result.symbol])
                        this.showCurrentPriceInfo(this.currentSymbolObj)
                     }
                     this.getCurrencyData()
                  }
                  //处理币种列表行情
                  if (this.symbolList_quote[result.symbol]) {
                     let quoteAsset = this.symbolList_quote[result.symbol].quoteAsset
                     let siteType = this.symbolList_quote[result.symbol].siteType[0]
                     this.symbolListSelf[siteType][quoteAsset].map((item, i) => {
                        if (item.symbol === result.symbol) {
                           this.symbolListSelf[siteType][quoteAsset][i] = Object.assign(v, item, result)
                           return
                        }
                     })
                     //计算法币估值
                     //板块部分双向绑定
                     this.symbolListSelf = Object.assign({}, this.symbolListSelf)
                     //处理当前
                     SSEcache = result
                  }
               }
            }
            this.quoteWS.onerror = (e) => {
            }
            //关闭时候触发
            this.quoteWS.onclose = (e) => {
            };
         },
         //**********************组装处理盘口展示数据 */
         getClickBuyPrice(price, count) {
            if (price) {
               this.$refs.sellInput.value = price
               this.sellPriceInput = price
               this.buyPriceInput = price
               this.$refs.buyInput.value = price
            }
            if (count) {
               this.buyCountInput = count
               this.$refs.buyCountInputRef.value = count

               this.$refs.sellCountInputRef.value = count
               this.sellCountInput = count
            }
         },
         getClickSellPrice(price, count) {
            if (price) {
               this.buyPriceInput = price
               this.$refs.buyInput.value = price

               this.$refs.sellInput.value = price
               this.sellPriceInput = price
            }
            if (count) {
               this.buyCountInput = count
               this.$refs.buyCountInputRef.value = count

               this.$refs.sellCountInputRef.value = count
               this.sellCountInput = count
            }
         },
         //把盘口的成交价 和成交历史的成交价格 赋值到下单口
         getClickPrice(price) {
            if (price) {
               this.buyPriceInput = price
               this.$refs.buyInput.value = price
               this.$refs.sellInput.value = price
               this.sellPriceInput = price
            }
         },
         //盘口深度
         updateDepthArr(json, depthPeak) {
            let asks = json.asks;
            let bids = json.bids;
            let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
            let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
            let aArr = []
            let bArr = []
            //卖出
            asks.map((v, i) => {
               let obj = {}
               obj.price = bigDecimal.round(scientificToNumber(v.price), priceLong)
               obj.quantity = bigDecimal.round(v.quantity, volumeLong)
               obj.total = bigDecimal.multiply(v.price, v.quantity)
               obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
               aArr.unshift(obj)
            })
            this.asksArr = aArr
            if (this.isInitOrderBook) {
               var div = this.$refs.buyOrderContainer;
               //此时必须异步执行滚动条滑动至底部
               setTimeout(() => {
                  div.scrollTop = div.scrollHeight;
               }, 0)
               this.isInitOrderBook = false
            }
            //买入盘口
            bids.map((v, i) => {
               let obj = {}
               obj.price = bigDecimal.round(scientificToNumber(v.price), priceLong)
               obj.quantity = bigDecimal.round(v.quantity, volumeLong)
               obj.total = bigDecimal.multiply(v.price, v.quantity)
               obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
               bArr.push(obj)
            })
            this.bidsArr = bArr
            //默认第一个盘口价格
            if (this.isInitPage && asks.length > 0) {
               let buyInput = subNumberPoint(scientificToNumber(asks[0].price), priceLong)
               this.buyPriceInput = buyInput
               this.$refs.buyInput.value = buyInput
               // let  buy_count = bigDecimal.round(scientificToNumber(asks[0].quantity), volumeLong)
               // this.buyCountInput = buy_count
               // this.$refs.buyCountInputRef.value = buy_count
            }
            if (this.isInitPage && bids.length > 0) {
               let sellInput = subNumberPoint(scientificToNumber(bids[0].price), priceLong)
               this.$refs.sellInput.value = sellInput
               this.sellPriceInput = sellInput

               // let  sell_count = bigDecimal.round(scientificToNumber(bids[0].quantity), volumeLong)
               // this.$refs.sellCountInputRef.value = sell_count
               // this.sellCountInput = sell_count
            }
            this.isInitPage = false
         },
         //**********************下单 买入卖出 */
         //数量百分比球
         changeBuyBall(e, val) {
            if (this.isLogin) {
               let value = ''
               if (e) {
                  value = e.target.getAttribute('data-num')
                  if (value) {
                     this.buyRangeValue = value * 100
                  }
               } else {
                  value = val / 100
               }
               let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
               this.buyBallPercentage = value
               this.$refs.buyCountInputRef.value = bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage) === "0" ? '0' : subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
               this.buyCountInput = subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
            }

            // if (e.target.getAttribute('data-num')) {
            //    this.buyRangeValue = e.target.getAttribute('data-num') * 100
            //    let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            //    this.buyBallPercentage = e.target.getAttribute('data-num')
            //    this.$refs.buyCountInputRef.value = bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage) === "0" ? '0' : subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
            //    this.buyCountInput = subNumberPoint(bigDecimal.multiply(this.buyBallTotal, this.buyBallPercentage), volumeLong)
            // }
         },
         changeSellBall(e, val) {
            if (this.isLogin) {
               let value = ''
               if (e) {
                  value = e.target.getAttribute('data-num')
                  if (value) {
                     this.sellRangeValue = value * 100
                  }
               } else {
                  value = val / 100
               }
               let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
               this.sellBallPercentage = value
               this.$refs.sellCountInputRef.value = bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage) === '0' ? '0' : subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
               this.sellCountInput = subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
            }
            // if (e.target.getAttribute('data-num')) {
            //    this.sellRangeValue = e.target.getAttribute('data-num') * 100
            //    let volumeLong = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            //    this.sellBallPercentage = e.target.getAttribute('data-num')
            //    this.$refs.sellCountInputRef.value = bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage) === '0' ? '0' : subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
            //    this.sellCountInput = subNumberPoint(bigDecimal.multiply(this.sellBallTotal, this.sellBallPercentage), volumeLong)
            // }
         },
         handleBuyPriceInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //GBBO 锁图标打开
            this.buy_input_change = true
            //重置为空样式
            this.buyPriceEmpty = false
            let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
            //    e.target.value = onlyInputNumAndPoint(e.target.value,6)
            e.target.value = onlyInputNumAndPoint(e.target.value, pricelong)
            this.buyPriceInput = e.target.value
         },
         handleBuyCountInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置样式
            this.buyCountEmpty = false
            let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize)
            this.buyCountInput = e.target.value
         },
         handleSellPriceInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //GBBO 锁图标打开
            this.sell_input_change = true
            //重置为空样式
            this.sellPriceEmpty = false
            let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, pricelong)
            this.sellPriceInput = e.target.value
         },
         handleSellCountInput(e) {
            if (!this.symbolList[this.currentSymbol]) {
               return
            }
            //重置样式
            this.sellCountEmpty = false
            let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
            e.target.value = onlyInputNumAndPoint(e.target.value, quantityStepSize)
            this.sellCountInput = e.target.value
         },
         //展示可用的资产
         getMyAssetData() {
            if (!this.isLogin) {
               return false;
            }
            if (this.myBanalceTimer) {
               clearTimeout(this.myBanalceTimer)
               this.myBanalceTimer = null
            }
            let baseAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['baseAssetPrecision']
            let quoteAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['quoteAssetPrecision']

            //查询账户资产
            this.exchange.balance((data) => {
               // this.baseAssetAvailable = '--'
               // this.quoteCoinAvailable = '--'
               this.baseAssetAvailable = subNumberPoint(0, baseAssetQuantityLong)
               this.quoteCoinAvailable = subNumberPoint(0, quoteAssetQuantityLong)
               data.map((v, i) => {
                  if (v.currency === 'FF' && v.available == 0 && this.commissionTemplateId) {
                     //FF为0 折扣开关一打开
                     this.FFDeductible = 2
                  }
                  if (v.currency === this.currentSymbolObj.baseAsset) {
                     this.baseAssetAvailable = subNumberPoint(v.available, baseAssetQuantityLong)
                  } else if (v.currency === this.currentSymbolObj.quoteAsset) {
                     this.quoteCoinAvailable = subNumberPoint(v.available, quoteAssetQuantityLong)
                  }
               })
               this.myBanalceTimer = setTimeout(() => {
                  this.getMyAssetData()
               }, 60000)
            })
         },
         /****
          * 委托单 我的成交记录
          *
          *
          *
          */
         //获取推送的订单
         getSSEOrderList() {
            if (!this.isLogin) {
               return false;
            }
            let sseOrderCount = 0
            //刚进页面初始数据
            this.updateOpenListAndCompletedList();
            this.exchange.listFilledOrder((token, accountId) => {
               let baseURL = window.location.protocol + '//' + window.location.host
               //判断orderId
               this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
               this.SSE_order.onopen = function (e) {
               };
               this.SSE_order.addEventListener('_RESULT', (e) => {
                  let result = JSON.parse(e.data)
                  if (result) {
                     //更新列表
                     this.updateOpenListAndCompletedList();
                     //查询可用资产
                     this.getMyAssetData()
                  }
               })
               this.SSE_order.addEventListener('_ERROR', function (e) {
               })
               this.SSE_order.onerror = (e) => {
                  this.SSE_order.close()
                  if (sseOrderCount > 5) return
                  setTimeout(() => {
                     sseOrderCount += 1
                     this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
                  }, 3000)
               };
            })
         },
         //更新挂单 成交记录 更新我的委托单
         updateOpenListAndCompletedList() {
            if (!this.isLogin) {
               return false;
            }
            //更新我的委托单
            this.exchange.listOpenOrder(function (data) {
               let arr = []
               data.map((v, i) => {
                  if (this.symbolList[v.symbol]) {
                     v.isDisabled = false
                     v.btnText = 'bbjyCancel'
                     v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
                     // v.orderType = v.orderType==="LIMIT"?"限价单":''
                     let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
                     let quantityLong = this.symbolList && this.symbolList[v.symbol]['quantityStepSize']
                     v.symbol = addSymbolSplitLine(v.symbol)
                     v.limitPrice = bigDecimal.round(v.limitPrice, getDecimalsNum(priceLong))
                     v.filledCumulativeQuantity = bigDecimal.round(v.filledCumulativeQuantity, getDecimalsNum(quantityLong))
                     v.quantity = bigDecimal.round(v.quantity, getDecimalsNum(quantityLong))
                     // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
                     v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(), 100), 2);
                     v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice, v.quantity), 8)
                     if (v.orderStatus == 'PENDING_SUBMIT' && v.cancelledUpdateAt) {
                        v.isDisabled = true
                        v.btnText = 'bbjyCancelling'
                     }
                     arr.push(v)
                  }
               })
               this.myOpenList = arr
            }.bind(this))
            //更新我的成交记录
            this.exchange.listCompletedOrder(1, function (res) {
               let arr = []
               res.data.map((v, i) => {
                  if (this.symbolList[v.symbol]) {
                     v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
                     // v.orderType = v.orderType==="LIMIT"?"限价单":''
                     let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
                     let quantityLong = this.symbolList && this.symbolList[v.symbol]['quantityStepSize']
                     v.symbol = addSymbolSplitLine(v.symbol)
                     v.filledAveragePrice = bigDecimal.round(v.filledAveragePrice, getDecimalsNum(priceLong))
                     v.limitPrice = bigDecimal.round(v.limitPrice, getDecimalsNum(priceLong))
                     v.filledCumulativeQuantity = bigDecimal.round(v.filledCumulativeQuantity, getDecimalsNum(quantityLong))
                     v.quantity = bigDecimal.round(v.quantity, getDecimalsNum(quantityLong))
                     if (!Number(v.quantity) == 0) {
                        // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
                        v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(), 100), 2);
                     } else {
                        v.percent = 0
                     }
                     v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice, v.quantity), 8)
                     arr.push(v)
                  }
               })
               this.myCompletedList = arr
            }.bind(this))
         },
         //交易密码
         getPswData(callbackData) {
            if (callbackData && callbackData.length === 6) {
               //跳转到再次输入密码页面
               this.exchangePassWord = callbackData
            }
         },
         //撤单
         cancelMyOrder(orderId, v) {
            v.isDisabled = true;
            if (!orderId) {
               return false;
            } else if (!this.currentSymbol) {
               return false;
            }
            //撤单操作
            this.orderType = 'cancel'
            this.orderID = orderId
            // let status = this.symbolList[v.symbol].status
            // if (status == "HALT") {
            //     //账户停止
            //     // showError("account-error");
            //     this.$Message.warning(this.$t('bbjyAccountError'));
            // } else
            if (!this.isSetTradePasswrod) {
               //交易密码是否设置
               this.$Notice.warning({
                  title: this.$t('bbjyNoPasswordError'),
               });
               setTimeout(function () {
                  this.$router.push('/originTradePassword')
               }.bind(this), 1000);

               //继续撤单
            } else if (this.$store.state.exchange.inputTradePassWordStatus) {
               //密码
               if (getValue("ORDER_SESSION")) {
                  //密码为失效
                  this.exchange.cancelOrder(this.orderID, null, (data) => {
                     //撤单成功
                     this.$Notice.success({
                        title: this.$t('tsTips'),
                        desc: this.$t('bbjyCancelMsg'),
                     })
                  }, () => {
                     v.isDisabled = false;
                  });
               } else {
                  this.openPassWordPage();
                  v.isDisabled = false;
               }
            } else {
               this.submitPassWord()
            }

         },
           buyBtn() {
            window._czc.push(["_trackEvent", '币币交易页面', '点击', '买入按钮', 0, 'buyBtn']);
            if (!this.symbolList || JSON.stringify(this.symbolList) == "{}" || !this.symbolList[this.currentSymbol]) {
               //暂停交易
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyStop'),
               });
               return
            }
            this.orderType = 'BUY'
            this.buyDisabled = true
            let minPrice = this.symbolList[this.currentSymbol].minPrice
            let maxPrice = this.symbolList[this.currentSymbol].maxPrice
            let minQuantity = this.symbolList[this.currentSymbol].minQuantity
            let maxQuantity = this.symbolList[this.currentSymbol].maxQuantity
            let status = this.symbolList[this.currentSymbol].status
            let priceTickSize = this.symbolList[this.currentSymbol].priceTickSize
            let quantityStepSize = this.symbolList[this.currentSymbol].quantityStepSize
            let isPriceSize = isDivideAll(this.buyPriceInput, priceTickSize)
            let isQuantitySize = isDivideAll(this.buyCountInput, quantityStepSize)
            if (!this.buyPriceInput) {
               this.buyPriceEmpty = true
               //买入价格
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyEnterBuyPrice'),
               });
               this.buyDisabled = false
            } else if (!this.buyCountInput) {
               this.buyCountEmpty = true
               //数量
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyEnterBuyVolume'),
               });
               this.buyDisabled = false
            } else if (Number(this.buyPriceInput) > Number(maxPrice)) {
               //买入价格不能超过
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyPriceNotMore') + ' ' + maxPrice,
               });
               this.buyDisabled = false
            } else if (Number(this.buyPriceInput) < Number(minPrice)) {
               // this.$Message.warning('买入价格不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyPriceNotLess') + ' ' + minPrice,
               });
               this.buyDisabled = false
            } else if (Number(this.buyCountInput) > Number(maxQuantity)) {
               // this.$Message.warning('买入数量不能超过'+maxQuantity);
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyVolumeNotMore') + ' ' + maxQuantity,
               });
               this.buyDisabled = false
            } else if (Number(this.buyCountInput) < Number(minQuantity)) {
               // this.$Message.warning('买入数量不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyVolumeNotLess') + ' ' + minQuantity,
               });
               this.buyDisabled = false
            } else if (Number(this.buyInTotal) > Number(this.quoteCoinAvailable)) {
               // this.$Message.warning('买入总额不能超过'+可用资产);
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyTotalNotMore') + ' ' + this.$t('bbjyBuyAvailable').toLowerCase(),
               });
               this.buyDisabled = false
            } else if (!isPriceSize) {
               // 价格整数倍于
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyPriceMultiple') + ' ' + priceTickSize,
               });
               this.buyDisabled = false
            } else if (!isQuantitySize) {
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyBuyVolumeMultiple') + ' ' + quantityStepSize,
               });
               this.buyDisabled = false
            } else if (status == "HALT") {
               //账户停止
               this.$Notice.warning({
                  title: this.$t('tsTips'),
                  desc: this.$t('bbjyAccountError'),
               });
               this.buyDisabled = false
            }
            //没有设置交易密码直接下单 增加逻辑
            else if(!this.isSetTradePasswrod) { // 未设置交易密码
            // else if (!this.$store.state.exchange.inputTradePassWordStatus) {
               this.$Notice.warning({
                  title: this.$t('bbjyNoPasswordError'),
               });
               this.buyDisabled = false
               setTimeout(function () {
                  this.$router.push('/originTradePassword')
               }.bind(this), 1000);
            }
            else if (this.$store.state.exchange.inputTradePassWordStatus) {              
              //需要输入密码
              if (getValue("ORDER_SESSION")) {
                this.exchange.createGBBOOrder({
                      "symbol": this.currentSymbol,
                      "orderType": "LIMIT",
                      "orderSide": this.orderType,
                      "quantity": this.buyCountInput,
                      "limitPrice": this.buyPriceInput
                  }, null, () => {
                      this.buyDisabled = false
                      this.$Notice.success({
                        title: this.$t('tsTips'),
                        desc: this.$t('bbjyOrderSuccess'),
                      });
                      this.getOrderId()
                  },() => {
                    this.buyDisabled = false;
                  }
                );
              } else {
                this.openPassWordPage();
              }
            }else {
              //直接下单
              this.submitPassWord()
            }
           },
         sellBtn() {
            window._czc.push(["_trackEvent", '币币交易页面', '点击', '卖出按钮', 0, 'sellBtn']);
            if (!this.symbolList || JSON.stringify(this.symbolList) == "{}" || !this.symbolList[this.currentSymbol]) {
               //暂停交易
               this.$Notice.warning({
                  title: this.$t('bbjyStop'),
               })
               return
            }
            this.orderType = 'SELL'
            let minPrice = this.symbolList[this.currentSymbol].minPrice
            let maxPrice = this.symbolList[this.currentSymbol].maxPrice
            let minQuantity = this.symbolList[this.currentSymbol].minQuantity
            let maxQuantity = this.symbolList[this.currentSymbol].maxQuantity
            let status = this.symbolList[this.currentSymbol].status
            let priceTickSize = this.symbolList[this.currentSymbol].priceTickSize
            let quantityStepSize = this.symbolList[this.currentSymbol].quantityStepSize
            let isPriceSize = isDivideAll(this.sellPriceInput, priceTickSize)
            let isQuantitySize = isDivideAll(this.sellCountInput, quantityStepSize)
            if (!this.sellPriceInput) {
               this.sellPriceEmpty = true
               // this.$Message.warning('请输入卖出价格');
               this.$Notice.warning({
                  title: this.$t('bbjyEnterSellPrice'),
               });
               this.sellDisabled = false;
            } else if (!this.sellCountInput) {
               this.sellCountEmpty = true
               // this.$Message.warning('请输入卖出数量');
               this.$Notice.warning({
                  title: this.$t('bbjyEnterSellVolume'),
               });
               this.sellDisabled = false;
            } else if (Number(this.sellPriceInput) > Number(maxPrice)) {
               // this.$Message.warning('卖出价格不能超过'+maxPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceNotMore') + ' ' + maxPrice,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellPriceInput) < Number(minPrice)) {
               // this.$Message.warning('卖出价格不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceNotLess') + ' ' + minPrice,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellCountInput) > Number(maxQuantity)) {
               // this.$Message.warning('卖出数量不能超过'+maxQuantity);
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeNotMore') + ' ' + maxQuantity,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellCountInput) < Number(minQuantity)) {
               // this.$Message.warning('卖出数量不能少于'+minPrice);
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeNotLess') + ' ' + minQuantity,
               });
               this.sellDisabled = false;
            } else if (Number(this.sellCountInput) > Number(this.baseAssetAvailable)) {
               // this.$Message.warning('卖出数量不能超过'+可用资产);
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeNotMore') + ' ' + this.$t('bbjyBuyAvailable').toLowerCase(),
               });
               this.sellDisabled = false;
            } else if (!isPriceSize) {
               // 价格整数倍于
               this.$Notice.warning({
                  title: this.$t('bbjySellPriceMultiple') + ' ' + priceTickSize,
               });
               this.sellDisabled = false;
            } else if (!isQuantitySize) {
               this.$Notice.warning({
                  title: this.$t('bbjySellVolumeMultiple') + ' ' + quantityStepSize,
               });
               this.sellDisabled = false;
            } else if (status == "HALT") {
               //账户停止
               this.$Notice.warning({
                  title: this.$t('bbjyAccountError'),
               });
               this.sellDisabled = false;
            }
            //未设置交易密码直接下单
            else if (!this.isSetTradePasswrod) {
               this.$Notice.warning({
                  title: this.$t('bbjyNoPasswordError'),
               });
               setTimeout(function () {
                  this.$router.push('/originTradePassword')
               }.bind(this), 1000);
            }
            else if (this.$store.state.exchange.inputTradePassWordStatus) {
               //需要输入交易密码
               if (getValue("ORDER_SESSION")) {
                  this.sellDisabled = true;                  
                  this.exchange.createGBBOOrder({
                        "symbol": this.currentSymbol,
                        "orderType": "LIMIT",
                        "orderSide": this.orderType,
                        "quantity": this.sellCountInput,
                        "limitPrice": this.sellPriceInput
                    },
                    null,
                    (data) => {
                        // orderComplete();
                        this.sellDisabled = false;
                        this.$Notice.success({
                          title: this.$t('tsTips'),
                          desc: this.$t('bbjyOrderSuccess'),
                        });
                        this.getOrderId()
                    },
                    (data) => {
                        this.sellDisabled = false;
                    }
                  );
               } else {
                  this.openPassWordPage();
               }
            } else {
               //下单
               this.submitPassWord()
            }
         },
         openPassWordPage() {
            // if (this.$store.state.exchange.openTradePasswordStatus) {
               document.body.style.overflow = 'hidden';
               this.showPassWordPage = true;
            // } else {
            //    this.submitPassWord()
            // }
         },
         closePassWordPage() {//关闭交易密码页面
            this.showPassWordPage = false;
            this.sellDisabled = false;
            this.buyDisabled = false;
            this.exchangePassWord = null
            document.body.style.overflow = '';
         },
         clickMask() {//交易框获取焦点
            this.$refs.childPassWord.getFocus();
         },
         //跳转到股票详情页
         gotoStockPage() {
            if (this.currentSymbolObj) {
               this.$router.push({
                  path: '/StockToken',
                  query: {
                     symbol: this.currentSymbolObj.symbol,
                     baseAsset: this.currentSymbolObj.baseAsset
                  }
               })
            }
         },
         //切换深度 交易历史
         changeDepth(index) {
            this.isShowDepth = index
            //盘口保持卖一价可见
            if (this.$refs.buyOrderContainer) {
               var buyDiv = this.$refs.buyOrderContainer;
               //此时必须异步执行滚动条滑动至底部
               setTimeout(() => {
                  buyDiv.scrollTop = buyDiv.scrollHeight;
               }, 0)
            }
            if (this.$refs.sellOrderContainer) {
               var sellDiv = this.$refs.sellOrderContainer;
               //此时必须异步执行滚动条滑动至底部
               setTimeout(() => {
                  sellDiv.scrollTop = 0
               }, 0)
            }
            this.$refs.tradeHistory.scrollTop = 0
         },
         submitPassWord() {//提交交易密码页面
            if (this.$store.state.exchange.inputTradePassWordStatus && this.showPassWordPage) {
               if (this.exchangePassWord == null || this.exchangePassWord.length < 6) {
                  this.$Notice.warning({
                     title: this.$t('bbjyInputPassword'),
                  });
                  return false
               }
            } else {
               this.exchangePassWord = ""
            }
            if (this.orderType === "cancel") {
               this.exchange.cancelOrder(this.orderID, this.exchangePassWord, (data) => {
                  //隐藏密码输入框
                  this.closePassWordPage()
                  //撤单成功
                  this.$Notice.success({
                     title: this.$t('tsTips'),
                     desc: this.$t('bbjyCancelMsg'),
                  })
               }, () => {
                  // v.isDisabled = false;
               });
            } else {
               this.sellDisabled = true;
               this.buyDisabled = true;
               if (this.isGBBO) {
                  this.exchange.createGBBOOrder(
                     {
                        "symbol": this.currentSymbol,
                        "orderType": "LIMIT",
                        "orderSide": this.orderType,
                        "quantity": this.orderType === "BUY" ? this.buyCountInput : this.sellCountInput,
                        "limitPrice": this.orderType === "BUY" ? this.buyPriceInput : this.sellPriceInput,
                     },
                     this.exchangePassWord,
                     (data) => {
                        this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                        this.$Notice.success({
                           title: this.$t('tsTips'),
                           desc: this.$t('bbjyOrderSuccess'),
                        });
                        //隐藏密码框
                        this.closePassWordPage()
                        this.getOrderId()
                     }, (error) => {
                        //错误提示
                        this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                        this.closePassWordPage()
                     }
                  );
               } else {
                  this.exchange.createNewOrder(
                     {
                        "symbol": this.currentSymbol,
                        "orderType": "LIMIT",
                        "orderSide": this.orderType,
                        "quantity": this.orderType === "BUY" ? this.buyCountInput : this.sellCountInput,
                        "limitPrice": this.orderType === "BUY" ? this.buyPriceInput : this.sellPriceInput,
                     },
                     this.exchangePassWord,
                     (data) => {
                        this.orderType === "BUY" ? this.buyDisabled = false : this.sellDisabled = false
                        if (this.orderType === "BUY" || this.orderType === "SELL") {
                           if (this.orderType === "BUY") {
                              this.buyCountInput = ''
                              this.$refs.buyCountInputRef.value = ''
                           } else {
                              this.sellCountInput = ''
                              this.$refs.sellCountInputRef.value = ''
                           }
                           this.$Notice.success({
                              title: this.$t('tsTips'),
                              desc: this.$t('bbjyOrderSuccess'),
                           });
                        }
                        //隐藏密码框
                        this.closePassWordPage()
                        this.getOrderId()
                     }, (error) => {
                        //错误提示
                        this.sellDisabled = false;
                        this.buyDisabled = false;
                        this.closePassWordPage()
                     }
                  );
               }

            }
         },
         rangeFormat(val) {
            return `${val}%`;
         },
         getOrderId() {
            return
            this.exchange.orderTicket = ''
            this.exchange.getOrderTicket((orderTicket) => {
               this.exchange.orderTicket = orderTicket
               this.orderTicketTimer = setTimeout(() => {
                  this.getOrderId()
               }, 9 * 60 * 1000)
            })
         },
      },
      filters: {
         formatNumberLength: function (value) {
            if (!value) return ''
            return bigDecimal.round(value, 8)
         }
      },
      watch: {
         currentSymbol(v) {
            //查询可用资产
            this.getMyAssetData()
         },
         $route(to, from) { //路由site变化
            // if (this.$route.query && this.$route.query.site) {
            //    let site = this.$route.query.site
            //    this.siteName = site
            //    this.siteIndexNumber = getIndexInObject(this.symbolListSelf, site)
            //    this.currentQuoteCoinName = getObjFirstValue(this.symbolListSelf[site])[0].quoteAsset
            // }
         },
         depthPageWidth(val) {
            //优化性能
            if (!this.depthTimer) {
               this.depthPageWidth = val
               this.depthTimer = true
               let that = this
               setTimeout(function () {
                  // that.screenWidth = that.$store.state.canvasWidth
                  that.depthTimer = false
               }, 500)
            }
         },
         listenstage: function (newV, oldV) {
            //法币估值做相应的刷新
            this.getCurrencyData()
            this.pageKeyword = this.$t(this.$route.meta.keywords)
            this.pageDescription = this.$t(this.$route.meta.description)
         }
      },
      computed: {
         buyInTotal: function () { //买入总价
            return bigDecimal.multiply(this.buyPriceInput, this.buyCountInput);
         },
         sellOutTatal: function () { //卖出总价
            return bigDecimal.multiply(this.sellPriceInput, this.sellCountInput);
         },
         buyBallTotal: function () { //能买入的总数量
            return this.buyPriceInput == 0 ? '' : new BigNumber(this.quoteCoinAvailable).dividedBy(new BigNumber(this.buyPriceInput)).toNumber()
         },
         sellBallTotal: function () { //能卖出的总数量
            return this.baseAssetAvailable
         },
         buyPriceCurrency: function () {
            if (this.buyPriceInput) {
               return new BigNumber(this.buyPriceInput).multipliedBy(new BigNumber(this.symbolCurrency)).dividedBy(new BigNumber(this.currentInfo.last)).toFixed(4)
            }
         },
         sellPriceCurrency: function () {
            if (this.sellPriceInput) {
               return new BigNumber(this.sellPriceInput).multipliedBy(new BigNumber(this.symbolCurrency)).dividedBy(new BigNumber(this.currentInfo.last)).toFixed(4)
            }
         },
         //监听vuex中数据的变化
         listenstage() {
            return this.$store.state.app.currentCurrencyState;
         },
         searchIn: function () {
            if (this.searchCoin !== '') {
               return this.markSymbolArr.filter((item) => {
                  return item.symbol.indexOf(this.searchCoin.toUpperCase()) > -1
               })
            }
            return this.markSymbolArr
         },
         myCompletedList_sort: function () {
            return this.myCompletedList.filter((item) => {
               if (this.hideCancleOrder) {
                  return item.orderStatus !== 'CANCELLED'
               } else {
                  return item
               }
            })
         }
      },
      created() {
         //可以往data上挂载
         var ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         // //登录以后查询资产 挂单 成交记录
         if (this.isLogin) {
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               if (this.loginToken) {
                  fn(this.loginToken);
               }
            }.bind(this);
            //是否设置过交易密码
            // if (localStorage.getItem('tradingPasswordFlag') === 'true') {
            //    this.setTradePassword = true
            // }
            //查询是否开启手续费折扣
            // this.exchange.getAccountInfo(data => {
            //     if(data.commissionTemplateId == "FF_DEDUCTIBLE"){
            //         this.commissionTemplateId = true
            //         this.FFDeductible = 3
            //     }else{
            //         this.commissionTemplateId = false
            //         this.FFDeductible = 1
            //     }
            // })
         }
        if(Cookies.get('loginToken')){
          getUserInfo(Cookies.get('loginToken'))
              .then((res) => {
                if(!res.code) {
                  // 是否设置交易密码
                  this.isSetTradePasswrod = res.isSetTradePasswrod
                }
              })
        }
      },
      beforeMount() {

         //交易相关的交易对
         this.getSymbolListData();
         //行情相关的交易对>>>>>>
         this.getSymbolListRealtimeData();
      },
      mounted() {
         let loginUserId = localStorage.getItem('loginUserId') || this.$route.query.loginUserId;
         if (this.$route.query.loginUserId!=='null'||this.$route.query.loginUserId!=='undefined' ||this.$route.query.loginUserId !==undefined) {
            localStorage.setItem('loginUserId', loginUserId);
         }
         this.$store.commit('changeHeaderColor', '#15232C');
         this.$store.commit('changeFooterColor', '#15232C');
         // 登录的情况下
         if (Cookies.get('loginToken') && localStorage.getItem('loginUserId')) {
            //获取交易密码开关
            this.$store.dispatch("getTradePassWordStatus");
         }

         this.depthPageWidth = this.$refs.buyOrderContainer.offsetWidth
         //盘口深度 监听窗口大小改变
         window.onresize = () => {
            return (() => {
               this.depthPageWidth = this.$refs.buyOrderContainer && this.$refs.buyOrderContainer.offsetWidth
            })()
         }

      },
      beforeDestroy() {
         //关闭盘口轮询查询
         clearTimeout(this.depthListTimer)
         clearTimeout(this.myBanalceTimer)
         clearTimeout(this.orderTicketTimer)
         this.myBanalceTimer = null
         this.depthListTimer = null
         this.orderTicketTimer = null

         //关闭SSE行情推送
         this.quoteWS && this.quoteWS.close();
         this.SSE_order && this.SSE_order.close();
         this.WSHistory && this.WSHistory.close();

         if (this.stompClient != null) {
            this.stompClient.disconnect();
         }
      }
   }
</script>
<style lang='less'>
   .aside-content {
      .ivu-tabs-nav-prev {
         display: none;
      }
      .ivu-tabs-nav-next {
         display: none;
      }
      .ivu-tabs-bar {
         border-bottom: 1px solid #202E36;
      }
      .ivu-tabs-nav .ivu-tabs-tab-active {
         color: #12869A;
      }
      .ivu-tabs-ink-bar {
         background-color: #12869A;
      }
      .ivu-tabs-nav .ivu-tabs-tab:hover {
         color: #12869A;
      }
      .ivu-tabs-nav .ivu-tabs-tab {
         // width: 15%;
         font-size: 14px;
         color: #C2D8E8;
         padding-top: 20px;
         padding-bottom: 17px;
      }
   }

   .history {
      .hideCancleOrder {
         margin-right: 20px;
         color: #688A9D;
         .ivu-checkbox-inner {
            width: 10px;
            height: 10px;
            top: -1px;
            border: 1px solid #688A9D;
            background-color: transparent;
         }
         .ivu-checkbox-checked .ivu-checkbox-inner {
            border-color: transparent;
            background-color: #96B1C3;
            /*对号样式*/
            &:after {
               top: -1px;
               left: 2px;
               width: 5px;
               border-color: #15232C;
            }
         }
      }
      .ivu-checkbox-wrapper-checked {
         color: #C2D8E8;

      }
   }

   .searchBox {
      .ivu-input-wrapper {
         margin-top: 20px;
         .ivu-input {
            background: #132029;
            border: 1px solid #263640;
            color: #C2D8E8;
            font-size: 12px;
            &:focus {
               border: 1px solid #C2D8E8;
               -webkit-box-shadow: none;
               box-shadow: none;
            }
         }

      }
   }

   #exchange {
      .ivu-carousel-item {
         padding: 10px 20px 0;
      }
      .ivu-tabs-nav-scrollable {
         padding: 0;
      }
      .ivu-tabs-mini .ivu-tabs-tab {
         padding-left: 15px;
         padding-right: 15px;
      }
      /*滑块*/
      .ivu-slider {
         width: 98%;
         margin: 0 auto;
      }
      .ivu-slider-wrap {
         height: 2px;
      }
      .ivu-slider-button-wrap {
         top: -6px;
         z-index: 2;
      }
      .ivu-slider-button {
         width: 16px;
         height: 16px;
         margin-top: -2px;
      }
      .ivu-slider-bar {
         height: 2px;
      }
      .ivu-tooltip-popper[x-placement^=top] {
         /*top: -35px !important;*/
      }
      .ivu-tooltip-inner {
         /*width: 40px;*/
         height: 20px;
         padding: 0 5px;
         text-align: center;
         border-radius: 2px;
         min-height: auto;
      }
      .ivu-icon, .ivu-icon-md-help-circle {
         font-size: 14px;
      }
      #range-box-buy {
         @buy-color: #27A781;
         .ivu-slider-wrap {
            background-color: #16453F;
         }
         .ivu-slider-button {
            border: solid 4px #173B3B;
         }
         .ivu-slider-bar, .ivu-tooltip-inner, .ivu-slider-button {
            background-color: @buy-color;
         }
         .ivu-tooltip-arrow {
            border-top-color: @buy-color;
         }
      }
      #range-box-sell {
         @sell-color: #CF424E;
         .ivu-slider-wrap {
            background-color: #3B292F;
         }
         .ivu-slider-button {
            border: solid 4px #392730;
         }
         .ivu-slider-bar, .ivu-tooltip-inner, .ivu-slider-button {
            background-color: @sell-color;
         }
         .ivu-tooltip-arrow {
            border-top-color: @sell-color;
         }
      }
      /*tooltip*/
      .ivu-tooltip-inner {
         max-width: none;
      }
   }
</style>

<style scoped lang="less">
   @import './exchange.less';
</style>
