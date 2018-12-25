<template>
    <div class="main_container">
        <TradeCenterHeader v-if="showTradeHeader"/>
        <Header2 v-else/>
        <!-- Content 内容 -->
        <div style="flex:1;height:100%;width:100%;">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header2 from '@/components/common/Header.vue'
    import TradeCenterHeader from '@/components/common/TradeCenterHeader.vue'
    import Footer from '../../components/common/Footer.vue'
    export default {
        data(){
            return{
                ifAPP:false,
                showTradeHeader:false,
                routerArr:['home','Bhome','Shome','Fhome','Chome','login','register'],
            }
           
        },
        watch:{
            $route(to,from){ //路由site变化 
                if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
                    this.showTradeHeader = true
                }else{
                    this.showTradeHeader = false
                }
            },
        },
        components: {
           Footer,
           Header2,
           TradeCenterHeader
        },
        mounted(){
            this.ifAPP = this.$store.state.app.ifAPP;
            if(this.routerArr.join(',').lastIndexOf(this.$route.name) == -1){
                this.showTradeHeader = true
            }else{
                this.showTradeHeader = false
            }
        }
    }
</script>
<style lang="less" scoped>

</style>