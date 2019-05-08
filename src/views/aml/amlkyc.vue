<template>
    <div id="amlkyc" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <span>{{$t('kyc2level')}}</span><em>{{$t('kyc2Notic2')}}</em>
             </div>
            <div class="register_wraper">
                <div class="title_line">{{$t('kyc2Basic')}}</div>
                <div class="inner_input_login">
                     <Form class="form-item" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <section class="section_one">
                              <div class="country_origin">
                                <div class="span-label">
                                    <span>{{$t('sfrzCountry')}}</span>
                                </div>
                                        <div class="Nationality">
                                            <div>
                                                <div style="width:500px;">
                                                    <em v-html="countryName" class="code"></em>
                                                </div>
                                            </div>
                                        </div>
                             </div>
                        <div class="clearfix name_content">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzFirstName')}}</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                  <Input :disabled='true' :maxlength="50" type="text" v-model="formValidate.firstName" ></Input>
                                    <span style="margin-left:14px;">{{$t('sfrzLastName')}}</span>
                                 <Input :disabled='true' :maxlength="50" v-model="formValidate.lastName" ></Input>
                            </FormItem>
                         </div>
                        <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzGender')}}</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                <RadioGroup v-model="gender">
                                        <Radio disabled label="MALE">
                                             <span>{{$t('sfrzMale')}}</span>
                                        </Radio>
                                        <Radio  disabled label="FEMALE">
                                             <span>{{$t('sfrzFemale')}}</span>
                                        </Radio>
                                </RadioGroup>
                            </FormItem>
                         </div>
                         <div class="clearfix date_picker">
                             <div class="pull-left span-label">
                                <span>{{$t('kyc2Birth')}}</span>
                            </div>
                            <FormItem class="form_item pull-left radio" prop='date_time'>
                                 <Row>
                                    <Col span="12">
                                        <DatePicker :options="optionsBirth" @on-change='dateValueBirthday' format="yyyy-MM-dd" v-model="formValidate.date_time" type="date" :placeholder="this.$t('kyc2selectDate')" style="width: 200px"></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                         </div>
                          <div  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Mail')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='email'>
                                    <Input :maxlength="50" type="text" v-model="formValidate.email" :placeholder="this.$t('kyc2Mailinput')"></Input>
                                </FormItem>
                        </div>
                         <div class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Phone')}}</span>
                                </div>
                               <FormItem class="form_item phone_item pull-left" prop='phoneNumber'>
                                    <div class="country_container">
                                        <div @click="controlSelect">
                                            <input type="hidden">
                                            <div>
                                                <em  class="code">+{{countryNumber}}</em>
                                                <Icon v-show="!selectFlag" type="ios-arrow-down" />
                                                <Icon v-show="selectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="500" mode="out-in"  name='fade'>
                                            <div v-show="selectFlag" class="select_dropdown">
                                                <ul class="select_down_list">
                                                    <li @click="chooseCountry(item.code,item.locale)" v-for="item in ossCountryJSON" :value="item.label"  :label="item.label">
                                                        <div>
                                                            <img class="flag" :src="item.image"></img>
                                                            <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                        </div>
                                                        <span v-html="item.code"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </transition>
                                    </div>
                                    <Input  type="text"  :maxlength="15" v-model="formValidate.phoneNumber"  :placeholder="$t('kyc2Phoneinput')"></Input>
                                </FormItem>
                         </div>
                         </section>
                        <div class="title_line address">{{$t('kyc2Address')}}</div>
                        <section class="section_two">
                            <div class="clearfix">
                             <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr')}}</span>
                                </div>
                                <FormItem class="form_item pull-left radio">
                                    <RadioGroup v-model="Address">
                                            <Radio label="HOME">
                                                <span>{{$t('kyc2Addr1')}}</span>
                                            </Radio>
                                            <Radio label="COMPANY">
                                                <span>{{$t('kyc2Addr2')}}</span>
                                            </Radio>
                                    </RadioGroup>
                                </FormItem>
                            </div>
                                <div class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr3')}}</span>
                                </div>
                                <FormItem class="form_item pull-left">
                                        <div class="country_container residence_country">
                                            <div @click="controlSelectResidence">
                                                <input type="hidden">
                                                <div>
                                                    <em v-html="countryNumberResidence" class="code"></em>
                                                    <Icon v-show="!selectFlagResidence" type="ios-arrow-down" />
                                                    <Icon v-show="selectFlagResidence" type="ios-arrow-up" />
                                                </div>
                                            </div>
                                            <transition :duration="500" mode="out-in"  name='fade'>
                                                <div v-show="selectFlagResidence" class="select_dropdown">
                                                    <ul class="select_down_list">
                                                        <li @click="chooseCountryResidence(item.en,item.locale)" v-for="item in ossCountryJSON" :value="item.label"  :label="item.label">
                                                            <div>
                                                                <img class="flag" :src="item.image"></img>
                                                                <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                            </div>
                                                            <span v-html="item.code"></span>
                                                        </li>
                                                    </ul>
                                                    </div>
                                            </transition>
                                        </div>
                                    </FormItem>
                            </div>
                            <div  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr4')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='Street'>
                                    <Input :maxlength="300" type="text" v-model="formValidate.Street" placeholder="e.g. 383 Lafayette Street, Suite 201"></Input>
                                </FormItem>
                             </div>
                              <div  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr5')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='City'>
                                    <Input :maxlength="100" type="text" v-model="formValidate.City" placeholder="e.g. New York"></Input>
                                </FormItem>
                             </div>
                              <div v-if="Rigionflag"  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr6')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='Rigion'>
                                    <Input :maxlength="2" type="text" v-model="formValidate.Rigion" placeholder="e.g. NY"></Input>
                                </FormItem>
                             </div>
                             <div v-if="Rigionflag"  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr7')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='Postalcode'>
                                    <Input :maxlength="5" type="text" v-model="formValidate.Postalcode" placeholder="e.g. 12345"></Input>
                                </FormItem>
                             </div>
                              <div  class="Address_certificate">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2Addr7address')}}</span>
                                </div>
                                <FormItem  prop="uploadArr"> 
                                   <Upload  
                                    ref="upload"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :before-upload='beforeUpload'
                                    :format="['jpg','jpeg','png','PDF','pdf']"
                                    :max-size="1024"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :headers="headerObj"
                                    :action="uploadUrl"
                                    >
                                    <Button style="padding: 5px 15px 6px;" icon="ios-cloud-upload-outline">Upload files</Button>
                                   </Upload>
                                </FormItem>
                                
                                 
                             </div>
                             <div class="upload_tips">
                                    <p>{{$t('kyc2AddrCont1')}}</p>
                                    <p>{{$t('kyc2AddrCont2')}}</p>
                                    <p>{{$t('kyc2AddrCont3')}}</p>
                            </div>
                        </section>
                        <div class="title_line address">{{$t('kyc2Tax')}}</div>
                        <section class="section_Tax">
                                 <div class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('kyc2Taxconutry')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left">
                                            <div class="country_container residence_country">
                                                <div @click="controlSelectTaxation">
                                                    <input type="hidden">
                                                    <div>
                                                        <em v-html="countryNumberTaxation" class="code"></em>
                                                        <Icon v-show="!selectFlagTaxation" type="ios-arrow-down" />
                                                        <Icon v-show="selectFlagTaxation" type="ios-arrow-up" />
                                                    </div>
                                                </div>
                                                <transition :duration="500" mode="out-in"  name='fade'>
                                                    <div v-show="selectFlagTaxation" class="select_dropdown">
                                                        <ul class="select_down_list">
                                                        <li @click="chooseCountryTaxation(item.en,item.locale)" v-for="item in ossCountryJSON" :value="item.label"  :label="item.label">
                                                            <div>
                                                                <img class="flag" :src="item.image"></img>
                                                                <span style="color:#000;margin-left:10px;"  v-html="item.en"></span>
                                                            </div>
                                                            <span v-html="item.code"></span>
                                                        </li>
                                                        </ul>
                                                        </div>
                                                </transition>
                                            </div>
                                        </FormItem>
                                </div>
                                 <div v-if="taxidFlag" class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('kyc2TaxID')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='PassportNumber'>
                                        <Input :maxlength="9" type="text" v-model="formValidate.PassportNumber" :placeholder="this.$t('kyc2TaxIDinput')"></Input>
                                    </FormItem>
                                </div>
                                 <div v-else  class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('kyc2TaxIDNo')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='TaxId'>
                                        <Input :maxlength="9" type="text" v-model="formValidate.TaxId" :placeholder="this.$t('kyc2TaxIDNoinput')"></Input>
                                    </FormItem>
                                </div>
                        </section>
                        <div class="title_line address">{{$t('kyc2IDinfo')}}</div>
                        <section class="section_infomation">
                            <div class="clearfix">
                             <div class="pull-left span-label">
                                    <span>{{$t('kyc2IDType')}}</span>
                                </div>
                                <FormItem class="form_item pull-left radio">
                                    <RadioGroup  v-model="passportType">
                                            <Radio disabled label="CARD">
                                                <span>{{$t('kyc2IDname1')}}</span>
                                            </Radio>
                                            <Radio disabled label="PASSPORT">
                                                <span>{{$t('kyc2IDname2')}}</span>
                                            </Radio>
                                    </RadioGroup>
                                </FormItem>
                            </div>
                            <div v-if="CARD"  class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('kyc2IDNo')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='IDNumber'>
                                        <Input disabled :maxlength="30" type="text" v-model="formValidate.IDNumber" placeholder=""></Input>
                                    </FormItem>
                            </div>
                            <div v-else  class="clearfix">
                                    <div class="pull-left span-label">
                                        <span>{{$t('kyc2TaxID')}}</span>
                                    </div>
                                    <FormItem class="form_item pull-left" prop='PassportTwo'>
                                        <Input disabled :maxlength="9" type="text" v-model="formValidate.PassportTwo" placeholder=""></Input>
                                    </FormItem>
                            </div>
                             <div class="clearfix date_picker">
                                <div class="pull-left span-label">
                                    <span>{{$t('kyc2IDEX')}}</span>
                                </div>
                                <FormItem class="form_item pull-left radio" prop='expireDate'>
                                    <Row>
                                        <Col span="12">
                                            <DatePicker :options='optionsExpired' v-model="formValidate.expireDate" @on-change='expireDate' type="date" :placeholder="this.$t('kyc2selectDate')" style="width: 200px"></DatePicker>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        </section>
                    </Form>
                    
                </div>
                        <div class="button-container clearfix">
                            <Button  :loading='!loaded' class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">
                                <span v-if="loaded">{{$t("zhmmResetSubmit")}}</span>
                            </Button>
                        </div>
                        
            
            
            
            </div>
        </div>
        <Modal
                class-name="lv_modal"
                v-model="modal2"
                :closable="false"
                :mask-closable="false"
                >
                <p slot="header" style="text-align:center">
                    <span>{{$t('notice')}}</span>
                </p>
                <p class="content">
                    {{$t('kyc1Notice')}}
                </p>
                <p slot="footer">
                <Button @click="completeID">{{$t('kyc1NoticeConfirm')}}</Button>
                </p>
            </Modal>

    </div>
