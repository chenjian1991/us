<template class='box'>
    <div id="usdd" class="root">
            <div class="banner">
                <h1>{{$t('stockbanner')}}</h1>
                <p>{{$t('stockbannerdes')}}</p>
            </div>
        <section class="section1">
            <div class="inner">
                <h1>{{$t('stockpublish')}}</h1>
                <p class="line"></p>
                <p>{{$t('stockpublishdes')}}</p>
                <div class="img">
                    <img :src="stockurl" alt="">
                </div>
            </div>
        </section>
    <section class="section2">
      <div class="hold_usdd">
          <div class="hold_usdd_inner">
              <h1>{{$t('stocksystem')}}</h1>
              <p class="line"></p>
              <div class="content">
                  <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/2.png" alt="">
                      <h3>{{$t('stockplateform')}}</h3>
                      <p class="detail">{{$t('stockplateformdes')}}
                    </p>
                  </div>
                     <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/3.png" alt="">
                      <h3>{{$t('stockxintuo')}}</h3>
                      <p class="detail">{{$t('stockxintuodes')}}
                    </p>
                  </div>  
                  <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/4.png" alt="">
                      <h3>{{$t('stockmonthcheck')}}</h3>
                      <p class="detail">
                            {{$t('stockmonthcheckdes')}}
                        </p>
                  </div>
                  <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/5.png" alt="">
                      <h3>{{$t('stockintlecheck')}}</h3>
                      <p class="detail">{{$t('stockintlecheckdes')}}
                    </p>
                  </div>
                     <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/6.png" alt="">
                      <h3>{{$t('stockcoperatebusiness')}}</h3>
                      <p class="detail">{{$t('stockcoperatebusinessdes')}}
                    </p>
                  </div>  <div class="left">
                      <img src="../../../assets/images/assetsInfo/s/7.png" alt="">
                      <h3>{{$t('stocklegalcheck')}}</h3>
                      <p class="detail">
                            {{$t('stocklegalcheckdes')}}
                        </p>
                  </div>
              </div>
              
          </div>
      </div>
    </section>
    <section class="section3">
        <div class="inner">
                <h1>{{$t('stockpublishsyestem')}}</h1>
                <p class="line"></p>
                <div class="img">
                    <img src="../../../assets/images/assetsInfo/s/8.png" alt="">
                </div>
                <div class="left-right">
                    <img :src="assestStock" alt="">
                    <ul>
                        <li>
                            <em>1.</em>
                            <span>{{$t('stockpublishsyestemone')}}</span>
                        </li>
                         <li>
                            <em>2.</em>
                            <span>{{$t('stockpublishsyestemtwo')}}</span>
                        </li>
                         <li>
                            <em>3.</em>
                            <span>{{$t('stockpublishsyestemthree')}}</span>
                        </li>
                         <li>
                            <em>4.</em>
                            <span>{{$t('stockpublishsyestemfour')}}</span>
                        </li>
                    </ul>
                </div>
                    <div class="left-right">
                    <img :src="tokenurl" alt="">
                    <ul>
                        <li>
                            <em>1.</em>
                            <span>{{$t('stockRedemptionone')}}</span>
                        </li>
                         <li>
                            <em>2.</em>
                            <span>{{$t('stockRedemptiontwo')}}</span>
                        </li>
                         <li>
                            <em>3.</em>
                            <span>{{$t('stockRedemptionthree')}}</span>
                        </li>
                         <li>
                            <em>4.</em>
                            <span>{{$t('stockRedemptionfour')}}</span>
                        </li>
                    </ul>
                </div>
                

        </div>
    </section>
    <section class="section4">
        <div class="inner">
             <h1>{{$t('stockalreadypublish')}}</h1>
            <p class="line"></p>
            <div>
                <ul>
                    <li><img src="../../../assets/images/assetsInfo/s/logo1.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo2.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo3.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo4.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo5.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo6.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo7.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo8.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo9.png" alt=""></li>
                    <li><img src="../../../assets/images/assetsInfo/s/logo10-en.png" alt=""></li>
                </ul>
            </div>
        </div>
    </section>
    <section class="section5">
        <div class="inner">
             <h1>{{$t('stockparenter')}}</h1>
            <p class="line"></p>
            <ul>
                <li><img src="../../../assets/images/assetsInfo/s/mercurity.png" alt=""></li>
                <li><img src="../../../assets/images/assetsInfo/s/daotrust.png" alt=""></li>
                <li><img src="../../../assets/images/assetsInfo/s/12.png" alt=""></li>
            </ul>





        </div>
    </section>
    

    </div>
</template>

<script>
import {alreadyDividend} from '../../../../api/urls.js';
import {getApi,postHeaderTokenBodyApi} from '../../../../api/axios.js';
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
                stockurl:'',
                assestStock:"",
                tokenurl:""
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
                if(val=='zh-CN'||val=='zh'){
                    this.stockurl = require('../../../assets/images/assetsInfo/s/1.png');
                    this.assestStock = require('../../../assets/images/assetsInfo/s/10.png')
                    this.tokenurl = require('../../../assets/images/assetsInfo/s/11.png')
                }else{
                    this.stockurl = require('../../../assets/images/assetsInfo/s/1-en.png')
                    this.assestStock = require('../../../assets/images/assetsInfo/s/10-en.png')
                    this.tokenurl = require('../../../assets/images/assetsInfo/s/11-en.png')


                }
            },
        },
        mounted(){
            let countryLanguage = localStorage.getItem('countryLanguage');
            if(countryLanguage=='zh-CN'||countryLanguage=='zh'){
                this.stockurl = require('../../../assets/images/assetsInfo/s/1.png')
                this.assestStock = require('../../../assets/images/assetsInfo/s/10.png')
                this.tokenurl = require('../../../assets/images/assetsInfo/s/11.png')


            }else{
                this.stockurl = require('../../../assets/images/assetsInfo/s/1-en.png')
                this.assestStock = require('../../../assets/images/assetsInfo/s/10-en.png')
                this.tokenurl = require('../../../assets/images/assetsInfo/s/11-en.png')


            }

        },
      
        
        
    }
</script>
<style scoped lang="less">
    @import './stock.less';
</style>

