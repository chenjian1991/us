import {getApi, postHeaderTokenBodyApi,getHeaderTokenApi} from './axios'

import {realTime, verifyAddress, userInfo, ssoSend,withdrawCodeVerify,identify} from "./urls";

export const getRealtimeList = (params) => {
   return getApi(realTime,params)
}
export const getVerifyAddress = (params) => {
   return getApi(verifyAddress, params)
}

export const getUserInfo = (params) => {
   return postHeaderTokenBodyApi(userInfo, params)
}

export const send = (params,data) => {
   return postHeaderTokenBodyApi(ssoSend, params,data)
}

export const codeVerify = (params,data) => {
   return postHeaderTokenBodyApi(withdrawCodeVerify, params,data)
}

export const getIdentify = (token) => {
   return getHeaderTokenApi(identify,'',token)
}