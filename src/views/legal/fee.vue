    <template>
    <div style='font-family: helvetica, "Microsoft YaHei", "PingFang SC";'>
        <div class="container">
            <div class="row">
            <div class="panel-body paddong_30_left left-part col-lg-10 col-md-9 col-sm-12 col-xs-12">
                    <div class="panel-heading no-padding">
                <h3 class="panel-title">{{$t('siteFees')}}</h3>
                </div>
                <p>{{$t('siteFeedescription')}}</p>
                <p class="font-weight">{{$t('sitetradefee')}}</p>
                <table  class="fees" style="width:500px;">
                    <thead>
                        <th>TYPE OF FIAT</th>
                        <th>Trading Fee</th>
                        
                    </thead>
                    <tbody>
                        <!-- <tr>
                            <td>FF(Fifty-five Token)</td>
                            <td>0.15%</td>
                        </tr> -->
                            <tr>
                            <td>USD</td>
                            <td>0.2%</td>
                        </tr>
                    </tbody>
                </table>
                </br>
                <table  class="fees" style="width:500px;">
                    <thead>
                        <th>{{$t('feename')}}</th>
                        <th>{{$t('exchangefee')}}</th>
                    </thead>
                    <tbody>
                            <tr>
                            <td>BITCOIN (BTC)</td>
                            <td>0.1%</td>
                        </tr>
                            <tr>
                            <td>ETHER (ETH)</td>
                            <td>0.1%</td>
                        </tr>
                            <tr>
                            <td>LITECOIN (LTC)</td>
                            <td>0.1%</td>
                        </tr>
                        
                    </tbody>
                </table>
                <p class="font-weight">{{$t('contactforprice')}}</p>
                <p class="font-weight">{{$t('handfee')}}</p>
                <p>{{$t('chargefree')}}</p>
                <p class="font-weight">{{$t('withdrawfee')}}</p>
                <p>{{$t('nomaterwithfive')}}</p>
                <!-- <p>{{$t('feetable')}}</p> -->
                <table class="fees"  style="width:500px;margin-top:15px;">
                    <thead>
                        <th>TYPE OF FIAT</th>
                        <th>Withdrawl Fee(per transaction)</th>
                        <!-- <th></th> -->  
                    </thead>
                    <tbody>
                        <tr>
                            <td>USD</td>
                            <td>5 USD</td>
                        </tr>
                    </tbody>
                </table>
                </br>
                <table class="fees"  style="width:500px;">
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

                        <tr>
                            <td>LITECOIN (LTC)</td>
                            <td>0.05 LTC</td>
                        </tr>
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
        padding:40px 0.1rem;
        font-size: 14px;
        font-weight: bolder;
        background: #fff;
        ul{
            li{
                font-size: 14px;
                line-height: 41px;
                a{
                    color: rgb(175, 175, 175);
                }
                .active{
                    color: rgb(18, 134, 154);
                }
            }
        }
        p{
			margin:10px 0;
			color: #5c6166;
			text-align: justify;
		}
        .title{
            font-size: 14px;
            color: rgb(52, 72, 87);
            line-height: 40px;
        }
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
			padding: 15px 0px 0px;
			font-size: 17px;
        }
        .fees{
            width:500px;
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
    }
    @media screen and (max-width: 768px) {
        .aboutBox{
            .fees{
                width:100% !important;
            }
        }
    }
</style>