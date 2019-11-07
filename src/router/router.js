import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/main/Layout.vue';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

import store from '../store/index'
import {getCreateAccount} from '_api/exchange.js'
import {clearLocalStorage} from '@/config'

//zmw
const balances = () => import('../views/newBalances/balances.vue')
const deposit = () => import('../views/newBalances/deposit.vue')
const withdrawal = () => import('../views/newBalances/withdrawal.vue')
const transaction_history = () => import('../views/newBalances/transactionHistory.vue')
const order = () => import('../views/newBalances/order.vue')
const kyc = () => import('../views/kyc/kyc.vue')

const index = () => import('../views/home/index.vue')
const ExchangeGBBO = () => import('../views/exchangeGBBO/Exchange.vue')
const ExchangeMain = () => import('../views/exchangeGBBO/Exchange.vue')

const Login = () => import('../views/login/Login.vue')
const Register = () => import('../views/login/register.vue')
const About = () => import('../views/about/About.vue')

import Google from '../views/login/google.vue';
import Forgot from '../views/forgotPassword/forgot.vue';
import SafeVertification from '../views/forgotPassword/safeVertification.vue';
import resetNewpass from '../views/forgotPassword/resetNewpass.vue';
import safeCenter from '../views/sateCenter/safeCenter.vue';
import bandEmail from '../views/sateCenter/bandEmail.vue';
import bandPhone from '../views/sateCenter/bandPhone.vue';


import originLoginPassword from "../views/resetLoginPassword/originPasswrod.vue";
import newPassword from "../views/resetLoginPassword/newPassword.vue";
import originTradePassword from "../views/resetTradePasswrod/originTradePassword.vue";
import newtradePassword from "../views/resetTradePasswrod/newtradePassword.vue"
import verfifyEmail from "../views/login/verifyEmail.vue";
import activeEmail from "../views/login/activeEmail.vue";
import terms from "../views/legal/terms.vue";
import legal from "../views/legal/legal.vue";
import tradingRules from "../views/legal/TradingRules.vue";
import privacy from "../views/legal/privice.vue";
import fee from "../views/legal/fee.vue";
import disclaimer from "../views/legal/disclaimer.vue";
import aml from "../views/legal/aml.vue";
import setGoogle from "../views/google/setGoogle.vue";
import closeGoogle from "../views/google/closeGoogle.vue";
import identiy from "../views/identity/identity.vue"
import identityResult from "../views/identity/identityResult.vue"

//usdd
import FF from "../views/FF/FF.vue";
import stock from "../views/assestInfo/s/stock.vue"
import cinfo from "../views/assestInfo/c/CInfo.vue"

import StockToken from "../views/tongzheng/s/stock.vue"
//aml
import amlKyc from '../views/aml/amlkyc.vue';
import amlkycResult from '../views/aml/amlkycResult.vue';
import editAmlKyc from "../views/aml/editAmlKyc.vue";

//us balance
import deposit_usd from '../views/balances/deposit_usd.vue'
import withdrawal_usd from '../views/balances/withdrawal_usd.vue'
import bankSetting from '../views/balances/bankSetting.vue'

const interFinanceOne = () => import( '../views/interFinance/interFinanceOne.vue')
const interFinanceTWO = () => import( '../views/interFinance/interFinanceTWO.vue')
const interFinanceThree = () => import( '../views/interFinance/interFinanceThree.vue')

//header toggle
const whyus = () => import('../views/headerToggle/whyus.vue')
const crypto = () => import('../views/headerToggle/criptoTrading.vue')
const smartexecution = () => import('../views/headerToggle/smartexecution.vue')
const termsfront = () => import('../views/headerToggle/terms.vue')
const faqs = () => import('../views/headerToggle/faqs.vue')
const ourcompany = () => import('../views/headerToggle/ourcompany.vue')
const team = () => import('../views/headerToggle/TheTeam.vue')
const contactus = () => import('../views/headerToggle/contactus.vue')
const about = () => import('../views/about/about_new.vue')



