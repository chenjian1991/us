<template>
<div id="institutionUser">
  <div class="intro">
    <div class="container">
      <div class="title">Tresso Institutional Account <br> Registration Form</div>
      <div class="des">Please complete this form to begin the process of registering for a Tresso institutional account. Your information will be reviewed internally and we will contact you directly to complete your application.</div>
    </div>
  </div>
  <div class="userForm">
    <div class="container">
      <!-- Form -->
      <div class="row">
        <div :class="item.width" v-for="(item,index) in form" :key="index">
          <!-- common Input -->
          <div class="js-form-message " v-if="item.type === 'common'">
            <label class="h6 small d-block text-uppercase">
              {{item.name}}
            </label>
            <div class="js-focus-state input-group u-form">
              <input v-model="item.value" class="form-control u-form__input" type="text" maxlength="100" @blur="check(item)" @input = "item.oninput(item)">
            </div>
            <div class="tips text-danger" v-if="item.isTips">
              {{item.tips}}
            </div>
          </div>
          <!-- End common Input -->
          <!-- selectAndInput Input -->
          <div v-if="item.type === 'selectAndInput'">
            <label class="h6 small d-block text-uppercase">
              {{item.name}}
            </label>
            <div class="js-focus-state input-group u-form">
              <div class="input-group">
                <div class="input-group-prepend formSelect">
                  <Select  v-model="item.valuePre">
                    <Option v-for="(city,index) in cityDate" :value="'+'+ city.code +'/'" :label="'+'+ city.code" :key="index">
                      <span>{{city.en}}</span>
                      <span style="float:right">+{{city.code}}</span>
                    </Option>
                  </Select>
                </div>
                <input v-model="item.value" class="form-control u-form__input" type="text" maxlength="100" @input = "item.oninput(item)">
              </div>
            </div>
          </div>
          <!-- End selectAndInput Input -->
          <!-- select Input -->
          <div v-if="item.type === 'select'">
            <label class="h6 small d-block text-uppercase">
              {{item.name}}
            </label>
            <div class="input-group-prepend formSelect">
              <Select  v-model="item.value">
                <Option v-for="(city,index) in cityDate" :value="city.en" :label="city.en" :key="index">
                  <span>{{city.en}}</span>
                </Option>
              </Select>
            </div>
          </div>
          <!-- End select Input -->
          <br><br>
        </div>
      </div>
      <!-- End Form -->
      <div class="submitBtn" @click="handleSubmit">
        Submit
      </div>
    </div>
  </div>
  <!-- 人机验证goole -->
  <Modal
    class-name="vertical-center-modal"
    v-model="robotModalflag"
    :title="this.$t('yanzheng')"
    :mask-closable="false"
    :scrollable="true"
  >
    <div id="robotInstitutionRegister"></div>
    <p slot="footer"></p>
  </Modal>
</div>  
</template>

<script>
import {getApi} from '../../../api/axios.js';
import {googleTest} from '../../../api/usersystem'
import {submitFormUrl} from '../../../api/urls'
import {postHeaderKeyIdBodyApi} from '../../../api/axios'

