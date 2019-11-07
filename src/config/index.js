/*
 * @Author: 流量
 * @Date: 2018-10-24 11:15:27 
 * @Last Modified by: liul
 * @Last Modified time: 2019-05-06 15:31:37
 */

import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
    /**
     * @description 配置
     */
    'localhost':'B',
  }

export function clearLocalStorage(){
  setTimeout(function () {
    let index = document.domain.indexOf('.')+1
    let siteDoamin = document.domain.substr(index)
    let lan = localStorage.getItem('countryLanguage')
    let deviceCode = localStorage.getItem('deviceCode')
    let currentCurrency = localStorage.getItem('currentCurrency')
    localStorage.clear();
    localStorage.setItem('countryLanguage',lan)
    localStorage.setItem('deviceCode',deviceCode)
    localStorage.setItem('currentCurrency',currentCurrency)
    $cookies.remove('loginToken',{domain:siteDoamin})
    
    // localStorage.removeItem("ACCOUNT_TOKEN");
    // localStorage.removeItem("ORDER_TOKEN");
    // localStorage.removeItem("ASSET_TOKEN");
    // localStorage.removeItem("UTIL_TOKEN");
    // localStorage.removeItem("accountId");
    // localStorage.removeItem("ACCOUNT_SESSION");
    // localStorage.removeItem("ORDER_SESSION");
    // localStorage.removeItem("ASSET_SESSION");
    // localStorage.removeItem("orderTicket");
    // localStorage.removeItem("curPage");
    // localStorage.removeItem("bankAccountName");
    // localStorage.removeItem("googleFlag");
    // localStorage.removeItem("phoneNumber");
    // localStorage.removeItem("userNumer");
    // localStorage.removeItem("ex55pin");
    // localStorage.removeItem("emailFlag");
    // localStorage.removeItem("ifEmail");
    // localStorage.removeItem("ifsetgoogle");
    // localStorage.removeItem("isSetTradePasswrod");
    // localStorage.removeItem("securitPhone");
    // localStorage.removeItem("Emailtoken");
    // localStorage.removeItem("phoneToken");
    // localStorage.removeItem("PASSWORDTOKEN")
    // window.location.reload();
  }, 100)
}
//种cookies 
export function setCookies(token){
  let index = document.domain.indexOf('.')+1
  let siteDoamin = document.domain.substr(index)
   $cookies.set('loginToken',token,{expires:2,domain:siteDoamin})
}

//币币交易页面聊天服务地址

export const CHAT_URL = {
  'baseURL':getCommouityBaseURL()+'api/v1/memberinterface/',
  'chineseURL':'/groups/chat/962701706544549892/feed',
  'englishURL':'/groups/chat/967250642861035532/feed',
  'vietnamURL':'/groups/chat/967249785415274499/feed',
  'koreaURL':'/groups/chat/967251097758470150/feed',
  'IndonesianURL':'/groups/chat/968138118035148819/feed'
}

/*
 * @Author: liuliang
 * @Date: 2019-04-12 15:31:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-12 15:43:41
 * Header 获取社区链接
 */
export  function getCommouityBaseURL() {
  var domainArr = document.domain.split('.')
  domainArr[0] = 'social'
  if(document.location.port){
    return document.location.protocol+'//'+domainArr.join('.')+':'+document.location.port+'/'
  }else{
    return document.location.protocol+'//'+domainArr.join('.') + "/"
  }
}