<template>
    <div>
            <div class="content">
                    <div class="title">{{$t('sfrzIIDVerification')}}</div>
                <div class="innner">
                    <!-- 正在审核 -->
                    <div v-if="underRivew"  class="underReview">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="warning" type="md-alert" />{{$t('sfrzIDAudit')}}</p>
                        <p class="img-content">
                            <img src="../../assets/images/identify/dengdai.png" alt="">
                        </p>
                    </div>
                    <!-- 通过 -->
                     <div  v-if="passed"  class="passed">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="success" type="md-checkmark-circle-outline" />{{$t('sfrzIDApproved')}}</p>
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
                                    <li>{{countryName}}</li>
                                    <li>{{proofNumber}}</li>
                                    <li v-if='chinaPeople'>{{lastName+firstName}}</li>
                                    <li v-else>{{firstName}}<span style="width:3px;display:inline-block;"></span>{{lastName}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="rejected" class="rejected">
                        <h3 class="nav">{{$t('IDVertification')}}</h3>
                        <p class="tips"><Icon class="failed" type="ios-close-circle" />{{$t('sfrzIDRejected')}}</p>
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
                            <Button  class="loginbtn"  @click="gotoRealname" type="primary">{{$t('sfrzRestartSubmit')}}</Button>
                        </div>
                    </div>
                   
                </div>
                <div class="email-adderss">{{$t('sendEmail')}}</div>
                    
            </div>
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    import {userInfo,identify} from '../../../api/urls.js';
    import {getHeaderTokenApi,postHeaderTokenBodyApi,getApi} from '../../../api/axios.js';
    import Cookies from 'js-cookie';

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
                chinaPeople:true

            }
        },
        components:{
            Loading
        },
        methods: {
               getRealNameIdentify(token){
                getHeaderTokenApi(identify,{},token).then((res) =>{
                    if(res.data.code=='10013'){
                        this.$Message.error('授权不通过，请重新登录');
                        this.$router.push('/login')
                    }
                    let reg = new RegExp("</br>", "g");
                    this.firstName = res.data.firstName;
                    this.lastName = res.data.lastName;
                    this.whichCountry = res.data.countryCode;
                    this.proofNumber = res.data.proofId;
                    if(res.data.remark){
                         this.coinDescribe = res.data.remark.replace(/<\s*\/br>/gi,"<br/>").split('<br/>')// 切割成数组然后处理成换行；
                    }
                    let identifyFlag = res.data.checkStatus;
                    if(identifyFlag=='NOT_SET'){
                            this.$router.push('/identiy')
                    }else if(identifyFlag == 'PASSED'){
                            this.passed = true;
                            this.underRivew = false;
                            this.rejected = false;
                            
                    }else if(identifyFlag =='CHECKING'){
                            this.underRivew = true;
                            this.rejected = false;
                            this.passed = false;

                    }else if(identifyFlag=='FAILURE'){
                            this.rejected = true;
                            this.passed = false;
                            this.underRivew = false;
                    }
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    res.forEach(item => {
                            if(item.code== this.whichCountry){
                               if(localStorage.getItem('countryLanguage')=='zh-CN'){
                                   this.countryName = item.zh;
                                   localStorage.setItem('country',item.zh)
                               }else{
                                   localStorage.setItem('country',item.en)
                                   this.countryName = item.en;
                               }

                            }
                    });
                

                })



                }).catch((res) =>{
                    console.log(res)
                })
            },
            gotoRealname(){
                this.$router.push('/identiy')
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