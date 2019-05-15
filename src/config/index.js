/*
 * @Author: 流量
 * @Date: 2018-10-24 11:15:27 
 * @Last Modified by: liul
 * @Last Modified time: 2019-05-06 15:31:37
 */

import Cookies from 'js-cookie'
export default {
    /**
     * @description 配置
     */
    'localhost':'B',
  }

export function clearLocalStorage(){
  setTimeout(function () {
    Cookies.remove('loginToken',{domain:document.domain.split('.').slice(-2).join('.')})
    localStorage.removeItem("ACCOUNT_TOKEN");
    localStorage.removeItem("ORDER_TOKEN");
    localStorage.removeItem("ASSET_TOKEN");
    localStorage.removeItem("UTIL_TOKEN");
    localStorage.removeItem("accountId");
    localStorage.removeItem("ACCOUNT_SESSION");
    localStorage.removeItem("ORDER_SESSION");
    localStorage.removeItem("ASSET_SESSION");
    localStorage.removeItem("orderTicket");
    localStorage.removeItem("curPage");
    localStorage.removeItem("bankAccountName");
    localStorage.removeItem("googleFlag");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("userNumer");
    localStorage.removeItem("ex55pin");
    localStorage.removeItem("emailFlag");
    localStorage.removeItem("ifEmail");
    localStorage.removeItem("ifsetgoogle");
    localStorage.removeItem("isSetTradePasswrod");
    localStorage.removeItem("securitPhone");
    localStorage.removeItem("Emailtoken");
    localStorage.removeItem("phoneToken");
    // window.location.reload();
  }, 100)
}
//获取域名的一级域名
export const getFirstDomain = {
  '55link.de.com':'55link.de.com',
  'otc.55link.de.com':'55link.de.com',
  'us.55link.de.com' : '55link.de.com',
}
//种cookies 
export function setCookies(token){
  if(getFirstDomain[document.domain]){
    Cookies.set('loginToken',token,{expires:2,domain:getFirstDomain[document.domain]})
  }else{
      Cookies.set('loginToken',token,{expires:2,domain:document.domain.split('.').slice(-2).join('.')})
  }
}

//币币交易页面聊天服务地址

export const CHAT_URL = {
  'baseURL':getCommouityBaseURL()+'api/v1/memberinterface/',
  // loginToken:Cookies.get('loginToken') || 'not',
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
  let domain = document.domain
  if(domain == "55gm.co" || domain == "www.55gm.co" || domain == "us.55gm.co"){
      return 'https://social.55gm.co/'
  }else if(domain == "www.test_uat.55.exchange" || domain == "uat.55.com" || domain == "localhost" || domain == "uat.55gm.co" || domain =='uspc.55.exchange' || domain == 'uat.us.55gm.co'){
      return 'http://47.245.56.224/'
  }else if(domain == "55.com" || domain == "www.55.com"){
      return 'https://social.55.com/'
  }else if(domain == "www.55ex.co" || domain == "55ex.co" || domain == "us.55ex.co"){
      return 'https://social.55ex.co/'
  }else if(domain == "www.55link.de.com" || domain == "55link.de.com" || domain == "us.55link.de.com"){
    return 'https://social.55link.de.com/'
  }else{
      return 'https://social.55.com/'
  }

  
}