<template>
    <div>
        <Modal v-model="isShow" width="550" :closable="false" class-name="ip_modal"  :mask-closable="false">
            <div class="warning_logo">
                <Icon type="ios-warning" size="48"/>
            </div>
                <div style="text-align:left" class="ip_content">
                            Currently, 55 Global Markets does not serve residents of the following jurisdiction: Connecticut, Hawaii, New York, North Carolina, Vermont, Washington, District of Columbia, American Samoa, Guam, Northern Mariana Islands, Puerto Rico, Virgin Islands, U.S., United States Minor Outlying Islands, Armed Forces Americas, Armed Forces Europe, Armed Forces Pacific. We are working hard to be able to do so in the near future. Please check back in the near future for updates.
                </div>
                <div slot="footer">
                    <div class="ip_btn" @click="closeDialog">Acknowledge</div>
                </div>
            </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            closeDialog() {
                this.isShow = false
            }
        },
        props:{
            value:{}
        },
        watch:{
            value(newV,oldV){
                this.isShow = newV
            },
            isShow(val) {
                this.$emit('input', val);    // 此处监测showModald目的为关闭弹窗时，重新更换value值，注意emit的事件一定要为input。
            }
        },
    }
</script>

<style lang="less">
.ip_modal{
    .ivu-modal-body{
        padding:44px 44px 0 44px;
        .ip_content{
            font-size: 14px;
            font-weight:400;
            color: #344857;
        }
    }
    .warning_logo{
        display: flex;
        justify-content: center;
        margin-bottom:30px;
        color:#C83535;
    }
    .ivu-modal-footer{
        padding:40px;
        .ip_btn{
            margin:0 auto;
            cursor: pointer;
            width: 140px;
            background: #12869A;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 14px;
            color: #fff;
            border-radius:2px;
            &:hover{
                background: #04798b;
            }
        }
    }
}
</style>