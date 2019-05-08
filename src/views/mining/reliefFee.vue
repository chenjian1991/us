<template>
   <div class="wrapper">
      <div class="banner-box">
         <img :src="imgSrc" class="imgBanner">
         <div class="banner-text">
            <h2>{{$t('锁仓FF减免手续费')}}</h2>
            <h3>{{$t('锁仓FF减免买入手续费')}}</h3>
         </div>
      </div>
      <div class="below">
         <div class="below-content">
            <!--锁仓减免对应表-->
            <div class="below-up below-common">
               <h3 class="title">{{$t('锁仓减免对应表')}}</h3>
               <Row :gutter="14" class="row" type="flex" justify="space-between">
                  <Col span="12">
                     <Table :columns="columns1" :data="data1" border :row-class-name="rowClassName"
                            class="table"></Table>
                  </Col>
                  <Col span="12">
                     <div class="right">
                        <div class="article">
                           <p>什么是Maker（挂单）？</p>
                           <article>
                              挂单指的是以你指定的价格（挂买单时低于市价或高于市场价格）下单时不会立即与深度列表里的其他订单成交，而是进入深度列表等待对方主动来跟你的订单成交，这样的行为叫挂单。
                           </article>
                        </div>
                        <div class="article">
                           <p>什么是Taker（吃单）？</p>
                           <article>
                              吃单指的是以你指定的价格（与市场深度列表中的订单有交叉）下单时立即与深度列表里的其他订单成交，你主动与深度列表中的订单成交，这样的行为叫吃单。
                           </article>
                        </div>
                     </div>
                  </Col>
               </Row>
               <Row :gutter="8" class="row row-below" type="flex" justify="space-between">
                  <Col span="12" id="reliefFeeTab">
                     <Tabs value="name1" class="tabs">
                        <TabPane label="锁仓减免手续费" name="name1">
                           <div class="tabPane">
                              <Row :gutter="20" type="flex" justify="space-between">
                                 <Col span="6"></Col>
                                 <Col span="18" align="left">
                                    {{$t('可用余额')}} <span>{{balance}}</span> FF
                                 </Col>
                              </Row>
                              <Row :gutter="20" type="flex" justify="space-between">
                                 <Col span="6"></Col>
                                 <Col span="18" align="right">
                                    <a href="" class="a-link">如何获得FF？</a>
                                 </Col>
                              </Row>
                              <Row :gutter="20" class="tabPane-row">
                                 <Col span="6" align="right" class="label">{{$t('锁仓量')}}</Col>
                                 <Col span="18" align="left" class="input-box">
                                    <Input v-model="value1" class="input" size="large" :placeholder="placeholder"/>
                                    <div class="input-right">
                                       <span>FF</span><a class="maximum">最大</a>
                                    </div>
                                 </Col>
                              </Row>
                              <Row :gutter="20" type="flex" justify="space-between">
                                 <Col span="6"></Col>
                                 <Col span="18" align="left">
                                    <Button type="primary" class="lock-btn" v-if="!login">
                                       <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                                       {{$t('或')}}
                                       <router-link to='/register'>{{$t('MiningSignUp')}}</router-link>
                                       {{$t('进行锁仓')}}
                                    </Button>
                                    <Button type="primary" class="lock-btn" v-if="login">
                                       <a>{{$t('锁仓')}}</a>
                                    </Button>
                                 </Col>
                              </Row>
                           </div>
                           <div class="email">获得100,000,000锁仓数对应折扣，请发送邮件到：<a href="">contact@55.com</a></div>
                        </TabPane>
                        <TabPane label="解锁取消减免" name="name2">
                           <div class="tabPane">
                              <Row :gutter="20" type="flex" justify="space-between" style="margin-bottom: 20px">
                                 <Col span="6"></Col>
                                 <Col span="18" align="left">
                                    {{$t('可解锁')}} <span>{{balance}}</span> FF
                                 </Col>
                              </Row>
                              <Row :gutter="20" class="tabPane-row">
                                 <Col span="6" align="right" class="label">{{$t('解锁量')}}</Col>
                                 <Col span="18" align="left" class="input-box">
                                    <Input v-model="value1" class="input" size="large" :placeholder="placeholder"/>
                                    <div class="input-right">
                                       <span>FF</span><a class="maximum">最大</a>
                                    </div>
                                 </Col>
                              </Row>
                              <Row :gutter="20" type="flex" justify="space-between" class="explain">
                                 <Col span="8">剩余锁仓量 <span>{{balance}}</span> FF</Col>
                                 <Col span="16" align="right">
                                    部分解锁时：剩余锁仓量，不能小于1000FF
                                 </Col>
                              </Row>
                              <Row :gutter="20" type="flex" justify="space-between">
                                 <Col span="6"></Col>
                                 <Col span="18" align="left">
                                    <Button type="primary" class="lock-btn" v-if="!login">
                                       <router-link to='/login'>{{$t('MiningLogIn')}}</router-link>
                                       {{$t('或')}}
                                       <router-link to='/register'>{{$t('MiningSignUp')}}</router-link>
                                       {{$t('进行锁仓')}}
                                    </Button>
                                    <Button type="primary" class="lock-btn" v-if="login">
                                       <a>{{$t('锁仓')}}</a>
                                    </Button>
                                 </Col>
                              </Row>
                           </div>
                        </TabPane>
                     </Tabs>
                  </Col>
                  <Col span="12">
                     <div class="box-title">我的锁仓减免</div>
                     <Row type="flex" justify="space-between" class="row-below-right">
                        <Col span="12">
                           <Row class="lock-row" type="flex" align="middle">
                              <Col span="12" align="left" class="left-col">{{$t('已累计锁仓')}}</Col>
                              <Col span="12" align="left" class="right-col">
                                 <span>{{12}} </span> FF
                              </Col>
                           </Row>
                           <Row class="lock-row" type="flex" align="middle">
                              <Col span="12" align="left" class="left-col">{{$t('手续费折扣')}}</Col>
                              <Col span="12" align="left" class="right-col">
                                 <p><span>60% </span>Maker</p>
                                 <p><span>60% </span>Taker</p>
                              </Col>
                           </Row>
                        </Col>
                        <Col span="12" align="left">
                           <img :src="locked" style="margin-top: 76px;margin-left: 70px">
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </div>

            <!--活动规则-->
            <div class="below-down below-common">
               <h3 class="title">{{$t('MiningRuleDescription')}}</h3>
               <div class="below-box activityRules">
                  <ul class="activityRulesList">
                     <li v-for="(item, index) in activityRulesItem" class="activityRulesItem">{{item.message}}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import page from '@/components/page'
   import {
      getPlatform
   } from '_api/mining.js'

   export default {
      name: "reliefFee",
      components: {
         page
      },
      data() {
         return {
            login: true,
            totalPage: 10,
            imgSrc: require('../../assets/images/mining/fee.png'),
            balance: '--',
            placeholder: this.$t('请输入'),
            locked: require('../../assets/images/mining/locked _warehouse.png'),
            value1: '',

            columns1: [//记录table
               {
                  title: this.$t('锁仓数（FF）'),
                  key: 'lock',
                  align: 'center',
                  className: 'th-reliefFee'
               },
               {
                  title: this.$t('手续费折扣'),
                  align: 'center',
                  className: 'th-reliefFee',
                  children: [
                     {
                        title: 'Maker',
                        key: 'Maker',
                        align: 'center',
                        width: 195,
                        className: 'th-reliefFee'

                     },
                     {
                        title: 'Taker',
                        key: 'Taker',
                        align: 'center',
                        width: 195,
                        className: 'th-reliefFee'

                     }
                  ]
               },
            ],
            data1: [
               {'lock': '1000', 'Maker': '60%', 'Taker': '80%'},
               {'lock': '10,000', 'Maker': '50%', 'Taker': '70%'},
               {'lock': '100,000', 'Maker': '40%', 'Taker': '60%'},
               {'lock': '1,000,000', 'Maker': '20%', 'Taker': '40%'},
               {'lock': '10,000,000', 'Maker': '0%', 'Taker': '20%'},
               {'lock': '100,000,000', 'Maker': '-10%', 'Taker': '10%'}
            ],
            activityRulesItem: [
               {message: '1.买入挖矿短期返还池部分，次日起，每日返还该笔手续费的20%，持续5天，以短期挖矿池中的FF发放，累计发放100%；'},
               {message: '2.买入挖矿长期返还池部分，其余部分，以实际收到的手续费收入，算每日返还0.3%，以长期挖矿池中的币种发放，直到发放300%；'},
               {message: '3.卖出交易不能挖矿；'}
            ]
         }
      },
      methods: {
         init(currentPage = 1) {
         },
         rowClassName() {//table行样式
            return 'td-reliefFee';
         }
      },
      mounted() {
         this.init()

      },
   }
