import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/main/Layout.vue';
import ExchangeMain from '../views/exchange/Exchange.vue';
// import HomePageMain from '../views/home/newHome.vue';
import HomePageMain from '../views/home/Home.vue';
import download from "../views/home/newHome.vue";
import Login from '../views/login/Login.vue';
import Register from '../views/login/register.vue';
import About from '../views/about/About.vue';
import buyMining from '../views/mining/buyMining.vue';
import lockWarehouseMining from '../views/mining/lockWarehouseMining.vue';
import superMiner from '../views/mining/superMiner.vue';
import reliefFee from '../views/mining/reliefFee.vue';

import Google from '../views/login/google.vue';
import Forgot from '../views/forgotPassword/forgot.vue';
import SafeVertification from '../views/forgotPassword/safeVertification.vue';
import resetNewpass from '../views/forgotPassword/resetNewpass.vue';
import safeCenter from '../views/sateCenter/safeCenter.vue';
import bandEmail from '../views/sateCenter/bandEmail.vue';
import bandPhone from '../views/sateCenter/bandPhone.vue';
import order from '../views/order/order.vue'
import balances from '../views/balances/balances.vue'
import deposit from '../views/balances/deposit.vue'
import withdrawal from '../views/balances/withdrawal.vue'
import transaction_history from '../views/balances/transaction_history.vue'
import originLoginPassword from "../views/resetLoginPassword/originPasswrod.vue";
import newPassword from "../views/resetLoginPassword/newPassword.vue";
import originTradePassword from "../views/resetTradePasswrod/originTradePassword.vue";
import newtradePassword from "../views/resetTradePasswrod/newtradePassword.vue"
import verfifyEmail from "../views/login/verifyEmail.vue";
import activeEmail from "../views/login/activeEmail.vue";
import terms from "../views/legal/terms.vue";
import privice from "../views/legal/privice.vue";
import fee from "../views/legal/fee.vue";
import disclaimer from "../views/legal/disclaimer.vue";
import setGoogle from "../views/google/setGoogle.vue";
import closeGoogle from "../views/google/closeGoogle.vue";
import identiy from "../views/identity/identity.vue"
import Test from "../views/TestUtil/Test";


//新首页
import Fhome from "../views/home/F-home/Fhome.vue";
import Bhome from "../views/home/B-home/Bhome.vue";
import Shome from "../views/home/S-home/Shome.vue";
import Lhome from "../views/home/L-home/Lhome.vue";
import Chome from "../views/home/C-home/Chome.vue";



import i18n from '@/locale/index.js';

Vue.use(Router)

const router = new Router({
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
      path: '/test',
      name: 'test',
      meta: {
          title: 'test'
      },
      component: Test
    },
      {
         path: '/',
         name: '',
         redirect: '/home',
         component: Layout,
         children: [
            {
               path: 'exchange',
               name: 'exchange',
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
               component: HomePageMain,
            },
            {
               path: 'download',
               name: 'download',
               meta: {
                  title: 'HomeTitle'
               },
               component: download,
            },
            {
               path: 'Fhome',
               name: 'Fhome',
               meta: {
                  title: 'HomeTitle'
               },
               component: Fhome,
            },
            {
               path: 'Bhome',
               name: 'Bhome',
               meta: {
                  title: 'HomeTitle'
               },
               component: Bhome,
            },
            {
               path: 'Shome',
               name: 'Shome',
               meta: {
                  title: 'HomeTitle'
               },
               component: Shome,
            },
            {
               path: 'Chome',
               name: 'Chome',
               meta: {
                  title: 'HomeTitle'
               },
               component: Chome,
            },
            {
               path: 'Lhome',
               name: 'Lhome',
               meta: {
                  title: 'HomeTitle'
               },
               component: Lhome,
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
                       title: ''
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
                     title: ''
                  },
                  component: identiy
            },
            {//邮箱提示页面
               path: 'verfifyEmail',
               name: 'verfifyEmail',
               meta: {
                  title: 'verifyEmailTitle'
               },
               component: verfifyEmail
            },
              {//terms
                path: 'terms',
                name: 'terms',
                meta: {
                  title: ''
                },
                component: terms
              },
              {//privice
                  path: 'privice',
                  name: 'privice',
                  meta: {
                    title: ''
                  },
                  component: privice
              },
              {//fee
                path: 'fee',
                name: 'fee',
                meta: {
                  title: ''
                },
                component: fee
              },
              {//disclaimer
                  path: 'disclaimer',
                  name: 'disclaimer',
                  meta: {
                    title: ''
                  },
                  component: disclaimer
              },
            //挖矿
            {
               path: 'buyMining',
               name: 'buyMining',
               meta: {
                  title: 'HeaderBuying'
               },
               component: buyMining
            },
            {
               path: 'lockWarehouseMining',
               name: 'lockWarehouseMining',
               meta: {
                  title: 'HeaderLocking'
               },
               component: lockWarehouseMining
            },
            {
               path: 'superMiner',
               name: 'superMiner',
               meta: {
                  title: 'HeaderSuperMiner'
               },
               component: superMiner
            },
            {
               path: 'about55',
               name: 'about55',
               meta: {
                  title: 'About 55'
               },
               component: About
            },
            {
               path: 'reliefFee',
               name: 'reliefFee',
               // meta: {
               //    title: 'HeaderMining'
               // },
               component: reliefFee
            },
            //订单
            {
               path: 'order',
               name: 'order',
               meta: {
                  title: 'headerOrder'
               },
               component: order
            },
            //资产
            {
               path: 'balances',
               name: 'balances',
               meta: {
                  title: 'headerBalances'
               },
               component: balances
            },
            {
               path: 'deposit',
               name: 'deposit',
               meta: {
                  title: 'DepositTitle'
               },
               component: deposit
            },
            {
               path: 'withdrawal',
               name: 'withdrawal',
               meta: {
                  title: 'WithdrawalTitle'
               },
               component: withdrawal
            },
            {
               path: 'transaction_history',
               name: 'transaction_history',
               meta: {
                  title: 'WithdrawalTitle'
               },
               component: transaction_history
            },
         ]
      },
      
   ]
})

router.beforeEach((to, from, next) => {
   /* 路由发生变化修改页面title */
   if (to.meta.title) {
      document.title = i18n.t(to.meta.title)
   }
   window.scroll(0, 0); //跳转到新页面，将页面头部置顶；
   next()
})
export default router