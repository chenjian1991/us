<template>
    <div class="psw_wrapper">
        <ul>
            <li class="li_border" :class="[nowIndex == 1?border_active:'']">
                <div :class="[nowIndex == 1?lineClass:noneClass]"></div>
                <div :class="[count >=1?pointClass:noneClass]"></div>
            </li>
            <li class="li_border" :class="[nowIndex == 2?border_active:'']">
                <div :class="[nowIndex == 2?lineClass:noneClass]"></div>
                <div :class="[count >= 2?pointClass:noneClass]"></div>
            </li>
            <li class="li_border" :class="[nowIndex == 3?border_active:'']">
                <div :class="[nowIndex == 3?lineClass:noneClass]"></div>
                <div :class="[count >= 3?pointClass:noneClass]"></div>
            </li>
            <li class="li_border" :class="[nowIndex == 4?border_active:'']">
                <div :class="[nowIndex == 4?lineClass:noneClass]"></div>
                <div :class="[count >= 4?pointClass:noneClass]"></div>
            </li>
            <li class="li_border" :class="[nowIndex == 5?border_active:'']">
                <div :class="[nowIndex == 5?lineClass:noneClass]"></div>
                <div :class="[count >= 5?pointClass:noneClass]"></div>
            </li>
            <li :class="[nowIndex >= 6?border_active:'']">
                <div :class="[nowIndex == 6?lineClass:noneClass]"></div>
                <div :class="[count == 6?pointClass:noneClass]"></div>
            </li>
        </ul>
        <input type="tel" ref="passwordInput" autocomplete="off" id="passwordInput" @click="showLine" @focus="myfocus" class="mask_input" v-model="pswData" @input="change">
    </div>
</template>

<script>
   export default {
      name: "PasswordInput",
      data() {
         return {
            pointClass: "point",
            lineClass: "line",
            noneClass: "display",
            border_active: "border_active",
            pswData: null,
            nowIndex: 0, //当前输入的密码框序号
            count: 0,//已经输入的密码数量
         };
      },
      props: {

      },
      watch: {
         pswData: function(newV, oldV) {
            switch (newV.length) {
               case 0:
                  this.nowIndex = 1;
                  this.count = 0;
                  break;
               case 1:
                  this.nowIndex = 2;
                  this.count = 1;
                  break;
               case 2:
                  this.nowIndex = 3;
                  this.count = 2;
                  break;
               case 3:
                  this.nowIndex = 4;
                  this.count = 3;
                  break;
               case 4:
                  this.nowIndex = 5;
                  this.count = 4;
                  break;
               case 5:
                  this.nowIndex = 6;
                  this.count = 5;
                  break;
               case 6:
                  this.nowIndex = 7;
                  this.count = 6;
                  break;
               default:
                  break;
            }
            //隐藏错误提示信息
            this.$emit("getPassWord", newV, "111");
         },
      },
      methods: {
         showLine(){
            if(this.nowIndex == 0){
               this.nowIndex = 1;
            }
         },
         change(){
            this.pswData = this.pswData.replace(/\D/gi,"");
            this.pswData = this.pswData.substring(0, 6);
         },
         myfocus(){
            if(this.nowIndex == 0){
               this.nowIndex = 1;
            }
         },
         getFocus(){
            this.$refs.passwordInput.focus();
         }
      },
      mounted(){
         this.$refs.passwordInput.focus();
      }
   };
</script>

<style scoped lang="less">
    .psw_wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        ul {
            height: 100%;
            display: flex;
            position: relative;
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                width: 45px;
                height: 45px;
                border: solid 1px #2D4859;
                .point {
                    background: #2D4859;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .line {
                    background: #ccc;
                    width: 1px;
                    height: 17px;
                    animation: blink 1s infinite steps(1, start);
                }
                .display {
                    display: none;
                }
                @keyframes blink {
                    0% {
                        background-color: #2D4859;
                    }
                    50% {
                        background-color: transparent;
                    }
                    100% {
                        background-color: #2D4859;
                    }
                }
            }
            .li_border {
                border-right: none;
            }
        }
        .mask_input {
            position: absolute;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            opacity: 0;
            color:transparent;
        }
    }
</style>