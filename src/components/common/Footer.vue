<template>
  <div class="footer">
    <p class="footer-box">{{ footerTxt }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerTxt: '© 2019-2020 tresso.com All rights reserved'
    }
  }
}
</script>
<style lang="less">
  .footer{
    height: 42px;
    background: #fff;
    &-box{
      line-height: 42px;
      text-align: center;
      color: #304454;
    }
  }
</style>