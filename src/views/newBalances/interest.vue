<template>
<div>
    <AccountInfo name="AccountInfo" />

    <div class="bg-light">
      <div class="container space-2">
        <div class="row justify-content-md-between">
          <div class="col-md-8 mb-7 mb-md-0">
            <div class="pr-md-4">
              <!-- Title -->
              <div class="mb-4">
                <h2 class="h4">{{$t('CurrencyInterest')}}</h2>
                <p>{{$t('usdddescribe')}}</p>
              </div>
              <!-- End Title -->


              <!-- Clipboard Input -->
              <div class="row mb-7 changemb">
                    <div class="col-sm-6 col-md-6 mb-7 changemb">
                      <!-- Icon Block -->
                      <div class="media align-items-center mb-2">
                        <figure id="iconExample15-29" class="svg-preloader ie-height-40 w-100 max-width-6 mr-3">
                          <img class="js-svg-injector" src="../../assets/images/usdd/icon-22.svg" alt="SVG" data-parent="#iconExample15-29">
                        </figure>
                        <div class="media-body">
                          <h4 class="h6 mb-0">{{$t('trust')}}</h4>
                        </div>
                      </div>
                      <!-- End Icon Block -->
                    </div>

                    <div class="col-sm-6 col-md-6 mb-7 changemb">
                      <!-- Icon Block -->
                      <div class="media align-items-center mb-2">
                        <figure id="iconExample15-26" class="svg-preloader ie-height-40 w-100 max-width-6 mr-3">
                          <img class="js-svg-injector" src="../../assets/images/usdd/icon-2.svg" alt="SVG" data-parent="#iconExample15-26">
                        </figure>
                        <div class="media-body">
                          <h4 class="h6 mb-0">{{$t('andDraw')}}</h4>
                        </div>
                      </div>
                      <!-- End Icon Block -->
                    </div>

                    <div class="col-sm-6 col-md-6 mb-7 mb-md-0">
                      <!-- Icon Block -->
                      <div class="media align-items-center mb-2">
                        <figure id="iconExample15-31" class="svg-preloader ie-height-40 w-100 max-width-6 mr-3">
                          <img class="js-svg-injector" src="../../assets/images/usdd/icon-3.svg" alt="SVG" data-parent="#iconExample15-31">
                        </figure>
                        <div class="media-body">
                          <h4 class="h6 mb-0">{{$t('redeeming')}}</h4>
                        </div>
                      </div>
                      <!-- End Icon Block -->
                    </div>
                    
              </div>
              <div class="changeWidth">
                    <router-link to="/balances" tag="a" > 
                       <button type="button" class="btn btn-block btn-sm btn-primary transition-3d-hover">{{$t('getUsdd')}}</button>
                    </router-link>
                    <router-link to="/balances" tag="a" class="mt">
                        <button type="button" class="btn btn-block btn-sm btn-primary transition-3d-hover">{{$t('more')}}</button>                    
                    </router-link>
              </div>
              <!-- End Clipboard Input -->


            </div>
          </div>

          <div class="col-md-4 col-lg-4">
            <!-- Stats -->
            <div class="bg-primary shadow-primary-lg rounded pt-6 pb-3 px-5">
              <!-- Title & Settings -->
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="h6 text-white mb-0">{{$t('myInterest')}}</h4>

              </div>
              <!-- End Title & Settings -->

              <hr class="mt-3 mb-4 changeColor">

              <!-- Referral Info -->
              <div class="py-2">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-3">
                      <span class="d-block text-white-70 font-size-1">{{$t('accrueDividends')}}: </span>
                      <span class="text-white font-size-3 font-weight-medium text-lh-sm moneysize">{{this.information.cumulativeInterest === null ? 0 : this.information.cumulativeInterest}} <a>{{this.information.currency}}</a></span>
                    </div>


                    <hr class=" mt-3 mb-4 changeColor">
                    <div class="allmb3" style="line-height:27px;">
                      <div class="mb3">
                      <span class="text-white-70 font-size-1">{{$t('interesRate')}}:</span>
                      <span class="text-white font-weight-medium font-size-1"> {{this.information.interestRate === null ? 0 : this.information.interestRate}}%</span>
                      </div>
                      <div class="mb3">
                        <span class="text-white-70 font-size-1">{{$t('interesDay')}}: </span>
                        <span class="text-white font-weight-medium font-size-1">{{dateFormat(this.information.nextReleaseDate)}}</span>
                      </div>
                      <div class="mb3">
                        <span class="text-white-70 font-size-1">
                          {{$t('dererredInterest')}}<span class="far fa-question-circle text-secondary mx-2" style="font-size:16px;" data-toggle="tooltip" data-placement="top" title="Some example text goes here"></span>
                        </span>
                        <span class="text-white font-weight-medium font-size-1">{{this.information.pendingInterest === null ? 0 : this.information.pendingInterest}} {{this.information.currency}}</span>
                      </div>
                      <div class="mb3">
                        <span class="text-white-70 font-size-1">
                          {{$t('interesPeriod')}}:
                        </span>
                        <span class="text-white font-weight-medium font-size-1">{{this.information.releasePeriodNum === null ? 0 : this.information.releasePeriodNum}} {{this.information.releasePeriodUnit}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-6 align-self-end">
                    <!-- Pie Circle -->
                    <div class="js-pie text-center"
                       data-circles-text-class="content-centered-y"
                       data-circles-value="54"
                       data-circles-max-value="100"
                       data-circles-bg-color="rgba(255, 255, 255, 0.1)"
                       data-circles-fg-color="#ffffff"
                       data-circles-radius="50"
                       data-circles-stroke-width="4"
                       data-circles-duration="2000"
                       data-circles-scroll-animate="true"
                       data-circles-color="#ffffff"
                       data-circles-font-size="24"></div>
                    <!-- End Pie Circle -->
                  </div>
                </div>
              </div>
              
              <!-- End Referral Info -->
            </div>
            <!-- End Stats -->
          </div>
        </div>

        <hr class="my-7">

        <!-- Title -->
        <div class="card-body p-4">
            <!-- Activity Table -->
            <div class="table-responsive-md u-datatable">
              <table class="js-datatable table table-borderless u-datatable__striped u-datatable__content u-datatable__trigger mb-5">
                <thead>
                  <tr class="text-uppercase font-size-1 tableColor">
                    <th scope="col" class="font-weight-medium">
                      <div class="d-flex justify-content-between align-items-center">
                        {{$t('time')}}
                      </div>
                    </th>
                    <th scope="col" class="font-weight-medium">
                      <div class="d-flex justify-content-between align-items-center">
                        {{$t('coin')}}
                      </div>
                    </th>
                    <th scope="col" class="font-weight-medium" style="  width: 45%;">
                      <div class="d-flex justify-content-between align-items-center">
                        {{$t('amont')}}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="font-size-1">
                  <tr class="js-datatabale-details" v-show="isShow" v-for="(item,ind) in HomepageList" :key="ind">
                    <td class="align-middle">
                      <div class="media align-items-center">
                        <span>{{dateFormat(item.createdTime)||0}}</span>
                      </div>
                    </td>
                    <td class="align-middle">
                      <div class="media align-items-center">
                        <span>{{item.currency}}</span>
                      </div>
                    </td>
                    <td class="align-middle text-secondary">{{item.amount}}</td>
                  </tr>

                </tbody>
              </table>
              <div v-show="!isShow" class="noneData">暂无数据</div>
            </div>
            
            <!-- End Activity Table -->

            <!-- Pagination -->
            <div v-show="isShow" class="page">
                <div class="page-box" @click="prevPageComplete" :disabled="prevComplete"
                    :class="prevComplete?'disabled-style':'green-color-style'">{{$t('orderPagePrev')}}
                </div>
                <div class="page-box" @click="nextPageComplete" :disabled="nextComplete"
                    :class="nextComplete?'disabled-style':'green-color-style'">{{$t('orderPageNext')}}
                </div>
            </div>
            <!-- End Pagination -->
          </div>

      </div>
    </div>
</div>
</template>

<script>
   import AccountInfo from "../../components/common/AccountInfo.vue";
   import {interestList, interestmessage} from "../../../api/urls.js"
   import {getApi} from "../../../api/axios.js"

export default {
    components: {
         AccountInfo
      },
        data(){
            return{
              index:1,
            // 每页显示的条数
              pageSize:10,
              prevComplete: true,
              nextComplete: false,
              // showList:[],
              // totalProblemList:[]
              totalPage:0,
              historyList:[],
              HomepageList:[],
              information:[],
              isShow:true
            }
        },
        methods: {
          //相关信息
          initmessage() {
            let params = {
                 ssoToken:$cookies.get('loginToken')
             }
            getApi(interestmessage,params).then((res) =>{
              this.information = res
                    // if(res.code){
                    // }else{
                    // }
            })
          },
          // 转换时间格式
          dateFormat (time) {
            var date=new Date(time);
            var year=date.getFullYear()||0;
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1||0;
            var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate()||0;
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours()||0;
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes()||0;
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds()||0;
            // 拼接
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
          },
          //初始值记录
          initimeList() {
            let params = {
                 ssoToken:$cookies.get('loginToken')
             }
            getApi(interestList,params).then((res) =>{
              this.historyList = res
              this.HomepageList=this.historyList.slice(0,this.pageSize)
              if(this.historyList.length<=0){
                this.isShow = false
              }else{
                this.isShow = true
              }
              if(this.historyList.length/this.pageSize > parseInt(this.historyList.length/this.pageSize)){
                this.totalPage = parseInt(this.historyList.length/this.pageSize)+1
              }else{
                this.totalPage = parseInt(this.historyList.length/this.pageSize)
              }
            })
          },
          prevPageComplete() {
            if (!this.prevComplete && this.index > 1) {
              this.index--;
              this.nextComplete = false
              this.HomepageList=this.historyList.slice((this.index - 1) * this.pageSize,this.index * this.pageSize)
            }else{
              if(this.index === 1){
                this.nextComplete = true
              }else{
                this.prevComplete = true
                this.nextComplete = false
              }
              
            }
         },
         nextPageComplete() {
            if (!this.nextComplete  && this.index < this.totalPage) {
               this.prevComplete = false
               this.index++;
               this.HomepageList=this.historyList.slice((this.index - 1) * this.pageSize,this.index * this.pageSize)
            }else{
              this.nextComplete = true
            }
         }
        },
        mounted(){
          this.initimeList()
          this.initmessage()
        }

}
</script>
<style>
.ivu-page>li:hover{
  border-color:#12869A;
}
.ivu-page-item-active{
  border-color:#12869A;
}
.ivu-page-options-elevator>input:hover{
  border-color:#12869A;
}
</style>

<style lang="less" scoped>

@color-light-gary: #E7EAED;
@color-green: #12869A;
.changeColor{
    border-top: 1px solid #fff; 
}
.moneysize {
  font-weight: bolder;
}
.moneysize > a{
  font-size:14px;
}
button {
  border: 0;
  outline: none;
}
.tableColor{
  background:#E8E8E8;
  font-weight: bold;
}
.u-datatable .u-datatable__trigger-icon::before{
    content: "";
}
.btn-primary{
    color: #fff;
    background-color: #12869A;
    border-color: #12869A;
}
.changeWidth > a{
  text-decoration:none;
}
.changemb{
  margin-bottom:2rem !important;
}
.noneData{
  width:100%;
  text-align: center;
  border-top:solid 1px #F1F1F1;
  border-bottom:solid 1px #F1F1F1;
  padding:15px 0;
}
.page {
  margin-top: 20px;
  text-align: right;
  .page-box {
      display: inline-block;
      height: 32px;
      line-height: 30px;
      padding: 0 10px;
      border: 1px solid;
      border-radius: 4px;
      margin-left: 10px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
}
.disabled-style {
  color: #949DA6;
  border-color: #949DA6;
  cursor: not-allowed;
}
.green-color-style {
  color: @color-green;
  border-color: @color-green;
  cursor: pointer;
  &:hover {
      background-color: @color-green;
      color: #fff;
  }
}
@media (max-width: 768px){
  .mt{
    margin-top:2rem;
  }
}
@media (min-width: 768px){
  .changeWidth{
    display: flex;
    color: #fff !important;
    // background-color: #12869A; 
    // border-color: #12869A; 
    a{
      margin-left:30px;
      button{
        padding: 0.625rem 8.125rem;
      }
    }
  }
}
</style>
