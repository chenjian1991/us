import {
    postHeaderTokenBodyApi
 } from './axios'
 
 import {
    postVisaCardInfoUrl
 } from './urls'
 
 export const postApplyCardInfo = (token, bodyData) => {
    return postHeaderTokenBodyApi(postVisaCardInfoUrl,token, bodyData)
 }