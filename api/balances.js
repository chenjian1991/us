import {getApi, postHeaderTokenBodyApi, getHeaderTokenApi, postFormDataApi} from './axios'

import {
   realTime, verifyAddress, userInfo, ssoSend, withdrawCodeVerify, identify, ssoGoogleVerify, ssoCodeVerify,
   updateSecretKeyUrl, closeSecretKeyUrl, queryStateUrl, queryUserInfoUrl
} from "./urls";

export const getRealtimeList = () => {
   return getApi(realTime)
}
export const getVerifyAddress = (params) => {
   return getApi(verifyAddress, params)
}

export const getUserInfo = (params) => {
   return postHeaderTokenBodyApi(userInfo, params)
}

export const send = (params, data) => {
   return postHeaderTokenBodyApi(ssoSend, params, data)
}

export const codeVerify = (params, data) => {
   return postHeaderTokenBodyApi(withdrawCodeVerify, params, data)
}

export const getIdentify = (token) => {
   return getHeaderTokenApi(identify, '', token)
}

export const phoneVerify = (params, data) => {
   return postHeaderTokenBodyApi(ssoCodeVerify, params, data)
}

export const googleVerify = (params, data) => {
   return postHeaderTokenBodyApi(ssoGoogleVerify, params, data)
}

export const updateSecretKey = (params, data) => {
   return postFormDataApi(updateSecretKeyUrl, params, data)
}

export const closeSecretKey = (params, data) => {
   return postFormDataApi(closeSecretKeyUrl, params, data)
}

export const queryState = (token) => {
   return getHeaderTokenApi(queryStateUrl, '', token)
}

export const queryUserInfo = (token) => {
   return getHeaderTokenApi(queryUserInfoUrl, '', token)
}