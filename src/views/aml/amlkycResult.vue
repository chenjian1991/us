<template>
    <div>
            <div id="lv2_level" class="content">
                    <div class="title">{{$t('kyc2level')}}</div>
                <div class="innner">
                    <!-- 正在审核 -->
                    <div v-if="underRivew"  class="underReview">
                        <h3 class="nav">{{$t('kyc2level')}}</h3>
                        <p class="tips"><Icon class="warning" type="md-alert" />{{$t('kyc2Resultsub')}}</p>
                        <p class="img-content">
                            <img src="../../assets/images/identify/dengdai.png" alt="">
                        </p>
                        <p class="reviewed">
                           {{$t('kyc2Resultsub1')}} 7 {{$t('kyc2Resultsub2')}}
                        </p>
                    </div>
                    <!-- 通过 -->
                     <div  v-if="passed"   class="passed">
                        <h3 class="nav">{{$t('kyc2level')}}</h3>
                        <p class="tips"><Icon class="success" type="md-checkmark-circle-outline" />{{$t('kyc2Resultpass')}}</p>
                        <div class="message-person">
                             <Tabs :animated="false">
                                <TabPane :label="Basic">
                                    <div class="basic_contain">
                                        <div class="basic_left">
                                            <ul>
                                                <li>{{$t('kyc2Nation')}}</li>
                                                <li>{{$t('kyc2FName')}}</li>
                                                <li>{{$t('kyc2LName')}}</li>
                                                <li>{{$t('kyc2Gender')}}</li>
                                                <li>{{$t('kyc2Birth')}}</li>
                                                <li>{{$t('kyc2Mail')}}</li>
                                                <li>{{$t('kyc2Phone')}}</li>
                                            </ul>
                                        </div>
                                        <div class="basic_right">
                                            <ul>
                                                <li>{{basicObj.nationality}}</li>
                                                <li>{{basicObj.firstName}}</li>
                                                <li>{{basicObj.lastName}}</li>
                                                <li>{{basicObj.tpGender}}</li>
                                                <li>{{basicObj.birthday}}</li>
                                                <li>{{basicObj.tpEmail}}</li>
                                                <li>{{basicObj.tpPhone}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane :label="Address">
                                      <div class="basic_contain">
                                        <div class="basic_left">
                                            <ul>
                                                <li>{{$t('kyc2Addr')}}</li>
                                                <li>{{$t('kyc2Addr3')}}</li>
                                                <li>{{$t('kyc2Addr4')}}</li>
                                                <li>{{$t('kyc2Addr5')}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{$t('kyc2Addr6')}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{$t('kyc2Addr7')}}</li>
                                            </ul>
                                        </div>
                                        <div class="basic_right">
                                            <ul>
                                                <li>{{basicObj.addressType}}</li>
                                                <li>{{basicObj.tpCountry}}</li>
                                                <li>{{basicObj.tpStreet}}</li>
                                                <li>{{basicObj.tpCity}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{basicObj.usRegion}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{basicObj.usPostalcode}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane :label="Tax">
                                    <div class="basic_contain">
                                        <div class="basic_left">
                                            <ul>
                                                <li>{{$t('kyc2Taxconutry')}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{$t('kyc2TaxID')}}</li>
                                                <li v-else>{{$t('kyc2TaxIDNo')}}</li>
                                            </ul>
                                        </div>
                                        <div class="basic_right">
                                            <ul>
                                                <li>{{basicObj.taxCountry}}</li>
                                                <li v-if="basicObj.tpCountry=='US'">{{basicObj.passport}}</li>
                                                <li v-else>{{basicObj.passport}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane :label="IDinformation">
                                     <div class="basic_contain">
                                        <div class="basic_left">
                                            <ul>
                                                <li>{{$t('kyc2IDType')}}</li>
                                                <li>{{$t('kyc2IDNo')}}</li>
                                                <li>{{$t('kyc2IDEX')}}</li>
                                            </ul>
                                        </div>
                                        <div class="basic_right">
                                            <ul>
                                                <li>{{basicObj.identifyType}}</li>
                                                <li>{{basicObj.identifyId}}</li>
                                                <li>{{basicObj.identifyExpire}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div v-if="rejected" class="rejected">
                        <h3 class="nav">{{$t('kyc2level')}}</h3>
                        <p class="tips"><Icon class="failed" type="ios-close-circle" />{{$t('kyc2Resultfail')}}</p>
                        <div class="reject-reason">
                            <p>{{$t('kyc2Resultfail1')}}</p>
                            <ul>
                                <!-- <li class="reason-error" v-for="item in coinDescribe">{{item}}</li> -->
                                <li>{{basicObj.remark}}</li>
                            </ul>
                        </div>
                          <p class="img-content">
                           {{$t('kyc2Resultfail2')}}
                            <br>
                           {{$t('kyc2Resultfail3')}}
                        </p>
                        <div class="button-container clearfix">
                            <Button  class="loginbtn"  @click="gotoRealname" type="primary">{{$t('kyc2Resultfail4')}}</Button>
                        </div>
                    </div>
                   
                </div>
                <div class="email-adderss">{{$t('kyc2Resultbutton')}}</div>
                    
            </div>
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    import {userInfo,identify,amlqueryState,amlqueryInfo} from '../../../api/urls.js';
    import {getHeaderTokenApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
    import Cookies from 'js-cookie';
    import moment from 'moment';

    export default {
        data() {
            return {
                loading: true,
                firstName:'',
                lastName:'',
                whichCountry:'',
                proofNumber:'',
                underRivew:false,
                passed:false,
                rejected:false,
                countryName:'',
                coinDescribe:[],
                chinaPeople:true,
                checkState:'',
                basicObj:{
                    nationality:'',
                    firstName:'',
                    lastName:'',
                    tpGender:'',
                    birthday:'',
                    tpEmail:'',
                    tpPhone:'',
                    addressType:'',
                    tpCountry:'',
                    tpStreet:'',
                    tpCity:'',
                    usRegion:'',
                    taxCountry:'',
                    identifyType:'',
                    passport:'',
                    identifyId:'',
                    identifyExpire:'',
                    remark:"",
                },
                Basic: (h) => {
                    return h('div', [
                        h('span', this.$t('kyc2Basic')),
                    ])
                },
                 Address: (h) => {
                    return h('div', [
                        h('span', this.$t('kyc2Address')),
                    ])
                },
                 Tax: (h) => {
                    return h('div', [
                        h('span', this.$t('kyc2Tax')),
                    ])
                },
                 IDinformation: (h) => {
                    return h('div', [
                        h('span', this.$t('kyc2IDinfo')),
                    ])
                },

            }
        },
        components:{
            Loading
        },
        methods: {
            L2queryState(token){
                getHeaderTokenApi(amlqueryState,'',token).then((res)=>{
                    if(res.data.result){
                       this.amlStatus = res.data.result;
                       if(res.data.result=='SUCCESS'){
                            this.passed = true;
                            this.rejected = false; 
                            this.underRivew = false;
                       }else if(res.data.result=='FAIL'||res.data.result=='NOHAVE'){
                            this.rejected = true; 
                            this.underRivew = false;
                            this.passed = false;
                       }else if(res.data.result =='SUBMIT'||res.data.result=='PENDING'){
                            this.underRivew = true;
                            this.passed = false;
                            this.rejected = false;
                       }
                    }else if(res.data.code){
                        if(res.data.code =='10013'){
                            this.$router.push('login')
                        }
                        this.$Notice.error({
                                title: this.$t(res.data.code),
                                desc:this.$t(res.data.code)
                         });
                    }
                })
            },
             L2queryInfo(token){
                getHeaderTokenApi(amlqueryInfo,'',token).then((res)=>{
                    if(res.data){
                        let data = res.data;
                        this.basicObj.nationality = data.nationality;
                        this.basicObj.firstName = data.firstName;
                        this.basicObj.lastName = data.lastName;
                        this.basicObj.tpGender = data.tpGender;
                        this.basicObj.birthday = moment(data.birthday).format('YYYY-MM-DD');
                        this.basicObj.tpEmail = data.tpEmail;
                        this.basicObj.tpPhone = data.tpPhone;
                        this.basicObj.addressType = data.addressType;
                        this.basicObj.tpCountry = data.tpCountry;
                        this.basicObj.tpStreet = data.tpStreet;
                        this.basicObj.tpCity = data.tpCity;
                        this.basicObj.usRegion = data.usRegion;
                        this.basicObj.taxCountry = data.taxCountry;
                        this.basicObj.identifyType = data.identifyType;
                        this.basicObj.passport = data.passport;
                        this.basicObj.identifyExpire = moment(data.identifyExpire).format('YYYY-MM-DD');
                        this.basicObj.identifyId = data.identifyId;
                        this.basicObj.remark = this.$t(data.remark);
                        this.basicObj.usPostalcode = data.usPostalcode;
                    }else if(res.data.code){
                        if(res.data.code =='10013'){
                            this.$router.push('login')
                        }
                        this.$Notice.error({
                                title: this.$t(res.data.code),
                                desc:this.$t(res.data.code)
                         });
                    }
                })
         },
            gotoRealname(){
                this.$router.push('/editAmlKyc')
            },
          
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch:{
            languageChange(val,oldVal){
                 if(val=='zh-CN'){
                     this.chinaPeople = true;
                 }else{
                     this.chinaPeople = false;
                 }

            },
        },
        mounted(){
            this.L2queryInfo(Cookies.get('loginToken'))
            this.L2queryState(Cookies.get('loginToken'))
              if(localStorage.getItem('countryLanguage')=='zh-CN'){
                    this.chinaPeople = true;
                }else{
                    this.chinaPeople = false;
            }

        }
    }
</script>

<style lang='less' scoped>
 @import "./amlkycResult.less";
</style>
<style lang='less'>
.rejected{
    .button-container{
        padding-bottom: 20px;
    }
     .ivu-btn{
         border-radius: 5px !important;
         background: #12869A;
         &:hover{
            background: #04798c;
         }
     }
}
#lv2_level{
    .ivu-tabs-nav-scroll{
        display: flex;
        justify-content: center;
        line-height: 36px;
        align-items: center;
    }
    .ivu-tabs{
        min-width: 900px;
        width:auto;
        background: #FBFBFB;
        .ivu-tabs-content{
            height: 360px;
            // padding: 0 177px;

        }
        .ivu-tabs-nav{
            .ivu-tabs-tab:hover{
                color: #344857 !important;
            }
        } 
        .ivu-tabs-nav-container{
            background: #F5F7F8;
        }
        .ivu-tabs-ink-bar{
            background-color: #12869A !important;
        }
        .ivu-tabs-nav{
            .ivu-tabs-tab-active{
                color: #344857 !important;
            }
        } 
    }
}

</style>