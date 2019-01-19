import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/login.js'
import { createLocalVue } from '@vue/test-utils'
// import cloneDeep from 'lodash.clonedeep'

describe('store/login.js', () => {
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('mutations', () => {
    test('logoutミューテーションがコミットされるとlogout状態になる)', () => {
      expect(store.state.isLogin).toBe(false)
      store.commit('logout')
      expect(store.state.isLogin).toBe(false)
      // expect(store.getters['isLogin']).toBe(false)
    })
  })
})
