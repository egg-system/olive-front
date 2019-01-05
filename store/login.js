import axios from 'axios'

/* state */
export const state = () => ({
  login: []
})

/* mutations */
export const mutations = {
  setLogin(state, login) {
    state.login = login
  }
}

/* actions */
export const actions = {
  async getLogin({ commit }) {
    const res = await this.$axios.$get('https://api.myjson.com/bins/1617kw')
    commit('setLogin', res)
  }
}
