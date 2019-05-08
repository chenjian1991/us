<template>
   <div class="wrapper" id="apiManage">
      <div class="container">
         <div class="top">
            <div><strong>{{$t('ApiManageAPISetting')}}</strong><span>{{$t('CreateAPINotDisclose')}}</span></div>
         </div>
         <!--<p class="title">网格交易</p>-->
         <div class="below">
            <Row>
               <Col span="3">
                  <div id="qrcode" class="qrcode">
                     <img src="../../assets/images/api/lock.png" class="img" v-if="!showFirst">
                  </div>
               </Col>
               <Col span="18">
                  <ul>
                     <li><span class="key">{{$t('ApiManageAccountID')}} </span><span class="value">{{accountId}}</span>
                     </li>
                     <li><span class="key">API Key: </span><span class="value">{{secret_key_id}}</span></li>
                     <li>
                        <span class="key">Secret Key:  </span>
                        <span class="value">
                           <Tooltip placement="top">
                              <Icon type="md-alert" style="color: #CAD0D6;font-size: 16px;cursor: pointer"/>
                              <div slot="content">
                                 <p>{{$t('ApiManageForSecurity')}}</p>
                              </div>
                           </Tooltip>
                           &nbsp;{{secret_key||'******'}}</span>
                     </li>
                     <li class="warning" v-if="showFirst">
                        <Icon type="md-alert" style="font-size: 16px"/>&nbsp;{{$t('ApiManageStoreSecret')}}
                     </li>
                  </ul>
               </Col>
               <Col span="3" align="right">
                  <Button class="btn" @click="showDelete=true">{{$t('ApiManageDelete')}}</Button>
               </Col>
            </Row>
         </div>
      </div>
      <!--API密钥创建-->
      <no-header-modal className="alert-create-success" v-model="showSuccess" :closable="closable" width="430">
         <div class="alert-content">
            <img src="../../assets/images/api/success.png" class="img">
            <p class="alert-title">{{$t('ApiManageAPIKeyCreated')}}</p>
            <Button class="sure" @click="showSuccess=false">{{$t('ApiManageClose')}}</Button>
         </div>
      </no-header-modal>
      <!--删除API-->
      <no-header-modal className="alert-delete" v-model="showDelete" :closable="closable" width="430">
         <div class="alert-content delete-content">
            <div class="delete-box">
               <div>
                  <p class="alert-title delete-title">{{$t('ApiManageSureDelete')}}</p>
                  <p class="alert-title">{{secret_key_id}}</p>
               </div>
            </div>

            <div class="space">
               <Button class="two-btn no" @click="showDelete=false">{{$t('ApiManageNo')}}</Button>
               <Button class="two-btn yes" @click="toDelete">{{$t('ApiManageYes')}}</Button>
            </div>
         </div>
      </no-header-modal>
   </div>
</template>

<script>
   import QRCode from 'qrcodejs2'//二维码
   import {Exchange} from '@/interface/exchange.js'
   import noHeaderModal from '@/components/noHeaderModal'
   import Cookies from 'js-cookie'

   import {
      updateSecretKey,
      closeSecretKey
   } from '_api/balances.js'

   export default {
      name: "apiManage",
      components: {
         'no-header-modal': noHeaderModal,
      },
      data() {
         return {
            closable: true,
            ssot: '',
            apit: '',
            accountToken: '',
            accountId: '',
            secret_key_id: '--',
            secret_key: '',
            showSuccess: false,
            showDelete: false,
            showFirst: false,
         }
      },
      methods: {
         checkInit() {
            let loginToken = this.ssot || Cookies.get('loginToken')
            let ssoProvider = {};
            //创建实例
            this.exchange = new Exchange(ssoProvider);
            if (loginToken) {
               this.exchange.ssoProvider.getSsoToken = function (fn) {
                  fn(loginToken);
               };
            } else {
               this.$router.push('/login')
            }
         },
         init() {
            let getAccountToken = new Promise((resolve) => {
               this.exchange.getAccountToken(function (result) {
                  resolve(result)
               }.bind(this))
            })
            let getAccountId = new Promise((resolve) => {
               this.exchange.getAccountId(function (result) {
                  resolve(result)
               }.bind(this))
            })
            Promise.all([getAccountToken, getAccountId]).then((result) => {
               this.accountToken = result[0]
               this.accountId = result[1]
               updateSecretKey({
                  token: result[0],
                  accountId: result[1],
                  apiApplyToken: this.apit
               }).then(res => {
                  this.showSuccess = true
                  this.secret_key_id = res.secret_key_id
                  this.secret_key = res.secret_key
                  this.qrcode()
               }).catch(() => {
                  this.$router.push('createAPI')
               })
            })
         },
         initDaily() {
            this.exchange.getAccountInfo(function (result) {
               this.accountId = result.accountId
               if (result.secretKeySummaryList.length !== 0) {
                  this.secret_key_id = result.secretKeySummaryList[0].secretKeyId
               } else {
                  this.$router.push('createAPI')
               }
            }.bind(this))
         },
         qrcode() {
            new QRCode('qrcode', {
               width: 107,
               height: 107,
               text: this.secret_key
            })
         },
         toDelete() {
            (async () => {
               await new Promise(resolve => {
                  if (this.accountToken) {
                     resolve()
                  } else {
                     this.exchange.getAccountToken(function (result) {
                        this.accountToken = result
                        resolve()
                     }.bind(this))
                  }
               })
               await new Promise(resolve => {
                  closeSecretKey({
                     token: this.accountToken,
                     accountId: this.accountId,
                  }).then(() => {
                     this.showDelete = false
                     this.$Notice.success({
                        title: this.$t('ApiManageSucced')
                     });
                     resolve()
                  })
               })
            })()
            setTimeout(function () {
               this.$router.push('createAPI')
            }.bind(this), 2000)
         },
      },
      mounted() {
         if (Object.keys(this.$route.query).length === 0) {//日常进入
            this.checkInit()
            this.initDaily()
         } else {//邮件链接进入
            this.ssot = this.$route.query.ssot
            this.apit = this.$route.query.apit
            this.showFirst = true
            this.checkInit()
            this.init()
         }
      }
   }
