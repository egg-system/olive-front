import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  menuCategories: []
})

/* mutations */
export const mutations = {
  setMenuCategories(state, menuCategories) {
    state.menuCategories = menuCategories
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getMenus({ commit }, { storeId }) {
    const res = await axios.get(config.api.menu)

    commit('setMenuCategories', res.data.categories)
  }
}
