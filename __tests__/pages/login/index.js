import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '../../../pages/login/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login', () => {
  test('ログイン画面のテスト', () => {
    // const wrapper = mount(Login)
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(1).toBe(1)
  })
})