</script>
<style lang="less">
   #reliefFeeTab .ivu-tabs-ink-bar {
      width: 240px !important;
   }

   #reliefFeeTab .ivu-tabs-tab {
      width: 240px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      margin: 0 !important;
   }

   #reliefFeeTab .ivu-tabs-tab-active {
      color: #0092FF !important;
   }
</style>

<style lang="less" scoped>
   .wrapper {
      position: relative;
      width: 100%;
      background-color: #F2F3F8;
      font-family: PingFangSC-Regular;
      .imgBanner {
         display: block;
         width: 100%;
         height: 367px;
      }
      .banner-text {
         position: absolute;
         top: 116px;
         left: 50%;
         transform: translateX(-50%);
         color: #fff;
         text-align: center;
         h2 {
            font-size: 38px;
            font-family: PingFangSC-Medium;
         }
         h3 {
            font-size: 32px;
            margin-top: 4px;
            color: #83A0F6;
         }
      }
      .below {
         width: 100%;
         padding: 1px auto 47px;
         background-color: #FFF;
         .below-content {
            width: 1200px;
            margin: 0 auto 21px;
            padding-bottom: 26px;
            .below-common {
               clear: both; //Row 浮动 要清除
               .title {
                  height: 55px;
                  line-height: 55px;
                  font-size: 20px;
                  color: #333;
                  border-bottom: solid 1px #D9D9D9;
                  margin-bottom: 29px;
                  &:before {
                     content: '';
                     border-left: solid 1px #0092FF;
                     margin-right: 13px;
                  }
               }
               .below-box {
                  border: 1px solid #D9D9D9;
                  padding: 0 35px 0 15px;
                  margin-bottom: 30px;
               }
            }
            .below-up {
               .row {
                  margin-bottom: 48px;
                  .right {
                     height: 100%;
                     background-color: #F2F3F8;
                     padding: 0 18px;
                     .article {
                        height: 50%;
                        font-size: 15px;
                        padding-top: 32px;
                        p {
                           color: #333;
                           margin-bottom: 24px;
                        }
                        article {
                           color: #666;
                        }
                     }
                  }
               }
               .row-below {
                  border: 1px solid #D9D9D9;
                  padding: 20px 32px 20px 43px !important;
                  .tabs {
                     width: 480px;
                     font-size: 18px;
                     color: #666;
                     .tabPane {
                        padding-right: 27px;
                     }
                     .tabPane-row {
                        margin-top: 5px;
                     }
                     span {
                        color: #333333;
                     }
                     .label {
                        height: 44px;
                        line-height: 44px;
                        font-size: 16px;
                        color: #333333;
                     }
                     .input-box {
                        position: relative;
                        .input-right {
                           position: absolute;
                           right: 20px;
                           top: 10px;
                           font-size: 14px;
                           .maximum {
                              margin-left: 7px;
                           }
                        }
                     }
                     .a-link {
                        font-size: 14px;
                        color: #0092FF;
                     }
                     .lock-btn {
                        width: 100%;
                        height: 44px;
                        font-size: 15px;
                        color: #B2DEFF;
                        margin-top: 30px;
                        a {
                           color: #fff;
                        }
                     }
                     .email {
                        font-size: 15px;
                        color: #666;
                        margin-top: 47px;
                     }
                     .explain {
                        font-size: 15px;
                        margin-top: 15px;
                     }
                  }
                  .box-title {
                     font-size: 16px;
                  }
                  .row-below-right {
                     background-color: #F2F3F8;
                     width: 564px;
                     height: 280px;
                     margin-top: 11px;
                     padding: 14px 2px 14px 35px;
                     .lock-row {
                        height: 126px;
                        &:first-child {
                           border-bottom: solid 1px #D9D9D9;
                        }
                        .left-col {
                           font-size: 14px;
                        }
                        .right-col {
                           font-size: 16px;
                           span {
                              font-size: 24px;
                              color: #0092FF;
                           }
                           p {
                              margin-top: 5px;
                              span {
                                 font-size: 28px;

                              }
                           }
                        }
                     }
                  }
               }
            }
            .below-down {
               .activityRules {
                  padding-top: 13px;
                  padding-bottom: 13px;
                  .activityRulesItem {
                     font-size: 16px;
                     line-height: 36px;
                     color: #666;
                  }
               }
            }
         }
      }
   }


</style>