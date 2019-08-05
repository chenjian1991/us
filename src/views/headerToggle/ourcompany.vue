<template>
   <div id="cripto" class="cripto">
          <!-- ========== MAIN ========== -->
  <main id="content" role="main">
           <!-- Hero Section -->
    <div style="background:#092a30;"  class="bg-img-hero">
      <div id="bg-img" class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">Our Company</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- Content Section -->
    <div class="container space-2 space-lg-0">
      <div class="row" >
        <div class="col-lg-12 space-lg-2">
          <div>
             <p>Based in the US,  55.Trade supports the major crypto currencies: Bitcoin, Ether and Litecoin, against each other or the US Dollar, or our own stable coin: USDD (US Digital). 55 Trade offers its users, a range of cryptocurrencies to buy/sell and store, on our secure platform. Users have secured wallets available to them on the 55 Trade platform, and deposits or withdrawals from and to wallets is simple. Users can fund their accounts with either crypto or fiat, and we support USD deposits and withdrawals.  </p>

             <h2 class="h4">Our Compliance</h2> 
             <p> 55 Trade is officially registered as a Money Service Business (MSB) with U.S. regulators, administered by the Financial Crimes Enforcement Network (FinCEN).</p>
            
             <p> In collaboration with Prime Trust - A chartered, regulated, insured trust company, 55 also allows using fiat to buy major cryptocurrencies.</p>

             <p><router-link to="/team"  class="text-primary">Learn about our Team Here</router-link></p>
                      
             <!-- Clients Section -->
                <div class="container space-2">
                      <div class="title" style="text-align:center;font-size:22px;color:#12869a !important;padding:22px">Partners</div>

                  <div class="js-slick-carousel u-slick"
                      data-autoplay="true"
                      data-speed="5000"
                      data-infinite="true"
                      data-slides-show="6"
                      data-responsive='[{
                        "breakpoint": 1200,
                        "settings": {
                          "slidesToShow": 4
                        }
                      }, {
                        "breakpoint": 992,
                        "settings": {
                          "slidesToShow": 4
                        }
                      }, {
                        "breakpoint": 768,
                        "settings": {
                          "slidesToShow": 3
                        }
                      }, {
                        "breakpoint": 576,
                        "settings": {
                          "slidesToShow": 3
                        }
                      }, {
                        "breakpoint": 480,
                        "settings": {
                          "slidesToShow": 2
                        }
                      }]'>
                    <div class="js-slide">
                      <img class="u-clients" src="assets/svg/logos/parnter/partner-logo4.png" alt="Image Description">
                    </div>
                    <div class="js-slide">
                      <img class="u-clients" src="../../assets/images/fenwick_logo.png" alt="Image Description">
                    </div>
                     <div class="js-slide">
                      <img class="u-clients"  src="../../assets/images/gco_logo.png" alt="Image Description">
                    </div>
                     <div class="js-slide">
                      <img class="u-clients"  src="../../assets/images/parnter5.png" alt="Image Description">
                    </div>
                    <!-- <div class="js-slide">
                      <img class="u-clients" src="assets/svg/logos/parnter/partner-logo3.png" alt="Image Description">
                    </div> -->
                  </div>
                </div>
            <!-- End Clients Section -->
        
        </div>
        </div>
      </div>
    </div>
  </main>
    <!-- End Content Section -->

  <!-- ========== END MAIN ========== -->
   </div>
</template>

<script>


    export default {
        name:'login',
        components:{
        },
        data() {
             
            return {
                empty:true,

            }



        },
      
        methods:{
            


        },
        computed:{
            
            
        },
        watch:{
            languageChange(val,oldVal){
            },
        },
        mounted(){
                $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');
                $.HSCore.components.HSFancyBox.init('.js-fancybox');


        },
    
        
        
    }
</script>
<style lang="less">
.text-primary{
      color:#12869A !important;
  }
a.text-primary:hover, a.text-primary:focus{
  color:#12869A !important;
}
#cripto{
    p{
        // margin: auto !important;
        padding: auto !important;
        color: #77838f;
        line-height: 1.7;
        margin-bottom: 1rem;
        font-size: 16px;
    }
    h1{
        font-size: 2.5rem;
    }
    #bg-img{
        background: url('../../assets/images/headertoggle/common_hero.jpeg') no-repeat;
        height: 120%;
        background-size: cover;
    }
}

    
</style>


