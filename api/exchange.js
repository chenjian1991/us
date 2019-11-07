import {getApi, postBaseApi, postHeaderTokenBodyApi, postFormDataApi,getHeaderTokenApi} from './axios'
// postApi
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import {
   symbolList,
   depthList,
   createAccount,
   createToken,
   accountInfo,
   balanceList,
   symbolList_realtime,
   openList,
   completedList,
   createSession,
   cancelOrder,
   createOrderId,
   createPasswordToken,
   createOrder,
   createGBBOOrder,
   historicalTimeRange,
   summarizedTimeRange,
   activityList,
   filled,
   currencyList,
   identify,
   queryAddress,
   withdrawAddressList,
   createWithdrawAddress,
   deleteWithdrawAddress,
   createWithdraw,
   createTicket,
   FFfee,
   queryFavoritesPair,
   updateFavoritesPair,
   deleteFavoritesPair,
   completedList_v2,
   filledList_v2,
   userInfo
} from './urls'

const checkExpiredAble = (expiredAble) => {
   if (expiredAble) {
      //是否过期
      if (expiredAble["expiredAt"] > new Date().getTime() + 60 * 1000) {//没有过期
         return expiredAble["value"];
      }
   }
   return null;
};
// 获取用户信息
export const getUserInfo = (token) => {
   return postHeaderTokenBodyApi(userInfo, token, {})
}
//下单交易对
export const getSymbolList = () => {
   return getApi(symbolList)
}
//币种列表
export const getCurrencyList = () => {
   return getApi(currencyList)
}
//获取收藏币种
export const getQueryFavoritesPair = (token) => {
   return getHeaderTokenApi(queryFavoritesPair,{},token)
}
//更新收藏币种
export const getUpdateFavoritesPair = (token,data) => {
   return postHeaderTokenBodyApi(updateFavoritesPair,token,data)
}
//删除收藏币种
export const getDeleteFavoritesPair = (arr) => {
   return postHeaderTokenBodyApi(deleteFavoritesPair,$cookies.get('loginToken'),arr)
}
//行情交易对
export const getSymbolList_realtime = () => {
   return new Promise((resolve,reject) =>{
      getApi(symbolList_realtime).then(res=>{
         let arr = res.filter(item => {
            if(item.quoteAsset == 'USDT'){
               return false
            }
            return true
         })
         resolve(arr)
      }).catch(err =>{
         reject(err)
      })
   })
}


export const getdepthList = (params) => {
   return getApi(depthList, params)
}

//创建用户的 Token  
export const getCreateAccount = (params, data) => {
   return postBaseApi(createAccount, params, data)
}
//创建session
export const getCreateSession = (params, data) => {
   return postBaseApi(createSession, params, data)
}

export const getCreateToken = (params, data) => {
   return postBaseApi(createToken, params, data)
}
export const getAccountInfo = (params) => {
   return getApi(accountInfo, params)
}
//ff手续费折扣
export const getFFfeesMethod =(params,data)=>{
   return postFormDataApi(FFfee,params,data)
}

export const getBalanceList = (params) => {
   return getApi(balanceList, params)
}

export const getActivityList = (params) => {
   return getApi(activityList, params)
}

//充值地址
export const address = (params) => {
   return getApi(queryAddress, params)
}
//提现地址列表
export const getwithdrawAddressList = (params) => {
   return getApi(withdrawAddressList, params)
}
//添加提现地址
export const withdrawAddress = (params, data) => {
   return postFormDataApi(createWithdrawAddress, params, data)
}
//删除提现地址
export const deleteAddress = (params, data) => {
   return postFormDataApi(deleteWithdrawAddress, params, data)
}
//创建资产ticket
export const getCreateTicket = (params, data) => {
   return postFormDataApi(createTicket, params, data)
}
//提现
export const withdraw = (params, data) => {
   return postBaseApi(createWithdraw, params, data)
}

//查询用户实名
export const getIdentify = (params) => {
   return getHeaderTokenApi(identify, '',params)
}
//获取完全成交和已经撤单的列表 
export const getCompletedList = (params) => {
   return getApi(completedList, params)
}
//获取完全成交和已经撤单的列表--筛选
export const getCompletedList_v2 = (params) => {
   return getApi(completedList_v2, params)
}

//交易明细--筛选
export const getFilledList_v2 = (params) => {
   return getApi(filledList_v2, params)
}
//撤单
export const getCancelOrder = (params, data) => {
   return postBaseApi(cancelOrder, params, data)
}
//订未成交的的订单
export const getOpenList = (params) => {
   return getApi(openList, params)
}
//订单明细
export const getFilled = (params) => {
   return getApi(filled, params)
}
//创建ticket
export const getCreateOrderId = (params, data) => {
   return postFormDataApi(createOrderId, params, data)
}
//创建订单
export const getCreateOrder = (params, data) => {
   return postBaseApi(createOrder, params, data)
}
//创建GBBO订单
export const getCreateGBBOOrder = (params, data) => {
   return postBaseApi(createGBBOOrder, params, data)
}

//签发交易密码
export const getCreatePasswordToken = (ssoToken, data) => {
   return postHeaderTokenBodyApi(createPasswordToken, ssoToken, data)
}

//****************K线 */
export const getHistoricalTimeRange = (params) => {
   return getApi(historicalTimeRange, params)
}
export const getSummarizedTimeRange = (params) => {
   return getApi(summarizedTimeRange, params)
}


//封装SSE
export function SSEsource(url, query) {
   this._sseSource = null;
   this._url = url;
   this._query = query
}

SSEsource.prototype.initial = function () {
   if (!this._sseSource) {
      let baseURL = window.location.protocol + '//' + window.location.host
      this._sseSource = new EventSource(`${baseURL}${this._url}?${this._query}`)
      this._sseSource.onopen = function (e) {
         console.log(url + '推送连接已经建立:', this.readyState);
      }
   }
   return this._sseSource;
}
SSEsource.prototype.success = function (fn) {
   const sse = this.initial();
   sse.addEventListener('_SUCCESS', function (e) {
      //每次推送一条记录
      let result = JSON.parse(e.data).result
      fn(result)
   })
}
SSEsource.prototype.error = function () {
   const sse = this.initial();
   sse.addEventListener('_ERROR', function (e) {
      console.log('sse连接错误！')
   })
}
SSEsource.prototype.close = function (fn) {
   const sse = this.initial();
   sse.close();
   this._sseSource = null;
}
