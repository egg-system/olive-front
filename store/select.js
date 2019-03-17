import moment from 'moment'

/* state */
export const state = () => ({
  time: null,
  //menu: null,
  //options: [],
  menus: [{ menu: null, options: [] }, { menu: null, options: [] }],
  menuIndex: 0
})

/* mutations */
export const mutations = {
  setSelectedTime(state, time) {
    state.time = time
  },
  setSelectedMenu(state, selectedMenu) {
    state.menus[state.menuIndex].menu = selectedMenu
  },
  setSelectedOptions(state, options) {
    state.menus[state.menuIndex].options = options
  },
  setTwoHoursCheck(state, val) {
    state.twoHoursCheck = val
  },
  setForGoNextMenu(state) {
    state.menuIndex = 1
  },
  setForGoBackMenu(state) {
    state.menuIndex = 0
    state.menus[1].menu = null
    state.menus[1].options = []
  }
}

export const getters = {
  isTwoMenusSelected(state) {
    return state.menus[1].menu != null
  },
  isTwoHour(state) {
    if (state.menus[0].menu == null) {
      return false
    }
    return state.menus[1].menu != null || 120 == state.menus[0].menu.minutes
  },
  isMenuSelected(state) {
    return state.menus[0].menu != null
  },
  isTimeSelected(state) {
    return state.time != null
  },
  getMenuNow(state) {
    return state.menus[state.menuIndex].menu
  },
  getOptionsNow(state) {
    return state.menus[state.menuIndex].options
  },
  ifGoNextMenu(state) {
    return state.twoHoursCheck && state.menuIndex == 0
  },
  getMenuIndex(state) {
    return state.menuIndex
  },
  getSelectedTime(state) {
    return state.time
  }
}