export default {
  data(){
    return{
      robotFun:null,
      cityDate:[],
      robotModalflag:false,
      form:[
        {
          key:'company',
          type:'common',
          width:'col-md-12',
          name:'Full legal name of company name including any DBA names',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'contact',
          type:'common',
          width:'col-md-12',
          name:'Main Company Contact',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'email',
          type:'common',
          width:'col-md-6',
          name:'Main Contact’s Email Address',
          value:"",
          pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
          isTips:false,
          tips:'Invalid email address format',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'phone',
          type:'selectAndInput',
          width:'col-md-6',
          name:'Main Contact’s Phone Number',
          valuePre:"+1/",
          value:"",
          isTips:false,
          tips:'',
          isInputRule:true,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'address',
          type:'common',
          width:'col-md-12',
          name:'Company Address',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'city',
          type:'common',
          width:'col-md-6',
          name:'City/Towns',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'state',
          type:'common',
          width:'col-md-6',
          name:'State/Province/County',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'zip',
          type:'common',
          width:'col-md-4',
          name:'Zip/Postal Code',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:true,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'juridiction',
          type:'common',
          width:'col-md-8',
          name:'Jurisdiction(s) of Incorporation',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'country',
          type:'select',
          width:'col-md-3',
          name:'Country',
          value:"United States of America",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'Cphone',
          type:'selectAndInput',
          width:'col-md-9',
          name:'Country Code & Phone Number',
          valuePre:"+1/",
          value:"",
          isTips:false,
          tips:'',
          isInputRule:true,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'date',
          type:'common',
          width:'col-md-6',
          name:'Date of Incorporation/Formation',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'tid',
          type:'common',
          width:'col-md-6',
          name:'Federal Tax ID (TIN, EIN, VAT, GIIN, etc.)',
          value:"",
          isTips:false,
          tips:'',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
        {
          key:'url',
          type:'common',
          width:'col-md-12',
          name:'Company Website URL',
          value:"",
          pattern:/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Za-z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Za-z0-9+&@#/%=~_|$?!:,.]*\)|[A-Za-z0-9+&@#/%=~_|$])/,
          isTips:false,
          tips:'Invalid url format',
          isInputRule:false,
          oninput:(item)=>item.isInputRule?item.value=item.value.replace(/[^\d]/g,''):null
        },
      ]
    }
  },
  computed:{

  },
  methods:{
    check(item){
      //无校验规则
      if(!item.pattern){
        return
      }
      //有校验规则
      if(!item.value.match(item.pattern)){
        item.isTips = true
      }else{
        item.isTips = false
      }
    },
    handleSubmit(){
      //判断是否有空值
      try{
        this.form.forEach(item => {
          if(!item.value){
            throw 'Please fill out the required fields'
          }
        });
      }catch(text){
        this.$Message.error(text)
        return
      }
      //判断格式是否正确
      try{
        this.form.forEach(item => {
          if(item.isTips){
            throw 'Some of the fields were not filled out correctly'
          }
        })
      }catch(text){
        this.$Message.error(text)
        return
      }
      //人机验证google
      this.robotModalflag = true
      this.robotFun()
    },
    getSubmitForm(){
      const submitForm = this.form.reduce((pre,current)=>{
        const key = current.key
        const value = current.valuePre?current.valuePre+current.value:current.value
        pre[key] = value
        return pre
      },{})
      return submitForm
    },
    submitFormInfo(res){
      const submitForm = this.getSubmitForm()
      postHeaderKeyIdBodyApi(submitFormUrl,{
        businessType: 'organization',
        personType:'GOOGLE',
        personCode:res,
        form:submitForm
      }).then(res=>{
        this.$Message.success('Submit successfully')
        //成功后表单清空
        this.form.forEach(item => {
          //解决国家选框没有默认值问题
          if(item.name === 'Country'){
            item.value = 'United States of America'
          }else{
            item.value = ''
          }
        });
      }).catch(err=>{
        this.$Message.error('Submit failed')
      })
    }
  },
  mounted(){
    getApi('https://oss.55com.io/content/country/55-country.json',{}).then((res)=>{
      const arr = res.slice(4)
      this.cityDate = arr
    })
    this.robotFun =  googleTest('robotInstitutionRegister',res=>{
        //提交
        this.submitFormInfo(res)
        setTimeout(() => {
          this.robotModalflag = false;
        }, 2000);
      },err=>{
        this.robotModalflag = false;
      },netErr=>{
        this.robotModalflag = false;
      })

  }
}
</script>

<style lang="less">
#institutionUser{
  .intro{
    padding: 84px 0 92px;
    background-color: #151D24;
    font-size: 46px;
    font-weight: 500;
    color: #fff;
    .des{
      margin-top: 34px;
      font-size: 20px;
    }
  }
  .userForm{
    padding: 55px 0 200px;
    background-color: #F8F9FA;
    .formSelect{
      .ivu-select-selection{
        height: 44px;
        .ivu-select-placeholder{
          line-height: 44px;
        }
        .ivu-select-selected-value{
          line-height: 44px;
        }
      }
    }
    .submitBtn{
      width:200px;
      height:50px;
      line-height: 50px;
      background:#01B2D6;
      border-radius:4px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      cursor: pointer;      
    }
  }
}
</style>