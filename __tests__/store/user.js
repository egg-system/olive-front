import axios from 'axios'
import { state, getters, mutations, actions } from '~/store/user.js'
import { initialize, initializeStore } from '~/__tests__/test-utils.js'
import userData from '~/__tests__/fixtures/user.json'

jest.mock('axios')

describe('store/user.js', () => {
  let store, initialState

  beforeAll(() => {
    initialize()
  })

  beforeEach(() => {
    store = initializeStore({
      state,
      mutations,
      actions,
      getters
    })

    initialState = {
      accessToken: null,
      client: null,
      uid: null,
      isCreate: false,
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
  })

  /* state */
  describe('state', () => {
    test('initial state', () => {
      expect(store.state).toEqual(initialState)
    })
  })

  /* mutations */
  describe('mutations', () => {
    test('setIsCreate', () => {
      const dummyData = true
      store.commit('setIsCreate', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        isCreate: true
      })
    })

    test('setIsLoading', () => {
      const dummyData = true
      store.commit('setIsLoading', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        isLoading: true
      })
    })

    test('setCustomerId', () => {
      const dummyData = 'dummyId'
      store.commit('setCustomerId', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        customerId: dummyData
      })
    })

    test('setFirstName', () => {
      const dummyData = 'dummyName'
      store.commit('setFirstName', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        firstName: dummyData
      })
    })

    test('setLastName', () => {
      const dummyData = 'dummyName'
      store.commit('setLastName', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        lastName: dummyData
      })
    })

    test('setFirstNameKana', () => {
      const dummyData = 'dummyName'
      store.commit('setFirstNameKana', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        firstNameKana: dummyData
      })
    })

    test('setLastNameKana', () => {
      const dummyData = 'dummyName'
      store.commit('setLastNameKana', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        lastNameKana: dummyData
      })
    })

    test('setMail', () => {
      const dummyData = 'dummyMail'
      store.commit('setMail', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        mail: dummyData
      })
    })

    test('setMailConfirm', () => {
      const dummyData = 'dummyMail'
      store.commit('setMailConfirm', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        mailConfirm: dummyData
      })
    })

    test('setPhoneNumber', () => {
      const dummyData = 'dummyPhoneNumber'
      store.commit('setPhoneNumber', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        phoneNumber: dummyData
      })
    })

    test('setPassword', () => {
      const dummyData = 'dummyPassword'
      store.commit('setPassword', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        password: dummyData
      })
    })

    test('setPasswordConfirm', () => {
      const dummyData = 'dummyPassword'
      store.commit('setPasswordConfirm', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        passwordConfirm: dummyData
      })
    })

    test('setPostalCode', () => {
      const dummyData = 'dummyPostalCode'
      store.commit('setPostalCode', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        postalCode: dummyData
      })
    })

    test('setPrefecture', () => {
      const dummyData = 'dummyPrefecture'
      store.commit('setPrefecture', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        prefecture: dummyData
      })
    })

    test('setCity', () => {
      const dummyData = 'dummyCity'
      store.commit('setCity', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        city: dummyData
      })
    })

    test('setErrorMessage', () => {
      const dummyData = 'dummyErrorMessage'
      store.commit('setErrorMessage', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        errorMessage: dummyData
      })
    })

    test('reset', () => {
      // データを適当にいじっておく
      const dummyData = 'dummyData'
      store.commit('setFirstName', dummyData)
      store.commit('setLastName', dummyData)
      store.commit('setFirstNameKana', dummyData)
      store.commit('setLastNameKana', dummyData)

      store.commit('reset')

      expect(store.state).toEqual(initialState)
    })

    test('setToken', () => {
      const dummyData = {
        'access-token': 'dummyAccessToken',
        client: 'dummyClient',
        uid: 'dummyUid'
      }
      store.commit('setToken', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        accessToken: dummyData['access-token'],
        client: dummyData.client,
        uid: dummyData.uid
      })
    })

    test('logout', () => {
      // データを事前に入れておく
      const dummyData = {
        'access-token': 'dummyAccessToken',
        client: 'dummyClient',
        uid: 'dummyUid'
      }
      store.commit('setToken', dummyData)

      store.commit('logout')

      expect(store.state).toEqual(initialState)
    })

    test('setCoupons', () => {
      // データを事前に入れておく
      const dummyData = 'dummyCoupons'
      store.commit('setCoupons', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        coupons: dummyData
      })
    })

    test('setChildrenCount', () => {
      // データを事前に入れておく
      const dummyData = 'dummyChildCount'
      store.commit('setChildrenCount', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        childrenCount: dummyData
      })
    })

    test('setIsFirst', () => {
      // データを事前に入れておく
      const dummyData = true
      store.commit('setIsFirst', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        isFirst: dummyData
      })
    })
  })

  /* actions */
  describe('actions', () => {
    let commit, dispatch
    beforeEach(() => {
      commit = jest.fn()
      dispatch = jest.fn()
      axios.post.mockClear()
    })

    test('setLoginCustomer', () => {
      const dummyCustomer = {
        id: 'dummyId',
        first_name: 'dummyFirstName',
        last_name: 'dummuLastName',
        first_kana: 'dummyFirstKana',
        last_kana: 'dummuLastKana',
        email: 'dummyEmail',
        tel: 'dummyTel',
        zip_code: 'dummyZipCode',
        prefecture: 'dummyPrefecture',
        city: 'dummyCity'
      }
      actions.setLoginCustomer({ commit }, dummyCustomer)

      expect(commit).toHaveBeenCalledWith('setCustomerId', dummyCustomer.id)
      expect(commit).toHaveBeenCalledWith(
        'setFirstName',
        dummyCustomer.first_name
      )
      expect(commit).toHaveBeenCalledWith(
        'setLastName',
        dummyCustomer.last_name
      )
      expect(commit).toHaveBeenCalledWith(
        'setFirstNameKana',
        dummyCustomer.first_kana
      )
      expect(commit).toHaveBeenCalledWith(
        'setLastNameKana',
        dummyCustomer.last_kana
      )
      expect(commit).toHaveBeenCalledWith('setMail', dummyCustomer.email)
      expect(commit).toHaveBeenCalledWith('setMailConfirm', dummyCustomer.email)
      expect(commit).toHaveBeenCalledWith('setPhoneNumber', dummyCustomer.tel)
      expect(commit).toHaveBeenCalledWith(
        'setPostalCode',
        dummyCustomer.zip_code
      )
      expect(commit).toHaveBeenCalledWith(
        'setPrefecture',
        dummyCustomer.prefecture
      )
      expect(commit).toHaveBeenCalledWith('setCity', dummyCustomer.city)
    })

    test('checkLogin', async () => {
      const dummyParams = { mail: 'dummyMail', password: 'dummyPassword' }
      const dummyResponse = {
        headers: 'dummyHeaders',
        data: {
          data: 'dummyData'
        }
      }
      axios.post.mockResolvedValue(Promise.resolve(dummyResponse))
      const result = await actions.checkLogin({ commit, dispatch }, dummyParams)

      expect(axios.post.mock.calls.length).toBe(1)
      expect(result).toBeTruthy()
      expect(commit).toHaveBeenCalledWith('setIsLoading', true)
      expect(commit).toHaveBeenCalledWith('setToken', dummyResponse.headers)
      expect(dispatch).toHaveBeenCalledWith(
        'setLoginCustomer',
        dummyResponse.data.data
      )
    })

    test('createCustomer', async () => {
      const getters = { createParams: 'dummyParams' }
      const dummyResponse = {
        data: {
          data: 'dummyData'
        }
      }
      axios.post.mockResolvedValue(Promise.resolve(dummyResponse))
      const result = await actions.createCustomer({ commit, dispatch, getters })

      expect(axios.post.mock.calls.length).toBe(1)
      expect(result).toBeTruthy()
      expect(dispatch).toHaveBeenCalledWith(
        'setLoginCustomer',
        dummyResponse.data.data
      )
    })

    test('updateCustomer', async () => {
      const dummyResponse = {
        data: {
          data: 'dummyData'
        }
      }
      const getters = {
        updateParams: 'dummyParams',
        authenticatedApi: {
          patch: jest.fn(async () => dummyResponse)
        }
      }
      const result = await actions.updateCustomer({ commit, dispatch, getters })

      expect(result).toBeTruthy()
      expect(getters.authenticatedApi.patch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        'setLoginCustomer',
        dummyResponse.data.data
      )
    })

    test('sendPasswrodResetMail', async () => {
      const state = { mail: 'dummyMail' }
      const dummyResponse = 'dummyRespose'
      axios.post.mockResolvedValue(Promise.resolve(dummyResponse))
      await actions.sendPasswrodResetMail({ commit, state })

      expect(axios.post.mock.calls.length).toBe(1)
      expect(commit).toHaveBeenCalledWith('reset')
    })

    test('updatePassword', async () => {
      const dummyResponse = 'dummyResponse'
      const state = { password: 'dummyPassword' }
      const getters = {
        authenticatedApi: {
          patch: jest.fn(async () => dummyResponse)
        }
      }
      await actions.updatePassword({ commit, state, getters })

      expect(getters.authenticatedApi.patch).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('reset')
      expect(commit).toHaveBeenCalledWith('logout')
    })

    test('validateToken', async () => {
      const dummyResponse = {
        data: {
          data: 'dummyData'
        }
      }
      const getters = {
        authenticatedApi: {
          get: jest.fn(async () => dummyResponse)
        }
      }
      await actions.validateToken({ commit, dispatch, getters })

      expect(getters.authenticatedApi.get).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        'setLoginCustomer',
        dummyResponse.data.data
      )
    })
  })

  // getters
  describe('getters', () => {
    const modules = {
      reservation: {
        state: {
          select: {
            menus: [{ storeId: 'dummyStoreId' }]
          }
        }
      }
    }
    const dummyIsCreate = true
    const dummyPassword = 'test1234'
    const dummyToken = 'dummyToken'
    const dummyClient = 'dummyClient'
    const dummyCoupons = 'dummyCoupons'
    const dummyChildCount = 1
    const dummyIsFirst = true

    beforeEach(() => {
      store = initializeStore({
        state,
        mutations,
        actions,
        getters,
        modules
      })
      store.commit('setIsCreate', dummyIsCreate)
      store.commit('setCustomerId', userData.id)
      store.commit('setFirstName', userData.first_name)
      store.commit('setLastName', userData.last_name)
      store.commit('setFirstNameKana', userData.first_kana)
      store.commit('setLastNameKana', userData.last_kana)
      store.commit('setMail', userData.email)
      store.commit('setMailConfirm', userData.email)
      store.commit('setPhoneNumber', userData.tel)
      store.commit('setPassword', dummyPassword)
      store.commit('setPasswordConfirm', dummyPassword)
      store.commit('setPostalCode', userData.zip_code)
      store.commit('setPrefecture', userData.prefecture)
      store.commit('setCity', userData.city)
      store.commit('setToken', {
        'access-token': dummyToken,
        client: dummyClient,
        uid: userData.uid
      })
      store.commit('setCoupons', dummyCoupons)
      store.commit('setChildrenCount', dummyChildCount)
      store.commit('setIsFirst', dummyIsFirst)
    })

    test('custmerFullName', () => {
      expect(store.getters.custmerFullName).toEqual(
        `${userData.last_name} ${userData.first_name}`
      )
    })

    test('isLogin', () => {
      expect(store.getters.isLogin).toBeTruthy()
    })

    test('authenticatedApi', () => {
      axios.create.mockResolvedValue(axios.create())
      expect(axios.create).toHaveBeenCalledTimes(1)
    })

    test('provider', () => {
      expect(store.getters.provider).toEqual('email')
    })

    test('updateParams', () => {
      expect(store.getters.updateParams).toEqual({
        first_name: userData.first_name,
        last_name: userData.last_name,
        first_kana: userData.first_kana,
        last_kana: userData.last_kana,
        tel: userData.tel,
        can_receive_mail: undefined,
        zip_code: userData.zip_code,
        prefecture: userData.prefecture,
        city: userData.city
      })
    })

    test('createParams', () => {
      expect(store.getters.createParams).toEqual({
        email: userData.email,
        password: dummyPassword,
        provider: 'email',
        first_visit_store_id: modules.reservation.state.select.storeId,
        last_visit_store_id: modules.reservation.state.select.storeId,
        first_name: userData.first_name,
        last_name: userData.last_name,
        first_kana: userData.first_kana,
        last_kana: userData.last_kana,
        tel: userData.tel,
        can_receive_mail: undefined,
        zip_code: userData.zip_code,
        prefecture: userData.prefecture,
        city: userData.city
      })
    })

    test('customerMustUpdate', () => {
      expect(store.getters.customerMustUpdate).toBeFalsy()
    })

    test('isFirstValue', () => {
      expect(store.getters.isFirstValue).toBeTruthy()
    })

    test('validRegistrationInput', () => {
      expect(store.getters.validRegistrationInput).toBeTruthy()
    })

    test('validPasswordInput', () => {
      expect(store.getters.validPasswordInput).toBeTruthy()
    })

    test('validCreateInput', () => {
      expect(store.getters.validCreateInput).toBeTruthy()
    })

    test('validMailInput', () => {
      expect(store.getters.validMailInput).toBeTruthy()
    })

    test('isError', () => {
      expect(store.getters.isError).toBeFalsy()
    })
  })
})
