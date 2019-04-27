import axios from 'axios'

/* state */
const initialState = {
  accessToken: null,
  client: null,
  uid: null,
  isLogin: false,
  isCreate: false,
  isError: false,
  errorMessage: '',
  isLoading: false,
  customerId: null,
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
  isLogin(state) {
    return state.isLogin
  },
  isRegisteredCustomer(state, getters) {
    return getters.isLogin && !state.isCreate
  },
  authenticatedApi(state) {
    const authApi = axios.create()
    authApi.defaults.headers.common['access-token'] = state.accessToken
    authApi.defaults.headers.common['client'] = state.client
    authApi.defaults.headers.common['uid'] = state.uid
    return authApi
  },
  provider(state) {
    return state.isCreate ? 'email' : 'none'
  },
  customerParameters(state, getters, rootState, rootGetters) {
    return {
      email: state.mail,
      password: state.password,
      first_name: state.firstName,
      last_name: state.lastName,
      first_kana: state.firstNameKana,
      last_kana: state.lastNameKana,
      tel: state.phoneNumber,
      provider: getters.provider,
      can_receive_mail: rootGetters['registration/canReceiveMail'],
      first_visit_store_id: rootState.select.menus[0].storeId,
      last_visit_store_id: rootState.select.menus[0].storeId
    }
  }
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
  setCustomerId(state, customerId) {
    state.customerId = customerId
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
  },
  setToken(state, authenticates) {
    state.accessToken = authenticates['access-token']
    state.client = authenticates['client']
    state.uid = authenticates['uid']
  },
  // パスワードリセットに必要な情報をクリアする
  resetPasswordInfo(state) {
    state.mail = ''
    state.mail2 = ''
    state.phoneNumber = ''
    state.password = ''
    state.password2 = ''
  },
  // 新規会員登録に必要な情報をクリアする
  resetCustomerInfo(state) {
    state.firstName = ''
    state.lastName = ''
    state.firstNameKana = ''
    state.lastNameKana = ''
    state.mail = ''
    state.mail2 = ''
    state.phoneNumber = ''
    state.password = ''
    state.password2 = ''
    state.postalCode = ''
    state.prefecture = ''
    state.city = ''
  }
}

/* actions */
export const actions = {
  setLoginCustomer({ commit }, customer) {
    commit('setIsLogin', true)
    commit('setCustomerId', customer.id)
    commit('setFirstName', customer.first_name)
    commit('setLastName', customer.last_name)
    commit('setFirstNameKana', customer.first_kana)
    commit('setLastNameKana', customer.last_kana)
    commit('setMail', customer.email)
    commit('setMail2', customer.email)
    commit('setPhoneNumber', customer.tel)

    return customer
  },
  // ログインチェック
  async checkLogin({ commit, dispatch }, { mail, password }) {
    // ローディング中にする
    commit('setIsLoading', true)

    const parameters = new URLSearchParams()
    parameters.append('email', mail)
    parameters.append('password', password)

    try {
      const result = await axios.post(process.env.api.customerLogin, {
        email: mail,
        password: password
      })

      commit('setToken', result.headers)
      dispatch('setLoginCustomer', result.data.data)

      return true
    } catch (error) {
      console.log(error)
      commit('setError')
    } finally {
      commit('setIsLoading', false)
    }

    return false
  },
  // ユーザー作成
  async createCustomer({ commit, dispatch, getters }) {
    try {
      const result = await axios.post(
        process.env.api.customerCreate,
        getters.customerParameters
      )

      dispatch('setLoginCustomer', result.data.data)
      return true
    } catch (error) {
      console.log(error)
      const errorMessage =
        error.response.status === 422
          ? '登録済みのメールアドレスです。'
          : 'ユーザー作成に失敗しました。'
      commit('setError', errorMessage)
      return false
    }
  },
  async sendPasswrodResetMail({ state }) {
    await axios.post(process.env.api.customerReset, {
      email: state.mail,
      redirect_url: `${window.location.origin}/password/set`
    })
    commit('resetPasswordInfo')
  },
  async updatePassword({ state, getters, commit }) {
    await getters.authenticatedApi.patch(process.env.api.customerReset, {
      password: state.password,
      password_confirmation: state.password2
    })
    commit('reset')
  }
}
