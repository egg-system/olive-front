import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/reservation/registration.js'
import { createLocalVue } from '@vue/test-utils'
import config from '~/config/constant.dev.js'

describe('store/reservation/registration.js', () => {
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

  // 予約確定は会員登録と密結合のため、単独ではテストできない。
  // テストコードがおかしいので、一旦スキップ
  describe.skip('actions reserveCommit', () => {
    test('成功', () => {
      store.state.menuId = 123
      store.state.isFirst = true
      store.dispatch('createReserve')
      expect(store.state.isError).toBe(false)
    })
    test('パラメータエラー', () => {
      store.dispatch('createReserve')
      expect(store.state.isError).toBe(true)
    })
  })
})
