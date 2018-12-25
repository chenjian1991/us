import axios from 'axios'
import Cookies from 'js-cookie'
import {Message} from 'iview'
import i18n from '@/locale/index.js'
import qs from 'qs'

// axios.defaults.timeout = 5000
// 返回值处理
axios.interceptors.response.use(response => {
      if (response.status === 200) {
         return response
      } else {
         Message.error(response.message)
         return false
      }
   },
   error => {
      if (error.response) {
         if (error.response.status === 400) {
            let code = error.response.data.code;
            Message.error(i18n.t(code))
            if (code == 196682) {
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
                  window.location.reload();
               }, 500)
            }
            return Promise.reject(error.response)
         } else if (error.response.status === 502) {
            // Message.error(error.response.data.message)
         } else if (error.response.status === 503) {
            // Message.error(error.response.data.message)
         } else if (error.response.status === 504) {
            // Message.error(error.response.data.message)
         } else if (error.response.status === 500) {
            // Message.error(i18n.t(500))
         }
      }
      // console.log(error.response)
      return Promise.reject(error.response) // 返回接口返回的错误信息
   })

//    //请求头设置
//    axios.interceptors.request.use(config => {        
//          config.headers.token = '';        
//          config.headers.bindToken = '';        
//          return config;    
//       },    
//       error => {
//             return Promise.reject(error);    
//       }
//    );


/**
 *  封装axios的post请求
 * @param {*} url 请求的接口路径
 * @param {*} bodyData 请求body的参数，参数格式以json对象形式
 */
export function postBaseApi(url, params, bodyData) {
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            // 'Content-type': 'application/x-www-form-urlencoded'
         },
         params: params,
         data: bodyData
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}

/**
 *  封装axios的post请求
 * @param {*} url 请求的接口路径  签发orderId
 * @param {*} formDataJson 请求formData的参数，参数格式以json对象形式
 */
export function postFormDataApi(url, params, formDataJson) {
   let data1 = qs.stringify(formDataJson)
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            'Content-type': 'application/x-www-form-urlencoded'
         },
         params: params,
         data: data1
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}

/**
 *  封装axios的post请求
 * @param {*} url 请求的接口路径
 * @param {*} bodyData 请求body的参数，参数格式以json对象形式
 */
export function postHeaderTokenBodyApi(url, token, bodyData) {
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            // 'Content-type': 'application/x-www-form-urlencoded'
            'token': token
         },
         data: bodyData
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   });
}

/**
 * 
 *  封装axios的post请求 多个token的情况
 * @param {*} url 请求的接口路径
 * @param {*} bodyData 请求body的参数，参数格式以json对象形式
 */
export function postHeaderSeveralTokenBodyApi(url,token,bindToken,bodyData) {
      return new Promise((resolve, reject) => {
         axios({
            method: 'post',
            url: url,
            headers: {
               // 'Content-type': 'application/x-www-form-urlencoded'
               'token': token,
               'bindToken':bindToken
              
            },
            data: bodyData
         }).then(response => {
            resolve(response.data)
         }).catch((error) => {
            reject(error)
         })
      });
   }


/**
 *  封装axios的json post请求
 * @param {*} url 请求的接口路径
 * @param {*} params 请求的参数，参数格式以json对象形式
 * @param {*} appendToken  添加token
 */
export function postHeaderTokenJsonApi(url, params, appendToken = true) {
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            'Content-type': 'application/json',
            'token': Cookies.get('token')
         },
         data: JSON.stringify(params)
      }).then(response => {
         resolve(response)
      }).catch((error) => {
         reject(error)
      })
   })
}

/**
 *  封装axios的post请求
 * @param {*} url 请求的接口路径
 * @param {*} UrlParam 请求body的参数，参数格式以json对象形式
 */
export function postHeaderJsonApi(url, params, bodyData) {
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            'Content-type': 'application/json'
         },
         params: params,
         data: JSON.stringify(bodyData)
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}

/**
 *  封装axios的get请求
 * @param {*} url 请求的接口路径
 * @param {*} params 请求的参数，参数格式以json对象形式
 * @param {*} appendToken  添加token
 */
export function getHeaderTokenApi(url, params, token) {
   return new Promise((resolve, reject) => {
      // let token
      // if (appendToken) {
      //   token = Cookies.get('token')
      // }
      axios.get(url, {
         params: params,
         headers: {
            token: token
         }
      }).then(response => {
         resolve(response)
      }).catch((error) => {
         reject(error)
      })
   })
}

/**
 *  封装axios的get请求
 * @param {*} url 请求的接口路径
 * @param {*} params 请求的参数，参数格式以json对象形式
 * @param {*} appendToken  添加token
 */
export function getApi(url, params) {
   return new Promise((resolve, reject) => {
      // if (appendToken) {
      //     let token = Cookies.get('TOKEN')
      //     if (token != '') {
      //         params['token'] = token
      //     }
      // }
      axios.get(url, {
         params: params
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}
