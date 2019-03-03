import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  selectedMenuIds: [],
  selectedTime: null,
  selectedMenuIds: [],
  selectedMenu: null,
  selectedOptions: [],
  twoHoursCheck: false
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
  },
  setSelectedMenu(state, selectedMenu) {
    state.selectedMenu = selectedMenu
  },
  setSelectedOptions(state, options) {
    state.selectedOptions = options
  },
  setTwoHoursCheck(state, val) {
    state.twoHoursCheck = val
  }
}

/* actions */
export const actions = {
  selectTime({ commit }, time) {
    commit('selectTime', time)
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
            name: menuCategory.name,
            course: selectedMenu.name,
            price: selectedMenu.price_without_tax,
            time: selectedMenu.duration_minutes
          })
        }
      }
    }
    return selectedMenus
  },
  isTwoHour(state) {
    return state.twoHoursCheck || 120 == state.selectedMenu.minutes
  }
}
