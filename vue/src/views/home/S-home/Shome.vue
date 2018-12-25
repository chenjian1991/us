<template>
    <div>
        <div class="root-contain">
            <div class="wrapper">
                <div class="container-self home_container">
                    <div class="main_plate bg-darkGreen clearfix">
                        <div class="swiper">
                            <div class="homebox">
                            <section class="bannerSection">
                                <Carousel :autoplay-speed="4000" v-model="value1" arrow="never" height="570px" :autoplay="isAutoplay" loop :radius-dot="false">
                                    <CarouselItem v-for="item in bannerArr">
                                    <div v-if="item.targetUrl == '' || item.targetUrl== null">
                                            <div class="demo-carousel">
                                                <img :src="item.imageUrl" alt="">
                                            </div>
                                        </div>
                                        <a v-else :href="item.targetUrl" target="_blank">
                                            <div class="demo-carousel">
                                                <img :src="item.imageUrl" alt="">
                                            </div>
                                        </a>
                                    </CarouselItem>
                                </Carousel>
                            </section>
                            <section class="siteTable">
                                <market :sites="['S']" />
                            </section>
                        </div>
                        </div>
                    </div>

                    <div class="mining-mechanism bg-darkGreen title-subtile-holder">
                        <h1 class="section-title light_title">{{$t('HomeAdvantage')}}</h1>
                        <div class="row mining-content mt-80">
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_1.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit1')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief1')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4 ">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_2.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit2')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief2')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_3.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit3')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief3')}}</p>
                            </div>
                        </div>
                        <div class="row mining-content">
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_4.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit4')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief4')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4 ">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_5.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit5')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief5')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../../assets/images/home/Shome/advantage_6.png" alt="">
                                    <h3>{{$t('HomeAdvantageTit6')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeAdvantageBrief6')}}</p>
                            </div>
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
                fromSite:'S',
                language:window.localStorage.getItem('countryLanguage') || 'zh-CN',
                bannerArr:[],

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
                this.value1 = 0;
                this.bannerArr = []
                this.isAutoplay = false
                let params = {}
                params.clientType = this.clientType
                params.fromSite = this.fromSite
                params.language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage') || 'zh-CN'
                BannerList(params).then(data => {
                    data.map((v,i) => {
                        this.bannerArr.push({imageUrl:v.imageUrl,targetUrl:v.targetUrl,subjectName:v.subjectName})
                    })
                    if(this.bannerArr.length>1){
                    this.isAutoplay = true
                    }
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
            this.$store.commit('changeFooterColor', '#0A2A3F');
           
        },
        destroyed(){
            this.SSEsource && this.SSEsource.close();

        }
    }
</script>
<style scoped lang='less'>
@import './Shome.less';
</style>




