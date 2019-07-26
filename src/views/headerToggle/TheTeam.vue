<template>
   <div id="cripto" class="cripto">
            <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="bg-primary bg-img-hero" style="background-image: url(../../assets/svg/components/abstract-shapes-15.svg);">
      <div class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">The Team</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- Content Section -->
    <div class="container space-2 space-lg-0">
      <div class="row" >
        <div class="col-lg-16 space-lg-2">
          <div class="pl-lg-4">
             <p>Founded in December of 2017 and based in the US, 55 Trade is an asset network that provides investors with access to global investment, allowing a seamless and efficient flow of high quality assets around the world. 55 Trade is not only limited to cryptocurrencies; we use blockchain technology and tokenization to bridge traditional markets to support the trading of a variety of assets.</p>
        
             <p>A unique approach by 55, is that all our funds are held in a secured Trust account (Prime Trust, NV), and not in a typical custody account that other exchanges and brokers have traditionally used. This means that we as a fiduciary, have additional oversight from our custodian (PT) to make sure and verify that funds are allocated properly and there’s no commingling of client and company funds. This also means that our stablecoin (USDD) are 100% backed by USD managed by Prime Trust, a third party trust company.  Prime Trust confirms new funds have been received prior to minting of any new USDD.</p>

             <p>Interested in joining our team? <a href="">Click for Career Opportunities with 55</a></p>

             <h2 class="h4">Management Team</h2> 
             <p>高管们</p>
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


