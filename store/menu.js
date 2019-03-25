import axios from 'axios'

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
    const res = await axios.get(process.env.api.menu)

    commit('setMenus', res.data.sub_shops)
  }
}

export const getters = {
  getMenu(state) {
    return function(menuId) {
      let targetMenu = null
      state.subShops.forEach(subShop => {
        subShop.menus.forEach(menu => {
          if (menu.id == menuId) {
            targetMenu = menu
            return true
          }
        })
      })
      return targetMenu
    }
  },
  getOption(state) {
    return optionId => {
      let targetOption = null
      state.subShops.forEach(subShop => {
        subShop.menus.forEach(menu => {
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
  },
  isLoading(state) {
    return state.subShops.length == 0
  },
  getDefaultMenu(state) {
    if (state.subShops.length == 0) {
      return null
    }
    return state.subShops[0].menus[0]
  }
}
