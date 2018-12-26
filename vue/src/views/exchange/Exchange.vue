<template>
    <div class="wrapper" >
        <div class="container">
            <div class="content">
                <div class="up">
                    <!--左边币种信息-->
                    <div class="aside">
                        <div class="aside-content">
                            <!-- 分ABCD版块 -->
                            <!-- <ul class="board-box">
                                <li @click="changeBoard(key)" v-for="(value, key,index) in symbolListSelf" :class="[siteIndex == key?'boardTitleActive':'','boardTitle']">{{$t('Main')}} {{key}}</li>
                            </ul> -->
                            <!-- 分站点 -->
                            <div class="siteBox">
                                <div class="siteName">
                                    {{$t('BExchange')}} <Icon type="md-arrow-dropdown" size="16" class="triangle"/>
                                    <ul @click="changeBoard">
                                        <li data-value="B">{{$t('BExchange')}}</li>
                                        <!-- <li data-value="S">{{$t('SExchange')}}</li> -->
                                        <!-- <li data-value="F">{{$t('FExchange')}}</li> -->
                                        <li data-value="C">{{$t('CExchange')}}</li>
                                    </ul>
                                </div>
                            </div>
                            <ul class="coinTitle">
                                <li v-for="(value, key,index) in quoteCoinList">
                                    <div :class="[currentQuoteCoin == index?'coinTitleDivActive':'']" @click="changeQuoteCoin(index,key)">{{key}}</div>
                                </li>
                            </ul>
                            <Loading scale="5" v-model="boardLoading" style="margin:28px"/>
                            <Carousel v-model="quoteCoinIndex" :dots="'none'" :arrow="'never'">
                                <CarouselItem v-for="(value, key,index) in quoteCoinList">
                                    <ul class="nav">
                                        <li>{{$t('bbjyChooseType')}}</li>
                                        <li>{{$t('bbjyChoosePrice')}}</li>
                                        <li>%</li>
                                    </ul>
                                    <ul class="coinInfo">

                                        <li class="priceList" v-for="(v, key,index) in baseAssetList" @click="changeBaseAssetList(v)">
                                            <div class="priceItme">
                                                <!-- 收藏功能 -->
                                                <!-- <img  v-if="3 == 3" id="love" src="../../assets/images/header/heart2.svg" alt="" />
                                                <img v-else id="love" src="../../assets/images/header/heart1.svg" alt="" />  -->
                                                {{v.baseAsset}}
                                            </div>
                                            <div class="priceItme">{{v.last?v.last:'--'}}</div>
                                            <div class="priceItme redText" v-if="v.showColor == -1">{{v.percent}}</div>
                                            <div class="priceItme greenText" v-else >{{v.showColor == 1?'+':''}}{{v.percent}}</div>
                                        </li>
                                    </ul>
                                </CarouselItem>
                            </Carousel>
                        </div>
                    </div>
                    <!--右边图表及交易与盘口信息-->
                    <div class="main">
                        <div class="page-content" :class="{main_mask:isShowMask}" >
                            <div class="trading-chart">
                                <!--大盘信息-->
                                <div class="trading-box">
                                    <!--大盘信息-->
                                    <div class="trading-coin">
                                        <div class="coin-name"><span class="baseAsset">{{currentSymbolObj.baseAsset}}/</span><span class="quoteAsset">{{currentSymbolObj.quoteAsset}}</span></div>
                                        <div class="coin-price"><span class="current-price">{{currentInfo.last | scientificToNumber}} <span class="currencyRate">≈ {{symbolCurrency | scientificToNumber}} {{currencyName}}</span></span></div>
                                        
                                    </div>
                                    <ul class="price-list clearfix">
                                        <li>
                                            <!-- <p class="base">{{$t('bbjyChange')}}</p> -->
                                            <span class="base">{{$t('bbjyChange')}}</span>
                                            <span v-if="currentInfo.showColor == -1" class="redText"> {{currentInfo.percent}}</span>
                                            <span v-else class="greenText"> {{currentInfo.showColor == 1?'+':''}}{{currentInfo.percent}}</span>
                                        </li>
                                        <li>
                                            <span class="base">{{$t('bbjyHourHigh')}}</span>
                                            <span> {{currentInfo.high | scientificToNumber}}</span>
                                        </li>
                                        <li>
                                            <span class="base">{{$t('bbjyHourLow')}}</span>
                                            <span> {{currentInfo.low | scientificToNumber}}</span>
                                        </li>
                                        <li>
                                            <span class="base">{{$t("bbjyHourVol")}}</span>
                                            <span> {{currentInfo.volume | scientificToNumber}}</span>
                                        </li>
                                    </ul>
                                </div>
                                <!--这里是图表, 高度不定-->
                                <div style="height:480px;margin-top:0px;position:relative;overflow: hidden">
                                    <TVChartContainer :symbol="currentSymbol"/>
                                </div>
                            </div>
                            <div class="trade-wrap clearfix">
                                <!--左侧交易信息-->
                                <div class="trade-panel">
                                    <!--买入-->
                                    <div class="buy-panel buy-sell-common">
                                        <div class="trade-title">
                                            <strong class="greenText">
                                                <em >{{$t("bbjyBuyTitle")}}</em>&nbsp;
                                                <span class="baseAsset">{{currentInfo.baseAsset}}</span>
                                            </strong>
                                            <div class="space-between">
                                                <span class="available">
                                                    <!-- 可用 -->
                                                    <em >{{$t("bbjyBuyAvailable")}}</em>&nbsp;
                                                    <span  v-if="isLogin">{{quoteCoinAvailable | scientificToNumber}}</span>
                                                    <span  v-else>--</span>&nbsp;&nbsp;
                                                    <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
                                                </span>
                                                <!--<a class="text">Deposit</a>-->
                                            </div>
                                            <!--<div class="cost-price">Cost price： <span>10.56</span> <span>USDT</span>-->
                                            <!--<i class="iconfont">&#xe60a;</i>-->
                                            <!--</div>-->
                                        </div>
                                        <div class="trade-msg">
                                            <p class="label">{{$t("bbjyBuyPrice")}}</p>
                                            <div class="price-box">
                                                <input   @input="handleBuyPriceInput" type="text" ref="buyInput" maxlength="14" :class="{'input-empty-color':buyPriceEmpty}"  class="input-price" autocomplete="off"  style="ime-mode:disabled"   ondragenter="return false">
                                                <div class="name-show vertically-centered quoteAsset">{{currentInfo.quoteAsset}}</div>
                                                <div class="currencyInput"> ≈ {{buyPriceCurrency | scientificToNumber}} {{currencyName}}</div>
                                            </div>
                                            <p class="label amount">{{$t("bbjyBuyAmount")}}</p>
                                            <div class="price-box">
                                                <input  @input="handleBuyCountInput" type="text" maxlength="14" ref="buyCountInputRef" :class="{'input-empty-color':buyCountEmpty}"  class="input-num" autocomplete="off"  style="ime-mode:disabled"   ondragenter="return false">
                                                <div class="name-show vertically-centered baseAsset">{{currentInfo.baseAsset}}</div>
                                            </div>
                                            <div class="range">
                                                <div class="path"></div>
                                                <div class="range-ball" data-side="buy" :data="buyBallTotal" @click="changeBuyBall">
                                                    <div class="ball" style="left: 0;transform: translateX(0);" data-num="0">
                                                        <div  v-if="buyBallPercentage == '0'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 25%;transform: translateX(-25%);" data-num="0.25">
                                                        <div  v-if="buyBallPercentage == '0.25'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 50%;transform: translateX(-50%);" data-num="0.5">
                                                        <div  v-if="buyBallPercentage == '0.5'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 75%;transform: translateX(-75%);" data-num="0.75">
                                                        <div  v-if="buyBallPercentage == '0.75'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 100%;transform: translateX(-100%);" data-num="1">
                                                        <div  v-if="buyBallPercentage == '1'"class="active-ball"></div>
                                                    </div>
                                                </div>
                                                <div class="range-num">
                                                    <div class="num" style="left: 0;transform: translateX(0);"> 0</div>
                                                    <div class="num" style="left: 25%;transform: translateX(-25%);">25</div>
                                                    <div class="num" style="left: 50%;transform: translateX(-50%);">50</div>
                                                    <div class="num" style="left: 75%;transform: translateX(-75%);">75</div>
                                                    <div class="num" style="left: 100%;transform: translateX(-100%);">100</div>
                                                </div>
                                            </div>
                                            <p class="label">
                                                <em>{{$t("bbjyBuyTotal")}}</em>&nbsp;&nbsp;
                                                <span id="buy_total" class="total-num">{{buyInTotal}}</span>&nbsp;
                                                <span><span class="quoteAsset">{{currentInfo.quoteAsset}}</span></span>
                                            </p>
                                            <button class="mybtn un-login-btn dis-n btn-back" v-if="!isLogin">
                                                    <router-link to='/login' class="text">{{$t('bbjyBuyLogin')}}</router-link>
                                                    <em>{{$t("bbjyOr")}}</em>
                                                    <router-link class="text" to='/register'>{{$t('bbjyBuyRegister')}}</router-link>
                                                    <em>{{$t("bbjyToTrade")}}</em>
                                            </button>
                                            <!-- 买入按钮 -->
                                            <button class="mybtn login-btn dis-n buy-btn buy-sell-btn" :disabled="buyDisabled" @click="buyBtn" v-else>
                                                <span >{{$t("bbjyBuyOperation")}}</span>
                                                <div style="margin-left:10px;margin-top:5px;">
                                                    <Loading scale="1" v-model="buyBtnLoading"/>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="buy-sell-line"></div>
                                    <!--卖出-->
                                    <div class="sell-panel buy-sell-common">
                                        <div class="trade-title">
                                            <strong class="redText"><em>{{$t("bbjySellTitle")}}</em>&nbsp;<span class="baseAsset">{{currentInfo.baseAsset}}</span></strong>
                                            <div class="space-between">
                                                <span class="available text-common base">
                                                    <em >{{$t("bbjySellAvailable")}}</em>&nbsp;
                                                    <span  v-if="isLogin">{{baseAssetAvailable | scientificToNumber}}</span>
                                                    <span  v-else>--</span>&nbsp;&nbsp;
                                                    <span class="baseAsset">{{currentInfo.baseAsset}}</span>
                                                </span>
                                                <!--<a class="text">Deposit</a>-->
                                            </div>
                                        </div>
                                        <div class="trade-msg">
                                            <p class="label">{{$t("bbjySellPrice")}}</p>
                                            <div class="price-box">
                                                <input  @input="handleSellPriceInput" type="text" maxlength="14" ref="sellInput" :class="{'input-empty-color':sellPriceEmpty}" class="input-price"
                                                    autocomplete="off"
                                                    style="ime-mode:disabled"
                                                    ondragenter="return false"
                                                />
                                                <div class="name-show vertically-centered quoteAsset">{{currentInfo.quoteAsset}}</div>
                                                <div class="currencyInput"> ≈ {{sellPriceCurrency | scientificToNumber}} {{currencyName}}</div>
                                            </div>
                                            <!--<div class="trans">≈<span>4382.61</span><span>CNY</span></div>-->
                                            <p class="label amount">{{$t("bbjySellAmount")}}</p>
                                            <div class="price-box">
                                                    <input  @input="handleSellCountInput" type="text" ref="sellCountInputRef"  maxlength="14" :class="{'input-empty-color':sellCountEmpty}" class="input-price"
                                                        autocomplete="off" data-style="amount"
                                                        style="ime-mode:disabled"
                                                        ondragenter="return false"
                                                    />
                                                <div class="name-show vertically-centered baseAsset">{{currentInfo.baseAsset}}</div>
                                            </div>
                                            <div class="range">
                                                <div class="path"></div>
                                                <div class="range-ball" data-side="sell" :data="sellBallTotal" @click="changeSailBall">
                                                     <div class="ball" style="left: 0;transform: translateX(0);" data-num="0">
                                                        <div  v-if="sellBallPercentage == '0'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 25%;transform: translateX(-25%);" data-num="0.25">
                                                        <div  v-if="sellBallPercentage == '0.25'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 50%;transform: translateX(-50%);" data-num="0.5">
                                                        <div  v-if="sellBallPercentage == '0.5'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 75%;transform: translateX(-75%);" data-num="0.75">
                                                        <div  v-if="sellBallPercentage == '0.75'"class="active-ball"></div>
                                                    </div>
                                                    <div class="ball" style="left: 100%;transform: translateX(-100%);" data-num="1">
                                                        <div  v-if="sellBallPercentage == '1'"class="active-ball"></div>
                                                    </div>
                                                </div>
                                                <div class="range-num">
                                                    <div class="num" style="left: 0;transform: translateX(0);">0</div>
                                                    <div class="num" style="left: 25%;transform: translateX(-25%);">25</div>
                                                    <div class="num" style="left: 50%;transform: translateX(-50%);">50</div>
                                                    <div class="num" style="left: 75%;transform: translateX(-75%);">75</div>
                                                    <div class="num" style="left: 100%;transform: translateX(-100%);">100</div>
                                                </div>
                                            </div>
                                            <!-- 总价 -->
                                            <p class="label"><em>{{$t("bbjySellTotal")}}</em>&nbsp;&nbsp;
                                                    <span class="total-num">{{sellOutTatal}}</span>&nbsp;
                                                    <span class="quoteAsset">{{currentInfo.quoteAsset}}</span>
                                            </p>
                                            <!-- 卖出按钮 -->
                                            <button class="mybtn un-login-btn dis-n btn-back" v-if="!isLogin">
                                                <router-link to='/login' class="text">{{$t('bbjyBuyLogin')}}</router-link>
                                                <em>{{$t("bbjyOr")}}</em>
                                                <router-link class="text" to='/register'>{{$t('bbjyBuyRegister')}}</router-link>
                                                <em>{{$t("bbjyToTrade")}}</em>
                                            </button>
                                            <button class="mybtn login-btn dis-n sell-btn buy-sell-btn" :disabled="sellDisabled"  @click="sellBtn" v-else><em >{{$t("bbjySellOperation")}}</em> </button>
                                        </div>
                                    </div>
                                </div>
                                <!--右侧盘口信息-->
                                <div class="order-book">
                                    <div class="order-book-content">
                                        <!--卖单-->
                                        <div class="sell-buy-orders">
                                            <div class="order">
                                                <ul class="item-title-list list-title">
                                                    <li class="temp"></li>
                                                    <li class="text-title">
                                                        <em >{{$t('bbjyNowPrice')}}</em>(<span class="quoteAsset">{{currentInfo.quoteAsset }}</span>)
                                                    </li>
                                                    <li class="text-title">
                                                        <em >{{$t('bbjyNowAmount')}}</em>(<span class="baseAsset">{{currentInfo.baseAsset}}</span>)
                                                    </li>
                                                    <li class="text-title">
                                                        <em >{{$t('bbjyNowTotal')}}</em>(<span class="quoteAsset">{{currentInfo.quoteAsset}}</span>)
                                                    </li>
                                                </ul>
                                                <Loading scale="2" v-model="depthLoading" style="position:absolute;top:40px;left:90px"/>
                                                <ul class="orders-body"  ref="buyOrderContainer">
                                                    <li v-for="v in asksArr" @click="getClickSellPrice(v.price)">
                                                        <span class="redText">{{v.num}}</span>
                                                        <span class="pointer">{{v.price}}</span>
                                                        <span>{{v.quantity}}</span>
                                                        <span>{{v.total}}</span>
                                                        <b class="sell-order-color" :style="{width:v.width+'px'}"></b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="current">
                                            <span class="current-price pointer" @click="getClickPrice(currentSymbolObj.last)">{{this.currentSymbolObj.last}}</span>
                                            <span class="currencyRate"> ≈ {{symbolCurrency | scientificToNumber}} {{currencyName}}</span>
                                        </div>
                                        <!--买单-->
                                        <div class="sell-buy-orders">
                                            <div class="order">
                                                <Loading scale="2" v-model="depthLoading" style="position:absolute;top:20px;left:90px"/>
                                                <ul class="orders-body">
                                                    <li v-for="v in bidsArr" @click="getClickBuyPrice(v.price)">
                                                        <span class="greenText">{{v.num}}</span>
                                                        <span>{{v.price}}</span>
                                                        <span>{{v.quantity}}</span>
                                                        <span>{{v.total}}</span>
                                                        <b class="buy-order-color" :style="{width:v.width+'px'}"></b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="more text-right"></div>
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
                                    <span class="text" >{{$t('bbjyDistance')}}</span>
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
                </div>

                <!-- 下部 委托单 成交记录 交易历史 -->
                <div class="below clearfix">
                    <!--左侧委托单-->
                    <div class="below-left">
                        <div class="open-order">
                            <ul class="space-between item-title">
                                <li>{{$t("bbjyOpenOrders")}}</li>
                                <li>
                                    <router-link to='/order'><em class="baseColor">{{$t('bbjyOrderAll')}}</em></router-link>
                                </li>
                            </ul>
                            <div class="table-box">
                                <ul width="100%">
                                    <li class="tr-title">
                                        <div>{{$t('bbjyOrderDate')}}</div>
                                        <div >{{$t("bbjyOrderPair")}}</div>
                                        <div class="bbjyOrderType">{{$t("bbjyOrderType")}}</div>
                                        <div >{{$t("bbjyOrderSide")}}</div>
                                        <div class="addflex">{{$t("bbjyOrderPrice")}}</div>
                                        <div class="addflex">{{$t("bbjyOrderAmount")}}</div>
                                        <div class="addflex">{{$t("bbjyOrderFilled")}}</div>
                                        <div class="addflex">{{$t("bbjyOrderTotal")}}</div>
                                        <div class="cancleBtn">{{$t("bbjyOperation")}}</div>
                                    </li>
                                    <li class="no-order dis-n" v-if="myOpenList.length == 0">
                                        <div  class="no-open addflex">{{$t("bbjyOrderTIP")}}</div>
                                    </li>
                                    <li v-else v-for="(v,i) in myOpenList" class="orderItem">
                                        <div class="baseText" >{{v.createdAt}}</div>
                                        <div class="baseText" >{{v.symbol}}</div>
                                        <div class="baseText bbjyOrderType" >{{$t(v.orderType)}}</div>
                                        <div :class="[v.orderSide == 'BUY'?'greenText':'redText']">{{$t(v.orderSide)}}</div>
                                        <div class="baseText addflex" >{{v.limitPrice}}</div>
                                        <div class="baseText addflex" >{{v.filledCumulativeQuantity +'/'+ v.quantity}}</div>
                                        <div class="baseText addflex" >{{v.percent}}%</div>
                                        <div class="baseText addflex" >{{v.total}}</div>
                                        <!-- 撤单 -->
                                        <div class="cancleBtn"><a class="cancel" @click="cancelMyOrder(v.orderId,v)" :disabled="v.isDisabled">{{$t(v.btnText)}}</a></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="history">
                            <ul class="space-between item-title">
                                <li>{{$t("bbjyHistory")}}</li>
                                <li>
                                    <router-link to='/order'><em class="baseColor">{{$t("bbjyOrderAll")}}</em></router-link>
                                </li>
                            </ul>
                            <div class="table-box">
                                <ul width="100%">
                                    <li class="tr-title">
                                        <div>{{$t("bbjyHistoryDate")}}</div>
                                        <div>{{$t("bbjyHistoryPair")}}</div>
                                        <div>{{$t("bbjyHistoryType")}}</div>
                                        <div>{{$t("bbjyHistorySide")}}</div>
                                        <div class="addflex junjia">{{$t("bbjyHistoryAvg")}}</div>
                                        <div class="addflex">{{$t("bbjyHistoryPrice")}}</div>
                                        <div class="minwidth addflex">{{$t("bbjyHistoryAmount")}}</div>
                                        <div class="percent">{{$t("bbjyHistoryFilled")}}</div>
                                        <div class="minwidth addflex">{{$t("bbjyHistoryTotal")}}</div>
                                        <div class="historyStatusWidth">{{$t("bbjyHistoryStatus")}}</div>
                                    </li>
                                    <!--无历史-->
                                    <li class="no-order dis-n" v-if="myCompletedList.length == 0">
                                        <div colspan="10" class="no-history addflex">{{$t("bbjyHistoryTIP")}}</div>
                                    </li>
                                    <li v-else v-for="v in myCompletedList" class="orderItem">
                                        <div >{{v.createdAt}}</div>
                                        <div >{{v.symbol}}</div>
                                        <div >{{$t(v.orderType)}}</div>
                                        <div :class="[v.orderSide == 'BUY'?'greenText':'redText']">{{$t(v.orderSide)}}</div>
                                        <div class="addflex junjia">{{v.filledAveragePrice}}</div>
                                        <div class="addflex">{{v.limitPrice}}</div>
                                        <div class="minwidth addflex">{{v.filledCumulativeQuantity +'/'+ v.quantity}}</div>
                                        <div class="percent">{{v.percent}}%</div>
                                        <div class="minwidth addflex">{{v.total}}</div>
                                        <div class="historyStatusWidth">{{$t(v.orderStatus)}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--右侧成交单-->
                    <div class="below-right">
                        <div class="trade-history">
                            <div class="his_item-title">{{$t('bbjyTradeHistory')}}</div>
                            <div class="history-content scroll-style">
                                <Loading scale="2" v-model="historyLoading" style="margin-top:50px"/>
                                <div class="his_item-title row" v-for="(v,i) in tradeHistoryArr" @click="getClickPrice(v.price)">
                                    <div :class="[v.showColor == -1?'redText':'',v.showColor == 1?'greenText':'','pointer']">{{v.price}}</div>
                                    <div>{{v.volume}}</div>
                                    <div>{{v.dateTime}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--交易密码6个框-->
        <div class="mask" v-if="showPassWordPage" @click="clickMask">
            <div class="alert alert-trade-password dis-n">
                <div class="alert-title">
                    <div>{{$t("bbjyPassword")}}</div>
                    <Icon type="ios-close-circle" class="closePs" @click="closePassWordPage"/>
                </div>
                <div class="alert-content">
                    <div class="text">{{$t("bbjyInputPassword")}}</div>
                    <div class="square">
                        <PasswordInput ref="childPassWord" @getPassWord="getPswData" ></PasswordInput>
                    </div>
                    <div class="expired space-between">
                        <span>{{$t("bbjyExpiredTime")}}</span>
                        <!-- <a href="../../securityCenter/setTradingPassword.html">{{$t("bbjyForgetPassword")}}</a> -->
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
</template>

<script>
    import {
        getSymbolList,
        getSymbolList_realtime,
        getdepthList,
        getCreateAccount,
        getAccountInfo,
        getCreateToken,
        getBalanceList,
        getOpenList,
        getCompletedList,
        getCreateSession,
        getCancelOrder,
    } from '_api/exchange.js'
    import {
        getObjFirstKey,
        getDecimalsNum,
        onlyInputNumAndPoint,
        getTokenByKey as getValue,
        setLocalStorage,
        checkExpiredAble,
        addSymbolSplitLine,
        storage,
        isDivideAll,
        myObserver,
        getCurrentMinutes,
        getLastUTCMinutes,
        getIndexInObject,
        scientificToNumber,
        isSameUTCDay,
        subNumberPoint
    } from '@/lib/utils.js'
    import {TokenType} from './config.js'
    import config from '@/config'
    import {Exchange} from '@/interface/exchange.js'
    import PasswordInput from '@/components/PasswordInput.vue'
    import TVChartContainer from '@/components/KLine/TVChartContainer.vue'
    import _ from 'lodash'
    import moment, { isMoment } from 'moment'
    import Cookies from 'js-cookie'
    import bigDecimal from 'js-big-decimal' //除法失效
    import {BigNumber} from 'bignumber.js';
    import Loading from "@/components/Loading"
    export default {
        data() {
            return {
                boardIndex: 'A', //板块轮播
                siteIndex:'B',//站点索引  B F L S 
                currentSite:"区块链交易",
                quoteCoinIndex: 0, //计价币种轮播索引
                currentSymbol: '', //当前行情交易对
                currentSymbolObj:{},//当前行情+交易对的对象
                i: 0,
                currentInfo: {
                    symbol: '',
                    quoteAsset: '',
                    baseAsset: '',
                    last: '--',
                    percent: '--%',
                    high: '--',
                    low: '--',
                    volume: '--', //交易量
                },
                isLogin:this.$store.state.app.isLogin || false,
                tradeHistoryArr: [], //交易历史列表
                symbolList: {},//交易接口的symbolList 接口
                symbolList_quote:{},//行情快照需要的symboList
                symbolListSelf: {},
                SSEsource: null,
                noPadding: '--',
                currentQuoteCoin: 0, //选中的计价资产
                currentQuoteCoinName:'',//选择的计价资产名称 BTC 
                quoteCoinList: {}, //计价资产
                baseAssetList: [], //交易资产
                pushData: {},
                tradeHistoryList: [], //快照交易历史

                currencyName:'',//当前的法币名称
                currencyRate:1,//当前法币的比率
                currentSymbolRate:1, //当前交易对 对USD的系数
                buyPriceCurrency:"--",//买入价格法币估值
                sellPriceCurrency:"--",
                symbolCurrency:"--",//当前交易对法币估值
                // ****盘口****
                isInitPage:true,//第一次进入页面 展示盘口的买入1 卖出1
                depthListTimer:null,
                depthPageWidth:100,
                depthTimer:false,
                bidsArr:[],
                asksArr:[],
                //****交易相关 */
                exchange:null,//交易接口函数
                loginToken:'',//登陆token
                // ***** 买入 卖出 ******//
                isShowMask:false,
                isStopTrade:false,
                maskInterval :null,
                day:0,
                hour:0,
                minutes:0,
                second:0,
                buyDisabled:false,
                sellDisabled:false,
                myBanalceTimer:null,
                buyBallPercentage:'0',//下单买入百分比 0 0.25 0.5 0.75 1
                sellBallPercentage:'0',//下单卖出百分比
                buyPriceEmpty:false,
                buyCountEmpty:false,
                sellPriceEmpty:false,
                sellCountEmpty:false,
                buyPriceInput:'',
                buyCountInput:'',
                sellCountInput:'',
                sellPriceInput:'',
                baseAssetAvailable:0,//可用的交易资产 卖出
                quoteCoinAvailable:0,//可用的计价资产 买入
                a:'',
                // ****我的挂单 & 成交历史记录
                noOrder:true,
                noMyDealOrder:true,
                SSE_order:null,//订单推送
                sseInitArr : [], //订阅推送刚开始接受的快照 
                pushOrderData:null,
                myOpenList:[],//未成交订单
                myCompletedList:[],//完成成交和已经撤单
                //***下单 买入 */
                orderType:null,//撤单 cancle  下单  输入密码用
                orderID:null,
                showPassWordPage:false,
                exchangePassWord:null,//交易密码
                setTradePassword:false,//localstorage 是否
                //Loading
                boardLoading:false,
                buyBtnLoading:false,
                sellBtnLoading:false,
                passwordLoading:false,
                historyLoading:false,
                depthLoading:false,
                chartLoading:true,
            }
        },
        components: {
             PasswordInput:PasswordInput,
             TVChartContainer:TVChartContainer,
             Loading:Loading,
         },
        methods: {
            //切换版块
            changeBoard(e) {
                let boardKey = e.target.getAttribute('data-value');
                this.currentSite = this.$t(boardKey+"Exchange")
                this.siteIndex = boardKey
                this.quoteCoinIndex = 0;
                this.currentQuoteCoin = 0;
                //重置计价资产的名称=key
                this.currentQuoteCoinName = ''
                this.initBoardModule();
            },
            //切换计价资产
            changeQuoteCoin(index, quoteCoinName) {
                this.currentQuoteCoin = index
                this.quoteCoinIndex = index

                //当前的计价资产名称
                this.currentQuoteCoinName = quoteCoinName
                //更新资产行情列表
                this.baseAssetList = this.createBaseAssestList(quoteCoinName)
                
            },
            //切换交易资产
            changeBaseAssetList(v) {
                //以后优化 改为 params传参就好了
                this.$router.push({
                    query:{
                        // symbol:''
                    }
                })
                 //清空盘口深度
                this.bidsArr = []
                this.asksArr = []
                //loading
                // clearTimeout(this.depthListTimer)
                this.depthLoading = false
                //清空交易历史
                this.tradeHistoryArr = []
                this.currentSymbol = v.symbol
                this.currentSymbolObj = v;
                //重置点击
                this.buyDisabled = false
                this.sellDisabled = false
                //更新大盘上方交易对行情
                this.showCurrentPriceInfo(v)
                //更新交易历史 传入v 获取精度
                this.updateSymbolHistory(v)
                //刷新可用资产
                this.getMyAssetData();
                //判断是否展示交易蒙层
                this.isShowTradeMask();
                //更新当前交易对法币估值
                this.symbolCurrency = '--'
                this.getCurrencyData()

                //切换交易对清空买入卖出
                this.buyPriceInput=''
                this.buyCountInput=''
                this.sellCountInput=''
                this.sellPriceInput=''
                this.$refs.buyInput.value = ''
                this.$refs.sellInput.value = ''
                this.$refs.buyCountInputRef.value = ''
                this.$refs.sellCountInputRef.value = ''
                this.isInitPage = true
            },
            //判断是否展示交易蒙层
            isShowTradeMask(){
                this.isStopTrade = false
                this.isShowMask = false
                if(JSON.stringify(this.symbolList) != "{}" && this.symbolList[this.currentSymbol]){ 
                    //下单服务正常运行
                    let orderSymbolObj = this.symbolList[this.currentSymbol]
                    if(orderSymbolObj.status === 'HALT' && orderSymbolObj.nextStatus && orderSymbolObj.nextStatusAt){
                        //倒计时
                        this.isShowMask = true
                        this.buyDisabled = true
                        this.sellDisabled = true
                        //情况盘口
                        this.bidsArr = []
                        this.asksArr =[]
                        this.refreashTime(orderSymbolObj.nextStatusAt)
                        return
                    }else if(orderSymbolObj.status === 'HALT'){
                        //暂停交易
                        this.isShowMask = true
                        this.isStopTrade = true
                    }
                }
            },
            //未开放交易对 倒计时
             refreashTime(targetDate) {
                //  console.log(object)
                targetDate = targetDate+10*1000
                this.maskInterval &&  clearInterval(this.maskInterval)
                 if(targetDate && typeof targetDate === 'number'){
                     this.maskInterval = setInterval(()=>{
                         var today = new Date().getTime();
                         if(targetDate <= today){
                             //关闭蒙层
                             this.isShowMask = false;
                             this.buyDisabled = false
                             this.sellDisabled = false
                             window.location.reload();
                             clearInterval(this.maskInterval)
                             //重新请求下单交易对 获取可交易状态
                         }else{
                            
                             var ts = (targetDate - today);
                             this.day = parseInt(ts / 1000 / 60 / 60 / 24, 10);
                             this.hour =  parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数  
                             this.minutes= parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数 
                             this.second = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数  
                         }
                     },1000)
                 }
            },
            //交易对的交易历史列表
            updateSymbolHistory(symbolInfo) {
                this.historyLoading = false;
                let historyArr = this.pushData[this.currentSymbol] || []
                let newArr = []
                let preColor = 0
                let priceLong = getDecimalsNum(symbolInfo.priceTickSize)
                let volumeLong = getDecimalsNum(symbolInfo.quantityStepSize)
                historyArr.map((v, i) => {
                    let obj = {}
                    if (i == 0) {
                        //绿涨红跌 1绿色 0灰色 -1红色 颜色逻辑与上一个保持一致
                        obj.showColor = preColor;
                        obj.volume = bigDecimal.round(v.volume, volumeLong)
                    } else {
                        //判断是否是同一天 同一天做差  新的一天不做差
                        if(isSameUTCDay(v.dateTime,historyArr[i - 1].dateTime)){
                            obj.volume = bigDecimal.round(bigDecimal.subtract(v.volume, historyArr[i - 1].volume), volumeLong);
                        }else{
                            obj.volume = bigDecimal.round(v.volume,volumeLong)
                        }
                        obj.showColor = bigDecimal.compareTo(v.last, historyArr[i - 1].last) == 0 ? preColor : bigDecimal.compareTo(v.last, historyArr[i - 1].last);
                        preColor = obj.showColor
                    }
                    obj.price = bigDecimal.round(v.last, priceLong)
                    obj.dateTime = moment(v.dateTime).format('HH:mm:ss')
                    newArr.unshift(obj)
                })
                //最后一条不展示
                newArr.pop()
                this.tradeHistoryArr = newArr
                this.historyLoading = false;
            },
            //展示最新的交易资产行情信息
            //v symbol 行情合并后的对象
            showCurrentPriceInfo(v) {
                let obj = {
                    symbol: v.symbol,
                    quoteAsset: v.quoteAsset,
                    baseAsset: v.baseAsset,
                    last: v.last,
                    high: v.high,
                    low: v.low,
                    volume: v.volume,
                    percent: v.percent,
                    showColor:v.showColor
                }
                //给title赋值行情
                if(obj.last){
                    document.title = `${obj.last } | ${obj.baseAsset}/${obj.quoteAsset}`
                }else{
                     document.title = `-- | ${obj.baseAsset}/${obj.quoteAsset}`
                }
                this.currentInfo = obj
            },
            //快照行情推送数据刷新
            initBoardModule() {
                //更新计价币种
                this.quoteCoinList = this.symbolListSelf[this.siteIndex]
                //更新交易资产列表 同时 更新当前交易对行情 交易对历史列表
                this.baseAssetList = this.createBaseAssestList( this.currentQuoteCoinName || getObjFirstKey(this.quoteCoinList))
            },
            //组合交易资产的行情列表 是否是收藏
            //qutoCoinName 计价资产币种
            createBaseAssestList(qutoCoinName){
                this.getCurrencyData()
                let newArr = []
                //合并行情
                this.quoteCoinList[qutoCoinName].map((v, i) => {
                    let nowPrice = {}
                    nowPrice = this.getSymbolNowPrice(v.symbol)
                    if (nowPrice) {
                        v.percent = this.noPadding
                        let diff = '';
                        let a = '';
                        //计算涨跌幅 percent  + 
                        if (nowPrice.previousClose) {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.previousClose);
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.previousClose)).toFixed(6), '100')
                            v.percent = v.last ? bigDecimal.round(a, 2) + "%" : this.noPadding
                        } else {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.open);
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.open)).toFixed(6), '100')
                            v.percent = v.last ? bigDecimal.round(a, 2) + "%" : this.noPadding
                        }
                        //绿涨红跌 1绿色 0灰色 -1红色
                        v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)
                        //计算最新价格精度
                        let long = getDecimalsNum(v.priceTickSize)
                        nowPrice.last = bigDecimal.round(nowPrice.last, long)
                        //判断是否是收藏
                        //展示当前的交易对的大盘上方行情
                        if (this.currentSymbol == v.symbol) {
                            this.showCurrentPriceInfo(Object.assign(v, nowPrice))
                            //展示最近21条历史记录
                            this.updateSymbolHistory(v)
                        }
                    }
                    newArr.push(Object.assign(v, nowPrice))
                })
                return newArr
            },
            //处理法币估值
            getCurrencyData(){
                if(!this.pushData[this.currentSymbol]){
                    return
                }
                //当前交易对对象的
                //   currencyRate:1,//当前法币的比率
                // currentSymbolRate:1, //当前交易对 对USD的系数
                // buyPriceCurrency:"--",//买入价格法币估值
                // sellPriceCurrency:"--",
                // symbolCurrency:"--",//当前交易对法币估值
                //计价资产是否是USDD USDT
                 //法币估值处理
                let legalTender = JSON.parse(localStorage.getItem('currentCurrency'))
                this.currencyRate = legalTender.rate
                this.currencyName = legalTender.name
                if(this.currentSymbolObj.quoteAsset=="USDT" || this.currentSymbolObj.quoteAsset=="USDD"){
                    this.currentSymbolRate = 1
                    this.symbolCurrency = bigDecimal.round(new BigNumber(this.getSymbolNowPrice(this.currentSymbol).last) * new BigNumber(this.currencyRate),4)
                }else if(this.pushData[this.currentSymbolObj.quoteAsset+"USDT"] || this.pushData[this.currentSymbolObj.quoteAsset+"USDD"]){
                    //是否存在 计价资产/USDT的交易对
                    if(this.getSymbolNowPrice(this.currentSymbol) && this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT")){
                        this.currentSymbolRate = bigDecimal.round(new BigNumber(this.getSymbolNowPrice(this.currentSymbol).last) * new BigNumber(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT").last),4)
                        this.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolRate) * new BigNumber(this.currencyRate),4)
                    }
                }
            },
            //获取交易对的实时价格
            getSymbolNowPrice(symbol) {
                return _.last(this.pushData[symbol])
            },
            //获取交易对 下单专用
            getSymbolListData() {
                getSymbolList().then(res => {
                    this.symbolList = {};
                    res.map((v, i) => {
                        let site = config[document.domain] || 'B' //默认的是B站
                        if(v.siteType && v.siteType.indexOf(site) != -1){
                            this.symbolList[v.symbol] = v
                        }
                    })
                    //增加蒙层逻辑
                    this.isShowTradeMask();
                    //查询委托订单
                    this.getSSEOrderList()
                }).catch(error =>{

                })
            },
            //获取行情交易对
            getSymbolListRealtimeData(){
                getSymbolList_realtime().then(res => {
                    this.symbolList_quote = {};
                    // let boardObj = {} 取消分版
                    let siteObj = {}  //只按照站区分数据
                    let symbolUrl = ''
                    let arr = []
                    // let site = config[document.domain] || 'B' //默认的是B站
                    // res.map((v,i)=>{
                    //      if(v.siteType && v.siteType.indexOf(site) != -1){
                    //          arr.push(v)
                    //      }
                    // })
                    let sortArr = _.sortBy(res,['symbolType','quoteAsset']) //排序
                    storage.set('symbloList',res)
                    //获取上一分钟的整数
                    let queryTime = getLastUTCMinutes()
                        
                    sortArr.map((v, i) => {
                        v.siteType.map((site,i) => {
                            if(site=='B'){
                                if(v.quoteAsset=='BTC'||v.quoteAsset=='ETH'){
                                    if(v.baseAsset=='BTC'||v.baseAsset=='LTC'||v.baseAsset=='ETH'||v.baseAsset=='ZEC'||v.baseAsset=='DASH'||v.baseAsset=='XLM'){
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
                                    }
                                }
                            }else{
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
                            }
                            // v 每个站
                            // if (siteObj[site]) {
                            //     if (siteObj[site][v.quoteAsset]) {
                            //         siteObj[site][v.quoteAsset].push(v)
                            //     } else {
                            //         siteObj[site][v.quoteAsset] = [v]
                            //     }
                            // } else {
                            //     let obj = {};
                            //     obj[v.quoteAsset] = [v]
                            //     siteObj[site] = obj
                            // }

                        })
                            symbolUrl += `symbol=${v.symbol}&${v.symbol}_least=21&${v.symbol}_startTime=${queryTime}&` //拼装推送数据查询url
                            this.symbolList_quote[v.symbol] = v //拼装行情的symbol为Key的List
                    })
                    this.symbolListSelf = siteObj
                    this.boardLoading = false //板块loading
                    if(this.$route.query.symbol || storage.has('currentSymbol')){ //根据url展示默认的交易对
                        this.currentSymbol = this.$route.query.symbol  || storage.get('currentSymbol')  
                        this.currentSymbolObj =this.symbolList_quote[this.currentSymbol]
                        if(this.currentSymbolObj){
                            //默认站点 计价资产
                            // this.siteIndex = this.currentSymbolObj && this.currentSymbolObj.siteType[0] || 'B'
                            this.siteIndex = this.$route.query.site || 'B'
                            this.currentSite = this.$t(this.siteIndex+"Exchange")
                            //当前的计价资产名称
                            this.currentQuoteCoinName =this.currentSymbolObj &&  this.currentSymbolObj.quoteAsset
                            let index = getIndexInObject(siteObj[this.siteIndex],this.currentQuoteCoinName)
                            this.currentQuoteCoin = index
                            this.quoteCoinIndex = index
                             
                            //增加蒙层逻辑
                            this.isShowTradeMask()
                        }else{
                            this.currentSymbol =  sortArr[0].symbol //默认排序后的第一个交易对
                            this.currentSymbolObj = sortArr[0]
                        }

                    }else{
                        this.currentSite = this.$t("BExchange")
                        this.currentSymbol =  sortArr[0].symbol //默认排序后的第一个交易对
                        this.currentSymbolObj = sortArr[0]
                    }
                    if(this.currentSymbolObj){
                        this.isInitPage = true
                         // //盘口深度轮询查询
                        this.getDethTableData()
                        //获取我的可用资产 1分钟轮询一次
                        this.getMyAssetData();
                    }
                    //更新交易对的行情  默认掉用一次  当有快照驱动时 监听数据变化
                    this.initBoardModule();
                    //获取交易对的推送的行情
                    this.getSSERealTime(symbolUrl)
                })
            },
            //获取盘口深度
            getDethTableData(){
                
                getdepthList({'symbol':this.currentSymbol}).then(res =>{
                            if(res.data && !this.isShowMask){//无数据时 是null  有蒙层时候不展示盘口数据
                                this.updateDepthArr(res.data,this.currentSymbolObj.depthPeak)
                                this.depthListTimer = setTimeout(()=>{
                                    this.getDethTableData()
                                },3000)
                            }
                        }).catch(e => {
                            // console.log(e.data)
                            this.depthListTimer = setTimeout(()=>{
                                    this.getDethTableData()
                            },3000)
                        })
            },
            //获取推送行情
            getSSERealTime(url) {

                let SSEcache = null
                let baseURL = window.location.protocol+'//'+window.location.host
                this.SSEsource = new EventSource(`${baseURL}/quote/realTime.stream?${url}`)
                this.SSEsource.onopen = function(e) {
                    // console.log("行情推送连接已经建立：", this.readyState);
                };
                this.SSEsource.addEventListener('_RESULT', function(e) {
                    //每次推送一条记录
                    let result = JSON.parse(e.data)
                    //快照去重
                    if(SSEcache && SSEcache.dateTime == result.dateTime && SSEcache.volume == result.volume){
                        return;
                    }else{
                        if (this.pushData[result.symbol]) {
                            this.pushData[result.symbol].push(result)
                            //保持21条行情记录,
                            if (this.pushData[result.symbol].length > 21) {
                                this.pushData[result.symbol] = _.drop(this.pushData[result.symbol], 1)
                            }
                        } else {
                            this.pushData[result.symbol] = [result]
                        }
                        //处理当前
                        SSEcache = result
                        //对象变动检测
                        this.pushData = Object.assign({}, this.pushData)
                    }
                }.bind(this))
                this.SSEsource.addEventListener('_ERROR', function(e) {
                    console.log('触发了_ERROR,重新请求=====>')
                    this.getSymbolListRealtimeData()
                })
                this.SSEsource.onerror = function (e) {
                    console.log('行情盘口快照推送连接断开:',e)
                    setTimeout(function(){
                        // this.SSEsource = new EventSource(`${baseURL}/quote/realTime.stream?${url}`)
                        this.getSymbolListRealtimeData()
                    }.bind(this),3000)
                };
            },
            //**********************组装处理盘口展示数据 */
            getClickBuyPrice(price){
                if(price){
                    this.$refs.sellInput.value = price
                    this.sellPriceInput = price

                    this.buyPriceInput = price
                    this.$refs.buyInput.value = price
                }
            },
            getClickSellPrice(price){
                if(price){
                    this.buyPriceInput = price
                    this.$refs.buyInput.value = price

                    this.$refs.sellInput.value = price
                    this.sellPriceInput = price
                }
            },
            //把盘口的成交价 和成交历史的成交价格 赋值到下单口
            getClickPrice(price){
                if(price){
                    this.buyPriceInput = price
                    this.$refs.buyInput.value = price

                    this.$refs.sellInput.value = price
                    this.sellPriceInput = price
                }
            },
            //盘口深度
            updateDepthArr(json,depthPeak){
                let asks = json.asks;
                let bids = json.bids;
                let priceLong = getDecimalsNum(this.currentSymbolObj.priceTickSize)
                let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
                let aArr = [{width:0},{width:0},{width:0},{width:0},{width:0}]
                let bArr = []
                //卖出
                _.dropRight(asks,asks.length-5).map((v,i)=>{
                    let obj = {}
                    obj.num = this.$t('panSell')+''+(i+1);
                   
                    obj.price =  bigDecimal.round(scientificToNumber(v.price), priceLong)
                    obj.quantity = bigDecimal.round(v.quantity, volumeLong)
                    obj.total = bigDecimal.round(bigDecimal.multiply(v.price, v.quantity),8)
                    obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
                    aArr[4-i]=obj
                })
                this.asksArr = aArr
                //买入盘口
                _.dropRight(bids,bids.length-5).map((v,i)=>{
                    let obj = {}
                    obj.num = this.$t('panBuy')+''+parseInt(i+1);
                    obj.price =  bigDecimal.round(scientificToNumber(v.price), priceLong)
                    obj.quantity = bigDecimal.round(v.quantity, volumeLong)
                    obj.total = bigDecimal.round(bigDecimal.multiply(v.price, v.quantity),8)
                    obj.width = (Number(obj.total) / Number(depthPeak) * (this.depthPageWidth - 16)).toFixed(2)
                    bArr.push(obj)
                })
                this.bidsArr = bArr
                this.depthLoading = false;
                //默认第一个盘口价格
                if(this.isInitPage && asks.length >0){
                    let  buyInput = bigDecimal.round(scientificToNumber(asks[0].price), priceLong)
                    this.buyPriceInput = buyInput
                    this.$refs.buyInput.value = buyInput
                }
                if(this.isInitPage && bids.length > 0){
                    let  sellInput = bigDecimal.round(scientificToNumber(bids[0].price), priceLong)
                    this.$refs.sellInput.value = sellInput
                    this.sellPriceInput = sellInput
                }
                    this.isInitPage = false
            },
            //**********************下单 买入卖出 */
            //数量百分比球
            changeBuyBall(e){
                if(e.target.getAttribute('data-num')){
                    let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
                    this.buyBallPercentage = e.target.getAttribute('data-num')
                    this.$refs.buyCountInputRef.value = bigDecimal.multiply(this.buyBallTotal,this.buyBallPercentage)=== "0"? '0':subNumberPoint(bigDecimal.multiply(this.buyBallTotal,this.buyBallPercentage),volumeLong)
                    this.buyCountInput =subNumberPoint(bigDecimal.multiply(this.buyBallTotal,this.buyBallPercentage),volumeLong)
                }
            },
            changeSailBall(e){
                if(e.target.getAttribute('data-num')){
                    let volumeLong = getDecimalsNum(this.currentSymbolObj.quantityStepSize)
                    this.sellBallPercentage = e.target.getAttribute('data-num')
                    this.$refs.sellCountInputRef.value =bigDecimal.multiply(this.sellBallTotal,this.sellBallPercentage)==='0'?'0':subNumberPoint(bigDecimal.multiply(this.sellBallTotal,this.sellBallPercentage),volumeLong)
                    this.sellCountInput = subNumberPoint(bigDecimal.multiply(this.sellBallTotal,this.sellBallPercentage),volumeLong)
                }
            },
            handleBuyPriceInput(e){
                if(!this.symbolList[this.currentSymbol]){
                    return 
                }
                //重置为空样式
               this.buyPriceEmpty = false
               let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
            //    e.target.value = onlyInputNumAndPoint(e.target.value,6)  
               e.target.value = onlyInputNumAndPoint(e.target.value,pricelong)  
               this.buyPriceInput = e.target.value
            },
            handleBuyCountInput(e){
                if(!this.symbolList[this.currentSymbol]){
                    return 
                }
               //重置样式
               this.buyCountEmpty = false
               let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
               e.target.value = onlyInputNumAndPoint(e.target.value,quantityStepSize)  
               this.buyCountInput = e.target.value
            },
            handleSellPriceInput(e){
                if(!this.symbolList[this.currentSymbol]){
                    return 
                }
                //重置为空样式
                this.sellPriceEmpty = false
                let pricelong = getDecimalsNum(this.symbolList[this.currentSymbol].priceTickSize)
                e.target.value = onlyInputNumAndPoint(e.target.value,pricelong)  
                this.sellPriceInput = e.target.value
            },  
            handleSellCountInput(e){
                if(!this.symbolList[this.currentSymbol]){
                    return 
                }
                 //重置样式
                this.sellCountEmpty = false
                let quantityStepSize = getDecimalsNum(this.symbolList[this.currentSymbol].quantityStepSize)
                e.target.value = onlyInputNumAndPoint(e.target.value,quantityStepSize)  
                this.sellCountInput = e.target.value
            },
            //展示可用的资产
            getMyAssetData(){
                if(!this.isLogin){
                    return false;
                }
                if(this.myBanalceTimer){
                    clearTimeout(this.myBanalceTimer)
                    this.myBanalceTimer = null
                }
                let baseAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['baseAssetPrecision']
                let quoteAssetQuantityLong = this.symbolList_quote && this.symbolList_quote[this.currentSymbol]['quoteAssetPrecision']
                //查询账户资产
                this.exchange.balance(function (data){
                    this.baseAssetAvailable = '--'
                    this.quoteCoinAvailable = '--'
                    data.map((v,i)=>{
                        if(v.currency == this.currentSymbolObj.baseAsset){
                            this.baseAssetAvailable = new BigNumber(v.available).toFixed(baseAssetQuantityLong)
                        }else if(v.currency == this.currentSymbolObj.quoteAsset){
                            this.quoteCoinAvailable =new BigNumber(v.available).toFixed(quoteAssetQuantityLong)
                        }
                    })
                }.bind(this))
                this.myBanalceTimer = setTimeout(()=>{this.getMyAssetData()},60000)
            },
            /****
             * 委托单 我的成交记录
             * 
             * 
             * 
             */
            //获取推送的订单
            getSSEOrderList(){
                if(!this.isLogin){
                    return false;
                }
                //刚进页面初始数据
                this.updateOpenListAndCompletedList();
                this.exchange.listFilledOrder(function(token,accountId){
                    let baseURL = window.location.protocol+'//'+window.location.host
                    //判断orderId 
                    this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
                    this.SSE_order.onopen = function(e) {
                        // console.log("订单推送连接已经建立：", this.readyState);
                    };
                    this.SSE_order.addEventListener('_RESULT', function(e) {
                        let result = JSON.parse(e.data)
                        if(result){
                            this.pushOrderData = result
                        }  
                    }.bind(this))
                    this.SSE_order.addEventListener('_ERROR', function(e) {
                        console.log('触发了SSE_order [_ERROR]')
                    })
                    this.SSE_order.onerror = function (e) {
                        console.log('订单推送连接断开 3s重连:',e)
                        setTimeout(function(){
                            this.SSE_order = new EventSource(`${baseURL}/api/spot/order/detail.stream?token=${token}&accountId=${accountId}`)
                        }.bind(this),3000)
                    };
                }.bind(this))
                // this.openOrderSSE()
            },
            //更新挂单 成交记录 更新我的委托单
            updateOpenListAndCompletedList(){
                if(!this.isLogin){
                    return false;
                }
                //更新我的委托单
                this.exchange.listOpenOrder(function(data){
                    let arr = []
                    data.map((v,i)=>{
                        if(this.symbolList[v.symbol]){
                            v.isDisabled = false
                            v.btnText = 'bbjyCancel'
                            v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
                            // v.orderType = v.orderType==="LIMIT"?"限价单":''
                            let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
                            let quantityLong =this.symbolList &&  this.symbolList[v.symbol]['quantityStepSize']
                            v.symbol = addSymbolSplitLine(v.symbol)
                            v.limitPrice= bigDecimal.round(v.limitPrice,getDecimalsNum(priceLong))
                            v.filledCumulativeQuantity= bigDecimal.round(v.filledCumulativeQuantity,getDecimalsNum(quantityLong))
                            v.quantity= bigDecimal.round(v.quantity,getDecimalsNum(quantityLong))
                            // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
                            v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(),100),2);
                            v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice,v.quantity),8)
                            if(v.orderStatus == 'PENDING_SUBMIT' && v.cancelledUpdateAt ){
                                    v.isDisabled = true
                                    v.btnText = 'bbjyCancelling'
                            }
                            arr.push(v)
                        }
                    })
                    this.myOpenList = arr
                }.bind(this))
                //更新我的成交记录
                this.exchange.listCompletedOrder(1,function(res){
                    let arr = []
                    res.data.map((v,i) => {
                        if(this.symbolList[v.symbol]){
                            v.createdAt = moment(v.createdAt).format('YYYY-MM-DD HH:mm:ss')
                            // v.orderType = v.orderType==="LIMIT"?"限价单":''
                            let priceLong = this.symbolList && this.symbolList[v.symbol]['priceTickSize']
                            let quantityLong = this.symbolList && this.symbolList[v.symbol]['quantityStepSize']
                            v.symbol = addSymbolSplitLine(v.symbol)
                            v.filledAveragePrice = bigDecimal.round(v.filledAveragePrice,getDecimalsNum(priceLong))
                            v.limitPrice= bigDecimal.round(v.limitPrice,getDecimalsNum(priceLong))
                            v.filledCumulativeQuantity= bigDecimal.round(v.filledCumulativeQuantity,getDecimalsNum(quantityLong))
                            v.quantity= bigDecimal.round(v.quantity,getDecimalsNum(quantityLong))
                            if(!Number(v.quantity)==0){
                                // v.percent = bigDecimal.round(bigDecimal.multiply(bigDecimal.divide(v.filledCumulativeQuantity, v.quantity, 2),100),2);
                                v.percent = bigDecimal.round(bigDecimal.multiply(new BigNumber(v.filledCumulativeQuantity).dividedBy(new BigNumber(v.quantity)).toNumber(),100),2);
                            }else{
                                v.percent = 0
                            }
                            v.total = bigDecimal.round(bigDecimal.multiply(v.limitPrice,v.quantity),8)
                            arr.push(v)
                        }
                    })
                    this.myCompletedList = arr
                }.bind(this))
            },
            //交易密码
            getPswData(callbackData){
                if(callbackData && callbackData.length==6){
                    //跳转到再次输入密码页面
                    this.exchangePassWord = callbackData
                }
            },
            //撤单
            cancelMyOrder(orderId,v){
                v.isDisabled = true;
                if(!orderId){
                    return false;
                }else if(!this.currentSymbol){
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
                if (this.setTradePassword == false) {
                    //交易密码是否设置
                    this.$Message.warning(this.$t('bbjyNoPasswordError'))
                    setTimeout(function () {
                        // window.location.href = "../../securityCenter/setTradingPassword.html";
                        this.$router.push('/originTradePassword')
                    }.bind(this), 1000);
                } else if (getValue("ORDER_SESSION")) {
                    this.exchange.cancelOrder(orderId, function (data) {
                    //撤单成功
                    this.$Message.success(this.$t('bbjyCancelMsg'));
                    this.updateOpenListAndCompletedList()
                    }.bind(this));
                } else {
                    this.openPassWordPage();
                    v.isDisabled = false;
                }
  
            },
            buyBtn(){
                if(!this.symbolList || JSON.stringify(this.symbolList)=="{}" || !this.symbolList[this.currentSymbol]){
                    this.$Message.warning(this.$t('bbjyStop'));//暂停交易
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
                let isPriceSize = isDivideAll(this.buyPriceInput,priceTickSize)
                let isQuantitySize = isDivideAll(this.buyCountInput,quantityStepSize)
                if(!this.buyPriceInput){
                    this.buyPriceEmpty = true
                    this.$Message.warning(this.$t('bbjyEnterBuyPrice'));//买入价格
                    this.buyDisabled = false
                }else if(!this.buyCountInput){
                    this.buyCountEmpty = true
                    this.$Message.warning(this.$t('bbjyEnterBuyVolume'));//数量
                    this.buyDisabled = false
                }else if(Number(this.buyPriceInput)>Number(maxPrice)){
                    this.$Message.warning(this.$t('bbjyBuyPriceNotMore')+maxPrice);//买入价格不能超过
                    this.buyDisabled = false
                }else if(Number(this.buyPriceInput)<Number(minPrice)){
                    // this.$Message.warning('买入价格不能少于'+minPrice);
                    this.$Message.warning(this.$t('bbjyBuyPriceNotLess')+minPrice);
                    this.buyDisabled = false
                }else if(Number(this.buyCountInput)>Number(maxQuantity)){
                    // this.$Message.warning('买入数量不能超过'+maxQuantity);
                    this.$Message.warning(this.$t('bbjyBuyVolumeNotMore')+maxQuantity);
                    this.buyDisabled = false
                }else if(Number(this.buyCountInput)<Number(minQuantity)){
                    // this.$Message.warning('买入数量不能少于'+minPrice);
                    this.$Message.warning(this.$t('bbjyBuyVolumeNotLess')+minQuantity);
                    this.buyDisabled = false
                } else if (!isPriceSize) {
                    // 价格整数倍于
                    this.$Message.warning(this.$t('bbjyBuyPriceMultiple')+priceTickSize)
                    this.buyDisabled = false
                } else if (!isQuantitySize) {
                    this.$Message.warning(this.$t('bbjyBuyVolumeMultiple')+quantityStepSize)
                    this.buyDisabled = false
                }else if (status == "HALT") {
                    //账户停止
                    this.$Message.warning(this.$t('bbjyAccountError'));
                    this.buyDisabled = false
                }else if(this.setTradePassword == false){
                    this.$Message.warning(this.$t('bbjyNoPasswordError'))
                    this.buyDisabled = false
                    setTimeout(function () {
                        // window.location.href = "../../securityCenter/setTradingPassword.html";
                        this.$router.push('/originTradePassword')
                    }.bind(this), 1000);
                } else if (getValue("ORDER_SESSION")) {
                    this.exchange.createNewOrder({
                        "symbol": this.currentSymbol,
                        "orderType": "LIMIT",
                        "orderSide": this.orderType,
                        "quantity": this.buyCountInput,
                        "limitPrice": this.buyPriceInput
                    }, function (data) {
                        this.buyDisabled = false
                        this.$Message.success(this.$t('bbjyOrderSuccess'));
                     }.bind(this),
                        function (data) {
                            this.buyDisabled = false;
                        }.bind(this)
                    );
                } else {
                   this.openPassWordPage();
                }
            },
            sellBtn(){
                if(!this.symbolList || JSON.stringify(this.symbolList)=="{}" || !this.symbolList[this.currentSymbol]){
                    this.$Message.warning(this.$t('bbjyStop'));//暂停交易
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
                let isPriceSize =isDivideAll(this.sellPriceInput,priceTickSize)
                let isQuantitySize =isDivideAll(this.sellCountInput,quantityStepSize)
                if(!this.sellPriceInput){
                    this.sellPriceEmpty = true
                    // this.$Message.warning('请输入卖出价格');
                    this.$Message.warning(this.$t('bbjyEnterSellPrice'));
                    this.sellDisabled = false;
                }else if(!this.sellCountInput){
                    this.sellCountEmpty = true
                    // this.$Message.warning('请输入卖出数量');
                    this.$Message.warning(this.$t('bbjyEnterSellVolume'));
                    this.sellDisabled = false;
                }else if(Number(this.sellPriceInput)>Number(maxPrice)){
                    // this.$Message.warning('卖出价格不能超过'+maxPrice);
                    this.$Message.warning(this.$t('bbjySellPriceNotMore')+maxPrice);
                    this.sellDisabled = false;
                }else if(Number(this.sellPriceInput)<Number(minPrice)){
                    // this.$Message.warning('卖出价格不能少于'+minPrice);
                    this.$Message.warning(this.$t('bbjySellPriceNotLess')+minPrice);
                    this.sellDisabled = false;
                }else if(Number(this.sellCountInput)>Number(maxQuantity)){
                    // this.$Message.warning('卖出数量不能超过'+maxQuantity);
                    this.$Message.warning(this.$t('bbjySellVolumeNotMore')+maxQuantity);
                    this.sellDisabled = false;
                }else if(Number(this.sellCountInput)<Number(minQuantity)){
                    // this.$Message.warning('卖出数量不能少于'+minPrice);
                    this.$Message.warning(this.$t('bbjySellVolumeNotLess')+minQuantity);
                    this.sellDisabled = false;
                }else if (!isPriceSize) {
                    // 价格整数倍于
                    this.$Message.warning(this.$t('bbjySellPriceMultiple')+priceTickSize)
                    this.sellDisabled = false;
                } else if (!isQuantitySize) {
                    this.$Message.warning(this.$t('bbjySellVolumeMultiple')+quantityStepSize)
                    this.sellDisabled = false;
                } else if (status == "HALT") {
                    //账户停止
                    this.$Message.warning(this.$t('bbjyAccountError'));
                    this.sellDisabled = false;
                }else if(this.setTradePassword == false){
                    this.$Message.warning(this.$t('bbjyNoPasswordError'))
                    setTimeout(function () {
                        // window.location.href = "../../securityCenter/setTradingPassword.html";
                        this.$router.push('/originTradePassword')
                    }.bind(this), 1000);
                } else if (getValue("ORDER_SESSION")) {
                    this.sellDisabled = true;
                    this.exchange.createNewOrder({
                        "symbol": this.currentSymbol,
                        "orderType": "LIMIT",
                        "orderSide": this.orderType,
                        "quantity": this.sellCountInput,
                        "limitPrice": this.sellPriceInput
                    },
                    function (data) {
                        // orderComplete();
                         this.sellDisabled = false;
                        this.$Message.success(this.$t('bbjyOrderSuccess'));
                    }.bind(this),
                    function (data) {
                        this.sellDisabled = false;
                        
                    }.bind(this)
                    );
                } else {
                   this.openPassWordPage();
                }
            },
            openPassWordPage(){
                 document.body.style.overflow='hidden';
                 this.showPassWordPage = true;
            },
            closePassWordPage(){//关闭交易密码页面
                this.showPassWordPage = false;
                this.sellDisabled = false;
                this.buyDisabled = false;
                this.exchangePassWord = null
                document.body.style.overflow='';
            },
            clickMask(){//交易框获取焦点
                this.$refs.childPassWord.getFocus();
            },
            submitPassWord(){//提交交易密码页面
                if(this.exchangePassWord==null || this.exchangePassWord.length<6){
                     this.$Message.warning(this.$t('bbjyInputPassword'));
                     return false
                }
                // let loginToken = Cookies.get('loginToken')
                this.exchange.issuedTradePassword(this.loginToken, this.exchangePassWord, function (data) {
                    if (!data["code"]) {
                        this.exchange.ssoProvider["getExtension"] = data["token"];
                        if (this.orderType == "cancel") {
                            this.exchange.cancelOrder(this.orderID, function (data) {
                                //隐藏密码输入框
                                this.closePassWordPage()
                            }.bind(this));
                        } else {
                            this.exchange.createNewOrder({
                                "symbol": this.currentSymbol,
                                "orderType": "LIMIT",
                                "orderSide": this.orderType,
                                "quantity": this.orderType=="BUY"?this.buyCountInput:this.sellCountInput,
                                "limitPrice":this.orderType=="BUY"?this.buyPriceInput:this.sellPriceInput,
                            }, function (data) {
                                this.orderType=="BUY" ? this.buyDisabled = false : this.sellDisable= false
                                if(this.orderType=="BUY" || this.orderType=="SELL"){
                                    this.$Message.success(this.$t('bbjyOrderSuccess'));
                                }else{
                                    //撤单成功
                                    this.$Message.success(this.$t('bbjyCancelMsg'));
                                }
                                //隐藏密码框
                                this.closePassWordPage()
                            }.bind(this),
                                function(data){
                                    this.sellDisabled = false;
                                    this.buyDisabled = false;
                                    this.closePassWordPage()
                                }.bind(this)
                            );
                        }
                    } else {
                        //textError(Sso.errorMessage[localStorage.getItem("countryLanguage")][data["code"]])
                        //错误提示
                        this.$Message.warning(this.$t(data['code']));
                    }
                }.bind(this))
            }
        },
        watch: {
            'pushData': {
                handler: function(newVal, oldVal) {
                    //更新交易对的行情
                    this.initBoardModule();
                },
                deep: true,
            },
            'pushOrderData':{
                handler: function(newVal, oldVal) {
                    //更新列表
                    this.updateOpenListAndCompletedList();
                    //查询可用资产
                    this.getMyAssetData()
                },
                deep: true,
            },
            "currentSymbolObj" :{
                handler: function(newVal, oldVal) {
                    storage.set('currentSymbolObj',newVal)
                },
                deep: true,
            },
            $route(to,from){ //路由site变化 
                if(this.$route.query && this.$route.query.site){
                    let boardKey = this.$route.query.site
                    this.currentSite = this.$t(boardKey+"Exchange")
                    this.siteIndex = boardKey
                    this.quoteCoinIndex = 0;
                    this.currentQuoteCoin = 0;
                    //重置计价资产的名称=key
                    this.currentQuoteCoinName = ''
                    this.initBoardModule();
                }
            },
            depthPageWidth(val){
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
            buyPriceInput:function(newV,oldV){ //监听下单输入价格 计算法币估值
                
                if(this.currentSymbolObj.quoteAsset == 'USDT' || this.currentSymbolObj.quoteAsset == 'USDD'){
                    this.buyPriceCurrency = bigDecimal.round(new BigNumber(newV) * new BigNumber(this.currencyRate),4)
                }else{
                    if(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT")){
                        this.buyPriceCurrency = bigDecimal.round(new BigNumber(newV) * new BigNumber(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT").last) * new BigNumber(this.currencyRate),4)
                    }
                }
            },
            sellPriceInput:function(newV,oldV){ //监听下单卖出价格 计算法币估值
                if(this.currentSymbolObj.quoteAsset == 'USDT' || this.currentSymbolObj.quoteAsset == 'USDD'){
                    this.sellPriceCurrency = bigDecimal.round(new BigNumber(newV) * new BigNumber(this.currencyRate),4)
                }else{
                    if(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT")){
                        this.sellPriceCurrency = bigDecimal.round(new BigNumber(newV) * new BigNumber(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT").last) * new BigNumber(this.currencyRate),4)
                    }
                }
            },
            listenstage:function(newV ,oldV){
                //法币估值做相应的刷新
                this.getCurrencyData()
                if(this.currentSymbolObj.quoteAsset == 'USDT' || this.currentSymbolObj.quoteAsset == 'USDD'){
                    this.buyPriceCurrency = bigDecimal.round(new BigNumber(this.buyPriceInput) * new BigNumber(this.currencyRate),4)
                    this.sellPriceCurrency = bigDecimal.round(new BigNumber(this.sellPriceInput) * new BigNumber(this.currencyRate),4)
                }else{
                    this.sellPriceCurrency = bigDecimal.round(new BigNumber(this.sellPriceInput) * new BigNumber(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT").last) * new BigNumber(this.currencyRate),4)
                    this.buyPriceCurrency = bigDecimal.round(new BigNumber(this.buyPriceInput) * new BigNumber(this.getSymbolNowPrice(this.currentSymbolObj.quoteAsset+"USDT").last) * new BigNumber(this.currencyRate),4)
                }
            }
        },
        computed:{
            buyInTotal:function(){ //买入总价
                return bigDecimal.round(bigDecimal.multiply(this.buyPriceInput,this.buyCountInput),8);
            },
            sellOutTatal:function(){ //卖出总价
                return bigDecimal.round(bigDecimal.multiply(this.sellPriceInput,this.sellCountInput),8);
            },
            buyBallTotal:function(){ //能买入的总数量
                return  this.buyPriceInput == 0?'': new BigNumber(this.quoteCoinAvailable).dividedBy(new BigNumber(this.buyPriceInput)).toNumber() 
            },
            sellBallTotal:function(){ //能卖出的总数量
                return this.baseAssetAvailable
            },
            //监听vuex中数据的变化
            listenstage() {
                return this.$store.state.app.currentCurrencyState;
            }
        },
        beforeMount(){
            this.loginToken = Cookies.get('loginToken')
            if(this.$store.state.app.isLogin || this.loginToken){
                this.isLogin = true
            }
            //交易相关的交易对
            this.getSymbolListData();

            //行情相关的交易对>>>>>>
            this.getSymbolListRealtimeData();
            
        },
        mounted() {
            this.$store.commit('changeHeaderColor', '#15232C');
            this.$store.commit('changeFooterColor', '#15232C');
            //  this.loginToken = Cookies.get('loginToken')
            //是否设置过交易密码
            if(localStorage.getItem('tradingPasswordFlag')==='true'){
                this.setTradePassword = true
            }
            //
            var ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            // //登录以后查询资产 挂单 成交记录
            if(this.isLogin){
                this.exchange.ssoProvider.getSsoToken = function (fn) {
                    if (this.loginToken) {
                        fn(this.loginToken);
                    }
                }.bind(this);
            }
            this.depthPageWidth = this.$refs.buyOrderContainer.offsetWidth
            //盘口深度 监听窗口大小改变
            window.onresize = () => {
                return (() => {
                    this.depthPageWidth =this.$refs.buyOrderContainer && this.$refs.buyOrderContainer.offsetWidth
                })()
            }
        },
        destroyed() {
            //关闭SSE行情推送
            this.SSEsource && this.SSEsource.close();
            this.SSE_order && this.SSE_order.close();

            //关闭盘口轮询查询
            clearInterval(this.depthListTimer)
            clearInterval(this.myBanalceTimer)
        }
    
    }
</script>

<style scoped lang="less">
    @import './exchange.less';
</style>