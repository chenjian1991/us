<template>
    <div>
        <div class="root-contain">
            <div class="wrapper">
                <div class="container-self home_container">
                    <div class="main_plate clearfix">
                        <div class="swiper">
                            <div class="homebox">
                                <section class="bannerSection">
                                    <Carousel v-model="value1"  :autoplay-speed='4000' :autoplay="isAutoplay" loop :radius-dot="false">
                                        <CarouselItem v-for="item in bannerArr">
                                            <div class="demo-carousel">
                                                <img :src="item.imageUrl" alt="" >
                                                <span class="bannerText" >{{item.text}}</span>
                                            </div>
                                        </CarouselItem>
                                    </Carousel>
                                </section>
                            </div>
                        </div>

                        <!-- fashionableToken-section -->
                        <div class="fashionableToken-section">
                            <div class="public-title">
                                <h1>{{$t('CHomefashionableTokenTit')}}</h1>
                            </div>
                            <div class="fashionableToken-content">
                                <ul>
                                    <li>
                                        <div class="img-box">
                                            <img src="../../../assets/images/home/Chome/fashionable-img1@2x.png" alt="">
                                        </div>
                                        <div class="label-box">
                                            <p>Louis Vuitton/Superme Box Logo Hooded Sweatshirt</p>
                                            <p>TICKER: SUPLVT</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <img src="../../../assets/images/home/Chome/fashionable-img2@2x.png" alt="">
                                        </div>
                                        <div class="label-box">
                                            <p>AIR JORDAN 11 RETRO "CONCORD" 2018 TICKER: SUPLVT</p>
                                            <p>TICKER: SUPLVT</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <img src="../../../assets/images/home/Chome/fashionable-img3@2x.png" alt="">
                                        </div>
                                        <div class="label-box">
                                            <p>AIR JORDAN 1 RETRO HIGN "ROOKIE OF THE YEAR"</p>
                                            <p>TICKER: SUPLVT</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <img src="../../../assets/images/home/Chome/fashionable-img4@2x.png" alt="">
                                        </div>
                                        <div class="label-box">
                                            <p>AIR JORDAN 1 TO 11 PACKAGE</p>
                                            <p>TICKER: SUPLVT</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <!-- market-section -->
                        <!-- <market :sites="['C']" /> -->
                    </div>

                    <!-- issuer-section -->
                    <div class="issuer-section">
                        <div class="public-title">
                            <h1>{{$t('CHomeIssuerTit')}}</h1>
                        </div>
                        <div class="issuer-content">
                            <ul>
                                <li>
                                    <div class="img-box">
                                        <img src="../../../assets/images/home/Chome/issuer_1.png" alt="">
                                    </div>
                                    <div class="label-box"><p>DRx AND MICKEY</p></div>
                                </li>
                                <li>
                                    <div class="img-box">
                                        <img src="../../../assets/images/home/Chome/issuer_2.png" alt="">
                                    </div>
                                    <div class="label-box"><p>DRx AND MICKEY</p></div>
                                </li>
                                <li>
                                    <div class="img-box">
                                        <img src="../../../assets/images/home/Chome/issuer_3.png" alt="">
                                    </div>
                                    <div class="label-box"><p>DRx AND MICKEY</p></div>
                                </li>
                                <li>
                                    <div class="img-box">
                                        <img src="../../../assets/images/home/Chome/issuer_4.png" alt="">
                                    </div>
                                    <div class="label-box"><p>DRx AND MICKEY</p></div>
                                </li>
                                <li>
                                    <div class="img-box">
                                        <img src="../../../assets/images/home/Chome/issuer_5.png" alt="">
                                    </div>
                                    <div class="label-box"><p>DRx AND MICKEY</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- authenticity-section -->
                    <div class="authenticity-section">
                        <div class="public-title">
                            <h1>100% Authenticity</h1>
                        </div>
                        <div class="authenticity-content">
                            <ul>
                                <li>
                                    <div>
                                        <img src="../../../assets/images/home/Chome/authenticity-icon1@2x.png" alt="">
                                        <h3>{{$t('CHomeAdvantageTit1')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('CHomeAdvantageBrief1')}}</p>
                                </li>
                                <li>
                                    <div>
                                        <img src="../../../assets/images/home/Chome/authenticity-icon2@2x.png" alt="">
                                        <h3>{{$t('CHomeAdvantageTit2')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('CHomeAdvantageBrief2')}}</p>
                                </li>
                                <li>
                                    <div>
                                        <img src="../../../assets/images/home/Chome/authenticity-icon3@2x.png" alt="">
                                        <h3>{{$t('CHomeAdvantageTit3')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('CHomeAdvantageBrief3')}}</p>
                                </li>
                                <li>
                                    <div>
                                        <img src="../../../assets/images/home/Chome/authenticity-icon4@2x.png" alt="">
                                        <h3>{{$t('CHomeAdvantageTit4')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('CHomeAdvantageBrief4')}}</p>
                                </li>
                            </ul>
                        </div>  
                    </div>  
                </div>
            </div>
       </div>
       
    </div>
