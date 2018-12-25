<template>
    <div>
        <div class="root-contain hidden-xs">
            <div id="home_pc" class="wrapper">
                    <div class="container-self home_container">
                            <div class="">
                    <div class="pannel-landing-page data_background text-center"  data-background='/exchange/b11/assets/images/exchange-background2.png'>
                        <div class="container">
                        <div class="row ico-countdown-group">
                            <div class="col-xs-12 col-md-6 col-lg-6 text-left content-1">
                                <h1><strong class="g_strong">{{$t('HomeGlobal')}}<br />{{$t('HomeGlobaltitle')}}</strong></h1>
                                <div class="spacer_30"></div>
                                <p class="no-margin white-color font-size-16 font-weight-normal"> <br />{{$t('HomeInformation')}}</p>
                                <div class="spacer_50"></div>
                                <router-link v-if="!isLogin" class="btn btn-default btn-lg button-element font-size-14" to="/register">{{$t('HomeOpenAccount')}}</router-link><br/>
                                <router-link v-if="isLogin" class="btn btn-default btn-lg button-element font-size-14" to="/balances">{{$t('HomeAssetsCount')}}</router-link><br/>
                                <div class="spacer_10"></div>
                                <a class="btn btn-default btn-lg button-element font-size-14" :href="sicoUrl"  target="_blank" title=""><img style="margin-right:3px; width:16px; vertical-align:middle;" src="../../assets/images/home/icon-telegram.png" alt=""> Telegram</a>
 
                                <!-- <a target="_blank" class="btn btn-default btn-lg button-element font-size-14" :href="sicoUrl" title="">{{$t('HomeAttendSICO')}}</a> -->

                                <div class="spacer_30"></div>
                        </div>
                            <div class="col-xs-12 col-md-6 col-lg-6 background-black content-2">
                                    <div class="panel panel-violet no-margin">
                                    <div class="panel-heading no-padding no-border" >
                                        <h3 style="background:#1a2b7c;" class="no-margin">{{$t('HomeMiningData')}}</h3>
                                    </div>
                                    <div class="panel-body padding_30" style="background:#2b3c8d;">
                                         <div class="panel-item">
                                            <p class="font-weight-normal">{{$t('HomeFFTradeVolume')}}</p>
                                            <span v-html="ffVolumn!==null?ffVolumn:'--'"></span><em>FF</em>
                                        </div>
                                        <div class="panel-item">
                                            <p class="font-weight-normal">{{$t('HomeMiningOutputYTD')}}</p>
                                            <!-- <span v-html="ffMing!==null?ffMing:'--'"> </span><em>FF</em> -->
                                                <em>--FF</em>
                                        </div>
                                       
                                        <div class="panel-item">
                                            <p class="font-weight-normal">{{$t('HomeTotalVolumeYTD')}}</p>
                                            <span>{{$t('homeHopeMining')}}</span>
                                            <!-- <span  v-html="volumnUsdt!==null?volumnUsdt:'--'"></span><em>USDT</em> -->
                                        </div>
                                    </div>
                                    <!-- <div class="myMining">
                                        <router-link to='/buyMining'>{{$t("myMinghistory")}}</router-link>
                                    </div> -->
                            </div>
                            </div>
                        </div>
                          <!-- row -->
                        <div class="row banner-list">
                            <div class="banner-item banner-one">
                                <a target="_blank" :href="hcUrl">
                                     <h4>{{$t('homeEscape')}}</h4>
                                <p> {{$t('homeusddTransfer')}}</p>
                                </a>
                               
                            </div>
                            <div class="banner-item banner-two">
                                <a target="_blank" :href="activetwourl">
                                     <h4>{{$t('homeff')}} </h4>
                                    <p> {{$t('hometickff')}}</p>
                                    <p>{{$t('homedate')}}</p>
                                </a>
                            </div>
                            <div class="banner-item banner-three">
                                <a target="_blank" :href="activethreeurlThree">
                                    <h4>{{$t('homegvt')}} </h4>
                                    <p>{{$t('homegvttwo')}}</p>
                                    <p>{{$t('homegvtthree')}}</p>
                                    <p>{{$t('homegvtfour')}}</p>
                                </a>
                            </div>
                            <!-- 公告 -->
                            <div class="banner-item banner-four">
                                    <p class="title">
                                        <span class="announcement">{{$t('homeanunce')}}</span>
                                        <a target="_blank" :href="annouceUrl" class="all-announcement">{{$t('homeall')}}<Icon style="color:#fff;font-size:14px;" type="ios-arrow-round-forward" /></a>
                                    </p>
                                    <ul>
                                        <li style="color:#fff;">
                                            <a style="color:#fff;" target="_blank" :href="firtActive">
                                                <span>{{$t('hometivitiesone')}}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" :href="newactiveurl1">
                                                <span>{{$t('hometivitites')}}</span>
                                            </a>
                                        </li>
                                         <li>
                                             <a target="_blank" :href="activethreeurl">
                                            <span>{{$t('hometivitiestwo')}}</span>
                                            </a>
                                        </li>
                                    </ul>
                            </div>

                        </div>

                        </div>
                    </div>
