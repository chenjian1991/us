<template>
   <Modal v-model="showModal" :class-name="apiClassName" :width="width" :mask-closable="mask_closable"
          :closable="closable" :footer-hide="footer_hide" :title="title">
      <p slot="header" style="text-align:center" v-if="showHeader">
         <span>{{$t(title)}}</span>
      </p>
      <slot></slot>
   </Modal>
</template>

<script>
   export default {
      name: 'apiModal',
      props: [
         'value',//v-modal绑定的 需要用一个值监听
         'width',
         'title',
         'className',
         'showHeader',//是否显示头部
         'closable',//右上角关闭按钮是否有效
      ],
      data() {
         return {
            footer_hide: true,//隐藏底部
            mask_closable: false,//不能点击遮罩
            showModal: false,
         }
      },
      computed: {
         apiClassName() {
            return 'api-alert-modal ' + this.className//把样式固定在alert-modal里
         }
      },
      watch: {
         value(newVal, oldVal) {
            this.showModal = newVal;     // 监测value的变化，并赋值。
         },
         showModal(val) {
            this.$emit('input', val);    // 此处监测showModald目的为关闭弹窗时，重新更换value值，注意emit的事件一定要为input。
         }
      },
   }
</script>

<style lang="less">
   .api-alert-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      .ivu-modal {
         top: 0;
      }
      .ivu-modal-content {
         padding: 0 20px;
         border-radius: 4px;
         .ivu-modal-header {
            padding-left: 0;
            border-bottom-color: #F5F5F5;
         }
         .ivu-modal-header-inner {
            font-weight: normal;
            color: #344857;
         }
         .ivu-modal-close {
            right: 10px;
            i {
               color: #949da6;
               &:hover {
                  color: #344857;
               }
            }
         }
      }
      .ivu-input-large {
         height: 42px;
         line-height: 42px;
      }
      /*tab导航的样式*/
      .ivu-tabs-nav {
         width: 100%;
         .ivu-tabs-tab {
            width: 50%;
            margin: 0 !important;
            font-size: 14px;
            color: #12869A;
            padding: 0 0 14px;
            &:hover {
               color: #12869A;
            }
         }
         .ivu-tabs-ink-bar {
            /*width: 50%;*/
            background-color: #12869A;
         }
      }
   }
</style>