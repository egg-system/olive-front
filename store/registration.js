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

    let doCreateReserve = true
    if (!context.rootState.login.isLogin) {
      doCreateReserve = await context.dispatch('login/createCustomer', null, {
        root: true
      })
    }

    if (!doCreateReserve) {
      return
    }

    await context.dispatch('createReserve')
    context.dispatch('resetCustomerWithReserve')
  },
  async createReserve({ state, commit, rootState, rootGetters }) {
    try {
      // 予約確定APIの実行
      const result = await axios.post(process.env.api.reserveCommit, {
        menus: rootGetters['select/allSelectedMenuIds'],
        is_first: state.isFirst,
        customer_id: rootState.logion.customerId,
        is_use_coupon: state.coupon,
        pregnancy_term: state.pregnancyTermSelected,
        children: state.childrenSelected,
        is_get_message: state.message,
        request: state.request
      })
      return true
    } catch (error) {
      commit('setError', '予約に失敗しました。')
      return false
    }
  }
}
