<template>
    <div id="identity" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="/identiy">{{$t('sfrzIDVerification')}}</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">{{$t("sfrzIDExplainone")}}</div>
                <div class="warn-tips">{{$t("sfrzIDExplaintwo")}}</div>
                <div class="page-title">{{$t('sfrzIDVerification')}}</div>
                <div class="inner_input_login">
                    <div class="title">{{$t('sfrzIDTIPS')}}</div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <!-- 国内 -->
                         <div v-if="chinaPeople">
                              <div class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('sfrzLastName')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='lastName'>
                                    <Input :maxlength="50" v-model="formValidate.lastName" :placeholder="$t('sfrzplacehoderlastname')"></Input>
                                </FormItem>
                            </div>
                            <div class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('sfrzFirstName')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='firstName'>
                                    <Input :maxlength="50" type="text" v-model="formValidate.firstName" :placeholder="$t('sfrzplacehodername')"></Input>
                                </FormItem>
                            </div>
                         </div>
                         <!-- 国外 -->
                         <div v-else>
                            <div  class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('sfrzFirstName')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='firstName'>
                                    <Input :maxlength="50" type="text" v-model="formValidate.firstName" :placeholder="$t('sfrzplacehodername')"></Input>
                                </FormItem>
                            </div>
                            <div class="clearfix">
                                <div class="pull-left span-label">
                                    <span>{{$t('sfrzLastName')}}</span>
                                </div>
                                <FormItem class="form_item pull-left" prop='lastName'>
                                    <Input :maxlength="50" v-model="formValidate.lastName" :placeholder="$t('sfrzplacehoderlastname')"></Input>
                                </FormItem>
                            </div>
                         </div>
                        
                        <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzGender')}}</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                <RadioGroup v-model="gender">
                                        <Radio label="MALE">
                                             <span>{{$t('sfrzMale')}}</span>
                                        </Radio>
                                        <Radio label="FEMALE">
                                             <span>{{$t('sfrzFemale')}}</span>
                                        </Radio>
                                </RadioGroup>
                            </FormItem>
                         </div>
                         <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzCountry')}}</span>
                            </div>
                            <FormItem class="form_item phone_item pull-left" prop='phoneNumber'>
                                    <div class="country_container">
                                        <div @click="controlSelect">
                                            <input type="hidden">
                                            <div style="width:498px;">
                                                <em v-html="countryNumber" class="code"></em>
                                                <Icon v-show="!selectFlag" type="ios-arrow-down"/>
                                                <Icon v-show="selectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="1000" mode="out-in"  name='fade'>
                                            <div v-show="selectFlag" class="select_dropdown">
                                                <ul class="select_down_list">
                                                <li @click="chooseCountry(item.en,item.code)" v-for="item in ossJSON" :value="item.value"  :label="item.label">
                                                    <!-- <span v-html="item.value"></span> -->
                                                    <!-- <span v-html="item.label"></span> -->
                                                     <img class="flag" :src="item.image"></img>
                                                     <span style="color:#5a626d;font-size:14px;margin-left:10px;"  v-html="item.en"></span>
                                                </li>
                                                </ul>
                                                </div>
                                        </transition>
                                    </div>
                            </FormItem>
                         </div>
                           <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzProofType')}}</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                <RadioGroup @on-change='passportMthod' v-model="passport">
                                        <Radio label="VALID_IDENTITY_CARD">
                                             <span>{{$t('sfrzValidIdentityCard')}}</span>
                                        </Radio>
                                        <Radio label="PASSPORT">
                                             <span>{{$t('sfrzPassport')}}</span>
                                        </Radio>
                                </RadioGroup>
                            </FormItem>
                         </div>
                        <div v-if="PASSPORT==true" class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzpassportLabel')}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passPort'>
                                <Input :maxlength="9" v-model="formValidate.passPort" :placeholder="$t('sfrzplacehoderpassportnumber')"></Input>
                            </FormItem>
                         </div>
                        <div v-if="VALID_IDENTITY_CARD==true" class="clearfix">
                             <div class="pull-left span-label">
                                <span>{{$t('sfrzIDLabel')}}</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='idCard'>
                                <Input :maxlength="30" v-model="formValidate.idCard" :placeholder="$t('sfrzplacehoderidNumber')"></Input>
                            </FormItem>
                         </div>
                       
                       
                       
                        
                    </Form>
                    
                </div>
                 <div  class="upload-img-container clearfix">
                     <!-- 正面 -->
                            <div class="item">
                                <p v-if='VALID_IDENTITY_CARD'>{{$t('sfrzIDCardFront')}}</p>
                                <p v-else>{{$t('sfrzPassportCover')}}</p>
                                <div class="identityCard-one">
                                    <img src="../../assets/images/identify/Front-view.png" alt="">
                                    <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png" alt="">
                                    <div class="upload-img-contain" style="visibility:show;">
                                        <div  v-if="item.status === 'finished' && urlPath" class="demo-upload-list" v-for="item in uploadList">
                                            <template>
                                                <img v-if="urlPath" :src="urlPath">
                                                <div class="demo-upload-list-cover">
                                                    <Icon style="font-size:30px;" type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                        </div>
                                        <div v-else>
                                             <template >
                                                <Progress width='100%' v-if="item.showProgress"  :percent="item.percentage | initNumber"></Progress>
                                            </template>
                                        </div>
                                        <Upload
                                            ref="upload"
                                            :show-upload-list="false"
                                            :on-success="handleSuccess"
                                            :on-error="handleError"
                                            :before-upload='beforeUpload'
                                            :format="['jpg','jpeg','png']"
                                            :max-size="5120"
                                            :on-format-error="handleFormatError"
                                            :on-exceeded-size="handleMaxSize"
                                            multiple
                                            :headers="headerObj"
                                            :action="uploadUrl"
                                            style="display: inline-block;width: 304px;height:200px;z-index:150">
                                            <div style="width: 304px;height:200px;line-height:200px;text-align:center;">
                                                <span>上传</span>
                                            </div>
                                        </Upload>
                                    </div>
                                 </div>
                                <ul>
                                    <li v-if='VALID_IDENTITY_CARD'>{{$t('sfrzIDCardFrontLabel1')}}</li>
                                    <li v-else>{{$t('sfrzIDCardFrontLabel11')}}</li>
                                    <li>{{$t('sfrzIDCardFrontLabel2')}}</li>
                                </ul>
                            </div>
                           <div class="item">
                               <!-- 反面 -->
                                <p v-if='VALID_IDENTITY_CARD'>{{$t('sfrzIDCardBack')}}</p>
                                <p v-else>{{$t('sfrzPersonalPage')}}</p>
                                <div class="identityCard-two">
                                    <img src="../../assets/images/identify/Rear-view.png" alt="">
                                    <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png" alt="">
                                      <div class="upload-img-contain" style="visibility:show;">
                                             <div v-if="item.status === 'finished' && urlPathTWO " class="demo-upload-list" v-for="item in uploadListTWO">
                                                <template >
                                                    <img v-if="urlPathTWO" :src="urlPathTWO">
                                                    <div class="demo-upload-list-cover">
                                                        <Icon style="font-size:30px;" type="ios-trash-outline" @click.native="handleRemoveTwo(item)"></Icon>
                                                    </div>
                                                </template>
                                              
                                            </div>
                                            <div v-else>
                                                <template>
                                                    <Progress v-if="item.showProgress" :percent="item.percentage | initNumber"></Progress>
                                                </template>
                                            </div>
                                      <Upload
                                        ref="uploadTwo"
                                        :show-upload-list="false"
                                        :on-success="handleSuccessTWO"
                                        :before-upload='beforeUpload'
                                        :format="['jpg','jpeg','png']"
                                        :max-size="5120"
                                        :on-format-error="handleFormatErrorTWO"
                                        :on-exceeded-size="handleMaxSizeTWO"
                                        multiple
                                        :headers="headerObj"
                                        :action="uploadUrl"
                                        style="display: inline-block;width: 304px;height:200px;z-index:150">
                                        <div style="width: 304px;height:200px;line-height: 200px;text-align:center;">
                                            <span>上传</span>
                                        </div>
                                    </Upload>
                                    </div>
                                </div>
                                <ul>
                                    <li v-if='VALID_IDENTITY_CARD'>{{$t('sfrzIDCardBackLabel1')}}</li>
                                    <li v-else>{{$t('sfrzIDCardBackLabel1')}}</li>
                                    <li>{{$t('sfrzIDCardBackLabel3')}}</li>
                                </ul>
                            </div>
                            <div class="item">
                                <!-- 手持 -->
                                <p v-if='VALID_IDENTITY_CARD'>{{$t('sfrzSelfieID')}}</p>
                                <p v-else>{{$t('sfrzSelfiePhotoID')}}</p>
                                <div class="identityCard-three">
                                    <img src="../../assets/images/identify/kycThree.png" alt="">
                                    <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png" alt="">
                                      <div class="upload-img-contain" style="visibility:show;">
                                               <div v-if="item.status === 'finished'&& urlPathTHREE" class="demo-upload-list" v-for="item in uploadListThree">
                                                    <template>
                                                        <img v-if="urlPathTHREE" :src="urlPathTHREE">
                                                        <div class="demo-upload-list-cover">
                                                            <Icon style="font-size:30px;" type="ios-trash-outline" @click.native="handleRemoveThree(item)"></Icon>
                                                        </div>
                                                    </template>
                                                </div>
                                                <div v-else>
                                                     <template>
                                                        <Progress v-if="item.showProgress" :percent="item.percentage | initNumber"></Progress>
                                                    </template>
                                                </div>
                                        <Upload
                                        ref="uploadThird"
                                        :show-upload-list="false"
                                        :on-success="handleSuccessTHREE"
                                        :before-upload='beforeUpload'
                                        :format="['jpg','jpeg','png']"
                                        :max-size="5120"
                                        :on-format-error="handleFormatErrorTHREE"
                                        :on-exceeded-size="handleMaxSizeTHREE"
                                        multiple
                                        :headers="headerObj"
                                        :action="uploadUrl"
                                        style="display: inline-block;width: 304px;height:200px;z-index:150">
                                        <div style="width: 304px;height:200px;line-height: 200px;text-align:center;">
                                            <span>上传</span>
                                        </div>
                                    </Upload>
                                    </div>
                                </div>
                                <ul>
                                    <li v-if='VALID_IDENTITY_CARD'>{{$t('sfrzSelfieIDLabel1')}}</li>
                                    <li v-else>{{$t('sfrzSelfieIDLabel11')}}</li>
                                </ul>
                                <ul class="pic-tips">
                                    <li>
                                        <Icon class='right' type="md-checkmark" />
                                        <span>{{$t('sfrzFaceClearly')}}</span>
                                        &nbsp
                                        <Icon class='right' type="md-checkmark" />
                                        <span v-if='VALID_IDENTITY_CARD'>{{$t('sfrzPhotoIDClearly')}}</span>
                                        <span v-else>{{$t('sfrzPhotoIDClearly11')}}</span>
                                    </li>
                                    <li>
                                        <Icon class='right' type="md-checkmark" />
                                        <span>{{$t('sfrzNote55')}}</span>
                                        <!-- <Icon class='right' type="md-checkmark" />
                                        <span>{{$t('sfrzNoteToday')}}</span> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="button-container clearfix">
                            <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">{{$t("zhmmResetSubmit")}}</Button>
                            <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                        </div>
                        
            
            
            
            </div>
        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {countrylist} from '../identity/country.js'
