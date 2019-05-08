
<template>
    <div id="interFinancethree" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="">{{$t('transTittle')}}</router-link>
             </div>  
            <div class="register_wraper">
                 <div class="title">
                        <p>{{$t('transTittle')}}</p>
                </div>
                <div class="inner_input_login">
                    <div class="step">
                         <Steps :current="2">
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                        </Steps>
                    </div>
                     <Form class="form-item clearfix"  >
                         <div>
                              <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span></span>
                                    </div>
                                    <FormItem class="form_item pull-left detail_Message" style="margin-bottom:15px;">
                                      <p>{{$t('transsendAmount')}}<span v-html="responseRate.sendAmount"></span><em v-html="sendCoinName"></em></p>
                                      <p>{{$t('transRatepay')}}<span>1<em v-html="sendCoinName"></em> = <em v-html="responseRate.remitRate"></em><em v-html="receiveMoneyName"></em></span></p>
                                      <p>{{$t('transFee')}}：<span v-html="responseRate.fee"></span><em v-html="sendCoinName"></em></p>
                                    </FormItem>
                                </div>
                                
                                 <div class="clearfix ">
                                    <div class="pull-left span-label">
                                        <span></span>
                                    </div>
                                    <FormItem class="form_item pull-left fee ">
                                         <div class="detail_Message">
                                            <p>{{$t('transPay')}} <em v-html="responseRate.payAmount"></em><span v-html="sendCoinName"></span> </p>
                                            <p>{{$t('transRecive')}}<span v-html="responseRate.receiveAmount"></span><em v-html="receiveMoneyName">USD</em></p>
                                        </div>
                                    </FormItem>
                                </div>
                             
                         </div>
                         <div class="button-container clearfix">
                            <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit" type="primary">{{$t('transSub')}}</Button>
                            <Button v-else disabled loading class="loginbtn"  @click="handleSubmit" type="primary"></Button>
                   
                            <p>{{$t('transRdown')}}<span style="color:#F15F5F;font-size:14px;margin-left:5px;"><timeout ref="mychild" @popup='popupShow' :pageMessag='pageMessag' :time='timecount'></timeout>s</span></p>
                     </div>
                    </Form>
                      
                </div>
                </div>
                </div>
                <Modal  class="financeModal"
                        v-model="modal1"
                        :title="this.$t('transRchg')"
                        :closable="false"
                        :mask-closable="false"
                        >
                        <p>{{$t('transRchgT')}}</p>
                        <p>
                            <span>{{$t('transRchgR')}}</span>
                            <span>1<em v-html="sendCoinName"></em> = <em v-html="responseRate.remitRate"></em><em v-html="receiveMoneyName"></em></span>
                        </p>
                         <div slot="footer">
                            <Button type="primary" size="large"  @click="confirm">{{$t('transRchgC')}}</Button>
                        </div>
                 </Modal> 
            

            </div>
        </div>
    </div>
</template>

