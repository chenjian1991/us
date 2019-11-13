import {sha256} from 'js-sha256'
import {
   getTokenByKey as getValue,
   setLocalStorage as setValue,
} from '@/lib/utils.js'
import store from '@/store/index'
import {clearLocalStorage} from '@/config'

import {
   getCreateAccount,
   getAccountInfo,
   getCreateToken,
   getBalanceList,
   getOpenList,
   getCompletedList,
   getCreateSession,
   getCancelOrder,
   getCreateOrderId,
   getCreatePasswordToken,
   getCreateOrder,
   getCreateGBBOOrder,
   getFilled,
   //挖矿
   getQueryRewardFilledBuyBrief,
   getActivityList,
   getQueryRewardLockedAssetBrief,
   getCreateLocked,
   getListLocked,
   queryUsdt2usdd,
   exchangeUsdt2usdd,
   queryUSDDInterest,
   address,
   getwithdrawAddressList,
   withdrawAddress,
   deleteAddress,
   withdraw,
   getCreateTicket,
   getFFfeesMethod,
   //韩国挖矿
   queryGroupDetail,
   queryMiningflag,
   getCompletedList_v2,
   getFilledList_v2,
} from '_api/exchange.js'
//韩国挖矿
import _ from 'lodash'

export function Exchange(ssoProvider) {
   //config
   this.ssoProvider = ssoProvider;
   if (!this.ssoProvider["getSsoToken"]) {
      this.ssoProvider["getSsoToken"] = new Function();
   }
   // this.ssoProvider["getExtension"] = undefined;
   this.ssoProvider["getWithdrawExtension"] = undefined;

   //page cache
   this.accountId = undefined;
   this.tokenCache = {};//ExpireAbleValue
   this.sessionCache = {};
   this.orderTicket = undefined;
   this.tradePassword = undefined;//交易密码Token
   this.userPassWord = undefined

}

Exchange.TokenType = {
   "ORDER": "ORDER",
   "ASSET": "ASSET",
   "ACCOUNT": "ACCOUNT",
   "UTIL": "UTIL"
};

Exchange.type = {
   'OUTGOING': 'OUTGOING',
   'INCOMING': 'INCOMING'
}

Exchange.actionType = {
   'REWARD_FILLED_BUY': 'REWARD_FILLED_BUY',
   'REWARD_LOCKED_ASSET': 'REWARD_LOCKED_ASSET',
   'WALLET_INCOMING': 'WALLET_INCOMING',
   'ACCOUNT_CLIENT_WITHDRAW': 'ACCOUNT_CLIENT_WITHDRAW',
   'ADMIN_DIRECT_INCOMING': 'ADMIN_DIRECT_INCOMING',
   'ADMIN_DIRECT_OUTGOING': 'ADMIN_DIRECT_OUTGOING'
}

Exchange.status = {
   'SUBMITTED': 'SUBMITTED',
   'COMPLETED': 'COMPLETED',
   'CANCELLED': 'CANCELLED'
}

Exchange.userClientInfo = function () {
   return {};
};
Exchange.checkExpiredAble = function (expiredAble) {
   if (expiredAble) {
      //是否过期
      if (expiredAble["expiredAt"] > new Date().getTime() + 60 * 1000) {//没有过期
         return expiredAble["value"];
      }
   }
   return null;
};
Exchange.checkExpiredAblePassWord = function (expiredAble) {
   if (expiredAble) {
      //是否过期
      if (expiredAble["expiredTime"] > new Date().getTime() + 60 * 1000) {//没有过期
         return expiredAble["token"];
      }
   }
   return null;
};

