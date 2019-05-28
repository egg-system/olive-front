import axios from 'axios'

/* state */
const initialState = {
  coupons: [],
  pregnantStateId: 0,
  childrenCount: 0,
  isFirst: true,
  message: 'yes',
  isOk: null,
  request: '',
  isError: false,
  errorMessage: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setCoupons(state, coupons) {
    state.coupons = coupons
  },
  setPregnantStateId(state, pregnantStateId) {
    state.pregnantStateId = pregnantStateId
  },
  setChildrenCount(state, childrenCount) {
    state.childrenCount = childrenCount
  },
  setIsFirst(state, isFirst) {
    state.isFirst = isFirst
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
  isValidRegistration(state) {
    return typeof state.isFirst === 'boolean'
  },
  canReceiveMail(state) {
    return state.message === 'yes'
  },
  canChangeIsFirst(state, getters, rootState, rootGetters) {
    return rootGetters['login/isRegisteredCustomer']
  },
  selctedCouponIds(state) {
    return state.coupons.map(coupon => coupon.id)
  },
  reservationParameters(state, getters, rootState, rootGetters) {
    const reservationAt = rootState.select.dateTime

    if (!reservationAt) {
      return null
    }

    // 回数券周りの処理を追加する
    return {
      customer_id: rootState.login.customerId,
      store_id: rootState.select.storeId,
      pregnancy_state: state.pregnancyTermSelected,
      children_count: state.childrenSelected,
      reservation_comment: state.request,
      reservation_date: reservationAt.format('YYYY-MM-DD'),
      start_time: reservationAt.format('HH:mm'),
      is_first: getters.canChangeIsFirst ? state.isFirst : false,
      coupon_ids: getters.selctedCouponIds,
      reservation_details_attributes:
        rootGetters['select/reservationDetailsParameters']
    }
  }
}

/* actions */
export const actions = {
  resetAllInputed({ commit, rootState }) {
    commit('reset')
    commit('select/reset', null, { root: true })
    commit('login/reset', null, { root: true })
  },
  async registerCustomerWithReserve(context) {
    if (!context.getters.isValidRegistration) {
      context.commit('setError', 'パラメータが不正です。')
      return false
    }

    let doCreateReservation = true
    if (!context.rootGetters['login/isLogin']) {
      doCreateReservation = await context.dispatch(
        'login/createCustomer',
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
      commit('setError', '予約に失敗しました。')
      return false
    }
  }
}
