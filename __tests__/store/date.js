import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/date.js'
import { createLocalVue } from '@vue/test-utils'
import config from '~/config/constant.dev.js'

// storeが選択されている前提のテストである必要があるため、一旦skip
describe.skip('store/date.js', () => {
  let store

  beforeAll(() => {
    // 設定ファイルはdevを使う
    process.env = config
  })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('actions', () => {
    test('getCalendar success', async () => {
      expect(store.state.calendar.length).toBe(0)
      await store.dispatch('getCalendar', { storeId: 1 })
      expect(store.state.calendar.length).not.toBe(0)
    })
  })

  describe('getters', () => {
    test('isLoading', async () => {
      expect(store.getters.isLoading).toBe(true)
      await store.dispatch('getCalendar', { storeId: 1 })
      expect(store.getters.isLoading).toBe(false)
    })
  })
})