//*************** */
Exchange.prototype.getAccountToken = function (fn) {
   var _this = this;
   var tokenCache = _this.tokenCache[Exchange.TokenType.ACCOUNT];
   var expiredAbleToken = Exchange.checkExpiredAble(tokenCache);

   if (expiredAbleToken) {
      fn(expiredAbleToken);
      return;
   } else if (getValue("ACCOUNT_TOKEN")) {
      fn(getValue("ACCOUNT_TOKEN"));
      return;
   }

   _this.ssoProvider.getSsoToken(function (_ssoToken) {
      getCreateAccount({'ssoToken': _ssoToken}, Exchange.userClientInfo()).then(data => {
         if (data) {
            _this.tokenCache[Exchange.TokenType.ACCOUNT] = data;
            setValue("ACCOUNT_TOKEN", data);
            fn(data["value"]);
         }
      }).catch(error => {
         clearLocalStorage()
         store.commit('changeLoingStatus', false);
         //取消登录的状态
      })

      // Exchange.remotePOST(Exchange.RemoteUrl.CREATE_ACCOUNT_TOKEN, {
      //     "ssoToken": _ssoToken
      // }, Exchange.userClientInfo(), function (data) {
      //     _this.tokenCache[Exchange.TokenType.ACCOUNT] = data;
      //     setValue("ACCOUNT_TOKEN", data);
      //     fn(data["value"]);
      // })
   });
};
Exchange.prototype.getAccountId = function (fn) {
   var _this = this;
   if (_this.accountId) {
      fn(_this.accountId);
      return;
   }
   else if (localStorage.getItem("accountId")) {
      fn(localStorage.getItem("accountId"));
      return;
   }
   _this.getAccountToken(function (_accountToken) {
      getAccountInfo({token: _accountToken}).then(data => {
         _this.accountId = data["accountId"];
         localStorage.setItem("accountId", data["accountId"]);
         fn(data["accountId"]);
      })
   })
};

//获取账户信息
Exchange.prototype.getAccountInfo = function (fn) {
   var _this = this;
   _this.getAccountToken(function (_accountToken) {
      getAccountInfo({token: _accountToken}).then(data => {
         fn(data);
      })
   })
};

Exchange.prototype.getToken = function (tokenType, fn) {
   var _this = this;
   var cacheToken = _this.tokenCache[tokenType];
   var able = Exchange.checkExpiredAble(cacheToken);

   //是否有tokenType缓存
   if (able) {
      fn(able);
      return;
   } else if (getValue(tokenType + "_TOKEN")) {
      fn(getValue(tokenType + "_TOKEN"));
      return;
   }

   //是否有otherType缓存
   var _cacheAbleToken = null;
   _.forIn(_this.tokenCache, function (v, k) {
      if (k != tokenType) {
         var cacheToken = Exchange.checkExpiredAble(v);
         if (cacheToken) {
            _cacheAbleToken = cacheToken;
            return false;
         } else if (getValue(k + "_TOKEN")) {
            _cacheAbleToken = getValue(k + "_TOKEN");
            return false;
         }
      }
   });
   if (_cacheAbleToken) {
      remoteToken(_cacheAbleToken);
   } else {
      //如果都没有可用的有效token，那么就从accountToken开始签发
      _this.getAccountToken(function (_accountToken) {
         remoteToken(_accountToken);
      });
   }

   function remoteToken(token) {
      _this.getAccountId(function (_accountId) {
         getCreateToken({token: token}, {accountId: _accountId, tokenType: tokenType}).then(data => {
            //建立缓存
            _this.tokenCache[tokenType] = data;
            setValue(tokenType + "_TOKEN", data);
            fn(data["value"]);
         })
      })
   };
};
Exchange.prototype.getOrderTicket = function (fn) {
   var _this = this;
   // var cacheSession = _this.orderTicket;
   // var expiredAbleSession = Exchange.checkExpiredAble(cacheSession);
   // if (expiredAbleSession) {
   //     fn(expiredAbleSession);
   //     _this.orderTicket = undefined;
   //     return;
   // } else if (getValue("orderTicket")) {
   //     fn(getValue("orderTicket"));
   //     remove("orderTicket");
   //     return;
   // }

   _this.getAccountId(function (_accountId) {
      _this.getSession(Exchange.TokenType.ORDER, function (_orderSession) {
         getCreateOrderId({'session': _orderSession}, {'accountId': _accountId}).then(data => {
            fn(data["value"]);
         })
      })
   })
};

Exchange.prototype.getSession = function (tokenType, fn) {
   //查本地缓存
   var _this = this;
   var cacheSession = this.sessionCache[tokenType];
   var expiredAbleSession = Exchange.checkExpiredAble(cacheSession);
   if (expiredAbleSession) {
      fn(expiredAbleSession);
      return;
   }
   else if (getValue(tokenType + "_SESSION")) {
      fn(getValue(tokenType + "_SESSION"));
      return;
   }
   _this.getAccountId(function (_accountId) {
      _this.getToken(tokenType, function (_typeToken) {
         _this.ssoProvider.getSsoToken(function (_ssoToken) {
            _this.issuedTradePassword(_ssoToken, _this.userPassWord, function (passwordToken) {
               getCreateSession({'token': _typeToken}, {
                  'accountId': _accountId,
                  'extension': passwordToken
               }).then(data => {
                  _this.sessionCache[tokenType] = data;
                  setValue(tokenType + "_SESSION", data);
                  fn(data["value"]);
               })
            })
         })

      })
   })
};
Exchange.prototype.issuedTradePassword = function (token, password, fn) {
   var _this = this;
   var tradePasswordCache = _this.tradePassword;
   var expiredAblepassword = Exchange.checkExpiredAblePassWord(tradePasswordCache);
   if (expiredAblepassword) {
      fn(expiredAblepassword);
      return;
   } else if (getValue("PASSWORDTOKEN")) {
      fn(getValue("PASSWORDTOKEN"))
      return;
   }
   getCreatePasswordToken(token, {
      userId: localStorage.getItem('loginUserId'),
      "password": password ? sha256(password) : password,
   }).then(data => {
      fn(data.result);
   })
};
Exchange.prototype.listOpenOrder = function (fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ORDER, function (_orderToken) {
         getOpenList({"token": _orderToken, "accountId": _accountId}).then(data => {
            fn(data);
         })
      })
   })
};

