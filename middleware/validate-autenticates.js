export default function({ store }) {
  if (!store.getters['login/isLogin']) {
    return
  }

  if (store.state.login.customerId) {
    return
  }

  // undefinedのチェックをする
  if (
    store.state.login.accessToken === undefined ||
    store.state.login.client === undefined ||
    store.state.login.uid === undefined
  ) {
    store.commit('logout')
    return
  }

  return store.dispatch('login/validateToken')
}