</template>
<script>
    import {getSymbolList_realtime,BannerList,} from '../../../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
    import{swiper,swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    import bigDecimal from 'js-big-decimal';
    import {BigNumber} from 'bignumber.js';
    import config from '@/config'
    import {getDecimalExNumber } from '../../../lib/utils.js';
    import {getApi} from '../../../../api/axios.js'
    import {nadDATA,dowDATA,spnDATA} from "../../../../api/urls.js";
    import  market from "../../../components/market .vue";
    export default {
        data(){
            return{
                isLogin:'',
                value1:0,
                current:0,
                tabShow:false,
                checked:false,
                noPadding: '--',
                symbolList:[],
                boardIndex:'USDT',
                site:'S',
                symbolListSelf:{},
                quoteCoinList:[],
                pushData:[],//推送过来的快照
                baseAssetList:[],
                announcementArray:[],
                bannerList:[],
                mineing:{},
                volumnUsdt:'',
                ffVolumn:'',
                ffMing:'',
                searchVal:"",
                language:localStorage.getItem('countryLanguage'),
                tableData:[],
                tabels:[
                    {text:'1'},
                    {text:'2'},
                    {text:'3'},
                    {text:'4'},
                ],
                downloadFlag:true,
                exchangeTipsUrl:'',
                supervionUrl:'',
                evaluationUrl:'',
                sicoUrl:'',
                iosHelpUrl:"",
                modal3:false,//新手指导页
                dowPrice:'',
                dowChange:'',
                dowPercent:'',
                dowupflag:true,
                nadPrice:'',
                nadChange:'',
                nadPercent:'',
                nadflag:true,
                spnPrice:'',
                spnChange:'',
                spnPercent:'',
                spnflag:true,
                value1:0,
                isAutoplay:true,
                clientType:'PC',
                fromSite:'C',
                language:window.localStorage.getItem('countryLanguage') || 'zh-CN',
                bannerArr:[],
                // bannerArr:[{
                //     url:require('../../../assets/images/home/Shome/banner.png'),
                //     text:'第一个图片'
                // },
                // {
                //     url:require('../../../assets/images/home/Shome/banner.png'),
                //     text:'第二个图片'
                // }]

            }
        },
        components:{
            market
        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            loginStatus(){
                return this.$store.state.app.isLogin;
            }
         
        },
        methods:{
           initBannerList() {
                let params = {}
                params.clientType = this.clientType
                params.fromSite = this.fromSite
                params.language = this.language
                BannerList(params).then(data => {
                    data.map((v,i) => {
                    this.bannerArr.push({imageUrl:v.imageUrl,targetUrl:v.targetUrl,subjectName:v.subjectName})
                    })
                })
                },
            gotoExchange(symbol,type){
                this.$router.push({
                    path:'/exchange',
                    query:{
                        symbol:symbol,
                    }
                    
                })

            },
           
        
            
        },
   
        watch:{
               'pushData': {
                handler: function(newVal, oldVal) {
                    //更新交易对的行情
                    this.initBoardModule();
                },
                deep: true,
            },
            languageChange(val,oldVal){//监听全局语言的状态
                //SEO 中英文切换支持
                this.initBannerList()
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
            this.initBannerList();
            let isLogin =  this.$store.state.app.isLogin;
            if(isLogin){
                this.isLogin = true
            }else{
                this.isLogin = false
            }
            this.$store.commit('changeHeaderColor', '');
            this.$store.commit('changeFooterColor', '#140606');
           
        },
        destroyed(){
            this.SSEsource && this.SSEsource.close();

        }
    }
</script>
<style scoped lang='less'>
@import './Chome.less';
</style>






