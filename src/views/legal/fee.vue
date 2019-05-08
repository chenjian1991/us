    <template>
    <div class="aboutBox" style='font-family: helvetica, "Microsoft YaHei", "PingFang SC";'>
        </br>
        <div class="row terms">
            <div class="bs-component">
                <div>
                   
                    <div class="box-container">
                              <div class="right-part">
                        <div class="title">Articles in this section</div>
                        <ul>
                            <li>
                                <router-link to='/terms'> · User Agreement</router-link>
                            </li>
                             <li >
                                <router-link  to='/privacy'> · Privacy Policy</router-link>
                            </li>
                             <li>
                                <router-link to='/disclaimer'> · Disclaimer</router-link>
                            </li>
                             <li>
                                <router-link class="active" to='/fee'> · Fee Schedule</router-link>
                            </li>
                            <li>
                                <router-link to='/tradingRules'> · Trading Rules</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body paddong_30_left left-part">
                         <div class="panel-heading no-padding">
                        <h3 class="panel-title">{{$t('siteFees')}}</h3>
                        </div>
                        <p>{{$t('siteFeedescription')}}</p>
                        <p class="font-weight">{{$t('sitetradefee')}}</p>
                        <table  class="fees" style="width:500px;">
                            <thead>
                                <th>{{$t('feename')}}</th>
                                <th>{{$t('exchangefee')}}</th>
                            </thead>
                            <tbody>
                                <!-- <tr>
                                    <td>FF(Fifty-five Token)</td>
                                    <td>0.15%</td>
                                </tr> -->
                                 <tr>
                                    <td>BITCOIN (BTC)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>ETHER (ETH)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <!-- <tr>
                                    <td>OMG(OmiseGO)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>BITCOIN CASH (BCH)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>ETC(Ethereum Classic)</td>
                                    <td>0.1%</td>
                                </tr> -->

                                 <tr>
                                    <td>LITECOIN (LTC)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>DASH (DASH)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>ZCASH (ZEC)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>YEEZY (YEEZY)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <!-- <tr>
                                    <td>KYBERNETWORK(KNC)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>0x(ZRX)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>GENESIS VISION(GVT)</td>
                                    <td>0.1%</td>
                                </tr>
                                 <tr>
                                    <td>SALT(SALT)</td>
                                    <td>0.1%</td>
                                </tr>
                                  <tr>
                                    <td>BAT</td>
                                    <td>0.1%</td>
                                </tr>
                                  <tr>
                                    <td>SNT</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>EOS</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>ONT</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>BCHABC</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>BCHSV</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>GNT</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>UPP</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>DMT</td>
                                    <td>0.1%</td>
                                </tr>
                                <tr>
                                    <td>THETA</td>
                                    <td>0.1%</td>
                                </tr> -->
                                
                            </tbody>
                        </table>
                        <p class="font-weight">{{$t('contactforprice')}}</p>
                        <p class="font-weight">{{$t('handfee')}}</p>
                        <p>{{$t('chargefree')}}</p>
                        <p class="font-weight">{{$t('withdrawfee')}}</p>
                        <p>{{$t('nomaterwithfive')}}</p>
                        <p>{{$t('feetable')}}</p>
                        <table class="fees"  style="width:500px;margin-top:15px;">
                            <thead>
                                <th>{{$t('assetname')}}</th>
                                <th>{{$t('feestandard')}} <span>({{$t('Everypen')}})</span></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>BITCOIN (BTC)</td>
                                    <td>0.0005 BTC</td>
                                </tr>
                                 <tr>
                                    <td>ETHER (ETH)</td>
                                    <td>0.01 ETH</td>
                                </tr>
                               <!-- <tr>
                                    <td>TETHERUS (USDT)</td>
                                    <td>10USDT</td>
                                </tr>
                                <tr>
                                    <td>OMISEGO (OMG)</td>
                                    <td>0.8OMG</td>
                                </tr>
                                <tr>
                                    <td>BCH (BITCOIN CASH)</td>
                                    <td>0.003 BCH</td>
                                </tr> 
                                <tr>
                                    <td>ETC(Ethereum Classic)</td>
                                    <td>0.3 ETC</td>
                                </tr>-->

                                <tr>
                                    <td>LITECOIN (LTC)</td>
                                    <td>0.05 LTC</td>
                                </tr>
                                <tr>
                                    <td>DASH (DASH)</td>
                                    <td>0.015 DASH</td>
                                </tr>
                                <tr>
                                    <td>ZCASH (ZEC)</td>
                                    <td>0.025 ZEC</td>
                                </tr>
                                <tr>
                                    <td>YEEZY (YEEZY)</td>
                                    <td>1 YEEZY</td>
                                </tr>
                                <!-- <tr>
                                    <td>KYBERNETWORK(KNC)</td>
                                    <td>9KNC</td>
                                </tr>
                                <tr>
                                    <td>0x(ZRX)</td>
                                    <td>4ZRX</td>
                                </tr>
                                <tr>
                                    <td>GENESIS VISION(GVT)</td>
                                    <td>0.3 GVT</td>
                                </tr>
                                <tr>
                                    <td>SALT(SALT)</td>
                                    <td>6 SALT</td>
                                </tr>
                                <tr>
                                    <td>USD Daocoin(USDD)</td>
                                    <td>3USDD</td>
                                </tr>
                                <tr>
                                    <td>FF</td>
                                    <td>100 FF</td>
                                </tr>
                                  <tr>
                                    <td>BAT</td>
                                    <td>10 BAT</td>
                                </tr>
                                <tr>
                                    <td>SNT</td>
                                    <td>80SNT</td>
                                </tr>
                                 <tr>
                                    <td>EOS</td>
                                    <td>0.4EOS</td>
                                </tr>
                                <tr>
                                    <td>ONT</td>
                                    <td>3 ONT</td>
                                </tr>
                                <tr>
                                    <td>BCHABC</td>
                                    <td>0.015 BCHABC</td>
                                </tr>
                                <tr>
                                    <td>BCHSV</td>
                                    <td>0.02 BCHSV</td>
                                </tr>
                                <tr>
                                    <td>GNT</td>
                                    <td>30 GNT</td>
                                </tr>
                                <tr>
                                    <td>UPP</td>
                                    <td>100 UPP</td>
                                </tr>
                                <tr>
                                    <td>DMT</td>
                                    <td>6 DMT</td>
                                </tr>
                                <tr>
                                    <td>THETA</td>
                                    <td>35 THETA</td>
                                </tr> -->

                            </tbody>
                        </table>
                        <p class="font-weight">{{$t('tipsname')}}</p>
                        <p>{{$t('fivefees')}}</p>
                        <p>{{$t('fivefeesone')}}</p>
                        <p>{{$t('fivefeestwo')}}</p>
                        <p>{{$t('fivefeesthree')}}</p>
                    </div>
              
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              
            }
        },
        methods: {
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch:{
              languageChange(val,oldVal){//监听全局语言的状态
            },
        },
        mounted(){
        }
    }