</template>

<script>
import {countrylist} from '../identity/country.js'
import {uploadPic,identifyPhoto,identify,userInfo,relatNameVerify,amlsubmiit,amlqueryInfo} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getApi,getHeaderTokenApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import {realNameMethod} from '../../../api/exchange.js';
import moment from 'moment';
    export default {
        name:'aml',
        data() {
              const validateNumberandWord = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern =/^[A-Z]{1}[0-9]{8}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('kyc28upperletter')))
                    }else{
                        
                    }
                    callback()
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/[^\d*]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('numberMust')))
                    }else{
                        
                    }
                    callback()
                    
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
             const validatUpperLetter = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                    let pattern =/^[A-Z]{2}$/;
                    if(pattern.test(value)){
                        callback()
                    }else{
                        callback(new Error(this.$t('kyc2upperletter')))
                    }
                    
                } 
                callback()
            };
           
                const validateSms = (rule,value,callback) => {//通用必填项提示语
                    if(value === ''){
                        callback(new Error(this.$t('phoneNumberRequier')))
                    }else{
                        callback()
                    }
                };
                // const validateUpload = (rule, value, callback) => {
                //     if(this.uploadList && this.uploadList.length === 0) {
                //         callback(new Error('请上传logo'))
                //     } else {
                //         callback()
                //     }
                // }
                const validateEmail = (rule, value, callback) => {
                if (value === ''||value ==undefined) {
                    callback(new Error(this.$t('phoneNumberRequier')));
                } else{
                  let pattern = /^[a-zA-Z0-9_.*-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    if(!pattern.test(value)){
                        callback(new Error(this.$t('emailMustExg')))
                    }else{
                        
                    }
                    callback()
                    
                } 
            };
            return {
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    firstName:'',
                    passPort:'',
                    idCard:'',
                    lastName:'',
                    Street:'',
                    City:'',
                    Rigion:'',
                    Postalcode:'',
                    email:'',
                    date_time:'',
                    phoneNumber:'',
                    PassportNumber:'',
                    TaxId:'',
                    PassportTwo:'',
                    IDNumber:'',
                    uploadArr:[],
                    expireDate:''
                    // Passport:'',
                    
                },
                visible: false,
                headerObj:{
                    token:Cookies.get('loginToken')
                },
                uploadUrl:"",
                fileUrl:"",
                ossJSON:[],
                countryNumber:"",
                countryCode:"",
                countryNumberResidence:'',
                tpCountryresdence:'',
                countryNumberTaxation:'',
                emailAddress:'',
                phoneNumber:'',
                loaded:true,
                gender:'',
                Address:"HOME",
                selectFlag:false,
                selectFlagResidence:false,
                selectFlagTaxation:false,
                // cityList:[],
                passportType:'',
                PASSPORT:false,
                CARD:true,
                ruleValidate: {
                    phoneNumber:[
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    passPort: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    idCard:[
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    email:[
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    date_time:[
                         { validator: validateSms, trigger: 'blur' }
                    ],
                    Street:[
                         { validator: validateSms, trigger: 'blur' }
                    ],
                    City:[
                         { validator: validateSms, trigger: 'blur' }
                    ],
                    Rigion:[
                         { validator: validatUpperLetter, trigger: 'blur' }
                    ],
                    Postalcode:[
                         { validator: validateNumber, trigger: 'blur' }
                    ],
                    TaxId:[
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    PassportNumber:[
                        { validator: validateNumberandWord, trigger: 'blur' }
                    ],
                    expireDate:[
                         { validator: validateSms, trigger: 'blur' }
                    ]
                    // uploadArr: [
                    //     { required: true, validator:validateUpload, type: 'array', min: 1, trigger: 'blur' },
                    // ],
                   
                },
                chinaPeople:true,
                ossCountryJSON:[],
                Rigionflag:false,
                countryName:'',
                taxidFlag:true,
                modal2:false,
                locale:'',
                // shortCountryName:'',
                taxCountry:'',
                uploadList:[],
                urlPath:'',
                imgFilePath:'',
                expireIdDate:'',
                dateBirthday:'',
                selfSelectPassportorTaxid:'',
                optionsBirth:{
                    disabledDate(date){
                        return date && date.valueOf() > moment(new Date()).valueOf()
                    }
                },
                 optionsExpired:{
                    disabledDate(date){
                        return date && date.valueOf() < moment(new Date()).valueOf()
                    }
                }
            }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.$refs.upload.fileList&&this.$refs.upload.fileList.length>0){
                            this.loaded=false;
                            this.sumbitL2verify(Cookies.get('loginToken'))
                        }else{
                                this.$Notice.error({
                                        title: this.$t('kyc2AddresCertificate'),
                                        desc: this.$t('kyc2AddresCertificate')
                                });
                        }
                        
                      
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
             getRealNameIdentify(token){
                getHeaderTokenApi(identify,{},token).then((res) =>{
                    if(res.data.code=='10013'){
                        this.$Message.error('授权不通过，请重新登录');
                        this.$router.push('/login')
                    }
                    this.formValidate.firstName = res.data.firstName;
                    this.formValidate.lastName = res.data.lastName;
                    this.passportType = res.data.proofType;//类型
                    if(this.passportType=='VALID_IDENTITY_CARD'){
                            this.passportType = 'CARD';
                    }else{
                         this.passportType = 'PASSPORT';
                    }
                    this.formValidate.IDNumber = res.data.proofId;//身份证号
                    this.formValidate.PassportTwo = res.data.proofId//护照号
                    this.gender = res.data.gender;
                    this.whichCountry = res.data.countryCode;
                     let identifyFlag = res.data.checkStatus;
                    if(identifyFlag=='PASSED'){// 如果l1的实名认证通过了，就可以展示aml的实名认证了
                        this.modal2 = false;
                    }else{
                        this.modal2 = true;
                    }
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    res.forEach(item => {
                            if(item.code== this.whichCountry){
                                this.locale = item.locale;
                               if(localStorage.getItem('countryLanguage')=='zh-CN'){
                                    this.countryName = item.zh;
                               }else{
                                    this.countryName = item.en;
                               }

                            }
                    });
                })
                }).catch((res) =>{
                    console.log(res)
                })
            },
            dateValueBirthday(value){
                this.dateBirthday = moment(value).valueOf();
            },
            expireDate(value){
                this.expireIdDate = moment(value).valueOf();
            },
            getUserInfo(token) {
                postHeaderTokenBodyApi(userInfo, token, {}).then((res) => {
               if (res.code) {
                  this.$Notice.error({
                                title: this.$t(res.code),
                                desc:this.$t(res.code)
                         });
                  if (res.code == '10013') {
                     this.$Notice.error({
                                title: this.$t(res.code),
                                desc:this.$t(res.code)
                         });
                     this.$store.commit('changeLoingStatus', false);
                     setTimeout(() => {
                        this.$router.push('/login');
                     }, 2000);
                  }
               } else {
                this.formValidate.email = res.email;
                this.formValidate.phoneNumber = res.phone;
               }


            }).catch((res) => {

            })
         },
         sumbitL2verify(token){
             let params = {
                    "nationality": this.locale,
                    "firstName": this.formValidate.firstName,
                    "lastName": this.formValidate.lastName,
                    "tpGender": this.gender,
                    "birthday": this.dateBirthday,
                    "tpEmail": this.formValidate.email,
                    "tpItc": this.countryNumber,
                    "tpPhone": this.formValidate.phoneNumber,
                    "addressType": this.Address,
                    "tpCountry": this.tpCountryresdence, //
                    "tpStreet": this.formValidate.Street,
                    "tpCity": this.formValidate.City,
                    "usRegion":this.formValidate.Rigion,
                    'usPostalcode':this.formValidate.Postalcode,
                    "addressCertificate": this.imgFilePath,
                    "taxCountry": this.taxCountry,//
                    "passport": this.selfSelectPassportorTaxid,
                    "identifyType": this.passportType,
                    "identifyId": this.formValidate.IDNumber==''?this.formValidate.PassportTwo:this.formValidate.IDNumber,
                    "identifyExpire":this.expireIdDate,

             }
                postHeaderTokenBodyApi(amlsubmiit,token,params).then((res)=>{
                    if(res.result){
                        this.$router.push('amlkycResult')
                    }else if(res.code){
                        this.loaded = true;
                        this.$Notice.error({
                                title: this.$t(res.code),
                                desc:this.$t(res.code)
                         });
                    }
                }).catch((error)=>{
                        this.loaded = true;
                })
         },
        completeID(){
                let loginToken = Cookies.get('loginToken');
                getHeaderTokenApi(relatNameVerify, {}, loginToken).then((res) => {
                let status = res.data.checkStatus;
                let code = res.data.code;
                if(code=='10013'){
                  this.$Notice.error({
                    title: this.$t(196682),
                  });
                  this.$router.push('/login')
                  return
               }
               if (status == 'NOT_SET') {
                  this.$router.push('/identiy')
               } else {
                  this.$router.push('/identityResult')
               }

            })
         },
         cancelModal(){
            this.modal2 = false;
         },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
            },
            controlSelectResidence(){
                this.selectFlagResidence = !this.selectFlagResidence;
            },
            controlSelectTaxation(){
                this.selectFlagTaxation = !this.selectFlagTaxation;
            },
            chooseCountry(name,code){
                this.selectFlag = false;
                this.countryNumber = name;
            },
            chooseCountryResidence(name,locale){
                this.selectFlagResidence = false;
                this.countryNumberResidence = name;
                this.tpCountryresdence = locale;
            },
            chooseCountryTaxation(name,locale){
                this.selectFlagTaxation = false;
                this.countryNumberTaxation = name;
                this.taxCountry = locale;
            },
             handleClose(e) {
                this.selectFlag = false;
            },
            beforeUpload(value){
                 this.uploadList = this.$refs.upload.fileList.splice(this.$refs.upload.fileList.length-1,this.$refs.upload.fileList.length);
            },
            handleSuccess (res, file) {
                let fileUrl = res.filePath;
                this.imgFilePath = res.filePath;
                if(res.code){
                    this.$Notice.error({
                        title: this.$t(res.code),
                        desc:this.$t(res.code)
                    });
                }
            },
            handleError(error, file, fileList){
                   this.$Notice.error({
                     title: this.$t('invalidFormate'),
                    desc:this.$t(error.response.code)
                });

            },
            handleFormatError (file) {
                  this.$Notice.error({
                    title: this.$t('invalidFormate'),
                    desc: this.$t('invalidFormate')
                });
            },
        
            handleMaxSize (file) {
                 this.$Notice.error({
                     title:this.$t('picIsToolarge'),
                    desc: this.$t('picIsToolarge')
                });
            },
         
            getOSSjson(){
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    this.ossJSON = res;
                })
            },
            getOssCountryJson(){
                getApi('https://oss.55gm.co/content/country/55-country.json',{}).then((res)=>{
                    this.ossCountryJSON = res;
                })
            },
            interFunc(){
                 var _this = this;
			    document.onkeydown = function(e) {
                //1.规避页面上方的搜索框等是否获取了焦点，是则不触发本次快捷键
				var inputs = document.getElementsByClassName('isfocus_enter'); //找到这一组元素
				//是否获取了焦点的判断
				let hasFocus = false;
				if(inputs && inputs.length >0){
					for(let i=0;i<inputs.length;i++){
						//如果hasFocus为true表示input元素获得焦点，否则没有获得焦点
						hasFocus = document.hasFocus() && document.activeElement === inputs[i];
						if(hasFocus == true){
							break;
						}
					}
				}
			     //console.log("判断不该获取焦点的元素是否获取了焦点（isfocus_enter）:%s",hasFocus);
						var key = window.event.keyCode;
						// console.log("按键：%s",key);
						if (key == 13) {
							_this.handleSubmit('formValidate') //此方法是当按下enter键后要做的动作。
						}
						
			    }
            }
           
        },
        computed:{
            inputValidate(){
               return this.formValidate.firstName;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
            taxIDinput(){
                return this.formValidate.TaxId;
            },
            passportInput(){
                return this.formValidate.PassportNumber;
            }
          
          
           
            
        },
        watch:{
            taxIDinput(val,oldVal){
                this.selfSelectPassportorTaxid = val;
            },
            passportInput(val,oldVal){
                this.selfSelectPassportorTaxid = val;
            },
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
            },
            passportType(val,oldVal){
                if(val=='CARD'){
                    this.CARD=true;
                    this.PASSPORT=false;
                }else{
                    this.PASSPORT=true;
                    this.CARD=false;
                }
            },
            tpCountryresdence(val,oldVal){
                if(val=='US'){
                    this.Rigionflag = true;
                }else{
                    this.Rigionflag = false;
                }
            },
            taxCountry(val,oldVal){
                if(val=='US'){
                    this.taxidFlag = false;
                }else{
                    this.taxidFlag = true;
                }
            }
        },
        mounted(){
            this.interFunc()
            this.getRealNameIdentify(Cookies.get('loginToken'))
            this.getUserInfo(Cookies.get('loginToken'))
            this.tpCountryresdence='CN';
            this.taxCountry = 'CN';
            this.countryNumber = '1';
            this.countryNumberResidence = 'China'
            this.countryNumberTaxation = 'China'
            this.countryCode ='86';
            this.uploadUrl = `/api/sso/user/identify.upload`;
            this.getOSSjson()
            this.getOssCountryJson()
            if(this.passportType=='CARD'){
                    this.CARD=true;
                    this.PASSPORT=false;
                }else{
                    this.PASSPORT=true;
                    this.CARD=false;
                }
        },
        created(){
           
        }
        
        
    }
