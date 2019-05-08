<template>
    <div>
        <Modal v-model="isShow" class-name="vertical-center-modal">
            <p>{{text}}</p>
         </Modal>
    </div>
</template>

<script>
    export default {
        name:'modal',
        props:{
            modal:Boolean,
            text:String
        },
        data(){
            return {
                isShow:false
               
            }
        },
        methods:{
           
        },
        computed:{
            modalBoolen(){
                return this.modal;
            }
        },
        watch:{
            modalBoolen(val,oldVal){
                //只要检测到变化就把isshow设置为ture；解决了弹窗只弹一次的bug  
              this.isShow = true;
                setTimeout(() => {
                            this.isShow =false;
                        }, 3000);
                }


        },
        mounted(){
           // console.log(this.modal)

        }
        
    }
</script>

<style  lang="less">

.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal-footer{
            border-top: none;
        }
        .ivu-modal-body{
            text-align: center;
        }
        .ivu-modal-close{
            display: none;
        }
        .ivu-modal-footer{
            display: none;
        }
        .ivu-modal{
            top: 0;
            width: auto !important;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
        }
        .ivu-modal-content{
            background:rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 14px;
        }


    }


</style>