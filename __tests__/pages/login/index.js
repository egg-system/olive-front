import {
  mount,
  shallowMount,
  RouterLinkStub,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '~/pages/login/index.vue'
import Form from '~/components/pages/login/Form.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login', () => {
  let actions
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      actions
    })

    wrapper = shallowMount(Login, {
      store,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
  })

  test('login page test', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('Form test', () => {
    expect(wrapper.find(Form).is(Form)).toBeTruthy()
  })
})
