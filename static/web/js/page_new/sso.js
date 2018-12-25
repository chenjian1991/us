function Sso() {
   this.tradePassword = undefined;
}

Sso.checkExpiredAble = function (expiredAble) {
   if (expiredAble) {
      //是否过期
      if (expiredAble["expiredTime"] > new Date().getTime() + 60 * 1000) {//没有过期
         return expiredAble["token"];
      }
   }
   return null;
};

Sso.RemoteUrl = {
   "ISSUED_TRADE_PASSWORD": "/user/trade_password_verify",
   "GET_USER_INFO": "/user/get_user_info",
   "SEND": "/user/sso.send",
   "CODE_VERIFY": "/user/sso.codeVerify",
   "CODE_VERIFY_withdraw": "/user/sso.withdraw.codeVerify"
};

Sso.errorMessage = {
   "en": {
      10000: "The system is busy,please contact 55 support.",
      10001: "The phone number has been used",
      10002: "The email has been used",
      10003: "Incorrect SMS code, Please try again.",
      10004: "Incorrect email code, Please try again.",
      10005: "Incorrect account or login password ",
      10006: "Incorrect google key, Please try again.",
      10007: "Incorrect login password,Please try again.",
      10008: "Incorrect google authenticator code.",
      10009: "Original password and new password can not be the same",
      10010: "8-20 characters, can't be pure numbers",
      10011: "Trading password must be 6 digits.",
      10012: "Invitation code format is incorrect.",
      10013: "Authorization is not passed, please re-verify.",
      10014: "The user does not exist, please register.",
      10015: "The password error number more than 10 times, the user is locked.",
      10016: "No trading password is set.",
      10017: "Trading password error more than 6 times, The trading password is locked.",
      10018: "Incorrect trading password, Please try again.",
      10019: "The phone number can not be empty.",
      10020: "The operation type is not correct.",
      10021: "The verification code of the day was obtained more than 10 times.",
      10022: "Incorrect phone number.",
      10023: "Request parameter exception.",
      10024: "Password error",
      10025: "Google Authentication Code error",
      10026: "Failed to send mail",
      10027: "Email Code verification code is incorrect",
      10028: "Login type is incorrect",
      10029: "Phone format is incorrect",
      10030: "Email format is incorrect",
      10031: "Please unbind the original account first.",
      10032: "Can't unbind a unique account",
      10033: "Google verification code already exists",
      10034: "Parameter error, the wrong type",
      10035: "Verification code error",
      10036: "For security purposes no withdrawals are permitted for 24 hours after modification of security methods.",
      10038: "send SMS failed"
   }, "zh-CN": {
      10000: "系统繁忙，请联系55客服。",
      10001: "该手机已被使用",
      10002: "该邮箱已被使用",
      10003: "短信验证码不正确，请重新输入。",
      10004: "邮箱验证码不正确，请重新输入。",
      10005: "登录账号或密码不正确",
      10006: "谷歌密钥不正确，请重新输入。",
      10007: "登录密码不正确，请重新输入。",
      10008: "谷歌验证码不正确",
      10009: "新设置密码与原密码相同",
      10010: "密码为8-20位的数字和字母组成",
      10011: "交易密码必须为6位数字。",
      10012: "邀请码格式不正确。",
      10013: "授权不通过，请重新验证。",
      10014: "用户不存在，请先注册。",
      10015: "账号密码错误次数超过10次，用户被锁定。",
      10016: "未设置交易密码。",
      10017: "交易密码错误次数超过6次，交易密码被锁定。",
      10018: "交易密码不正确，请重新输入。",
      10019: "手机号不能为空。",
      10020: "操作类型不正确。",
      10021: "当日验证码获取超过10次。",
      10022: "手机号码不正确。",
      10023: "请求参数异常。",
      10024: "密码错误",
      10025: "谷歌验证码错误",
      10026: "发送邮件失败",
      10027: "邮件验证码校验异常",
      10028: "登录类型错误",
      10029: "手机格式不正确",
      10030: "邮箱格式不正确",
      10031: "请先解绑原有账号",
      10032: "不能解绑唯一账号",
      10033: "谷歌验证码已经存在",
      10034: "参数错误,类型不对",
      10035: "验证码错误",
      10036: "出于安全目的，修改安全方式后24小时内不允许提款。",
      10038: "短信发送失败"
   }
};

Sso.errorHandler = function (errorResponse) {
   $(".error-msg").removeClass("dis-n").text(errorResponse);
   $(".error").fadeIn(500).fadeOut(2000);
};

Sso.remoteUrl = function (urlPath, param) {
   //$.param 生成url
   if (param) {
      var shallowEncoded = $.param(param, true);
      var shallowDecoded = decodeURIComponent(shallowEncoded);
      return "/api/sso" + urlPath + "?" + shallowDecoded;
   } else {
      return "/api/sso" + urlPath;
   }
};

