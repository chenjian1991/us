<template>
   <Modal v-model="showModal" :class-name="alertClassName" :width="width" :mask-closable="mask_closable"
          :closable="closable" :footer-hide="footer_hide">
      <p slot="header" style="text-align:center" v-if="showHeader">
         <span>{{$t(title)}}</span>
      </p>
      <slot></slot>
   </Modal>
</template>

<script>
   export default {
      name: 'alertModal',
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
         alertClassName() {
            return 'alert-modal ' + this.className//把样式固定在alert-modal里
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
   .alert-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      .ivu-modal {
         top: 0;
      }
      .ivu-modal-content {
         border-radius: 4px;
         .ivu-modal-close {
            i {
               color: #949da6;
               &:hover{
                  color: #344857;
               }
            }
         }
         .ivu-modal-header {
            /*background: #5A6CB1;*/
            height: 50px;
            border-radius: 4px 4px 0 0;
            p {
               color: #344857;
               font-size: 16px;
            }
         }
      }
      .ivu-input-large {
         height: 42px;
         line-height: 42px;
      }
   }

</style>
