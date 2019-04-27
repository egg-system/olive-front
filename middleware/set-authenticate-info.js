export default function({ redirect, store, query }) {
  store.commit('login/setToken', query)
}