Exchange.prototype.listCompletedOrder = function (page, fn) {
   var _this = this;
   var page = page || 1;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ORDER, function (_orderToken) {
         getCompletedList({"token": _orderToken, "accountId": _accountId, page: page, limit: 10}).then(data => {
            fn(data);
         })
      })
   })
};

//订单筛选
Exchange.prototype.listCompleted_v2Order = function (params, fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ORDER, function (_orderToken) {
         getCompletedList_v2(
            Object.assign(
               {
                  "token": _orderToken,
                  "accountId": _accountId,
                  forward: false,
                  limit: 11,
               }, params)).then(data => {
            fn(data);
         })
      })
   })
};

Exchange.prototype.getFilledList_v2Order = function (params, fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ORDER, function (_orderToken) {
         getFilledList_v2(
            Object.assign(
               {
                  "token": _orderToken,
                  "accountId": _accountId,
                  forward: false,
                  limit: 11,
               }, params)).then(data => {
            fn(data);
         })
      })
   })
};


//sse 推送订单详情
Exchange.prototype.listFilledOrder = function (fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ORDER, function (_orderToken) {
         fn(_orderToken, _accountId)
      })
   })
};

Exchange.prototype.createNewOrder = function (orderInfo, userpassword, fn, errorFn) {
   var _this = this;
   if (userpassword) {
      _this.userPassWord = userpassword
   }
   _this.getAccountId(function (_accountId) {
      _this.getSession(Exchange.TokenType.ORDER, function (_orderSession) {
         _this.getOrderTicket(function (_orderId) {
            getCreateOrder({"session": _orderSession}, {
               "accountId": _accountId,
               "orderId": _orderId,
               "orderInfo": orderInfo
            }).then(
               data => {
                  fn(data)
               }
            ).catch(data => {
               errorFn(data)
            })
         })
      })
   })
};
Exchange.prototype.createGBBOOrder = function (orderInfo, userpassword, fn, errorFn) {
   debugger
   var _this = this;
   if (userpassword) {
      _this.userPassWord = userpassword
   }
   _this.getAccountId(function (_accountId) {
      _this.getSession(Exchange.TokenType.ORDER, function (_orderSession) {
         debugger
         // _this.getOrderTicket(function (_orderId) {
         const userId = localStorage.getItem('ex55Pin')
         const fourRandDigit = Math.floor(Math.random() * (999 - 100)) + 100
         const orderId = `${userId}${new Date().getTime()}${fourRandDigit}`
         getCreateGBBOOrder({"session": _orderSession}, {
            "accountId": _accountId,
            "orderId": orderId,
            "orderInfo": orderInfo
         }).then(
            data => {
               fn(data)
            }
         ).catch(data => {
            errorFn(data)
         })
         // })
      })
   })
};

Exchange.prototype.cancelOrder = function (orderId, userpassword, fn) {
   var _this = this;
   if (userpassword) {
      _this.userPassWord = userpassword
   }
   _this.getAccountId(function (_accountId) {
      _this.getSession(Exchange.TokenType.ORDER, function (_orderSession) {
         getCancelOrder({"session": _orderSession}, {"accountId": _accountId, "orderId": orderId}).then(data => {
            fn(data);
         })
      })
   })
};

Exchange.prototype.balance = function (fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         getBalanceList({"token": _assetToken, "accountId": _accountId}).then(data => {
            fn(data);
         })
      })
   })
};
//ff手续费折扣方法
Exchange.prototype.getFFfees = function (available, fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getAccountToken(function (_accountToken) {
         getFFfeesMethod({token: _accountToken}, {'accountId': _accountId, 'available': available}).then(data => {
            fn(data)// 参数是个函数，在函数里面处理data；
         })
      })
   })
}

