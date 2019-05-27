import Cookies from 'js-cookie'
import {queryTradePassWordStatus} from '_api/exchange.js'

export default {
    state: {
       inputTradePassWordStatus:null,
    },
    getters: {

    },
    actions:{
        //获取交易密码关闭状态
        getTradePassWordStatus({commit,state}){
            if(!state.colseTradePassWordStatus && Cookies.get('loginToken')){
                queryTradePassWordStatus(Cookies.get('loginToken')).then(data => {
                    commit('updateColseTradePassWordStatus',data.data.result)
                })
            }
        }
    },
    mutations:{
        updateColseTradePassWordStatus(state,flag){
            state.inputTradePassWordStatus  = flag
        }
    }
};