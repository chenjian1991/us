<template>
   <main id="inviteFriend" class="inviteFriend">
      <account-info name="inviteFriend"></account-info>
      <div class="container inviteFriend">
         <div class="content">
            <div class="top-box"><h5 class="dark-color">{{$t('invitePeople')}}</h5></div>
            <div class="top-box">
               <div class="top-box-common">
                  <p class="title main-font">{{$t('yqzyCodePoster')}}</p>
                  <button @click="openDialog">{{$t('yqzyChoosePoster')}}</button>
               </div>
               <div class="top-box-common">
                  <p class="title main-font">{{$t('yqzyExclusiveCode')}}</p>
                  <span class="text">{{userCode}}</span>
                  <button v-clipboard:copy="userCode" v-clipboard:success="onCopy">{{$t('yqzyCopyCode')}}</button>
               </div>
               <div class="top-box-common">
                  <p class="title main-font">{{$t('yqzyCodePoster')}}</p>
                  <span class="text">{{inviteLink}}</span>
                  <button v-clipboard:copy="inviteLink" v-clipboard:success="onCopy">{{$t('yqzyCopyLinkShare')}}
                  </button>
               </div>
            </div>
            <div class="top-box">
               <div class="top-box-common">
                  <p class="title main-font">{{$t('yqzyInviteTotalAll')}}</p>
                  <h5 class="dark-color">{{inviteTotal}}</h5>
               </div>
            </div>
            <table-page :title="$t('yqzyInviteHistory')" :columns="columns1" :data="data1"
                        :total="totalPage1" @onChangePage="onChangePage1"></table-page>
            <table-page :title="$t('inviteRebateRecord')" :columns="columns2" :data="data2"
                        :total="totalPage2" @onChangePage="onChangePage2"></table-page>
            <div class="bottom-box">
               <div class="title">{{$t('yqzyProgramDetails')}}</div>
               <ul class="rules">
                  <li class="rule dark-color" v-for="(rule,i) in rules">{{i+1}}、{{$t(rule)}}</li>
               </ul>
            </div>
         </div>
      </div>
      <Modal v-model="qrCodeDialog" :title="$t('yqzyPosterTitle')" width="1100">
         <ul class="downloadImgs">
            <li>
               <section ref="imageWrapper" v-if="htmlBox1">
                  <slot>
                     <div class="topSection backgroun_img1">
                        <!-- <p>{{$t('haibaotitle1')}}</p>
                        <p>{{$t('haibaotitle2')}}</p> -->
                     </div>
                     <div class="bottom_section">
                        <div class="left">
                           <div>{{$t('inviteQRtitle1')}}</div>
                           <div>{{$t('inviteQRtitle2')}}</div>
                        </div>
                        <div id="qr1"></div>
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
                        <!-- <p>{{$t('haibaotitle1')}}</p>
                        <p>{{$t('haibaotitle2')}}</p> -->
                     </div>
                     <div class="bottom_section">
                        <div class="left">
                           <div>{{$t('inviteQRtitle1')}}</div>
                           <div>{{$t('inviteQRtitle2')}}</div>
                        </div>
                        <div id="qr2"></div>
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
                        <!-- <p>{{$t('haibaotitle1')}}</p>
                        <p>{{$t('haibaotitle2')}}</p> -->
                     </div>
                     <div class="bottom_section">
                        <div class="left">
                           <div>{{$t('inviteQRtitle1')}}</div>
                           <div>{{$t('inviteQRtitle2')}}</div>
                        </div>
                        <div id="qr3"></div>
                     </div>
                  </slot>
               </section>
               <img class="real_pic" :src="dataURL3" width="335px"/>
               <Button type="primary" @click="downloadImg(3)" long>{{$t('yqzyPosterDownload')}}</Button>
            </li>
         </ul>
         <div slot="footer"></div>
      </Modal>
      <!--美国加拿大不允许-->
      <no-close-modal v-model="showNotAllowed" className="alertModal" width="550px" title="balanceNotice"
                      okText="noticeL1" cancelText="nextTime" :showBtn="false">
         <div class="alert-content">
            <h4 class="notice">{{$t('inviteNotAllowed')}}</h4>
            <Button class="backBtn">
               <a @click="cancel2">{{$t('inviteBack')}}</a>
            </Button>
         </div>
      </no-close-modal>
      <!--实名-->
      <no-close-modal v-model="showNoKyc" className="alertModal" width="550px" title="balanceNotice"
                      okText="inviteToKyc" cancelText="inviteBack" @ok="ok2" @cancel="cancel2" :showBtn="true">
         <div class="alert-content">
            <h4 class="notice">{{$t('inviteNotKyc')}}</h4>
         </div>
      </no-close-modal>
   </main>
