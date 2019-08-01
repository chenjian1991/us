<template>
   <div class="marketBox">
      <div id="commonMarket" class="plate_content clearfix" :class="site" v-for="(value, site, index) in homeTableObject">
         <!-- <div class="palte_head">
             <div class="palte_head_left">

                 <span  @click="tabClick(site,quoteName)" v-bind:class='{on:value.active==quoteName}' v-for="(quoteName,index) in value.quoteTitle">
                     {{quoteName}}
                 </span>
             </div>
             <div class="palte_head_right">
                 <Input search  v-model="searchVal" :placeholder="this.$t('inputsearch')" style="width: 150px;background:#000;" />
             </div>
         </div> -->
         <div class="tabelLable">
            <div v-if="site == 'B'" class="labelBox bsiteFont"> <i class="bsite"></i>{{$t('headerblockchain')}}</div>
            <!-- <div v-if="site == 'S'" class="labelBox ssiteFont"> <i class="ssite"></i>{{$t('headerstockchain')}}</div> -->
            <div v-if="site == 'F'" class="labelBox fsiteFont"> <i class="fsite"></i>{{$t('headerfrancechain')}}</div>
            <div v-if="site == 'C'" class="labelBox csiteFont"> <i class="csite"></i>{{$t('headercoustomerchain')}}</div>
         </div>
         <div class="more"><router-link :to="{path:'/exchange',query: {site:site}}">{{$t('bbjyMore')}}</router-link></div>
         <Tabs :animated="false">
            <TabPane :label="quote" v-for="(item,quote,num) in value" :key="num">
               <div class="plate-table table-responsive">
                  <table class="table">
                     <thead>
                        <th @click="sort" value='baseAsset'  orders='desc' direction='one' >{{$t('HomePair')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='baseAsset'  orders='desc' :class="direction=='one'?'on':''"    direction='one' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='baseAsset'  orders='asc' :class="direction=='two'?'on':''"    direction='two'  class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th @click="sort" v-if="site == 'B'" value='coinFullName'  orders='desc' direction='three'>
                           {{$t('HomeName')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='coinFullName'  orders='desc' :class="direction=='three'?'on':''"  direction='three' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i  @click="sort" value='coinFullName'  orders='asc'  :class="direction=='four'?'on':''"  direction='four' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th @click="sort" value='coinFullName'  orders='desc' direction='three' v-else>
                           {{$t('HomeAsset')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='coinFullName'  orders='desc' :class="direction=='three'?'on':''"  direction='three' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='coinFullName'  orders='asc' :class="direction=='four'?'on':''"  direction='four' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th @click="sort" value='lastprice'  orders='desc' direction='nine'>
                           {{$t('HomeLatestPrice')}}
                           <span  class="ivu-table-sort">
                              <i  @click="sort" value='lastprice'  orders='desc':class="direction=='nine'?'on':''"  direction='nine' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='lastprice'  orders='asc' :class="direction=='ten'?'on':''"   direction='ten' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th  @click="sort" value='percent'  orders='desc' direction='eleven'>
                           {{$t('HomeVariance')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='percent'  orders='desc' :class="direction=='eleven'?'on':''"  direction='eleven' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i  @click="sort" value='percent'  orders='asc' :class="direction=='twelve'?'on':''"  direction='twelve' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>   
                        </th>
                        <th @click="sort" value='high'  orders='desc' direction='thirteen'>
                           {{$t('HomeHighest')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='high'  orders='desc' :class="direction=='thirteen'?'on':''"  direction='thirteen' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='high'  orders='asc' :class="direction=='forteen'?'on':''"  direction='forteen' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th @click="sort" value='low'  orders='desc' direction='sixteen'>{{$t('HomeLowest')}}
                           <span  class="ivu-table-sort">
                              <i @click="sort" value='low'  orders='desc':class="direction=='sixteen'?'on':''"  direction='sixteen' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='low'  orders='asc' :class="direction=='seventeen'?'on':''"  direction='seventeen' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th @click="sort" value='hour24Volume' orders='desc' direction='eighteen' >
                           {{$t('HomeTradeVolume')}}
                            <span  class="ivu-table-sort">
                              <i @click="sort" value='hour24Volume' orders='desc' :class="direction=='eighteen'?'on':''"  direction='eighteen' class="ivu-icon ivu-icon-md-arrow-dropup"></i> 
                              <i @click="sort" value='hour24Volume' orders='asc' :class="direction=='ninteen'?'on':''"  direction='ninteen' class="ivu-icon ivu-icon-md-arrow-dropdown"></i>
                           </span>
                        </th>
                        <th>{{$t('HomeGoTrade')}}</th>
                     </thead>
                     <tbody>
                     <tr v-for='(item,index) in evenMethod(item)'>
                        <td @click="gotoExchange(item.symbol,site)">{{item.baseAsset}}/{{item.quoteAsset}}</td>
                        <td>{{item.coinFullName?item.coinFullName:'--'}}</td>
                        <td>{{item.last | scientificToNumber}}<span class="splot_line">&nbsp/&nbsp</span><em class="currence">{{currencyName}}{{item.symbolCurrency}}</em></td>
                        <td :class="[item.showColor == -1?'redText':'',item.showColor == 1?'greenText':'']"><span v-if="item.showColor == 1">+</span>{{item.percent | scientificToNumber }}%</td>
                        <td>{{item.high | scientificToNumber }}</td>
                        <td>{{item.low | scientificToNumber}}</td>
                        <td>{{item.hour24Volume | scientificToNumber}}</td>
                        <td @click="gotoExchange(item.symbol,site)"></td>
                     </tr>
                     </tbody>
                  </table>
               </div>
            </TabPane>
         </Tabs>
      </div>
   </div>
</template>

<script>
   import {getSymbolList_realtime} from '_api/exchange.js'
   import bigDecimal from 'js-big-decimal';
   import {BigNumber} from 'bignumber.js';
   import {getCurrencyList} from '../../api/exchange.js'//getSymbolList的名字必须与被引入文件的名字相同；
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
   export default {
      name:'modal',
      props:{
         whitchSite:String,
         sites:Array, //要展示哪几个站
         // whichCoin:String
      },
      data(){
         return {
            current:0,
            noPadding: '--',
            symbolList:[],
            // boardIndex:this.whichCoin,
            boardIndex:'BTC', //默认选中第一个
            homeTableObject:{},//
            symbolListSelf:{},
            siteObj:{}, //站
            quoteCoinList:[],
            pushData:[],//推送过来的快照
            baseAssetList:[],
            searchVal:"",
            currentName:[],
            currencyRate:'',
            currencyName:'$',
            currentSymbolRate:'',
            symbolCurrency:'',
            ascFlagone : true,
            ascFlagtwo:true,
            ascFlagthree:true,
            ascFlagfour:true,
            ascFlagfive:true,
            ascFlagsix:true,
            ascFlagseven:true,
            order:'asc',
            orderCondtion:'baseAsset',
            direction:'',
         }
      },
      methods:{
         sort(event){
            let eventobj = event.target||event.srcElement;
            let e = eventobj.getAttribute('value');
            this.orderCondtion = e;
            // event.preventDefault() 
            event.stopPropagation()
             if(e =='baseAsset'){  
                  if(this.ascFlagone){
                        this.order = 'desc'
                        this.direction = 'two'
                        this.ascFlagone = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'one'
                        this.ascFlagone = true;
                  }
                 
             }else if(e=='coinFullName'){
                  if(this.ascFlagtwo){
                        this.order = 'asc'
                        this.direction = 'four'
                        this.ascFlagtwo = false;
                  }else{
                        this.order = 'desc'
                        this.direction = 'three'
                        this.ascFlagtwo = true;
                  }
             }else if(e=='lastprice'){
                if(this.ascFlagthree){
                        this.order = 'desc'
                        this.direction = 'ten'
                        this.ascFlagthree = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'nine'
                        this.ascFlagthree = true;
                  }
             }else if(e=='percent'){
                if(this.ascFlagfour){
                        this.order = 'desc'
                        this.direction = 'twelve'
                        this.ascFlagfour = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'eleven'
                        this.ascFlagfour = true;
                  }
             }else if(e=='high'){
                if(this.ascFlagfive){
                        this.order = 'desc'
                        this.direction = 'forteen'
                        this.ascFlagfive = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'thirteen'
                        this.ascFlagfive = true;
                  }
             }else if(e=='low'){
                if(this.ascFlagsix){
                        this.order = 'desc'
                        this.direction = 'seventeen'
                        this.ascFlagsix = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'sixteen'
                        this.ascFlagsix = true;
                  }
             }else if(e=='hour24Volume'){
                if(this.ascFlagseven){
                        this.order = 'desc'
                        this.direction = 'ninteen'
                        this.ascFlagseven = false;
                  }else{
                        this.order = 'asc'
                        this.direction = 'eighteen'
                        this.ascFlagseven = true;
                  }
             }

            this.evenMethod()
         },
         evenMethod(obj){
            //  console.log(obj)
            let result;
            if(this.orderCondtion=='baseAsset'){
                result =  _.orderBy(obj,['baseAsset'],[this.order]);
               return result;
            }else if(this.orderCondtion=='lastprice'){
               result =  _.orderBy(obj,['lastprice'],[this.order]);
               return result;
            }else if(this.orderCondtion == 'hour24Volume'){
               result =  _.orderBy(obj,['hour24Volume'],[this.order]);
               return result;
            }else if(this.orderCondtion=='low'){
               result =  _.orderBy(obj,['low'],[this.order]);
               return result;
            }else if(this.orderCondtion == 'high'){
                result =  _.orderBy(obj,['high'],[this.order]);
               return result;
            }else if(this.orderCondtion == 'percent'){
                result =  _.orderBy(obj,['percent'],[this.order]);
               return result;
            }else if(this.orderCondtion == 'coinFullName'){
               result =  _.orderBy(obj,['coinFullName'],[this.order]);
               return result;
            }

         },
         initBoardModule() {
            // //更新模块
            // this.quoteCoinList = this.symbolListSelf[this.boardIndex]//板块BTC,USDD,USDT,ETH  this.quoteCoinList  [{},{}]是个数组
            // //更新交易资产列表 同时 更新当前交易对行情 交易对历史列表
            // this.baseAssetList = this.createBaseAssestList(this.quoteCoinList);
            // this.searchCoinList(this.searchVal.toUpperCase())
            let allSiteObj = {}
            //所有的Table拼接行情数据
            _.forEach(this.symbolListSelf,(v,k)=>{//v value,  k=B,C,F,S
               let obj = {}
               _.forEach(v,(item,key) =>{//V = value = [BTC:{},ETH:{},USDT:{},USDD:{}]   item={}  key=BTC,ETH,USDT,USDD
                  obj[key] =  this.createBaseAssestList(item)
               })
               allSiteObj[k] = obj
            })
            this.homeTableObject = allSiteObj
            // console.log(this.homeTableObject)
         },
         createBaseAssestList(symbolList) {
            let newArr = []
            //合并行情
            if(symbolList.length==0){
               return false;
            }
            symbolList.map((v, i) => {//symbolList 循环数组  V = 
               let nowPrice = {}
               nowPrice = this.getSymbolNowPrice(v.symbol);
               if (nowPrice) {
                  v.percent = this.noPadding;
                  let diff = '';
                  let a = '';
                  //计算涨跌幅 percent  +
                  if (nowPrice.previousClose) {
                     diff = bigDecimal.subtract(nowPrice.last, nowPrice.previousClose);
                     a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.previousClose)).toFixed(6), '100')
                     v.percent = Number(bigDecimal.round(a, 2) )
                  } else {
                     diff = bigDecimal.subtract(nowPrice.last, nowPrice.open);
                     a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.open)).toFixed(6), '100')
                     v.percent =Number(bigDecimal.round(a, 2))
                     // console.log(typeof(Number(bigDecimal.round(a, 2) )))//必须是number类型才可以排序
                  }
                  v.lastprice = Number(new bigDecimal(v.last).getValue());
                  //绿涨红跌 1绿色 0灰色 -1红色
                  v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)//比较数字大小
                  if(v.showColor == 1){
                     v.percent = Number(v.percent)
                  }

                  //计算最新价格精度
                  let long = getDecimalsNum(v.priceTickSize)
                  nowPrice.last = bigDecimal.round(nowPrice.last, long)
                  //法币估值
                let legalTender = JSON.parse(localStorage.getItem('currentCurrency'));
                this.currencyRate = legalTender.rate;
                this.currencyName = legalTender.shortcut?legalTender.shortcut:"$";
                if(v.quoteAsset=='USDT'||v.quoteAsset=='USDD'){
                     this.currentSymbolRate = 1 
                     v.symbolCurrency = bigDecimal.round(new BigNumber(nowPrice.last) * new BigNumber(this.currencyRate),4)
                }else{
                   if(this.getSymbolNowPrice(v.quoteAsset+"USDT")){
                       this.currentSymbolRate = bigDecimal.round(new BigNumber(nowPrice.last) * new BigNumber(this.getSymbolNowPrice(v.quoteAsset+"USDT").last),4)
                       v.symbolCurrency = bigDecimal.round(new BigNumber(this.currentSymbolRate) * new BigNumber(this.currencyRate),4)
                   }
                      
                }

               }
                  let coinName = this.currentName;
                  coinName.forEach((item,i)=>{//币种全称
                        if(item.currency==v.baseAsset){
                           v.coinFullName = item.currencyName;
                        }

                  })
               
               // //默认写死的币种
               // if(v.symbol == "BTCUSDT" ||v.symbol == "FFUSDT" || v.symbol == "BTTUSDT" || v.symbol == "USDTUSDD"){
               //    this.mainHomeCoin[v.symbol] = Object.assign(v, nowPrice)
               //    // this.$store.commit('updateMainHomePrice', this.mainHomeCoin);
               //    // this.$emit('getPrice',this.mainHomeCoin)
               // }
               newArr.push(Object.assign(v, nowPrice))
               // console.log(newArr)
            })
            return newArr
         },
           fetchWidthDrawFee(){
                getCurrencyList().then(res => {//所有币种
                     this.currentName = res;
                  }).catch(error =>{

                  })
            },
         //获取交易对的实时价格
         getSymbolNowPrice(symbol) {
            // console.log(222,this.pushData)
            let aa = _.last(this.pushData[symbol])
            return _.last(this.pushData[symbol])
         },
         getSymbolListRealtimeData(){
            getSymbolList_realtime().then(res => {
               // let boardObj = {} 取消分版
               let siteObj = {}  //只按照站区分数据
               let symbolUrl = ''
               let arr = []
               let sortArr = _.sortBy(res,['symbolType','quoteAsset']) //排序
               sortArr.map((v, i) => {
                  this.sites.map((site,i) => {
                     if(_.indexOf(v.siteType,site) != -1 && v.siteType[0]!=='S' && v.quoteAsset!=='USDD'){//dwj不要usdd
                        // v 每个站
                        if(v.baseAsset=='LTC' || v.baseAsset=='ETH' || v.baseAsset=='BTC'){//dwj显示币种
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
                  })
                  symbolUrl += `symbol=${v.symbol}&${v.symbol}_least=1&` //拼装推送数据查询url
               })
               this.symbolListSelf = siteObj;
               // //更新交易对的行情  默认掉用一次  当有快照驱动时 监听数据变化
               // this.initBoardModule();
               //获取交易对的推送的行情
               this.getSSERealTime(symbolUrl)
            })
         },
         //获取推送行情
         getSSERealTime(url) {
            const baseURL =  (window.location.protocol == 'http:') ? 'ws://' : 'wss://';
            const host =  window.location.host;
            this.SSEsource = new ReconnectingWebSocket(`${baseURL}${host}/quote/realTime.ws?${url}`)
            this.SSEsource.onopen = function(e) {
            };
            this.SSEsource.onmessage = (e) => {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               if (result.ping != undefined) {
                  var pongResponse = {};
                  pongResponse.pong = result.ping;
                  this.SSEsource.send(JSON.stringify(pongResponse))
                  return
               }
               if (this.pushData[result.symbol]) {//pushData 是后台推送过来的快照数据
                  this.pushData[result.symbol].splice(0,1,result);
               } else {
                  this.pushData[result.symbol] = [result];
               }
               this.initBoardModule();
               
            }
            this.SSEsource.onerror = (e) =>{
               console.log('market ws error', e)
            }
            //关闭时候触发
            this.SSEsource.onclose = (e) => {
            };
         },
         searchCoinList(value){//查询方法
            let searchList = this.baseAssetList;
            if(searchList==false){
               this.noData = true;
               return false;
            }else{
               this.noData = false;
            }
            let searchArr = [];
            searchList.map((v,i)=>{
               if(v.baseAsset.search(value) == -1){
                  //什么也没找到
               }
               else if(v.baseAsset.search(value)!== -1){//只要能找到一个就不能把noData设置为true
                  searchArr.push(v)
               }


            })
            if(searchArr.length==0){//无数据
               this.noData = true;
            }else{
               this.noData = false;
               this.baseAssetList = this.createBaseAssestList(searchArr);
            }
         },
         gotoExchange(symbol,type){
            this.$router.push({
               path:'/exchange',
               query:{
                  symbol:symbol,
                  site:type
               }
            })
         },
         gotoTongzheng(symbol,baseAsset){
            this.$router.push({
               path:'/StockToken',
               query:{
                  symbol:symbol,
                  baseAsset:baseAsset
               }
            })
         }
      },
      computed:{
             listenstage() {
                return this.$store.state.app.currentCurrencyState;
            }
      },
      watch:{
          listenstage:function(newV ,oldV){
                //法币估值做相应的刷新
                this.initBoardModule()
         },
         searchVal(val,oldVal){
            let inputVal = val.toUpperCase()
            this.searchVal = inputVal;
            if(inputVal==''||inputVal==undefined){
               this.initBoardModule()
               this.noData = false;
            }else{
               this.searchCoinList(inputVal)
            }
         }


      },
      mounted(){
         this.getSymbolListRealtimeData()
         this.fetchWidthDrawFee()
      },
      destroyed() {
         //关闭SSE行情推送
         this.SSEsource && this.SSEsource.close();
      }

   }
</script>

<style scoped  lang="less">
   .plate_content{
      min-height: 200px;
      margin:0 auto;
      margin-bottom: 40px;
      position: relative;
      // .ivu-table-wrapper{
      //     border-top:none;
      // }
      //lable 绝对定位
      .tabelLable{
         position: absolute;
         top:4px;
         left:10px;
         .labelBox{
            display:flex;
            align-items: center;
            font-size: 18px;
            font-weight:600;
            i{
               display:block;
               margin-right: 11px;
            }
            .bsite{
                width: 13px;
               height: 17px;
               background: url('../assets/images/home/mainHome/market-bitcoin.png') center center;
               background-size: 13px 17px;
            }
            .fsite{
                width: 18px;
               height: 16px;
               background: url('../assets/images/home/mainHome/market-exchange.png') center center;
               background-size: 18px 16px;
            }
            .ssite{
                width: 13px;
               height: 17px;
               background: url('../assets/images/home/mainHome/market-kline.png') center center;
               background-size: 13px 17px;
            }
            .csite{
                width: 17px;
               height: 15px;
               background: url('../assets/images/home/mainHome/market-logo.png') center center;
               background-size: 17px 15px;
            }
         }
         .bsiteFont{
            color: #12869A;
         }
         .fsiteFont{
            color: #12869A;
         }
         .ssiteFont{
            color: #12869A;
         }
         .csiteFont{
            color: #12869A;
         }
         

      }
      //更多
      .more{
         position: absolute;
         top:11px;
         right: 0px;
         z-index: 1000;
         a{
            color: #949DA6;
            font-size: 12px;
            font-weight:400;
            transition: color .3s ease-in;
            &:hover{
               color: #12869A;
            }
         }
      }
      .plate-table{
         width: 100%;
         table{
            width: 100%;
            border-collapse:collapse;
            table-layout:fixed;
            thead th{
               height: 42px;
               line-height: 42px;
               padding-left: 16px;
               padding-right: 16px;
               text-align: center;
               font-size:12px;
               color: #949DA6;
               background:#fff;
               width: 131px;
               border-bottom: 1px solid #F5F5F5;
               cursor: pointer;
               &:nth-child(1){
                  text-align: left;
               }
                &:nth-child(2){
                  text-align: left;
               }
                &:nth-child(3){
                  text-align: left;
                  padding-left: 60px;
                  width: 160px;
               }
                 &:nth-child(4){
                  text-align: right;
               }
                &:nth-child(5){
                  text-align: right;
               }
                &:nth-child(6){
                  text-align: right;
               }
                &:nth-child(7){
                  text-align: right;
               }
            }
            tbody tr{
               background:#fff;
               
               &:hover{
                  background:#F8FAFE;
               }
            }
            tbody tr td{
               height: 52px;
               border-bottom: 1px solid #F5F5F5;
               line-height: 52px;
               padding-top:0;
               padding-bottom:0;
               padding-left:16px;
               padding-right: 16px;
               text-align:center;
               font-size:14px;
               color: #344857;
               white-space:nowrap; /* for chrome */
               &:nth-child(1){
                  text-align: left;
               }
                 &:nth-child(2){
                  text-align: left;
               }
                &:nth-child(3){
                  text-align: left;
                  padding-left: 60px;
               }
                 &:nth-child(4){
                  text-align: right;
               }
                 &:nth-child(5){
                  text-align: right;
               }
                &:nth-child(6){
                  text-align: right;
               }
                &:nth-child(7){
                  text-align: right;
               }
               .currence{
                  font-size: 12px;
                  color: #949DA6;
               }
               .splot_line{
                  color: #949DA6;
                  font-size: 12px;
               }
               &:hover{
                  background: rgba(246,250,250,1);
               }
            }
            tbody tr td.redText{
               color:#DC382C;
            }
            tbody tr td.greenText{
               color:#27A781;
            }
            tbody tr td:last-child{
               text-align: right;
               cursor: pointer;
               background: url('../assets/images/home/mainHome/exchange.png') no-repeat center center;
               background-size: 20px;
               transition: transform .2s linear;
               &:hover{
                  // transform: rotateZ(45deg);
                  background: url('../assets/images/home/mainHome/hover-exchange.png') no-repeat center center;
                  background-size: 20px;
               }
            }

            tbody tr td:first-child{
               cursor: pointer;
               color: #344857;
            }
            tbody tr td:nth-child(7) {
               cursor: pointer;
            }
            tbody tr td:nth-child(6) em{
               color: #fff;
               margin-left:10px;
            }

         }
      }
      .palte_head{
         width: 100%;
         margin:0 auto;
         background:#fff;
         border-left:none;
         display: flex;
         justify-content: space-between;
         border-bottom: 1px solid #F5F5F5;
         .palte_head_left{
            span{
               display: inline-block;
               padding: 13px 20px;
               text-align: center;
               font-size:20px;
               color:#949DA6;
               cursor: pointer;
            }
            span em{
               display: inline-block;
               width: 14px;
               height: 14px;
               background: url(../assets/images/home/help_unclick.svg) no-repeat center  center;
            }
            span.on{
               border-bottom:none;
               border-top:none;
               border-bottom: 2px solid #13246C;
               color:#13246C;
            }
            span.on em{
               background:url('../assets/images/home/help.svg') no-repeat center center;
            }

         }
         .palte_head_right{
            display: flex;
            align-items: center;
            padding-right: 25px;
            a{
               color: #5A6CB1;
            }
         }
      }

   }



</style>
<style lang='less'>
  @bcolor:#12869A;
  @scolor:#12869A;
  @fcolor:#12869A;
  @ccolor:#12869A;
   #commonMarket{
      .ivu-input{
         border:1px solid #E5E5E5 !important;
      }
      .ivu-input-wrapper{
         border-radius: 6px;
      }
   }
   .marketBox{
      .ivu-table-sort i.on {
         color: #2d8cf0;
      }
      .ivu-tabs-bar{
         padding-left:220px;
         border-bottom:1px solid #f5f5f5;
         margin-bottom:0;
      }
      .B{
         .ivu-tabs-nav .ivu-tabs-tab-active{
            color:@bcolor;
         }
         .ivu-tabs-ink-bar{
            background-color:@bcolor;
         }
      }
      .F{
         .ivu-tabs-nav .ivu-tabs-tab-active{
            color:@fcolor;
         }
         .ivu-tabs-ink-bar{
            background-color:@fcolor;
         }
      }
      .S{
         .ivu-tabs-nav .ivu-tabs-tab-active{
            color:@scolor;
         }
         .ivu-tabs-ink-bar{
            background-color:@scolor;
         }
      }
      .C{
         .ivu-tabs-nav .ivu-tabs-tab-active{
            color:@ccolor;
         }
         .ivu-tabs-ink-bar{
            background-color:@ccolor;
         }
      }
   }
</style>