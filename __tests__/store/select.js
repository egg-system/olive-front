import Vuex from 'vuex'
import _ from 'lodash'
import { state, getters, mutations, actions } from '~/store/select.js'
import { createLocalVue } from '@vue/test-utils'

describe('store/select.js', () => {
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({ state, mutations, actions, getters })
  })

  describe('mutations', () => {
    test('setSelectedTime', async () => {
      expect(store.state.time).toBeNull()
      store.commit('setSelectedTime', '201901011000')
      expect(store.state.time).toBe('201901011000')
    })
    test('setSelectedMenu', async () => {
      expect(store.state.menu).toBeNull()
      let menu = {
        id: 1,
        name: '通常整体コース',
        price: 6000,
        minutes: 60,
        description: '〜〜〜〜〜',
        options: []
      }
      store.commit('setSelectedMenu', menu)
      expect(store.state.menu).toBe(menu)
    })
    test('setSelectedOptions', async () => {
      expect(store.state.options.length).toBe(0)
      let options = [
        {
          id: 21,
          name: '足つぼ',
          price: 2000,
          max_number: null,
          unit: null
        },
        {
          id: 22,
          name: '耳つぼジュエリー',
          price: 500,
          max_number: 10,
          unit: '粒'
        }
      ]
      store.commit('setSelectedOptions', options)
      expect(store.state.options).toBe(options)
    })
    test('setTwoHoursCheck', async () => {
      expect(store.state.twoHoursCheck).toBe(false)
      store.commit('setTwoHoursCheck', true)
      expect(store.state.twoHoursCheck).toBe(true)
    })
  })

  describe('getters', () => {
    describe('isTwoHour', () => {
      test('On init', async () => {
        expect(store.getters.isTwoHour).toBe(false)
      })
      test('Set 1hour menu', async () => {
        let menu = {
          id: 1,
          name: '通常整体コース',
          price: 6000,
          minutes: 60,
          description: '〜〜〜〜〜',
          options: []
        }
        store.commit('setSelectedMenu', menu)
        expect(store.getters.isTwoHour).toBe(false)
      })
      test('Set 2hour menu', async () => {
        let menu = {
          id: 1,
          name: '通常整体コース',
          price: 6000,
          minutes: 120,
          description: '〜〜〜〜〜',
          options: []
        }
        store.commit('setSelectedMenu', menu)
        expect(store.getters.isTwoHour).toBe(true)
      })
      test('Set 2hour check', async () => {
        let menu = {
          id: 1,
          name: '通常整体コース',
          price: 6000,
          minutes: 60,
          description: '〜〜〜〜〜',
          options: []
        }
        store.commit('setSelectedMenu', menu)
        store.commit('setTwoHoursCheck', true)
        expect(store.getters.isTwoHour).toBe(true)
      })
    })
    test('isMenuSelected', async () => {
      expect(store.getters.isMenuSelected).toBe(false)
      let menu = {
        id: 1,
        name: '通常整体コース',
        price: 6000,
        minutes: 60,
        description: '〜〜〜〜〜',
        options: []
      }
      store.commit('setSelectedMenu', menu)
      expect(store.getters.isMenuSelected).toBe(true)
    })
    test('isTimeSelected', async () => {
      expect(store.getters.isTimeSelected).toBe(false)
      store.commit('setSelectedTime', '201901011000')
      expect(store.getters.isTimeSelected).toBe(true)
    })
  })
})
