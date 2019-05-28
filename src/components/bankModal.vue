<template>
   <Modal v-model="showModal" :width="width" :mask-closable="false" :footer-hide="true" :class-name="usClassName"
          @on-cancel="cancel">
      <div class="main">
         <slot></slot>
         <Row v-if="showBtn">
            <Col span="6">&nbsp;</Col>
            <Col span="18">
               <Button class="sure" :loading="loading" @click="ok">{{$t(okText)}}</Button>
               <Button class="cancel" @click="cancel">{{$t(cancelText)}}</Button>
            </Col>
         </Row>
      </div>
   </Modal>
</template>

<script>
   export default {
      name: "usModal",
      props: ['value', 'width', 'okText', 'cancelText', 'className', 'title', 'okText', 'cancelText', 'showBtn','loading'],
      data() {
         return {
            showModal: false,
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
      ul{
         margin-bottom: 0 !important;
      }
      .main {
         padding: 54px 100px 55px 80px;
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
            /*padding: 0 20px;*/
         }
         .cancel {
            font-size: 14px;
            color: #12869A;
            border: none;
            margin-left: 10px;
         }
      }
      .ivu-select-large.ivu-select-single .ivu-select-selection {
         height: 40px;
         line-height: 40px;
      }
      .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
         height: 40px;
         line-height: 40px;
      }
      .ivu-select-selection {
         border-color: #dcdee2;
         box-shadow: none;
      }
      .ivu-select-selection-focused, .ivu-select-selection:hover {
         border-color: #12869A;
      }
      .ivu-select-item-selected, .ivu-select-item-focus {
         color: #12869A;
      }
      .ivu-select-item-selected {
         &:hover {
            color: #12869A;

         }
      }
   }

</style>