Sso.remoteGET = function (urlPath, urlParam, data, handler) {
   $.ajax({
      url: Sso.remoteUrl(urlPath),
      type: "GET",
      headers: {
         "token": urlParam
      },
      data: data,
      dataType: "json",
      success: function (data) {
         if (data["code"] == 10013) {
            setTimeout(function () {
               Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')});
               localStorage.removeItem("curPage");
               localStorage.removeItem("ACCOUNT_TOKEN");
               localStorage.removeItem("ORDER_TOKEN");
               localStorage.removeItem("ASSET_TOKEN");
               localStorage.removeItem("UTIL_TOKEN");
               localStorage.removeItem("accountId");
               localStorage.removeItem("ACCOUNT_SESSION");
               localStorage.removeItem("ORDER_SESSION");
               localStorage.removeItem("ASSET_SESSION");
               localStorage.removeItem("orderTicket");
               window.location.reload();
            }, 2000)
         }
         handler(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrow) {
         //网络异常
      },
      statusCode: {
         400: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message)
         },
         500: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message);
         }
      }
   });
};

Sso.remotePOST = function (urlPath, urlParam, jsonBody, handler) {
   $.ajax({
      url: Sso.remoteUrl(urlPath),
      type: "POST",
      headers: {
         "token": urlParam
      },
      data: JSON.stringify(jsonBody),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
         if (data["code"] == 10013) {
            setTimeout(function () {
               Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')});
               localStorage.removeItem("curPage");
               localStorage.removeItem("ACCOUNT_TOKEN");
               localStorage.removeItem("ORDER_TOKEN");
               localStorage.removeItem("ASSET_TOKEN");
               localStorage.removeItem("UTIL_TOKEN");
               localStorage.removeItem("accountId");
               localStorage.removeItem("ACCOUNT_SESSION");
               localStorage.removeItem("ORDER_SESSION");
               localStorage.removeItem("ASSET_SESSION");
               localStorage.removeItem("orderTicket");
               window.location.reload();
            }, 2000)
         }
         handler(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrow) {
         //网络异常
      },
      statusCode: {
         400: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message)
         },
         500: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message);
         }
      }
   });
};

Sso.remotePOSTParam = function (urlPath, urlParam, paramBody, handler) {
   $.ajax({
      url: Sso.remoteUrl(urlPath),
      type: "POST",
      headers: {
         "token": urlParam
      },
      data: JSON.stringify(paramBody),
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
         if (data["code"] == 10013) {
            setTimeout(function () {
               Cookies.remove('loginToken', {domain: document.domain.split('.').slice(-2).join('.')});
               localStorage.removeItem("curPage");
               localStorage.removeItem("ACCOUNT_TOKEN");
               localStorage.removeItem("ORDER_TOKEN");
               localStorage.removeItem("ASSET_TOKEN");
               localStorage.removeItem("UTIL_TOKEN");
               localStorage.removeItem("accountId");
               localStorage.removeItem("ACCOUNT_SESSION");
               localStorage.removeItem("ORDER_SESSION");
               localStorage.removeItem("ASSET_SESSION");
               localStorage.removeItem("orderTicket");
               window.location.reload();
            }, 2000)
         }
         handler(data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrow) {
         //网络异常
      },
      statusCode: {
         400: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message)
         },
         500: function (XMLHttpRequest) {
            var code = JSON.parse(XMLHttpRequest["responseText"])["code"];
            var message = Sso.errorMessage[localStorage.getItem("countryLanguage")][code];
            Sso.errorHandler(message);
         }
      }
   });
};

Sso.prototype.issuedTradePassword = function (token, password, fn) {
   var _this = this;
   var tradePasswordCache = _this.tradePassword;
   var expiredAblepassword = Sso.checkExpiredAble(tradePasswordCache);
   if (expiredAblepassword) {
      fn(expiredAblepassword);
      return;
   }
   Sso.remotePOSTParam(Sso.RemoteUrl.ISSUED_TRADE_PASSWORD, token, {
      "password": password
   }, function (data) {
      _this.tradePassword = data;
      fn(data);
   });
};

Sso.prototype.getUserInfo = function (token, fn) {
   Sso.remotePOSTParam(Sso.RemoteUrl.GET_USER_INFO, token, null, function (data) {
      fn(data);
   });
};

Sso.prototype.send = function (token, codeType, language, withdrawAmount, withdrawAddress, fn) {
   Sso.remotePOST(Sso.RemoteUrl.SEND, token, {
      "operateType": "WITHDRAW",
      "codeType": codeType,
      "language": language,
      "withdrawAmount": withdrawAmount,
      "withdrawAddress": withdrawAddress
   }, function (data) {
      fn(data);
   });
};

Sso.prototype.codeVerify = function (token, phoneCode, googleCode, fn) {
   Sso.remotePOST(Sso.RemoteUrl.CODE_VERIFY, token, {
      "phoneCode": phoneCode,
      "googleCode": googleCode,
      "codeType": "PHONE",
      "operateType": "WITHDRAW"
   }, function (data) {
      fn(data);
   });
};


Sso.prototype.codeVerifyWithdraw = function (token, phoneCode, emailCode, googleCode, fn) {
   Sso.remotePOST(Sso.RemoteUrl.CODE_VERIFY_withdraw, token, {
      "phoneCode": phoneCode,
      "emailCode": emailCode,
      "googleCode": googleCode
   }, function (data) {
      fn(data);
   });
};
