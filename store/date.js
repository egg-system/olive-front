import axios from 'axios'

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
    const res = await axios.get(process.env.api.date)

    commit('setCalendar', res.data.date_slots)
  }
}

/* getters */
export const getters = {
  isLoading(state) {
    return state.calendar.length == 0
  }
}
