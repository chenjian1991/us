import {getApi, postHeaderTokenJsonApi, getHeaderTokenApi} from './axios'
// postApi
import {symbolList_realtime,announcementList,bannerList,mineing,getLastRate,recommendSymbol,currencyImg
} from './urls'
import { get } from 'https';

export const getSymbolList_realtime = () => {//获取交易对
  return getApi(symbolList_realtime)
}
//console.log(this) 为什么this不是vue
export const AnnoucementList = (params) =>{//获取公告
  return getApi(announcementList,params)
}

export const BannerList = (params) =>{//获取轮播图
return getApi(bannerList,params)
}

export const Mineing = () =>{//获取挖矿产出，流通量
  return getApi(mineing)
}
// f site add
export const getExchangeRate = () => {
  return getApi(getLastRate)
}
//获取推荐位交易对
export const getRecommendSymbol = () =>{
  return getApi(recommendSymbol)
}
//获取币种图标
export const getCurrencyImg = (params) =>{
  return getApi(currencyImg,params)
}