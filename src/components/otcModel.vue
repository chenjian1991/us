<template>
   <div >
      <Modal v-model="showModal" :class-name="otcClassName" :width="width" :closable="closable">
         <p slot="header" style="text-align:center">
            <span>{{$t(title)}}</span>
         </p>
         <slot></slot>

         <div slot="footer">
            <slot name="footer_message"></slot>  <!-- 首页确认下单付款时限倒计时 -->
            <Button v-if="cancelText"  size="large" @click="dialogCancel" >{{$t(cancelText)}}</Button>
            <Button v-if="okText" type="primary" size="large" @click="dialogOk" >{{$t(okText)}}</Button>
         </div>
      </Modal>
   </div>
</template>

<script>
   export default {
      name:'otcModal',
      props:{
         value:{},
         width:{},
         title:{
            type: String,
         },//弹窗的title
         closable:{},
         cancelText:{
            type: String,
         },
         okText:{
            type: String,
         },
         className:{
            type: String
         } //自定义的组件样式
      },
      data(){
         return {
            showModal:false,
         }
      },
      methods:{
         dialogOk(){
            this.$emit('ok')
            this.showModal = false
         },
         dialogCancel(){
            this.showModal = false
            this.$emit('cancle')
         }

      },
      computed:{
         otcClassName(){
            return 'otc_modal_box '+ this.className
         }

      },
      watch:{
         value(newVal, oldVal){
            this.showModal = newVal;     // 监测value的变化，并赋值。
         },
         showModal(val) {
            this.$emit('input', val);    // 此处监测showModald目的为关闭弹窗时，重新更换value值，注意emit的事件一定要为input。
         }
      },
      mounted(){
         this.showModal = this.value;

      }

   }
</script>

<style  lang="less">
   .otc_modal_box{
      .ivu-modal-content{
         border-radius: 4px;
         .ivu-modal-close{
            i{
               color: #fff;
            }
         }
         .ivu-modal-header{
            background: #5A6CB1;
            height: 50px;
            p{
               color:#fff;
               font-weight: bold;
               font-size: 16px;
            }
         }
         .ivu-modal-footer{
            border-top:0;
         }
      }
   }

</style>