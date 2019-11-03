export default function({ store }) {
  if (!store.getters['user/isLogin']) {
    return
  }

  if (store.state.user.customerId) {
    return
  }

  // undefinedのチェックをする
  if (
    store.state.user.accessToken === undefined ||
    store.state.user.client === undefined ||
    store.state.user.uid === undefined
  ) {
    store.commit('logout')
    return
  }

  return store.dispatch('user/validateToken')
}
