import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import {Exchange} from '@/interface/exchange.js'
// import {OTCJS} from '@/interface/otc.js'
import bigDecimal from 'js-big-decimal' //除法失效

import {
   getCurrencyList,
} from '_api/exchange.js'

import {
   getRealtimeList
} from '_api/balances.js'

import {
   scientificToNumber,dealNumber
} from '@/lib/utils.js'

let realTimeList = {}
let currencyPrecision = {}
let quoteList = []

let balancesList = []
let otcBalancesList = []

function currencyList() {//处理币种列表
   return new Promise((resolve) => {
      getCurrencyList().then(res => {
         res.map(v => {
            currencyPrecision[v.currency] = v.currencyPrecision//小数位数
            resolve(currencyPrecision)
         })
      })
   });
}

//行情
function getQuoteList() {
   return new Promise((resolve) => {
      getRealtimeList().then(res => {
         quoteList = res
         res.map(v => {
            realTimeList[v.symbol] = v.last
         })
         resolve(quoteList)
      })
   });
}

function getBalanceList() {
   return new Promise((resolve) => {
      //创建实例
      let ssoProvider = {};
      let exchange = new Exchange(ssoProvider);
      exchange.ssoProvider.getSsoToken = function (fn) {
         fn($cookies.get('loginToken'));
      }
      exchange.balance((res) => {
         balancesList = res
         resolve(balancesList)
      })
   });
}

// function getOtcAssetList() {
//    return new Promise((resolve) => {
//       let otcJsObj = new OTCJS()
//       otcJsObj.getAssetList((res) => {
//          otcBalancesList = res
//          resolve(otcBalancesList)
//       })
//    });
// }

function transferNumber(number, num = 8) {//保x留小数位与科学计数法转换
   if (number === '--') {
      return '--'
   } else if (number === undefined) {//逐条推送会导致有些交易对还没结果 所以需要处理undefined的情况
      return 0
   } else {
      return bigDecimal.round(scientificToNumber(number), num)
   }
}

function getValuation(balancesList) {
   return new Promise((resolve) => {
      (async () => {
         await getQuoteList()
         await function () {
            let total_USDT = 0
            let total_BTC = 0
            let legalCurrency = 0
            let value = {}
            let BTC_USDD = realTimeList['BTCUSDD']
            let ETH_USDD = realTimeList['ETHUSDD']
            let currentCurrency = JSON.parse(localStorage.getItem('currentCurrency'))

            if (balancesList.length !== 0) {
               balancesList.map(v => {
                  if (realTimeList[`${v.currency}USDD`]) {//和USDD有交易对
                     v['USDT'] = transferNumber(bigDecimal.multiply(v.total, realTimeList[`${v.currency}USDD`]), 2)
                  } else if (realTimeList[`${v.currency}USDT`]) {//和USDT有交易对
                     v['USDT'] = transferNumber(bigDecimal.multiply(v.total, realTimeList[`${v.currency}USDT`]), 2)
                  } else if (realTimeList[`${v.currency}ETH`]) {//和ETH有交易对
                     let last = realTimeList[`${v.currency}ETH`]
                     let symbolETH = bigDecimal.multiply(v.total, last)
                     v['USDT'] = transferNumber(bigDecimal.multiply(symbolETH, ETH_USDD || 0), 2)
                  } else if (v.currency === 'USDD') {//usdd本身
                     v['USDT'] = transferNumber(v.total, 2)
                  } else if (v.currency === 'USDT') {//usdt本身
                     v['USDT'] = transferNumber(v.total, 2)
                  }
                  total_USDT += Number(transferNumber(v['USDT'], 2))//usdd总值

               })
               total_BTC = transferNumber(total_USDT / BTC_USDD, 9)//btc总值
               legalCurrency = transferNumber(bigDecimal.multiply(total_USDT, currentCurrency.rate), 2)//法币估值
               value = {
                  total_BTC: total_BTC,
                  legalCurrency: legalCurrency,
                  name: currentCurrency.name
               }
               resolve(value)
            } else {
               const noValue = {
                  total_BTC: '--',
                  legalCurrency: '--',
                  name: currentCurrency.name
               }
               resolve(noValue)
            }
         }()
      })()
   });
}

export function getBalancesValuation() {
   return new Promise((resolve) => {
      (async () => {
         await currencyList()
         await getBalanceList()
         await function () {
            balancesList.map(v => {
               let precision = currencyPrecision[v.currency]
               if (v['available'] < 0.00000001) {
                  v['available'] = 0
               }
               if (v['frozen'] < 0.00000001) {
                  v['frozen'] = 0
               }

               v['total'] = dealNumber(v['available'] + v['frozen'], precision) //计算总值
               v['available'] = dealNumber(v['available'], precision)
               v['frozen'] = dealNumber(v['frozen'], precision)
            })
         }()
         let result = await getValuation(balancesList)
         resolve(result)
      })()
   });
}

// export function getOtcValuation() {
//    return new Promise((resolve) => {
//       (async () => {
//          await getOtcAssetList()
//          await function () {
//             otcBalancesList.map(balance => {
//                let precision = 6
//                balance['available'] = Number(balance['available'])
//                balance['frozen'] = Number(balance['frozen'])
//                balance['total'] = dealNumber(balance['available'] + balance['frozen'], precision)//计算总值
//                balance['available'] = dealNumber(balance['available'], precision)
//                balance['frozen'] = dealNumber(balance['frozen'], precision)
//             })
//          }()
//          let result = await getValuation(otcBalancesList)
//          resolve(result)
//       })()
//    });
// }


