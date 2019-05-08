<template>
   <div class="header" id="mining">
      <img src="../assets/images/miningKo/banner.png" class="banner">
      <div class="header-content">
         <div class="content-left">
            <h3>{{$t('miningname1')}}</h3>
            <Row class="Row" type="flex" justify="space-between">
               <Col class="top-row">{{$t('totalmining')}}:</Col>
               <Col class="top-row" align="right">{{miningAmount}}FF</Col>
            </Row>
            <Row class="Row" type="flex" justify="space-between">
               <Col class="common-row">{{$t('miningstation')}}</Col>
               <Col class="common-row" align="right"><img src="../assets/images/miningKo/korea@2x.png" style="width:26px;
               margin: -3px 9px 0 0">{{$t('miningcountry')}}
               </Col>
            </Row>
            <Row class="Row" type="flex" justify="space-between">
               <Col class="common-row">{{$t('miningstarttime')}}</Col>
               <Col class="common-row" align="right">{{startTime}}</Col>
            </Row>
            <Row class="Row Row-btn" type="flex" justify="space-between">
               <Col class="common-row">
                  <router-link to='/exchange?symbol=FFUSDT&site=B'>
                     <Button type="primary">
                        <img src="../assets/images/miningKo/mining_tool@2x.png"
                             style="width: 11px;margin-bottom: 2px;">&nbsp;&nbsp;{{$t('startmining')}}
                     </Button>
                  </router-link>
               </Col>
               <Col class="common-row" align="right">
                  <router-link :to='link'>
                     <Button type="text">{{linkText}}</Button>
                  </router-link>
               </Col>
            </Row>
         </div>
         <div class="content-right">
            <div class="title">{{$t('miningdashboard')}}</div>
            <!--倒计时-->
            <Row class="Row-countDown" type="flex" justify="space-between" v-if="showCount">
               <Col class="common-row" align="left">
                  <h2>{{day}}</h2>
                  <p align="center">{{$t('day')}}</p>
               </Col>
               <Col class="common-row" align="center">
                  <h2>{{hour}}</h2>
                  <p>{{$t('hour')}}</p>
               </Col>
               <Col class="common-row" align="center">
                  <h2>{{minute}}</h2>
                  <p>{{$t('minute')}}</p>
               </Col>
               <Col class="common-row" align="right">
                  <h2>{{second}}</h2>
                  <p align="center">{{$t('second')}}</p>
               </Col>
            </Row>
            <Row class="Row row-border" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">{{$t('totalmining')}}</Col>
               <Col class="common-row" align="right">{{miningAmount}}</Col>
            </Row>
            <Row class="Row row-border" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">{{$t('remainingmining')}}</Col>
               <Col class="common-row" align="right">{{residue}}</Col>
            </Row>
            <Row class="Row row-border" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">{{$t('miningout')}}</Col>
               <Col class="common-row" align="right">{{mined}}</Col>
            </Row>
            <Row class="Row row-border" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">{{$t('miningtimes')}}</Col>
               <Col class="common-row" align="right">{{count}}</Col>
            </Row>
            <Row class="Row row-border" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">{{$t('fftotalcirculation')}}</Col>
               <Col class="common-row" align="right">{{liquidity}}</Col>
            </Row>
            <Row class="Row" type="flex" justify="space-between">
               <Col class="common-row color-C0D4DB">FF/USDT</Col>
               <Col class="common-row" align="right">{{quote}} <span :class="change>=0?'upColor':'downColor'">( {{change>=0?'+':''}} {{changeData}}% )</span>
               </Col>
            </Row>
         </div>
      </div>
   </div>
</template>

