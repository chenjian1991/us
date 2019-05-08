<template>
    <div>
        <div id="Bhome" class="root-contain">
            <div id="home_pc" class="wrapper">
                    <div class="container-self">
                        <div class="main_plate clearfix">
                            <div class="swiper">
                            <div class="homebox">
                            <section class="bannerSection">
                            <Carousel v-model="value1" :autoplay-speed="4000" arrow="never" :height="570" :autoplay="isAutoplay" loop :radius-dot="false">
                                <CarouselItem v-for="(item,index) in bannerArr" :key="index">
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
                            </div>
                        </div>
                        <section class="siteTable">
                                <market :sites="['B']" />
                        </section>
                        </div>
                    <!-- <div class="mining-mechanism">
                        <div class="mining-mechanism-inner">
                                  <div class="mining-title">{{$t('HomeFFSelfBalancing')}}</div>
                            <div class="section-border light_border"></div>
                            <p class="ff-introcduce font-weight-normal">{{$t('ffIntroduce')}}</p>
                            <div class="mining-content clearfix">
                                <div class="col-md-4 col-lg-4">
                                    <div>
                                        <img src="../../../assets/images/home/Bhome/answer.png" alt="">
                                        <h3>{{$t('HomeBuyingMining')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('HomeBuyingMiningTip')}}</p>
                                </div>
                                <div class="col-md-4 col-lg-4">
                                    <div>
                                        <img src="../../../assets/images/home/Bhome/ff.png" alt="">
                                        <h3>{{$t('HomeSuperMiner')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('HomeSuperMinerTip')}}</p>
                                </div>
                                <div class="col-md-4 col-lg-4">
                                    <div>
                                        <img src="../../../assets/images/home/Bhome/salary.png" alt="">
                                        <h3>{{$t('HomeFFTokenRecycle')}}</h3>
                                    </div>
                                    <p class="font-weight-normal">{{$t('HomeFFTokenTip')}}</p>
                                </div>
                            </div>

                        </div>
                      
                    </div> -->
           
                    <!--  下载app -->
                    <section class="ios">
                    <div class="download">
                        <div class="download-left">
                            <h2>{{$t('homedownlaod')}}</h2>
                            <p>{{$t('hometrading')}}</p>
                            <ul>
                                <li> {{$t('hometoken')}}</li>
                                <li>{{$t('homedata')}}</li>
                                <li>{{$t('homewebsit')}}</li>
                            </ul>
                            <div class="download-btn">
                                    <img src="../../../assets/images/home/Bhome/newQrcode.png" alt="">
                            </div>
                        </div>
                        <div class="download-right">
                            <img src="../../../assets/images/home/mainHome/shouji@2x.png" width="724px" height="381px" alt="">
                        </div>

                    </div>
                    </section>


                    </div>
                    </div>
            
            
            </div>
    

       </div>
    </div>
</template>
<script>
    import {getSymbolList_realtime,BannerList,Mineing} from '../../../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
    import bigDecimal from 'js-big-decimal';
    import {BigNumber} from 'bignumber.js';
    import config from '@/config'
    import {getDecimalExNumber,} from '../../../lib/utils.js';
    import {alreadyDividend,identify,AndroidDownloadUrl} from '../../../../api/urls.js';
    import {getApi,getHeaderTokenApi} from '../../../../api/axios.js';
    import Cookies from 'js-cookie';
    import  market from "../../../components/market.vue";
    export default {
        data(){
            return{
                isLogin:'',
                value1:0,
                current:0,
                noPadding: '--',
                symbolList:[],
                boardIndex:'BTC',
                site:"B",
                symbolListSelf:{},
                quoteCoinList:[],
                pushData:[],//推送过来的快照
                baseAssetList:[],
                modal2:localStorage.getItem('moduleAlert'),
                coinList:{},
                noData:false,
                isAutoplay:true,
                clientType:'PC',
                fromSite:'US_B',
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
                let language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage')
                if(language=='en'||language=='vi'||language=='ko'||language=='zh-CN'){
                    params.language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage') || 'zh-CN'
                }else{
                    params.language = 'en'
                }
                // params.language = this.$store.state.app.countryLanguage || window.localStorage.getItem('countryLanguage') || 'zh-CN'
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
                this.HomeTitle = this.$t('HomeTitle')
                this.initBannerList()
            },
            loginStatus(val,oldVal){
                 let isLogin =  this.$store.state.app.isLogin;
                    if(isLogin){
                        this.isLogin = true;
                    }else{
                        this.isLogin = false;
                    }
            },
            searchVal(val,oldVal){
                let inputVal = val.toUpperCase()
                this.searchVal = inputVal;
                if(inputVal==''||inputVal==undefined){
                    this.initBoardModule()
                    this.noData = false;
                }else{
                    this.searchCoinList(inputVal)
                }
            }

        },
        mounted(){
            this.initBannerList();
            // this.$store.commit('changeHeaderColor', '#13246C');
            this.$store.commit('changeHeaderColor', '');
            this.$store.commit('changeFooterColor', '#0A1540');
            console.log(this.bannerArr)
        },
        created(){
           
        },
        destroyed(){
            this.SSEsource && this.SSEsource.close();
        }
    }
</script>
<style lang="less">
#Bhome{
    .ivu-input{
        border:1px solid #E5E5E5 !important;
    }
    .ivu-input-wrapper{
        border-radius: 6px;
    }
}
.swiper-pagination-bullet-active{
    background: #fff;
}
.swiper-pagination-bullet{
    background: rgba(255,255,255,1);
}

</style>
<style scoped lang='less'>
@import './Bhome.less';
</style>

