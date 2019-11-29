import axios from 'axios'
import moment from 'moment'
import { state, getters, mutations, actions } from '~/store/reservation/date.js'
import { initialize, initializeStore } from '~/__tests__/test-utils.js'
import reservationDateData from '~/__tests__/fixtures/reservation/date.json'

jest.mock('axios')

describe('store/reservation/date.js', () => {
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
      dateSlots: null
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
    test('setDateSlots', () => {
      const dummyData = 'dummyData'
      store.commit('setDateSlots', dummyData)

      expect(store.state).toEqual({ dateSlots: dummyData })
    })
  })

  /* actions */
  describe('actions', () => {
    let commit
    beforeEach(() => {
      commit = jest.fn()
    })

    test('getCalendar', async () => {
      const getters = { dateRoute: 'dummyDateRoute' }
      const dummyResponse = { data: 'dummyData' }
      axios.get.mockResolvedValue(Promise.resolve(dummyResponse))
      await actions.getCalendar({ commit, getters })

      expect(axios.get.mock.calls.length).toBe(1)
      expect(commit).toHaveBeenCalledWith('setDateSlots', dummyResponse.data)
    })
  })

  // getters
  describe('getters', () => {
    const modules = {
      reservation: {
        state: {
          select: { storeId: 'dummyStoreId' }
        },
        select: {
          getters: {
            'select/allSelectedMenuIds': () => 'dummyAllSelectedMenuIds',
            'select/allSelectedOptionIds': () => 'dummyAllSelectedOptionIds',
            'select/isTwoHour': () => 2
          }
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
      store.commit('setDateSlots', reservationDateData)
    })

    test('dateRoute', () => {
      expect(store.getters.dateRoute).toMatch(
        /^http:\/\/localhost:8080\/api\/shops/
      )
    })

    test('dateParameters', () => {
      const dateParameters = store.getters.dateParameters
      expect(dateParameters.menu_ids).toEqual(
        modules.reservation.select.getters.allSelectedMenuIds
      )
      expect(dateParameters.option_ids).toEqual(
        modules.reservation.select.getters.allSelectedOptionIds
      )
    })

    test('timeSlotIncrement', () => {
      expect(store.getters.timeSlotIncrement).toBeTruthy()
    })

    test('getDateSlot', () => {
      const date = moment('2019-11-30')
      expect(store.getters.getDateSlot(date)).toEqual([
        {
          start_time: '2019-11-30T10:00:00.000+09:00',
          staff_ids: [9]
        }
      ])
    })

    test('isLoading', () => {
      expect(store.getters.isLoading).toBeFalsy()
    })
  })
})
