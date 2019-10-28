export default function({ redirect, store, query }) {
  store.commit('user/setToken', query)
}
