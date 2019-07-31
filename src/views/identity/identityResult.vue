<template>
    <div>
            <div class="content">
                    <div class="title">{{$t('sfrzIIDVerification')}}</div>
                <div class="innner">
                    <!-- 正在审核 -->
                    <div v-if="underRivew"  class="underReview">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="warning" type="md-alert" />{{$t('newK1Subsuccess')}}</p>
                        <p class="img-content">
                            <img src="../../assets/images/identify/dengdai.png" alt="">
                        </p>
                    </div>
                    <!-- 通过 -->
                     <div v-if="passed" class="passed">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="success" type="md-checkmark-circle-outline" />{{$t('newK1applypass')}}</p>
                        <p style="text-align:center;">{{$t('newK1successtip')}}</p>
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
                                    <li>{{resultObj.country}}</li>
                                    <li>{{resultObj.idNumber}}</li>
                                    <li v-if="chinaPeople">{{resultObj.lastName+resultObj.firstName}}</li>
                                    <li v-else>{{resultObj.firstName}}<span style="width:3px;display:inline-block;"></span>{{resultObj.lastName}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="rejected" class="rejected">
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
                <div class="email-adderss">{{$t('newK1subtipbutt')}}</div>
                    
            </div>
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    import {userInfo,identify,identifyQueryUrl} from '../../../api/urls.js';
    import {getHeaderTokenApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
    import Cookies from 'js-cookie';
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

            }
        },
        components:{
            Loading
        },
        methods: {
               getRealNameIdentify(token){
                getHeaderTokenApi(identifyQueryUrl,{},token).then((res) =>{
                    if(res.data==''||res.data==null){
                         this.$router.push('/kyc')
                    }else{
                        let reg = new RegExp("</br>", "g");
                    if(res.data.remark){
                         this.coinDescribe = res.data.remark.replace(/<\s*\/br>/gi,"<br/>").split('<br/>')// 切割成数组然后处理成换行；
                    }
                    if (res.data.code) {
                        this.$Notice.error({
                            title: this.$t(res.data.code),
                            desc: this.$t(res.data.code)
                        });
                        this.$router.push('/login')
                    }
                    this.personJson = res.data.formJson;
                    this.resultObj = JSON.parse(this.personJson);
                    let identifyFlag = res.data.dataStatus;
                    if(identifyFlag==1){//还没有提交实名认证
                            this.$router.push('/kyc')
                    }else if(identifyFlag == 3){//成功
                            this.passed = true;
                            this.underRivew = false;
                            this.rejected = false;
                    }else if(identifyFlag ==2){//submit
                            this.underRivew = true;
                            this.rejected = false;
                            this.passed = false;

                    }else if(identifyFlag==4){//失败
                            this.rejected = true;
                            this.passed = false;
                            this.underRivew = false;
                    }
                    
                    }
                    
                }).catch((res) =>{
                    console.log(res)
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
            this.getRealNameIdentify(Cookies.get('loginToken'))
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