<!-- 第一部分 -->


                    </div>
                        <div class="main_plate clearfix">
                            <div class="plate_content clearfix">
                                <div class="palte_head">
                                    <div class="palte_head_left">
                                            <span  @click="tabClick(index,key)" v-bind:class='{on:index==current}' v-for="(value,key,index) in symbolListSelf">
                                                  {{key}}
                                            </span>
                                            
                                    </div>
                                    <div class="palte_head_right">
                                        <Input search  v-model="searchVal" :placeholder="this.$t('inputsearch')" style="width: 150px;background:#000;" />
                                    </div>
                                    <!-- <div class="palte_head_right hidden-xs"><a target="_blank" :href="exchangeTipsUrl">[{{$t('exchangeArea')}}]</a></div> -->
                                </div>
                            
                                <div class="plate-table  table-responsive">
                                    <table class="table"  v-for='(item,index) in tabels' v-if="index==current">
                                        <thead>
                                            <th>{{$t('HomePair')}}</th>
                                            <th>{{$t('HomeLatestPrice')}}</th>
                                            <th>{{$t('HomeVariance')}}</th>
                                            <th>{{$t('HomeHighest')}}</th>
                                            <th>{{$t('HomeLowest')}}</th>
                                            <th>{{$t('HomeTradeVolume')}}</th>
                                            <th>{{$t('HomeGoTrade')}}</th>
                                        </thead>
                                        <tbody>
                                            <tr v-if="!noData" class="" v-for='(item,index) in baseAssetList'>
                                                <td @click="gotoExchange(item.symbol,item.symbolType)">{{item.baseAsset}}/{{item.quoteAsset}}</td>
                                                <td>{{item.last | scientificToNumber}}</td>
                                                <td :class="[item.showColor == -1?'redText':'',item.showColor == 1?'greenText':'']">{{item.percent | scientificToNumber }}</td>
                                                <td>{{item.high | scientificToNumber }}</td>
                                                <td>{{item.low | scientificToNumber}}</td>
                                                <td>{{item.volume | scientificToNumber}}</td>
                                                <td @click="gotoExchange(item.symbol,item.symbolType)"><img src="../../assets/images/home/exchange.svg" alt=""></td>
                                            </tr>
                                            <tr v-if="noData">
                                                <td style="text-align:center" colspan='7'>--</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="header-title-breadcrumb element-box-shadow">
                                <div class="container">
                                    <div class="spacer_25"></div>
                                    <div class="clearfix"></div>
                                    <div class="row">
                                    <div class="title-subtile-holder">
                                        <h1 class="section-title light_title ">{{$t('sicoTitle')}}</h1>
                                        <div class="section-border light_border"></div>
                                        <div class="section-subtitle light_subtitle font-weight-normal">
                                            {{$t('sicoIntroduce')}}
                                        </div>
                                    <div class="sico-block">
                                        <img style="padding-bottom:50px;" src="../../assets/images/home/55SICO_logo_SICO.svg" class="img-responsive center-block" alt="">
                                        <img src="../../assets/images/home/realtime.svg" class="img-responsive center-block" alt="">
                                    </div>
                                    </br>
                                    <p class="text-center"><a target="_blank" :href="sicoUrl" class="btn btn-default button-element">{{$t('sicotext')}}</a></p>
                                    </div>
                                    </div> 
                                    <div class="spacer_30"></div>
                                    <div class="clearfix"></div>

                                </div>
                            </div>

