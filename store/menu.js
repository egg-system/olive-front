import axios from 'axios'
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
  // ログインチェック
  async getMenus({ commit, dispatch }, { shopId }) {
    const getShopMenuRoute = route(process.env.api.menu, { id: shopId })
    const response = await axios.get(getShopMenuRoute)

    commit('setMenus', response.data)
  }
}

export const getters = {
  allMenus(state) {
    return state.subShops.flatMap(subShop => subShop.menus)
  },
  getMenu(state, getters) {
    return menuId => {
      return getters.allMenus.find(menu => menu.id === menuId)
    }
  },
  getOption(state, getters) {
    return optionId => {
      return getters.allMenus
        .filter(menu => menu.options)
        .flatMap(menu => menu.options)
        .find(option => option.id === optionId)
    }
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