import {uploadPic,identifyPhoto,cardEffective} from '../../../api/urls.js';
import {postHeaderTokenBodyApi,getApi,getHeaderTokenApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
import sendBtn from '../../components/sendBtn';
import {realNameMethod} from '../../../api/exchange.js'
import { denodeify } from 'q';

    export default {
        name:'login',
        components:{
            Modal,
            sendBtn
        },
        data() {
              const validateGoogle = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern =/[^\d]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('googleMust')))
                    }else{
                        
                    }
                    callback()
                }
            };
              const validateSms = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    callback()
                }
            };
            const validateIdCard = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    getHeaderTokenApi(cardEffective+value,'',Cookies.get('loginToken')).then((res)=>{
                        if(res.data.result){//可以使用
                                callback()
                        }else if(res.data.code){
                             this.$Notice.error({
                                        title: this.$t(res.data.code),
                                        desc:this.$t(res.data.code)
                                });
                            if(res.data.code='Cx000001'){
                                Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')})
                                this.$router.push('/login')
                            }
                               

                        }else{
                             callback(new Error(this.$t('idcardUnick')))
                        }
                    })

                }
            };
            const validatePassport = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    getHeaderTokenApi(cardEffective+value,'',Cookies.get('loginToken')).then((res)=>{
                        if(res.data.result){
                                callback()
                        }else if(res.data.code){
                            this.$Notice.error({
                                        title: this.$t(res.data.code),
                                        desc:this.$t(res.data.code)
                                });
                            if(res.data.code='Cx000001'){
                                 Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')})
                                    this.$router.push('/login')
                            }
                        }else{
                             callback(new Error(this.$t('idcardUnick')))

                        }
                    })

                }
            };
            return {
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    firstName:'',
                    passPort:'',
                    idCard:'',
                    lastName:'',
                },
                defaultList: [
                 
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                uploadListTWO:[],
                uploadListThree:[],
                urlPath:'',
                urlPathTWO:"",
                urlPathTHREE:"",
                progress:"",
                showModal:false,
                headerObj:{
                    token:Cookies.get('loginToken')
                },
                uploadUrl:"",
                fileUrl:"",
                text:'',
                empty:false,
                ossJSON:[],
                countryNumber:"",
                countryCode:"",
                emailAddress:'',
                phoneNumber:'',
                loaded:true,
                gender:'MALE',
                selectFlag:false,
                cityList:[],
                passport:'VALID_IDENTITY_CARD',
                PASSPORT:false,
                VALID_IDENTITY_CARD:true,
                idcardURLfront:'',
                idcardURLback:'',
                idcardURLSignature:'',
                percentProgress:0,
                ruleValidate: {
                    firstName: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    lastName:[
                        {validator: validateSms, trigger: 'blur'}
                    ],
                    passPort: [
                        { validator: validatePassport, trigger: 'blur' }
                    ],
                    idCard:[
                        { validator: validateIdCard, trigger: 'blur' }
                    ],
                    
                    
                },
               chinaPeople:true,


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded=false;
                        let obj = {
                            "firstName":this.formValidate.firstName,
                            "lastName":this.formValidate.lastName,
                            "gender":this.gender,
                            "countryCode":this.countryCode,
                            "proofType":this.passport,
                        }
                        if(this.VALID_IDENTITY_CARD){
                            obj.proofId=this.formValidate.idCard;
                            obj.iDCardFrontPhoto=this.idcardURLfront;
                            obj.iDCardBackPhoto = this.idcardURLback;
                            obj.iDSelfiePhoto = this.idcardURLSignature;
                              if(obj.iDCardFrontPhoto==''||obj.iDCardBackPhoto==''||obj.iDSelfiePhoto==''){
                                  this.$Message.error(this.$t('sfrzIDCardFrontUpload'));
                                  this.loaded=true;
                                  return false;
                            }
                        }else{
                            obj.proofId=this.formValidate.passPort;
                            obj.passportCoverPhoto=this.idcardURLfront;
                            obj.passportPersonalPagePhoto = this.idcardURLback;
                            obj.passportSelfiePhoto = this.idcardURLSignature;
                            if(obj.passportCoverPhoto==''||obj.passportPersonalPagePhoto==''||obj.passportSelfiePhoto==''){
                                  this.$Message.error(this.$t('sfrzIDCardFrontUpload'));
                                  this.loaded=true;
                                  return false;
                            }
                        }
                      
                        this.createRealNameFunc(obj)
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            createRealNameFunc(parmas){
                let _this = this;
                realNameMethod(Cookies.get('loginToken'),parmas).then((res)=>{
                    let result = res.result;
                    if(result==''){
                        this.$router.push('/identityResult')
                    }else{
                        this.loaded=true;
                        _this.$Message.error(_this.$t(res.code))
                    }
                }).bind(this)
            },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
            },
            chooseCountry(name,code){
                this.selectFlag = false;
                this.countryNumber = name;
                 this.countryCode = code;

            },
             handleClose(e) {
                this.selectFlag = false;
            },
            dealCountry(){
                let countryArr = []
                countrylist.map((v,i) => {
                    let country = v.split('-');
                    let name = country[0];
                    let code = country[2];
                    let countrylist = {
                        value:name,
                        label:code
                    }
                    countryArr.push(countrylist)
                    this.cityList = countryArr;
                })
            },
            passportMthod(value){
               // console.log(value)
            },
            beforeUpload(){
                 this.uploadList = this.$refs.upload.fileList;
                 this.uploadListTWO =  this.$refs.uploadTwo.fileList;
                 this.uploadListThree = this.$refs.uploadThird.fileList;
            },
            handleSuccess (res, file) {
                this.idcardURLfront = res.filePath;
                let fileUrl = res.filePath;
                if(res.code){
                    this.$Notice.error({
                        title: this.$t(res.code),
                        desc:this.$t(res.code)
                    });
                }
                getHeaderTokenApi(identifyPhoto,{filePath:fileUrl},Cookies.get('loginToken')).then((res)=>{
                     this.urlPath = res.data.filePath;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.urlPath = ''
            },
            handleRemoveTwo(file) {
                const fileList = this.$refs.uploadTwo.fileList;
                this.$refs.uploadTwo.fileList.splice(fileList.indexOf(file), 1);
                this.urlPathTWO = ''
            },
            handleRemoveThree(file) {
                const fileList = this.$refs.uploadThird.fileList;
                this.$refs.uploadThird.fileList.splice(fileList.indexOf(file), 1);
                this.urlPathTHREE=''
            },
             handleSuccessTWO (res, file) {
                this.idcardURLback = res.filePath;
                let fileUrl = res.filePath;
                   if(res.code){
                    this.$Notice.error({
                        title: this.$t(res.code),
                        desc:this.$t(res.code)
                    });
                }
                getHeaderTokenApi(identifyPhoto,{filePath:fileUrl},Cookies.get('loginToken')).then((res)=>{
                     this.urlPathTWO = res.data.filePath;
                })
            },
              handleSuccessTHREE (res, file) {
                this.idcardURLSignature = res.filePath;
                let fileUrl = res.filePath;
                 if(res.code){
                    this.$Notice.error({
                        title: this.$t(res.code),
                        desc:this.$t(res.code)
                    });
                }
                getHeaderTokenApi(identifyPhoto,{filePath:fileUrl},Cookies.get('loginToken')).then((res)=>{
                     this.urlPathTHREE = res.data.filePath;
                })
            },
            handleError(error, file, fileList){
                console.log(error)
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
            handleFormatErrorTWO (file) {
                  this.$Notice.error({
                      title: this.$t('invalidFormate'),
                    desc: this.$t('invalidFormate')
                });
            },
             handleFormatErrorTHREE (file) {
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
             handleMaxSizeTWO (file) {
                  this.$Notice.error({
                      title:this.$t('picIsToolarge'),
                    desc: this.$t('picIsToolarge')
                });
            },
             handleMaxSizeTHREE (file) {
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
            passport(val,oldVal){
                if(val=='VALID_IDENTITY_CARD'){
                    this.VALID_IDENTITY_CARD=true;
                    this.PASSPORT=false;
                }else{
                    this.PASSPORT=true;
                    this.VALID_IDENTITY_CARD=false;
                }
            }
        },
        mounted(){
            this.dealCountry();
            this.countryNumber = 'United States of America';
            this.countryCode ='1';
            this.uploadUrl = `/api/sso/user/identify.upload`;
            this.getOSSjson()
            if(localStorage.getItem('countryLanguage')=='zh-CN'){
                    this.chinaPeople = true;
                }else{
                    this.chinaPeople = false;
                }
        },
        created(){
            this.interFunc()
        }
        
        
    }
</script>
<style lang='less'>
#identity{
        .ivu-radio-wrapper{
            margin-right: 20px;
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
     .ivu-btn{
         border-radius: 5px !important;
         width: 260px;
         background: #12869A;
         padding: 10px 0px;
         &:hover{
             background: #04798c;
         }
     }
     .ivu-form-item{
         margin-bottom: 24px !important;
     }
     .inner_input_login{
         .ivu-input{
             width: 509px;
             height: 48px;
             padding-left: 10px;
            border: solid 1px #E7EAED;
            color: #344857;
            background-color: transparent;
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

}
   .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        //border: 1px solid transparent;
        //border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .ivu-upload-drag{
        border:none !important;
        z-index: 120 !important;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

</style>
<style scoped lang="less">
    @import './identity.less';
</style>


