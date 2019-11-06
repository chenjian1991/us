<template>
   <div>
      <tressoHeader></tressoHeader>
      <!-- Content 内容 -->
      <div style="flex:1;height:100%;width:100%;flex-basis:auto;">
         <router-view></router-view>
      </div>
      <Footer></Footer>
      <div class="footerTips">
         <div class="cookiesBox" v-if="isShowCookiesBox">
            <div>Our site uses cookies. By continuing to use our site you are agreeing to our
               <router-link to="/legal/privacy" class="gotoPolicy">Cookie Policy</router-link>
               .
            </div>
            <div class="cookiesBtn" @click="closeCookiesBox">OK, I UNDERSTAND</div>
         </div>
         <div class="ipBox" v-if="isShowIPModal">
            <div class="ipText">{{message}}</div>
            <a class="closeBtn" @click="closeIpmodal">CLOSE</a>
         </div>
      </div>
   </div>
</template>

<script>
   import tressoHeader from '../../components/common/tressoHeader'
   // import tressoHeader from '@/components/common/tressoHeader.vue'
   import Footer from '../../components/common/Footer'

   export default {
      data() {
         return {
            isShowIPModal: true,
            isShowCookiesBox: false,
            message: 'Attention: Please note that residents of the state of Connecticut, Florida, Texas, Hawaii, Mississippi, New Jersey, Maine, New York, North Carolina, North Dakota, Ohio, South Carolina, Vermont, or Washington are not permitted to trade on tresso.com.',
         }
      },
      methods: {
         closeIpmodal() {
            this.isShowIPModal = false
         },
         closeCookiesBox() {
            this.isShowCookiesBox = false
            window.localStorage.setItem('COOKIESMODAL', 'CLOSED')
         }
      },
      components: {
         Footer,
         tressoHeader,
      },
      mounted() {
         let cookiesModalFlag = window.localStorage.getItem('COOKIESMODAL')
         if (cookiesModalFlag !== 'CLOSED') {
            this.isShowCookiesBox = true
         } else {
            this.isShowCookiesBox = false
         }
      }
   }
</script>
<style lang='less'>
   @media screen and (min-width: 320px) and(max-width: 970px) {
      html {
         position: relative;
         body {
            position: relative;
         }

      }
   }
</style>
<style lang="less" scoped>
   .footerTips {
      bottom: 0;
      position: fixed;
      width: 100vw;
      z-index: 90;
      .cookiesBox {
         width: 100%;
         background: rgba(48, 70, 85, .9);
         color: #fff;
         padding: 10px 35px;
         display: flex;
         justify-content: space-between;
         text-align: center;
         font-size: 14px;
         .cookiesBtn {
            color: #fff;
            cursor: pointer;
         }
         .gotoPolicy {
            color: #fff;
            text-decoration: underline !important;
         }
      }
      .ipBox {
         width: 100%;
         height: 100%;
         background: rgba(33, 40, 48, .9);
         padding: 10px 35px !important;
         text-align: left;
         position: relative;
         display: flex;
         color: #fff;
         font-size: 14px;
         margin-bottom: 0;
         .closeBtn {
            margin-left: 20px;
            color: #fff;
            &:hover {
               color: #fff;
            }
         }
      }
   }
</style>