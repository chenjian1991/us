<template>
    <div>
        <div v-bind:style="styleObject" class="footer-container hidden-xs">
            <div v-bind:style="styleObject" class="footer-inner">
                <div class="service-contain clearfix">
                    <div class="service">
                        <h3>{{$t('footercustomerservice')}}</h3>
                        <p>{{$t('footeralladyservice')}}</p>
                        <p>{{$t('footersendeamil')}}</p>
                        <p class="email">service@55.com</p>
                    </div>
                    <div class="email-btn">
                        <a style="color:#fff;" href="mailto:service@55.com">
                            <Icon class="email-icon" type="ios-mail-outline" />
                            E-mail us
                        </a>
                    </div>
                </div>
                <div class="announce clearfix">
                    <ul>
                        <li>{{$t('footerEmailus')}}</li>
                        <li v-for="item in resultAD"><a target="_blank" :href="item.targetUrl">{{item.title}}<span>[{{item.createTime}}]</span></a></li>
                        <li class="more"><a target="_blank" :href="moreAnounce">{{$t('footermore')}}</a></li>
                    </ul>
                </div>
                <div class="hot-assets">
                    <ul class="clearfix asset">
                        <li>{{$t('footerassetstype')}}</li>
                        <li><router-link to="/Bhome">{{$t('footerblockchain')}}</router-link></li>
                        <!-- <li><router-link to="/Shome">{{$t('headerstockchain')}}</router-link></li>
                        <li><router-link to="/Fhome">{{$t('headerfrancechain')}}</router-link></li> -->
                        <li><router-link to="/Chome">{{$t('headercoustomerchain')}}</router-link></li>
                        <!-- <li>{{$t('headerlocalbusiness')}}</li>
                        <li>{{$t('headerpersonalchain')}}</li> -->
                    </ul>
                    <ul class="clearfix exchange-pairs">
                        <li>{{$t('footerexchangeparis')}}</li>
                        <li @click="gotoExchange('ETHUSDT','B')">ETH/USDT</li>
                        <li @click="gotoExchange('FFUSDT','B')">FF/USDT</li>
                        <li @click="gotoExchange('FBTUSDT','S')">FBT/USDT</li>
                        <li @click="gotoExchange('BTCUSDT','B')">BTC/USDT</li>
                        <li @click="gotoExchange('EURDUSDD','F')">EURD/USDD</li>
                    </ul>
                    <ul class="clearfix country">
                        <li>{{$t('footerorigin')}}</li>
                        <li> <a href="">{{$t('footerglobal')}}</a></li>
                        <!-- <li><a href="">{{$t('footerussite')}}</a></li> -->
                    </ul>
                </div>
                <div class="company clearfix">
                    <ul>
                        <li>{{$t('footercompany')}}</li>
                        <li><router-link to="/about55">{{$t('footerabout55')}}</router-link></li>
                        <li><router-link to="/privice">{{$t('footersecretterms')}}</router-link></li>
                        <li><router-link to="/disclaimer">{{$t('footerlaw')}}</router-link></li>
                        <li><router-link to="/fee">{{$t('footerfees')}}</router-link></li>
                        <li>{{$t('footergroup')}}</li>
                        <li><a target="_blank" :href="telegramURL">Telegram</a></li>
                        <li><a target="_blank" href="https://www.facebook.com/55GlobalMarkets/">FB</a></li>
                        <li><a target="_blank" href="https://twitter.com/55GlobalMarkets">Twitter</a></li>
                    </ul>
                </div>
                <div class="partner clearfix">
                    <ul class="clearfix">
                        <li>{{$t('footerpartener')}}</li>
                        <li>DaoCoin</li>
                        <li>TrustOne</li>
                        <li>Prime Trust</li>
                        <li>Daollar Pay</li>
                        <li>&copy55.com</li>
                    </ul>
                </div>
                
            </div>
        </div>

    </div>
</template>

<script>
   import {AnnoucementList} from '_api/home';
   import moment from 'moment';


    export default {
        data(){
            return {
                telegramURL:'',
                moreAnounce:"",
                styleObject:{

                },
                language:window.localStorage.getItem('countryLanguage') || 'zh-CN', //传参数
                 adArr:[
                    // {title:'1123231123',targetUrl:'https://www.55.com',date:'12-12'},
                ],
                resultAD:[]
            }
        },
        methods:{
            footerUrl(){
                let lang = this.$store.state.app.countryLanguage;
            if(lang=='en'){
                this.telegramURL='https://t.me/www55com_English';
                this.moreAnounce="https://55support.zendesk.com/hc/en/categories/360000443513-Announcements"
            }else if(lang=='vi'){
                this.telegramURL='https://t.me/Vietnam_55globalmarkets';
                this.moreAnounce="https://55support.zendesk.com/hc/en/categories/360000443513-Announcements"

            }else if(lang=='ko'){
                this.telegramURL='https://t.me/korea_55globalmarket';
                this.moreAnounce="https://55support.zendesk.com/hc/en/categories/360000443513-Announcements"

            }else if(lang=='zh-CN'||lang=="zh"){
                this.telegramURL='https://t.me/www55com_Mandarin';
                this.moreAnounce="https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements"

            }
        },
        initAnnoucementList(){
                this.adArr=[];
                AnnoucementList({language:this.$store.state.app.countryLanguage,fromSite:'ALL'}).then(data =>{
                    data.map((v,i) => {
                        this.adArr.push({title:v.title,targetUrl:v.targetUrl,createTime:moment(v.createTime).format('MM-DD')})
                        this.resultAD = this.adArr.slice(0,3)
                    })
                })
            },
        gotoExchange(symbol,site){
                this.$router.push({
                    path:'/exchange',
                    query:{
                        symbol:symbol,
                        site:site
                    }
                    
                })

            },
        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            footerColor(){
                return this.$store.state.app.backgroundFooter
            }
        },
        watch:{
            languageChange(val,olVal){
                this.footerUrl();
                this.initAnnoucementList()
            },
             footerColor(){
                this.styleObject = {
                    background : this.$store.state.app.backgroundFooter
                }
            }
            
        },
        mounted(){
            this.styleObject = {background : this.$store.state.app.backgroundFooter}
            this.footerUrl();
         this.initAnnoucementList();

        }
        
    }
