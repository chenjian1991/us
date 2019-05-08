<template>
   <div class="wrapper">
      <div class="container">
         <div class="content">
            <img src="../../assets/images/api/logo.png" class="img">
            <h3>{{$t('SendEmailCreateNewKey')}}</h3>
            <div class="operate">
               <div style="text-align: left">
                  <p class="alert-title">{{$t('SendEmailInstructions1')}}</p>
                  <p class="alert-title">{{$t('SendEmailInstructions2')}}</p>
                  <ul>
                     <li>{{$t('SendEmailInstructions3')}}</li>
                     <li>{{$t('SendEmailInstructions4')}}</li>
                     <li>{{$t('SendEmailInstructions5')}}</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "sendEmail",
   }
</script>

<style lang="less" scoped>
   @color: #12869A;
   .wrapper {
      padding: 20px 0 40px;
      background-color: #F7F9FA;
      .container {
         width: 1200px;
         min-height: 500px;
         background-color: #fff;
         margin: 0 auto;
         text-align: center;
         padding: 105px 0;
         .content {
            .img {
               width: 130px;
            }
            h3 {
               font-size: 16px;
               color: #344857;
               margin-top: 50px;
               margin-bottom: 28px;
            }
            p {
               color: #344857;
               font-size: 14px;
               .high-color {
                  color: @color;
               }
            }
            .operate {
               display: flex;
               justify-content: center;
               .alert-title{
                  margin-top: 17px;
               }
               ul{
                  margin-top: 4px;
                  li{
                     font-size: 14px;
                     line-height:26px;
                     list-style: disc;
                     color: #949DA6;
                     margin-left: 16px;
                  }
               }
            }
         }
      }
   }
</style>