<script>
import {commonRemite} from '../../../api/urls.js';
import {postHeaderKeyIdBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import {Exchange} from '@/interface/exchange.js';
import {countNumberDown} from '@/lib/utils.js'
import moment, { isMoment } from 'moment'
import { reject } from 'q';
import timeout from '../../components/timeOut';

    export default {
        name:'login',
        data() {
              const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    callback()
                }
            };
            return {
                loaded:true,
                modal1:false,
                responseRate:[],
                sendCoinName:localStorage.getItem('sendCoinName'),
                receiveMoneyName:localStorage.getItem('receiveMoneyName'),
                accountID:'',
                assetToken:'',
                paymentExpiredAt:'--:--',//支付截止时间倒计时 mm:ss
                payMoneyTimer:null,
                createDate:'',
                aliveTime:0,
                aliveTimeNumber:0,
                reponseLockid:'',
                responseValue:'',
                refreshID:'',
                pageMessag:'3',
                timecount:'',
                
            }



        },
        components:{
            timeout
        },
        methods:{
            handleSubmit() {
                    this.sumbitMessage()
            },
            getRate(sendSelect,receiveSelect,countryId,tokenId,lockId){
                 let paramsobj = {
                    symbol : sendSelect+"/"+receiveSelect,
                    countryId :countryId,
                    tokenId :tokenId,
                    lockId : lockId?lockId:'',
                }
                 let data =  postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getLastRate',"params":JSON.stringify(paramsobj)}).then((res)=>{
                     if(res.message){    
                         this.loaded = true;
                            this.$Notice.error({
                                title: this.$t(res.message),
                                desc:this.$t(res.message)
                            });
                    }
                    this.reponseLockid = res.data.value.lockId;
                     this.aliveTime = res.data.value.aliveTime;
                     return res.data.value.lockId;
                     
                })
                return data;
                   
            },
            async initPage(){
                let reponselockid = localStorage.getItem('reponselockid');
                let newestId = localStorage.getItem('newestId');
                let resultid = reponselockid?reponselockid:newestId;//优先取responsedlockID，如果没有的话取最新的newsetid
                let obj = JSON.parse(localStorage.getItem('saveObject'));
                 let _result = await this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,resultid);// 第一次进页面
                let params = {
                    lockType:localStorage.getItem('lockbitCoin'),
                    receiveCode:obj.receiveCurrencyId,
                    receiveAmount:obj.receiveAmount,
                    remittanceType:obj.remittanceType,
                    tokenCode:obj.tokenCode,
                    sendAmount:obj.sendAmount,
                    countryId:obj.countryDictId,
                    lockId:_result,
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/refreshRemitConfirm',"params":JSON.stringify(params)}).then((res)=>{
                    if(res.message){    
                        this.loaded = true;
                            this.$Notice.error({
                                title: this.$t(res.message),
                                desc:this.$t(res.message)
                            });
                    }
                    this.responseRate = res.data.entity;
                    this.refreshID = res.data.entity.lockId;
                })
            },
            sumbitMessage(){
                        this.loaded = false;
                        let _this = this;
                        this.exchange.getToken('ASSET',function(data){
                                _this.assetToken = data;
                            _this.exchange.getAccountId(function (result) {
                                _this.accountID = result;
                             let obj = JSON.parse(localStorage.getItem('saveObject'))
                             let params = {
                                originId:localStorage.getItem('originId'),
                                currencyCode:obj.receiveCurrencyId,
                                receiveAmount:_this.responseRate.receiveAmount,
                                remittanceType:obj.remittanceType,
                                tokenCode:obj.tokenCode,
                                sendAmount:_this.responseRate.sendAmount,
                                bankAddressCountry:localStorage.getItem('bankAddressCountryid'),
                                tradesPassword:'',// 空就可以
                                userChannel:1,
                                lockId:_this.refreshID,// 获取refreshid
                                lockType:localStorage.getItem('lockbitCoin'),
                                channelUserId:_this.accountID,
                                assetToken:_this.assetToken,
                                payAmount:_this.responseRate.payAmount
                            }
                                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/submitRemittance',"params":JSON.stringify(params)}).then((res)=>{
                                        if(res.message){    
                                             this.loaded = true;
                                                this.$Notice.error({
                                                    title: this.$t(res.message),
                                                    desc:this.$t(res.message)
                                                });
                                        }
                                        if(res.status=='10001'){
                                            _this.responseValue = res.data.value;
                                            //  _this.$router.push('/transaction_history')
                                            _this.$router.push({
                                                    name:"transaction_history",
                                                    params:{
                                                        id:'name5',
                                                    }
                                            });
                                        }
                                         
                                    }).catch((res)=>{
                                        _this.loaded = true;
                                    })

                        })

                        })
            },
            confirm(){
                // this.payMoneyTimer = null;
                // this.timeoutMethod()
                this.modal1 = false;
                // this.initPage()
                //  let obj = JSON.parse(localStorage.getItem('saveObject'))
            //    this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,'');//  第一次
                //  this.$refs.mychild.timeoutMethod()
                //  console.log(this.$refs.mychild.timeoutMethod())
                //  this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,resultid);
                // this.timecount = 300000;


            },
            popupShow(){
                this.modal1 = true;
                this.initPage()
            }
            // timeoutMethod(){// 倒计时
            //         if(this.aliveTime){
            //             if(!this.payMoneyTimer){
            //                 this.aliveTimeNumber  = this.aliveTime/1000;
            //                 // this.aliveTimeNumber  = 30;
            //                  this.payMoneyTimer = setInterval(() => {
            //                      let second =  this.aliveTimeNumber--;
            //                      let obj = countNumberDown(second)
            //                      if(obj.second>=0){
            //                          this.paymentExpiredAt = obj.minutes+":"+obj.second;
            //                      }else{//如果倒计时结束后
            //                          clearInterval(this.payMoneyTimer)
            //                          this.modal1 = true;
            //                         let obj = JSON.parse(localStorage.getItem('saveObject'))
            //                         this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,this.reponseLockid);// 第一次进页面
            //                      }
            //                  }, 1000);
            //             }
            //         }
            // },
            
            
           
        },
        computed:{
          
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
          
           
            
        },
        watch:{
            languageChange(val,oldVal){
                
            },
            
        },
        mounted(){
            // let obj = JSON.parse(localStorage.getItem('saveObject'));
            // let newestid = this.reponseLockid?this.reponseLockid:obj.newestLockid 
            // let newset = localStorage.getItem('newestLockid');
            // let newlcokId = newset?newset:obj.lockId;//永远取最新的lockid
            // this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,newlcokId);
            this.initPage();
            let loginToken =  Cookies.get('loginToken')
            let ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            if (loginToken) {
               this.exchange.ssoProvider.getSsoToken = function (fn) {
                  fn(loginToken);
               };
            } else {
               this.$router.push('/login')
            }
                //  let obj = JSON.parse(localStorage.getItem('saveObject'))
        },
        created(){

        }
        
        
    }
