import Cookies from 'js-cookie'
import {getUserInfo} from '_api/balances.js'

export default {
    state: {
       inputTradePassWordStatus: null,//是否设置交易密码
       openTradePasswordStatus: true,//交易密码开关
    },
    getters: {

    },
    actions:{
       //获取交易密码关闭状态
       getTradePassWordStatus({commit, state}) {
          if (Cookies.get('loginToken')) {
             getUserInfo({userId: localStorage.getItem('loginUserId')}, Cookies.get('loginToken')).then(data => {
                commit('updateColseTradePassWordStatus', data.data.setTradePassword)
                commit('openTradePassword', data.data.openTradePassword)

             })
          }
       }
    },
    mutations:{
       updateColseTradePassWordStatus(state, flag) {
          state.inputTradePassWordStatus = flag
       },
       openTradePassword(state, flag) {
          state.openTradePasswordStatus = flag
       },
    }
};