</script>

<style lang='less' scoped>
    .footer-container{
        width: 100%;
        background: #15232C;
        .clearfix:after {
            content:""; 
            display: block; 
            clear:both; 
        }
        .footer-inner{
            width: 1200px;
            //height: 665px;
            margin: 0 auto;
            background: #15232C;
            .service-contain{
                padding: 70px 0;
                border-bottom:1px solid #192B37;
                   .service{
                float: left;
                h3{
                    font-size:18px;
                    color: #FFFFFF;
                    padding-bottom: 21px;
                }
                p{
                    color: #949DA6;
                    font-size:14px;
                }
                p.email{
                    color: #fff;
                    font-size:18px;
                    margin-top:14px;
                }

            }
            .email-btn{
                float: right;
                line-height: 40px;
                width:130px;
                height:40px;
                border:1px solid rgba(80,195,203,1);
                text-align: center;
                color: #fff;
                margin-top: 78px;
                cursor: pointer;
                .email-icon{
                    font-size: 25px;
                    color: #fff;
                    margin-right: 5px;
                }

            }
            }
            .announce{
                border-bottom: 1px solid #192B37;
                ul{
                    
                    li{
                        float: left;
                        margin-left:20px;
                        font-size:12px;
                        color: #949DA6;
                        padding: 30px 0px;
                        max-width: 290px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        
                        a{
                            color: #949DA6;
                             &:hover{
                                 color: #fff;
                            }
                        }
                        span{
                            margin-left:10px;
                        }
                        &:nth-child(1){
                            color: #fff;
                            font-size:14px;
                            margin-left: 0px;
                        }
                         &.more{
                            font-size:14px;
                            float: right;
                        }
                    }
                }
            }
            .hot-assets{
                ul{
                    padding-top: 30px;
                    &:nth-child(1){
                        padding-top: 38px;
                    }
                    &:nth-child(3){
                        padding-bottom: 38px;
                    }
                    li{
                        float: left;
                    }
                    &.asset{
                        li{
                            margin-left:30px;
                            color: #949DA6;
                            font-size:12px;
                            
                            a{
                                color: #949DA6;
                                font-size: 12px;
                                &:hover{
                                    color: #fff;
                                }
                            }
                        }
                        li:nth-child(1){
                             color: #fff;
                            margin-left: 0px;
                            font-size:14px;
                            cursor: auto;

                        }
                         li:nth-child(5){
                             color: #696E7D;
                        }
                        li:nth-child(6){
                             color: #696E7D;
                        }
                         li:nth-child(7){
                             color: #696E7D;
                        }


                    }
                &.exchange-pairs{
                     li:nth-child(2){
                        margin-left:18px;
                    }
                    li{
                        color: #949DA6;
                        margin-left:30px;
                        cursor: pointer;
                        &:hover{
                            color: #fff;
                        }
                    }
                    li:nth-child(1){
                        margin-left:0px;
                        color: #fff;
                        font-size:14px;
                        cursor:auto;
                    }
                }
                &.country{
                    li:nth-child(1){
                        margin-left: 0px;
                        color: #fff;
                        font-size:14px;
                    }
                    li{
                        margin-left:28px;
                        color: #949DA6;
                        a{
                            color: #949DA6;
                            &:hover{
                                color: #fff;
                            }
                        }
                        
                    }
                }

                }
            }
            .company{
                border-top: 1px solid #192B37;
                border-bottom: 1px solid #192B37;
                ul{
                    
                    li{
                        float: left;
                        margin-left: 30px;
                        padding: 25px 0px;
                       
                        a{
                            color: #949DA6;
                            font-size:12px;
                            &:hover{
                                color:#fff;
                            }
                        }
                    }
                    li:nth-child(1){
                        margin-left: 0px;
                        color: #fff;
                        font-size:14px;
                    }
                     li:nth-child(6){
                        color: #fff;
                        font-size:14px;
                        margin-left:70px;
                    }
                }
            }
            .partner{
                ul{
                    li{
                        float: left;
                        margin-left: 30px;
                        padding: 30px 0px;
                        color: #949DA6;

                    }
                    li:nth-child(1){
                        color: #fff;
                        font-size: 14px;
                        margin-left: 0px;
                    }
                    li:nth-child(6){
                        font-size: 14px;
                       float: right;
                    }

                }
            }


         





        }
    }
</style>