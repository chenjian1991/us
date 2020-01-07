<template>
  <div class="depth-container" ref="depthBox">
    <canvas
      ref="deptdom"
      id="#depth-chart"></canvas>
    <!-- <v-depth-chart :data="resultData"></v-depth-chart> -->
  </div>
</template>
<script>
export default {
  props: {
    depthPicData: {
      type: Object
    }
  },
  data() {
    return {
      dataset: null,
      flag: 0,
      domFflag: 0,
      depth: ""
    };
  },
  watch: {
    depthPicData(val, oldVal) {
      const formatData = JSON.parse(JSON.stringify(val));
      
      if (this.flag === 0 && this.domFflag === 1) {
        this.initFunc(formatData);
        this.flag = 1;
      } else if (this.domFflag === 1) {
        this.depth.update(formatData);
      }
    }
  },
  methods: {
    initFunc(val) {
      this.depth = new uikit.DepthChart({
        el: this.$refs.deptdom, //canvas元素选择符
        dataset: val, //数据集，参见下面说明
        theme: uikit.Theme.dark()
      });
      console.log(this.depth);
    }
  },
  created() {},
  mounted() {
    this.domFflag = 1;
    const { depthBox: { clientWidth, clientHeight } } = this.$refs
    console.log(clientWidth, clientHeight)

    this.$refs.deptdom.width = clientWidth
    this.$refs.deptdom.height = clientHeight

  },
  destroyed() {
    this.depth = null
  }
};
</script>
<style lang='less'>
.depth-container {
  width: 450px;
  height: 506px;
  .deepth-chart {
    height: 100%;
    .deepth-chart-layout {
      height: 100% !important;
      .chart-x {
        top: auto !important;
        bottom: 0px !important;
      }
      .chart-y {
        left: 0px !important;
      }
    }
  }
  // canvas{
  //     width: 100%;
  //     height: 100%;
  // }
}
</style>