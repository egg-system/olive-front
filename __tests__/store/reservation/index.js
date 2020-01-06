import axios from 'axios'
import moment from 'moment'
import {
  state,
  getters,
  mutations,
  actions
} from '~/store/reservation/index.js'
import { initialize, initializeStore } from '~/__tests__/test-utils.js'
import reservationsData from '~/__tests__/fixtures/reservation/reservations.json'

jest.mock('axios')

describe('store/reservation/index.js', () => {
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
      doCancel: false,
      reservations: [],
      totalPages: 0,
      message: 'yes',
      isOk: null,
      request: '',
      errorMessage: ''
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
    test('setReservations', () => {
      const dummyData = 'dummyData'
      store.commit('setReservations', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        reservations: [dummyData]
      })
    })

    test('setReservationDatas', () => {
      const dummyData = {
        reservations: 'dummyReservations',
        totalPages: 'dummyTotalPages'
      }
      store.commit('setReservationDatas', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        reservations: dummyData.reservations,
        totalPages: dummyData.totalPages
      })
    })

    test('setDoCancel', () => {
      const dummyData = true
      store.commit('setDoCancel', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        doCancel: dummyData
      })
    })

    test('setMessage', () => {
      const dummyData = 'dummyData'
      store.commit('setMessage', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        message: dummyData
      })
    })

    test('setIsOk', () => {
      const dummyData = 'dummyData'
      store.commit('setIsOk', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        isOk: dummyData
      })
    })

    test('setRequest', () => {
      const dummyData = 'dummyData'
      store.commit('setRequest', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        request: dummyData
      })
    })

    test('setErrorMessage', () => {
      // 適当な値を入れる
      const dummyReservationDatas = {
        reservations: 'dummyReservations',
        totalPages: 'dummyTotalPages'
      }
      store.commit('setReservationDatas', dummyReservationDatas)

      const dummyData = 'dummyData'
      store.commit('setErrorMessage', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        errorMessage: dummyData
      })
    })

    test('reset', () => {
      // 適当な値を入れる
      const dummyData = {
        reservations: 'dummyReservations',
        totalPages: 'dummyTotalPages'
      }
      store.commit('setReservationDatas', dummyData)

      store.commit('reset')

      expect(store.state).toEqual(initialState)
    })
  })

  /* actions */
  describe('actions', () => {
    let commit, dispatch
    beforeEach(() => {
      commit = jest.fn()
      dispatch = jest.fn()
    })

    test('getReservation', async () => {
      const dummyId = 'dummyId'
      const dummyResponse = {
        data: { data: 'dummyData' }
      }
      const rootGetters = {
        'user/authenticatedApi': {
          get: jest.fn(async () => dummyResponse)
        }
      }
      const result = await actions.getReservation(
        { commit, rootGetters },
        dummyId
      )

      expect(result).toBeTruthy()
      expect(rootGetters['user/authenticatedApi'].get).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith(
        'setReservations',
        dummyResponse.data.data
      )
    })

    test('getReservations', async () => {
      const dummyPage = 'dummyPage'
      const dummyResponse = {
        data: {
          data: 'dummyData',
          total_pages: 'dummyTotalPages'
        }
      }
      const rootState = {
        user: { customerId: 'dummyCustomerId' }
      }
      const rootGetters = {
        'user/authenticatedApi': {
          get: jest.fn(async () => dummyResponse)
        }
      }
      const result = await actions.getReservations(
        { commit, rootState, rootGetters },
        dummyPage
      )

      expect(result).toBeTruthy()
      expect(rootGetters['user/authenticatedApi'].get).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('setReservationDatas', {
        reservations: dummyResponse.data.data,
        totalPages: dummyResponse.data.total_pages
      })
    })

    test('destroyReservation', async () => {
      const dummyId = 'dummyId'
      const dummyResponse = {
        data: { data: 'dummyData' }
      }
      const rootGetters = {
        'user/authenticatedApi': {
          delete: jest.fn(async () => dummyResponse)
        }
      }
      await actions.destroyReservation({ rootGetters }, dummyId)

      expect(rootGetters['user/authenticatedApi'].delete).toHaveBeenCalledTimes(
        1
      )
    })

    test('resetAllInputed', () => {
      actions.resetAllInputed({ commit })

      expect(commit).toHaveBeenCalledWith('reset')
      expect(commit).toHaveBeenCalledWith('reservation/select/reset', null, {
        root: true
      })
      expect(commit).toHaveBeenCalledWith('user/reset', null, {
        root: true
      })
    })

    test('registerCustomerWithReserve', async () => {
      const getters = { isValidRegistration: true }
      dispatch = jest.fn(() => true)
      const rootGetters = {
        'user/isLogin': false
      }
      const result = await actions.registerCustomerWithReserve({
        getters,
        commit,
        dispatch,
        rootGetters
      })

      expect(result).toBeTruthy()
      expect(dispatch).toHaveBeenCalledWith('user/createCustomer', null, {
        root: true
      })
      expect(dispatch).toHaveBeenCalledWith('createReservation')
    })

    test('createReservation', async () => {
      const dummyResponse = {
        data: { data: 'dummyData' }
      }
      axios.post.mockResolvedValue(Promise.resolve(dummyResponse))
      const getters = { reservationParameters: 'dummyReservationParams' }
      const result = await actions.createReservation({ commit, getters })

      expect(result).toBeTruthy()
      expect(axios.post.mock.calls.length).toBe(1)
    })
  })

  // getters
  describe('getters', () => {
    const modules = {
      user: {
        state: {
          coupons: [{ id: 'dummyId' }],
          customerId: 'dummyCustomerId',
          childrenCount: 'dummyChildrenCount'
        },
        getters: {
          'user/isFirstValue': () => true
        }
      },
      reservation: {
        state: {
          select: {
            dateTime: moment('2019-01-01 12:00:00'),
            storeId: 'dummyStoreId'
          }
        },
        getters: {
          'reservation/select/reservationDetailsParameters': () =>
            'dummyReservationDetailsParameters'
        }
      }
    }
    beforeEach(() => {
      store = initializeStore({
        state,
        mutations,
        actions,
        getters,
        modules
      })
      store.commit('setReservationDatas', {
        reservations: reservationsData.data,
        totalPages: reservationsData.total_pages
      })
    })

    test('isValidRegistration', () => {
      expect(store.getters.isValidRegistration).toBeTruthy()
    })

    test('canReceiveMail', () => {
      expect(store.getters.canReceiveMail).toBeTruthy()
    })

    test('selectedCouponIds', () => {
      const dummyIds = modules.user.state.coupons.map(coupon => coupon.id)
      expect(store.getters.selectedCouponIds).toEqual(dummyIds)
    })

    test('reservationParameters', () => {
      const dummyReservationAt = modules.reservation.state.select.dateTime
      const dummyParams = {
        customer_id: modules.user.state.customerId,
        store_id: modules.reservation.state.select.storeId,
        children_count: modules.user.state.childrenCount,
        reservation_comment: store.state.request,
        reservation_date: dummyReservationAt.format('YYYY-MM-DD'),
        start_time: dummyReservationAt.format('HH:mm'),
        is_first: modules.user.getters['user/isFirstValue'](),
        coupon_ids: store.getters.selectedCouponIds,
        reservation_details_attributes: modules.reservation.getters[
          'reservation/select/reservationDetailsParameters'
        ]()
      }
      expect(store.getters.reservationParameters).toEqual(dummyParams)
    })

    test('isError', () => {
      expect(store.getters.isError).toBeFalsy()
    })
  })
})
