<template>
  <div>
    <!-- Title Section -->
    <div class="bg-light mb-5">
      <div class="container py-5">
        <div class="row align-items-sm-center">
          <div class="col-sm-6">
            <!-- Breadcrumb -->
            <nav class="text-left">
              <ol class="breadcrumb breadcrumb-no-gutter justify-content-sm-start mb-0">
                <li class="breadcrumb-item">
                  <router-link class="text-primary" to="/safeCenter">Account</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">55 Card</li>
              </ol>
            </nav>
            <!-- End Breadcrumb -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Title Section -->
    <div id="applyCard" class="container">
      <!-- Step Form -->
      <form
        class="js-validate js-step-form mb-5"
        data-progress-id="#progressStepForm"
        data-steps-id="#contentStepForm"
        novalidate="novalidate"
      >
        <div class="card">
          <div class="card-header p-5">
            <nav
              id="progressStepForm"
              class="js-step-progress nav nav-icon nav-justified text-center"
            >
              <a class="nav-item">
                <span class="nav-icon-action">
                  <span class="far fa-credit-card nav-icon-action-inner"></span>
                </span>
                Select card type
              </a>
              <a class="nav-item">
                <span class="nav-icon-action">
                  <span class="fas fa-file-alt nav-icon-action-inner"></span>
                </span>
                Confirm the information
              </a>
              <a href="javascript:;" class="nav-item">
                <span class="nav-icon-action">
                  <span class="fas fa-coins nav-icon-action-inner"></span>
                </span>
                Pay card fees
              </a>
              <a class="nav-item">
                <span class="nav-icon-action">
                  <span class="fas fa-check nav-icon-action-inner"></span>
                </span>
                success
              </a>
            </nav>
          </div>

          <!-- Content Step Form -->
          <div id="contentStepForm" class="card-body p-5">
            <div id="selectStepOne" class="active">
              <!-- Blog Card Section -->
              <div class="container space-1">
                <!-- Title -->
                <div class="w-md-80 w-lg-50 text-center mx-md-auto mb-9">
                  <h2 class="font-weight-medium">Choose a card that's right for you.</h2>
                  <p>Spend your BTC, ETH, USDD almost anywhere with 55 Card — the cryptocurrency debit card!</p>
                </div>
                <!-- End Title -->
                <!-- Table -->
                <div class="table-responsive-lg w-lg-75 mx-lg-auto">
                  <table class="table table-striped table-borderless">
                    <thead class="text-center">
                      <tr>
                        <th scope="col" class="w-40"></th>
                        <th scope="col" class="w-20">Virtual Card</th>
                        <th scope="col" class="w-20 border-left border-right">
                          <div class="d-inline">Virtual +</div>
                          <span class="badge badge-warning font-weight-medium badge-pill ml-1">Hot</span>
                          <div>Plastic Card</div>
                        </th>
                        <th scope="col" class="w-20">
                          Virtual +
                          <div class="d-block">Metal Card</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-top border-bottom">
                        <th scope="row" class="h6 bg-white pt-5 pb-3 px-4 mb-0">Activation Price</th>
                        <td class="bg-white border-left text-center align-middle font-size-2">$5</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$5</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$5</td>
                      </tr>
                      <tr>
                        <th scope="row" class="font-size-1 py-3 px-4">Card Price</th>
                        <td class="bg-white border-left text-center align-middle font-size-2">$0</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$10</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$50</td>
                      </tr>
                      <tr>
                        <th scope="row" class="font-size-1 py-3 px-4">Daily Spending Limit</th>
                        <td class="bg-white border-left text-center align-middle font-size-2">$2000</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$3000</td>
                        <td class="bg-white border-left text-center align-middle font-size-2">$5000</td>
                      </tr>
                      <tr>
                        <th scope="row" class="font-size-1 py-3 px-4">ATM Withdrawal</th>
                        <td class="bg-white border-left text-center align-middle font-size-2">N/A</td>
                        <td
                          class="bg-white border-left text-center align-middle font-size-2"
                        >$3,000/day</td>
                        <td
                          class="bg-white border-left text-center align-middle font-size-2"
                        >$5,000/day</td>
                      </tr>
                      <tr>
                        <th scope="row" class="bg-white p-3"></th>
                        <td class="bg-white border-left text-center p-3">
                          <button
                            type="button"
                            class="btn btn-xs btn-primary text-nowrap transition-3d-hover"
                          >Select</button>
                        </td>
                        <td class="bg-white text-center border-left border-right p-3">
                          <button
                            disabled
                            type="button"
                            class="btn btn-xs btn-soft-indigo text-nowrap transition-3d-hover"
                          >Coming soon</button>
                        </td>
                        <td class="bg-white text-center p-3">
                          <button
                            disabled
                            type="button"
                            class="btn btn-xs btn-soft-indigo text-nowrap transition-3d-hover"
                          >Coming soon</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- End Table -->
                <div class="pt-6">
                  <Checkbox v-model="agreePrivacy">
                    I have read and accept the
                    <a
                    class="text-primary"
                      target="_blank"
                      href="http://www.dev_test_uat.55.exchange/DISCLOSURE.pdf"
                    >E-SIGN Disclosure and consent</a>the
                    <a
                    class="text-primary"
                      target="_blank"
                      href="http://www.dev_test_uat.55.exchange/Agreement.pdf"
                    >Prepaid Visa Cardholder Agreement</a> the
                    <a
                    class="text-primary"
                      target="_blank"
                      href="http://www.dev_test_uat.55.exchange/TERMS-OF-USE.pdf"
                    >55Card Terms of Use</a> and the
                    <a
                     class="text-primary"
                      target="_blank"
                      href="http://www.dev_test_uat.55.exchange/POLICY.pdf"
                    >55Retail Privacy Polic</a>
                  </Checkbox>
                </div>
              </div>
              <!-- End Pricing Section -->
              <div class="d-flex justify-content-end">
                <button
                  :disabled="!agreePrivacy"
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover mr-1"
                  data-next-step="#selectStepTwo"
                >{{$t('newK1buttonN')}}</button>
              </div>
              <div style="background:#F6F9FC;" class="p-4 mt-6">
                <h3>Legal Disclaimer</h3>
                <p class="pt-2">
                  The 55 Card™ has been issued to you by Metropolitan Commercial Bank (Member FDIC) pursuant to a license from Visa U.S.A. Inc. “Metropolitan Commercial Bank” and “Metropolitan” are registered trademarks of Metropolitan Commercial Bank © 2014. The Program Manager for the BlockCard™ is PAL Card Minnesota, LLC. By using the 55 Card™ you agree with the Terms and Conditions of the Cardholder Agreement and fee schedule, if any. The 55 Card™ is nontransferable, and it may be canceled, repossessed, or revoked at any time without prior notice subject to applicable law.
                  * The USA PATRIOT Act is a Federal law that requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account. You will be asked to provide your name, address, date of birth, and other information that will allow us to identify you. You will be asked to provide your name, address, date of birth, and Social Security Number which will allow us to identify you. “100% Approval” and “No one is Turned Down” is contingent upon successfully passing this mandatory identification confirmation.
                  ** Faster access to funds is based on comparison of traditional banking policies and deposit of paper checks from employers and government agencies versus deposits made electronically.
                </p>
                <h3>Disciosures</h3>
                <div class="pt-2">
                  <img style="width:114px;" src="../../assets/images/card/FDIC.png" alt />
                  <img style="width:130px;" src="../../assets/images/card/VISA.png" alt />
                </div>
              </div>
            </div>
            <div id="selectStepTwo" style="display: none;">
              <!-- Content Section -->
              <div class="container space-1">
                <div class="row">
                  <div class="col-sm-6 mb-3 h5">Applicant Information</div>
                </div>
                <!-- Personal Info Form -->
                <form class="js-validate">
                  <div class="row">
                    <!-- Input -->
                    <div class="col-sm-6 mb-6">
                      <div class="js-form-message">
                        <label id="nameLabel" class="form-label">
                          Name
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            name="name"
                            value
                            v-model="resultObj.firstName+resultObj.middleName+resultObj.lastName"
                            placeholder="Enter your name"
                            aria-label="Enter your name"
                            aria-describedby="nameLabel"
                            data-msg="Please enter your name."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->

                    <!-- Input -->
                    <div class="col-sm-6 mb-6">
                      <div class="js-form-message">
                        <label id="usernameLabel" class="form-label">
                          date of Birth
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            v-model="resultObj.birthday"
                            name="username"
                            value="1988-04-01"
                            placeholder="Enter your username"
                            aria-label="Enter your username"
                            required
                            aria-describedby="usernameLabel"
                            data-msg="Please enter your username."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->
                  </div>
                  <div class="row">
                    <!-- Input -->
                    <div class="col-sm-6 mb-6">
                      <div class="js-form-message">
                        <label id="emailLabel" class="form-label">
                          Email
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="email"
                            class="form-control"
                            v-model="userInfoMessage.email"
                            name="email"
                            value="bond567@gmail.com"
                            placeholder="Enter your email address"
                            aria-label="Enter your email address"
                            required
                            aria-describedby="emailLabel"
                            data-msg="Please enter a valid email address."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->

                    <!-- Input -->
                    <div class="col-sm-6 mb-6">
                      <div class="js-form-message">
                        <label id="locationLabel" class="form-label">
                          Phone
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            v-model="userInfoMessage.phone"
                            name="location"
                            value="+44 (0161) 347 8854"
                            placeholder="Enter your location"
                            aria-label="Enter your location"
                            required
                            aria-describedby="locationLabel"
                            data-msg="Please enter your location."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->
                  </div>

                  <div class="row">
                    <!-- Input -->
                    <div class="col-sm-6 mb-6">
                      <div class="js-form-message">
                        <label id="organizationLabel" class="form-label">
                          Address
                          <span class="text-danger">*</span>
                          <small
                            class="d-inline form-text text-muted ml-1"
                          >We'll never share your email with anyone else.</small>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            name="organization"
                            v-model="resultObj.street"
                            value="1234 Main St"
                            placeholder="Enter your organization name"
                            aria-label="Enter your organization name"
                            required
                            aria-describedby="organizationLabel"
                            data-msg="Please enter your organization name"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->

                    <!-- Input -->
                    <!-- <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label id="websiteLabel" class="form-label">
                  ADDRESS 2
                  <span class="text-danger">*</span>
                </label>

                <div class="form-group">
                  <input  class="form-control" type="text"  value="" placeholder="" 
                         data-msg="Password enter a valid website"
                         data-error-class="u-has-error"
                         data-success-class="u-has-success">
                </div>
              </div>
                    </div>-->
                    <!-- End Input -->
                  </div>
                  <div class="row">
                    <div class="col-sm-3 col-md-3 mb-6">
                      <div class="js-form-message">
                        <label id="phoneNumberLabel" class="form-label">
                          city
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            class="form-control"
                            v-model="resultObj.city"
                            type="tel"
                            name="phoneNumber"
                            value="+44 (0161) 347 8854"
                            placeholder="Enter your phone number"
                            aria-label="Enter your phone number"
                            required
                            aria-describedby="phoneNumberLabel"
                            data-msg="Please enter a valid phone number"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3 col-md-3 mb-6">
                      <div class="js-form-message">
                        <label class="form-label">
                          state
                          <span class="text-danger">*</span>
                        </label>
                        <div class="form-group">
                          <select disabled class="custom-select">
                            <option value>Select language</option>
                            <option value="languageSelect1" selected>{{resultObj.region}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3 col-md-3 mb-6">
                      <div class="js-form-message">
                        <label id="phoneNumberLabel" class="form-label">
                          zip
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            class="form-control"
                            type="tel"
                            name="phoneNumber"
                            v-model="resultObj.zipCode"
                            value="90011"
                            placeholder="Enter your phone number"
                            aria-label="Enter your phone number"
                            required
                            aria-describedby="phoneNumberLabel"
                            data-msg="Please enter a valid phone number"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3 col-md-3 mb-6">
                      <div class="js-form-message">
                        <label class="form-label">
                          country
                          <span class="text-danger">*</span>
                        </label>
                        <div class="form-group">
                          <select disabled class="custom-select">
                            <option value>Select language</option>
                            <option value="languageSelect1" selected>{{resultObj.country}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-1 mb-7" />
                  <div class="row">
                    <div class="col-sm-6 mb-3 h5">Identification Information</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-2 col-md-2 mb-6">
                      <div class="js-form-message">
                        <label id="phoneNumberLabel" class="form-label">
                          id1
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            class="form-control"
                            type="tel"
                            name="phoneNumber"
                            value="SSN"
                            placeholder="Enter your phone number"
                            aria-label="Enter your phone number"
                            required
                            aria-describedby="phoneNumberLabel"
                            data-msg="Please enter a valid phone number"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4 col-md-4 mb-6">
                      <div class="js-form-message">
                        <label class="form-label">
                          NO.
                          <span class="text-danger">*</span>
                        </label>
                        <div class="form-group">
                          <input
                            disabled
                            class="form-control"
                            type="tel"
                            name="phoneNumber"
                            v-model="this.resultObj.tin?this.resultObj.tin:this.resultObj.ssn"
                            value="123456789"
                            placeholder="Enter your phone number"
                            aria-label="Enter your phone number"
                            required
                            aria-describedby="phoneNumberLabel"
                            data-msg="Please enter a valid phone number"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2 col-md-2 mb-6">
                      <div class="js-form-message">
                        <label class="form-label">
                          id2
                          <span class="text-danger">*</span>
                        </label>
                        <div class="form-group">
                          <select disabled class="custom-select">
                            <option value>Select language</option>
                            <option value="languageSelect1" selected>{{resultObj.idType}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4 col-md-4 mb-6">
                      <div class="js-form-message">
                        <label id="phoneNumberLabel" class="form-label">
                          NO.
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            class="form-control"
                            type="tel"
                            v-model="resultObj.idNumber"
                            name="phoneNumber"
                            value="90011"
                            placeholder="Drivers license NO."
                            aria-label="Enter your phone number"
                            required
                            aria-describedby="phoneNumberLabel"
                            data-msg="Please enter a valid phone number"
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- End Content Section -->
              <!-- End Blog Card Section -->
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-previous-step="#selectStepOne"
                >{{$t('newK1buttonP')}}</a>
                <button
                  @click="submitMessage"
                  type="button"
                  class="btn btn-sm btn-primary transition-3d-hover"
                  data-next-step="#selectStepThree"
                >{{$t('newK1buttonN')}}</button>
              </div>
            </div>

            <div id="selectStepThree" style="display: none;">
              <!-- Title -->
              <!-- <div class="w-md-80 w-lg-50 text-center mx-md-auto">
        <h2>{{$t('步骤三')}}</h2>
        <span class="btn btn-xs btn-soft-success btn-pill mb-2">{{$t('ggyzSaveKeyOnPaper')}}，{{$t('ggyzRecoverTip')}} </span>
              </div>-->
              <!-- End Title -->
              <!-- Blog Card Section -->
              <div class="container space-top-1">
                <div class="row">
                  <div class="col-sm-6 mb-3 h5">Payment description</div>
                </div>
                <!-- Personal Info Form -->
                <form class="js-validate">
                  <div class="row">
                    <!-- Input -->
                    <div class="col-sm-12 col-lg-12 mb-6">
                      <div class="js-form-message">
                        <label id="nameLabel" class="form-label">
                          Activation and Card Fees
                          <span class="text-danger">*</span>
                        </label>

                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            name="name"
                            v-model="paymentMessage.payNum"
                            value="$15"
                            placeholder="Enter your name"
                            aria-label="Enter your name"
                            aria-describedby="nameLabel"
                            data-msg="Please enter your name."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                          <small
                            class="form-text text-muted"
                          >Activation Price：${{paymentMessage.activationFee}} Card Price：${{paymentMessage.costsFee}}</small>
                        </div>
                      </div>
                    </div>
                    <!-- End Input -->
                  </div>
                  <div class="row">
                    <div class="col-sm-2 col-md-2 mb-6">
                      <div class="js-form-message">
                        <label class="form-label">
                          Payment Currency
                          <span class="text-danger">*</span>
                        </label>
                        <div @change="paymentMethod(couponSelected)" class="form-group">
                          <select   v-model="couponSelected" class="custom-select">
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="USDD">USDD</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <!-- Input -->
                    <div class="col-sm-10 col-lg-10 mb-6">
                      <div class="js-form-message">
                        <label id="usernameLabel" class="form-label">
                          Exchange rate：1{{couponSelected}} = ${{rateInfo.rate}}
                          <span
                            class="text-danger"
                          >*</span>
                        </label>
                        <div class="form-group">
                          <input
                            disabled
                            type="text"
                            v-model="payRateInfoMessage.payTotalAmout"
                            class="form-control"
                            name="username"
                            value="0.191923"
                            placeholder="Enter your username"
                            aria-label="Enter your username"
                            required
                            aria-describedby="usernameLabel"
                            data-msg="Please enter your username."
                            data-error-class="u-has-error"
                            data-success-class="u-has-success"
                          />
                          <small class="form-text text-muted">Availble：{{available}}  &nbsp{{couponSelected}}</small>
                        </div>
                      </div>
                    </div>
                    <!-- <div>{{paymentExpiredAt}}</div> -->
                    <!-- End Input -->
                  </div>
                </form>
              </div>
              <!-- End Blog Card Section -->
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1"
                  href="javascript:;"
                  data-previous-step="#selectStepTwo"
                >{{$t('newK1buttonP')}}</a>
                <!-- <button type="button" data-next-step="#selectStepFour" class="btn btn-sm btn-primary transition-3d-hover">Confirm Payment</button> -->
                <button
                  type="button"
                  @click="confrimPay"
                  class="btn btn-sm btn-primary transition-3d-hover"
                >Confirm Payment</button>
              </div>
            </div>
            <Modal
              :mask-closable="false"
              :closable="false"
              v-model="pwdModal"
              :title="this.$t('safeVerify')"
              class-name="passwordPup cardPup"
            >
              <Form class="clearfix form_container">
                <div class="clearfix">
                  <div class="span-label">
                    <span>{{$t('jymmTradingPassword')}}</span>
                  </div>
                  <FormItem class="form_item" prop="smsCode">
                    <Input
                      type="password"
                      :maxlength="6"
                      v-model="password"
                      :placeholder="$t('bbjyInputPassword')"
                    ></Input>
                  </FormItem>
                </div>
              </Form>
              <p slot="footer">
                <button
                  class="cancelBtn"
                  style="margin-right:74px;cursor:pointer"
                  @click="cancelbtn"
                >{{$t('cancel')}}</button>
                <button
                  class="loginbtn"
                  @click="pupModal"
                  data-next-step="#selectStepFour"
                  :disabled="disabledbtn"
                  size="large"
                  type="primary"
                >{{$t('confrim')}}</button>
                <!-- <Button v-else disabled loading class="loginbtn"  @click="handleSubmit('formValidate')" type="primary"></Button>  -->
              </p>
            </Modal>

            <div id="selectStepFour" style="display: none;">
              <Modal
                :mask-closable="false"
                :closable="false"
                v-model="paymentModal"
                title="Cancel payment"
                class-name="passwordPup cardPup"
              >
                <div>
                  <h3 class="h4">Cancel payment？</h3>
                  <p>You will end up applying for a card.</p>
                  <p>If you still cancel,the refund amount will be returned to your account in USDD.</p>
                </div>
                <p slot="footer">
                  <button
                    class="cancelBtn"
                    style="margin-right:74px;cursor:pointer"
                    @click="closePayModal"
                  >Still cancel</button>
                  <button class="loginbtn" @click="closePayModal" size="large" type="primary">Close</button>
                </p>
              </Modal>
              <!-- Cart Section 成功 submitted -->
              <div
                v-if="applyStatus==1||applyStatus==2||applyStatus==4||applyStatus==6"
                class="container space-1"
              >
                <div class="w-md-80 w-lg-50 text-center mx-md-auto">
                  <figure
                    id="iconChecked"
                    class="svg-preloader ie-height-90 max-width-11 mx-auto mb-3"
                  >
                    <img
                      class="js-svg-injector"
                      src="../../assets/images/card/checked-icon.svg"
                      alt="SVG"
                      data-parent="#iconChecked"
                    />
                  </figure>
                  <div class="mb-5">
                    <h1 class="h3 font-weight-medium">Your order has been submitted!</h1>
                    <p>Your order is being processed You will receive an email confirmation when your order is completed.</p>
                  </div>
                  <button
                    @click="successConfirm"
                    class="btn btn-primary btn-pill transition-3d-hover px-5"
                    href="javascript;"
                  >Confirm</button>
                </div>
              </div>
              <!-- End Cart Section -->

              <!-- Cart Section  失败  payment!-->
              <!-- v-if='applyStatus==3||applyStatus==5||applyStatus==7||applyStatus==10' -->
              <div class="container space-1">
                <div class="w-md-80 w-lg-50 text-center mx-md-auto">
                  <img
                    class="js-svg-injector"
                    src="../../assets/images/card/Failure.svg"
                    alt="SVG"
                    data-parent="#iconCheckedFail"
                  />
                  <div class="mb-5">
                    <h1 class="h3 font-weight-medium">Sorry, something went wrong with your payment!</h1>
                    <p>Something went wrong during the payment process. Let’s go back and try again.</p>
                  </div>
                  <span @click="canceApply" class="mr-6 cursor" href="javascript:;">Cancel</span>
                  <a
                    data-previous-step="#selectStepThree"
                    class="btn btn-primary btn-pill transition-3d-hover px-5 text-white"
                  >Try Again</a>
                </div>
              </div>
              <!-- End Cart Section -->

              <!-- Cart Section  失败  process!-->
              <!-- v-if='applyStatus==3||applyStatus==5||applyStatus==7||applyStatus==10' -->
              <div class="container space-1">
                <div class="w-md-80 w-lg-50 text-center mx-md-auto">
                  <img
                    class="js-svg-injector"
                    src="../../assets/images/card/Failure.svg"
                    alt="SVG"
                    data-parent="#iconCheckedFailtwo"
                  />
                  <div class="mb-5">
                    <h1
                      class="h3 font-weight-medium"
                    >Sorry, something went wrong during the enrollment process!</h1>
                    <p>Your enrollment information may contain an error. Please review and submit again.</p>
                  </div>
                  <span @click="canceApply" class="mr-6 cursor" href="javascript:;">Cancel</span>
                  <a
                    data-previous-step="#selectStepTwo"
                    class="btn btn-primary btn-pill transition-3d-hover px-5 text-white"
                  >Make Corrections</a>
                </div>
              </div>
              <!-- End Cart Section -->

              <!-- Cart Section enrollment 成功  process!-->
              <div v-if="applyStatus==8" class="container space-1">
                <div class="w-md-80 w-lg-50 text-center mx-md-auto">
                  <figure
                    id="iconCheckedsuccesstwo"
                    class="svg-preloader ie-height-90 max-width-11 mx-auto mb-3"
                  >
                    <img
                      class="js-svg-injector"
                      src="../../assets/images/card/checked-icon.svg"
                      alt="SVG"
                      data-parent="#iconCheckedsuccesstwo"
                    />
                  </figure>
                  <div class="mb-5">
                    <h1 class="h3 font-weight-medium">Your enrollment was successful!</h1>
                    <p>Congratulations, your 55 Visa Debit Card will be on the way soon! Keep an eye out for an email letting you know when it ships.</p>
                  </div>
                  <a
                    @click="successConfirm"
                    class="btn btn-primary btn-pill transition-3d-hover px-5"
                    href="javascript:;"
                  >Confirm</a>
                </div>
              </div>
              <!-- End Cart Section -->

              <!-- <div class="d-flex justify-content-end mt-3">
          <a class="btn btn-sm btn-soft-secondary transition-3d-hover mr-1" href="javascript:;" data-previous-step="#selectStepThree">{{$t('newK1buttonP')}}</a>
          <button type="button" @click="handleSubmit('formValidate')" class="btn btn-sm btn-primary transition-3d-hover">{{$t('ggyzMGoogleAuthentication')}}</button>
              </div>-->
            </div>
          </div>
          <!-- End Content Step Form -->
        </div>
      </form>
      <!-- End Step Form -->
    </div>
  </div>
</template>


<script>
import { identifyQueryUrl, userInfo, commonCard } from "../../../api/urls.js";
import {
  getHeaderTokenApi,
  postHeaderTokenBodyApi,
  postHeaderKeyIdBodyApi
} from "../../../api/axios.js";
import Cookies from "js-cookie";
import { Exchange } from "@/interface/exchange.js";
import { getCreatePasswordToken } from "_api/exchange.js";
import {countNumberDown} from '@/lib/utils.js'


export default {
  name: "card",
  data() {
    return {
      kyeofsecret: "",
      loginPwd: "",
      codeOfGoogle: "",
      empty: true,
      token: "",
      personJson: {},
      resultObj: {},
      userInfoMessage: {},
      cardID: "",
      accoutId: "",
      paymentMessage: {},
      totalFee: "",
      couponSelected: "BTC",
      payRateInfoMessage: {
        payTotalAmout: ""
      },
      rateInfo: {
        rate: ""
      },
      pwdModal: false,
      password: "",
      disabledbtn: true,
      applyStatus: "",
      responselockID: "",
      chargeId: "",
      paymentModal: false,
      agreePrivacy: false,
      aliveTime:'',
      payMoneyTimer:null,
      paymentExpiredAt:'--',
      available:'',
      balancesList:[],
    };
  },
  methods: {
    okSubmit() {},
    pupModal() {
      // 跳转到第四步骤
      this.pwdModal = false;
      this.queryApplyStatus();
    },
    cancelbtn() {
      this.pwdModal = false;
    },
    confrimPay() {
      this.pwdModal = true;
      this.password = "";
    },
    successConfirm() {
      this.$router.push("/aboutCard");
    },
    confirm() {
      //查询交易密码是否正确；
      getCreatePasswordToken(Cookies.get("loginToken"), {
        password: this.password,
        tradePasswordType: "TRADE_PASSWORD"
      }).then(res => {
        if (res.code) {
          this.$Notice.error({
            title: this.$t(res.code),
            desc: this.$t(res.code)
          });
        } else {
          if (res.token) {
            this.applyCharge(); //交易密码输入正确后调用付款接口
          }
        }
      });
    },
    submitMessage() {
      //点击第三步骤按钮提交个人信息
      this.exchange.getAccountId(
        function(result) {
          this.accoutId = result;
          let params = {
            address1: this.resultObj.street,
            birthdate: this.resultObj.birthday,
            cardTypeId: 1,
            channelUid: result,
            city: this.resultObj.city,
            country: this.resultObj.country,
            email: this.userInfoMessage.email,
            firstname: this.resultObj.firstName,
            id1: this.resultObj.tin ? this.resultObj.tin : this.resultObj.ssn,
            id1_type: "ssn",
            id2: this.resultObj.idNumber,
            id2_type: this.resultObj.idType,
            lastname: this.resultObj.lastName,
            phone: this.userInfoMessage.phone,
            state: this.resultObj.region,
            zip_code: this.resultObj.zipCode
          };
          postHeaderKeyIdBodyApi(commonCard, {
            url: "/cardServerApi/fillCardUserApplyInfo",
            params: JSON.stringify(params)
          }).then(res => {
            if (res.message) {
              this.$Notice.error({
                title: this.$t("transfer" + res.message),
                desc: this.$t("transfer" + res.message)
              });
            }
            this.cardID = res.data.id;
            this.payCardFee(); //获取激活费，成本费
            this.queryBlance()

          });
        }.bind(this)
      );
    },
    payCardFee() {
      //获取激活费，成本费
      let params = {
        applyInfoId: this.cardID,
        channelUid: this.accoutId
      };
      postHeaderKeyIdBodyApi(commonCard, {
        url: "/cardServerApi/getUserApplyCardInfo",
        params: JSON.stringify(params)
      }).then(res => {
        if (res.message) {
          this.$Notice.error({
            title: this.$t("transfer" + res.message),
            desc: this.$t("transfer" + res.message)
          });
        }
        this.paymentMessage = res.data.entity; // 价格，费率
        this.paymentMethod();
        // |activationFee | string | 激活费用      |
        // | costsFee      | string | 成本费        |
        // | unit          | string | 支持的法币USD |
        // | payNum
        console.log(res);
      });
    },
    paymentMethod(e) {
      this.selectCoin(e)
      //获取费率价格
      this.exchange.getAccountId(
        function(result) {
          let params = {
            amount: this.paymentMessage.payNum,
            channelUid: result,
            fixedType: 1,
            lockRateID: "",
            sendCyCode: this.couponSelected
          };
          postHeaderKeyIdBodyApi(commonCard, {
            url: "/cardServerApi/getPayRateInfo",
            params: JSON.stringify(params)
          }).then(res => {
            if (res.message) {
              this.$Notice.error({
                title: this.$t("transfer" + res.message),
                desc: this.$t("transfer" + res.message)
              });
            }
            this.payRateInfoMessage = res.data.entity;
            this.rateInfo = res.data.entity.rateInfo;
            this.aliveTime = res.data.entity.rateInfo.aliveTime;
            console.log(this.aliveTime)
            this.responselockID = res.data.entity.rateInfo.lockID;
            this.timeoutMethod()
            // | rateInfo            |        | 代币-USD 的 汇率信息 |
            // | rateInfo.lockID     | string | 汇率锁定id           |
            // | rateInfo.rate       | string | 汇率                 |
            // | rateInfo.createTime | string | 汇率获取时间         |
            // | rateInfo.aliveTime  | string | 汇率有效时间（毫秒） |
            // | sendAmount          | string | 代币支付数量         |
            // | receiveAmount       | string | USD数量              |
            // | payTotalAmout       | string | 总共支付代币数量     |
            console.log("this.payRateInfoMessage", this.payRateInfoMessage);
          });
        }.bind(this)
      );
    },
    timeoutMethod(){// 倒计时
                    if(this.aliveTime){
                        if(!this.payMoneyTimer){
                            this.aliveTimeNumber  = this.aliveTime/1000;
                             this.payMoneyTimer = setInterval(() => {
                                 let second =  this.aliveTimeNumber--;
                                 let obj = countNumberDown(second)
                                 if(obj.second>=0){
                                     this.paymentExpiredAt = obj.minutes+":"+obj.second;
                                 }else{//如果倒计时结束后
                                     clearInterval(this.payMoneyTimer)
                                     this.payMoneyTimer = null;
                                     this.paymentMethod()
                                 }
                             }, 1000);
                        }
                    }
            },
    getRealNameIdentify(token) {
      //获取用户的基本信息
      getHeaderTokenApi(identifyQueryUrl, {}, token)
        .then(res => {
          if (res.data.code) {
            this.$Notice.error({
              title: this.$t(res.data.code),
              desc: this.$t(res.data.code)
            });
            this.$router.push("/login");
          }
          this.personJson = res.data.formJson;
          this.resultObj = JSON.parse(this.personJson);
        })
        .catch(res => {
          console.log(res);
        });
    },
    getUserInfo(token) {
      //获取手机号和邮箱
      postHeaderTokenBodyApi(userInfo, token, {})
        .then(res => {
          if (res.code) {
            this.showModal = !this.showModal; //！取非解决了弹出只谈一次的bug
            this.text = this.$t(res.code);
            if (res.code == "10013") {
              this.showModal = !this.showModal; //！取非解决了弹出只谈一次的bug
              this.text = this.$t(res.code);
              this.$store.commit("changeLoingStatus", false);
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
            }
          } else {
            this.userInfoMessage = res;
          }
        })
        .catch(res => {});
    },
    queryApplyStatus() {
      // 查询卡片申请状态
      this.exchange.getAccountId(
        function(result) {
          let params = {
            channelUid: result
          };
          postHeaderKeyIdBodyApi(commonCard, {
            url: "/cardServerApi/getApplyStatus",
            params: JSON.stringify(params)
          }).then(res => {
            if (res.message) {
              this.$Notice.error({
                title: this.$t("transfer" + res.message),
                desc: this.$t("transfer" + res.message)
              });
            }
            this.applyStatus = res.data.value;
            this.applyStatus = 3;
            console.log(res);
          });
        }.bind(this)
      );
    },
    applyCharge() {
      let _that = this;
      this.disabledbtn = false;
      _that.exchange.getAccountId(function(result) {
        _that.exchange.getToken("ASSET", function(data) {
          //获取资产的token
          let params = {
            applyInfoId: _that.cardID,
            channelUid: result,
            fixedType: "1",
            lockRateId: _that.responselockID,
            receiveAmount: _that.paymentMessage.payNum,
            receiveCyCode: "USD",
            rechargeType: 0,
            sendAmount: _that.payRateInfoMessage.payTotalAmout,
            sendCyCode: _that.couponSelected,
            uniqueId: "",
            assetToken: data
          };
          postHeaderKeyIdBodyApi(commonCard, {
            url: "/cardServerApi/recharge",
            params: JSON.stringify(params)
          }).then(res => {
            if (res.message) {
              this.disabledbtn = true;
              _that.$Notice.error({
                title: _that.$t("transfer" + res.message),
                desc: _that.$t("transfer" + res.message)
              });
            }
            _that.chargeId = res.data.id;
            if (res.data.id) {
              this.disabledbtn = false;
              _that.$Notice.sccess({
                title: _that.$t(11001),
                desc: _that.$t(11001)
              });
            }
            console.log("charge", res);
          });
        });
      });
    },
    closePayModal() {
      this.paymentModal = false;
    },
    canceApply() {
      this.paymentModal = true;
    },
    selectCoin(coin){
       this.balancesList.map((v,i)=>{
            if(v.currency == coin){
              this.available = v.available;
              console.log(this.available)
            }
          })
    },
    queryBlance(){
      this.exchange.balance(function (result) {//获取资产
          this.balancesList = result;
          this.selectCoin('BTC');
        console.log(result)
      }.bind(this))
    }
     
  },
  computed: {
    languageChange() {
      return this.$store.state.app.countryLanguage; //  返回全局state的状态值
    },
    passwordLength() {
      return this.password.length;
    }
  },
  watch: {
    languageChange(val, oldVal) {},
    passwordLength(val, oldVal) {
      if (val == 6) {
        this.confirm();
      }
    }
  },
  mounted() {
    let loginToken = Cookies.get("loginToken");
    let ssoProvider = {};
    this.exchange = new Exchange(ssoProvider);
    if (loginToken) {
      this.exchange.ssoProvider.getSsoToken = function(fn) {
        fn(loginToken);
      };
    } else {
      this.$router.push("/login");
    }
    this.getRealNameIdentify(Cookies.get("loginToken"));
    this.getUserInfo(Cookies.get("loginToken"));
    $.HSCore.components.HSStepForm.init(".js-step-form");
    $.HSCore.components.HSSVGIngector.init(".js-svg-injector");
    $.HSCore.components.HSValidation.init(".js-validate", {
      //实例化表单验证方法 js-validate
    });
  }
};
</script>
<style lang="less">
.cardPup {
  .form_container {
    .form_item {
      .ivu-input-wrapper {
        width: 100%;
      }
    }
  }
}
#selectStepOne {
  .ivu-checkbox-checked {
    .ivu-checkbox-inner {
      border-color: #12869a;
      background-color: #12869a;
    }
  }
}
</style>



