import Vuex from 'vuex'
import { state, getters, mutations, actions } from '~/store/menu.js'
import { createLocalVue } from '@vue/test-utils'

describe('store/menu.js', () => {
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('actions', () => {
    test('getMenus success', async () => {
      await store.dispatch('getMenus', { storeId: 1 })
      expect(store.state.subShops.length).not.toBe(0)
    })

    test('getMenus is not called', async () => {
      expect(store.state.subShops.length).toBe(0)
    })
  })

  describe('getters', () => {
    test('getMenu target exist', async () => {
      await store.dispatch('getMenus', { storeId: 1 })
      let menu = store.getters.getMenu(1)
      expect(menu.id).toBe(1)
    })

    test('getMenu target not exist ', async () => {
      await store.dispatch('getMenus', { storeId: 1 })
      let menu = store.getters.getMenu(10000)
      expect(menu).toBeNull()
    })

    test('getOption target exist', async () => {
      await store.dispatch('getMenus', { storeId: 1 })
      let option = store.getters.getOption(20)
      expect(option.id).toBe(20)
    })

    test('getOption target not exist ', async () => {
      await store.dispatch('getMenus', { storeId: 1 })
      let option = store.getters.getOption(10000)
      expect(option).toBeNull()
    })
  })
})
