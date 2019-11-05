import {getHeaderTokenApi,getApi} from './axios'

import {
    relatNameVerify,
    fabiCost
} from './urls'


export const getRelatNameVerify = () => {
    return getHeaderTokenApi(relatNameVerify)
}

export const getLegalTenderValue = (params) => {
    return getApi(fabiCost, params)
 }

