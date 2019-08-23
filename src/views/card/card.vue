<template>
  <div class="root">
        <Modal
        :mask-closable='false'
        :closable="false"
        v-model="modal1"
        title="Apply for 55 card"
        class-name="passwordPup"
       >
       <div>
            <p class="row">Application requires confirmation:</p>
            <div class="row justify-content-between align-items-center mt-3">
                <div class="">
                    <i class="far fa-check-circle mr-2 icon-color"></i>
                    <span>KYC Verification</span>
                </div>
                <router-link to="/kyc">Go to KYC</router-link>
            </div>
              <div class="row justify-content-between align-items-center mt-3">
                <div class="">
                    <i class="fas fa-flag-usa mr-2 icon-color"></i>
                    <span>US Resident</span>
                </div>
                <span v-if="usState">certified</span>
                <span v-else>Not certified</span>
            </div>

       </div>
      <p slot="footer">
         <button class="cancelBtn" style="cursor:pointer"  @click="cancelbtn">{{$t('cancel')}}</button>
         <!-- <button  v-if="loaded"  class="loginbtn"  @click="handleSubmit('formValidate')" size="large" type="primary">{{$t('confrim')}}</button>
         <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>  -->
      </p>
    </Modal>
    <div class="container">
      <div class="row mt-6">
        <div class="col-lg-3 mb-3">
            <img style="width:100%" src="../../assets/images/card/55CARD.png" alt="">
        </div>
        <div class="col-lg-9">
            <div class="row justify-content-between align-items-center">
                <h3 class="display-5 mb-2 ">55 CARD</h3>
                <button @click="judgeStatus" class="btn btn-sm btn-primary transition-3d-hover d-inline-block mb-2">Order Now</button>
            </div>
          <!-- Icon Blocks -->
          <div class="row bg-white border">
            <div class="col-md-6 col-lg-4">
                
              <!-- List Group -->
              <ul
                class="list-group list-group-transparent list-group-flush list-group-borderless mb-0"
              >
                <li class="list-group-item pt-4 pb-4">
                  <div class="media">
                    <span class="fas fa-envelope list-group-icon mr-3"></span>
                    <div class="media-body text-lh-sm">
                      <span class="d-block mb-1">Balance</span>
                      <span class="d-block text-muted">$7,000.24</span>
                    </div>
                  </div>
                </li>
                <li class="list-group-item pt-4 pb-4">
                  <div class="media">
                    <span class="fas fa-link list-group-icon mr-3"></span>
                    <div class="media-body text-lh-sm">
                      <span class="d-block mb-1">Expiration</span>
                      <span class="d-block text-muted">12/21</span>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- End List Group -->
            </div>

            <div class="col-md-6 col-lg-4">
              <!-- List Group -->
              <ul
                class="list-group list-group-transparent list-group-flush list-group-borderless mb-0"
              >
                <li class="list-group-item pt-4 pb-4">
                  <div class="media">
                    <span class="fas fa-birthday-cake list-group-icon mr-3"></span>
                    <div class="media-body text-lh-sm">
                      <span class="d-block mb-1">Card Number</span>
                      <span class="d-block text-muted">4000 0000 0000 0000</span>
                    </div>
                  </div>
                </li>
                <li class="list-group-item pt-4 pb-4">
                  <div class="media">
                    <span class="fas fa-building list-group-icon mr-3"></span>
                    <div class="media-body text-lh-sm">
                      <span class="d-block mb-1">CVN</span>
                      <span class="d-block text-muted">851</span>
                    </div>
                  </div>
                </li>
           
              </ul>
              <!-- End List Group -->
            </div>

            <div class="col-md-6 col-lg-4">
              <!-- List Group -->
              <ul
                class="list-group list-group-transparent list-group-flush list-group-borderless mb-0"
              >
                <li class="list-group-item pt-4 pb-4">
                  <div class="media text-right">
                    <span class="fas fa-eye list-group-icon mr-3"></span>
                  </div>
                </li>
              </ul>
              <!-- End List Group -->
            </div>
          </div>
          <!-- End Icon Blocks -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
queryIdentifyStatus
} from "../../../api/urls.js";
import {
  getHeaderTokenApi
} from "../../../api/axios.js";
 import {
      queryUserInfo
   } from '_api/balances.js'
  import Cookies from 'js-cookie';

export default {
  name: "login",

  data() {
    
    return {
        modal1:false,
        usState:false
    };
  },

  methods: {
   judgeStatus(){
       this.getVerifiedStatus()
   },
   cancelbtn(){
       this.modal1 = false;
   },
   queryInfo(){
          queryUserInfo(Cookies.get('loginToken')).then(res => {
                    debugger
                let countryName = res.data.country;
            })
   },
   getVerifiedStatus(){
        getHeaderTokenApi(queryIdentifyStatus,null,Cookies.get('loginToken')).then(data=>{
                if(data.code == '10013' || data.code == 'Cx000001'){
                    //登录失效
                     this.$Notice.error({
                        title: this.$t(res.code),
                        desc:this.$t(res.code)
                     });
                     setTimeout(() => {
                          this.$router.push('/login')
                     }, 3000);
                }else if(data.data.passed){//通过
                     queryUserInfo(Cookies.get('loginToken')).then(res => {
                        let countryName = res.data.country;
                        if(countryName=='US'){
                                this.modal1 = false;
                                this.usState = true;
                        }else{
                             this.modal1 = true;
                             this.usState = false;
                        }
                        
                    })
                }else{//没有通过
                     this.modal1 = true;
                }
            },error=>{

            })
    },


  },
  computed: {
   
  
   
  },
  watch: {
   
  },
  mounted() {
    //初始化为未登录状态
  },
  created() {

  },
  beforeCreate() {}
};
</script>
<style lang='less'>
.icon-color{
    color: #12869A;
}
</style>
