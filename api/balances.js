import {getApi, postHeaderTokenBodyApi, getHeaderTokenApi, postFormDataApi,postHeaderTokenBodyParamsApi} from './axios'

import {
   realTime, verifyAddress, userInfo, ssoSend, withdrawCodeVerify, identify, ssoGoogleVerify, ssoCodeVerify,
   updateSecretKeyUrl, closeSecretKeyUrl, queryStateUrl, identifySubmitUrl,identifyUpdateUrl,
   identifyInfo as identifyQueryUrl, uploadPic,identifyPhoto
} from "./urls";

export const getRealtimeList = () => {
   return getApi(realTime)
}
export const getVerifyAddress = (params) => {
   return getApi(verifyAddress, params)
}

export const getUserInfo = (params, token) => {
   return getHeaderTokenApi(userInfo, params, token)
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

export const identifySubmit = (params, data) => {
   return postHeaderTokenBodyApi(identifySubmitUrl, params, data)
}

export const identifyUpdate = (params, data) => {
   return postHeaderTokenBodyApi(identifyUpdateUrl, params, data)
}

export const identifyQuery = (params, token) => {
   return getHeaderTokenApi(identifyQueryUrl, params, token)
}

export const uploadImg = (params, data) => {
   return postHeaderTokenBodyApi(uploadPic, params, data)
}

export const getPhoto = (params, data) => {
   return postHeaderTokenBodyParamsApi(identifyPhoto, params, {}, data)
}