</script>
<style lang='less'>
   .lv_modal{
      .ivu-modal{
         height: 220px;
         .ivu-modal-content{
            height: 100%;
         }
         .content{
            margin-top: 18px;
            text-align: center;
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
#amlkyc{
    .radio{
        label{
            &:nth-child(1){
                padding-left: 0px;
            }
        }
    }
    .ivu-icon-ios-calendar-outline:before{
        top:3px;
        position: relative;
    }
    .ivu-progress-show-info{
            .ivu-progress-outer{
                 padding-right: 15px !important;
                 margin-right: -10px !important;
            }
            .ivu-progress-text{
                float: right;
                top:0px;
                position: absolute;
                right: 2px;
            }
    } 
    .button-container{
        display: flex;
        justify-content: center;
        .ivu-btn{
            border-radius: 5px !important;
            width: 260px;
            background: #12869A;
            padding: 10px 0px;
            
         &:hover{
             background: #04798c;
         }
        }
    }
     .ivu-form-item{
         margin-bottom: 0px !important;
     }
     .inner_input_login{
         .clearfix{
             margin-top: 30px;
             display: flex;
             align-items: center;
         }
         .ivu-input[disabled]{
            background: #F4F5F5;
         }
         .name_content{
             .ivu-input{
                 width: 140px;
             }
             .ivu-input-wrapper{
                 width: auto;
             }
             span{
                 color: #344857;
                 font-size: 14px;
             }
         }
         
         .ivu-input{
             width: 500px;
             height: 40px;
             padding-left: 10px;
            border: solid 1px #E7EAED;
            color: #344857;
            background-color: transparent;
         }
         .date_picker{
            .ivu-input{
                 width: 200px;
            }
         }
         .phone_item{
             .ivu-form-item-content{
                 display: flex;
                justify-content: flex-start;
             }
             .ivu-input{
                 width: 405px;
                 height: 40px;
                 margin-left: 10px;
             }
         }
     } 
     .ivu-radio-inner:after{
         background-color: #12869A;
         border: 1px solid #12869A;
     }
    //国家选择下拉样式
  .ivu-form-item-content{
            position: relative !important;
            img{
                z-index: 99;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            img.flag{
                position: static;
                width:20px;
                height: 14px;
                
            }
            .country{
                img{
                    width:20px;
                    height:14px;
                    margin-top:3px;
                }
            }
           
        
            
        }
    .ivu-upload-list{
       .ivu-upload-list-file{
           margin-left: -19px;
       }
   
   }
   .ivu-icon-ios-image:before{
        display: none;
        content:'';
   }

}
   

</style>
<style scoped lang="less">
    @import './amlkyc.less';
</style>


