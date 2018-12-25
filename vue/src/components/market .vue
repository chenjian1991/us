<template>
   <div class="marketBox">
      <div id="commonMarket"  class="plate_content clearfix" :class="site" v-for="(value, site, index) in homeTableObject">
         <div class="tabelLable">
            <div v-if="site == 'B'" class="labelBox bsiteFont"> <i class="bsite"></i>{{$t('headerblockchain')}}</div>
            <div v-if="site == 'S'" class="labelBox ssiteFont"> <i class="ssite"></i>{{$t('headerstockchain')}}</div>
            <div v-if="site == 'F'" class="labelBox fsiteFont"> <i class="fsite"></i>{{$t('headerfrancechain')}}</div>
            <div v-if="site == 'C'" class="labelBox csiteFont"> <i class="csite"></i>{{$t('headercoustomerchain')}}</div>
         </div>
         <div class="more"><router-link to='/exchange'>{{$t('bbjyMore')}}</router-link></div>
         <Tabs :animated="false">
            <TabPane :label="quote" v-for="(item,quote,num) in value">
               <div class="plate-table table-responsive">
                  <table class="table" >
                     <thead>
                        <th>{{$t('HomePair')}}</th>
                        <th>{{$t('HomeLatestPrice')}}</th>
                        <th>{{$t('HomeVariance')}}</th>
                        <th>{{$t('HomeHighest')}}</th>
                        <th>{{$t('HomeLowest')}}</th>
                        <th>{{$t('HomeTradeVolume')}}</th>
                        <th>{{$t('HomeGoTrade')}}</th>
                     </thead>
                     <tbody>
                     <tr v-for='(item,index) in item'>
                        <td @click="gotoExchange(item.symbol,site)">{{item.baseAsset}}/{{item.quoteAsset}}</td>
                        <td>{{item.last | scientificToNumber}}</td>
                        <td :class="[item.showColor == -1?'redText':'',item.showColor == 1?'greenText':'']">{{item.percent | scientificToNumber }}</td>
                        <td>{{item.high | scientificToNumber }}</td>
                        <td>{{item.low | scientificToNumber}}</td>
                        <td>{{item.volume | scientificToNumber}}</td>
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
   import {getSymbolList_realtime} from '../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
   import bigDecimal from 'js-big-decimal';
   import {BigNumber} from 'bignumber.js';
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
            mainHomeCoin:{}, //大首页推荐的币种
            tabels:[
               {text:'1'},
               {text:'2'},
               {text:'3'},
               {text:'4'},
            ],
            routePath:''
         }
      },
      methods:{
         initBoardModule() {
            // //更新模块
            // this.quoteCoinList = this.symbolListSelf[this.boardIndex]//板块BTC,USDD,USDT,ETH  this.quoteCoinList  [{},{}]是个数组
            // //更新交易资产列表 同时 更新当前交易对行情 交易对历史列表
            // this.baseAssetList = this.createBaseAssestList(this.quoteCoinList);
            // this.searchCoinList(this.searchVal.toUpperCase())
            let allSiteObj = {}
            //所有的Table拼接行情数据
            _.forEach(this.symbolListSelf,(v,k)=>{
               let obj = {}
               _.forEach(v,(item,key) =>{
                  obj[key] =  this.createBaseAssestList(item)
               })
               allSiteObj[k] = obj
            })
            this.homeTableObject = allSiteObj
         },
         createBaseAssestList(symbolList) {
            let newArr = []
            
            //合并行情
            if(symbolList.length==0){
               return false;
            }
            symbolList.map((v, i) => {//symbolList 循环数组
               let nowPrice = {}
               nowPrice = this.getSymbolNowPrice(v.symbol);
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
                  v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)//比较数字大小
                  if(v.showColor == 1){
                     v.percent = '+'+v.percent
                  }
                  //计算最新价格精度
                  let long = getDecimalsNum(v.priceTickSize)
                  nowPrice.last = bigDecimal.round(nowPrice.last, long)
               }
               //默认写死的币种
               if(v.symbol == "BTCUSDT" ||v.symbol == "EURDUSDD" || v.symbol == "AAPLTUSDT" || v.symbol == "FFUSDT"){
                  this.mainHomeCoin[v.symbol] = Object.assign(v, nowPrice)
                  this.$store.commit('updateMainHomePrice', this.mainHomeCoin);
               }
               newArr.push(Object.assign(v, nowPrice))
            })
            return newArr
         },
         //获取交易对的实时价格
         getSymbolNowPrice(symbol) {
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
                     if(_.indexOf(v.siteType,site) != -1){
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
                  })
                  symbolUrl += `symbol=${v.symbol}&${v.symbol}_least=1&` //拼装推送数据查询url
               })
               this.symbolListSelf = siteObj//{B:{BTC:[],ETH:[],USDD:[],USDT:[]}}
               console.log(1111,siteObj)

               // //更新交易对的行情  默认掉用一次  当有快照驱动时 监听数据变化
               // this.initBoardModule();
               //获取交易对的推送的行情
               this.getSSERealTime(symbolUrl)
            })
         },
         //获取推送行情
         getSSERealTime(url) {
            let baseURL = window.location.protocol+'//'+window.location.host
            this.SSEsource = new EventSource(`${baseURL}/quote/realTime.stream?${url}`)
            this.SSEsource.onopen = function(e) {
               console.log("行情推送连接已经建立：", this.readyState);
            };
            this.SSEsource.addEventListener('_RESULT', function(e) {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               if (this.pushData[result.symbol]) {//pushData 是后台推送过来的快照数据
                  this.pushData[result.symbol].push(result)
                  //保持21条行情记录,
                  if (this.pushData[result.symbol].length > 1) {
                     this.pushData[result.symbol] = _.drop(this.pushData[result.symbol], 1)
                  }
               } else {
                  this.pushData[result.symbol] = [result];
               }
               //对象变动检测
               this.pushData = Object.assign({}, this.pushData)
            }.bind(this))
            this.SSEsource.addEventListener('_ERROR', function(e) {
               console.log('连接断开', e)
            })
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
      },
      computed:{

      },
      watch:{
         'pushData': {
            handler: function(newVal, oldVal) {
               //更新交易对的行情
               this.initBoardModule();
            },
            deep: true,
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
         this.routePath = this.$route.path;
         console.log(this.$route.path)
      },
      destroyed() {
         //关闭SSE行情推送
         this.SSEsource && this.SSEsource.close();
      }

   }
