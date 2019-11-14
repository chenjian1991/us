<template>
  <div class="footer">
    <div class="footer-info">
      <div class="footer-info__img">
        <dl class="footer-info__address">
          <dt class="footer-info__title" v-once>{{ whereAbout.title }}</dt>
          <div class="footer-info__subTitle">
            <span>New York Office</span>
          </div>
          <dd class="footer-info__detail mb-3">
            <p v-for="(val, index) in whereAbout.addressOne" :key="index.toString()" v-once>{{ val }}</p>
          </dd>
          <div class="footer-info__subTitle">
            <span>San Francisco Office</span>
          </div>
          <dd class="footer-info__detail">
            <p v-for="(val, index) in whereAbout.addressTwo" :key="index.toString()" v-once>{{ val }}</p>
          </dd>
        </dl>
      </div>
      <div class="footer-info__link">
        <dl class="footer-info__legal">
          <dt class="footer-info__title" v-once>{{ legalTerms.title }}</dt>
          <dd class="footer-info__items" v-for="(val, index) in legalTerms.content" :key="index.toString()" v-once><a :href="val.link" target="_blank" v-once>{{ val.text }}</a></dd>
        </dl>
      </div>
      <div class="footer-info__logo"></div>
    </div>
    <p class="footer-box">{{ footerTxt }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      whereAbout: {
        title: 'Locations',
        addressOne: ['199 Water Street, 33rd Floor', 'New York, NY 10038'],
        addressTwo: ['353 Sacramento Street, 8th Floor', 'San Francisco, CA 94111']
      },
      legalTerms: {
        title: 'Legal Terms',
        content: [
          { 
            text: 'User Agreement',
            link: 'https://www.tresso.com/legal/terms'
          }, {
            text: 'Privacy Policy',
            link: 'https://www.tresso.com/legal/privacy'
          }, {
            text: 'Trading Rules',
            link: 'https://www.tresso.com/legal/tradingRules'
          }
        ]
      },
      footerTxt: '© 2019-2020 tresso.com All rights reserved'
    }
  }
}
</script>
<style lang="less">
  .footer{
    width: 100%;
    background: #151D24;
    &-info{
      display: flex;
      justify-content: space-between;
      max-width: 1110px;
      padding: 100px 0 80px;
      margin: 0 auto;
      &__img{
        width: 345px;
        height: 171px;
        background: url('./images/footer_img.png') center center no-repeat/100% 100%;
      }
      &__link{
        width: 110px;
      }
      &__title{
        font-size: 16px;
        color: #fff;
        padding-bottom: 36px;
      }
      &__detail{
        padding-left: 24px;
        background: url('./images/footer_icon_address.png') left 1px no-repeat/12px 16px;
        p{
          font-size: 14px;
          color: #B9C9D6;
        }
      }
      &__items{
        a{
          color: #B9C9D6;
          font-size: 14px;
          &:hover{
            color: #fff;
          }
        }
      }
      &__logo{
        width: 120px;
        height: 45px;
        background: url('../../assets/images/tressoHeader/logo.png') center center no-repeat/100% 100%;
      }
      &__subTitle{
        font-size: 14px;
        font-weight: 700;
        padding-left: 24px;
        color:#fff;
      }      
    }
    &-box{        
      line-height: 90px;
      text-align: center;
      color: #77838F;
      background: #12191F;
    }
  }
  @media screen and (max-width: 710px){
    .footer{
      &-info{
        width: 100%;
        margin: 0 auto;
        justify-content: center;
        flex-direction: column;
        padding-left: 10%;
        &__img{
          width: 100%;
          height: auto;
        } 
        &__link{
          margin-top: 28px;
        }
        &__title{
          padding-bottom: 20px;
        }
        &__logo{
          margin-top: 41px;
        }
      }
    }
  }
</style>