<!-- 信批数据 -->
                    <div class="exchange-section data_background text-center" style="background-color:#11216e;padding:80px">
                        <h1 class="text-center" style="max-width:750px;font-size:36px;">{{$t('usddRealtime')}}</h1>
                        <p class="text-center" style="max-width:600px;font-weight:normal;">{{$t('usddRealtimetitle')}}</p>
                                <p class="text-center" style="max-width:600px;font-size:10px;font-weight:normal;">{{$t('usddRealtimetitleDescription')}}</p>
                                <div class="spacer_60"></div>
                            <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <div class="">
                                    <div class="percentage" data-perc="258">
                                        <h1 class="text-bold skill-count"><span>$</span>{{account_money}}</h1>
                                        <label class="yellow-bar"></label>
                                        <p>{{$t('usddAcount')}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <div class="">
                                    <div class="percentage" data-perc="14">
                                        <h1 class="text-bold skill-count">{{currency_token}}</h1>
                                        <label class="yellow-bar"></label>
                                        <p>{{$t('usddtoken')}}</p>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-4">
                                    <div class="">
                                    <div class="percentage" data-perc="5">
                                        <h1 class="text-bold skill-count">{{totalDividend}}</h1>
                                        <label class="yellow-bar"></label>
                                        <p>{{$t('usddSendFees')}}</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <p class="text-center"><a target="_blank" href="https://usdd.55.com/" class="btn btn-default">{{$t('usddurl')}}</a></p>
                    </div>
<!-- 合作伙伴 -->
                    <div class="mining-mechanism">
                        <div class="mining-title">{{$t('HomeFFSelfBalancing')}}</div>
                        <div class="section-border light_border"></div>
                        <p class="ff-introcduce font-weight-normal">{{$t('ffIntroduce')}}</p>
                        <div class="mining-content clearfix">
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../assets/images/home/Mining.svg" alt="">
                                    <h3>{{$t('HomeBuyingMining')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeBuyingMiningTip')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../assets/images/home/plan.svg" alt="">
                                    <h3>{{$t('HomeSuperMiner')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeSuperMinerTip')}}</p>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div>
                                    <img src="../../assets/images/home/howtouse.svg" alt="">
                                    <h3>{{$t('HomeFFTokenRecycle')}}</h3>
                                </div>
                                <p class="font-weight-normal">{{$t('HomeFFTokenTip')}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- pc合作伙伴 -->
                    <div class="our-investor hidden-xs">
                        <div class="investor-title">{{$t('HomeInvestors')}}</div>
                        <div class="section-border light_border"></div>
                        <div class="investor-content">
                            <div class="investor-item">
                                <li><img class="img-responsive"  src="../../assets/images/home/daollar.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/blockchainplus.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/hash.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/block360.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/btc123.svg" alt=""></li>
                            </div>
                            <div class="investor-item">
                                <li><img class="img-responsive" src="../../assets/images/home/redstar.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/qzzb.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/knownsec.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/slowmist.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/John.svg" alt=""></li>
                            </div>
                        </div>
                    </div>
                    <a id="index" name="index"></a>
                    <!--  下载app -->
                    <div class="download">
                        <div class="download-left">
                            <h2>Download the App now</h2>
                            <p>{{$t('hometrading')}}</p>
                            <ul>
                                <li> {{$t('hometoken')}}</li>
                                <li>{{$t('homedata')}}</li>
                                <li>{{$t('homewebsit')}}</li>
                            </ul>
                            <div class="download-btn">
                                <span>
                                   Android & iOS
                                    <div class="scanCode">
                                        <img src="../../assets/images/home/App_Download_QR.svg" alt="">
                                     </div>
                                </span>
                            </div>
                        </div>
                        <div class="download-right">
                            <img src="../../assets/images/home/Appdownload.svg" alt="">
                        </div>

                    </div>
                    <!-- h5 合作伙伴 -->
                    <div class="our-investor visible-xs  hidden-md hidden-lg">
                        <div class="investor-title">{{$t('HomeInvestors')}}</div>
                        <div class="section-border light_border"></div>
                        <div class="xs-investor clearfix">
                            <div class="pull-left">
                                    <li><img class="img-responsive"  src="../../assets/images/home/daollar.svg" alt=""></li>
                                    <li><img class="img-responsive" src="../../assets/images/home/blockchainplus.svg" alt=""></li>
                                    <li><img class="img-responsive" src="../../assets/images/home/hash.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/block360.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/btc123.svg" alt=""></li>
                            </div>
                            <div class="pull-right">
                                <li><img class="img-responsive" src="../../assets/images/home/redstar.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/qzzb.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/knownsec.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/slowmist.svg" alt=""></li>
                                <li><img class="img-responsive" src="../../assets/images/home/John.svg" alt=""></li>
                            </div>
                            </div>
                            
                        </div>

                    </div>
                    </div>
                    <div class="common-five">
                        <commonIndex></commonIndex>
                    </div>
                    <div v-if="modal2" class="alert dis-n">
                        <div class="title"><i class="iconfont">&#xe604;</i></div>
                        <div class="notice i18n" name="syNotice">
                        {{$t('syNotice')}}
                        </div>
                        <button @click="del">I GOT IT</button>
                        <div class="spacer_10"></div>
                    </div>
                    <div v-if="modal2" class="mask dis-n"></div>
            
            
            </div>
            <div class="visible-xs" id="home_app">
                <div  class="weixin-tips">
                   
                </div>
                 <div class="tips-content">
                          <img class="app-img" src="../../assets/images/home/Group@2x.png" alt="">
                          <div class="open-browser">
                               <p>{{$t('openbrowser')}}</p>
                          </div>
                    </div>
                <div>
                    <div class="logo">
                         <img src="../../assets/images/home/Bhome/h5-logo.svg" alt="">
                    </div>
                    <div class="app-description">
                    {{$t('hometrading')}}
                    </div>
                    <div class="app-install">
                        {{$t('h5description')}}
                    </div>
                    <div class="download-container">
                            <a :href="androidURL"  class="ios-btn andorid-btn">Android</a>
                            <a href="javascript:;" class="ios-btn " @click="downloadAPP">iOS</a>
                    </div>
                    <div class="ios-help pull-right">
                        <a :href="iosHelpUrl">{{$t('iosIntall')}}</a>
                    </div>
                    <div class="app-pic">
                        <img src="../../assets/images/home/iPhoneX.svg" alt="">
                    </div>
                </div>

            </div>

    <!-- modal -->
       <Modal  :mask-closable='false' class="welcome-bard hidden-xs" v-model="modal3" width="940" height="400">
        <p slot="header" style="color:#fff;font-size:16px;text-align:center;background:#5a6cb1;">
            <span>{{$t('customerWelcome')}}</span>
        </p>
        <div style="text-align:center">
            <p  style="font-size:14px;color:#333333;font-weight:normal;text-align:left;">{{$t('fivedescription')}}</p>
            <p style="ont-size:14px;color:#4e5c6e;margin-top:15px;font-weight:normal;text-align:left;">{{$t('sixsidedescription')}}</p>
        </div>
        <div style="margin-top:25px;padding-bottom:40px;border-bottom:1px solid #cdcdcd;">
            <div class="allsite">
                <ul>
                    <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/B.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">B-Site</p>
                            <p>{{$t('customrblockchain')}}</p>
                        </div>
                    </li>
                     <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/L.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">L-Site</p>
                            <p>{{$t('customerslocaltoken')}}</p>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/F.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">F-Site</p>
                            <p>{{$t('customersfoxtoken')}}</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/P.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">P-Site</p>
                            <p>{{$t('customerspersontoken')}}</p>
                        </div>
                    </li>
                </ul>
                <ul>
                     <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/S.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">S-Site</p>
                            <p>{{$t('customersstock')}}</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img class="pull-left" src="../../assets/images/home/C.svg" alt="">
                        <div class="pull-left">
                            <p style="font-weight:bold;">C-Site</p>
                            <p>{{$t('customercomunitytoken')}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="padding-bottom:34px;border-bottom:1px solid #cdcdcd;">
            <p style="ont-size:14px;color:#4e5c6e;margin-top:26px;font-weight:normal;">{{$t('customersverify')}}</p>
            <a class="vetification" href="javascript:;" @click="seeRealNameDetailMethod" style="width:231px;height:44px;line-height:44px;color:#fff;text-align:center;display:inline-block;background:#333333;margin-top:38px;">
                {{$t('customersidentitionbtn')}}
            </a>
        </div>
        <div>
            <p style="font-size:14px;color:#4e5c6e;margin-top:42px;padding-bottom:30px;font-weight:normal;">{{$t('customersusdd')}}</p>
            <a style="width:231px;height:44px;line-height:44px;color:#fff;text-align:center;display:inline-block;background:#333333;" target="_blank" href="https://usdd.55.com/">
               {{$t('customersusddbtn')}}
            </a>
        </div>
    </Modal>

       </div>
    </div>
</template>
<script>
    import commonIndex from '../../components/indexComon'
    import {getSymbolList_realtime,AnnoucementList,BannerList,Mineing} from '../../../api/home.js'//getSymbolList的名字必须与被引入文件的名字相同；
    import{swiper,swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css';
    import bigDecimal from 'js-big-decimal';
    import {BigNumber} from 'bignumber.js';
    import config from '@/config'
    import {getDecimalExNumber,} from '../../lib/utils.js';
    import {alreadyDividend,identify,AndroidDownloadUrl} from '../../../api/urls.js';
    import {getApi,getHeaderTokenApi} from '../../../api/axios.js';
    import Cookies from 'js-cookie';

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
                boardIndex:'BTC',
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
                language:localStorage.getItem('countryLanguage'),
                modal2:localStorage.getItem('moduleAlert'),
                modal3:false,// 新手指导页
                swiperOption:{
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载就要使用获取swiper对象来做什么事，那么这个属性一定要是true
                    notNextTick: true,
                    autoplay: true,
                    speed: 400,
                    loop:true,
                    grabCursor: true,
                    setWrapperSize: true,
                    slidesPerView : 3,
                    spaceBetween : 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,//允许点击小圆点跳转
                    },
                     autoplay: {
                            disableOnInteraction: false,
                    },
                    mousewheelControl:true,
                    paginationClickable:true,
                    slidesPerView: 3,
                    centeredSlides: true,
                   paginationClickable :true,
                },
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
                currency_token:'',
                account_money:'',
                totalDividend:'',
                identifyStatus:'',
                activetwourl:"",
                hcUrl:"",
                activethreeurl:"",
                newactiveurl1:"",
                newactiveurl2:"",
                tivityTwo:'',
                searchVal:"",
                annouceUrl:'',
                activethreeurlThree:'',
                firtActive:'',
                coinList:{},
                noData:false,
                 androidURL:'',
            }
        },
        components:{
            swiper,
            swiperSlide,
            commonIndex
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
            tabClick(index,key){
                this.current = index;
                this.boardIndex = key;
                this.initBoardModule()
                
            },
            initBoardModule() {
                //更新模块
                this.quoteCoinList = this.symbolListSelf[this.boardIndex]//板块BTC,USDD,USDT,ETH  this.quoteCoinList  [{},{}]是个数组
                //console.log(this.quoteCoinList)
                //更新交易资产列表 同时 更新当前交易对行情 交易对历史列表
                this.baseAssetList = this.createBaseAssestList(this.quoteCoinList);
                this.searchCoinList(this.searchVal.toUpperCase())
                //console.log(this.baseAssetList)
            },
            createBaseAssestList(symbolList) {
                let newArr = []
                //合并行情
                if(symbolList.length==0){
                    return false;
                }
                symbolList.map((v, i) => {//symbolList 循环数组
                    let nowPrice = {}
                    nowPrice = this.getSymbolNowPrice(v.symbol);
                    if (nowPrice) {
                        v.percent = this.noPadding
                        let diff = '';
                        let a = '';
                        //计算涨跌幅 percent  + 
                        if (nowPrice.previousClose) {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.previousClose);
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.previousClose)).toString(), '100')
                            v.percent = v.last ? bigDecimal.round(a, 2) + "%" : this.noPadding
                        } else {
                            diff = bigDecimal.subtract(nowPrice.last, nowPrice.open);
                            a = bigDecimal.multiply(new BigNumber(diff).dividedBy(new BigNumber(nowPrice.open)).toString(), '100')
                            v.percent = v.last ? bigDecimal.round(a, 2) + "%" : this.noPadding
                        }
                        //绿涨红跌 1绿色 0灰色 -1红色
                        v.showColor = bigDecimal.compareTo(bigDecimal.round(a, 2), 0)//比较数字大小
                        //计算最新价格精度
                        let long = getDecimalExNumber(v.priceTickSize)
                        nowPrice.last = bigDecimal.round(nowPrice.last, long)//四舍五入
                    }
    
                    newArr.push(Object.assign(v, nowPrice))
                })
                return newArr
            },
                //获取交易对的实时价格
            getSymbolNowPrice(symbol) {
                return _.last(this.pushData[symbol])
            },
             getSymbolListRealtimeData(){
                getSymbolList_realtime().then(res => {
                    //this.symbolList = {};
                    let boardObj = {}
                    let symbolUrl = ''
                    res.map((v, i) => {
                        let site = config[document.domain] || 'B' //默认的是B站
                        if(v.siteType && v.siteType.indexOf(site) != -1){
                            if (boardObj[v.quoteAsset]) {//存在type
                                boardObj[v.quoteAsset].push(v)
                            } else {
                                boardObj[v.quoteAsset] = [v];
                            }
                            //拼装推送数据查询url
                            symbolUrl += `symbol=${v.symbol}&${v.symbol}_least=1&`
                            //this.symbolList[v.symbol] = v
                        }
                    })
                    this.symbolListSelf = boardObj;
                    //console.log(this.symbolListSelf)
                    //获取交易对的推送的行情
                    this.getSSERealTime(symbolUrl)
    
                })
            },
            searchCoinList(value){//查询方法
                let searchList = this.baseAssetList;
                if(searchList==false){
                     this.noData = true;
                     return false;
                }else{
                    this.noData = false;
                }
                let searchArr = [];
                searchList.map((v,i)=>{
                    if(v.baseAsset.search(value) == -1){
                        //什么也没找到
                    }
                    else if(v.baseAsset.search(value)!== -1){//只要能找到一个就不能把noData设置为true
                        searchArr.push(v)
                    }
                    

                })
                if(searchArr.length==0){//无数据
                    this.noData = true;
                }else{
                    this.noData = false;
                    this.baseAssetList = this.createBaseAssestList(searchArr);
                }
                
                


            },
            //获取推送行情
            getSSERealTime(url) {
                let baseURL = window.location.protocol+'//'+window.location.host
                this.SSEsource = new EventSource(`${baseURL}/quote/realTime.stream?${url}`)
                this.SSEsource.onopen = function(e) {
                    console.log("行情推送连接已经建立：", this.readyState);
                };
                this.SSEsource.addEventListener('_RESULT', function(e) {
                    //每次推送一条记录
                    let result = JSON.parse(e.data)
                    if (this.pushData[result.symbol]) {//pushData 是后台推送过来的快照数据
                        this.pushData[result.symbol].push(result)
                        //保持21条行情记录,
                        if (this.pushData[result.symbol].length > 1) {
                            this.pushData[result.symbol] = _.drop(this.pushData[result.symbol], 1)
                        }
                    } else {
                        this.pushData[result.symbol] = [result]
                    }
                    //对象变动检测
                    this.pushData = Object.assign({}, this.pushData)
                   // console.log(this.pushData)
                }.bind(this))
                this.SSEsource.addEventListener('_ERROR', function(e) {
                    console.log('连接断开', e)
                })
            },
            getAnnoucementList(){
                AnnoucementList(this.$store.state.app.countryLanguage).then(res => {
                    this.announcementArray = res;
                })
            },
            getBannerList(){
                BannerList(this.$store.state.app.countryLanguage).then(res =>{
                    this.bannerList = '';
                    this.bannerList = res;
                })
            },
            getMineing(){
                Mineing().then(res =>{
                    this.mineing = res;
                    this.ffMing = res.lastMining.toFixed(2);
                    this.volumnUsdt = res.transactionConvert.toFixed(2);//  昨日全栈交易量, 保留3位小数
                    this.ffVolumn = res.platformAvailableAmount.toFixed(2);
                    //console.log(new bigDecimal(462919931.8093238000000).getValue())
                    
                })
            },
            del(){
                    this.modal2 = false;
                    localStorage.setItem('moduleAlert',true);
            },
            gotoAnnouncement(id){
                let lang = localStorage.getItem('countryLanguage');
                if(lang=='zh-CN'){
                    window.open('https://55support.zendesk.com/hc/zh-cn/articles/'+id)
                }else{
                    window.open('https://55support.zendesk.com/hc/en-us/articles/'+id)
                }
            },
            // gotoExchangeTips(){//分版介绍
            //     let lang = localStorage.getItem('countryLanguage');
            //     if(lang=='zh-CN'){
            //         this.exchangeTipsUrl = 'https://55support.zendesk.com/hc/zh-cn/articles/360008913494'
            //     }else{
            //         this.exchangeTipsUrl = 'https://55support.zendesk.com/hc/en-us/articles/360008913494'
            //     }
            // },
            gotoSupervisonUrl(){
                let lang = localStorage.getItem('countryLanguage');
                if(lang=='zh-CN'){
                    this.supervionUrl = 'https://55support.zendesk.com/hc/zh-cn/articles/360008903814';
                    this.evaluationUrl = 'https://55support.zendesk.com/hc/zh-cn/articles/360009050893'
                }else{
                    this.supervionUrl = 'https://55support.zendesk.com/hc/en-us/articles/360008903814'
                    this.evaluationUrl = 'https://55support.zendesk.com/hc/en-us/articles/360009050893'
                }
            },

            gotoSicoUrl(){
                let lang  = localStorage.getItem('countryLanguage');
                if(lang=='zh-CN'){
                    this.iosHelpUrl = "https://55support.zendesk.com/hc/zh-cn/articles/360012684013";
                    this.sicoUrl = 'https://t.me/www55com_Mandarin';
                    this.activetwourl="https://55support.zendesk.com/hc/zh-cn/articles/360013703033";
                    this.hcUrl = "https://55support.zendesk.com/hc/zh-cn/articles/360012916094"
                    this.activethreeurl="https://55support.zendesk.com/hc/zh-cn/articles/360012684013";
                    this.newactiveurl1 = "https://55support.zendesk.com/hc/zh-cn/articles/360013703033";
                    this.annouceUrl = 'https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements';
                    this.activethreeurlThree = "https://55support.zendesk.com/hc/zh-cn/articles/360013907153";
                    this.tivityTwo = "https://55support.zendesk.com/hc/zh-cn/articles/360011021193";
                    this.firtActive = "https://55support.zendesk.com/hc/zh-cn/articles/360013907153";
                }else if(lang=='en'){
                    this.iosHelpUrl = "https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.sicoUrl = 'https://t.me/www55com_English';
                    this.activetwourl="https://55support.zendesk.com/hc/en-us/articles/360013703033";
                    this.activethreeurl="https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.newactiveurl1 = "https://55support.zendesk.com/hc/en-us/articles/360013703033"
                    this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
                    this.activethreeurlThree = "https://55support.zendesk.com/hc/en-us/articles/360013907153";
                    this.tivityTwo = "https://55support.zendesk.com/hc/en-us/articles/360011021193";
                    this.firtActive = "https://55support.zendesk.com/hc/en-us/articles/360013907153"
                    this.hcUrl = "https://55support.zendesk.com/hc/en-us/articles/360012916094"
                }else if(lang='ko'){
                    this.sicoUrl = 'https://t.me/korea_55globalmarket';
                    this.iosHelpUrl = "https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.activetwourl="https://55support.zendesk.com/hc/en-us/articles/360013703033";
                    this.activethreeurl="https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.newactiveurl1 = "https://55support.zendesk.com/hc/en-us/articles/360013703033"
                    this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
                    this.activethreeurlThree = "https://55support.zendesk.com/hc/en-us/articles/360013907153";
                    this.tivityTwo = "https://55support.zendesk.com/hc/en-us/articles/360011021193";
                    this.firtActive = "https://55support.zendesk.com/hc/en-us/articles/360013907153"
                    this.hcUrl = "https://55support.zendesk.com/hc/en-us/articles/360012916094"

                }else if(lang='vi'){
                    this.sicoUrl = 'https://t.me/Vietnam_55globalmarkets';
                    this.iosHelpUrl = "https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.activetwourl="https://55support.zendesk.com/hc/en-us/articles/360013703033";
                    this.activethreeurl="https://55support.zendesk.com/hc/en-us/articles/360012684013";
                    this.newactiveurl1 = "https://55support.zendesk.com/hc/en-us/articles/360013703033"
                    this.annouceUrl = 'https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements';
                    this.activethreeurlThree = "https://55support.zendesk.com/hc/en-us/articles/360013907153";
                    this.tivityTwo = "https://55support.zendesk.com/hc/en-us/articles/360011021193";
                    this.firtActive = "https://55support.zendesk.com/hc/en-us/articles/360013907153"
                    this.hcUrl = "https://55support.zendesk.com/hc/en-us/articles/360012916094"
                }
            },
            closeDownload(){
                this.downloadFlag = false;
            },
            gotoExchange(symbol,type){
                this.$router.push({
                    path:'/exchange',
                    query:{
                        symbol:symbol,
                    }
                    
                })

            },
            downloadAPP(){
                    window.location.href='https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1442483182';
            },
            browserRedirect(){
                let sUserAgent = navigator.userAgent.toLowerCase();
                let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                let bIsMidp = sUserAgent.match(/midp/i) == "midp";
                let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                let bIsAndroid = sUserAgent.match(/android/i) == "android";
                let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                        this.$store.commit('changeifAPP',true);
                        // window.location.href='https://m.55.com/#/home';
                }else{
                        this.$store.commit('changeifAPP',false);

                }

            },
            requestBankAcount(){//账户余额
                let url = 'https://f.daocoin.money/api/trust_publish/bank_balances?symbol=USDD'
                getApi(url,{}).then((res) =>{
                    if(res.code=='200'){
                         let resdata = res.data;
                         this.currency_token = resdata.currency_number;//token数量
                         this.account_money = resdata.account_customer;//账户余额

                    }else{
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                       
                    }
                    

                })

            },
            RequestAlreadyDividend(){//已派发利息
                   getApi(alreadyDividend,{}).then((res) =>{
                    if(res.code){
                        this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                    }else{
                         let alreadyDividendfees = res.totalDividend;
                         this.totalDividend = alreadyDividendfees;

                       
                    }
                    

                })
            },
            getRealNameIdentify(token){
                getHeaderTokenApi(identify,{},token).then((res) =>{
                    this.identifyStatus = res.data.checkStatus;
                }).catch((res) =>{
                    console.log(res);
                })
            },
            seeRealNameDetailMethod(){
                  if(this.identifyStatus=='NOT_SET'){/*  */
                       window.location.href = "../../../../identityAuthentication/noAuthentication.html";
                    }else if(this.identifyStatus == 'PASSED'){
                        window.location.href = "../../../../identityAuthentication/passed.html";
                    }else if(this.identifyStatus =='CHECKING'){
                       window.location.href = "../../../../identityAuthentication/underReview.html";
                    }else if(this.identifyStatus=='FAILURE'){
                         window.location.href = '../../../../identityAuthentication/noPass.html';
                    }
            },
            weixin(){
                    let ua = navigator.userAgent.toLowerCase();
                    let isWeixin = ua.indexOf('micromessenger') != -1;
                    if (isWeixin) {
                        $('.weixin-tips').show()
                        $('.tips-content').show()
                    }else{
                        $('.weixin-tips').hide()
                        $('.tips-content').hide()
                    }
                },
            getAndroidUrl(){
                getApi(AndroidDownloadUrl,{}).then((res)=>{
                    this.androidURL = res.downloadPath;
                })
            }
            
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
                //this.getAnnoucementList()
                //this.bannerList = '';
                //this.getBannerList()
                //this.gotoExchangeTips()
                //this.gotoSupervisonUrl()
                this.gotoSicoUrl()
                 
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
            this.browserRedirect()
            this.getSymbolListRealtimeData()
            this.getAndroidUrl()
          //  this.getAnnoucementList()
        //   zhushi
            //this.getBannerList()
            this.getMineing()
            //this.gotoExchangeTips()
           // this.gotoSupervisonUrl()
            this.gotoSicoUrl()
            this.requestBankAcount()
            this.RequestAlreadyDividend()
            let isLogin =  this.$store.state.app.isLogin;
            let firstlogin = this.$store.state.app.firstLogin;//是否首次登录
            if(isLogin){
                this.isLogin = true
            }else{
                this.isLogin = false;
            }
            if(isLogin&&firstlogin){
                this.modal3 = true;//登录状态并且是首次登录  ，提示新手指导
            }else{
                this.modal3 = false;
            }
            this.weixin()//是否在微信中打开；
            this.getRealNameIdentify(Cookies.get('loginToken'));//查询用户是否实名
            


           
        },
        created(){
            if(localStorage.getItem('moduleAlert')){
                this.modal2 = false;
            }else{
                this.modal2 = true;
            }
        },
        destroyed(){
            this.SSEsource && this.SSEsource.close();
        }
    }
</script>
<style lang="less">
 .plate-table .ivu-table th{
    background-color: #fff!important;
}
 .plate-table .ivu-table td:nth-child(7){
    cursor: pointer;
}
.swiper-pagination-bullet-active{
    background: #fff;
}
.swiper-pagination-bullet{
    background: rgba(255,255,255,1);
}
// .ivu-modal-mask{
//     z-index: 9999 !important;
// }
//欢迎页面
.welcome-bard{
    .ivu-modal-close {
         .ivu-icon-ios-close{
            color: #fff;
            font-size: 30px;
        }
    }
    .ivu-modal-body{
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 20px;
    }
    .ivu-modal-footer{
        display: none;

    }
    .ivu-modal-header{
        background:#5a6cb1;
    }
    .allsite{
        display: flex;
        justify-content: space-between;
        ul{
            li{
                margin-top: 20px;
            }
        }
        .pull-left{
            p{
                margin-left:10px;
                &:nth-child(1){
                    font-size:15px;
                    color:#4e5c6e;
                }
                &:nth-child(2){
                    font-size:13px;
                    color:#9ba6b2;
                }
            }
        }
    }
}
</style>
<style scoped lang='less'>
@import './newhome.less';
</style>