</script>

<style scoped lang="less">
 .aboutBox{
     padding:0 30px;
     font-family: 'Montserrat';
     font-size: 14px;
     font-weight: bolder;
     background: #fff;
	.panel-title{
         color: #344857;
        border-bottom: 1px solid rgba(24,24,62,0.3);
        margin: 0;
     }
     .panel-gray{
         background: #202a39;
         color: #a7a7a7;
     }
     .font-weight{
        font-weight: bold;
        padding: 15px 0px;
    }
    .box-container{
        display: flex;
        justify-content: space-between;
        .left-part{
            width: 90%;
        }
        .fees{
            thead{
                th{
                    color: #000;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #f5f5f5;
                    &:nth-child(1){
                        text-align: left;
                        padding-left: 15px;
                    }
                }
            }
            tbody{
                tr{
                    td{
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        border: 1px solid #f5f5f5;
                        &:nth-child(1){
                            text-align: left;
                            padding-left: 15px;
                        }
                    }
                }
            }
        }
        .right-part{
            width: 210px;
            height: 204px;
            margin-top: 20px;
            margin-right: 10px;
            .title{
                font-size:14px;
                color:#344857;
                text-align: center;
                line-height: 34px;
                width:208px;
                height:34px;
            }
            ul{
                li{
                    font-size:14px;
                    line-height: 41px;
                    width: 90%;
                    padding-left: 15px;
                    margin: 0 auto;
                    a{
                        color:#afafaf;
                    }
                      .active{
                        color: #12869A;
                    }
                }
            }
        }
    }




 }
</style>