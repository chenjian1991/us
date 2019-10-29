<template>
   <div class="container pt-11">
      <div class="title mt-2 mb-6" v-if="rowLists.show?false:true" :class="rowLists.default?'main-color':'withe-color'">
         {{rowLists.title}}
      </div>
      <slot></slot>
      <div class="row justify-content-between" v-for="(row,i) in rowLists.list" :key="i">
         <div :class="['col-md-'+col.num]" v-for="(col,i) in row" :key="i" class="col-box">
            <slot :name="col.name">
            </slot>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "rowbox",
      props: ['rowLists'],

   }
</script>

<style lang="less" scoped>
   .title {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
   }

   .col-box {
      display: flex;
      justify-content: center;
   }

   .main-color {
      color: #304454;
   }

   .withe-color {
      color: #FFF;
   }

</style>