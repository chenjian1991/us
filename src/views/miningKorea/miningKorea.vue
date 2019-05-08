<template>
   <div class="wrapper">
      <mining-common link="myMining" :linkText="$t('viewmymining')" @quoteValue="getQuoteValue"></mining-common>
      <div class="headerList">
         <ul class="list content-common">
            <li v-for="(item,index) in headerList" :key="index" class="item">
               <img :src="item.imgSrc">
               <p>{{$t(item.title)}}</p>
               <div>{{$t(item.desc)}}</div>
            </li>
         </ul>
      </div>
      <section class="ranking ranking-common">
         <div class="ranking-content content-common">
            <div class="ranking-content-title">
               <h2 class="ranking-title">{{$t('miningranking')}}</h2>
               <span class="extra"><img src="../../assets/images/miningKo/icon@2x.png"><router-link
                  to="myMining">{{$t('viewmymining')}}</router-link></span>
            </div>
            <div class="ranking-content-data">
               <div class="ranking-data" v-for="(data,index) in rankingContent" :key="index">
                  <h4>{{$t(data.title)}}</h4>
                  <Row class="ranking-item">
                     <Col span="3" class="data-title">{{$t('rankingnum')}}</Col>
                     <Col span="6" class="data-title">{{$t('account')}}</Col>
                     <Col span="8" class="data-title">{{$t('totalffformining')}}(FF)</Col>
                     <Col span="7" class="data-title" align="right" style="padding-right: 10px">
                        {{$t('estimatedvalue')}}
                     </Col>
                  </Row>
                  <Row v-for="(item,i) in data.rankingData" :key="i" class="ranking-item"
                       :class="i%2===0?'item-color':''">
                     <Col span="3">
                        <div v-if="i === 0">
                           <img src="../../assets/images/miningKo/no1@2x.png" width="20">
                        </div>
                        <div v-else-if="i === 1">
                           <img src="../../assets/images/miningKo/no2@2x.png" width="18">
                        </div>
                        <div v-else-if="i === 2">
                           <img src="../../assets/images/miningKo/no3@2x.png" width="18">
                        </div>
                        <div v-else>
                           {{i+1}}
                        </div>
                     </Col>
                     <Col span="7" class="account">
                        {{item.profilePhone||item.profileEmail||'--'}}
                     </Col>
                     <Col span="6">{{item.yesterdayIncoming||item.todayIncoming||item.accumulateIncoming||'--'}}</Col>
                     <Col span="8" align="right" style="padding-right: 10px">
                        {{item.valuation&&item.valuation+'KRW'||'--'}}
                     </Col>
                     <!--<Col span="7" v-else>&#45;&#45;</Col>-->
                  </Row>
               </div>
            </div>
            <div class="ranking-desc">
               <ul>
                  <li v-for="(item,index) in rankingDesc" :key="index">{{$t(item)}}</li>
               </ul>
            </div>

         </div>
      </section>
      <section class="ranking-rule ranking-common">
         <div class="content-common">
            <h2 class="ranking-title">{{$t('miningcampaignrules')}}</h2>
            <ul class="rule-common-list">
               <li v-for="(item,i) in rankingRule" :key="i" class="rule-common-item">
                  <h4>{{$t(item.title)}}</h4>
                  <ul class="rule-list">
                     <li v-for="(rule,index) in item.rule" :key="index" class="rule-item">{{$t(rule)}}</li>
                  </ul>
               </li>
            </ul>
            <ul class="rule-common-list">
               <li v-for="(item,i) in attention" :key="i" class="rule-common-item attention">
                  <h4>{{$t(item.title)}}</h4>
                  <ul class="rule-list">
                     <li v-for="(rule,index) in item.rule" :key="index" class="rule-item ">*{{$t(rule)}}</li>
                  </ul>
               </li>
            </ul>
            <a :href="$t('readMiningRulesLink')" style="color:#2d8cf0"
               target="_blank">{{$t('readMiningRulesLinkText')}}</a>
         </div>
      </section>
      <section class="ranking-community ranking-common">
         <div class="content-common">
            <h2 class="ranking-title">{{$t('joincommunity')}}</h2>
            <h4>{{$t('joincommunityslogan')}}</h4>
            <Row class="community-item">
               <Col span="12" class="community-content"><a href="https://t.me/Korea_55GlobalMarkets"
                                                           target="_blank"><img
                  src="../../assets/images/miningKo/icon@2x(1).png"></a>
                  <p>{{$t('jointelegram')}}</p></Col>
               <Col span="12" class="community-content"><a href="https://open.kakao.com/o/gKZtIY3" target="_blank"><img
                  src="../../assets/images/miningKo/icon@2x(2).png"></a>
                  <p>{{$t('joinkakao')}}</p></Col>
               <!--<Col span="8" class="community-content"><img src="../../assets/images/miningKo/icon@2x(3).png">-->
               <!--<p>{{$t('onlinecustomerservice')}}</p></Col>-->
            </Row>
         </div>
      </section>
      <section class="ranking-earth ranking-common">
         <div class="content-common">
            <h2 class="ranking-title">{{$t('miningname1')}}</h2>
            <img src="../../assets/images/miningKo/ditu.png">
            <div class="animate">
               <div class="point"></div>
               <div class="circle"></div>
               <div class="circle1"></div>
            </div>
            <h3>{{$t('southkorea')}}</h3>
            <div class="Japan f12">{{$t('japan')}}</div>
            <div class="Europe f12">{{$t('europe')}}</div>
            <div class="USA f12">{{$t('unitedstates')}}</div>
            <div class="Caribbean f12">{{$t('caribbean')}}</div>
            <div class="South-America f12">{{$t('southamerica')}}</div>
         </div>
      </section>
   </div>
