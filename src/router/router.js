import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/main/Layout.vue';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

import store from '../store/index'
import {getCreateAccount} from '_api/exchange.js'
import {clearLocalStorage} from '@/config'


//zmw
//首页
const index = () => import('../views/home/index.vue')
const API = () => import('../views/home/API.vue')

const balances = () => import('../views/newBalances/balances.vue')
const deposit = () => import('../views/newBalances/deposit.vue')
const withdrawal = () => import('../views/newBalances/withdrawal.vue')
const transaction_history = () => import('../views/newBalances/transactionHistory.vue')
const fee = () => import('../views/newBalances/fee.vue')

//us balance
import deposit_usd from '../views/balances/deposit_usd.vue'
import withdrawal_usd from '../views/balances/withdrawal_usd.vue'
import bankSetting from '../views/balances/bankSetting.vue'

const order = () => import('../views/newBalances/order.vue')
const kyc = () => import('../views/kyc/kyc.vue')

// const ExchangeGBBO = () => import('../views/exchangeGBBO/Exchange.vue')
const ExchangeMain = () => import('../views/exchangeGBBO/Exchange.vue')
// const ExchangeMain = () => import('../views/gbbo/GBBOMain.vue')


const Login = () => import('../views/login/Login.vue')
const Register = () => import('../views/login/register.vue')

import Google from '../views/login/google.vue';
import Forgot from '../views/forgotPassword/forgot.vue';
import SafeVertification from '../views/forgotPassword/safeVertification.vue';
import resetNewpass from '../views/forgotPassword/resetNewpass.vue';
import safeCenter from '../views/sateCenter/safeCenter.vue';
import bandEmail from '../views/sateCenter/bandEmail.vue';
import bandPhone from '../views/sateCenter/bandPhone.vue';

const PersonCenter = () => import('../views/account/PersonCenter.vue') // 归到资产块

import LoginPass from "../views/resetLoginPassword/LoginOrigin.vue";
import NewLoginpwd from "../views/resetLoginPassword/LoginNewpws.vue";
import OriginTradePassword from "../views/resetTradePasswrod/TradeOriginpwd.vue";
import NewTradePassword from "../views/resetTradePasswrod/TradeNewpwd.vue"
import verfifyEmail from "../views/login/verifyEmail.vue";
import activeEmail from "../views/login/activeEmail.vue";
import terms from "../views/legal/terms.vue";
import legal from "../views/legal/legal.vue";
import tradingRules from "../views/legal/TradingRules.vue";
import privacy from "../views/legal/privice.vue";
// import fee from "../views/legal/fee.vue";
// import disclaimer from "../views/legal/disclaimer.vue";
// import aml from "../views/legal/aml.vue";
import setGoogle from "../views/google/setGoogle.vue";
import closeGoogle from "../views/google/closeGoogle.vue";
import identityResult from "../views/identity/identityResult.vue"
import optionalRegistration from "../views/register/optionalRegistration"
import institutionUser from "../views/register/institutionUser"

const about = () => import('../views/about/about_new.vue')

/* new-gbbo */
const NewGBBO = () => import('../views/gbbo/GBBOMain.vue')

import i18n from '@/locale/index.js';

Vue.use(Router)

