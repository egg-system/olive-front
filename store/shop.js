import axios from 'axios'

/* state */
export const state = () => ({
  id: null,
  name: null,
  open_at: null,
  close_at: null,
  break_from: null,
  break_to: null
})

/* mutations */
export const mutations = {
  setShop(state, shop) {
    state.id = shop.id
    state.name = shop.name
    state.open_at = shop.open_at
    state.close_at = shop.close_at
    state.break_from = shop.break_from
    state.break_to = shop.break_to
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getShop({ commit }, { id }) {
    const res = await axios.get(process.env.api.shop)
    commit('setShop', res.data)
  }
}
