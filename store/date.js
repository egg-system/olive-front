import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  calendar: []
})

/* mutations */
export const mutations = {
  setCalendar(state, calendar) {
    state.calendar = calendar
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async getCalendar({ commit }) {
    const res = await axios.get(config.api.date)

    commit('setCalendar', res.data.date_slots)
  }
}
