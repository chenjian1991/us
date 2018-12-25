<template>
    <div>
        我的测试页面
        <div class="myTestBox">
            <div>BUy</div>
            <!-- <Loading scale="10" v-model="loading" /> -->
        </div>
         <!-- <Tabs value="name1" :animated="false">
            <TabPane label="标签一" name="name1"><div style="height:100px;background:red"></div></TabPane>
            <TabPane label="标签二" name="name2"><div style="height:200px;background:green"></div></TabPane>
            <TabPane label="标签三" name="name3">标签三的内容</TabPane>
        </Tabs> -->
        <button @click="aaa">23123</button>
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    export default {
        data() {
            return {
                loading: true,
            }
        },
        components:{
            Loading
        },
        methods: {
            aaa() {
                this.loading = !this.loading
            }
        },
    }
</script>

<style scoped>
.myTestBox{
    width: 300px;
    height:600px;
    background: #27a781;
    /* display: flex;
    align-items: center;
    justify-content: center; */
}
.teset{
    background: #ccc;
    width:20px;
    height: 100px;
}
</style>