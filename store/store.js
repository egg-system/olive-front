import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  store: null
})

/* mutations */
export const mutations = {
  setStore(state, store) {
    state.store = {}
    state.store.name = store.name
    state.store.open_at = store.open_at
    state.store.close_at = store.close_at
    state.store.break_from = store.break_from
    state.store.break_to = store.break_to
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getStore({ commit }, { storeId }) {
    const res = await axios.get(config.api.store)
    commit('setStore', res.data)
  }
}
