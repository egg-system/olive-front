import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  isLogin: false,
  isError: false,
  mail: ''
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
  setMail(state, mail) {
    state.mail = mail
  },
  logout(state) {
    state.isLogin = false
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async checkLogin({ commit }, { mail, password }) {
    // 一度エラーはリセットする
    commit('setIsError', false)

    // TODO:myjsonがPOSTに対応してないので一旦GETにする
    const result = await axios.get(config.api.login1, {
      mail: mail,
      password: password
    })
    console.log(result)
    if (result.status === 200) {
      // テスト用
      if (mail === 'test1' && password === 'test1') {
        console.log('success')
        // ユーザーの入力値と一致していたらログイン状態をセット
        commit('setIsLogin', true)
        commit('setIsError', false)
        commit('setMail', result.data.mail)
      } else {
        commit('setIsError', true)
      }
    } else {
      commit('setIsError', true)
    }
  }
}
