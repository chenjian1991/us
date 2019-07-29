<template>
    <div id='whyus'>
            <!-- Hero Section -->
<div id="SVGwave1BottomSMShape" class="position-relative bg-light overflow-hidden">
        <div class="container space-3">
          <div class="w-md-80 w-lg-60 text-center mx-auto">
            <h1 class="display-4 space-top-md-2 font-size-md-down-3 text-primary">Why Us?</span></h1>
          </div>
        </div>
      
        <!-- SVG Background -->
        <figure class="position-absolute right-0 bottom-0 left-0">
          <img class="js-svg-injector" src="../../assets/images/headertoggle/wave-1-bottom-sm.svg" alt="Image Description"
               data-parent="#SVGwave1BottomSMShape">
        </figure>
        <!-- End SVG Background Section -->
      </div>
      <!-- End Hero Section -->
  <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Privacy Section -->
    <div class="container  space-top-md-2 space-bottom-2 overflow-hidden">
      <div class="w-lg-80 mx-lg-auto">
        <div class="card shadow-sm">

          <!-- Content -->
          <div class="card-body p-7 p-md-9">
            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Deep Pool of Liquidity</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Smart aggregation of orders in all currencies and coins. Using our GBBO order routing engine allows us to provide world class liquidity with the best spread and execution available.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Premium Coin Selection</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>55 Trade only lists coins and tokens, which pass our stringent diligence process. We believe that quality outweighs quantity, especially when it comes to providing value to our customers.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Unparalleled Security</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>Delivered by multi level authentication, aggressive network surveillance and cold wallet.</p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
              <!-- Title -->
              <div class="mb-3">
                <h3 class="h5 text-primary font-weight-semi-bold">Real-Time onboarding</h3>
              </div>
              <!-- End Title -->

              <!-- Text -->
              <p>We take KYC/AML very seriously. Our intent is to allow you to trade in no-time because we use OCR technology, and soon to launch facial recognition, to instantly verify your identity and allow you to start trading asap. </p>
              <!-- End Text -->
            </div>

            <div class="mb-7">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">White glove service</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>You trust us with your assets and we take that seriously, so we have real people in customer support and not just chat bots. We believe the difference between the ordinary and extraordinary is that little ‘extra’.</p>
                    <!-- End Text -->
             </div>

             <div class="mb-7">
                    <!-- Title -->
                    <div class="mb-3">
                      <h3 class="h5 text-primary font-weight-semi-bold">Aggregated pricing and execution</h3>
                    </div>
                    <!-- End Title -->
      
                    <!-- Text -->
                    <p>Our GBBO Engine (Global Best Bid and Offer), connects all major providers from Crypto to FX, allowing us to provide the best top of book pricing available from our network.</p>
                    <!-- End Text -->
             </div>
             <div class="mb-7">
                    <!-- Text -->
                    <a href=""><p>Learn more about our management team.</p></a>
                    <!-- End Text -->
             </div>
          </div>
          <!-- End Content -->
        </div>
      </div>
    </div>
    <!-- End Privacy Section -->

    <!-- SVG Background Shapes - Left Side -->
    <div class="w-25 content-centered-y left-0 z-index-n1 mt-9">
            <figure class="ie-circle-1">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/circle-1.svg" alt="Image Description"
                   data-parent="#content">
            </figure>
          </div>
          <!-- End SVG Background Shapes - Left Side -->
      
          <!-- SVG Background Shapes - Right Side -->
          <div class="w-35 content-centered-y right-0 z-index-n1 mt-n9">
            <figure class="ie-bg-elements-4">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/bg-elements-4.svg" alt="Image Description"
                   data-parent="#content">
            </figure>
          </div>
          <!-- End SVG Background Shapes - Right Side -->
      
          <!-- SVG Background Shapes -->
          <div class="position-absolute right-0 bottom-0 left-0 z-index-n1">
            <figure class="ie-bg-elements-3">
              <img class="js-svg-injector" src="../../assets/images/headertoggle/bg-elements-3.svg" alt="Image Description"
                   data-parent="#content">
            </figure>
          </div>
          <!-- End SVG Background Shapes -->
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


