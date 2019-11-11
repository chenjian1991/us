import Vue from 'vue';
import iView from 'iview';
import App from './App.vue';
import VueCookies from 'vue-cookies'
import router from './router/router';
import store from './store';
import i18n from './locale';
import 'iview/dist/styles/iview.css';
import 'font-awesome/css/font-awesome.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import {scientificToNumber} from '@/lib/utils.js';
import MetaInfo from 'vue-meta-info';
import VueClipboard from 'vue-clipboard2'//剪切板
import VueLazyload from 'vue-lazyload'


Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueCookies)
Vue.use(VueAwesomeSwiper)
Vue.use(MetaInfo)
Vue.use(VueClipboard)
Vue.use(VueLazyload)


Vue.filter('scientificToNumber', function (value) {
  if (!value) return '--'
  return scientificToNumber(value)
});
Vue.filter('initNumber', function (value) {
  return parseInt(value);
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
