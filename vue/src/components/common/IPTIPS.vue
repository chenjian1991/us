<template>
    <div class="ip_warning_box" v-if="isShowIP_waring">
         <Icon type="md-warning" class="icon" />
         {{message}}
    </div>
</template>

<script>
    import {getApi} from '_api/axios.js'
    export default {
       data() {
           return {
               isShowIP_waring: false,
               message:'Attention: please note that residents of the state of New York  and Washington are not permitted to trade on 55.com.',
           }
       },
       methods: {
           initData() {
               getApi('/api/content/ip-restrict').then(data =>{
                //    console.log(data)
                    if(data.restrict){
                        this.message = data.message
                        this.isShowIP_waring = true
                        this.$store.commit('changeIPwaring', data.restrict);
                    }
               })
           }
       },
       mounted(){
           this.initData()
       }
    }
</script>

<style lang="less" scoped>
.ip_warning_box{
    background: #9DADB4;
    width: 100%;
    display: flex;
    height: 44px;
    justify-content: center;
    align-items: center;
    color: #C83535;
    font-size:14px;
    font-weight:400;
    .icon{
        font-size: 20px;
        margin-right: 10px;
    }
}
</style>