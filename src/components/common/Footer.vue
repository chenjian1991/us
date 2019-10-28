<template>
  <div class="footer">
    <p class="footer-box">{{ footerTxt }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footerTxt: '© Copyright. All rights reserved.'
    }
  }
}
</script>
<style lang="less">
  .footer{
    height: 42px;
    background: #fff;
    &-box{
      text-align: center;
      color: #304454;
    }
  }
</style>