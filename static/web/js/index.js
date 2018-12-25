//封装过期控制代码
function setValue(key, data) {
   localStorage.setItem(key, JSON.stringify({
      value: data.value,
      time: new Date(data["expiredAt"]).getTime()
   }));
}

function getValue(key) {
   var data = JSON.parse(localStorage.getItem(key));
   if (data) {
      if (data.time - new Date().getTime() < 60 * 1000) {
         localStorage.removeItem(key);
      } else {
         return data.value;
      }
   }
}

function remove(key) {
   localStorage.removeItem(key);
}

//转换时间成本地时间
function transform_date(data) {
   var date = new Date(data);
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();
   month >= 10 ? null : month = "0" + month;
   day >= 10 ? null : day = "0" + day;
   var localeDate = year + "-" + month + "-" + day
      + " " + date.toTimeString().slice(0, 8);
   return localeDate;
}

function scientificToNumber(num) {
   var str = num.toString();
   var reg = /^(\d+\.?\d*)(e)([\-]?\d+)$/;
   var arr, len,
      zero = '';

   /*6e7或6e+7 都会自动转换数值*/
   if (!reg.test(str)) {
      return num;
   } else {
      /*6e-7 需要手动转换*/
      arr = reg.exec(str);
      len = Math.abs(arr[3]) - 1;
      for (var i = 0; i < len; i++) {
         zero += '0';
      }
      return '0.' + zero + arr[1].replace('.', '');
   }
}

//科学计算法转化数字
function transferNumber(num, precision) {
   var transferNum = 0;
   if (num.toString().indexOf("e") > 0) {
      num = num.toString();
      var index = num.indexOf("e");
      var leftNum = num.slice(0, index);
      var rightNum = num.slice(index + 2);
      var pow = new BigDecimal(Math.pow(10, rightNum).toString());
      if (num.slice(index + 1, index + 2) == "-") {
         if (rightNum < precision) {
            transferNum = new BigDecimal(keepDecimals(leftNum.slice(0, precision - rightNum + 2), precision)).divide(pow).toString();
         } else if (rightNum == precision) {
            transferNum = new BigDecimal(keepDecimals(leftNum.slice(0, 1), precision)).divide(pow).toString();
         } else {
            transferNum = keepDecimals(0, precision)
         }
      }
   } else {
      transferNum = keepDecimals(num, precision);
   }
   return transferNum;//返回的是字符串形式
}

//保留小数位 不进行四舍五入
function keepDecimals(number, n) {
   var index = number.toString().indexOf(".");

   function fixed(num, n) {
      return (num + Array(n).join(0)).slice(0, n);
   }

   if (n == 0) {
      return number.toString();
   } else {
      if (index != -1) {
         var int = number.toString().slice(0, index);
         var decimal = number.toString().slice(index + 1, index + 1 + n);
         if (decimal.length == n) {
            return int + "." + decimal
         } else {
            return int + "." + fixed(decimal, n);
         }
      } else {
         return number.toString() + "." + fixed(0, n);
      }
   }
}


var chrome = navigator.userAgent.indexOf("Chrome");
var safari = navigator.userAgent.indexOf("Safari");
var firefox = navigator.userAgent.indexOf("Firefox");

//获取光标位置
function getCursorPosition(textDom) {
   var cursorPos = 0;
   if (document.selection) {
      // IE Support
      textDom.focus();
      var selectRange = document.selection.createRange();
      selectRange.moveStart('character', -textDom.value.length);
      cursorPos = selectRange.text.length;
   } else if (textDom.selectionStart || textDom.selectionStart == '0') {
      // Firefox support
      cursorPos = textDom.selectionStart;
   }
   if (safari > 0 && chrome < 0) {
      setCaretPosition(textDom, $(textDom).val().length)
   }
   return cursorPos;
}

// 设置光标位置
function setCaretPosition(textDom, pos) {
   if (textDom.setSelectionRange) {
      // IE Support
      textDom.focus();
      textDom.setSelectionRange(pos, pos);
   } else if (textDom.createTextRange) {
      // Firefox support
      var range = textDom.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
   }
}

//safari浏览器 设置光标位置
function keepDecimalPlaces(e) {
   var key = window.event ? e.keyCode : e.which;
   if ((key == 37 || key == 39) && (safari > 0 && chrome < 0)) {//不影响正常编辑键的使用(37:Left;  39:Right)
      e.returnValue = false;
   }
}

function textError(message) {
   $(".error-msg").removeClass("dis-n").text(message);
   $(".error").fadeIn(500).fadeOut(2000);
   $("button").attr("disabled", true);
   setTimeout(function () {
      $("button").removeAttr("disabled")
   }, 2000)
}

function showError(area) {
   $(".error ." + area).removeClass("dis-n");
   $(".error").fadeIn(500).fadeOut(2000);
   $("button").attr("disabled", true);
   setTimeout(function () {
      $("button").removeAttr("disabled")
   }, 2000)
}

if (Cookies.get('loginToken')) {
   var loginToken = Cookies.get('loginToken');
}
