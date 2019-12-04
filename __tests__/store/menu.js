import axios from 'axios'
import * as _ from 'lodash'
import { state, getters, mutations, actions } from '~/store/menu.js'
import { initialize, initializeStore } from '~/__tests__/test-utils.js'
import menusData from '~/__tests__/fixtures/menus.json'

jest.mock('axios')

describe('store/menu.js', () => {
  let store, initialState

  beforeAll(() => {
    initialize()
  })

  beforeEach(() => {
    store = initializeStore({ state, mutations, actions, getters })

    initialState = {
      subShops: []
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
    test('setMenus', () => {
      const dummyData = 'dummyData'
      store.commit('setMenus', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        subShops: dummyData
      })
    })
  })

  /* actions */
  describe('actions', () => {
    let commit
    beforeEach(() => {
      commit = jest.fn()
    })

    test('getMenus', async () => {
      const dummyParams = { shopId: 1 }
      const dummyResponse = { data: 'dummyData' }
      axios.get.mockResolvedValue(Promise.resolve(dummyResponse))
      await actions.getMenus({ commit }, dummyParams)

      expect(axios.get.mock.calls.length).toBe(1)
      expect(commit).toHaveBeenCalledWith('setMenus', dummyResponse.data)
    })
  })

  // getters
  describe('getters', () => {
    beforeEach(() => {
      store.commit('setMenus', menusData)
    })

    test('hasSubShops', () => {
      expect(store.getters.hasSubShops).toBeTruthy()
    })

    test('allMenus', () => {
      const result = _.flatten(menusData.map(subShop => subShop.menus))
      expect(store.getters.allMenus).toEqual(result)
    })

    test('getMenu', () => {
      const menuId = 1
      const result = menusData[0].menus[0]
      expect(store.getters.getMenu(menuId)).toEqual(result)
    })

    test('getOption', () => {
      const optionId = 1
      const result = menusData[0].menus[0].options[0]
      expect(store.getters.getOption(optionId)).toEqual(result)
    })

    test('isLoading', () => {
      expect(store.getters.isLoading).toBeFalsy()
    })

    test('defaultMenu', () => {
      const result = menusData[0].menus[0]
      expect(store.getters.defaultMenu).toEqual(result)
    })
  })
})
