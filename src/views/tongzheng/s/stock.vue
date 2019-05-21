<template>
    <div id="tongzheng">
       <section>
           <div class="main">
                <div class="banner">

                </div>
               <div class="main_center">
                   <div class="main_banner">
                       <div class="left">
                           <div class="logo_out">
                               <img :src="coinIconURL" alt="">
                           </div>
                           <div class="descriptoin">
                               <p><span>{{stockName}}</span><em>{{coinFullName}}</em></p>
                               <p>{{$t('tongzheng1')}}{{sharesNameCn}}<span>&nbsp{{name}}</span></p>
                               <p>
                            {{$t('tongzheng2')}}<br/>{{$t('tongzheng3')}}{{$t('tongzheng3a')}}
                        </p>
                           </div>
                       </div>
                       <div class="middle">
                           <p class="title">
                               <span>{{stockName}}</span>&nbsp&nbsp<em>/&nbsp&nbspUSDT</em>
                               <i  class="redText" v-if="this.showColor == -1">{{this.showColor == -1 ? '':'+'}} {{percent}}</i>
                                 <i  class="greenText" v-else > {{this.showColor == -1?'':'+'}} {{percent}}</i>
                               <label class="redText">(24H)</label>
                           </p>
                           <p class="price">
                               <span>≈</span>
                               <span v-html="stockData.last?stockData.last:'--'"></span>
                               <em>USD</em>
                           </p>
                           <div class="toay_data">
                               <div>
                                   <p>{{$t('tongzhenghight')}}</p>
                                   <p>＄{{stockData.high?stockData.high:'--'}}</p>
                               </div>
                               <div>
                                   <p>{{$t('tongzhenglow')}}</p>
                                   <p>＄{{stockData.low?stockData.low:"--"}}</p>
                               </div>
                               <div>
                                   <p>{{$t('tongzhengvalue')}}</p>
                                   <p>{{stockData.hour24Volume?stockData.hour24Volume:'--'}}</p>
                               </div>
                           </div>

                       </div>
                       <div class="right">
                           <span @click="forExchange">{{$t('tongzhengexchange')}}</span>
                       </div>
                   </div>
                   <div class="lint-title">
                       <span>{{$t('tongzheng4')}}<span>&nbsp&nbsp{{stockName}}</span>&nbsp{{$t('tongzheng4a')}}</span>
                       <router-link to='/stock'>{{$t('tongzheng5')}}<i>&nbsp></i>&nbsp</router-link>
                   </div>
                   <div class="assets_data">
                       <div class="assets_title">
                           <span><span>{{stockName}}</span> {{$t('tongzheng6')}}{{sharesNameCn}}</span>(<em>{{sharesSite}}:</em><i>{{name}}</i>)
                       </div>
                       <div class="assets_content">
                           <div class="assets_left">
                               <div>
                                   <label>{{stockName}}</label>
                                   <span><em>1</em>:<i>1</i></span>
                                   <label style='background:#556773'>{{name}}</label>
                               </div>
                               <div class="description">
                                   <h5>{{coinDescribeTitle}}</h5>
                                   <p v-for="item in coinDescribe">
                                       {{item}}
                                   </p>
                               </div>
                           </div>
                           <div class="assets_right">
                               <p>{{companyName}}</p>
                               <p>{{sharesSite}}: <em v-html="name"></em></p>
                               <p>
                                   <span v-html='stockDigatalData.lastestpri?stockDigatalData.lastestpri:"--"'>153.07</span>
                                   <em>USD</em>
                                   <i v-bind:class="{ redColor: redColor }" v-html="uppic"></i>
                                   <label v-bind:class="{ redColor: redColor }">({{limit}}%)</label>
                               </p>
                               <div>
                                   <p>
                                       <span>{{$t('stockhight')}}<em v-html="stockDigatalData.maxpri?stockDigatalData.maxpri:'--'"></em> </span>
                                       <span>{{$t('todayOpen')}}<em v-html="stockDigatalData.openpri?stockDigatalData.openpri:'--'"></em></span>
                                   </p>
                                   <p>
                                       <span>{{$t('stocklow')}}<em v-html="stockDigatalData.minpri ? stockDigatalData.minpri :'--'"></em> </span>
                                       <span>{{$t('yesterdayclose')}}<em v-html="stockDigatalData.formpri ? stockDigatalData.formpri :'--'"></em> </span>
                                       <span>{{$t('lastestexchagedate')}} <em v-html="time ? time : '--'"></em></span>
                                   </p>
                               </div>
                           </div>
                       </div>
                   </div>
                    <div class="management">
                        <div class="title">{{$t('tongzheng12')}}</div>
                        <div class="content">
                            <div>
                                <div>
                                    <div class="item">
                                         <p>{{$t('tongzheng13')}}</p>
                                        <p>{{$t('tongzheng14')}}</p>
                                    </div>
                                </div>
                                <p class="description">
                                    {{$t('tongzheng15')}}
                                </p>
                            </div>
                              <div>
                                <div>
                                    <div class="item">
                                        <p> {{$t('tongzheng16')}}</p>
                                        <p>{{$t('tongzheng17')}}</p>
                                    </div>
                                </div>
                                <p class="description">
                                    {{$t('tongzheng18')}}
                                </p>
                            </div>
                              <div>
                                <div>
                                    <div class="item">
                                        <p> {{$t('tongzheng19')}}</p>
                                        <p>{{$t('tongzheng20')}}</p>
                                    </div>
                                </div>
                               <p class="description">
                                    {{$t('tongzheng21')}}
                                </p>
                            </div>
                              <div>
                                <div>
                                    <div class="item">
                                        <p> {{$t('tongzheng22')}}</p>
                                        <p>{{$t('tongzheng23')}}</p>
                                    </div>
                                </div>
                                 <p class="description">
                                    {{sharesNameCn}}&nbsp{{$t('tongzheng24')}}
                                    <a class="baseColor" target="_blank" :href="coinURL">
                                        {{$t('tongzheng24a')}}
                                    </a>
                                    {{$t('tongzheng24b')}}
                                    <span>
                                       {{$t('tongzheng24c')}}
                                    </span>
                                    {{$t('tongzheng24d')}}
                                 </p>
                            </div>

                        </div>
                    </div>
        <div class="recycle_line">
            <p>{{stockName}} {{$t('tongzheng25')}}</p>
        </div>
        <div class="recycle">
             <Tabs :animated="false">
                <TabPane :label="stepOne">
                    <div class="content">
                        <div class="left"><img :src="stepOneimg" alt=""></div>
                        <div class="right">
                            <ul>
                                <li>
                                    <em>1</em>
                                    <span>{{$t('stockpublishsyestemone')}}</span>
                                </li>
                                <li>
                                    <em>2</em>
                                    <span>{{$t('stockpublishsyestemtwo')}}</span>
                                </li>
                                <li>
                                    <em>3</em>
                                    <span>{{$t('stockpublishsyestemthree')}}</span>
                                </li>
                                <li>
                                    <em>4</em>
                                    <span>{{$t('stockpublishsyestemfour')}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="stepTWO">
                        <div class="content">
                        <div class="left"><img :src="stepTwoimg" alt=""></div>
                        <div class="right">
                            <ul>
                                <li>
                                    <em>1</em>
                                    <span>{{$t('stockRedemptionone')}}</span>
                                </li>
                                <li>
                                    <em>2</em>
                                    <span>{{$t('stockRedemptiontwo')}}</span>
                                </li>
                                <li>
                                    <em>3</em>
                                    <span>{{$t('stockRedemptionthree')}}</span>
                                </li>
                                <li>
                                    <em>4</em>
                                    <span>{{$t('stockRedemptionfour')}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPane>
             </Tabs>
        </div>
        <div class="company_line">
            <p>{{companyName}}</p>
        </div>
        <div class="company">
             <Tabs :animated="false">
                <TabPane :label="shortdescription">
                    <span class="company_description" v-html="companyDescription"></span>
              </TabPane>
                <TabPane :label="mainIndextab">
                    <div class="indicator">
                        <p>
                            <span><span>{{$t('tongzheng55')}}</span>&nbsp&nbsp{{endTime}}</span>
                            <em>{{$t('tongzheng56')}}</em>
                        </p>
                        <div class="content">
                            <div class="left">
                                <div class="left-inner">
                                    <p>{{$t('tongzheng40')}}</p>
                                    <p>{{$t('tongzheng42')}}</p>
                                    <p>{{$t('tongzheng44')}}</p>
                                    <p>{{$t('tongzheng46')}}</p>
                                    <p>{{$t('tongzheng48')}}</p>
                                </div>
                                <div class="right-inner">
                                    <p>{{mainIndex.pe_rate ? mainIndex.pe_rate : '--'}}</p>
                                    <p>{{mainIndex.eps_total ? mainIndex.eps_total :'--'}}</p>
                                    <p>{{mainIndex.iats ? mainIndex.iats : '--'}}</p>
                                    <p>{{mainIndex.gross_profit_rate ? mainIndex.gross_profit_rate : '--'}}</p>
                                    <p>{{mainIndex.capital_stock_total ? mainIndex.capital_stock_total : '--'}}</p>
                                </div>

                            </div>
                            <div class="right">
                                 <div class="left-inner">
                                    <p>{{$t('tongzheng41')}}</p>
                                    <p>{{$t('tongzheng43')}}</p>
                                    <p>{{$t('tongzheng45')}}</p>
                                    <p>{{$t('tongzheng47')}}</p>
                                    <p>{{$t('tongzheng49')}}</p>
                                </div>
                                <div class="right-inner">
                                    <p>{{mainIndex.pb_rate ? mainIndex.pb_rate : '--'}}</p>
                                    <p>{{mainIndex.eps_total_rate ? mainIndex.eps_total_rate : '--'}}</p>
                                    <p>{{mainIndex.iats_rate ? mainIndex.iats_rate : '--'}}</p>
                                    <p>{{mainIndex.net_interest_rate ? mainIndex.net_interest_rate :'--'}}</p>
                                    <p>{{mainIndex.market_value_total ? mainIndex.market_value_total : '--'}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <!-- <TabPane :label="mainMakeup">
                    <div class="mainMakeup">
                        <div class="echats_box">
                            <v-chart  :options="polar"/>
                        </div>
                     <div class="content">
                             <div class="table_data">
                                 <div class="select_input">
                                     <div>
                                         <Select @on-change="selectDate" v-model="model1" style="width:200px">
                                                <Option  v-for="item in dataTimeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                     </div>
                                 </div>
                                 <ul>
                                     <li>
                                         <span></span>
                                         <span>{{$t('tongzheng57')}}</span>
                                         <span>{{$t('tongzheng58')}}</span>
                                     </li>
                                     <li v-for="item in mainIndicator">
                                         <span>{{item.name ? item.name : '--' }}</span>
                                         <span>{{item.amount ? item.amount : '--'}}</span>
                                         <span>{{item.rate ? item.rate : '--'}}</span>
                                     </li>
                                   
                                 </ul>
                            </div>
                     </div>
                    
                    </div>
                </TabPane> -->
                <TabPane :label="finaceReport">
                    <ul class="finace">
                        <li v-for="item in financialReport">
                            <span><img src="../../../assets/images/tongzheng/s/reports.png" alt=""></span>
                            <a target="_blank" :href="item.url">{{item.name}}</a>
                        </li>
                    </ul>
                </TabPane>
            </Tabs>
        </div>

               </div>
           </div>

       </section>
       <div >
           <Modal
                v-model="model2"
                :styles="{top: '100px'}">
                <div>
                     <p slot="header" style="color:#344857;text-align:center;font-size:16px;">
                        <span>{{$t('tongzheng50')}}&nbsp{{stockName}}&nbsp{{$t('tongzheng50a')}}</span>
                    </p>
                    <div class="modal-box">
                        <div class="left">
                        <p>{{$t('tongzheng51')}}</p>
                        <p>
                            <span @click="gotoEXchange">{{$t('tongzheng53')}}&nbsp{{stockName}}</span>
                        </p>
                        </div>
                        <div class="middle"></div>
                        <div class="right">
                            <p>{{$t('tongzheng52')}}</p>
                            <p>
                                <span @click='gotOtc'>{{$t('tongzheng54')}}</span>
                            </p>
                        </div>
                    </div>
                 
                </div>
                   <div slot="footer"></div>
        </Modal>
       </div>
          
    </div>
</template>
<script>
    import {stockDataUrl} from '../../../../api/urls.js';
    import {getApi} from '../../../../api/axios.js';
   import moment from 'moment';
    import ECharts from 'vue-echarts';
    import 'echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/polar';
    import bigDecimal from 'js-big-decimal' ;//除法失效
    import {BigNumber} from 'bignumber.js';

    export default {
        
        data(){
            return{
                countryLanguage:localStorage.getItem('countryLanguage'),
                pushData:[],//推送过来的快照
                stockData:{},
                ossJSON:{},
                stockDetalMessage:{},//股票所在公司的介绍
                stockDigatalData:{},//股票高，开，低，收的数据
                uppic:'',
                limit:'',
                redColor:false,
                time:'',
                name:'',//AAPL
                stockName:'',//AAPLT
                coinFullName:'',
                sharesNameCn:'',
                coinIconURL:"",
                coinURL:'',
                sharesSite:'',
                coinDescribeTitle:'',
                showColor:'',
                coinDescribe:[],
                quartersArray:[],
                companyDescription:'',
                mainIndicator:[],//主要构成
                mainIndicatorName:[],
                mainIndex:{},//主要指标
                 model1: '',
                 endTime:'',
                 financialReport:[],
                 companyName:'',
                 noPadding:'--',
                 percent:'',
                dataTimeList: [
                   
                ],
                stepOneimg:require('../../../assets/images/tongzheng/s/tongzheng.png'),
                stepTwoimg:require('../../../assets/images/tongzheng/s/stock_cn.png'),
                // Title:'交易AAPLT需使用数字资产USDT',
                model2:false,
                stepOne: (h) => {
                    return h('div', [
                        h('span',this.$t('tongzheng26')),
                        h('em',{
                          style:{paddingLeft:'0px'}  
                        },this.stockName),
                        
                    ])
                },
                stepTWO: (h) => {
                    return h('div', [
                        h('span',this.$t('tongzheng26a')),
                        h('em',{
                            style:{paddingLeft:'5px'}
                        },this.sharesNameCn),
                        h('em',{
                            style:{paddingLeft:'5px'}
                        },this.name)

                        
                    ])
                },
                shortdescription: (h) => {
                    return h('div', [
                        h('span', this.$t('tongzheng36')),
                    ])
                },
                 mainIndextab: (h) => {
                    return h('div', [
                        h('span', this.$t('tongzheng37')),
                    ])
                },
                 mainMakeup: (h) => {
                    return h('div', [
                        h('span', this.$t('tongzheng38')),
                    ])
                },
                 finaceReport: (h) => {
                    return h('div', [
                        h('span', this.$t('tongzheng39')),
                    ])
                },
               polar: {
                    tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']//从后台拿数据
                },
                grid:{
                    width:'300px',  
                },
                series: [
                    {
                        type:'pie',
                        radius: ['40%', '60%'],
                        center: ['60%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]//从后台拿数据
                     
                    }
                ],
                    animationDuration: 2000
                }

            }

        },
         components: {
            'v-chart': ECharts
        },
        methods:{
            getSSERealTime(url) {
            let baseURL = window.location.protocol+'//'+window.location.host
            this.SSEsource = new EventSource(`${baseURL}/quote/realTime.stream?${url}`)
            this.SSEsource.onopen = function(e) {
            };
            this.SSEsource.addEventListener('_RESULT', function(e) {
               //每次推送一条记录
               let result = JSON.parse(e.data)
               if (this.pushData[result.symbol]) {//pushData 是后台推送过来的快照数据
                //   this.pushData[result.symbol].push(result)
                 this.pushData[result.symbol] = [result];
                  //保持1条行情记录,
                //   if (this.pushData[result.symbol].length > 1) {
                //      this.pushData[result.symbol] = _.drop(this.pushData[result.symbol], this.pushData.length)
                //   }
               } else {
                  this.pushData[result.symbol] = [result];
               }
               //对象变动检测
               this.pushData = Object.assign({}, this.pushData)
               this.stockData = this.pushData[this.$route.query.symbol][0];
                     let nowPrice = this.stockData
                      this.percent = this.noPadding
                        let diff = '';
                        let a = '';
                     if (nowPrice.previousClose) {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.previousClose);
                            let aa = new BigNumber(diff).dividedBy(new BigNumber(nowPrice.previousClose)).toFixed(6)
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.previousClose)).toFixed(6), '100')
                            this.percent =  bigDecimal.round(a, 2) + "%"
                        } else {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.open);
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.open)).toFixed(6), '100')
                            this.percent =  bigDecimal.round(a, 2) + "%"
                        }
                        //绿涨红跌 1绿色 0灰色 -1红色
                        this.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)
            //    console.log(this.pushData)

            }.bind(this))
            this.SSEsource.addEventListener('_ERROR', function(e) {
               console.log('连接断开', e)
            })
         },
         getStockData(nasdaqName){//获取股票价格的数据
             let params = {
                 name: nasdaqName
             }
             getApi(stockDataUrl,params).then((res)=>{
                 this.stockDigatalData = res.result[0].data;
                 this.uppic = res.result[0].data.uppic;
                 this.limit = res.result[0].data.limit;
                 if(this.uppic.indexOf('-')!==-1){//跌
                    this.redColor = true;
                 }else{//涨
                     this.uppic = '+'+this.uppic;
                     this.limit = '+'+this.limit;

                 }
                    

                  this.time =  moment(this.stockDigatalData.chtime).format('YYYY-MM-DD');
                  this.name =  this.stockDigatalData.gid.toUpperCase();

             })
         },
         selectDate(value){
             this.searchStockData(value)
         },
         searchStockData(time){//时间筛选方法
                // console.log(this.quartersArray)
                this.quartersArray.forEach((v,i)=>{
                    if(time == v.quarter){
                            this.mainIndicator = v.quarterData.business_composition;
                                this.mainIndicator.forEach((v,i)=>{//主要指标
                                    v.value = Number(v.rate.substring(0,v.rate.length-1));//  给返回的对象里面添加一个value字段
                                    this.mainIndicatorName.push(v.name)
                                })
                            this.polar.series[0].data = v.quarterData.business_composition;
                    }
                })



         },
        forExchange(){
            this.model2 = true;
        },
        gotoEXchange(type){
            this.$router.push({
               path:'/exchange',
               query:{
                  symbol:this.$route.query.symbol,
                  site:'S'
               }
            })
        },
        gotOtc(){
            window.open('https://otc.55gm.co/home','_blank')
            this.model2 = false;
        },
        getStockJson(name,url,language){
            let _that = this;
                getApi(url,{}).then((res)=>{
                    _that.ossJSON = res;
                    _that.ossJSON.forEach((v,i)=>{
                        if(v.coinName ==  name.toUpperCase()){
                            _that.stockDetalMessage = v;
                            _that.stockName = v.coinName.toUpperCase()
                             _that.getStockData(_that.stockDetalMessage.sharesKey)//通过股票名字请求接口获取数据
                             _that.companyDescription = v.companyDescribe;
                             _that.companyName = v.companyName;
                             _that.quartersArray = v.quarters;//得到好几个季度的数组数据
                             _that.financialReport = v.financial_reports;//财务报告
                             _that.coinFullName = v.coinFullName;
                             _that.sharesNameCn = v.sharesNameCn;
                             _that.coinIconURL = v.coinIconURL;
                             _that.sharesSite = v.sharesSite;
                             _that.coinDescribeTitle = v.coinDescribeTitle;
                             _that.coinURL = v.coinURL;
                            _that.coinDescribe = v.coinDescribe.replace(/<\s*\/br>/gi,"<br/>").split('<br/>')// 切割成数组然后处理成换行；
                        }
                    })
                    if(language){

                    }else{
                        _that.quartersArray.forEach((v,i)=>{//下拉时间列表
                        let obj = {
                            value : v.quarter,
                            label : v.quarter
                        }
                        _that.dataTimeList.push(obj);//季度时间列表
                        _that.model1 = _that.dataTimeList[0].value;
                        if(v.quarter == _that.model1){//  按季度筛选
                            _that.mainIndicator = v.quarterData.business_composition;
                        }

                    })
                     _that.mainIndicator.forEach((v,i)=>{//主要指标
                             v.value = Number(v.rate.substring(0,v.rate.length-1));//  给返回的对象里面添加一个value字段
                            _that.mainIndicatorName.push(v.name)
                        })
                    }
                    
                    _that.polar.series[0].data = _that.mainIndicator.slice(0,_that.mainIndicator.length-1);//给echarts动态赋值
                    _that.polar.legend.data = _that.mainIndicatorName;//给echarts动态赋值
                    _that.mainIndex = _that.quartersArray[0].quarterData.main_index;
                    _that.endTime =  _that.quartersArray[0].end_time;
                })

            },
            
       
        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//返回全局state的状态值
            }

        },
        watch:{
             languageChange:function(curVal,oldVal){
                    if(curVal=='zh-CN'){
                         this.getStockJson(this.$route.query.baseAsset,'https://oss.55gm.co/content/coin-desc/shares_coin_describe_cn.json',curVal)//aaplt
                         this.stepOneimg = require('../../../assets/images/tongzheng/s/tongzheng.png')
                        this.stepTwoimg = require('../../../assets/images/tongzheng/s/stock_cn.png')

                    }else{
                        this.getStockJson(this.$route.query.baseAsset,'https://oss.55gm.co/content/coin-desc/shares_coin_describe_en.json',curVal)//aaplt
                         this.stepOneimg = require('../../../assets/images/tongzheng/s/tongzheng_en.png')
                        this.stepTwoimg = require('../../../assets/images/tongzheng/s/stock_en.png')


                    }
            },
        },
        mounted(){
            let queryName = this.$route.query.symbol;//AAPLTUSDT
            let symbolUrl = 'symbol='+queryName+'&'+queryName+"_least=1";//拼装推送数据查询url
            this.getSSERealTime(symbolUrl)
            let curLanguage = localStorage.getItem('countryLanguage');
            if(curLanguage=='zh-CN'){
                this.getStockJson(this.$route.query.baseAsset,'https://oss.55gm.co/content/coin-desc/shares_coin_describe_cn.json')//aaplt
                this.stepOneimg = require('../../../assets/images/tongzheng/s/tongzheng.png')
                this.stepTwoimg = require('../../../assets/images/tongzheng/s/stock_cn.png')
            }else{
                this.getStockJson(this.$route.query.baseAsset,'https://oss.55gm.co/content/coin-desc/shares_coin_describe_en.json')//aaplt
                this.stepOneimg = require('../../../assets/images/tongzheng/s/tongzheng_en.png')
                this.stepTwoimg = require('../../../assets/images/tongzheng/s/stock_en.png')
            }

        },
          destroyed() {
            //关闭SSE行情推送
            this.SSEsource && this.SSEsource.close();
        }

    }


