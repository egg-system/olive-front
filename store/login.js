import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  isLogin: false,
  isError: false,
  userName: ''
})

/* getters */
export const getters = {
  isLogin: state => state.isLogin
}

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
  async checkLogin({ commit }, { userName, password }) {
    // 一度エラーはリセットする
    commit('setIsError', false)

    // TODO:インターフェースは仮なのであとで修正する
    const res = await axios.get(config.api.login1)

    // ユーザーの入力値と一致していたらログイン状態をセット
    if (userName === res.data.userName && password === res.data.password) {
      commit('setIsLogin', true)
      commit('setIsError', false)
      commit('setUserName', res.data.userName)
    } else {
      commit('setIsError', true)
    }
  }
}
