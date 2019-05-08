import axios from 'axios'
import Cookies from 'js-cookie'
import {
   Message,
   Notice
} from 'iview'
import i18n from '@/locale/index.js'
import qs from 'qs'
import store from '@/store/index'
import {
   clearLocalStorage
} from '@/config'

// let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// let cancelToken = axios.CancelToken;
// let removePending = (config) => {
//    for (let p in pending) {
//       if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
//          pending[p].f(); //执行取消操作
//          pending.splice(p, 1); //把这条记录从数组中移除
//       }
//    }
// }
// axios.defaults.timeout = 5000

//添加请求拦截器
axios.interceptors.request.use(
   config => {
      // removePending(config); //在一个ajax发送前执行一下取消操作
      // if (config.url.lastIndexOf('account.create') !== -1 && config.method == 'post') {
      //    config.cancelToken = new cancelToken((c) => {
      //       // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      //       pending.push({
      //          u: config.url + '&' + config.method,
      //          f: c
      //       });
      //    });
      // }
      return config;
   },
   error => {
      return Promise.reject(error);
   });
// 返回值处理
axios.interceptors.response.use(
   response => {
      // removePending(response.config);
      return response
   },
   error => {
      // console.log(2222,error)
      if (error.response) {
         if (error.response.status === 400) {
            let code = error.response.data.code;
            if(code ==196634 || code ==196666 || code ==196650){
               //token错误 session失效等场景
            }else{
               // 登陆失效取消登陆状态
               if(code == 196682){
                  clearLocalStorage()
                  store.commit('changeLoingStatus', false);
               }
               //全局错误弹窗
               Notice.warning({
                  title: i18n.t(code),
               });
            }
            
            // if (code == 196682) {
            //    let protocol = window.location.protocol; //协议
            //    let host = window.location.host; //主机名+端口号
            //    let targetUrl = protocol + "//" + host;
            //    window.location.href = targetUrl + '/#/login'
            //    //清除cookie 和 本地存储
               // clearLocalStorage()
            // }
            // // removePending(error.response.config);
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
         // console.log(error.response)
         return Promise.reject(error.response) // 返回接口返回的错误信息
      }else{
         return {}
      }
   })




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
         data: bodyData,
         // cancelToken: new CancelToken(function executor(c) {
         //    // executor 函数接收一个 cancel 函数作为参数
         //    cancel = c;
         //    console.log(cancel)
         //  })
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}

// export {cancel}
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
* 封装axios的post请求
* @param {*} url 请求的接口路径
* @param {*} bodyData 请求body的参数，参数格式以json对象形式
* @param {*} keyId
*/
export function postHeaderKeyIdBodyApi(url,bodyData) {
   return new Promise((resolve, reject) => {
   axios({
   method: 'post',
   url: url,
   headers: {
   'Content-type': 'application/json;charset=UTF-8;',
   // 'keyId': keyId
   },
   // params:params,
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
export function postHeaderSeveralTokenBodyApi(url, token, bindToken, bodyData) {
   return new Promise((resolve, reject) => {
      axios({
         method: 'post',
         url: url,
         headers: {
            // 'Content-type': 'application/x-www-form-urlencoded'
            'token': token,
            'bindToken': bindToken

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
         params: params,
         paramsSerializer: params => {
            return qs.stringify(params, { indices: false })//处理参数有数组问题
         }
      }).then(response => {
         resolve(response.data)
      }).catch((error) => {
         reject(error)
      })
   })
}