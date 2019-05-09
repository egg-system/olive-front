import { route } from '../lib/route'

export const state = () => ({
  reservations: [],
  currentPage: null,
  totalPages: null
})

export const mutations = {
  setReservations(state, { reservations, totalPages, currentPage }) {
    state.reservations = reservations
    state.totalPages = totalPages
    state.currentPage = currentPage
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
    commit('setReservations', {
      reservations: resultData.data,
      totalPage: resultData.total_pages,
      currentPage: page
    })
    return true
  }
}
