<template>
    <div id="interFinancetwo" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="">{{$t('transTittle')}}</router-link>
             </div>  
            <div class="register_wraper">
                 <div class="title">
                        <p>{{$t('transTittle')}}</p>
                </div>
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div  class="inner_input_login">
                    <div v-if="stepflag" class="step">
                         <Steps :current="1">
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                            <Step title="" content=""></Step>
                        </Steps>
                    </div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div>
                              <div v-if="accountHolderName" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transBen')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='Name'>
                                        <Input  type="text"  v-model="formValidate.Name" :placeholder="this.$t('transInputb')"></Input>
                                    </FormItem>
                                </div>
                                <div v-if="BankNameflag||AccountType||accountNumber||swiftCode||IBAN||abartn||BSB" class="clearfix">
                                    <div class="pull-left span-label ">
                                        <span></span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:0px;">
                                        <div class="title_line">{{$t('transReaccd')}}</div>
                                    </FormItem>
                                </div>
                                 <div v-if="BankNameflag" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>Bank Name:</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='BankName'>
                                                <Select v-model="formValidate.BankName" style="width:440px">
                                                    <Option @click.native="changeBankName(item.bankId)" v-for="item in banknameList" :value="item.bankNameEn" :key="item.bankNameEn">{{ item.bankNameEn }}</Option>
                                                </Select>
                                    </FormItem>
                                </div>
                                 <div v-if="AccountType" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transAcctype')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='AccountType'>
                                      <Select v-model="formValidate.AccountType" style="width:440px">
                                                    <Option @click.native="changeAccountType(item.accountTypeId)" v-for="item in accountTypeList" :value="item.accountTypeEn" :key="item.accountTypeEn">{{ item.accountTypeEn }}</Option>
                                                </Select>
                                    </FormItem>
                                </div>
                                <div  v-if="accountNumber" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transsendAcc')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='AccountNumber'>
                                        <Input  type="text"  v-model="formValidate.AccountNumber" :placeholder="this.$t('transInputacc')"></Input>
                                    </FormItem>
                                </div>
                              
                                 <div v-if="swiftCode" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transSw')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='SWIFT'>
                                        <Input  type="text"  v-model="formValidate.SWIFT" :placeholder="this.$t('transInputSWIFT')"></Input>
                                    </FormItem>
                                </div>
                                 <div v-if="IBAN" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transIBAN')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='IBAN'>
                                        <Input  type="text"  v-model="formValidate.IBAN" :placeholder="this.$t('transInputIBAN')"></Input>
                                    </FormItem>
                                </div>
                                 <div v-if="abartn" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transRout')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='RoutingNumber'>
                                        <Input  type="text"  v-model="formValidate.RoutingNumber" :placeholder="this.$t('transInputR')"></Input>
                                    </FormItem>
                                </div>
                                <div v-if="BSB" class="clearfix">
                                        <div class="pull-left span-label">
                                            <span>{{$t('transBSB')}}</span>
                                        </div>
                                        <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='BSB'>
                                            <Input  type="text"  v-model="formValidate.BSB" :placeholder="this.$t('transInputBSB')"></Input>
                                        </FormItem>
                                </div>
                    <!--   第二部分 -->
                                <div v-if='country||city||firstLine||postCode||state||accountHolderMail||accountHolderPhoneNum' class="clearfix">
                                        <div class="pull-left span-label ">
                                            <span></span>
                                        </div>
                                        <FormItem class="form_item pull-left" style="margin-bottom:0px;">
                                            <div class="title_line">{{$t('transAddress')}}
                                                <Tooltip max-width="300"   placement="top">
                                                    <Icon type="ios-help-circle" />
                                                    <div class="tips_content" slot="content">
                                                        <p>For legal reasons, we need to ask for the recipient's address (not the bank's address). Don't worry, they won't get any post from us.</p>
                                                    </div>
                                                </Tooltip>
                                             </div>
                                        </FormItem>
                                </div>
                                <div v-if="country" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReCountry')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='Country'>
                                                <Select v-model="formValidate.Country" style="width:440px">
                                                    <Option @click.native="selcetCountry(item.id)" v-for="item in countryList" :value="item.fullNameEn" :key="item.fullNameEn">{{ item.fullNameEn }}</Option>
                                                </Select>
                                    </FormItem>
                                </div>
                                <div v-if="city" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReCity')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='City'>
                                        <Input  type="text"  v-model="formValidate.City" :placeholder="this.$t('transInputcity')"></Input>
                                    </FormItem>
                                </div>
                                <div v-if="firstLine" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReAdd')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='City'>
                                        <Input  type="text"  v-model="formValidate.Address" :placeholder="this.$t('transInputadd')"></Input>
                                    </FormItem>
                                </div>
                                <div v-if="postCode" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReZIP')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='PostalCode'>
                                        <Input  type="text"  v-model="formValidate.PostalCode" :placeholder="this.$t('transInputzip')"></Input>
                                    </FormItem>
                                </div>
                                 <div v-if="state" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReState')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='State'>
                                                <Select v-model="formValidate.State" style="width:440px">
                                                    <Option @click.native="stateSelect(item.id)" v-for="item in stateList" :value="item.stateFullNameEn" :key="item.stateFullNameEn">{{ item.stateFullNameEn }}</Option>
                                                </Select>
                                    </FormItem>
                                </div>
                                <div v-if="accountHolderMail" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transReMail')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='EmailOptional'>
                                        <Input  type="text"  v-model="formValidate.EmailOptional"  :placeholder="this.$t('transInputem')"></Input>
                                    </FormItem>
                                </div>
                                <div v-if="accountHolderPhoneNum" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('transRePhone')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" style="margin-bottom:24px;" prop='PhoneOptional'>
                                        <Input  type="text"  v-model="formValidate.PhoneOptional"  :placeholder="this.$t('transInputph')"></Input>
                                    </FormItem>
                                </div>
                         </div>
                        <div v-if="buttonflag" class="button-container clearfix">
                                <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">Next</Button>
                                <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                                <!-- <p v-html="paymentExpiredAt"></p> -->
                        </div>
                    </Form>
                    <timeout :pageMessag='pageMessag'></timeout>
                </div>
                </div>
                </div>
                      
            
            </div>
        </div>

    </div>
