<template>
<div :style="{zoom:scale}" v-if="value" class="loadingBox">
    <div class="lds-css ng-scope"  >
      <div style="width:100%;height:100%"  class="lds-double-ring">
        <div></div>
        <div></div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: "Loading",
  data() {
      return {
          isShow:'',
      }
  },
  watch: {
      // value(newValue, oldValue) {
      //     this.isShow = newValue
      // },
  },
  props: {
      scale: {
          type:String,
          default: "1",
      },
      value:{

      }
  },
};
</script>

<style scoped>

@keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-double-ring {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes lds-double-ring_reverse {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
.lds-double-ring {
  position: relative;
}
.loadingBox{
  width:20px;
  height: 20px;
  margin: 0 auto;
  display: inline-block;
}
.lds-double-ring div {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  border: 20px solid #000;
  border-color: #51dcff transparent #51dcff transparent;
  -webkit-animation: lds-double-ring 1.6s linear infinite;
  animation: lds-double-ring 1.6s linear infinite;
}
.lds-double-ring div:nth-child(2) {
  width: 156px;
  height: 156px;
  top: 22px;
  left: 22px;
  border-color: transparent #00f2ff transparent #00f2ff;
  -webkit-animation: lds-double-ring_reverse 1.6s linear infinite;
  animation: lds-double-ring_reverse 1.6s linear infinite;
}
.lds-double-ring {
  width: 20px !important;
  height: 20px !important;
  -webkit-transform: translate(-10px, -10px) scale(0.1) translate(10px, 10px);
  transform: translate(-10px, -10px) scale(0.1) translate(10px, 10px);
}
</style>