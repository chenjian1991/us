<template>
    <div class="aboutBox">
        </br>
        <div class="row terms">
           
            <div class="bs-component">
                <div class="panel-heading no-padding">
                        <h3>{{$t('aboutTitle')}}</h3>
                    </div>
                <div>
                    <div class="panel-body paddong_30_left">
                        {{$t('aboutInfo1')}} </br></br>
                        {{$t('aboutInfo2')}} </br></br>
                        {{$t('aboutInfo3')}}</br></br>
                        <!-- {{$t('aboutInfo4')}}</br></br>
                        {{$t('aboutInfo5')}} -->
                    </div>
                </div>
               <div class="panel-heading no-padding">
                        <h3>{{$t('ContactUs')}}</h3>
                      </div>
                <div>
                    <div class="panel-body paddong_30_left">
                        {{$t('Forbusiness')}}</br>
                        {{$t('Formedia')}}</br>
                        {{$t('Forrecruitment')}}</br>
                        {{$t('franchising')}}</br>
                        {{$t('general')}}
                    </div>
                </div>
            </div>
            <div class="panel-heading no-padding">
                    <h3>{{$t('SocialPresence')}}</h3>
                </div>
            <div>
                <div class="panel-body paddong_30_left">
                    <button class="social-media-small facebook-social"><a target="_Blank" class="mylink" href="https://www.facebook.com/55GlobalMarkets/"><i class="fa fa-facebook" aria-hidden="true"></i></a></button>
                    <button class="social-media-small twiter-social"><a target="_Blank" class="mylink" href="https://twitter.com/55GlobalMarkets"><i class="fa fa-twitter" aria-hidden="true"></i></a></button>
                    <!-- <button class="social-media-small linkedin-social"><a target="_Blank" class="mylink" href="https://www.youtube.com/channel/UC19VySgU8N6-RVVZQjeaiZQ"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></button> -->
                    <button class="social-media-small dribbble-social"><a target="_Blank" class="mylink" href="http://t.me/www55com_Mandarin"><i class="fa fa-telegram" aria-hidden="true"></i></a></button>
                     <button style="background:#1f3b86;" class="social-media-small "><a target="_Blank" class="mylink" href="https://medium.com/@55GlobalMarkets"><i  class="fa fa-medium" aria-hidden="true"></i></a></button>
                    <button class="social-media-small dribbble-social"><a target="_Blank" class="mylink" href="https://www.instagram.com/55globalmarkets"><i class="fa fa-instagram" aria-hidden="true"></i></a></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        methods: {
            footerUrl(){
            let lang = this.$store.state.app.countryLanguage;
            if(lang=='en'||lang=='vi'||lang=='ko'){
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
            },
        },
        watch:{
              languageChange(val,oldVal){//监听全局语言的状态
                this.footerUrl()
            },
        },
        mounted(){
            this.footerUrl()
        }
    }
</script>

<style scoped lang="less">
 .aboutBox{
     padding:0 30px;
     font-family: 'Montserrat';
     font-size: 14px;
     font-weight: bolder;
     //background: #ffffff;
     .panel-heading{
         color:#344857;
         border-bottom: 1px solid #e7eaed;
     }
     .panel-body{
         color:#5c6166;
     }

     .mylink{
        color:#fff;
        &:hover{
            color: #fff;
        }
     }
     .social-media-small{
        border: none;
        color: white;
        font-weight: bolder;
        transition: all 250ms;
        font-size: 20px;
        margin: 10px 5px;
        width: 50px;
        height: 50px;
     }
     .facebook-social{
        background: #3b5998;
        margin-left: 0;
     }
     .twiter-social {
        background: #00aced;
    }
    .dribbble-social{
        background: #33AADF;
    }
 }
</style>