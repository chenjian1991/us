import {
   getApi,
   postBaseApi,
   postHeaderTokenBodyApi,
   postFormDataApi,
   postHeaderJsonApi,
   getHeaderTokenApi,
} from './axios'

import {
   queryConfigUrl,
   queryGlobalUrl,
   listTopUrl,
   queryIncomingUrl,
   listPersonalUrl,
   listTeamUrl,
   listBonusUrl,
   queryTransactionUrl,
   inviteURL

} from './urls'

export const queryConfig = () => {
   return getApi(queryConfigUrl)
}

export const queryGlobal = () => {
   return getApi(queryGlobalUrl)
}

export const listTop = (params) => {
   return getApi(listTopUrl, params)
}

export const queryIncoming = (params) => {
   return getApi(queryIncomingUrl, params)
}

export const listPersonal = (params) => {
   return getApi(listPersonalUrl, params)
}

export const listTeam = (params) => {
   return getApi(listTeamUrl, params)
}

export const listBonus = (params) => {
   return getApi(listBonusUrl, params)
}

export const queryTransaction = (params) => {
   return getApi(queryTransactionUrl, params);
}
export const queryInviteUrl = (token)=>{
   return getHeaderTokenApi(inviteURL,{},token)
}