</template>

<script>
   import tablePage from '@/components/tablePage'
   import AccountInfo from '@/components/common/AccountInfo'
   import {
      userList,
      usersCount,
      listRebate,
      // topRebate,
      getUserInfo,
   } from '_api/balances.js'
   import moment from 'moment'
   import QRCode from 'qrcodejs2'//二维码
   import html2canvas from 'html2canvas';
   import noCloseModal from '@/components/noCloseModal'

   export default {
      name: "inviteFriend",
      components: {
         'table-page': tablePage,
         'no-close-modal': noCloseModal,
         'account-info': AccountInfo,
      },
      data() {
         return {
            userCode: '',
            inviteLink: '',
            inviteTotal: 0,
            rebateTopList: [],
            //modal
            showNotAllowed: false,
            showNoKyc: false,
            kycPath: 'kyc',
            qrCodeDialog: false,
            htmlBox1: true,
            htmlBox2: true,
            htmlBox3: true,
            qrcodeObj: null,
            dataURL: '',
            dataURL2: '',
            dataURL3: '',
            loginToken: $cookies.get('loginToken'),
            userId: localStorage.getItem('loginUserId'),

            rules: [
               'inviteRule1',
               'inviteRule2',
               'inviteRule3',
               'inviteRule4',
               'inviteRule5',
               'inviteRule6',
               'inviteRule7',
               'inviteRule8',
               'inviteRule9',
               'inviteRule10',
               'inviteRule11',
            ],
            totalPage1: 1,
            totalPage2: 1,
            columns1: [
               {
                  key: 'inviteUserName',
                  width: 280,
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('inviteAccount'))
                  },
               },
               {
                  minWidth: 300,
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('BalancesDate'))
                  },
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['createTime']).format('YYYY-MM-DD HH:mm:ss'))

                  },
               },
            ],
            data1: [],
            columns2: [
               {
                  width: 280,
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('orderCommission'))
                  },
                  render: (h, params) => {
                     return h('div', {}, `${params.row['rebateAmount']} ${params.row['rebateCurrency']}`)
                  },
               },
               {
                  key: 'inviteeUsername',
                  width: 250,
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('inviteAccount'))
                  },
               },
               {
                  width: 200,
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('inviteRebateRatio'))
                  },
                  render: (h, params) => {
                     return h('div', {}, `${params.row['rebateRate'] * 100}%`)
                  },
               },
               {
                  minWidth: 300,
                  align: 'right',
                  renderHeader: (h) => {
                     return h('div', {}, this.$t('BalancesDate'))
                  },
                  render: (h, params) => {
                     return h('div', {}, moment(params.row['rebateDate']).format('YYYY-MM-DD HH:mm:ss'))

                  },
               },
            ],
            data2: [],
         }
      },
      methods: {
         init() {
            this.userList()
            this.usersCount()
            this.listRebate()
            // this.topRebate()

         },
         userList(current = 1) {//邀请记录
            userList({userId: this.userId, page: current}, this.loginToken).then(res => {
               this.data1 = res.data.list
            })
         },
         usersCount() {//邀请总人数
            usersCount({userId: this.userId}, this.loginToken).then(res => {
               this.inviteTotal = res.data.result
               this.totalPage1 = res.data.result / 10

            })
         },
         listRebate(current = 1) {//返佣记录
            listRebate({ssoToken: this.loginToken, pageNum: current, pageSize: 10}).then(res => {
               this.data2 = res.data
               this.totalPage2 = res.totalPage
            })
         },
         // topRebate() {//排行榜
         //    topRebate().then(res => {
         //       res = [{"username": null, "rebateAmount": 19.92000000}, {
         //          "username": null,
         //          "rebateAmount": 28.11064003
         //       }, {"username": null, "rebateAmount": 28.43319200}, {
         //          "username": null,
         //          "rebateAmount": 87.68000000
         //       }, {"username": null, "rebateAmount": 61.88843225}]
         //       this.rebateTopList = res.slice(0, 5)
         //    })
         // },
         onCopy() {
            this.$Message.success(this.$t('copySuccess'));
         },
         onChangePage1(current) {
            this.userList(current)
         },
         onChangePage2(current) {
            this.listRebate(current)
         },
         ok2() {
            this.showNotAllowed = false
            this.showNoKyc = false
            this.$router.push(this.kycPath)
            document.body.style.overflow = '';
         },
         cancel2() {
            this.showNotAllowed = false
            this.showNoKyc = false
            this.$router.push('/home')
            document.body.style.overflow = '';
         },
         openDialog() {
            this.qrCodeDialog = true;
            this.$nextTick(function () {
               // Code that will run only after the
               // entire view has been rendered
               this.qrcode()
               this.toImage()
            })
         },
         qrcode() {
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
         html2Canvans() {
            this.toImage()
         },
         initImg() {
            this.dataURL = ''
            this.dataURL2 = ''
            this.dataURL3 = ''
            this.htmlBox1 = true
            this.htmlBox2 = true
            this.htmlBox3 = true
         },
         toImage() {
            html2canvas(this.$refs.imageWrapper, {
               backgroundColor: null
            }).then((canvas) => {
               this.htmlBox1 = false
               let dataURL = canvas.toDataURL("image/png");
               this.dataURL = dataURL;
            });
            html2canvas(this.$refs.imageWrapper2, {
               backgroundColor: null
            }).then((canvas) => {
               this.htmlBox2 = false
               let dataURL = canvas.toDataURL("image/png");
               this.dataURL2 = dataURL;
            });
            html2canvas(this.$refs.imageWrapper3, {
               backgroundColor: null
            }).then((canvas) => {
               this.htmlBox3 = false
               let dataURL = canvas.toDataURL("image/png");
               this.dataURL3 = dataURL;
            });
         },
         downloadImg(index) {
            let data;
            if (index == 1) {
               data = this.dataURL
            } else if (index == 2) {
               data = this.dataURL2
            } else if (index == 3) {
               data = this.dataURL3
            }
            this.saveFile(data, index)
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
         languageChange() {
            return this.$store.state.app.countryLanguage;//  返回全局state的状态值
         },
      },
      watch: {
         languageChange(val, oldVal) {//监听全局语言的状态
            this.initImg()
         },
      },
      beforeMount() {
         getUserInfo({userId: this.userId}, this.loginToken).then(res => {//实名认证
            this.userCode = res.data.inviteCode
            // https://www.55link.de.com/register?invite_code
            this.inviteLink = `${window.location.host}/register?invite_code=${this.userCode}`
            if (res.data.country === 'US' || res.data.country === 'CA') {
               this.showNotAllowed = true
            } else {
               if (res.data) {
                  switch (res.data['identifyState']) {
                     case 'INIT':
                        this.showNoKyc = true
                        this.kycPath = "/kyc"
                        break
                     case 'SUBMIT':
                        this.showNoKyc = true
                        this.kycPath = "/identityResult"
                        break
                     case 'SUCCESS':
                        this.kyc = true//实名通过 可以提现
                        break
                     case 'FAIL':
                        this.showNoKyc = true
                        this.kycPath = "/identityResult"
                        break
                  }
               }
            }
         })
      },
      mounted() {
         this.init()
      },
   }
</script>
<style lang="less">
   #inviteFriend {
      .ivu-table {
         th, td {
            border-bottom: solid 1px #F5F5F5 !important;
            padding-left: 0;
            padding-right: 0;
         }
      }
      /*.ivu-table-wrapper {*/
      /*overflow: visible;*/
      /*}*/
      /* table 使溢出显示 */
      .ivu-table-cell {
         overflow: visible;
         position: relative;
      }
      .table th, .table td {
         border-top: none !important;
      }
   }

   .downloadImgs {
      .ivu-btn-primary {
         background-color: #12869A;
         border-color: #12869A;
         &:hover {
            background-color: #108093;
            border-color: #108093;
         }
      }
   }
