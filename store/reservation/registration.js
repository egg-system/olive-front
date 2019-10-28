import axios from 'axios'

/* state */
const initialState = {
  message: 'yes',
  isOk: null,
  request: '',
  isError: false,
  errorMessage: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setMessage(state, message) {
    state.message = message
  },
  setIsOk(state, isOk) {
    state.isOk = isOk
  },
  setRequest(state, request) {
    state.request = request
  },
  setError(state, errorMessage) {
    // stateを初期化
    state = Object.assign(state, initialState)
    // エラー情報だけセットする
    state.isError = true
    state.errorMessage = errorMessage
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

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
  }
}

/* actions */
export const actions = {
  resetAllInputed({ commit, rootState }) {
    commit('reset')
    commit('reservation/select/reset', null, { root: true })
    commit('user/reset', null, { root: true })
  },
  async registerCustomerWithReserve(context) {
    if (!context.getters.isValidRegistration) {
      context.commit('setError', 'パラメータが不正です。')
      return false
    }

    let doCreateReservation = true
    if (!context.rootGetters['user/isLogin']) {
      doCreateReservation = await context.dispatch(
        'user/createCustomer',
        null,
        {
          root: true
        }
      )
    }

    if (!doCreateReservation) {
      return
    }

    return await context.dispatch('createReservation')
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
        'setError',
        '選択された日時が既に予約されてしまった可能性がございます。'
      )
      return false
    }
  }
}
