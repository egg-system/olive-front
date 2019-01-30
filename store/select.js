import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  selectedMenuIds: [],
  selectedTime: null,
  selectedMenuIds: []
})

/* mutations */
export const mutations = {
  selectTime(state, time) {
    state.selectedTime = time
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
  selectTime({ commit }, time) {
    commit('selectTime', time)
  },
  addSelectedMenu({ commit }, menuId) {
    commit('addSelectedMenu', menuId)
  },
  clearSelectedMenus({ commit }) {
    commit('clearSelectedMenus')
  }
}

export const getters = {
  getSelectedMenus(state, getters, rootState) {
    var menuCategories = rootState.menu.menuCategories
    var selectedMenuIds = state.selectedMenuIds
    var selectedMenus = []

    for (var menuId of selectedMenuIds) {
      for (var menuCategory of menuCategories) {
        var selectedMenu = menuCategory.menus.find(menu => menu.id === menuId)
        if (selectedMenu !== undefined) {
          selectedMenus.push({
            id: selectedMenu.id,
            categoryName: menuCategory.name,
            menuName: selectedMenu.name,
            price: selectedMenu.price_without_tax,
            duration: selectedMenu.duration_minutes
          })
        }
      }
    }
    return selectedMenus
  }
}
