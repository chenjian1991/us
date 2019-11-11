<template>
  <div class="gbbomain">
    <!-- one 包括盘口  K线 -->
    <div class="gbbomain-realtime">
      <!-- 盘口 -->
      <div class="gbbomain-realtime__item">
        <!-- 切换 header -->
        <div class="gbbomain-realtime__hd"></div>
        <!-- 盘口 -->
        <div class="gbbomain-realtime__box"></div>
      </div>
      <!--K线-->
      <div class="gbbomain-realtime__line">

      </div>
    </div>
    <!-- two 买入卖出 历史成交 -->
    <div class="gbbomain-transaction">

    </div>
    <!-- 当前订单，历史订单 -->
    <div class="gbbomain-order">

    </div>
  </div>
</template>
<script>
export default {
  name: 'gbbo',
  data(){
    return{}
  },
  created() {
    
  },
  mounted() {
    
  },
  props: {

  },
  computed: {
    
  },
  methods: {

  },
  components:{

  }
}
</script>
<style lang="less">
.gbbomain{
  min-width: 1280px;
  &-realtime{
    display: flex;
  }
  &-transaction{
    display: flex;
  }
  &-order{
    display: flex;
  }
}
</style>