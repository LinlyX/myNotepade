import * as func from '../function.js'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = func.themeLocal.get() || {
  theme: 'blue'
}

export default {
  state,
  actions,
  mutations,
  getters
}
