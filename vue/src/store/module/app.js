import Cookies from 'js-cookie'
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
    mainHomePriceObject:{},//{BTCUSDT:{...},FFUSDT:{}}

  },
  getters: {

  },
  actions:{
      
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
    // 更新首页4个推荐的币种
    updateMainHomePrice(state,value){
      state.mainHomePriceObject = value
    }
  },



}