</script>

<style scoped  lang="less">
.F{
   display: none;
}
   .plate_content{
      width:1200px;
      min-height: 400px;
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
         left:0;
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
                width: 13px;
               height: 17px;
               background: url('../assets/images/home/mainHome/market-logo.png') center center;
               background-size: 13px 17px;
            }
         }
         .bsiteFont{
            color: #38499A;
         }
         .fsiteFont{
            color: #AA935E;
         }
         .ssiteFont{
            color: #268790;
         }
         .csiteFont{
            color: #56646F;
         }
         

      }
      //更多
      .more{
         position: absolute;
         top:11px;
         right: 0;
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
            thead th{
               text-align: left;
               height: 42px;
               line-height: 42px;
               padding-left: 16px;
               padding-right: 16px;
               text-align: center;
               font-size:12px;
               color: #949DA6;
               background:#fff;
               width: 171px;
            }
            tbody tr{
               background:#fff;
               border-bottom: 1px solid #F5F5F5;
               &:hover{
                  background:#F8FAFE;
               }
            }
            tbody tr td{
               height: 52px;
               line-height: 52px;
               padding-top:0;
               padding-bottom:0;
               padding-left:25px;
               padding-right: 25px;
               text-align: center;
               font-size:14px;
               color: #344857;
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
                  transform: rotateZ(45deg);
               }
            }
            tbody tr td:first-child{
               cursor: pointer;
               color: #344857;
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
  @bcolor:#38499A;
  @scolor:#268790;
  @fcolor:#AA935E;
  @ccolor:#56646F;
   #commonMarket{
      .ivu-input{
         border:1px solid #E5E5E5 !important;
      }
      .ivu-input-wrapper{
         border-radius: 6px;
      }
   }
   .marketBox{
      .ivu-tabs-bar{
         padding-left:200px;
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