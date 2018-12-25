<template>
   <div class="content-top content-common">
      <p class="title">{{currency}} - {{currencyName}}</p>
      <Row type="flex" justify="space-between" class="row-top">
         <Col span="8">
            <div class="middle-col">
               <div class="line">
                  <h3 class="total">{{total}}</h3>
                  <p>{{$t('czTotalBalance')}} ({{currency}})</p>
               </div>
            </div>
         </Col>
         <Col span="8" align="center">
            <div class="middle-col">
               <div class="line">
                  <h3>{{frozen}}</h3>
                  <p>{{$t('czInOrder')}} ({{currency}})</p>
               </div>
            </div>
         </Col>
         <Col span="8" align="right">
            <div class="middle-col">
               <div>
                  <h3>{{available}}</h3>
                  <p>{{$t('czAvailableBalance')}} ({{currency}})</p>
               </div>
            </div>
         </Col>
      </Row>
   </div>

</template>

<script>
   export default {
      name: "depositWithdraw",
      // props:['balancesData'],
      props:{
         'balancesData':{}
      },

      data() {
         return {
            currency:'--',
            currencyName:'--',
            total:'--',
            frozen:'--',
            available:'--',
         }
      },
      mounted(){
         console.log(this.balancesData)

      },
      watch: {
         balancesData: {
            handler (newVal,oldVal) {
               console.log(newVal)
               console.log(newVal.currency,newVal.frozen)

               this.currency=newVal.currency
               this.currencyName=newVal.currencyName
               this.total=newVal.total
               this.frozen=newVal.frozen
               this.available=newVal.available
            },
            // immediate: true,
            // deep: true
         }
      },
   }
</script>

<style lang="less" scoped>
   @color: #344857;
   @color-green: #12869A;
   @color-gary:#949DA6;
   .content-top {
      .title {
         color: @color;
         font-size: 16px;
         margin-bottom: 12px;
      }
      .row-top {
         margin-top: 4px;
         margin-bottom: 33px;
         background-color: #fff;
         .middle-col {
            height: 150px;
            padding: 35px 0 40px;
            text-align: center;
            div {
               h3 {
                  display: block;
                  font-size: 32px;
                  color: @color;
                  margin-bottom: 25px;
               }
               p {
                  font-size: 14px;
                  color: @color-gary;
               }
            }
            .line {
               border-right: solid 1px #E7EAED;
               .total {
                  color: @color-green;
               }
            }
         }
      }
   }
</style>