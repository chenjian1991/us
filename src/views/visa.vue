<template>
  <div class="visaWrap">
      <input  type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
        <div id="captcha"></div>

     <!-- ========== MAIN ========== -->
  <main id="content" role="main">
    <!-- Hero Section -->
    <div class="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll"
         data-options='{direction: "normal"}' style="background-image: url(assets/img13.jpg);">
      <!-- Apply your Parallax background image here -->
      <div class="divimage dzsparallaxer--target" style="height: 120%; background-image: url(img13.jpg);"></div>

      <!-- Content -->
      <div class="container position-relative u-space-5-top u-space-3-bottom z-index-2">
        <div class="w-lg-80 text-center mx-auto">
          <h1 class="display-5 font-size-40--md-down text-white font-weight-bold">Payment Method For the Future！</h1>
          <p class="lead text-white">55 Visa Debit Card</p>
        </div>
      </div>
      <!-- End Content -->
    </div>
    <!-- End Hero Section -->



    <hr class="my-0">

    <!-- Contact Form Section -->
    <div class="container u-space-3">
      <!-- Title -->
      <div class="w-md-80 w-lg-50 text-center mx-auto mb-9">
        <span class="u-label u-label--sm u-label--success mb-2">Pre-order Form</span>
        <h2 class="text-primary font-weight-normal">Pre-order your<span class="font-weight-bold"> 55 Visa Debit Card</span></h2>
        <p> 
Please send us the following information, 55 customer support will contact you when 55 Visa Debit is officially ready for sale.</p>
      </div>
      <!-- End Title -->

      <div class="w-lg-80 mx-auto">
        <!-- Contacts Form -->
        <div class="js-validate">
          <div class="row" style="height:206px;padding:20px 0">
            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="h6 small d-block text-uppercase">
                  Your name
                  <span class="text-danger">*</span>
                </label>

                <div class="js-focus-state input-group u-form">
                  <input class="form-control u-form__input" type="text" name="name" required
                         placeholder="e.g. Jack Wayley"
                         aria-label="Jack Wayley"
                         data-msg="Please enter your name."
                         data-error-class="u-has-error"
                         data-success-class="u-has-success" v-model='name'>
                </div>
                <p v-if="judge && !name" style="color:red">Please fill in.</p>
              </div>
            </div>
            <!-- End Input -->

            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="h6 small d-block text-uppercase">
                  Your email address
                  <span class="text-danger">*</span>
                </label>

                <div class="js-focus-state input-group u-form">
                  <input class="form-control u-form__input" type="email" name="email" required
                         placeholder="e.g. jackwayley@gmail.com"
                         aria-label="jackwayley@gmail.com"
                         data-msg="Please enter a valid email address."
                         data-error-class="u-has-error"
                         data-success-class="u-has-success" v-model='email'>
                </div>
                <p v-if="judge && !email" style="color:red">Please fill in.</p>
              </div>
            </div>
            <!-- End Input -->

            <div class="w-100"></div>

            <!-- Input -->
            <div class="col-sm-6 mb-6">

    <label class="h6 small d-block text-uppercase">
      country of residence
      <span class="text-danger">*</span>
    </label>
    
