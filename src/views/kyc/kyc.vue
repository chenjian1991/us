<template>
   <main class="identity-wrapper height" id="kyc">
      <div class="d-flex align-items-center position-relative height">
         <header id="header" class="u-header u-header--bg-transparent u-header--abs-top" v-if="showHeader">
            <div class="u-header__section">
               <div id="logoAndNav" class="container-fluid">
                  <!-- Nav -->
                  <nav class="navbar navbar-expand u-header__navbar pt-2">
                     <!--<a class="d-none d-lg-flex navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-text-white"-->
                     <!--href="../home" aria-label="Front">-->
                     <!--<img class="d-none d-lg-inline-block" src="../../assets/images/kyc/logo-white-footer.svg"-->
                     <!--alt="Logo" style="width: 50px;">-->
                     <!--</a>-->
                     <a class="d-flex d-lg-none navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-collapsed"
                        href="../home" aria-label="Front">
                        <!--<img class="d-inline-block d-lg-none" src="../../assets/images/kyc/logo1@x2.56dbba9c.png"-->
                        <!--alt="Logo" style="width: 140px;">-->
                        <img class="d-inline-block d-lg-none" src="../../assets/images/kyc/kych5.png"
                             alt="Logo" style="width: 140px;">
                     </a>
                     <div class="ml-auto">
                        <a class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                           @click="goback" style="color: #fff">{{$t('newK2back')}}</a>
                     </div>
                  </nav>
               </div>
            </div>
         </header>
         <div class="col-lg-5 col-xl-4 d-none d-lg-flex align-items-center px-0 left-bgc height">
            <div class="w-100">
               <div class="w-md-80 w-lg-60 text-left mx-auto">
                  <div class="text-center mb-7">
                     <img src="../../assets/images/kyc/kyc.png">
                  </div>
                  <blockquote class="h6 text-white font-weight-normal mb-4">
                     {{$t('newK1lefttext1')}}
                  </blockquote>
                  <blockquote class="h6 text-white font-weight-normal mb-4">
                     {{$t('newK1lefttext2')}}
                  </blockquote>
               </div>
               <div class=" text-center p-5">
                  <h4 class="h6 u-text-light mb-3 text-white">{{$t('newK1partner')}}</h4>
                  <div class="d-flex justify-content-center">
                     <div class="mx-4">
                        <img class="u-clients" src="../../assets/images/kyc/idm.png" alt="Image Description">
                     </div>
                  </div>
                  <img src="../../assets/images/kyc/kyc1.png" class="mt-7">

               </div>
            </div>
         </div>
         <div class="container kyc-overflow">
            <div class="row no-gutters flex-center">
               <div class="col-md-8 col-lg-10 col-xl-8 p-2 pb-6 pt-7" style="margin-left: auto;margin-right: auto">
                  <h4 class="mt-2 mb-3">{{$t('newK1title')}}</h4>
                  <h6 class="red-color mb-2 mt-3">*&nbsp;{{$t('newK1upgrade')}}</h6>
                  <h6 class="red-color mb-4">{{$t('newK1notice')}}</h6>
                  <div class="btn-group btn-group-toggle card-group d-block d-md-flex">
                     <a class="btn btn-outline-secondary u-btn-wide--xm col-lg-3 step-color"
                        v-for="(item,i) in stepList" :key="i"
                        :class="currentStep===i+1?'active':''" :disabled="true">{{$t(item)}}</a>
                  </div>
                  <!-- 第一步 -->
                  <div v-show="showStep1" class="firstStep">
                     <input type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
                     <div id="captcha"></div>
                     <form class="mt-5 mb-5" v-model="stepOneForm" ref="stepOneForm">
                        <section v-if='banddingEmailFlag' class="bandingEmail">
                           <!-- 绑定邮箱 -->
                           <label class="h6 d-block font-size-14 mb-3"
                                  for="exampleInputEmail1">{{$t('newK1mail')}}</label>
                           <div style="position:relative;" class="input-group mb-4">
                              <input @blur.prevent='exgCheckt()' @input="EnterEmail" required=""
                                     v-model.trim='stepOneForm.emailAddress'
                                     type="email" class="form-control" id="exampleInputEmail1"
                                     aria-describedby="emailHelp"/>
                              <div class="input-group-append">
                                 <sendBtn robotDiv='robotDiv' :fatherClass='fatherClass' @sendCick='sendSMSfun' :empty='empty'
                                          :ssoEmail='ssoEmail'></sendBtn>
                              </div>
                              <span style="color:#ed4014;position:absolute;top:40px;" v-if="emailFlag">{{$t('newK1mailpopf')}}</span>

                           </div>
                           <section v-if='banddingGoogleFlag' class="bandingEmail">
                              <label class="h6 d-block  font-size-14 mb-3"
                                     for="disabledTextInput">{{$t('googleVerify')}}</label>
                              <div class="input-group mb-4">
                                 <input :maxlength="6" @input='EnterGoogleCodeEmail'
                                        v-model.trim='stepOneForm.googleCode' type="text"
                                        class="form-control" aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>
                              </div>
                           </section>
                           <section>
                              <label class="h6 d-block  font-size-14 mb-3"
                                     for="disabledTextInput">{{$t('emialCodePlaceholder')}}</label>
                              <div class="input-group mb-4">
                                 <input :maxlength="6" @input='EnterEmailCode' v-model.trim='stepOneForm.emailCode'
                                        type="text"
                                        class="form-control" aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>
                                 <div class="input-group-append">
                                    <button @click='bandEmialFunc' :disabled='btnFlagEmail'
                                            class="btn selfDefineBtn"
                                            type="button">{{$t('newK1buttonBind')}}
                                    </button>
                                 </div>
                              </div>
                           </section>

                           <!-- 绑定邮箱结束 -->
                        </section>
                        <section v-else class="bandingEmail">
                           <div class="form-group">
                              <label class="h6 d-block text-uppercase"
                                     for="disabledTextInput">{{$t('newK1mailBD')}}</label>
                              <input disabled v-model="bandEmail" type="text" id="disabledTextInput"
                                     class="form-control"
                                     :placeholder="userInfoObj.profileEmail"/>
                           </div>
                        </section>
                        <section v-if="banddingPhoneFlag" class="bandingPhone">
                           <!-- 绑定手机号 -->
                           <label class="h6 d-block  font-size-14 mb-3"
                                  for="disabledTextInput">{{$t('newK1phone')}}</label>
                           <div class="input-group mb-4">
                              <div class="input-group-prepend">
                                 <button type="button" class="btn btn-outline-secondary">+{{countryNumber}}
                                 </button>
                                 <button type="button"
                                         class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 </button>
                                 <div class="dropdown-menu overflow-height">
                                    <a @click="chooseCountry(item.code)" v-for="item in ossJSON" class="dropdown-item"
                                       href="#">
                                       <img class="flag" :src="item.image"></img>
                                       <span style="color:#000;margin-left:10px;" v-html="item.en"></span>
                                       <span class="pull-right" v-html="item.code"></span>
                                    </a>
                                 </div>
                              </div>
                              <input @blur.prevent='exgChecktphone()' :maxlength="12" @input='EnterPhone'
                                     v-model='stepOneForm.phoneNumber' type="text"
                                     class="form-control"
                                     aria-label="Text input with segmented dropdown button"/>
                              <div class="input-group-append">
                                 <sendBtn robotDiv='robotsecondDiv' :fatherClass='fatherClass' @sendCick='sendSMSfun' :empty='empty'
                                             :ssoPhone='ssoPhone'></sendBtn>
                              </div>
                              <span v-if="phoneFlag" style="color:#ed4014;position:absolute;top:40px;">{{$t('newK1phonepopf')}}</span>
                           </div>
                           <!-- 绑定谷歌 -->
                           <section v-if='banddingGoogleFlag' class="bandingEmail">
                              <label class="h6 d-block  font-size-14 mb-3"
                                     for="disabledTextInput">{{$t('googleVerify')}}</label>
                              <div class="input-group mb-4">
                                 <input :maxlength="6" @input='EnterGoogleCode' v-model.trim='stepOneForm.googleCode'
                                        type="text"
                                        class="form-control" aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>
                              </div>
                           </section>
                           <section>
                              <label class="h6 d-block  font-size-14 mb-3"
                                     for="disabledTextInput">{{$t('SMSPlacehodler')}}</label>
                              <div class="input-group mb-4">
                                 <input :maxlength="6" @input='EntersmsCode' v-model='stepOneForm.smsCode' type="text"
                                        class="form-control" aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"/>
                                 <div class="input-group-append">
                                    <button :disabled='btnFlagPhone' @click="bandingFunc"
                                            class="btn selfDefineBtn"
                                            type="button">{{$t('newK1buttonBind')}}
                                    </button>
                                 </div>
                              </div>
                           </section>

                           <!-- 绑定手机号结束 -->
                        </section>
                        <section v-else class="bandingPhone">
                           <!-- 绑定手机 -->
                           <div class="form-group">
                              <label class="h6 d-block text-uppercase"
                                     for="disabledTextInput">{{$t('newK1phoneBD')}}</label>
                              <input disabled v-model="bandPhone" type="text" id="disabledTextInput"
                                     class="form-control"
                                     :placeholder="userInfoObj.profilePhone"/>
                           </div>
                           <!-- 绑定手机结束 -->
                        </section>
                     </form>
                     <!-- Button -->
                     <div class="row align-items-center mb-5">
                        <div class="col-6">
                        </div>
                        <div class="col-6 text-right">
                           <button :disabled='disabledFlag' type="submit"
                                   class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                   @click="nextStep1('stepOneForm')">{{$t('newK1buttonN')}}
                           </button>
                        </div>
                     </div>
                     <!-- End Button -->

                  </div>
                  <!--第二步-->
                  <div v-show="showStep2">
                     <form class="mt-5 mb-5" v-model="stepTwoForm" ref="stepTwoForm">
                        <!-- Input -->
                        <div class="mb-4">
                           <label class="h6 font-size-14 mb-3">{{$t('newK1idC')}}</label>
                           <Select @on-change='changeCountry' v-model="stepTwoForm.country" size="large" disabled>
                              <Option v-for="item in country" :value="item.locale"
                                      :label="language==='zh-CN'?item.zh:item.en">
                                 <img class="flag" :src="item.image"/>
                                 <span
                                    style="color:#5a626d;font-size:14px;margin-left:10px;">{{language==='zh-CN'?item.zh:item.en}}</span>
                              </Option>
                           </Select>
                        </div>
                        <div class="mb-4">
                           <label class="h6 font-size-14 mb-3">{{$t('newK1idT')}}</label>
                           <Select @on-change='changeIdType' v-model="stepTwoForm.idType" size="large">
                              <Option v-for="item in idType" :value="item.value" :label="$t(item.label)">
                                 {{$t(item.label)}}
                              </Option>
                           </Select>
                        </div>
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1idNo')}}</label>
                           <div class="js-focus-state in put-group u-form">
                              <input type="text" class="form-control form-control-sm" maxlength="20"
                                     v-model="stepTwoForm.idNumber">
                           </div>
                        </div>
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1idEPD')}}</label>
                           <DatePicker type="date" size="large" style="width: 100%" format="MM-dd-yyyy"
                                       :options="optionsExpireDate"
                                       v-model="stepTwoForm.expireDate"></DatePicker>
                        </div>
                        <!-- 图片上传部分 -->
                        <div class="upload-img-container clearfix">
                           <!-- 正面 -->
                           <div class="item">
                              <p>{{$t('newK1idF')}}</p>
                              <div class="identityCard-one">
                                 <img v-if='idCard' src="../../assets/images/identify/front.png" alt="">
                                 <img v-else src="../../assets/images/identify/passport_front.png" alt="">
                                 <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png"
                                      alt="">
                                 <div class="upload-img-contain" style="visibility:visible;">
                                    <div v-if="item.status === 'finished' && urlPath" class="demo-upload-list"
                                         v-for="item in uploadList">
                                       <template>
                                          <img v-if="urlPath" :src="urlPath">
                                          <div class="demo-upload-list-cover">
                                             <Icon style="font-size:30px;" type="ios-trash-outline"
                                                   @click.native="handleRemove(item)"></Icon>
                                          </div>
                                       </template>
                                    </div>
                                    <div v-else>
                                       <template>
                                          <Progress width='100%' v-if="item.showProgress"
                                                    :percent="item.percentage | initNumber"></Progress>
                                       </template>
                                    </div>
                                    <Upload
                                       ref="upload"
                                       :show-upload-list="false"
                                       :on-success="handleSuccess"
                                       :on-error="handleError"
                                       :before-upload='beforeUploadFront'
                                       :format="['jpg','jpeg','png']"
                                       :max-size="6144"
                                       :on-format-error="handleFormatError"
                                       :on-exceeded-size="handleMaxSize"
                                       multiple
                                       :data='uploadParams'
                                       :headers="headerObj"
                                       :action="uploadUrl"
                                       style="display: inline-block;width: 304px;height:200px;z-index:150">
                                       <div style="width: 304px;height:200px;line-height:200px;text-align:center;">
                                          <span>上传</span>
                                       </div>
                                    </Upload>
                                 </div>
                              </div>
                              <ul>
                                 <li>{{$t('newK1idFtip')}}</li>
                              </ul>
                           </div>
                           <div class="item">
                              <!-- 反面 -->
                              <p>{{$t('newK1idB')}}</p>
                              <div class="identityCard-two">
                                 <img v-if='idCard' src="../../assets/images/identify/back.png" alt="">
                                 <img v-else src="../../assets/images/identify/passport_back.png" alt="">
                                 <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png"
                                      alt="">
                                 <div class="upload-img-contain" style="visibility:visible;">
                                    <div v-if="item.status === 'finished' && urlPathTWO " class="demo-upload-list"
                                         v-for="item in uploadListTWO">
                                       <template>
                                          <img v-if="urlPathTWO" :src="urlPathTWO">
                                          <div class="demo-upload-list-cover">
                                             <Icon style="font-size:30px;" type="ios-trash-outline"
                                                   @click.native="handleRemoveTwo(item)"></Icon>
                                          </div>
                                       </template>

                                    </div>
                                    <div v-else>
                                       <template>
                                          <Progress v-if="item.showProgress"
                                                    :percent="item.percentage | initNumber"></Progress>
                                       </template>
                                    </div>
                                    <Upload
                                       ref="uploadTwo"
                                       :show-upload-list="false"
                                       :on-success="handleSuccessTWO"
                                       :before-upload='beforeUploadBack'
                                       :format="['jpg','jpeg','png']"
                                       :max-size="6144"
                                       :on-error="handleError"
                                       :on-format-error="handleFormatErrorTWO"
                                       :on-exceeded-size="handleMaxSizeTWO"
                                       multiple
                                       :data='uploadBack'
                                       :headers="headerObj"
                                       :action="uploadUrl"
                                       style="display: inline-block;width: 304px;height:200px;z-index:150">
                                       <div style="width: 304px;height:200px;line-height: 200px;text-align:center;">
                                          <span>上传</span>
                                       </div>
                                    </Upload>
                                 </div>
                              </div>
                              <ul>
                                 <li>{{$t('newK1idBtip')}}</li>
                              </ul>
                           </div>
                           <div class="item">
                              <!-- 手持 -->
                              <p>{{$t('newK1idself')}}</p>
                              <div class="identityCard-three">
                                 <img src="../../assets/images/identify/self.png" alt="">
                                 <img class="identity-hover-img" src="../../assets/images/identify/hoverPictutre.png"
                                      alt="">
                                 <div class="upload-img-contain" style="visibility:show;">
                                    <div v-if="item.status === 'finished'&& urlPathTHREE" class="demo-upload-list"
                                         v-for="item in uploadListThree">
                                       <template>
                                          <img v-if="urlPathTHREE" :src="urlPathTHREE">
                                          <div class="demo-upload-list-cover">
                                             <Icon style="font-size:30px;" type="ios-trash-outline"
                                                   @click.native="handleRemoveThree(item)"></Icon>
                                          </div>
                                       </template>
                                    </div>
                                    <div v-else>
                                       <template>
                                          <Progress v-if="item.showProgress"
                                                    :percent="item.percentage | initNumber"></Progress>
                                       </template>
                                    </div>
                                    <Upload
                                       ref="uploadThird"
                                       :show-upload-list="false"
                                       :on-success="handleSuccessTHREE"
                                       :before-upload='beforeUploadSelf'
                                       :format="['jpg','jpeg','png']"
                                       :max-size="6144"
                                       :on-error="handleError"
                                       :on-format-error="handleFormatErrorTHREE"
                                       :on-exceeded-size="handleMaxSizeTHREE"
                                       multiple
                                       :headers="headerObj"
                                       :action="uploadUrlPic"
                                       style="display: inline-block;width: 304px;height:200px;z-index:150">
                                       <div style="width: 304px;height:200px;line-height: 200px;text-align:center;">
                                          <span>上传</span>
                                       </div>
                                    </Upload>
                                 </div>
                              </div>
                              <ul>
                                 <li>{{$t('newK1idselftip')}}</li>
                              </ul>
                              <ul class="pic-tips">
                                 <li>{{$t('newK1DocTip1')}}</li>
                                 <li>{{$t('newK1DocTip2')}}</li>
                                 <li>{{$t('newK1DocTip3')}}</li>
                                 <li>{{$t('newK1DocTip4')}}</li>
                                 <li>{{$t('newK1DocTip5')}}</li>

                              </ul>
                           </div>
                        </div>
                        <!-- 图片上传结束 -->

                     </form>
                     <!-- Button -->
                     <div class="row align-items-center mb-5">
                        <div class="col-6">
                           <button type="submit"
                                   class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                   @click="previous">
                              {{$t('newK1buttonP')}}
                           </button>
                        </div>

                        <div class="col-6 text-right">
                           <button type="submit"
                                   class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                   @click="nextStep2('stepTwoForm')">{{$t('newK1buttonN')}}
                           </button>
                        </div>
                     </div>
                     <!-- End Button -->
                  </div>
                  <!--第三步-->
                  <div v-show="showStep3">
                     <!--中国-->
                     <div v-show="showCN">
                        <form class="mt-5 mb-5" v-model="stepThreeForm" ref="stepThreeForm">
                           <!-- Input -->
                           <div class="form-row mb-3">
                              <div class="form-group col-md-6">
                                 <label class="h6 d-block font-size-14 mb-3">{{$t('newK1name3')}}</label>
                                 <input type="text" class="form-control form-control-sm" maxlength="20"
                                        v-model="stepThreeForm.lastName">
                              </div>
                              <div class="form-group col-md-6">
                                 <label class="h6 d-block font-size-14 mb-3">{{$t('newK1name1')}}</label>
                                 <input type="text" class="form-control form-control-sm" maxlength="20"
                                        v-model="stepThreeForm.firstName">
                              </div>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1gen')}}</label>
                              <Select v-model="stepThreeForm.gender" size="large">
                                 <Option value="男">{{$t('newK1Male')}}</Option>
                                 <Option value="女">{{$t('newK1Female')}}</Option>
                              </Select>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1birth')}}</label>
                              <DatePicker type="date" size="large" style="width: 100%" format="MM-dd-yyyy"
                                          :options="optionsBirthday"
                                          v-model="stepThreeForm.birthday"></DatePicker>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddSt')}}</label>
                              <input type="text" class="form-control form-control-sm" maxlength="225"
                                     v-model="stepThreeForm.street">
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddCity')}}</label>
                              <input type="text" class="form-control form-control-sm" maxlength="20"
                                     v-model="stepThreeForm.city">
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1Addtype')}}</label>
                              <Select v-model="stepThreeForm.address" size="large">
                                 <Option value="home">{{$t('newK1Addtype1')}}</Option>
                                 <Option value="company">{{$t('newK1Addtype2')}}</Option>
                              </Select>
                           </div>
                           <!--同意框-->
                           <div class="mb-4">
                              <div class="custom-checkbox d-flex align-items-center text-muted">
                                 <input type="checkbox" class="custom-control-input" id="termsCheckbox" checked
                                        v-model="addressShow">
                                 <label class="custom-control-label" for="termsCheckbox">
                                    <small class="ml-4">{{$t('newK1AddAgree')}}</small>
                                 </label>
                              </div>
                           </div>
                           <!--上传地址证明-->
                           <div class="mb-4" v-show="!addressShow">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddPrf')}}</label>
                              <div class="position-relative">
                                 <input type="text" class="form-control form-control-sm" v-model="file.fileName">
                                 <button
                                    class="btn btn-sm btn-primary u-btn-primary btn-color position-absolute upload-btn">
                                    {{$t('newK1buttonUP')}}
                                 </button>
                                 <input type="file"
                                        class="form-control form-control-sm form-control-file position-absolute upload-file"
                                        @change="changeFile">
                              </div>

                              <div class="red-color mt-2">
                                 {{$t('newK1Addtip')}}<br/>
                                 {{$t('newK1Addsize')}}
                              </div>
                           </div>
                        </form>
                        <!-- Button -->
                        <div class="row align-items-center mb-5">
                           <div class="col-6">
                              <button type="submit"
                                      class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                      @click="previous">
                                 {{$t('newK1buttonP')}}
                              </button>
                           </div>

                           <div class="col-6 text-right">
                              <button type="submit"
                                      class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                      @click="nextStep3('stepThreeForm')">{{$t('newK1buttonN')}}
                              </button>
                           </div>
                        </div>
                        <!-- End Button -->
                     </div>
                     <!--非中国-->
                     <div v-show="!showCN">
                        <form class="mt-5" v-model="stepThreeForm" ref="stepThreeForm">
                           <!-- Input -->
                           <div class="form-row mb-3">
                              <div class="form-group col-md-4">
                                 <label class="h6 d-block font-size-14 mb-3">{{$t('newK1name1')}}<span
                                    class="red-color"> *</span></label>
                                 <input type="text" class="form-control form-control-sm" maxlength="20"
                                        v-model="stepThreeForm.firstName">
                              </div>
                              <div class="form-group col-md-4">
                                 <label class="h6 d-block font-size-14 mb-3">{{$t('newK1name2')}}</label>
                                 <input type="text" class="form-control form-control-sm" maxlength="20"
                                        v-model="stepThreeForm.middleName">
                              </div>
                              <div class="form-group col-md-4">
                                 <label class="h6 d-block font-size-14 mb-3">{{$t('newK1name3')}}<span
                                    class="red-color"> *</span></label>
                                 <input type="text" class="form-control form-control-sm" maxlength="20"
                                        v-model="stepThreeForm.lastName">
                              </div>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1gen')}}<span
                                 class="red-color"> *</span></label>
                              <Select v-model="stepThreeForm.gender" size="large">
                                 <Option value="男">{{$t('newK1Male')}}</Option>
                                 <Option value="女">{{$t('newK1Female')}}</Option>
                              </Select>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1birth')}}<span
                                 class="red-color"> *</span></label>
                              <DatePicker type="date" size="large" style="width: 100%" format="MM-dd-yyyy"
                                          :options="optionsBirthday"
                                          v-model="stepThreeForm.birthday"></DatePicker>
                           </div>
                           <div v-show="isUS" v-model="dataUS" class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1TIN')}}<span
                                 class="red-color"> *</span></label>
                              <input type="text" class="form-control form-control-sm" maxlength="9"
                                     v-model="dataUS.tin"
                                     @input="changeNumber('tin','9')">
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddSt')}}<span
                                 class="red-color"> *</span></label>
                              <input type="text" class="form-control form-control-sm" maxlength="225"
                                     v-model="stepThreeForm.street">
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddCity')}}<span
                                 class="red-color"> *</span></label>
                              <input type="text" class="form-control form-control-sm" maxlength="20"
                                     v-model="stepThreeForm.city">
                           </div>
                           <!--美国人税号、州、邮编-->
                           <div v-show="isUS" v-model="dataUS">
                              <div class="form-row mb-3">
                                 <div class="form-group col-md-6">
                                    <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddReg')}}<span
                                       class="red-color"> *</span></label>
                                    <Select v-model="dataUS.region" size="large">
                                       <Option v-for="item in state" :value="item.locale"
                                               :label="language==='zh-CN'?item.zh:item.en">
                                          <img class="flag" :src="item.image"/>
                                          <span style="color:#5a626d;font-size:14px;margin-left:10px;">{{language==='zh-CN'?item.zh:item.en}}</span>
                                       </Option>
                                    </Select>
                                 </div>
                                 <div class="form-group col-md-6">
                                    <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddZip')}}<span
                                       class="red-color"> *</span></label>
                                    <input type="text" class="form-control form-control-sm" maxlength="5"
                                           v-model="dataUS.zipCode"
                                           @input="changeNumber('zipCode','5')">
                                 </div>
                              </div>
                           </div>
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1Addtype')}}</label>
                              <Select v-model="stepThreeForm.address" size="large">
                                 <Option value="home">{{$t('newK1Addtype1')}}</Option>
                                 <Option value="company">{{$t('newK1Addtype2')}}</Option>
                              </Select>
                           </div>
                           <!--上传地址-->
                           <div class="mb-4">
                              <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddPrf')}}<span
                                 class="red-color">*</span></label>
                              <div class="position-relative">
                                 <input type="text" class="form-control form-control-sm" v-model="file.fileName">
                                 <button
                                    class="btn btn-sm btn-primary u-btn-primary btn-color position-absolute upload-btn">
                                    {{$t('newK1buttonUP')}}
                                 </button>
                                 <input type="file"
                                        class="form-control form-control-sm form-control-file position-absolute upload-file"
                                        @change="changeFile">
                              </div>
                              <div class="red-color mt-2">
                                 {{$t('newK1Addtip')}}<br/>
                                 {{$t('newK1Addsize')}}
                              </div>
                           </div>
                        </form>
                        <!-- Button -->
                        <div class="row align-items-center mb-5">
                           <div class="col-6">
                              <button type="submit"
                                      class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                      @click="previous">
                                 {{$t('newK1buttonP')}}
                              </button>
                           </div>
                           <div class="col-6 text-right">
                              <button type="submit"
                                      class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                      @click="nextStep3('stepThreeForm')">{{$t('newK1buttonN')}}
                              </button>
                           </div>
                        </div>
                        <!-- End Button -->
                     </div>
                  </div>
                  <div v-show="showStep4">
                     <form class="mt-5 mb-5" v-model="stepFourForm" ref="stepFourForm">
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq1')}}</label>
                           <Select v-model="stepFourForm.goal" size="large">
                              <Option v-for="item in goal" :value="item.value" :label="item.title">
                                 {{item.title}}
                              </Option>
                           </Select>
                        </div>
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq2')}}</label>
                           <Select v-model="stepFourForm.source" size="large">
                              <Option v-for="item in source" :value="item.value" :label="item.title">
                                 {{item.title}}
                              </Option>
                           </Select>
                        </div>
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq3')}}</label>
                           <Select v-model="stepFourForm.occupation" size="large">
                              <Option v-for="item in occupation" :value="item.value" :label="item.title">
                                 {{item.title}}
                              </Option>
                           </Select>
                        </div>
                        <div class="mb-4">
                           <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq4')}}</label>
                           <input type="text" class="form-control form-control-sm" maxlength="30"
                                  v-model="stepFourForm.Employer">
                        </div>
                     </form>
                     <!-- Button -->
                     <div class="row align-items-center mb-5">
                        <div class="col-6">
                           <button type="submit"
                                   class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                   @click="previous">
                              {{$t('newK1buttonP')}}
                           </button>
                        </div>
                        <div class="col-6 text-right">
                           <button type="submit"
                                   class="btn btn-sm btn-primary u-btn-primary transition-3d-hover btn-color"
                                   @click="nextStep4('stepFourForm')">{{$t('newK1buttonSub')}}
                           </button>
                        </div>
                     </div>
                     <!-- End Button -->
                  </div>
                  <Modaltips :modal='showModal' :text="text"></Modaltips>
               </div>
            </div>
         </div>

      </div>
   </main>
