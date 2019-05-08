<template>
   <Modal v-model="showModal" :width="width" :mask-closable="false" :footer-hide="true" :class-name="usClassName">
      <div class="main">
         <div class="title">{{$t(title)}}</div>
         <slot></slot>
         <div v-if="showBtn">
            <Button class="sure" @click="ok">{{$t(okText)}}</Button>
            <Button class="cancel" @click="cancel">{{$t(cancelText)}}</Button>
         </div>
      </div>
   </Modal>
</template>

<script>
   export default {
      name: "usModal",
      props: ['value', 'width', 'okText', 'cancelText', 'className', 'title', 'okText', 'cancelText','showBtn'],
      data() {
         return {
            showModal: false

         }
      },
      methods: {
         ok() {
            this.$emit('ok')
         },
         cancel() {
            this.$emit('cancel')
         }
      },
      computed: {
         usClassName() {
            return 'us-modal ' + this.className//把样式固定在alert-modal里
         }
      },
      watch: {
         value(newValue) {
            this.showModal = newValue
         },
         showModal(value) {
            this.$emit('input', value)
         }
      }
   }
</script>

<style lang="less">
   .us-modal {
      .main {
         padding: 70px 66px 55px;
         .title {
            font-size: 18px;
            font-weight: bold;
            color: #344857;
         }
         .ivu-btn:focus {
            box-shadow: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            -o-box-shadow: none;
            -ms-box-shadow: none;
         }
         .sure {
            width: 180px;
            height: 40px;
            border-radius: 0;
            font-size: 14px;
            font-weight: bold;
            border: none;
            background-color: #12869A;
            color: #fff;
            padding: 0;
         }
         .cancel {
            font-size: 14px;
            color: #12869A;
            border: none;
            margin-left: 10px;
         }
      }
   }

</style>