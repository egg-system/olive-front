import axios from 'axios'
import config from '../config/constant.json'

/* state */
export const state = () => ({
  isLogin: false,
  isError: false,
  userName: ''
})

/* mutations */
export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setIsError(state, error) {
    state.isError = error
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  logout(state) {
    state.isLogin = false
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async checkLogin({ commit }, payload) {
    // 一度エラーはリセットする
    commit('setIsError', false)

    // TODO:インターフェースは仮なのであとで修正する
    const res = await this.$axios.$get(config.api.login1)
    const userName = payload.userName
    const password = payload.password

    // ユーザーの入力値と一致していたらログイン状態をセット
    if (userName === res.userName && password === res.password) {
      commit('setIsLogin', true)
      commit('setIsError', false)
      commit('setUserName', res.userName)
    } else {
      commit('setIsError', true)
    }
  }
}
