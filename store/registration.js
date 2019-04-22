import axios from 'axios'

/* state */
const initialState = {
  coupon: null,
  pregnancyTermSelected: '',
  childrenSelected: '',
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
  setCoupon(state, coupon) {
    state.coupon = coupon
  },
  setPregnancyTermSelected(state, pregnancyTermSelected) {
    state.pregnancyTermSelected = pregnancyTermSelected
  },
  setChildrenSelected(state, childrenSelected) {
    state.childrenSelected = childrenSelected
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
    return state.isFirst instanceof Boolean
  },
  canReceiveMail(state) {
    return state.message === 'yes'
  },
  reservationParameters(state, getters, rootState, rootGetters) {
    const reservationAt = rootState.select.dateTime

    if (!reservationAt) {
      return null
    }

    // 回数券周りの処理を追加する
    return {
      store_id: rootState.shop.id,
      customer_id: rootState.login.customerId,
      pregnancy_state: state.pregnancyTermSelected,
      children_count: state.childrenSelected,
      reservation_comment: state.request,
      reservation_date: reservationAt.format('YYYY-MM-DD'),
      start_time: reservationAt.format('HH:mm'),
      reservation_details_attributes:
        rootGetters['select/reservationDetailsParameters']
    }
  }
}

/* actions */
export const actions = {
  resetCustomerWithReserve({ commit }) {
    commit('reset')
    commit('login/reset', null, { root: true })
  },
  async registerCustomerWithReserve(context) {
    if (!getters.isValidRegistration) {
      context.commit('setError', 'パラメータが不正です。')
      return false
    }

    let doCreateReservation = true
    if (!context.rootState.login.isLogin) {
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

    if (await context.dispatch('createReservation')) {
      context.dispatch('resetCustomerWithReserve')
    }
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
