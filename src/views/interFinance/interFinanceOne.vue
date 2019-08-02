<template>
    <div id="interFinance" class="root">
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
                         <Steps :current="0">
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                        </Steps>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div>
                              <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transsendAmount')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='Send'>
                                        <Input :value="yourSend" @on-keyup="checkInputSend" type="number" :maxlength="40" v-model="formValidate.Send" placeholder="">
                                        <Select  @on-change='changeSend' v-model="defaultSendSelect" slot="append" style="width: 80px">
                                               <Option @click.native="SendClick(item.tokenId,item.minnum,item.maxnum)" v-for="item in sendList"  :value="item.tokenCode" :key="item.tokenCode">{{ item.tokenCode }}</Option>
                                        </Select>
                                        </Input>
                                        <p class="rate_tips">{{$t('pay')}}<span>1<em v-html="defaultSendSelect"></em>=<em v-html="rateValue"></em><em v-html="defaultRecieveSelect"></em></span>
                                             <Tooltip max-width="500"  placement="top">
                                                <Icon type="ios-help-circle" />
                                                <div class="tips_content" slot="content">
                                                    <p>{{$t('payinfo')}}</p>
                                                </div>
                                            </Tooltip>
                                        </p>
                                    </FormItem>
                                </div>
                                 <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transRecive')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='Receive'>
                                        <Input :value="yourReceive" @on-keyup="checkInputReceive" type="number" :maxlength="40" v-model="formValidate.Receive" placeholder="">
                                        <Select @on-change='changeRecieve' v-model="defaultRecieveSelect" slot="append" style="width: 80px">
                                               <Option @click.native="receiveClick(item.minnum,item.maxnum,item.receiveCurrencyId,item.currencyEn)"  v-for="item in recieveList" :value="item.currencyEn" :key="item.currencyEn">{{ item.currencyEn }}</Option>
                                        </Select>
                                        </Input>
                                        <p v-html="errorMessage" v-if="!errorFlag" class="rate_tips error_message">2222</p>
                                    </FormItem>
                                </div>
                                 <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transChannel')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='modelChanel'>
                                                <Select v-model="formValidate.modelChanel" style="width:439px">
                                                    <Option @click.native="channelChange(item.receivePaymentId)" v-for="item in receivePaymentList" :value="item.collectionInstitutionEn" :key="item.collectionInstitutionEn">{{ item.collectionInstitutionEn }}</Option>
                                                </Select>
                                    </FormItem>
                                </div>
                                 <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transCountry')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='modelCountry'>
                                      <Select v-model="formValidate.modelCountry" style="width:439px">
                                            <Option @click.native="countryOption(item.id)" v-for="item in countryList" :value="item.enName" :key="item.enName">{{ item.enName }}</Option>
                                    </Select>
                                    </FormItem>
                                
                                </div>
                                 <div class="clearfix ">
                                    <div class="pull-left span-label">
                                        <span></span>
                                    </div>
                                    <FormItem class="form_item pull-left fee">
                                         <div>
                                            <p>{{$t('transsendFee')}} <span v-html="resultRate"></span><em v-html="defaultSendSelect"></em></p>
                                            <p><span>{{$t('transArrT')}}</span><span v-html="minimumList.feeInfoEn"></span></p>
                                        </div>
                                    </FormItem>
                                </div>
                             
                         </div>
                         <div class="button-container clearfix">
                            <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">{{$t('transNext')}}</Button>
                            <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                            <!-- <p v-html="paymentExpiredAt"></p> -->
                        </div>
                    </Form>
                    <timeout :pageMessag='pageMessag'></timeout>
                      
                </div>
                </div>
                </div>

            <Modal
                class-name="kycmodal"
                v-model="modal2"
                :closable="false"
                :mask-closable="false"
                :scrollable='true'
                >
                <p slot="header" style="text-align:center">
                    <span>{{$t('notice')}}</span>
                </p >
                <p class="content">
                    <span>{{$t('transKyc')}}</span>
                </p >
                <p slot="footer">
                <Button @click="completeID">{{$t('confrim')}}</Button>
                </p >
            </Modal>
            
            </div>
        </div>

    </div>
</template>

