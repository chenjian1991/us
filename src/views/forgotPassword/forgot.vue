<template>
    <div id="forgotpassword" class="root">
        <div class="wrapper">
            <div class="register_wraper" style="height:530px">
                <div class="inner_input_login">
                    <div class="login_title">
                        <h2>{{$t('zhmmResetPassword')}}</h2>
                        <p>{{$t('zhmmResetExplain')}}</p>
                    </div>
                     <Form onsubmit="return false;" ref="formValidate" :model='formValidate' :rules='ruleValidate'>
                        <FormItem class="form_item" prop='phoneNumber'>
                            <img src="../../assets/images/register/accountnew.svg" alt="">
                            <Input v-model="formValidate.phoneNumber" :placeholder="$t('zhmmInputAccount')"></Input>
                        </FormItem>
                        <Button v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" type="primary">{{$t('zhmmResetSubmit')}}</Button>
                        <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>
                       
                    </Form>
                    
                </div>
            </div>

        </div>
        <Modal :modal='showModal' :text="text"></Modal>


    </div>
</template>

<script>
import {login,userInfo,userVerify,verifyEmail} from '../../../api/urls.js';
import {postBaseApi,postHeaderTokenBodyApi} from '../../../api/axios.js';
import Modal from '@/components/Modal';


    export default {
        name:'login',
        components:{
            Modal
        },
        data() {
               const validatePhone = (rule,value,callback) =>{
                if(value === ''){
                    callback(new Error(this.$t('phoneNumberRequier')))
                }else{
                    let pattern =/[*]/;
                    if(pattern.test(value)){
                        callback(new Error(this.$t('numberMust')))
                    }else{
                        
                    }
                    callback()
                }
            };
            return {
                empty:true,
                formValidate:{
                    phoneNumber:'',
                },
                showModal:false,
                loaded:true,
                text:'',
                ruleValidate: {
                    phoneNumber: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    
                },
               


            }



        },
      
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loaded = false;
                        this.empty = false;
                        let acountNumber  = this.formValidate.phoneNumber;
                         if(acountNumber.indexOf('@')!==-1){//邮箱登录
                                this.requestGoogleFunEmail()
                         }else{
                             
                              this.postUserVrify()
                         }


                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            },
            postUserVrify(){//验证手机是否存在
                let phoneNumber = this.formValidate.phoneNumber;
                let phone = {
                    'phone':phoneNumber
                }
                   postBaseApi(userVerify,{},phone).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                         this.text = this.$t(res.code);
                         this.loaded = true;
                    }else{
                        localStorage.setItem('googleFlag',res.isBindingGoogle);
                        localStorage.setItem('phoneNumber',res.phone);
                        localStorage.setItem('userNumer',this.formValidate.phoneNumber);
                        localStorage.setItem('ex55pin',res.ex55Pin);
                        localStorage.setItem('emailFlag',res.email);
                        this.$router.push('/safeVatification');
                    }
                    

                }).catch((error)=>{
                    this.loaded = true;
                })
            },
            requestGoogleFunEmail(){//验证邮箱是否存在
                let emailNumber = this.formValidate.phoneNumber;
                let email = {
                    'email':emailNumber
                }
                postBaseApi(verifyEmail,{},email).then((res) =>{
                    if(res.code){
                         this.showModal = !(this.showModal);
                         this.text = this.$t(res.code);
                        this.loaded = true;

                    }else{
                        localStorage.setItem('googleFlag',res.isBindingGoogle);
                        localStorage.setItem('phoneNumber',res.phone);
                        localStorage.setItem('userNumer',this.formValidate.phoneNumber);
                        localStorage.setItem('ex55pin',res.ex55Pin);
                        localStorage.setItem('emailFlag',res.email);
                        this.ex55Pin = res.ex55Pin;
                        this.$router.push('/safeVatification');
                    }
                    

                }).catch((error)=>{
                        this.loaded = true;
                })

            },



        },
        computed:{
            inputValidate(){
               return this.formValidate.phoneNumber;   
            },
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
                 this.$refs.formValidate.resetFields();
            },
        },
        mounted(){


        },
        created(){
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
        
        
    }
</script>
<style lang='less'>
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    //  #app{
    //      height: 100%;
    //  }
    .footerBox{
         flex: 0 0 auto;
     }
     #forgotpassword{
           .inner_input_login{
         .ivu-input{
            width: 580px;
            height: 48px;
            padding-left: 53px;
            border-radius: 0px;
            border:solid 1px #293B47;
            background: #13222B;
            border-radius: 5px;
            font-size: 14px;
            color:#fff;
        }
        .ivu-form-item-content{
            position: relative;
            img{
                z-index: 99;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            
        }
        
        
     }
     }
   

</style>
<style scoped lang="less">
    @import './forgot.less';
</style>


