import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  selectedMenuIds: [],
  selectedTime: null
})

/* mutations */
export const mutations = {
  selectTime(state, time) {
    state.selectedTime = time
  }
}

/* actions */
export const actions = {
  selectTime({ commit }, time) {
    commit('selectTime', time)
  }
}
