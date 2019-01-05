import axios from 'axios'
import config from '../config/constant.json'

/* state */
export const state = () => ({
  data: [],
  isLogin: false,
  userName: ''
})

/* mutations */
export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setUserName(state, userName) {
    state.userName = userName
  }
}

/* actions */
export const actions = {
  // ログインチェック
  // async checkLogin({ commit }, userName, password) {
  async checkLogin({ commit }, payload) {
    // TODO:インターフェースは仮なのであとで修正する
    const res = await this.$axios.$get(config.api.login1)
    // レスポンスをセット
    commit('setData', res)
    const userName = payload.userName
    const password = payload.password

    // ユーザーの入力値と一致していたらログイン状態をセット
    if (userName === res.userName && password === res.password) {
      commit('setIsLogin', true)
      commit('setUserName', res.userName)
    }
  }
}
