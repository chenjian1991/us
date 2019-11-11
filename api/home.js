import {getApi} from './axios'
// postApi
import {symbolList_realtime,currencyImg
} from './urls'

export const getSymbolList_realtime = () => {//获取交易对
  return getApi(symbolList_realtime)
}

//获取币种图标
export const getCurrencyImg = (params) =>{
  return getApi(currencyImg,params)
}