</script>
<style scoped lang="less">
    @import './interFinanceThree.less';
</style>
<style lang='less'>
#interFinancethree{
    .ivu-steps{
        .ivu-steps-head-inner{
            width:40px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
        }
       
        .ivu-steps-status-finish{
            .ivu-steps-head-inner{
                 border:1px solid #12869A;
            }
            .ivu-steps-tail{
                 >i{
                     background:none;
                     &::after{
                         top:0px;
                         background: #12869A !important;
                     }
                 }

            }
            
        }
        .ivu-steps-tail{
           >i{
               background: #12869A;
               top:7px;
           }
       }
        .ivu-steps-status-process{
            .ivu-steps-head-inner{
             background: #12869A;
            }
        }
    } 
     .ivu-btn{
         border-radius: 5px !important;
         width: 358px;
         background: #12869A;
         padding: 10px 0px;
         &:hover{
             background: #04798c;
         }
     }
     .ivu-form-item{
         margin-bottom: 24px;
     }
     .ivu-steps-item{
         .ivu-steps-status-process{
             .ivu-steps-head-inner{
                 background: #12869A;
             }
         }
     } 
 

}
.financeModal{
    .ivu-modal-header-inner{
        color:#344857;
        font-size: 13px;
    }
    .ivu-modal-body{
        border-bottom: 1px solid rgba(0,0,0,0.04);
        p{
            color: #344857;
            font-size: 12px;
            margin-top: 8px;
            em{
                color: #12869A;
            }
        }
    }
    .ivu-modal-footer{
        div{
            button{
                padding: 8px 10px;
                background: #12869A;
                color:#fff;
            }
        }
    }
}
   
   
</style>


