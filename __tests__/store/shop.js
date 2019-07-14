import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/shop.js'
import { createLocalVue } from '@vue/test-utils'
import config from '~/config/constant.dev.js'

describe('store/shop.js', () => {
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
    test('getShop success', async () => {
      expect(store.state.id).toBeNull()
      expect(store.state.name).toBeNull()
      expect(store.state.open_at).toBeNull()
      expect(store.state.close_at).toBeNull()
      expect(store.state.break_from).toBeNull()
      expect(store.state.break_to).toBeNull()
      await store.dispatch('getShop', { id: 1 })
      expect(store.state.id).not.toBeNull()
      expect(store.state.name).not.toBeNull()
      expect(store.state.open_at).not.toBeNull()
      expect(store.state.close_at).not.toBeNull()
      expect(store.state.break_from).not.toBeNull()
      expect(store.state.break_to).not.toBeNull()
    })
  })
})
