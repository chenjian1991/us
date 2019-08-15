<template>
  <div class="chat_box">
    <div class="chat_btn" @click="openChatDialog" v-if="isShowChatBtn">
      <Icon type="md-text" size="17"/> <span class="text">Chat</span> 
    </div>
     <Modal v-model="chatDialog" width="310" height="488" :footer-hide="true" :mask="false" scrollable  draggable :closable="false" :styles="obj" class-name="chatDialogBox">
         <div class="chat_dialog_top">
             <section class="title">
                    <div class="name">Chat</div>
                    <div>{{chatName}}</div>
                    <div class="icon" @click="closeChat"><Icon type="ios-arrow-down" size="14" /></div>
             </section>
             <section class="logos" @click="chooseChatLanguage">
                 <img src="../../assets/images/exchange/chat-english.png" width="34px" data="55 English" url="englishURL" alt="chatGroup">
                 <img src="../../assets/images/exchange/chat-chinese.png" width="34px" data="55 中文" url="chineseURL" alt="chatGroup">
                 <img src="../../assets/images/exchange/chat-korea.png" width="34px" data="55 한국" url="koreaURL" alt="chatGroup">
                 <img src="../../assets/images/exchange/chat-tv.png" width="34px" data="55 Tiếng Việt" url="vietnamURL" alt="chatGroup">
                 <img src="../../assets/images/exchange/chat-indo.png" width="34px" data="55 Indonesian" url="IndonesianURL" alt="chatGroup">
             </section>
        </div>
        <div class="chat_iframe">
            <iframe v-if="!isShowChatBtn"  :src="iframeURL" frameborder="0" width="100%" height="400px"></iframe>
        </div>
        <div class="chat_loginbox" v-if="!isLogin">
            <router-link to='/login' class="text">{{$t('bbjyBuyLogin')}}</router-link>
                <span> {{$t("bbjyOr")}} </span>
            <router-link class="text" to='/register'>{{$t('bbjyBuyRegister')}}</router-link>
                <span> {{$t("bbjyToTrade")}} </span>
        </div>
    </Modal>
  </div>
</template>

<script>
import { CHAT_URL} from "../../config/index";
 import Cookies from 'js-cookie'
 import {postHeaderTokenBodyApi} from '_api/axios'
export default {
    data() {
        return {
            isShowChatBtn: true,
            chatDialog:false,
            isLogin:this.$store.state.app.isLogin,
            loginToken:Cookies.get('loginToken'),
            chatToken:'undefined',
            chatName:'55 English',
            iframeURL:'',
            obj:{
                // 'position':'absolute',
                // 'left':'20px',
                // 'bottom':'310px'
            }
        }
    },
    methods: {
        openChatDialog() {
            this.isShowChatBtn = false
            this.chatDialog = true
            this.initChat()

        },
        closeChat(){
             this.isShowChatBtn = true
            this.chatDialog = false
        },
        chooseChatLanguage(e){
            let name = e.target.getAttribute('data');
            let url = e.target.getAttribute('url');
            if(name && url){
                this.chatName = name
                this.iframeURL = `${CHAT_URL.baseURL}${this.chatToken}/`+encodeURIComponent(`${CHAT_URL[url]}`)
            }
        },
        initChat(){
            if(this.isLogin){
                postHeaderTokenBodyApi('api/sso/social/get-token',this.loginToken,null).then(data => {
                    this.chatToken = data.token
                    this.iframeURL = `${CHAT_URL.baseURL}${this.chatToken}/`+encodeURIComponent(`${CHAT_URL.englishURL}`)
                })
            }else{
                this.iframeURL = `${CHAT_URL.baseURL}${this.chatToken}/`+encodeURIComponent(`${CHAT_URL.englishURL}`)
            }
        }
    },
    mounted(){
    }
};
</script>
<style lang="less">
.chatDialogBox{
    // display: flex;
    // align-items: center;
    // justify-content:center;
    // .ivu-modal{
    //     top: 0;
    // }
    .ivu-modal{
        position: fixed;
        left: 20px;
        bottom:530px;
        top: auto;
    }
    .ivu-modal-header{
        border-bottom:none;
        padding:20px 12px;
    }
    .ivu-modal-body{
        padding: 0;
        border-radius: 4px 4px 0px 0px;
    }
    .ivu-modal-footer{
      
    }
    
}
</style>

<style lang="less" scoped>
.chat_box {
  position: fixed;
  border: none;
  background: transparent;
  z-index: 999998;
  transform: translateZ(0px);
  position: fixed;
  transition: opacity 250ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s, top, bottom;
  opacity: 1;
  margin: 10px 20px;
  left: 0px;
  bottom: 0px;
  .chat_btn{
    width:100px;
    height:44px;
    background:rgba(18,134,154,0.6);
    color: #fff;
    border-radius:2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
         background:rgba(18,134,154,1);
    }
    .text{
        padding-left:4px;
        font-size: 16px;
        font-weight: 400;
    }
  }
}
.chat_dialog_top{
    .title{
        background-color:#162A36;
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        padding: 0 21px;
        color: #C2D8E8;
        border-radius: 4px 4px 0px 0px;
        .icon{
            cursor:pointer;
        }
        .name{
            color: #688A9D;
            font-size: 14px;
        }
    }
    .logos{
        padding: 7px 0px 7px 20px;
        img{
            margin-right: 12px;
            cursor: pointer;
        }
    }
}
.chat_loginbox{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 40px;
    width: 100%;
    background-color: #162A36;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #688A9D;
    span{
        padding:0 5px;
    }
    a{
        color: #C2D8E8;
        &:hover{
            color: #12869a;
        }
    }
}
.chat_iframe{
    // background: red;
    width: 100%;
    height:403px;
}
</style>