</script>
<style lang='less' scoped>
    @import './stock.less';

</style>
<style lang='less'>

.echarts {
  width: 120%;
//   height: 100%;
}
    #tongzheng{
        .recycle,.company{
            .ivu-tabs{
                width:100%;
                margin:0 auto;
                .ivu-tabs-tabpane{
                    padding:0px 30px;
                  
                }
            }
            .ivu-tabs-nav{
                .ivu-tabs-tab{
                    color:#949DA6;
                    font-size:14px;
                }
                 .ivu-tabs-tab-active{
                    color:#344857;
                    font-size:14px;
                }
            }
            .ivu-tabs-ink-bar{
                background-color:#12869A;
            }
        }
       .company{
              .ivu-tabs{
                   .ivu-tabs-tabpane{
                        padding-bottom:60px;
                        //  &:nth-child(3){
                        //  padding-bottom:0px;
                        // }
                   }
              }
             
        }

    }
  .modal-box{
        display:flex;
        justify-content: space-between;
        margin-top:50px;
        .left{
            margin-left:20px;
            p{
                color:#5A626D;
                font-size:14px;
                text-align:center;
                color:#5A626D;
                &:nth-child(2){
                    span{
                        displya:inline-block;
                        background-color:#12869A;
                        color:#FFFFFF;
                        font-size:14px;
                        padding:12px 22px;
                        margin-top:40px;
                        cursor: pointer;
                        display:inline-block;

                    }
                }
            }

        }
        .middle{
            height:50px;
            width:1px;
            background:#E7EAED;
        }
        .right{
            margin-right:20px;
             p{
                color:#5A626D;
                font-size:14px;
                text-align:center;
                color:#344857;
                  &:nth-child(2){
                    span{
                        background-color:#fff;
                        border:1px solid #12869A;
                        color:#12869A;
                        font-size:14px;
                        padding:12px 22px;
                        margin-top:40px;
                        cursor: pointer;
                        display:inline-block;
                        &:hover{
                            background:#12869A;
                            color:#fff;
                        }
                    }
                }
            }
        }
    }

</style>
