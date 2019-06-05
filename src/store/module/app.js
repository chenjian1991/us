import Cookies from 'js-cookie'
import {getQueryFavoritesPair,getUpdateFavoritesPair} from '_api/exchange.js'
export default {
  state: {
    isLogin:Cookies.get('loginToken')?true:false,
    countryLanguage:localStorage.getItem('countryLanguage'),
    bandPhoneObj:{
      "operateType":"BIND_PHONE",
      "codeType":"PHONE",
      "itc":'',
      "phone":''
    },
    bandEmail:{
      "operateType":"BIND_EMAIL",
      "codeType":"EMAIL",
      "email":"",
      "language":localStorage.getItem('countryLanguage')
    },
    currentCurrencyState:'',
    leftCol:true,
    headerPart:true,
    footerPart:true,
    ifAPP:false,
    firstLogin:false,
    backgroundHeader:'', //改变Header的背景色
    backgroundFooter:"",
    ssoToken:Cookies.get('loginToken'),
    ip_status:'',//IP限制提示 RESTRICT,UNKNOWN, PASSED
    routerHistory:""//前一个页面的路由地址

  },
  getters: {

  },
  actions:{
        //查询收藏的交易对
        getMarkSymbol({ commit }) {
          getQueryFavoritesPair(Cookies.get('loginToken')).then(result=>{
              //处理返回的结果
              let data = result.data
              let obj = {}
              data.forEach((v,index)=>{
                obj[v.pair] = 'marked'
              })
              // let local_symbol = JSON.parse(localStorage.getItem('mark_symbol'))
              // if(local_symbol){
              //   let result = obj
              //   let result = Object.assign(local_symbol,obj)
              //   localStorage.setItem('mark_symbol',JSON.stringify(result))
              // }else{
              // }
              localStorage.setItem('mark_symbol',JSON.stringify(obj))
            })
        },
        //更新收藏的交易对
        updateMarkSymbol({ commit }) {
          let ssoToken = Cookies.get('loginToken')
          if(ssoToken){
            let arr = []
            let sort = 1
            let local_symbol = JSON.parse(localStorage.getItem('mark_symbol'))
            for(var item in local_symbol){
              let obj ={}
              obj.pair = item
              obj.sort = sort++
              arr.push(obj)
            }
            getUpdateFavoritesPair(ssoToken,arr).then(data=>{
                
            })
          }
        }
  },
  mutations: {
    changeLoingStatus(state,value){
      state.isLogin  = value;
    },
    changeCurentLange(state,value){//mutations 可以提交载荷，payload，传递参数
      state.countryLanguage = value;
    },
    changebandPhoneObj(state,value){
      state.bandPhoneObj = value;
    },
    changeBandEmail(state,value){
      state.bandEmail = value;
    },
    changeCurrencyState(state,value){
      state.currentCurrencyState = value;
    },
    changeifAPP(state,value){
      state.ifAPP = value;
    },
    CHANGEFIRSTLOGIIN(state,value){
      state.firstLogin = value;
    },
    changeHeaderColor(state,value){
      state.backgroundHeader = value;
    },
    changeFooterColor(state,value){
      state.backgroundFooter = value;
    },
    changeIPwaring(state,value){
      state.ip_status = value;
    },
    CHANGEHISTORYROUTER(state,value){
      state.routerHistory = value;
    },
  },
}