</style>
<style lang="less" scoped>
   .main-font {
      font-size: 14px;
      color: #949DA6;
   }

   .dark-color {
      color: #344857;
   }

   #inviteFriend {
      background-color: #F7F9FA
   }

   .inviteFriend {
      .banner {
         position: relative;
         display: flex;
         justify-content: center;
         background-image: url('../../assets/images/invite/invite-friend.png');
         background-size: cover;
         background-repeat: no-repeat;
         background-position: top center;
         .banner-img {
            height: 570px;
         }
         .slogan-box {
            color: #fff;
            .slogan {
               font-size: 34px;
               margin-bottom: 14px;
            }
         }
         .rebate-top-list {
            display: inline-block;
            width: 350px;
            border-radius: 5px;
            background-color: #2A8BFF;
            padding: 0 20px;
            .rebate-top-item {
               /*height: 52px;*/
               line-height: 52px;
               font-size: 14px;
               color: #fff;
               border-bottom: 1px solid rgba(245, 245, 245, 0.18);
               &:last-child {
                  border: none;
               }
               .position-box {
                  text-align: center;
               }
               .number {
                  position: relative;
               }
               .no1 {
                  color: #FF7B00;
               }
               .no2 {
                  color: #B8B8B8;
               }
               .no3 {
                  color: #CA721E;
               }
               .no4, .no5 {
                  color: #FAFCFD;
               }
               .number-img {
                  width: 28px;
               }
               .position {
                  position: absolute;
                  top: 3px;
                  left: -1px;
                  display: inline-block;
                  width: 100%;
                  text-align: center;
                  font-size: 16px;
               }
            }
         }
      }
      .content {
         padding: 40px 0;
         .top-box {
            padding: 20px;
            background-color: #fff;
            margin-bottom: 20px;
            .top-box-common {
               display: inline-block;
               margin-right: 40px;
               .title {
                  margin-bottom: 20px;
               }
               .text {
                  display: inline-block;
                  padding: 8px 30px 8px 12px;
                  font-size: 14px;
                  color: #344857;
                  border: solid 1px #F1F1F3;
                  margin-right: 20px;
               }
               button {
                  padding: 8px 12px;
                  font-size: 14px;
                  border-radius: 0;
                  background-color: #12869A;
                  color: #fff;
                  border: none;
                  &:focus {
                     outline: none;
                  }
               }
            }
         }
         .bottom-box {
            .title {
               margin-bottom: 13px;
               font-size: 16px;
            }
            .rules {
               background-color: #fff;
               padding: 13px 20px;
               .rule {
                  font-size: 14px;
                  line-height: 34px;
               }
            }
         }
      }

   }

   .alertModal {
      .alert-content {
         padding: 25px 0 18px;
         .notice {
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 40px;
         }
         .backBtn {
            background-color: #12869A;
            a {
               color: #fff;
               font-size: 14px;
            }
         }
      }
   }

   //邀请弹出框
   .downloadImgs {
      display: flex;
      li {
         flex: 1;
         padding: 0px 10px;
         .topSection {
            width: 334px;
            height: 512px;
            text-align: center;
            padding-top: 136px;
            font-size: 20px;
            color: #fff;
            font-weight: 500;
         }
         .bottom_section {
            background-color: #fff;
            padding: 20px 20px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #000;
            text-align: center;
            .left {
               div {
                  font-size: 14px;
                  &:last-child {
                     padding-top: 10px;
                  }
               }
            }
         }
         .backgroun_img1 {
            background: url('../../assets/images/invite/haibao7.png') center center;
            background-size: 334px 512px;
         }
         .backgroun_img2 {
            background: url('../../assets/images/invite/haibao5.jpg') center center;
            background-size: 334px 512px;
         }
         .backgroun_img3 {
            background: url('../../assets/images/invite/haibao6.jpg') center center;
            background-size: 334px 512px;
         }
         #qr {
            width: 100px;
            height: 100px;
            background: red;
         }
      }
   }
</style>