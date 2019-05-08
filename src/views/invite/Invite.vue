<template>
    <div class="invite_box">
     <section class="section_box">
        <div class="title">{{$t('yqzyWaySharing')}}</div>
        <ul class="content share_style">
            <li>
                <div class="share_title">{{$t('yqzyCodePoster')}}</div>
                <div class="share_content">
                    <div class="invite_btn" @click="openDialog">{{$t('yqzyChoosePoster')}}</div>
                </div>
            </li>
             <li>
                <div class="share_title">{{$t('yqzyExclusiveCode')}}</div>
                <div class="share_content">
                    <input class="invite_input" type="text" v-model="userCode">
                    <div class="invite_btn" v-clipboard:copy="userCode" v-clipboard:success="onCopy">{{$t('yqzyCopyCode')}}</div>
                </div>
            </li>
             <li>
                <div class="share_title">{{$t('yqzyCodePoster')}}</div>
                <div class="share_content">
                    <input class="invite_input invite_input2" type="text" v-model="inviteLink">
                    <div class="invite_btn" v-clipboard:copy="inviteLink" v-clipboard:success="onCopy">{{$t('yqzyCopyLinkShare')}}</div>
                </div>
            </li>
        </ul>
    </section>
    <section class="section_box">
        <div class="title">{{$t('yqzyInviteTotal')}}</div>
        <div class="content inviteNumber">
            {{$t('yqzyInviteTotalAll')}} <span class="invite_number">{{inviteUserCount || 0}}</span>
        </div>
    </section>
    <section class="section_box">
         <div class="title">
             <div class="title_active">{{$t('yqzyInviteHistory')}}</div>
         </div>
         <div class="tableList">
            <Table :columns="columns1" :data="data1" stripe :border="false"></Table>
        </div>
    </section>
    <Modal v-model="qrCodeDialog" :title="$t('yqzyPosterTitle')" width="1100">
        <ul class="downloadImgs">
            <li>
                <section ref="imageWrapper" v-if="htmlBox1">
                     <slot>
                        <div class="topSection backgroun_img1">
                            <p>{{$t('haibaotitle1')}}</p>
                            <p>{{$t('haibaotitle2')}}</p>
                        </div>
                        <div class="bottom_section">
                            <div class="left">
                                <div>{{$t('inviteQRtitle1')}}</div>
                                <div>{{$t('inviteQRtitle2')}}</div>
                            </div>
                            <div id="qr1" ></div>
                        </div>
                     </slot>
                </section>
                <img class="real_pic" :src="dataURL" width="335px"/>
                <Button type="primary" @click="downloadImg(1)" long>{{$t('yqzyPosterDownload')}}</Button>
            </li>
            <li>
                <section ref="imageWrapper2" v-if="htmlBox2">
                     <slot>
                        <div class="topSection backgroun_img2">
                            <p>{{$t('haibaotitle1')}}</p>
                            <p>{{$t('haibaotitle2')}}</p>
                        </div>
                        <div class="bottom_section">
                            <div class="left">
                               <div>{{$t('inviteQRtitle1')}}</div>
                                <div>{{$t('inviteQRtitle2')}}</div>
                            </div>
                            <div id="qr2" ></div>
                        </div>
                    </slot>
                </section>
                <img class="real_pic" :src="dataURL2" width="335px"/>
                <Button type="primary" @click="downloadImg(2)" long>{{$t('yqzyPosterDownload')}}</Button>
            </li>
            <li>
                <section ref="imageWrapper3" v-if="htmlBox2">
                     <slot>
                        <div class="topSection backgroun_img3">
                             <p>{{$t('haibaotitle1')}}</p>
                            <p>{{$t('haibaotitle2')}}</p>
                        </div>
                        <div class="bottom_section">
                            <div class="left">
                                <div>{{$t('inviteQRtitle1')}}</div>
                                <div>{{$t('inviteQRtitle2')}}</div>
                            </div>
                            <div id="qr3" ></div>
                        </div>
                    </slot>
                </section>
                <img class="real_pic" :src="dataURL3" width="335px"/>
                <Button type="primary" @click="downloadImg(3)" long>{{$t('yqzyPosterDownload')}}</Button>
            </li>
        </ul>
        <div slot="footer"></div>
    </Modal>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { getHeaderTokenApi } from '_api/axios'
