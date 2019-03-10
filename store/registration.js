import axios from 'axios'
import config from '~/config/constant.json'

/* state */
const initialState = {
  menuId: '',
  coupon: null,
  pregnancyTermSelected: '',
  childrenSelected: '',
  isFirst: true,
  message: 'yes',
  isOk: null,
  request: '',
  isError: false
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
  setIsError(state, isError) {
    state.isError = isError
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* actions */
export const actions = {
  async reserveCommit({ state, commit }, customerId) {
    console.log(state)
    // 予約確定APIの実行
    const result = await axios.get(config.api.reserveCommit, {
      menu_id: state.menuId,
      is_first: state.isFirst,
      customer_id: customerId,
      is_use_coupon: state.coupon,
      pregnancy_term: state.pregnancyTermSelected,
      children: state.childrenSelected,
      is_get_message: state.message,
      request: state.request
    })
    if (result.status === 200) {
      commit('setIsError', false)
    } else {
      commit('setIsError', true)
    }
  }
}
