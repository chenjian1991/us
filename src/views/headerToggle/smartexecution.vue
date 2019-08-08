<template>
  <div id="cripto" class="cripto">
    <!-- ========== MAIN ========== -->
    <main id="content" role="main">
      <!-- Hero Section -->
      <div style="background:#092a30;" class="bg-img-hero">
        <div id="bg-img" class="container space-2 space-lg-3">
          <div class="w-lg-65 text-center mx-lg-auto">
            <h1 class="text-white font-weight-medium mb-0">Smart Execution</h1>
          </div>
        </div>
      </div>
      <!-- End Hero Section -->

      <!-- Content Section -->
      <div class="container space-2">
              <p>Our smart execution engine is intended to provide the best globally available pricing and trading liquidity in the market. The current cryptocurrency marketplace is full of instances of illiquidity, Discrepancies in global pricing, and unregulated exchanges making markets 55’s smart execution platform is designed to provide optimal pricing to the retail market.</p>

        <div class="row">
              <div class="col-lg-6">
                <!-- Title -->
                <div class="mb-4">
                  <h3 class="h5 space-top-md-1">What 55 Solves:</h3>
                </div>
                <!-- End Title -->

                <!-- List -->
                <ul class="list-unstyled mb-0">
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div
                        class="media-body text-secondary"
                      >Limited retail access to top-of-book pricing</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div
                        class="media-body text-secondary"
                      >No uniform pricing / inefficient price comparison</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div
                        class="media-body text-secondary"
                      >Too many unregulated participants engaging in market manipulation</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div
                        class="media-body text-secondary"
                      >Whole sale pricing for the retail markets</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div
                        class="media-body text-secondary"
                      >Traditional capital markets approach to the cryptosphere</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Get the best available price for cryptocurrencies and assets</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Global parity for disparate markets</div>
                    </div>
                  </li>
                </ul>
                <!-- End List -->
              </div>

              <div class="col-lg-6">
                <!-- Title -->
                <div class="mb-4">
                  <h3 class="h5 space-top-md-1">How 55 does it:</h3>
                </div>
                <!-- End Title -->

                <!-- List -->
                <ul class="list-unstyled mb-0">
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Smart-Routing</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Order Management / Matching</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Growing network of top providers</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Cutting Edge Tech</div>
                    </div>
                  </li>
                  <li class="py-3">
                    <div class="media">
                      <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                        <span class="fas fa-check btn-icon__inner"></span>
                      </span>
                      <div class="media-body text-secondary">Seasoned Professional Engineering Team</div>
                    </div>
                  </li>
                </ul>
                <!-- End List -->
              </div>
        </div>
      </div>
      <!-- End Content Section -->

      <!-- ========== END MAIN ========== -->
    </main>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      empty: true
    };
  },

  methods: {},
  computed: {},
  watch: {
    languageChange(val, oldVal) {}
  },
  mounted() {}
};
</script>
<style lang="less">
.fa-check {
  color: #12869a !important;
}
#cripto {
  #bg-img {
    background: url("../../assets/images/headertoggle/common_hero.jpeg") no-repeat center;
    height: 120%;
    background-size: cover;
  }
  p {
    // margin: auto !important;
    padding: auto !important;
    color: #77838f;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 16px;
  }
  h1 {
    font-size: 2.5rem;
  }
}
</style>