</template>

<script>
   import miningCommon from '@/components/miningCommon.vue'
   import bigDecimal from 'js-big-decimal' //除法失效
   import {subNumberPoint} from '@/lib/utils.js'
   import {
      listTop
   } from '_api/miningKo.js'
   import {getLegalTenderValue} from '_api/header.js'

   export default {
      name: "miningKorea",
      components: {'mining-common': miningCommon},
      data() {
         return {
            rate: '',
            newValue: 0,
            headerList: [{
               imgSrc: require('../../assets/images/miningKo/icon1@2x.png'),
               title: 'teammining',
               desc: 'miningpr1'
            }, {
               imgSrc: require('../../assets/images/miningKo/icon2@2x.png'),
               title: 'superminer',
               desc: 'miningpr2'
            }, {
               imgSrc: require('../../assets/images/miningKo/icon3@2x.png'),
               title: 'miningpr3',
               desc: 'miningpr4'
            }],
            rankingContent: [
               {title: 'totalminingranking', rankingData: []},
               {title: 'todayminingranking', rankingData: []},
               {title: 'yestodayminingranking', rankingData: []}],
            rankingDesc: [
               'miningrule17',
               'miningrule18',
               'miningrule4'],
            rankingRule: [{
               title: 'individualmining',
               rule: ['miningrule14',
                  'miningrule15',
                  'miningrule16']
            }, {
               title: 'teammining',
               rule: ['miningrule5',
                  'miningrule6',
                  'teamminingrule3']
            }, {
               title: 'miningrule9',
               rule: ['miningrule10',
                  'miningrule11',
                  'miningrule12']
            },],
            attention: [{
               title: 'miningAttention',
               rule: ['miningrule17',
                  'miningrule18',
                  'miningrule19',
                  'miningrule20']
            }],
            rankingRefresh: null,//排行榜3秒刷新
         }
      },
      methods: {
         init() {
            this.getLegalTenderValue()
            this.rankingContent.map(v => {
               for (let i = 0; i < 10; i++) {
                  v.rankingData.push({})
               }
            })
            this.getListTop()
         },
         getQuoteValue(value) {
            this.newValue = value.last
         },
         getLegalTenderValue() {//韩元汇率
            getLegalTenderValue({
               fromCurrency: 'USD',
               toCurrency: 'KRW'
            }).then(res => {
               this.rate = res.rate
               console.log(this.rate)
            })
         },
         getListTop() {//排行榜
            (async () => {
               await new Promise(resolve => {
                  let timer = setInterval(function () {
                     if (this.newValue && this.rate) {
                        clearInterval(timer)
                        resolve()
                     }
                  }.bind(this), 500)
               })
               await new Promise(resolve => {
                  const sortType = ['accumulate', 'today', 'yesterday']
                  let sum = 0
                  sortType.map((v, index) => {
                     listTop({'sortType': v}).then(res => {
                        const resLength = res.length
                        if (resLength !== 0) {
                           res.map(value => {
                              const price = bigDecimal.multiply(value[`${v}Incoming`], this.newValue)//ff*ffusdt
                              value['valuation'] = Math.floor(bigDecimal.multiply(price, this.rate)) + ''//计算估值
                              value[`${v}Incoming`] = Math.floor(value[`${v}Incoming`]) + ''
                              value['valuation'] = this.getParseFloat(value['valuation'])
                              value[`${v}Incoming`] = this.getParseFloat(value[`${v}Incoming`])
                           })
                        }
                        if (resLength < 10) {//空对象填充数组
                           for (let i = resLength; i < 10; i++) {
                              res.push({})
                           }
                        }
                        this.rankingContent[index].rankingData = res
                        sum += index
                        sum === 3 ? resolve() : ''//保证三次请求都执行完
                     })
                  })
               })
               await new Promise(resolve => {
                  this.rankingRefresh = setTimeout(function () {
                     this.getListTop()
                  }.bind(this), 10 * 60 * 1000)
                  resolve()
               })
            })()
         },
         getParseFloat(number) {
            return parseFloat(number).toLocaleString()
         }
      },
      mounted() {
         this.init()
      },
      destroyed() {
         clearTimeout(this.rankingRefresh)
      },
   }
</script>

