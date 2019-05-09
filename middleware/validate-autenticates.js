export default function({ store }) {
  if (!store.getters['login/isLogin']) {
    return
  }

  if (store.state.login.customerId) {
    return
  }

  return store.dispatch('login/validateToken')
}
