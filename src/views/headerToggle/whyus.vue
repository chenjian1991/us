<template>
    <div id='whyus'>
   <!-- Hero Section -->
    <div style="background:#092a30;"  class="bg-img-hero">
      <div id="bg-img" class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">Why Us?</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- ========== MAIN ========== -->
  <main id="content" role="main" >
    <!-- Privacy Section -->
    <div class="container space-top-2  space-bottom-1 overflow-hidden">
      <div class="w-lg-140 mx-lg-auto">
          <!-- Content -->
          <div class="row">
            <div class="col-md-6 col-lg-6 mb-5 pr-lg-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Deep Pool of Liquidity</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Smart aggregation of orders in all currencies and coins. Using our GBBO order routing engine allows us to provide world class liquidity with the best spread and execution available.</p>
              <!-- End Text -->
            </div>

            <div class="col-md-6 col-lg-6 mb-5">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Premium Coin Selection</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>55 Trade only lists coins and tokens, which pass our stringent diligence process. We believe that quality outweighs quantity, especially when it comes to providing value to our customers.</p>
              <!-- End Text -->
            </div>

            <div class="col-md-6 col-lg-6 mb-5 pr-lg-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Unparalleled Security</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Delivered by multi level authentication, aggressive network surveillance and cold wallet.</p>
              <!-- End Text -->
            </div>

            <div class="col-md-6 col-lg-6 mb-5">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Real-Time onboarding</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>We take KYC/AML very seriously. Our intent is to allow you to trade in no-time because we use OCR technology, and soon to launch facial recognition, to instantly verify your identity and allow you to start trading asap. </p>
              <!-- End Text -->
            </div>

            <div class="col-md-6 col-lg-6 mb-5 pr-lg-7">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">White glove service</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>You trust us with your assets and we take that seriously, so we have real people in customer support and not just chat bots. We believe the difference between the ordinary and extraordinary is that little ‘extra’.</p>
                    <!-- End Text -->
             </div>

             <div class="col-md-6 col-lg-6 mb-5">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">Top of Book pricing</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>Our Global best bid and offer routing engine, connects majore crypto and foreign exchange liquidity providers.</p>
                    <!-- End Text -->
             </div>
             <div class="col-md-6 col-lg-6 mb-5">
                    <!-- Text -->
                    <router-link to='/team' class="text-primary">Learn more about our management team.</router-link>
                    <!-- End Text -->
             </div>
          </div>
          <!-- End Content -->

      </div>
    </div>
    <!-- End Privacy Section -->

  </main>
  <!-- ========== END MAIN ========== -->


    </div>
</template>

<script>
    export default {
        name:'login',
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
            
        },
        mounted(){
           // initialization of svg injector module
           $.HSCore.components.HSSVGIngector.init('.js-svg-injector');
        },
       
        
        
    }
</script>
<style lang="less">
.text-primary{
      color:#12869A !important;
  }
#whyus{
  #bg-img{
        background: url('../../assets/images/headertoggle/common_hero.jpeg') no-repeat;
        height: 120%;
        background-size: cover;
    }
    h1{
        font-size: 2.5rem;
    }
    
}
   
</style>