import download from "../views/download/download.vue";
const Captial = () => import('../views/captial/Captial.vue')

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
         path: '/download',
         name: 'download',
         meta: {
            title: 'HomeTitle'
         },
         component: download,
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
               path: '/exchangeGBBO',
               name: 'exchangeGBBO',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  // title:'HomeTokenExchange'
               },
               component: ExchangeGBBO,
            },
            {
               path: '/exchange',
               name: 'exchange',
               beforeEnter: (to, from, next) => {
                  checkSSOToken(to, next)
               },
               meta: {
                  // title:'HomeTokenExchange'
               },
               component: ExchangeMain,
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
               path: 'whyus',
               name: 'whyus',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: whyus,
            },
            {
               path: 'crypto',
               name: 'crypto',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: crypto,
            },
            {
               path: 'smartexecution',
               name: 'smartexecution',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: smartexecution,
            },
            {
               path: 'termsfront',
               name: 'termsfront',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: termsfront,
            },
            {
               path: 'faqs',
               name: 'faqs',
               meta: {
                  title: 'FAQ'
               },
               component: faqs,
            },
            {
               path: 'ourcompany',
               name: 'ourcompany',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: ourcompany,
            },
            {
               path: 'team',
               name: 'team',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: team,
            },
            {
               path: 'contactus',
               name: 'contactus',
               meta: {
                  title: '55 Trade - Buy and Sell Crypto at Our Most Competitive Pricing'
               },
               component: contactus,
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
               path: 'originLoginPassword',
               name: 'originLoginPassword',
               meta: {
                  title: 'ChangePasswordTitle'
               },
               component: originLoginPassword
            },
            {//修改登录密码
               path: 'newPassword',
               name: 'newPassword',
               meta: {
                  title: 'ChangePasswordTitle'
               },
               component: newPassword
            },
            {//修改交易密码
               path: 'originTradePassword',
               name: 'originTradePassword',
               meta: {
                  title: 'ResetTradePasswordTitle'
               },
               component: originTradePassword
            },
            {//修改交易密码
               path: 'newtradePassword',
               name: 'newtradePassword',
               meta: {
                  title: 'ResetTradePasswordTitle'
               },
               component: newtradePassword
            },
            {//设置谷歌验证
               path: 'setGoogle',
               name: 'setGoogle',
               meta: {
                  title: 'HomeTitle'
               },
               component: setGoogle
            },
            {//关闭谷歌验证
               path: 'closeGoogle',
               name: 'closeGoogle',
               meta: {
                  title: ''
               },
               component: closeGoogle
            },
            {//实名认证
               path: 'identiy',
               name: 'identiy',
               meta: {
                  title: 'HomeTitle'
               },
               component: identiy
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
                  {//disclaimer
                     path: 'disclaimer',
                     name: 'disclaimer',
                     meta: {
                        title: 'HomeTitle'
                     },
                     component: disclaimer
                  },
                  {//fee
                     path: 'fee',
                     name: 'fee',
                     meta: {
                        title: 'HomeTitle'
                     },
                     component: fee
                  },
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

            {//amlKyc
               path: 'amlKyc',
               name: 'amlKyc',
               meta: {
                  title: 'HomeTitle'
               },
               component: amlKyc
            },
            {//amlkycResult
               path: 'amlkycResult',
               name: 'amlkycResult',
               meta: {
                  title: 'HomeTitle'
               },
               component: amlkycResult
            },
            {//editAmlKyc
               path: 'editAmlKyc',
               name: 'editAmlKyc',
               meta: {
                  title: 'HomeTitle'
               },
               component: editAmlKyc
            },
            {//disclaimer
               path: 'aml',
               name: 'aml',
               meta: {
                  title: 'HomeTitle'
               },
               component: aml
            },
            {
               path: 'about55',
               name: 'about55',
               meta: {
                  title: 'aboutTitle'
               },
               component: About
            },
            {
               path: 'capital',
               name: 'capital',
               meta: {
                  title: 'capital'
               },
               component: Captial
            },
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
            {//FF
               path: 'FF',
               name: 'FF',
               meta: {
                  title: 'HomeTitle'
               },
               component: FF
            }, {//stock
               path: 'stock',
               name: 'stock',
               meta: {
                  title: 'HomeTitle'
               },
               component: stock
            }, {//usdd
               path: 'cinfo',
               name: 'cinfo',
               meta: {
                  title: 'HomeTitle'
               },
               component: cinfo
            },
            {//usdd
               path: 'StockToken',
               name: 'cintongzhengStockfo',
               meta: {
                  title: 'HomeTitle'
               },
               component: StockToken
            },
            {//interFinance
               path: 'interFinanceOne',
               name: 'interFinanceOne',
               meta: {
                  title: 'HomeTitle'
               },
               component: interFinanceOne
            },
            {//interFinance
               path: 'interFinanceTWO',
               name: 'interFinanceTWO',
               meta: {
                  title: 'HomeTitle'
               },
               component: interFinanceTWO
            },
            {//interFinance
               path: 'interFinanceThree',
               name: 'interFinanceThree',
               meta: {
                  title: 'HomeTitle'
               },
               component: interFinanceThree
            },
            {//about
               path: 'about',
               name: 'about',
               meta: {
                  title: 'about',
               },
               component: about
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