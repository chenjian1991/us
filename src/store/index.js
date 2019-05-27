import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import exchange from './module/exchange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    exchange
  }
})
