<template>
   <div id="cripto" class="cripto">
         <!-- ========== MAIN ========== -->
  <main id="content" role="main">
       <!-- Hero Section -->
    <div style="background:#092a30;"  class="bg-img-hero">
      <div id="bg-img" class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">Crypto Trading</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->


    <!-- Content Section -->
    <div class="container space-2 space-lg-0">
      <div class="row" >
        <div class="col-lg-12 space-lg-2">
          <div>
            <h2 class="h4">55Trade offers top of book pricing for Bitcoin, Ether, Litecoin and Bitcoin Cash.</h2>
            <p>Our primary goal is to give investors and asset owners from all over the world access to a global platform that is designed to remove the barriers of time, currency, and language making asset trading and investing accessible to everyone no matter who they are or where they are.</p>

            <p>At 55 Trade, we believe it is paramount that everyone should have the freedom to control and maximize their wealth; we strive to make this a reality by providing 24/7 trading hours and global best bid and offer which allows investors to buy and sell a variety of assets at the best available prices.</p>

            <p>The Asset Network consists of three sub-networks,</p>
             <!-- List -->
            <ul class="list-unstyled mb-0">
                                    <li class="py-3">
                                      <div class="media">
                                        <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                                          <span class="fas fa-check btn-icon__inner"></span>
                                        </span>
                                        <div class="media-body text-secondary">
                                              Trade Network Interconnect global assets & liquidity pools on a trade network
                                          </div>
                                      </div>
                                    </li>
                                    <li class="py-3">
                                      <div class="media">
                                        <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                                          <span class="fas fa-check btn-icon__inner"></span>
                                        </span>
                                        <div class="media-body text-secondary">
                                           Social Network
                    Interconnect global investors, influencers & followers on a social network
                                        </div>
                                      </div>
                                    </li>
                                    <li class="py-3">
                                      <div class="media">
                                        <span class="btn btn-xs btn-icon btn-soft-primary rounded-circle mr-3">
                                          <span class="fas fa-check btn-icon__inner"></span>
                                        </span>
                                        <div class="media-body text-secondary">
                                           Retail Network
                    Interconnect merchants, payment processors & consumers on a retail network
                                        </div>
                                      </div>
                                    </li>
                                   
             </ul>
            <!-- End List -->
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
            

        },
    
        
        
    }
</script>
<style lang="less">
#cripto{
  #bg-img{
        background: url('../../assets/images/headertoggle/common_hero.jpeg') no-repeat;
        height: 120%;
        background-size: cover;
    }
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
}

    
</style>