const router = new Router({
  //history 路由
  mode: 'history',
  routes: [
    {
      path: '/activeEmail',
      name: 'activeEmail',
      meta: {
        title: 'activeEmailTitle'
      },
      component: activeEmail
    },
    {
      path: '/kyc',
      name: 'kyc',
      beforeEnter: (to, from, next) => {
        checkSSOToken(to, next)
      },
      meta: {
        title: 'KYCTitle'
      },
      component: kyc
    },
    {
      path: '/',
      name: '',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/API',
          name: 'API',
          component: API,
        },
        {
          path: '/exchange',
          name: 'exchange',
          // beforeEnter: (to, from, next) => {
          //    // checkSSOToken(to, next)
          // },
          meta: {
            // title:'HomeTokenExchange'
          },
          component: ExchangeMain,
        },
        {
          path: '/gbbo',
          name: 'gbbo',
          // beforeEnter: (to, from, next) => {
          //   checkSSOToken(to, next)
          // },
          meta: {},
          component: NewGBBO
        },
        {
          path: 'home',
          name: 'home',
          meta: {
            title: 'HomeTitle'
          },
          component: index,
        },
        {
          path: 'login',
          name: 'login',
          meta: {
            title: 'ExchangeTitle'
          },
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            title: 'SignUPTitle'
          },
          component: Register
        },
        {
          path: 'google',
          name: 'google',
          meta: {
            title: ''
          },
          component: Google
        },
        {
          path: 'forgot',
          name: 'forgot',
          meta: {
            title: 'ForgotPasswordTitle'
          },
          component: Forgot
        },
        {
          path: 'safeVatification',
          name: 'safeVatification',
          meta: {
            title: 'ForgotPasswordTitle'
          },
          component: SafeVertification
        },
        {
          path: 'resetNewpass',
          name: 'resetNewpass',
          meta: {
            title: 'ForgotPasswordTitle'
          },
          component: resetNewpass
        },
        {
          path: '/Dashboard',
          name: 'Dashboard',
          meta: {
            title: '个人中心title'
          },
          beforeEnter: (to, from, next) => {
            checkSSOToken(to, next)
          },
          component: PersonCenter
        },
        {
          path: 'safeCenter',
          name: 'safeCenter',
          beforeEnter: (to, from, next) => {
            checkSSOToken(to, next)
          },
          meta: {
            title: 'SecurityCenterTitle'
          },
          component: safeCenter
        },
        {
          path: 'bandEmail',
          name: 'bandEmail',
          meta: {
            title: 'EnableEmailTitle'
          },
          component: bandEmail
        },
        {
          path: 'bandPhone',
          name: 'bandPhone',
          meta: {
            title: 'EnableSMSTitle'
          },
          component: bandPhone
        },
        {//修改登录密码
          path: 'LoginPass',
          name: 'LoginPass',
          meta: {
            title: 'ChangePasswordTitle'
          },
          component: LoginPass
        },
        {//修改登录密码
          path: 'NewLoginpwd',
          name: 'NewLoginpwd',
          meta: {
            title: 'ChangePasswordTitle'
          },
          component: NewLoginpwd
        },
        {//修改交易密码
          path: 'OriginTradePassword',
          name: 'OriginTradePassword',
          meta: {
            title: 'ResetTradePasswordTitle'
          },
          component: OriginTradePassword
        },
        {//修改交易密码
          path: 'NewTradePassword',
          name: 'NewTradePassword',
          meta: {
            title: 'ResetTradePasswordTitle'
          },
          component: NewTradePassword
        },
        {//设置谷歌验证
          path: 'setGoogleCode',
          name: 'setGoogleCode',
          meta: {
            title: 'HomeTitle'
          },
          component: setGoogle
        },
        {//关闭谷歌验证
          path: 'closeGoogleCode',
          name: 'closeGoogleCode',
          meta: {
            title: ''
          },
          component: closeGoogle
        },
        {//实名认证
          path: 'identityResult',
          name: 'identityResult',
          meta: {
            title: ''
          },
          component: identityResult
        },
        {//邮箱提示页面
          path: 'verfifyEmail',
          name: 'verfifyEmail',
          meta: {
            title: 'verifyEmailTitle'
          },
          component: verfifyEmail
        },
        {//legal
          path: 'legal',
          name: 'legal',
          meta: {
            title: 'HomeTitle'
          },
          component: legal,
          children: [
            {//terms
              path: 'terms',
              name: 'terms',
              meta: {
                title: 'HomeTitle'
              },
              component: terms
            },
            {//privacy
              path: 'privacy',
              name: 'privacy',
              meta: {
                title: 'privacy'
              },
              component: privacy
            },
            // {//disclaimer
            //    path: 'disclaimer',
            //    name: 'disclaimer',
            //    meta: {
            //       title: 'HomeTitle'
            //    },
            //    component: disclaimer
            // },
            // {//fee
            //    path: 'fee',
            //    name: 'fee',
            //    meta: {
            //       title: 'HomeTitle'
            //    },
            //    component: fee
            // },
            {//tradingRules
              path: 'tradingRules',
              name: 'tradingRules',
              meta: {
                title: ''
              },
              component: tradingRules
            },
          ]
        },

        // {//amlKyc
        //    path: 'amlKyc',
        //    name: 'amlKyc',
        //    meta: {
        //       title: 'HomeTitle'
        //    },
        //    component: amlKyc
        // },
        // {//amlkycResult
        //    path: 'amlkycResult',
        //    name: 'amlkycResult',
        //    meta: {
        //       title: 'HomeTitle'
        //    },
        //    component: amlkycResult
        // },
        // {//editAmlKyc
        //    path: 'editAmlKyc',
        //    name: 'editAmlKyc',
        //    meta: {
        //       title: 'HomeTitle'
        //    },
        //    component: editAmlKyc
        // },
        // {//disclaimer
        //    path: 'aml',
        //    name: 'aml',
        //    meta: {
        //       title: 'HomeTitle'
        //    },
        //    component: aml
        // },
        // {
        //    path: 'about55',
        //    name: 'about55',
        //    meta: {
        //       title: 'aboutTitle'
        //    },
        //    component: About
        // },
        // {
        //    path: 'capital',
        //    name: 'capital',
        //    meta: {
        //       title: 'capital'
        //    },
        //    component: Captial
        // },
            //订单
            {
               path: 'order',
               name: 'order',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'headerOrder'
               },
               component: order
            },
            //资产
            {
               path: 'balances',
               name: 'balances',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'headerBalances'
               },
               component: balances
            },
            {
               path: 'deposit',
               name: 'deposit',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'DepositTitle'
               },
               component: deposit
            },
            {
               path: 'withdrawal',
               name: 'withdrawal',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'WithdrawalTitle'
               },
               component: withdrawal
            },
            {
               path: 'transaction_history',
               name: 'transaction_history',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'tbdhTransactionHistory'
               },
               component: transaction_history
            },
           {
             path: 'usd_fees',
             name: 'usd_fees',
             meta: {
               title: ''
             },
             component: fee
           },
            //us
            {
               path: 'deposit_usd',
               name: 'deposit_usd',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'balanceDeposit'
               },
               component: deposit_usd
            },
            {
               path: 'withdrawal_usd',
               name: 'withdrawal_usd',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'balanceWithdraw'
               },
               component: withdrawal_usd
            },
            {
               path: 'bankSetting',
               name: 'bankSetting',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  title: 'balanceBank'
               },
               component: bankSetting
            },
            {//about
               path: 'about',
               name: 'about',
               meta: {
                  title: 'about',
               },
               component: about
            },
            {
               path:"optionalRegistration",
               name:"optionalRegistration",
               meta:{
                  title: "optionalRegistration",
               },
               component: optionalRegistration
            },
            {
               path:"institutionUser",
               name:"institutionUser",
               meta:{
                  title: "institutionUser",
               },
               component: institutionUser
            },
         ]
      },
      {
         path: '*',
         name: 'error_404',
         component: () => import('@/views/error-page/404.vue')
      }
   ]
})

function checkSSOToken(to, next) {
  let loginToken = $cookies.get('loginToken');
  if (loginToken) {
    getCreateAccount({
      'ssoToken': loginToken
    }, {}).then(data => {
      if (data) {
        next()
      }
    }).catch(error => {
      if (to.name === "exchange") {
        next();
      } else {
        $cookies.remove('loginToken', '', document.domain.split('.').slice(-2).join('.'))
        clearLocalStorage()
        next({
          path: '/login'
        })
      }
    })
  } else {
    clearLocalStorage()
    next({
      path: '/login'
    })
  }
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  store.commit('CHANGEHISTORYROUTER', from.name);
  if (to.meta.title) {
    document.title = i18n.t(to.meta.title)
  } else {
    document.title = i18n.t('HomeTitle')
  }
  window.scroll(0, 0); //跳转到新页面，将页面头部置顶；
  next()
})

export default router