</template>

<script>
   import Cookies from 'js-cookie'
   import moment from 'moment'

   import {Exchange} from '@/interface/exchange.js'
   import {
      queryUserInfo, identifySubmit, identifyUpdate, identifyQuery, uploadImg,
   } from '_api/balances.js'
   import {
      ssoCodeVerify,
      binding,
      identifyPhoto,
      userInfo
   } from '../../../api/urls.js';
   import {
      getApi,
      postHeaderTokenBodyApi,
      postHeaderSeveralTokenBodyApi,
      getHeaderTokenApi
   } from '../../../api/axios.js';
   import sendBtn from '../../components/sendBtn'
   import sendBtnTwo from '../../components/sendBtnTwo'

   import Modaltips from '@/components/Modal';

   import {
      onlyInputNumAndPoint
   } from '@/lib/utils.js'
   import {state, country, goal, source, occupation} from './state_country.js'

   import {debuglog} from 'util';

   export default {
      name: "kyc",
      data() {
         return {
            //移动端
            showHeader: false,
            type: '',

            //pc
            showStep1: true,
            showStep2: false,
            showStep3: false,
            showStep4: false,
            showCN: false,
            isUS: false,
            addressShow: true,
            loginToken: '',

            country: country,
            ossJSON: [], //国家
            state: [],
            file: {
               fileName: '',
               filePath: '',
            },
            language: localStorage.getItem('countryLanguage'),

            currentStep: 1,
            stepList: ['newK1st1', 'newK1st2', 'newK1st3', 'newK1st4'],
            idType: [
               {label: 'newK1ID', value: 'idCard'},
               {label: 'newK1PP', value: 'passport'},
               {label: "newK1DL", value: 'license'}
            ],
            goal: goal,
            source: source,
            occupation: occupation,
            stepOneForm: {
               emailAddress: '',
               emailCode: '',
               smsCode: '',
               phoneNumber: '',
               googleCode: '',
            },
            stepTwoForm: {
               idNumber: '',
               expireDate: '',
               country: '',
               idType: '',
            },
            stepThreeForm: {
               firstName: '',
               middleName: '',
               lastName: '',
               birthday: '',
               street: '',
               city: '',
               gender: '',
               address: '',
            },
            stepFourForm: {
               goal: '',
               source: '',
               occupation: '',
               Employer: '',
            },
            dataUS: {
               tin: '',
               zipCode: '',
               region: '',
            },
            stepOneError: ['emailPlacehodler', 'newK1vcodepop', 'phonePlacehodlerphone', 'newK1vcodepop'],// 新添加
            stepTwoError: {idNumber: 'newK1idNopop', expireDate: 'newK1idEPDpop'},
            stepThreeError: {
               firstName: 'newK1name1pop',
               lastName: 'newK1name3pop',
               gender: 'newK1genfill',
               birthday: 'newK1birthpop',
               street: 'newK1AddStpop',
               city: 'newK1AddCitypop',
            },
            stepFourError: {
               Employer: 'newK1Employerpop'
            },
            dataUSError: {
               tin: 'newK1TINpop',
               zipCode: 'newK1AddZippop',
               region: 'newK1AddRegfill',
            },
            optionsExpireDate: {
               disabledDate(date) {
                  return date && date.valueOf() < new Date().getTime()
               }
            },
            optionsBirthday: {
               disabledDate(date) {
                  return date && date.valueOf() > new Date().getTime()
               }
            },
            step2Params: {},
            step3Params: {},
            formJson: {},

            //开始
            countryNumber: '',
            phoneNumber: '',
            showModal: false,
            text: '',
            empty: true,
            ssoPhone: {
               "operateType": "BIND_PHONE",
               "codeType": "PHONE",
               "itc": '',
               "phone": ''
            },
            ssoEmail: {
               "operateType": "BIND_EMAIL",
               "codeType": "EMAIL",
               "email": '',
               "language": localStorage.getItem('countryLanguage')
            },
            fatherClass: 'newBtn',
            smsCode: '',
            token: "",
            banddingPhoneFlag: true,
            banddingEmailFlag: true,
            emailCode: '',
            emailAddress: '',
            btnFlagEmail: true,
            btnFlagPhone: true,
            //图片上传部分
            idCard: true,// 新添加
            PASSPORT: false,// 新添加
            userInfoObj: {},
            uploadList: [],
            uploadListTWO: [],
            uploadListThree: [],
            urlPath: '',
            urlPathTWO: "",
            urlPathTHREE: "",
            progress: "",
            headerObj: {
               token: ''
            },
            uploadUrl: "",
            uploadUrlPic: '',
            fileUrl: "",
            uploadParams: {
               side: 'front',
               ocr: true,
            },
            uploadBack: {
               side: 'back',
               ocr: true,
            },
            userFrontMessage: {
               nameFront: '',
               genderFront: '',
               NationalityFront: '',
               birthdayFront: '',
               addressFront: '',
               idnumberFront: '',
               frontPathFront: '',//最新更改
            },
            userBackMessage: {
               expireTimeBack: '',
               dateIssuanceBack: '',
               organizationBack: '',
               backPathBack: ''//最新更改
            },
            userSelf: {
               selfPathSelf: '',//最新更改
            },
            bandPhone: '',
            bandEmail: '',
            disabledFlag: true,
            firstIdcard: '',
            countryName: '',
            uploadSelfFlag: false,//是否是百度识别的
            emailFlag: false,
            phoneFlag: false,
            banddingGoogleFlag: true,
            val: '',

         }
      },
      components: {
         sendBtn,
         sendBtnTwo,
         Modaltips
      },
      methods: {
         init() {
            identifyQuery(this.loginToken).then(res => {
               //有数据
               if (res.data) {
                  const formJson = JSON.parse(res.data['formJson'])
                  if (res.data.dataStatus === 1 || res.data.dataStatus === 4) {
                     this.formJson = formJson
                     this.stepTwoForm = {
                        idNumber: formJson.idNumber,
                        expireDate: formJson.expireDate,
                        country: formJson.country || country[0].locale,
                        idType: formJson.idType || this.idType[0].value,
                     }
                     this.stepThreeForm = {
                        firstName: formJson.firstName,
                        middleName: formJson['middleName'],
                        lastName: formJson.lastName,
                        gender: formJson.gender || '男',
                        birthday: formJson.birthday,
                        street: formJson.street,
                        city: formJson.city,
                        address: formJson.address || 'home',
                     }
                     this.stepFourForm = {
                        goal: formJson.goal || this.goal[0].value,
                        source: formJson.source || this.source[0].value,
                        occupation: formJson.occupation || this.occupation[0].value,
                        Employer: formJson.Employer || '',
                     }
                     if (formJson['fileName']) {
                        this.addressShow = false
                     }
                     this.file = {
                        fileName: formJson['fileName'],
                        filePath: formJson['filePath'],
                     }
                     if (this.isUS) {
                        this.dataUS = {
                           tin: formJson.tin,
                           zipCode: formJson.zipCode,
                           region: formJson.region || this.state[0].locale,
                        }
                     }
                     //回显示图片
                     this.userFrontMessage = {
                        nameFront: formJson.nameFront,
                        genderFront: formJson.genderFront,
                        NationalityFront: formJson.NationalityFront,
                        birthdayFront: formJson.birthdayFront,
                        addressFront: formJson.addressFront,
                        idnumberFront: formJson.idnumberFront,
                        frontPathFront: formJson.frontPathFront,//最新更改
                     }
                     this.userBackMessage = {
                        expireTimeBack: formJson.expireTimeBack,
                        backPathBack: formJson.backPathBack
                     }
                     this.userSelf = {
                        selfPathSelf: formJson.selfPathSelf,
                     }
                     //今天
                     let frontUrl = formJson.frontPathFront;
                     let backUrl = formJson.backPathBack;
                     let selfUrl = formJson.selfPathSelf;
                     this.uploadList = [{status: 'finished'}]
                     this.uploadListTWO = [{status: 'finished'}]
                     this.uploadListThree = [{status: 'finished'}]
                     this.imgFallBack(frontUrl, "front")
                     this.imgFallBack(backUrl, "back")
                     this.imgFallBack(selfUrl, "self")
                     if (res.data.dataStatus === 1 && this.showCN === true) {
                        this.dealData()
                     }
                  } else if (res.data.dataStatus === 2 || res.data.dataStatus === 3) {
                     // this.$router.push('/identityResult')
                  }
               }
            })
         },
         changeFile(e) {
            let file = e.target.files[0]
            let param = new FormData() // 创建form对象
            param.append('file', file)// 通过append向form对象添加数据
            uploadImg(this.loginToken, param).then(res => {
               this.file = {filePath: res.filePath, fileName: res.originalName}
            })
         },
         previous() {
            //   调接口 数据回填
            this.goStep('back')
         },
         nextStep1(name) {
            this.goStep()
         },
         nextStep2(name) {
            try {
               Object.keys(this[name]).map((v) => {
                  if (!this[name][v]) {
                     throw this.stepTwoError[v]
                  }
               })
               let idNumber = /^[A-Z0-9]{0,20}$/;
               if (!idNumber.test(this[name].idNumber)) {
                  throw 'newK1idNopopf'
               }
               this[name].expireDate = this.transitTimestamp(this[name].expireDate)
               let params = {}
               Object.assign(params, this[name]);
               //判断图片非空   最新更改
               if (this.urlPath && this.urlPathTWO && this.urlPathTHREE) {//全部填完
               } else {
                  throw 'newK1Imgrequired'
               }
               this.step2Params = {}

               Object.assign(this.step2Params, params, this.userFrontMessage, this.userBackMessage, this.userSelf);

               let stepParams = {}
               Object.assign(stepParams, this.formJson, this.step2Params);
               //   调接口
               identifyUpdate(this.loginToken, stepParams).then(res => {
                  if (res.result) {
                     this.goStep()
                     //能识别
                     if (this.uploadSelfFlag) {
                        this.dealData()
                     }
                  }
               })
            } catch (message) {
               //    弹窗
               this.$Message.warning(this.$t(message));
            }
         },
         nextStep3(name) {
            if (this.showCN === true) {
               this.submitCN(name)
            } else {
               this.submit(name)
            }
         },
         nextStep4(name) {
            try {
               if (!this[name]['Employer']) {
                  throw this.stepFourError['Employer']
               }
               let stepParams = {}
               Object.assign(stepParams, this[name], this.step3Params, {us: true});
               //   调接口
               identifySubmit(this.loginToken, stepParams).then(res => {
                  if (res.result) {
                     //   跳转到结果页
                     if (this.type === 'ios') {
                        window.webkit.messageHandlers.getDataFormVue.postMessage("success")
                     } else if (this.type === 'android') {
                        window.nativeObjectHelp.postMessage("success");
                     } else {
                        this.$router.push('/identityResult')
                     }
                  }
               })
            } catch (message) {
               //    弹窗
               this.$Message.warning(this.$t(message));
            }
         },
         dealData() {
            const birthday = this.userFrontMessage.birthdayFront
            this.stepThreeForm.firstName = this.userFrontMessage.nameFront.slice(1, 5)
            this.stepThreeForm.lastName = this.userFrontMessage.nameFront.slice(0, 1)
            this.stepThreeForm.birthday = `${birthday.slice(4, 6)}-${birthday.slice(6, 8)}-${birthday.slice(0, 4)}`
            this.stepThreeForm.street = this.userFrontMessage.addressFront
            this.stepThreeForm.gender = this.userFrontMessage.genderFront || '男'
         },
         submitCN(name) {
            try {
               Object.keys(this[name]).map((v) => {
                  if (!this[name][v]) {
                     if (v !== 'middleName') {
                        //没填
                        throw this.stepThreeError[v]
                     }
                  }
               })
               this[name].birthday = this.transitTimestamp(this[name].birthday)
               let params = {}
               Object.assign(params, this.stepThreeForm);
               //上传地址证明
               if (!this.addressShow) {
                  if (this.file.fileName) {
                     Object.assign(params, this.file);
                  } else {
                     throw 'newK1AddPrfpop'
                  }
               } else {
                  Object.assign(params, {addressPath: this.userFrontMessage.frontPathFront});
               }
               let stepParams = {}
               Object.assign(stepParams, this.step2Params, params, {deviceCode: localStorage.getItem('deviceID')});
               this.step3Params = stepParams
               //   调接口
               identifyUpdate(this.loginToken, stepParams).then(res => {
                  if (res.result) {
                     this.goStep()
                  }
               })
            } catch (message) {
               //    弹窗
               this.$Message.warning(this.$t(message));
            }
         },
         submit(name) {
            try {
               Object.keys(this[name]).map((v) => {
                  if (!this[name][v]) {
                     if (v !== 'middleName') {
                        //没填
                        throw this.stepThreeError[v]
                     }
                  }
               })
               this[name].birthday = this.transitTimestamp(this[name].birthday)
               if (!this.file.fileName) {
                  throw 'newK1AddPrfpop'
               }
               let params = {}
               Object.assign(params, this.stepThreeForm, this.file);
               if (this.isUS) {
                  Object.keys(this.dataUS).map((v) => {
                     if (!this.dataUS[v]) {
                        throw this.dataUSError[v]
                     }
                  })
                  let tinReg = /^[0-9]{9}$/;
                  let codeReg = /^[0-9]{5}$/;
                  if (!tinReg.test(this.dataUS.tin)) {
                     throw 'newK1TINpopf'
                  }
                  if (!codeReg.test(this.dataUS.zipCode)) {
                     throw 'newK1AddZippopf'
                  }
                  Object.assign(params, this.dataUS);

               }
               let stepParams = {}
               Object.assign(stepParams, this.step2Params, params, {deviceCode: localStorage.getItem('deviceID')});
               this.step3Params = stepParams
               //   调接口
               identifyUpdate(this.loginToken, stepParams).then(res => {
                  if (res.result) {
                     this.goStep()
                  }
               })
            } catch (message) {
               //    弹窗
               this.$Message.warning(this.$t(message));
            }
         },
         goStep(type) {
            if (type === 'back') {
               this[`showStep${this.currentStep}`] = false
               this.currentStep--
               this[`showStep${this.currentStep}`] = true
            } else {
               this[`showStep${this.currentStep}`] = false
               this.currentStep++
               this[`showStep${this.currentStep}`] = true
            }
         },
         transitTimestamp(date) {
            return moment(new Date(date).getTime()).format('MM-DD-YYYY')

         },
         changeNumber(name, count) {
            window.event.target.value = onlyInputNumAndPoint(window.event.target.value, count)
            this.dataUS[name] = window.event.target['value']
         },

         //开始=====
         bandingFunc() {//绑定手机按钮方法
            this.ssoCodeVerify('phone');
         },
         bandEmialFunc() {
            this.ssoCodeVerify('email');
         },
         getOSSfunc() {
            getApi('https://oss.55gm.co/content/country/55-country.json', {}).then((res) => {
               this.ossJSON = res;
               let FrencyCountry = [];
               res.forEach(item => {
                  if (item.type == 'recommend') {
                     FrencyCountry.push(item);
                  }
               });
               this.countryNumber = FrencyCountry[0].code;
            })

         },
         chooseCountry(code) {
            this.countryNumber = code;
         },
         sendSMSfun(callback) {
            //绑定手机
            // let len = this.countryNumber.length;
            let itc = this.countryNumber;
            let value = {
               "operateType": "BIND_PHONE",
               "codeType": "PHONE",
               "itc": itc,
               "phone": this.stepOneForm.phoneNumber
            }
            this.$store.commit('changebandPhoneObj', value)
            this.ssoPhone = {
               "operateType": "BIND_PHONE",
               "codeType": "PHONE",
               "itc": itc,
               "phone": this.stepOneForm.phoneNumber
            }
            //绑定邮箱
            let valueEmail = {
               "operateType": "BIND_EMAIL",
               "codeType": "EMAIL",
               "email": this.stepOneForm.emailAddress,
               "language": localStorage.getItem('countryLanguage')
            }
            this.$store.commit('changeBandEmail', valueEmail);
            this.ssoEmail = {
               "operateType": "BIND_EMAIL",
               "codeType": "EMAIL",
               "email": this.stepOneForm.emailAddress,
               "language": localStorage.getItem('countryLanguage')
            }
            if (callback) {//callback是从子组件传递过来的参数
               this.showModal = !this.showModal;
               this.text = callback;
            }
         },
         ssoCodeVerify(account) {
            let params;
            if (account == 'phone') {//绑定手机
               params = {
                  "operateType": "BIND_PHONE",
                  "codeType": "PHONE",
                  "phone": this.stepOneForm.phoneNumber,
                  "phoneCode": this.stepOneForm.smsCode,
                  "googleCode": this.stepOneForm.googleCode
               }
            } else {//绑定邮箱
               params = {
                  "operateType": "BIND_EMAIL",
                  "codeType": "EMAIL",
                  "email": this.stepOneForm.emailAddress,
                  "emailCode": this.stepOneForm.emailCode,
                  "googleCode": this.stepOneForm.googleCode
               }
            }
            postHeaderTokenBodyApi(ssoCodeVerify, this.loginToken, params).then((res) => {
               if (res.code) {
                  this.showModal = !this.showModal;
                  this.text = this.$t(res.code);
               } else {
                  this.token = res.token;
                  this.bindMetond(account)
               }
            })


         },
         bindMetond(whicCount) {
            let itc = this.countryNumber;
            let ssoToken = this.loginToken;
            let params;
            if (whicCount == 'phone') {//绑定手机
               params = {
                  "phone": this.stepOneForm.phoneNumber,
                  "phoneCode": this.stepOneForm.smsCode,
                  "operateType": "BIND_PHONE",
                  "bindType": "PHONE",
                  "itc": itc,
                  "googleCode": this.stepOneForm.googleCode
               }
            } else {//绑定邮箱
               params = {
                  "email": this.stepOneForm.emailAddress,
                  "emailCode": this.stepOneForm.emailCode,
                  "operateType": "BIND_EMAIL",
                  "bindType": "EMAIL",
                  "googleCode": this.stepOneForm.googleCode
               }
            }
            postHeaderSeveralTokenBodyApi(binding, ssoToken, this.token, params).then((res) => {
               if (res.result == true) {
                  this.bandPhone = this.stepOneForm.phoneNumber;
                  this.bandEmail = this.stepOneForm.emailAddress;
                  if (whicCount == 'phone') {
                     this.banddingPhoneFlag = false;
                  } else {
                     this.banddingEmailFlag = false;
                  }
                  if (!this.banddingPhoneFlag && !this.banddingEmailFlag) {//只在绑定后才可以点击下一步
                     this.disabledFlag = false;
                  }
               } else {
                  this.showModal = !this.showModal;
                  this.text = this.$t(res.code);
               }
            })
         },
         exgCheckt() {
            if (!this.stepOneForm.emailAddress == '') {
               let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
               if (pattern.test(this.stepOneForm.emailAddress)) {
                  this.emailFlag = false;
                  this.empty = false;

               } else {
                  this.emailFlag = true;
                  this.empty = true;
               }
            } else {
               this.emailFlag = false;
               this.disabledFlag = true;
            }
         },
         exgChecktphone() {
            let patternnew = /[^\d]/;
            this.phoneFlag = patternnew.test(this.stepOneForm.phoneNumber);
            if (this.phoneFlag) {
               this.empty = true
            } else {
               this.empty = false;
            }
         },
         EnterEmail() {
            if (!this.stepOneForm.emailAddress == '') {
               this.empty = false;
               this.emailFlag = false;
            } else {
               this.emailFlag = false;
               this.empty = true;
               this.disabledFlag = true;
            }
         },
         EnterPhone() {
            if (!this.stepOneForm.phoneNumber == '') {
               this.empty = false;

            } else {
               this.empty = true;
               this.stepOneForm.phoneNumber = this.stepOneForm.phoneNumber.replace(/[^\d]g/, '');
               this.disabledFlag = true;
            }
         },
         EntersmsCode() {
            if (this.banddingGoogleFlag) {
               if (this.stepOneForm.smsCode.length >= 6 && this.stepOneForm.googleCode.length >= 6) {
                  this.btnFlagPhone = false;
               } else {
                  this.btnFlagPhone = true;
                  this.disabledFlag = true;
               }
            } else {
               if (this.stepOneForm.smsCode.length >= 6) {
                  this.btnFlagPhone = false;
               } else {
                  this.btnFlagPhone = true;
                  this.disabledFlag = true;
               }
            }

         },
         EnterGoogleCode(e) {
            this.stepOneForm.googleCode = e.target.value.replace(/[^\d]/g, '');
            if (this.stepOneForm.googleCode.length >= 6 && this.stepOneForm.smsCode.length >= 6) {
               this.btnFlagPhone = false;
            } else {
               this.btnFlagPhone = true;
               this.disabledFlag = true;
            }
         },
         EnterGoogleCodeEmail(e) {//谷歌的监听
            this.stepOneForm.googleCode = e.target.value.replace(/[^\d]/g, '');
            if (this.stepOneForm.emailCode.length >= 6 && this.stepOneForm.googleCode.length >= 6) {
               this.btnFlagEmail = false;
            } else {
               this.btnFlagEmail = true;
               this.disabledFlag = true;
            }
         },
         EnterEmailCode() {//邮件验证码监听
            if (this.banddingGoogleFlag) {
               if (this.stepOneForm.emailCode.length >= 6 && this.stepOneForm.googleCode.length >= 6) {
                  this.btnFlagEmail = false;
               } else {
                  this.btnFlagEmail = true;
                  this.disabledFlag = true;
               }
            } else {
               if (this.stepOneForm.emailCode.length >= 6) {
                  this.btnFlagEmail = false;
               } else {
                  this.btnFlagEmail = true;
                  this.disabledFlag = true;
               }
            }

         },
         changeIdType(e) {//新添加
            this.firstIdcard = e;
            if (e == 'idCard' && this.countryName == 'China') {
               this.uploadParams = {
                  side: 'front',
                  ocr: true,
               }
               this.uploadBack = {
                  side: 'back',
                  ocr: true,
               }

            } else {
               this.uploadParams = {
                  side: 'front',
                  ocr: false,
               }
               this.uploadBack = {
                  side: 'back',
                  ocr: false,
               }
            }
            if (e == 'idCard' || e == 'license') {
               this.idCard = true;
            } else {
               this.idCard = false;
            }
         },
         changeCountry(e) {
            this.countryName = e;
            if (e == 'China' && this.firstIdcard == 'idCard') {
               this.uploadParams = {
                  side: 'front',
                  ocr: true,
               }
               this.uploadBack = {
                  side: 'back',
                  ocr: true,
               }

            } else {
               this.uploadParams = {
                  side: 'front',
                  ocr: false,
               }
               this.uploadBack = {
                  side: 'back',
                  ocr: false,
               }
            }
         },
         goback() {//新添加
            this.$router.go(-1)
         },
         // 图片上传部分
         beforeUploadFront() {
            this.uploadList = this.$refs.upload.fileList;
         },
         beforeUploadBack() {
            this.uploadListTWO = this.$refs.uploadTwo.fileList;
         },
         beforeUploadSelf() {
            this.uploadListThree = this.$refs.uploadThird.fileList;
         },
         handleSuccess(res, file) {
            let fileUrl = res.filePath.filePath;
            getHeaderTokenApi(identifyPhoto, {filePath: fileUrl}, this.loginToken).then((res) => {
               if (res.code) {
                  this.$Notice.error({
                     title: this.$t(res.code),
                     desc: this.$t(res.code)
                  });
                  return;
               }
               this.urlPath = res.data.filePath;
            }).catch((error) => {
               console.log(error)
            })
            this.userFrontMessage.frontPathFront = fileUrl;
            if (JSON.stringify(res.info) !== "{}") {
               this.uploadSelfFlag = true;
               this.userFrontMessage.addressFront = res.info.words_result['住址'].words;
               this.userFrontMessage.idnumberFront = res.info.words_result['公民身份号码'].words;
               this.userFrontMessage.birthdayFront = res.info.words_result['出生'].words;
               this.userFrontMessage.nameFront = res.info.words_result['姓名'].words;
               this.userFrontMessage.genderFront = res.info.words_result['性别'].words;
               this.userFrontMessage.NationalityFront = res.info.words_result['民族'].words;
            }
         },
         handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.urlPath = ''
            this.userFrontMessage = {
               nameFront: '',
               genderFront: '',
               NationalityFront: '',
               birthdayFront: '',
               addressFront: '',
               idnumberFront: '',
               frontPathFront: ''
            }
         },
         handleRemoveTwo(file) {
            const fileList = this.$refs.uploadTwo.fileList;
            this.$refs.uploadTwo.fileList.splice(fileList.indexOf(file), 1);
            this.urlPathTWO = ''
            this.userBackMessage = {
               expireTimeBack: '',
               dateIssuanceBack: '',
               organizationBack: '',
               backPathBack: ''
            }
         },
         handleRemoveThree(file) {
            const fileList = this.$refs.uploadThird.fileList;
            this.$refs.uploadThird.fileList.splice(fileList.indexOf(file), 1);
            this.urlPathTHREE = ''
            this.userSelf = {
               selfPathSelf: '',
            }
         },
         handleSuccessTWO(res, file) {
            let fileUrl = res.filePath.filePath;
            getHeaderTokenApi(identifyPhoto, {filePath: fileUrl}, this.loginToken).then((res) => {
               this.urlPathTWO = res.data.filePath;
               if (res.code) {
                  this.$Notice.error({
                     title: this.$t(res.code),
                     desc: this.$t(res.code)
                  });
               }
            })
            this.userBackMessage.backPathBack = fileUrl;
            if (JSON.stringify(res.info) !== "{}") {
               this.userBackMessage.expireTimeBack = res.info.words_result['失效日期'].words;
               this.userBackMessage.dateIssuanceBack = res.info.words_result['签发日期'].words;
               this.userBackMessage.organizationBack = res.info.words_result['签发机关'].words;
            }


         },
         handleSuccessTHREE(res, file) {
            this.idcardURLSignature = res.filePath;
            let fileUrl = res.filePath;
            this.userSelf.selfPathSelf = fileUrl;
            if (res.code) {
               this.$Notice.error({
                  title: this.$t(res.code),
                  desc: this.$t(res.code)
               });
            }
            getHeaderTokenApi(identifyPhoto, {filePath: fileUrl}, this.loginToken).then((res) => {
               this.urlPathTHREE = res.data.filePath;
            })
         },
         handleError(error, file, fileList) {
            let errore = error;
            this.$Notice.error({
               title: this.$t('uploadError'),
               desc: this.$t('uploadError')
            });

         },
         handleFormatError(file) {
            this.$Notice.error({
               title: this.$t('invalidFormate'),
               desc: this.$t('invalidFormate')
            });
         },
         handleFormatErrorTWO(file) {
            this.$Notice.error({
               title: this.$t('invalidFormate'),
               desc: this.$t('invalidFormate')
            });
         },
         handleFormatErrorTHREE(file) {
            this.$Notice.error({
               title: this.$t('invalidFormate'),
               desc: this.$t('invalidFormate')
            });
         },
         handleMaxSize(file) {
            this.$Notice.error({
               title: this.$t('picIsToolarge'),
               desc: this.$t('picIsToolarge')
            });
         },
         handleMaxSizeTWO(file) {
            this.$Notice.error({
               title: this.$t('picIsToolarge'),
               desc: this.$t('picIsToolarge')
            });
         },
         handleMaxSizeTHREE(file) {
            this.$Notice.error({
               title: this.$t('picIsToolarge'),
               desc: this.$t('picIsToolarge')
            });
         },
         imgFallBack(fileUrl, which) {//今天
            let _that = this;
            getHeaderTokenApi(identifyPhoto, {filePath: fileUrl}, this.loginToken).then((res) => {
               if (res.data.code) {
                  _that.$Notice.error({
                     title: _that.$t(res.data.code),
                     desc: _that.$t(res.data.code)
                  });
               }
               if (which == 'front') {
                  _that.urlPath = res.data.filePath;
               } else if (which == 'back') {
                  _that.urlPathTWO = res.data.filePath;
               } else if (which == 'self') {
                  _that.urlPathTHREE = res.data.filePath;
               }
            })
         },
         //图片上传结束
         //查询用户信息
         getUserInfo(token) {
            postHeaderTokenBodyApi(userInfo, token, {}).then((res) => {
               if (res.code) {
                  this.showModal = !(this.showModal);//！取非解决了弹出只谈一次的bug
                  this.text = this.$t(res.code);
                  if (res.code == '10013') {
                     setTimeout(() => {
                        this.$router.push('/login');
                     }, 2000);
                  }
               } else {
                  this.banddingGoogleFlag = res.isBindingGoogle;
                  // this.banddingGoogleFlag = true;
               }

            }).catch((res) => {
            })
         },
      },
      mounted() {
         const params = this.$route.query
         let ssoProvider = {};
         //创建实例
         this.exchange = new Exchange(ssoProvider);
         if (params['token']) {
            this.loginToken = params['token']
            this.headerObj = {token: params['token']}
            this.exchange.ssoProvider.getSsoToken = function (fn) {
               fn(params['token']);
            };
         } else {
            let loginToken = Cookies.get('loginToken')
            if (loginToken) {
               this.loginToken = loginToken
               this.headerObj = {token: loginToken}
               this.exchange.ssoProvider.getSsoToken = function (fn) {
                  fn(loginToken);
               };
            } else {
               this.$router.push({
                  path: '/login',
               })
               return
            }
         }
         this.type = this.$route.query['type']
         this.showHeader = (this.type === 'ios' || this.type === 'android') ? false : true
         const language = this.$route.query['language']
         if (language) {
            this.$store.commit('changeCurentLange', language);
         }
         queryUserInfo(this.loginToken).then(res => {
            let obj = res.data;//今天
            this.userInfoObj = obj;
            obj.profileEmail ? this.banddingEmailFlag = false : this.banddingEmailFlag = true;
            obj.profilePhone ? this.banddingPhoneFlag = false : this.banddingPhoneFlag = true;
            if (obj.profileEmail && obj.profilePhone) {
               this.disabledFlag = false;
            }
            localStorage.setItem('kycCountry', res.data.country)
            this.stepTwoForm.country = res.data.country

            if (res.data.country === 'CN') {
               this.showCN = true
            } else if (res.data.country === 'US') {
               this.isUS = true
               this.state = state
               this.dataUS.region = this.state[0].locale
            }
            //非美国人仅可选择护照
            if (res.data.country !== 'US') {
               this.idType = [{label: 'newK1PP', value: 'passport'},]
            }
            this.stepTwoForm.idType = this.idType[0].value
         })
         this.init();
         this.getOSSfunc()
         this.uploadUrl = `/api/sso/new-identify/upload-front`;//新添加
         this.uploadUrlPic = `/api/sso/user/identify.upload`;//新添加
         this.getUserInfo(this.loginToken)
         this.stepThreeForm.gender = '男'
         this.stepThreeForm.address = 'home'
         this.stepFourForm = {
            goal: this.goal[0].value,
            source: this.source[0].value,
            occupation: this.occupation[0].value,
            Employer: '',
         }
      }
   }
