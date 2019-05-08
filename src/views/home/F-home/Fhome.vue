<template>
    <div>
       <div style="width:100%;" class="wrapper">
            <div class="container-self home_container">
                  <!-- f-first-page -->
            <div class="">
            <div class="pannel-landing-page text-center f-first-page"  >
                <div class="container-forex">
                  <div class="row ico-countdown-group">
                    <div class="first-row text-left content-1">
                        <h1><br />{{$t("fExchangeTokenExchange")}}</h1>
                        <p class="description">{{$t("fExchangeConvertYourFiat")}}</p>
                        <div v-if="logToken">
                            <a class="btn btn-default " href="javascript:;" target="_blank" title="">{{$t("fExchangeManageAccount")}}</a></BR>
                        </div>
                        <div v-else>
                            <router-link class="btn btn-default" to='/login'>{{$t("fExchangeOpenAccount")}}</router-link></BR>
                        </div>
						<a class="btn btn-default btn-money" href="https://daocoin.money" target="_blank" title="">{{$t("fExchangeConvertYourFlat")}}</a></BR>
                    </div>

                    <div class="background-black content-2">
                            <div class="panel panel-violet ">
                            <div class="panel-body" style="background:#1D1D1D;">
                                <div class="rate-calculator ">
                                    <input type="text" name="coins-exchange" placeholder="" v-model="currency_amt" v-on:change="changeRate">
                                    <select class="coins-exchange rate-select" name="state" v-model="currency_s" v-on:change="changeRate">
                                        <option value="USD" elected>USDD</option>
                                        <option value="JPY">JPYD</option>
                                        <option value="EUR">EURD</option>
                                        <option value="GBP">GBPD</option>
                                    </select>
                                </div>
                                <div class="equal"> = </div>
                                <div class="rate-calculator">
                                    <input type="text" name="money-exchange" placeholder="" v-model="currency_rate" v-on:change="changeRate">
                                    <select class="money-exchange rate-select" name="state" v-model="currency_e" v-on:change="changeRate">
                                        <option value="USD" >USDD</option>
                                        <option value="JPY" selected>JPYD</option>
                                        <option value="EUR">EURD</option>
                                        <option value="GBP">GBPD</option>
                                    </select>
                                </div>
                                <a class="btn btn-default toexchange"   v-on:click="toExchange">{{$t("fExchangeExchange")}}</a></BR>
                            </div>       
                        </div>				
                    </div>
                  </div>
                </div>
              </div>
            </div>


<!-- 新修改内容开始 -->
            <!--  part two -->
            <!-- <div style="height:50px"></div> -->
            <section class="fmarket">
                    <market :sites="['F']" />
            </section>
            <!-- part three -->
             <div class="f-advantages">
                 <div class="advantage-container">
                         <div class="f-title-white">{{$t("fExchangeTraditionalForex")}} </div>
                        <div class="advantage-content clearfix">
                        <div class="col-md-4 col-lg-4">
                            <div>
                                <img src="../../../assets/images/home/Fhome/f-safe.png" alt="">
                                <div class="ad-title">{{$t("fExchangeSafer")}}</div>
                            </div>
                            <div class="ad-contain-desc" >{{$t("fExchangeSaferDesc")}}</div>
                        </div>
                        <div class="col-md-4 col-lg-4 ">
                            <div>
                                <img src="../../../assets/images/home/Fhome/f-lowPrice.jpg" alt="">
                                <div class="ad-title">{{$t("fExchangeCheaper")}}</div>
                            </div>
                            <div class="ad-contain-desc" >{{$t("fExchangeCheaperDesc")}}</div>
                        </div>
                        <div class="col-md-4 col-lg-4">
                            <div>
                                <img src="../../../assets/images/home/Fhome/f-white.png" alt="">
                                <div class="ad-title">{{$t("fExchangeTransparency")}}</div>
                            </div>
                            <div class="ad-contain-desc">{{$t("fExchangeTransparencyDesc")}}</div>
                        </div>
                        </div>
                 </div>
               
            </div>
             
            <!-- part four -->
            <div class="f-Convert">
                <div class="f-convert-inner">
                          <div class="f-title-gold">{{$t("fExchangeConvertInstantly")}} </div>
                            <p class="f-sub-title">{{$t("fExchangeCollaboration")}}</p>
                            <div class="f-transparency clearfix">
                                <div class="col-md-6 col-lg-6 f-transparency-left"></div>
                                <div class="col-md-6 col-lg-6 f-transparency-right">
                                <div class="convert-part">
                                    <div class="convert-title">{{$t("ExchangeTransparencyConvert")}} </div>
                                    <div class="part-contain clearfix">
                                    <div class="convert-order">1.</div>
                                    <div class="contain-right clearfix">
                                        <div class="convert-sub">{{$t("fExchangeTransparencyOne")}}</div>
                                        <div>{{$t("fExchangeTransparencyOnedesc")}}</div>
                                    </div>
                                    </div>
                                    <div class="part-contain clearfix">
                                    <div class="convert-order">2.</div>
                                    <div class="contain-right clearfix">
                                        <div class="convert-sub">{{$t("fExchangeTransparencyTwo")}}</div>
                                        <div>{{$t("fExchangeTransparencyTwodesc")}}</div>
                                    </div>
                                    </div>
                                    <div class="part-contain clearfix">
                                    <div class="convert-order">3.</div>
                                    <div class="contain-right clearfix">
                                        <div class="convert-sub">{{$t("fExchangeTransparencyThird")}}</div>
                                        <div>{{$t("fExchangeTransparencyThirddesc")}}</div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="f-efficiency clearfix">
                                <div class="col-md-6 col-lg-6">
                                <div class="convert-part">
                                    <div class="convert-title">{{$t("fExchangeEfficiency")}} </div>
                                    <div class="part-contain clearfix">
                                    <div class="convert-order">1.</div>
                                    <div class="contain-right clearfix">
                                        <div class="convert-sub">{{$t("fExchangeEfficiencyOne")}}</div>
                                        <div>{{$t("fExchangeEfficiencyOnedesc")}}</div>
                                    </div>
                                    </div>
                                    <div class="part-contain clearfix">
                                    <div class="convert-order">2.</div>
                                    <div class="contain-right clearfix">
                                        <div class="convert-sub">{{$t("fExchangeEfficiencyTwo")}}</div>
                                        <div>{{$t("fExchangeEfficiencyTwodesc")}}</div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-md-6 col-lg-6 f-efficiency-right"></div>
                            </div>
                </div>
            
            </div>
            <!-- 新修改内容截止 -->
            </div>
        </div>
     
    </div>
