import axios from 'axios'
import config from '~/config/constant.json'

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
  async getMenus({ commit }, { shopId }) {
    const res = await axios.get(config.api.menu)

    commit('setMenus', res.data.sub_shops)
  }
}

export const getters = {
  getMenu(state) {
    return function(menuId) {
      let targetMenu = null
      state.subShops.forEach(function(subShop) {
        subShop.menus.forEach(function(menu) {
          if (menu.id == menuId) {
            targetMenu = menu
            return true
          }
        })
      })
      return targetMenu
    }
  },
  getFirstMenu(state) {
    return state.subShops[0].menus[0]
  },
  getOption(state) {
    return optionId => {
      let targetOption = null
      state.subShops.forEach(function(subShop) {
        subShop.menus.forEach(function(menu) {
          if (menu.options) {
            menu.options.forEach(function(option) {
              if (option.id == optionId) {
                targetOption = option
                return true
              }
            })
          }
        })
      })
      return targetOption
    }
  }
}