</script>

<style lang="less" scoped>
   .kyc-overflow {
      height: 100%;
      min-height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
   }

   .red-color {
      color: #EA4853 !important;
   }

   @main-color: #1D8699;

   .green-color {
      color: @main-color;
   }

   .container::-webkit-scrollbar {
      display: none;
   }

   .height {
      height: 100%;
      min-height: 100%;
   }

   .identity-wrapper {
      background-color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
   }

   .flex-center {
      display: -webkit-flex;
      display: -ms-flex;
      display: -moz-flex;
      display: -o-flex;
      display: flex;
      align-items: center;
      /*不能加这个 不然苹果浏览器不好使*/
      /*height: 100%;*/
      min-height: 100%;
   }

   /*step*/
   .step-color {
      border-color: @main-color !important;
      color: @main-color !important;
   }

   .active {
      background-color: @main-color !important;
      color: #fff !important;
   }

   .left-bgc {
      background-color: @main-color;
   }

   /*button color*/
   .btn-color {
      background-color: @main-color;
      border-color: @main-color;
      &:hover {
         background-color: @main-color;
         border-color: @main-color;
         box-shadow: 0 4px 17px rgba(0, 134, 155, 0.35);
      }
   }

   .active {
      background-color: @main-color !important;
      color: #fff !important;
   }

   /*同意框*/
   .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
      background-color: @main-color;
      left: 0;
   }

   .custom-control-label::before {
      left: 0;
   }

   .custom-control-label::after {
      left: 0;
   }

   /*button color*/
   .btn-color {
      background-color: @main-color;
      border-color: @main-color;
      &:hover {
         background-color: @main-color;
         border-color: @main-color;
         box-shadow: 0 4px 17px rgba(0, 134, 155, 0.35);
      }
   }

   .upload-btn {
      top: 0;
      right: 0;
      cursor: pointer;
   }

   .upload-file {
      top: 0;
      opacity: 0;
      cursor: pointer;
   }

   .flag {
      width: 20px;
      height: 14px;
   }

   .overflow-height {
      height: 400px;
      overflow: auto;
      img {
         width: 20px;
         height: 14px;
         margin-top: 3px;
      }
   }

   //图片上传
   .upload-img-container {
      margin: 0 auto;
      margin-top: 40px;
      .demo-upload-list {
         width: 304px;
         height: 100%;
         z-index: 100;
         border-radius: 0px !important;
         display: flex;
         align-items: center;
         text-align: center;
         overflow: hidden;
         background: #fff;
         position: relative;
         box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
         margin-right: 4px;
         img {
            width: 100%;
            height: 200px;
         }
         &:hover {
            .demo-upload-list-cover {
               display: block;
            }
         }
      }
      .upload-img-contain {
         position: relative;
         top: -200px;
         z-index: 300;
         .ivu-upload {
            opacity: 0;
            filter: Alpha(opacity=0);
         }

      }
      .identity-hover-img {
         position: absolute;
         top: 0px;
         display: none;
         z-index: 99;
      }
      .ivu-upload-drag {
         border: none !important;
         z-index: 120 !important;
      }
      .demo-upload-list-cover {
         display: none;
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
         background: rgba(0, 0, 0, .6);
         i {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
         }
      }
      .item {
         width: 304px;
         margin: 0 auto;
         min-height: 191px;
         position: relative;
         .pic-tips {
            li {
               list-style: none;
               .right {
                  color: green;
               }
               span {
                  margin-left: 5px;
               }
            }
         }
         p {
            text-align: left;;
            font-size: 16px;
            color: #949DA6;
            padding: 10px 0 10px;
         }
         .identityCard-one {
            cursor: pointer;
            height: 191px;
            position: relative;
            &:hover {
               .identity-hover-img {
                  position: absolute;
                  top: 0px;
                  display: block;
                  z-index: 130;

               }
            }
         }
         .identityCard-two {
            cursor: pointer;
            height: 191px;
            position: relative;
            &:hover {
               .identity-hover-img {
                  display: block;
               }
            }

         }
         .identityCard-three {
            cursor: pointer;
            height: 191px;
            position: relative;
            &:hover {
               .identity-hover-img {
                  display: block;
               }
            }

         }
         ul {
            margin-top: 30px;
            li {
               color: #949DA6;
               font-size: 12px;
               padding-left: 10px;
               list-style-type: disc;
               list-style-position: inside;
               text-indent: 0px;
            }
         }

      }
   }

   .selfDefineBtn {
      background: #12869a;
      color: #fff;

   }
</style>