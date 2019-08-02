<template>
   <div id="cripto" class="cripto">
              <!-- ========== MAIN ========== -->
     <!-- ========== MAIN ========== -->
  <main id="content" role="main">
   <!-- Hero Section -->
    <div style="background:#092a30;"  class="bg-img-hero">
      <div id="bg-img" class="container space-2 space-lg-3">
        <div class="w-lg-65 text-center mx-lg-auto">
            <h1 class="display-4 font-size-md-down-5 text-white mb-0">How can we <span class="font-weight-semi-bold">help?</span></h1>
        </div>
      </div>
    </div>
    <!-- End Hero Section -->




    <!-- FAQ Topics Section -->
    <div class="container space-2 space-md-3">
      <div class="row">
        <div id="stickyBlockStartPoint" class="col-lg-3 mb-7 mb-lg-0">
          <!-- Nav -->
          <nav class="js-sticky-block card border-0 bg-primary bg-55-primary"
               data-offset-target="#logoAndNav"
               data-parent="#stickyBlockStartPoint"
               data-sticky-view="lg"
               data-start-point="#stickyBlockStartPoint"
               data-end-point="#stickyBlockEndPoint"
               data-offset-top="24"
               data-offset-bottom="24">
            <ul class="js-scroll-nav list-group list-group-transparent list-group-white list-group-flush list-group-borderless py-3 px-5">
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#basics">General</a>
              </li>
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#syncing">Account Creation</a>
              </li>
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#account">Account Safety</a>
              </li>
            </ul>
          </nav>
          <!-- End Nav -->
        </div>

        <div class="col-lg-9">
          <div id="basics" class="space-1">
            <!-- Title -->
            <div class="mb-3">
              <h3  class="text-primary font-weight-semi-bold">General</h3>
            </div>
            <!-- End Title -->

            <!-- Basics Accordion -->
            <div id="basicsAccordion">
              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn p-3"
                            data-toggle="collapse"
                            data-target="#basicsCollapseOne"
                            aria-expanded="true"
                            aria-controls="basicsCollapseOne">
                            How do I create an account?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="basicsCollapseOne" class="collapse show"
                     aria-labelledby="basicsHeadingOne"
                     data-parent="#basicsAccordion">
                  <div class="card-body">
                       Navigate to <router-link class='text-primary' to='/Register'>“Create Account” </router-link> in the top navigation and enter your personal information according to the requested fields.
                  </div>
                </div>
                </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#basicsCollapseTwo"
                            aria-expanded="false"
                            aria-controls="basicsCollapseTwo">
                            What is KYC/AML and why do I have to complete it? 

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="basicsCollapseTwo" class="collapse"
                     aria-labelledby="basicsHeadingTwo"
                     data-parent="#basicsAccordion">
                  <div class="card-body">
                    KYC/AML is know your customer and anti-money laundering identity verification that all users must pass to be able to perform any transacting functions on 55.trade or 55.com. 
                    KYC/AML identity verification is required for all users to operate within US compliance.
                    Users are required to provide images of a valid government identification of themselves including the front and back of the identification document as well as a picture of themselves / the user holding their identification with additional requirements.
                    To complete KYC/AML verification, visit <router-link to='/kyc'>55.trade/kyc</router-link> 
                  </div>
                </div>
                </div>       
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#basicsCollapseThree"
                            aria-expanded="false"
                            aria-controls="basicsCollapseThree">
                            How do I contact 55 Trade?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="basicsCollapseThree" class="collapse"
                     aria-labelledby="basicsHeadingThree"
                     data-parent="#basicsAccordion">
                  <div class="card-body">
                    Please review this FAQ for answers. If you are unable to resolve your issue through the FAQ, please contact the 55 Trade team directly at the channels listed below:
                      <ul class='pl-3 mt-3'>
                        <li>
                          For general inquiries: <a class='text-primary' href='mailto:team@55.trade'>team@55.trade</a>
                        </li>
                        <li>
                          For business and partnership inquiries:<a class='text-primary' href='mailto:partners@55.trade'>partners@55.trade</a> 
                        </li>
                         <li>
	                        For press inquiries:<a class='text-primary' href='mailto:media@55.trade'>media@55.trade</a> 
                        </li>
                        <li>
                         We're also on Telegram with the following channels: Official 55.trade Telegram. 
                        </li>
                        
                      </ul>
                  </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingFour">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#basicsCollapseFour"
                            aria-expanded="false"
                            aria-controls="basicsCollapseFour">
                            How do I deposit and withdraw funds?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="basicsCollapseFour" class="collapse"
                     aria-labelledby="basicsHeadingFour"
                     data-parent="#basicsAccordion">
                  <div class="card-body">
                    In the top navigation, click on <router-link class='text-primary' to='/balances'>“Deposit & Withdraw”</router-link> from the <router-link class='text-primary' to='/balances'>“Balances” </router-link>  drop-down menu. Once at the <router-link class='text-primary' to='/balances'>“Deposit & Withdraw”</router-link> page, click the button for the activity you are looking to complete and then follow the instructions on the following page.</div>
                </div>
                </div>
              <!-- End Card -->
            </div>
            <!-- End Basics Accordion -->
          </div>
          <div id="syncing" class="space-1">
            <!-- Title -->
            <div class="mb-3">
              <h3 class="text-primary font-weight-semi-bold">Account Creation</h3>
            </div>
            <!-- End Title -->

            <!-- Syncing Accordion -->
            <div id="syncingAccordion">
              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="syncingHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn p-3"
                            data-toggle="collapse"
                            data-target="#syncingCollapseOne"
                            aria-expanded="false"
                            aria-controls="syncingCollapseOne">
                            My state is not currently eligible for account creation on 55 Trade. When will my state be able to use 55 Trade?
                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="syncingCollapseOne" class="collapse show"
                     aria-labelledby="syncingHeadingOne"
                     data-parent="#syncingAccordion">
                  <div class="card-body">
                    We will notify registrants on updates to our company policies and regulatory compliance via email. To receive updates, news, and announcements, <router-link class='text-primary' to='/Register'>join here</router-link>
                   </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="syncingHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#syncingCollapseTwo"
                            aria-expanded="false"
                            aria-controls="syncingCollapseTwo">
                            Why didn’t I receive a verification email after creating an account?
                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="syncingCollapseTwo" class="collapse"
                     aria-labelledby="syncingHeadingTwo"
                     data-parent="#syncingAccordion">
                  <div class="card-body">
                    Check your spam and junk mail accordingly. If you still require assistance, <router-link class='text-primary' to='/contactus'>contact us.</router-link>
                    If a verification email is not received after creating an account, please contact 55 Live Chat Support for immediate assistance. The issue will be immediately escalated to our technology team to resolve.
                  </div>
                </div>
              </div>
              <!-- End Card -->

            </div>
            <!-- End Syncing Accordion -->
          </div>


          <div id="account" class="space-1">
            <!-- Title -->
            <div class="mb-3">
              <h3  class="text-primary font-weight-semi-bold">Account Safety</h3>
            </div>
            <!-- End Title -->

            <!-- Account Accordion -->
            <div id="accountAccordion">

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="accountHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#accountCollapseTwo"
                            aria-expanded="false"
                            aria-controls="accountCollapseTwo">
                            What is Google 2Factor Authentication (2FA)?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="accountCollapseTwo" class="collapse"
                     aria-labelledby="accountHeadingOne"
                     data-parent="#accountAccordion">
                  <div class="card-body">
                     Google 2FA Authentication is an extra layer of security used to make sure that people trying to gain access to an online account are who they say they are. First, a user will enter their username and a password. Then, the user will be required to provide another piece of information, the 2FA code (second “factor”) when signing into the account.                  </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="accountHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#accountCollapseThree"
                            aria-expanded="false"
                            aria-controls="accountCollapseThree">
                            Why didn't I receive an SMS code?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="accountCollapseThree" class="collapse"
                     aria-labelledby="accountHeadingTwo"
                     data-parent="#accountAccordion">
                  <div class="card-body">
                        The SMS code error and not receiving the verification code may be caused by network congestion. Please wait and try again. If you continue to experience this SMS code issue, please follow these steps:
                              <ul class='pl-3 mt-3 mb-3'>
                        <li>
                            1.)	Please make sure your location is on the list of SMS supported areas for the 55 Exchange.
                        </li>
                        <li>
                          2.)	Please make sure the signal of your cellphone is stable; move to a location with good signal coverage
                        </li>
                         <li>
	                        3.)	Please cancel Firewalls and Blacklists on your phone
                        </li>
                        <li>
                        4.)	Reboot your cell phone
                        </li>
                      </ul>
                        If you still cannot receive the SMS verification code after restarting cell phone, please contact 55 with your mobile phone model, the mobile system category (IOS, Android, etc.), country, location, and we will contact SMS suppliers as soon as possible.
                        
                        55 Customer Support will then reset your Google Authenticator once your selfie photo has been reviewed, verified, and approved.
                      </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="accountHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#accountCollapseFour"
                            aria-expanded="false"
                            aria-controls="accountCollapseFour">
                            Is KYC required for depositing or withdrawing funds?

                      <span class="card-btn-arrow">
                        <span class="fas fa-arrow-down small"></span>
                      </span>
                    </button>
                  </h5>
                </div>
                <div id="accountCollapseFour" class="collapse"
                     aria-labelledby="accountHeadingThree"
                     data-parent="#accountAccordion">
                  <div class="card-body">
                        KYC verification is required for each user depositing or withdrawing funds. To complete <router-link class='text-primary' to='/kyc'>KYC verification </router-link>,please <router-link class='text-primary' to='/login'>log into</router-link> your account and submit the required information.</div>
                </div>
              </div>
              <!-- End Card -->
              <!-- Card -->
              <div class="card mb-3">
                    <div class="card-header card-collapse" id="accountHeadingFour">
                      <h5 class="mb-0">
                        <button class="btn  btn-block d-flex justify-content-between card-btn collapsed p-3"
                                data-toggle="collapse"
                                data-target="#accountCollapseFour"
                                aria-expanded="false"
                                aria-controls="accountCollapseFour">
                                How can I keep my account safe?
    
                          <span class="card-btn-arrow">
                            <span class="fas fa-arrow-down small"></span>
                          </span>
                        </button>
                      </h5>
                    </div>
                    <div id="accountCollapseFour" class="collapse"
                         aria-labelledby="accountHeadingFour"
                         data-parent="#accountAccordion">
                      <div class="card-body">
                            55 will never ask for your account password. Do not give your password to anyone claiming to be from 55 Customer Support. Do not pickup nor call any phone number from someone claiming to be from 55 Customer Support. Do not send money to any individual claiming to be from 55 Customer Support. 
                            As an additional security layer, please enable Google 2FA Authentication. 
                          </div>
                        </div>
                  </div>
                  <!-- End Card -->

            </div>
            <!-- End Account Accordion -->
          </div>


        </div>
      </div>
    </div>
    <!-- End FAQ Topics Section -->

    <!-- Sticky Block End Point -->
    <div id="stickyBlockEndPoint"></div>
  <!-- ========== END MAIN ========== -->
  </main>
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
                      $.HSCore.components.HSMalihuScrollBar.init($('.js-scrollbar'));
                            $.HSCore.components.HSShowAnimation.init('.js-animation-link');
                        $.HSCore.components.HSStickyBlock.init('.js-sticky-block');



        },
    
        
        
    }
</script>
<style lang="less">
.text-primary,.fa-arrow-down{
      color:#12869A !important;
  }
  .bg-55-primary{
    background:#12869A !important;
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


