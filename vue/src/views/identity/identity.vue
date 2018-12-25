<template>
    <div id="identity" class="root">
        <div class="wrapper">
             <div class="header-title">
                 <router-link to="/safeCenter">{{$t("tbdhAccountSecurity")}}</router-link>   <span class="arrow">></span>  <router-link to="/identiy">实名认证</router-link>
             </div>
            <div class="register_wraper">
                <div class="warn-tips">为了保证您的账户资金，请注册实名认证信息。</div>
                <div class="warn-tips">请注意，实名认证成功后不能被修改。</div>
                <div class="page-title">身份认证</div>
                <div class="inner_input_login">
                    <div class="title">请确保您使用您的真实身份来进行实名认证。我们会保护您的个人信息。</div>
                     <Form class="form-item clearfix" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                         <div class="clearfix">
                            <div class="pull-left span-label">
                                <span>名：</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='firstName'>
                                <Input :maxlength="50" type="password" v-model="formValidate.firstName" placeholder="请输入名字"></Input>
                            </FormItem>
                         </div>
                         <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>姓：</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='lastName'>
                                <Input :maxlength="50" v-model="formValidate.lastName" placeholder="请输入姓氏"></Input>
                            </FormItem>
                         </div>
                        <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>性别：</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                <RadioGroup v-model="gender">
                                        <Radio label="man">
                                             <span>男</span>
                                        </Radio>
                                        <Radio label="woman">
                                             <span>女</span>
                                        </Radio>
                                </RadioGroup>
                            </FormItem>
                         </div>
                         <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>国家及地区：</span>
                            </div>
                            <FormItem class="form_item phone_item" prop='phoneNumber'>
                                    <div class="country_container">
                                        <div @click="controlSelect">
                                            <input type="hidden">
                                            <div style="width:509px;">
                                                <em v-html="countryNumber" class="code"></em>
                                                <Icon v-show="!selectFlag" type="ios-arrow-down" />
                                                <Icon v-show="selectFlag" type="ios-arrow-up" />
                                            </div>
                                        </div>
                                        <transition :duration="1000" mode="out-in"  name='fade'>
                                            <div v-show="selectFlag" class="select_dropdown">
                                                <ul class="select_down_list">
                                                <li @click="chooseCountry(item.value)" v-for="item in cityList" :value="item.value"  :label="item.label">
                                                    <span v-html="item.value"></span>
                                                    <span v-html="item.label"></span>
                                                </li>
                                                </ul>
                                                </div>
                                        </transition>
                                    </div>
                            </FormItem>
                         </div>
                           <div class="clearfix">
                             <div class="pull-left span-label">
                                <span>证件类型：</span>
                            </div>
                            <FormItem class="form_item pull-left radio">
                                <RadioGroup @on-change='passportMthod' v-model="passport">
                                        <Radio label="id">
                                             <span>有效身份证</span>
                                        </Radio>
                                        <Radio label="passportCard">
                                             <span>护照</span>
                                        </Radio>
                                </RadioGroup>
                            </FormItem>
                         </div>
                        <div v-if="passportCard==true" class="clearfix">
                             <div class="pull-left span-label">
                                <span>护照：</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='passPort'>
                                <Input :maxlength="50" v-model="formValidate.passPort" placeholder="请输入护照号码"></Input>
                            </FormItem>
                         </div>
                            <div v-if="id==true" class="clearfix">
                             <div class="pull-left span-label">
                                <span>身份证号：</span>
                            </div>
                            <FormItem class="form_item pull-left" prop='idCard'>
                                <Input :maxlength="50" v-model="formValidate.idCard" placeholder="请输入身份证号"></Input>
                            </FormItem>
                         </div>



                        <Button v-if="loaded"  class="loginbtn pull-left"  @click="handleSubmit('formValidate')" type="primary">{{$t("aqzxnext")}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                       
                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {countrylist} from '../identity/country.js'
import {TradingPasswordVerify,userInfo} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';
import Cookies from 'js-cookie';
import Modal from '@/components/Modal';
import sendBtn from '../../components/sendBtn';

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
            return {
                formValidate:{//必须有这个字段，验证的时候才可以验出是否符合规则
                    firstName:'',
                    passPort:'',
                    idCard:'',
                    lastName:'',
                },
                showModal:false,
                text:'',
                empty:false,
                countryNumber:"",
                emailAddress:'',
                phoneNumber:'',
                loaded:true,
                gender:'man',
                selectFlag:false,
                cityList:[],
                passport:'id',
                passportCard:false,
                id:true,
                ruleValidate: {
                    firstName: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    lastName:[
                        {validator: validateSms, trigger: 'blur'}
                    ],
                    passPort: [
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    idCard:[
                        { validator: validateSms, trigger: 'blur' }
                    ],
                    
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded=false;
                       this.verifyCode();
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
     
      
            getUserInfo(token){
                postHeaderTokenBodyApi(userInfo,token,{}).then((res) =>{
                 this.emailAddress = res.email;
                 this.phoneNumber = res.phone;
                 this.googleNum = res.isBindingGoogle;
                 localStorage.setItem('ex55Pin',res.ex55Pin);

                }).catch((res) =>{
                    console.log(res)
                })
            },
            controlSelect(){
                this.selectFlag = !this.selectFlag;
            },
            chooseCountry(code){
                this.selectFlag = false;
                this.countryNumber = code;
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
            },
            passport(val,oldVal){
                if(val=='id'){
                    this.id=true;
                    this.passportCard=false;
                }else{
                    this.passportCard=true;
                    this.id=false;
                }
            }
        },
        mounted(){
            this.dealCountry();
            this.countryNumber = 'United States of America';

        


        }
        
        
    }
</script>
<style lang='less'>
#identity{
     .ivu-btn{
         border-radius: 0px !important;
         width: 509px;
     }
     .inner_input_login{
         .ivu-input{
             width: 509px;
             padding-left: 10px;
         }
     } 
    
}
    

</style>
<style scoped lang="less">
    @import './identity.less';
</style>


