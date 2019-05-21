<template>
  <div>
    <!-- ========== MAIN CONTENT ========== -->
    <main id="content" role="main">
      <!-- Hero Section -->
      <div class="u-gradient-half-warning-v3" style="background-image: url(/assets/svg/supreme/supreme.jpg); background-size:100% 100%;">
        <div class="container u-space-2">
          <div class="col-md-12 col-lg-12 col-xl-12">
            <div class="text-center mb-4">
              <h2 class="h1 text-white font-weight-normal">
                Upcoming ATO - Supreme Token
                <img
                  class="img-fluid"
                  src="/assets/svg/supreme/supremelogo.png"
                  alt="Image Description"
                  width="12%"
                >
              </h2>

              <p
                class="lead u-text-light"
              >Buy Supreme tokens through ATO and using tokens to redeem 100% authentic Supreme product at original retail price.</p>
            </div>
          </div>

          <br>

          <div class="row justify-content-md-between">
            <!-- Item Image -->
            <div class="col-md-6 mb-7 mb-md-0">
              <div
                class="js-slick-carousel u-slick"
                data-infinite="true"
                data-arrows-classes="u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                data-arrow-left-classes="fa fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left"
                data-arrow-right-classes="fa fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right"
                data-pagi-classes="text-center u-slick__pagination u-slick__pagination--white mt-7 mb-0"
              >
                <div class="js-slide px-7 my-4">
                  <img class="img-fluid" src="/assets/svg/supreme/img6.png" alt="Image Description">
                </div>
                <div class="js-slide px-7 my-4">
                  <img class="img-fluid" src="/assets/svg/supreme/img7.png" alt="Image Description">
                </div>
              </div>
            </div>
            <!-- End Item Image -->

            <!-- Content -->
            <div class="col-md-5">
              <div class="mb-5">
                <h3
                  class="h4 text-white font-weight-normal"
                >Supreme Swarovski Box Logo Hooded Sweatshirt</h3>
                <span class="d-block text-white mb-2">Original Retail Price：$598</span>
                <span class="d-block text-white mb-2">Market Price：$1400-$1900</span>
                <span class="d-block text-white mb-2">Tokens for Redemption：5980 Tokens/Hoodie</span>
                <span class="d-block text-white mb-2">ATO Token Price：$0.1</span>
                <span class="d-block text-white mb-2">Total ATO Sales Amount：59,800 Supreme Tokens</span>
              </div>
              <a href="https://global.55gm.co/#/fatoSubscription" target="_blank">
                <button
                  type="button"
                  class="btn btn-xs btn-danger u-btn-danger u-btn-wide transition-3d-hover text-left mb-2"
                >
                  <span data-v-d1e1e420 class="media align-items-center">
                    <span data-v-d1e1e420 class="media-body">
                      <span data-v-d1e1e420 class="d-block">Open on 21st May 13:00 (UTC+8)</span>
                      <strong data-v-d1e1e420 class="font-size-14">Buy Supreme Token through ATO</strong>
                    </span>
                  </span>
                </button>
              </a>
            </div>
            <!-- End Content -->
          </div>
        </div>
      </div>
      <!-- End Hero Section -->

      <!-- Video Content Section -->
      <div class="position-relative">
        <!-- Video Content -->
        <div class="u-bg-img-hero text-center u-space-4" style="background-image: url(assets/svg/bg/bgsupreme.jpg);background-repeat:no-repeat">
          <!-- Fancybox -->
          <a class="js-fancybox u-media-player mb-4" href="javascript:;"
             data-src="//www.youtube.com/watch?v=BEjqZvOTuLU"
            data-speed="700"
            data-animate-in="zoomIn"
            data-animate-out="zoomOut">
            <span class="u-media-player__icon u-media-player__icon--lg">
              <span class="fa fa-play u-media-player__icon-inner"></span>
            </span>
          </a>
          <!-- End Fancybox -->
          <br>
          <br>
          <br>
          <h4 class="d-inline-block text-white mb-0">Supreme Swarovski Hoodie Product Video</h4>
        </div>
        <!-- End Video Content Section -->


      </div>
      <!-- Video Content Section -->
    </main>
    <!-- ========== END MAIN CONTENT ========== -->
  </div>
</template>

<script>
export default {
  mounted() {
    // initialization of slick carousel
    $.HSCore.components.HSSlickCarousel.init(".js-slick-carousel");
    // initialization of fancybox
      $.HSCore.components.HSFancyBox.init('.js-fancybox');
  }
};
</script>

<style lang="less" scoped>
</style>