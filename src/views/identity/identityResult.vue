<template>
    <div>
            <div class="content">
                    <div class="title">{{$t('sfrzIIDVerification')}}</div>
                <div class="innner">
                    <!-- 正在审核 -->
                    <div v-if="identifyState==='SUBMIT'" class="underReview">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="warning" type="md-alert" />{{$t('newK1Subsuccess')}}</p>
                        <p class="text-center font-size-40">We will review your submission and inform you about your approval status within 3 business days</p>
                        <p class="img-content">
                            <img src="../../assets/images/identify/dengdai.png" alt="">
                        </p>
                    </div>
                    <!-- 通过 -->
                     <div v-if="identifyState==='SUCCESS'" class="passed">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="success" type="md-checkmark-circle-outline" />{{$t('newK1applypass')}}</p>
                        <p style="text-align:center;">{{$t('newK1successtip')}}</p>
                        <p style="text-align:center;">If you have not received a Beta code yet, we'll email you as soon as a testing slot opens. Stay tuned.</p>
                        <p class="img-content">
                            <img src="../../assets/images/identify/yirenzheng.png" alt="">
                        </p>
                        <div class="message-person">
                            <div class="left">
                                <ul>
                                    <li>{{$t('sfrzNationality')}}</li>
                                    <li>{{$t('sfrzIDNo')}}</li>
                                    <li>{{$t('sfrzCompleteName')}}</li>
                                </ul>
                            </div>
                            <div class="right">
                                    <ul>
                                        <li>{{personMessage.country}}</li>
                                        <li>{{personMessage.idNumber}}</li>
                                        <li v-if="personMessage.country=='CN'">{{fullNameCn}}</li>
                                        <li v-else>{{fullName}}</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="identifyState==='FAIL'"  class="rejected">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="failed" type="ios-close-circle" />{{$t('newK1applyfail')}}</p>
                        <div class="reject-reason">
                            <p>{{$t('sfrzRefusalReason')}}</p>
                            <ul>
                                <li class="reason-error" v-for="item in coinDescribe">{{item}}</li>
                            </ul>
                        </div>
                          <p class="img-content">
                            <img src="../../assets/images/identify/renzhengshibai.png" alt="">
                        </p>
                        <div class="button-container clearfix">
                            <Button  class="loginbtn"  @click="gotoRealname" type="primary">{{$t('newK1buttonEdit')}}</Button>
                        </div>
                    </div>
                   
                </div>
                <div class="email-adderss" v-html="$t('newK1subtipbutt')"></div>
                    
            </div>
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    import {userInfo,identify,identifyQueryUrl,identifyInfo} from '../../../api/urls.js';
    import {getHeaderTokenApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
     import {
      identifyQuery,
   } from '_api/balances.js'

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
                personJson:{},
                resultObj:{},
                identifyState:'',
                personMessage:{},
                middleName:'',
                coinDescribe:[]

            }
        },
        components:{
            Loading
        },
        methods: {
             getUserInfo(token){
                let params = {
                     "userId":localStorage.getItem('loginUserId'),
                }
                getHeaderTokenApi(userInfo,params,token).then((res) =>{
                    if(res.data){
                        this.identifyState = res.data.identifyState;
                    }
                }).catch((res) =>{

                })
            },
             getIdentiyMessage(token){
                let params = {
                    userId:localStorage.getItem('loginUserId'),
                    nameList:'THIRD_PT'
                }
                getHeaderTokenApi(identifyInfo,params,token).then((res)=>{   
                    if(res.data){
                        this.personMessage = res.data[0].data;
                        this.middleName = this.personMessage.middleName?this.personMessage.middleName:''
                        if(res.data[0].thirdRemark){
                            this.coinDescribe = res.data[0].thirdRemark.split('</br>');
                        }
                    }
                })
            },
            gotoRealname(){
                this.$router.push('/kyc')
            },
          
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            fullName(){
                return this.personMessage.firstName+this.middleName+this.personMessage.lastName;
            },
            fullNameCn(){
                return this.personMessage.lastName+this.middleName+this.personMessage.firstName;
            }
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
                 this.getUserInfo($cookies.get('loginToken'))
                this.getIdentiyMessage($cookies.get('loginToken'))
              if(localStorage.getItem('countryLanguage')=='zh-CN'){
                    this.chinaPeople = true;
                }else{
                    this.chinaPeople = false;
            }
            

        }
    }
</script>

<style lang='less' scoped>
 @import "./identityResult.less";
</style>
<style lang='less'>
.rejected{
     .ivu-btn{
         border-radius: 5px !important;
         background: #12869A;
         &:hover{
            background: #04798c;
         }
     }
}

</style>