import axios from 'axios'
import moment from 'moment'
import { route } from '../lib/route'

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
  async getCalendar({ commit, getters }) {
    const response = await axios.get(getters.dateRoute)
    commit('setCalendar', response.data)
  }
}

/* getters */
export const getters = {
  dateRoute(state, getters, routeState) {
    const id = routeState.shop.id
    return route(process.env.api.date, { id }, getters.dateParameters)
  },
  dateParameters(state, getters, routeState) {
    const menuIds = routeState.select.menus
      .filter(select => select.menu)
      .map(select => select.menu.id)
    const startMonth = moment().format('YYYY-MM-DD')
    const endNextMonth = moment()
      .add(1, 'month')
      .format('YYYY-MM-DD')

    return {
      menu_ids: menuIds,
      from_date: startMonth,
      to_date: endNextMonth
    }
  },
  isLoading(state) {
    return state.calendar.length == 0
  }
}
