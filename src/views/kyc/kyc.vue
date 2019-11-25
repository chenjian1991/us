<template>
  <main class="identity-wrapper height" id="kyc">
    <div class="d-flex align-items-center position-relative height">
      <header id="header" class="u-header u-header--bg-transparent u-header--abs-top" v-if="showHeader">
        <div class="u-header__section">
          <div id="logoAndNav" class="container-fluid">
            <!-- Nav -->
            <nav class="navbar navbar-expand u-header__navbar pt-2">
              <a class="d-flex d-lg-none navbar-brand u-header__navbar-brand u-header__navbar-brand-center u-header__navbar-brand-collapsed"
                 href="../home" aria-label="Front">
                <img class="d-inline-block d-lg-none" src="../../assets/images/kyc/kycLogo.png"
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
              <img src="../../assets/images/kyc/kycLogo.png">
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
          </div>
        </div>
      </div>
      <div class="container kyc-overflow">
        <div class="row no-gutters flex-center">
          <div class="col-md-8 col-lg-10 col-xl-8 p-2 pb-6 pt-7" style="margin-left: auto;margin-right: auto">
            <h4 class="mt-2 mb-3">{{$t('newK1title')}}</h4>
            <article class="red-color f-14 f-w-5 mb-2" v-for="article of articleList" :key="article.id"
                     v-show="currentStep===1">
              {{article}}
            </article>
            <div class="btn-group btn-group-toggle card-group d-block d-md-flex mt-4">
              <a class="btn btn-outline-secondary u-btn-wide--xm col-lg-3 step-color"
                 v-for="(item,i) in stepList" :key="i"
                 :class="currentStep===i+1?'active':''" :disabled="true">{{$t(item)}}</a>
            </div>
            <!-- 第一步 -->
            <div v-show="showStep1" class="firstStep">
              <input type="hidden" name="captchaId" value="a3cd39c172284133a3470b7ec05a2bb0">
              <div id="captcha"></div>
              <form class="mt-5 mb-5">
                <section v-if='banddingEmailFlag' class="bandingEmail">
                  <div class="form-group">
                    <label class="h6 d-block text-uppercase"
                           for="disabledTextInput">{{$t('newK1mailBD')}}</label>
                    <input disabled v-model="email" type="text" id="disabledTextInput"
                           class="form-control"
                           :placeholder="email"/>
                  </div>
                </section>
                <section v-else class="bandingEmail">
                  <div class="form-group">
                    <label class="h6 d-block text-uppercase"
                           for="disabledTextInput">{{$t('aqzxBandEmail')}}</label>
                    <router-link v-if="type==='ios'||type==='android'"
                                 class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                                 to='/BandEmail?origin=kyc&type=mobile'>{{$t('去绑定')}}
                    </router-link>
                    <router-link v-else
                                 class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                                 to='/BandEmail?origin=kyc'>{{$t('去绑定')}}
                    </router-link>
                  </div>
                </section>
                <section v-if="banddingPhoneFlag" class="bandingPhone">
                  <div class="form-group">
                    <label class="h6 d-block text-uppercase"
                           for="disabledTextInput">{{$t('newK1phoneBD')}}</label>
                    <input disabled v-model="phone" type="text" id="disabledTextInput"
                           class="form-control"
                           :placeholder="phone"/>
                  </div>
                </section>
                <section v-else class="bandingPhone">
                  <div class="form-group">
                    <label class="h6 d-block text-uppercase"
                           for="disabledTextInput">{{$t('aqzxBandPhone')}}</label>
                    <router-link v-if="type==='ios'||type==='android'"
                                 class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                                 to='/BandPhone?origin=kyc&type=mobile'>{{$t('去绑定')}}
                    </router-link>
                    <router-link v-else
                                 class="btn btn-sm btn-primary transition-3d-hover d-inline-block loginBtn"
                                 to='/BandPhone?origin=kyc'>{{$t('去绑定')}}
                    </router-link>
                  </div>
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
                    <Option v-for="(item,i) in country" :value="item.locale" :key="i"
                            :label="language==='zh-CN'?item.zh:item.en">
                      <img class="flag" :src="item.image"/>
                      <span
                          style="color:#5a626d;font-size:14px;margin-left:10px;">{{language==='zh-CN'?item.zh:item.en}}</span>
                    </Option>
                  </Select>
                </div>
                <div class="mb-4">
                  <label class="h6 font-size-14 mb-3">{{$t('newK1idT')}}</label>
                  <Select @on-change='changeIdType' v-model="stepTwoForm.idType" size="large"
                          :disabled="!isUS">
                    <Option v-for="(item,i) in idType" :key="i" :value="item.value" :label="$t(item.label)">
                      {{$t(item.label)}}
                    </Option>
                  </Select>
                </div>
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1idNo')}}</label>
                  <input type="text" class="form-control form-control-sm" maxlength="20"
                         v-model="stepTwoForm.idNumber">
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
                             v-for="(item,i) in uploadList" :key="i">
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
                        >
                          <div style="width: 304px;height:200px;position: absolute;top: 0px;">
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
                             v-for="(item,i) in uploadListTWO" :key="i">
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
                        >
                          <div style="width: 304px;height:200px;position: absolute;top: 0px;">
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
                             v-for="(item,i) in uploadListThree" :key="i">
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
                            :data='uploadHandself'
                            :headers="headerObj"
                            :action="uploadUrl"
                        >
                          <div style="width: 304px;height:200px;position: absolute;top: 0px;">
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
                    <Option value="Select One">Select One</Option>
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
                <!--税号 美国人必填-->
                <div v-if="isUS" class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1TIN')}}<span
                      class="red-color"> *</span></label>
                  <input type="text" class="form-control form-control-sm" maxlength="9"
                         v-model="stepThreeForm.tin"
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
                <!--州、邮编 美国人时“州/省”需要下拉列表，Zip美国人仅5位数字-->
                <div v-if="isUS">
                  <div class="form-row mb-3">
                    <div class="form-group col-md-6">
                      <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddReg')}}<span
                          class="red-color"> *</span></label>
                      <Select v-model="stepThreeForm.region" size="large">
                        <Option v-for="(item,i) in state" :value="item.locale" :key="i"
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
                             v-model="stepThreeForm.zipCode"
                             @input="changeNumber('zipCode','5')">
                    </div>
                  </div>
                </div>
                <!--非美国人时为输入框 Zip数字10位以内即可-->
                <div v-else>
                  <div class="form-row mb-3">
                    <div class="form-group col-md-6">
                      <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddReg')}}<span
                          class="red-color"> *</span></label>
                      <input type="text" class="form-control form-control-sm" maxlength="50"
                             v-model="stepThreeForm.region">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="h6 d-block font-size-14 mb-3">{{$t('newK1AddZip')}}<span
                          class="red-color"> *</span></label>
                      <input type="text" class="form-control form-control-sm" maxlength="10"
                             v-model="stepThreeForm.zipCode"
                             @input="changeNumber('zipCode','10')">
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1Addtype')}}<span
                      class="red-color"> *</span></label>
                  <Select v-model="stepThreeForm.address" size="large">
                    <Option value="Select One">Select One</Option>
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
            <div v-show="showStep4">
              <form class="mt-5 mb-5" v-model="stepFourForm" ref="stepFourForm">
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq1')}}</label>
                  <Select v-model="stepFourForm.goal" size="large">
                    <Option v-for="(item,i) in goal" :value="item.value" :label="item.title" :key="i">
                      {{item.title}}
                    </Option>
                  </Select>
                </div>
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq2')}}</label>
                  <Select v-model="stepFourForm.source" size="large">
                    <Option v-for="(item,i) in source" :value="item.value" :label="item.title" :key="i">
                      {{item.title}}
                    </Option>
                  </Select>
                </div>
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">{{$t('newK1surveyq3')}}</label>
                  <Select v-model="stepFourForm.occupation" size="large">
                    <Option v-for="(item,i) in occupation" :value="item.value" :label="item.title" :key="i">
                      {{item.title}}
                    </Option>
                  </Select>
                </div>
                <div class="mb-4">
                  <label class="h6 d-block font-size-14 mb-3">Current Employer</label>
                  <input type="text" class="form-control form-control-sm" maxlength="30"
                         v-model="stepFourForm.Employer">
                </div>
                <div class="mb-4">
                  <Checkbox v-model="stepFourForm.investor" class="f-14">Check the box if you are an accredited
                    investor
                  </Checkbox>
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
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
  import moment from 'moment'

  import {Exchange} from '@/interface/exchange.js'
  import {
    queryUserInfo, identifySubmit, identifyUpdate, identifyQuery, uploadImg, getPhoto,
  } from '_api/balances.js'
  import {
    identifyPhoto,
    userInfo
  } from '../../../api/urls.js';
  import {
    getHeaderTokenApi,
    postHeaderTokenBodyParamsApi
  } from '../../../api/axios.js';

  import Modaltips from '@/components/Modal';

  import {
    onlyInputNumAndPoint
  } from '@/lib/utils.js'
  import {state, country, goal, source, occupation} from './state_country.js'

  export default {
    name: "kyc",
    data() {
      return {
        //移动端
        showHeader: true,

        //pc
        showStep1: true,
        showStep2: false,
        showStep3: false,
        showStep4: false,
        currentStep: 1,
        stepList: ['newK1st1', 'newK1st2', 'newK1st3', 'newK1st4'],
        isUS: false,
        loginToken: $cookies.get('loginToken'),

        state: state,
        country: country,
        goal: goal,
        source: source,
        occupation: occupation,

        ossJSON: [], //国家
        file: {
          fileName: '',
          filePath: '',
        },
        language: localStorage.getItem('countryLanguage'),

        articleList: ['* please verify that all your information is accurate before submitting',
          'Attention customers, trading is currently only open for U.S customers, you can get ready for trading by proceeding with KYC and we will notify you as soon as trading services in your region become available.',
          'For U.S customers, trading is currently not open for those in Alabama, Alaska, Arkansas, Connecticut, Florida, Georgia, Hawaii, Idaho, Iowa, Kentucky, Louisiana, Massachusetts, Michigan, Mississippi, Nebraska, New Mexico, New York, North Carolina, North Dakota, Oregon, South Dakota, Vermont, Washington. However, you can get ready for trading by proceeding with KYC and we will notify you as soon as trading services in your state become available.',
          'For users in Texas, New Jersey, Maine, Ohio, Tresso cannot accept fiat deposits from your state at this time but you may still register for an account, deposit, withdrawal and trade cryptocurrency against cryptocurrency. We will be in touch with you if your state becomes available.',
        ],
        idType: [
          {label: "newK1DL", value: 'license'},
          {label: 'newK1ID', value: 'idCard'},
          {label: 'newK1PP', value: 'passport'},
        ],

        //modal
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
          gender: 'Select One',
          birthday: '',
          tin: '',
          street: '',
          city: '',
          region: '',
          zipCode: '',
          address: 'Select One',
        },
        stepFourForm: {
          goal: 'Select One',
          source: 'Select One',
          occupation: 'Select One',
          Employer: '',
          investor: false,
        },
        // error pop
        stepOneError: ['emailPlacehodler', 'newK1vcodepop', 'phonePlacehodlerphone', 'newK1vcodepop'],// 新添加
        stepTwoError: {idNumber: 'newK1idNopop', expireDate: 'newK1idEPDpop'},
        stepThreeError: {
          firstName: 'newK1name1pop',
          lastName: 'newK1name3pop',
          gender: 'newK1genfill',
          birthday: 'newK1birthpop',
          tin: 'newK1TINpop',
          street: 'newK1AddStpop',
          city: 'newK1AddCitypop',
          region: this.isUS ? 'newK1AddRegfill' : 'newK1AddRegfillNoUS',
          zipCode: 'newK1AddZippop',
          address: 'newK1Addpop',
        },
        stepFourError: {
          goal: 'newK1surveyselect',
          source: 'newK1surveyselect',
          occupation: 'newK1surveyselect',
          Employer: 'newK1Employerpop',
        },
        //证件不可选时间
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
        //参数
        step2Params: {},
        step3Params: {},
        formJson: {},

        //chen开始
        phoneNumber: '',
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
        uploadUrl: `/api/sso/identify/upload`,
        // uploadUrlPic: `/api/sso/user/identify.upload`,
        fileUrl: "",
        uploadParams: {
          side: 'front',
          ocr: true,
          userId: localStorage.getItem('loginUserId'),
        },
        uploadBack: {
          side: 'back',
          ocr: true,
          userId: localStorage.getItem('loginUserId'),
        },
        uploadHandself: {
          userId: localStorage.getItem('loginUserId')
        },
        userSelf: {
          userId: localStorage.getItem('loginUserId'),
          selfPathSelf: '',//最新更改
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
        userId: localStorage.getItem('loginUserId'),
        deviceCode: localStorage.getItem('deviceCode'),
        email: '',
        phone: '',
        type: '',
      }
    },
    components: {
      Modaltips
    },
    methods: {
      async getUserInfo(token) {
        await new Promise(resolve => {
          let params = {
            "userId": this.userId,
          }
          getHeaderTokenApi(userInfo, params, token).then((res) => {
            let userInfo = res.data;
            this.banddingEmailFlag = res.data.email ? true : false;
            this.banddingPhoneFlag = res.data.phone ? true : false;
            this.email = res.data.email;
            this.phone = res.data.phone;
            if (this.banddingEmailFlag && this.banddingPhoneFlag) {
              this.disabledFlag = false;
            }
            this.stepTwoForm.country = userInfo.country

            if (userInfo.country === 'US') {
              this.isUS = true
              this.stepThreeForm.region = this.state[0].locale
            } else {
              this.stepTwoForm.idType = this.idType[2].value
            }
            resolve()
          })
        })
        await new Promise(resolve => {
          this.identifyQuery()
          resolve()
        })
      },
      identifyQuery() {
        //查询用户信息
        identifyQuery({
          userId: this.userId,
          nameList: 'THIRD_PT'
        }, this.loginToken).then(res => {
          //有数据
          if (res.data.length) {
            const formJson = res.data[0].data
            const identifyState = res.data[0]['thirdState']
            console.log(identifyState)
            if (identifyState === 'INIT' || identifyState === 'FAIL') {
              this.formJson = formJson
              this.stepTwoForm = {
                idNumber: formJson.idNumber,
                expireDate: formJson.expireDate === 'Invalid date' ? '' : formJson.expireDate,
                country: formJson.country || this.country[0].locale,
                idType: formJson.idType || this.idType[0].value,
              }
              this.stepThreeForm = {
                firstName: formJson.firstName,
                middleName: formJson['middleName'],
                lastName: formJson.lastName,
                gender: formJson.gender || 'Select One',
                birthday: formJson.birthday === 'Invalid date' ? '' : formJson.birthday,
                tin: formJson.tin,
                street: formJson.street,
                city: formJson.city,
                region: this.isUS ? formJson.region || this.state[0].locale : formJson.region,
                zipCode: formJson.zipCode,
                address: formJson.address || 'Select One',
              }
              this.stepFourForm = {
                goal: formJson.goal || this.goal[0].value,
                source: formJson.source || this.source[0].value,
                occupation: formJson.occupation || this.occupation[0].value,
                Employer: formJson.Employer || '',
                investor: formJson.investor || false,
              }
              this.file = {
                fileName: formJson['fileName'],
                filePath: formJson['filePath'],
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
            } else if (identifyState === 'SUBMIT' || identifyState === 'SUCCESS') {
              this.$router.push('/identityResult')
            }
          }
        })
      },
      changeFile(e) {
        let file = e.target.files[0]
        let param = new FormData() // 创建form对象
        param.append('file', file)// 通过append向form对象添加数据
        param.append('userId', this.userId)// 通过append向form对象添加数据

        uploadImg(this.loginToken, param).then(res => {
          this.getPubUrl(res.result)
        })
      },
      getPubUrl(key) {
        getPhoto(this.loginToken, {'userId': this.userId, key: key}).then(res => {
          this.file = {filePath: res.result, fileName: res.result}
        })
      },
      previous() {
        //   调接口 数据回填
        this.goStep('back')
      },
      nextStep1() {
        this.goStep()
      },
      nextStep2(name) {
        try {
          Object.keys(this[name]).map((v) => {
            if (!this[name][v]) {
              throw this.stepTwoError[v]
            }
          })

          let idNumber = /^[A-Z0-9*]{0,20}$/;
          if (!idNumber.test(this[name].idNumber)) {
            throw 'newK1idNopopf'
          }
          this[name].expireDate = this.transitTimestamp(this[name].expireDate)
          if (this[name].expireDate === 'Invalid date') {
            throw this.stepTwoError['expireDate']
          }
          //判断图片非空   最新更改
          if (this.urlPath && this.urlPathTWO && this.urlPathTHREE) {//全部填完
          } else {
            throw 'newK1Imgrequired'
          }
          this.step2Params = {}
          Object.assign(this.step2Params, this.stepTwoForm, {frontPathFront: this.userFrontMessage.frontPathFront}, {backPathBack: this.userBackMessage.backPathBack}, {selfPathSelf: this.userSelf.selfPathSelf});

          let newParams = {
            userId: this.userId,
            identifyCode: this.stepTwoForm.idNumber,
            identifyThirdNameList: ['THIRD_PT'],
            identifyData: this.step2Params,
            deviceType: this.getDeviceType(),
            deviceCode: this.deviceCode,
          }
          // 调接口
          identifyUpdate(this.loginToken, newParams).then(res => {
            if (res.result) {
              this.goStep()
              //能识别
              if (this.uploadSelfFlag) {
                this.dealData()
              }
            }
          })
        } catch (message) {
          console.log(message)

          this.$Message.warning(this.$t(message));
        }
      },
      nextStep3(name) {
        try {
          Object.keys(this[name]).map((v) => {
            if (!this[name][v] || this[name][v] === 'Select One') {
              if (v !== 'middleName') {
                if (!this.isUS && v === 'tin') {
                } else {
                  throw this.stepThreeError[v]
                }
              }
            }
          })
          this[name].birthday = this.transitTimestamp(this[name].birthday)
          if (!this.file.fileName) {
            throw 'newK1AddPrfpop'
          }
          let params = {}
          Object.assign(params, this[name], this.file);
          if (this.isUS) {
            let tinReg = /^[0-9]{9}$/;
            let codeReg = /^[0-9]{5}$/;
            if (!tinReg.test(this[name].tin)) {
              throw 'newK1TINpopf'
            }
            if (!codeReg.test(this[name].zipCode)) {
              throw 'newK1AddZippopf'
            }
            Object.assign(params, this[name]);

          }
          let stepParams = {}
          Object.assign(stepParams, this.step2Params, params, {deviceCode: localStorage.getItem('deviceID')});
          this.step3Params = stepParams
          let newParams = {
            userId: this.userId,
            identifyCode: this.stepTwoForm.idNumber,
            identifyThirdNameList: ['THIRD_PT'],
            identifyData: stepParams,
            deviceType: this.getDeviceType(),
            deviceCode: this.deviceCode,
          }
          //   调接口
          identifyUpdate(this.loginToken, newParams).then(res => {
            if (res.result) {
              this.goStep()
            }
          })
        } catch (message) {
          //    弹窗
          this.$Message.warning(this.$t(message));
        }
      },
      nextStep4(name) {
        try {
          Object.keys(this[name]).map((v) => {
            if (!this[name][v] || this[name][v] === 'Select One') {
              throw this.stepFourError[v]
            }
          })
          let stepParams = {}
          Object.assign(stepParams, this[name], this.step3Params, {us: true});
          let newParams = {
            userId: this.userId,
            identifyCode: this.stepTwoForm.idNumber,
            identifyThirdNameList: ['THIRD_PT'],
            identifyData: stepParams,
            deviceType: this.getDeviceType(),
            deviceCode: this.deviceCode,
          }
          //   调接口
          identifySubmit(this.loginToken, newParams).then(res => {
            if (res.result) {
              //   跳转到结果页
              this.$router.push('/identityResult')
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
        this.stepThreeForm.gender = this.userFrontMessage.genderFront || 'Select One'
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
      getDeviceType() {
        const userAgentInfo = navigator.userAgent;
        const agents = ["Android", "iPhone"];
        let deviceType = 'WEB';
        for (let i = 0; i < agents.length; i++) {
          if (userAgentInfo.indexOf(agents[i]) > 0) {
            if (userAgentInfo.indexOf('iPhone') > 0) {
              deviceType = 'IOS'
            } else {
              deviceType = agents[i];
            }
            break;
          }
        }
        return deviceType;
      },
      transitTimestamp(date) {
        return moment(new Date(date).getTime()).format('MM-DD-YYYY')

      },
      changeNumber(name, count) {
        window.event.target.value = onlyInputNumAndPoint(window.event.target.value, count)
        this.stepThreeForm[name] = window.event.target['value']
      },

      //开始=====
      changeIdType(e) {//新添加
        this.firstIdcard = e;
        if (e == 'idCard' && this.countryName == 'China') {
          this.uploadParams = {
            side: 'front',
            ocr: true,
            userId: this.userId,

          }
          this.uploadBack = {
            side: 'back',
            ocr: true,
            userId: this.userId,
          }

        } else {
          this.uploadParams = {
            side: 'front',
            ocr: false,
            userId: this.userId,
          }
          this.uploadBack = {
            side: 'back',
            ocr: false,
            userId: this.userId,
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
            userId: this.userId,

          }
          this.uploadBack = {
            side: 'back',
            ocr: true,
            userId: this.userId,

          }

        } else {
          this.uploadParams = {
            side: 'front',
            ocr: false,
            userId: this.userId,

          }
          this.uploadBack = {
            side: 'back',
            ocr: false,
            userId: this.userId,

          }
        }
      },
      goback() {//新添加
        this.$router.go(-1)
      },
      // 图片上传部分
      beforeUploadFront(file) {
        this.uploadList = this.$refs.upload.fileList;
        let size = file.size / 1024000;
        console.log(size)
        if (size > 1) {
          let _that = this;
          this.photoCompress(file, {quality: 0.6}, function (base64Codes) {
            _that.convertBase64UrlToBlob(base64Codes)
            console.log(_that.convertBase64UrlToBlob(base64Codes).size)

          })
        }

      },
      photoCompress(file, w, objDiv) {
        let _that = this;
        var ready = new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload = function () {
          var re = this.result;
          _that.canvasDataURL(re, w, objDiv)
        }
      },
      canvasDataURL(path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
          var that = this;
          // 默认按比例压缩
          var w = that.width,
              h = that.height,
              scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
      beforeUploadBack(file) {
        let size = file.size / 1024000;
        if (size > 1) {
          let _that = this;
          this.photoCompress(file, {quality: 0.6}, function (base64Codes) {
            _that.convertBase64UrlToBlob(base64Codes)
          })
        }
        this.uploadListTWO = this.$refs.uploadTwo.fileList;
      },
      beforeUploadSelf(file) {
        let size = file.size / 1024000;
        if (size > 1) {
          let _that = this;
          this.photoCompress(file, {quality: 0.6}, function (base64Codes) {
            _that.convertBase64UrlToBlob(base64Codes)
          })
        }
        this.uploadListThree = this.$refs.uploadThird.fileList;
      },
      handleSuccess(res, file) {
        let fileUrl = res.result;
        let params = {
          userId: this.userId,
          key: res.result
        }
        postHeaderTokenBodyParamsApi(identifyPhoto, this.loginToken, {}, params).then((res) => {
          this.urlPath = res.result;
        }).catch((error) => {
        })

        this.userFrontMessage.frontPathFront = fileUrl;
        // if (Object.keys(JSON.parse(res.info)).length !== 0) {// 不要删
        //    this.uploadSelfFlag = true;
        //    this.userFrontMessage.addressFront = res.info.words_result['住址'].words;
        //    this.userFrontMessage.idnumberFront = res.info.words_result['公民身份号码'].words;
        //    this.userFrontMessage.birthdayFront = res.info.words_result['出生'].words;
        //    this.userFrontMessage.nameFront = res.info.words_result['姓名'].words;
        //    this.userFrontMessage.genderFront = res.info.words_result['性别'].words;
        //    this.userFrontMessage.NationalityFront = res.info.words_result['民族'].words;
        // }
      },
      handleSuccessTWO(res, file) {
        let fileUrl = res.result;
        let params = {
          userId: this.userId,
          key: res.result
        }
        postHeaderTokenBodyParamsApi(identifyPhoto, this.loginToken, {}, params).then((res) => {
          this.urlPathTWO = res.result;
        })
        this.userBackMessage.backPathBack = fileUrl;
        // if (Object.keys(JSON.parse(res.info)).length !== 0) {//不要删
        //    this.userBackMessage.expireTimeBack = res.info.words_result['失效日期'].words;
        //    this.userBackMessage.dateIssuanceBack = res.info.words_result['签发日期'].words;
        //    this.userBackMessage.organizationBack = res.info.words_result['签发机关'].words;
        // }
      },
      handleSuccessTHREE(res, file) {
        this.userSelf.selfPathSelf = res.result;
        let params = {
          userId: this.userId,
          key: res.result
        }
        postHeaderTokenBodyParamsApi(identifyPhoto, this.loginToken, {}, params).then((res) => {
          this.urlPathTHREE = res.result;
        })
      },
      handleError(error, file, fileList) {
        let errore = error;
        this.$Notice.error({
          title: this.$t('uploadError'),
          desc: this.$t('uploadError')
        });

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
      imgFallBack(fileUrl, which) {//  图片回显
        let params = {
          userId: this.userId,
          key: fileUrl
        }
        postHeaderTokenBodyParamsApi(identifyPhoto, this.loginToken, {}, params).then((res) => {
          if (which == 'front') {
            this.urlPath = res.result;
          } else if (which == 'back') {
            this.urlPathTWO = res.result;
          } else if (which == 'self') {
            this.urlPathTHREE = res.result;
          }
        })


      },
    },
    mounted() {
      let ssoProvider = {};
      //创建实例
      this.exchange = new Exchange(ssoProvider);
      this.headerObj = {token: this.loginToken}
      this.exchange.ssoProvider.getSsoToken = function (fn) {
        fn(this.loginToken);
      };
      this.getUserInfo(this.loginToken)
      this.stepTwoForm.idType = this.idType[0].value
    }
  }
</script>

<style lang="less">
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #1D8699;
    background-color: #1D8699;
  }

  .ivu-checkbox-checked:hover .ivu-checkbox-inner {
    border-color: #1D8699;
  }
</style>
<style lang="less" scoped>
  @import '../../assets/css/common.less';

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