<select class="custom-select" aria-invalid="false" v-model='country'>
                            <option selected>Select country</option>
                            <option value="AF">Afghanistan</option>
                            <option value="AX">Åland Islands</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AS">American Samoa</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="AR">Argentina</option>
                            <option value="AM">Armenia</option>
                            <option value="AW">Aruba</option>
                            <option value="AU">Australia</option>
                            <option value="AT">Austria</option>
                            <option value="AZ">Azerbaijan</option>
                            <option value="BS">Bahamas</option>
                            <option value="BH">Bahrain</option>
                            <option value="BD">Bangladesh</option>
                            <option value="BB">Barbados</option>
                            <option value="BY">Belarus</option>
                            <option value="BE">Belgium</option>
                            <option value="BZ">Belize</option>
                            <option value="BJ">Benin</option>
                            <option value="BM">Bermuda</option>
                            <option value="BT">Bhutan</option>
                            <option value="BO">Bolivia, Plurinational State of</option>
                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                            <option value="BA">Bosnia and Herzegovina</option>
                            <option value="BW">Botswana</option>
                            <option value="BV">Bouvet Island</option>
                            <option value="BR">Brazil</option>
                            <option value="IO">British Indian Ocean Territory</option>
                            <option value="BN">Brunei Darussalam</option>
                            <option value="BG">Bulgaria</option>
                            <option value="BF">Burkina Faso</option>
                            <option value="BI">Burundi</option>
                            <option value="KH">Cambodia</option>
                            <option value="CM">Cameroon</option>
                            <option value="CA">Canada</option>
                            <option value="CV">Cape Verde</option>
                            <option value="KY">Cayman Islands</option>
                            <option value="CF">Central African Republic</option>
                            <option value="TD">Chad</option>
                            <option value="CL">Chile</option>
                            <option value="CN">China</option>
                            <option value="CX">Christmas Island</option>
                            <option value="CC">Cocos (Keeling) Islands</option>
                            <option value="CO">Colombia</option>
                            <option value="KM">Comoros</option>
                            <option value="CG">Congo</option>
                            <option value="CD">Congo, the Democratic Republic of the</option>
                            <option value="CK">Cook Islands</option>
                            <option value="CR">Costa Rica</option>
                            <option value="CI">Côte d'Ivoire</option>
                            <option value="HR">Croatia</option>
                            <option value="CU">Cuba</option>
                            <option value="CW">Curaçao</option>
                            <option value="CY">Cyprus</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="DK">Denmark</option>
                            <option value="DJ">Djibouti</option>
                            <option value="DM">Dominica</option>
                            <option value="DO">Dominican Republic</option>
                            <option value="EC">Ecuador</option>
                            <option value="EG">Egypt</option>
                            <option value="SV">El Salvador</option>
                            <option value="GQ">Equatorial Guinea</option>
                            <option value="ER">Eritrea</option>
                            <option value="EE">Estonia</option>
                            <option value="ET">Ethiopia</option>
                            <option value="FK">Falkland Islands (Malvinas)</option>
                            <option value="FO">Faroe Islands</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="GF">French Guiana</option>
                            <option value="PF">French Polynesia</option>
                            <option value="TF">French Southern Territories</option>
                            <option value="GA">Gabon</option>
                            <option value="GM">Gambia</option>
                            <option value="GE">Georgia</option>
                            <option value="DE">Germany</option>
                            <option value="GH">Ghana</option>
                            <option value="GI">Gibraltar</option>
                            <option value="GR">Greece</option>
                            <option value="GL">Greenland</option>
                            <option value="GD">Grenada</option>
                            <option value="GP">Guadeloupe</option>
                            <option value="GU">Guam</option>
                            <option value="GT">Guatemala</option>
                            <option value="GG">Guernsey</option>
                            <option value="GN">Guinea</option>
                            <option value="GW">Guinea-Bissau</option>
                            <option value="GY">Guyana</option>
                            <option value="HT">Haiti</option>
                            <option value="HM">Heard Island and McDonald Islands</option>
                            <option value="VA">Holy See (Vatican City State)</option>
                            <option value="HN">Honduras</option>
                            <option value="HK">Hong Kong</option>
                            <option value="HU">Hungary</option>
                            <option value="IS">Iceland</option>
                            <option value="IN">India</option>
                            <option value="ID">Indonesia</option>
                            <option value="IR">Iran, Islamic Republic of</option>
                            <option value="IQ">Iraq</option>
                            <option value="IE">Ireland</option>
                            <option value="IM">Isle of Man</option>
                            <option value="IL">Israel</option>
                            <option value="IT">Italy</option>
                            <option value="JM">Jamaica</option>
                            <option value="JP">Japan</option>
                            <option value="JE">Jersey</option>
                            <option value="JO">Jordan</option>
                            <option value="KZ">Kazakhstan</option>
                            <option value="KE">Kenya</option>
                            <option value="KI">Kiribati</option>
                            <option value="KP">Korea, Democratic People's Republic of</option>
                            <option value="KR">Korea, Republic of</option>
                            <option value="KW">Kuwait</option>
                            <option value="KG">Kyrgyzstan</option>
                            <option value="LA">Lao People's Democratic Republic</option>
                            <option value="LV">Latvia</option>
                            <option value="LB">Lebanon</option>
                            <option value="LS">Lesotho</option>
                            <option value="LR">Liberia</option>
                            <option value="LY">Libya</option>
                            <option value="LI">Liechtenstein</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="MO">Macao</option>
                            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                            <option value="MG">Madagascar</option>
                            <option value="MW">Malawi</option>
                            <option value="MY">Malaysia</option>
                            <option value="MV">Maldives</option>
                            <option value="ML">Mali</option>
                            <option value="MT">Malta</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="MQ">Martinique</option>
                            <option value="MR">Mauritania</option>
                            <option value="MU">Mauritius</option>
                            <option value="YT">Mayotte</option>
                            <option value="MX">Mexico</option>
                            <option value="FM">Micronesia, Federated States of</option>
                            <option value="MD">Moldova, Republic of</option>
                            <option value="MC">Monaco</option>
                            <option value="MN">Mongolia</option>
                            <option value="ME">Montenegro</option>
                            <option value="MS">Montserrat</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                            <option value="MM">Myanmar</option>
                            <option value="NA">Namibia</option>
                            <option value="NR">Nauru</option>
                            <option value="NP">Nepal</option>
                            <option value="NL">Netherlands</option>
                            <option value="NC">New Caledonia</option>
                            <option value="NZ">New Zealand</option>
                            <option value="NI">Nicaragua</option>
                            <option value="NE">Niger</option>
                            <option value="NG">Nigeria</option>
                            <option value="NU">Niue</option>
                            <option value="NF">Norfolk Island</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="NO">Norway</option>
                            <option value="OM">Oman</option>
                            <option value="PK">Pakistan</option>
                            <option value="PW">Palau</option>
                            <option value="PS">Palestinian Territory, Occupied</option>
                            <option value="PA">Panama</option>
                            <option value="PG">Papua New Guinea</option>
                            <option value="PY">Paraguay</option>
                            <option value="PE">Peru</option>
                            <option value="PH">Philippines</option>
                            <option value="PN">Pitcairn</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="QA">Qatar</option>
                            <option value="RE">Réunion</option>
                            <option value="RO">Romania</option>
                            <option value="RU">Russian Federation</option>
                            <option value="RW">Rwanda</option>
                            <option value="BL">Saint Barthélemy</option>
                            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                            <option value="KN">Saint Kitts and Nevis</option>
                            <option value="LC">Saint Lucia</option>
                            <option value="MF">Saint Martin (French part)</option>
                            <option value="PM">Saint Pierre and Miquelon</option>
                            <option value="VC">Saint Vincent and the Grenadines</option>
                            <option value="WS">Samoa</option>
                            <option value="SM">San Marino</option>
                            <option value="ST">Sao Tome and Principe</option>
                            <option value="SA">Saudi Arabia</option>
                            <option value="SN">Senegal</option>
                            <option value="RS">Serbia</option>
                            <option value="SC">Seychelles</option>
                            <option value="SL">Sierra Leone</option>
                            <option value="SG">Singapore</option>
                            <option value="SX">Sint Maarten (Dutch part)</option>
                            <option value="SK">Slovakia</option>
                            <option value="SI">Slovenia</option>
                            <option value="SB">Solomon Islands</option>
                            <option value="SO">Somalia</option>
                            <option value="ZA">South Africa</option>
                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                            <option value="SS">South Sudan</option>
                            <option value="ES">Spain</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="SD">Sudan</option>
                            <option value="SR">Suriname</option>
                            <option value="SJ">Svalbard and Jan Mayen</option>
                            <option value="SZ">Swaziland</option>
                            <option value="SE">Sweden</option>
                            <option value="CH">Switzerland</option>
                            <option value="SY">Syrian Arab Republic</option>
                            <option value="TW">Taiwan, Province of China</option>
                            <option value="TJ">Tajikistan</option>
                            <option value="TZ">Tanzania, United Republic of</option>
                            <option value="TH">Thailand</option>
                            <option value="TL">Timor-Leste</option>
                            <option value="TG">Togo</option>
                            <option value="TK">Tokelau</option>
                            <option value="TO">Tonga</option>
                            <option value="TT">Trinidad and Tobago</option>
                            <option value="TN">Tunisia</option>
                            <option value="TR">Turkey</option>
                            <option value="TM">Turkmenistan</option>
                            <option value="TC">Turks and Caicos Islands</option>
                            <option value="TV">Tuvalu</option>
                            <option value="UG">Uganda</option>
                            <option value="UA">Ukraine</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="UM">United States Minor Outlying Islands</option>
                            <option value="UY">Uruguay</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="VU">Vanuatu</option>
                            <option value="VE">Venezuela, Bolivarian Republic of</option>
                            <option value="VN">Viet Nam</option>
                            <option value="VG">Virgin Islands, British</option>
                            <option value="VI">Virgin Islands, U.S.</option>
                            <option value="WF">Wallis and Futuna</option>
                            <option value="EH">Western Sahara</option>
                            <option value="YE">Yemen</option>
                            <option value="ZM">Zambia</option>
                            <option value="ZW">Zimbabwe</option>
                          </select>

            
            </div>
            <p v-if="judge && !country" style="color:red">Please fill in.</p>
            <!-- End Input -->

            <!-- Input -->
            <div class="col-sm-6 mb-6">
              <div class="js-form-message">
                <label class="h6 small d-block text-uppercase">
                  Your Phone Number
                  <span class="text-danger">*</span>
                </label>

                <div class="js-focus-state input-group u-form">
                  <input class="form-control u-form__input" type="number" name="phone" required
                         placeholder="e.g. 1-800-643-4500"
                         aria-label="1-800-643-4500"
                         data-msg="Please enter a valid phone number."
                         data-error-class="u-has-error"
                         data-success-class="u-has-success" v-model='phone'>
                </div>
                <p v-if="judge && !phone" style="color:red">Please fill in.</p>
              </div>
            </div>
            <!-- End Input -->
          </div>



          <div class="text-center">
            <button @click="handleBtn()" class="btn btn-primary u-btn-primary u-btn-wide transition-3d-hover mb-4">Submit</button>
            <p class="small">We'll get back to you when 55 Visa Debit Card is ready for sale.</p>
          </div>
        </div>
        <!-- End Contacts Form -->
      </div>
    </div>
    <!-- End Contact Form Section -->


  </main>
  <!-- ========== END MAIN ========== -->
