<template>
    <div style="display:inline-block;" class="timeout">
        <span v-if="pageMessag==3" v-html="paymentExpiredAt"></span>
    </div>
</template>

<script>
    import {countNumberDown} from '@/lib/utils.js';
    import {postHeaderKeyIdBodyApi} from '../../api/axios.js';
    import {commonRemite} from '../../api/urls.js';

    export default {
        name:'sendBtn',
        props:{
             pageMessag:String,
             timecount:Number
        },
        data() {
            return {
                paymentExpiredAt:'--',//支付截止时间倒计时 mm:ss
                payMoneyTimer:null,
                aliveTime:0,
                aliveTimeNumber:0,
                reponseLockid:'',
                aliveTime:'',
            }
        },
        methods: {
             timeoutMethod(){// 倒计时
                        if(!this.payMoneyTimer){
                                this.aliveTimeNumber  = this.aliveTime/1000;
                             this.payMoneyTimer = setInterval(() => {
                                 let second =  this.aliveTimeNumber--;
                                 let obj = countNumberDown(second)
                                 if(obj.second>=0){
                                     this.paymentExpiredAt = obj.minutes+":"+obj.second;
                                 }else{//如果倒计时结束后
                                     clearInterval(this.payMoneyTimer)
                                     this.payMoneyTimer = null;
                                     if(this.pageMessag==3){
                                         this.$emit('popup');
                                        clearInterval(this.payMoneyTimer);
                                     }
                                     localStorage.removeItem('reponselockid');
                                     localStorage.setItem('newestId',this.reponseLockid)
                                    let obj = JSON.parse(localStorage.getItem('saveObject'))
                                    this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,this.reponseLockid);
                                 }
                             }, 1000);
                        }
            },
            getRate(sendSelect,receiveSelect,countryId,tokenId,lockId){
                // debugger
                 let paramsobj = {
                    symbol : sendSelect+"/"+receiveSelect,
                    countryId :countryId,
                    tokenId :tokenId,
                    lockId : lockId?lockId:'',
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getLastRate',"params":JSON.stringify(paramsobj)}).then((res)=>{
                     if(res.message){    
                            this.$Notice.error({
                                title: this.$t(res.message),
                                desc:this.$t(res.message)
                            });
                        }
                    this.reponseLockid = res.data.value.lockId;
                    this.aliveTime = res.data.value.aliveTime;
                    this.timeoutMethod()
                    localStorage.setItem('reponselockid',this.reponseLockid)//第一次下来就存储lockid
                  
                   
                })
            },
        },
        computed:{
            
        },
        watch:{
           
        },
        mounted() {
            let obj = JSON.parse(localStorage.getItem('saveObject'))
            if(this.pageMessag==1){
                 this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,'');//  第一次
            }else{
                // console.log('222')
                let reponselockid = localStorage.getItem('reponselockid');
                let newestId = localStorage.getItem('newestId');
                let resultid = reponselockid?reponselockid:newestId;//优先取responsedlockID，如果没有的话取最新的newsetid
                this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,resultid);
            }
        }
    }
</script>
