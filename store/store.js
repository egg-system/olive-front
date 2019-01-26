import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  name: '',
  open_at: null,
  close_at: null,
  break_from: null,
  break_to: null
})

/* mutations */
export const mutations = {
  setStore(state, store) {
    state.name = store.name
    state.open_at = store.open_at
    state.close_at = store.close_at
    state.break_from = store.break_from
    state.break_to = store.break_to
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
