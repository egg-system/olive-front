import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  time: null,
  menu: null,
  options: [],
  twoHoursCheck: false
})

/* mutations */
export const mutations = {
  setSelectedTime(state, time) {
    state.time = time
  },
  setSelectedMenu(state, selectedMenu) {
    state.menu = selectedMenu
  },
  setSelectedOptions(state, options) {
    state.options = options
  },
  setTwoHoursCheck(state, val) {
    state.twoHoursCheck = val
  }
}

export const getters = {
  isTwoHour(state) {
    if (state.menu == null) {
      return false
    }
    return state.twoHoursCheck || 120 == state.menu.minutes
  },
  isMenuSelected(state) {
    return state.menu != null
  },
  isTimeSelected(state) {
    return state.time != null
  }
}
