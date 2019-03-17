import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/registration.js'
import { createLocalVue } from '@vue/test-utils'

describe('store/registration.js', () => {
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('actions reserveCommit', () => {
    test('成功', () => {
      store.state.menuId = 123
      store.state.isFirst = true
      store.dispatch('reserveCommit')
      expect(store.state.isError).toBe(false)
    })
    test('パラメータエラー', () => {
      store.dispatch('reserveCommit')
      expect(store.state.isError).toBe(true)
    })
  })
})
