import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import {
  state,
  getters,
  mutations,
  actions
} from '~/store/reservation/select.js'
import { createLocalVue } from '@vue/test-utils'
import { initialize } from '~/__tests__/test-utils.js'
import selectedMenusData from '~/__tests__/fixtures/reservation/selectedMenus.json'

jest.mock('axios')

describe('store/reservation/select.js', () => {
  let store, initialState
  const FIRST_MENU_INDEX = 0
  const SECOND_MENU_INDEX = 1
  const MIMITSUBO_OPTION_ID = 7
  const DEFAULT_OPTIONS = []
  const DEFAULT_MIMITSUBO_COUNT = 0

  beforeAll(() => {
    initialize()
  })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters
    })

    initialState = {
      dateTime: null,
      storeId: null,
      menuList: [null],
      menuIndex: FIRST_MENU_INDEX,
      optionsList: [DEFAULT_OPTIONS],
      mimitsuboCountList: [DEFAULT_MIMITSUBO_COUNT]
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
    test('setSelectedDateTime', () => {
      const dummyData = 'dummyData'
      store.commit('setSelectedDateTime', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        dateTime: dummyData
      })
    })

    test('setStoreMenu', () => {
      const dummyData = {
        menu: 'dummyMenu',
        storeId: 'dummyStoreId'
      }
      store.commit('setStoreMenu', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        menuList: [dummyData.menu],
        storeId: dummyData.storeId,
        optionsList: initialState.optionsList,
        mimitsuboCountList: initialState.mimitsuboCountList
      })
    })

    test('setSelectedOptions', () => {
      const dummyData = 'dummyData'
      store.commit('setSelectedOptions', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        optionsList: [dummyData]
      })
    })

    test('setMenuIndex', () => {
      const dummyMenuPageId = 1
      store.commit('setMenuIndex', dummyMenuPageId)

      expect(store.state).toEqual({
        ...initialState,
        menuIndex: 0,
        menuList: [null],
        optionsList: [DEFAULT_OPTIONS],
        mimitsuboCountList: [DEFAULT_MIMITSUBO_COUNT]
      })
    })

    test('setMimitsuboCount', () => {
      const dummyData = 'dummyData'
      store.commit('setMimitsuboCount', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        mimitsuboCountList: [dummyData]
      })
    })

    test('reset', () => {
      store.commit('reset')

      expect(store.state).toEqual({
        ...initialState,
        menuList: [null],
        optionsList: [DEFAULT_OPTIONS],
        mimitsuboCountList: [DEFAULT_MIMITSUBO_COUNT],
        dateTime: null
      })
    })

    test('setMenus', () => {
      const dummyData = {
        menus: [
          {
            menu: 'dummyMenu',
            options: ['dummyOptions'],
            mimitsuboCount: 1
          }
        ],
        storeId: 'dummyStoreId'
      }
      store.commit('setMenus', dummyData)

      expect(store.state).toEqual({
        ...initialState,
        menuList: [dummyData.menus[0].menu],
        menuIndex: 0,
        storeId: dummyData.storeId,
        optionsList: [dummyData.menus[0].options],
        mimitsuboCountList: [dummyData.menus[0].mimitsuboCount]
      })
    })
  })

  // getters
  describe('getters', () => {
    const modules = {
      menu: {
        getters: {
          'menu/getStore': () => () => 'dummyStore'
        }
      }
    }
    beforeEach(() => {
      store = new Vuex.Store({
        state,
        mutations,
        actions,
        getters,
        modules
      })
      store.commit('setMenus', selectedMenusData)
    })

    test('storeMenu', () => {
      expect(store.getters.storeMenu).toEqual({
        storeId: store.state.storeId,
        menu: store.state.menuList[store.state.menuIndex]
      })
    })

    test('allSelectedMenuIds', () => {
      expect(store.getters.allSelectedMenuIds).toEqual([
        store.state.menuList[0].id
      ])
    })

    test('allSelectedOptionIds', () => {
      expect(store.getters.allSelectedOptionIds).toEqual([
        store.state.optionsList[0][0].id,
        store.state.optionsList[0][1].id
      ])
    })

    test('isTwoMenusSelected', () => {
      expect(store.getters.isTwoMenusSelected).toBeFalsy()
    })

    test('isTwoHour', () => {
      expect(store.getters.isTwoHour).toBeFalsy()
    })

    test('isMenuSelected', () => {
      expect(store.getters.isMenuSelected).toBeTruthy()
    })

    test('isMimitsuboOptionSelected', () => {
      expect(store.getters.isMimitsuboOptionSelected).toBeTruthy()
    })

    test('isDateTimeSelected', () => {
      expect(store.getters.isDateTimeSelected).toBeFalsy()
    })

    test('selectedMenu', () => {
      expect(store.getters.selectedMenu).toEqual(store.state.menuList[0])
    })

    test('selectedOptions', () => {
      expect(store.getters.selectedOptions).toEqual(store.state.optionsList[0])
    })

    test('selectedOptionIds', () => {
      expect(store.getters.selectedOptionIds).toEqual([
        store.state.optionsList[0][0].id,
        store.state.optionsList[0][1].id
      ])
    })

    test('selectedStore', () => {
      expect(store.getters.selectedStore).toEqual(
        modules.menu.getters['menu/getStore']()()
      )
    })

    test('maxMenuIndex', () => {
      expect(store.getters.maxMenuIndex).toEqual(1)
    })

    test('mimitsuboCount', () => {
      expect(store.getters.mimitsuboCount).toEqual(
        store.state.mimitsuboCountList[0]
      )
    })

    test('reservationDetailsParameters', () => {
      expect(store.getters.reservationDetailsParameters).toEqual([
        {
          menu_id: store.state.menuList[0].id,
          mimitsubo_count: store.state.mimitsuboCountList[0],
          option_ids: store.state.optionsList[0].map(option => option.id)
        }
      ])
    })

    test('selectedMenuParamsQuery', () => {
      const dummyMenus = [
        {
          menuId: store.state.menuList[0].id,
          optionIds: store.state.optionsList[0]
            .map(option => option.id)
            .join(','),
          mimitsuboCount: store.state.mimitsuboCountList[0]
        }
      ]
      expect(store.getters.selectedMenuParamsQuery).toEqual({
        storeId: store.state.storeId,
        menus: JSON.stringify(dummyMenus)
      })
    })

    test('menus', () => {
      const dummyMenus = [
        {
          menuId: store.state.menuList[0].id,
          optionIds: store.state.optionsList[0]
            .map(option => option.id)
            .join(','),
          mimitsuboCount: store.state.mimitsuboCountList[0]
        }
      ]
      expect(store.getters.menus).toEqual([
        {
          menu: store.state.menuList[0],
          storeId: store.state.storeId,
          options: store.state.optionsList[0],
          mimitsuboCount: store.state.mimitsuboCountList[0]
        }
      ])
    })
  })
})