</script>
<style lang="less">
   #apiManage {
      .ivu-tooltip-inner {
         white-space: normal;
      }
   }
</style>
<style lang="less" scoped>
   @color: #12869A;

   .wrapper {
      padding: 20px 0 40px;
      background-color: #F7F9FA;
      .container {
         width: 1200px;
         margin: 0 auto;
         padding: 20px 0;
         color: #344857;

         .top {
            height: 58px;
            line-height: 58px;
            background-color: #fff;
            div {
               padding-left: 20px;
            }
            strong {
               font-size: 20px;
               font-weight: normal;
               margin-right: 20px;
            }
            span {
               font-size: 14px;
               color: #949DA6;
            }
         }
         .title {
            font-size: 16px;
            margin-top: 38px;
            margin-bottom: 14px;
         }
         .below {
            height: 180px;
            background-color: #fff;
            padding: 30px;
            margin-top: 14px;

            .qrcode {
               background-color: #F5F7F8;
               width: 120px;
               height: 120px;
               padding: 7px;
               display: -webkit-flex;
               display: flex;
               align-items: center;
               justify-content: center;
               .img {
                  width: 30px;
               }
            }
            ul {
               li {
                  font-size: 14px;
                  line-height: 32px;
                  .key {
                     color: #949DA6;
                  }
                  .value {

                  }
               }
            }
            .btn {
               color: @color;
               border: 1px solid @color;
               border-radius: 0;
               padding: 6px 22px;
               &:hover {
                  background-color: @color;
                  color: #fff;
               }
            }
            .warning {
               color: #EA4853;
            }
         }
      }
   }

   .alert-content {
      padding: 20px 64px 20px;
      text-align: center;
      .img {
         width: 46px;
         margin-bottom: 25px;
      }
      .alert-title {
         font-size: 14px;
         color: #344857;
         margin-bottom: 20px;
      }
      .sure {
         width: 100%;
         height: 40px;
         margin-top: 20px;
         background-color: @color;
         font-size: 14px;
         color: #fff;
      }

   }

   .delete-content {
      padding: 20px 32px 20px;
      .delete-box {
         display: flex;
         justify-content: center;
         margin-top: 20px;
         div {
            text-align: left;
            .delete-title {
               color: #949DA6;
               margin-bottom: 5px;
            }
         }
      }

      .space {
         display: flex;
         justify-content: space-between;
         margin-top: 22px;
         .two-btn {
            width: 110px;
            height: 38px;
         }
         .no {
            border: 1px solid @color;
            border-radius: 2px;
            color: @color;
         }
         .yes {
            background-color: @color;
            color: #fff;
         }
      }
   }

   /*.alert-create-success {*/
   /*.alert-content {*/
   /*padding: 20px 10px 40px;*/
   /**/
   /*.sure {*/
   /*width: auto;*/
   /*padding: 0 38px;*/
   /*}*/
   /*}*/
   /*}*/

</style>