Exchange.prototype.activityList = function (activity, currency, fn) {
   var params = {}
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         params = {
            "token": _assetToken,
            "accountId": _accountId,
            type: activity.type,
            page: activity.page,
            limit: activity.limit,
         }
         params[currency] = 'USD'
         if (activity.actionType) {
            params['actionType'] = activity.actionType
         }
         if (activity.status) {
            params['status'] = activity.status
         }
         if (activity.startTimeDate) {
            params['startTimeDate'] = activity.startTimeDate
         }
         if (activity.endTimeDate) {
            params['endTimeDate'] = activity.endTimeDate
         }
         getActivityList(params).then(data => {
            fn(data);
         })
      })
   })
};

//充值地址
Exchange.prototype.deposit = function (currency, fn, errorFn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         address({
            "token": _assetToken,
            "currency": currency,
            "accountId": _accountId
         }).then(data => {
            fn(data);
         }).catch(data => {
            errorFn(data)
         })
      })
   })
};

//USD充值地址
Exchange.prototype.depositUSD = function (currency, amount, fn, errorFn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         address({
            "token": _assetToken,
            "currency": currency,
            "amount": amount,
            "accountId": _accountId
         }).then(data => {
            fn(data);
         }).catch(data => {
            errorFn(data)
         })
      })
   })
};

//提现地址列表
Exchange.prototype.withdrawAddress = function (currency, fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.UTIL, function (_utilToken) {
         getwithdrawAddressList({
            "token": _utilToken,
            "currency": currency,
            "accountId": _accountId
         }).then(data => {
            fn(data);
         })
      })
   })
};
//添加提现地址
Exchange.prototype.createWithdrawAddress = function (currency, friendlyName, address, fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.UTIL, function (_utilToken) {
         withdrawAddress({
            "token": _utilToken,
            "currency": currency,
            "accountId": _accountId,
            "friendlyName": friendlyName,
            "address": address,
         }).then(data => {
            fn(data);
         }).catch(data => {
            fn(data);
         })
      })
   })
};
//删除提现地址
Exchange.prototype.deleteWithdrawAddress = function (currency, friendlyName, address, fn, errorFn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.UTIL, function (_utilToken) {
         deleteAddress({
            "token": _utilToken,
            "currency": currency,
            "accountId": _accountId,
            "friendlyName": friendlyName,
            "address": address,
         }).then(data => {
            fn(data);
         }).catch(data => {
            errorFn(data);
         })
      })
   })
};
//提现session
Exchange.prototype.getWithdrawSession = function (tokenType, fn) {
   //查本地缓存
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(tokenType, function (_typeToken) {
         getCreateSession({'token': _typeToken}, {
            'accountId': _accountId,
            'extension': _this.ssoProvider["getWithdrawExtension"]
         }).then(data => {
            fn(data["value"]);//不用缓存 每次提币都需要验证码
         })
      })
   })
};
//提现ticket
Exchange.prototype.getAssetTicket = function (fn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         getCreateTicket({'token': _assetToken}, {'accountId': _accountId}).then(data => {
            fn(data["value"]);
         })
      })
   })
};

Exchange.prototype.withdraw = function (currency, address, amount, fee, fn, errorFn) {
   var _this = this;
   _this.ssoProvider.getSsoToken(function (_ssoToken) {
      _this.getAccountId(function (_accountId) {
         _this.getWithdrawSession(Exchange.TokenType.ASSET, function (_assetSession) {
            _this.getAssetTicket(function (_assetTicket) {
               withdraw({"ssoToken": _ssoToken, "session": _assetSession}, {
                  "currency": currency,
                  "accountId": _accountId,
                  "ticket": _assetTicket,
                  "address": address,
                  "amount": amount,
                  "fee": fee
               }).then(data => {
                  fn(data);
               }).catch(data => {
                  errorFn(data);
               });
            })
         })
      })
   })
};

//USD提现
Exchange.prototype.withdrawUSD = function (currency, address, amount, fee, fn, errorFn) {
   var _this = this;
   _this.getAccountId(function (_accountId) {
      _this.getToken(Exchange.TokenType.ASSET, function (_assetToken) {
         _this.getAssetTicket(function (_assetTicket) {
            withdraw({"token": _assetToken}, {
               "currency": currency,
               "accountId": _accountId,
               "ticket": _assetTicket,
               "address": address,
               "amount": amount,
               "fee": fee
            }).then(data => {
               fn(data);
            }).catch(data => {
               errorFn(data);
            });
         })
      })
   })
};

