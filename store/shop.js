import axios from 'axios'
import { route } from '../lib/route'

const BREAK_FROM = '13:00'
const BREAK_TO = '16:00'

/* state */
export const state = () => ({
  id: null,
  name: null,
  open_at: null,
  close_at: null,
  break_from: null,
  break_to: null,
  near_stores: []
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
    state.near_stores = shop.near_stores
  }
}

export const getters = {
  breakFrom(state) {
    return state.break_from
  },
  breakTo(state) {
    return state.break_to
  },
  hasBreakTime(state, getters) {
    return Boolean(getters.breakFrom && getters.breakTo)
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getShop({ commit }, { id }) {
    const getShopRoute = route(process.env.api.shop, { id })
    const response = await axios.get(getShopRoute)
    commit('setShop', response.data)
  }
}
