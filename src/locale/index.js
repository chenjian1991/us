import Vue from 'vue';
import VueI18n from 'vue-i18n';
import customZhCn from './lang/zh-CN';
import customEnUs from './lang/en-US';
import customeFo from "./lang/ko";
import customeVi from "./lang/vi";

import de from './lang/de-de'
import es from './lang/es-es'
import fr from './lang/fr-fr'
import ptBr from './lang/pt-br'
import ptPt from './lang/pt-pt'
import ru from './lang/ru-ru'
import th from './lang/th-th'
import tr from './lang/tr-tr'
import id from './lang/id-id'

import zhCnLocale from 'iview/src/locale/lang/zh-CN';//iview框架里的
import enUsLocale from 'iview/src/locale/lang/en-US';//iview框架里的
import koLocale from 'iview/src/locale/lang/ko-KR';//iview框架里的 韩语
import viLocale from 'iview/src/locale/lang/vi-VN';//iview框架里的 越南语

import deIview from 'iview/src/locale/lang/de-DE';//iview框架里的 越南语
import esIview from 'iview/src/locale/lang/es-ES';//iview框架里的 越南语
import frIview from 'iview/src/locale/lang/fr-FR';//iview框架里的 越南语
import ptBrIview from 'iview/src/locale/lang/pt-PT';//iview框架里的 越南语
import ptPtIview from 'iview/src/locale/lang/pt-BR';//iview框架里的 越南语
import ruIview from 'iview/src/locale/lang/ru-RU';//iview框架里的 越南语
import thIview from 'iview/src/locale/lang/th-TH';//iview框架里的 越南语
import trIview from 'iview/src/locale/lang/tr-TR';//iview框架里的 越南语
import idIview from 'iview/src/locale/lang/id-ID';//iview框架里的 印尼语



import {getUrlKey} from '@/lib/utils.js'

Vue.use(VueI18n)
//自动根据浏览器系统语言设置语言
let navLang = navigator.language || navigator.browserLanguage
navLang === 'zh-CN' || navLang === 'zh'  ? navLang = 'zh-CN' :  navLang = 'en'

// let navLang = 'en' //诸位，各站默认打开的首页都是英文
let lang = getUrlKey('language') || window.localStorage.getItem('countryLanguage') || navLang // 如果都读到的浏览器语言不符合vue-i8n格式要求，就设置为英语‘en’
let url = window.location.href;
// console.log(url.indexOf('registerSuccess'))
if(url.indexOf('inviteAto')!==-1||url.indexOf('beinvited')!==-1||url.indexOf('registerSuccess')!==-1){
  lang = getUrlKey('language') || window.localStorage.getItem('countryLanguage') || navLang
}else{
  lang = 'en'
  localStorage.setItem('countryLanguage',lang)  //这段代码会导致每次刷新页面都是读取对浏览器对语言，而不是从本地读取语言,能够确保countryLanguage永远有

}


Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn),
  'en': Object.assign(enUsLocale, customEnUs),
  "ko":Object.assign(koLocale, customeFo),//韩语
  "vi":Object.assign(viLocale, customeVi),//越南语
  'ru-ru':Object.assign(ru,ruIview),//俄罗斯语
  'de-de':Object.assign(de,deIview),//德语
  'fr-fr':Object.assign(fr,frIview),//法语
  'es-es':Object.assign(es,esIview),//西班牙语
  'tr-tr':Object.assign(tr,trIview),//土耳其
  'pt-br':Object.assign(ptBr,ptBrIview),//葡萄牙语
  'pt-pt':Object.assign(ptPt,ptPtIview),//葡萄牙语
  'th-th':Object.assign(th,thIview),//泰国
  'id-id':Object.assign(id,idIview),//印尼语
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