<style lang="less" scoped>
   .main-color {
      color: #344857
   }

   .second-color {
      color: #949DA6;
   }

   .content-common {
      width: 1200px;
      margin: 0 auto;
   }

   .space-between {
      display: flex;
      justify-content: space-between;
   }

   .item-color {
      background: #F6FAFA;
   }

   .f14 {
      font-size: 14px;
   }

   .f12 {
      font-size: 12px;
   }

   @map-color: #12869A;

   .wrapper {
      .ranking-title {
         font-size: 30px;
         text-align: center;
         .main-color;
      }
      .headerList {
         position: relative;
         height: 316px;
         .item-color;
         .list {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            .space-between;
            .item {
               width: 380px;
               height: 276px;
               background: #fff;
               text-align: center;
               padding: 50px;
               img {
                  width: 80px;
               }
               p {
                  font-size: 16px;
                  margin-top: 21px;
                  .main-color;
               }
               div {
                  margin-top: 11px;
                  line-height: 26px;
                  .f14;
                  .second-color;
               }
            }
         }
      }
      .ranking-common {
         padding: 67px 0 65px;
      }
      .ranking {
         background-color: #fff;
         .ranking-content {
            position: relative;
            text-align: center;
            .ranking-content-title {
               position: relative;
               margin-bottom: 67px;
               .extra {
                  position: absolute;
                  top: 8px;
                  right: 0;
                  img {
                     width: 18px;
                     margin-right: 6px;
                     margin-top: -1px;
                  }
                  a {
                     color: #2199AE;
                     .f14;
                  }
               }
            }

            .ranking-content-data {
               .space-between;
               .ranking-data {
                  width: 380px;
                  h4 {
                     font-size: 16px;
                     margin-bottom: 18px;
                     .main-color;
                  }
                  .data-title {
                     .f12;
                     .second-color;
                  }
                  .ranking-item {
                     height: 42px;
                     line-height: 42px;
                     .main-color;
                     .f12;
                     .account {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                     }
                  }
               }
            }
            .ranking-desc {
               text-align: left;
               font-size: 12px;
               line-height: 27px;
               margin-top: 27px;
               .second-color;
               ul {
                  margin-left: 15px;
                  li {
                     list-style: disc;
                  }
               }
            }
         }
      }
      .ranking-rule {
         .item-color;
         .rule-common-list {
            margin-top: 47px;
            .rule-common-item {
               margin-top: 26px;
               h4 {
                  font-size: 16px;
                  margin-bottom: 11px;
               }
               .rule-list {
                  .rule-item {
                     line-height: 24px;
                     list-style: decimal;
                     margin-left: 15px;
                     .second-color;
                     .f14;
                  }
               }
            }
            .attention {
               .rule-list {
                  .rule-item {
                     list-style: none;
                     margin-left: 0;
                  }
               }
            }
         }
      }
      .ranking-community {
         text-align: center;
         h4 {
            font-size: 18px;
            margin-top: 15px;
            .second-color;
         }
         .community-item {
            margin-top: 70px;
            img {
               width: 80px;
            }
            p {
               font-size: 16px;
               margin-top: 14px;
            }
         }
      }
      .ranking-earth {
         .item-color;
         .content-common {
            position: relative;
         }
         .ranking-title {
            margin-bottom: 70px;
         }
         h3 {
            position: absolute;
            top: 345px;
            right: 230px;
            font-size: 14px;
            color: @map-color;
         }
         .animate {
            position: absolute;
            top: 300px;
            right: 230px;
            width: 40px;
            height: 40px;
            .circle, .circle1 {
               position: absolute;
               border-radius: 50%;
               border: solid 1px @map-color;
            }
            .circle {
               transform: scale(0);
               width: 40px;
               height: 40px;
               animation: spread 1s linear infinite;
               -webkit-animation: spread 1s linear infinite; /* Safari 与 Chrome */
            }
            .circle1 {
               top: 10px;
               left: 10px;
               transform: scale(0);
               width: 20px;
               height: 20px;
               animation: spread 1s linear 1s infinite;
               -webkit-animation: spread 1s linear 1s infinite; /* Safari 与 Chrome */
            }
            .point {
               position: absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%, -50%);
               width: 10px;
               height: 10px;
               border-radius: 50%;
               background-color: @map-color;
            }
         }
         @keyframes spread {
            0% {
               transform: scale(0.2);
               -webkit-transform: scale(0.2);
               opacity: 0.2;
            }
            25% {
               transform: scale(0.4);
               -webkit-transform: scale(0.4);
               opacity: 0.4;
            }
            50% {
               transform: scale(0.6);
               -webkit-transform: scale(0.6);
               opacity: 0.8;
            }
            75% {
               transform: scale(0.8);
               -webkit-transform: scale(0.8);
               opacity: 1;
            }
            100% {
               transform: scale(1);
               -webkit-transform: scale(1);
               opacity: 0;
            }
         }
         .Japan {
            position: absolute;
            top: 335px;
            right: 208px;
         }
         .Europe {
            position: absolute;
            top: 286px;
            right: 593px;
         }
         .USA {
            position: absolute;
            top: 325px;
            left: 320px;
         }
         .Caribbean {
            position: absolute;
            top: 386px;
            left: 324px;
         }
         .South-America {
            position: absolute;
            top: 485px;
            left: 400px;
         }
      }
   }

</style>