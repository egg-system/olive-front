import axios from 'axios'
import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

/* state */
const initialState = {
  isLogin: false,
  isCreate: false,
  isError: false,
  errorMessage: '',
  isLoading: false,
  firstName: '',
  lastName: '',
  firstNameKana: '',
  lastNameKana: '',
  mail: '',
  mail2: '',
  phoneNumber: '',
  password: '',
  password2: '',
  postalCode: '',
  prefecture: '',
  city: ''
}
export const state = () => Object.assign({}, initialState)

/* getters */
export const getters = {
  isLogin: state => state.isLogin
}

/* mutations */
export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setIsCreate(state, isCreate) {
    state.isCreate = isCreate
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setFirstName(state, firstName) {
    state.firstName = firstName
  },
  setLastName(state, lastName) {
    state.lastName = lastName
  },
  setFirstNameKana(state, firstNameKana) {
    state.firstNameKana = firstNameKana
  },
  setLastNameKana(state, lastNameKana) {
    state.lastNameKana = lastNameKana
  },
  setMail(state, mail) {
    state.mail = mail
  },
  setMail2(state, mail) {
    state.mail2 = mail
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },
  setPassword(state, password) {
    state.password = password
  },
  setPassword2(state, password2) {
    state.password2 = password2
  },
  setPostalCode(state, postalCode) {
    state.postalCode = postalCode
  },
  setPrefecture(state, prefecture) {
    state.prefecture = prefecture
  },
  setCity(state, city) {
    state.city = city
  },
  setError(state, errorMessage = '') {
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

/* actions */
export const actions = {
  // ログインチェック
  async checkLogin({ commit }, { mail, password }) {
    // ローディング中にする
    commit('setIsLoading', true)

    // Basic認証
    const base = Base64.stringify(Utf8.parse(`${mail}:${password}`))
    const result = await axios({
      // TODO:myjsonがPOSTに対応してないので一旦GETにする
      method: 'get',
      url: process.env.api.customerLogin,
      headers: { authorization: `Basic ${base}` }
    })
    if (result.status === 200) {
      // テスト用
      if (mail === 'test1@test' && password === '12345678') {
        // ユーザーの入力値と一致していたらログイン状態をセット
        commit('setIsLogin', true)
        commit('setIsError', false)
        commit('setFirstName', result.data.first_name)
        commit('setLastName', result.data.last_name)
        commit('setFirstNameKana', result.data.first_name_kana)
        commit('setLastNameKana', result.data.last_name_kana)
        commit('setMail', mail)
        commit('setMail2', mail)
        commit('setPhoneNumber', result.data.phone_number)
        return true
      } else {
        commit('setError')
        commit('setIsLoading', false)
        return false
      }
    } else {
      commit('setError')
      commit('setIsLoading', false)
      return false
    }
  },
  // ユーザー作成
  async customerCreate({ commit, state }) {
    const result = await axios.get(process.env.api.customerCreate, {
      mail: state.mail,
      password: state.password,
      first_name: state.firstName,
      last_name: state.lastName,
      first_name_kana: state.firstNameKana,
      last_name_kana: state.lastNameKana,
      phone_number: state.phoneNumber
    })
    if (result.status === 200) {
      commit('reset')
      return true
    } else {
      commit('setError', 'ユーザー作成に失敗しました。')
      return false
    }
  }
}
