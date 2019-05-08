<template>
    <div id="usdd" class="root">
      <div class="banner">
          <!-- <img src="../../assets/images/usdd/banner.png" alt=""> -->
          <p>USDD</p>
      </div>
      <div class="usdd">
          <h2>{{$t('usddTitle1')}} {{$t('usddTitletwo')}}</h2>
          <p class="description">
              {{$t('usddDescription')}}
          </p>
          <div class="input-text">
              <Input v-model="value2" placeholder="" />
                 <Select v-model="model3" style="width:130px;">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              <span class="equal">=</span>
              <Input v-model="value2" placeholder="" />
                    <Select v-model="model4" style="width:130px">
                    <Option v-for="item in cityListTwo" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <!-- <p class="usdd_time">{{$t('usddToUsdtDetailone')}}</p> -->
          </div>

      </div>
      <div class="hold_usdd">
          <div class="hold_usdd_inner">
              <h2>{{$t('usddWhyHold')}}</h2>
              <p class="asset" style="text-align:center;">{{$t('usddWhyHoldReason')}}</p>
              <div class="content">
                  <div class="left">
                      <img src="../../assets/images/usdd/icon1@2x (9).png" alt="">
                      <span class="line"></span>
                      <h3>{{$t('usddPercent')}}</h3>
                      <p class="detail">{{$t('usddPercentDescription')}}
                    </p>
                  </div>
                   <div class="left">
                      <img src="../../assets/images/usdd/iocn2@2x (1).png" alt="">
                      <span class="line"></span>
                      <h3>{{$t('usddDevideFees')}}</h3>
                      <p class="detail">{{$t('usddDevideFeesDescription')}}
                    </p>
                  </div>
                   <div class="left">
                      <img src="../../assets/images/usdd/icon3@2x (1).png" alt="">
                      <span class="line"></span>
                      <h3>{{$t('usddFallBack')}}</h3>
                      <p class="detail">{{$t('usddFallBackDescription')}}
                    </p>
                  </div>

              </div>
          </div>
      </div>
         <div class="hold_usdd message_usdd">
          <div class="hold_usdd_inner">
              <h2>{{$t('usddRealtime')}}</h2>
              <p class="explain">{{$t('usddRealtimetitle')}}</p>
              <p class="notice">{{$t('usddRealtimetitleDescription')}}</p>
              <p class="notice" style="margin-top:10px;">{{$t('usddcohen')}}</p>
              <div class="content">
                  <div class="left">
                      <p class="number">${{account_money}}</p>
                      <span class="line"></span>
                      <p>{{$t('usddAcount')}}</p>
                    
                  </div>
                   <div class="left">
                       <p class="number">{{currency_token}}</p>
                      <span class="line"></span>
                      <p>{{$t('usddtoken')}}</p>
                    
                  </div>
                   <div class="left">
                       <p class="number">{{totalDividend}}</p>
                      <span class="line"></span>
                      <p>{{$t('usddSendFees')}}</p>
                  </div>

              </div>
          </div>
      </div>

           <div class="hold_usdd message_usdd parter">
          <div class="hold_usdd_inner">
              <h2>{{$t('usddparter')}}</h2>
              <div class="content">
                  <div class="left">
                      <p>DaoCoin</p>
                      <span class="line"></span>
                      <p>{{$t('usddBaseMachine')}}</p>
                  </div>
                   <div class="left">
                       <p>PrimeTrust</p>
                      <span class="line"></span>
                      <p>{{$t('thirdxin')}}</p>
                    
                  </div>
                   <div class="left">
                       <p>RatingToken</p>
                      <span class="line"></span>
                      <p>{{$t('usddFound')}}</p>
                  </div>

              </div>
          </div>
      </div>
     


    </div>
</template>

<script>
import {alreadyDividend} from '../../../api/urls.js';
import {getApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';
import { duration } from 'moment';
import Cookies from 'js-cookie';
    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
            return {
                cityList: [
                    {
                        value: 'USD',
                        label: 'USD'
                    },
                 
                ],
                cityListTwo:[
                    {
                        value: 'USDD',
                        label: 'USDD'
                    },
                ],
                value2:100,
                model3:'USD',
                model4:'USDD',
                currency_token:'',
                account_money:'',
                totalDividend:'',


            }



        },
        methods:{
                requestBankAcount(){//账户余额
                let url = 'https://f.daocoin.money/api/trust_publish/bank_balances?symbol=USDD'
                getApi(url,{}).then((res) =>{
                    if(res.code=='200'){
                         let resdata = res.data;
                         this.currency_token = resdata.currency_number;//token数量
                         this.account_money = resdata.account_customer;//账户余额
                    }else{
                        this.$Message.error(res.code);
                    }

                })

            },
            RequestAlreadyDividend(){//已派发利息
                   getApi(alreadyDividend,{}).then((res) =>{
                    if(res.code){
                        this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                    }else{
                          if(res=={}){
                            this.totalDividend = 0;
                          }else{
                              let alreadyDividendfees = res.totalDividend;
                                this.totalDividend = alreadyDividendfees;
                          }
                         

                       
                    }
                    

                })
            }


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
            this.requestBankAcount()
           this.RequestAlreadyDividend();

        },
        
    }
</script>
<style lang='less'>
    #usdd{
        .ivu-input-wrapper{
            width: 270px;
        }
        .input-text{
            .ivu-input{
            width: 270px;
            height: 50px;
            color: #344857;
            font-size: 16px;
            }
        }
        .ivu-select-selection{
            margin-left: 10px;
            height: 50px;
            line-height: 50px;
            .ivu-select-selected-value{
                height: 48px;
                line-height: 48px;
                font-size: 16px;
                background:rgba(236,238,241,1);
            }
            .ivu-select-placeholder{
                height: 50px;
                font-size: 16px;
                line-height: 50px;
            }
        }
        

    }
</style>

<style scoped lang="less">
    @import './usdd.less';
</style>

