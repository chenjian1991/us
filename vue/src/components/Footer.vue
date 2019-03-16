<template>
    <div class="footer_container">
        <div class="footerBox">
            <div class="footer-container">
                    <div class="clearfix"></div>
                    <div class="footer-content">
                            <div class="footer-left">
                                <div class="footer-products">
                                    <p class="font-normal">55 Products</p>
                                    <ul>
                                        <li><a target="_blank" href="https://www.55.com/">B-Site (Blockchain Token EX)</a></li>
                                        <li><a target="_blank" href="https://f.55.com/">F-Site (Forex Token EX)</a></li>
                                        <li><a target="_blank" href="https://l.55.com/">L-Site (Local Business Token EX)</a></li>
                                        <li><a target="_blank" href="https://s.55.com/">S-Site (Stock Token EX)</a></li>
                                        <li><a target="_blank" href="javascript:;">P-Site (Personal Token EX)</a></li>
                                        <li><a target="_blank" href="javascript:;">C-Site (Commodity Token EX)</a></li>
                                        <li><a target="_blank" href="https://usdd.55.com/">USDD</a></li>
                                    </ul>
                                </div>
                                <div class="footer-company">
                                        <p class="font-normal">{{$t('footerCompany')}}</p>
                                    <ul>
                                        <li>
                                            <router-link to="/about55">{{$t('footerAbout')}}</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/about55">{{$t('footercontactus')}}</router-link>
                                        </li>
                                        <li><a download="MediaKit.zip"  target="_blank" href="./exchange/b11/media/MediaKit.zip">{{$t('footermedit')}}</a></li>
                                    </ul>
                                </div>
                                <div class="b-site">
                                    <p class="font-normal">B-Site</p>
                                    <ul>
                                        <li> <router-link to="/terms">{{$t('footerterms')}}</router-link> </li>
                                        <li><router-link to="/privacy">{{$t('footerprivice')}}</router-link></li>
                                        <li><router-link to="/disclaimer">{{$t('footerdisclaimer')}}</router-link></li>
                                        <li><router-link to="/fee">{{$t('footerfee')}}</router-link></li>
                                        <li><a target="_blank" :href="AnnounceURL">{{$t('footerannounce')}}</a></li>
                                        <li style="color:#bcbcbc">B-Site Enquiry : service@55.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="footer-right">
                                <div>
                                    <img style="width:138px;height:52px;" src="../assets/images/footer/foot-logo.svg" alt="">
                                    <p style="margin-top:22px;">&copy;2018 55.com All Rights Reserved</p>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../iconfont/iconfont.css'
import Vue from 'vue'
    export default {
        data(){
            return {
                weichat : false,
                aboutUsURL:'',
                ourteamURL:'',
                AnnounceURL:'',
                termsURL:'',
                PrivacyURL:'',
                LegalURL:'',
                FeesURL:'',
                HelpURL:'',
            }
        },
        methods:{
            overStyle(){
                this.weichat = true;
            },
            outStyle(){
                this.weichat = false;
            },
      
            footerUrl(){
                let lang = this.$store.state.app.countryLanguage;
            if(lang=='en'||lang=="vi"||lang=="ko"){
                this.aboutUsURL = "https://55support.zendesk.com/hc/en-us/articles/360004829074-About-Us";
                this.ourteamURL = "https://55support.zendesk.com/hc/en-us/articles/360004876973-Join-us";
                this.AnnounceURL = "https://55support.zendesk.com/hc/en-us/categories/360000443513-Announcements";
                this.termsURL = "https://55support.zendesk.com/hc/en-us/articles/360004716273-Terms-of-User";
                this.PrivacyURL = "https://55support.zendesk.com/hc/en-us/articles/360004683314-Privacy-Policy";
                this.LegalURL = "https://55support.zendesk.com/hc/en-us/articles/360004724533-Legal-Statement";
                this.FeesURL = "https://55support.zendesk.com/hc/en-us/articles/360004875413-55-Exchange-Rate-Table";
                this.HelpURL = "https://55support.zendesk.com/hc/en-us";
                }else{
                this.aboutUsURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004829074-About-Us";
                this.ourteamURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004876973-Join-us";
                this.AnnounceURL = "https://55support.zendesk.com/hc/zh-cn/categories/360000443513-Announcements";
                this.termsURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004716273-Terms-of-User";
                this.PrivacyURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004683314-Privacy-Policy";
                this.LegalURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004724533-Legal-Statement";
                this.FeesURL = "https://55support.zendesk.com/hc/zh-cn/articles/360004875413-55-Exchange-Rate-Table";
                this.HelpURL = "https://55support.zendesk.com/hc/zh-cn";
                }
            }
        },
        computed:{
            languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            }
        },
        watch:{
            languageChange(val,olVal){
                this.footerUrl()
            }
        },
        mounted(){
            this.footerUrl()



        }
        
    }
</script>

<style scoped lang="less">
.footerBox{
  background:#18183e;
}
    /* footer*/
.footer-container{
  //width: 97%;//不设置宽度，自适应
  margin-left: 102px;
  background:#091441;
  margin-right: 10px;
}
.footer-content{
  display: flex;
  justify-content: space-between;
}
.footer-left{
  width: 70%;
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 40px;
}
.footer-left ul{
    margin-top: 20px;
}
.footer-company{
  margin-left: 120px;
}
.b-site{
  margin-left: 120px;
}
.footer-products p{
  font-size:16px;
  color:#ffffff;
}
.footer-company p{
  font-size:16px;
  color:#ffffff;
}
.b-site p{
  font-size:16px;
  color:#ffffff;
}
.footer-products{
  margin-left: 50px;
}
.footer-products ul li{
  font-size:14px;
  line-height: 35px;
  a{
    color:#bcbcbc;
  }
}
.footer-company ul li{
  font-size:14px;
  line-height: 35px;
  a{
    color:#bcbcbc;
  }
}
.b-site ul li{
  font-size:14px;
  line-height: 35px;
  a{
    color:#bcbcbc;
  }
}
.footer-right{
  width: 30%;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 60px;
}
.footer-right p{
  font-size:14px;
  color:#bcbcbc;
  span{
    color:#bcbcbc;
    //font-weight: bold;
  }
}
a{
    color: #fff;
}
.font-normal{
    font-weight: normal;
}


</style>