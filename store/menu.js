import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  subStores: []
})

/* mutations */
export const mutations = {
  setMenus(state, subStores) {
    state.subStores = subStores
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getMenus({ commit }, { storeId }) {
    const res = await axios.get(config.api.menu)

    commit('setMenus', res.data.sub_stores)
  }
}

export const getters = {
  getMenu(state) {
    return function(menuId) {
      let targetMenu = null
      state.subStores.forEach(function(subStore) {
        subStore.menus.forEach(function(menu) {
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
      state.subStores.forEach(function(subStore) {
        subStore.menus.forEach(function(menu) {
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
