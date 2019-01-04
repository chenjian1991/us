import Vue from 'vue';
import VueI18n from 'vue-i18n';
import customZhCn from './lang/zh-CN';
import customEnUs from './lang/en-US';
import customeFo from "./lang/ko";
import customeVi from "./lang/vi";
import zhCnLocale from 'iview/src/locale/lang/zh-CN';//iview框架里的
import enUsLocale from 'iview/src/locale/lang/en-US';//iview框架里的
import koLocale from 'iview/src/locale/lang/ko-KR';//iview框架里的 韩语
import viLocale from 'iview/src/locale/lang/vi-VN';//iview框架里的 韩语



import {getUrlKey} from '@/lib/utils.js'

Vue.use(VueI18n)
//自动根据浏览器系统语言设置语言
let navLang = navigator.language || navigator.browserLanguage
navLang === 'zh-CN' || navLang === 'zh'  ? navLang = 'zh-CN' :  navLang = 'en'

// let navLang = 'en' //诸位，各站默认打开的首页都是英文
let lang = getUrlKey('language') || window.localStorage.getItem('countryLanguage') || navLang // 如果都读到的浏览器语言不符合vue-i8n格式要求，就设置为英语‘en’
lang = 'en' 
localStorage.setItem('countryLanguage',lang)  //这段代码会导致每次刷新页面都是读取对浏览器对语言，而不是从本地读取语言,能够确保countryLanguage永远有

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn),
  'en': Object.assign(enUsLocale, customEnUs),
  "ko":Object.assign(koLocale, customeFo),//韩语
  "vi":Object.assign(viLocale, customeVi),//越南语

}
const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(zhTwLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(enUsLocale, customEnUs))