import Cookies from 'js-cookie'
import QRCode from 'qrcodejs2'//二维码
import moment from 'moment'
 export default {
        data () {
            return {
                inviteLink:'',
                loginToken:'',
                userCode:'',//邀请code
                inviteUserCount:0,
                columns1: [
                    {
                        title: 'userName',
                        key: 'userName',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('inviteeaccount'))
                        }
                    },
                    {
                        title: 'createTime',
                        key: 'createTime',
                        align:'center',
                        renderHeader: (h) => {
                            return h('div', {},this.$t('date'))
                        },
                        render:(h,params) => {
                            return h('div',{},moment(params.row.createTime).format('YYYY-MM-DD HH:mm:ss'))
                        }
                    }
                ],
                data1: [],
                qrCodeDialog:false,
                qrcodeObj:null,
                dataURL:'',
                dataURL2:'',
                dataURL3:'',
                htmlBox1:true,
                htmlBox2:true,
                htmlBox3:true,
            }
        },
        methods: {
            getInviteCode() {
                getHeaderTokenApi(`/api/sso/invite/query.myInviteCode`,{},this.loginToken).then(data => {
                    this.userCode = data.data.userCode
                    // let protocol = window.location.protocol;//协议
                    // let host = window.location.host;//主机名+端口号
                    // let targetUrl = protocol + "//" + host;
                    this.inviteLink = "https://55link.de.com/#/register?invite_code=" + this.userCode;
                })
            },
            getInviteUserCount(){
                getHeaderTokenApi(`/api/sso/invite/query.usersCount`,{},this.loginToken).then(data => {
                    this.inviteUserCount = data.data.count
                })
            },
            getInviteList(){
                getHeaderTokenApi(`/api/sso/invite/query.userList`,{pageNum:1,pageSize:100},this.loginToken).then(data => {
                    this.data1 = data.data.list
                })
            },
            onCopy(){
                 this.$Message.success(this.$t('copySuccess'));
            },
            openDialog(){
                this.qrCodeDialog = true;
                 this.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                    this.qrcode()
                    this.toImage()
                })
            },
            qrcode () {
                document.getElementById('qr1').innerHTML = ''
                document.getElementById('qr2').innerHTML = ''
                document.getElementById('qr3').innerHTML = ''
                this.qrcodeObj = new QRCode('qr1', {  
                    width: 100,  // 设置宽度 
                    height: 100, // 设置高度
                    text: this.inviteLink
                })  
                this.qrcodeObj = new QRCode('qr2', {  
                    width: 100,  // 设置宽度 
                    height: 100, // 设置高度
                    text: this.inviteLink
                })  
                this.qrcodeObj = new QRCode('qr3', {  
                    width: 100,  // 设置宽度 
                    height: 100, // 设置高度
                    text: this.inviteLink
                })  
            },
            html2Canvans(){
                this.toImage()
            },
            initImg(){
                this.dataURL=''
                this.dataURL2=''
                this.dataURL3=''
                this.htmlBox1=true
                this.htmlBox2=true
                this.htmlBox3=true
            },
            toImage() {
                html2canvas(this.$refs.imageWrapper,{
                    backgroundColor: null
                }).then((canvas) => {
                    this.htmlBox1 = false
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL = dataURL;
                });
                html2canvas(this.$refs.imageWrapper2,{
                    backgroundColor: null
                }).then((canvas) => {
                    this.htmlBox2 = false
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL2 = dataURL;
                });
                html2canvas(this.$refs.imageWrapper3,{
                    backgroundColor: null
                }).then((canvas) => {
                    this.htmlBox3 = false
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL3 = dataURL;
                });
            },
            downloadImg(index){
                let data;
                if(index == 1){
                    data = this.dataURL
                }else if(index == 2){
                    data = this.dataURL2
                }else if(index == 3){
                    data = this.dataURL3
                }
                this.saveFile(data,index)
            },
            saveFile(data, filename) {
                    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    save_link.href = data;
                    save_link.download = 'poster' + filename + '.png';

                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    save_link.dispatchEvent(event);
            }

        },
        computed: {
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch: {
            languageChange(val,oldVal){//监听全局语言的状态

                this.initImg()
            },
        },
        mounted(){
            this.loginToken = Cookies.get('loginToken');
            if(this.loginToken){
                this.getInviteCode()
                this.getInviteUserCount()
                this.getInviteList()
            }
        },  
        components:{
            QRCode:QRCode
        }
    }
