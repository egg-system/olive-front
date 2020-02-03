import axios from 'axios'
import get from 'lodash/get'
import {
  checkMail,
  checkPassword,
  checkName,
  checkNameKana,
  checkPhoneNumber,
  checkSame
} from '~/lib/validation'

/* state */
const initialState = {
  isCreate: true,
  errorMessage: '',
  isLoading: false,
  customerId: null,
  firstName: '',
  lastName: '',
  firstNameKana: '',
  lastNameKana: '',
  mail: '',
  mailConfirm: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
  postalCode: '',
  prefecture: '',
  city: '',
  coupons: [],
  childrenCount: 0,
  isFirst: null
}
export const state = () => {
  return {
    accessToken: null,
    client: null,
    uid: null,
    ...initialState
  }
}

/* getters */
export const getters = {
  custmerFullName(state) {
    return `${state.lastName} ${state.firstName}`
  },
  isLogin(state) {
    return Boolean(state.accessToken && state.accessToken && state.uid)
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
  updateParams(state, getters, rootState, rootGetters) {
    return {
      first_name: state.firstName,
      last_name: state.lastName,
      first_kana: state.firstNameKana,
      last_kana: state.lastNameKana,
      tel: state.phoneNumber,
      can_receive_mail: rootGetters['reservation/canReceiveMail'],
      zip_code: state.postalCode,
      prefecture: state.prefecture,
      city: state.city
    }
  },
  createParams(state, getters, rootState) {
    return {
      email: state.mail,
      password: state.password,
      provider: getters.provider,
      first_visit_store_id: rootState.reservation.select.storeId,
      last_visit_store_id: rootState.reservation.select.storeId,
      ...getters.updateParams
    }
  },
  customerMustUpdate(state, getters) {
    return (
      getters.isLogin &&
      (!state.firstNameKana || !state.lastNameKana || !state.phoneNumber)
    )
  },
  isFirstValue(state, getters) {
    if (state.isFirst === null) {
      return !getters.isLogin
    }

    return state.isFirst
  },
  validRegistrationInput(state) {
    // バリデーションチェック
    if (
      checkName(state.firstName) !== true ||
      checkName(state.lastName) !== true ||
      checkNameKana(state.firstNameKana) !== true ||
      checkNameKana(state.lastNameKana) !== true ||
      checkMail(state.mail) !== true ||
      checkMail(state.mailConfirm) !== true ||
      checkPhoneNumber(state.phoneNumber) !== true
    ) {
      return false
    }
    // 同一チェック
    if (checkSame(state.mail, state.mailConfirm) !== true) {
      return false
    }
    return true
  },
  validPasswordInput(state) {
    // バリデーションチェック
    if (
      checkPassword(state.password) !== true ||
      checkPassword(state.passwordConfirm) !== true
    ) {
      return false
    }
    // 同一チェック
    if (checkSame(state.password, state.passwordConfirm) !== true) {
      return false
    }
    return true
  },
  validCreateInput(state, getters) {
    if (!getters.validRegistrationInput) {
      return false
    }
    if (!getters.validPasswordInput) {
      return false
    }
    return true
  },
  validMailInput(state) {
    // バリデーションチェック
    if (
      checkMail(state.mail) !== true ||
      checkMail(state.mailConfirm) !== true
    ) {
      return false
    }
    // 同一チェック
    if (checkSame(state.mail, state.mailConfirm) !== true) {
      return false
    }
    return true
  },
  isError(state) {
    return !!state.errorMessage
  }
}

/* mutations */
export const mutations = {
  // TODO: #125 廃止する
  setIsCreate(state, isCreate) {
    state.isCreate = true
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
  setMailConfirm(state, mail) {
    state.mailConfirm = mail
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },
  setPassword(state, password) {
    state.password = password
  },
  setPasswordConfirm(state, passwordConfirm) {
    state.passwordConfirm = passwordConfirm
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
  setErrorMessage(state, errorMessage = '') {
    // stateを初期化
    state = Object.assign(state, initialState)
    // エラー情報だけセットする
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
  logout(state) {
    state.accessToken = null
    state.client = null
    state.uid = null
    state = Object.assign(state, initialState)
  },
  setCoupons(state, coupons) {
    state.coupons = coupons
  },
  setChildrenCount(state, childrenCount) {
    state.childrenCount = childrenCount
  },
  setIsFirst(state, isFirst) {
    state.isFirst = isFirst
  }
}

/* actions */
export const actions = {
  setLoginCustomer({ commit }, customer) {
    commit('setCustomerId', customer.id)
    commit('setFirstName', customer.first_name)
    commit('setLastName', customer.last_name)
    commit('setFirstNameKana', customer.first_kana)
    commit('setLastNameKana', customer.last_kana)
    commit('setMail', customer.email)
    commit('setMailConfirm', customer.email)
    commit('setPhoneNumber', customer.tel)
    commit('setPostalCode', customer.zip_code)
    commit('setPrefecture', customer.prefecture)
    commit('setCity', customer.city)

    return customer
  },
  // ログインチェック
  async checkLogin({ commit, dispatch }, { mail, password }) {
    // ローディング中にする
    commit('setIsLoading', true)

    const parameters = new FormData()
    parameters.append('email', mail)
    parameters.append('password', password)

    try {
      const result = await axios.post(process.env.api.customerLogin, parameters)

      commit('setToken', result.headers)
      dispatch('setLoginCustomer', result.data.data)

      return true
    } catch (error) {
      commit('setErrorMessage', 'ログインに失敗しました。')
    } finally {
      commit('setIsLoading', false)
    }

    return false
  },
  // ユーザー作成
  async createCustomer({ commit, dispatch, getters, rootState }) {
    try {
      const result = await axios.post(
        process.env.api.customerCreate,
        getters.createParams
      )

      dispatch('setLoginCustomer', result.data.data)
      return true
    } catch (error) {
      console.log(error)
      const errorMessage =
        get(error, 'response.status') === 422
          ? `
            メールドレスが既に登録されています。
            <a href="/login/?shopId=${
              rootState.reservation.select.storeId
            }">こちら</a>からログインしてください。<br>
            パスワードを忘れた場合は、<a href="/password/reset">こちら</a>から再発行できます。<br>
          `
          : 'ユーザー作成に失敗しました。'
      commit('setErrorMessage', errorMessage)
      return false
    }
  },
  async updateCustomer({ commit, dispatch, getters }) {
    try {
      const result = await getters.authenticatedApi.patch(
        process.env.api.customerCreate,
        getters.updateParams
      )

      dispatch('setLoginCustomer', result.data.data)
      return true
    } catch (error) {
      console.log(error)
      commit('setErrorMessage', 'プロフィール更新に失敗しました。')
      return false
    }
  },
  async sendPasswrodResetMail({ state, commit }) {
    await axios
      .post(process.env.api.customerReset, {
        email: state.mail,
        redirect_url: `${window.location.origin}/password/set/`
      })
      .catch(e => {
        const error = new Error(
          '登録されていないメールアドレスが入力されました。<br>正しいメールアドレスを再度ご入力ください。'
        )
        error.statusCode = 500
        throw error
      })
    commit('reset')
  },
  async updatePassword({ state, getters, commit }) {
    const parameters = new FormData()
    parameters.append('password', state.password)
    parameters.append('password_confirmation', state.passwordConfirm)

    await getters.authenticatedApi.patch(
      process.env.api.customerReset,
      parameters
    )
    commit('reset')
    commit('logout')
  },
  async validateToken({ commit, dispatch, getters }) {
    const result = await getters.authenticatedApi
      .get(process.env.api.validateToken)
      .catch(error => {
        commit('logout')
        return null
      })

    if (result) {
      await dispatch('setLoginCustomer', result.data.data)
    }
  }
}
