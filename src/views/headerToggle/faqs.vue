<template>
   <div id="cripto" class="cripto">
              <!-- ========== MAIN ========== -->
     <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="gradient-overlay-half-primary-v1 bg-img-hero" style="background-image: url(../../assets/img/1920x800/img14.jpg);">
      <div class="container space-2 space-top-md-5 space-bottom-md-3">
        <div class="w-md-80 w-lg-60 text-center mx-auto">
          <!-- Title -->
          <div class="mb-5">
            <h1 class="display-4 font-size-md-down-5 text-white mb-0">How can we <span class="font-weight-semi-bold">help?</span></h1>
          </div>
          <!-- End Title -->
        </div>
      </div>
    </div>
    <!-- End Hero Section -->

    <hr class="my-0">

    <!-- FAQ Topics Section -->
    <div class="container space-2 space-md-3">
      <div class="row">
        <div id="stickyBlockStartPoint" class="col-lg-3 mb-7 mb-lg-0">
          <!-- Nav -->
          <nav class="js-sticky-block card border-0 bg-primary"
               data-offset-target="#logoAndNav"
               data-parent="#stickyBlockStartPoint"
               data-sticky-view="lg"
               data-start-point="#stickyBlockStartPoint"
               data-end-point="#stickyBlockEndPoint"
               data-offset-top="24"
               data-offset-bottom="24">
            <ul class="js-scroll-nav list-group list-group-transparent list-group-white list-group-flush list-group-borderless py-3 px-5">
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#basics">Basics</a>
              </li>
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#syncing">What's More</a>
              </li>
              <li>
                <a class="list-group-item list-group-item-action py-3" href="#account">Account Safty</a>
              </li>
            </ul>
          </nav>
          <!-- End Nav -->
        </div>

        <div class="col-lg-9">
          <div id="basics" class="space-bottom-2">
            <!-- Title -->
            <div class="mb-3">
              <h3 class="text-primary font-weight-semi-bold">Basics</h3>
            </div>
            <!-- End Title -->

            <!-- Basics Accordion -->
            <div id="basicsAccordion">
              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn p-3"
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
                       Navigate to “Create Account” in the top navigation and enter your personal information according to the requested fields.
                  </div>
                </div>
                </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                    Users are required to provide a images of a valid government identification of themselves including the front and back of the identification document as well as a picture of the user holding their identification with additional requirements.
                    To complete KYC/AML verification, visit 55.trade/kyc
                  </div>
                </div>
                </div>       
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                    you're looking for more specific inquiries and need to connect with a team at 55 Trade, please reach out directly to the appropriate channels below:
                    For general inquiries: team@55.trade 
                    For business and partnership inquiries: partners@55.trade
	                  For press inquiries: media@55.trade
                    We're also on Telegram with the following channels: Official 55.trade Telegram.
                  </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="basicsHeadingFour">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                    In the top navigation, click on “Deposit & Withdraw” from the “Balances” drop-down menu. Once at the “Deposit & Withdraw” page, click the button for the activity you are looking to complete and then follow the instructions on the following page.                  </div>
                </div>
                </div>
              <!-- End Card -->
            </div>
            <!-- End Basics Accordion -->
          </div>

          <hr class="my-0">

          <div id="syncing" class="space-2">
            <!-- Title -->
            <div class="mb-3">
              <h3 class="text-primary font-weight-semi-bold">What's more</h3>
            </div>
            <!-- End Title -->

            <!-- Syncing Accordion -->
            <div id="syncingAccordion">
              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="syncingHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn p-3"
                            data-toggle="collapse"
                            data-target="#syncingCollapseOne"
                            aria-expanded="false"
                            aria-controls="syncingCollapseOne">
                            My state is not currently eligible for account registration on 55 Trade. When will my state be able to use 55 Trade?
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
                    We will notify clients on updates to our company policies, as they pertain to our regulatory compliance.
                   </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="syncingHeadingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                    Check your spam and junk mail accordingly. If you still require assistance, contact us.
                    If a verification email is not received after creating an account, please contact 55 Live Chat Support for immediate assistance. The issue will be immediately escalated to our technology team to resolve.
                  </div>
                </div>
              </div>
              <!-- End Card -->

            </div>
            <!-- End Syncing Accordion -->
          </div>

          <hr class="my-0">

          <div id="account" class="space-2">
            <!-- Title -->
            <div class="mb-3">
              <h3 class="text-primary font-weight-semi-bold">Account Safty</h3>
            </div>
            <!-- End Title -->

            <!-- Account Accordion -->
            <div id="accountAccordion">

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="accountHeadingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
                            data-toggle="collapse"
                            data-target="#accountCollapseThree"
                            aria-expanded="false"
                            aria-controls="accountCollapseThree">
                            Why am I not receiving an SMS code?

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
                        The SMS code error and not receiving the verification code may be caused by network congestion. Please wait and try again. If error continues, please follow these steps:
                        1.)	Please make sure your location is on the list of SMS supported areas for the 55 Exchange.
                        2.)	Please make sure the signal of your cellphone is stable; move to a location with good signal coverage
                        3.)	Please cancel Firewalls and Blacklists on your phone
                        4.)	Reboot your cell phone
                        If you still cannot receive the SMS verification code after restarting cell phone, please contact 55.com with your mobile phone model, the mobile system category (IOS, Android, etc.), country, location, and we will contact SMS suppliers as soon as possible.
                        
                        55 Customer Support will then reset your Google Authenticator once your selfie photo has been reviewed, verified, and approved.
                      </div>
                </div>
              </div>
              <!-- End Card -->

              <!-- Card -->
              <div class="card mb-3">
                <div class="card-header card-collapse" id="accountHeadingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                        KYC verification is required for each user depositing or withdrawing funds. To complete KYC verification, please log into your account and submit the required information.</div>
                </div>
              </div>
              <!-- End Card -->
              <!-- Card -->
              <div class="card mb-3">
                    <div class="card-header card-collapse" id="accountHeadingFour">
                      <h5 class="mb-0">
                        <button class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed p-3"
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
                            55 will never ask for your account password. Do not give your password to anyone claiming to be from 55 Customer Support. Do not call any phone number for someone claiming to be from 55 Customer Support. Do not send money to any individual claiming to be from 55 Customer Support. 
                            Lastly, as an additional security layer, please enable Google 2FA Authentication. 
                          </div>
                        </div>
                  </div>
                  <!-- End Card -->

            </div>
            <!-- End Account Accordion -->
          </div>

          <hr class="my-0">

        </div>
      </div>
    </div>
    <!-- End FAQ Topics Section -->

    <!-- Sticky Block End Point -->
    <div id="stickyBlockEndPoint"></div>
    <hr class="my-0">
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


