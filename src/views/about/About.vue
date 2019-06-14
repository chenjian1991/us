<template>
    <!-- ========== MAIN ========== -->
  <main id="content" role="main">
   <!-- Hero Section -->
    <div class="d-lg-flex align-items-lg-center position-relative min-height-100vh--lg u-bg-img-hero u-space-3 u-space-5-top--md u-space-0--lg" style="background-image: url(assets/svg/bg/img32.jpeg);">
      <div class="container mt-lg-5">
        <div class="w-lg-35 mb-5">
          <h1 class="display-4 text-white">55 <strong class="font-weight-bold">Asset Network</strong> </h1>
          <p class=" text-white">The world’s first asset network designed to create the free circulation of assets.</p>
        </div>

        <div class="w-lg-65">
          <!-- Signup Form -->
          <form class="js-validate">
            <div class="row form-row">
              <div class="col-sm-5 mb-4">

              </div>

              <div class="col-sm-5 mb-4">
     
              </div>

            </div>


          </form>
          <!-- End Signup Form -->
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- Description Section -->
    <div class="container u-space-3">
      <div class="w-lg-60 mx-auto">
      <h2 class="h5 mb-3">In Brief</h2>
      <div class="mb-5">
          <p>Founded in December of 2017 and based in New York, 55 is an asset network that provides investors with access to global investment, allowing a seamless and efficient flow of high quality assets around the world. 55 is not only limited to cryptocurrencies, we use blockchain technology and tokenization to bridge traditional markets to support the trading of a variety of assets.</p>
      </div>
      <h2 class="h5 mb-3">Mission</h2>
      <div class="mb-5">
        <p>Our mission is to lead the development of the global asset network by building a community-oriented, self-driven circulation network, designed to interconnect asset owners and investors. </p>
        <p>We aim to empower millions of users from all over the world to have easy access into the world of investment. We strive to be the leaders of the next generation of blockchain technology; forging the path for digital currency and bringing forth mass adoption of tokenized assets.</p>
      </div>
      <h2 class="h5 mb-3">Our Values</h2>
      <div class="mb-5">
        <h3 class="h6">Global</h3>
        <p>Our primary goal is to give investors and asset owners from all over the world access to a global platform that is designed to remove the barriers of time, currency, and language making asset trading and investing accessible to everyone no matter who they are or where they are. </p>
        <br><h3 class="h6">Effortless </h3>
        <p>The traditional finance world can be intimidating and restrictive. Our platform is designed to give our users a comprehensive, yet intuitive experience. We believe everyone should be able to participate in our asset network, and we strive to make this experience as enjoyable and effortless as possible. </p>
        <br><h3 class="h6">Interconnected</h3>
        <p>As an asset network, we aim to work alongside existing exchanges and marketplaces to allow assets to achieve a true liquidity premium. Unfortunately, barriers to the circulation of assets are rampant. Middlemen drive up exchange costs and rarely achieve the global exposure that asset owners expect. Asset circulation patterns have been fundamentally troublesome since their inception.</p>
        <p>At 55 we believe it is paramount that everyone should have the freedom to control and maximize their wealth; we strive to make this a reality by providing 24/7 trading hours and global best bid and offer which allows investors to buy and sell a variety of assets at the best available prices.</p>
      </div>
        <div class="mb-5">
          <p>The Asset Network is consist of three sub-networks,</p>



<br>

<div class="media u-indicator-ver-dashed mb-3">
  <div class="d-flex mt-1 mr-3">
    <span class="u-icon u-icon-primary u-icon--xs rounded-circle">
      <span class="fa fa-check u-icon__inner"></span>
    </span>
  </div>
  <div class="media-body">
    <h3 class="h5 text-primary">Trade Network</h3>
    <p>Interconnect global assets & liquidity pools on a trade network</p>
  </div>
</div>

<div class="media u-indicator-ver-dashed mb-3">
  <div class="d-flex mt-1 mr-3">
    <span class="u-icon u-icon-primary u-icon--xs rounded-circle">
      <span class="fa fa-check u-icon__inner"></span>
    </span>
  </div>
  <div class="media-body">
    <h3 class="h5 text-primary">Social Network</h3>
    <p>Interconnect global investors, influencers & followers on a social network</p>
  </div>
</div>

<div class="media">
  <div class="d-flex mt-1 mr-3">
    <span class="u-icon u-icon-primary u-icon--xs rounded-circle">
      <span class="fa fa-check u-icon__inner"></span>
    </span>
  </div>
  <div class="media-body">
    <h3 class="h5 text-primary">Retail Network</h3>
    <p>Interconnect merchants, payment processors & consumers on a retail network</p>
  </div>
</div>


        </div>



<br>
           <h2 class="h5 mb-3">Compliance</h2>

          <p>55 is officially registered as a Money Service Business (MSB) with U.S. regulators, administered by the Financial Crimes Enforcement Network (FinCEN). This registration means that 55 can perform crypto-to-crypto trading in most U.S. states and territories.</p> 

<p>In collaboration with Prime Trust - A chartered, regulated, insured trust company, 55 also allows using fiat to buy major cryptocurrencies.  

          </p> <p>

55 is also regulated in EU. 55 currently holds two operating licenses with the Estonian Financial Intelligence Unit. License Number FVR000281 is for providing services to exchange virtual currencies against fiat currencies, and License Number FRK000238 is for providing a virtual currency wallet service.</p>
        </div>



      </div>
    </div>
    <!-- End Description Section -->

    <hr class="my-0">
  </main>
  <!-- ========== END MAIN ========== -->
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