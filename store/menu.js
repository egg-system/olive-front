import axios from 'axios'
import * as _ from 'lodash'
import { route } from '../lib/route'

/* state */
export const state = () => ({
  subShops: []
})

/* mutations */
export const mutations = {
  setMenus(state, subShops) {
    state.subShops = subShops
  }
}

/* actions */
export const actions = {
  async getMenus({ commit }, { shopId }) {
    const getShopMenuRoute = route(process.env.api.menu, { id: shopId })
    const response = await axios.get(getShopMenuRoute)

    commit('setMenus', response.data)
  }
}

export const getters = {
  hasSubShops(state) {
    return state.subShops.length > 1
  },
  allMenus(state) {
    return _.flatten(state.subShops.map(subShop => subShop.menus))
  },
  getMenu(state, getters) {
    return menuId => {
      return (
        getters.allMenus && getters.allMenus.find(menu => menu.id === menuId)
      )
    }
  },
  getOption(state, getters) {
    return optionId => {
      return _.flatten(
        getters.allMenus.filter(menu => menu.options).map(menu => menu.options)
      ).find(option => option.id === optionId)
    }
  },
  getStore(state) {
    return storeId =>
      state.subShops.find(store => store.id === parseInt(storeId))
  },
  isLoading(state) {
    return state.subShops.length == 0
  },
  defaultMenu(state) {
    if (state.subShops.length === 0) {
      return null
    }

    if (state.subShops[0].menus.length === 0) {
      return null
    }

    return state.subShops[0].menus[0]
  }
}
