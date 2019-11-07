<template>
    <div id="closeGoogle" class="root">
                <!-- Title Section -->
    <div class="bg-light">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <h1 class="h4 mb-0">{{$t('aqzxCloseGoogletitle')}}</h1>
          </div>
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                <li class="breadcrumb-item"><router-link to='/SafeCenter' >{{$t('tbdhAccountSecurity')}}</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{$t('aqzxCloseGoogleRouter')}}</li>
              </ol>
            </nav>
            <!-- End Breadcrumb -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Title Section -->
             <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Login Form -->
    <div class="container space-2">
      <form autocomplete="off" action=''  @submit.prevent="handleSubmit" class="js-validate w-md-75 w-lg-50 mx-md-auto">
        <!-- Title -->
        <div class="mb-7">
          <!-- <h2 class="h3  font-weight-normal mb-3">{{$t('aqzxchangepassword')}}</h2> -->
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{{$t('aqzxCloseGoogletips')}}</strong>
          </div>
        </div>
        <!-- End Title -->
        <!-- Title -->
        <div class="row align-items-center mb-4">
          <div class="col-md-8 mb-3 mb-md-0">
            <h2 class="h5 mb-0">{{$t('aqzxverify')}}</h2>
          </div>
        </div>
        <!-- End Title -->
        <!-- Form Group -->
         <div class="form-group">
            <div class="js-form-message js-focus-state">
                 <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                        {{$t('jymmLoginPassword')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signupPasswordLabel">
                        <span class="fas fa-lock"></span>
                        </span>
                    </div>
                    <input :maxlength='20' v-model='password' type="password" class="form-control" name="password" id="signupPassword" :placeholder="this.$t('aqzxpasswordplaceholder')" aria-label="Password" aria-describedby="signupPasswordLabel" required
                            :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="js-form-message js-focus-state">
                <label class="" for="signupPassword">
                    <span class="d-flex justify-content-between align-items-center">
                         {{$t('aqzxgooglecode')}}
                    </span>
                </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="signinSrPassword">
                        <span class="fas fa-key"></span>
                        </span>
                    </div>
                    <input :maxlength='6' v-model='googlecode' type="text" class="form-control" name="googleCode" id="signinSrPassword" :placeholder="this.$t('goolePlaceholder')" aria-label="请输入谷歌验证码" aria-describedby="signupConfirmPasswordLabel" required
                           :data-msg="this.$t('phoneNumberRequier')"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success">
                </div>
            </div>
        </div>
        <!-- End Form Group -->
        <!-- Button -->
        <div class="row align-items-center mb-5">
          <div class="col-12 text-left">
            <button type="button" value="button" @click="handleSubmit" class="btn btn-primary-55 transition-3d-hover">{{$t('sfrzSubmit')}}</button>
          </div>
        </div>
        <!-- End Button -->
      </form>
    </div>
    <!-- End Login Form -->
  </main>
  <!-- ========== END MAIN ========== -->
    </div>
</template>

<script>
import {unbindGoogle} from '../../../api/urls.js';
import {postHeaderTokenBodyApi} from '../../../api/axios.js';

    export default {
        name:'closegogle',
        components:{
        },
        data() {
            return {
                password:'',
                googlecode:'',
                showModal:false,
                text:'',
                loaded:true,
            }
        },
        methods:{
            handleSubmit (name) {
                 if(this.password==''||this.googlecode=='') {
                  this.$Notice.error({
                        title:this.$t('输入框不能为空'),
                        desc: this.$t('输入框不能为空')
                    });
                  return false;
              }
               if($('.invalid-feedback').text()!==''){//如果有红色的提示语则阻止其提交
                return false;
              }
                this.loaded = false;
                this.unbindGoogleMthods();
               
            },
             setSha(passwrod){
                let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
                let pw = sha256(passwrod)//要加密的密码
                return pw;
            },
            unbindGoogleMthods(){
                  let  params = {
                    "userId": localStorage.getItem('loginUserId'),
                    "password":this.setSha(this.password),
                    "googleCode": this.googlecode,
                }
                postHeaderTokenBodyApi(unbindGoogle,$cookies.get('loginToken'),params).then((res) =>{
                  if(res.result){
                      this.$Notice.success({
                            title:this.$t(11001),
                            desc: this.$t(11001)
                      });
                      setTimeout(() => {
                          this.$router.push('/SafeCenter')
                      }, 1500);
                  }
                }).catch((error)=>{
                        this.loaded = true;
                    
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
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
           
            
        },
        watch:{
            languageChange(val,oldVal){
            },
        },
        mounted(){


        },
        created(){
            this.interFunc()
        }
        
        
    }
</script>
<style lang='less'>
#closeGoogle{
    .btn-primary-55{
    color: #fff;
    background-color: #12869a;
    border-color: #12869a;
    &:hover{
         color: #fff;
       text-decoration: none;
    }
}
}
    .main_container{
        min-height:100%;
        display: flex;
        flex-direction: column; 
     }
     .headerbox{
        flex: 0 0 auto;
     }
    .footerBox{
         flex: 0 0 auto;
     }
     #closeGoogle{
         .inner_input_login{
         .ivu-input{
            width: 580px;
            border: solid 1px #E7EAED;
            color: #344857;
            height: 48px;
            line-height: 48px;
            background: none;
            font-size: 14px;
            padding-left: 53px;
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



