import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import config from '~/config/constant.local.js'

export function initialize() {
  // 設定ファイルはdevを使う
  process.env = config
}

export function initializeStore({
  state,
  getters,
  mutations,
  actions,
  modules
}) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules
  })
}
