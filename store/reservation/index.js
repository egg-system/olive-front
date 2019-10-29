import { route } from '../../lib/route'

/* state */
const initialState = {
  doCancel: false,
  reservations: [],
  totalPages: 0,
  message: 'yes',
  isOk: null,
  request: '',
  errorMessage: ''
}
export const state = () => initialState

/* mutations */
export const mutations = {
  setReservations(state, reservations_param) {
    let reservations = reservations_param

    // 配列ではない場合、配列に変換する
    if (!Array.isArray(reservations)) {
      reservations = [reservations]
    }

    state.reservations = reservations
  },
  setReservationDatas(state, { reservations, totalPages }) {
    state.reservations = reservations
    state.totalPages = totalPages
  },
  setDoCancel(state, doCancel) {
    state.doCancel = doCancel
  },
  setMessage(state, message) {
    state.message = message
  },
  setIsOk(state, isOk) {
    state.isOk = isOk
  },
  setRequest(state, request) {
    state.request = request
  },
  setErrorMessage(state, errorMessage) {
    // stateを初期化
    state = Object.assign(state, initialState)
    // エラー情報だけセットする
    state.errorMessage = errorMessage
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* getters */
export const getters = {
  isValidRegistration(state, getters, rootState, rootGetters) {
    return typeof rootGetters['user/isFirstValue'] === 'boolean'
  },
  canReceiveMail(state) {
    return state.message === 'yes'
  },
  selectedCouponIds(state, getters, rootState) {
    return rootState.user.coupons.map(coupon => coupon.id)
  },
  reservationParameters(state, getters, rootState, rootGetters) {
    const reservationAt = rootState.reservation.select.dateTime

    if (!reservationAt) {
      return null
    }

    // 回数券周りの処理を追加する
    return {
      customer_id: rootState.user.customerId,
      store_id: rootState.reservation.select.storeId,
      children_count: rootState.user.childrenCount,
      reservation_comment: state.request,
      reservation_date: reservationAt.format('YYYY-MM-DD'),
      start_time: reservationAt.format('HH:mm'),
      is_first: rootGetters['user/isFirstValue'],
      coupon_ids: getters.selectedCouponIds,
      reservation_details_attributes:
        rootGetters['reservation/select/reservationDetailsParameters']
    }
  },
  isError(state) {
    return !!state.errorMessage
  }
}

/* actions */
export const actions = {
  async getReservation({ commit, rootGetters }, id) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    const { data } = await authenticatedApi.get(reservationPath)
    commit('setReservations', data.data)
    return true
  },
  async getReservations({ commit, rootState, rootGetters }, page) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationsRoute = route(process.env.api.reserveCommit, null, {
      page: page,
      customer_id: rootState.user.customerId
    })
    const { data } = await authenticatedApi.get(reservationsRoute)

    commit('setReservationDatas', {
      reservations: data.data,
      totalPages: data.total_pages
    })
    return true
  },
  async destroyReservation({ rootGetters }, id) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    await authenticatedApi.delete(reservationPath)
    return true
  },
  resetAllInputed({ commit }) {
    commit('reset')
    commit('reservation/select/reset', null, { root: true })
    commit('user/reset', null, { root: true })
  },
  async registerCustomerWithReserve({
    getters,
    commit,
    dispatch,
    rootGetters
  }) {
    if (!getters.isValidRegistration) {
      commit('setErrorMessage', 'パラメータが不正です。')
      return false
    }

    let doCreateReservation = true
    if (!rootGetters['user/isLogin']) {
      doCreateReservation = await dispatch('user/createCustomer', null, {
        root: true
      })
    }

    if (!doCreateReservation) {
      return
    }

    return await dispatch('createReservation')
  },
  async createReservation({ commit, getters }) {
    try {
      // 予約確定APIの実行
      const result = await axios.post(
        process.env.api.reserveCommit,
        getters.reservationParameters
      )
      return true
    } catch (error) {
      console.log(error)
      commit(
        'setErrorMessage',
        '選択された日時が既に予約されてしまった可能性がございます。'
      )
      return false
    }
  }
}