<script>
   import moment from 'moment-timezone'
   import bigDecimal from 'js-big-decimal' //除法失效
   import {getParseFloat} from '@/lib/utils.js'
   import {countDownTime} from '../../src/lib/utils'

   import {
      queryConfig, queryGlobal, queryTransaction
   } from '_api/miningKo.js'

   export default {
      name: "miningCommon",
      props: ['link', 'linkText'],
      data() {
         return {
            startTime: '--',
            last: '--',
            source: null,
            change: '--',
            changeColor: '',
            //倒计时
            showCount: false,
            day: '--',
            hour: '--',
            minute: '--',
            second: '--',
            //定时器
            timer: null,
            globalTimer: null,
            transactionTimer: null,
            //挖矿数据
            miningAmount: '--',
            residueAmount: '--',
            minedAmount: '--',
            miningCount: '--',
            platformAvailableAmount: '--',
            platformAmount: 0,
         }
      },
      methods: {
         init() {
            this.queryConfig()
            this.queryTransaction()
            this.queryGlobal()
            this.getSSE()
         },
         queryConfig() {
            queryConfig().then(res => {
               this.miningAmount = getParseFloat(Math.floor(res.miningAmount))
               this.startTime = moment.tz(res.startTime, "Asia/Seoul").format('YYYY-MM-DD HH:mm:ss') + '(UTC+9)'
               const startTime = new Date(res.startTime).getTime()
               this.countDown(startTime)
            })
         },
         countDown(startTime) {//倒计时
            this.timer = setInterval(() => {
               let obj = countDownTime(startTime)
               if (obj) {
                  this.showCount = true
                  this.day = obj.day
                  this.hour = obj.hour
                  this.minute = obj.minutes
                  this.second = obj.second
               } else {
                  //倒计时结束
                  this.showCount = false
                  clearInterval(this.timer)
               }
            }, 1000);
         },
         queryGlobal() {//挖矿数据
            queryGlobal().then(res => {
               if (res) {
                  this.residueAmount = getParseFloat(Math.floor(res.residueAmount))
                  this.minedAmount = getParseFloat(Math.floor(res.minedAmount))
                  this.miningCount = getParseFloat(Math.floor(res.miningCount))
                  this.platformAvailableAmount = getParseFloat(bigDecimal.add(Math.floor(res.minedAmount), this.platformAmount))
                  this.globalTimer = setTimeout(function () {
                     this.queryGlobal()
                  }.bind(this), 3000)
               }
            })
         },
         queryTransaction() {//FF流通总量
            queryTransaction().then(res => {
               this.platformAmount = Math.floor(res['platformAvailableAmount'])
            })
         },
         getSSE() {//行情推送
            let baseURL = window.location.protocol + '//' + window.location.host
            this.source = new EventSource(`${baseURL}/quote/realTime.stream?symbol=FFUSDT&FFUSDT_least=1`)
            this.source.addEventListener('open', () => {
            }, false);
            this.source.addEventListener('_RESULT', e => {
               const data = JSON.parse(e.data)
               this.last = data.last
               const changeString = bigDecimal.multiply(bigDecimal.divide(bigDecimal.subtract(data.last, data['previousClose']), data['previousClose']),100)
               this.change = Number(changeString).toFixed(2)
               let value = {'last': data.last, change: this.change}
               this.$emit('quoteValue', value)
            }, false);
            this.source.addEventListener('_ERROR', () => {
               this.getSSE()
            }, false);
            this.source.addEventListener('error', () => {
               setTimeout(function () {
                  this.getSSE()
               }.bind(this), 5000)
            }, false);
         },
      },
      computed: {
         //挖矿数据
         residue() {
            return this.residueAmount
         },
         mined() {
            return this.minedAmount
         },
         count() {
            return this.miningCount
         },
         liquidity() {
            return this.platformAvailableAmount
         },
         //FF/USDT行情
         quote() {
            return this.last
         },
         changeData() {
            return this.change
         },
      },
      mounted() {
         this.init()
      },
      destroyed() {
         //关闭SSE行情推送
         this.source && this.source.close();
         clearInterval(this.timer)
         clearInterval(this.globalTimer)
         clearInterval(this.transactionTimer)
      }
   }
</script>
<style lang="less">
   #mining {
      .ivu-btn {
         border-radius: 0;
         font-size: 14px;
         padding: 7px 25px;
         color: #fff;
      }
      .ivu-btn-primary {
         background-color: #12869A;
         border: solid 1px #12869A;
         &:hover {
            background-color: #108093;
         }
      }
      .ivu-btn-text {
         border: solid 1px #12869A;
         &:hover {
            background-color: #12869A;
         }
      }
   }
</style>
<style lang="less" scoped>
   @color-C0D4DB: #C0D4DB;
   .color-C0D4DB {
      color: @color-C0D4DB;
   }

   .row-border {
      border-bottom: solid 1px rgba(255, 255, 255, 0.1);
   }

   .upColor {
      color: #66B76D;
   }

   .downColor {
      color: #EA4853;
   }

   .header {
      .banner {
         width: 100%;
         height: 570px;
      }
      .header-content {
         position: absolute;
         top: 104px;
         left: 50%;
         transform: translateX(-50%);
         display: flex;
         justify-content: space-between;
         width: 1200px;
         font-size: 14px;
         color: #fff;
         .content-left {
            text-align: left;
            h3 {
               font-size: 34px;
               margin: 54px 0 39px;
            }
            .Row {
               margin-bottom: 18px;
               .top-row {
                  font-size: 24px;
               }
               .common-row {
                  font-size: 18px;
                  .color-C0D4DB;
               }
            }
            .Row-btn {
               margin-top: 38px;
            }
         }
         .content-right {
            width: 409px;
            /*height: 393px;*/
            background: rgba(255, 255, 255, 0.03);
            padding: 16px 30px 0;
            margin-top: 30px;
            .title {
               padding-bottom: 15px;
               font-size: 16px;
               text-align: center;
               .row-border;
            }
            .Row {
               padding: 8px 0;
            }
            .Row-countDown {
               margin: 30px 0 20px;
               h2 {
                  font-size: 34px;
               }
            }
            .row-mining {
               margin: 30px 0 15px;
               .mining-text {
                  font-size: 30px;
               }
            }
         }
      }
   }
</style>