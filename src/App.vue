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
                duration: 3
            });
        }
    }
</script>
<style lang="less">
    // 修改ivew 默认样式
    // 
   
//     .ivu-modal-footer{
//         border-top:0 !important;
//     }
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

//     /* reset */
//     html, body {
//         width: 100%;
//         height: 100%;
//         margin: 0;
//         padding: 0;
//         font-size: 100%;
//          #app{
//              height: 100%;
//              width: 100%;
//          }
//     }

//     * {
//         -webkit-box-sizing: border-box;
//         -moz-box-sizing: border-box;
//         -ms-box-sizing: border-box;
//         box-sizing: border-box;
//     }

    // body {
    //     -webkit-text-size-adjust: 100%;
    //     -webkit-tap-highlight-color: transparent;
    //     -webkit-touch-callout: none;
    //     word-wrap: break-word;
    //     line-height: 1.5;
    //     font-family:'helvetica','Microsoft YaHei','PingFang SC';
    //     font-size: 14px;
    //     color: #333;
    // }
//    html,body,div,span,em,a,p,h1, h2, h3, h4, h5, h6,table,tr,td,ol,dl,dt,dd,ul,li,button,select,input{
//     font-family:'helvetica','Microsoft YaHei','PingFang SC';
// }

//     /*在firefox下框线*/
//     input::-moz-focus-outer {
//         outline: none;
//         border: none;
//     }

    a, a:visited, a:active ,a:hover{
        text-decoration: none !important;
        outline: none !important;
    }

//     a {
//         font-size: inherit;
//         color: inherit;
//     }

//     input, textarea {
//         outline: none;
//     }

//     h1, h2, h3, h4, h5, h6, address, em {
//         font-weight: normal;
//         font-style: normal;
//     }
//     #cnzz_stat_icon_1274712423{
//         display: none;
//     }
</style>