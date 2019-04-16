import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { route } from '../lib/route'

const START_AT = '10:00'
const BREAK_FROM = '13:00'
const BREAK_TO = '16:00'
const END_AT = '20:00'
const TIME_SLOT_FORMAT = 'HH:mm'

/* state */
export const state = () => ({
  dateSlots: null
})

/* mutations */
export const mutations = {
  setDateSlots(state, dateSlots) {
    state.dateSlots = dateSlots
  }
}

/* actions */
export const actions = {
  async getCalendar({ commit, getters }) {
    const response = await axios.get(getters.dateRoute)
    commit('setDateSlots', response.data)
  }
}

/* getters */
export const getters = {
  calendarWeeks(state, getters) {
    return _.chunk(getters.calendarDates, 7)
  },
  calendarDates(state, getters) {
    const calendarDates = []
    let calendarDate = getters.startDate.clone()

    while (calendarDate.isBefore(getters.endDate)) {
      calendarDates.push(calendarDate)
      calendarDate = calendarDate.add(1, 'days').clone()
    }

    return calendarDates
  },
  dateRoute(state, getters, routeState) {
    const id = routeState.shop.id
    return route(process.env.api.date, { id }, getters.dateParameters)
  },
  dateParameters(state, getters, routeState, rootGetters) {
    return {
      menu_ids: rootGetters['select/allSelectedMenuIds'],
      from_date: moment().format('YYYY-MM-DD'),
      to_date: getters.endDate.format('YYYY-MM-DD')
    }
  },
  startDate() {
    const currentDate = moment()
    while (currentDate.day() !== 0) {
      currentDate.subtract(1, 'days')
    }
    return currentDate
  },
  endDate() {
    const endDate = moment().add(1, 'month')
    while (endDate.day() !== 6) {
      endDate.add(1, 'days')
    }
    return endDate
  },
  timeSlots(state, getters, rootState, rootGetters) {
    const timeSlots = []
    let timeSlot = moment(START_AT, TIME_SLOT_FORMAT)

    while (timeSlot.isBefore(moment(END_AT, TIME_SLOT_FORMAT))) {
      const breakFrom = moment(BREAK_FROM, TIME_SLOT_FORMAT)
      const breakTo = moment(BREAK_TO, TIME_SLOT_FORMAT)

      const isSameOrBefore = timeSlot.isSameOrBefore(breakFrom)
      const isSameOrAfter = timeSlot.isSameOrAfter(breakTo)
      if (isSameOrBefore || isSameOrAfter) {
        timeSlots.push(timeSlot)
      }

      const hourIncrement = getters.timeSlotIncrement
      timeSlot = timeSlot.clone().add(hourIncrement, 'hours')
    }

    return timeSlots
  },
  timeSlotIncrement(state, getters, rootState, rootGetters) {
    // twoHourかどうかで二時間になる
    return rootGetters['select/isTwoHour'] ? 2 : 1
  },
  getDateSlot(state) {
    return date => {
      if (!state.dateSlots) {
        return null
      }

      const dateString = date.format('YYYYMMDD')
      if (dateString in state.dateSlots) {
        return state.dateSlots[dateString]
      }

      return null
    }
  },
  isLoading(state) {
    return state.dateSlots === null
  }
}