<script>
import {getRemittanceDict,getCountrys,getFinaceLastRate, realTime,relatNameVerify,commonRemite,kyc, depthList} from '../../../api/urls.js';
import {postHeaderKeyIdBodyApi,getHeaderTokenApi,postHeaderhasKeyIdBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import {BigNumber} from 'bignumber.js';
import {Exchange} from '@/interface/exchange.js'
import { getCreateAccount,getAccountInfo } from '_api/exchange.js'
import {countNumberDown} from '@/lib/utils.js'
import moment, { isMoment } from 'moment'
import timeout from '../../components/timeOut';




import { all } from 'q';

    export default {
        name:'login',
        data() {
              const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    callback();
                }
            };
            return {
                modal2:false,
                loaded:true,
                defaultSendSelect:'',
                defaultRecieveSelect:"",
                pointLong:2,
                yourSend:'',
                yourReceive:'',
                sendList:[],
                recieveList:[],
                receivePaymentList:[],
                minimumList:{},
                countryList:[],
                defalutTokenid:'',//
                defaultCountryId:13,//默认国家；
                defalutPaymentId:'',
                defaultReceiveCurrencyId:'',//收款币种id
                rateValue:'',
                reponseLockid:'',
                sendNumber:'',
                receiveNumber:'',
                lockcoinFlag:true,
                lockBitCoin:'',
                sendMaxlimit:'',
                sendMinlimit:'',
                receiveMaxlimit:'',
                receiveMinLimit:'',
                accountID:'',
                paymentExpiredAt:'--',//支付截止时间倒计时 mm:ss
                payMoneyTimer:null,
                createDate:'',
                aliveTime:0,
                aliveTimeNumber:0,
                errorFlag:true,
                errorMessage:'',
                accountToken:'',
                resultRate:0,
                dict_4_1:'',
                pageMessag:'1',
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    Send:'',
                    Receive:'',
                    modelChanel: '',
                    modelCountry:"",
                },
                queryObj:{},
                ruleValidate: {
                    Send: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    Receive: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    modelChanel: [
                        { validator: validateSms, trigger: 'change' }
                    ],
                    modelCountry: [
                        { validator: validateSms, trigger: 'change' }
                    ],
                    
                },


            }



        },
        components:{
            timeout
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.errorFlag){
                            this.loaded = false;
                            this.localStorageSet()
                            this.verfiy()

                        }
                        
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            kycMethod(){// 实名认证
                    this.getAccountID()
            },
            completeID(){
                 if(this.realnameStatus=='NOT_SET'){
                        this.$router.push('/kyc')
                    }else if(this.realnameStatus=='CHECKING'||this.realnameStatus=='FAILURE'){
                        this.$router.push('/identityResult')
                    }
            },
            verfiy() {
            let loginToken = Cookies.get('loginToken');
            getHeaderTokenApi(relatNameVerify, {}, loginToken).then((res) => {
               let status = res.data.checkStatus;
               this.realnameStatus= status;
               let code = res.data.code;
               if(code){
                   this.loaded = true;
               }
               if(code=='10013'){
                  this.$Notice.error({
                    title: this.$t(196682),
                  });
                  this.$router.push('/login')
                  return
               }
               if (status == 'PASSED') {
                    this.kycMethod()
               }else{
                   this.modal2=true;
               }
            
             
            }).catch((error) => {
               console.log(error)
            })
         },
             checkInputSend(e){
                 let pattern = /[^\d.]/g
                 if(e.target.value=='e'||e.target.value==''||pattern.test(e.target.value)){
                     return false;
                 }
                this.lockcoinFlag = true;
                this.judgeLockBitcoin()
                let footerLength = this.sendMinlimit.split('.')[1].length;
                var regExp = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + footerLength + "}).*$");
                e.target.value = e.target.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                e.target.value = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
                e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
                e.target.value = e.target.value.replace(regExp,'$1$2.$3');//只能输入X个小数  //只能输入两个小数  
                if(e.target.value.indexOf(".")< 0 && e.target.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                    e.target.value= parseFloat(e.target.value); 
                }
                this.formValidate.Receive = parseFloat(new BigNumber(e.target.value).multipliedBy(this.rateValue)).toFixed(2) 
                
            },
               checkInputReceive(e){
                    let pattern = /[^\d.]/g
                    if(e.target.value=='e'||e.target.value==''||pattern.test(parseFloat(e.target.value))){
                        return false;
                    }
                    this.lockcoinFlag = false;
                    this.judgeLockBitcoin()
                    if(parseFloat(e.target.value)>parseFloat(this.receiveMaxlimit)){
                        this.errorFlag = false;
                        this.errorMessage = this.$t('TransWarnAmount1')+this.receiveMaxlimit+this.defaultRecieveSelect;
                    }else if(parseFloat(e.target.value)<parseFloat(this.receiveMinLimit)){
                        this.errorFlag = false;
                        this.errorMessage = this.$t('TransWarnAmount2')+this.receiveMinLimit+this.defaultRecieveSelect;
                       
                    }else{
                        this.errorFlag = true;
                    }
                  var regExp = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + 2 + "}).*$");
                    e.target.value = e.target.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                    e.target.value = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
                    e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
                    e.target.value = e.target.value.replace(regExp,'$1$2.$3');//只能输入X个小数  //只能输入两个小数  
                    if(e.target.value.indexOf(".")< 0 && e.target.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        e.target.value= parseFloat(e.target.value); 
                    }
                     let footerLength = this.sendMinlimit.split('.')[1].length;//判断send的步长

                    this.formValidate.Send = parseFloat(new BigNumber(e.target.value).dividedBy(this.rateValue)).toFixed(footerLength)

                   

            },

            initPage(){
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getRemittanceDict',"params":JSON.stringify({})}).then((res)=>{
                    if(res.message){  
                         this.loaded=true;  
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                    this.sendList = res.data.entity.sendList;
                    this.recieveList = res.data.entity.receiveCurrencyList;
                    this.receivePaymentList = res.data.entity.receivePaymentList;
                    this.formValidate.modelChanel = this.queryObj.account? this.queryObj.account : res.data.entity.receivePaymentList[0].collectionInstitutionEn;//bank
                    this.defalutPaymentId = res.data.entity.receivePaymentList[0].receivePaymentId;
                    this.minimumList = res.data.entity.minimumList[0];
                    this.defalutTokenid = res.data.entity.sendList[0].tokenId;//send的 tokenid
                    this.defaultSendSelect = this.queryObj.coin?this.queryObj.coin : res.data.entity.sendList[0].tokenCode;
                    this.defaultRecieveSelect = res.data.entity.receiveCurrencyList[0].currencyEn;
                    this.sendMaxlimit = res.data.entity.sendList[0].maxnum;
                    this.sendMinlimit = res.data.entity.sendList[0].minnum;
                    this.receiveMaxlimit = res.data.entity.receiveCurrencyList[0].maxnum;
                    this.receiveMinLimit = res.data.entity.receiveCurrencyList[0].minnum;
                    this.defaultReceiveCurrencyId = res.data.entity.receiveCurrencyList[0].receiveCurrencyId;
                    this.getRate(this.defaultSendSelect,this.defaultRecieveSelect,this.defaultCountryId,this.defalutTokenid,this.reponseLockid);// 第一次进页面
                    this.getQueryMessage()
                    this.localStorageSet()
                    this.getCountrys(this.defaultRecieveSelect);
               
                   
                    

                     
                })
            },
            getCountrys(currencyEn){
                let params = {
                    receiveCurrency:currencyEn,
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getCountrys',"params":JSON.stringify(params)}).then((res)=>{
                    if(res.message){
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                    if(res.status=='10001'){
                            this.countryList = res.data.entity;
                            this.defaultCountryId = res.data.entity[0].id;
                            this.formValidate.modelCountry = res.data.entity[0].enName;
                    }
                    
                    
                })
            },
             changeSend(e){
                //  console.log(e)
            },
            SendClick(e,min,max){//发送方
                this.defalutTokenid = e;
                this.getRate(this.defaultSendSelect,this.defaultRecieveSelect,this.defaultCountryId,this.defalutTokenid,'');// 第一次进页面
                this.sendMaxlimit = max;
                this.sendMinlimit = min;
                this.queryObj.count = '';
                this.formValidate.Send = '';
                this.formValidate.Receive = '';
                this.localStorageSet()
            },
            countryOption(e){//国家
                this.defaultCountryId = e;
                 this.getRate(this.defaultSendSelect,this.defaultRecieveSelect,this.defaultCountryId,this.defalutTokenid,'');// 第一次进页面
                this.localStorageSet()

            },
            receiveClick(min,max,id,currencyEn){//接收币🀄
                 this.receiveMaxlimit = max;
                 this.receiveMinLimit = min;
                 this.defaultReceiveCurrencyId = id;
                this.formValidate.Send = '';
                this.formValidate.Receive = '';
                this.getRate(this.defaultSendSelect,this.defaultRecieveSelect,this.defaultCountryId,this.defalutTokenid,'');// 第一次进页面
                this.getCountrys(currencyEn);
                this.localStorageSet()


            },
            channelChange(id){//渠道银行
                    this.defalutPaymentId =  id;
            },
            changeRecieve(e){//收款方
                 console.log(e)
            },
            timeoutMethod(){// 倒计时
                    if(this.aliveTime){
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
                                    this.getRate(this.defaultSendSelect,this.defaultRecieveSelect,this.defaultCountryId,this.defalutTokenid,this.reponseLockid);// 第一次进页面
                                 }
                             }, 1000);
                        }
                    }
            },
            getRate(sendSelect,receiveSelect,countryId,tokenId,lockId){
                 let paramsobj = {
                    symbol : sendSelect+"/"+receiveSelect,
                    countryId :countryId,
                    tokenId :tokenId,
                    lockId : lockId?lockId:'',
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getLastRate',"params":JSON.stringify(paramsobj)}).then((res)=>{
                     if(res.message){    
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                        }
                    this.rateValue = res.data.value.last;
                    this.reponseLockid = res.data.value.lockId;
                    this.createDate = res.data.value.createDate;
                    this.aliveTime = res.data.value.aliveTime;
                    this.dict_4_1 = res.data.value.dict_4_1;
                    this.formValidate.Receive = parseFloat(new BigNumber(this.queryObj.count).multipliedBy(this.rateValue)).toFixed(2) 
                    if(this.queryObj.count==''){
                        this.resultRate=0;
                    }else{
                        this.resultRate = new BigNumber(this.queryObj.count).multipliedBy(this.minimumList.percentRate).plus(this.dict_4_1);
                    }
                    // console.log(localStorage.getItem('dict_4_1'))
                    // localStorage.setItem('rateValue', this.rateValue)
                    // localStorage.setItem('dict_4_1',this.dict_4_1)
                    this.timeoutMethod()

                   
                })
            },
            judgeLockBitcoin(){
                localStorage.setItem('sendCoinName',this.defaultSendSelect)
                localStorage.setItem('receiveMoneyName',this.defaultRecieveSelect)
                if(this.lockcoinFlag){
                     localStorage.setItem('lockbitCoin',0)
                }else{
                     localStorage.setItem('lockbitCoin',1)
                }
            },
            localStorageSet(){
                let localStorageValue = {
                        'countryDictId':this.defaultCountryId,
                        'receiveCurrency':this.defaultRecieveSelect,
                        'collectDictCode':this.defalutPaymentId,
                        'receiveCurrencyId':this.defaultReceiveCurrencyId,
                        'receiveAmount':this.formValidate.Receive,
                        'remittanceType':this.minimumList.waysOfRemittanceId,
                        'tokenCode':this.defaultSendSelect,
                        'sendAmount':this.formValidate.Send,
                        'lockId':this.reponseLockid,
                        'tokenId':this.defalutTokenid,
                }
                localStorage.setItem('saveObject',JSON.stringify(localStorageValue));
            },
            getQueryMessage(){// 获取信息
                        let queryMessage = {
                            account : this.$route.query.account,
                            coin : this.$route.query.coin,
                            count : this.$route.query.count,
                    }
                    this.queryObj = queryMessage;
                    if(Number(queryMessage.count)>0){
                        let pattern = /^[0-9.]*$/g
                        let flag = pattern.test(Number(queryMessage.count))
                        if(flag){
                            let footerLength = this.sendMinlimit.split('.')[1].length;
                            this.formValidate.Send = parseFloat(new BigNumber(queryMessage.count)).toFixed(footerLength);

                        }else{
                            this.formValidate.Send = '';

                        }
                    }else{
                        this.resultRate = 0;
                        this.formValidate.Send = '';

                    }
            },
           async getAccountID(){
                    await getCreateAccount({'ssoToken': Cookies.get('loginToken')}, {}).then(result =>{
                            this.accountToken = result.value
                    } )//accountToken
                    await getAccountInfo({token: this.accountToken}).then(result => {
                        this.accountID = result.accountId
                    })//accountId
                    let params = {
                            level:0,
                            userChannel:1,
                            channelUserId:this.accountID,
                            isKyc:1,
                        }
                        postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/kyc',"params":JSON.stringify(params)}).then((res)=>{
                            if(res.message){   
                                this.loaded = true;
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                            }
                            if(res.status=='10001'){
                                this.$router.push('/interFinanceTWO')
                            } 
                            
                        })




            },
            culateRate(){

            }
           
        },
        computed:{
            inputValidate(){
               return this.formValidate.firstName;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            couputedSendValue(){
                return this.formValidate.Send;
            },
            couputedReceiveValue(){
                return this.formValidate.Receive;
            }
          
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
                 if(val=='zh-CN'){
                     this.chinaPeople = true;
                 }else{
                     this.chinaPeople = false;
                 }
            },
            couputedSendValue(val,oldVal){
                if(val==''){
                    this.formValidate.Receive='';
                    this.resultRate = 0;
                    return false;
                }
                this.resultRate =  new BigNumber(val).multipliedBy(this.minimumList.percentRate).plus(this.dict_4_1)
            },
            couputedReceiveValue(val,oldVal){// 监听收款的值
                if(parseFloat(val)>parseFloat(Number(this.receiveMaxlimit))){
                        this.errorFlag = false;
                        this.errorMessage = this.$t('TransWarnAmount1')+this.receiveMaxlimit+this.defaultRecieveSelect;
                }else if(parseFloat(val)<parseFloat(Number(this.receiveMinLimit))){
                        this.errorMessage = this.$t('TransWarnAmount2')+this.receiveMinLimit+this.defaultRecieveSelect;
                        this.errorFlag = false;
                }else{
                        this.errorFlag = true;
                }
                if(val==''){
                    this.formValidate.Send = ''
                    return false;
                }
            }
            
        },
        mounted(){
            let loginToken =  Cookies.get('loginToken')
            let ssoProvider = {};
            this.exchange = new Exchange(ssoProvider);
            let queryMessage = {
                        account : this.$route.query.account,
                        coin : this.$route.query.coin,
                        count:this.$route.query.count,
                    }
            this.queryObj = queryMessage;
            this.initPage();

            // console.log(this.queryObj)
            
        },
        created(){

        }
        
        
    }