</template>

<script>
import {gettransferMessage,getTwRecipientCountrys,getTwRecipientState,getBankByCountryNameDict,saveUpdateFormAttr,commonRemite} from '../../../api/urls.js';
import {postHeaderKeyIdBodyApi,postHeaderhasKeyIdBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
// import { defer } from 'q';
import {Exchange} from '@/interface/exchange.js';
import {countNumberDown} from '@/lib/utils.js';
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
             const validateholdersName = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern = /[A-Za-z.]/g
                    if(pattern.test(value)){
                         callback()
                    }else{
                        callback(new Error(this.$t('transInputbW')))

                    }
                   
                }
            };
             const validateNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('numberMust')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };

            return {
                spinShow:true,
                stepflag:false,
                buttonflag:false,
                loaded:true,
                select2:'BTC',
                select3:"BTC",
                pointLong:6,
                arrInput:[],
                accountHolderName:false,
                BankNameflag:false,
                AccountType:false,
                IBAN:false,
                BSB:false,
                abartn:false,
                accountNumber:false,
                swiftCode:false,
                country:false,
                city:false,
                firstLine:false,
                postCode:false,
                state:false,
                accountHolderMail:false,
                accountHolderPhoneNum:false,
                accountNumberID:'',
                swiftCodeID:'',
                accountHolderNameID:'',
                countryID:'',
                cityID:'',
                firstLineID:'',
                postCodeID:'',
                stateID:'',
                accountHolderMailID:'',
                accountHolderPhoneNumID:'',
                BankNameflagID:'',
                AccountTypeID:'',
                IBANID:'',
                abartnID:'',
                BSBID:'',
                countryList:[],
                stateList:[],
                banknameList:[],
                accountTypeList:[],
                infoValues:[],
                stateId:'',
                exchange:null,
                accountID:'',
                reponseLockid:'',
                aliveTime:'',
                payMoneyTimer:null,
                aliveTimeNumber:'',
                paymentExpiredAt:'',
                provinceId:'',
                defaultBankid:'',
                defaultaccountTypeId:"",
                pageMessag:'2',
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    Name:'',
                    BankName: '',
                    AccountType:'',
                    SWIFT:'',
                    IBAN:'',
                    AccountNumber:'',
                    BSB:'',
                    RoutingNumber:"",
                    Country:'',
                    City:'',
                    Address:'',
                    PostalCode:'',
                    State:'',
                    EmailOptional:'',
                    PhoneOptional:'',

                },
                ruleValidate: {
                    Name: [
                        { validator: validateholdersName, trigger: 'blur' }
                    ],
                    BankName: [
                        { validator: validateSms, trigger: 'change' }
                    ],
                    AccountType: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    SWIFT: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    IBAN: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    AccountNumber: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    BSB: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    Country: [
                        { validator: validateSms, trigger: 'change' }
                    ],
                     City: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                     Address: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    PostalCode: [
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    State: [
                        { validator: validateSms, trigger: 'change' }
                    ],
                    RoutingNumber:[
                        { validator: validateSms, trigger: 'blur' }
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
                        this.loaded = false;
                                localStorage.setItem('bankAddressCountryid', this.stateId)
                                let  infoValues = [
                                            {"infoId":this.accountHolderNameID,"infoValue":this.formValidate.Name},
                                            {"infoId":100,"infoValue":this.defaultBankid},//
                                            {"infoId":201,"infoValue":this.defaultaccountTypeId},//
                                            {"infoId":this.accountNumberID,"infoValue":this.formValidate.AccountNumber},
                                            {"infoId":this.swiftCodeID,"infoValue":this.formValidate.SWIFT},
                                            {"infoId":this.IBANID,"infoValue":this.formValidate.IBAN},
                                            {"infoId":this.abartnID,"infoValue":this.formValidate.RoutingNumber},
                                            {"infoId":this.BSBID,"infoValue":this.formValidate.BSB},
                                            {"infoId":406,"infoValue":this.stateId},//
                                            {"infoId":this.cityID,"infoValue":this.formValidate.City},
                                            {"infoId":this.firstLineID,"infoValue":this.formValidate.Address},
                                            {"infoId":this.postCodeID,"infoValue":this.formValidate.PostalCode},
                                            {"infoId":414,"infoValue":this.provinceId},//
                                            {"infoId":this.accountHolderMailID,"infoValue":this.formValidate.EmailOptional},
                                            {"infoId":this.accountHolderPhoneNumID,"infoValue":this.formValidate.PhoneOptional},
                                        ]
                                 this.saveMessage(infoValues)
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
             checkInputQuntity(e){
                var regExp = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + this.pointLong + "}).*$");
                e.target.value = e.target.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
                e.target.value = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
                e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
                e.target.value = e.target.value.replace(regExp,'$1$2.$3');//只能输入X个小数  //只能输入两个小数  
                if(e.target.value.indexOf(".")< 0 && e.target.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                    e.target.value= parseFloat(e.target.value); 
                }
                // this.yourQuntity = e.target.value;
            },
            loading(){
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 30
                                }
                            }),
                            h('div', 'Loading')
                        ])
                    }
                });
            },
            initPage(){
                let obj = JSON.parse(localStorage.getItem('saveObject'))
                let params = {
                    collectDictCode:obj.collectDictCode,
                    countryDictId: obj.countryDictId,
                    receiveCurrency: obj.receiveCurrency,
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getFormAttr',"params":JSON.stringify(params)}).then((res)=>{
                   if(res.message){   
                            this.loaded = true;
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                   this.buttonflag = true;
                    this.stepflag = true;
                    this.spinShow = false;
                    let arr = res.data.entityList;
                    console.log(arr)
                    // console.log()
                    this.arrInput = [];
                    arr.forEach((v,i) =>{
                        this.arrInput.push({infoValue:v.attributeNameEn,infoId:v.id})
                    })
                    // console.log(this.arrInput)
                    this.arrInput.forEach((v,i)=>{
                         if(v.infoValue=='accountNumber'){
                             this.accountNumber = true;
                             this.accountNumberID = v.infoId;
                         }else if(v.infoValue=='swiftCode'){
                             this.swiftCode = true;
                             this.swiftCodeID = v.infoId;
                         }else if(v.infoValue=='accountHolderName'){
                             this.accountHolderName = true;
                             this.accountHolderNameID = v.infoId;
                         }else if(v.infoValue=='country'){
                             this.country = true;
                             this.countryID = v.infoId;
                         }else if(v.infoValue=='city'){
                             this.city = true;
                             this.cityID = v.infoId;
                         }else if(v.infoValue=='firstLine'){
                             this.firstLine = true;
                             this.firstLineID = v.infoId;
                         }else if(v.infoValue=='postCode'){
                             this.postCode = true;
                             this.postCodeID = v.infoId;
                         }else if(v.infoValue=='state'){
                             this.stateID = v.infoId;
                         }else if(v.infoValue=='accountHolderMail'){
                             this.accountHolderMail = true;
                             this.accountHolderMailID = v.infoId;
                         }else if(v.infoValue=='accountHolderPhoneNum'){
                             this.accountHolderPhoneNum =true;
                             this.accountHolderPhoneNumID = v.infoId;
                         }else if(v.infoValue=='Bank-Name'){
                             this.BankNameflag = true
                             this.BankNameflagID = v.infoId;
                         }else if(v.infoValue=="accountType"){
                             this.AccountType = true;
                             this.AccountTypeID = v.infoId;
                         }else if(v.infoValue=='IBAN'){
                             this.IBAN = true;
                             this.IBANID = v.infoId;
                         }else if(v.infoValue=='abartn'){//Routing Numbe
                             this.abartn = true;
                             this.abartnID = v.infoId;
                         }else if(v.infoValue=='bsbCode'){
                             this.BSB = true;
                             this.BSBID = v.infoId;
                         }
                       
                        
                    })

                   
                })
            },
            getCountrys(){//国家
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getTwRecipientCountrys',"params":JSON.stringify({})}).then((res)=>{
                      if(res.message){   
                           this.loaded = true 
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                    this.countryList = res.data.entity;
                    //  this.formValidate.Country  = res.data.entity[0].fullNameEn;
                     this.stateId  = res.data.entity[0].id;
                })
            },
            stateSelect(id){
                 this.provinceId = id;
            },
            getState(countryId){//州
                let params = {
                    countryId:countryId
                }
                 postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/getTwRecipientState',"params":JSON.stringify(params)}).then((res)=>{
                       if(res.message){    
                           this.loaded = true
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                     this.stateList = res.data.entity;
                     console.log(this.stateList)
                    this.provinceId = res.data.entity[0].id;
                })
            },
            selcetCountry(id){//选择国家方法
                    this.stateId = id;
                 if(id=='tw_12'||id=='tw_201'){// 美国和澳大利亚才有州
                        this.getState(id)//调用州的方法
                        this.state = true;
                    }else{
                        this.state = false;
                        // this.getState(id)
                    }
                
            },
            getBankName(countryId){
                 let obj = JSON.parse(localStorage.getItem('saveObject'))
                let params = {
                    countryId:obj.countryDictId
                }
                postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getBankByCountryNameDict',"params":JSON.stringify(params)}).then((res)=>{
                     if(res.message){    
                         this.loaded = true
                            this.$Notice.error({
                                title: this.$t('transfer'+res.message),
                                desc:this.$t('transfer'+res.message)
                            });
                    }
                   this.banknameList = res.data.entity.sendList;
                   this.defaultBankid = res.data.entity.sendList[0].bankId;
                   this.accountTypeList = res.data.entity.receiveCurrencyList;
                   this.defaultaccountTypeId = res.data.entity.receiveCurrencyList[0].accountTypeId;
                    console.log(this.accountTypeList)
                    // this.formValidate.BankName = res.data.entity.sendList[0].bankNameEn;
                    // this.formValidate.AccountType = res.data.entity.receiveCurrencyList[0].accountTypeEn;
                })
            },
            changeBankName(id){
                     this.defaultBankid = id;
            },
            changeAccountType(id){
                    this.defaultaccountTypeId = id;
            },
            //   timeoutMethod(){// 倒计时
            //         if(this.aliveTime){
            //             if(!this.payMoneyTimer){
            //                 this.aliveTimeNumber  = this.aliveTime/1000;
            //                  this.payMoneyTimer = setInterval(() => {
            //                      let second =  this.aliveTimeNumber--;
            //                      let obj = countNumberDown(second)
            //                      if(obj.second>=0){
            //                          this.paymentExpiredAt = obj.minutes+":"+obj.second;
            //                      }else{//如果倒计时结束后
            //                          clearInterval(this.payMoneyTimer)
            //                          this.payMoneyTimer = null;
            //                         let obj = JSON.parse(localStorage.getItem('saveObject'))
            //                         this.getRate(obj.tokenCode,obj.receiveCurrency,obj.countryDictId,obj.tokenId,this.reponseLockid);// 第一次进页面
            //                      }
            //                  }, 1000);
            //             }
            //         }
            // },
            //  getRate(sendSelect,receiveSelect,countryId,tokenId,lockId){
            //      let paramsobj = {
            //         symbol : sendSelect+"/"+receiveSelect,
            //         countryId :countryId,
            //         tokenId :tokenId,
            //         lockId : lockId?lockId:'',
            //     }
            //     postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/getLastRate',"params":JSON.stringify(paramsobj)}).then((res)=>{
            //          if(res.message){    
            //                     this.loaded = true; 
            //                 this.$Notice.error({
            //                     title: this.$t(res.message),
            //                     desc:this.$t(res.message)
            //                 });
            //         }
            //        this.reponseLockid = res.data.value.lockId;
            //         this.aliveTime = res.data.value.aliveTime;
                   
            //     })
            // },
            saveMessage(info){
                        let getAccountId = new Promise((resolve) => {
                        this.exchange.getAccountId(function (result) {
                            this.accountID = result;
                            let obj = JSON.parse(localStorage.getItem('saveObject'))
                            let params = {
                                collectDictCode:obj.collectDictCode,
                                countryDictId:obj.countryDictId,
                                receiveCurrency:obj.receiveCurrency,
                                infoValues:info,
                                channelUserId: this.accountID
                            }
                        postHeaderKeyIdBodyApi(commonRemite,{"url":'/api/pay/remtrade/saveUpdateFormAttr',"params":JSON.stringify(params)}).then((res)=>{
                            if(res.message){   
                                this.loaded = true; 
                                this.$Notice.error({
                                    title: this.$t('transfer'+res.message),
                                    desc:this.$t('transfer'+res.message)
                                });
                            }
                            let id = res.data.id;
                            localStorage.setItem('originId',id)
                            if(id){
                                this.$router.push('/interFinanceThree')
                            }
                            
                        }).catch((res)=>{
                                this.loaded = true; 
                            console.log(res)
                        })

                        }.bind(this))
                        })
                         
            }
           
        },
        computed:{
            inputValidate(){
               return this.formValidate.firstName;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
          
           
            
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
            
        },
        mounted(){
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
             this.getCountrys();
             this.getBankName();
           
        },
        created(){
            this.initPage();
        }
        
        
    }
</script>
<style scoped lang="less">
    @import './interFinanceTWO.less';
</style>
<style lang='less'>
#interFinancetwo{
    .ivu-tooltip-inner{
        .tips_content{
            p{
            color: #fff;

            }
        }
    }
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
            width: 440px;
            padding-left: 10px;
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

     
 

}
   
   
</style>


