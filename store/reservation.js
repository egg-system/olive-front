import { route } from '../lib/route'

export const state = () => ({
  doCancel: false,
  reservations: [],
  currentPage: 1,
  totalPages: 0
})

export const mutations = {
  setReservation(state, reservation) {
    state.reservations = [reservation]
  },
  setReservationDatas(state, { reservations, totalPages, currentPage }) {
    state.reservations = reservations
    state.totalPages = totalPages
    state.currentPage = currentPage
  },
  setDoCancel(state, doCancel) {
    state.doCancel = doCancel
  }
}

export const actions = {
  async paginateReservations({ commit, rootState, rootGetters }, page) {
    const authenticatedApi = rootGetters['login/authenticatedApi']
    const reservationsRoute = route(process.env.api.reserveCommit, null, {
      page: page,
      customer_id: rootState.login.customerId
    })
    const result = await authenticatedApi.get(reservationsRoute)

    const resultData = result.data
    commit('setReservationDatas', {
      reservations: resultData.data,
      totalPages: resultData.total_pages,
      currentPage: page
    })
    return true
  },
  async getReservation({ commit, rootGetters }, id) {
    const authenticatedApi = rootGetters['login/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    const result = await authenticatedApi.get(reservationPath)
    commit('setReservation', result.data.data)
    return true
  },
  async destroyReservation({ rootGetters }, id) {
    const authenticatedApi = rootGetters['login/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    try {
      await authenticatedApi.delete(reservationPath)
      return true
    } catch (e) {
      return false
    }
  }
}