</script>
<style scoped lang="less">
    @import './interFinanceOne.less';
</style>
<style lang='less'>
 .kycmodal{
      .ivu-modal{
         height: 220px;
         .ivu-modal-content{
            height: 100%;
         }
         .content{
            margin-top: 18px;
            text-align: center;
            font-size:14px;
         }
      }
      .ivu-modal-footer{
         text-align: center;
         margin-top: 30px;
          .ivu-btn{
               padding:5px 15px 6px;
               background: #12869A;
               color:#FFFFFF;
            }
      }
     
   }
#interFinance{
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
    .ivu-steps{
        .ivu-steps-head-inner{
            width:40px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
        }
        .ivu-steps-status-process{
            .ivu-steps-head-inner{
             background: #12869A;
            }
        }
    } 
    .ivu-tooltip-inner{
        max-width: 400px;
    }
     .ivu-btn{
         border-radius: 5px !important;
         width: 440px;
         background: #12869A;
         padding: 10px 0px;
         margin-left: 32px;
         &:hover{
             background: #04798c;
         }
     }
     .ivu-form-item{
         margin-bottom: 24px;
     }
     .inner_input_login{
         .ivu-input{
            width: 360px;
            padding-left: 10px;
            // border: solid 1px #E7EAED;
            color: #344857;
            background-color: transparent;
            height: 48px;
         }
     } 
     .ivu-select-item{
         padding: 7px 16px !important;
     }
     .ivu-select-single {
         .ivu-select-selection{
             background: rgba(18,134,154,0.05);
             height: 46px;
             .ivu-select-selected-value{
                 line-height: 46px;
             }
             .ivu-select-placeholder{
                 line-height: 46px;
             }
         }
     }
     .ivu-steps-item{
         .ivu-steps-status-process{
             .ivu-steps-head-inner{
                 background: red;
             }
         }
     } 

     
 

}
   
   
</style>


