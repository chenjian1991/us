import {getApi} from './axios'

import {
    fabiCost
} from './urls'


export const getLegalTenderValue = (params) => {
    return getApi(fabiCost, params)
 }