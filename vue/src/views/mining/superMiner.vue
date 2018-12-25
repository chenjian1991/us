<template>
   <div class="wrapper">
      <div class="banner-box">
         <img :src="imgSrc" class="imgBanner">
         <div class="banner-text">
            <h2>{{$t('MinerSuperMiner')}}</h2>
            <h3>{{$t('MinerSuperMinerTip')}}</h3>
         </div>
      </div>
      <div class="below">
         <div class="below-up">
            <div class="below-content">
               <div class="top below-common">
                  <div class="common-title">
                     <h1>{{$t('MinerTitleExtra')}}</h1>
                     <img :src="imgLine">
                  </div>
                  <Row type="flex" justify="space-between">
                     <Col span="10">
                        <img src="../../assets/images/mining/income.png">
                     </Col>
                     <Col span="13" align="right" class="right-box">
                        <div class="desc">
                           {{$t('MinerTitleExtraTip')}}
                        </div>
                     </Col>
                  </Row>
               </div>
            </div>
         </div>
         <div class="below-middle">
            <div class="below-content">
               <div class="middle below-common">
                  <div class="common-title">
                     <h1>{{$t('MinerTitleTechnical')}}</h1>
                     <img :src="imgLine">
                  </div>
                  <Row type="flex" justify="space-between">
                     <Col span="13" align="left" class="right-box">
                        <div class="desc">
                           <p>{{$t('MinerTitleTechnicalTip1')}}</p>
                           <p>{{$t('MinerTitleTechnicalTip2')}}</p>
                           <p>{{$t('MinerMinerTitleTechnicalTip3')}}</p>
                        </div>
                     </Col>
                     <Col span="10" align="right">
                        <img src="../../assets/images/mining/skills.png">
                     </Col>
                  </Row>
               </div>
            </div>
         </div>
         <div class="below-bottom">
            <div class="below-content">
               <div class="top below-common">
                  <div class="common-title">
                     <h1>{{$t('MinerSuperMinerQualifications')}}</h1>
                     <img :src="imgLine">
                  </div>
                  <div class="desc">
                     <p>{{$t('MinerSuperMinerQualificationsTip')}}</p>
                     <p>{{$t('MinerBecomeSuperMiner')}}<a>contact@55.com</a></p>
                  </div>
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
      name: "superMiner",
      components: {
         page
      },
      data() {
         return {
            imgSrc: require('../../assets/images/mining/cjkg_bg.png'),
            imgLine: require('../../assets/images/mining/line.png'),
         }
      },
      methods: {
         init(currentPage = 1) {},
         rowClassName() {//table行样式
            return 'td-reliefFee';
         }
      },
      mounted() {
         this.init()

      },
   }
</script>

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
         top: 135px;
         left: 50%;
         transform: translateX(-50%);
         color: #fff;
         text-align: center;
         h2 {
            font-size: 44px;
            font-family: PingFangSC-Medium;
         }
         h3 {
            font-size: 32px;
            margin-top: 10px;
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
         }
         .below-up, .below-middle, .below-bottom {
            .below-common {
               padding-top: 40px;
               .common-title {
                  margin-bottom: 64px;
                  text-align: center;

                  h1 {
                     font-size: 34px;
                  }
               }
               .right-box {
                  display: flex;
                  align-items: center;
                  padding: 0;
                  .desc {
                     width: 636px;
                     font-size: 18px;
                     line-height: 36px;
                  }
               }

            }
         }
         .below-up {
            background-color: #F2F3F8;
            height: 420px;
         }
         .below-middle {
            background-color: #fff;
            height: 433px;
         }
         .below-bottom {
            background-color: #F2F3F8;
            height: 326px;
            .desc {
               text-align: center;
               font-size: 16px;
               p {
                  margin-top: 14px;
               }
            }
         }
      }
   }


</style>