<div>
<div v-if="isSubmit" class="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open" style="animation-duration: 300ms; animation-delay: 150ms;">
    <div id="animationModal" class="u-modal-window p-7" style="width: 500px;display: block;height: 160px;background-color: #eee;">
              <button class="btn btn-xs u-btn--icon u-btn-text-secondary u-modal-window__close" type="button" onclick="Custombox.modal.close();">
                <span class="fas fa-times"></span>
              </button>

              <div style="text-align:center" class="mb-7">
                <p style="margin-top: 42px;font-size: 18px;">{{modalInfo}}</p>
              </div>

              <button type="button" style="margin-left: 230px;margin-top: 18px;" class="btn btn-primary" role="button" @click="isSubmit = false">OK</button>
            </div>
            </div>
</div>
            </div>
</template>
<script>
import {postApplyCardInfo} from '../../api/post'
export default {
    data(){
        return {
            name:'',
            email:'',
            country:'Select country',
            phone:'',
            isSubmit:false,
            modalInfo:'',
            judge:false
        }
    },
    methods:{
        handleBtn(){
          this.judge = true
          if( this.name && this.email && this.country && this.phone ){
            this.captchaIns && this.captchaIns.popUp()
          }
        },
        initRobot(){
                let _that = this;
                let captchaIns;
                if (captchaIns) {
                    captchaIns.destroy()
                }
                let lan = this.$store.state.app.countryLanguage;
                if(lan==='zh-CN'){
                        lan = 'zh-CN'
                }else{
                    lan = 'en'
                }
                initNECaptcha({
                    element: '#captcha',
                    captchaId: 'a3cd39c172284133a3470b7ec05a2bb0',
                    mode: 'popup',
                    width: '320px',
                    lang:lan,
                    onReady: function (instance) {
                        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                        //console.log('instance',instance)
                    },
                     onClose: function () {
                        // 弹出关闭结束后将会触发该函数
                        // console.log('close')
                        // _that.loaded = true;
                    },
                    onVerify: function (err, data) {
                        if(err){
                            //console.log('err',err)
                        }
                        if(data){
                            //console.log('validate',data.validate)
                            _that.verify(data.validate)
                            _that.initRobot()
                        }
                    }
                }, function (instance) {
                    // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
                    _that.captchaIns = instance;
                }, function onerror(err) {
                    _that.captchaIns = ''
                    //验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                })//初始化函数结尾
                
                return captchaIns;
            },
            verify(validate){
                postApplyCardInfo(validate,{
                    business:"APPLY_CARD",
                    name:this.name,
                    email:this.email,
                    country:this.country,
                    phone:this.phone
                }).then(data => {
                    this.isSubmit = true
                    this.modalInfo = 'Your message is well received!'
                }).catch(err => {
                    this.isSubmit = true
                    this.modalInfo = 'We can not send through your message for some reason, please re-check and send again.'
                })
            },
    },
    mounted(){
        this.initRobot();
    }
};
</script>