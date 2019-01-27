import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/login.js'
import { createLocalVue } from '@vue/test-utils'

describe('store/login.js', () => {
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('mutations', () => {
    test('logout test', () => {
      expect(store.state.isLogin).toBe(false)
      store.commit('logout')
      expect(store.state.isLogin).toBe(false)
    })
  })

  describe('actions', () => {
    test('checkLogin failed', async () => {
      await store.dispatch('checkLogin', {
        userName: 'aaaa',
        password: 'aaaa'
      })
      expect(store.state.isLogin).toBe(false)
    })

    test('checkLogin success', async () => {
      await store.dispatch('checkLogin', {
        userName: 'aefejeoaee',
        password: 'feaoijee'
      })
      expect(store.state.isLogin).toBe(true)
    })
  })
})
