import Vue from 'vue';
import VueI18n from 'vue-i18n';
import customEnUs from './lang/en-US';

import enUsLocale from 'iview/src/locale/lang/en-US';//iview框架里的

Vue.use(VueI18n)

const lang = 'en'
localStorage.setItem('countryLanguage', lang)  //这段代码会导致每次刷新页面都是读取对浏览器对语言，而不是从本地读取语言,能够确保countryLanguage永远有

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {
}
const messages = {
   'en': Object.assign(enUsLocale, customEnUs),
}
const i18n = new VueI18n({
   locale: lang,
   fallbackLocale: 'en',
   messages
})

export default i18n