</script>
<style  lang="less">
.invite_box{
    .ivu-tabs-nav .ivu-tabs-tab-active{
        color: #12869A;
    }
    .ivu-tabs-ink-bar{
        background-color: #12869A;
    }
    .ivu-table td, .ivu-table th{
        border:none;
    }
    .ivu-table:before{
        height: 0px;
    }
    .ivu-table:after{
        width: 0px;
    }
    .ivu-table-wrapper{
        border: none;
    }
}
.downloadImgs{
    .ivu-btn-primary{
        background-color: #12869A;
        border-color:#12869A;
        &:hover{
            background-color: #108093;
            border-color:#108093;
        }
    }
}
</style>

<style scoped lang="less">
@baseColor:#12869A;
@baseHoverColor:#108093;
.invite_box{
    background-color: #f5f7f8;
    padding-top:30px;
    .section_box{
        background: #fff;
        width: 1200px;
        margin:20px auto 0;
        border-radius: 2px;
        .title{
            padding-left: 15px;
            height: 50px;
            line-height: 50px;
            font-size:14px;
            color: #344857;
            font-weight:700;
            border-bottom:1px solid #f5f5f5;
            .title_active{
                width:100px;
                height: 100%;
                text-align:center;
                color:@baseColor;
                border-bottom:2px solid @baseColor;
            }
        }
        .content{
            padding-left:35px;
            font-size: 14px;
        }
        .inviteNumber{
            padding:40px 35px;
            font-size: 14px;
            color: #000;
            span{
                padding-left:20px;
                font-weight: bold;
                font-size: 24px;
            }
        }
        .share_style{
            display: flex;
            li{
                margin-right: 85px;
                padding-bottom:40px;
                .share_title{
                    height: 40px;
                    font-size:14px;
                    line-height: 40px;
                    font-weight: 400;
                    color: #333;
                }
                .share_content{
                    display: flex;
                    .invite_input{
                        white-space:nowrap;
                        box-sizing:border-box;
                        border: 1px solid #ebebeb;
                        padding:0 5px;
                        width:60px;
                        color:#333;
                        margin-right: 8px;
                    }
                    .invite_input2{
                        width: 380px;
                    }

                }
            }
        }
        .invite_btn{
            display: flex;
            height: 30px;
            align-items: center;
            justify-content: center;
            padding:0 6px;
            background: @baseColor;
            color: #fff;
            font-weight: bolder;
            cursor: pointer;
            &:hover{
                background: @baseHoverColor;
            }
        }
        .tableList{
            padding-bottom: 30px;
        }
    }
}
//邀请弹出框
.downloadImgs{
    display:flex;
    li{
        flex:1;
        padding:0px 10px;
        .topSection{
            width:334px;
            height:512px;
            text-align:center;
            padding-top:136px;
            font-size:20px;
            color:#fff;
            font-weight:500;
        }
        .bottom_section{
            background-color:#fff;
            padding:20px 20px;
            display:flex;
            justify-content:space-between;
            font-size:12px;
            color:#000;
            text-align:center;
            .left{
                div{
                    font-size:14px;
                    &:last-child{
                        padding-top:10px;
                    }
                }
            }
        }
        .backgroun_img1{
            background:url('../../assets/images/invite/haibao1.png') center center;
            background-size:334px 512px;
        }
        .backgroun_img2{
            background:url('../../assets/images/invite/haibao2.png') center center;
            background-size:334px 512px;
        }
        .backgroun_img3{
            background:url('../../assets/images/invite/haibao3.png') center center;
            background-size:334px 512px;
        }
        #qr{
            width:100px;
            height:100px;
            background:red;
        }
    }
}

</style>