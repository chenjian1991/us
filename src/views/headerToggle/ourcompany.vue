<template>
   <div id="cripto" class="cripto">
          <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="bg-primary bg-img-hero" style="background-image: url(../../assets/svg/components/abstract-shapes-15.svg);">
      <div class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
          <h1 class="text-white font-weight-medium mb-0">Our Company</h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <!-- Content Section -->
    <div class="container space-2 space-lg-0">
      <div class="row" >
        <div class="col-lg-16 space-lg-2">
          <div class="pl-lg-4">
             <p>Based in the US,  55.Trade supports the major crypto currencies: Bitcoin, Ether and Litecoin, against each other or the US Dollar, or our own stable coin: USDD (US Digital). 55 Trade offers its users, a range of cryptocurrencies to buy/sell and store, on our secure platform. Users have secured wallets available to them on the 55 Trade platform, and deposits or withdrawals from and to wallets is simple. Users can fund their accounts with either crypto or fiat, and we support USD deposits and withdrawals.  </p>

             <h2 class="h4">Our Compliance</h2> 
             <p> 55 Trade is officially registered as a Money Service Business (MSB) with U.S. regulators, administered by the Financial Crimes Enforcement Network (FinCEN).</p>
            
             <p> In collaboration with Prime Trust - A chartered, regulated, insured trust company, 55 also allows using fiat to buy major cryptocurrencies.</p>

             <p><a href="">Learn about our Team Here</a></p>
                      
             <h2 class="h4">Partners</h2> 
             <p>logo们 </p>
        
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


