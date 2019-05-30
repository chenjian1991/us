<template>
    <div>
        <Modal
            class="robotModal"
            v-model="googleRobotFlag"
            title="验证"
                :mask-closable="false"
            >
            <div id="robot"></div>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>
<script>
    export default {
        name:'googlemodal',
        props:{
            googleRobotFlag
        },
        data(){
            return {
               googleRobotFlag:''
            }
        },
        methods:{
              onloadCallback(){
                console.log(this)
                let _that = this;
                console.log("grecaptcha is ready!");
                let widgetId=grecaptcha.render('robot', {
                    'sitekey': '6Le62qUUAAAAAN9EITa_yLNUKThYL0X7sBjZ_hBo',
                    "theme":'light',
                    "size":'normal',
                    'callback': function (data) {//验证成功回调函数
                        console.log(data)
                        if(data.length!==0){
                            setTimeout(()=>{
                                _that.robotModalflag= false;
                            },2000)
                         console.log('Verified: not robot');
                        }
                    },
                    "expired-callback":function(){//验证失效回调函数
                        console.log('expired-callback')
                    },
                    "error-callback":function(){//因为网络等问题无法验证，通过回调函数提醒用户重试
                        console.log('error-callback')
                    },

                    });
                    console.log(widgetId)
                    return widgetId;

            },
           
        },
        computed:{
            modalBoolen(){
                return this.modal;
            }
        },
        watch:{


        },
        mounted(){
            this.onloadCallback()
        }
        
    }
</script>
<style  lang="less">


</style>