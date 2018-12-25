import {getApi, postHeaderTokenBodyApi} from './axios'

import {realTime, verifyAddress, userInfo, ssoSend,withdrawCodeVerify} from "./urls";

export const getRealtimeList = () => {
   return getApi(realTime)
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