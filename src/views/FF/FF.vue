<template>
    <div id="usdd" class="root">
      <div class="banner">
          <!-- <img src="../../assets/images/usdd/banner.png" alt=""> -->
          <p>FF-Fifty Five</p>
      </div>
      <div class="usdd">
          <div class="left">
              <h2>{{$t('ffname')}}</h2>
              <div class="description">{{$t('fftikker')}}</div>
              <p>{{$t('ffnumber')}}</p>
              <p>{{$t('fftoken')}}</p>
                <span @click="gotoExchange" class="btn_default">{{$t('ffpurchase')}}</span>
          </div>
          <div class="right">
              <img src="../../assets/images/ff/FF@2x.png" alt="">
          </div>
      </div>
      <div class="hold_usdd">
          <div class="hold_usdd_inner">
              <h2>{{$t('fftodo')}}</h2>
              <p class="asset" style="text-align:center;">{{$t('ffusebroad')}}</p>
              <div class="content">
                  <div class="left">
                      <img src="../../assets/images/ff/global.png" alt="">
                      <h3>{{$t('ffmarket')}}</h3>
                      <p class="detail">{{$t('ffexchange')}}
                    </p>
                  </div>
                     <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (1).png" alt="">
                      <h3>{{$t('ffvip')}}</h3>
                      <p class="detail">{{$t('ffviptoken')}}
                    </p>
                  </div>  <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (2).png" alt="">
                      <h3>{{$t('ffbusiness')}}</h3>
                      <p class="detail">
                            {{$t('ffallbusiness')}}
                        </p>
                  </div>
              </div>
              <div class="content">
                  <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (3).png" alt="">
                      <h3>{{$t('fffees')}}</h3>
                      <p class="detail">{{$t('ffexchangefee')}}
                    </p>
                  </div>
                     <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (4).png" alt="">
                      <h3>{{$t('fffirstexchange')}}</h3>
                      <p class="detail">{{$t('ffserivcefee')}}
                    </p>
                  </div>  <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (5).png" alt="">
                      <h3>{{$t('ffinstitute')}}</h3>
                      <p class="detail">
                            {{$t('ffexone')}}
                        </p>
                  </div>
              </div>
              <div class="content">
                  <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (6).png" alt="">
                      <h3>{{$t('ffservice')}}</h3>
                      <p class="detail">{{$t('ffpay')}}
                    </p>
                  </div>
                     <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (7).png" alt="">
                      <h3>{{$t('fftokenpublic')}}</h3>
                      <p class="detail">{{$t('ffglobaltoken')}}
                    </p>
                  </div>  <div class="left">
                      <img src="../../assets/images/ff/icon1@2x (8).png" alt="">
                      <h3>{{$t('ffmoreplace')}}</h3>
                      <p class="detail">
                            {{$t('ffgrowup')}}
                        </p>
                  </div>
              </div>
          </div>
      </div>
         <div class="hold_usdd  parter">
          <div class="hold_usdd_inner">
              <h2>{{$t('ffhowtoget')}}</h2>
              <p class="sub-title">{{$t('ffgetoneFF')}}</p>
              <div class="content">
                  <div class="left">
                      <img src="../../assets/images/ff/icon3@2x.png" alt="">
                      <span class="line"></span>
                      <p class="method">{{$t('ffgettwo')}}</p>
                      <p class="method_des">{{$t('ffgetthree')}}</p>
                  </div>
                   <div class="left">
                      <img src="../../assets/images/ff/iocn2@2x.png" alt="">
                      <span class="line"></span>
                      <p class="method">{{$t('ffgetfour')}}</p>
                      <p class="method_des">{{$t('ffgetfive')}}</p>
                  </div>
                   <div class="left">
                      <img src="../../assets/images/ff/icon4@2x.png" alt="">
                      <span class="line"></span>
                      <p class="method">{{$t('ffgetsix')}}</p>
                      <p class="method_des">{{$t('ffgetseven')}}</p>

                  </div>

              </div>
          </div>
      </div>
    

    </div>
</template>

<script>
import {alreadyDividend} from '../../../api/urls.js';
import {getApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import { duration } from 'moment';
import Cookies from 'js-cookie';
    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
            return {
                cityList: [
                    {
                        value: 'USD',
                        label: 'USD'
                    },
                 
                ],
                cityListTwo:[
                    {
                        value: 'USDD',
                        label: 'USDD'
                    },
                ],
                value2:100,
                model3:'USD',
                model4:'USDD',
                currency_token:'',
                account_money:'',
                totalDividend:'',


            }



        },
        methods:{
        gotoExchange(){
            this.$router.push({
               path:'/exchange',
               query:{
                  symbol:'FFUSDT',
                  site:'B'
               }
            })
         },


        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            
        },
        watch:{
            languageChange(val,oldVal){
            },
        },
        mounted(){

        },
      
        
        
    }
</script>
<style scoped lang="less">
    @import './FF.less';
</style>

