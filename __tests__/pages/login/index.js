import {
  mount,
  shallowMount,
  RouterLinkStub,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Login from '~/pages/login/index.vue'
import Form from '~/components/pages/login/Form.vue'
import { state } from '~/store/login.js'

describe('Login', () => {
  let actions
  let store
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)
    store = new Vuex.Store({
      modules: {
        login: {
          state
        }
      }
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