</template>

<script>
    import {getSymbolList_realtime,BannerList,Mineing,getExchangeRate} from '../../../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
    import{swiper,swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    import bigDecimal from 'js-big-decimal';
     import {BigNumber} from 'bignumber.js';
    import config from '@/config'
    import {getDecimalExNumber } from '../../../lib/utils.js';
    import  market from "../../../components/market.vue";
    export default {
        data(){
            return{
                isLogin:'',
                value1:0,
                current:0,
                tabShow:false,
                checked:false,
                noPadding: '--',
                boardIndex:'USDD',
                site:"F",
                language:localStorage.getItem('countryLanguage'),
                modal2:localStorage.getItem('moduleAlert'),
                tableData:[],
                tabels:[
                    {text:'1'},
                    {text:'2'},
                    {text:'3'},
                    {text:'4'},
                ],
                downloadFlag:true,
                rates: {},
                currency_amt: 100,
                currency_rate: 0,
                currency_s: 'USD',
                currency_e: 'JPY',
                modal3: false,
                logToken:localStorage.getItem('logToken'),// new add

            }
        },
        components:{
            market
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.swiper;
            },
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            loginStatus(){
                return this.$store.state.app.isLogin;
            }
         
        },
        methods:{
            getLastExchangeRate() {
                getExchangeRate().then(res =>{
                    this.rates = res.rates;
                    this.changeRate()
                })
            },
            
            changeRate() {
                // console.log('this.currency_amt: ' + this.currency_amt)
                // console.log('this.rates[this.currency_e]: ' + this.rates[this.currency_e])
                // console.log('this.rates[this.currency_s]: ' + this.rates[this.currency_s])
                this.currency_rate = (this.currency_amt * (this.rates[this.currency_e] / this.rates[this.currency_s])).toFixed(4);
            },
            toExchange() {
                // this.$swal(this.$t('fExchangeSwal'));
                this.$router.push('./exchange')
            }
            
        },
   
        watch:{
          
            languageChange(val,oldVal){//监听全局语言的状态
                //SEO 中英文切换支持
                this.HomeTitle = this.$t('HomeTitle')
            },
            loginStatus(val,oldVal){
                 let isLogin =  this.$store.state.app.isLogin;
                    if(isLogin){
                        this.isLogin = true;
                    }else{
                        this.isLogin = false;
                    }
            },
        },
        mounted(){
            this.getLastExchangeRate()
            this.$store.commit('changeHeaderColor', '');
            this.$store.commit('changeFooterColor', '#111111');
            //setTimeout(this.getLastExchangeRate(), 300000)
        },
        created(){
        
        },
       
    }
</script>
<style scoped lang='less'>
    @import './Fhome.less';
</style>


