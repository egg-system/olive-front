import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  storeName: '',
  menuCategories: [],
  selectedMenuIds: []
})

/* mutations */
export const mutations = {
  setMenuCategories(state, menuCategories) {
    state.menuCategories = menuCategories
  },
  addSelectedMenu(state, id) {
    state.selectedMenuIds.push(id)
  },
  clearSelectedMenus() {
    state.selectedMenuIds = []
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getMenus({ commit }, { storeId }) {
    const res = await axios.get(config.api.menu)

    commit('setMenuCategories', res.data.categories)
  },
  addSelectedMenu({ commit }, menuId) {
    commit('addSelectedMenu', menuId)
  },
  clearSelectedMenus({ commit }) {
    commit('clearSelectedMenus')
  }
}
