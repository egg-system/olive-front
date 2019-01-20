import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  name: ''
})

/* mutations */
export const mutations = {
  setName(state, name) {
    state.name = name
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getStore({ commit }, { storeId }) {
    const res = await axios.get(config.api.store)
    commit('setName', res.data.name)
  }
}
