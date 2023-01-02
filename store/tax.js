import axios from 'axios'
import * as _ from 'lodash'
import { route } from '../lib/route'

/* state */
export const state = () => ({
  tax: null
})

/* mutations */
export const mutations = {
  setTax(state, tax) {
    state.tax = tax
  }
}

/* actions */
export const actions = {
  async getTax({ commit }, { shopId }) {
    const getTaxRoute = route(process.env.api.tax, { id: shopId })
    const response = await axios.get(getTaxRoute)

    commit('setTax', response.data)
  }
}

export const getters = {
  isLoading(state) {
    return state.subShops.length == 0
  },
  isDisplayTax(state) {
    return state.tax.is_display_include
  },
  getRate(state) {
    return state.tax.rate
  }
}
