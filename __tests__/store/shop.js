import axios from 'axios'
import { state, getters, mutations, actions } from '~/store/shop.js'
import { initialize, initializeStore } from '~/__tests__/test-utils.js'
import shopData from '~/__tests__/fixtures/shop.json'

jest.mock('axios')

describe('store/shop.js', () => {
  let store, initialState

  beforeAll(() => {
    initialize()
  })

  beforeEach(() => {
    store = initializeStore({ state, mutations, actions, getters })

    initialState = {
      id: null,
      name: null,
      open_at: null,
      close_at: null,
      break_from: null,
      break_to: null
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
    test('setShop', () => {
      const dummyData = {
        id: 'dummyId',
        name: 'dummyName',
        open_at: 'dummyOpenAt',
        close_at: 'dummyCloseAt',
        break_from: 'dummyBreakFrom',
        break_to: 'dummyBreakTo'
      }
      store.commit('setShop', dummyData)

      expect(store.state).toEqual({
        id: dummyData.id,
        name: dummyData.name,
        open_at: dummyData.open_at,
        close_at: dummyData.close_at,
        break_from: dummyData.break_from,
        break_to: dummyData.break_to
      })
    })
  })

  /* actions */
  describe('actions', () => {
    let commit
    beforeEach(() => {
      commit = jest.fn()
    })

    test('getShop', async () => {
      const dummyParams = { id: 1 }
      const dummyResponse = { data: 'dummyData' }
      axios.get.mockResolvedValue(Promise.resolve(dummyResponse))
      await actions.getShop({ commit }, dummyParams)

      expect(axios.get.mock.calls.length).toBe(1)
      expect(commit).toHaveBeenCalledWith('setShop', dummyResponse.data)
    })
  })

  // getters
  describe('getters', () => {
    beforeEach(() => {
      store.commit('setShop', shopData)
    })

    test('breakFrom', () => {
      expect(store.getters.breakFrom).toEqual('')
    })

    test('breakTo', () => {
      expect(store.getters.breakTo).toEqual('')
    })

    test('hasBreakTime', () => {
      expect(store.getters.hasBreakTime).toBeFalsy()
    })
  })
})
