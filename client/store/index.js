import Vue from 'vue'
import Vuex from 'vuex'

import event from './event'
import theme from './theme'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    event,
    theme
  }
})
