<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'app',
        components: {},
        data() {
            return {

            }
        },
        methods: {},
        computed: {
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch: {
            languageChange(val,oldVal){//监听全局语言的状态
                //SEO 中英文切换支持
                this.HomeKeyword = this.$t('HomeKeyword')
                this.HomeDescription = this.$t('HomeDescription')
                if(this.$route.meta){
                    this.HomeTitle = this.$t(this.$route.meta.title)
                }
            },
        },
        mounted() {
            this.$Notice.config({
                duration: 5
            });
        }
    }
</script>
<style lang="less">
    ul li {
        list-style: none;
    }

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-size:14px;
        #app{
            height: 100%;
            width: 100%;
        }
    }
    a, a:visited, a:active ,a:hover{
        text-decoration: none !important;
        outline: none !important;
    }

</style>